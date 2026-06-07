---
date: May 2022
read: 5 min read
tag:
  label: Methods
title: Bringing cellPACK out of the box
excerpt: |
  How we pulled the cellPACK packing engine out of proprietary 3D-animation software, made it open source, and connected it to the Simularium web viewer.
lead: |
  cellPACK has been around since 2012 — originally Graham Johnson and Ludovic Autin's tool for translating David Goodsell's mesoscale paintings into 3D models. It's been beautiful, scientifically useful, and almost impossible for anyone but Ludo to actually run. This month we took the first big step toward fixing that.
body1: |
  The problem was architectural. cellPACK was built as a plugin for 3D animation software — mostly proprietary tools like Cinema 4D and Maya, with adaptors for a few free ones. Some plugins were stale; some features were broken; the underlying Python depended on packages that had been deprecated for years. The code wasn't open source in any meaningful sense, and it definitely wasn't up to AICS engineering standards. Functionally, if you wanted to run cellPACK, you needed to sit next to Ludo. That's a fine model for a thesis. It's not a model for software anyone else can use.
h1: Re-housing the engine
body2: |
  Over the last few months Saurabh Mogre, Ryan Spangler, and I have been doing the slow work of bringing cellPACK out of its plugin shell. We pulled the packing algorithm into a Python package template so the code can run independent of any 3D animation software. We brought it under version control, opened the repo, wrote real documentation, and aligned it with AICS code standards. We added a converter from cellPACK output to simulariumio, which means cellPACK models can now be opened directly in the Simularium web viewer with no install — and we added Simularium output as a first-class export target from cellPACK itself.
body3: |
  What this opens up is the part that excites me. cellPACK is no longer just an illustration tool for artists — it can be the spatial-initialization layer for actual biological simulations. We're already integrating with the vivarium multi-modal simulation framework (Eran Agmon, Ryan Spangler et al., Bioinformatics 38-7, 2022). The next post will be about pointing the modernized engine at a real question: are peroxisomes in hiPS cells randomly distributed, or do they follow some spatial rule? But none of that was possible until we got the engine running outside the plugin.
coverImage: /images/posts/cellpack-out-of-the-box/cover.webp
---
