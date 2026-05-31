/**
 * YAT projects — current and past consulting engagements with metadata for
 * the intranet's project records.
 *
 * To add a new project: append to PROJECTS below with full metadata and
 * appearsIn list (which state slugs the project record is visible in).
 *
 * Project document content lives in the `projects` content collection
 * (src/content/projects/{project-slug}/{doc-slug}.md). Project metadata
 * here drives the listing + per-project landing; documents are loaded
 * separately from the collection.
 */

export interface Project {
  slug: string;
  displayName: string;       // 'MTS – LMS Cloud Infrastructure'
  consultancy: string;       // 'MTS Consulting'
  status: 'current' | 'completed';
  timeline: string;          // 'In progress' | 'Apr 2022 – Dec 2022'
  summary: string;           // one-paragraph project overview
  /** State slugs from src/config/states.ts STATES[].slug */
  appearsIn: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: 'lms-cloud-infrastructure',
    displayName: 'MTS – LMS Cloud Infrastructure',
    consultancy: 'MTS Consulting',
    status: 'current',
    timeline: 'In progress',
    summary: 'Migration of the YAT Learning Management System from on-premises infrastructure to AWS. Delivered by MTS Consulting under a Master Services Agreement. Cloud infrastructure scope only — YAT IT retains responsibility for the LMS application install, data migration, cutover, and organisational change management.',
    appearsIn: ['s1-cl1-at1', 's1-cl1-at2', 's1-cl1-at3'],
  },
  {
    slug: 'lms-replacement',
    displayName: 'AccentLoitte – LMS Replacement',
    consultancy: 'AccentLoitte',
    status: 'completed',
    timeline: 'Apr 2022 – Dec 2022',
    summary: 'Replaced YAT’s previous in-house LMS (GrayBoard, an aging JSP application originally built around 2010) with the DOODLE LMS platform. Deployed on-prem at the Cremorne campus. The on-prem environment as documented in the current ICT records is the as-built outcome of this project.',
    appearsIn: ['s1-cl1-at1', 's1-cl1-at2', 's1-cl1-at3'],
  },
  {
    slug: 'accounting-cloud-migration',
    displayName: 'MTS – Accounting System Cloud Migration',
    consultancy: 'MTS Consulting',
    status: 'current',
    timeline: 'In progress',
    summary: 'Evaluation of the future operating model for YAT’s Accounting & Office Administration system (Ledgerline) — renew on-premises vs migrate to AWS. Delivered by MTS Consulting: strategic analysis, cost-benefit analysis, and a board-ready Business Case. Cloud infrastructure scope only — YAT IT retains responsibility for the application install, data migration, cutover, and organisational change management in any later build phase.',
    appearsIn: ['s1-cl1-at1'],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find(p => p.slug === slug);
}

export function getProjectsForState(stateSlug: string): Project[] {
  return PROJECTS.filter(p => p.appearsIn.includes(stateSlug));
}
