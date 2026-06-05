import { Mail, ArrowDown } from 'lucide-react'
import type { Metadata } from 'next'
import Eyebrow from '@/components/Eyebrow'
import Tag from '@/components/Tag'
import ImagePlaceholder from '@/components/ImagePlaceholder'

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
              I&rsquo;m Megan Riel-Mehan — a scientific-visualization engineer and artist working at the
              intersection of <span className="em">cell biology, computation, and image-making</span>.
            </p>
            <div className="about-body">
              <p>
                I build interactive tools that render living systems — whole cells, molecular models,
                and large microscopy datasets — in real time, in the browser. My work sits where rigorous
                science meets the craft of making something legible and beautiful.
              </p>
              <p>
                I trained as a chemist and a painter. That double background shapes how I approach every
                project: with the precision of the lab and the eye of the studio.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 30 }}>
              <a href="mailto:megan@meganrielmehan.com" className="btn btn-primary">
                <Mail size={17} /> Get in touch
              </a>
              <a href="/cv.pdf" className="btn btn-ghost">
                <ArrowDown size={17} /> Download CV
              </a>
            </div>
          </div>
          <div className="about-portrait">
            <ImagePlaceholder tone="sage" label="Portrait" />
          </div>
        </section>

        {/* CV */}
        <section className="section" style={{ paddingTop: 40 }}>
          <div className="cv">
            <h6>Experience</h6>
            <div>
              <div className="cv-entry">
                <div>
                  <div className="role">Scientific Visualization Engineer</div>
                  <div className="org">Allen Institute for Cell Science</div>
                </div>
                <span className="yr">2019 — now</span>
              </div>
              <div className="cv-entry">
                <div>
                  <div className="role">Full-Stack Software Engineer</div>
                  <div className="org">Independent · research tooling</div>
                </div>
                <span className="yr">2017 — 2019</span>
              </div>
              <div className="cv-entry">
                <div>
                  <div className="role">Postdoctoral Researcher</div>
                  <div className="org">UCSF · Chemistry &amp; Chemical Biology</div>
                </div>
                <span className="yr">2015 — 2017</span>
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
                <span className="yr">2015</span>
              </div>
              <div className="cv-entry">
                <div>
                  <div className="role">BS Chemical Biology · BA Art Practice</div>
                  <div className="org">University of California, Berkeley</div>
                </div>
                <span className="yr">2009</span>
              </div>
            </div>
          </div>

          <div className="cv">
            <h6>Toolkit</h6>
            <div className="skillset">
              {(['WebGPU', 'three.js', 'TypeScript', 'Python', 'D3', 'Blender', 'React', 'GLSL', 'Oil paint', 'Microscopy'] as const).map((s) => (
                <Tag key={s} tone={s === 'Oil paint' || s === 'Microscopy' ? 'clay' : 'teal'}>{s}</Tag>
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
