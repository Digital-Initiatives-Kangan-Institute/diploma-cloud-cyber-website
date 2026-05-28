---
title: 'Hardware / Software Inventory'
description: 'Current-state inventory of YAT campus servers, storage, endpoints, network equipment, software licensing, and AWS-hosted LMS resources.'
appearsIn:
  - s1-cl1-at3
order: 7
uocReferences:
  - '[ICTICT517 AC 5] Information on current ICT systems and practices in the organisation including operating systems, hardware, and security'
  - '[ICTCLD502 AC 5] specific requirements and industry standards (the products align to)'
---

## Document control

| | |
|---|---|
| Document title | Hardware / Software Inventory — YAT Cremorne Campus and AWS Sydney |
| Document owner | Sam Walker, ICT Manager |
| Prepared by | YAT ICT |
| Review cycle | Annual, or on material change to the environment |
| Classification | Internal — ICT, and engaged consultants on signed MSA |

## 1. Purpose

This inventory records YAT's current ICT assets — campus servers, storage, endpoints, network equipment, software licensing, and the AWS-hosted LMS resources. It supports ICT planning, audit, change-management impact assessment, and the engagement of external consultants where their work touches the YAT environment.

## 2. Campus server inventory

| Server role | Quantity | Operating system | Notes |
|---|---:|---|---|
| Domain Controllers (AD / DHCP / DNS) | 2 | Windows Server 2016 | Load-shared across both zones; no single-system outage causes service outage |
| System Management and Backups | 1 | Windows Server 2016 | Single instance, explicitly non-HA. Runs nightly backups for on-prem systems |
| Application Services (Accounting / Office Admin) | 1 | Windows Server 2016 | Single instance; payroll critical functions outsourced |
| VPN | 1 | (purpose-built appliance / server) | Staff-only remote access; single instance |

## 3. Campus storage inventory

| Device | Quantity | Zone | Configuration |
|---|---:|---|---|
| NAS — staff zone | 1 | Staff | RAID-5, hot-swap disks |
| NAS — student zone | 1 | Student | RAID-5, hot-swap disks |

## 4. AWS resources — LMS environment

The LMS workload is deployed in AWS region `ap-southeast-2` (Sydney). The following resources comprise the LMS environment:

| Resource | Tier / Subnet | Configuration | Notes |
|---|---|---|---|
| VPC | n/a | `10.0.0.0/16` | DNS hostnames and resolution enabled; flow logs to CloudWatch |
| Internet Gateway | VPC edge | AWS-managed | End-user traffic entry |
| VPN Gateway | VPC edge | Single endpoint | Terminates the Site-to-Site VPN from the campus |
| NAT Gateway | `public-web-a` | Single-AZ | Outbound internet for private subnets |
| Application Load Balancer | `public-web-a` | Single-AZ | HTTPS:443 → LMS target group; ACM-issued TLS certificate |
| EC2 instances — LMS application | `private-app-a` | Windows Server 2016 + DOODLE; Auto Scaling Group min=1, max=2 | Single-AZ baseline |
| Amazon RDS for MySQL | `private-data-a` | Single-AZ; KMS-encrypted; 7-day automated backup retention | LMS database |
| Amazon S3 — LMS attachments | n/a (regional) | Versioned; lifecycle to Glacier Deep Archive after 24 months | Course materials, student submissions |
| Amazon S3 — LMS backups | n/a (regional) | Versioned; private; access-logged | Off-instance backup copies |
| CloudWatch Logs | n/a | 90-day retention | VPC flow logs, ALB access logs, EC2 OS logs, RDS logs |

## 5. Endpoint inventory

| Endpoint | Approximate quantity | OS / Edition | Notes |
|---|---:|---|---|
| Staff desktops | ~25 | Windows 10 Enterprise | AD-joined |
| Student desktops | ~80 | Windows 10 Enterprise + Office 365 Education | AD-joined; lab machines provisioned with additional memory and storage where required |
| Multifunction printers | ~5 | n/a | Designated staff locations |
| Classroom printers | ~15 | n/a | One per classroom |

## 6. Network equipment

| Item | Quantity | Notes |
|---|---:|---|
| Edge router / firewall | 2 (redundant) | No single point of failure at the network plumbing layer |
| Site-to-Site VPN endpoint (campus) | 1 | Connects the campus edge to the AWS VPN Gateway |
| LAN distribution switches — Staff zone | (per zone topology) | Connect servers, staff desktops, NAS, multifunction printers |
| LAN distribution switches — Student zone | (per zone topology) | Connect student desktops, classroom printers, Student-zone NAS |
| Wireless access points | (campus-wide coverage) | Staff and student wifi served on separated SSIDs |

## 7. Software and licensing inventory

| Product | Vendor | Licence type | Quantity / coverage |
|---|---|---|---|
| Windows Server 2016 (campus) | Microsoft | Per-server licensing | 4 campus servers (DC ×2, System Management, Application Services) |
| Windows Server 2016 (AWS EC2) | Microsoft | License-included via AWS EC2 pricing | LMS application instances in AWS |
| Windows 10 Enterprise | Microsoft | Per-device licensing | ~105 desktops |
| Active Directory 2016 | Microsoft | Included with Server 2016 | n/a |
| Office 365 Education edition | Microsoft | Per-student site licence | Student population |
| Office 365 (Email, staff and students) | Microsoft | Mailbox-licensed SaaS, Azure-hosted | Staff and student mailboxes |
| DOODLE (Diverse Object-Orientated Dynamic Learning Environment) | Open source — GNU GPL | Free / no licence cost | 1 deployment (AWS-hosted) |
| MySQL (via Amazon RDS) | AWS managed | RDS pricing | LMS database |

## 8. Facilities

| Item | Notes |
|---|---|
| Campus server room | Physically secured, air-conditioned, UPS-protected against power loss and electrical surges |
| Campus network plumbing | Redundant at the edge — no single point of failure at the network layer |
| AWS region `ap-southeast-2` | AWS-managed under the Shared Responsibility Model — AWS is responsible for the security of the regions, availability zones, hardware, and hypervisor |

## 9. References

- Network Diagram — zone layout, topology, and AWS-hosted LMS environment
- ICT Environment Overview — narrative description of the current environment
- LMS Cloud Architecture — Baseline Design — design of the AWS LMS environment
- LMS Server Specifications and Current Status — record of the LMS workload
- User Access Policy (intranet policies) — authoritative source for role-based access matrix
