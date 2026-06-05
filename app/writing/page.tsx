import Link from 'next/link'
import type { Metadata } from 'next'
import Eyebrow from '@/components/Eyebrow'
import Tag from '@/components/Tag'
import { POSTS } from '@/data/posts'

export const metadata: Metadata = {
  title: 'Writing — Megan Riel-Mehan',
}

export default function WritingPage() {
  return (
    <main>
      <div className="container">
        <header className="writing-head">
          <Eyebrow dot>Writing &amp; notes</Eyebrow>
          <h1 className="detail-title" style={{ fontSize: 'clamp(38px,5vw,60px)' }}>
            Publications, research notes, and methods
          </h1>
          <p className="hero-lead" style={{ marginTop: 20 }}>
            Write-ups on visualization work, scientific findings, and the technical notes I wish I&rsquo;d had.
          </p>
        </header>

        <div className="post-list">
          {POSTS.map((post) => (
            <Link key={post.id} href={`/writing/${post.id}`} className="post-row">
              <span className="date">{post.date}</span>
              <div>
                <h3 className="ptitle">{post.title}</h3>
                <p className="pexcerpt">{post.excerpt}</p>
              </div>
              <Tag tone={post.tag.tone}>{post.tag.label}</Tag>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
