'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryItem } from '@/data/projects'

export default function GalleryLightbox({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isOpen = openIndex !== null

  const close = useCallback(() => setOpenIndex(null), [])
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length)),
    [items.length]
  )
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length]
  )

  // Keyboard nav + body scroll lock
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, close, prev, next])

  const active = openIndex !== null ? items[openIndex] : null

  return (
    <>
      <div className="art-gallery">
        {items.map(({ src, alt, blurb }, i) => (
          <figure key={src} className="art-gallery-figure">
            <button
              type="button"
              className="art-gallery-item"
              onClick={() => setOpenIndex(i)}
              aria-label={`View ${alt} full size`}
            >
              <Image src={src} alt={alt} fill style={{ objectFit: 'cover', borderRadius: 0 }} />
            </button>
            {blurb && <figcaption className="art-gallery-caption">{blurb}</figcaption>}
          </figure>
        ))}
      </div>

      {active && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={close}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={close}
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {items.length > 1 && (
            <button
              type="button"
              className="lightbox-arrow lightbox-arrow--prev"
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Previous"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
            {/* Plain <img> here — next/image's width/height/fill modes don't
                play nicely with "as large as fits, intrinsic aspect" */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={active.alt}
              className="lightbox-image"
            />
            {active.blurb && <div className="lightbox-caption">{active.blurb}</div>}
          </div>

          {items.length > 1 && (
            <button
              type="button"
              className="lightbox-arrow lightbox-arrow--next"
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Next"
            >
              <ChevronRight size={32} />
            </button>
          )}
        </div>
      )}
    </>
  )
}
