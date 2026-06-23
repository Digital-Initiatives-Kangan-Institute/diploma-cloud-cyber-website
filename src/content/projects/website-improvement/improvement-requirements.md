---
title: 'Improvement Requirements'
description: 'YAT-defined outcomes the website cloud-infrastructure improvement must achieve — a stable, reliable, fit-for-purpose public website that is compliant with the Indian regulatory requirements applicable to the India-campus operation it serves, approved by YAT in the Solution Design.'
appearsIn:
  - s1-cl3-at1
  - s1-cl3-at2
  - s1-cl3-at3
order: 3
uocReferences:
  - '[ICTCLD504 PC 1.6] Set business goals as they relate to security, reliability, high-performance and cost efficiencies of cloud architecture according to business requirements and needs'
  - '[ICTCLD504 AC 5] specific requirements and industry standards, organisational procedures and legislative requirements, including business and functionality requirements, as required'
---

## Purpose

This document states the **outcomes** the website cloud-infrastructure improvement must achieve. They were established by YAT ICT, YAT Marketing & Admissions, and the YAT Compliance area. They are deliberately framed as **objectives, not solutions**: the Improvement Team is to analyse the current state against these outcomes, set the specific improvement goals and performance metrics, and propose the improvements it judges necessary — for YAT's approval, set out in the Solution Design with each improvement's cost-benefit justification. No particular architecture or improvement is mandated or excluded here.

The improvement concerns the **cloud infrastructure** of the public website. The Website content and CMS application are out of scope (see the Engagement Role Brief and the Master Services Agreement §5).

## Required outcomes

- **IR-1 — Stable and reliable.** The infrastructure must be stable and reliable in normal operation, appropriate to a **public, 24×7 front door** that prospective students — including a growing, internationally distributed audience — rely on to find courses and apply. The team is to assess current reliability against that need, set measurable reliability goals, and address any weaknesses the analysis identifies. Improvements must at least preserve the current level of service for the existing Australian audience.

- **IR-2 — Fit for purpose and proportionate.** Improvements must be fit for the purpose of a **public, internet-facing marketing-and-intake website** — leaning to availability, scalability, and performance for an anonymous, internationally distributed public audience, and to sound protection against the automated and hostile traffic (bots, scraping, spam against the enquiry / application form) a public site is exposed to — and proportionate to the site's business value and to YAT's budget. Sound engineering, not gold-plating; each proposed improvement must be justified against the business need rather than adopted by default.

- **IR-3 — Compliant with Indian regulatory requirements.** The infrastructure must be assessed against, and brought into compliance with, the **Indian Regulatory Requirements** applicable to the India-campus operation the website serves (see the Indian Regulatory Requirements reference). The team is to identify any compliance gaps and propose the infrastructure changes needed to close them. *The legal interpretation of these obligations is owned by the YAT Compliance area; the team designs the infrastructure to satisfy the requirements as determined, and does not advise on the law.*

- **IR-4 — Preserve the application and content.** Improvements are to the cloud infrastructure only. The website must continue to serve the **same content and CMS application without application change**, no website content or media may be lost, and the visitor-facing experience must not be degraded.

- **IR-5 — Operable and maintainable by YAT.** The improved environment must remain operable by YAT in-house ICT, with appropriate monitoring, alerting, and documentation. Where it aids reliability, recovery, or consistency, provisioning should favour reproducible, parameterised infrastructure.

- **IR-6 — Cost-justified.** Each improvement must be justified in the Solution Design on a cost-versus-benefit basis, and its ongoing operating-cost impact made explicit.

- **IR-7 — Change discipline.** Production-affecting change must follow the YAT Change Management Procedure and avoid the **Peak Intake Period** (the principal enrolment and application-intake windows).

## How these requirements are used

- The team **analyses** the current Website cloud infrastructure (the Baseline Design and the current ICT records) against IR-1 to IR-7.
- The team **sets** the specific security, reliability, scalability, and cost goals and performance metrics — these are the team's determination, not pre-set here.
- The team **proposes** the improvements it judges necessary to meet the outcomes, with each justified in the Solution Design.
- YAT **approves** the improvements to be implemented; only Approved Improvements proceed to implementation.

## Related documents

- Indian Regulatory Requirements (this project) — the applicable Indian instruments the infrastructure is assessed against (IR-3)
- ICT Manager Consultation Notes (this project) — the consultation these outcomes were derived from
- Website Cloud Architecture — Baseline Design (Website Cloud Migration project) — the current single-AZ as-built baseline
- Website Specification, Website Infrastructure Specifications, Website Operational Costing (ICT) — current-state records and cost inputs
- Master Services Agreement (this project) — engagement scope and the approval gate
