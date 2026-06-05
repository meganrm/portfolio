# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build (static export, 14 pages)
npm start        # serve production build
```

## Project structure

Next.js 14 App Router, TypeScript, plain CSS (no CSS modules, no Tailwind).

```
app/
  globals.css              # ALL styles — design tokens + component classes
  layout.tsx               # root layout: Nav + Footer wrap every page
  page.tsx                 # home: hero, work grid, "currently" strip
  work/[slug]/page.tsx     # project detail (4 projects, statically generated)
  writing/page.tsx         # writing index
  writing/[slug]/page.tsx  # individual post (4 posts, statically generated)
  about/page.tsx           # about + CV

components/
  Nav.tsx                  # "use client" — scroll state + usePathname active links
  Footer.tsx               # static
  Mark.tsx                 # brand SVG (cell-cluster monogram)
  Molecule.tsx             # hero accent SVG
  Tag.tsx                  # colored pill label (teal/mustard/clay/sage)
  Eyebrow.tsx              # mono uppercase label with optional dot
  ImagePlaceholder.tsx     # branded color-field with gradient + grain
  ScrollToWorkButton.tsx   # "use client" — smooth-scrolls to #work

data/
  projects.ts              # PROJECTS array — 4 projects with all body copy
  posts.ts                 # POSTS array — 4 posts with all body copy

public/
  mark.svg                 # cell-cluster brand mark (also inline in Mark.tsx)
  grain.svg                # procedural noise overlay
```

## Design system

All design tokens live in `app/globals.css` as CSS custom properties. Always reference semantic tokens (`--fg`, `--surface`, `--primary`) rather than raw scale values (`--mustard-400`).

**Colors:** Mustard `#E6A317` (primary), Teal `#138A86` (secondary), Terracotta `#CB5A33`, Sage `#869A63` on warm cream `#F6EFE1` / ink `#211E1A`. Mustard is light — always pair with ink text, never white.

**Fonts:** Bricolage Grotesque (display headlines), Instrument Serif (editorial italic accents), Hanken Grotesk (body), JetBrains Mono (eyebrow labels, metadata, tags). Loaded from Google Fonts via `@import` at the top of `globals.css`.

**Voice:** First person, sentence case, no emoji. Mono metadata labels use uppercase + tracking (e.g. `RESEARCH · 2024`).

**Image slots:** `<ImagePlaceholder>` are drop-in targets — replace with `<Image>` from `next/image` once real assets exist.

## Adding content

- New project: add an entry to `data/projects.ts`. Route `/work/[slug]` is generated from the `id` field.
- New post: add an entry to `data/posts.ts`. Route `/writing/[slug]` is generated from the `id` field.
- No rebuild config needed — `generateStaticParams` reads directly from the data arrays.
