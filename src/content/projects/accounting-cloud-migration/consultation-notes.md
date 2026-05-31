---
title: 'ICT Manager Consultation Notes'
description: 'Record of the requirements consultation between YAT ICT Manager and MTS for the Accounting System Cloud Migration evaluation — current-state drivers, availability, recovery, licensing, and cutover constraints.'
appearsIn:
  - s1-cl1-at1
order: 4
uocReferences:
  - '[ICTCLD401 AC 4] data to gather information from to determine output and user requirements, including user access and business protocols'
  - '[ICTCLD502 AC 3] information and data sources required to design and implement cloud infrastructure'
  - '[ICTCLD502 AC 8] data to gather information from to determine output and user requirements, including user access and business protocols'
---

## Meeting record

| | |
|---|---|
| Subject | Accounting System — Operating-Model Evaluation: Requirements Consultation |
| Date | Wednesday 11 March 2026 |
| Time | 14:00 – 15:00 (1 hour) |
| Location | YAT College Cremorne campus — ICT Manager's office, Building A Level 2 |
| Purpose | Gather YAT's requirements for evaluating whether to renew the Accounting system on-premises or migrate it to the cloud, ahead of Business Case drafting. |

**Attendees:**

- **Sam Walker** — YAT ICT Manager (chair)
- **Pat Lin** — MTS Senior Consultant, Project Lead
- **\[Consultant\]** — MTS Consultant (this engagement) — taking notes

---

## Discussion

### Context and driver

Sam Walker opened by explaining the driver. The Application Services server hosting the Ledgerline accounting suite is about five years old and approaching the end of its warranty and capacity headroom. Rather than automatically refresh it on-premises, YAT wants MTS to evaluate the operating model — renew on-prem vs migrate to cloud — consistent with the ICT Strategic Plan's direction of reducing dependency on in-house server infrastructure. Sam was clear this is an evaluation engagement: MTS produces the analysis and a Business Case; the YAT board decides.

Sam noted YAT is running this alongside the LMS cloud migration as part of the same broader cloud-transition program, and that MTS staff rotate across YAT's engagements — so the consultant should treat this as one of several YAT engagements rather than a one-off.

### System profile and what to preserve

Sam was firm that this is an operating-model question, not a software change. The recommendation must keep the existing Ledgerline application and its Microsoft SQL Server database — no application replacement, no database-engine change. Pat confirmed the analysis would treat the application stack as fixed and focus on the hosting and operating model.

Sam flagged the commercial-licensing angle as the thing that makes this system different from the LMS: Ledgerline is licensed per user and SQL Server is licensed per core, so roughly $27,000 a year of the current cost is commercial licensing. Sam asked that the Business Case be explicit about how licensing behaves under each option — particularly whether a cloud option uses SQL Server licence-included pricing or brings YAT's existing licences.

### Availability and criticality

Sam was deliberate about not over-specifying availability. Unlike the LMS — which is student-facing, 24/7, and mission-critical — the accounting system is internal, business-hours, and has payroll outsourced. Sam set the target at **99.5% during business hours**, explicitly *not* the LMS's 99.9%, on the basis that paying for 24/7 high availability on a business-hours system would be poor value. Current measured availability is 99.3%.

### Recovery objectives

Pat asked Sam to put numbers on recovery. Sam distinguished the two:

- **Recovery point:** financial transactions must not be lost — RPO ≤ 1 hour.
- **Recovery time:** because the system is business-hours-only and payroll is outsourced, a longer recovery is tolerable — RTO ≤ 1 business day (≤ 8 business hours).

Sam contrasted this with the LMS's tighter RTO, and said this difference should show up in the design and the cost — YAT should not pay LMS-grade recovery for this system.

### Workload and scaling

Sam described the load: light and business-hours, with predictable peaks at month-end close (last 2 / first 2 business days) and end of financial year (mid-June to mid-July), reaching ~45–55 concurrent users. There is no overnight, weekend, or student-driven load. Sam wanted the recommendation to size for those predictable peaks cost-effectively rather than carry year-round capacity for an occasional peak — and noted this is a different scaling story from the LMS's assessment-window spikes.

### Data residency and retention

Sam confirmed all financial records and the personal information of staff and student debtors must remain in Australia (Privacy Act, APP 8), and that financial records and audit logs carry a seven-year retention obligation. Any cloud option must deploy in an Australian region.

### Integrations

Sam listed the integrations that must be preserved: Active Directory sign-on, Office 365 email notifications, the LMS fee-status integration, secure file transfer to the payroll bureau, and secure banking/payment-gateway file exchange.

### Cutover constraints

Sam said any future transition (a later phase, not this engagement) must avoid month-end close and the EOFY period. For this engagement, the action plan should reflect those constraints in its sequencing.

### Change management

Sam confirmed the work follows YAT's Change Management Procedure, with material spend approved by the board per the procedure's thresholds.

---

## Agreed next steps

- **MTS to produce:** 5-year cost-benefit analysis (renew on-prem vs migrate to cloud) for the Accounting system, with explicit licensing treatment.
- **MTS to produce:** draft action plan with prioritised changes, target schedule, and implementation methods.
- **MTS to produce:** board-ready Business Case and presentation.
- **Sam to confirm:** current Ledgerline and SQL Server licence terms for the CBA.
- **Submission deadline:** to be confirmed with Pat Lin.

---

*Notes written up by \[Consultant\] within 24 hours of the meeting; circulated to Sam and Pat for confirmation.*
