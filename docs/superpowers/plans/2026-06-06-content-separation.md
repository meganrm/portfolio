# Content Separation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move all written content out of TypeScript data files into per-item Markdown files with YAML frontmatter, and organize images into per-project/post subfolders.

**Architecture:** A new `lib/content.ts` loader reads `content/posts/*.md` and `content/projects/*.md` at build time using `gray-matter`, returning the same typed `PROJECTS` and `POSTS` arrays the page templates already consume. `data/projects.ts` and `data/posts.ts` become type-only files. Because `lib/content.ts` uses Node's `fs`, the one existing client component that imports `PROJECTS` (`app/work/page.tsx`) must be split into a server component that reads the data and a new `WorkGrid` client component that handles filter state.

**Tech Stack:** `gray-matter` (YAML frontmatter parsing), Next.js 14 App Router server/client component model

---

## File Map

**Create:**
- `lib/content.ts` — build-time loader using gray-matter
- `app/work/WorkGrid.tsx` — client component with filter state (split from `app/work/page.tsx`)
- `content/posts/*.md` × 11
- `content/projects/*.md` × 14

**Modify:**
- `data/projects.ts` — delete `PROJECTS` array export; keep all interfaces and types
- `data/posts.ts` — delete `POSTS` array export; keep all interfaces and types
- `app/page.tsx` — update `PROJECTS` import to `@/lib/content`
- `app/work/page.tsx` — rewrite as server component delegating to WorkGrid
- `app/work/[slug]/page.tsx` — update `PROJECTS` import; update hardcoded portrait gallery paths
- `app/notebook/page.tsx` — update `POSTS` import to `@/lib/content`
- `app/notebook/[slug]/page.tsx` — update `POSTS` import to `@/lib/content`

**Move (images/videos):**
- `public/images/*.{png,jpg,gif,webp}` → `public/images/projects/[slug]/` or `public/images/posts/[slug]/`
- `public/videos/*.mp4` → `public/videos/projects/[slug]/`

---

## Task 1: Install gray-matter and scaffold directories

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install gray-matter**

```bash
npm install gray-matter
```

Expected: `added 1 package` (gray-matter has zero runtime dependencies).

- [ ] **Step 2: Create content and lib directories**

```bash
mkdir -p content/posts content/projects lib
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install gray-matter, scaffold content/ and lib/ dirs"
```

---

## Task 2: Write the content loader

**Files:**
- Create: `lib/content.ts`

- [ ] **Step 1: Write lib/content.ts**

```ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Project } from '@/data/projects'
import type { Post } from '@/data/posts'

function loadContent<T>(dir: string): T[] {
  const folder = path.join(process.cwd(), dir)
  return fs.readdirSync(folder)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const { data } = matter(fs.readFileSync(path.join(folder, f), 'utf8'))
      return { id: f.replace(/\.md$/, ''), ...data } as T
    })
}

export const PROJECTS = loadContent<Project>('content/projects')
export const POSTS    = loadContent<Post>('content/posts')
```

- [ ] **Step 2: Verify TypeScript compiles cleanly**

```bash
npx tsc --noEmit
```

Expected: no errors. (The loader references content dirs that don't have .md files yet — that's fine at type-check time.)

- [ ] **Step 3: Commit**

```bash
git add lib/content.ts
git commit -m "feat: add build-time content loader using gray-matter"
```

---

## Task 3: Convert posts to Markdown files

**Files:**
- Create: `content/posts/*.md` (11 files)

### YAML format rules

- Filename = the post's `id` field (e.g. `cellpack-peroxisomes.md`). The loader injects `id` automatically — do NOT include it in the frontmatter.
- Single-line strings: write bare, no quotes needed unless the value starts with `[`, `{`, `*`, `&`, `!`, or contains `: ` (colon-space).
- Multi-line strings: use `|` (literal block scalar). Indent content two spaces. Apostrophes, em-dashes, double-quotes, colons — all safe, no escaping needed.
- The `tag` field is an object, not a plain string:
  ```yaml
  tag:
    label: Research
  ```
- The Markdown body (below the closing `---`) stays empty.

### Complete example: `content/posts/cellpack-peroxisomes.md`

```markdown
---
date: Oct 2023
read: 5 min read
tag:
  label: Research
title: Are peroxisomes randomly distributed?
excerpt: |
  First scientific application of the modernized cellPACK: using rule-based packing to test whether peroxisomes in hiPS cells are randomly arranged, nuclear-biased, or membrane-biased.
lead: |
  After a year of getting cellPACK back on its feet as a standalone Python package, we finally pointed it at a real biology question. Are peroxisomes — small, punctate organelles that detoxify molecules and break down fatty acids — randomly distributed in human iPS cells, or are they organized by some rule we haven't named yet?
body1: |
  The setup uses the Allen Institute hiPSC dataset: ~305 segmented images of cells with endogenously tagged peroxisomes (PMP34), each one a snapshot of the spatial distribution we're trying to explain. We generated equivalent populations of simulated cells with cellPACK under three hypotheses: peroxisomes distributed randomly throughout the cytoplasm, biased toward the nucleus, or biased toward the plasma membrane. Each simulated cell is rendered as a multi-channel voxelized image — the same format as the experimental data — so the same downstream analysis pipeline can compare them on equal footing.
h1: "PILR, and a clear winner"
body2: |
  We used PILR (Parameterized Intracellular Localization Reduction) — the Allen Institute's parameterized organelle-distribution pipeline — to compute the average distribution profile for each population: real peroxisomes, random simulated, nuclear-biased simulated, membrane-biased simulated. We then computed correlations between each simulated profile and the experimental profile. The result was satisfyingly clean: the nuclear-bias rule produced the highest correlation with the observed peroxisome distribution. Random and membrane bias correlated less well.
body3: |
  That's not a final answer — "nuclear bias" is a phenomenological description, not a mechanism — but it gives the cell biologists a candidate hypothesis to test experimentally. An abstract on this work was accepted for ASCB (we submitted to BPS too, awaiting decision). The team: Saurabh Mogre, Ruge Li, and me. We're working on extending to other punctate organelles like endosomes next, and getting the rule-mixing infrastructure ready for combined hypotheses.
coverImage: /images/posts/cellpack-peroxisomes/cover.png
---
```

