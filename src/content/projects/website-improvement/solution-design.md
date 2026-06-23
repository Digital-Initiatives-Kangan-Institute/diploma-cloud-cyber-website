---
title: 'Website Cloud Architecture — Approved Improvement Design'
description: 'The approved "to be" improvement design for the YAT public website cloud infrastructure — Multi-AZ resilience across the web and application tiers, a content-delivery and scaling layer for the global public audience, hardened security for public exposure, durable object storage for media and static content, cost optimisation, and a light India residency slice for regulatory logs. The design the implementation team builds from.'
appearsIn:
  - s1-cl3-at2
  - s1-cl3-at3
order: 10
uocReferences:
  - '[ICTCLD504 PC 3.1] deploy approved architecture on cloud platform'
  - '[ICTCLD504 AC 3] information and data sources required to design and implement cloud infrastructure'
---

> Approved by YAT (ICT, Marketing & Admissions and Compliance) following the Solution Design review, and adopted as the agreed design for implementation (v1.0).

The approved improvement design for the YAT public website cloud infrastructure. It takes the single-Availability-Zone baseline and improves it across reliability, scalability, security and cost — Multi-AZ resilience across the web and application tiers, a content-delivery and scaling layer that keeps the public site fast for a global, internationally distributed audience, a hardened security posture appropriate to a public, internet-exposed front door, durable and versioned object storage so no website content or media can be lost, storage-lifecycle and right-sized cost optimisation, and a light India residency slice (CERT-In system and access logs held in Mumbai, with the main site remaining in Sydney). It is provisioned as parameterised infrastructure-as-code across four components — network, compute, storage, and content delivery.

This is the design the improvement team implements: the team plans and writes the infrastructure-as-code for it, and each engineer deploys and verifies it. The website content and its CMS application are preserved unchanged, and no website content or media is lost.

## Design intent

The baseline website was migrated to AWS in 2023 as a deliberately simple single-Availability-Zone deployment and has not changed materially since. With YAT's India-campus partnership, the website becomes the public front door through which a growing, internationally distributed audience of prospective students discovers courses and applies. The approved design improves the infrastructure so it is **stable and reliable** for that role, **fit for purpose** for a public, internet-facing service, **compliant** with the Indian Regulatory Requirements applicable to the operation it serves, and **cost-justified** — while preserving the website application and all of its content and media. Each improvement below carries the justification on which it was approved, mapped to the Improvement Requirements (IR-1 to IR-7).

## Approved improvements

### 1. Multi-AZ resilience — web and application tiers (IR-1)

The single-AZ baseline is a single point of failure for the primary acquisition channel. The approved design spreads the web and application tiers across **two Availability Zones in `ap-southeast-2` (Sydney)** behind a load balancer, with health checks and automatic failover, so the loss of one AZ does not take the public site down. This at least preserves — and improves on — the current level of service for the existing Australian audience.

### 2. Content delivery and scaling for the global public audience (IR-1, IR-2)

To keep the catalogue and marketing pages **fast and discoverable** for an anonymous, internationally distributed audience, the design fronts the site with a **content-delivery network** that caches static content and media close to visitors (including the India market), and places the web tier behind **demand-based scaling** so the infrastructure absorbs the variable, peaky public traffic of enrolment and application-intake periods without over-provisioning for the quiet times. This is fitness-for-purpose for a public marketing-and-intake website — availability, scalability, and performance — sized proportionately, not gold-plated.

### 3. Hardened security for public exposure (IR-2)

A public, internet-exposed front door is open to anonymous, automated, and hostile traffic. The design hardens the perimeter and the visitor-facing surface: a **web application firewall** and **bot / rate-control protection** in front of the site to absorb scraping, spam against the enquiry / application form, and abusive traffic; least-privilege network security groups; encryption in transit (TLS) and at rest for stored content and submissions; and tightened identity and access controls on the AWS environment. Protection is proportionate to the exposure rather than maximal.

### 4. Durable, versioned object storage for content and media (IR-4)

The website is **object-storage (S3) dependent** for its media and static content. The design holds that content in object storage with **versioning and lifecycle management enabled** and a defined durability and recovery posture, so that **no website content or media can be lost** through this work or through subsequent operation. The website application and the content visitors see are preserved unchanged; this improvement protects them.

### 5. Cost optimisation (IR-6)

Each improvement is justified on a cost-versus-benefit basis and its ongoing operating-cost impact made explicit. The design takes cost out where it does not buy reliability the public site needs — **storage-lifecycle tiering** for older media and logs, **demand-based scaling** so capacity tracks real public traffic rather than a fixed peak, and right-sizing of the web and application tiers — so the resilience and performance gains are delivered proportionately to the India campus's budget.

### 6. Operability and reproducibility (IR-5)

The whole environment is provisioned as **parameterised infrastructure-as-code** across the four components (network, compute, storage, content delivery), with monitoring, alerting, and documentation, so YAT in-house ICT can operate, recover, and reproduce it consistently. Reproducible provisioning also underpins the reliability and recovery posture above.

### 7. India residency slice — CERT-In logs (IR-3)

To satisfy the Indian Regulatory Requirements for the India-facing operation, the design adds a **light residency slice** in `ap-south-1` (Mumbai): the website's **system and access logs for the India-facing operation are held within Indian jurisdiction** with the rolling **180-day retention** the CERT-In Directions require, and made retrievable quickly enough to support the **6-hour incident-reporting** obligation. The main website remains in Sydney; the India cohort's enquiry / application data may lawfully be processed and stored in the Australian region under the DPDP Act's default cross-border position, so only the regulated logs are held in India. The arrangement does not foreclose holding additional categories in India later should YAT be designated a Significant Data Fiduciary. *The legal interpretation of these obligations is owned by the YAT Compliance area; this design satisfies the requirements as determined.*

## Change discipline

Implementation of the Approved Improvements follows the YAT Change Management Procedure and is scheduled to **avoid the Peak Intake Period** (the principal enrolment and application-intake windows). High-risk implementation steps are signed off as usual.

## Related documents

- Improvement Requirements (this project) — the outcomes IR-1 to IR-7 this design satisfies
- Indian Regulatory Requirements (this project) — the instruments the India residency slice (improvement 7) addresses
- Master Services Agreement (this project) — §6 Deliverables; this design is the approved D1.3 and the basis for Phase 2
- ICT Manager Consultation Notes (this project) — the drivers and constraints behind the design
- Website Cloud Architecture — Baseline Design (Website Cloud Migration project) — the single-AZ baseline being improved
