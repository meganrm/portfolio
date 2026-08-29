// GitHub Actions sets GITHUB_ACTIONS=true for every workflow run — use that
// (rather than NODE_ENV, which is also "production" for local `npm run
// build`) to detect "this build is being published to GitHub Pages" and
// derive the basePath from the repo name only in that case. Locally the
// site is served from `/`, so basePath stays "".
const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'portfolio'
const basePath = isGithubActions ? `/${repo}` : ''

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  images: {
    // Static export has no server to run the image optimizer against — on
    // GitHub Pages a next/image src pointed at /_next/image just 404s. Serve
    // straight from public/ always, which also avoids the dev-mode disk-cache
    // staleness (~60s TTL) that used to make edited images in public/ not
    // show up in dev without a restart.
    unoptimized: true,
  },
  // Exposes the same value to client code so components can prepend it to
  // asset paths next/image doesn't cover on its own (basePath isn't applied
  // to unoptimized <Image> output, or to plain <video>/<img> src) — see
  // lib/basePath.ts.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}
export default config
