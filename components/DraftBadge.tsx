/** Marks a project/post with `public: false` — only ever rendered in dev, since
 *  drafts are excluded from real builds (see lib/content.ts). */
export default function DraftBadge() {
  return <span className="draft-badge">Draft</span>
}
