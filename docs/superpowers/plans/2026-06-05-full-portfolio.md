# Full Portfolio Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/work` page showing all 12 projects in a filterable 3-column grid with gradient image overlays and seeded parallax dots, while keeping the homepage featured section unchanged.

**Architecture:** A new `WorkCard` component handles the gradient + dot treatment for the portfolio grid. Dot positions and colors are generated deterministically from each project's `id` via a seeded LCG in `lib/seedDots.ts`. The `/work` page is a client component for tag-filter state; the card itself is a server component (hover handled by CSS custom properties).

**Tech Stack:** Next.js 14 App Router, TypeScript, plain CSS custom properties, `next/image`, lucide-react

---

### Task 1: Add `featured` field and 8 new projects to `data/projects.ts`

**Files:**
- Modify: `data/projects.ts`

- [ ] **Step 1: Add `featured` to the `Project` interface and mark existing 4 as featured**

In `data/projects.ts`, add `featured?: boolean` to the interface and add `featured: true` to all four existing entries:

```ts
export interface Project {
  id: string
  title: string
  year: string
  medium: string
  role: string
  context: string
  tone: Tone
  altTone: Tone
  blurb: string
  tags: ProjectTag[]
  lead: string
  body1: string
  quote: string
  body2: string
  body3: string
  url?: string
  heroImage?: string
  processImage?: string
  detailImage?: string
  featured?: boolean   // true for homepage-featured projects
}
```

Add `featured: true` to each of the four existing entries (simularium, town-hall-project, cell-feature-explorer, mutual-aid-hub).

- [ ] **Step 2: Append the 8 new project entries**

Append to the `PROJECTS` array in `data/projects.ts`:

