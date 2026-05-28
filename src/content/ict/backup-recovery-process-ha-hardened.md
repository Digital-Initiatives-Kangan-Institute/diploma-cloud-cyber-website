---
title: 'Backup and Recovery Process — LMS'
description: 'Current-state backup process and recovery steps for the Multi-AZ AWS-hosted YAT LMS — automated failover, point-in-time restore, cross-Region backup copies, and recovery objectives against ICT Strategic Plan targets.'
appearsIn:
  - s1-cl2-at1
  - s1-cl3-at1
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

This document records the current backup process for the AWS-hosted YAT Learning Management System (LMS), and the recovery steps and recovery objectives the current process achieves. It is the operational reference for incident response involving the LMS.

## 2. Backup process

The LMS environment is protected by AWS-native backup mechanisms operating continuously and automatically across two availability zones, with cross-Region backup copies for disaster-recovery scenarios.

### 2.1 Database — Amazon RDS for MySQL (Multi-AZ)

- **Multi-AZ deployment** with synchronous replication to a standby instance in the second availability zone. Automatic failover under two minutes on primary instance failure or AZ impairment.
- **Automated daily snapshots** retained for 7 days, taken during the configured backup window (22:00 – 04:00 AEST), encrypted at rest.
- **Transaction log retention** supports point-in-time restore to any moment within the 7-day backup window.
- **Cross-Region snapshot copy** of the daily automated snapshots to a secondary AWS region for disaster-recovery purposes.

### 2.2 LMS application instances — EC2 (cross-AZ Auto Scaling Group)

- The Auto Scaling Group maintains LMS application capacity in both availability zones (min=2, max=4). Loss of an instance is replaced automatically by the ASG.
- **AMI snapshots** of the EC2 LMS application instances are taken daily by Data Lifecycle Manager and retained for 14 days. AMIs are copied cross-Region for DR.

### 2.3 LMS attachments — Amazon S3

- LMS attachments and uploaded content (course materials, student submissions) are stored in S3 with **versioning enabled**, providing per-object roll-back to any prior version.
- Older content transitions to **S3 Glacier Deep Archive** under a 24-month lifecycle policy.
- **Cross-Region replication** maintains a near-real-time copy of the attachments bucket in a secondary AWS region for disaster-recovery purposes.

### 2.4 On-prem backup process

On-premises systems (Domain Controllers, System Management Server, Application Services Server, NAS) continue to be backed up nightly to tape by the campus System Management Server per the Backup and Retention Policy. This process is unchanged by the LMS migration.

## 3. Recovery process

The recovery approach depends on the nature of the incident:

### 3.1 LMS application instance failure (single host)

The Auto Scaling Group replaces the failed instance automatically using the launch template, drawing from capacity in either AZ. Typical replacement: under 10 minutes, no intervention required.

### 3.2 Availability-zone impairment

For a loss of one AZ:

- **Database** — RDS Multi-AZ fails over to the standby in the second AZ automatically; under two minutes to resume service.
- **Application** — the Auto Scaling Group scales up in the surviving AZ; the cross-AZ Application Load Balancer routes all traffic to healthy targets there.
- **NAT** — the surviving NAT Gateway in the other AZ continues to provide outbound connectivity for that AZ's instances.

Total LMS service impact for an AZ event: typically under 5 minutes.

### 3.3 LMS application — major corruption requiring rebuild

| Duration | Recovery step |
|---|---|
| 5–10 minutes | Identify the most recent healthy AMI in Data Lifecycle Manager |
| 5–10 minutes | Update the Auto Scaling Group launch template to point to the chosen AMI |
| 10–15 minutes | Refresh the ASG instances; new instances launch from the AMI in both AZs |
| 5 minutes | Verify LMS application connectivity to RDS, re-authenticate against Active Directory, confirm end-user sign-in works |

### 3.4 Database — point-in-time restore

For an irrecoverable database corruption or accidental data deletion event:

| Duration | Recovery step |
|---|---|
| 10–30 minutes | Initiate point-in-time restore from the RDS automated backups to a new Multi-AZ RDS instance, choosing a restore target up to and including the moment immediately prior to the corruption |
| 5–10 minutes | Update the LMS application configuration / DNS to point to the restored RDS endpoint, or rename the restored instance to take over the original endpoint |
| 5 minutes | Verify LMS application read/write operation against the restored database |

### 3.5 S3 attachment recovery

For accidentally deleted or corrupted attachments, restore the prior version using S3 versioning; for content already transitioned to Glacier Deep Archive, initiate retrieval against the appropriate restore tier (standard retrieval typically completes within 12 hours).

### 3.6 Regional disaster recovery

For a sustained regional event in `ap-southeast-2`, the cross-Region backup copies (RDS snapshots, AMIs, S3 attachments) support a regional rebuild in the secondary AWS region. Regional DR runbook, target Region capacity reservation, and tabletop testing cadence are maintained by YAT ICT separately.

## 4. Recovery objectives — current

| Objective | Current achievement | Target (ICT Strategic Plan) |
|---|---|---|
| Recovery Time Objective (RTO) — application instance failure | Under 10 minutes (ASG-managed) | ≤ 4 hours |
| Recovery Time Objective (RTO) — availability zone failure | Under 5 minutes (RDS Multi-AZ failover + ALB cross-AZ routing) | ≤ 4 hours |
| Recovery Time Objective (RTO) — major rebuild or DB point-in-time restore | Under 1 hour (typical) | ≤ 4 hours |
| Recovery Point Objective (RPO) — database | Effectively continuous within the 7-day backup window | ≤ 1 hour |
| Recovery Point Objective (RPO) — attachments | Per-object versioning — no general data loss | ≤ 1 hour |

The current configuration meets the ICT Strategic Plan targets for the LMS and adds cross-Region disaster-recovery coverage beyond those targets.

## 5. References

- ICT Strategic Plan — five-year ICT direction, including the RTO / RPO targets cited above
- Backup and Retention Policy (intranet policies) — authoritative source for retention schedule and rotation
- LMS Cloud Architecture — Baseline Design — backup mechanisms specified in §12
- High-Availability Database Requirements — HA requirements the database deployment was hardened to
- LMS Server Specifications and Current Status — the workload this process protects
- Change Management Procedure (intranet policies) — governs material changes to this process
