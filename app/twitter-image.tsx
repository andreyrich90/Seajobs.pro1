import { siteCard, SITE_CARD_ALT } from "@/lib/siteCard";

// The same card as app/opengraph-image.tsx, at /twitter-image.
export const runtime = "edge";
export const alt = SITE_CARD_ALT;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return siteCard();
}
