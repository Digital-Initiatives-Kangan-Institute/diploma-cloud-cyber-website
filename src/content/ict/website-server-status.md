---
title: 'Website Infrastructure Specifications'
description: 'Specifications of the AWS-hosted YAT public website — compute, database, storage, network, and operating profile of the single-AZ 2023 baseline.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
  - s1-cl1-at3
  - s1-cl2-at1
  - s1-cl3-at1
order: 11
---

## Document control

| | |
|---|---|
| Document title | Website Infrastructure Specifications |
| Document owner | Sam Walker, ICT Manager |
| Prepared by | YAT ICT |
| Review cycle | Annual, or on material change to the website infrastructure or its operating profile |
| Classification | Internal — ICT, and engaged consultants on signed MSA |

## 1. Purpose

This document records the current specifications of the AWS-hosted YAT public website — compute, database, storage, network, and operating profile. It is the authoritative record for the website workload and the planning input for any work that touches it — capacity, availability, recoverability, or onward improvement.

## 2. Website description

YAT's public website — marketing site, course catalogue, and online enquiry / application intake — runs on an open-source PHP / MySQL content management system (CMS) on a LAMP stack. It was YAT's first cloud system, migrated from on-premises hosting in 2023 as a deliberately low-risk pilot, and runs as a single-Availability-Zone deployment in AWS region `ap-southeast-2` (Sydney). Public traffic reaches the website over the Internet via HTTPS; the website is not connected to the campus network.

## 3. Infrastructure summary

| Attribute | Value |
|---|---|
| Workload type | Single-instance web / CMS (no load balancer, no autoscaling) |
| AWS region | `ap-southeast-2` (Sydney) |
| Availability zones in use | `ap-southeast-2a` (single-AZ) |
| Application OS | Linux (LAMP stack) |
| Database engine | Amazon RDS for MySQL (single-AZ) |
| Criticality | Public shopfront — important, but not mission-critical |
| Target availability | None formally set (single-AZ pilot) |
| Current deployment state | Single-AZ baseline — no high availability and no disaster recovery |

## 4. Component specifications

### 4.1 Compute — EC2

| Attribute | Value |
|---|---|
| Instance family | General-purpose, small (e.g. `t3.small` / `t3.medium`) |
| OS / stack | Linux + Apache + PHP + the CMS (LAMP) |
| Placement | `public-web-a` (single-AZ), with an Elastic IP |
| Auto Scaling | None — a single instance is the website (single point of failure) |
| Load balancer | None — HTTPS terminates on the instance |
| EBS root volume | `gp3` — OS, CMS application, and uploaded media on local disk |

### 4.2 Database — Amazon RDS for MySQL

| Attribute | Value |
|---|---|
| Engine | Amazon RDS for MySQL |
| Instance class | General-purpose, small (e.g. `db.t3.small`) |
| Multi-AZ | Disabled (single-AZ) |
| Storage | `gp3`, sized to the CMS data footprint + growth |
| Storage encryption | Enabled (AWS KMS) |
| Placement | `private-data-a` (single-AZ); not publicly accessible |
| Backup retention | 7 days, automated |

### 4.3 Storage

| Resource | Purpose | Configuration |
|---|---|---|
| EC2 EBS volume | OS, CMS application, uploaded media | `gp3`; media served from the instance (not offloaded to S3 / CDN) |
| `yat-website-backups-…` (S3) | Nightly database and media backups | Versioned; private |

### 4.4 Network

| Attribute | Value |
|---|---|
| VPC CIDR | Separate website VPC |
| Subnets | `public-web-a` (website EC2), `private-data-a` (RDS) |
| Internet | Internet Gateway; the EC2 instance serves and egresses directly from the public subnet (no NAT gateway) |
| Campus connectivity | None — the website is public-facing and independent of the campus network |
| Security groups | `sg-web` (HTTP/HTTPS from the internet; SSH from an admin source) → `sg-db` (MySQL from `sg-web` only) |

## 5. Usage patterns

- **Typical load:** light and steady for most of the year.
- **Seasonal peak:** the January–February enrolment-enquiry period drives the one pronounced traffic peak; the single instance is sized to absorb it.
- **Off-peak:** minimal.
- **Annual data growth:** ~1 GB / year, dominated by uploaded media (images, brochures, course PDFs).

## 6. Capacity outlook

- **Compute / database.** A single small instance and database comfortably serve the current load, including the enrolment peak; capacity is not the constraint.
- **Resilience (the gap).** The single instance, single Availability Zone, and single database are accepted single points of failure from the 2023 pilot, and there is no tested recovery objective. Resilience — not capacity — is the outstanding limitation, and the natural subject of any future high-availability or disaster-recovery work.

## 7. References

- Website Specification — functional and workload profile of the public website
- Website Cloud Architecture — Baseline Design — design of the AWS website environment, including backup mechanisms
- Hardware / Software Inventory — wider inventory in which this workload sits
- Network Diagram — campus and AWS topology including the website's location
- ICT Strategic Plan — five-year ICT direction including the cloud transition the website pilot began
