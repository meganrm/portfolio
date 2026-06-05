export type Tone = 'teal' | 'mustard' | 'clay' | 'sage' | 'ink'

export interface ProjectTag {
  label: string
  tone: 'teal' | 'mustard' | 'clay' | 'sage'
}

export interface Project {
  id: string
  title: string
  year: string
  medium: string
  role: string
  context: string
  tone: Tone
  altTone: Tone
  blurb: string
  tags: ProjectTag[]
  lead: string
  body1: string
  quote: string
  body2: string
  body3: string
  url?: string
  heroImage?: string
  processImage?: string
  detailImage?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'simularium',
    title: 'Simularium',
    year: '2022',
    medium: 'TypeScript · WebGL',
    role: 'Visualization engineer',
    context: 'Allen Institute for Cell Science',
    tone: 'teal',
    altTone: 'mustard',
    blurb: 'An interactive web tool for viewing and sharing spatiotemporal biological simulations.',
    url: 'https://simularium.allencell.org',
    tags: [
      { label: 'Sci-Vis', tone: 'mustard' },
      { label: 'Research', tone: 'teal' },
    ],
    lead: 'Simularium lets researchers view, explore, and share spatiotemporal biological simulations directly in the browser — no specialized software required.',
    body1: 'Biological simulations produce rich, multi-dimensional data that normally lives locked in desktop tools accessible only to specialists. The goal of Simularium was to make that data as easy to share as a link — so a computational biologist could hand a simulation to a cell biologist and have them explore it together.',
    quote: 'The best visualization tool is the one a collaborator can open without installing anything.',
    body2: 'I worked across the full visualization stack: designing the 3D rendering pipeline, building interactive UI for stepping through time and filtering agents, and collaborating on file format specs so simulations from diverse tools could be imported. The viewer handles models ranging from molecular dynamics to whole-cell agent-based simulations.',
    body3: 'Simularium was published in Nature Methods in 2022. It\'s now used by researchers across institutions to share models that would previously have required a demo over video call.',
    heroImage: '/images/simularium.gif',
    processImage: '/images/cell-motion.gif',
    detailImage: '/images/cell-feature-explorer.png',
  },
  {
    id: 'town-hall-project',
    title: 'Town Hall Project',
    year: '2017',
    medium: 'JavaScript · Mapping',
    role: 'Lead developer',
    context: 'Nonprofit civic tech',
    tone: 'mustard',
    altTone: 'clay',
    blurb: 'Tracking and publishing every public town hall held by a member of Congress — searchable, interactive, nationwide.',
    url: 'https://townhallproject.com',
    tags: [
      { label: 'Civic Tech', tone: 'sage' },
      { label: 'Data Viz', tone: 'teal' },
    ],
    lead: 'Town Hall Project researches and publishes every town hall event held by a member of Congress in a searchable interactive map, holding lawmakers accountable to their constituents.',
    body1: 'I joined in early 2017 and built the original website and interactive map, transforming a volunteer-maintained Google spreadsheet into what became a nationally recognized civic data resource. Within months we had 100,000 users and a dataset of 25,000+ lawmaker events.',
    quote: 'The Missing Member Report documented 193 members of Congress with zero public town halls in the first five months of 2017.',
    body2: 'Beyond the map, I built SMS and email alert systems so constituents could get notified when their representative scheduled an event nearby. The project added an SMS alerting system, an email digest, and eventually expanded to mayoral races and state legislative races — over 100,000 races tracked.',
    body3: 'Town Hall Project partnered with 50+ organizations including the ACLU, Sierra Club, Indivisible, and March for Our Lives, and received coverage in the Washington Post, New York Times, BBC, MSNBC, Politico, and PBS. 44 Town Hall Pledge candidates won their races in 2018.',
    heroImage: '/images/town-hall.png',
    processImage: '/images/indivisible.png',
  },
  {
    id: 'cell-feature-explorer',
    title: 'Cell Feature Explorer',
    year: '2020',
    medium: 'React · D3 · WebGL',
    role: 'Visualization engineer',
    context: 'Allen Institute for Cell Science',
    tone: 'sage',
    altTone: 'teal',
    blurb: 'Giving researchers interactive access to a database of 200,000+ segmented and measured human stem cells.',
    url: 'https://cfe.allencell.org',
    tags: [
      { label: 'Sci-Vis', tone: 'mustard' },
      { label: 'Research', tone: 'teal' },
    ],
    lead: 'The Cell Feature Explorer makes a database of over 200,000 segmented human iPS cells interactively accessible — letting researchers filter, visualize, and compare cells by any measured structural feature.',
    body1: 'The Allen Institute\'s cell database is one of the largest of its kind: hundreds of thousands of cells, each segmented in 3D and measured across dozens of structural features. The challenge was making that richness legible without drowning the researcher in options.',
    quote: 'Good tools let the data ask questions back.',
    body2: 'I designed the interactive scatter plots, 3D cell viewers, and filtering controls that let researchers explore the full dataset. A key design decision was linking the 2D statistical plots directly to 3D cell renderings — select a cluster of outliers in the scatter plot and the corresponding cells light up in 3D.',
    body3: 'The Cell Feature Explorer underpinned the 2023 Nature paper "Integrated intracellular organization and its variations in human iPS cells" — a new mathematical framework for understanding cellular building blocks derived from that 200,000-cell database.',
    heroImage: '/images/cell-feature-explorer.png',
    processImage: '/images/mitochondria.png',
    detailImage: '/images/cell-motion.gif',
  },
  {
    id: 'mutual-aid-hub',
    title: 'Mutual Aid Hub',
    year: '2020',
    medium: 'React · Mapbox',
    role: 'Lead developer',
    context: 'Town Hall Project',
    tone: 'clay',
    altTone: 'sage',
    blurb: 'A searchable map connecting people with mutual aid networks and food resources during COVID-19.',
    url: 'https://mutualaidhub.org',
    tags: [
      { label: 'Civic Tech', tone: 'sage' },
      { label: 'Data Viz', tone: 'teal' },
    ],
    lead: 'When COVID-19 lockdowns hit and mutual aid networks were forming faster than anyone could track, the Town Hall Project team pivoted to build a tool to help people find — and start — networks in their communities.',
    body1: 'Mutual aid networks were appearing overnight in neighborhoods across the country, but there was no way to find them. People who wanted to help couldn\'t locate their local network; people who needed help couldn\'t either. We built Mutual Aid Hub to solve the discovery problem.',
    quote: 'Help people find each other first. Everything else follows.',
    body2: 'I built the application using React, Mapbox, and Google Firestore, with a volunteer researcher team maintaining the underlying data. The map covered mutual aid networks and food resources nationwide and updated continuously as new networks formed.',
    body3: 'Beyond the map, we saw a second need: many communities didn\'t have a network yet. We organized events connecting people who wanted to start one with others in their area, turning the tool from a directory into a community-building platform.',
    heroImage: '/images/mutual-aid-hub.png',
    processImage: '/images/indivisible.png',
  },
]
