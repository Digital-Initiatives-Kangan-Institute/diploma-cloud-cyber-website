---
title: 'Accounting System Application Specification'
description: 'Functional and technical specification of the YAT Accounting & Office Administration system (Ledgerline) — functions, user load, data, integrations, SLAs, and data residency.'
appearsIn:
  - s1-cl1-at1
order: 14
uocReferences:
  - '[ICTCLD502 AC 5] business and functionality requirements'
  - '[ICTCLD502 AC 3] information and data sources required to design and implement cloud infrastructure'
  - '[ICTCLD401 PC 1.8] Define workload according to business requirements and needs'
---

## Document control

| | |
|---|---|
| Document title | YAT Accounting & Office Administration System — Application Specification |
| Document owner | Sam Walker, ICT Manager |
| Application | Ledgerline Finance & Office Suite (commercial, proprietary) |
| Review cycle | Annual, or on material change to the application stack or operating model |
| Classification | Internal — ICT, Finance, and engaged consultants on signed MSA |

## 1. Overview

YAT runs **Ledgerline Finance & Office Suite** as its accounting and office-administration system, hosted on the Application Services server. Ledgerline is a **commercial, proprietary product**, licensed per named user, with vendor support provided under a paid annual support and maintenance contract.

Ledgerline runs on **Windows Server 2016** with a **Microsoft SQL Server** database. Payroll is **not** run on Ledgerline — YAT outsources payroll to an external bureau (see §6); Ledgerline holds the general ledger, accounts payable/receivable, student fee billing, asset register, procurement, and budgeting functions.

## 2. Functions

### 2.1 Functions used by the finance team

- General ledger and chart of accounts
- Accounts payable (supplier invoices, payment runs)
- Accounts receivable / student fee billing and debtor management
- Bank reconciliation
- Budgeting and management reporting
- Business Activity Statement (BAS) and statutory financial reporting preparation

### 2.2 Functions used by administrative staff

- Raise and approve purchase orders (procurement)
- Maintain supplier and customer records
- Asset register entries and depreciation tracking
- Expense claims and approvals

### 2.3 Functions used by management

- View management reports and dashboards (budget vs actual, debtor ageing)
- Approve purchase orders and payment runs above delegation thresholds

### 2.4 Functions used by ICT staff

- Administer accounts (via Active Directory integration)
- Configure roles, approval workflows, and the financial period calendar
- Support, troubleshoot, and restore (per the Backup and Recovery Process)

## 3. User population and concurrent load

| Metric | Value |
|---|---|
| Total user accounts | ~60 staff (≈6 finance, ≈20 administrative, ≈34 management/general with limited or read-only access) |
| Typical concurrent users (business hours) | ~15–25 |
| Peak concurrent users (month-end close, fee-billing runs, EOFY) | ~45–55 |
| Out-of-hours concurrent users | negligible — system is effectively idle overnight and at weekends |
| Peak pattern | predictable monthly (month-end close, ~2–3 days) and annual (EOFY, June); no student-driven load |

*Contrast with the LMS: this is an internal, staff-only, business-hours workload with no 24/7 or assessment-window demand.*

## 4. Data stored

| Data category | Approx volume | Storage location | Notes |
|---|---|---|---|
| General ledger, AP/AR, transactions | ~8 GB | SQL Server DB | Financial records — 7-year retention (ATO / tax law) |
| Student fee billing / debtor records (PII) | ~3 GB | SQL Server DB | Subject to Privacy Act 1988 + APPs |
| Supplier and customer master records | ~1 GB | SQL Server DB | |
| Asset register and depreciation | ~0.5 GB | SQL Server DB | |
| Document attachments (invoices, POs, receipts — scanned) | ~14 GB | Filesystem on Application Services server | Growing ~4 GB / year |
| Audit logs (financial-system internal) | ~1 GB | SQL Server DB | 7-year retention for financial audit |
| **Total data footprint (current)** | **~28 GB** | | Growing ~5 GB / year |

## 5. Authentication and single sign-on

