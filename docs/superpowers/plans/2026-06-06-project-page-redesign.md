# Project Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the single uniform project page template with two layout templates — Tool/App and Visual Asset — that surface "what is this" above the fold, display images at natural aspect ratio without border-radius, and create visual variety through alternating text/image rows.

**Architecture:** A `pageTemplate: 'tool' | 'visual'` field on each `Project` drives which JSX branch renders in `app/work/[slug]/page.tsx`. Three local helper components (`BodyImage`, `MetaRow`, `ProjectBody`) are defined in that file and shared across both templates. Portraits retains its custom gallery branch. CSS classes are split into shared (`.detail-section`, `.detail-closing`) and template-specific (`.detail-banner`, `.detail-intro`).

**Tech Stack:** Next.js 14 App Router, TypeScript, plain CSS in `app/globals.css`, `next/image`

---

### Task 1: Update the Project data model

**Files:**
- Modify: `data/projects.ts`

- [ ] **Step 1: Add `pageTemplate` and `screenshotImage` to the Project interface**

In `data/projects.ts`, update the `Project` interface to add two fields:

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
  heroImagePosition?: string
  cardImage?: string
  screenshotImage?: string   // Template 1 right column; falls back to heroImage
  processImage?: string
  detailImage?: string
  featured?: boolean
  pageTemplate: 'tool' | 'visual'   // determines which page template to render
}
```

- [ ] **Step 2: Remove `3d-cell-viewer` and `visual-guide-stem-cells`**

Delete the entire object literal for each from the `PROJECTS` array. Search for `id: '3d-cell-viewer'` and `id: 'visual-guide-stem-cells'` and remove the whole `{ ... }` block for each.

- [ ] **Step 3: Add `pageTemplate` and `screenshotImage` to every remaining project**

Edit each project entry. Changes only — all other fields stay as-is:

**`binding-affinity-module`** — add:
```ts
pageTemplate: 'tool',
screenshotImage: '/images/binding-affinity-ui.png',
```

**`cellpack`** — add (no screenshotImage yet; falls back to heroImage):
```ts
pageTemplate: 'tool',
```

**`simularium`** — add:
```ts
pageTemplate: 'tool',
screenshotImage: '/images/simularium-viewer.png',
```

**`town-hall-project`** — add (heroImage is already the map UI; no screenshotImage needed):
```ts
pageTemplate: 'tool',
```

**`cell-feature-explorer`** — add (heroImage is already the UI):
```ts
pageTemplate: 'tool',
```

**`mutual-aid-hub`** — add:
```ts
pageTemplate: 'tool',
screenshotImage: '/images/mutual-aid-hub-map.png',
```

**`imsc`** — update `cardImage` and add two fields:
```ts
cardImage: '/images/mitochondria.png',   // was imsc-hero.jpg
pageTemplate: 'tool',
screenshotImage: '/images/mitosis.gif',
```

**`indivisible`** — add (heroImage is already the map UI):
```ts
pageTemplate: 'tool',
```

**`hbv-animation`** — add:
```ts
pageTemplate: 'visual',
```

**`crispr-cover`** — add:
```ts
pageTemplate: 'visual',
```

**`trapping-kinases`** — add:
```ts
pageTemplate: 'visual',
```

**`ldl-hdl-models`** — add:
```ts
pageTemplate: 'visual',
```

**`portraits`** — add:
```ts
pageTemplate: 'visual',
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no output (no errors). If you see errors about `pageTemplate` being required, a project entry is missing it — find and add it.

- [ ] **Step 5: Commit**

```bash
git add data/projects.ts
git commit -m "feat: add pageTemplate + screenshotImage fields, remove 2 discontinued projects"
```

---

### Task 2: Update CSS in `app/globals.css`

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Remove old detail layout rules**

In the `PROJECT DETAIL` section, find and delete these exact rules:

```css
.detail-hero .imgph { height: 460px; }
.detail-body { padding: 56px 0; }
.detail-body p { font-size: 18px; line-height: 1.72; color: var(--ink); margin: 0 0 24px; }
.detail-body p.lead { font-size: 21px; color: var(--ink-2); }
.detail-gallery { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 8px 0 0; }
.detail-gallery .imgph { height: 280px; }
.detail-prose-aside { display: grid; grid-template-columns: 1fr 260px; gap: 56px; align-items: start; }
.detail-aside-img { border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); }
```

