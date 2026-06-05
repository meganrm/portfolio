import type { ReactNode } from 'react'

export default function Tag({
  tone = 'teal',
  children,
}: {
  tone?: 'teal' | 'mustard' | 'clay' | 'sage'
  children: ReactNode
}) {
  return <span className={`tag tag-${tone}`}>{children}</span>
}
