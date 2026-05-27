---
title: 'High-Availability Database Requirements'
description: 'YAT-defined requirements for the migrated LMS database under high-availability hardening — MySQL compatibility, multi-AZ replication, automatic failover, managed-service constraint.'
appearsIn:
  - s1-cl1-at3
order: 6
uocReferences:
  - '[ICTCLD502 PE 1] design and implement at least one fault tolerant cloud infrastructure on a cloud platform resilient to networking, compute, storage, database and data centre failures'
  - '[ICTCLD502 AC 5] business and functionality requirements'
---

## Document control

| | |
|---|---|
| Document title | High-Availability Database Requirements — Migrated LMS |
| Document owner | Sam Walker, YAT ICT Manager |
| Prepared by | YAT ICT in consultation with MTS Senior Consultant |
| Classification | Internal — YAT ICT, and MTS personnel on signed MSA |

## 1. Context

As the LMS cloud migration enters its high-availability hardening phase, YAT requires the LMS's MySQL database service to be re-deployed as a fault-tolerant, multi-AZ managed database. The single-instance MySQL deployed during the cloud foundation build must be replaced with — or upgraded to — a service that meets the high-availability requirements stated below.

## 2. Requirements

The high-availability database service for the migrated YAT LMS must:

- **Be MySQL-compatible.** The LMS uses MySQL (per the LMS Application Specification). The HA database service must run MySQL or a fully compatible managed equivalent so that the DOODLE LMS application continues to operate without code or schema changes.

- **Replicate data across availability zones.** Data must be replicated to a standby instance in a different availability zone within the same AWS region.

- **Provide automatic failover under two minutes.** If the primary instance fails, the database must automatically switch to the standby instance and resume service in under two minutes.

- **Run on the same cloud vendor as the rest of the migrated environment.** The HA database service must use AWS (consistent with the cloud foundation already deployed) so that networking, IAM, and operational tooling remain coherent.

- **Be a managed service.** To minimise management and maintenance effort required by YAT ICT staff — whose cloud expertise is being progressively built but is not yet deep — the LMS must use a managed database service offered by the cloud vendor (e.g. Amazon RDS Multi-AZ for MySQL) rather than self-hosted MySQL on an EC2 instance.

## 3. References

- LMS Cloud Architecture — Baseline Design — the single-AZ design these requirements supersede on the database tier
- LMS Application Specification — DOODLE platform specification and MySQL dependency
- LMS Cloud Migration Requirements — overall SLA and RPO/RTO targets driving the HA hardening
- Engagement Role Brief — engagement scope and the YAT / MTS responsibility split