- [ ] **Step 2: Remove `.detail-prose-aside` from the mobile media query**

In `@media (max-width: 860px)`, find the rule that collapses grids to single column and remove the `.detail-prose-aside` line:

```css
/* Find this block and remove the .detail-prose-aside line from it: */
.strip,
.about-hero,
.detail-gallery,
.detail-prose-aside,   /* ← delete this line only */
.cv { grid-template-columns: 1fr; }
```

- [ ] **Step 3: Add new detail layout rules**

After `.detail-metarow .col p { ... }` and before `.next-project { ... }`, insert:

```css
/* ── Detail lead paragraph ────────────────────────────────────────────── */
.detail-lead { font-size: 21px; line-height: 1.62; color: var(--ink-2); margin: 16px 0 0; }

/* ── Natural-ratio image — no crop, no radius ─────────────────────────── */
.detail-img { width: 100%; height: auto; display: block; border-radius: 0; }

/* ── Template 1: atmospheric banner ──────────────────────────────────── */
.detail-banner { height: 220px; overflow: hidden; position: relative; }
.detail-banner .detail-img { height: 100%; object-fit: cover; filter: brightness(0.5) saturate(0.7); }
.detail-banner video {
  width: 100%; height: 100%; object-fit: cover; display: block;
  filter: brightness(0.5) saturate(0.7);
}

/* ── Template 1: two-column intro ────────────────────────────────────── */
.detail-intro {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 56px; padding: 32px 0 0; align-items: start;
}
.detail-intro-screenshot .detail-img { outline: 1px solid var(--line); }

/* ── Both templates: alternating body rows ───────────────────────────── */
.detail-section {
  display: flex; gap: 48px; padding: 40px 0;
  border-top: 1px solid var(--line); align-items: start;
}
.detail-section > * { flex: 1; min-width: 0; }
.detail-section--flip { flex-direction: row-reverse; }
.detail-section-text p { font-size: 18px; line-height: 1.72; color: var(--ink); margin: 0; }

/* ── Both templates: full-width closing paragraph ────────────────────── */
.detail-closing { max-width: 760px; padding: 40px 0; border-top: 1px solid var(--line); }
.detail-closing p { font-size: 18px; line-height: 1.72; color: var(--ink); margin: 0; }

/* ── Template 2: full-bleed hero at natural ratio ────────────────────── */
.detail-hero-natural { width: 100%; }
.detail-hero-natural .detail-img { width: 100%; }
```

- [ ] **Step 4: Add responsive rules**

In the `@media (max-width: 860px)` block, add:

```css
.detail-banner { height: 140px; }
.detail-intro { grid-template-columns: 1fr; gap: 24px; }
.detail-section { flex-direction: column; gap: 24px; }
.detail-section--flip { flex-direction: column; }
```

- [ ] **Step 5: Start the dev server to confirm no CSS parse errors**

```bash
npm run dev
```

Expected: server starts, http://localhost:3000 loads. Project pages may look incomplete until Task 3.

- [ ] **Step 6: Commit**

```bash
git add app/globals.css
git commit -m "feat: add CSS for two project page templates, remove old detail layout rules"
```

---

### Task 3: Rewrite `app/work/[slug]/page.tsx`

**Files:**
- Modify: `app/work/[slug]/page.tsx`

- [ ] **Step 1: Replace the entire file with the new implementation**

