---
title: 'ICT Manager Consultation Notes'
description: 'Record of the requirements consultation between YAT and MTS for the Website Global Expansion & Disaster Recovery project — clarifying global serving, disaster recovery, data residency, the audit/access-log service, and infrastructure-as-code.'
appearsIn:
  - s1-cl2-at1
order: 4
uocReferences:
  - '[ICTCLD501 AC 1] data required to assess current and future risk events in specified environment'
  - '[ICTCLD503 AC 5] information and data sources required to design and implement cloud infrastructure'
  - '[ICTCLD503 AC 9] data to gather information from to determine output and user requirements, including user access and business protocols'
---

## Meeting record

| | |
|---|---|
| Subject | Website Global Expansion & Disaster Recovery — Requirements Consultation |
| Date | Thursday 9 July 2026 |
| Time | 10:00 – 11:10 (1 hour 10 minutes) |
| Location | YAT College Cremorne campus — ICT Manager's office, Building A Level 2 |
| Purpose | Clarify and extend YAT's requirements for the website global expansion and disaster recovery work ahead of the Disaster Recovery Plan. |

**Attendees:**

- **Sam Walker** — YAT ICT Manager (chair)
- **Dana Mercer** — YAT Marketing & Admissions Manager (website business owner)
- **Pat Lin** — MTS Senior Consultant, Project Lead
- **\[Consultant\]** — MTS Consultant (this engagement) — taking notes

---

## Discussion

### Context and starting point

Sam Walker opened by setting the scene. The website is cloud-hosted in AWS following the 2023 migration, and that single-Availability-Zone environment is the starting point — this engagement extends it, it does not rebuild it. The driver is the new education partnership: YAT is standing up an offshore campus in India (GIFT City), and the website is the front door prospective students from that market will use to find courses and apply. Dana Mercer stressed that the website is now commercially critical — it is where the India intake begins. Sam framed two outcomes: the site has to **reach** the new audience acceptably, and — now that an offshore intake depends on it — it has to be **recoverable** if something goes badly wrong. Sam framed recovery as the headline of this engagement.

### Global reach and what "global" means

Pat asked Sam and Dana to be specific about "global user base." They clarified that, for now, "global" means **the India prospective-student audience plus the existing Australian audience** — not a worldwide rollout. But they want the design to **not paint YAT into a corner**: if a second offshore partner appears later, the approach should extend without a re-architecture.

Dana stressed the website is **read-heavy** — visitors mostly browse marketing pages and the course catalogue, with comparatively little writing back (the enquiry / application form). She wants the India audience to get acceptable response times despite the distance, and asked MTS to factor content delivery into the design rather than simply hosting everything in Australia and hoping. Pat noted that edge content delivery is the usual answer to that and would be covered in the plan.

### Single-AZ starting point

Sam was candid that the 2023 deployment was a deliberately low-risk pilot — a single instance in a single Availability Zone, with no load balancer or redundancy. Now that the site is business-critical, that is no longer acceptable. He asked that the expansion remove those single points of failure on the path that matters (the public site and the enquiry intake), and noted that the web-scale work needed for the global audience should largely deliver that in-region resilience as a by-product.

### Disaster recovery — the priority

Sam confirmed the recovery numbers: **RPO of 1 hour** (no more than an hour of lost enquiry / content data) and **RTO of 4 hours** (operational again within four hours of an incident being declared).

The important point Sam made: he wants recovery to survive the loss of **an entire region**, not just a single availability zone. He was clear he is not asking for an always-on duplicate — a recover-into-the-second-region approach that meets the 4-hour / 1-hour targets is acceptable, and he would prefer the simpler, cheaper option that still meets the numbers.

### Data residency — a compliance gate

Sam was emphatic that data residency is **non-negotiable** for the India cohort. Certain records and operational logs for the India operation have to be held **in India** — this is a compliance gate, not a nice-to-have, and the plan has to show it is met.

He was equally clear about scope, to avoid over-reach: it is **specific data** — the access/activity logs and the records the obligation names — that must sit in India, **not the whole website**. The main website content and enquiry database can remain in Australia. Sam asked that MTS work to the residency requirements as written up separately (the Data Residency & Sovereignty Requirements), and not try to interpret the law themselves — YAT's compliance area owns that, MTS designs to it.

### The audit / access-log service

Pat raised how the in-India logging would actually work. Sam explained the split: **YAT's web team** will arrange for the website to emit the relevant access/activity events (including enquiry submissions); **MTS** is to build the service that receives those events and writes them to the in-India log store. Sam wants this service kept **separate and decoupled** from the website itself, so that logging load or a logging outage can never drag down the site. Pat confirmed a small event-driven service is the right shape and that MTS would design the event contract as part of the plan.

### Infrastructure-as-code

Sam wants the new footprint **reproducible**. His words: "if we have to stand the India side up — or stand it up again after a failure — I don't want it done by hand." He asked that the changes be delivered as templates that can be pointed at a region and deployed consistently. Pat noted this also underpins the recovery story: the recovery region can be provisioned from the same templates. Sam liked that the recovery and the reproducibility requirements reinforce each other.

### Keep it simple, protect the existing audience

Two closing points Sam pressed:

- **Keep it simple.** The India campus is new and budget-conscious. Sam does not want gold-plating — the simplest arrangement that genuinely meets the targets.
- **Don't disturb the existing site.** Whatever is done for the new cohort must not degrade the experience Australian visitors already have.

### Change management and approval

Sam confirmed the engagement follows YAT's Change Management Procedure. Critically, he wants to **approve the Disaster Recovery Plan before any implementation begins** — the plan presentation is the gate. High-risk implementation steps will need sign-off as usual.

---

## Agreed next steps

- **MTS to produce:** the solution design and the Disaster Recovery Plan (risk and impact analysis, recovery objectives, recovery strategy, validation approach), with the audit/access-log service and the infrastructure-as-code approach included.
- **MTS to present:** the Disaster Recovery Plan to YAT for approval before implementation.
- **Sam to provide:** the finalised Data Residency & Sovereignty Requirements for the India cohort.
- **Dana to confirm:** the YAT web team's commitment to emit the access/activity events the logging service will consume.
- **Sam to authorise:** MTS consultant accounts on AWS Academy for the engagement.

---

*Notes written up by \[Consultant\] within 24 hours of the meeting; circulated to Sam, Dana, and Pat for confirmation.*
