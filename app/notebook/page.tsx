import Link from 'next/link'
import type { Metadata } from 'next'
import Eyebrow from '@/components/Eyebrow'
import Tag from '@/components/Tag'
import { POSTS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Notebook — Megan Riel-Mehan',
}

export default function NotebookPage() {
  return (
    <main>
      <div className="container">
        <header className="writing-head">
          <Eyebrow dot>Notebook</Eyebrow>
          <h1 className="detail-title" style={{ fontSize: 'clamp(38px,5vw,60px)' }}>
            Notebook
          </h1>
          <p className="hero-lead" style={{ marginTop: 20 }}>
            Publication write-ups, research updates, and technical notes.
          </p>
        </header>

        <div className="post-list">
          {POSTS.map((post) => (
            <Link key={post.id} href={`/notebook/${post.id}`} className="post-row">
              <span className="date">{post.date}</span>
              <div>
                <h3 className="ptitle">{post.title}</h3>
                <p className="pexcerpt">{post.excerpt}</p>
              </div>
              <Tag>{post.tag.label}</Tag>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
