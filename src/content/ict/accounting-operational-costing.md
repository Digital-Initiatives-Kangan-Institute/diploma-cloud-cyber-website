---
title: 'Accounting System Operational Costing'
description: 'Current on-premises operational costing baseline for the YAT Accounting & Office Administration system (Ledgerline) — recurring operating costs, commercial licensing, capital outlook, and planning assumptions.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
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

This document records the current on-premises operational costing baseline for YAT's Accounting & Office Administration system (Ledgerline) and the common planning assumptions used by ICT and Finance. It is the cost input for evaluating the renew-on-prem vs migrate-to-cloud options for this system.

## 2. Common planning assumptions

| Assumption | Value | Source |
|---|---|---|
| User population | ~60 staff (≈6 finance, ≈20 admin, ≈34 management/general) | YAT organisational records |
| Concurrent users (typical / peak) | 15–25 / 45–55 (month-end) | Accounting System Application Specification |
| Measured availability (business hours) | 99.3% | Server operational records |
| Target availability | 99.5% | ICT Strategic Plan (business-hours service) |
| Indicative cost of downtime | $400 per hour during business hours; $0 outside business hours | YAT-estimated (lower than the LMS — internal, business-hours, payroll outsourced) |
| Fully-loaded ICT FTE cost | $115,000 per FTE / year | Salary + superannuation + on-costs |
| ICT planning horizon | 5 years | ICT Strategic Plan |

## 3. On-premises Accounting System — operational costing (current year)

### 3.1 Recurring operating costs (per year)

| Category | Item | Annual cost |
|---|---|---:|
| Software licensing | **Ledgerline per-user licences (commercial)** | $18,000 |
| | **Microsoft SQL Server Standard (per-core)** | $7,500 |
| | Windows Server Standard (per-server) | $1,500 |
| | Antivirus / EDR (server) | $300 |
| | Monitoring / management tooling | $1,200 |
| Vendor support | Ledgerline annual support & maintenance contract | $9,000 |
| Power and facilities | Electricity + cooling allocation | $900 |
| | Server-room rent allocation | $4,500 |
| | UPS battery (amortised) | $450 |
| Backup | Tape media + offsite storage (shared backup service allocation) | $2,800 |
| Staff time (YAT ICT) | Administration, patching, monitoring (~0.12 FTE × $115k) | $13,800 |
| | Incident response (~0.03 FTE × $115k) | $3,450 |
| **Recurring per year** | | **$62,900** |

*Note the cost shape that differentiates this system from the LMS: roughly **$27k/year of commercial licensing** (Ledgerline + SQL Server) that the open-source LMS stack does not carry. Cloud licensing treatment (e.g. licence-included vs bring-your-own-licence for SQL Server) is therefore a material factor in this system's cost-benefit analysis.*

### 3.2 Capital outlook — operating-model considerations

The Application Services server is approaching the end of its warranty and capacity headroom. If YAT continued on-premises, an indicative refresh would be required within the next 1–2 years:

| Refresh item (if continuing on-prem) | Indicative cost |
|---|---:|
| Replacement server (mid-range) | $18,000 |
| SQL Server re-licensing on new hardware | $7,500 |
| UPS / rack allowance | $2,000 |
| One-off internal migration labour to new server | $9,000 |

## 4. Cost categorisation framework for change proposals

Any change proposal for this system addresses the same three cost-bearer categories used across YAT ICT change evaluations:

1. **External consultant-priced costs** — fees payable to any engaged consultancy.
2. **Direct vendor / cloud-platform costs** — fees payable directly to platform and software vendors (incl. commercial licensing).
3. **YAT-internal costs** — work YAT in-house IT undertakes itself.

## 5. Operational considerations and ICT priorities

- **Commercial licensing weight.** Unlike the LMS, ~$27k/year of this system's cost is commercial software licensing — cloud options that change the licensing model (e.g. SQL Server licence-included pricing, or a managed database) materially affect the comparison.
- **Availability headroom.** Lifting business-hours availability from 99.3% to the 99.5% target offers a modest avoided-downtime benefit; the system is not 24/7 mission-critical.
- **Capacity for growth.** Transaction volume and retained financial records grow steadily; the current server has limited headroom before refresh.
- **Cloud transition.** Reducing dependency on in-house server infrastructure is a stated ICT Strategic Plan direction; this system is a candidate alongside others in YAT's roadmap.

## 6. References

- ICT Strategic Plan — five-year ICT direction
- Accounting System Application Specification — workload and concurrency profile
- Accounting System Server Specifications — current server state
- Change Management Procedure (intranet policies)
- Privacy / Data Handling Policy (intranet policies)
