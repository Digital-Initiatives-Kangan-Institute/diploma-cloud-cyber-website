---
title: 'LMS Infrastructure Specifications'
description: 'Specifications of the AWS-hosted YAT LMS — compute, database, load balancing, storage, network, and operating profile relevant to ICT planning.'
appearsIn:
  - s1-cl1-at3
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

The LMS runs as a multi-tier web workload in AWS, deployed in region `ap-southeast-2` (Sydney). End-user traffic reaches the LMS over the Internet; AD-LDAP authentication traffic and ICT management traffic reach the LMS over a Site-to-Site VPN from the campus.

## 3. Infrastructure summary

| Attribute | Value |
|---|---|
| Workload type | Multi-tier web — load balancer, application tier, database tier |
| AWS region | `ap-southeast-2` (Sydney) |
| Availability zones in use | `ap-southeast-2a` (single-AZ baseline) |
| Application OS | Windows Server 2016 (preserved from pre-migration) |
| Database engine | Amazon RDS for MySQL |
| Criticality | Mission critical |
| Target availability (ICT Strategic Plan) | 99.9% |
| Current deployment state | Single-AZ baseline — high-availability hardening is the next planned activity |

## 4. Component specifications

### 4.1 Application tier — EC2

| Attribute | Value |
|---|---|
| Instance family | General-purpose x86 (e.g. `m6i.large` / `m5.large`) |
| AMI | Windows Server 2016 Datacentre + DOODLE LMS pre-installed |
| Placement | `private-app-a` (10.0.11.0/24) |
| Auto Scaling Group | min=1, desired=1, max=2 |
| Scaling policy | Target tracking on CPU at 70% |
| EBS root volume | `gp3`, 100 GB |
| EBS data volume | `gp3`, sized to LMS data footprint + 12-month growth + headroom |

### 4.2 Application Load Balancer

| Attribute | Value |
|---|---|
| Type | Internet-facing Application Load Balancer |
| Placement | `public-web-a` (10.0.1.0/24) |
| Listener | HTTPS:443 → LMS target group |
| TLS certificate | ACM-issued |
| Health check | HTTP GET against the LMS health endpoint; 30-second interval |

### 4.3 Database tier — Amazon RDS for MySQL

| Attribute | Value |
|---|---|
| Engine | Amazon RDS for MySQL |
| Instance class | General-purpose (e.g. `db.m6i.large` / `db.m5.large`) |
| Multi-AZ | Disabled (single-AZ baseline) |
| Storage | `gp3`, sized to the LMS MySQL data footprint + 12-month growth |
| Storage encryption | Enabled (AWS KMS, AWS-managed key) |
| Placement | `private-data-a` (10.0.21.0/24) |
| Backup retention | 7 days, automated |
| Backup window | 22:00 – 04:00 AEST |
| Maintenance window | Sunday 02:00 – 06:00 AEST |

### 4.4 Storage — Amazon S3

| Bucket | Purpose | Configuration |
|---|---|---|
| `yat-lms-attachments-…` | Course attachments, student submissions | Versioning enabled; lifecycle to Glacier Deep Archive after 24 months |
| `yat-lms-backups-…` | Off-instance backup copies | Versioning enabled; private; access-logged |

### 4.5 Network

| Attribute | Value |
|---|---|
| VPC CIDR | `10.0.0.0/16` |
| Subnets | `public-web-a` (10.0.1.0/24), `private-app-a` (10.0.11.0/24), `private-data-a` (10.0.21.0/24) |
| Internet egress (private subnets) | Single NAT Gateway in `public-web-a` |
| Campus connectivity | Site-to-Site VPN (campus edge ↔ AWS VPN Gateway) — used for AD-LDAP and ICT management traffic |

## 5. Usage patterns

- **Daily login peak:** weekday mornings (~08:00–10:00) and afternoons (~13:00–15:00) during teaching periods.
- **Assessment-period spike:** approximately 3× typical concurrent users during assessment submission windows (typically the final two weeks of each term). Auto Scaling responds to the CPU profile to scale the application tier within the configured ASG range.
- **Off-hours load:** minimal.
- **Annual data growth:** ~20 GB / year on the MySQL data files, driven by course materials, student submissions, and gradebook records.

## 6. Capacity outlook

- **Application tier.** The Auto Scaling Group handles assessment-period peaks within its configured maximum. The ASG maximum and instance family can be revised as student numbers grow without service interruption.
- **Database tier.** Storage is `gp3` with sufficient headroom for the +12–15% annual student growth recorded in the ICT Strategic Plan; instance class can be revised at the next maintenance window if needed.
- **High-availability hardening.** Single-AZ deployment is acceptable as an interim operating state but does not meet the 99.9% availability target on its own. Hardening to a Multi-AZ deployment is the next planned activity for this environment.

## 7. References

- ICT Strategic Plan — five-year ICT direction including LMS availability targets
- LMS Application Specification — DOODLE platform specification and functional profile
- LMS Cloud Architecture — Baseline Design — design of the AWS LMS environment
- High-Availability Database Requirements — requirements driving the next hardening phase
- Backup and Recovery Process — LMS — backup process and recovery objectives
- Hardware / Software Inventory — wider inventory in which this workload sits
- Network Diagram — campus and AWS topology including the LMS environment location
