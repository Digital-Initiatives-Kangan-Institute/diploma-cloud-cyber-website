---
title: 'ICT Operational Costing — LMS'
description: 'ICT operational costing baseline for the Learning Management System — recurring operating costs, capital outlook, and planning assumptions.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
  - s1-cl1-at3
order: 11
yearOffset: 0
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
| Effective from | Current operating year (commencement) |
| Review cycle | Annual, or on material change to LMS operating model |
| Classification | Internal — ICT, Finance, and engaged consultants on signed MSA |
| Currency | Australian Dollars (AUD), exclusive of GST, at current price levels |

## 1. Purpose

This document sets out the current operational costing baseline for YAT's on-premises Learning Management System (LMS) and the common planning assumptions used by ICT when evaluating changes to the LMS operating model. It draws together cost lines from the current operating year's ICT budget, facilities allocations, software licensing records, and YAT's existing external support contracts.

The document is referenced when ICT reviews, change proposals, or external engagements need a consistent, current view of what the LMS costs YAT today. Prior-year operational costing records are filed alongside this document for trend-analysis purposes.

## 2. Common planning assumptions

| Assumption | Value | Source |
|---|---|---|
| LMS user population | ~800 students + ~60 staff | YAT organisational records |
| Concurrent users (typical / peak) | 200–300 / 500–700 | LMS Application Specification |
| Annual student growth | +15% per year | YAT Business Objectives — affects capacity-planning assumptions in out-years |
| Current measured LMS availability | 99.2% | LMS server operational records |
| Target LMS availability | 99.9% | ICT Strategic Plan |
| Indicative cost of downtime to YAT | $750 per hour during teaching hours, $0 outside teaching hours | YAT-estimated; reflects student impact, staff productivity, reputational risk |
| Fully-loaded ICT FTE cost | $115,000 per FTE / year | Salary + superannuation + on-costs |
| ICT planning horizon for LMS | 5 years | ICT Strategic Plan |
| Productive hours per FTE per year | ~1,820 | YAT Finance convention |

## 3. Current on-premises LMS — operational costing

### 3.1 Recurring operating costs (per year)

| Category | Item | Annual cost |
|---|---|---:|
| Software licensing | Windows Server Standard (per-server) | $1,500 |
| | Antivirus / EDR (server) | $300 |
| | Monitoring and management tooling | $2,000 |
| Power and facilities | Electricity for LMS server + cooling allocation | $1,200 |
| | LMS share of server-room rent / cooling allocation | $5,000 |
| | UPS battery replacement (amortised annually) | $500 |
| Backup | Tape media (annual consumption) | $1,500 |
| | Offsite tape storage service contract | $2,400 |
| | Backup software maintenance | $1,500 |
| Staff time (YAT ICT) | LMS administration, patching, monitoring (~0.20 FTE) | apply FTE rate from §2 |
| | Incident response (~0.05 FTE) | apply FTE rate from §2 |
| External support | Current MTS application support contract (ongoing) | $30,000 |

### 3.2 Capital outlook — operating-model considerations

The current LMS server is **approaching end-of-supportable-life**. Continuing the on-prem operating model requires a one-off hardware and ancillary refresh in the near term; alternatively, an operating-model change (managed hosting or cloud migration) becomes viable.

| Refresh item (if continuing on-prem) | Indicative cost |
|---|---:|
| Replacement LMS server (mid-range enterprise, dual PSU, RAID-10 SSDs, 5-year warranty) | $25,000 |
| Backup tape library refresh + drive | $8,000 |
| UPS upgrade (server-room rack UPS) | $3,000 |
| Migration labour to move LMS to new server (one-off, in-house) | $15,000 |

These figures are the cost basis against which any alternative operating model is compared.

## 4. Cost categorisation framework for change proposals

When changes to the LMS operating model are evaluated, the cost lines fall into three cost-bearer categories. Any change proposal — internal or by an engaged consultant — must address all three to give YAT leadership a complete view:

1. **External consultant-priced costs** — fees payable to any engaged consultancy for design, build, and ongoing infrastructure support work delivered under a Master Services Agreement.
2. **Direct vendor / cloud-platform costs** — fees payable directly to platform vendors (cloud service charges, software licensing not bundled into existing agreements).
3. **YAT-internal costs** — work YAT in-house IT undertakes itself. For the LMS this typically includes:
   - **Project oversight + acceptance** — ICT staff time during any external delivery (requirements coordination, milestone meetings, acceptance testing). Indicative: ~0.30 FTE × 6 months for a project of LMS-migration scale.
   - **Application deployment** — installing the DOODLE LMS application onto whatever infrastructure is provided. Indicative: ~80–120 hours.
   - **Data migration** — extract, transform, and load of the MySQL database, including post-migration verification. Indicative: ~60–100 hours.
   - **Cutover** — parallel running of old + new environments during transition (~1–2 months of dual-running cost), DNS switch, user redirection, post-cutover incident response ramp. Indicative effort: ~40–60 hours plus the parallel-running infrastructure cost.
   - **Organisational change management** — Change Advisory Board process per the ICT Change Management Procedure, end-user communications (staff + students), training collateral preparation and delivery, post-cutover support ramp. Indicative: ~80–120 hours of ICT + Administrative staff time.
   - **Decommissioning of any displaced infrastructure** — hardware retirement, secure data destruction per the Privacy / Data Handling Policy and records management obligations, facility reclamation. Indicative: ~$2,500 in materials + ~16 hours of ICT time.

Apply the FTE / hours figures in §2 to convert effort estimates to dollars (1 FTE-year ≈ 1,820 productive hours).

## 5. Operational considerations and ICT priorities

In addition to direct cost comparison, the following operational factors are material to any LMS operating-model decision and are weighted by YAT leadership in change reviews:

- **Avoided downtime.** Lifting LMS availability from the current 99.2% to the target 99.9% reduces unplanned downtime by ~61 hours per year. Applying the $750/hour figure from §2 yields an indicative avoided-cost range — actual figure depends on what fraction of that downtime would have fallen during teaching hours.
- **Capacity for student growth.** The 15% annual growth trajectory requires capacity headroom across all options; capacity planning is a standing consideration in any operating-model decision.
- **Capacity for assessment-week peaks.** The LMS sees approximately 3× concurrent load during the two-week assessment submission windows each term. Any operating model must handle these peaks without degradation.
- **Staff capability development.** YAT ICT staff currently have limited cloud-operations experience. Any move to a cloud operating model has implications for staff upskilling and the residual external support requirement.
- **Cloud migration as an active option.** Cloud migration is currently an active planning option in YAT's ICT roadmap; an external engagement to scope and deliver is in flight (see Projects).
- **Vendor dependency, sustainability, cyber security maturity, disaster recovery (whole-campus loss), data residency.** Each is captured in YAT's broader ICT strategic-plan considerations and surfaces in any material change decision.

## 6. References

- ICT Strategic Plan — five-year ICT direction, target availability, growth assumptions
- LMS Application Specification — LMS workload and concurrency profile
- Change Management Procedure (intranet policies) — change governance referenced in §4 and §5
- Privacy / Data Handling Policy (intranet policies) — data residency and secure-destruction obligations
- Prior-year operational costing records — filed in this section for trend reference
