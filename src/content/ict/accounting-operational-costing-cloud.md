---
title: 'Accounting System Operational Costing'
description: 'Current AWS operational costing for the YAT Accounting & Office Administration system (Ledgerline) — recurring cloud operating costs, commercial licensing, and planning assumptions for the single-AZ Sydney deployment.'
appearsIn:
  - s1-cl1-at3
  - s1-cl2-at1
  - s1-cl3-at1
order: 16
uocReferences:
  - '[ICTICT517 PC 3.1] Develop action plan to implement proposed changes including prioritised schedule and consistency with organisational policy and procedures'
  - '[ICTICT517 KE 1] Key sections of an action plan for ICT implementation projects'
  - '[ICTICT517 FS Numeracy] Interprets numerical data and applies mathematical calculations to assess the financial implications of introducing changes'
---

## Document control

| | |
|---|---|
| Document title | Accounting System — Operational Costing |
| Document owner | Sam Walker, ICT Manager |
| Prepared by | YAT ICT in conjunction with YAT Finance |
| Review cycle | Annual |
| Classification | Internal — ICT, Finance, and engaged consultants on signed MSA |
| Currency | Australian Dollars (AUD), exclusive of GST, at current price levels |

## 1. Purpose

This document records the current AWS operational costing for YAT's Accounting & Office Administration system (Ledgerline), now running as a single-Availability-Zone workload in AWS Sydney, and the common planning assumptions used by ICT and Finance. It is the cost input for any change proposal that touches this system — including onward improvement of the cloud infrastructure.

## 2. Common planning assumptions

| Assumption | Value | Source |
|---|---|---|
| User population | ~60 staff (≈6 finance, ≈20 admin, ≈34 management/general) | YAT organisational records |
| Concurrent users (typical / peak) | 15–25 / 45–55 (month-end) | Accounting System Application Specification |
| Availability (business hours) | 99.5% (target met post-migration) | Cloud operational records |
| Indicative cost of downtime | $400 per hour during business hours; $0 outside business hours | YAT-estimated (lower than the LMS — internal, business-hours, payroll outsourced) |
| Fully-loaded ICT FTE cost | $115,000 per FTE / year | Salary + superannuation + on-costs |
| ICT planning horizon | 5 years | ICT Strategic Plan |

## 3. AWS Accounting System — operational costing (current year)

### 3.1 Recurring operating costs (per year)

| Category | Item | Annual cost |
|---|---|---:|
| Software licensing | **Ledgerline per-user licences (commercial)** | $18,000 |
| | Antivirus / EDR (EC2 instance) | $300 |
| AWS platform | EC2 — Ledgerline application (Windows, single-AZ, business-hours profile) | $3,000 |
| | **Amazon RDS for SQL Server (single-AZ, licence-included)** | $9,000 |
| | Amazon S3 (backups) + data transfer | $600 |
| | Internal ALB + NAT Gateway | $1,200 |
| | CloudWatch monitoring / logs | $600 |
| Vendor support | Ledgerline annual support & maintenance contract | $9,000 |
| Staff time (YAT ICT) | Administration, patching, monitoring (~0.08 FTE × $115k — reduced; managed database) | $9,200 |
| | Incident response (~0.02 FTE × $115k) | $2,300 |
| **Recurring per year** | | **$53,200** |

*The commercial-licensing weight that differentiates this system from the open-source LMS stack persists — the **$18k/year Ledgerline per-user licensing** remains, while the previous separate **SQL Server licence** is now absorbed into **licence-included RDS** pricing rather than a standalone per-core licence. There is no longer an on-premises server-refresh capital cost: the operating model is now wholly opex.*

### 3.2 Operating-model note

Migrating to AWS removed the in-1–2-years on-premises server-refresh capital exposure (replacement server, SQL re-licensing, UPS/rack, internal migration labour) carried in the prior on-premises costing. The system now scales within its Auto Scaling Group for the month-end peak without a capacity-driven hardware step, and licence-included RDS converts the SQL Server licence from a capital re-licensing event into a per-hour operating cost.

## 4. Cost categorisation framework for change proposals

Any change proposal for this system addresses the same three cost-bearer categories used across YAT ICT change evaluations:

1. **External consultant-priced costs** — fees payable to any engaged consultancy.
2. **Direct vendor / cloud-platform costs** — fees payable directly to platform and software vendors (incl. commercial licensing and AWS usage).
3. **YAT-internal costs** — work YAT in-house IT undertakes itself.

## 5. Operational considerations and ICT priorities

- **Commercial licensing weight.** ~$18k/year of this system's cost remains commercial Ledgerline licensing; any change that affects the application licensing model materially affects the comparison.
- **Database licensing model.** SQL Server now runs as licence-included RDS — a managed, per-hour cost rather than a standalone per-core licence and a re-licensing event at each hardware refresh.
- **Resilience vs cost.** The single-AZ baseline keeps cost down and suits the business-hours criticality; any move to Multi-AZ would add a standby database and cross-AZ capacity cost, weighed against the modest avoided-downtime benefit.
- **Right-sizing.** As an internal, business-hours workload, the EC2 application tier is a candidate for scheduled stop/start outside business hours to reduce compute cost further.

## 6. References

- ICT Strategic Plan — five-year ICT direction
- Accounting System Application Specification — workload and concurrency profile
- Accounting System Infrastructure Specifications — current AWS operational state
- Accounting System Cloud Architecture — Baseline Design — the deployed single-AZ architecture
- Change Management Procedure (intranet policies)
- Privacy / Data Handling Policy (intranet policies)
