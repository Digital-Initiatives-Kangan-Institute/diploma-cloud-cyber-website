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
  /**
   * Per-state overrides of status/timeline. Each state is a point in the
   * timeline, so a project can be 'current' during its own cluster's states
   * but show as 'completed' once viewed from a later cluster's state.
   */
  stateOverrides?: Record<string, { status?: 'current' | 'completed'; timeline?: string }>;
  /** A not-yet-detailed placeholder slot. */
  placeholder?: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: 'lms-cloud-infrastructure',
    displayName: 'MTS – LMS Cloud Infrastructure',
    consultancy: 'MTS Consulting',
    status: 'current',
    timeline: 'In progress',
    summary: 'Migration of the YAT Learning Management System from on-premises infrastructure to AWS. Delivered by MTS Consulting under a Master Services Agreement. Cloud infrastructure scope only — YAT IT retains responsibility for the LMS application install, data migration, cutover, and organisational change management.',
    appearsIn: ['s1-cl1-at1', 's1-cl1-at2', 's1-cl1-at3', 's1-cl2-at1'],
    stateOverrides: {
      's1-cl2-at1': { status: 'completed', timeline: '2025 – 2026' },
    },
  },
  {
    slug: 'lms-replacement',
    displayName: 'AccentLoitte – LMS Replacement',
    consultancy: 'AccentLoitte',
    status: 'completed',
    timeline: 'Apr 2022 – Dec 2022',
    summary: 'Replaced YAT’s previous in-house LMS (GrayBoard, an aging JSP application originally built around 2010) with the DOODLE LMS platform. Deployed on-prem at the Cremorne campus. The on-prem environment as documented in the current ICT records is the as-built outcome of this project.',
    appearsIn: ['s1-cl1-at1', 's1-cl1-at2', 's1-cl1-at3', 's1-cl2-at1'],
  },
  {
    slug: 'accounting-cloud-migration',
    displayName: 'MTS – Accounting System Cloud Migration',
    consultancy: 'MTS Consulting',
    status: 'current',
    timeline: 'In progress',
    summary: 'Evaluation of the future operating model for YAT’s Accounting & Office Administration system (Ledgerline) — renew on-premises vs migrate to AWS. Delivered by MTS Consulting: strategic analysis, cost-benefit analysis, and a board-ready Business Case. Cloud infrastructure scope only — YAT IT retains responsibility for the application install, data migration, cutover, and organisational change management in any later build phase.',
    appearsIn: ['s1-cl1-at1', 's1-cl1-at2', 's1-cl1-at3', 's1-cl2-at1'],
    stateOverrides: {
      's1-cl2-at1': { status: 'completed', timeline: '2025 – 2026' },
    },
  },
  {
    slug: 'lms-global-expansion',
    displayName: 'MTS – LMS Global Expansion & Disaster Recovery',
    consultancy: 'MTS Consulting',
    status: 'current',
    timeline: 'In progress',
    summary: 'Extension of the YAT Learning Management System cloud platform to support YAT’s new offshore campus partnership in India. Delivered by MTS Consulting: re-architecting the LMS for a global user base, establishing cross-region disaster recovery, provisioning the infrastructure as code, and meeting the new cohort’s data-residency obligations. Cloud infrastructure scope only — YAT IT retains the application and data responsibilities.',
    appearsIn: ['s1-cl2-at1'],
  },
  {
    slug: 'second-engagement',
    displayName: 'YAT Cloud Engagement — scope to be confirmed',
    consultancy: 'To be confirmed',
    status: 'current',
    timeline: 'To be confirmed',
    summary: 'Placeholder for a second concurrent cloud engagement in this period. Scope, consultancy, and deliverables to be confirmed.',
    appearsIn: ['s1-cl2-at1'],
    placeholder: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find(p => p.slug === slug);
}

export function getProjectsForState(stateSlug: string): Project[] {
  return PROJECTS.filter(p => p.appearsIn.includes(stateSlug));
}

/** Effective status of a project in a given state (per-state override wins). */
export function getProjectStatus(p: Project, stateSlug: string): 'current' | 'completed' {
  return p.stateOverrides?.[stateSlug]?.status ?? p.status;
}

/** Effective timeline of a project in a given state (per-state override wins). */
export function getProjectTimeline(p: Project, stateSlug: string): string {
  return p.stateOverrides?.[stateSlug]?.timeline ?? p.timeline;
}
