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
  /** Optional still image to show before/while a video loads. Only used for video sources. */
  poster?: string
}

const VIDEO_EXT = /\.(mp4|webm|mov)$/i

export default function ProjectImage({ src, alt, tone = 'teal', label, nodes, style, className, poster }: Props) {
  if (!src) {
    return <ImagePlaceholder tone={tone} label={label} nodes={nodes} style={style} />
  }

  const isVideo = VIDEO_EXT.test(src)

  return (
    <div className={`imgph${className ? ` ${className}` : ''}`} style={{ position: 'relative', ...style }}>
      {isVideo ? (
        <video
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          aria-label={alt}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 860px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
          unoptimized={src.endsWith('.gif')}
        />
      )}
    </div>
  )
}
