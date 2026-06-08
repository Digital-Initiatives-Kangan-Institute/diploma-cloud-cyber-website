---
title: 'ICT Environment Overview'
description: 'Current state of YAT ICT — campus network, services, applications, AWS-hosted LMS and website (both Multi-AZ), storage, security, and facilities.'
appearsIn:
  - s1-cl2-at1
order: 2
uocReferences:
  - '[ICTICT517 AC 5] Information on current ICT systems and practices in the organisation including operating systems, hardware, and security'
  - '[ICTICT517 PC 1.2] Determine and document current state of ICT systems and practices in organisation'
  - '[ICTCLD502 PC 2.1] Review architecture of traditional multi-tier web application in non-cloud environment and identify high availability requirements'
---

## Document control

| | |
|---|---|
| Document title | YAT ICT Environment Overview |
| Document owner | Sam Walker, ICT Manager |
| Prepared by | YAT ICT |
| Review cycle | On any material change to the ICT environment; annual review otherwise |
| Classification | Internal — ICT, Finance, Education leadership, and engaged consultants on signed MSA |

This document describes the current state of YAT's ICT environment, covering campus network, network services, application services, the AWS-hosted LMS and website, storage, end-user computing, security, facilities, and ICT staff capability.

## Network

Network infrastructure at the campus (Internet access, routing, and switching) is provided with no Single Point of Failure. All on-prem servers and NAS devices have at least 2 NICs and are configured to utilise the redundant network infrastructure. The internal network and the connection to the Internet can accommodate significant load increases without performance degradation.

An IPSec Site-to-Site VPN connects the campus edge to AWS region `ap-southeast-2` (Sydney). The VPN carries back-office traffic between the campus and the AWS-hosted LMS environment — principally LDAP authentication traffic from the LMS application back to YAT's Active Directory, and ICT management traffic from YAT's administrators to the cloud LMS resources.

## Network services

YAT has deployed Active Directory (AD) 2016 as well as a number of network services (AD, DHCP, DNS). AD and network services are shared across both campus zones and are installed on multiple systems to ensure a single system server failure will not result in a service outage. A single VPN server provides remote access for staff only. AD is also reached over the Site-to-Site VPN by the AWS-hosted LMS for application-level authentication. AD and network services can accommodate significant load increases without performance degradation.

## System management

A single Windows Server 2016 server is used for on-prem system management and monitoring purposes and for running daily backups of on-prem systems. This server manages systems and backups in both campus zones. This system does not require high availability.

## Application services

The Ledgerline accounting and office-administration system runs in AWS region `ap-southeast-2` (Sydney) as a single-Availability-Zone deployment, migrated from its former on-premises Application Services server. It is an internal, business-hours system reached by finance and administrative staff over the Site-to-Site VPN; payroll remains outsourced to an external bureau. As a single-AZ baseline, it has not been hardened for high availability.

## LMS

The LMS runs in AWS region `ap-southeast-2` (Sydney) as a multi-tier web workload, deployed across two availability zones (`ap-southeast-2a` and `ap-southeast-2b`) for resilience to single-AZ failure.

- The DOODLE LMS application is deployed on Windows Server 2016 EC2 instances managed by a cross-AZ Auto Scaling Group, with capacity in both availability zones.
- The Application Load Balancer spans both availability zones and distributes traffic to healthy targets.
- The DOODLE LMS database runs on Amazon RDS for MySQL configured as a Multi-AZ deployment, with synchronous replication to a standby in the second availability zone and automatic failover under two minutes.
- LMS course attachments and student submissions are stored in Amazon S3 with versioning and lifecycle policies; an automated cross-Region backup copy is maintained for disaster-recovery purposes.

The LMS is reached over the Internet by staff and student end users, and over the Site-to-Site VPN for back-office traffic (AD-LDAP authentication, ICT management).

The cloud-hosted LMS environment meets YAT's 99.9% availability target for the LMS service.

## Website

The YAT public website — marketing site, course catalogue, and online enquiry / application intake — runs in AWS region `ap-southeast-2` (Sydney), hardened to **Multi-AZ high availability**: a cross-Availability-Zone Application Load Balancer fronts an Auto Scaling Group of website instances across two availability zones, backed by a Multi-AZ Amazon RDS for MySQL database with an automatic-failover standby. Uploaded media is served from Amazon S3 rather than instance disk. The single-instance, single-AZ, and single-database points of failure of the original 2023 pilot have been removed.

The public reaches the website over the Internet via HTTPS; enquiry and application submissions email the Admissions team and feed the student-administration intake process. Global serving / edge delivery, cross-region disaster recovery, and the audit/access-log microservice are not yet in place — they are the subject of the current website global-expansion engagement.

## Email

Both students and staff use Office 365 for email. Office 365 is a Software-as-a-Service (SaaS) solution hosted in Microsoft's Azure cloud and is integrated with the on-premises environment.

## Storage

Two NAS servers are deployed at the campus. One is deployed in the student network zone and the other in the staff network zone. All servers deployed at the campus use hot-swappable disks configured using RAID-5. The NAS systems can accommodate significant data growth without degradation of the service. The NAS systems are not currently considered mission-critical, although this may change in future.

LMS course attachments and student submissions are stored in Amazon S3 in the AWS environment, with versioning enabled, lifecycle policies that transition older content to S3 Glacier Deep Archive, and an automated cross-Region backup copy maintained for disaster-recovery purposes.

## Desktop computers

Every classroom and staff office is equipped with desktop computers connected to the corresponding campus network zone. All desktop computers run Windows 10 Enterprise Edition.

## Printers

There is a printer in every classroom. High-performance multifunction printers are available to staff in designated locations.

## Network security

The campus network is split into two security zones. Students have access only to resources in the student zone and to the LMS application. Access to network objects in both zones is controlled via Active Directory permissions. Student and staff access to the cloud-hosted LMS is via HTTPS over the Internet, with the LMS continuing to authenticate users against YAT Active Directory over the Site-to-Site VPN.

## ICT facilities

On-prem servers and network devices are located in a physically secured, air-conditioned computer room that is protected by a UPS against power loss and electrical surges. The AWS-hosted LMS environment operates under the AWS Shared Responsibility Model — AWS is responsible for the security of the regions, availability zones, hardware, and hypervisor; YAT ICT is responsible for guest OS patching, application configuration, IAM, data classification, and access governance.

## ICT staff

ICT staff are highly skilled in their area of expertise and have excellent subject-matter knowledge when dealing with both the campus environment and the cloud-hosted LMS. Cloud-operations support sits within the team's day-to-day capability. AWS vendor support and the MTS support contract are retained for severity-1 incident response and for specialist work outside YAT's in-house expertise.

## Related references

- LMS Application Specification — current technical specification of the LMS application
- LMS Cloud Architecture — Baseline Design — design of the cloud LMS foundation
- Website Cloud Architecture — HA-Hardened Design — the design under which the website was hardened to Multi-AZ
- High-Availability Database Requirements — HA requirements the LMS database deployment was hardened to
- ICT Operational Costing — LMS — operational cost data for the LMS
- ICT Strategic Plan — five-year direction including the cloud migration objective
- User Access Policy (intranet policies) — role-based access and zone separation
- Change Management Procedure (intranet policies) — governance for material environment changes
