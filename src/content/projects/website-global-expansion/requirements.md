---
title: 'Website Global Expansion — Functional & Non-Functional Requirements'
description: 'YAT-defined functional and non-functional requirements for the Website Global Expansion & Disaster Recovery project — global serving, disaster recovery, infrastructure-as-code, audit/access logging, data residency, availability.'
appearsIn:
  - s1-cl2-at1
order: 3
uocReferences:
  - '[ICTCLD501 PC 1.1] Identify disaster recovery plan requirements according to business needs and requirements'
  - '[ICTCLD501 PC 2.1] Determine time and recovery point objectives according to business needs'
  - '[ICTCLD503 PC 1.1] Determine and confirm cloud web-scaling needs'
  - '[ICTCLD503 PC 1.5] Determine architecture changes to scale for a global user base'
  - '[ICTCLD505 PC 1.1] Identify and review benefits of infrastructure as code according to business needs'
---

## Context

The following functional and non-functional requirements for the Website Global Expansion & Disaster Recovery engagement were established by YAT ICT during engagement setup, following consultation with the YAT ICT Manager and the Marketing & Admissions Manager (see the Consultation Notes filed against this project for the consultation record this list was derived from). They set the targets the engagement is delivered against and are referenced by the Disaster Recovery Plan and the subsequent implementation. The data-residency obligations referenced below are detailed in the separate Data Residency & Sovereignty Requirements for this project.

The starting point for the engagement is the existing website cloud environment — migrated to AWS in 2023 and since hardened to Multi-AZ high availability (now complete). This engagement extends that environment to its new role as the global enrolment front-door; it does not rebuild the website.

## Functional requirements

The extended YAT website must:

- **Serve a global user base.** The website must serve the new India-campus prospective-student audience in addition to the existing Australian audience, delivering its content (marketing pages, course catalogue, and the enquiry / application intake) to geographically distant users with acceptable latency.

- **Provide a disaster recovery capability in a second region.** The website must be recoverable in a second AWS region following a disaster that affects the primary region. Recovery must not depend on the primary region being available.

- **Capture and retain an audit/access log in-region.** Access and activity events for the India cohort (including enquiry / application submissions) must be captured and written to a log store located in an Indian region, to meet the applicable data-residency obligations. This is to be delivered by a dedicated, decoupled service that receives events and records them — independent of the core website so that it does not affect website availability.

- **Be provisioned as infrastructure-as-code.** The infrastructure changes must be defined as parameterised templates, so the environment can be reproduced consistently and stood up in another region by changing configuration (e.g. the target region) rather than rebuilding by hand.

## Non-functional requirements

- **Recovery objectives — RTO ≤ 4 hours, RPO ≤ 1 hour.** In a disaster affecting the primary region, the website must be recoverable with no more than 1 hour of data loss (RPO ≤ 1 hour) and back to operational service within 4 hours (RTO ≤ 4 hours).

- **Maintain the high availability already achieved — ≥ 99.9%.** As the enrolment front-door for the India campus, the website is business-critical, and is already deployed Multi-AZ (in-region fault-tolerant, ≥ 99.9% available). The expansion must **not degrade** that availability; the new work (global serving, cross-region recovery, infrastructure-as-code, and the audit/access-log microservice) builds on top of the existing HA platform.

- **Global performance.** The India audience must receive acceptable response times. The website is read-heavy (marketing pages, course catalogue), with comparatively light write traffic (enquiry / application submissions), which the design should take into account.

- **Scale with demand.** Scalable components must scale up and down automatically with demand. Website load varies substantially across the academic calendar — a pronounced peak during the January–February enrolment-enquiry period, light load otherwise. The new cohort adds to this load.

- **Data residency.** Records and operational logs relating to the India cohort must be retained in an Indian region, as set out in the Data Residency & Sovereignty Requirements. The bulk of website data (content and enquiry records) may remain in the Australian region except where those requirements provide otherwise.

- **Preserve the CMS and application stack.** No change to the website's operating system, CMS, or application software versions as part of this engagement.

- **Cost-effectiveness.** The solution should be the simplest arrangement that meets these requirements. Unnecessary complexity or cost is to be avoided.

- **Security and compliance.** The changes must comply with YAT's documented ICT policies (User Access, Acceptable Use, Privacy / Data Handling, Security and Incident Response).
