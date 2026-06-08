---
title: 'Accounting System Application Specification'
description: 'Functional and technical specification of the YAT Accounting & Office Administration system (Ledgerline) — functions, user load, data, integrations, SLAs, and data residency — as deployed in AWS Sydney (single-AZ).'
appearsIn:
  - s1-cl1-at3
  - s1-cl2-at1
  - s1-cl3-at1
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

YAT runs **Ledgerline Finance & Office Suite** as its accounting and office-administration system. Ledgerline is a **commercial, proprietary product**, licensed per named user, with vendor support provided under a paid annual support and maintenance contract.

Migrated from its former on-premises Application Services server, Ledgerline now runs in **AWS region `ap-southeast-2` (Sydney)** as an internal single-Availability-Zone workload: the application on **EC2 (Windows Server 2016)** behind an **internal Application Load Balancer**, with the database on **Amazon RDS for Microsoft SQL Server**. Payroll is **not** run on Ledgerline — YAT outsources payroll to an external bureau (see §6); Ledgerline holds the general ledger, accounts payable/receivable, student fee billing, asset register, procurement, and budgeting functions. It is an internal back-office system reached by staff over the Site-to-Site VPN; it is not public-facing.

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
- Support, troubleshoot, and restore (per the Backup and Retention Policy)

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
| General ledger, AP/AR, transactions | ~8 GB | Amazon RDS (SQL Server) | Financial records — 7-year retention (ATO / tax law) |
| Student fee billing / debtor records (PII) | ~3 GB | Amazon RDS (SQL Server) | Subject to Privacy Act 1988 + APPs |
| Supplier and customer master records | ~1 GB | Amazon RDS (SQL Server) | |
| Asset register and depreciation | ~0.5 GB | Amazon RDS (SQL Server) | |
| Document attachments (invoices, POs, receipts — scanned) | ~14 GB | Amazon S3 | Growing ~4 GB / year |
| Audit logs (financial-system internal) | ~1 GB | Amazon RDS (SQL Server) | 7-year retention for financial audit |
| **Total data footprint (current)** | **~28 GB** | | Growing ~5 GB / year |

## 5. Authentication and single sign-on

- Integrated with Active Directory via LDAP bind, reached over the Site-to-Site VPN from the AWS environment back to campus AD.
- Single sign-on from AD-joined campus desktops via Integrated Windows Authentication.
- Off-campus access requires interactive sign-in (AD credentials + MFA for all finance and approval roles, per the User Access Policy). Off-campus use is limited — the system is primarily accessed on-campus.

## 6. Integration points

| External system | Integration type | Direction | Purpose |
|---|---|---|---|
| Active Directory 2016 | LDAP bind (over Site-to-Site VPN) | Ledgerline → AD | Authentication |
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

| Service-level metric | Current value (AWS single-AZ) | Notes |
|---|---|---|
| Availability (rolling 12 months, business hours) | 99.5% | Business-hours service; payroll outsourced, so 24/7 mission-critical availability is not required |
| RPO (acceptable data loss in incident) | ≤ 1 hour | RDS automated backups + transaction-log recovery |
| RTO (time to recover from a major outage) | ≤ 1 business day (≤ 8 business hours) | Tolerable because the system is business-hours-only and payroll is outsourced; single-AZ recovery relies on RDS restore rather than automatic failover |
| Support response | Maintained vendor support (Ledgerline) + cloud-platform severity-based response | |

*The lower availability target and longer RTO than the LMS reflect the different criticality profile — an internal, business-hours system with payroll outsourced. Reducing the RTO further (e.g. via Multi-AZ automatic failover) is a candidate for future improvement, not a current requirement.*

## 10. Backup and maintenance windows

- **Database backups:** Amazon RDS automated daily backups (7-day retention) plus transaction-log backups; document attachments versioned in Amazon S3.
- **Maintenance window:** weekday evenings after 18:00 or weekends, by prior change-management notification (aligned to the RDS maintenance window).
- **Restrictions:** no maintenance during month-end close (last 2 business days + first 2 business days of each month) or during the EOFY period (mid-June to mid-July) except for severity-1 incidents.

## 11. Accessibility

As an internal staff system, Ledgerline is not subject to the same public-facing accessibility obligations as the LMS, but YAT applies **WCAG 2.1 Level AA** as good practice for staff-facing systems to support employees with disability.

## 12. Data residency

**All YAT financial records and personal information (staff and student billing data) remain within Australia**, supporting compliance with the *Privacy Act 1988*, the Australian Privacy Principles (APP 8 — cross-border disclosure), and Australian financial-records retention obligations. This is satisfied by deploying the system entirely in the AWS `ap-southeast-2` (Sydney) region, with no cross-region replication of data outside Australia.

## Related references

- ICT Strategic Plan — direction for reducing dependency on in-house server infrastructure
- Accounting System Operational Costing (ICT) — current AWS operational cost structure
- Accounting System Infrastructure Specifications (ICT) — current AWS operational state
- Accounting System Cloud Architecture — Baseline Design — the deployed single-AZ architecture
- Backup and Retention Policy (intranet policies) — backup schedule, rotation, and retention
- Change Management Procedure (intranet policies) — change governance
- Privacy / Data Handling Policy (intranet policies) — data-residency obligations
- User Access Policy (intranet policies) — authentication and access-control requirements
