import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Exclude API/auth internals, Next internals, dotted files (favicon.ico,
    // robots.txt, sitemap.xml), and the root metadata routes that have no dot
    // (/icon, /apple-icon, /opengraph-image, /twitter-image) — otherwise the
    // locale middleware intercepts them and returns 404, breaking the favicon
    // Google reads and the homepage social card.
    "/((?!api|auth|_next|_vercel|icon|apple-icon|opengraph-image|twitter-image|.*\\..*).*)",
  ],
};