```ts
  {
    id: '3d-cell-viewer',
    title: '3D Cell Viewer',
    year: '2017',
    medium: 'WebGL · three.js',
    role: 'Software engineer',
    context: 'Allen Institute for Cell Science',
    tone: 'teal',
    altTone: 'mustard',
    blurb: 'The first web tool to render Allen Institute cell data in 3D — directly in the browser.',
    url: 'https://www.allencell.org',
    tags: [{ label: 'Sci-Vis', tone: 'mustard' }],
    lead: 'Before the 3D Cell Viewer, exploring Allen Institute cell data meant downloading large files and running specialized software. We built a browser-based viewer so researchers could share a cell with a link.',
    body1: 'I built the original 3D Cell Viewer in collaboration with Daniel Toloudis, under the supervision of Graham Johnson. The core challenge was performance: rendering full volumetric cell data in WebGL at interactive frame rates, in a browser tab, on hardware researchers actually had.',
    quote: 'The browser is the best distribution channel science has ever had.',
    body2: 'We used three.js as the rendering foundation and built a custom pipeline for loading and rendering the multi-channel fluorescence data the Allen Institute produces. The viewer shipped as the primary interface for allencell.org and was the foundation for everything that came after.',
    body3: 'The 3D Cell Viewer was one of the first projects to demonstrate that research-grade cell visualization belonged in the browser. It established the architecture — and the ambition — that later became the Cell Feature Explorer and Simularium.',
    heroImage: '/images/cell-motion.gif',
    processImage: '/images/mitochondria.png',
    detailImage: '/images/cell-feature-explorer.png',
  },
  {
    id: 'imsc',
    title: 'IMSC',
    year: '2016',
    medium: 'WebGL · D3',
    role: 'Visualization engineer',
    context: 'Allen Institute for Cell Science',
    tone: 'teal',
    altTone: 'sage',
    blurb: 'An interactive web publication accompanying the Allen Institute\'s study of mitotic stem cells.',
    tags: [
      { label: 'Sci-Vis', tone: 'mustard' },
      { label: 'Research', tone: 'teal' },
    ],
    lead: 'IMSC turned a static scientific paper into an interactive experience — letting readers explore the data behind the study of mitotic stem cells rather than reading about it at one remove.',
    body1: 'Scientific publications are typically read, not explored. IMSC was built on the premise that the data underlying the Allen Institute\'s mitotic stem cell study was rich enough to warrant direct interaction: readers could filter by cell cycle stage, rotate 3D models, and compare measurements across the population.',
    quote: 'A paper you can explore is a fundamentally different object than a paper you read.',
    body2: 'I built the visualization layer using WebGL for 3D cell rendering and D3 for the statistical charts, coordinated so that selecting cells in one view highlighted them in the other. The publication shipped alongside the paper as a companion that let researchers go deeper than the figures allowed.',
    body3: 'IMSC was an early experiment in what interactive scientific publishing could look like — before the tools or the conventions existed. The lessons from it shaped how I thought about the Cell Feature Explorer a few years later.',
    heroImage: '/images/mitochondria.png',
    processImage: '/images/cell-motion.gif',
  },
  {
    id: 'visual-guide-stem-cells',
    title: 'Visual Guide to Human Stem Cells',
    year: '2015',
    medium: 'WebGL · Illustration',
    role: 'Visualization engineer',
    context: 'Allen Institute for Cell Science',
    tone: 'sage',
    altTone: 'teal',
    blurb: 'An interactive introduction to human induced pluripotent stem cells for general audiences.',
    tags: [{ label: 'Sci-Vis', tone: 'mustard' }],
    lead: 'The Visual Guide to Human Stem Cells was built to make one of the most important — and most misunderstood — biological systems legible to a general audience.',
    body1: 'Human induced pluripotent stem cells are scientifically remarkable and publicly controversial, often poorly explained. The Visual Guide was built to close that gap: an interactive, illustrated introduction that respected the science without requiring a biology degree to follow.',
    quote: 'Making the invisible legible is not simplification — it\'s translation.',
    body2: 'I built the interactive 3D elements using WebGL and worked with illustrators on the visual language — a balance between scientific accuracy and the kind of clarity that makes a diagram worth studying. The result was used in public communications and education contexts.',
    body3: 'The project sharpened my thinking about the difference between visualization for researchers and visualization for the public. The constraints are different, but the core challenge is the same: what do you show, what do you leave out, and how do you earn the viewer\'s trust.',
    heroImage: '/images/sci-viz-banner.png',
    processImage: '/images/mitochondria.png',
  },
  {
    id: 'hbv-animation',
    title: 'HBV Animation',
    year: '2016',
    medium: 'Cinema 4D · Blender',
    role: 'Scientific animator',
    context: 'UCSF',
    tone: 'mustard',
    altTone: 'teal',
    blurb: 'A molecular animation of the Hepatitis B virus lifecycle for research communication.',
    tags: [{ label: 'Sci-Vis', tone: 'mustard' }],
    lead: 'A short animated film tracing the lifecycle of the Hepatitis B virus — from entry to replication to assembly — built to communicate the process to researchers and collaborators across disciplines.',
    body1: 'Molecular animation sits between scientific illustration and film. The constraints are strict — the structures and processes must be accurate — but the choices about camera, timing, and emphasis are entirely creative. This film was made to give non-specialist collaborators a shared mental model of the viral lifecycle.',
    quote: 'Accuracy and clarity are not the same thing. This project was about finding where they overlap.',
    body2: 'I built the atomic models in Cinema 4D and animated the key steps of the lifecycle: receptor binding, membrane fusion, nuclear import of the viral genome, and capsid assembly. Each sequence was built from structural data and reviewed against the literature.',
    body3: 'The film was used in presentations and grant materials. The process of making it — finding the camera angles and pacing that make a molecular process followable — fed directly into my later work on the Protein Theater series.',
    heroImage: '/images/mucus-viz.png',
    processImage: '/images/crispr-cover.jpg',
  },
  {
    id: 'crispr-cover',
    title: 'CRISPR Cover Art',
    year: '2016',
    medium: 'Cinema 4D · Illustration',
    role: 'Scientific illustrator',
    context: 'UCSF',
    tone: 'ink',
    altTone: 'mustard',
    blurb: 'A cover illustration for Science magazine depicting the CRISPR-Cas9 system.',
    tags: [{ label: 'Sci-Vis', tone: 'mustard' }],
    lead: 'A cover illustration for Science magazine — a rendering of the CRISPR-Cas9 system built from structural data and designed to be both scientifically grounded and visually striking.',
    body1: 'Cover illustrations for scientific journals live in an unusual space: they must be accurate enough to satisfy reviewers and beautiful enough to draw attention on a newsstand. I built this rendering from the published crystal structure of the Cas9 protein complex, using Cinema 4D for the 3D work and a traditional illustration approach for the final compositing.',
    quote: 'A good scientific illustration is an argument about what matters.',
    body2: 'The color choices, the camera angle, the level of abstraction — each is a decision about what the image is trying to say. For this piece, the goal was to convey both the precision of the molecular machinery and the elegance of the editing mechanism.',
    body3: 'The cover was part of a broader collaboration with Jennifer Doudna\'s lab at UC Berkeley. Working at the intersection of research communication and visual design — where the audience is both the specialist and the general reader — is where I find the most interesting problems.',
    heroImage: '/images/crispr-cover.jpg',
    processImage: '/images/mucus-viz.png',
  },
  {
    id: 'ldl-hdl-models',
    title: 'LDL & HDL Models',
    year: '2015',
    medium: 'Cinema 4D · Illustration',
    role: 'Scientific illustrator',
    context: 'UCSF',
    tone: 'clay',
    altTone: 'mustard',
    blurb: 'Molecular models of LDL and HDL lipoprotein particles for educational and research use.',
    tags: [{ label: 'Sci-Vis', tone: 'mustard' }],
    lead: 'Detailed molecular models of low-density and high-density lipoprotein particles — built from structural data for use in education, research presentations, and public communication.',
    body1: 'LDL and HDL are among the most clinically discussed molecules in medicine and among the least accurately depicted. Most popular illustrations are schematic at best. These models were built to be structurally faithful — using published data on the lipid composition, apolipoprotein arrangement, and particle geometry.',
    quote: 'Most people have heard of these molecules. Almost no one has seen them accurately.',
    body2: 'I built the models in Cinema 4D, working from the published structural literature to get the proportions, surface texture, and protein arrangement right. The renders were designed for both print and screen, with lighting that reads well at small sizes.',
    body3: 'The models were used in research presentations and educational materials. Building them deepened my understanding of how much scientific illustration still relies on convention rather than data — and how much room there is to do better.',
    heroImage: '/images/sci-viz-banner.png',
    processImage: '/images/mitochondria.png',
  },
  {
    id: 'indivisible',
    title: 'Indivisible Map',
    year: '2017',
    medium: 'React · Mapbox',
    role: 'Lead developer',
    context: 'Indivisible',
    tone: 'sage',
    altTone: 'teal',
    blurb: 'Interactive group and event mapping for indivisible.org — helping people find local chapters and actions.',
    url: 'https://indivisible.org/events',
    tags: [{ label: 'Civic Tech', tone: 'sage' }],
    lead: 'A searchable, interactive map for indivisible.org that helped people find local Indivisible chapters and actions — one of the first large-scale civic mapping tools built for the post-2016 organizing surge.',
    body1: 'Indivisible launched in late 2016 and grew faster than anyone expected. Within months there were thousands of local groups with no good way for people to find them. I built the interactive map that became the primary tool for group discovery on indivisible.org.',
    quote: 'Civic technology works best when it solves the problem immediately in front of someone.',
    body2: 'I built the map using React and Mapbox, with a data pipeline pulling from the Indivisible group database. The tool needed to handle both geographic search and filtering by event type, and to work well on mobile — where most people were accessing it.',
    body3: 'The Indivisible Map was the direct predecessor to the Town Hall Project\'s mapping work. The patterns I developed here — performant clustering, mobile-first interaction design, live data integration — became the foundation for how I approached civic mapping projects going forward.',
    heroImage: '/images/indivisible.png',
    processImage: '/images/town-hall.png',
  },
  {
    id: 'portraits',
    title: 'Portrait paintings',
    year: 'Various',
    medium: 'Oil on canvas',
    role: 'Artist',
    context: 'Studio',
    tone: 'clay',
    altTone: 'sage',
    blurb: 'A series of figurative oil paintings — portraits of people I know and have studied.',
    tags: [{ label: 'Fine Art', tone: 'clay' }],
    lead: 'Painting people is an exercise in sustained attention. These portraits are made from observation — from sitting with a subject over hours and trying to find the version of their face that the camera doesn\'t catch.',
    body1: 'I\'ve been painting figuratively since before I studied chemistry. The practice runs alongside the scientific work, not in opposition to it. The same habits of looking that make a good scientific illustrator make a better portrait painter — and vice versa.',
    quote: 'A portrait is a negotiation between what you see and what you know.',
    body2: 'These paintings are made with oil on canvas or linen, from life or from long photographic study sessions. The subjects are mostly people I know: friends, family, the occasional stranger who said yes. Each one takes between one and four sessions.',
    body3: 'The series has no thesis. It\'s a practice — of looking, of returning, of finding out what you missed the first time.',
    heroImage: '/images/painting-main.jpg',
    processImage: '/images/art-teddy.jpg',
    detailImage: '/images/art-leslie.jpg',
  },
```

