---
public: false
title: 3D Cell Migration
year: "2014–2016"
medium: UCSF Chimera · Cinema 4D · Lattice light sheet
role: Postdoctoral scholar
context: Johnson Lab UCSF · Mullins Lab UCSF
tone: clay
altTone: sage
blurb: Visualization, analysis, and 3D-printed museum exhibit for fast-moving white blood cells imaged by lattice light sheet microscopy.
url: https://www.exploratorium.edu/visit/east-gallery/cell-motion
tags:
  - label: Sci-Vis
  - label: Research
pageTemplate: visual
heroImage: /images/projects/cell-migration-3d/hero.png
processImage: /images/projects/cell-migration-3d/motion.png
detailImage: /images/projects/cell-migration-3d/exploratorium-exhibit.png
lead: |
  White blood cells are some of the fastest-moving cells in the body, and lattice light sheet microscopy is one of the few tools that can record them in full 3D, live. The data is rich — 60 GB per cell — and almost unreadable as raw stacks. This was a project about turning that data into images you can think with, and eventually into an object you can put your hands on.
body1: |
  I worked in parallel between two UCSF labs: Graham Johnson's, where my appointment lived, and R. Dyche Mullins', where Lillian Fritz-Laylin was running the cell migration experiments. The microscope was Eric Betzig and Bi-Chang Chen's lattice light sheet system; the cells were HL60s — a human promyelocytic-leukemia line that behaves like fast-moving neutrophils. Each acquisition produced a 4D dataset (3D volume × time) of a cell crawling either on glass or through a labeled or unlabeled collagen matrix.
quote: A protrusion you can study is a protrusion you can name.
body2: |
  The Chimera vseries toolkit — built by Tom Goddard in Tom Ferrin's lab — was the backbone of the pipeline: aligning, normalizing, and compressing the volumes down from ~60 GB to ~6 GB while preserving surface detail. On top of that I built representations meant to make 4D data readable on a 2D page: tonally-shaded surface renders, Muybridge-style frame strips at fixed time intervals, and time-coded composites where each protrusion phase reads as a different color in a single integrated figure. Looking at the cells this way let us define a previously unnamed protrusion type — "rosettes" — and characterize how cells switch protrusion modes between flat and 3D environments.
body3: |
  The work was covered in UCSF's Science Focus series, and the 3D-printed cell models became the basis for an Exploratorium exhibit, A Cell in Motion, in Gallery 4: Living Systems. Visitors turn a hand crank to move a cell through time — a tactile version of the same dataset that produced the figures in the paper. Whole-cell visualization wasn't separate from the science; it was how we noticed that the protrusions were doing environmental interrogation, not directly driving motion.
---
