import type { ReactNode } from 'react'

export default function Eyebrow({
  children,
  dot = false,
}: {
  children: ReactNode
  dot?: boolean
}) {
  return (
    <span className="eyebrow">
      {dot && <span className="dot" />}
      {children}
    </span>
  )
}
