import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'
import Tag from '@/components/Tag'
import ProjectImage from '@/components/ProjectImage'
import { PROJECTS } from '@/data/projects'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.id }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = PROJECTS.find((p) => p.id === params.slug)
  if (!project) return {}
  return { title: `${project.title} — Megan Riel-Mehan` }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.id === params.slug)
  if (!project) notFound()

  const currentIndex = PROJECTS.findIndex((p) => p.id === params.slug)
  const next = PROJECTS[(currentIndex + 1) % PROJECTS.length]

  return (
    <main>
      <div className="container">
        <Link href="/" className="back">
          <ArrowLeft size={16} /> Back to work
        </Link>
        <header className="detail-head">
          <Eyebrow dot>{project.tags.map((t) => t.label).join(' · ')}</Eyebrow>
          <h1 className="detail-title">{project.title}</h1>
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
        </header>
      </div>

      <div className="container detail-hero">
        <ProjectImage src={project.heroImage} alt={`${project.title} hero`} tone={project.tone} label={project.title} style={{ height: 460 }} />
      </div>

      <div className="container">
        <div className="detail-body prose-col">
          <p className="lead">{project.lead}</p>
          <p>{project.body1}</p>
          <blockquote className="pullquote">{project.quote}</blockquote>
          <p>{project.body2}</p>
        </div>

        <div className="detail-gallery">
          <ProjectImage src={project.processImage} alt={`${project.title} process`} tone={project.tone} label="Process" nodes={false} />
          <ProjectImage src={project.detailImage} alt={`${project.title} detail`} tone={project.altTone} label="Detail" nodes={false} />
        </div>

        <div className="detail-body prose-col">
          <p>{project.body3}</p>
        </div>
      </div>

      <div className="container">
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
