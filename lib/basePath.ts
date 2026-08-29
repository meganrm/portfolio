// Mirrors next.config.mjs's basePath (empty locally, "/<repo>" when built in
// GitHub Actions for Pages). next/image and next/link apply basePath to
// their own output automatically, but plain <img>/<video> src and unoptimized
// <Image> output don't — anything reading a path straight out of
// data/projects.ts or data/posts.ts needs to run through this first.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function withBasePath(src: string): string {
  if (!src || /^([a-z]+:)?\/\//i.test(src)) return src // absolute URL — leave alone
  return `${basePath}${src.startsWith('/') ? src : `/${src}`}`
}