- [ ] **Step 3: Verify the build**

```bash
npm run build
```

Expected: clean build, `generateStaticParams` in `app/work/[slug]/page.tsx` reads from `PROJECTS` automatically so all new slugs are picked up with no config change.

Expected output includes:
```
├ /work/3d-cell-viewer
├ /work/imsc
├ /work/visual-guide-stem-cells
├ /work/hbv-animation
├ /work/crispr-cover
├ /work/ldl-hdl-models
├ /work/indivisible
└ /work/portraits
```

- [ ] **Step 4: Commit**

```bash
git add data/projects.ts
git commit -m "feat: add featured flag and 8 new project entries"
```

---

### Task 2: Add CSS for WorkCard, filter pills, work grid, and art gallery

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Append new CSS to `app/globals.css`**

Add the following block to the end of `app/globals.css`:

```css
/* =====================================================================
   WORK CARD (portfolio grid — gradient overlay + parallax dots)
   ===================================================================== */

/* Card wrapper — overflow visible so dots straddle the image border */
.wcard { position: relative; cursor: pointer; overflow: visible; text-decoration: none; color: inherit; display: block; }

/* Image container — clips the photo but not the dots */
.wcard-img {
  height: 220px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: relative;
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--dur-base) var(--ease-out);
}
.wcard-img img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 0.55s var(--ease-out);
}
.wcard:hover .wcard-img { box-shadow: var(--shadow-md); }
.wcard:hover .wcard-img img { transform: scale(1.05); }

/* Gradient overlay — tone color bleeds up from bottom */
.wcard-img::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(
    to top,
    rgba(var(--tone-rgb), 0.84) 0%,
    rgba(var(--tone-rgb), 0.25) 44%,
    transparent 68%
  );
  z-index: 1;
  border-radius: var(--radius-lg);
  pointer-events: none;
}

/* Dots layer — same dimensions as image, overflow visible */
.wcard-dots {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 220px;
  z-index: 10;
  pointer-events: none;
  overflow: visible;
}

/* Individual dot — uses CSS custom props set via inline style */
.wcard-dot {
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(33, 30, 26, 0.15);
  transition: transform 0.55s var(--ease-out);
}
/* Parallax: translate by --dx/--dy on card hover */
.wcard:hover .wcard-dot {
  transform: translate(var(--dx, 0px), var(--dy, 0px));
}

/* Card body */
.wcard-body { padding: 13px 2px 0; position: relative; z-index: 2; }
.wcard-meta { font-family: var(--font-mono); font-size: 11px; color: var(--ink-2); letter-spacing: 0.01em; }
.wcard-title {
  font-family: var(--font-display); font-weight: 700; font-size: 20px;
  letter-spacing: -0.02em; margin: 5px 0 3px; color: var(--fg);
  display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;
}
.wcard-blurb { font-size: 13px; color: var(--ink-2); line-height: 1.5; margin: 0; }
.wcard-tags { display: flex; gap: 5px; margin-top: 9px; flex-wrap: wrap; }

/* Featured badge */
.wcard-badge {
  font-family: var(--font-mono); font-size: 9px; text-transform: uppercase;
  letter-spacing: 0.08em; background: var(--mustard-400); color: var(--ink);
  padding: 2px 7px; border-radius: var(--radius-xs); white-space: nowrap;
  font-weight: 600; flex-shrink: 0;
}

/* No-image fallback — gradient from tone color */
.wcard-img-placeholder {
  width: 100%; height: 100%;
  background: linear-gradient(135deg, rgba(var(--tone-rgb), 1), rgba(var(--tone-rgb), 0.6));
}

/* =====================================================================
   WORK GRID (full portfolio — 3 col)
   ===================================================================== */
.work-grid-full {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 28px;
}

@media (max-width: 860px) {
  .work-grid-full { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .work-grid-full { grid-template-columns: 1fr; }
}

/* =====================================================================
   FILTER PILLS (work page tag filter bar)
   ===================================================================== */
.filter-bar { display: flex; gap: 8px; padding: 24px 0 36px; flex-wrap: wrap; }

.filter-pill {
  font-family: var(--font-mono); font-size: 11px; text-transform: uppercase;
  letter-spacing: 0.06em; font-weight: 500; padding: 7px 16px;
  border-radius: var(--radius-pill); border: 1.5px solid var(--line-strong);
  background: transparent; color: var(--fg-muted); cursor: pointer;
  white-space: nowrap; transition: background var(--dur-fast), color var(--dur-fast), border-color var(--dur-fast);
}
.filter-pill:hover { border-color: var(--fg); color: var(--fg); }
.filter-pill.active { background: var(--ink); color: var(--cream); border-color: var(--ink); }

/* Tone-tinted inactive variants */
.filter-pill-sci     { background: var(--mustard-100); color: var(--mustard-700); border-color: var(--mustard-300); }
.filter-pill-sci.active     { background: var(--mustard-700); color: var(--cream); border-color: var(--mustard-700); }
.filter-pill-research { background: var(--teal-50); color: var(--teal-600); border-color: var(--teal-200); }
.filter-pill-research.active { background: var(--teal-600); color: var(--cream); border-color: var(--teal-600); }
.filter-pill-civic   { background: var(--sage-100); color: var(--sage-500); border-color: var(--sage-200); }
.filter-pill-civic.active   { background: var(--sage-500); color: var(--cream); border-color: var(--sage-500); }
.filter-pill-art     { background: var(--clay-100); color: var(--clay-500); border-color: var(--clay-200); }
.filter-pill-art.active     { background: var(--clay-500); color: var(--cream); border-color: var(--clay-500); }

/* =====================================================================
   ART GALLERY (portraits detail page)
   ===================================================================== */
.art-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 32px 0 48px;
}
.art-gallery-item {
  position: relative;
  height: 300px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--dur-base), transform var(--dur-base) var(--ease-out);
}
.art-gallery-item:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}

@media (max-width: 860px) {
  .art-gallery { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .art-gallery { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean compile (CSS additions don't affect TS compilation).

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add WorkCard, filter pill, work grid, and art gallery CSS"
```

