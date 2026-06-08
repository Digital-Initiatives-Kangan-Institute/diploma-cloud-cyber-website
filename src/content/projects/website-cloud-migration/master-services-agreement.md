---
title: 'Master Services Agreement'
description: 'Master Services Agreement between YAT College and MTS Consulting governing the 2023 Website Cloud Migration — YAT’s first cloud project.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
  - s1-cl1-at3
  - s1-cl2-at1
  - s1-cl3-at1
order: 1
---

> **Engagement closed 12 May 2023.** All Deliverables under this Agreement have been Accepted and the Closure Pack has been signed off. Retained on the YAT intranet for reference and audit per the YAT Records Management Policy. This was YAT’s first cloud engagement.

**MASTER SERVICES AGREEMENT**

| | |
|---|---|
| **Agreement reference** | YAT-MTS-2023-001 |
| **Effective date** | 6 February 2023 |
| **Project** | Website Cloud Migration |
| **Status** | Closed |

---

## 1. Parties

**Client:** **YAT College Pty Ltd** (ABN 12 345 678 901), a Registered Training Organisation, of 175 Cremorne Street, Cremorne VIC 3121, Australia (**YAT**).

**Consultant:** **MP Tech Solutions Pty Ltd** (ABN 21 098 765 432) trading as **MTS Consulting**, of Level 4, 200 Smith Street, Collingwood VIC 3066, Australia (**MTS** or **the Consultant**).

YAT and MTS are referred to collectively as the **Parties** and individually as a **Party**.

## 2. Background

A. YAT operates a public-facing website (the **Website**) — marketing site, course catalogue, and online enquiry / application intake — together with its content management system (CMS) and supporting database. The Website was hosted on a single on-premises web server at the YAT Cremorne campus.

B. The on-premises web server was approaching end of warranty, and the Website experienced performance strain during the January–February enrolment-enquiry peaks. YAT’s ICT Strategic Plan sets a direction of reducing dependency on in-house server infrastructure.

C. YAT determined to migrate the Website to a cloud-hosted environment as a **deliberately low-risk first cloud engagement** — a pilot to build YAT’s and its consultancy’s confidence with cloud delivery ahead of the larger, mission-critical LMS and Accounting system migrations to follow. A simple, cost-minimal deployment was sought; high availability and disaster recovery were **expressly excluded** from this Engagement (see clause 5).

D. YAT selected MTS to provide the cloud infrastructure services described in this Agreement. MTS warrants that it has the capability, qualifications, and resources to provide the Services.

E. The Parties wish to record the terms on which MTS will provide the Services to YAT.

## 3. Definitions and interpretation

### 3.1 Definitions

In this Agreement, unless the context requires otherwise:

| Term | Meaning |
|---|---|
| **Acceptance** | YAT’s written confirmation that a Deliverable meets the acceptance criteria in clause 8. |
| **Business Day** | A day other than a Saturday, Sunday, or public holiday in Victoria, Australia. |
| **Change Request** | A written request to vary the scope, deliverables, fees, or timing of the Services, raised and approved under clause 9. |
| **Change Management Procedure** | YAT’s documented ICT Change Management Procedure (intranet), incorporated into this Agreement by reference. |
| **CMS** | The content management system used to author and publish the Website. |
| **Confidential Information** | Information disclosed by one Party to the other that is identified as confidential or that a reasonable person would treat as confidential, including YAT-held personal information and any non-public technical, operational, or commercial information of either Party. |
| **Cutover** | The transition of Website service from the on-premises web server to the cloud-hosted environment, including DNS changes and ramp-down of the on-premises server. |
| **Deliverable** | An output, document, or running infrastructure component listed in clause 6. |
| **Effective Date** | The date set out at the top of this Agreement. |
| **Engagement** | The total of all work performed under this Agreement across both Phases. |
| **MSA** | This Master Services Agreement. |
| **Phase** | A phase of the Engagement as described in clause 4. |
| **Services** | The services to be performed by MTS as described in clause 4. |
| **Website** | YAT’s public-facing website, its CMS, and its supporting database, as described in clause 2.A. |

### 3.2 Interpretation

