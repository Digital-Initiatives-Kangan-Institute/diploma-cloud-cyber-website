---
title: 'Data Residency & Sovereignty Requirements'
description: 'YAT compliance requirements for the India-campus cohort — the Indian data-protection and cyber-security obligations the LMS expansion must meet, and what that means for where data and logs are held.'
appearsIn:
  - s1-cl2-at1
order: 5
uocReferences:
  - '[ICTCLD501 AC 2] legislation applicable to risk type'
  - '[ICTCLD503 AC 7] specific requirements and industry standards, organisational procedures and legislative requirements'
  - '[ICTCLD505 AC 3] specific requirements and industry standards, organisational procedures and legislative requirements'
---

## Purpose

YAT's offshore campus operates in India and, in respect of that operation, is subject to Indian data-protection and cyber-security law. This document sets out the data-residency and sovereignty requirements the LMS Global Expansion work must meet for the India-campus cohort. It is the determination of the YAT compliance area as at July 2026; MTS is to **design to these requirements**, not to interpret the underlying law (see the Engagement Role Brief, scope).

The requirements are deliberately scoped. Indian law does **not** require YAT to relocate the entire LMS to India. It requires that **specific data — principally operational/access logs — be held in India**, and it places obligations on YAT as a handler of personal data. The bulk of LMS data may remain in the Australian region.

## Applicable Indian instruments

### 1. Digital Personal Data Protection Act, 2023 (DPDP Act) and DPDP Rules, 2025

India's principal data-protection law. Two points matter for this engagement:

- **Cross-border transfer is permitted by default.** The DPDP Act uses a "negative list" model: personal data may be transferred to any country **except** those the Central Government specifically restricts. India has not adopted blanket localisation for general personal data. **Consequence:** the India cohort's personal data may lawfully be processed and stored in the Australian region.
- **YAT is a Data Fiduciary** and carries obligations regardless of where data is hosted (lawful basis/consent, purpose limitation, security safeguards, breach handling). A future designation of YAT as a *Significant Data Fiduciary* could allow the Government to restrict export of certain data categories — so the design should not foreclose holding additional categories in India later.

The DPDP Rules, 2025 (notified 14 November 2025) operationalise the Act, with compliance obligations phasing in through 2027.

### 2. CERT-In Directions, 2022 (Cyber Security Directions under section 70B(6) of the IT Act)

The operative residency driver for this engagement. The Directions require organisations to:

- **Enable logs of all ICT systems and retain them within Indian jurisdiction for a rolling 180 days.** Logs must be producible to CERT-In on request or with an incident report.
- **Report cyber incidents to CERT-In within 6 hours** of becoming aware of them.

**Consequence:** the access/activity and system logs for the India operation must be **stored in an Indian region and retained for at least 180 days**, and must be readily retrievable to support the 6-hour reporting obligation.

## Requirements for the LMS expansion

The design and build must satisfy the following. (References in brackets indicate the driving instrument.)

- **DR-R1 — India log residency.** Access and activity logs (and other ICT system logs) for the India-campus cohort must be written to and retained in an **Indian AWS region** for **at least 180 days**. *(CERT-In Directions 2022.)*

- **DR-R2 — Breach-reporting readiness.** The India-resident logs must be readily retrievable so that a cyber incident affecting the India operation can be reported to CERT-In **within 6 hours**. *(CERT-In Directions 2022.)*

- **DR-R3 — Primary data may remain in Australia.** The main LMS data store (including India-cohort personal data) **may remain in the Australian region**; full localisation of the LMS is **not** required, provided YAT's Data Fiduciary obligations are met. *(DPDP Act 2023 — cross-border transfer permitted by default.)*

- **DR-R4 — Keep localisation extensible.** The architecture must keep open the option to locate **additional** data categories in India in future (e.g. if YAT is later designated a Significant Data Fiduciary) without re-architecture — for example, by provisioning the Indian footprint as reusable, region-parameterised infrastructure. *(DPDP Act 2023 — latent localisation power.)*

- **DR-R5 — Security and privacy alignment.** Handling of India-cohort personal data must remain consistent with YAT's Privacy / Data Handling Policy and Security and Incident Response Policy. *(DPDP Act 2023 — Data Fiduciary obligations; YAT policy.)*

## Scope and ownership

- The **legal interpretation** of these obligations is owned by the YAT compliance area. MTS designs the infrastructure to satisfy the requirements above; it does not advise on the law.
- These requirements concern the **India operation**. The existing Australian operation continues under Australian law and the YAT Privacy / Data Handling Policy (which requires Australian residency for YAT data except where a requirement such as this one provides otherwise).
- The Indian framework is being implemented in phases through 2027. These requirements reflect YAT's compliance position as at the date of this document and may be updated; material change is handled through the Change Management Procedure.

## References

- Digital Personal Data Protection Act, 2023 — [MeitY](https://www.meity.gov.in/content/digital-personal-data-protection-act-2023) · [official text (PDF)](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf)
- Digital Personal Data Protection Rules, 2025 — [MeitY data-protection framework](https://www.meity.gov.in/data-protection-framework) · [PIB notification](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190655)
- CERT-In Directions, 2022 (s.70B IT Act) — [official text (PDF)](https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf)
