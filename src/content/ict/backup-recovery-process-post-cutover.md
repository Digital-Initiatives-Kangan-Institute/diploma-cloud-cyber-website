---
title: 'Backup and Recovery Process — LMS'
description: 'Current-state backup process and recovery steps for the AWS-hosted YAT LMS — RDS automated backups, point-in-time restore, and recovery objectives against ICT Strategic Plan targets.'
appearsIn:
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

This document records the current backup process for the AWS-hosted YAT Learning Management System (LMS), and the recovery steps and recovery objectives the current process achieves. It is the operational reference for incident response involving the LMS and the planning input for any work that proposes to improve recovery outcomes.

## 2. Backup process

The LMS environment is protected by AWS-native backup mechanisms operating continuously and automatically.

### 2.1 Database — Amazon RDS for MySQL

- **Automated daily snapshots** retained for 7 days, taken during the configured backup window (22:00 – 04:00 AEST). Snapshots are managed by Amazon RDS and stored in Amazon S3 by AWS, encrypted at rest.
- **Transaction log retention** — RDS retains the database transaction logs for the full 7-day backup retention window, supporting point-in-time restore to any moment within that window.
- The LMS remains available throughout the backup window; snapshots are captured online.

### 2.2 LMS application instances — EC2

- **AMI snapshots** of the EC2 LMS application instances are taken daily by Data Lifecycle Manager and retained for 14 days. Each AMI captures the OS, LMS application binaries, and configuration.
- Replacement instances can be launched from the latest AMI by the Auto Scaling Group automatically (on instance failure) or manually (on configuration corruption).

### 2.3 LMS attachments — Amazon S3

- LMS attachments and uploaded content (course materials, student submissions) are stored in S3 with **versioning enabled**, providing per-object roll-back to any prior version.
- Older content transitions to **S3 Glacier Deep Archive** under a 24-month lifecycle policy.

### 2.4 On-prem backup process

On-premises systems (Domain Controllers, System Management Server, Application Services Server, NAS) continue to be backed up nightly to tape by the campus System Management Server per the Backup and Retention Policy. This process is unchanged by the LMS migration.

## 3. Recovery process

The recovery approach depends on the nature of the incident:

### 3.1 LMS application instance failure (single host)

The Auto Scaling Group replaces the failed instance automatically using the launch template (AMI + configuration). Typical replacement: under 10 minutes, no intervention required.

### 3.2 LMS application — major corruption requiring rebuild

| Duration | Recovery step |
|---|---|
| 5–10 minutes | Identify the most recent healthy AMI in Data Lifecycle Manager |
| 5–10 minutes | Update the Auto Scaling Group launch template to point to the chosen AMI |
| 10–15 minutes | Terminate the existing instance(s); ASG launches replacement(s) from the AMI |
| 5 minutes | Verify LMS application connectivity to RDS, re-authenticate against Active Directory, confirm end-user sign-in works |

### 3.3 Database — point-in-time restore

For an irrecoverable database corruption or accidental data deletion event:

| Duration | Recovery step |
|---|---|
| 10–30 minutes | Initiate point-in-time restore from the RDS automated backups to a new RDS instance, choosing a restore target up to and including the moment immediately prior to the corruption |
| 5–10 minutes | Update the LMS application configuration / DNS to point to the restored RDS endpoint, or rename the restored instance to take over the original endpoint |
| 5 minutes | Verify LMS application read/write operation against the restored database |

### 3.4 S3 attachment recovery

For accidentally deleted or corrupted attachments, restore the prior version using S3 versioning; for content already transitioned to Glacier Deep Archive, initiate retrieval against the appropriate restore tier (standard retrieval typically completes within 12 hours).

## 4. Recovery objectives — current

| Objective | Current achievement | Target (ICT Strategic Plan) |
|---|---|---|
| Recovery Time Objective (RTO) — application instance failure | Under 10 minutes (ASG-managed) | ≤ 4 hours |
| Recovery Time Objective (RTO) — major rebuild or DB point-in-time restore | Under 1 hour (typical) | ≤ 4 hours |
| Recovery Point Objective (RPO) — database | Effectively continuous within the 7-day window (transaction-log-based point-in-time restore) | ≤ 1 hour |
| Recovery Point Objective (RPO) — attachments | Per-object versioning — no general data loss for accidental deletion | ≤ 1 hour |

The current recovery objectives meet the ICT Strategic Plan targets for the LMS.

## 5. Remaining considerations

The current configuration provides effective protection against host failure, application corruption, and database corruption within the AWS Sydney region. The following gaps remain at the baseline:

- **Single-AZ deployment.** A full availability-zone failure would require a manual restore into the other AZ. This is the next planned hardening activity for the LMS environment.
- **No cross-Region backup copy.** A regional event affecting `ap-southeast-2` is not currently covered by an off-region backup. This is also a target for the next hardening phase.

## 6. References

- ICT Strategic Plan — five-year ICT direction, including the RTO / RPO targets cited above
- Backup and Retention Policy (intranet policies) — authoritative source for retention schedule and rotation
- LMS Cloud Architecture — Baseline Design — backup mechanisms specified in §12
- LMS Server Specifications and Current Status — the workload this process protects
- Change Management Procedure (intranet policies) — governs material changes to this process
