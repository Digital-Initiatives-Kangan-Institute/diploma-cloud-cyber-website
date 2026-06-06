/**
 * Intranet "state" model — each state represents the world of YAT at a specific
 * point in the assessment cluster timeline. Used by:
 *   - /intranet/                  state-picker landing
 *   - /intranet/[state]/          per-state intranet landing (dynamic route)
 *
 * Anticipated final scope: ~7 clusters across the course, ~3 ATs each (≈ 20
 * states total). Clusters and ATs that haven't been designed yet appear as
 * non-clickable placeholders so the structure is visible from day one.
 *
 * To add a new state: add it to STATES below (real ones — clickable) or to
 * PLACEHOLDER_GROUPS below (named slot in the picker — not clickable).
 */

export interface State {
  slug: string;             // url segment: 's1-cl1-at1'
  semesterNumber: number;
  semesterLabel: string;    // 'Semester 1'
  clusterCode: string;      // 'CL1'
  clusterNumber: number;
  clusterLabel: string;     // 'Cloud Design and Build'
  atNumber: number;
  atLabel: string;          // 'Business Case'
  fullLabel: string;        // 'Semester 1, Cluster 1 — Cloud Design and Build, Assessment Task 1: Business Case'
}

/** Real, navigable states with full per-state landing pages built. */
export const STATES: State[] = [
  {
    slug: 's1-cl1-at1',
    semesterNumber: 1, semesterLabel: 'Semester 1',
    clusterCode: 'CL1', clusterNumber: 1, clusterLabel: 'Cloud Design and Build',
    atNumber: 1, atLabel: 'Business Case',
    fullLabel: 'Semester 1, Cluster 1 — Cloud Design and Build, Assessment Task 1: Business Case',
  },
  {
    slug: 's1-cl1-at2',
    semesterNumber: 1, semesterLabel: 'Semester 1',
    clusterCode: 'CL1', clusterNumber: 1, clusterLabel: 'Cloud Design and Build',
    atNumber: 2, atLabel: 'Cloud Foundation Build',
    fullLabel: 'Semester 1, Cluster 1 — Cloud Design and Build, Assessment Task 2: Cloud Foundation Build',
  },
  {
    slug: 's1-cl1-at3',
    semesterNumber: 1, semesterLabel: 'Semester 1',
    clusterCode: 'CL1', clusterNumber: 1, clusterLabel: 'Cloud Design and Build',
    atNumber: 3, atLabel: 'High Availability Hardening',
    fullLabel: 'Semester 1, Cluster 1 — Cloud Design and Build, Assessment Task 3: High Availability Hardening',
  },
  {
    slug: 's1-cl2-at1',
    semesterNumber: 1, semesterLabel: 'Semester 1',
    clusterCode: 'CL2', clusterNumber: 2, clusterLabel: 'Cloud Disaster Recovery',
    atNumber: 1, atLabel: 'Disaster Recovery Plan',
    fullLabel: 'Semester 1, Cluster 2 — Cloud Disaster Recovery, Assessment Task 1: Disaster Recovery Plan',
  },
  {
    slug: 's1-cl3-at1',
    semesterNumber: 1, semesterLabel: 'Semester 1',
    clusterCode: 'CL3', clusterNumber: 3, clusterLabel: 'Cloud Infrastructure Improvement',
    atNumber: 1, atLabel: 'TBD',
    fullLabel: 'Semester 1, Cluster 3 — Cloud Infrastructure Improvement, Assessment Task 1: TBD',
  },
];

/**
 * Placeholder rows in the state picker for clusters / ATs not yet designed.
 * Total course is anticipated to span ~7 clusters / ~20 ATs. The placeholders
 * below are illustrative of the eventual shape; cluster counts per semester
 * and exact AT counts will firm up as the clusters are designed.
 */
export interface PlaceholderCluster {
  semesterNumber: number;
  semesterLabel: string;
  clusterCode: string;
  clusterNumber: number;
  clusterLabel: string;   // 'TBD' until designed
  atCount: number;        // number of TBD AT slots to show
}