References to a Phase include all Deliverables and milestones within that Phase. Headings are for convenience only and do not affect interpretation. The singular includes the plural and vice versa.

## 4. Services and scope of work

### 4.1 Engagement structure

MTS provided the Services in two sequential Phases:

| Phase | Title | Scope summary |
|---|---|---|
| Phase 1 | Migration Design and Build | Design a simple, cost-minimal AWS hosting environment for the Website in an Australian region; provision the cloud foundation (identity and access, virtual network, single compute instance, managed database, object storage for static assets); re-host the existing CMS and migrate the Website database and content; configure DNS and TLS; smoke-test the migrated Website. |
| Phase 2 | Cutover, Stabilisation and Handover | Execute production Cutover from the on-premises server; provide stabilisation support; produce as-built documentation and an operations runbook; conduct knowledge transfer to YAT ICT; produce the project Closure Pack and obtain closure sign-off under YAT’s Change Management Procedure. |

### 4.2 Detailed scope

Detailed scope is set out in the supporting project documents on the YAT intranet for this project — the Engagement Role Brief, the Website Migration Requirements, and the ICT Manager Consultation Notes.

MTS performed the Services with reasonable skill and care, by appropriately qualified personnel, and in compliance with YAT’s documented policies and procedures referenced in clauses 9 and 12 of this Agreement.

## 5. Out of scope

The following work is **not** included in this Engagement and remained the responsibility of YAT in-house teams, or was deferred to a later engagement as noted:

- **High availability and disaster recovery.** This pilot deploys a single Availability Zone baseline. Multi-AZ fault tolerance, autoscaling, cross-region disaster recovery, and any formal availability or recovery-time targets are expressly **out of scope** and deferred for YAT’s consideration in a later engagement.
- Website content authoring, information architecture, and visual redesign (retained by YAT Marketing; MTS migrated the existing site as-is);
- Domain-registrar account changes beyond the DNS record updates required for Cutover (managed by YAT ICT);
- Active Directory and email-platform changes beyond those required to preserve the enquiry-notification integration (managed by YAT ICT);
- Ongoing operational support of the Website after acceptance of the Phase 2 Closure Pack (retained by YAT ICT); and
- All routine end-user and public-visitor support.

Any change to this allocation required a Change Request under clause 9.

## 6. Deliverables and milestones

### 6.1 Phase 1 Deliverables

| Ref | Deliverable | Format | Acceptance evidence | Actual completion |
|---|---|---|---|---|
| D1.1 | Website cloud hosting design | Written design (single-AZ baseline) | YAT ICT Manager review | 24 February 2023 |
| D1.2 | Cloud environment provisioned | Running cloud infrastructure | Smoke-test evidence; ICT Manager review | 17 March 2023 |
| D1.3 | Website re-hosted and migrated | Running Website on cloud (pre-Cutover) | Functional smoke-test; content and enquiry-form verification | 31 March 2023 |

### 6.2 Phase 2 Deliverables

| Ref | Deliverable | Format | Acceptance evidence | Actual completion |
|---|---|---|---|---|
| D2.1 | Cutover executed | Production traffic on cloud Website; on-prem server in ramp-down | Post-cutover check (no Severity 1 incidents) | 14 April 2023 |
| D2.2 | As-built documentation and operations runbook | Written documentation set | YAT ICT acceptance | 28 April 2023 |
| D2.3 | Project Closure Pack | Closure Pack including residual-risk register and sign-off records | Closure sign-off under YAT Change Management Procedure | 12 May 2023 |

The residual-risk register filed with D2.3 explicitly recorded the single-AZ baseline (no high availability or disaster recovery) as an accepted residual risk for the pilot, to be revisited in a future engagement.

## 7. Term, suspension, and termination

### 7.1 Term

This Agreement commenced on the Effective Date and continued until Acceptance of Deliverable D2.3 (Phase 2 Closure Pack), which occurred on 12 May 2023.

### 7.2 Suspension

YAT was entitled to suspend the Engagement at any time by written notice to MTS. No suspensions were invoked.

### 7.3 Termination for convenience