Note: `h1` is quoted above because it starts with "PILR," — quoting any value with a comma near the start is safe practice, though not strictly required here.

### Remaining 10 posts

Create one `.md` file per post in `content/posts/`. Pull all field content from `data/posts.ts`. Apply the same format rules as the example above. Image paths use the new `posts/[id]/` locations (Task 8 moves the actual files).

| Filename | tag.label | h1 field | coverImage new path | url |
|---|---|---|---|---|
| `cellpack-rules-of-organization.md` | Research | *(none)* | `/images/posts/cellpack-rules-of-organization/cover.jpg` | — |
| `integrated-intracellular-organization.md` | Research | The interior design of our cells | *(none)* | `https://www.nature.com/articles/s41586-022-05563-7` |
| `imsc-one-cell-from-many.md` | Sci-Vis | Aligning by DNA | *(none)* | `https://imsc.allencell.org` |
| `cellpack-out-of-the-box.md` | Methods | Re-housing the engine | `/images/posts/cellpack-out-of-the-box/cover.webp` | — |
| `simularium-publication.md` | Sci-Vis | From file to browser | *(none)* | `https://doi.org/10.1038/s41592-022-01442-1` |
| `data-to-knowledge.md` | Essay | Tools as translators | `/images/posts/data-to-knowledge/cover.png` | — |
| `motion-in-static-images.md` | Methods | What I borrowed | `/images/posts/motion-in-static-images/cover.png` | — |
| `3d-meshes-threejs.md` | Sci-Vis | Baking ambient occlusion in Cinema4D | *(none)* | — |
| `white-blood-cells.md` | Research | Communicating motion in static images | `/images/posts/white-blood-cells/cover.png` | `https://www.ucsf.edu/news/2016/11/404936/...` |
| `crosslinker-into-focus.md` | Research | The metaphor | `/images/posts/crosslinker-into-focus/cover.png` | `https://doi.org/10.1016/j.chembiol.2014.02.022` |

- [ ] **Step 1: Create all 11 post Markdown files**

Using the example above as the template, create each file. Body text for each comes verbatim from `data/posts.ts`.

- [ ] **Step 2: Verify parsing**

```bash
node -e "
const m = require('gray-matter');
const fs = require('fs');
const files = fs.readdirSync('content/posts');
files.forEach(f => {
  const d = m(fs.readFileSync('content/posts/' + f, 'utf8'));
  const keys = Object.keys(d.data);
  console.log(f, '->', keys.join(', '));
});
"
```

Expected: each file prints its frontmatter keys with no errors.

- [ ] **Step 3: Commit**

```bash
git add content/posts/
git commit -m "content: convert all posts to YAML frontmatter Markdown files"
```

---

## Task 4: Convert projects to Markdown files

**Files:**
- Create: `content/projects/*.md` (14 files)

### Format rules (same as posts, plus project-specific fields)

- `tags` is an array of objects:
  ```yaml
  tags:
    - label: Sci-Vis
    - label: Research
  ```
- `tone` and `altTone` are bare strings (`teal`, `mustard`, `clay`, `sage`, `ink`).
- `pageTemplate` is a bare string (`tool` or `visual`).
- `featured: true` is a boolean (no quotes).
- Optional fields (`url`, `heroImage`, `cardImage`, `screenshotImage`, `processImage`, `detailImage`, `heroImagePosition`) are omitted when absent in the source data.
- Projects using `sections` omit `body1`, `quote`, `body2`, `body3` (they are empty strings in the source).

### Complete example: `content/projects/simularium.md` (flat body)

```markdown
---
title: Simularium
year: "2022"
medium: TypeScript · WebGL
role: Visualization engineer
context: Allen Institute for Cell Science
tone: teal
altTone: mustard
blurb: An interactive web tool for viewing and sharing spatiotemporal biological simulations.
url: https://simularium.allencell.org
tags:
  - label: Sci-Vis
  - label: Research
featured: true
pageTemplate: tool
heroImage: /images/projects/simularium/hero.gif
screenshotImage: /images/projects/simularium/viewer.png
processImage: /images/projects/simularium/viewer.png
detailImage: /images/projects/simularium/virtual-cell-goal.png
lead: |
  Simularium lets researchers view, explore, and share spatiotemporal biological simulations directly in the browser — no specialized software required.
body1: |
  The computational modeling ecosystem in biology is enormous and fragmented. Molecular dynamics tools like GROMACS and NAMD run at the atomic scale; ReaDDy, Smoldyn, and MCell handle reaction-diffusion at the molecular scale; Cytosim and MEDYAN simulate cytoskeletal dynamics; PhysiCell, CompuCell3D, and Morpheus model cells as agents. Each speaks its own file format, its own visualization conventions, its own install dance. The result is that a simulation is often legible only to the person who ran it.
quote: The best visualization tool is the one a collaborator can open without installing anything.
body2: |
  Simularium was built as a common viewer for that ecosystem. The project defines an open file format that simulations from diverse tools can export to, and a web viewer that renders them interactively — step through time, filter agents, change visual encoding, plot quantities alongside the 3D scene. I worked across the full visualization stack: designing the 3D rendering pipeline, building the UI, and collaborating on the file format spec. The viewer handles models ranging from molecular dynamics to whole-cell agent-based simulations, and the published trajectories range from clathrin-mediated endocytosis to biomolecular condensate buffering work in eLife.
body3: |
  Simularium was published in Nature Methods in 2022. Beyond researcher-to-researcher use, it became the substrate for the Binding Affinity education module — the first of a planned series of interactive simulation lessons. The long-term goal Graham Johnson and I have talked about for years sits behind all of this: a completely virtual cell that anyone with a browser can step into and explore.
---
```

