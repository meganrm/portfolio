export interface PostTag {
    label: string;
    tone: "teal" | "mustard" | "clay" | "sage";
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
}

export const POSTS: Post[] = [
    {
        id: "integrated-intracellular-organization",
        date: "Jan 2023",
        read: "5 min read",
        tag: { label: "Research", tone: "teal" },
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
        id: "simularium-publication",
        date: "Apr 2022",
        read: "4 min read",
        tag: { label: "Sci-Vis", tone: "mustard" },
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
        id: "3d-meshes-threejs",
        date: "Apr 2018",
        read: "6 min read",
        tag: { label: "Methods", tone: "teal" },
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
        read: "3 min read",
        tag: { label: "Research", tone: "teal" },
        title: "How do white blood cells move in 3D environments?",
        excerpt:
            "A research write-up and interview about our work on fast-moving immune cells — using lattice light sheet microscopy and custom visualization tools.",
        url: "https://www.ucsf.edu/news/2016/11/404936/science-focus-how-do-white-blood-cells-move-so-fast",
        lead: "White blood cells are among the fastest-moving cells in the body. Understanding how they move — really how, at the level of what the actin cytoskeleton is doing — requires seeing them in 3D, live, at high speed. That's what lattice light sheet microscopy makes possible.",
        body1: "Working with Lillian Fritz-Laylin in the Mullins Cell Biology Lab at UCSF, I developed visualization and analysis tools for the 3D time-series data coming off the lattice light sheet microscope. The data is rich and fast: full 3D volumes acquired every few seconds as cells crawl through collagen matrices.",
        h1: "From data to insight",
        body2: "The visualization challenge was turning four-dimensional data into something a biologist could interpret quickly. I used Cinema4D alongside custom analysis scripts to render the cells with tonal shading and surface topology cues that made it possible to see protrusion dynamics — where the cell is extending, where it's retracting, how the whole structure is coordinating.",
        body3: "The work was covered as part of UCSF's Science Focus series. The broader finding was that these cells use protrusions primarily for environmental interrogation — sensing the spatial and chemical composition of their surroundings — rather than directly for locomotion. A distinction that only becomes visible when you can watch the whole 3D cell in motion.",
    },
];
