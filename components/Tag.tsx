import type { ReactNode } from 'react'
import { getTagTone } from '@/lib/tagColors'

export default function Tag({ children }: { children: ReactNode }) {
  const label = typeof children === 'string' ? children : ''
  const tone = getTagTone(label)
  return <span className={`tag tag-${tone}`}>{children}</span>
}
