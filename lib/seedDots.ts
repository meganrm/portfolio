// lib/seedDots.ts
// Deterministic dot generation seeded from a project's id string.
import type { CSSProperties } from 'react'

const DOT_COLORS = [
  '#E6A317', // mustard
  '#138A86', // teal
  '#CB5A33', // clay
  '#869A63', // sage
  '#79C7C0', // teal-light
  '#FCF8F0', // cream-white
  '#211E1A', // ink
] as const

const EDGES = ['top', 'bottom', 'left', 'right'] as const
type Edge = (typeof EDGES)[number]

export interface DotConfig {
  size: number    // px diameter, 8–52
  edge: Edge      // which image boundary the dot straddles
  offset: number  // 10–85 — percentage along that edge
  color: string   // from DOT_COLORS
  dx: number      // parallax translate x, px (-14 to +14)
  dy: number      // parallax translate y, px (-14 to +14)
}

/** Simple LCG PRNG — deterministic, seeded from an integer. */
function makeLcg(seed: number) {
  let s = seed >>> 0
  return function next(): number {
    s = Math.imul(s, 1664525) + 1013904223
    return (s >>> 0) / 0x100000000
  }
}

function idToSeed(id: string): number {
  return id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
}

/** Generate 3–5 dot configs seeded from a project id. */
export function generateDots(id: string): DotConfig[] {
  const next = makeLcg(idToSeed(id))
  const count = 3 + Math.floor(next() * 3) // 3, 4, or 5

  return Array.from({ length: count }, () => ({
    size:   8 + Math.floor(next() * 45),                          // 8–52
    edge:   EDGES[Math.floor(next() * 4)] as Edge,
    offset: 10 + Math.floor(next() * 76),                         // 10–85
    color:  DOT_COLORS[Math.floor(next() * DOT_COLORS.length)],
    dx:     Math.round((next() - 0.5) * 28),                      // -14 to +14
    dy:     Math.round((next() - 0.5) * 28),
  }))
}

/**
 * Convert a DotConfig to inline CSS properties for positioning.
 * The .dots container is top:0 left:0 with width:100% height:220px,
 * overflow:visible. Dots are positioned with their center on the edge.
 */
export function dotPositionStyle(dot: DotConfig): CSSProperties {
  const r = dot.size / 2
  const base = {
    width:  dot.size,
    height: dot.size,
    background: dot.color,
    '--dx': `${dot.dx}px`,
    '--dy': `${dot.dy}px`,
  } as CSSProperties

  switch (dot.edge) {
    case 'top':
      return { ...base, top: -r, left: `${dot.offset}%` }
    case 'bottom':
      return { ...base, top: `calc(220px - ${r}px)`, left: `${dot.offset}%` }
    case 'left':
      return { ...base, top: `${dot.offset}%`, left: -r }
    case 'right':
      return { ...base, top: `${dot.offset}%`, left: `calc(100% - ${r}px)` }
  }
}
