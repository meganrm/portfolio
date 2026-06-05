import type { CSSProperties } from 'react'

type Tone = 'teal' | 'mustard' | 'clay' | 'sage' | 'ink'

const PALETTES: Record<Tone, [string, string]> = {
  teal:    ['#0F706C', '#138A86'],
  mustard: ['#C9890C', '#E6A317'],
  clay:    ['#A8431F', '#CB5A33'],
  sage:    ['#677A47', '#869A63'],
  ink:     ['#211E1A', '#3a352d'],
}

export default function ImagePlaceholder({
  tone = 'teal',
  label = 'Image',
  nodes = true,
  style,
}: {
  tone?: Tone
  label?: string
  nodes?: boolean
  style?: CSSProperties
}) {
  const [a, b] = PALETTES[tone] ?? PALETTES.teal
  const onDark = tone !== 'mustard'

  return (
    <div
      className="imgph grain"
      style={{ background: `linear-gradient(135deg, ${b}, ${a})`, ...style }}
    >
      {nodes && (
        <>
          <span className="imgph-node" style={{ width: 34, height: 34, background: 'rgba(255,255,255,0.22)', top: '26%', left: '16%' }} />
          <span className="imgph-node" style={{ width: 16, height: 16, background: tone === 'teal' ? '#E6A317' : 'rgba(255,255,255,0.5)', top: '58%', left: '60%' }} />
          <span className="imgph-node" style={{ width: 10, height: 10, background: 'rgba(255,255,255,0.35)', top: '30%', left: '78%' }} />
        </>
      )}
      <span
        className="imgph-label"
        style={{ color: onDark ? 'rgba(255,255,255,0.85)' : 'rgba(33,30,26,0.6)' }}
      >
        {label}
      </span>
    </div>
  )
}
