import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'
import DraftBadge from '@/components/DraftBadge'
import GalleryLightbox from '@/components/GalleryLightbox'
import { PROJECTS } from '@/lib/content'
import { withBasePath } from '@/lib/basePath'
import type { Project } from '@/data/projects'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.id }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = PROJECTS.find((p) => p.id === params.slug)
  if (!project) return {}
  return { title: `${project.title} — Megan Riel-Mehan` }
}

const VIDEO_EXT = /\.(mp4|webm|mov)$/i

/** Renders a still image or video at natural aspect ratio — no crop, no border-radius. */
function BodyImage({ src, alt, sizes = '(max-width: 860px) 100vw, 50vw' }: {
  src: string; alt: string; sizes?: string
}) {
  if (VIDEO_EXT.test(src)) {
    return (
      <video
        src={withBasePath(src)}
        autoPlay
        loop
        muted
        playsInline
        aria-label={alt}
        className="detail-img"
        style={{ width: '100%', height: 'auto' }}
      />
    )
  }
  return (
    <Image
      src={withBasePath(src)}
      alt={alt}
      width={0}
      height={0}
      sizes={sizes}
      className="detail-img"
      style={{ width: '100%', height: 'auto' }}
      unoptimized={/\.(gif)$/i.test(src)}
    />
  )
}

function MetaRow({ project }: { project: Project }) {
  return (
    <div className="detail-metarow">
      <div className="col"><h6>Year</h6><p>{project.year}</p></div>
      <div className="col"><h6>Medium</h6><p>{project.medium}</p></div>
      <div className="col"><h6>Role</h6><p>{project.role}</p></div>
      <div className="col"><h6>Context</h6><p>{project.context}</p></div>
      {project.url && (
        <div className="col">
          <h6>Live site</h6>
          <p>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="link-arrow" style={{ fontSize: 15 }}>
              Visit <ExternalLink size={14} />
            </a>
          </p>
        </div>
      )}
    </div>
  )
}

/**
 * Shared alternating body for both templates:
 *   Row 1  — body1 (left) | processImage (right)
 *   Pullquote — full-width
 *   Row 2  — detailImage (left) | body2 (right), flipped
 *             OR body2 full-width when detailImage is absent
 *   Closing — body3 full-width
 */
function ProjectBody({ project }: { project: Project }) {
  return (
    <>
      {project.processImage ? (
        <div className="detail-section">
          <div className="detail-section-text"><p>{project.body1}</p></div>
          <div><BodyImage src={project.processImage} alt={`${project.title} — process`} /></div>
        </div>
      ) : (
        <div className="detail-closing"><p>{project.body1}</p></div>
      )}

      {project.quote && <blockquote className="pullquote">{project.quote}</blockquote>}

      {project.detailImage ? (
        <div className="detail-section detail-section--flip">
          <div><BodyImage src={project.detailImage} alt={`${project.title} — detail`} /></div>
          <div className="detail-section-text"><p>{project.body2}</p></div>
        </div>
      ) : (
        <div className="detail-closing"><p>{project.body2}</p></div>
      )}

      {project.body3 && <div className="detail-closing"><p>{project.body3}</p></div>}
    </>
  )
}

/**
 * Sectioned body for projects with `sections` defined.
 * Renders an inline TOC at top with anchor links, then each section with
 * its anchor id, heading, paragraphs, and optional image (alternating sides).
 */