Note: `year` is quoted as `"2022"` because bare integers are valid YAML but the TypeScript type expects a `string`. Always quote `year` values.

### Complete example: `content/projects/cellpack.md` (sections array)

Projects using `sections` omit `body1`, `quote`, `body2`, `body3`. The `sections` array uses YAML sequence syntax; each `content` item is a string using `|`.

```markdown
---
title: cellPACK
year: "2013–present"
medium: Python · Simularium · Rule-based modeling
role: Visualization scientist · Co-lead
context: "Johnson Lab UCSF (2013–2016) · Allen Institute for Cell Science (2016–present)"
tone: sage
altTone: mustard
blurb: A virtual mesoscope. Originally a packing engine for building 3D cells from molecular ingredients; now a rule-based modeling toolkit for testing hypotheses about intracellular organization in human stem cells.
url: https://cellpack.allencell.org
tags:
  - label: Sci-Vis
  - label: Research
featured: true
pageTemplate: tool
heroImage: /images/projects/cellpack/hero.png
screenshotImage: /images/projects/cellpack/hiv.webp
lead: |
  Microscopy sees down to microns. X-ray crystallography sees down to atoms. The mesoscale — 10⁻⁷ to 10⁻⁸ meters, where individual proteins crowd against each other inside a cell — has no direct imaging method. cellPACK fills that gap: given a segmented volume and a library of molecular ingredients with rules for how they distribute, the engine packs them into 3D models you can render, simulate, or compare against experimental data. The project has gone through three distinct lives across thirteen years; this page walks through all of them.
sections:
  - id: origins
    title: Origins
    image: /images/projects/cellpack/systems.png
    imageAlt: "cellPACK recipe conversions from David Goodsell's paintings"
    content:
      - |
        cellPACK was originally developed by Graham Johnson and Ludovic Autin as Graham's thesis project with Art Olson at Scripps, published in Nature Methods in 2015 (Johnson et al., 12, 85–91). The premise: David Goodsell had been producing watercolor paintings of cellular interiors for decades, each one a hypothesis about how a real cell's mesoscale would look if you could see it. cellPACK is the software that turns those hypotheses into 3D models you can interrogate computationally.
      - |
        I joined Graham's lab at UCSF as a postdoc in 2013 to work on the tool. The library grew to five biological systems of increasing complexity: blood plasma, cytoplasm, synaptic vesicle, HIV-1, and a coarse whole-cell model. My own modeling work included LDL/HDL particles — a recipe of phospholipid, cholesterol, cholesteryl ester, and triglyceride packed under ApoB, ApoC, and ApoE. I mentored UC Berkeley students Mini Choi (rebuilding the blood plasma recipe), Sung Han (converting Stanford's WholeCellViz Mycoplasma genitalium data into a cellPACK model), and Caroline Chan (streamlining the 3D-grid bottleneck inside autoPACK). Funding from a QB3@UCSF Fellowship, the Mary Anne Koda-Kimble Seed Award, and Autodesk.
  - id: modernization
    title: Modernization
    image: /images/projects/simularium/viewer.png
    imageAlt: cellPACK output rendered in the Simularium web viewer
    content:
      - |
        The original cellPACK ran as a plugin inside proprietary 3D animation software, depended on deprecated packages. When I moved with Graham to the Allen Institute for Cell Science, modernizing the codebase became the prerequisite for everything else we wanted to do with it.
      - |
        Between 2021 and 2022, Saurabh Mogre, Ryan Spangler and I pulled the algorithm out of the 3D-software plugin shell and into a standalone Python package. We brought it under version control, open-sourced it, wrote real documentation, and aligned the codebase with AICS engineering standards. We built a converter from cellPACK output to simulariumio — so a cellPACK model can be opened directly in the Simularium web viewer with no install — and integrated cellPACK with the vivarium multi-modal simulation framework (Agmon, Spangler et al., Bioinformatics 38-7, 2022). The result is a packing engine that runs on the CPU, in Python, anywhere.
  - id: scientific-applications
    title: Scientific applications
    image: /images/projects/cellpack/rules-triptych.jpg
    imageAlt: "Three packing rules: empty cell, membrane bias, nucleus bias"
    content:
      - |
        Modernization turned cellPACK from an illustration tool into a hypothesis-testing tool. The question we asked first was almost embarrassingly basic: are punctate organelles like peroxisomes and endosomes distributed randomly inside a human iPS cell, or is there a spatial bias we've been missing? Using the WTC-11 hiPSC Single Cell Image Dataset — the same 200,000+ cell library behind the 2023 Nature paper on integrated intracellular organization (Viana et al.) — we generated cellPACK simulations under four simple rules: unbiased, nuclear bias, membrane bias, and apical bias.
      - |
        Then we built the spatial-statistics machinery to compare simulations to data: Earth mover's distance and Kolmogorov-Smirnov tests on distance distributions, with cell-and-nucleus-shape variation as the dominant confound. To control for that variation we introduced an occupancy-ratio metric — the available volume at each distance — which lets us mix bias rules and read out which mechanisms best match observation. The current finding: no single simple bias fully explains peroxisome distribution. ER and Golgi colocalization matter — ER + peroxisome slightly improves the match, ER + endosome worsens it — and the next round of rules will need to encode those organelle interactions explicitly.
      - |
        The work has been presented at ASCB and submitted to BPS. Saurabh Mogre is co-leading the modeling effort with me, and the larger team now includes Ruge Li, Allison Scibisz, Thao Do, Julie Dixon, Matheus Viana, Ehssan Nazockdast, Susanne Rafelski, Julie Theriot (University of Washington / HHMI), and Graham Johnson.
  - id: vision
    title: Vision
    content:
      - |
        cellPACK now sits inside a broader Allen Institute initiative called CellScapes — uncovering the design principles of multicellular programs essential for life. The vision is a connected ecosystem of visualization tools: a library of existing recipes you can edit, parameter-tune, and combine; datasets of cellular observations you can compare your models against; and interconnected analysis tools (cellPACK Studio, the Simularium viewer, BioFileFinder at bff.allencell.org) that let you move between hypothesis, simulation, comparison, and refinement without leaving the browser.
      - |
        The synthetic data cellPACK generates is also feeding back into machine learning work on intracellular organization — recently used for training and validating the point-cloud representation models in Vasan et al., Nature Methods 22, 1531–1544 (2025). The closer we get to a packing engine you can reason with, the more legible cellular self-assembly becomes — not just as art, but as biology.
---
```

