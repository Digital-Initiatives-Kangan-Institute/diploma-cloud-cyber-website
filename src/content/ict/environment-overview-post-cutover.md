---
title: 'ICT Environment Overview'
description: 'Current state of YAT ICT — campus network, services, applications, AWS-hosted LMS and website, storage, security, and facilities.'
appearsIn:
  - s1-cl1-at3
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

YAT has deployed Active Directory (AD) 2016 as well as a number of network services (AD, DHCP, DNS). AD and network services are shared across both campus zones and are installed on multiple systems to ensure a single system server failure will not result in a service outage. A single VPN server provides remote access for staff only. AD is now also reached over the Site-to-Site VPN by the AWS-hosted LMS for application-level authentication. AD and network services can accommodate significant load increases without performance degradation.

## System management

A single Windows Server 2016 server is used for on-prem system management and monitoring purposes and for running daily backups of on-prem systems. This server manages systems and backups in both campus zones. This system does not require high availability.

## Application services

Accounting and office administration services are provided on a single Windows Server 2016 system. Critical functions (e.g. pay runs) are outsourced to ensure required availability.

## LMS

The LMS runs in AWS region `ap-southeast-2` (Sydney) as a multi-tier web workload. The DOODLE LMS application is deployed on Windows Server 2016 EC2 instances managed by an Auto Scaling Group, fronted by an Application Load Balancer in a public subnet. The DOODLE LMS database runs on Amazon RDS for MySQL. The LMS is reached over the Internet by staff and student end users, and over the Site-to-Site VPN for back-office traffic (AD-LDAP authentication, ICT management).

The cloud-hosted LMS environment is currently deployed as a single-AZ baseline. Single-AZ deployment is acceptable as an interim operating state but does not meet YAT's 99.9% availability target on its own; the high-availability hardening of this environment (Multi-AZ database, cross-AZ application capacity) is the next planned activity for this engagement.

## Website

The YAT public website — marketing site, course catalogue, and online enquiry / application intake — runs in AWS region `ap-southeast-2` (Sydney). It was YAT's first cloud system, migrated from on-premises hosting in 2023. The website's PHP/MySQL content management system runs on a single EC2 instance (LAMP stack), backed by a single-AZ Amazon RDS for MySQL database, with nightly backups to Amazon S3.

The website is a deliberately simple, single-Availability-Zone deployment: there is no load balancer, no autoscaling, no Multi-AZ database, and no disaster-recovery tier. The single instance, single availability zone, and single database are known single points of failure, accepted when the pilot was delivered and not since addressed. The public reaches the website over the Internet via HTTPS; enquiry and application submissions email the Admissions team and feed the student-administration intake process.

## Email

Both students and staff use Office 365 for email. Office 365 is a Software-as-a-Service (SaaS) solution hosted in Microsoft's Azure cloud and is integrated with the on-premises environment.

## Storage

Two NAS servers are deployed at the campus. One is deployed in the student network zone and the other in the staff network zone. All servers deployed at the campus use hot-swappable disks configured using RAID-5. The NAS systems can accommodate significant data growth without degradation of the service. The NAS systems are not currently considered mission-critical, although this may change in future.

LMS course attachments and student submissions are stored in Amazon S3 in the AWS environment, with versioning enabled and lifecycle policies that transition older content to S3 Glacier Deep Archive.

## Desktop computers

Every classroom and staff office is equipped with desktop computers connected to the corresponding campus network zone. All desktop computers run Windows 10 Enterprise Edition.

## Printers

There is a printer in every classroom. High-performance multifunction printers are available to staff in designated locations.

## Network security

The campus network is split into two security zones. Students have access only to resources in the student zone and to the LMS application. Access to network objects in both zones is controlled via Active Directory permissions. Student and staff access to the cloud-hosted LMS is via HTTPS over the Internet, with the LMS continuing to authenticate users against YAT Active Directory over the Site-to-Site VPN.

## ICT facilities

On-prem servers and network devices are located in a physically secured, air-conditioned computer room that is protected by a UPS against power loss and electrical surges. The AWS-hosted LMS environment operates under the AWS Shared Responsibility Model — AWS is responsible for the security of the regions, availability zones, hardware, and hypervisor; YAT ICT is responsible for guest OS patching, application configuration, IAM, data classification, and access governance.

## ICT staff

ICT staff are highly skilled in their area of expertise and have excellent subject-matter knowledge when dealing with the campus environment. As part of the LMS migration, ICT staff have completed targeted AWS training and are building practical cloud-operations experience supporting the cloud-hosted LMS. Day-to-day operation of the cloud LMS sits within the team's growing capability; deep cloud-specific incident response continues to rely on AWS vendor support and the MTS support contract during the capability-build period.

## Related references

- LMS Application Specification — current technical specification of the LMS application
- LMS Cloud Architecture — Baseline Design — the design under which the AWS LMS environment was built
- Website Cloud Architecture — Baseline Design — the design under which the AWS-hosted website was built (2023)
- High-Availability Database Requirements — requirements driving the next hardening phase
- ICT Operational Costing — LMS — operational cost data for the LMS
- ICT Strategic Plan — five-year direction including the cloud migration objective
- User Access Policy (intranet policies) — role-based access and zone separation
- Change Management Procedure (intranet policies) — governance for material environment changes
