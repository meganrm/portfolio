---
date: Apr 2018
read: 6 min read
tag:
  label: Sci-Vis
title: Generating 3D meshes and ambient occlusion maps for three.js
excerpt: |
  A three-stage pipeline — UCSF Chimera, Cinema4D Python SDK, batch processing — for turning microscopy data into web-ready 3D assets.
lead: |
  Getting from raw microscopy data to a 3D mesh that renders well in a browser involves more steps than I expected. Here's the pipeline I landed on.
body1: |
  The first stage is UCSF Chimera: load the volumetric data, adjust voxel sizing, step size, and isovalue to get the surface you want, then export as a single nested .obj file. Chimera's .obj export has one advantage over ChimeraX: it packages everything in one file, which simplifies downstream handling.
h1: Baking ambient occlusion in Cinema4D
body2: |
  Stage two runs in Cinema4D via the Python SDK (uPy). The script imports the .obj, merges it with a starter file containing render settings, applies polygon reduction and smoothing via deformers, generates UV maps using spherical projection, then bakes ambient occlusion at 1024×2 resolution with a 3-pixel border. Key settings: Maximum Distortion = 1%, Relaxation Steps = 0.
body3: |
  The last stage loops through the full file list. Polygon count is the main variable that affects processing time — I found that reducing the polygon-reduction percentage from 90% dramatically improved performance without meaningful loss in visual quality at web resolutions. The output is a .obj plus a .png texture that three.js loads directly.
---
