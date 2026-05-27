---
title: 'ICT Operational Costing — LMS'
description: 'ICT operational costing baseline for the Learning Management System — recurring operating costs, capital outlook, and planning assumptions.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
  - s1-cl1-at3
order: 12
yearOffset: -1
uocReferences:
  - '[ICTICT517 PC 3.1] Develop action plan to implement proposed changes including prioritised schedule and consistency with organisational policy and procedures'
  - '[ICTICT517 KE 1] Key sections of an action plan for ICT implementation projects'
  - '[ICTICT517 FS Numeracy] Interprets numerical data and applies mathematical calculations to assess the financial implications of introducing changes'
---

## Document control

| | |
|---|---|
| Document title | ICT Operational Costing — Learning Management System |
| Document owner | Sam Walker, ICT Manager |
| Prepared by | YAT ICT in conjunction with YAT Finance |
| Effective from | Prior operating year (commencement) |
| Review cycle | Annual — superseded by the current-year operational costing |
| Classification | Internal — ICT, Finance, and engaged consultants on signed MSA |
| Currency | Australian Dollars (AUD), exclusive of GST, at prior-year price levels |

## 1. Purpose

This document recorded the operational costing baseline for YAT's on-premises Learning Management System (LMS) during the prior operating year, and the common planning assumptions used by ICT at that time. It is retained alongside the current-year baseline for trend-analysis purposes and to support audit of historical operating-cost decisions.

## 2. Common planning assumptions

| Assumption | Value | Source |
|---|---|---|
| LMS user population | ~770 students + ~58 staff | YAT organisational records (prior year) |
| Concurrent users (typical / peak) | 200–290 / 480–680 | LMS Application Specification |
| Annual student growth | +15% per year | YAT Business Objectives |
| Measured LMS availability (prior year) | 99.3% | LMS server operational records |
| Target LMS availability | 99.9% | ICT Strategic Plan |
| Indicative cost of downtime to YAT | $720 per hour during teaching hours, $0 outside teaching hours | YAT-estimated |
| Fully-loaded ICT FTE cost | $110,000 per FTE / year | Salary + superannuation + on-costs |
| ICT planning horizon for LMS | 5 years | ICT Strategic Plan |
| Productive hours per FTE per year | ~1,820 | YAT Finance convention |

## 3. On-premises LMS — operational costing for the prior year

### 3.1 Recurring operating costs (per year)

| Category | Item | Annual cost |
|---|---|---:|
| Software licensing | Windows Server Standard (per-server) | $1,425 |
| | Antivirus / EDR (server) | $290 |
| | Monitoring and management tooling | $1,900 |
| Power and facilities | Electricity for LMS server + cooling allocation | $1,100 |
| | LMS share of server-room rent / cooling allocation | $4,900 |
| | UPS battery replacement (amortised annually) | $475 |
| Backup | Tape media (annual consumption) | $1,425 |
| | Offsite tape storage service contract | $2,300 |
| | Backup software maintenance | $1,425 |
| Staff time (YAT ICT) | LMS administration, patching, monitoring (~0.20 FTE) | apply FTE rate from §2 |
| | Incident response (~0.05 FTE) | apply FTE rate from §2 |
| External support | Current MTS application support contract (ongoing) | $28,500 |

### 3.2 Capital outlook — operating-model considerations

The LMS server was at **mid-operational-life** at the time of this costing. Refresh was not immediately required but was identified as a likely consideration in the following 2–3 years. Indicative refresh figures were included in this baseline for planning continuity.

| Refresh item (if continuing on-prem) | Indicative cost |
|---|---:|
| Replacement LMS server (mid-range enterprise) | $24,000 |
| Backup tape library refresh + drive | $7,800 |
| UPS upgrade (server-room rack UPS) | $2,800 |
| Migration labour to move LMS to new server (one-off, in-house) | $14,250 |

## 4. Cost categorisation framework for change proposals

When changes to the LMS operating model were evaluated, the cost lines fell into three cost-bearer categories. Any change proposal — internal or by an engaged consultant — was required to address all three:

1. **External consultant-priced costs** — fees payable to any engaged consultancy.
2. **Direct vendor / cloud-platform costs** — fees payable directly to platform vendors.
3. **YAT-internal costs** — work YAT in-house IT undertakes itself (project oversight, application deployment, data migration, cutover, change management, decommissioning).

Effort estimates for YAT-internal costs followed the same pattern as recorded in the current-year baseline; see the current-year operational costing document for the per-task indicative effort.

## 5. Operational considerations and ICT priorities

The following operational factors were material to any LMS operating-model decision at the time:

- **Avoided downtime.** Lifting LMS availability from the prior-year baseline to the target 99.9% reduces unplanned downtime by ~50–60 hours per year. The avoided-cost indicative range depends on what fraction of downtime falls during teaching hours.
- **Capacity for student growth.** The 15% annual growth trajectory requires capacity headroom across all options.
- **Capacity for assessment-week peaks.** Approximately 3× concurrent load during the two-week assessment submission windows each term.
- **Staff capability development.** YAT ICT staff have limited cloud-operations experience.
- **Cloud migration as a future consideration.** Cloud migration was noted in the ICT Strategic Plan as a future consideration for the LMS, but no engagement was scoped at the time of this costing.

## 6. References

- ICT Strategic Plan — five-year ICT direction
- LMS Application Specification — LMS workload and concurrency profile
- Change Management Procedure (intranet policies)
- Privacy / Data Handling Policy (intranet policies)
- Current-year operational costing — superseding record
