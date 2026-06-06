import Link from 'next/link'
import Mark from './Mark'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link href="/" className="brand">
            <Mark size={28} />
            <span className="brand-name" style={{ fontSize: 17 }}>Megan Riel-Mehan</span>
          </Link>
          <p>I make invisible things visible — cell biology, political accountability, community resources.</p>
        </div>
        <div className="footer-cols">
          <div className="footer-col">
            <h5>Explore</h5>
            <Link href="/">Work</Link>
            <Link href="/notebook">Notebook</Link>
            <Link href="/about">About &amp; CV</Link>
          </div>
          <div className="footer-col">
            <h5>Elsewhere</h5>
            <a href="https://github.com/meganrm" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer">Google Scholar</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
          <div className="footer-col">
            <h5>Say hello</h5>
            <a href="mailto:megan@meganrielmehan.com">megan@meganrielmehan.com</a>
            <a>Seattle, WA</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
