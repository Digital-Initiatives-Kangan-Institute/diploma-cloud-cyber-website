---
title: 'LMS Infrastructure Specifications'
description: 'Specifications of the AWS-hosted YAT LMS deployed across two availability zones — compute, database, load balancing, storage, network, and operating profile relevant to ICT planning.'
appearsIn:
  - s1-cl2-at1
  - s1-cl3-at1
order: 10
uocReferences:
  - '[ICTICT517 AC 5] Information on current ICT systems and practices in the organisation including operating systems, hardware, and security'
  - '[ICTCLD502 PC 2.3] Estimate recovery objectives for multi-tier web components and for overall architecture'
---

## Document control

| | |
|---|---|
| Document title | LMS Infrastructure Specifications |
| Document owner | Sam Walker, ICT Manager |
| Prepared by | YAT ICT |
| Review cycle | Annual, or on material change to the LMS infrastructure or its operating profile |
| Classification | Internal — ICT, and engaged consultants on signed MSA |

## 1. Purpose

This document records the current specifications of the AWS-hosted YAT Learning Management System (LMS) — compute, database, load balancing, storage, network, and operating profile. It is the authoritative record for the LMS workload and is the planning input for any work that touches the LMS — capacity, availability, recoverability, or onward improvement.

## 2. LMS description

YAT uses *Diverse Object-Orientated Dynamic Learning Environment* (DOODLE) as its learning and student management system. Students use the LMS to access course resources and submit assessments. Teachers use the LMS to record attendance, assessment submissions, unit completion, and student notes, and to manage support and notifications for their classes. DOODLE is distributed under the GNU General Public License.

YAT retains MP Tech Solutions (MTS) for application support and system customisation of the LMS application layer.

The LMS runs as a multi-tier web workload in AWS, deployed in region `ap-southeast-2` (Sydney) across two availability zones for resilience to single-AZ failure. End-user traffic reaches the LMS over the Internet; AD-LDAP authentication traffic and ICT management traffic reach the LMS over a Site-to-Site VPN from the campus.

## 3. Infrastructure summary

| Attribute | Value |
|---|---|
| Workload type | Multi-tier web — load balancer, application tier, database tier |
| AWS region | `ap-southeast-2` (Sydney) |
| Availability zones in use | `ap-southeast-2a` and `ap-southeast-2b` (Multi-AZ) |
| Application OS | Windows Server 2016 |
| Database engine | Amazon RDS for MySQL — Multi-AZ deployment |
| Criticality | Mission critical |
| Target availability (ICT Strategic Plan) | 99.9% |
| Current deployment state | Multi-AZ; meets the 99.9% availability target |

## 4. Component specifications

### 4.1 Application tier — EC2 (cross-AZ)

| Attribute | Value |
|---|---|
| Instance family | General-purpose x86 (e.g. `m6i.large` / `m5.large`) |
| AMI | Windows Server 2016 Datacentre + DOODLE LMS pre-installed |
| Placement | `private-app-a` (10.0.11.0/24) and `private-app-b` (10.0.12.0/24) |
| Auto Scaling Group | Cross-AZ; min=2, desired=2, max=4 |
| Scaling policy | Target tracking on CPU at 70% |
| Health checks | ELB + EC2 |
| EBS root volume | `gp3`, 100 GB |
| EBS data volume | `gp3`, sized to LMS data footprint + 12-month growth + headroom |
| AMI snapshot retention | Daily via Data Lifecycle Manager; 14 days; cross-Region copy |

### 4.2 Application Load Balancer (cross-AZ)

| Attribute | Value |
|---|---|
| Type | Internet-facing Application Load Balancer |
| Placement | `public-web-a` and `public-web-b` (cross-AZ) |
| Listener | HTTPS:443 → LMS target group across both AZs |
| TLS certificate | ACM-issued |
| Health check | HTTP GET against the LMS health endpoint; 30-second interval; unhealthy targets taken out of service |

### 4.3 Database tier — Amazon RDS for MySQL (Multi-AZ)

| Attribute | Value |
|---|---|
| Engine | Amazon RDS for MySQL |
| Instance class | General-purpose (e.g. `db.m6i.large` / `db.m5.large`) |
| Multi-AZ | Enabled — primary in `ap-southeast-2a`, synchronous standby in `ap-southeast-2b` |
| Failover behaviour | Automatic; typically completes under two minutes |
| Storage | `gp3`, sized to LMS MySQL data footprint + 12-month growth |
| Storage encryption | Enabled (AWS KMS) |
| Placement | `private-data-a` (primary, 10.0.21.0/24) and `private-data-b` (standby, 10.0.22.0/24) |
| Backup retention | 7 days, automated |
| Cross-Region snapshot copy | Enabled — daily |
| Backup window | 22:00 – 04:00 AEST |
| Maintenance window | Sunday 02:00 – 06:00 AEST |

### 4.4 Storage — Amazon S3

| Bucket | Purpose | Configuration |
|---|---|---|
| `yat-lms-attachments-…` | Course attachments, student submissions | Versioning enabled; lifecycle to Glacier Deep Archive after 24 months; cross-Region replication for DR |
| `yat-lms-backups-…` | Off-instance backup copies | Versioning enabled; private; access-logged; cross-Region replication for DR |

### 4.5 Network

| Attribute | Value |
|---|---|
| VPC CIDR | `10.0.0.0/16` |
| Subnets | `public-web-a` (10.0.1.0/24), `public-web-b` (10.0.2.0/24), `private-app-a` (10.0.11.0/24), `private-app-b` (10.0.12.0/24), `private-data-a` (10.0.21.0/24), `private-data-b` (10.0.22.0/24) |
| Internet egress (private subnets) | NAT Gateway in each AZ (`public-web-a` + `public-web-b`) |
| Campus connectivity | Site-to-Site VPN (campus edge ↔ AWS VPN Gateway) — used for AD-LDAP and ICT management traffic |

## 5. Usage patterns

- **Daily login peak:** weekday mornings (~08:00–10:00) and afternoons (~13:00–15:00) during teaching periods.
- **Assessment-period spike:** approximately 3× typical concurrent users during assessment submission windows (typically the final two weeks of each term). The cross-AZ Auto Scaling Group responds to the CPU profile to scale the application tier within the configured range, balanced across AZs.
- **Off-hours load:** minimal.
- **Annual data growth:** ~20 GB / year on the MySQL data files, driven by course materials, student submissions, and gradebook records.

## 6. Capacity outlook

- **Application tier.** The cross-AZ Auto Scaling Group handles assessment-period peaks within its configured maximum. The ASG maximum and instance family can be revised as student numbers grow without service interruption.
- **Database tier.** Storage is `gp3` with sufficient headroom for the +12–15% annual student growth recorded in the ICT Strategic Plan; instance class can be revised at the next maintenance window if needed. Multi-AZ supports vertical scaling with negligible service impact.
- **Resilience headroom.** The Multi-AZ deployment tolerates a single AZ impairment without sustained service loss; cross-Region backups support a regional rebuild for sustained regional events.

## 7. References

- ICT Strategic Plan — five-year ICT direction including LMS availability targets
- LMS Application Specification — DOODLE platform specification and functional profile
- LMS Cloud Architecture — Baseline Design — design of the AWS LMS environment
- High-Availability Database Requirements — HA requirements the LMS database deployment was hardened to
- Backup and Recovery Process — LMS — backup process and recovery objectives
- Hardware / Software Inventory — wider inventory in which this workload sits
- Network Diagram — campus and AWS topology including the LMS environment location
