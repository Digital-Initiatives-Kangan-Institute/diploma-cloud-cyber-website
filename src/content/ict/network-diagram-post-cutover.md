---
title: 'Network Diagram'
description: 'Current-state network topology following the LMS cutover to AWS — campus on-premises services plus the AWS-hosted LMS environment, linked via Site-to-Site VPN.'
appearsIn:
  - s1-cl1-at3
order: 6
uocReferences:
  - '[ICTICT517 AC 5] Information on current ICT systems and practices in the organisation including operating systems, hardware, and security'
  - '[ICTCLD502 PC 2.1] Review architecture of traditional multi-tier web application in non-cloud environment and identify high availability requirements'
  - '[ICTCLD502 PC 2.2] Identify any single points of failure'
---

## Document control

| | |
|---|---|
| Document title | Network Diagram — YAT Cremorne Campus and AWS Sydney |
| Document owner | Sam Walker, ICT Manager |
| Prepared by | YAT ICT |
| Review cycle | Annual, or on material network change |
| Classification | Internal — ICT, and engaged consultants on signed MSA |

## 1. Purpose

This document records the current-state network topology of the YAT environment following the LMS cutover to AWS. The on-prem LMS server has been decommissioned; the LMS now runs in the AWS Sydney region and is reached from the YAT campus over the Internet (for end-user traffic) and over a Site-to-Site VPN (for back-office traffic such as LDAP authentication and ICT management). The remainder of YAT's services continue to run on-premises at the Cremorne campus.

## 2. Topology overview

![Network topology — YAT Cremorne campus plus AWS-hosted LMS (single-AZ baseline); Site-to-Site VPN linking the two](/diagrams/network-at3-start-non-hardened.drawio.svg)