Note: the `modernization` section image references `simularium`'s folder (`/images/projects/simularium/viewer.png`) because that file is canonical to the simularium project. Cross-project image references like this are fine.

Note: sections without an `image` field (e.g., `vision`) simply omit both `image` and `imageAlt`.

### Remaining 12 projects

Create one `.md` per project. Pull content from `data/projects.ts`. Apply the same format rules. Use the `simularium` example for flat projects and the `cellpack` example for sections projects.

Only `cellpack` uses `sections`. All other projects use flat `body1`/`quote`/`body2`/`body3`.

| Filename | tone | altTone | pageTemplate | featured | notes |
|---|---|---|---|---|---|
| `binding-affinity-module.md` | mustard | teal | tool | — | flat body |
| `cell-migration-3d.md` | clay | sage | visual | — | flat body |
| `town-hall-project.md` | mustard | clay | tool | true | flat body |
| `cell-feature-explorer.md` | sage | teal | tool | — | flat body |
| `mutual-aid-hub.md` | clay | sage | tool | true | flat body; has `cardImage` |
| `imsc.md` | teal | sage | tool | — | flat body; heroImage and processImage are `/videos/` paths |
| `hbv-animation.md` | mustard | teal | visual | — | flat body; heroImage and processImage are `/videos/` paths |
| `crispr-cover.md` | ink | mustard | visual | — | flat body |
| `trapping-kinases.md` | sage | mustard | visual | — | flat body; has `url` |
| `ldl-hdl-models.md` | clay | mustard | visual | — | flat body |
| `indivisible.md` | sage | teal | tool | — | flat body; has `url` |
| `portraits.md` | clay | sage | visual | — | flat body |

Image paths for each project follow the pattern `/images/projects/[slug]/[descriptive-name].[ext]`. The exact new paths are defined in the image mapping table in Task 7.

- [ ] **Step 1: Create all 14 project Markdown files**

Using the two examples above as templates, create each file. Body text comes verbatim from `data/projects.ts`.

- [ ] **Step 2: Verify parsing**

```bash
node -e "
const m = require('gray-matter');
const fs = require('fs');
const files = fs.readdirSync('content/projects');
files.forEach(f => {
  const d = m(fs.readFileSync('content/projects/' + f, 'utf8'));
  console.log(f, '-> sections:', d.data.sections?.length ?? 'none', ', keys:', Object.keys(d.data).length);
});
"
```

Expected: each file prints without errors; `cellpack` shows `sections: 4`.

- [ ] **Step 3: Commit**

```bash
git add content/projects/
git commit -m "content: convert all projects to YAML frontmatter Markdown files"
```

---

## Task 5: Refactor app/work/page.tsx — extract WorkGrid client component

**Why:** `lib/content.ts` uses Node's `fs` module. That module is available to server components at build time but cannot be bundled for the browser. `app/work/page.tsx` is currently a client component (`'use client'`). Splitting it into a server component (data reading) + client component (filter state) fixes this.

**Files:**
- Create: `app/work/WorkGrid.tsx`
- Modify: `app/work/page.tsx`

- [ ] **Step 1: Create app/work/WorkGrid.tsx**

```tsx
'use client'

import { useState } from 'react'
import Eyebrow from '@/components/Eyebrow'
import WorkCard from '@/components/WorkCard'
import type { Project } from '@/data/projects'

const FILTERS = [
  { label: 'All',        cls: '' },
  { label: 'Sci-Vis',    cls: 'filter-pill-sci' },
  { label: 'Research',   cls: 'filter-pill-research' },
  { label: 'Civic Tech', cls: 'filter-pill-civic' },
  { label: 'Fine Art',   cls: 'filter-pill-art' },
]

export default function WorkGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState('All')

  const visible = projects.filter((p) =>
    active === 'All' || p.tags.some((t) => t.label === active)
  )

  return (
    <main>
      <div className="container">
        <header className="writing-head">
          <Eyebrow dot>Portfolio</Eyebrow>
          <h1 className="detail-title" style={{ fontSize: 'clamp(38px,5vw,60px)' }}>
            All work
          </h1>
        </header>

        <div className="filter-bar">
          {FILTERS.map(({ label, cls }) => (
            <button
              key={label}
              className={`filter-pill${cls ? ` ${cls}` : ''}${active === label ? ' active' : ''}`}
              onClick={() => setActive(label)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="work-grid-full">
          {projects.map((p) => (
            <div key={p.id} style={{ display: visible.includes(p) ? undefined : 'none' }}>
              <WorkCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Rewrite app/work/page.tsx as a server component**

Replace the entire file content with:

```tsx
import { PROJECTS } from '@/data/projects'
import WorkGrid from './WorkGrid'

