---
date: Oct 2023
read: 5 min read
tag:
  label: Research
title: Are peroxisomes randomly distributed?
excerpt: |
  First scientific application of the modernized cellPACK: using rule-based packing to test whether peroxisomes in hiPS cells are randomly arranged, nuclear-biased, or membrane-biased.
lead: |
  After a year of getting cellPACK back on its feet as a standalone Python package, we finally pointed it at a real biology question. Are peroxisomes — small, punctate organelles that detoxify molecules and break down fatty acids — randomly distributed in human iPS cells, or are they organized by some rule we haven't named yet?
body1: |
  The setup uses the Allen Institute hiPSC dataset: ~305 segmented images of cells with endogenously tagged peroxisomes (PMP34), each one a snapshot of the spatial distribution we're trying to explain. We generated equivalent populations of simulated cells with cellPACK under three hypotheses: peroxisomes distributed randomly throughout the cytoplasm, biased toward the nucleus, or biased toward the plasma membrane. Each simulated cell is rendered as a multi-channel voxelized image — the same format as the experimental data — so the same downstream analysis pipeline can compare them on equal footing.
h1: "PILR, and a clear winner"
body2: |
  We used PILR (Parameterized Intracellular Localization Reduction) — the Allen Institute's parameterized organelle-distribution pipeline — to compute the average distribution profile for each population: real peroxisomes, random simulated, nuclear-biased simulated, membrane-biased simulated. We then computed correlations between each simulated profile and the experimental profile. The result was satisfyingly clean: the nuclear-bias rule produced the highest correlation with the observed peroxisome distribution. Random and membrane bias correlated less well.
body3: |
  That's not a final answer — "nuclear bias" is a phenomenological description, not a mechanism — but it gives the cell biologists a candidate hypothesis to test experimentally. An abstract on this work was accepted for ASCB (we submitted to BPS too, awaiting decision). The team: Saurabh Mogre, Ruge Li, and me. We're working on extending to other punctate organelles like endosomes next, and getting the rule-mixing infrastructure ready for combined hypotheses.
coverImage: /images/posts/cellpack-cell-grid.jpg
---
