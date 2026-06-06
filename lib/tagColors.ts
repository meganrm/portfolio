// lib/tagColors.ts
// Single source of truth for tag → color mapping.
// Tag component derives its tone from getTagTone() — no hardcoded tones in data.

export type TagTone = 'teal' | 'mustard' | 'clay' | 'sage' | 'neutral'

/** Focus area labels → brand tone */
const FOCUS_COLORS: Record<string, TagTone> = {
  'Sci-Vis':                  'mustard',
  'Research':                 'teal',
  'Civic Tech':               'sage',
  'Fine Art':                 'clay',
  // Full names used on About page
  'Scientific Visualization': 'mustard',
}

/** Tool label → focus area (which resolves to a tone via FOCUS_COLORS) */
const TOOL_AREA: Record<string, string> = {
  // Sci-Vis tools
  'WebGL':       'Sci-Vis',
  'WebGPU':      'Sci-Vis',
  'three.js':    'Sci-Vis',
  'Blender':     'Sci-Vis',
  'Cinema 4D':   'Sci-Vis',
  'UCSF Chimera':'Sci-Vis',
  'GLSL':        'Sci-Vis',
  // Research tools
  'Python':      'Research',
  'R':           'Research',
  'Microscopy':  'Research',
  // Civic Tech tools
  'Mapbox':      'Civic Tech',
  // Fine Art tools
  'Oil paint':   'Fine Art',
  'Illustration':'Fine Art',
  // Cross-cutting (TypeScript, React, D3, etc.) → not mapped → neutral
}

/** Derive a tag's display tone from its label. */
export function getTagTone(label: string): TagTone {
  if (label in FOCUS_COLORS) return FOCUS_COLORS[label]
  const area = TOOL_AREA[label]
  if (area && area in FOCUS_COLORS) return FOCUS_COLORS[area]
  return 'neutral'
}
