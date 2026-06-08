---
title: 'Engagement Role Brief'
description: 'Roles, responsibilities, and reporting lines for the 2023 MTS Website Cloud Migration — YAT’s first cloud engagement.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
  - s1-cl1-at3
  - s1-cl2-at1
  - s1-cl3-at1
order: 2
---

This brief sets out the roles, responsibilities, and reporting relationships for the **MTS Website Cloud Migration** engagement — the migration of YAT’s public website from on-premises hosting to a simple cloud-hosted environment on AWS. The Master Services Agreement is the authoritative source for engagement scope and governance; this brief was the operational reference held by each role during the engagement. The engagement closed in May 2023 and this record is retained on the intranet for reference.

## Engagement context

YAT College engaged **MTS Consulting** to migrate its public website to the cloud. The on-premises web server hosting the Website was approaching end of warranty and strained during the January–February enrolment-enquiry peaks, and YAT’s ICT Strategic Plan set a direction of reducing dependency on in-house server infrastructure.

This was **YAT’s first cloud engagement** — chosen deliberately as a **low-risk pilot**. The public website was a sensible first candidate: less business-critical than the LMS or the Accounting system, so a good place for YAT and MTS to build cloud delivery confidence before the larger, mission-critical migrations that followed. The brief for this engagement was therefore *“get the Website running in the cloud, simply and cost-effectively”* — not to make it highly available. High availability and disaster recovery were explicitly out of scope (per the MSA), an accepted limitation of the pilot.

**How MTS staffs YAT’s engagements.** MTS runs several engagements with YAT as part of YAT’s cloud-transition program and assigns its consultants across those engagements as work demands. The role, reporting lines, and standards are the same on each.

## Roles in this engagement

### MTS Consultant

The day-to-day delivery role on the MTS side.

| | |
|---|---|
| **Reports to** | Pat Lin, MTS Senior Consultant |
| **Responsibilities** | Design the simple cloud hosting environment; provision the AWS foundation; re-host the CMS and migrate the Website database, content, and static assets; configure DNS and TLS; smoke-test; support Cutover; produce as-built documentation and the operations runbook. |
| **Authorities** | Delivery within agreed scope. Does not vary scope or commit YAT to additional spend — that follows the Change Management Procedure. |
| **Key liaisons** | Pat Lin (MTS supervision); Sam Walker, YAT ICT Manager (primary YAT-side stakeholder and acceptance authority); Dana Mercer, YAT Marketing & Admissions Manager (Website business owner). |

### MTS Senior Consultant — Pat Lin

| | |
|---|---|
| **Reports to** | Jordan Chen, MTS Engagement Director |
| **Responsibilities** | Supervised the MTS Consultant’s work; liaised with the YAT ICT Manager; approved MTS deliverables before submission to YAT. |
| **Authorities** | Approved deliverables for submission; engagement-level escalation point. |
| **Key liaisons** | MTS Consultant (supervision); Sam Walker, YAT ICT Manager (engagement liaison). |

### YAT ICT Manager — Sam Walker (Engagement Sponsor)

| | |
|---|---|
| **Reports to** | YAT Chief Financial Officer |
| **Responsibilities** | Engagement Sponsor on the YAT side; primary stakeholder; acceptance authority for the deliverables; ensured the migration met YAT’s ICT policies and the Change Management Procedure. |
| **Authorities** | Per the YAT Change Management Procedure for low and medium-risk changes; escalated material spend/change to senior management. |
| **Key liaisons** | Pat Lin (engagement liaison); Dana Mercer (Website business owner); YAT CFO (escalation / approval). |

### YAT Marketing & Admissions Manager — Dana Mercer (Website business owner)

| | |
|---|---|
| **Reports to** | YAT Chief Operating Officer |
| **Responsibilities** | Business owner of the Website; confirmed the content and the enquiry / application intake function were preserved through the migration; signed off on Cutover timing to avoid the enrolment peak. |
| **Authorities** | Acceptance of Website function from a business / content perspective (distinct from the ICT Manager’s infrastructure acceptance). |
| **Key liaisons** | Sam Walker (ICT Manager); MTS Consultant (during content and enquiry-form verification). |

## Scope of the MTS engagement

**In scope for MTS (this engagement):**

- Design and build a simple, single-AZ, cost-minimal AWS hosting environment in an Australian region
- Re-host the existing CMS; migrate the Website database, content, and static assets
- Configure DNS and TLS; smoke-test; support production Cutover
- As-built documentation, operations runbook, and knowledge transfer to YAT ICT

**Out of scope — retained by YAT or deferred:**

- High availability, autoscaling, and disaster recovery (deferred — an accepted pilot limitation)
- Website content, information architecture, and visual redesign (retained by YAT Marketing)
- Domain-registrar account changes beyond Cutover DNS updates (YAT ICT)
- Ongoing operational support after stabilisation (YAT ICT)

*This mirrors the YAT/MTS scope split on YAT’s other engagements: MTS leads the cloud-infrastructure work; YAT in-house teams retain content, application/data ownership, cutover business decisions, and ongoing support.*

## Related documents

- Master Services Agreement (this engagement) — authoritative engagement terms and governance
- Website Migration Requirements (this engagement) — the requirements the migration had to meet
- ICT Manager Consultation Notes (this engagement) — the consultation the requirements were derived from
- ICT Strategic Plan (intranet ICT) — strategic direction the migration aligned to
- Change Management Procedure (intranet policies) — change governance
