import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Eyebrow from '@/components/Eyebrow'
import Molecule from '@/components/Molecule'
import ProjectImage from '@/components/ProjectImage'
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
          <Eyebrow dot>Scientific Visualization · Civic Tech · Fine Art · Seattle</Eyebrow>
          <h1 className="hero-display">
            I make invisible<br />
            things <span className="serif">visible</span> —<br />
            cells, data, systems.
          </h1>
          <p className="hero-lead">
            I&rsquo;m Megan Riel-Mehan — a visualization scientist and full-stack engineer. I build tools
            that let people interact with complex data in a meaningful way, from cell biology
            to political accountability to community resources.
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
              <h2 className="section-title">Research tools and civic tech</h2>
            </div>
            <Link href="/work" className="link-arrow">
              All projects <ArrowRight size={16} />
            </Link>
          </div>
          <div className="work-grid">
            {PROJECTS.filter((p) => p.featured).map((p) => (
              <Link key={p.id} href={`/work/${p.id}`} className="work-card">
                <ProjectImage src={p.heroImage} alt={p.title} tone={p.tone} label={p.medium} />
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
              <p>Visualization scientist and software engineer — building web tools for interactive cell biology research.</p>
            </div>
            <div className="strip-item">
              <Eyebrow dot>Also</Eyebrow>
              <h4>Town Hall Project</h4>
              <p>Lead developer — tracking lawmaker accountability to constituents since 2017.</p>
            </div>
            <div className="strip-item">
              <Eyebrow dot>Background</Eyebrow>
              <h4>PhD Chemistry, UCSF</h4>
              <p>Fine art background, UC Berkeley — chemistry, computation, and paint.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
