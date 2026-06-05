# Full Portfolio Page — Design Spec
_2026-06-05_

## Overview

Add a `/work` page showing all projects with client-side tag filtering. The homepage retains its 4-card featured section. Each project gets a full detail page. Eight new projects are added alongside the existing four.

---

## 1. Routing & navigation

- New route: `/work` — the full portfolio page
- `Nav.tsx`: "Work" link changes from `href="/"` to `href="/work"`; active match stays `p === '/' || p.startsWith('/work')`
- `app/page.tsx` (homepage): "All projects" link-arrow changes target from `/writing` to `/work`
- Homepage featured section is unchanged — 4 cards, no filtering
- Logo/brand link continues to go to `/`

---

## 2. Card design

All project cards on `/work` use this treatment:

**Image slot**
- Height: 220px (desktop), same width as grid column
- `border-radius: var(--radius-lg)` (16px), `overflow: hidden` on the image itself
- Image scales to 1.05× on hover (`transition: transform 0.55s var(--ease-out)`)

**Gradient overlay**
- `::after` pseudo-element on the image container, `z-index: 1`
- `linear-gradient(to top, rgba(tone, 0.84) 0%, rgba(tone, 0.25) 44%, transparent 68%)`
- Tone color comes from the project's `tone` field

**Dots**
- `.dots` div: `position: absolute; top: 0; left: 0; width: 100%; height: 220px; overflow: visible; z-index: 10; pointer-events: none`
- The card wrapper has `position: relative; overflow: visible` so dots can straddle the image border
- 3–5 dots per card, positioned so their centers sit on the image boundary (top/bottom/left/right edges), straddling in/out
- Dot colors are solid brand values: `#E6A317` (mustard), `#138A86` (teal), `#CB5A33` (clay), `#869A63` (sage), `#79C7C0` (teal-light), `#FCF8F0` (cream-white), `#211E1A` (ink)
- Dot sizes vary: 8px–52px across the set, unique per card
- Positions and color assignments are seeded from `project.id` using a simple deterministic hash (sum char codes, mod palette/position arrays) — stable across renders, unique per project without per-project hardcoding
- Border: `2px solid rgba(33,30,26,0.15)`
- Parallax on hover: each dot translates by a unique vector (±5–14px) via CSS transition

**Card body** (below image)
- Mono meta: `year — medium`
- Display title (+ small "Featured" badge in mustard for the 4 featured projects)
- One-line blurb
- Tag pills

---

## 3. Tag filtering

- Filter bar above the grid: `All · Sci-Vis · Research · Civic Tech · Fine Art`
- Uses a new `.filter-pill` style in `globals.css` — larger than card tags (same pill shape, `padding: 7px 16px`, mono font), distinct from the small `.tag` used on cards; active state: ink background, cream text; inactive: ghost border with tone-colored variant per label
- Client-side filtering — `/work/page.tsx` is a `'use client'` component
- `useState` holds the active filter label (default: `'All'`)
- Filtering matches if any of the project's tags includes the active label (case-insensitive)
- URL does not update on filter change (no query params needed for this scope)
- Non-matching cards are hidden via `display: none`

---

## 4. Grid layout

```
desktop (≥860px): 3 columns, gap: 28px
tablet  (560–859px): 2 columns
mobile  (<560px): 1 column
```

Sort order: featured projects first (in their existing order), then remaining projects by year descending.

---

## 5. New projects

Add to `data/projects.ts`. All get `featured: false`. Existing 4 get `featured: true`.

| id | title | year | medium | tone | heroImage | tags |
|---|---|---|---|---|---|---|
| `3d-cell-viewer` | 3D Cell Viewer | 2017 | WebGL · three.js | teal | `cell-motion.gif` | Sci-Vis |
| `imsc` | IMSC | 2016 | WebGL · D3 | teal | `mitochondria.png` | Sci-Vis, Research |
| `visual-guide-stem-cells` | Visual Guide to Human Stem Cells | 2015 | WebGL · Illustration | sage | `sci-viz-banner.png` | Sci-Vis |
| `hbv-animation` | HBV Animation | 2016 | Cinema 4D · Blender | mustard | `mucus-viz.png` | Sci-Vis |
| `crispr-cover` | CRISPR Cover Art | 2016 | Cinema 4D · Illustration | ink | `crispr-cover.jpg` | Sci-Vis |
| `ldl-hdl-models` | LDL & HDL Models | 2015 | Cinema 4D · Illustration | clay | _(placeholder)_ | Sci-Vis |
| `indivisible` | Indivisible Map | 2017 | React · Mapbox | sage | `indivisible.png` | Civic Tech |
| `portraits` | Portrait paintings | Various | Oil on canvas | clay | `painting-main.jpg` | Fine Art |

Body copy for each follows the existing `lead / body1 / quote / body2 / body3` structure, written to match the voice established in the existing four entries.

---

## 6. Fine Art detail page

The `portraits` project uses a **gallery layout** instead of the standard prose+pullquote template.

- Detection: `project.id === 'portraits'` in `app/work/[slug]/page.tsx` renders a different body
- Gallery grid: 3 columns, all `art-*.jpg/png` images from `public/images/`
- Images: `art-bruce.png`, `art-teddy.jpg`, `art-leslie.jpg`, `art-elenore.jpg`, `art-angelica.jpg`, `art-paulo.jpg`, `art-warren.jpg`, `art-img0036.jpg`
- Each image uses `next/image` with `fill` and `object-fit: cover` inside a fixed-height container (300px)
- Short intro paragraph above the grid (from `project.lead`)
- No pullquote, no detail gallery section

---

## 7. Data model changes

Add to `Project` interface in `data/projects.ts`:

```ts
featured?: boolean   // true for the original 4; omitted/false for new entries
```

The `tone` field already covers the gradient color. No other interface changes needed.

---

## 8. Files changed

| File | Change |
|---|---|
| `data/projects.ts` | Add `featured` field; add 8 new project entries |
| `app/work/page.tsx` | New file — filterable portfolio grid (client component) |
| `app/work/[slug]/page.tsx` | Add dot overlay to card hero; add fine art gallery branch |
| `app/page.tsx` | Update "All projects" link to `/work` |
| `components/Nav.tsx` | Update "Work" href to `/work` |
| `app/globals.css` | Add `.work-grid-full` (3-col) and `.dot` styles |
| `components/WorkCard.tsx` | New — card with gradient overlay + dots + parallax |