```tsx
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'
import { PROJECTS } from '@/data/projects'
import type { Project } from '@/data/projects'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.id }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = PROJECTS.find((p) => p.id === params.slug)
  if (!project) return {}
  return { title: `${project.title} — Megan Riel-Mehan` }
}

const VIDEO_EXT = /\.(mp4|webm|mov)$/i

/** Renders a still image or video at natural aspect ratio — no crop, no border-radius. */
function BodyImage({ src, alt }: { src: string; alt: string }) {
  if (VIDEO_EXT.test(src)) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        aria-label={alt}
        className="detail-img"
        style={{ width: '100%', height: 'auto' }}
      />
    )
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="(max-width: 860px) 100vw, 50vw"
      className="detail-img"
      style={{ width: '100%', height: 'auto' }}
      unoptimized={/\.(gif)$/i.test(src)}
    />
  )
}

function MetaRow({ project }: { project: Project }) {
  return (
    <div className="detail-metarow">
      <div className="col"><h6>Year</h6><p>{project.year}</p></div>
      <div className="col"><h6>Medium</h6><p>{project.medium}</p></div>
      <div className="col"><h6>Role</h6><p>{project.role}</p></div>
      <div className="col"><h6>Context</h6><p>{project.context}</p></div>
      {project.url && (
        <div className="col">
          <h6>Live site</h6>
          <p>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="link-arrow" style={{ fontSize: 15 }}>
              Visit <ExternalLink size={14} />
            </a>
          </p>
        </div>
      )}
    </div>
  )
}

/**
 * Shared alternating body for both templates:
 *   Row 1  — body1 (left) | processImage (right)
 *   Pullquote — full-width
 *   Row 2  — detailImage (left) | body2 (right), flipped
 *             OR body2 full-width when detailImage is absent
 *   Closing — body3 full-width
 */
function ProjectBody({ project }: { project: Project }) {
  return (
    <>
      {project.processImage ? (
        <div className="detail-section">
          <div className="detail-section-text"><p>{project.body1}</p></div>
          <div><BodyImage src={project.processImage} alt={`${project.title} — process`} /></div>
        </div>
      ) : (
        <div className="detail-closing"><p>{project.body1}</p></div>
      )}

      <blockquote className="pullquote">{project.quote}</blockquote>

      {project.detailImage ? (
        <div className="detail-section detail-section--flip">
          <div><BodyImage src={project.detailImage} alt={`${project.title} — detail`} /></div>
          <div className="detail-section-text"><p>{project.body2}</p></div>
        </div>
      ) : (
        <div className="detail-closing"><p>{project.body2}</p></div>
      )}

      <div className="detail-closing"><p>{project.body3}</p></div>
    </>
  )
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.id === params.slug)
  if (!project) notFound()

  const currentIndex = PROJECTS.findIndex((p) => p.id === params.slug)
  const next = PROJECTS[(currentIndex + 1) % PROJECTS.length]

  // ─── Portraits: custom gallery layout ──────────────────────────────────
  if (project.id === 'portraits') {
    return (
      <main>
        <div className="container">
          <Link href="/work" className="back">
            <ArrowLeft size={16} /> Back to work
          </Link>
          <header className="detail-head">
            <Eyebrow dot>{project.tags.map((t) => t.label).join(' · ')}</Eyebrow>
            <h1 className="detail-title">{project.title}</h1>
            <MetaRow project={project} />
          </header>
          <div className="detail-closing" style={{ borderTop: 'none', paddingTop: 0 }}>
            <p className="detail-lead">{project.lead}</p>
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
                <Image src={src} alt={alt} fill style={{ objectFit: 'cover', borderRadius: 0 }} />
              </div>
            ))}
          </div>
          <Link href={`/work/${next.id}`} className="next-project">
            <div>
              <Eyebrow>Next project</Eyebrow>
              <div className="np-title">{next.title}</div>
            </div>
            <ArrowRight size={24} />
          </Link>
        </div>
      </main>
    )
  }

  // ─── Template 1 — Tool/App ─────────────────────────────────────────────
  if (project.pageTemplate === 'tool') {
    const screenshotSrc = project.screenshotImage ?? project.heroImage
    return (
      <main>
        {project.heroImage && (
          <div className="detail-banner" aria-hidden="true">
            {VIDEO_EXT.test(project.heroImage) ? (
              <video src={project.heroImage} autoPlay loop muted playsInline />
            ) : (
              <Image
                src={project.heroImage}
                alt=""
                fill
                style={{ objectFit: 'cover', filter: 'brightness(0.5) saturate(0.7)' }}
              />
            )}
          </div>
        )}

        <div className="container">
          <Link href="/work" className="back">
            <ArrowLeft size={16} /> Back to work
          </Link>
          <div className="detail-intro">
            <div>
              <Eyebrow dot>{project.tags.map((t) => t.label).join(' · ')}</Eyebrow>
              <h1 className="detail-title">{project.title}</h1>
              <MetaRow project={project} />
              <p className="detail-lead">{project.lead}</p>
            </div>
            {screenshotSrc && (
              <div className="detail-intro-screenshot">
                <BodyImage src={screenshotSrc} alt={`${project.title} screenshot`} />
              </div>
            )}
          </div>

          <ProjectBody project={project} />

          <Link href={`/work/${next.id}`} className="next-project">
            <div>
              <Eyebrow>Next project</Eyebrow>
              <div className="np-title">{next.title}</div>
            </div>
            <ArrowRight size={24} />
          </Link>
        </div>
      </main>
    )
  }

  // ─── Template 2 — Visual Asset ─────────────────────────────────────────
  return (
    <main>
      <div className="container">
        <Link href="/work" className="back">
          <ArrowLeft size={16} /> Back to work
        </Link>
      </div>

      {project.heroImage && (
        <div className="detail-hero-natural">
          <BodyImage src={project.heroImage} alt={project.title} />
        </div>
      )}

      <div className="container">
        <header className="detail-head">
          <Eyebrow dot>{project.tags.map((t) => t.label).join(' · ')}</Eyebrow>
          <h1 className="detail-title">{project.title}</h1>
          <MetaRow project={project} />
          <p className="detail-lead">{project.lead}</p>
        </header>

        <ProjectBody project={project} />

        <Link href={`/work/${next.id}`} className="next-project">
          <div>
            <Eyebrow>Next project</Eyebrow>
            <div className="np-title">{next.title}</div>
          </div>
          <ArrowRight size={24} />
        </Link>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no output. If you see a TS error about `Project` not being exported from `@/data/projects`, add `export` to the interface declaration in `data/projects.ts`.

- [ ] **Step 3: Commit**

```bash
git add app/work/\[slug\]/page.tsx
git commit -m "feat: implement Tool/App and Visual Asset project page templates"
```

---

### Task 4: Visual spot-check and build verification

**Files:** none modified — verification only

- [ ] **Step 1: Ensure the dev server is running**

```bash
npm run dev
```

- [ ] **Step 2: Spot-check Template 1 — Simularium**

Open http://localhost:3000/work/simularium

Verify:
- Darkened atmospheric banner visible (~220px, bluegreen tones from the GIF)
- Below banner: back link, then two-column layout — left side has eyebrow, title, meta, lead; right side shows `simularium-viewer.png` at natural aspect ratio with a thin border
- No fixed-height crop on the screenshot — it sits at its own natural height
- Body: text on left, processImage on right (row 1); pullquote full-width; detailImage on left, text on right (row 2); body3 full-width below
- All images: no rounded corners
- Next project link at bottom

- [ ] **Step 3: Spot-check Template 2 — HBV Animation**

Open http://localhost:3000/work/hbv-animation

Verify:
- Back link at very top (inside the container, above the hero)
- `hbv-virus-hero.jpg` renders full-width at natural aspect ratio immediately below, no border-radius
- Below the image: eyebrow, large title, meta row, lead paragraph
- Body alternating rows: body1 left + processImage (video) right; pullquote; detailImage left + body2 right; body3 closing

- [ ] **Step 4: Spot-check a project without `detailImage` — Town Hall Project**

Open http://localhost:3000/work/town-hall-project

Verify:
- Template 1 renders (banner + two-column intro)
- Body row 1: body1 + processImage (side by side) ✓
- Pullquote full-width ✓
- body2 renders as a full-width `.detail-closing` paragraph (no second image) ✓
- body3 renders as another full-width `.detail-closing` paragraph ✓
- No layout breakage

- [ ] **Step 5: Spot-check Portraits**

Open http://localhost:3000/work/portraits

Verify:
- Gallery layout intact (eight painting thumbnails)
- Gallery images have `borderRadius: 0` — no rounded corners

- [ ] **Step 6: Run a production build**

```bash
npm run build
```

Expected: build completes with `✓ Generating static pages` and no errors. The number of static pages should be lower than before (two projects removed).

If there are any errors, read the error message and fix the specific issue before proceeding.

- [ ] **Step 7: Commit if there were any fixes**

If the build required changes to fix errors, commit them:

```bash
git add -A
git commit -m "fix: resolve build issues from project page redesign"
```

If the build passed cleanly with no changes, skip this commit.
