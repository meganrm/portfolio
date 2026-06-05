import Image from 'next/image'
import ImagePlaceholder from './ImagePlaceholder'
import type { Tone } from '@/data/projects'
import type { CSSProperties } from 'react'

interface Props {
  src?: string
  alt: string
  tone?: Tone
  label?: string
  nodes?: boolean
  style?: CSSProperties
  className?: string
}

export default function ProjectImage({ src, alt, tone = 'teal', label, nodes, style, className }: Props) {
  if (!src) {
    return <ImagePlaceholder tone={tone} label={label} nodes={nodes} style={style} />
  }
  return (
    <div className={`imgph${className ? ` ${className}` : ''}`} style={{ position: 'relative', ...style }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 860px) 100vw, 50vw"
        style={{ objectFit: 'cover' }}
        unoptimized={src.endsWith('.gif')}
      />
    </div>
  )
}