function ProjectSections({ project }: { project: Project }) {
  if (!project.sections?.length) return null
  return (
    <>
      <nav className="detail-toc" aria-label="On this page">
        <h6>On this page</h6>
        <ol>
          {project.sections.map((s) => (
            <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
          ))}
        </ol>
      </nav>
      {project.sections.map((s, i) => {
        const flip = i % 2 === 1
        if (s.image) {
          return (
            <section
              key={s.id}
              id={s.id}
              className={`detail-section${flip ? ' detail-section--flip' : ''}`}
            >
              {flip && <div><BodyImage src={s.image} alt={s.imageAlt ?? `${s.title} — illustration`} /></div>}
              <div className="detail-section-text">
                <h2 className="section-heading">{s.title}</h2>
                {s.content.map((p, j) => <p key={j}>{p}</p>)}
              </div>
              {!flip && <div><BodyImage src={s.image} alt={s.imageAlt ?? `${s.title} — illustration`} /></div>}
            </section>
          )
        }
        return (
          <section key={s.id} id={s.id} className="detail-closing">
            <h2 className="section-heading">{s.title}</h2>
            {s.content.map((p, j) => <p key={j}>{p}</p>)}
          </section>
        )
      })}
    </>
  )
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.id === params.slug)
  if (!project) notFound()

  const currentIndex = PROJECTS.findIndex((p) => p.id === params.slug)
  const next = PROJECTS[(currentIndex + 1) % PROJECTS.length]

  // ─── Gallery layout — any project with a `gallery` array ───────────────
  if (project.gallery?.length) {
    return (
      <main>
        <div className="container">
          <Link href="/work" className="back">
            <ArrowLeft size={16} /> Back to work
          </Link>
          <header className="detail-head">
            <Eyebrow dot>{project.tags.map((t) => t.label).join(' · ')}</Eyebrow>
            {project.public === false && <DraftBadge />}
            <h1 className="detail-title">{project.title}</h1>
            <MetaRow project={project} />
          </header>
          <div className="detail-closing" style={{ borderTop: 'none', paddingTop: 0 }}>
            <p className="detail-lead">{project.lead}</p>
          </div>
          <GalleryLightbox items={project.gallery} />
          <Link href={`/work/${next.id}`} className="next-project">
            <div>
              <Eyebrow>Next project</Eyebrow>
              <div className="np-title">{next.title}</div>
            </div>
            <ArrowRight size={24} />
          </Link>
        </div>
      </main>
    )
  }

  // ─── Template 1 — Tool/App ─────────────────────────────────────────────
  if (project.pageTemplate === 'tool') {
    const screenshotSrc = project.screenshotImage ?? project.heroImage
    return (
      <main>
        {project.heroImage && (
          <div className="detail-banner" aria-hidden="true">
            {VIDEO_EXT.test(project.heroImage) ? (
              <video src={withBasePath(project.heroImage)} autoPlay loop muted playsInline />
            ) : (
              <Image
                src={withBasePath(project.heroImage)}
                alt=""
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: project.heroImagePosition ?? 'center',
                  filter: 'brightness(0.5) saturate(0.7)',
                }}
              />
            )}
          </div>
        )}

        <div className="container">
          <Link href="/work" className="back">
            <ArrowLeft size={16} /> Back to work
          </Link>
          <div className="detail-intro">
            <header>
              <Eyebrow dot>{project.tags.map((t) => t.label).join(' · ')}</Eyebrow>
              {project.public === false && <DraftBadge />}
              <h1 className="detail-title">{project.title}</h1>
              <MetaRow project={project} />
              <p className="detail-lead">{project.lead}</p>
            </header>
            {screenshotSrc && (
              <div className="detail-intro-screenshot">
                <BodyImage src={screenshotSrc} alt={`${project.title} screenshot`} />
              </div>
            )}
          </div>

          {project.sections?.length ? <ProjectSections project={project} /> : <ProjectBody project={project} />}

          <Link href={`/work/${next.id}`} className="next-project">
            <div>
              <Eyebrow>Next project</Eyebrow>
              <div className="np-title">{next.title}</div>
            </div>
            <ArrowRight size={24} />
          </Link>
        </div>
      </main>
    )
  }

  // ─── Template 2 — Visual Asset ─────────────────────────────────────────
  return (
    <main>
      <div className="container">
        <Link href="/work" className="back">
          <ArrowLeft size={16} /> Back to work
        </Link>
      </div>

      {project.heroImage && (
        project.heroImagePosition ? (
          // Explicit position set — crop to a fixed band so the chosen
          // focal point is honored, instead of the default natural-aspect
          // top-anchored crop below.
          <div className="detail-hero-natural detail-hero-natural--positioned">
            <Image
              src={withBasePath(project.heroImage)}
              alt={project.title}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: project.heroImagePosition }}
            />
          </div>
        ) : (
          <div className="detail-hero-natural">
            <BodyImage src={project.heroImage} alt={project.title} sizes="100vw" />
          </div>
        )
      )}

      <div className="container">
        <header className="detail-head">
          <Eyebrow dot>{project.tags.map((t) => t.label).join(' · ')}</Eyebrow>
          {project.public === false && <DraftBadge />}
          <h1 className="detail-title">{project.title}</h1>
          <MetaRow project={project} />
          <p className="detail-lead">{project.lead}</p>
        </header>

        <ProjectBody project={project} />

        <Link href={`/work/${next.id}`} className="next-project">
          <div>
            <Eyebrow>Next project</Eyebrow>
            <div className="np-title">{next.title}</div>
          </div>
          <ArrowRight size={24} />
        </Link>
      </div>
    </main>
  )
}
