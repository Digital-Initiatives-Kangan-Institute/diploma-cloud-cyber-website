---
title: 'ICT Manager Consultation Notes'
description: 'Record of the requirements consultation between YAT ICT Manager and MTS, capturing functional and non-functional requirements for the LMS cloud migration.'
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

## Meeting record

| | |
|---|---|
| Subject | LMS Cloud Migration — Requirements Consultation |
| Date | Wednesday 15 April 2026 |
| Time | 10:00 – 11:15 (1 hour 15 minutes) |
| Location | YAT College Cremorne campus — ICT Manager's office, Building A Level 2 |
| Purpose | Gather YAT's functional and non-functional requirements for the LMS cloud migration ahead of action-plan drafting. |

**Attendees:**

- **Sam Walker** — YAT ICT Manager (chair)
- **Pat Lin** — MTS Senior Consultant, Project Lead
- **\[Consultant\]** — MTS Consultant (this engagement) — taking notes

---

## Discussion

### Context and staffing

Sam Walker opened by confirming the broad context from the YAT ICT Strategic Plan — the LMS server is at end of life, mission critical, and identified as the first system to be migrated to the cloud. Sam was candid about staff capacity: YAT's ICT team is highly capable on the current Windows Server / Active Directory environment, but their cloud experience is limited and they don't yet have cloud certifications. That's why MTS has been engaged for the migration. Sam expects MTS to lead the cloud-specific decisions and YAT ICT to stay close to the work so they can support the migrated environment once it's running.

Pat Lin confirmed that the MTS team holds AWS Certified Cloud Practitioner and AWS Certified Solutions Architect certifications across the project staff, and that AWS will be the cloud platform for the migration based on those qualifications.

### Availability

Sam was firm on the availability target. The YAT ICT Strategic Plan commits to 99.9% availability for critical systems, and senior management has signalled that the LMS migration's success is judged against that number. The current measured baseline (rolling 12 months) is 99.2%. Sam wants the migration plan to show how it will achieve the 99.9% target — not as a stretch goal but as the threshold for sign-off.

### Recovery objectives

Pat asked Sam to put numbers on recovery expectations. Sam said:

- **Recovery point:** YAT can tolerate no more than 1 hour of lost LMS data in a major incident.
- **Recovery time:** the LMS must be operational again within 4 hours of an incident declaration.

Sam noted these are a significant tightening from the current on-prem recovery process, which can take 7–11 hours in a worst case (the offsite tape retrieval is the main contributor). Sam said this is a known gap and one of the explicit drivers for moving to cloud — improving recovery is one of the things the migration is supposed to fix.

### Operating system and application stack

Sam was clear: the migration is an infrastructure move, not a software upgrade. The DOODLE LMS has been customised over time and the team has no appetite for an in-flight OS or application upgrade alongside the cloud transition. The migrated environment will run the existing Windows Server 2016 image with the existing DOODLE application and MySQL database. Full administrative control of the OS is needed so the YAT ICT team can continue to install and maintain LMS components as they do today.

Pat asked whether Windows Server 2016 was a constraint Sam wanted negotiated. Sam said no — preserving the stack is non-negotiable for this engagement; a future cycle of work can address OS modernisation separately.

### Scaling and demand patterns

Sam described the LMS load pattern in some detail. Weekday teaching hours typically see ~200–300 concurrent users. The two-week assessment submission windows at the end of each term spike that to ~500–700 concurrent users — roughly 3× the typical load. Overnight, weekends, and term breaks see very low load (~20–50 concurrent users).

Sam wants the migrated infrastructure to scale up and down with demand automatically:

- Scale up so peak performance is maintained during assessment-week spikes.
- Scale down during quiet periods to reduce running cost.

Sam was less precise on the cloud terminology (referring to "the cloud system" rather than "the autoscaling group" or similar), but the intent was clear: both scale-up for performance and scale-down for cost, automatically based on user demand.

### Vendor support expectations

Sam said YAT will rely on the cloud vendor for severity-1 incident response — the YAT ICT team cannot pick up cloud-specific incidents alone. Sam's expectation: response from the cloud vendor within 1 hour for severity-1 issues. Pat said this is consistent with AWS Business Support and above; the action plan should confirm the support tier required to meet this.

### Cost-benefit analysis

Sam confirmed the engagement output includes a 5-year cost-benefit analysis comparing the current in-house deployment with the proposed cloud option. The CBA template is supplied (in the YAT engagement materials); MTS to populate. Sam noted that senior management will use the CBA as one of the inputs to the sign-off decision.

### Change management

Sam confirmed that the migration will follow YAT's documented Change Management Procedure. All material changes will require ICT Manager approval, with senior management and affected business unit heads signing off for the high-risk migration activities. The final go-live cutover will be a high-risk change with full sign-off.

---

## Agreed next steps

- **MTS to produce:** 5-year CBA (in-house vs cloud) for the LMS migration.
- **MTS to produce:** draft action plan with prioritised changes, target schedule, and implementation methods.
- **MTS to produce:** formal requirements document (this consultation feeds the requirements list).
- **Submission deadline:** end of the following week.
- **Sam to confirm:** severity-1 cloud vendor response time expectation in writing, for inclusion in the requirements.
- **Sam to authorise:** MTS consultant accounts on AWS Academy (Cloud Foundations + Cloud Architecting) for the engagement.

---

*Notes written up by \[Consultant\] within 24 hours of the meeting; circulated to Sam and Pat for confirmation.*
