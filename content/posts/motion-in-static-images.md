---
date: Mar 2020
read: 4 min read
tag:
  label: Methods
title: Communicating motion in static images
excerpt: |
  Cave paintings, Muybridge, Duchamp. The 4D cell visualization problem is an old one, and the lineage is more useful than the software.
lead: |
  Lattice light sheet microscopy produces full 3D volumes every fraction of a second. A typical migrating cell yields a 4D dataset — three spatial dimensions plus time — that a biologist needs to interpret quickly enough to form hypotheses about it. The native medium for that interpretation is still a 2D page. How do you compress 4D into 2D without losing what makes the cell legible as a moving object?
body1: |
  The first place I looked for prior art was, oddly, the cave at Chauvet. The 32,000-year-old bison drawings show extra legs, ghosted heads — motion compressed into a single static figure. That's the same problem. Muybridge's 1878 horse-in-motion plates solved it differently: time made discrete, laid out in a strip. Duchamp's Nude Descending a Staircase (1912) does both — superimposed phases of motion in a single composition. Each is an answer to the question of how a static image can encode change.
h1: What I borrowed
body2: |
  For the HL60 migrating-cell work in the Mullins lab, I tried three encodings. First: classical frame strips at 18.8-second intervals — the Muybridge solution — for cell shape over time. Second: time-coded volumetric overlays where each color represents a 4-second window of protrusion activity, so an entire 16-second cycle of cell extension reads as a single Duchamp-like figure. Third: 3D-printed cells from the volumetric data, mounted on a hand crank for the Exploratorium so visitors could turn the time axis themselves. Each one trades different things: legibility for completeness, single-glance reading for full reconstruction.
body3: |
  The lesson is that the visualization problem for live cell imaging isn't a software problem — Chimera, Imaris, FIJI all render 4D fine. It's a representational problem, and there's a long lineage of solutions outside biology that I think we under-borrow from. The image you can hold in your head matters more than the volume rendering you can rotate.
coverImage: /images/posts/fan.png
---
