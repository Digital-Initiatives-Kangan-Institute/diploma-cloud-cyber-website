---
title: 'Engagement Role Brief'
description: 'Role definitions and engagement-context summary for the MTS LMS Global Expansion & Disaster Recovery project — who does what, who reports to whom, who has authority.'
appearsIn:
  - s1-cl2-at1
order: 2
---

This brief sets out the roles, responsibilities, and reporting relationships for the MTS LMS Global Expansion & Disaster Recovery engagement. The Master Services Agreement (§§4–5, §10) is the authoritative source for engagement scope and governance; this brief is the operational reference held by each role during day-to-day work.

## Engagement context

YAT College has engaged MTS Consulting to extend the LMS cloud platform to support YAT's new offshore campus partnership in India, and to make the platform recoverable in a disaster. The engagement is structured in two sequential Phases:

1. **Phase 1 — Disaster Recovery Plan.** Design of the changes required to serve a global user base; design of the cross-region disaster recovery approach against agreed recovery objectives; design of the infrastructure-as-code approach and the data-residency arrangement (including the audit/access-log microservice); preparation of the Disaster Recovery Plan and supporting solution design; and presentation of the plan to YAT for approval before any implementation.
2. **Phase 2 — Implementation.** Implementation of the approved design — web-scale serving, the audit/access-log microservice, cross-region backup and recovery, and infrastructure-as-code — with validation, documentation, operational handover, and finalisation for sign-off under YAT's Change Management Procedure.

Cloud infrastructure work is in scope for MTS; the LMS application, the India-cohort data, cutover, organisational change management, and end-user support are retained by YAT in-house teams. The scope split is summarised in §3 below and detailed in the Master Services Agreement.

## Roles in this engagement

### MTS Consultant

The Consultant is the day-to-day delivery role on the MTS side.

| | |
|---|---|
| **Reports to** | MTS Senior Consultant |
| **Responsibilities** | Design the architecture changes, the disaster recovery approach, the infrastructure-as-code, and the audit/access-log microservice; produce the solution design, Disaster Recovery Plan, and Deployment Report required for each Phase; implement and validate the approved design in Phase 2; engage with the YAT ICT Manager on acceptance review and feedback. |
| **Authorities** | Technical decisions within agreed scope. Raises Change Requests for scope, deliverable, fee, or timing variations (Change Requests are approved per the MSA §9 and the YAT Change Management Procedure). |
| **Key liaisons** | MTS Senior Consultant (supervision, deliverable approval); MTS Engagement Director (escalation); YAT ICT Manager (acceptance). |

### MTS Senior Consultant — Pat Lin

The Senior Consultant supervises the day-to-day work on the MTS side and is the primary point of engagement-level contact with YAT.

| | |
|---|---|
| **Reports to** | MTS Engagement Director (Jordan Chen) |
| **Responsibilities** | Supervise the work of the MTS Consultant assigned to the engagement; liaise with the YAT ICT Manager for acceptance and routine engagement matters; approve Consultant-produced Deliverables before submission to YAT; provide weekly written status reporting to YAT per MSA §10.2. |
| **Authorities** | Approves Deliverables for submission to YAT; authorises Change Requests for raising with the YAT ICT Manager; engagement-level escalation point for the YAT side. |
| **Key liaisons** | MTS Consultant (supervision); MTS Engagement Director (reporting); YAT ICT Manager (engagement liaison). |

### YAT ICT Manager — Sam Walker (Engagement Sponsor)

The ICT Manager is the Engagement Sponsor on the YAT side and the named acceptance authority for all Deliverables.

| | |
|---|---|
| **Reports to** | YAT Chief Financial Officer |
| **Responsibilities** | Project Sponsor for the LMS Global Expansion & Disaster Recovery project; acceptance authority for each Deliverable (MSA §8); approves the Disaster Recovery Plan at the Phase 1 presentation; approves Change Requests within the operational thresholds in the YAT Change Management Procedure; escalates to YAT senior management for material changes; operational owner of the YAT Change Management Procedure. |
| **Authorities** | Per the YAT User Access Policy §4 (Role groups and permissions matrix); per the YAT Change Management Procedure for low and medium-risk changes. |
| **Key liaisons** | MTS Senior Consultant (engagement liaison); YAT CFO (escalation); affected YAT business unit heads (per change-management thresholds). |

### YAT Senior Management

YAT senior management is the escalation and high-risk sign-off layer for the engagement.

| | |
|---|---|
| **Holds** | YAT Chief Financial Officer (Robin Ng), Chief Operating Officer (Alex Reid), and Chief Executive Officer, as appropriate to the matter. |
| **Responsibilities** | Sign-off on changes meeting the high-risk thresholds in the YAT Change Management Procedure; sign-off on the Phase 2 finalisation (MSA §6.2 D2.2); escalation point for unresolved engagement matters per MSA §10.3. |
| **Key liaisons** | YAT ICT Manager (engagement sponsor); MTS Engagement Director (counterpart escalation). |

## Scope summary

The Master Services Agreement (§§4–5) is the authoritative reference for engagement scope. Summary:

**In scope for MTS**

- Solution design, Disaster Recovery Plan, and the plan presentation for approval (Phase 1)
- Implementation of the approved design — web-scale serving, audit/access-log microservice, cross-region backup and recovery, infrastructure-as-code (Phase 2)
- Validation/testing, Deployment Report, and operational handover (Phase 2)
- All MTS-produced consulting documentation

**Out of scope for MTS — retained by YAT in-house IT**

- LMS application installation, configuration, and the application-level work to emit events for the audit/access-log microservice
- India-cohort onboarding, including creation and migration of student and course data
- Production cutover of any extended or recovered service
- Organisational change-management (CAB process, communications, training, support ramp)
- Post-handover application-level support of the LMS

Out-of-scope items are funded through YAT-internal cost categories for this project.

## Related documents

- Master Services Agreement (this project) — authoritative engagement terms, deliverables, fees, governance
- Functional & Non-Functional Requirements (this project) — the explicit requirements for the expansion and disaster recovery
- Data Residency & Sovereignty Requirements (this project) — the data-residency obligations the design must meet
- LMS Application Specification (LMS Cloud Infrastructure project) — functional and technical specification of the DOODLE LMS application
