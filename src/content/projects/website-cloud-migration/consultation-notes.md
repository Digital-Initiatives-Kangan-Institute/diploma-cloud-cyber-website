---
title: 'ICT Manager Consultation Notes'
description: 'Record of the requirements consultation between YAT and MTS for the 2023 website cloud migration pilot — drivers, system profile, availability, recovery, integrations, and cutover constraints.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
  - s1-cl1-at3
  - s1-cl2-at1
  - s1-cl3-at1
order: 4
---

## Meeting record

| | |
|---|---|
| Subject | Website Cloud Migration — Requirements Consultation |
| Date | Wednesday 8 February 2023 |
| Time | 10:00 – 11:00 (1 hour) |
| Location | YAT College Cremorne campus — ICT Manager’s office, Building A Level 2 |
| Purpose | Gather YAT’s requirements for migrating the public website from on-premises hosting to the cloud, ahead of the migration design. |

**Attendees:**

- **Sam Walker** — YAT ICT Manager (chair)
- **Dana Mercer** — YAT Marketing & Admissions Manager (Website business owner)
- **Pat Lin** — MTS Senior Consultant, Project Lead
- **MTS Consultant** — taking notes

---

## Discussion

### Context and driver

Sam Walker opened by framing the engagement. YAT’s public website — the marketing site, course catalogue, and online enquiry / application intake — runs on a single on-premises web server that is approaching end of warranty. Each January–February, as enrolment enquiries spike, the server strains and the site slows. Rather than refresh the hardware, YAT wants to move the Website to the cloud, consistent with the ICT Strategic Plan’s direction of reducing in-house server dependency.

Sam was explicit that this is **YAT’s first cloud project**, chosen deliberately as a **low-risk pilot**. The public website is less business-critical than the LMS or the Accounting system, so it is the right place for YAT and MTS to build confidence with cloud delivery before the larger migrations that will follow. Sam framed the goal as *“get it running in the cloud, simply and affordably, and learn from it”* — not to gold-plate it.

### System profile and what to preserve

Dana Mercer described the Website from the business side: it is YAT’s public shopfront and the front door for prospective students. The most important function is the enquiry / application intake form — submissions must reach the Admissions team and flow into student administration. Dana was firm that the content and the site as visitors see it must not change through the migration; this is a hosting move, not a redesign. Pat confirmed MTS would treat the CMS and content as fixed and migrate the site as-is.

### Availability and criticality

Sam was deliberate about *not* over-specifying availability. The Website matters, but it is not mission-critical in the way the LMS is — a short outage is an inconvenience, not a teaching or financial emergency. For the pilot, Sam did not want to pay for high availability: **no formal availability SLA, and a single-Availability-Zone deployment is acceptable.** He acknowledged this leaves the site without redundancy and noted it should be revisited once YAT has more cloud experience — but for a first pilot on the lowest-risk system, simple and cheap was the right call.

### Recovery

Pat raised data protection and recovery. Sam asked for **routine automated database backups** so submitted enquiry and application records are not lost, but was clear that a **formal disaster-recovery strategy with a tested recovery-time objective was out of scope** for this engagement. Backups for basic protection; no committed RTO/RPO. Sam again flagged this as a known gap to address in a later engagement.

### Workload

Dana described the load pattern: light for most of the year, with a pronounced peak across the **January–February enrolment-enquiry period** and smaller bumps around each intake. The cloud deployment should handle those peaks without the slowdown seen on-premises, but Sam did not want year-round capacity carried for an occasional peak — size it sensibly for the peak and keep the baseline cost low.

### Data residency

Sam confirmed that website content and the personal information captured in enquiry and application submissions must remain in Australia (Privacy Act, APP 8). The cloud environment must deploy in an Australian region.

### Integrations

Dana and Sam listed the integrations that must be preserved: the enquiry / application form with **email notification to Admissions**, the **forwarding of submitted records into the student-administration intake process**, and **HTTPS / TLS** on the public domain.

### Cutover constraints

Dana asked that cutover **avoid the January–February enrolment peak** — the Website’s busiest and most commercially important window. Sam agreed and asked MTS to plan Cutover for after the peak subsides.

### Change management and handover

Sam confirmed the work follows YAT’s Change Management Procedure, and that the engagement must hand over as-built documentation and an operations runbook so YAT ICT can operate the Website afterwards.

---

## Agreed next steps

- **MTS to produce:** a simple single-AZ cloud hosting design for the Website in an Australian region.
- **MTS to deliver:** the migration (re-host CMS, migrate database / content / assets), Cutover after the enrolment peak, and handover documentation.
- **Dana to provide:** access to the CMS and a content / enquiry-record checklist for post-migration verification.
- **Sam to confirm:** the Cutover window and the DNS change arrangements with YAT ICT.

---

*Notes written up by the MTS Consultant within 24 hours of the meeting; circulated to Sam, Dana, and Pat for confirmation.*
