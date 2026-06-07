export interface PostTag {
    label: string;
}

export interface Post {
    id: string;
    date: string;
    read: string;
    tag: PostTag;
    title: string;
    excerpt: string;
    lead: string;
    body1: string;
    h1: string;
    body2: string;
    body3: string;
    url?: string;
    coverImage?: string;
}

export const POSTS: Post[] = [
    {
        id: "integrated-intracellular-organization",
        date: "Jan 2023",
        read: "5 min read",
        tag: { label: "Research" },
        title: "A new mathematical framework for cellular organization",
        excerpt:
            "Our database of 200,000 cell images yields a new way to understand the interior design of human cells — published in Nature.",
        url: "https://www.nature.com/articles/s41586-022-05563-7",
        lead: "After years of building tools to measure and explore human iPS cells, we finally had enough data to ask bigger questions about how cells are organized — and the answers surprised us.",
        body1: "The Allen Institute's cell imaging pipeline had accumulated over 200,000 segmented cells, each measured across dozens of structural features. The Cell Feature Explorer made that dataset navigable. What the new Nature paper does is something different: it asks what mathematical structure underlies the variation we see.",
        h1: "The interior design of our cells",
        body2: "The finding is that cell organization isn't random — there's a coherent framework governing how organelles relate to each other in space, and how that organization varies across the population. The paper establishes that framework and makes predictions about how perturbations in one part of the cell ripple through the whole.",
        body3: "For me the paper is the culmination of years of visualization work. The tools we built to let researchers see and filter the data were what made it possible to notice the patterns in the first place. Good visualization doesn't just communicate findings — sometimes it's how the finding happens.",
    },
    {
        id: "imsc-one-cell-from-many",
        date: "Aug 2019",
        read: "6 min read",
        tag: { label: "Sci-Vis" },
        title: "Building one cell from many cells",
        excerpt:
            "Notes from a year of work on the Integrated Mitotic Stem Cell — how we turned fifteen separately-tagged cell lines into one 3D portrait of mitosis, and what showing it taught me.",
        url: "https://imsc.allencell.org",
        lead: "Mitosis is one of the most striking things a cell does, and one of the most photographed. Despite that, you almost never see all of a cell at once during it. You see microtubules, or you see DNA, or you see the nuclear envelope — but each of those is a different cell line, a different image, a different paper. The Integrated Mitotic Stem Cell (IMSC) was an attempt to put those views back together.",
        body1: "The Allen Institute for Cell Science maintains a library of CRISPR-edited human iPS cell lines, each with one endogenous fluorescent tag: TUBA1B for microtubules, LMNB1 for the nuclear envelope, SEC61B for ER, TOMM20 for mitochondria, ST6GAL1 for Golgi, and so on through fifteen structures. Each line is a window onto one component. The IMSC project asked: what if we combined those windows into a single composite view, with each structure shown at the same moment in the cell cycle, in the same coordinate frame? The answer was a visual essay and an interactive 3D viewer — published at imsc.allencell.org — where readers can toggle channels on and off, switch between mitotic phases, and explore the integrated cell themselves.",
        h1: "Aligning by DNA",
        body2: "The technical trick was a small one with a big payoff. Each cell line was imaged in random states of the cell cycle, but every line was also DNA-stained, so we could classify each cell into one of eight mitotic phases (M0 through M7, from interphase through anaphase-cytokinesis) by the shape and texture of its DNA. Then, because DNA was a shared landmark across all the lines, we could align cells across lines by DNA position and superimpose the segmented structures phase by phase. The result is a synthesis: at each stage of mitosis you can pull up an integrated cell showing every channel in correct spatial relationship to every other channel.",
        body3: "We presented the work in three contexts over the course of 2019: a poster at the Gordon Research Conference on Visualization in Science & Education in the summer, a co-presentation with Chris Frink (Allen Institute) at the Allen Cell Science Symposium, and a review at the Allen Institute Scientific Advisory Board meeting. The most useful response came from the SAB: scientists could see their own data through the early prototype more clearly than through the traditional software they were using, and the conversations that followed sharpened how we framed the integrated view. That loop — visualization driving science driving visualization — was the through-line of the talk I gave a year later. The IMSC team: Thao Do, Caroline Hookway, Gabe Medrash, Lisa Schaefbauer, Dan Toloudis, Matheus Viana, Susanne Rafelski, Graham Johnson, and me.",
    },
    {
        id: "simularium-publication",
        date: "Apr 2022",
        read: "4 min read",
        tag: { label: "Sci-Vis" },
        title: "Simularium: sharing biological simulations as easily as a link",
        excerpt:
            "Our paper in Nature Methods — an interactive web viewer for spatiotemporal biological models, built to remove the friction between simulation and collaboration.",
        url: "https://doi.org/10.1038/s41592-022-01442-1",
        lead: "Biological simulations are among the most information-dense artifacts in science. They also tend to be among the hardest to share. Simularium was built to change that.",
        body1: "Most computational biology tools run on specialized hardware, require specific software, and demand a certain fluency to operate. The result is that a simulation is often accessible only to the person who ran it — which limits collaboration, peer review, and public communication of findings.",
        h1: "From file to browser",
        body2: "Simularium defines an open file format that simulations from diverse tools can be exported to, and a web viewer that renders them interactively — step through time, filter agents, change visual encoding, examine individual molecules. No install. Just a link.",
        body3: "The paper was published in Nature Methods in 2022, with a team spanning the Allen Institute and collaborating institutions. The viewer is open source and actively used by researchers sharing models that would previously have required a live demo to communicate.",
    },
    {
        id: "data-to-knowledge",
        date: "Apr 2020",
        read: "5 min read",
        tag: { label: "Essay" },
        title: "Data → knowledge: the visualization scientist's bet",
        excerpt:
            "Notes from a job talk. In every subdiscipline of biology, data is outstripping our ability to analyze it. What does it take to bridge the gap?",
        lead: "I gave a job talk in the spring of 2020 about my work in Graham Johnson's lab. The four projects I walked through — a chemical cross-linker, a signaling-pathway visualization tool, lattice light sheet cell migration, and cellPACK — looked unrelated on the surface. The bet of the talk was that they aren't.",
        body1: "In every subdiscipline of biology — cellular, sub-cellular, macromolecular, molecular, atomic — the generation of data has been outpacing our ability to extract knowledge from it. Cell biologists, biochemists, chemical biologists, chemists. We have microscopy data we can't fully interpret, phosphoproteomics datasets bigger than we can mine, structural models of organelles we can't easily put in spatial context. The bottleneck is no longer measurement. It's translation.",
        h1: "Tools as translators",
        body2: "What the four projects share is that each is a translation tool. The cross-linker translates a phosphoprotein into the kinase that modified it. sigViz translates a signaling network into something biologists without a programming background can map and animate. The cell migration work translates 60 GB of 4D microscopy into 2D images you can publish and a 3D-printed exhibit you can crank. cellPACK translates concentrations, structures, and ultrastructure into stochastic 3D models of cellular environments.",
        body3: "The phrase I keep coming back to, from the Chemistry & Biology cover of my dissertation work in 2014, is bringing something into focus. Each of these tools is a way of focusing some part of biology that wasn't legible before. The visualization scientist's bet is that this is a discipline of its own — that there's craft and method in building the bridge, and that the bridge is what most current science is missing.",
        coverImage: "/images/data-to-knowledge.png",
    },
    {
        id: "motion-in-static-images",
        date: "Mar 2020",
        read: "4 min read",
        tag: { label: "Methods" },
        title: "Communicating motion in static images",
        excerpt:
            "Cave paintings, Muybridge, Duchamp. The 4D cell visualization problem is an old one, and the lineage is more useful than the software.",
        lead: "Lattice light sheet microscopy produces full 3D volumes every fraction of a second. A typical migrating cell yields a 4D dataset — three spatial dimensions plus time — that a biologist needs to interpret quickly enough to form hypotheses about it. The native medium for that interpretation is still a 2D page. How do you compress 4D into 2D without losing what makes the cell legible as a moving object?",
        body1: "The first place I looked for prior art was, oddly, the cave at Chauvet. The 32,000-year-old bison drawings show extra legs, ghosted heads — motion compressed into a single static figure. That's the same problem. Muybridge's 1878 horse-in-motion plates solved it differently: time made discrete, laid out in a strip. Duchamp's Nude Descending a Staircase (1912) does both — superimposed phases of motion in a single composition. Each is an answer to the question of how a static image can encode change.",
        h1: "What I borrowed",
        body2: "For the HL60 migrating-cell work in the Mullins lab, I tried three encodings. First: classical frame strips at 18.8-second intervals — the Muybridge solution — for cell shape over time. Second: time-coded volumetric overlays where each color represents a 4-second window of protrusion activity, so an entire 16-second cycle of cell extension reads as a single Duchamp-like figure. Third: 3D-printed cells from the volumetric data, mounted on a hand crank for the Exploratorium so visitors could turn the time axis themselves. Each one trades different things: legibility for completeness, single-glance reading for full reconstruction.",
        body3: "The lesson is that the visualization problem for live cell imaging isn't a software problem — Chimera, Imaris, FIJI all render 4D fine. It's a representational problem, and there's a long lineage of solutions outside biology that I think we under-borrow from. The image you can hold in your head matters more than the volume rendering you can rotate.",
        coverImage: "/images/motion-muybridge.png",
    },
    {
        id: "3d-meshes-threejs",
        date: "Apr 2018",
        read: "6 min read",
        tag: { label: "Sci-Vis" },
        title: "Generating 3D meshes and ambient occlusion maps for three.js",
        excerpt:
            "A three-stage pipeline — UCSF Chimera, Cinema4D Python SDK, batch processing — for turning microscopy data into web-ready 3D assets.",
        lead: "Getting from raw microscopy data to a 3D mesh that renders well in a browser involves more steps than I expected. Here's the pipeline I landed on.",
        body1: "The first stage is UCSF Chimera: load the volumetric data, adjust voxel sizing, step size, and isovalue to get the surface you want, then export as a single nested .obj file. Chimera's .obj export has one advantage over ChimeraX: it packages everything in one file, which simplifies downstream handling.",
        h1: "Baking ambient occlusion in Cinema4D",
        body2: "Stage two runs in Cinema4D via the Python SDK (uPy). The script imports the .obj, merges it with a starter file containing render settings, applies polygon reduction and smoothing via deformers, generates UV maps using spherical projection, then bakes ambient occlusion at 1024×2 resolution with a 3-pixel border. Key settings: Maximum Distortion = 1%, Relaxation Steps = 0.",
        body3: "The last stage loops through the full file list. Polygon count is the main variable that affects processing time — I found that reducing the polygon-reduction percentage from 90% dramatically improved performance without meaningful loss in visual quality at web resolutions. The output is a .obj plus a .png texture that three.js loads directly.",
    },
    {
        id: "white-blood-cells",
        date: "Nov 2016",
        read: "4 min read",
        tag: { label: "Research" },
        title: "How do white blood cells move in 3D environments?",
        excerpt:
            "A research write-up and interview about our work on fast-moving immune cells — using lattice light sheet microscopy and custom visualization tools.",
        url: "https://www.ucsf.edu/news/2016/11/404936/science-focus-how-do-white-blood-cells-move-so-fast",
        lead: "White blood cells are among the fastest-moving cells in the body. Understanding how they move — really how, at the level of what the actin cytoskeleton is doing — requires seeing them in 3D, live, at high speed. That's what lattice light sheet microscopy makes possible.",
        body1: "Working with Lillian Fritz-Laylin in the Mullins Cell Biology Lab at UCSF, I developed visualization and analysis tools for the 3D time-series data coming off the lattice light sheet microscope. The raw output was enormous — roughly 60 GB per cell — full 3D volumes acquired every few seconds as cells crawled through labeled and unlabeled collagen matrices. The UCSF Chimera vseries toolkit, developed by Tom Goddard in the Ferrin Lab, was the foundation: aligning, normalizing, and compressing the volumes down to about 6 GB while preserving the surface detail needed for analysis.",
        h1: "Communicating motion in static images",
        body2: "The visualization challenge was turning four-dimensional data into something a biologist could interpret quickly — and that meant solving a much older problem. Muybridge's galloping horse, cave drawings of running bison, Duchamp's Nude Descending a Staircase: people have been trying to compress motion into static images for a very long time. I borrowed from that lineage. I rendered the cells with tonal shading and surface topology cues, and built time-coded composites — color-mapped protrusions across a 16-second window, frame strips at 18.8-second intervals — that made it possible to read protrusion dynamics at a glance: where the cell was extending, where it was retracting, how the whole structure was coordinating.",
        body3: "The work was covered as part of UCSF's Science Focus series, and the cell models eventually became the basis for an Exploratorium exhibit, A Cell in Motion, in Gallery 4: Living Systems — 3D-printed cells from the lattice light sheet data, mounted on a hand crank visitors could turn. The broader scientific finding was that these cells use protrusions primarily for environmental interrogation — sensing the spatial and chemical composition of their surroundings — rather than directly for locomotion. A distinction that only becomes visible when you can watch the whole 3D cell in motion.",
        coverImage: "/images/hl60-rosettes.png",
    },
    {
        id: "crosslinker-into-focus",
        date: "May 2014",
        read: "4 min read",
        tag: { label: "Research" },
        title: "A tool that brings molecular biology into focus",
        excerpt:
            "Notes on the Chemistry & Biology cover and the metaphor it set up — kinase substrate pairs, but also everything I've made since.",
        url: "https://doi.org/10.1016/j.chembiol.2014.02.022",
        lead: "My dissertation paper came out today in Chemistry & Biology. The cover is an illustration I made for it — kinase active sites in muted gray, the new cross-linker structures in the foreground in deep orange and burgundy — under the line \"Crosslinker Brings Kinase-Substrate Pairs Into Focus.\"",
        body1: "The chemistry is described in the paper. The short version: kinases transfer a γ-phosphate from ATP to a substrate hydroxyl, the small-molecule ATP is a promiscuous binder, and so the specificity of the reaction lives in the kinase-substrate interaction itself. I designed an ATP analog that, when held in the active site by a real substrate, forms a covalent bond between the two proteins rather than completing the phosphate transfer. The pair gets stuck together long enough to identify.",
        h1: "The metaphor",
        body2: "What I keep thinking about, two weeks after the paper came out, is the cover line. \"Bringing kinase-substrate pairs into focus\" describes what this cross-linker does. But it also describes what makes a tool worth building, in general. Most of biology — at the scale where I work — is invisible by default. The interactions are too fast, too crowded, too small, or too rare to resolve. The job of the tool, whether it's chemistry or microscopy or molecular illustration, is to bring one specific thing into focus so it can be studied.",
        body3: "I'm finishing the dissertation now and starting to think about what comes next. Whatever it is, I want it to keep that property. Build the lens. Bring the thing into focus. Then let other people use the focus to learn something I couldn't have predicted.",
        coverImage: "/images/chem-biol-cover.png",
    },
];