YAT was entitled to terminate this Agreement by giving MTS not less than 20 Business Days’ written notice. This right was not invoked.

### 7.4 Termination for cause

Either Party was entitled to terminate this Agreement immediately by written notice if the other Party committed a material breach (with the standard 10-Business-Day remedy period for breaches capable of remedy) or became insolvent. No termination for cause occurred.

### 7.5 Effect of termination

Clauses 12 (Confidentiality), 13 (Intellectual Property), and 14 (Warranties, Liability, Insurance) survive the closure of this Agreement.

## 8. Acceptance

### 8.1 Submission

MTS submitted each Deliverable to the YAT ICT Manager for review with all evidence specified in clause 6 for that Deliverable.

### 8.2 Review period

YAT reviewed each submitted Deliverable within **5 Business Days** of submission and either accepted it in writing or rejected it in writing, specifying the reasons by reference to the acceptance evidence requirements in clause 6.

### 8.3 Re-submission

Where a Deliverable was rejected, MTS remediated and re-submitted within a reasonable period agreed with YAT. The review cycle in clause 8.2 applied to each re-submission. The acceptance record for this Engagement shows one Deliverable required re-submission (D1.3 — minor enquiry-form notification defect), remediated and Accepted within agreed timeframes.

### 8.4 Phase progression

MTS did not commence Phase 2 Deliverables until all Phase 1 Deliverables had been Accepted.

## 9. Change control

Substantive changes to the scope, Deliverables, fees, or timing of the Services were governed by the YAT Change Management Procedure (incorporated by reference) and the Change Request process. A Change Request set out the proposed change, the reason, the impact on scope / Deliverables / fees / timing / risk, any rollout or rollback arrangements, and the proposed approval authority. Once approved by the YAT ICT Manager, a Change Request was appended to this Agreement as a numbered variation.

No Change Requests were raised during this Engagement.

## 10. Governance and key contacts

### 10.1 Principals

| Role | YAT | MTS |
|---|---|---|
| **Project Sponsor** | Sam Walker, ICT Manager | — |
| **Engagement Director** | — | Jordan Chen, Engagement Director |
| **Senior Consultant** | — | Pat Lin, Senior Consultant |
| **Business owner (Website)** | Dana Mercer, Marketing & Admissions Manager | — |
| **Acceptance authority** | Sam Walker, ICT Manager | — |
| **Escalation contact** | Margaret Schofield, Chief Financial Officer | Jordan Chen, Engagement Director |

### 10.2 Reporting and meetings

- The MTS Senior Consultant provided a weekly written status report to the YAT ICT Manager.
- The Parties’ principals met fortnightly during the active engagement.

### 10.3 Escalation

Matters that could not be resolved between the YAT ICT Manager and the MTS Senior Consultant were escalated to the MTS Engagement Director (consultant side), then the YAT Chief Financial Officer (client side). The escalation chain was not invoked during this Engagement.

## 11. Fees and payment

### 11.1 Phase fees

MTS was paid the following fixed fees on Acceptance of each Phase (excluding GST):

| Phase | Fee (AUD ex GST) |
|---|---:|
| Phase 1 — Migration Design and Build | $28,000 |
| Phase 2 — Cutover, Stabilisation and Handover | $12,000 |
| **Total Engagement** | **$40,000** |

### 11.2 Payment terms

Phase fees were invoiced on Acceptance of the final Deliverable for that Phase and payable within **14 Business Days** of the invoice date. All invoices under this Engagement were paid on time.

### 11.3 Expenses

Travel and reasonable disbursements were billed at cost. Total disbursements under this Engagement: $310.

### 11.4 GST

All amounts in this Agreement are exclusive of GST. GST was added to all invoices in accordance with the applicable law.

## 12. Confidentiality and data protection

### 12.1 Confidentiality

Each Party agreed to hold the other Party’s Confidential Information in confidence, use it only for the purposes of this Engagement, and not disclose it except to personnel, advisers, or sub-contractors with a legitimate need to know who were bound by equivalent obligations of confidentiality.

### 12.2 Personal information

