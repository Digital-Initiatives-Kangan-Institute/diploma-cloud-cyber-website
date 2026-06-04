---
title: 'High-Availability Database Requirements'
description: 'YAT-defined requirements for the migrated Accounting (Ledgerline) database under high-availability hardening — SQL Server compatibility, multi-AZ replication, automatic failover, managed-service constraint.'
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
| Document title | High-Availability Database Requirements — Migrated Accounting System (Ledgerline) |
| Document owner | Sam Walker, YAT ICT Manager |
| Prepared by | YAT ICT in consultation with MTS Senior Consultant |
| Classification | Internal — YAT ICT, Finance, and MTS personnel on signed MSA |

## 1. Context

As the Accounting System cloud migration enters its high-availability hardening phase, YAT requires the Ledgerline database service to be re-deployed as a fault-tolerant, multi-AZ managed database. The single-instance Microsoft SQL Server deployed during the cloud foundation build must be upgraded to — or replaced with — a service that meets the high-availability requirements stated below, **without loss of financial data and without changing the Ledgerline application**.

## 2. Requirements

The high-availability database service for the migrated Accounting System must:

- **Be Microsoft SQL Server–compatible.** Ledgerline runs on Microsoft SQL Server (per the Accounting System Application Specification). The HA database service must run SQL Server or a fully compatible managed equivalent so that Ledgerline continues to operate without code or schema changes.

- **Replicate data across availability zones.** Data must be replicated synchronously to a standby instance in a different availability zone within the same AWS region (ap-southeast-2), so that no committed financial transaction is lost if an availability zone fails (RPO ≤ 1 hour must be preserved).

- **Provide automatic failover.** If the primary instance fails, the database must automatically promote the standby and resume service with no manual intervention and no application reconfiguration (the application reaches the database by name).

- **Run on the same cloud vendor as the rest of the migrated environment.** The HA database service must use AWS (consistent with the cloud foundation already deployed) so that networking, IAM, and operational tooling remain coherent.

- **Be a managed service.** To minimise the management and maintenance effort required by YAT ICT staff — whose cloud expertise is still being built — the database must use a managed database service offered by the cloud vendor (e.g. Amazon RDS Multi-AZ for SQL Server) rather than self-hosted SQL Server on an EC2 instance.

- **Preserve the existing protections.** Encryption at rest (KMS), automated + transaction-log backups, and the 7-year financial-records retention established in the baseline must be carried through unchanged.

## 3. References

- Accounting System Cloud Architecture — Baseline Design — the single-AZ design these requirements supersede on the database tier
- Accounting System Application Specification — Ledgerline platform specification and Microsoft SQL Server dependency
- Accounting System Migration Requirements — overall availability, RPO/RTO and retention targets driving the HA hardening
- Engagement Role Brief — engagement scope and the YAT / MTS responsibility split
