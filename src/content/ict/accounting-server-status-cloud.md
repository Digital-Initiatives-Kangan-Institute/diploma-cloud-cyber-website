---
title: 'Accounting System Infrastructure Specifications'
description: 'Specifications of the AWS-hosted YAT Accounting System (Ledgerline) — compute, database, storage, network, and operating profile of the single-AZ Sydney deployment.'
appearsIn:
  - s1-cl1-at3
  - s1-cl2-at1
  - s1-cl3-at1
order: 15
uocReferences:
  - '[ICTICT517 AC 5] Information on current ICT systems and practices in the organisation including operating systems, hardware, and security'
  - '[ICTCLD502 PC 2.3] Estimate recovery objectives for multi-tier web components and for overall architecture'
---

## Document control

| | |
|---|---|
| Document title | Accounting System (Ledgerline) — Infrastructure Specifications |
| Document owner | Sam Walker, ICT Manager |
| Prepared by | YAT ICT |
| Review cycle | Annual, or on material change to the infrastructure or its operating profile |
| Classification | Internal — ICT, Finance, and engaged consultants on signed MSA |

## 1. Purpose

This document records the current specifications of the AWS-hosted YAT **Ledgerline** accounting and office-administration system — compute, database, storage, network, and operating profile. It is the authoritative record for the Ledgerline workload and the planning input for any work that touches it — capacity, availability, recoverability, or onward improvement.

## 2. System description

**Ledgerline** is YAT's finance and office-administration system — general ledger, accounts payable/receivable, student fee billing, procurement, and asset management. Payroll is outsourced to an external bureau and does not run on this system. It serves YAT's finance and administrative staff only; it is an internal back-office system, not public-facing.

Migrated from its former on-premises Application Services server, Ledgerline now runs as a multi-tier workload in AWS region `ap-southeast-2` (Sydney). Staff reach it from the campus over the Site-to-Site VPN; the system is not exposed to the public Internet. YAT retains MP Tech Solutions (MTS) for application support of the Ledgerline layer.

## 3. Infrastructure summary

| Attribute | Value |
|---|---|
| Workload type | Multi-tier internal app — internal load balancer, application tier, database tier |
| AWS region | `ap-southeast-2` (Sydney) |
| Availability zones in use | `ap-southeast-2a` (single-AZ baseline) |
| Application OS | Windows Server 2016 (preserved from pre-migration) |
| Database engine | Amazon RDS for Microsoft SQL Server |
| Access path | Internal only — staff reach it over the Site-to-Site VPN; no public ingress |
| Criticality | Business-important (payroll outsourced; not 24/7 mission-critical) |
| Target availability | 99.5% (business-hours service) |
| Current deployment state | Single-AZ baseline — high-availability hardening is a candidate for future improvement |

## 4. Component specifications

### 4.1 Application tier — EC2

| Attribute | Value |
|---|---|
| Instance family | General-purpose x86 (e.g. `m6i.large` / `m5.large`) |
| AMI | Windows Server 2016 + the Ledgerline Finance & Office Suite |
| Placement | `private-app-a` (single-AZ) |
| Auto Scaling Group | min=1, desired=1, max=2 |
| Scaling policy | Target tracking on CPU at 70% (absorbs the month-end close peak) |
| EBS volumes | `gp3` — OS volume plus an application/data volume sized to the footprint + 12-month growth |

### 4.2 Internal Application Load Balancer

| Attribute | Value |
|---|---|
| Type | **Internal** Application Load Balancer (not internet-facing) |
| Placement | `private-app-a` |
| Listener | HTTPS:443 → Ledgerline target group |
| TLS certificate | ACM-issued (private) |
| Reachability | From the campus over the Site-to-Site VPN only |

### 4.3 Database tier — Amazon RDS for SQL Server

| Attribute | Value |
|---|---|
| Engine | Amazon RDS for Microsoft SQL Server (Standard edition) |
| Instance class | General-purpose (e.g. `db.m6i.large` / `db.m5.large`) |
| Multi-AZ | Disabled (single-AZ baseline) |
| Storage | `gp3`, sized to the ~22 GB SQL Server data footprint + growth |
| Storage encryption | Enabled (AWS KMS) |
| Placement | `private-data-a` (single-AZ); not publicly accessible |
| Backup retention | 7 days, automated |

### 4.4 Storage — Amazon S3

| Bucket | Purpose | Configuration |
|---|---|---|
| `yat-ledgerline-backups-…` | Off-instance database and document-attachment backups | Versioned; private; access-logged |

### 4.5 Network

| Attribute | Value |
|---|---|
| VPC | Ledgerline VPC, single-AZ |
| Subnets | `private-app-a` (EC2 + internal ALB), `private-data-a` (RDS) |
| Internet egress | Single NAT Gateway for outbound patching / updates |
| Campus connectivity | Site-to-Site VPN (campus edge ↔ AWS VPN Gateway) — the sole staff access path |
| Public ingress | None — internal back-office system |

## 5. Usage patterns

- **Daily pattern:** business hours only, Monday–Friday ~07:30–18:00. Effectively idle overnight and at weekends.
- **Monthly peak:** month-end close (last 2 and first 2 business days) drives the highest concurrent load (~45–55 users) and the heaviest reporting/transaction workload; the ASG absorbs it.
- **Annual peak:** end of financial year (mid-June to mid-July) — statutory reporting and audit preparation.
- **Annual data growth:** ~5 GB / year on the SQL Server data files plus scanned-document attachments.

## 6. Capacity outlook

- **Application / database tiers.** The single small EC2 instance (with its ASG) and database comfortably serve the business-hours load, including month-end close; capacity is not the constraint.
- **Resilience.** The single Availability Zone and single (non-Multi-AZ) database are accepted single points of failure of the migration baseline, consistent with the system's business-hours criticality. Resilience — not capacity — is the outstanding limitation and the natural subject of any future improvement work.

## 7. References

- ICT Strategic Plan — five-year ICT direction including reduced in-house server dependency
- Accounting System Application Specification — Ledgerline functional and workload profile
- Accounting System Cloud Architecture — Baseline Design — design of the AWS Ledgerline environment, including backup mechanisms
- Hardware / Software Inventory — wider inventory in which this workload sits
- Network Diagram — campus and AWS topology including the Ledgerline environment location