MTS handled YAT-held personal information (including website enquiry and application data) in accordance with the *Privacy Act 1988* (Cth) and the Australian Privacy Principles, and the YAT Privacy / Data Handling Policy (incorporated by reference).

### 12.3 Data residency

YAT data was processed and stored within Australia throughout the Engagement. Cloud services hosting YAT data were configured to use an Australian region (AWS `ap-southeast-2`).

### 12.4 Data return or destruction

On closure of this Agreement, MTS certified that all YAT Confidential Information in its possession had been securely destroyed, except where retention was required by law.

## 13. Intellectual property

### 13.1 Pre-existing IP

Each Party retained ownership of intellectual property it owned before the Effective Date or developed independently of the Engagement (**Pre-existing IP**).

### 13.2 New IP

Intellectual property created specifically for YAT under this Agreement (**New IP**) was assigned to YAT on payment of the relevant Phase fee. New IP includes the as-deployed cloud infrastructure configuration, environment-specific scripts, and Deliverable documents.

### 13.3 Background tooling

Generic tooling, scripts, libraries, accelerators, methodologies, and architectural patterns that MTS uses across multiple engagements (**Background Tooling**) remained the Pre-existing IP of MTS. MTS granted YAT a perpetual, royalty-free, non-exclusive licence to use Background Tooling incorporated into any Deliverable to the extent necessary for YAT’s use of that Deliverable.

### 13.4 No third-party IP infringement

MTS warranted that the Deliverables would not infringe the intellectual property rights of any third party. No infringement claims have been received.

## 14. Warranties, liability, and insurance

### 14.1 Warranties

MTS warranted that the Services would be performed with reasonable skill and care by appropriately qualified personnel; that it held all licences and authorisations required; and that it would comply with all applicable laws and regulations.

### 14.2 Insurance

MTS maintained throughout the Engagement professional indemnity insurance of not less than $5,000,000 per claim, public liability insurance of not less than $10,000,000 per occurrence, and workers’ compensation insurance as required by law.

### 14.3 Liability cap

The total aggregate liability of each Party under or in connection with this Agreement was limited to twice the aggregate fees paid by YAT, with the standard carve-outs for confidentiality breach, IP infringement, wilful default, and personal injury or death.

### 14.4 Exclusion of indirect loss

Neither Party was liable to the other for any indirect, consequential, special, or punitive loss.

## 15. General provisions

This Agreement was governed by the laws of Victoria, Australia; the Parties submitted to the exclusive jurisdiction of the courts of Victoria. Disputes were to be resolved by good-faith discussion, escalation per clause 10.3, mediation, and (as a last resort) litigation; no formal disputes arose. Notices were to be in writing to the addresses in clause 1. This Agreement constituted the entire agreement between the Parties about its subject matter. The standard no-waiver, severability, assignment-by-consent, and counterparts provisions applied.

## 16. Signatures

**Executed as an Agreement on 6 February 2023.**

---

**Signed for and on behalf of YAT College Pty Ltd:**

|  |  |
|---|---|
| Signature | *Signed: M. Schofield (electronic)* |
| Name | **Margaret Schofield** |
| Title | Chief Financial Officer |
| Date | 6 February 2023 |
| Witness signature | *Signed: S. Walker (electronic)* |
| Witness name | **Sam Walker** |
| Witness title | ICT Manager |

---

**Signed for and on behalf of MP Tech Solutions Pty Ltd (trading as MTS Consulting):**

|  |  |
|---|---|
| Signature | *Signed: J. Chen (electronic)* |
| Name | **Jordan Chen** |
| Title | Engagement Director |
| Date | 6 February 2023 |
| Witness signature | *Signed: M. Tate (electronic)* |
| Witness name | **Morgan Tate** |
| Witness title | Managing Director, MTS Consulting |

---

> **Closure record.** This Agreement closed 12 May 2023 with Acceptance of Deliverable D2.3 (Project Closure Pack). Closure sign-off was obtained from the YAT ICT Manager. The single-AZ baseline (no high availability or disaster recovery) was recorded as an accepted residual risk for the pilot. Closure Pack and associated records are filed under the YAT Records Management Policy retention schedule for completed external-engagement records.
