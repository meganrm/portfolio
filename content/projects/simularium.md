---
public: false
title: Simularium
year: "2022"
medium: TypeScript · WebGL
role: Visualization engineer
context: Allen Institute for Cell Science
tone: teal
altTone: mustard
blurb: An interactive web tool for viewing and sharing spatiotemporal biological simulations.
url: https://simularium.allencell.org
tags:
  - label: Sci-Vis
  - label: Research
featured: true
pageTemplate: tool
heroImage: /images/projects/simularium/hero.gif
screenshotImage: /images/projects/simularium/viewer.png
processImage: /images/projects/simularium/viewer.png
detailImage: /images/projects/simularium/virtual-cell-goal.png
lead: |
  Simularium lets researchers view, explore, and share spatiotemporal biological simulations directly in the browser — no specialized software required.
body1: |
  The computational modeling ecosystem in biology is enormous and fragmented. Molecular dynamics tools like GROMACS and NAMD run at the atomic scale; ReaDDy, Smoldyn, and MCell handle reaction-diffusion at the molecular scale; Cytosim and MEDYAN simulate cytoskeletal dynamics; PhysiCell, CompuCell3D, and Morpheus model cells as agents. Each speaks its own file format, its own visualization conventions, its own install dance. The result is that a simulation is often legible only to the person who ran it.
quote: The best visualization tool is the one a collaborator can open without installing anything.
body2: |
  Simularium was built as a common viewer for that ecosystem. The project defines an open file format that simulations from diverse tools can export to, and a web viewer that renders them interactively — step through time, filter agents, change visual encoding, plot quantities alongside the 3D scene. I worked across the full visualization stack: designing the 3D rendering pipeline, building the UI, and collaborating on the file format spec. The viewer handles models ranging from molecular dynamics to whole-cell agent-based simulations, and the published trajectories range from clathrin-mediated endocytosis to biomolecular condensate buffering work in eLife.
body3: |
  Simularium was published in Nature Methods in 2022. Beyond researcher-to-researcher use, it became the substrate for the Binding Affinity education module — the first of a planned series of interactive simulation lessons. The long-term goal Graham Johnson and I have talked about for years sits behind all of this: a completely virtual cell that anyone with a browser can step into and explore.
---
