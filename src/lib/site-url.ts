/**
 * The site's public address, used for share links, the sitemap and canonical URLs.
 * - Custom domain: set NEXT_PUBLIC_SITE_URL in Vercel (e.g. https://ahmed.dev).
 * - Otherwise Vercel's production address is used automatically.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
