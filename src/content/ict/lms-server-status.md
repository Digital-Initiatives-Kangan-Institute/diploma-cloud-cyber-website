---
title: 'LMS Server Specifications and Current Status'
description: 'Current-state record of the YAT on-prem LMS server — hardware specifications, measured availability, utilisation, and growth profile relevant to ICT planning.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
  - s1-cl1-at3
order: 10
uocReferences:
  - '[ICTICT517 AC 5] Information on current ICT systems and practices in the organisation including operating systems, hardware, and security'
  - '[ICTCLD502 PC 2.3] Estimate recovery objectives for multi-tier web components and for overall architecture'
---

## Document control

| | |
|---|---|
| Document title | LMS Server Specifications and Current Status |
| Document owner | Sam Walker, ICT Manager |
| Prepared by | YAT ICT |
| Review cycle | Annual, or on material change to the LMS server or its operating profile |
| Classification | Internal — ICT, and engaged consultants on signed MSA |

## 1. Purpose

This document records the current specifications and operating status of the YAT on-premises Learning Management System (LMS) server. It is the authoritative record for the LMS asset and is the planning input for any work that touches the LMS — capacity, availability, recoverability, or migration.

## 2. LMS description

YAT uses *Diverse Object-Orientated Dynamic Learning Environment* (DOODLE) as its learning and student management system. Students use the LMS to access course resources and submit assessments. Teachers use the LMS to record attendance, assessment submissions, unit completion, and student notes, and to manage support and notifications for their classes. DOODLE is distributed under the GNU General Public License.

YAT has retained MP Tech Solutions (MTS) for application support and system customisation of the LMS application layer.

The performance of the current LMS is acceptable for present load, but is expected to degrade noticeably as student numbers grow.

## 3. Current server — infrastructure summary

| Attribute | Value |
|---|---|
| Server role | LMS (DOODLE) and MySQL database — co-located on the same host |
| Operating system | Windows Server 2016 |
| Database | MySQL (Community Edition) |
| Hosting | Single on-prem server, Staff network zone |
| Server age | ~5+ years — at end of life |
| Criticality | Mission critical |
| Measured availability (rolling 12 months) | 99.2% |
| Target availability (ICT Strategic Plan) | 99.9% |

## 4. Current hardware specifications

| Resource | Current | Operating profile |
|---|---|---|
| CPU | 4 vCPU @ 2.4 GHz | Peak utilisation ~75% during assessment-period spikes |
| Memory (RAM) | 8 GB | Peak utilisation ~85% during assessment-period spikes |
| Storage — system | 100 GB SSD | ~30% used |
| Storage — application and database | 250 GB SSD | ~70% used |
| Database storage (MySQL data files) | ~120 GB of the 250 GB above | Growing ~20 GB / year |
| Network | 1 Gbps NIC | Adequate for current load |
| Storage IOPS | ~3,000 baseline, ~5,000 peak | |

## 5. Usage patterns

- **Daily login peak:** weekday mornings (~08:00–10:00) and afternoons (~13:00–15:00) during teaching periods.
- **Assessment-period spike:** approximately 3× typical concurrent users during assessment submission windows (typically the final two weeks of each term).
- **Off-hours load:** minimal — backup window 22:00–04:00 local time.
- **Annual data growth:** ~20 GB / year on the MySQL data files, driven by course materials, student submissions, and gradebook records.

## 6. Capacity outlook

The current server is at end of life and operating at peak utilisation levels that leave limited headroom for the +12–15% annual student growth recorded in the ICT Strategic Plan and operational costing baselines. Capacity planning for the LMS is being addressed through the in-flight LMS Cloud Migration engagement rather than by on-prem refresh.

## 7. References

- ICT Strategic Plan — five-year ICT direction including LMS availability targets
- LMS Application Specification — DOODLE platform specification and functional profile
- Backup and Recovery Process — LMS — current backup process and recovery objectives
- Hardware / Software Inventory — wider campus inventory in which this server sits
- On-Premises Network Diagram — campus topology including the LMS server location
