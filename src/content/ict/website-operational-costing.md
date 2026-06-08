---
title: 'Website Operational Costing'
description: 'Current operational costing for the YAT public website — a small, open-source, single-AZ AWS workload with negligible licensing cost.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
  - s1-cl1-at3
  - s1-cl2-at1
  - s1-cl3-at1
order: 17
---

## Document control

| | |
|---|---|
| Document title | Website — Operational Costing |
| Document owner | Sam Walker, ICT Manager |
| Prepared by | YAT ICT |
| Review cycle | Annual |
| Classification | Internal — ICT, Finance, and engaged consultants on signed MSA |
| Currency | Australian Dollars (AUD), exclusive of GST, indicative at current price levels |

## 1. Purpose

This document records the current operational costing for YAT's public website — a small, open-source, single-Availability-Zone AWS workload. It is the cost grounding for any decision to harden, improve, or otherwise change the website's hosting.

## 2. Planning assumptions

| Assumption | Value | Source |
|---|---|---|
| Workload | Single small EC2 instance + single-AZ RDS MySQL + S3 backups | Website Infrastructure Specifications |
| Software stack | Open-source LAMP + CMS — **no commercial licensing** | Website Specification |
| Criticality | Public shopfront; not mission-critical; no formal availability SLA | Website Specification |
| Indicative cost of downtime | Low — reputational rather than operational; no direct revenue stop | YAT-estimated |
| Fully-loaded ICT FTE cost | $115,000 per FTE / year | Salary + superannuation + on-costs |

## 3. Recurring operating costs (per year)

| Category | Item | Annual cost |
|---|---|---:|
| Software licensing | Open-source CMS, PHP, Linux, MySQL — no licence cost | $0 |
| AWS — compute | EC2 (single small instance) | ~$350 |
| AWS — database | Amazon RDS for MySQL (single-AZ, small) | ~$400 |
| AWS — storage & transfer | EBS, S3 backups, data transfer, Elastic IP | ~$200 |
| AWS — other | Route 53, certificate, CloudWatch (basic) | ~$100 |
| Staff time (YAT ICT) | Patching, monitoring, content-platform support (~0.03 FTE × $115k) | ~$3,450 |
| **Recurring per year** | | **~$4,500** |

*The cost shape is the opposite of the Accounting system's: the website carries **no commercial licensing** (open-source throughout), and the direct AWS bill is small. Its operating cost is dominated by the modest ICT staff time to maintain it.*

## 4. Cost categorisation framework for change proposals

Any change proposal for this system uses the same three cost-bearer categories applied across YAT ICT change evaluations:

1. **External consultant-priced costs** — fees payable to any engaged consultancy.
2. **Direct vendor / cloud-platform costs** — AWS charges (the website carries no software licensing).
3. **YAT-internal costs** — work YAT in-house ICT and Marketing undertake themselves.

## 5. Operational considerations

- **Cheap to run, cheap to improve.** The small footprint means hardening the website (a load balancer, a second AZ, Multi-AZ database, a CDN) would add only a modest incremental AWS cost.
- **No licensing lever.** Unlike the Accounting system, there is no commercial-licensing dimension to the website's cost — cost decisions are about AWS resource shape only.
- **Resilience vs cost.** The single-AZ pilot is the cheapest viable footprint; any availability or disaster-recovery improvement is a deliberate cost-for-resilience trade-off.

## 6. References

- Website Specification — workload and concurrency profile
- Website Infrastructure Specifications — current resource shape
- Website Cloud Architecture — Baseline Design — the AWS environment
- ICT Strategic Plan — five-year ICT direction
- Change Management Procedure (intranet policies)
