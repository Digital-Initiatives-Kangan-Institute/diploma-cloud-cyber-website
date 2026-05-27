---
title: 'LMS Application Specification'
description: 'Functional and technical specification of the YAT Learning Management System (DOODLE) — functions, user load, data, integrations, SLAs, accessibility, data residency.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
  - s1-cl1-at3
order: 9
uocReferences:
  - '[ICTCLD502 AC 5] business and functionality requirements'
  - '[ICTCLD502 AC 3] information and data sources required to design and implement cloud infrastructure'
  - '[ICTCLD401 PC 1.8] Define workload according to business requirements and needs'
---

## Document control

| | |
|---|---|
| Document title | YAT Learning Management System — Application Specification |
| Document owner | Sam Walker, ICT Manager |
| Application | DOODLE — *Diverse Object-Orientated Dynamic Learning Environment* |
| Review cycle | Annual, or on material change to the LMS application stack or operating model |
| Classification | Internal — ICT, Finance, Education leadership, and engaged consultants on signed MSA |

## 1. Overview

YAT uses **DOODLE** (*Diverse Object-Orientated Dynamic Learning Environment*) as its Learning Management System and student management platform.

DOODLE runs on **Windows Server 2016** with a **MySQL** database. It is distributed under the GNU General Public License. Application support and customisation are provided to YAT by **MP Tech Solutions (MTS)** under a standing application support contract.

## 2. Functions

### 2.1 Functions used by students

- Access course-related resources
- Submit assessments

### 2.2 Functions used by teachers (trainers and assessors)

- Record student attendance
- Record assessment submissions
- Record unit completions
- Record student notes
- Other applicable student management tasks including support and notifications for classes

### 2.3 Functions used by administrative staff

- Enrol students into qualifications and units
- Manage student records (contact details, enrolment status, fee status)
- Issue notifications to staff and students
- Export reports (enrolments, attendance, completions) for compliance reporting to ASQA and DET

### 2.4 Functions used by ICT staff

- Administer accounts (via Active Directory integration)
- Configure course shells, permissions, user groups
- Support, troubleshoot, and restore (per the Backup and Recovery Process)

## 3. User population and concurrent load

| Metric | Value |
|---|---|
| Total user accounts | ~860 (~800 students + ~60 staff) |
| Typical concurrent users (weekday teaching hours) | ~200–300 |
| Peak concurrent users (assessment submission windows, last 2 weeks of term) | ~500–700 |
| Off-hours concurrent users (overnight, weekends) | ~20–50 |
| Assessment submission spike pattern | ~3× typical concurrent users for ~10–14 days each term |

## 4. Data stored

| Data category | Approx volume | Storage location | Notes |
|---|---|---|---|
| Student records (PII, enrolment, fee status) | ~50 MB | MySQL DB | Subject to Privacy Act 1988 + APPs |
| Course content (text, structured materials) | ~10 GB | MySQL DB + filesystem references | Authored in LMS by trainers |
| Course attachments (PDFs, slides, video links) | ~80 GB | Filesystem on LMS server | Growing ~15 GB / year |
| Student submissions (assessments) | ~30 GB | Filesystem on LMS server | Growing ~10 GB / year; retained per RTO records-retention obligations |
| Gradebook / outcomes | ~5 GB | MySQL DB | Statutory retention applies |
| Attendance records | ~2 GB | MySQL DB | Statutory retention applies |
| Audit logs (LMS-internal) | ~1 GB | MySQL DB | Rolling 12-month retention |
| **Total data footprint (current)** | **~178 GB** | (consistent with ~250 GB allocated storage at ~70% used, per the LMS Server Status record) | |

## 5. Authentication and single sign-on

- Integrated with Active Directory via LDAP bind (current state).
- Single sign-on from AD-joined campus desktops via Integrated Windows Authentication.
- Off-campus access requires interactive sign-in (AD credentials + MFA for staff with grading or course-management roles, per the User Access Policy).

## 6. Integration points

| External system | Integration type | Direction | Purpose |
|---|---|---|---|
| Active Directory 2016 | LDAP bind | LMS → AD | Authentication |
| Application Services system (Accounting / Office Admin) | Manual export / batch import | LMS → AppSvc (enrolment data); AppSvc → LMS (fee status flags) | Tuition fee management |
| Office 365 (email) | SMTP outbound | LMS → O365 | Student and staff notifications |
| ASQA / DET reporting | Manual export (CSV) | LMS → external regulators | Statutory compliance reporting |

## 7. Reporting and export requirements

- Monthly attendance report (PDF + CSV)
- Quarterly enrolments and completions report
- Annual ASQA AVETMISS reporting export (statutory)
- Ad-hoc grade and submission exports per Program Leader request

## 8. Browser and device support

- **Supported browsers (current):** Microsoft Edge (Chromium), Google Chrome, Mozilla Firefox, Apple Safari — last two major versions of each.
- **Mobile / tablet:** the LMS web UI is responsive; supports student access from personal mobile devices for read-only and submission-upload use cases. Trainer authoring is desktop-only.
- **Native apps:** none currently.

## 9. Service-level expectations

| Service-level metric | Current value | Migration target |
|---|---|---|
| Availability (rolling 12 months) | 99.2% | **99.9%** (per ICT Strategic Plan) |
| RPO (acceptable data loss in incident) | ~24 hours (nightly backups) | **≤ 1 hour** (per LMS Cloud Migration Requirements) |
| RTO (time to recover from a major outage) | ~7–11 hours (per Backup and Recovery Process) | **≤ 4 hours** (per LMS Cloud Migration Requirements) |
| Support response (during business hours) | Best-effort by YAT ICT + MTS | ≤ 1 hour from cloud vendor for severity-1 incidents (per LMS Cloud Migration Requirements) |

## 10. Backup and maintenance windows

- **Backup window:** nightly, 22:00–04:00 local time (Melbourne).
- **Maintenance window:** Sunday 02:00–06:00 local time, by prior change-management notification.
- **Restrictions:** no maintenance during assessment submission windows (last 2 weeks of each term) except for severity-1 incidents.

## 11. Accessibility

The LMS must meet **WCAG 2.1 Level AA** conformance, consistent with YAT's obligations under the *Disability Discrimination Act 1992* (Cth) and good practice for an Australian RTO.

## 12. Data residency

**All YAT student personal information and student records must remain within Australia** to support compliance with the *Privacy Act 1988*, the Australian Privacy Principles (APP 8 — cross-border disclosure), and the *Standards for RTOs 2015*. Any cloud-hosted infrastructure for the LMS must be deployed in an Australian region (e.g. AWS `ap-southeast-2` Sydney).

## Related references

- ICT Strategic Plan — target availability and direction
- ICT Operational Costing — LMS — current operational cost structure
- LMS Server Status (ICT) — current operational state of the LMS server
- Backup and Recovery Process (ICT) — current backup operations
- Change Management Procedure (intranet policies) — change governance
- Privacy / Data Handling Policy (intranet policies) — data-residency obligations
- User Access Policy (intranet policies) — authentication and access-control requirements
