import Image from 'next/image'
import { Mail, ArrowDown } from 'lucide-react'
import type { Metadata } from 'next'
import Eyebrow from '@/components/Eyebrow'
import Tag from '@/components/Tag'

export const metadata: Metadata = {
  title: 'About — Megan Riel-Mehan',
}

export default function AboutPage() {
  return (
    <main>
      <div className="container">
        <section className="about-hero">
          <div>
            <Eyebrow dot>About</Eyebrow>
            <p className="about-lead">
              I make invisible things visible — cell biology, political accountability,
              community resources — by building tools that let people{' '}
              <span className="em">interact with data in a meaningful way</span>.
            </p>
            <div className="about-body">
              <p>
                I&rsquo;m a visualization scientist and full-stack engineer with a Ph.D. in chemistry
                from UCSF, a fine art background, and ten years at the Allen Institute for Cell
                Science. My work spans research-grade scientific tools and civic technology, united
                by a conviction that good visualization empowers people to understand complex systems.
              </p>
              <p>
                I trained as a chemist and a painter. That double background shapes how I approach
                every project: with the precision of the lab and the eye of the studio.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 30 }}>
              <a href="mailto:megan@meganrielmehan.com" className="btn btn-primary">
                <Mail size={17} /> Get in touch
              </a>
              <a href="/megan_rielmehan_cv.pdf" className="btn btn-ghost">
                <ArrowDown size={17} /> Download CV
              </a>
            </div>
          </div>
          <div className="about-portrait">
            <div className="imgph" style={{ height: 420, position: 'relative', borderRadius: 'var(--radius-organic)' }}>
              <Image
                src="/images/portrait.jpg"
                alt="Megan Riel-Mehan"
                fill
                style={{ objectFit: 'cover', objectPosition: 'top center' }}
              />
            </div>
          </div>
        </section>

        {/* CV */}
        <section className="section" style={{ paddingTop: 40 }}>
          <div className="cv">
            <h6>Experience</h6>
            <div>
              <div className="cv-entry">
                <div>
                  <div className="role">Visualization Scientist &amp; Software Engineer</div>
                  <div className="org">Allen Institute for Cell Science</div>
                </div>
                <span className="yr">2016 — present</span>
              </div>
              <div className="cv-entry">
                <div>
                  <div className="role">Lead Developer</div>
                  <div className="org">Town Hall Project</div>
                </div>
                <span className="yr">2017 — present</span>
              </div>
              <div className="cv-entry">
                <div>
                  <div className="role">Postdoctoral Researcher</div>
                  <div className="org">UCSF · Mullins Cell Biology Lab</div>
                </div>
                <span className="yr">2014 — 2016</span>
              </div>
            </div>
          </div>

          <div className="cv">
            <h6>Education</h6>
            <div>
              <div className="cv-entry">
                <div>
                  <div className="role">PhD, Chemistry &amp; Chemical Biology</div>
                  <div className="org">University of California, San Francisco</div>
                </div>
                <span className="yr">2014</span>
              </div>
              <div className="cv-entry">
                <div>
                  <div className="role">BS Chemical Biology · BA Art Practice</div>
                  <div className="org">University of California, Berkeley</div>
                </div>
              </div>
            </div>
          </div>

          <div className="cv">
            <h6>Selected publications</h6>
            <div>
              <div className="cv-entry">
                <div>
                  <div className="role">Integrated intracellular organization and its variations in human iPS cells</div>
                  <div className="org">Nature, 2023</div>
                </div>
              </div>
              <div className="cv-entry">
                <div>
                  <div className="role">The Simularium Viewer: an interactive online tool for sharing spatiotemporal biological models</div>
                  <div className="org">Nature Methods, 2022</div>
                </div>
              </div>
            </div>
          </div>

          <div className="cv">
            <h6>Toolkit</h6>
            <div className="skillset">
              {(['TypeScript', 'React', 'three.js', 'WebGL', 'D3', 'Python', 'Mapbox', 'R', 'Cinema 4D', 'UCSF Chimera', 'Oil paint', 'Illustration'] as const).map((s) => (
                <Tag key={s} tone={['Oil paint', 'Illustration', 'Cinema 4D'].includes(s) ? 'clay' : 'teal'}>{s}</Tag>
              ))}
            </div>
          </div>

          <div className="cv">
            <h6>Focus areas</h6>
            <div className="skillset">
              {([
                ['Scientific Visualization', 'mustard'],
                ['Research', 'teal'],
                ['Civic Tech', 'sage'],
                ['Fine Art', 'clay'],
              ] as [string, 'mustard' | 'teal' | 'sage' | 'clay'][]).map(([label, tone]) => (
                <Tag key={label} tone={tone}>{label}</Tag>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