*Downloads: [SVG](/diagrams/network-at3-start-non-hardened.drawio.svg) · [draw.io source](/diagrams/network-at3-start-non-hardened.drawio) (open and edit in [draw.io](https://app.diagrams.net/))*

The campus network is logically unchanged — two zones (Staff, Student) behind a redundant edge firewall, a staff-only VPN server for remote access, and the existing on-prem servers (Domain Controllers, System Management, Application Services, NAS) in their original locations. The on-prem LMS server has been decommissioned at cutover and is shown in the diagram as a vacated slot for clarity.

The LMS now runs in **AWS region `ap-southeast-2` (Sydney)** as a multi-tier web workload:

- **Internet Gateway** for end-user traffic into the public web subnet.
- **Application Load Balancer** in the public subnet, fronting the LMS application instances.
- **EC2 LMS application** in the private app subnet, running on Windows Server 2016 with DOODLE — managed by an Auto Scaling Group at a single-AZ baseline.
- **Amazon RDS for MySQL** in the private data subnet, single-AZ baseline.
- **NAT Gateway** providing outbound internet from the private subnets (Windows Updates, package fetches).
- **VPN Gateway** terminating the Site-to-Site VPN from the YAT campus edge firewall; used for AD-LDAP traffic from the LMS application back to YAT campus Active Directory, and for ICT management traffic.

End-user LMS access from YAT staff and student desktops flows over the campus internet connection to the AWS Application Load Balancer. The Site-to-Site VPN is reserved for back-office traffic (LDAP, management).

Separately from the LMS, YAT's **public website** runs in the same AWS Sydney region as an **independent single-Availability-Zone deployment** — a single EC2 instance (LAMP / CMS), a single-AZ Amazon RDS for MySQL database, and S3 for nightly backups. Migrated from on-premises hosting in 2023 as YAT's first cloud project, it is reached by the public over the Internet via HTTPS and is not connected to the campus network. It has no load balancer, autoscaling, Multi-AZ, or disaster recovery — its single instance, availability zone, and database are single points of failure.

## 3. Component summary

### 3.1 On-premises components

| Component | Zone | Redundancy | Notes |
|---|---|---|---|
| Edge router / firewall | Perimeter | Redundant | No single point of failure at the network plumbing layer |
| VPN server | Perimeter | Single — SPOF | Staff-only remote access (unchanged from prior topology) |
| Site-to-Site VPN endpoint | Perimeter | Single | New post-cutover dependency — connects campus to AWS VPC |
| Domain Controllers (×2) | Staff | Redundant, load-shared | AD, DHCP, DNS — serve both zones; AD now also serves the cloud LMS over the Site-to-Site VPN |
| System Management server | Staff | Single — non-critical | Runs nightly backups for on-prem systems |
| Application Services server | Staff | Single | Accounting and office admin applications |
| NAS — Staff zone | Staff | RAID-5 (disk-level only) | |
| NAS — Student zone | Student | RAID-5 (disk-level only) | |
| Staff desktops | Staff | n/a | Windows 10 Enterprise, AD-joined |
| Student desktops | Student | n/a | Windows 10 Enterprise + Office 365 Education |
| Multifunction printers | Staff | n/a | Designated staff locations |
| Classroom printers | Student | n/a | One per classroom |

### 3.2 AWS components (LMS environment)

| Component | Subnet / Tier | Redundancy | Notes |
|---|---|---|---|
| Internet Gateway | VPC edge | AWS-managed | End-user traffic entry |
| VPN Gateway | VPC edge | Single endpoint | Terminates the Site-to-Site VPN from the campus |
| Application Load Balancer | `public-web-a` (10.0.1.0/24) | Single-AZ baseline | HTTPS:443 → LMS target group |
| NAT Gateway | `public-web-a` | Single-AZ baseline | Outbound for private subnets |
| EC2 — LMS application | `private-app-a` (10.0.11.0/24) | Single-AZ ASG (min=1, max=2) | Windows Server 2016 + DOODLE |
| RDS for MySQL | `private-data-a` (10.0.21.0/24) | Single-AZ baseline — not HA | Failover via point-in-time restore only at baseline |

### 3.3 AWS components (Website — separate 2023 pilot)

| Component | Subnet / Tier | Redundancy | Notes |
|---|---|---|---|
| EC2 — Website | `public-web-a` (single-AZ) | Single — SPOF | LAMP / CMS; serves the public website |
| RDS for MySQL — Website | `private-data-a` (single-AZ) | Single — SPOF | Website CMS database; no standby |
| S3 — website backups | n/a (regional) | Single region | Nightly database and media backups |

This is a separate deployment from the LMS environment above — its own single-AZ footprint, migrated in 2023, not HA-hardened.

## 4. Single points of failure

The current topology has a different SPOF profile from the prior all-on-premises arrangement:

**Resolved by the migration:**

- The on-prem LMS server SPOF has been resolved — the LMS is no longer single-instance on aged on-prem hardware.

**New or unchanged single points of failure:**

- **AWS RDS database — single-AZ.** At the post-cutover baseline the database is a single Multi-AZ-capable instance running in one AZ only. Failover under the baseline depends on point-in-time restore. **Identified target for the high-availability hardening phase.**
- **AWS EC2 LMS application — single-AZ ASG.** Auto Scaling can replace an instance, but all capacity is in one AZ. Identified target for the HA hardening phase.
- **AWS ALB and NAT Gateway — single-AZ.** Both are in `public-web-a` only. Identified targets for the HA hardening phase.
- **Site-to-Site VPN — single tunnel endpoint** at the campus end. AD-LDAP traffic from the LMS back to the campus relies on this link. Loss of the VPN does not stop end-user LMS access (that flows over the public internet) but does prevent fresh AD authentications from the cloud LMS until restored.
- **VPN server (campus, staff remote access)** — unchanged from prior topology; outside the LMS migration scope.
- **Application Services server** (Accounting / office admin) — unchanged from prior topology.
- **System Management server** — unchanged from prior topology.
- **Website (AWS, Sydney)** — the separate 2023 website pilot is single-AZ: its single EC2 instance, Availability Zone, and RDS database are each single points of failure, with no DR. Outside the LMS migration scope.

## 5. References

- LMS Cloud Architecture — Baseline Design — the design under which this topology was built
- Website Cloud Architecture — Baseline Design — the design under which the AWS-hosted website was built (2023)
- ICT Environment Overview — narrative description of the wider YAT environment
- Hardware / Software Inventory — itemised inventory by role and zone
- High-Availability Database Requirements — the requirements the next hardening phase works to
- ICT Strategic Plan — direction for the LMS migration and ongoing cloud transition