---

### Task 3: Create `lib/seedDots.ts`

**Files:**
- Create: `lib/seedDots.ts`

- [ ] **Step 1: Create the file**

```ts
// lib/seedDots.ts
// Deterministic dot generation seeded from a project's id string.
import type { CSSProperties } from 'react'

const DOT_COLORS = [
  '#E6A317', // mustard
  '#138A86', // teal
  '#CB5A33', // clay
  '#869A63', // sage
  '#79C7C0', // teal-light
  '#FCF8F0', // cream-white
  '#211E1A', // ink
] as const

const EDGES = ['top', 'bottom', 'left', 'right'] as const
type Edge = (typeof EDGES)[number]

export interface DotConfig {
  size: number    // px diameter, 8–52
  edge: Edge      // which image boundary the dot straddles
  offset: number  // 10–85 — percentage along that edge
  color: string   // from DOT_COLORS
  dx: number      // parallax translate x, px (-14 to +14)
  dy: number      // parallax translate y, px (-14 to +14)
}

/** Simple LCG PRNG — deterministic, seeded from an integer. */
function makeLcg(seed: number) {
  let s = seed >>> 0
  return function next(): number {
    s = Math.imul(s, 1664525) + 1013904223
    return (s >>> 0) / 0x100000000
  }
}

function idToSeed(id: string): number {
  return id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
}

/** Generate 3–5 dot configs seeded from a project id. */
export function generateDots(id: string): DotConfig[] {
  const next = makeLcg(idToSeed(id))
  const count = 3 + Math.floor(next() * 3) // 3, 4, or 5

  return Array.from({ length: count }, () => ({
    size:   8 + Math.floor(next() * 45),                          // 8–52
    edge:   EDGES[Math.floor(next() * 4)] as Edge,
    offset: 10 + Math.floor(next() * 76),                         // 10–85
    color:  DOT_COLORS[Math.floor(next() * DOT_COLORS.length)],
    dx:     Math.round((next() - 0.5) * 28),                      // -14 to +14
    dy:     Math.round((next() - 0.5) * 28),
  }))
}

/**
 * Convert a DotConfig to inline CSS properties for positioning.
 * The .dots container is top:0 left:0 with width:100% height:220px,
 * overflow:visible. Dots are positioned with their center on the edge.
 */
export function dotPositionStyle(dot: DotConfig): CSSProperties {
  const r = dot.size / 2
  const base = {
    width:  dot.size,
    height: dot.size,
    background: dot.color,
    '--dx': `${dot.dx}px`,
    '--dy': `${dot.dy}px`,
  } as CSSProperties

  switch (dot.edge) {
    case 'top':
      return { ...base, top: -r, left: `${dot.offset}%` }
    case 'bottom':
      return { ...base, top: `calc(220px - ${r}px)`, left: `${dot.offset}%` }
    case 'left':
      return { ...base, top: `${dot.offset}%`, left: -r }
    case 'right':
      return { ...base, top: `${dot.offset}%`, left: `calc(100% - ${r}px)` }
  }
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean compile.

- [ ] **Step 3: Commit**

```bash
git add lib/seedDots.ts
git commit -m "feat: add seeded deterministic dot generator"
```

---

### Task 4: Create `components/WorkCard.tsx`

**Files:**
- Create: `components/WorkCard.tsx`

This is a server component — hover parallax is handled entirely by the `.wcard:hover .wcard-dot` CSS rule using `--dx`/`--dy` custom properties set as inline styles.

- [ ] **Step 1: Create the component**

```tsx
// components/WorkCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import Tag from './Tag'
import { generateDots, dotPositionStyle } from '@/lib/seedDots'
import type { Project } from '@/data/projects'

