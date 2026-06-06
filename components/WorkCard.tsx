// components/WorkCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import Tag from './Tag'
import { generateDots, dotPositionStyle } from '@/lib/seedDots'
import type { Project } from '@/data/projects'

const TONE_RGB: Record<string, string> = {
  teal:    '19,138,134',
  mustard: '201,137,12',
  clay:    '168,67,31',
  sage:    '103,122,71',
  ink:     '33,30,26',
}

export default function WorkCard({ project }: { project: Project }) {
  const dots = generateDots(project.id)
  const toneRgb = TONE_RGB[project.tone] ?? TONE_RGB.teal

  return (
    <Link
      href={`/work/${project.id}`}
      className="wcard"
      style={{ '--tone-rgb': toneRgb } as React.CSSProperties}
    >
      {/* Image with gradient overlay (::after in CSS) */}
      <div className="wcard-img">
        {project.heroImage ? (
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            sizes="(max-width: 560px) 100vw, (max-width: 860px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            unoptimized={project.heroImage.endsWith('.gif')}
          />
        ) : (
          <div className="wcard-img-placeholder" />
        )}
      </div>

      {/* Dots — straddle the image border */}
      <div className="wcard-dots">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="wcard-dot"
            style={dotPositionStyle(dot)}
          />
        ))}
      </div>

      {/* Card body */}
      <div className="wcard-body">
        <div className="wcard-meta">{project.year} — {project.medium}</div>
        <div className="wcard-title">
          {project.title}
          {project.featured && <span className="wcard-badge">Featured</span>}
        </div>
        <p className="wcard-blurb">{project.blurb}</p>
        <div className="wcard-tags">
          {project.tags.map((t) => (
            <Tag key={t.label}>{t.label}</Tag>
          ))}
        </div>
      </div>
    </Link>
  )
}
