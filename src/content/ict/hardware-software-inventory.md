---
title: 'Hardware / Software Inventory'
description: 'Current-state inventory of YAT servers, storage, endpoints, network equipment, and software licensing across the Cremorne campus.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
order: 7
uocReferences:
  - '[ICTICT517 AC 5] Information on current ICT systems and practices in the organisation including operating systems, hardware, and security'
  - '[ICTCLD502 AC 5] specific requirements and industry standards (the products align to)'
---

## Document control

| | |
|---|---|
| Document title | Hardware / Software Inventory — YAT Cremorne Campus |
| Document owner | Sam Walker, ICT Manager |
| Prepared by | YAT ICT |
| Review cycle | Annual, or on material change to the environment |
| Classification | Internal — ICT, and engaged consultants on signed MSA |

## 1. Purpose

This inventory records YAT's current ICT assets — servers, storage, endpoints, network equipment, and software licensing — at the Cremorne campus. It supports ICT planning, audit, change-management impact assessment, and the engagement of external consultants where their work touches the YAT environment.

## 2. Server inventory

| Server role | Quantity | Operating system | Notes |
|---|---:|---|---|
| Domain Controllers (AD / DHCP / DNS) | 2 | Windows Server 2016 | Load-shared across both zones; no single-system outage causes service outage |
| System Management and Backups | 1 | Windows Server 2016 | Single instance, explicitly non-HA. Runs nightly backups for both zones |
| Application Services (Accounting / Office Admin) | 1 | Windows Server 2016 | Single instance; payroll critical functions outsourced |
| **LMS (DOODLE + MySQL)** | **1** | **Windows Server 2016** | **Single, end of life, mission critical — migration target** |
| VPN | 1 | (purpose-built appliance / server) | Staff-only remote access; single instance |

## 3. Storage inventory

| Device | Quantity | Zone | Configuration |
|---|---:|---|---|
| NAS — staff zone | 1 | Staff | RAID-5, hot-swap disks |
| NAS — student zone | 1 | Student | RAID-5, hot-swap disks |

## 4. Endpoint inventory

| Endpoint | Approximate quantity | OS / Edition | Notes |
|---|---:|---|---|
| Staff desktops | ~25 | Windows 10 Enterprise | AD-joined |
| Student desktops | ~80 | Windows 10 Enterprise + Office 365 Education | AD-joined; lab machines provisioned with additional memory and storage where required |
| Multifunction printers | ~5 | n/a | Designated staff locations |
| Classroom printers | ~15 | n/a | One per classroom |

## 5. Network equipment

| Item | Quantity | Notes |
|---|---:|---|
| Edge router / firewall | 2 (redundant) | No single point of failure at the network plumbing layer |
| LAN distribution switches — Staff zone | (per zone topology) | Connect servers, staff desktops, NAS, multifunction printers |
| LAN distribution switches — Student zone | (per zone topology) | Connect student desktops, classroom printers, Student-zone NAS |
| Wireless access points | (campus-wide coverage) | Staff and student wifi served on separated SSIDs |

## 6. Software and licensing inventory

| Product | Vendor | Licence type | Quantity / coverage |
|---|---|---|---|
| Windows Server 2016 | Microsoft | Per-server licensing | 5 servers (DC ×2, System Management, Application Services, LMS) |
| Windows 10 Enterprise | Microsoft | Per-device licensing | ~105 desktops |
| Active Directory 2016 | Microsoft | Included with Server 2016 | n/a |
| Office 365 Education edition | Microsoft | Per-student site licence | Student population |
| Office 365 (Email, staff and students) | Microsoft | Mailbox-licensed SaaS, Azure-hosted | Staff and student mailboxes |
| DOODLE (Diverse Object-Orientated Dynamic Learning Environment) | Open source — GNU GPL | Free / no licence cost | 1 deployment |
| MySQL Community Edition | Oracle | Open source — GPL | 1 deployment |

## 7. Facilities

| Item | Notes |
|---|---|
| Server room | Physically secured, air-conditioned, UPS-protected against power loss and electrical surges |
| Network plumbing | Redundant at the edge — no single point of failure at the network layer |

## 8. References

- On-Premises Network Diagram — zone layout and topology
- ICT Environment Overview — narrative description of the current environment
- LMS Server Specifications and Current Status — detailed record of the LMS server
- User Access Policy (intranet policies) — authoritative source for role-based access matrix