const TONE_RGB: Record<string, string> = {
  teal:    '19,138,134',
  mustard: '201,137,12',
  clay:    '168,67,31',
  sage:    '103,122,71',
  ink:     '33,30,26',
}

export default function WorkCard({ project }: { project: Project }) {
  const dots = generateDots(project.id)
  const toneRgb = TONE_RGB[project.tone] ?? TONE_RGB.teal

  return (
    <Link
      href={`/work/${project.id}`}
      className="wcard"
      style={{ '--tone-rgb': toneRgb } as React.CSSProperties}
    >
      {/* Image with gradient overlay (::after in CSS) */}
      <div className="wcard-img">
        {project.heroImage ? (
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            sizes="(max-width: 560px) 100vw, (max-width: 860px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            unoptimized={project.heroImage.endsWith('.gif')}
          />
        ) : (
          <div className="wcard-img-placeholder" />
        )}
      </div>

      {/* Dots — straddle the image border */}
      <div className="wcard-dots">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="wcard-dot"
            style={dotPositionStyle(dot)}
          />
        ))}
      </div>

      {/* Card body */}
      <div className="wcard-body">
        <div className="wcard-meta">{project.year} — {project.medium}</div>
        <div className="wcard-title">
          {project.title}
          {project.featured && <span className="wcard-badge">Featured</span>}
        </div>
        <p className="wcard-blurb">{project.blurb}</p>
        <div className="wcard-tags">
          {project.tags.map((t) => (
            <Tag key={t.label} tone={t.tone}>{t.label}</Tag>
          ))}
        </div>
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean compile. WorkCard is not yet used so no route output changes yet.

