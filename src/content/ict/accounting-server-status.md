---
title: 'Accounting System Server Specifications'
description: 'Specifications of the YAT Application Services server hosting the Accounting & Office Administration system (Ledgerline) — hardware, OS, database, measured availability, utilisation, and growth profile.'
appearsIn:
  - s1-cl1-at1
order: 15
uocReferences:
  - '[ICTICT517 AC 5] Information on current ICT systems and practices in the organisation including operating systems, hardware, and security'
  - '[ICTCLD502 PC 2.3] Estimate recovery objectives for multi-tier web components and for overall architecture'
---

## Document control

| | |
|---|---|
| Document title | Accounting System (Application Services Server) — Specifications |
| Document owner | Sam Walker, ICT Manager |
| Prepared by | YAT ICT |
| Review cycle | Annual, or on material change to the server or its operating profile |
| Classification | Internal — ICT, Finance, and engaged consultants on signed MSA |

## 1. Purpose

This document records the current specifications of the YAT **Application Services server**, which hosts the **Ledgerline** accounting and office-administration system. It is the authoritative record for that asset and the planning input for any work that touches it — capacity, availability, recoverability, or migration.

## 2. System description

The Application Services server runs the **Ledgerline Finance & Office Suite** application and its **Microsoft SQL Server** database, co-located on the same host. The system serves YAT's finance and administrative staff for general ledger, accounts payable/receivable, student fee billing, procurement, and asset management. Payroll is outsourced to an external bureau and does not run on this server.

Performance is acceptable for current load, but the server is approaching the end of its serviceable life and its support warranty.

## 3. Current server — infrastructure summary

| Attribute | Value |
|---|---|
| Server role | Application Services — Ledgerline application + Microsoft SQL Server database (co-located) |
| Operating system | Windows Server 2016 |
| Database | Microsoft SQL Server (Standard edition) |
| Hosting | Single on-prem server, Staff network zone |
| Server age | ~5 years — approaching end of warranty and capacity headroom |
| Criticality | Business-important (payroll outsourced; not 24/7 mission-critical) |
| Measured availability (rolling 12 months, business hours) | 99.3% |
| Target availability | 99.5% (business-hours service) |

## 4. Current hardware specifications

| Resource | Current | Operating profile |
|---|---|---|
| CPU | 4 vCPU @ 2.4 GHz | Peak utilisation ~70% during month-end close |
| Memory (RAM) | 8 GB | Peak utilisation ~80% during month-end close |
| Storage — system | 80 GB SSD | ~35% used |
| Storage — application and database | 150 GB SSD | ~55% used |
| Database storage (SQL Server data files) | ~22 GB of the 150 GB above | Growing ~5 GB / year |
| Network | 1 Gbps NIC | Comfortably adequate — internal staff load only |
| Storage IOPS | ~1,500 baseline, ~2,500 peak (month-end) | |

## 5. Usage patterns

- **Daily pattern:** business hours only, Monday–Friday ~07:30–18:00. Effectively idle overnight and at weekends.
- **Monthly peak:** month-end close — last 2 and first 2 business days of each month — drives the highest concurrent load (~45–55 users) and the heaviest reporting/transaction workload.
- **Annual peak:** end of financial year (mid-June to mid-July) — statutory reporting and audit preparation.
- **Annual data growth:** ~5 GB / year on the SQL Server data files plus scanned-document attachments, driven by transaction volume and document retention.

## 6. Capacity outlook

The server is approaching the end of its warranty and has limited headroom for growth in transaction volume and retained financial records. Capacity for this system is being addressed as part of YAT's broader cloud-transition planning (reducing dependency on in-house server infrastructure per the ICT Strategic Plan) rather than by like-for-like on-prem refresh — the renew-on-prem vs migrate-to-cloud decision is the subject of the current evaluation engagement.

## 7. References

- ICT Strategic Plan — five-year ICT direction including reduced in-house server dependency
- Accounting System Application Specification (ICT) — Ledgerline functional and workload profile
- Accounting System Operational Costing (ICT) — current operational cost structure
- Backup and Recovery Process (ICT) — current backup process and recovery objectives
- Hardware / Software Inventory (ICT) — wider campus inventory in which this server sits
- Network Diagram (ICT) — campus topology including the Application Services server location
