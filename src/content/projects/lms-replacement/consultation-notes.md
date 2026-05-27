---
title: 'ICT Manager Consultation Notes'
description: 'Record of the requirements consultation between YAT ICT Manager and AccentLoitte for the 2022 LMS Replacement engagement — replacement-platform selection criteria, on-prem mandate, data preservation, cutover constraints.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
  - s1-cl1-at3
order: 4
uocReferences:
  - '[ICTCLD401 AC 4] data to gather information from to determine output and user requirements, including user access and business protocols'
  - '[ICTCLD502 AC 3] information and data sources required to design and implement cloud infrastructure'
  - '[ICTCLD502 AC 8] data to gather information from to determine output and user requirements, including user access and business protocols'
---

> **Engagement closed 16 December 2022.** Retained on the YAT intranet for reference and audit per the YAT Records Management Policy.

## Meeting record

| | |
|---|---|
| Subject | LMS Replacement — Requirements Consultation |
| Date | Wednesday 23 February 2022 |
| Time | 09:30 – 11:00 (1 hour 30 minutes) |
| Location | YAT College Cremorne campus — ICT Manager's office, Building A Level 2 |
| Purpose | Gather YAT's functional and non-functional requirements for the GrayBoard LMS replacement, ahead of LMS selection and implementation planning. |

**Attendees:**

- **Sam Walker** — YAT ICT Manager (chair)
- **Jamie O'Donnell** — AccentLoitte Senior Consultant, Project Lead
- **\[Consultant\]** — AccentLoitte Consultant (this engagement) — taking notes

---

## Discussion

### Context and platform end-of-life

Sam Walker opened by setting out the driver for the engagement. The legacy GrayBoard LMS had reached end-of-supportable-life: the upstream community had thinned out, security patching had become inconsistent, and effective availability had been trending down through 2021. Senior YAT ICT staff had concluded that further patching was not a sustainable path and that GrayBoard should be replaced rather than upgraded in place.

Sam noted that YAT was looking for a contemporary commercial LMS with active vendor support, an active user community, and a credible long-term product roadmap. The selection was open — DOODLE was on the shortlist but not the only candidate at this point — and Sam wanted AccentLoitte's Phase 1 evaluation to make the recommendation against YAT's functional requirements, total cost of ownership, RTO-sector fit, and vendor longevity.

### On-premises deployment

Sam was firm that the Replacement LMS was to be deployed on-premises at the YAT Cremorne campus, consistent with YAT's then-current ICT operating model. Jamie asked whether cloud hosting was on the table as part of the evaluation. Sam said no — cloud was noted in YAT's broader ICT thinking as a future consideration, but for this engagement on-prem was the mandate. The replacement was about platform currency, not operating-model change.

Sam confirmed the Replacement LMS had to be compatible with YAT's then-current server operating system standard for on-prem application hosting (Windows Server 2016).

### Student record preservation

Sam was emphatic on this point. YAT's obligations under the *Standards for Registered Training Organisations 2015* required long-tail retention of student records. **No records were to be lost in the migration.** Sam wanted post-migration record counts to reconcile against pre-migration counts, and a meaningful sample of records to be verified for content fidelity (not just row counts).

Jamie noted that the Phase 1 implementation plan would specify the extract / transform / load approach, the reconciliation method, and the sample-verification protocol. Sam asked that the YAT Education Director be brought into the sample verification step to confirm assessment-content fidelity in particular.

### Availability and performance

Sam said the Replacement LMS had to deliver a meaningful step up from GrayBoard's degrading effective availability. He proposed a baseline target of 99% as the threshold for go-live acceptance — explicitly framed as "better than what we have now" rather than as a stretch target. Sam noted that any tighter availability commitment would require operating-model investment that was not in scope for this engagement.

On performance, Sam asked that typical-load response times be no worse than GrayBoard's measured performance pre-replacement, and ideally improved. The peak-load profile — roughly 3× concurrent users during the final two weeks of each term — was a known characteristic of YAT's LMS use; the Replacement LMS had to handle the same peak shape without significant degradation. Jamie confirmed that load-testing against the historical profile would be part of Phase 2 validation.

### Cutover constraints

Sam said the only acceptable Cutover window was the December–January teaching break. Active teaching periods could not be disrupted, and Sam was prepared to push the engagement timeline (rather than the cutover window) if Phase 2 ran long. Jamie acknowledged the constraint and said the Phase 1 implementation plan would be built backwards from a December Cutover.

### Training delivery

Sam wanted all teaching and administrative staff who interact with the LMS to receive role-appropriate training **before** Cutover, not after, so the post-Cutover support burden could be contained. He noted that YAT had run a previous LMS rollout where training had slipped to after go-live and the support load had been "unmanageable" — he was not prepared to repeat that. Jamie said Phase 3 training delivery would be structured around pre-Cutover sessions, with reference materials and shorter refresher sessions retained for the stabilisation period.

### Integrations

Sam listed the integrations the Replacement LMS had to support:

- Active Directory authentication (single sign-on for staff and students)
- Office 365 SMTP for email notifications generated by the LMS
- AVETMISS / ASQA statutory reporting export capability
- YAT-internal LDAP-based user-group structures (per the User Access Policy in force at the time)

Sam noted that any candidate LMS that could not meet the AVETMISS export requirement out of the box was effectively disqualified.

### Accessibility

Sam confirmed that the Replacement LMS had to meet WCAG 2.1 Level AA to support YAT's obligations under the *Disability Discrimination Act 1992* (Cth). Jamie said vendor WCAG conformance statements would be obtained as part of the Phase 1 evaluation and validated against an independent audit during Phase 2.

### Vendor support

Sam set the vendor support expectation at severity-1 incident response within 4 hours during YAT teaching hours and 8 hours outside teaching hours. He acknowledged this was a relatively conservative tier compared with what YAT might want for a future cloud-era LMS, but it was appropriate for the on-prem operating model where the YAT ICT team would handle first-line response and only escalate to the vendor for application-level issues.

### Change management

Sam confirmed the replacement would follow YAT's documented Change Management Procedure. Acceptance of each Deliverable would be by the ICT Manager (Sam) per the MSA, with material changes — including the Cutover itself, as a high-risk change — requiring senior management sign-off.

---

## Agreed next steps

- **AccentLoitte to produce:** Phase 1 LMS market evaluation against YAT's functional and non-functional requirements.
- **AccentLoitte to produce:** Replacement LMS recommendation with rationale.
- **AccentLoitte to produce:** Implementation Plan covering deployment, data migration, Cutover, and training (Deliverable D1.3).
- **AccentLoitte to produce:** formal Requirements document derived from this consultation (filed against this project).
- **YAT to confirm:** Education Director's availability for the data-migration sample-verification step.
- **Submission deadline for Phase 1 deliverables:** end of May 2022, per the MSA Phase 1 schedule.

---

*Notes written up by \[Consultant\] within 24 hours of the meeting; circulated to Sam and Jamie for confirmation.*
