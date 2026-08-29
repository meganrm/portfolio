---
date: Nov 2016
read: 4 min read
tag:
  label: Research
title: How do white blood cells move in 3D environments?
excerpt: |
  A research write-up and interview about our work on fast-moving immune cells — using lattice light sheet microscopy and custom visualization tools.
url: https://www.ucsf.edu/news/2016/11/404936/science-focus-how-do-white-blood-cells-move-so-fast
lead: |
  White blood cells are among the fastest-moving cells in the body. Understanding how they move — really how, at the level of what the actin cytoskeleton is doing — requires seeing them in 3D, live, at high speed. That's what lattice light sheet microscopy makes possible.
body1: |
  Working with Lillian Fritz-Laylin in the Mullins Cell Biology Lab at UCSF, I developed visualization and analysis tools for the 3D time-series data coming off the lattice light sheet microscope. The raw output was enormous — roughly 60 GB per cell — full 3D volumes acquired every few seconds as cells crawled through labeled and unlabeled collagen matrices. The UCSF Chimera vseries toolkit, developed by Tom Goddard in the Ferrin Lab, was the foundation: aligning, normalizing, and compressing the volumes down to about 6 GB while preserving the surface detail needed for analysis.
h1: Communicating motion in static images
body2: |
  The visualization challenge was turning four-dimensional data into something a biologist could interpret quickly — and that meant solving a much older problem. Muybridge's galloping horse, cave drawings of running bison, Duchamp's Nude Descending a Staircase: people have been trying to compress motion into static images for a very long time. I borrowed from that lineage. I rendered the cells with tonal shading and surface topology cues, and built time-coded composites — color-mapped protrusions across a 16-second window, frame strips at 18.8-second intervals — that made it possible to read protrusion dynamics at a glance: where the cell was extending, where it was retracting, how the whole structure was coordinating.
body3: |
  The work was covered as part of UCSF's Science Focus series, and the cell models eventually became the basis for an Exploratorium exhibit, A Cell in Motion, in Gallery 4: Living Systems — 3D-printed cells from the lattice light sheet data, mounted on a hand crank visitors could turn. The broader scientific finding was that these cells use protrusions primarily for environmental interrogation — sensing the spatial and chemical composition of their surroundings — rather than directly for locomotion. A distinction that only becomes visible when you can watch the whole 3D cell in motion.
coverImage: /images/posts/hl60-movement.png
---
