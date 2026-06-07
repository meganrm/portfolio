# Content Separation Design

**Date:** 2026-06-06  
**Status:** Approved

## Goal

Separate all written content (body copy, metadata, image references) from TypeScript source files so posts and projects can be edited in VS Code without touching `.ts` files, escaping strings, or understanding TypeScript syntax.

## Approach

Markdown files with YAML frontmatter. Each post and project becomes a `.md` file. All structured fields — body copy, metadata, image paths, sections arrays — live in the YAML frontmatter block. The Markdown body is unused. A build-time content loader reads and parses these files using `gray-matter` and exports the same typed arrays the page templates already consume.

## File Layout

### Content files

```
content/
  posts/
    cellpack-rules-of-organization.md
    cellpack-peroxisomes.md
    integrated-intracellular-organization.md
    imsc-one-cell-from-many.md
    cellpack-out-of-the-box.md
    simularium-publication.md
    data-to-knowledge.md
    motion-in-static-images.md
    3d-meshes-threejs.md
    white-blood-cells.md
    crosslinker-into-focus.md
  projects/
    binding-affinity-module.md
    cellpack.md
    cell-migration-3d.md
    simularium.md
    town-hall-project.md
    cell-feature-explorer.md
    mutual-aid-hub.md
    imsc.md
    hbv-animation.md
    crispr-cover.md
    trapping-kinases.md
    ldl-hdl-models.md
    indivisible.md
    portraits.md
```

Filename = the item's `id` field (slug). The loader strips `.md` and injects it as `id`.

### Image folders

```
public/images/
  projects/
    binding-affinity/
    cellpack/
    cell-migration-3d/
    simularium/
    town-hall-project/
    cell-feature-explorer/
    mutual-aid-hub/
    imsc/
    hbv-animation/
    crispr-cover/
    trapping-kinases/
    ldl-hdl-models/
    indivisible/
    portraits/
  posts/
    cellpack-rules-of-organization/
    cellpack-peroxisomes/
    integrated-intracellular-organization/
    imsc-one-cell-from-many/
    cellpack-out-of-the-box/
    simularium-publication/
    data-to-knowledge/
    motion-in-static-images/
    3d-meshes-threejs/
    white-blood-cells/
    crosslinker-into-focus/
  shared/
    grain.svg
    mark.svg
```

Existing images in `public/images/` that are currently mixed together get moved into their project/post subfolders. Image references in the `.md` frontmatter use the new paths.

## File Format

### Post example

```markdown
---
date: Oct 2023
read: 5 min read
tag: Research
title: Are peroxisomes randomly distributed?
excerpt: |
  First scientific application of the modernized cellPACK: using rule-based
  packing to test whether peroxisomes in hiPS cells are randomly arranged,
  nuclear-biased, or membrane-biased.
coverImage: /images/posts/cellpack-peroxisomes/cover.png

lead: |
  After a year of getting cellPACK back on its feet as a standalone
  Python package, we finally pointed it at a real biology question.

body1: |
  The setup uses the Allen Institute hiPSC dataset...

h1: PILR, and a clear winner

body2: |
  We used PILR (Parameterized Intracellular Localization Reduction)...

body3: |
  That's not a final answer...
---
```

### Project example (flat body)

```markdown
---
title: Simularium
year: 2022
medium: TypeScript · WebGL
role: Visualization engineer
context: Allen Institute for Cell Science
tone: teal
altTone: mustard
blurb: An interactive web tool for viewing and sharing spatiotemporal biological simulations.
url: https://simularium.allencell.org
tags:
  - Sci-Vis
  - Research
featured: true
pageTemplate: tool
heroImage: /images/projects/simularium/hero.gif
screenshotImage: /images/projects/simularium/viewer.png
processImage: /images/projects/simularium/viewer.png
detailImage: /images/projects/simularium/virtual-cell-goal.png

lead: |
  Simularium lets researchers view, explore, and share spatiotemporal
  biological simulations directly in the browser — no specialized software required.

body1: |
  The computational modeling ecosystem in biology is enormous and fragmented...

quote: The best visualization tool is the one a collaborator can open without installing anything.

body2: |
  Simularium was built as a common viewer for that ecosystem...

body3: |
  Simularium was published in Nature Methods in 2022...
---
```

