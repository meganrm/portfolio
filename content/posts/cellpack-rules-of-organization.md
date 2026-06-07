---
date: Mar 2026
read: 6 min read
tag:
  label: Research
title: Rules of intracellular organization
excerpt: |
  Notes from the latest Allen Hour talk: are peroxisomes and endosomes randomly distributed inside a human stem cell? Mostly not. Mostly something more interesting.
lead: |
  Saurabh Mogre and I gave an Allen Hour talk last week on the current state of our cellPACK work. The framing question is unchanged from October 2023 — are punctate organelles randomly distributed in human iPS cells? — but the answer has gotten more interesting, and the method has gotten more honest about what we don't know.
body1: |
  The recap: we use cellPACK to generate populations of simulated cells under different organizational rules — unbiased random packing, nuclear bias, membrane bias, apical bias — and compare the resulting distributions to peroxisomes and endosomes measured in the 200,000+ cell WTC-11 hiPSC dataset. The comparisons use Earth mover's distance and Kolmogorov-Smirnov tests on intracellular distance distributions. The headline from last fall was that nuclear bias produced the best correlation with observed peroxisome data. The headline from this March is more chastened: under stricter statistical controls, no single simple rule fully explains observed puncta distributions.
h1: "The shape problem, and an occupancy metric"
body2: |
  The biggest source of variation in distance distributions, it turns out, is not the underlying biology — it's the geometry of individual cells. iPSC colonies have wildly variable shapes, and that variation alone produces EMDs comparable to the differences between bias rules. To control for it we introduced an occupancy-ratio metric: at each distance from a landmark, what fraction of the available volume is occupied by puncta? Occupancy normalizes out the shape problem and lets us interpolate observed cells across simulated rules — and, crucially, mix rules together to test combined hypotheses. Weights fit from occupancy do better than any single rule alone.
body3: |
  The other direction we pushed in is colocalization. cellPACK can now run with one bias rule for the structure you care about plus an influencing organelle as a packing constraint. We tested ER and Golgi as influencers against peroxisomes and endosomes. ER + peroxisome and Golgi + endosome slightly improve or do not change the match; ER + endosome and Golgi + peroxisome make it worse. The directionality matters and gives us experimentally testable predictions. The full ecosystem — cellPACK Studio, BioFileFinder for the underlying data, Simularium for the rendered output — is at cellpack.allencell.org. CellScapes team: Saurabh Mogre, Ruge Li, Allison Scibisz, Thao Do, Julie Dixon, Matheus Viana, Ehssan Nazockdast, Susanne Rafelski, Julie Theriot (UW / HHMI), Graham Johnson, and me.
coverImage: /images/projects/cellpack/rules-triptych.jpg
---
