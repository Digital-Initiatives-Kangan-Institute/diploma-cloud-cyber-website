---
title: 'Website Specification'
description: 'Functional and technical specification of the YAT public website (marketing site, course catalogue, and online enquiry / application intake) as cloud-hosted on AWS — functions, traffic, data, integrations, SLAs, accessibility, and data residency.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
  - s1-cl1-at3
  - s1-cl2-at1
  - s1-cl3-at1
order: 10
---

## Document control

| | |
|---|---|
| Document title | YAT Public Website — Specification |
| Document owner | Sam Walker, ICT Manager |
| Business owner | Dana Mercer, Marketing & Admissions Manager |
| Application | Public website + open-source PHP / MySQL content management system (LAMP stack) |
| Review cycle | Annual, or on material change to the website or its hosting |
| Classification | Internal — ICT, Marketing & Admissions, and engaged consultants on signed MSA |

## 1. Overview

YAT operates a **public website** — its marketing site, course catalogue, and online **enquiry / application intake**. It is YAT's public shopfront and the front door for prospective students.

The website runs on an **open-source PHP / MySQL content management system (CMS)** on a **LAMP stack**, hosted on AWS in the Sydney (`ap-southeast-2`) Region. It was YAT's **first cloud system**, migrated from on-premises hosting in 2023 as a deliberately low-risk pilot, and runs as a **single-Availability-Zone deployment** (a single EC2 instance, a single-AZ Amazon RDS for MySQL database, and S3 for backups) — with no high availability or disaster recovery. The business owner is **Marketing & Admissions**; **YAT ICT** operates the infrastructure, with MTS available under a support arrangement.

## 2. Functions

### 2.1 Functions used by the public (prospective students and visitors)

- Browse marketing content (about YAT, study areas, campus and contact information)
- Browse the course catalogue and course-detail pages
- Submit an **online enquiry / application intake** form
- Find how to apply, intake dates, and fees

### 2.2 Functions used by Marketing & Admissions staff

- Author and update website pages and the course catalogue through the CMS
- Receive, triage, and action submitted enquiries / applications
- Manage media assets (images, brochures, course PDFs)

### 2.3 Functions used by ICT staff

- Operate, patch, monitor, back up, and restore the website infrastructure and CMS
- Manage DNS and TLS for the public domain
- Support and troubleshoot (per the Baseline Design backup mechanisms)

## 3. Traffic and load

| Metric | Value |
|---|---|
| CMS author accounts | ~5 (Marketing & Admissions) |
| Typical public sessions (weekday) | ~300–600 / day |
| Peak public sessions (January–February enrolment-enquiry period) | ~3–4× typical |
| Enquiry / application submissions | ~20–60 / week typical; spikes at each intake |
| Out-of-intake pattern | light and steady; the one pronounced peak is the Jan–Feb enrolment-enquiry window |

*The public website is the one YAT system with a genuinely public, anonymous, internet-facing user base — distinct from the internal LMS and Accounting systems.*

## 4. Data stored

| Data category | Approx volume | Storage location | Notes |
|---|---|---|---|
| Page content and course catalogue | ~0.3 GB | Amazon RDS (MySQL) | Authored in the CMS by Marketing |
| Uploaded media (images, brochures, course PDFs) | ~5 GB | EC2 instance (EBS) | Stored on local disk by the CMS; growing ~1 GB / year |
| Enquiry / application submissions (PII) | ~0.5 GB | Amazon RDS (MySQL) | Subject to Privacy Act 1988 + APPs |
| Web / access logs | ~1 GB rolling | EC2 instance + CloudWatch | Operational logging |
| **Total data footprint (current)** | **~7 GB** | (across Amazon RDS, EC2 EBS, and Amazon S3 backups) | |

## 5. Authentication

- **Public pages require no authentication** — they are open to the internet over HTTPS.
- **CMS authoring** requires sign-in to the CMS by Marketing & Admissions authors, using the CMS's own account management (not integrated with campus Active Directory — the website is a separate, public-facing system).
- Administrative access to the underlying server is restricted to YAT ICT (and MTS during support), per the User Access Policy.

## 6. Integration points

| External system | Integration type | Direction | Purpose |
|---|---|---|---|
| Office 365 (email) | SMTP outbound | Website → O365 | Notify the Admissions team of new enquiry / application submissions |
| Student-administration intake process | Manual / batch forward | Website → student admin | Pass submitted enquiry / application records into the intake workflow |
| Public DNS + TLS | DNS records + certificate | n/a | Serve the public domain over HTTPS |

## 7. Reporting and export requirements

- Periodic enquiry / application volume summaries for Marketing & Admissions
- Ad-hoc content and catalogue updates per intake cycle
- (Web analytics beyond basic server logs are not configured on the pilot deployment.)

## 8. Browser and device support

- **Supported browsers (current):** Microsoft Edge (Chromium), Google Chrome, Mozilla Firefox, Apple Safari — last two major versions of each.
- **Mobile / tablet:** the public site is fully responsive; a large share of prospective-student traffic is mobile, so mobile rendering and the enquiry form are first-class.
- **Native apps:** none.

## 9. Service-level expectations

| Service-level metric | Current value | Note |
|---|---|---|
| Availability | No formal SLA | Single-AZ pilot; a target would be set if/when the website is hardened |
| RPO (acceptable data loss in incident) | ~24 hours (nightly backups) | Not formally committed for the pilot |
| RTO (time to recover from a major outage) | Rebuild-and-restore from backup; unmeasured | Not formally committed; no second-AZ or second-Region fallback |
| Support response | Best-effort by YAT ICT (MTS available under support) | — |

*The website is YAT's public shopfront, but it is **not** mission-critical in the way the LMS is. The single instance, single Availability Zone, and single database are accepted single points of failure from the 2023 pilot, and the absence of a tested recovery objective is its most significant gap.*

## 10. Backup and maintenance windows

- **Backup:** Amazon RDS automated daily backups with point-in-time-restore retention; nightly database and media snapshots to Amazon S3; daily EC2 EBS snapshots.
- **Maintenance window:** low-traffic overnight windows, by prior change-management notification.
- **Restrictions:** avoid maintenance during the January–February enrolment-enquiry peak except for severity-1 incidents.

## 11. Accessibility

As a **public-facing** website for an Australian RTO, the site is held to **WCAG 2.1 Level AA** conformance, consistent with YAT's obligations under the *Disability Discrimination Act 1992* (Cth) — a stronger public obligation than for YAT's internal staff systems.

## 12. Data residency

**The personal information captured in enquiry and application submissions must remain within Australia** to support compliance with the *Privacy Act 1988* and the Australian Privacy Principles (APP 8 — cross-border disclosure). The website is hosted in the AWS Australian region (`ap-southeast-2` Sydney).

## Related references

- Website Cloud Architecture — Baseline Design — the AWS environment, including backup mechanisms (§10)
- ICT Environment Overview — narrative description of the wider YAT environment
- Hardware / Software Inventory — itemised inventory, including the website's AWS resources
- ICT Strategic Plan — direction for the cloud transition the website pilot began
- Change Management Procedure (intranet policies) — change governance
- Privacy / Data Handling Policy (intranet policies) — data-residency obligations
- User Access Policy (intranet policies) — authentication and access-control requirements