### Project example (sections array)

```markdown
---
title: cellPACK
year: 2013–present
# ... other metadata fields ...
pageTemplate: tool
heroImage: /images/projects/cellpack/hero.png

lead: |
  Microscopy sees down to microns. X-ray crystallography sees down to atoms...

sections:
  - id: origins
    title: Origins
    image: /images/projects/cellpack/systems.png
    imageAlt: cellPACK recipe conversions from David Goodsell's paintings
    content:
      - |
        cellPACK was originally developed by Graham Johnson and Ludovic Autin...
      - |
        I joined Graham's lab at UCSF as a postdoc in 2013...

  - id: modernization
    title: Modernization
    image: /images/projects/cellpack/simularium-viewer.png
    imageAlt: cellPACK output rendered in the Simularium web viewer
    content:
      - |
        The original cellPACK ran as a plugin inside proprietary 3D animation software...
---
```

The `|` YAML block scalar preserves line breaks, requires no escaping, and accepts apostrophes, em-dashes, and quotes as-is.

## Content Loader

New file `lib/content.ts` replaces the hardcoded arrays in `data/projects.ts` and `data/posts.ts`:

```ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Project, Post } from '@/data/types'

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

## Type Files

`data/projects.ts` and `data/posts.ts` become type-only files. All `interface` and `type` definitions stay; only the hardcoded `PROJECTS` and `POSTS` array exports are removed. Existing component imports of types (`Project`, `Tone`, `Post`) from these files require no changes.

`lib/content.ts` imports types from `@/data/projects` and `@/data/posts` — no circular dependency since those files no longer import from `lib/`.

## Page Template Changes

Each page template changes by one line — the import source:

```ts
// Before
import { PROJECTS } from '@/data/projects'

// After
import { PROJECTS } from '@/lib/content'
```

`generateStaticParams`, `generateMetadata`, and all rendering JSX stay untouched.

## New Dependency

`gray-matter` — parses YAML/TOML frontmatter from strings. Zero runtime dependencies, widely used in the Next.js ecosystem.

```bash
npm install gray-matter
```

## Static Export Compatibility

`fs.readdirSync` and `fs.readFileSync` run at build time inside `generateStaticParams` and page components. Next.js 14 static export (`output: 'export'`) executes these during `npm run build`, not at runtime. No config changes required.

## Migration Steps

1. Install `gray-matter`
2. Create `content/posts/` and `content/projects/` directories
3. Convert each entry in `data/posts.ts` to a `.md` file in `content/posts/`
4. Convert each entry in `data/projects.ts` to a `.md` file in `content/projects/`
5. Create image subfolders under `public/images/projects/` and `public/images/posts/`
6. Move images into their project/post subfolders; update paths in `.md` files
7. Write `lib/content.ts` — imports types from `@/data/projects` and `@/data/posts`
8. Update data imports (not type imports) in the five consuming files:
   - `app/page.tsx` — `PROJECTS` from `@/lib/content`
   - `app/work/page.tsx` — `PROJECTS` from `@/lib/content`
   - `app/work/[slug]/page.tsx` — `PROJECTS` from `@/lib/content`
   - `app/notebook/page.tsx` — `POSTS` from `@/lib/content`
   - `app/notebook/[slug]/page.tsx` — `POSTS` from `@/lib/content`
9. Remove the hardcoded `PROJECTS` and `POSTS` array exports from `data/projects.ts` and `data/posts.ts` (type definitions and interfaces stay)
10. Run `npm run build` and verify all pages generate correctly
