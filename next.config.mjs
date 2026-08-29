/** @type {import('next').NextConfig} */
const config = {
  images: {
    // next/image's optimizer disk-caches output at /_next/image keyed by
    // url+size+quality and never re-reads the source file until the cache
    // entry expires (~60s) or the server restarts — so replacing an image
    // in public/ during dev doesn't show up without a restart. Serve
    // unoptimized (straight from public/) in dev so edits appear on
    // refresh; keep optimization for production builds.
    unoptimized: process.env.NODE_ENV === 'development',
  },
}
export default config
