---
title: 'On-Premises Network Diagram'
description: 'Current-state network topology for the YAT Cremorne campus — zones, servers, endpoints, and single points of failure relevant to ICT planning and the LMS migration.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
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
| Document title | On-Premises Network Diagram — YAT Cremorne Campus |
| Document owner | Sam Walker, ICT Manager |
| Prepared by | YAT ICT |
| Review cycle | Annual, or on material network change |
| Classification | Internal — ICT, and engaged consultants on signed MSA |

## 1. Purpose

This document records the current-state network topology of the YAT College Cremorne campus. It supports ICT planning, change-management impact assessment, audit, and the engagement of external consultants where their work touches the YAT environment.

## 2. Topology overview

> **Diagram pending.** The published topology diagram is currently being re-rendered for the intranet. The component summary and single-point-of-failure analysis below describe the same topology in tabular form and are the operational reference until the rendered diagram is reissued.

The campus network is logically segmented into two zones — a **Staff network zone** and a **Student network zone** — separated at the edge firewall. Both zones reach the internet through redundant edge routing/firewalling. A staff-only VPN server provides remote access into the Staff zone.

All servers reside in the Staff zone. The Student zone holds student desktops, classroom printers, and the Student-zone NAS. The LMS server is reachable from the Student zone via permissioned access controlled by Active Directory.

## 3. Component summary

| Component | Zone | Redundancy | Notes |
|---|---|---|---|
| Edge router / firewall | Perimeter | Redundant | No single point of failure at the network plumbing layer |
| VPN server | Perimeter | Single — SPOF | Staff-only remote access |
| Domain Controllers (×2) | Staff | Redundant, load-shared | AD, DHCP, DNS — serve both zones |
| System Management server | Staff | Single — non-critical | Runs nightly backups for both zones |
| Application Services server | Staff | Single | Accounting and office admin applications; payroll critical functions are outsourced |
| **LMS server** | **Staff** | **Single — SPOF, end of life, mission critical** | **Identified migration target** |
| NAS — Staff zone | Staff | RAID-5 (disk-level only) | Not currently designated mission critical |
| NAS — Student zone | Student | RAID-5 (disk-level only) | Not currently designated mission critical |
| Staff desktops | Staff | n/a | Windows 10 Enterprise, AD-joined |
| Student desktops | Student | n/a | Windows 10 Enterprise + Office 365 Education |
| Multifunction printers | Staff | n/a | Designated staff locations |
| Classroom printers | Student | n/a | One per classroom |

## 4. Single points of failure

The following single-instance components have been identified and recorded for risk management and forward planning:

- **LMS server** — single instance, end of life, mission critical. Primary driver of the current LMS Cloud Migration engagement.
- **VPN server** — single instance carrying all staff remote access. Not in scope for the LMS migration; flagged for separate consideration in a future ICT planning cycle.
- **Application Services server** (Accounting / office admin) — single instance. Partially mitigated by outsourcing the most critical functions (e.g. payroll).
- **System Management server** — single instance. Explicitly designated as not requiring high availability; restored from build records and tape in the event of failure.

## 5. References

- ICT Environment Overview — narrative description of the current on-prem environment
- Hardware / Software Inventory — itemised inventory by role and zone
- LMS Server Specifications and Current Status — detailed record of the LMS server (the SPOF flagged above)
- ICT Strategic Plan — direction for the LMS migration and broader cloud transition
