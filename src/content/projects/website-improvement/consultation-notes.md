---
title: 'ICT Manager Consultation Notes'
description: 'Record of the requirements consultation between YAT and MTS for the Website Cloud Infrastructure Improvement project — the India-campus driver, the public-exposure and reliability concerns, the compliance question, and the open scope of improvement.'
appearsIn:
  - s1-cl3-at1
  - s1-cl3-at2
  - s1-cl3-at3
order: 4
uocReferences:
  - '[ICTCLD504 PC 1.1] Identify and review business’s cloud architecture design'
  - '[ICTCLD504 AC 5] specific requirements and industry standards, organisational procedures and legislative requirements, including business and functionality requirements, as required'
---

## Meeting record

| | |
|---|---|
| Subject | Website Cloud Infrastructure Improvement — Requirements Consultation |
| Date | Thursday 14 May 2026 |
| Time | 10:00 – 11:05 (1 hour 5 minutes) |
| Location | YAT College Cremorne campus — ICT Manager's office, Building A Level 2 |
| Purpose | Brief the MTS Improvement Team on YAT's drivers and constraints for improving the website cloud infrastructure, ahead of the current-state analysis and Solution Design. |

**Attendees:**

- **Sam Walker** — YAT ICT Manager (chair, Engagement Sponsor)
- **Dana Mercer** — YAT Marketing & Admissions Manager (website business owner)
- **Asha Rao** — YAT Compliance Officer (India-operation compliance)
- **Pat Lin** — MTS Senior Consultant, supervising the Improvement Team
- **\[Improvement Team\]** — MTS Improvement Team (this engagement) — taking notes

---

## Discussion

### Context and starting point

Sam Walker set the scene. The website — YAT's public marketing site, course catalogue, and online enquiry / application intake — was migrated to AWS in 2023 as a deliberately simple single-Availability-Zone deployment, and it has not been changed materially since. That single-AZ environment is the **starting point**: this engagement improves it, it does not rebuild it. Sam asked the team to begin from the current-state records — the Website Infrastructure Specifications, the Website Specification, the Website Operational Costing, and the Website Cloud Architecture — Baseline Design held against the migration project.

The driver, Sam explained, is YAT's offshore campus partnership in India. The website is the front door through which India-market prospective students will find courses and apply, and YAT wants it ready for that role before the intake grows. Two questions have been put to ICT: is the website **solid enough** for a public service the business is about to lean on much harder, and is it **compliant** with what India requires for the operation it will serve. Sam was clear he is not handing the team a fix — he wants them to **analyse the system and tell YAT what it needs**.

### What "improvement" means here — open scope

Pat asked Sam to be specific about scope. Sam was deliberate that the scope is **open**: he is not prescribing a particular change, and he is not asking for any specific architecture. The team is to assess the infrastructure across reliability, scalability, security, and cost, decide where it genuinely needs to be better, and **propose** improvements in a Solution Design. "Tell me what's worth doing and why," he said — "and if something isn't worth doing, tell me that too." Whatever the team recommends, YAT decides what proceeds.

### The public shopfront — reliability, scale, and exposure

Dana Mercer spoke to the business side. The website is YAT's **public shopfront** — its visitors are anonymous members of the public arriving from the open internet and from search engines, not signed-in staff or students. Two things follow, she said. First, it has to be **reliable and discoverable**: the catalogue and marketing pages are the primary acquisition channel for the new market, so they have to stay up and stay fast, especially as the India audience grows. Second, being open to the public means being **exposed** — she has seen bot traffic, scraping, and spam hitting the public application form, and wants the infrastructure to account for hostile and automated traffic in a way YAT's internal, logged-in systems never had to.

### The compliance question

Asha Rao spoke to the compliance driver. Because the website serves the India operation, YAT now has obligations under Indian law that touch how and where certain data and system logs are held, and how YAT handles the personal data of prospective students in that market. The Compliance area has set out the applicable obligations in the **Indian Regulatory Requirements** for this project. Asha was clear on the division of labour, as on YAT's other engagements: **Compliance owns the interpretation of the law; MTS designs the infrastructure to satisfy the requirements as written, and does not interpret the law itself.** The team's job is to assess whether the current website infrastructure meets those requirements, identify any gaps, and propose what would close them.

### Fit for purpose — proportionate, not gold-plated

Sam pressed that the improvement should be **proportionate**. The India campus is new and budget-conscious; he does not want gold-plating, just the simplest arrangement that genuinely meets the need, and each proposed improvement justified on its merits.

### Protect the content and the visitor experience

Dana was firm on her non-negotiables: the **website application must not change** through this work, **no website content or media may be lost**, and the **visitor-facing experience must not be degraded**. This is an infrastructure improvement underneath a site whose look and content stay exactly as visitors see them today.

### The approval gate

Sam confirmed the engagement follows YAT's Change Management Procedure, and that he wants to **approve the Solution Design before any implementation begins** — the design presentation is the gate. Only the improvements YAT approves at that gate proceed to implementation. High-risk implementation steps will need sign-off as usual.

### Change discipline

Dana asked that any production-affecting change avoid the **peak enrolment and application-intake windows**, when the most prospective students are on the site. For the analysis and design there is no such constraint; for implementation, the team is to schedule around those windows.

### How MTS is staffing this

Sam noted MTS is delivering this with an **Improvement Team**, with each member owning an improvement dimension and the team lead rotating across working sessions. He asked that the team's internal arrangements — who leads when, how work is allocated — be the team's own to manage, with Pat Lin as the supervision and escalation point on the MTS side and himself as the YAT-side sponsor and acceptance authority.

---

## Agreed next steps

- **MTS Improvement Team to produce:** the current-state analysis (including the compliance assessment against the Indian Regulatory Requirements), the improvement options and goals, and the Solution Design (with each improvement's cost-benefit justification).
- **MTS to present:** the Solution Design to YAT for approval before any implementation.
- **Asha Rao to provide:** the finalised Indian Regulatory Requirements determination for the operation the website serves.
- **Dana Mercer to confirm:** the business constraints — the no-application-change / no-content-loss / no-experience-degradation conditions and the Peak Intake Period windows.
- **Sam to authorise:** MTS Improvement Team accounts on AWS Academy for the engagement.

---

*Notes written up by the Improvement Team within 24 hours of the meeting; circulated to Sam, Dana, Asha, and Pat for confirmation.*
