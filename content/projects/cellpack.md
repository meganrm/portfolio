---
title: cellPACK
year: "2013–present"
medium: Python · Simularium · Rule-based modeling
role: Visualization scientist · Co-lead
context: "Johnson Lab UCSF (2013–2016) · Allen Institute for Cell Science (2016–present)"
tone: sage
altTone: mustard
blurb: A virtual mesoscope. Originally a packing engine for building 3D cells from molecular ingredients; now a rule-based modeling toolkit for testing hypotheses about intracellular organization in human stem cells.
url: https://cellpack.allencell.org
tags:
  - label: Sci-Vis
  - label: Research
featured: true
pageTemplate: tool
heroImage: /images/projects/cellpack/hero.png
screenshotImage: /images/projects/cellpack/hiv.webp
lead: |
  Microscopy sees down to microns. X-ray crystallography sees down to atoms. The mesoscale — 10⁻⁷ to 10⁻⁸ meters, where individual proteins crowd against each other inside a cell — has no direct imaging method. cellPACK fills that gap: given a segmented volume and a library of molecular ingredients with rules for how they distribute, the engine packs them into 3D models you can render, simulate, or compare against experimental data. The project has gone through three distinct lives across thirteen years; this page walks through all of them.
sections:
  - id: origins
    title: Origins
    image: /images/projects/cellpack/systems.png
    imageAlt: "cellPACK recipe conversions from David Goodsell's paintings"
    content:
      - |
        cellPACK was originally developed by Graham Johnson and Ludovic Autin as Graham's thesis project with Art Olson at Scripps, published in Nature Methods in 2015 (Johnson et al., 12, 85–91). The premise: David Goodsell had been producing watercolor paintings of cellular interiors for decades, each one a hypothesis about how a real cell's mesoscale would look if you could see it. cellPACK is the software that turns those hypotheses into 3D models you can interrogate computationally.
      - |
        I joined Graham's lab at UCSF as a postdoc in 2013 to work on the tool. The library grew to five biological systems of increasing complexity: blood plasma, cytoplasm, synaptic vesicle, HIV-1, and a coarse whole-cell model. My own modeling work included LDL/HDL particles — a recipe of phospholipid, cholesterol, cholesteryl ester, and triglyceride packed under ApoB, ApoC, and ApoE. I mentored UC Berkeley students Mini Choi (rebuilding the blood plasma recipe), Sung Han (converting Stanford's WholeCellViz Mycoplasma genitalium data into a cellPACK model), and Caroline Chan (streamlining the 3D-grid bottleneck inside autoPACK). Funding from a QB3@UCSF Fellowship, the Mary Anne Koda-Kimble Seed Award, and Autodesk.
  - id: modernization
    title: Modernization
    image: /images/projects/simularium/viewer.png
    imageAlt: cellPACK output rendered in the Simularium web viewer
    content:
      - |
        The original cellPACK ran as a plugin inside proprietary 3D animation software, depended on deprecated packages. When I moved with Graham to the Allen Institute for Cell Science, modernizing the codebase became the prerequisite for everything else we wanted to do with it.
      - |
        Between 2021 and 2022, Saurabh Mogre, Ryan Spangler and I pulled the algorithm out of the 3D-software plugin shell and into a standalone Python package. We brought it under version control, open-sourced it, wrote real documentation, and aligned the codebase with AICS engineering standards. We built a converter from cellPACK output to simulariumio — so a cellPACK model can be opened directly in the Simularium web viewer with no install — and integrated cellPACK with the vivarium multi-modal simulation framework (Agmon, Spangler et al., Bioinformatics 38-7, 2022). The result is a packing engine that runs on the CPU, in Python, anywhere.
  - id: scientific-applications
    title: Scientific applications
    image: /images/projects/cellpack/rules-triptych.jpg
    imageAlt: "Three packing rules: empty cell, membrane bias, nucleus bias"
    content:
      - |
        Modernization turned cellPACK from an illustration tool into a hypothesis-testing tool. The question we asked first was almost embarrassingly basic: are punctate organelles like peroxisomes and endosomes distributed randomly inside a human iPS cell, or is there a spatial bias we've been missing? Using the WTC-11 hiPSC Single Cell Image Dataset — the same 200,000+ cell library behind the 2023 Nature paper on integrated intracellular organization (Viana et al.) — we generated cellPACK simulations under four simple rules: unbiased, nuclear bias, membrane bias, and apical bias.
      - |
        Then we built the spatial-statistics machinery to compare simulations to data: Earth mover's distance and Kolmogorov-Smirnov tests on distance distributions, with cell-and-nucleus-shape variation as the dominant confound. To control for that variation we introduced an occupancy-ratio metric — the available volume at each distance — which lets us mix bias rules and read out which mechanisms best match observation. The current finding: no single simple bias fully explains peroxisome distribution. ER and Golgi colocalization matter — ER + peroxisome slightly improves the match, ER + endosome worsens it — and the next round of rules will need to encode those organelle interactions explicitly.
      - |
        The work has been presented at ASCB and submitted to BPS. Saurabh Mogre is co-leading the modeling effort with me, and the larger team now includes Ruge Li, Allison Scibisz, Thao Do, Julie Dixon, Matheus Viana, Ehssan Nazockdast, Susanne Rafelski, Julie Theriot (University of Washington / HHMI), and Graham Johnson.
  - id: vision
    title: Vision
    content:
      - |
        cellPACK now sits inside a broader Allen Institute initiative called CellScapes — uncovering the design principles of multicellular programs essential for life. The vision is a connected ecosystem of visualization tools: a library of existing recipes you can edit, parameter-tune, and combine; datasets of cellular observations you can compare your models against; and interconnected analysis tools (cellPACK Studio, the Simularium viewer, BioFileFinder at bff.allencell.org) that let you move between hypothesis, simulation, comparison, and refinement without leaving the browser.
      - |
        The synthetic data cellPACK generates is also feeding back into machine learning work on intracellular organization — recently used for training and validating the point-cloud representation models in Vasan et al., Nature Methods 22, 1531–1544 (2025). The closer we get to a packing engine you can reason with, the more legible cellular self-assembly becomes — not just as art, but as biology.
---
