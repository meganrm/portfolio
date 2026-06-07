# Project Page Redesign

**Date:** 2026-06-06
**Status:** Approved for implementation

## Problem

Current project pages are too uniform — identical layout regardless of project type, a large hero banner that pushes the "what is this" paragraph below the fold, two detail images side by side that are awkwardly wider than the prose column, and images cropped to fixed heights with rounded corners that obscure important scientific content.

## Design decisions

### Two page templates, split by project type

Projects are classified as either **Tool/App** or **Visual Asset**, determined by a new `pageTemplate` field on each project.

**Template 1 — Tool/App**
Used when the product is a working tool, website, or application. The most informative view of the project is a screenshot of the actual UI, not the striking visual artifact (which may be a 3D render, animation frame, etc.).

Projects: Binding Affinity Module, Simularium, Town Hall Project, Cell Feature Explorer, Mutual Aid Hub, IMSC, Indivisible, cellPACK

**Template 2 — Visual Asset**
Used when the product itself is a visual artifact — an illustration, animation, model, or painting. The artifact is the point; showing it full-width immediately is correct.

Projects: HBV Animation, CRISPR Cover, Trapping Kinases, LDL/HDL Models, Portraits

---

### Template 1 layout (Tool/App)

```
[ DARKENED ATMOSPHERIC BANNER — heroImage, full-width, ~220px tall, brightness 50% ]
← Back to work
[ TWO COLUMNS ]
  Left:   Eyebrow · tags
          Title (large)
          Meta: year / medium / role / context / link
          Lead paragraph (the "what is this")
  Right:  screenshotImage — natural aspect ratio, no border-radius, thin border
[ BODY: alternating text+image rows ]
  Row 1:  body1 (left) | processImage (right)  — natural ratio, no radius
  -------  pullquote full-width  -------
  Row 2:  detailImage (left) | body2 (right)   — flipped
  body3 full-width closing paragraph
[ NEXT PROJECT ]
```

**Banner:** `heroImage` rendered full-width at a fixed height (~220px), `object-fit: cover`, `filter: brightness(0.5) saturate(0.7)`. Purely atmospheric — sets color and mood without needing to be legible.

**Two-column header:** uses CSS grid `1fr 1fr` (or `1fr 0.9fr`). On mobile, stacks to single column with screenshot below text. Screenshot uses `screenshotImage`; falls back to `heroImage` if absent.

---

### Template 2 layout (Visual Asset)

```
← Back to work
[ HERO IMAGE — heroImage, full-width, natural aspect ratio, no border-radius ]
Eyebrow · tags
Title
[ META ROW: year / medium / role / context / link — horizontal ]
Lead paragraph
[ BODY: alternating text+image rows ]
  Row 1:  body1 (left) | processImage (right)
  -------  pullquote full-width  -------
  Row 2:  detailImage (left) | body2 (right)
  body3 full-width closing paragraph
[ NEXT PROJECT ]
```

The back link sits above the hero so it doesn't compete with the image. Title and meta are below the hero so the image hits first.

---

### Body: alternating text+image rows (both templates)

Each row is a CSS grid: `1fr 1fr`, `align-items: start`. Rows alternate direction (first row text-left/image-right, second row image-left/text-right). The pullquote runs full-width between rows as a visual pause.

**When `detailImage` is absent** (Town Hall Project, Mutual Aid Hub, Indivisible, CRISPR Cover): Row 2 renders as a full-width text block — `body2` spans the container at max-width 760px — no image column. This keeps the layout valid without requiring placeholder images.

**Image treatment (both templates, all images):**
- `border-radius: 0` — no rounded corners on content images
- `width: 100%`, `height: auto` — natural aspect ratio, never cropped to a fixed height
- Images are informative, not decorative; cropping them harms legibility

**Text width:** prose column removed. Body text in alternating rows fills its grid cell (roughly half the container width, ~560px at desktop). body3 closing paragraph spans full container width at a comfortable ~760px max.

---

### Data model additions

New fields on the `Project` interface:

```ts
pageTemplate: 'tool' | 'visual'  // required — determines which template to render
screenshotImage?: string          // Template 1 right column; falls back to heroImage
```

**Removed projects:**
- `3d-cell-viewer` — removed from portfolio
- `visual-guide-stem-cells` — removed from portfolio

**Updated projects:**
- `imsc`: `cardImage` → `mitochondria.png`; `screenshotImage` to be added when screenshot is available

**screenshotImage values for Template 1 projects:**

| Project                 | screenshotImage                                      |
| ----------------------- | ---------------------------------------------------- |
| binding-affinity-module | `/images/binding-affinity-ui.png`                    |
| simularium              | `/images/simularium-viewer.png`                      |
| town-hall-project       | `/images/town-hall.png` (heroImage same)             |
| cell-feature-explorer   | `/images/cell-feature-explorer.png` (heroImage same) |
| mutual-aid-hub          | `/images/mutual-aid-hub-map.png`                     |
| imsc                    | `/images/mitosis.gif`                                |
| indivisible             | `/images/indivisible.png` (heroImage same)           |
| cellpack                | TBD — needs screenshot of cellpack.org or software UI; falls back to heroImage |

---

### Responsive behavior

- **Below 860px:** Both templates stack to single column. Banner stays full-width. Two-column header collapses: screenshot below text. Alternating body rows stack: image below its paired text.
- **Below 560px:** meta row wraps freely; font sizes step down.

---

### CSS changes

**Remove:**
- `.detail-hero` fixed-height wrapper
- `.detail-gallery` two-column image grid
- `.detail-body.prose-col` narrow text constraint
- `border-radius` on `.imgph` in detail context

**Add:**
- `.detail-banner` — full-width atmospheric strip (Template 1 only)
- `.detail-intro` — two-column header grid
- `.detail-section` — alternating row grid (`1fr 1fr`, direction via modifier class)
- `.detail-section--flip` — reversed direction
- `.detail-closing` — full-width body3 paragraph, max-width 760px
- `.detail-img` — natural-ratio image, `border-radius: 0`

**Existing classes kept:** `.detail-head`, `.detail-metarow`, `.detail-title`, `.pullquote`, `.next-project`

---

### Out of scope

- Portraits project already has a custom gallery layout — keep as-is, only apply the no-radius image rule
- Mutual Aid Hub already has a prose+aside layout — migrate to the standard alternating rows template
- No changes to the work grid (`/work`), notebook pages, or about page
