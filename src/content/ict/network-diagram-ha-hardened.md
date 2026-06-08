---
title: 'Network Diagram'
description: 'Current-state network topology — campus on-premises services plus the AWS-hosted LMS environment deployed across two availability zones for resilience to single-AZ failure.'
appearsIn:
  - s1-cl2-at1
  - s1-cl3-at1
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

This document records the current-state network topology of the YAT environment. The LMS runs in the AWS Sydney region as a multi-tier web workload deployed across two availability zones for resilience to single-AZ failure. The LMS is reached from the YAT campus over the Internet (for end-user traffic) and over a Site-to-Site VPN (for back-office traffic such as LDAP authentication and ICT management). The remainder of YAT's services continue to run on-premises at the Cremorne campus.

## 2. Topology overview

![Network topology — YAT Cremorne campus plus AWS-hosted LMS (Multi-AZ across ap-southeast-2a and ap-southeast-2b); Site-to-Site VPN linking the two](/diagrams/network-at3-end-ha-hardened.drawio.svg)

*Downloads: [SVG](/diagrams/network-at3-end-ha-hardened.drawio.svg) · [draw.io source](/diagrams/network-at3-end-ha-hardened.drawio) (open and edit in [draw.io](https://app.diagrams.net/))*

The campus network is logically unchanged — two zones (Staff, Student) behind a redundant edge firewall, a staff-only VPN server for remote access, and the existing on-prem servers (Domain Controllers, System Management, Application Services, NAS) in their original locations.

The LMS runs in **AWS region `ap-southeast-2` (Sydney)** as a multi-tier web workload deployed across two availability zones (`ap-southeast-2a` and `ap-southeast-2b`):

- **Internet Gateway** for end-user traffic into the public web subnets.
- **Application Load Balancer** spanning both availability zones, fronting the LMS application instances and distributing traffic to healthy targets.
- **EC2 LMS application** in private app subnets in both availability zones, running on Windows Server 2016 with DOODLE — managed by a cross-AZ Auto Scaling Group.
- **Amazon RDS for MySQL — Multi-AZ deployment**, with a primary in `ap-southeast-2a` and a synchronously-replicated standby in `ap-southeast-2b`; automatic failover under two minutes.
- **NAT Gateways** in each availability zone for outbound internet from the corresponding private subnets.
- **VPN Gateway** terminating the Site-to-Site VPN from the YAT campus edge firewall; used for AD-LDAP traffic from the LMS application back to YAT campus Active Directory, and for ICT management traffic.
- **Cross-Region S3 backup copy** of LMS attachments and database backups maintained in a secondary AWS region for disaster-recovery purposes.

End-user LMS access from YAT staff and student desktops flows over the campus internet connection to the AWS Application Load Balancer. The Site-to-Site VPN is reserved for back-office traffic (LDAP, management).

Separately from the LMS, YAT's **public website** runs in the same AWS Sydney region as an **independent single-Availability-Zone deployment** — a single EC2 instance (LAMP / CMS), a single-AZ Amazon RDS for MySQL database, and S3 for nightly backups. Migrated from on-premises hosting in 2023 as YAT's first cloud project, it has **not** been HA-hardened the way the LMS has: it has no load balancer, autoscaling, Multi-AZ, or disaster recovery, so its single instance, availability zone, and database remain single points of failure. It is reached by the public over the Internet via HTTPS and is not connected to the campus network.

## 3. Component summary

### 3.1 On-premises components

| Component | Zone | Redundancy | Notes |
|---|---|---|---|
| Edge router / firewall | Perimeter | Redundant | No single point of failure at the network plumbing layer |
| VPN server | Perimeter | Single — SPOF | Staff-only remote access |
| Site-to-Site VPN endpoint | Perimeter | Single | Connects campus to AWS VPC |
| Domain Controllers (×2) | Staff | Redundant, load-shared | AD, DHCP, DNS — serve both zones; AD also serves the cloud LMS over the Site-to-Site VPN |
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
| Application Load Balancer | `public-web-a` + `public-web-b` | Cross-AZ | HTTPS:443 → LMS target group across both AZs |
| NAT Gateway (×2) | `public-web-a` and `public-web-b` | One per AZ | Per-AZ outbound for the corresponding private subnets |
| EC2 — LMS application | `private-app-a` + `private-app-b` (10.0.11.0/24, 10.0.12.0/24) | Cross-AZ ASG (min=2) | Windows Server 2016 + DOODLE; capacity in both AZs |
| RDS for MySQL — primary | `private-data-a` (10.0.21.0/24) | Multi-AZ | Synchronous replication to standby in AZ-b |
| RDS for MySQL — standby | `private-data-b` (10.0.22.0/24) | Multi-AZ | Auto-failover under two minutes |
| S3 — LMS attachments | n/a (regional) | Cross-Region copy | Versioned; lifecycle to Glacier Deep Archive; cross-Region backup for DR |

### 3.3 AWS components (Website — separate 2023 pilot, not HA-hardened)

| Component | Subnet / Tier | Redundancy | Notes |
|---|---|---|---|
| EC2 — Website | `public-web-a` (single-AZ) | Single — SPOF | LAMP / CMS; serves the public website |
| RDS for MySQL — Website | `private-data-a` (single-AZ) | Single — SPOF | Website CMS database; no standby |
| S3 — website backups | n/a (regional) | Single region | Nightly database and media backups; no cross-Region copy |

Unlike the LMS environment above, the website has not been hardened — it remains the single-AZ 2023 pilot deployment.

## 4. Single points of failure

The current topology has been hardened against single-AZ failure for the LMS environment. The remaining single-instance components are outside the LMS migration scope:

**Resolved by the LMS migration and HA hardening:**

- The on-prem LMS server SPOF has been resolved — the LMS is no longer single-instance on aged on-prem hardware.
- AWS RDS, EC2, ALB, and NAT — previously single-AZ at the post-cutover baseline — have been hardened across two availability zones.

**Remaining single-instance components (outside LMS migration scope):**

- **Site-to-Site VPN — single tunnel endpoint** at the campus end. AD-LDAP traffic from the LMS back to the campus relies on this link. Loss of the VPN does not stop end-user LMS access (that flows over the public internet) but does prevent fresh AD authentications from the cloud LMS until restored.
- **VPN server (campus, staff remote access)** — unchanged from prior topology.
- **Application Services server** (Accounting / office admin) — unchanged from prior topology.
- **System Management server** — unchanged from prior topology.
- **Website (AWS, Sydney)** — the separate 2023 website pilot has **not** been HA-hardened: its single EC2 instance, Availability Zone, and RDS database remain single points of failure, with no DR. Outside the LMS migration scope.

## 5. References

- LMS Cloud Architecture — Baseline Design — the design under which the AWS LMS environment was built
- Website Cloud Architecture — Baseline Design — the design under which the AWS-hosted website was built (2023)
- High-Availability Database Requirements — HA requirements the LMS database deployment was hardened to
- ICT Environment Overview — narrative description of the wider YAT environment
- Hardware / Software Inventory — itemised inventory by role and zone
- ICT Strategic Plan — direction for the LMS migration and ongoing cloud transition
