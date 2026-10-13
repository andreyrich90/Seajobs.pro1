import { siteCard, SITE_CARD_ALT } from "@/lib/siteCard";

// The site's default social card — drawn in lib/siteCard.tsx, served at
// /opengraph-image and named by DEFAULT_OG_IMAGE in every page's metadata.
export const runtime = "edge";
export const alt = SITE_CARD_ALT;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return siteCard();
}
