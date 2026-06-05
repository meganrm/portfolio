'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Mark from './Mark'

const LINKS = [
  { href: '/', label: 'Work', match: (p: string) => p === '/' || p.startsWith('/work') },
  { href: '/writing', label: 'Writing', match: (p: string) => p.startsWith('/writing') },
  { href: '/about', label: 'About', match: (p: string) => p === '/about' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link href="/" className="brand">
          <Mark size={32} />
          <span className="brand-name">Megan Riel-Mehan</span>
        </Link>
        <div className="nav-links">
          {LINKS.map(({ href, label, match }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link${match(pathname) ? ' active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="nav-actions">
          <Link href="/about" className="btn btn-ghost">Say hello</Link>
        </div>
      </div>
    </nav>
  )
}
