---
title: 'Backup and Recovery Process — LMS'
description: 'Current-state backup process and worst-case recovery steps for the YAT on-prem LMS, including measured RTO and RPO against ICT Strategic Plan targets.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
  - s1-cl1-at3
order: 8
uocReferences:
  - '[ICTCLD502 PC 2.3] Estimate recovery objectives for multi-tier web components and for overall architecture'
  - '[ICTCLD502 KE 4] recoverability as measured by recovery time (RTO) and recovery point (RPO) objectives'
---

## Document control

| | |
|---|---|
| Document title | Backup and Recovery Process — Learning Management System |
| Document owner | Sam Walker, ICT Manager |
| Prepared by | YAT ICT |
| Review cycle | Annual, or on material change to the LMS environment or backup tooling |
| Classification | Internal — ICT, and engaged consultants on signed MSA |

## 1. Purpose

This document records the current backup process for the YAT on-premises Learning Management System (LMS), and the worst-case recovery steps and recovery objectives the current process achieves. It is the operational reference for incident response involving the LMS and the planning input for any work that proposes to improve recovery outcomes.

## 2. Backup process

A complete, full backup of the YAT LMS environment runs every night, captured to tape by the System Management server. The backup covers:

- Windows Server 2016 system state (LMS server)
- The MySQL database data files (DOODLE schema and content)
- LMS application binaries and configuration
- LMS attachments and uploaded content (course materials, student submissions)

Tape backups are rotated offsite each business day per the Backup and Retention Policy.

**Backup window:** nightly, 22:00 – 04:00 local time. The LMS remains available during the backup window; the database is captured online against a brief consistency snapshot.

## 3. Recovery process

To completely recover the YAT LMS from backups in the event of a major incident — server hardware failure, ransomware, irrecoverable database corruption, or similar — the following steps are executed in sequence:

| Duration | Recovery step |
|---|---|
| 4–8 hours | Request the relevant tape from offsite storage and have it delivered to the Cremorne campus |
| 1 hour | Restore Windows Server 2016 system state and LMS application binaries from tape onto replacement hardware |
| 1 hour | Restore the MySQL database from the latest nightly backup and verify schema integrity |
| 1 hour | Verify LMS application connectivity to MySQL, re-authenticate against Active Directory, and confirm end-user sign-in works |

## 4. Recovery objectives — current

| Objective | Current achievement | Target (ICT Strategic Plan) |
|---|---|---|
| Recovery Time Objective (RTO) — worst case | ~7–11 hours from incident declaration to LMS operational | ≤ 4 hours |
| Recovery Point Objective (RPO) — worst case | Up to 24 hours of data loss possible (anything written since the most recent successful nightly backup) | ≤ 1 hour |

## 5. Gap and planning context

The current recovery objectives sit materially below the targets stated in the ICT Strategic Plan. The dominant contributor to the RTO gap is the offsite tape retrieval step (4–8 hours of the total 7–11 hours). The dominant contributor to the RPO gap is the nightly-only backup cadence.

Closing this gap is one of the explicit drivers of the LMS Cloud Migration engagement. Forward design work for the migrated LMS is required to demonstrate how the target RTO ≤ 4 hours and RPO ≤ 1 hour will be achieved by the new platform.

## 6. References

- ICT Strategic Plan — five-year ICT direction, including the RTO / RPO targets cited above
- Backup and Retention Policy (intranet policies) — authoritative source for retention schedule and offsite rotation
- LMS Server Specifications and Current Status — the asset this process protects
- Change Management Procedure (intranet policies) — governs material changes to this process
