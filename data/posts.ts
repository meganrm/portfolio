export interface PostTag {
  label: string
  tone: 'teal' | 'mustard' | 'clay' | 'sage'
}

export interface Post {
  id: string
  date: string
  read: string
  tag: PostTag
  title: string
  excerpt: string
  lead: string
  body1: string
  h1: string
  body2: string
  body3: string
}

export const POSTS: Post[] = [
  {
    id: 'ten-million',
    date: 'May 2025',
    read: '8 min read',
    tag: { label: 'Sci-Vis', tone: 'mustard' },
    title: 'Rendering ten million cells in the browser',
    excerpt: 'What it took to draw a whole tissue sample at 60fps with WebGPU — and why the hardest problems were about color, not compute.',
    lead: 'When we set out to render ten million cells in a browser tab, I assumed the whole project would be a performance fight. It was — but the performance was the easy part.',
    body1: 'The compute story is real: GPU-driven instancing, a level-of-detail scheme, and a per-cell coloring pass got us to interactive frame rates on modest hardware. I’ll write that up separately. But the part that consumed our design energy was legibility.',
    h1: 'Color at density',
    body2: 'At ten million overlapping translucent cells, most color maps collapse into mud. We needed palettes that hold structure under heavy overdraw — which meant fewer hues, more value contrast, and a lot of testing against real data.',
    body3: 'The lesson I keep relearning: at scale, the question stops being ‘can we draw it’ and becomes ‘what should we draw, and what should we leave out so the structure can be seen.’',
  },
  {
    id: 'why-i-paint',
    date: 'Nov 2024',
    read: '6 min read',
    tag: { label: 'Fine Art', tone: 'clay' },
    title: 'Why I paint what I study',
    excerpt: 'A studio series translating microscopy into oil — and what painting taught me about the hidden choices inside a ‘neutral’ scientific image.',
    lead: 'I spend my days making scientific images legible. In the evenings, I paint them — by hand, in oil, slowly. The two practices have started to talk to each other.',
    body1: 'Painting a microscopy image forces a hundred small decisions that software usually makes invisibly: where the edge is, how saturated the stain really was, which structure to bring forward.',
    h1: 'Designed objectivity',
    body2: 'It made me newly aware of how much interpretation hides inside a ‘raw’ scientific image. The color map is a choice. The contrast curve is a choice. None of it is neutral.',
    body3: 'I don’t think that undermines the science — it just means the visualization is an argument, made carefully, and worth examining as one.',
  },
  {
    id: 'color-for-data',
    date: 'Aug 2024',
    read: '5 min read',
    tag: { label: 'Methods', tone: 'teal' },
    title: 'Notes on color for scientific data',
    excerpt: 'A working set of rules I keep coming back to for choosing color maps that are honest, accessible, and actually readable.',
    lead: 'Color is the first thing people notice about a visualization and the last thing we tend to design carefully. Here are the rules I keep returning to.',
    body1: 'Start from value, not hue. If your map doesn’t read in grayscale, it won’t read for a colorblind viewer or in a bad projector either.',
    h1: 'Honesty over beauty',
    body2: 'Rainbow maps lie — they invent edges that aren’t in the data. Perceptually uniform maps are the safe default, and a tight two- or three-color brand palette can carry surprisingly far.',
    body3: 'Most of all: test against the real data, at the real density, on the real screen. Color decisions made on a swatch never survive contact with ten million cells.',
  },
  {
    id: 'civic-scale',
    date: 'Mar 2023',
    read: '7 min read',
    tag: { label: 'Civic Tech', tone: 'sage' },
    title: 'Civic data, human scale',
    excerpt: 'Building an open-data atlas taught me that transparency without legibility is just a different kind of opacity.',
    lead: 'A city can publish every dataset it owns and still leave residents in the dark. Openness is necessary; it isn’t sufficient.',
    body1: 'Civic Atlas started from a simple frustration: the data was technically available and practically unreadable. CSV dumps and ungoverned dashboards aren’t access — they’re a different gate.',
    h1: 'Editorial is infrastructure',
    body2: 'The real work was editorial: choosing which numbers matter, framing uncertainty honestly, and designing for a phone on a bus rather than an analyst’s monitor.',
    body3: 'Good civic tech is mostly good editing — deciding, on the public’s behalf, what deserves attention and how to show it plainly.',
  },
]
