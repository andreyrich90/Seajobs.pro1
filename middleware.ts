import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Exclude API/auth internals, Next internals, dotted files (favicon.ico,
    // robots.txt, sitemap.xml), and the root metadata routes that have no dot
    // (/icon, /apple-icon, /opengraph-image, /twitter-image) — otherwise the
    // locale middleware intercepts them and returns 404, breaking the favicon
    // Google reads and the homepage social card. `cv/` is the tokenised CV
    // page (app/(plain)/cv/[token]), which has no locale: matched, it was
    // rewritten to /en/cv/<token> and every link a seafarer mailed answered 404.
    // The slash matters — /cv-distribution and /cv-builder are localized pages.
    "/((?!api|auth|cv/|_next|_vercel|icon|apple-icon|opengraph-image|twitter-image|.*\\..*).*)",
  ],
};
