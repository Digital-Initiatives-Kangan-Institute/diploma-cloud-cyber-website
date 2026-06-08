---
title: 'Migration Requirements'
description: 'YAT-defined requirements the 2023 website cloud migration had to meet — re-host the existing site, preserve content and enquiry intake, Australian region, cost-minimal single-AZ pilot, preserve integrations.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
  - s1-cl1-at3
  - s1-cl2-at1
  - s1-cl3-at1
order: 3
---

## Context

The following functional and non-functional requirements for the **Website Cloud Migration** were established by YAT ICT and YAT Marketing & Admissions. The migration MTS delivered was evaluated against these requirements. The Consultation Notes filed against this engagement record the consultation these requirements were derived from.

This engagement was a **deliberately low-risk first cloud pilot**. The requirements were framed to get the Website running in the cloud simply and cost-effectively — *not* to make it highly available. The availability and recovery limitations below were accepted by YAT for the pilot and flagged for a future engagement.

## Requirements

The website cloud migration had to:

- **Re-host the existing Website without redesign.** The migration was a lift-and-shift of the existing public website — marketing site, course catalogue, and online enquiry / application intake — onto cloud infrastructure. The existing CMS and the existing content were preserved as-is. No content redesign, information-architecture change, or CMS replacement was in scope.

- **Preserve the Website’s database and content.** The CMS database (page content, course catalogue, and submitted enquiry / application records) and all static assets (images, documents, downloads) were migrated intact, with post-migration verification that content and submitted records were complete.

- **Keep all data within Australia.** Website content and the personal information contained in enquiry and application submissions had to remain onshore to support the *Privacy Act 1988* (APP 8). The cloud environment was deployed in an Australian region (AWS `ap-southeast-2`).

- **Be simple and cost-minimal.** As a pilot, the deployment was to be the smallest sensible footprint that ran the Website reliably under normal load — a single compute instance, a single managed database, and object storage for static assets — in a **single Availability Zone**. Year-round redundant capacity was not to be carried.

- **Accept a basic-availability baseline (no formal HA or DR).** No formal availability SLA or recovery-time objective was set for the pilot. High availability (multi-AZ fault tolerance, autoscaling) and disaster recovery (backup-and-restore strategy, cross-region recovery) were **explicitly excluded** and deferred for a future engagement. Routine automated backups of the database were configured for basic data protection, but no tested recovery objective was committed.

- **Handle enrolment-enquiry peaks better than the on-premises server.** The Website’s load is light for most of the year with predictable peaks during the January–February enrolment-enquiry period. The cloud deployment had to serve those peaks without the performance degradation experienced on the strained on-premises server — but sized for the peak cost-effectively, not over-provisioned year-round.

- **Preserve existing integrations.** The migrated Website had to continue to support:
  - Enquiry / application form submission with email notification to the YAT Admissions team
  - Forwarding of submitted enquiry / application records to the YAT student-administration intake process
  - TLS (HTTPS) on the public domain

- **Cut over outside the enrolment peak.** Production cutover had to avoid the January–February enrolment-enquiry peak, to protect the Website’s busiest intake window.

- **Hand over cleanly to YAT ICT.** The migration had to deliver as-built documentation and an operations runbook sufficient for YAT in-house ICT to operate and support the Website after the engagement closed.
