---
title: 'Website Cloud Architecture — Baseline Design'
description: 'Baseline AWS architecture for the YAT website cloud migration — single-AZ Sydney, a single EC2 (LAMP) instance + RDS MySQL + S3 backups. High availability and disaster recovery were out of scope for the pilot.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
  - s1-cl1-at3
  - s1-cl2-at1
  - s1-cl3-at1
order: 5
---

> Produced by MTS Consulting, in consultation with YAT ICT, and approved for implementation (v1.0). Reflects the as-built baseline left at the close of the 2023 engagement — YAT’s first cloud project.

The baseline AWS architecture for the YAT website cloud migration — the single-Availability-Zone Sydney (`ap-southeast-2`) deployment that hosts the public website and its CMS: a single EC2 instance running the LAMP stack, RDS for MySQL (single-AZ), S3 for backups, and a basic monitoring baseline. A load balancer, autoscaling, a Multi-AZ database, content delivery, a web application firewall, and disaster recovery were all deliberately out of scope for this low-risk pilot — so the single-AZ, single-instance baseline carries a known, accepted set of single points of failure.

**[Download the Solution Design (PDF)](/documents/YAT-Website-Baseline-Solution-Design.pdf)**

The document specifies the as-built baseline architecture, the design assumptions and constraints, the configuration decisions, and what was explicitly left out of scope — the deliberate gaps that any future improvement or disaster-recovery work would address.
