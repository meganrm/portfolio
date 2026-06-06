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
                  <div className="role">Senior Scientist</div>
                  <div className="org">Allen Institute for Cell Science · Director: Graham Johnson</div>
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
                  <div className="role">Postdoctoral Scholar</div>
                  <div className="org">UCSF · Johnson Lab, Bioengineering and Therapeutic Sciences</div>
                </div>
                <span className="yr">2013 — 2016</span>
              </div>
              <div className="cv-entry">
                <div>
                  <div className="role">Research Technician</div>
                  <div className="org">Burnham Institute · Pellecchia Lab, Infectious & Inflammatory Disease</div>
                </div>
                <span className="yr">2007 — 2008</span>
              </div>
            </div>
          </div>

          <div className="cv">
            <h6>Education</h6>
            <div>
              <div className="cv-entry">
                <div>
                  <div className="role">PhD, Chemistry &amp; Chemical Biology</div>
                  <div className="org">University of California, San Francisco · Shokat Lab</div>
                </div>
                <span className="yr">2013</span>
              </div>
              <div className="cv-entry">
                <div>
                  <div className="role">BS Chemical Biology · BA Fine Art</div>
                  <div className="org">University of California, Berkeley</div>
                </div>
                <span className="yr">2006</span>
              </div>
            </div>
          </div>

          <div className="cv">
            <h6>Awards &amp; fellowships</h6>
            <div>
              <div className="cv-entry">
                <div>
                  <div className="role">Mary Anne Koda-Kimble Seed Award for Innovation</div>
                  <div className="org">UCSF</div>
                </div>
                <span className="yr">2014</span>
              </div>
              <div className="cv-entry">
                <div>
                  <div className="role">QB3 Research Fellowship</div>
                  <div className="org">UCSF</div>
                </div>
                <span className="yr">2012 — 2013</span>
              </div>
              <div className="cv-entry">
                <div>
                  <div className="role">Regents and Chancellors Scholarship</div>
                  <div className="org">UC Berkeley</div>
                </div>
                <span className="yr">2002 — 2006</span>
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
              <div className="cv-entry">
                <div>
                  <div className="role">A Crosslinker Based on a Tethered Electrophile for Mapping Kinase-Substrate Networks</div>
                  <div className="org">Chemistry &amp; Biology, 2014 (cover article)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="cv">
            <h6>Toolkit</h6>
            <div className="skillset">
              {['TypeScript', 'React', 'three.js', 'WebGL', 'D3', 'Python', 'Mapbox', 'R', 'Cinema 4D', 'UCSF Chimera', 'Oil paint', 'Illustration'].map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </div>

          <div className="cv">
            <h6>Focus areas</h6>
            <div className="skillset">
              {['Scientific Visualization', 'Research', 'Civic Tech', 'Fine Art'].map((label) => (
                <Tag key={label}>{label}</Tag>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
