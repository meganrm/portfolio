import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'
import Molecule from '@/components/Molecule'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import Tag from '@/components/Tag'
import ScrollToWorkButton from '@/components/ScrollToWorkButton'
import { PROJECTS } from '@/data/projects'

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="hero-molecule">
          <Molecule size={190} />
        </div>
        <div className="container">
          <Eyebrow dot>Scientific Visualization · Research · Fine Art</Eyebrow>
          <h1 className="hero-display">
            I make the invisible<br />
            <span className="serif">legible</span> — cells, data,<br />
            and what&rsquo;s between.
          </h1>
          <p className="hero-lead">
            I&rsquo;m Megan — a scientific-visualization engineer and artist. I build tools and
            images that help people see biology at scales the eye can&rsquo;t reach.
          </p>
          <div className="hero-cta">
            <ScrollToWorkButton />
            <Link href="/writing" className="btn btn-ghost">Read the writing</Link>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="section" id="work">
        <div className="container">
          <div className="section-head">
            <div>
              <Eyebrow>Selected work</Eyebrow>
              <h2 className="section-title">Things I&rsquo;ve made recently</h2>
            </div>
            <Link href="/writing" className="link-arrow">
              All projects <ArrowRight size={16} />
            </Link>
          </div>
          <div className="work-grid">
            {PROJECTS.map((p) => (
              <Link key={p.id} href={`/work/${p.id}`} className="work-card">
                <ImagePlaceholder tone={p.tone} label={p.medium} />
                <div className="work-card-body">
                  <div className="meta">{p.year} — {p.medium}</div>
                  <h3 className="work-card-title">{p.title}</h3>
                  <p className="work-card-desc">{p.blurb}</p>
                  <div className="work-card-tags">
                    {p.tags.map((t) => (
                      <Tag key={t.label} tone={t.tone}>{t.label}</Tag>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Currently */}
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="strip grain">
            <div className="strip-item">
              <Eyebrow dot>Currently</Eyebrow>
              <h4>Allen Institute for Cell Science</h4>
              <p>Building real-time visualization of integrated cell models for the web.</p>
            </div>
            <div className="strip-item">
              <Eyebrow dot>In the studio</Eyebrow>
              <h4>Microscopy → paint</h4>
              <p>A new series translating confocal imagery into oil on linen.</p>
            </div>
            <div className="strip-item">
              <Eyebrow dot>Background</Eyebrow>
              <h4>PhD, Chemical Biology</h4>
              <p>UCSF &amp; UC Berkeley — chemistry, computation, and art.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
