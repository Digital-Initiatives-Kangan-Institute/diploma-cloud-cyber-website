# diploma-cloud-cyber-website

Mock organisation website + intranet supporting **ICT50220 — Diploma of Information Technology (Cloud and Cyber Security)** delivery at Kangan Institute. Renders the fictional **YAT College** scenario that frames every assessment cluster across the course.

> **YAT College is fictional.** A persistent banner on every page makes this explicit. Names, ABNs, addresses, and figures are placeholders.

---

## Quick start

Prerequisites: **Node 22.12+**, **git**.

```sh
git clone https://github.com/Digital-Initiatives-Kangan-Institute/diploma-cloud-cyber-website.git
cd diploma-cloud-cyber-website
npm install
npm run dev          # http://localhost:4321
```

The dev server hot-reloads on file save.

### Run locally for testing

| Goal | Command | URL |
|---|---|---|
| Develop with hot reload | `npm run dev` | http://localhost:4321 |
| Build the static site | `npm run build` | output → `./dist` |
| Preview the production build | `npm run preview` | http://localhost:4321 |

### Access the dev server from another computer on the LAN

By default the dev server only listens on `localhost`. To make it reachable from phones, tablets, or other PCs on the same network — useful for testing the responsive layout or demoing without deploying — pass the `--host` flag:

```sh
npm run dev -- --host          # binds to all network interfaces
```

Astro will print a **Network** URL (e.g. `http://192.168.1.42:4321`) next to the Local one. Open that URL on the other device.

Same flag works for the production preview:

```sh
npm run preview -- --host
```

**Windows firewall:** the first time you run with `--host`, Windows will prompt to allow Node through the firewall — accept for Private networks. If you've already dismissed the prompt and the LAN device can't connect, allow `node.exe` on port 4321 in Windows Defender Firewall manually.

**Find your machine's LAN IP** if Astro doesn't print it: `ipconfig` on Windows / `ifconfig` on macOS/Linux. Look for the IPv4 address on the active network adapter.

---

## Deploy to Cloudflare Pages

The site is fully static — any static host works. Cloudflare Pages is free and recommended.

1. Sign in to Cloudflare → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git** → select this repo.
2. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
3. Save and deploy. Cloudflare auto-rebuilds on every push to `main`.

No environment variables, no DNS configuration, no backend.

---

## Site structure

```
yat-college.example/
├── /                      marketing homepage
├── /study/                study-areas catalogue
├── /about/                mission, vision, people
├── /locations             Cremorne campus
├── /apply, /contact       enrolment + contact
├── /sign-in               mock SSO gate
│
└── /intranet/
    ├── /                          state picker (per cluster + AT)
    └── /{state}/                  per-state intranet root
        ├── /ict/                  ICT — env overview, diagram, specs, costings
        ├── /policies/             YAT policies and procedures
        ├── /projects/             current + past consulting engagements
        ├── /reference/            industry standards, legislative, reference
        └── /templates/            downloadable templates (planned)
```