export const PLACEHOLDER_CLUSTERS: PlaceholderCluster[] = [
  { semesterNumber: 1, semesterLabel: 'Semester 1', clusterCode: 'CL2', clusterNumber: 2, clusterLabel: 'Cloud Disaster Recovery', atCount: 3 },
  { semesterNumber: 1, semesterLabel: 'Semester 1', clusterCode: 'CL3', clusterNumber: 3, clusterLabel: 'Cloud Infrastructure Improvement', atCount: 3 },
  { semesterNumber: 2, semesterLabel: 'Semester 2', clusterCode: 'CL1', clusterNumber: 1, clusterLabel: 'Cyber Design', atCount: 3 },
  { semesterNumber: 2, semesterLabel: 'Semester 2', clusterCode: 'CL2', clusterNumber: 2, clusterLabel: 'Cyber Policy', atCount: 3 },
  { semesterNumber: 2, semesterLabel: 'Semester 2', clusterCode: 'CL3', clusterNumber: 3, clusterLabel: 'Cyber Enterprise Systems', atCount: 3 },
  { semesterNumber: 2, semesterLabel: 'Semester 2', clusterCode: 'CL4', clusterNumber: 4, clusterLabel: 'Cyber Threat Hunting', atCount: 3 },
];

export function getStateBySlug(slug: string): State | undefined {
  return STATES.find(s => s.slug === slug);
}

/**
 * Render-ready grouping: semester → cluster → ATs. Real ATs from STATES,
 * placeholder ATs from PLACEHOLDER_CLUSTERS. Sorted by semester then cluster.
 */
export interface ClusterGroup {
  semesterNumber: number;
  semesterLabel: string;
  clusterCode: string;
  clusterNumber: number;
  clusterLabel: string;
  ats: Array<
    | { kind: 'real'; state: State }
    | { kind: 'placeholder'; atNumber: number; atLabel: string }
  >;
}

export interface SemesterGroup {
  semesterNumber: number;
  semesterLabel: string;
  clusters: ClusterGroup[];
}

export function getGroupedStructure(): SemesterGroup[] {
  const clusterMap = new Map<string, ClusterGroup>();

  // Seed from real STATES
  for (const state of STATES) {
    const key = `s${state.semesterNumber}-${state.clusterCode}`;
    if (!clusterMap.has(key)) {
      clusterMap.set(key, {
        semesterNumber: state.semesterNumber,
        semesterLabel: state.semesterLabel,
        clusterCode: state.clusterCode,
        clusterNumber: state.clusterNumber,
        clusterLabel: state.clusterLabel,
        ats: [],
      });
    }
    clusterMap.get(key)!.ats.push({ kind: 'real', state });
  }

  // Merge placeholder ATs into clusters. If a cluster already has real ATs
  // (from STATES above), keep those and add placeholder rows only for the
  // AT numbers not already covered. If the cluster has no real ATs yet,
  // create a fully-placeholder cluster group.
  for (const ph of PLACEHOLDER_CLUSTERS) {
    const key = `s${ph.semesterNumber}-${ph.clusterCode}`;
    const existing = clusterMap.get(key);
    if (existing) {
      const realAtNumbers = new Set(
        existing.ats
          .filter((a): a is { kind: 'real'; state: State } => a.kind === 'real')
          .map(a => a.state.atNumber)
      );
      for (let i = 1; i <= ph.atCount; i++) {
        if (!realAtNumbers.has(i)) {
          existing.ats.push({ kind: 'placeholder', atNumber: i, atLabel: 'TBD' });
        }
      }
      existing.ats.sort((a, b) => {
        const an = a.kind === 'real' ? a.state.atNumber : a.atNumber;
        const bn = b.kind === 'real' ? b.state.atNumber : b.atNumber;
        return an - bn;
      });
    } else {
      const group: ClusterGroup = {
        semesterNumber: ph.semesterNumber,
        semesterLabel: ph.semesterLabel,
        clusterCode: ph.clusterCode,
        clusterNumber: ph.clusterNumber,
        clusterLabel: ph.clusterLabel,
        ats: Array.from({ length: ph.atCount }, (_, i) => ({
          kind: 'placeholder' as const,
          atNumber: i + 1,
          atLabel: 'TBD',
        })),
      };
      clusterMap.set(key, group);
    }
  }

  // Sort clusters within each semester by clusterNumber
  const clusters = Array.from(clusterMap.values()).sort((a, b) => {
    if (a.semesterNumber !== b.semesterNumber) return a.semesterNumber - b.semesterNumber;
    return a.clusterNumber - b.clusterNumber;
  });

  // Group by semester
  const semMap = new Map<number, SemesterGroup>();
  for (const c of clusters) {
    if (!semMap.has(c.semesterNumber)) {
      semMap.set(c.semesterNumber, {
        semesterNumber: c.semesterNumber,
        semesterLabel: c.semesterLabel,
        clusters: [],
      });
    }
    semMap.get(c.semesterNumber)!.clusters.push(c);
  }

  return Array.from(semMap.values()).sort((a, b) => a.semesterNumber - b.semesterNumber);
}