- [ ] **Step 3: Commit**

```bash
git add components/WorkCard.tsx
git commit -m "feat: add WorkCard with gradient overlay and seeded parallax dots"
```

---

### Task 5: Create `app/work/page.tsx`

**Files:**
- Create: `app/work/page.tsx`

This is a `'use client'` component because it holds filter state.

- [ ] **Step 1: Create the page**

```tsx
// app/work/page.tsx
'use client'

import { useState } from 'react'
import Eyebrow from '@/components/Eyebrow'
import WorkCard from '@/components/WorkCard'
import { PROJECTS } from '@/data/projects'

const FILTERS = [
  { label: 'All',        cls: '' },
  { label: 'Sci-Vis',    cls: 'filter-pill-sci' },
  { label: 'Research',   cls: 'filter-pill-research' },
  { label: 'Civic Tech', cls: 'filter-pill-civic' },
  { label: 'Fine Art',   cls: 'filter-pill-art' },
]

// Featured projects first, then by year descending
const SORTED = [
  ...PROJECTS.filter((p) => p.featured),
  ...PROJECTS.filter((p) => !p.featured).sort((a, b) => {
    const ay = parseInt(a.year) || 0
    const by = parseInt(b.year) || 0
    return by - ay
  }),
]

export default function WorkPage() {
  const [active, setActive] = useState('All')

  const visible = SORTED.filter((p) =>
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
          {SORTED.map((p) => (
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

- [ ] **Step 2: Verify build — check `/work` appears in the route list**

```bash
npm run build
```

Expected output includes:
```
├ ○ /work
```

- [ ] **Step 3: Commit**

```bash
git add app/work/page.tsx
git commit -m "feat: add /work portfolio page with tag filtering"
```

---

### Task 6: Update `app/work/[slug]/page.tsx` — back link and fine art gallery

**Files:**
- Modify: `app/work/[slug]/page.tsx`

- [ ] **Step 1: Change back link from `/` to `/work`**

In `app/work/[slug]/page.tsx`, change:
```tsx
<Link href="/" className="back">
  <ArrowLeft size={16} /> Back to work