Every intranet URL is prefixed with a **state** slug (e.g. `s1-cl1-at1`) — see [State scoping](#state-scoping) below.

---

## Content authoring

Content lives in `src/content/` across four collections:

| Collection | Folder | Holds |
|---|---|---|
| `policies` | `src/content/policies/` | YAT policies (privacy, WHS, change management, etc.) |
| `reference` | `src/content/reference/` | Industry standards, legislative, reference architectures |
| `ict` | `src/content/ict/` | YAT-internal ICT docs (env overview, network diagram, costings, etc.) |
| `projects` | `src/content/projects/{project-slug}/` | Per-project deliverables (MSA, role brief, deployment report, etc.) |

Downloadable templates (`.docx`, `.pptx`, `.pdf`, `.drawio`, `.svg`) live in `public/` and are served as static assets.

### Frontmatter

Every markdown file needs frontmatter matching the schema in `src/content.config.ts`:

```yaml
---
title: 'Privacy Policy'
description: 'What we collect, why, and how it is protected.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
  - s1-cl1-at3
order: 3            # optional — lower numbers appear first in listings
uocReferences:      # optional — rendered as a small footer on the page
  - '[ICTICT517 AC 4] Individual superior in the organisation'
yearOffset: 0       # optional — evergreen year-labelled docs (e.g. costings)
---

## Content goes here

Standard markdown. The render layer adds breadcrumbs, navigation, and the UoC footer.
```

### Editing or adding a document

- **Edit:** change the markdown, save — `npm run dev` hot-reloads.
- **Add:** create a new `.md` file in the relevant collection folder with frontmatter. No code changes needed.
- **Add an image / download:** drop the file in `public/` (e.g. `public/diagrams/foo.svg`) and reference it with an absolute path (`/diagrams/foo.svg`).
- **New top-level intranet section:** register a collection in `src/content.config.ts`, create the folder under `src/content/`, and add a dynamic route mirroring `src/pages/intranet/[state]/ict/[item].astro`. Easiest done by copying an existing section.

### In-world principle

Intranet content is **in-world only** — no course/assessment/cluster meta-language ("AT1", "your assessment", "the cluster"). The sole sanctioned exception is the small UoC-references footer. Test: would a YAT staff member writing this internal document use this phrasing? If not, rephrase.

---

## State scoping

### What a state is

Every intranet URL is prefixed with a **state** slug — e.g. `/intranet/s1-cl1-at1/policies/privacy`. A state represents the world of YAT at a specific point in the assessment timeline. As the course progresses through clusters and ATs, the YAT environment evolves (e.g. on-prem LMS → cloud LMS → HA-hardened cloud LMS) — each state captures a snapshot.

States are defined in **`src/config/states.ts`**:

- `STATES[]` — real, navigable states (currently five: S1-CL1 AT1/AT2/AT3, S1-CL2 AT1, S1-CL3 AT1)
- `PLACEHOLDER_CLUSTERS[]` — non-clickable italic rows in the state picker for clusters/ATs not yet designed

### How `appearsIn` works

A markdown file renders at a state's URL only if that state's slug appears in the file's `appearsIn` list. Three patterns:

- **Same content in many states.** Set `appearsIn` to every applicable state slug. One file, many URLs. Edit once, all states update. Used by stable docs like policies.
- **State-versioned forks.** When the same logical document needs different content per state (e.g. the network diagram before and after cutover), author **separate files** with mutually exclusive `appearsIn`. Keep the frontmatter `title` identical across the forks so the per-state listing label stays consistent. See `src/content/ict/network-diagram*.md` and `environment-overview*.md` for the pattern.
- **State-specific only.** Set `appearsIn` to the single state where the document exists. Used by deliverables that only make sense at certain points (e.g. HA database requirements only at S1-CL1-AT3).

### Add a real state

To make a new AT navigable (e.g. you've designed S1-CL2 AT2):

1. Add a new entry to `STATES[]` in `src/config/states.ts` — slug, semester, cluster code, AT number, labels.
2. Update the `appearsIn` of any markdown files that should now include this state. Bulk-replace works if the new state should mirror an existing one (e.g. *"this AT shows the same view as S1-CL1-AT3 plus a new doc or two"*).
3. The dynamic routes and state picker pick up the new state automatically — no other code changes.

### Add a new cluster

In `src/config/states.ts`:

- For a cluster with real ATs: add entries to `STATES[]`.
- For a cluster that's only a placeholder for now: add a `PLACEHOLDER_CLUSTERS[]` row.
- Mixed clusters (some real ATs + placeholder ATs) are supported — the state picker shows real ATs clickable, placeholder ATs italic.

---

## Diagrams

draw.io is the agreed tooling. Pattern per diagram:

1. Author in [draw.io](https://app.diagrams.net/) → save the `.drawio` file to `public/diagrams/`.
2. Export as **SVG** (File → Export as → SVG, tick "Embed Fonts") → save the `.svg` next to the `.drawio`.
3. Embed in markdown: `![alt text](/diagrams/your-diagram.drawio.svg)`.
4. Offer downloads inline so students can open and edit:

```markdown
*Downloads: [SVG](/diagrams/your-diagram.drawio.svg) · [draw.io source](/diagrams/your-diagram.drawio)*
```

Current diagrams under `public/diagrams/`: three versions of the YAT network topology (on-prem, post-cutover single-AZ, HA-hardened Multi-AZ).

---

## Companion repository

The site is the rendered expression of specifications in the sibling [`diploma-cloud-cyber`](https://github.com/Digital-Initiatives-Kangan-Institute/diploma-cloud-cyber) repo:

- `scenario/` — source markdown that's been migrated into `src/content/`. Files in `scenario/MIGRATED/` have been transferred.
- `scenario/website.md` — sitemap, navigation, build conventions.
- `scenario/branding/brand-pack.md` — palette, typography, voice, logo direction, disclosure banner spec.
- `scenario/branding/assets/` — logos, favicons, photography sources.

---

## Tech stack

| | |
|---|---|
| Static site generator | [Astro](https://astro.build) 6 — content collections, file-based routing, zero-JS-by-default |
| Language | TypeScript (strict) |
| Hosting | Cloudflare Pages (free tier) |
| Node | ≥ 22.12.0 |

---

## Project structure

```
.
├── astro.config.mjs            site-level config + sitemap integration
├── src/
│   ├── content.config.ts       Astro collection definitions + frontmatter schema
│   ├── content/                markdown content (policies, reference, ict, projects)
│   ├── pages/                  file-based routes (incl. /intranet/[state]/… dynamic routes)
│   ├── layouts/                public, intranet, sign-in layouts
│   ├── components/             disclosure banner, navigation, breadcrumbs, state picker
│   ├── styles/                 brand-pack tokens + global styles
│   └── config/
│       ├── states.ts           STATES + PLACEHOLDER_CLUSTERS — the state model
│       └── projects.ts         PROJECTS metadata (current + past engagements)
└── public/
    ├── diagrams/               .drawio source + .svg exports
    └── …                       favicons, robots.txt, downloadable assets
```

---

## Licence

Internal Kangan Institute educational use. Branding, content, and templates are simulated for the YAT College case study and are not intended for non-educational reuse.