const SORTED = [
  ...PROJECTS.filter((p) => p.featured),
  ...PROJECTS.filter((p) => !p.featured).sort((a, b) => {
    const ay = parseInt(a.year) || 0
    const by = parseInt(b.year) || 0
    return by - ay
  }),
]

export default function WorkPage() {
  return <WorkGrid projects={SORTED} />
}
```

Note: this still imports from `@/data/projects` (the existing hardcoded array) — the import switches to `@/lib/content` in Task 6 once that's safe to do.

- [ ] **Step 3: Verify the dev server still works**

```bash
npm run dev
```

Open `http://localhost:3000/work`. Filter buttons should work. No console errors.

- [ ] **Step 4: Commit**

```bash
git add app/work/page.tsx app/work/WorkGrid.tsx
git commit -m "refactor: split work page into server component + WorkGrid client component"
```

---

## Task 6: Switch all data imports to lib/content and strip data arrays

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/work/page.tsx`
- Modify: `app/work/[slug]/page.tsx`
- Modify: `app/notebook/page.tsx`
- Modify: `app/notebook/[slug]/page.tsx`
- Modify: `data/projects.ts`
- Modify: `data/posts.ts`

- [ ] **Step 1: Update imports in app/page.tsx**

On line 7, change:
```ts
import { PROJECTS } from '@/data/projects'
```
to:
```ts
import { PROJECTS } from '@/lib/content'
```

- [ ] **Step 2: Update imports in app/work/page.tsx**

On line 1, change:
```ts
import { PROJECTS } from '@/data/projects'
```
to:
```ts
import { PROJECTS } from '@/lib/content'
```

- [ ] **Step 3: Update imports in app/work/[slug]/page.tsx**

On line 6, change:
```ts
import { PROJECTS } from '@/data/projects'
```
to:
```ts
import { PROJECTS } from '@/lib/content'
```

Line 7 (`import type { Project } from '@/data/projects'`) stays unchanged — it's a type import, not a data import.

- [ ] **Step 4: Update imports in app/notebook/page.tsx**

On line 5, change:
```ts
import { POSTS } from '@/data/posts'
```
to:
```ts
import { POSTS } from '@/lib/content'
```

- [ ] **Step 5: Update imports in app/notebook/[slug]/page.tsx**

On line 7, change:
```ts
import { POSTS } from "@/data/posts"
```
to:
```ts
import { POSTS } from "@/lib/content"
```

- [ ] **Step 6: Run build to verify all pages load from .md files**

```bash
npm run build
```

Expected: build succeeds, all static pages generate. Look for a line like `○ /work/[slug]` in the output for each project slug. If you see "Error: ENOENT: no such file or directory", a content file is missing or misnamed — check filenames match the `id` field in the original data.

- [ ] **Step 7: Remove PROJECTS array from data/projects.ts**

Delete everything from `export const PROJECTS: Project[] = [` through the closing `];` (inclusive). Keep all `export type`, `export interface`, and `export const` type alias declarations above it.

- [ ] **Step 8: Remove POSTS array from data/posts.ts**

Delete everything from `export const POSTS: Post[] = [` through the closing `];` (inclusive). Keep all interface definitions above it.

- [ ] **Step 9: Run build again to confirm nothing broke**

```bash
npm run build
```

Expected: same successful output as Step 6.

- [ ] **Step 10: Commit**

```bash
git add app/page.tsx app/work/page.tsx "app/work/[slug]/page.tsx" app/notebook/page.tsx "app/notebook/[slug]/page.tsx" data/projects.ts data/posts.ts
git commit -m "feat: switch all page imports to lib/content loader; strip hardcoded data arrays"
```

---

## Task 7: Move images and videos into project/post subfolders

**Files:**
- Create: `public/images/projects/*/` (14 dirs)
- Create: `public/images/posts/*/` (7 dirs with images)
- Create: `public/videos/projects/*/` (2 dirs)
- Move: all active images and videos
- Modify: all `.md` frontmatter image paths
- Modify: `app/work/[slug]/page.tsx` (portrait gallery hardcoded paths)

### Image mapping

The table below lists every active image/video referenced in the data, its current location, and its new location. Move each file with `mv`.

**Binding Affinity:**
| Current | New |
|---|---|
| `public/images/binding-affinity-hero.png` | `public/images/projects/binding-affinity/hero.png` |
| `public/images/binding-affinity-ui.png` | `public/images/projects/binding-affinity/ui.png` |
| `public/images/binding-affinity-sim.png` | `public/images/projects/binding-affinity/sim.png` |

**cellPACK:**
| Current | New |
|---|---|
| `public/images/cellpack-mesoscale.png` | `public/images/projects/cellpack/hero.png` |
| `public/images/cellpack-hiv.webp` | `public/images/projects/cellpack/hiv.webp` |
| `public/images/cellpack-systems.png` | `public/images/projects/cellpack/systems.png` |
| `public/images/cellpack-rules-triptych.jpg` | `public/images/projects/cellpack/rules-triptych.jpg` |

**Cell Migration 3D:**
| Current | New |
|---|---|
| `public/images/wbc-postdoc.png` | `public/images/projects/cell-migration-3d/hero.png` |
| `public/images/wbc-motion.png` | `public/images/projects/cell-migration-3d/motion.png` |
| `public/images/exploratorium-exhibit.png` | `public/images/projects/cell-migration-3d/exploratorium-exhibit.png` |

**Simularium:**
| Current | New |
|---|---|
| `public/images/simularium.gif` | `public/images/projects/simularium/hero.gif` |
| `public/images/simularium-viewer.png` | `public/images/projects/simularium/viewer.png` |
| `public/images/virtual-cell-goal.png` | `public/images/projects/simularium/virtual-cell-goal.png` |

**Town Hall Project:**
| Current | New |
|---|---|
| `public/images/town-hall.png` | `public/images/projects/town-hall-project/hero.png` |
| `public/images/indivisible.png` | `public/images/projects/town-hall-project/indivisible.png` |

**Cell Feature Explorer:**
| Current | New |
|---|---|
| `public/images/cell-feature-explorer.png` | `public/images/projects/cell-feature-explorer/hero.png` |
| `public/images/mitochondria.png` | `public/images/projects/cell-feature-explorer/mitochondria.png` |
| `public/images/cell-motion.gif` | `public/images/projects/cell-feature-explorer/cell-motion.gif` |

**Mutual Aid Hub:**
| Current | New |
|---|---|
| `public/images/mutual-aid-hub-map.png` | `public/images/projects/mutual-aid-hub/hero.png` |
| `public/images/mutual-aid-hub-banner.png` | `public/images/projects/mutual-aid-hub/banner.png` |
| `public/images/mutual-aid-hub.png` | `public/images/projects/mutual-aid-hub/process.png` |

**IMSC:**
| Current | New |
|---|---|
| `public/videos/imsc-rotating.mp4` | `public/videos/projects/imsc/rotating.mp4` |
| `public/images/mitochondria.png` | `public/images/projects/cell-feature-explorer/mitochondria.png` *(canonical — see note)* |
| `public/images/mitosis.gif` | `public/images/projects/imsc/mitosis.gif` |
| `public/videos/imsc-mitosis-stages.mp4` | `public/videos/projects/imsc/mitosis-stages.mp4` |
| `public/images/imsc-essay.jpg` | `public/images/projects/imsc/essay.jpg` |

*Note: `imsc` uses `mitochondria.png` as its `cardImage`. That file lives canonically in `projects/cell-feature-explorer/`. Update `content/projects/imsc.md` to reference `/images/projects/cell-feature-explorer/mitochondria.png`.*

**HBV Animation:**
| Current | New |
|---|---|
| `public/videos/hbv-hero.mp4` | `public/videos/projects/hbv-animation/hero.mp4` |
| `public/images/hbv-virus-hero.jpg` | `public/images/projects/hbv-animation/card.jpg` |
| `public/videos/hbv-cccdna-cycle.mp4` | `public/videos/projects/hbv-animation/cccdna-cycle.mp4` |
| `public/images/hbv-lifecycle.jpg` | `public/images/projects/hbv-animation/lifecycle.jpg` |

**CRISPR Cover:**
| Current | New |
|---|---|
| `public/images/crispr-cover.jpg` | `public/images/projects/crispr-cover/hero.jpg` |
| `public/images/mucus-viz.png` | `public/images/projects/crispr-cover/process.png` |

**Trapping Kinases:**
| Current | New |
|---|---|
| `public/images/chem-biol-cover.png` | `public/images/projects/trapping-kinases/hero.png` |
| `public/images/kinase-mechanism-detail.png` | `public/images/projects/trapping-kinases/mechanism-detail.png` |
| `public/images/kinases-mechanism.png` | `public/images/projects/trapping-kinases/mechanism.png` |

**LDL & HDL Models:**
| Current | New |
|---|---|
| `public/images/ldl-particles.png` | `public/images/projects/ldl-hdl-models/hero.png` |
| `public/images/apob-model.png` | `public/images/projects/ldl-hdl-models/apob-model.png` |
| `public/images/sci-viz-banner.png` | `public/images/projects/ldl-hdl-models/sci-viz-banner.png` |

**Indivisible:**
| Current | New |
|---|---|
| `public/images/indivisible.png` | `public/images/projects/indivisible/hero.png` |
| `public/images/town-hall.png` | `public/images/projects/indivisible/town-hall.png` |

*Note: `town-hall.png` and `indivisible.png` are used by both `town-hall-project` and `indivisible`. Each project gets its own copy (different folder, different descriptive name). Town Hall Project's `processImage` becomes `/images/projects/town-hall-project/indivisible.png`; Indivisible's `processImage` becomes `/images/projects/indivisible/town-hall.png`.*

**Portraits:**
| Current | New |
|---|---|
| `public/images/painting-main.jpg` | `public/images/projects/portraits/hero.jpg` |
| `public/images/art-teddy.jpg` | `public/images/projects/portraits/teddy.jpg` |
| `public/images/art-leslie.jpg` | `public/images/projects/portraits/leslie.jpg` |
| `public/images/art-bruce.png` | `public/images/projects/portraits/bruce.png` |
| `public/images/art-elenore.jpg` | `public/images/projects/portraits/elenore.jpg` |
| `public/images/art-angelica.jpg` | `public/images/projects/portraits/angelica.jpg` |
| `public/images/art-paulo.jpg` | `public/images/projects/portraits/paulo.jpg` |
| `public/images/art-warren.jpg` | `public/images/projects/portraits/warren.jpg` |
| `public/images/art-img0036.jpg` | `public/images/projects/portraits/img0036.jpg` |

**Posts:**
| Current | New |
|---|---|
| `public/images/cellpack-rules-triptych.jpg` | `public/images/posts/cellpack-rules-of-organization/cover.jpg` *(copy from projects/cellpack/)* |
| `public/images/cellpack-nucleus-bias.png` | `public/images/posts/cellpack-peroxisomes/cover.png` |
| `public/images/cellpack-hiv.webp` | `public/images/posts/cellpack-out-of-the-box/cover.webp` *(copy from projects/cellpack/)* |
| `public/images/data-to-knowledge.png` | `public/images/posts/data-to-knowledge/cover.png` |
| `public/images/motion-muybridge.png` | `public/images/posts/motion-in-static-images/cover.png` |
| `public/images/hl60-rosettes.png` | `public/images/posts/white-blood-cells/cover.png` |
| `public/images/chem-biol-cover.png` | `public/images/posts/crosslinker-into-focus/cover.png` *(copy from projects/trapping-kinases/)* |

*Note: post cover images marked "copy" are the same file as a project image. Copy (don't symlink) so each location is self-contained.*

- [ ] **Step 1: Create all image/video subdirectories**

```bash
mkdir -p \
  public/images/projects/binding-affinity \
  public/images/projects/cellpack \
  public/images/projects/cell-migration-3d \
  public/images/projects/simularium \
  public/images/projects/town-hall-project \
  public/images/projects/cell-feature-explorer \
  public/images/projects/mutual-aid-hub \
  public/images/projects/imsc \
  public/images/projects/hbv-animation \
  public/images/projects/crispr-cover \
  public/images/projects/trapping-kinases \
  public/images/projects/ldl-hdl-models \
  public/images/projects/indivisible \
  public/images/projects/portraits \
  public/images/posts/cellpack-rules-of-organization \
  public/images/posts/cellpack-peroxisomes \
  public/images/posts/cellpack-out-of-the-box \
  public/images/posts/data-to-knowledge \
  public/images/posts/motion-in-static-images \
  public/images/posts/white-blood-cells \
  public/images/posts/crosslinker-into-focus \
  public/videos/projects/imsc \
  public/videos/projects/hbv-animation
```

- [ ] **Step 2: Move all image and video files**

Run these move commands (use the mapping table above). Images shared between a project and a post are copied (`cp`), not moved:

```bash
# Binding Affinity
mv public/images/binding-affinity-hero.png public/images/projects/binding-affinity/hero.png
mv public/images/binding-affinity-ui.png public/images/projects/binding-affinity/ui.png
mv public/images/binding-affinity-sim.png public/images/projects/binding-affinity/sim.png

# cellPACK
mv public/images/cellpack-mesoscale.png public/images/projects/cellpack/hero.png
mv public/images/cellpack-hiv.webp public/images/projects/cellpack/hiv.webp
mv public/images/cellpack-systems.png public/images/projects/cellpack/systems.png
mv public/images/cellpack-rules-triptych.jpg public/images/projects/cellpack/rules-triptych.jpg

# Cell Migration 3D
mv public/images/wbc-postdoc.png public/images/projects/cell-migration-3d/hero.png
mv public/images/wbc-motion.png public/images/projects/cell-migration-3d/motion.png
mv public/images/exploratorium-exhibit.png public/images/projects/cell-migration-3d/exploratorium-exhibit.png

# Simularium
mv public/images/simularium.gif public/images/projects/simularium/hero.gif
mv public/images/simularium-viewer.png public/images/projects/simularium/viewer.png
mv public/images/virtual-cell-goal.png public/images/projects/simularium/virtual-cell-goal.png

# Town Hall Project
mv public/images/town-hall.png public/images/projects/town-hall-project/hero.png
cp public/images/projects/town-hall-project/hero.png public/images/projects/indivisible/town-hall.png
mv public/images/indivisible.png public/images/projects/indivisible/hero.png
cp public/images/projects/indivisible/hero.png public/images/projects/town-hall-project/indivisible.png

# Cell Feature Explorer
mv public/images/cell-feature-explorer.png public/images/projects/cell-feature-explorer/hero.png
mv public/images/mitochondria.png public/images/projects/cell-feature-explorer/mitochondria.png
mv public/images/cell-motion.gif public/images/projects/cell-feature-explorer/cell-motion.gif

# Mutual Aid Hub
mv public/images/mutual-aid-hub-map.png public/images/projects/mutual-aid-hub/hero.png
mv public/images/mutual-aid-hub-banner.png public/images/projects/mutual-aid-hub/banner.png
mv public/images/mutual-aid-hub.png public/images/projects/mutual-aid-hub/process.png

# IMSC
mv public/videos/imsc-rotating.mp4 public/videos/projects/imsc/rotating.mp4
mv public/images/mitosis.gif public/images/projects/imsc/mitosis.gif
mv public/videos/imsc-mitosis-stages.mp4 public/videos/projects/imsc/mitosis-stages.mp4
mv public/images/imsc-essay.jpg public/images/projects/imsc/essay.jpg

# HBV Animation
mv public/videos/hbv-hero.mp4 public/videos/projects/hbv-animation/hero.mp4
mv public/images/hbv-virus-hero.jpg public/images/projects/hbv-animation/card.jpg
mv public/videos/hbv-cccdna-cycle.mp4 public/videos/projects/hbv-animation/cccdna-cycle.mp4
mv public/images/hbv-lifecycle.jpg public/images/projects/hbv-animation/lifecycle.jpg

# CRISPR Cover
mv public/images/crispr-cover.jpg public/images/projects/crispr-cover/hero.jpg
mv public/images/mucus-viz.png public/images/projects/crispr-cover/process.png

# Trapping Kinases
mv public/images/chem-biol-cover.png public/images/projects/trapping-kinases/hero.png
mv public/images/kinase-mechanism-detail.png public/images/projects/trapping-kinases/mechanism-detail.png
mv public/images/kinases-mechanism.png public/images/projects/trapping-kinases/mechanism.png

# LDL & HDL Models
mv public/images/ldl-particles.png public/images/projects/ldl-hdl-models/hero.png
mv public/images/apob-model.png public/images/projects/ldl-hdl-models/apob-model.png
mv public/images/sci-viz-banner.png public/images/projects/ldl-hdl-models/sci-viz-banner.png

# Portraits
mv public/images/painting-main.jpg public/images/projects/portraits/hero.jpg
mv public/images/art-teddy.jpg public/images/projects/portraits/teddy.jpg
mv public/images/art-leslie.jpg public/images/projects/portraits/leslie.jpg
mv public/images/art-bruce.png public/images/projects/portraits/bruce.png
mv public/images/art-elenore.jpg public/images/projects/portraits/elenore.jpg
mv public/images/art-angelica.jpg public/images/projects/portraits/angelica.jpg
mv public/images/art-paulo.jpg public/images/projects/portraits/paulo.jpg
mv public/images/art-warren.jpg public/images/projects/portraits/warren.jpg
mv public/images/art-img0036.jpg public/images/projects/portraits/img0036.jpg

# Post cover images (copy from project canonical location)
cp public/images/projects/cellpack/rules-triptych.jpg public/images/posts/cellpack-rules-of-organization/cover.jpg
mv public/images/cellpack-nucleus-bias.png public/images/posts/cellpack-peroxisomes/cover.png
cp public/images/projects/cellpack/hiv.webp public/images/posts/cellpack-out-of-the-box/cover.webp
mv public/images/data-to-knowledge.png public/images/posts/data-to-knowledge/cover.png
mv public/images/motion-muybridge.png public/images/posts/motion-in-static-images/cover.png
mv public/images/hl60-rosettes.png public/images/posts/white-blood-cells/cover.png
cp public/images/projects/trapping-kinases/hero.png public/images/posts/crosslinker-into-focus/cover.png
```

- [ ] **Step 3: Update all image paths in content/projects/*.md**

For each project's `.md` file, update `heroImage`, `cardImage`, `screenshotImage`, `processImage`, `detailImage`, and any `sections[*].image` paths to match the new locations from the mapping table above.

For example, in `content/projects/simularium.md`:
- `heroImage: /images/simularium.gif` → `heroImage: /images/projects/simularium/hero.gif`
- `screenshotImage: /images/simularium-viewer.png` → `screenshotImage: /images/projects/simularium/viewer.png`
- `processImage: /images/simularium-viewer.png` → `processImage: /images/projects/simularium/viewer.png`
- `detailImage: /images/virtual-cell-goal.png` → `detailImage: /images/projects/simularium/virtual-cell-goal.png`

Apply equivalent updates to all 14 project files and all post files with `coverImage`.

- [ ] **Step 4: Update portrait gallery hardcoded paths in app/work/[slug]/page.tsx**

Find the portrait gallery array (around lines 181–190) and update the `src` values:

```tsx
// Replace this block:
{ src: '/images/art-bruce.png',    alt: 'Bruce' },
{ src: '/images/art-teddy.jpg',    alt: 'Teddy' },
{ src: '/images/art-leslie.jpg',   alt: 'Leslie' },
{ src: '/images/art-elenore.jpg',  alt: 'Elenore' },
{ src: '/images/art-angelica.jpg', alt: 'Angelica' },
{ src: '/images/art-paulo.jpg',    alt: 'Paulo' },
{ src: '/images/art-warren.jpg',   alt: 'Elizabeth Warren' },
{ src: '/images/art-img0036.jpg',  alt: 'Portrait' },

// With:
{ src: '/images/projects/portraits/bruce.png',    alt: 'Bruce' },
{ src: '/images/projects/portraits/teddy.jpg',    alt: 'Teddy' },
{ src: '/images/projects/portraits/leslie.jpg',   alt: 'Leslie' },
{ src: '/images/projects/portraits/elenore.jpg',  alt: 'Elenore' },
{ src: '/images/projects/portraits/angelica.jpg', alt: 'Angelica' },
{ src: '/images/projects/portraits/paulo.jpg',    alt: 'Paulo' },
{ src: '/images/projects/portraits/warren.jpg',   alt: 'Elizabeth Warren' },
{ src: '/images/projects/portraits/img0036.jpg',  alt: 'Portrait' },
```

- [ ] **Step 5: Run build and verify**

```bash
npm run build
```

Expected: build succeeds. Then start the server and spot-check:

```bash
npm start
```

Open these pages and confirm images load:
- `http://localhost:3000/work/simularium` — hero, screenshot, detail images
- `http://localhost:3000/work/cellpack` — hero, all section images
- `http://localhost:3000/work/portraits` — gallery images
- `http://localhost:3000/work/imsc` — video hero plays
- `http://localhost:3000/notebook/cellpack-peroxisomes` — cover image

- [ ] **Step 6: Commit**

```bash
git add public/images/projects public/images/posts public/videos/projects \
  content/projects/ content/posts/ "app/work/[slug]/page.tsx"
git commit -m "chore: organize images into per-project/post subfolders; update all image paths"
```

---

## Unreferenced images

The following files exist in `public/images/` but are not referenced by any current project or post entry. They are not moved by this plan — leave them in place for now and address them in a separate pass once you know where they belong:

```
cellpack-blood.png
cellpack-rules-empty.png
cellpack-membrane-bias.png
hbv-capsid-rna.jpg
hbv-cccdna.jpg
hbv-rcdna-cccdna.jpg
imsc-hero.jpg
imsc-viewer.jpg
kinases-hero.png
mesoscale.png
modeling-ecosystem.png
motion-cave-cubist.png
portrait.jpg
wbc-protrusions.png
```
