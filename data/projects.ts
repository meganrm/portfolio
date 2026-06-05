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
}

export const PROJECTS: Project[] = [
  {
    id: 'cells',
    title: 'Ten Million Cells',
    year: '2025',
    medium: 'WebGPU · three.js',
    role: 'Lead engineer & design',
    context: 'Allen Institute',
    tone: 'teal',
    altTone: 'mustard',
    blurb: 'Rendering a whole tissue sample in the browser, in real time.',
    tags: [
      { label: 'Sci-Vis', tone: 'mustard' },
      { label: 'Research', tone: 'teal' },
    ],
    lead: 'A browser-based renderer that draws ten million segmented cells at interactive frame rates — no install, no download, just a link.',
    body1: 'Most cell-science visualization lives in heavy desktop software. We wanted something a collaborator could open on a laptop and explore in seconds. The challenge was scale: ten million instanced meshes, each with its own data, lit and shaded in real time.',
    quote: 'Scale isn’t just a performance problem — it changes what questions you can ask.',
    body2: 'We built a GPU-driven pipeline on WebGPU with level-of-detail instancing and a compute pass for per-cell coloring. The result holds 60fps on integrated graphics while letting researchers recolor the whole population by any measured property.',
    body3: 'Beyond the engineering, the project was an exercise in legibility: choosing palettes that survive density, designing camera moves that orient rather than dazzle, and knowing when to hide data so the structure can speak.',
  },
  {
    id: 'fieldnotes',
    title: 'Field Notes',
    year: '2024',
    medium: 'Oil on linen',
    role: 'Artist',
    context: 'Studio series',
    tone: 'clay',
    altTone: 'sage',
    blurb: 'A series translating confocal microscopy into paint.',
    tags: [{ label: 'Fine Art', tone: 'clay' }],
    lead: 'Twelve paintings that take confocal microscopy as their source — the body seen at the scale of the cell, rebuilt by hand in oil.',
    body1: 'Working in visualization all day, I kept noticing how much interpretation hides inside a ‘neutral’ scientific image: the choice of stain, the gamma curve, the color map. Painting let me make those choices visible and personal.',
    quote: 'The microscope and the brush are both instruments for deciding what to notice.',
    body2: 'Each piece begins from a real dataset, then departs. Color is heightened, structure is simplified, and the grid of the imaging plate dissolves into the weave of the linen.',
    body3: 'Shown together, the series asks a quiet question about objectivity in scientific imaging — and about how much of what we ‘see’ under the microscope we have, in fact, designed.',
  },
  {
    id: 'atlas',
    title: 'Civic Atlas',
    year: '2023',
    medium: 'D3 · React',
    role: 'Engineer & designer',
    context: 'Civic tech',
    tone: 'sage',
    altTone: 'teal',
    blurb: 'Making municipal open data legible for residents.',
    tags: [
      { label: 'Civic Tech', tone: 'sage' },
      { label: 'Data Viz', tone: 'teal' },
    ],
    lead: 'An interactive atlas that turns a city’s open datasets into maps and charts a resident can actually read and act on.',
    body1: 'Open data is only open if people can understand it. Civic Atlas wraps raw municipal feeds in plain-language framing, accessible color, and small interactive maps designed for phones first.',
    quote: 'Transparency without legibility is just a different kind of opacity.',
    body2: 'I designed the system around a tight, high-contrast palette and a component kit any city could re-skin. The hardest design work was editorial: deciding which numbers matter and how to honestly frame uncertainty.',
    body3: 'The tool shipped for one city and has since been adapted by two others — a small, durable piece of public infrastructure.',
  },
  {
    id: 'theater',
    title: 'Protein Theater',
    year: '2022',
    medium: 'Python · Blender',
    role: 'Visualization',
    context: 'Outreach',
    tone: 'mustard',
    altTone: 'clay',
    blurb: 'Short films that stage molecular machines as drama.',
    tags: [
      { label: 'Sci-Vis', tone: 'mustard' },
      { label: 'Outreach', tone: 'clay' },
    ],
    lead: 'A set of short animated films that treat molecular machines like actors — staging, lighting, and pacing the choreography of the cell.',
    body1: 'Molecular animation usually aims for accuracy or for spectacle. Protein Theater tries to hold both, borrowing the grammar of film — establishing shots, close-ups, rhythm — to make complex processes followable.',
    quote: 'If you can stage it like a scene, an audience can follow it like a story.',
    body2: 'I built a Python toolchain to drive Blender from structural data, so the films stay faithful to the science while giving an animator real directorial control over camera and light.',
    body3: 'The films have been used in classrooms and museum installations, reaching audiences who would never open a structure viewer.',
  },
]
