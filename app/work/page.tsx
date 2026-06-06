// app/work/page.tsx
'use client'

import { useState } from 'react'
import Eyebrow from '@/components/Eyebrow'
import WorkCard from '@/components/WorkCard'
import { PROJECTS } from '@/data/projects'

const FILTERS = [
  { label: 'All',        cls: '' },
  { label: 'Sci-Vis',    cls: 'filter-pill-sci' },
  { label: 'Research',   cls: 'filter-pill-research' },
  { label: 'Civic Tech', cls: 'filter-pill-civic' },
  { label: 'Fine Art',   cls: 'filter-pill-art' },
]

// Featured projects first, then by year descending
const SORTED = [
  ...PROJECTS.filter((p) => p.featured),
  ...PROJECTS.filter((p) => !p.featured).sort((a, b) => {
    const ay = parseInt(a.year) || 0
    const by = parseInt(b.year) || 0
    return by - ay
  }),
]

export default function WorkPage() {
  const [active, setActive] = useState('All')

  const visible = SORTED.filter((p) =>
    active === 'All' || p.tags.some((t) => t.label === active)
  )

  return (
    <main>
      <div className="container">
        <header className="writing-head">
          <Eyebrow dot>Portfolio</Eyebrow>
          <h1 className="detail-title" style={{ fontSize: 'clamp(38px,5vw,60px)' }}>
            All work
          </h1>
        </header>

        <div className="filter-bar">
          {FILTERS.map(({ label, cls }) => (
            <button
              key={label}
              className={`filter-pill${cls ? ` ${cls}` : ''}${active === label ? ' active' : ''}`}
              onClick={() => setActive(label)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="work-grid-full">
          {SORTED.map((p) => (
            <div key={p.id} style={{ display: visible.includes(p) ? undefined : 'none' }}>
              <WorkCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