</Link>
```
to:
```tsx
<Link href="/work" className="back">
  <ArrowLeft size={16} /> Back to work
</Link>
```

- [ ] **Step 2: Add fine art gallery branch**

Add `Image` from `next/image` to the imports (it's already there via ProjectImage, but for the gallery we need it directly):

```tsx
import Image from 'next/image'
```

Replace the body section (everything between the detail-hero and the next-project link) with a conditional that renders a gallery for the portraits project:

```tsx
      {/* Body — gallery layout for portraits, prose layout for all others */}
      {project.id === 'portraits' ? (
        <div className="container">
          <div className="detail-body prose-col" style={{ paddingBottom: 0 }}>
            <p className="lead">{project.lead}</p>
          </div>
          <div className="art-gallery">
            {[
              { src: '/images/art-bruce.png',    alt: 'Bruce' },
              { src: '/images/art-teddy.jpg',    alt: 'Teddy' },
              { src: '/images/art-leslie.jpg',   alt: 'Leslie' },
              { src: '/images/art-elenore.jpg',  alt: 'Elenore' },
              { src: '/images/art-angelica.jpg', alt: 'Angelica' },
              { src: '/images/art-paulo.jpg',    alt: 'Paulo' },
              { src: '/images/art-warren.jpg',   alt: 'Elizabeth Warren' },
              { src: '/images/art-img0036.jpg',  alt: 'Portrait' },
            ].map(({ src, alt }) => (
              <div key={src} className="art-gallery-item">
                <Image src={src} alt={alt} fill style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="detail-body prose-col">
            <p className="lead">{project.lead}</p>
            <p>{project.body1}</p>
            <blockquote className="pullquote">{project.quote}</blockquote>
            <p>{project.body2}</p>
          </div>

          <div className="detail-gallery">
            <ProjectImage src={project.processImage} alt={`${project.title} process`} tone={project.tone} label="Process" nodes={false} />
            <ProjectImage src={project.detailImage} alt={`${project.title} detail`} tone={project.altTone} label="Detail" nodes={false} />
          </div>

          <div className="detail-body prose-col">
            <p>{project.body3}</p>
          </div>
        </div>
      )}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: clean compile, all routes present including `/work/portraits`.

- [ ] **Step 4: Commit**

```bash
git add "app/work/[slug]/page.tsx"
git commit -m "feat: back link to /work; fine art gallery layout for portraits"
```

---

### Task 7: Update `components/Nav.tsx` and `app/page.tsx`

**Files:**
- Modify: `components/Nav.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Change "Work" nav href to `/work`**

In `components/Nav.tsx`, change line 9:
```ts
{ href: '/', label: 'Work', match: (p: string) => p === '/' || p.startsWith('/work') },
```
to:
```ts
{ href: '/work', label: 'Work', match: (p: string) => p === '/' || p.startsWith('/work') },
```

- [ ] **Step 2: Change homepage "All projects" link to `/work`**

In `app/page.tsx`, change:
```tsx
<Link href="/writing" className="link-arrow">
  All writing <ArrowRight size={16} />
</Link>
```
to:
```tsx
<Link href="/work" className="link-arrow">
  All projects <ArrowRight size={16} />
</Link>
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: clean compile.

- [ ] **Step 4: Commit**

```bash
git add components/Nav.tsx app/page.tsx
git commit -m "feat: wire Work nav link and homepage CTA to /work"
```

---

### Task 8: Smoke-test the full site

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Check each route**

Visit and verify:

| URL | Check |
|---|---|
| `http://localhost:3000` | Homepage shows 4 featured cards; "All projects" → `/work` |
| `http://localhost:3000/work` | 12-card grid, 3 columns; filter pills work; Featured badges on 4 cards |
| `http://localhost:3000/work` (hover cards) | Dots parallax; image scales; gradient visible |
| `http://localhost:3000/work/simularium` | Back link goes to `/work` |
| `http://localhost:3000/work/portraits` | Gallery grid of 8 paintings; no pullquote |
| `http://localhost:3000/work/ldl-hdl-models` | Fallback gradient shows (no heroImage) |
| Nav "Work" link | Goes to `/work`; active underline on `/work/*` |
| Mobile (≤860px) | Grid collapses to 2 col; dots still visible |

- [ ] **Step 3: Final build**

```bash
npm run build
```

Expected: clean build. Route count: 14 existing + 1 new `/work` page + 8 new `/work/[slug]` pages = 23 total routes.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: full portfolio page — /work with filter, WorkCard, 12 projects"
```