- Integrated with Active Directory via LDAP bind (current state).
- Single sign-on from AD-joined campus desktops via Integrated Windows Authentication.
- Off-campus access requires interactive sign-in (AD credentials + MFA for all finance and approval roles, per the User Access Policy). Off-campus use is limited — the system is primarily accessed on-campus.

## 6. Integration points

| External system | Integration type | Direction | Purpose |
|---|---|---|---|
| Active Directory 2016 | LDAP bind | Ledgerline → AD | Authentication |
| Learning Management System (DOODLE) | Manual export / batch import | LMS → Ledgerline (enrolment data); Ledgerline → LMS (fee-status flags) | Tuition fee management |
| Payroll bureau (external) | Secure file transfer | Ledgerline → bureau (timesheet/cost-centre data); bureau → Ledgerline (payroll journals) | Outsourced payroll |
| Office 365 (email) | SMTP outbound | Ledgerline → O365 | Invoice/statement and approval notifications |
| Banking / payment gateway | Secure file (ABA) + portal | Ledgerline → bank | Payment runs, direct-debit fee collection |
| ATO / statutory reporting | Manual export | Ledgerline → external | BAS, statutory financial reporting |

## 7. Reporting and export requirements

- Monthly management reports (budget vs actual, debtor ageing)
- Quarterly BAS preparation export
- Annual financial statements and audit pack
- Ad-hoc cost-centre and debtor reports per management request

## 8. Browser and device support

- **Supported browsers (current):** Microsoft Edge (Chromium), Google Chrome — last two major versions.
- **Mobile / tablet:** limited; approvals (PO / payment) supported on tablet via the responsive web UI. Finance processing is desktop-only.
- **Native apps:** none.

## 9. Service-level expectations

| Service-level metric | Current value | Migration target |
|---|---|---|
| Availability (rolling 12 months, business hours) | 99.3% | **99.5%** (business-hours service; payroll outsourced, so 24/7 mission-critical availability is not required) |
| RPO (acceptable data loss in incident) | ~24 hours (nightly backups) | **≤ 1 hour** (financial transactions must not be lost) |
| RTO (time to recover from a major outage) | ~7–11 hours | **≤ 1 business day (≤ 8 business hours)** (tolerable because the system is business-hours-only and payroll is outsourced) |
| Support response | Best-effort by YAT ICT + Ledgerline vendor support | Maintain vendor support; cloud-vendor severity-1 response per the migration requirements |

*The lower availability target and longer RTO than the LMS reflect the different criticality profile — an internal, business-hours system with payroll outsourced.*

## 10. Backup and maintenance windows

- **Backup window:** nightly, 22:00–04:00 local time (Melbourne).
- **Maintenance window:** weekday evenings after 18:00 or weekends, by prior change-management notification.
- **Restrictions:** no maintenance during month-end close (last 2 business days + first 2 business days of each month) or during the EOFY period (mid-June to mid-July) except for severity-1 incidents.

## 11. Accessibility

As an internal staff system, Ledgerline is not subject to the same public-facing accessibility obligations as the LMS, but YAT applies **WCAG 2.1 Level AA** as good practice for staff-facing systems to support employees with disability.

## 12. Data residency

**All YAT financial records and personal information (staff and student billing data) must remain within Australia** to support compliance with the *Privacy Act 1988*, the Australian Privacy Principles (APP 8 — cross-border disclosure), and Australian financial-records retention obligations. Any cloud-hosted infrastructure for this system must be deployed in an Australian region (e.g. AWS `ap-southeast-2` Sydney).

## Related references

- ICT Strategic Plan — direction for reducing dependency on in-house server infrastructure
- Accounting System Operational Costing (ICT) — current operational cost structure
- Accounting System Server Specifications (ICT) — current operational state of the Application Services server
- Backup and Recovery Process (ICT) — current backup operations
- Change Management Procedure (intranet policies) — change governance
- Privacy / Data Handling Policy (intranet policies) — data-residency obligations
- User Access Policy (intranet policies) — authentication and access-control requirements
