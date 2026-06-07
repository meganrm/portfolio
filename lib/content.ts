import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Project } from '@/data/projects'
import type { Post } from '@/data/posts'

function loadContent<T>(dir: string): T[] {
  const folder = path.join(process.cwd(), dir)
  return fs.readdirSync(folder)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const { data } = matter(fs.readFileSync(path.join(folder, f), 'utf8'))
      return { id: f.replace(/\.md$/, ''), ...data } as T
    })
}

export const PROJECTS = loadContent<Project>('content/projects')
export const POSTS    = loadContent<Post>('content/posts')
