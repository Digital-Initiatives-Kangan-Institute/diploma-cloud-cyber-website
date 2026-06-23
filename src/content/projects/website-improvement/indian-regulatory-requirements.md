---
title: 'Indian Regulatory Requirements'
description: 'The YAT Compliance area’s reference list of the Indian regulatory obligations applicable to the public website following the India-campus partnership — the instruments the Improvement Team assesses the infrastructure against.'
appearsIn:
  - s1-cl3-at1
  - s1-cl3-at2
  - s1-cl3-at3
order: 5
uocReferences:
  - '[ICTCLD504 AC 5] specific requirements and industry standards, organisational procedures and legislative requirements, including business and functionality requirements, as required'
  - '[ICTCLD504 PC 1.2] Evaluate cloud architecture and identify business impact of design decisions'
---

## Purpose

YAT's offshore campus operates in India and, in respect of that operation, is subject to Indian data-protection and cyber-security law. Because the public website is the front door through which India-market prospective students discover courses and apply, it handles personal data of those individuals and operates as part of that India-facing operation — so it falls within scope of these obligations.

This document is the **YAT Compliance area's determination** of the Indian instruments that apply and what they require, provided as **reference material** for the Improvement Team. The team is to **assess the current website cloud infrastructure against these obligations**, identify any gaps, and propose what would close them in the Solution Design. It is the team's job to determine the specific technical requirements and the improvements; **this document states the obligations, not the solution.**

The division of responsibility is fixed: **the YAT Compliance area owns the interpretation of the law; MTS assesses and improves the infrastructure to satisfy the requirements as determined, and does not advise on the law.**

## Applicable Indian instruments

### 1. Digital Personal Data Protection Act, 2023 (DPDP Act) and DPDP Rules, 2025

India's principal data-protection law. Relevant points for the website:

- **YAT is a Data Fiduciary** in respect of the personal data of India-market prospective students that the website collects — principally the enquiry and application-intake submissions. YAT carries the Data Fiduciary obligations — lawful basis / consent, purpose limitation, security safeguards, and breach handling — **regardless of where the data is hosted.**
- **Cross-border transfer is permitted by default.** The DPDP Act uses a "negative list" model: personal data may be transferred to any country except those the Central Government specifically restricts. **Consequence:** the India cohort's enquiry / application data may lawfully be processed and stored in the Australian region, provided the Data Fiduciary obligations are met. A future designation of YAT as a *Significant Data Fiduciary* could restrict export of certain categories, so the arrangement should not foreclose holding additional categories in India later.

The DPDP Rules, 2025 operationalise the Act, with compliance obligations phasing in through 2027.

### 2. CERT-In Directions, 2022 (Cyber Security Directions under section 70B(6) of the IT Act)

Cyber-security directions applicable to organisations operating ICT systems for the India operation. They require organisations to:

- **Enable logs of ICT systems and retain them within Indian jurisdiction for a rolling 180 days**, producible to CERT-In on request or with an incident report.
- **Report cyber incidents to CERT-In within 6 hours** of becoming aware of them.

**Consequence:** the access and activity logs for the India-facing operation of the website are subject to an **in-India residency and 180-day retention** obligation, and must be retrievable quickly enough to support the 6-hour reporting obligation. The website is also a public, internet-exposed service, which makes complete and tamper-resistant logging material to meeting this obligation.

## How this is used

- These obligations are an **input** to the team's current-state analysis. The team assesses whether the website's current cloud infrastructure can meet them — log residency and retention, breach-reporting readiness, and the Data Fiduciary security expectations for the prospective-student personal data the site collects.
- Any **gap** the team identifies becomes a candidate improvement, proposed and justified in the Solution Design.
- The **specific technical requirements, the goals and metrics, and the proposed infrastructure changes are the team's determination** — they are not set here.

## Scope and ownership

- The **legal interpretation** of these obligations is owned by the YAT Compliance area. This document reflects YAT's compliance position as at the date below and may be updated; material change is handled through the Change Management Procedure.
- These requirements concern the **India-facing operation** of the website. The existing Australian operation continues under Australian law and the YAT Privacy / Data Handling Policy (which requires Australian residency for YAT data except where a requirement such as this one provides otherwise).
- The Indian framework is being implemented in phases through 2027.

## Related documents

- Improvement Requirements (this project) — IR-3 requires compliance with these instruments
- ICT Manager Consultation Notes (this project) — the consultation that set the compliance driver
- Master Services Agreement (this project) — §5 fixes the Compliance-owns-interpretation / MTS-designs-to-it split
- Website Specification (ICT) — the functional and workload profile of the public website
