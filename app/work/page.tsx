import { PROJECTS } from '@/lib/content'
import WorkGrid from './WorkGrid'

const SORTED = [
  ...PROJECTS.filter((p) => p.featured),
  ...PROJECTS.filter((p) => !p.featured).sort((a, b) => {
    const ay = parseInt(a.year) || 0
    const by = parseInt(b.year) || 0
    return by - ay
  }),
]

export default function WorkPage() {
  return <WorkGrid projects={SORTED} />
}
