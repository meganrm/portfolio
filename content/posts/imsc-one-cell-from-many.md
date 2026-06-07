---
date: Aug 2019
read: 6 min read
tag:
  label: Sci-Vis
title: Building one cell from many cells
excerpt: |
  Notes from a year of work on the Integrated Mitotic Stem Cell — how we turned fifteen separately-tagged cell lines into one 3D portrait of mitosis, and what showing it taught me.
url: https://imsc.allencell.org
lead: |
  Mitosis is one of the most striking things a cell does, and one of the most photographed. Despite that, you almost never see all of a cell at once during it. You see microtubules, or you see DNA, or you see the nuclear envelope — but each of those is a different cell line, a different image, a different paper. The Integrated Mitotic Stem Cell (IMSC) was an attempt to put those views back together.
body1: |
  The Allen Institute for Cell Science maintains a library of CRISPR-edited human iPS cell lines, each with one endogenous fluorescent tag: TUBA1B for microtubules, LMNB1 for the nuclear envelope, SEC61B for ER, TOMM20 for mitochondria, ST6GAL1 for Golgi, and so on through fifteen structures. Each line is a window onto one component. The IMSC project asked: what if we combined those windows into a single composite view, with each structure shown at the same moment in the cell cycle, in the same coordinate frame? The answer was a visual essay and an interactive 3D viewer — published at imsc.allencell.org — where readers can toggle channels on and off, switch between mitotic phases, and explore the integrated cell themselves.
h1: Aligning by DNA
body2: |
  The technical trick was a small one with a big payoff. Each cell line was imaged in random states of the cell cycle, but every line was also DNA-stained, so we could classify each cell into one of eight mitotic phases (M0 through M7, from interphase through anaphase-cytokinesis) by the shape and texture of its DNA. Then, because DNA was a shared landmark across all the lines, we could align cells across lines by DNA position and superimpose the segmented structures phase by phase. The result is a synthesis: at each stage of mitosis you can pull up an integrated cell showing every channel in correct spatial relationship to every other channel.
body3: |
  We presented the work in three contexts over the course of 2019: a poster at the Gordon Research Conference on Visualization in Science & Education in the summer, a co-presentation with Chris Frink (Allen Institute) at the Allen Cell Science Symposium, and a review at the Allen Institute Scientific Advisory Board meeting. The most useful response came from the SAB: scientists could see their own data through the early prototype more clearly than through the traditional software they were using, and the conversations that followed sharpened how we framed the integrated view. That loop — visualization driving science driving visualization — was the through-line of the talk I gave a year later. The IMSC team: Thao Do, Caroline Hookway, Gabe Medrash, Lisa Schaefbauer, Dan Toloudis, Matheus Viana, Susanne Rafelski, Graham Johnson, and me.
---
