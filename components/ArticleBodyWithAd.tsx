"use client";

import { renderMarkdown } from "@/lib/markdown";
import EzoicAd from "@/components/EzoicAd";

// An article body (guide, handbook, news) with one Ezoic ad in the middle:
// the Markdown is split at the "## " heading nearest to the halfway point and
// placeholder 103 goes between the halves. Splitting at a heading cannot break
// a list, a table or one of our ::/!!/?? blocks, which never span a heading.
//
// Short texts get no mid-article ad — an ad two paragraphs in reads as the
// page being about the ad. The article's closing ad (104) is placed by the
// page, after this body.

const MIN_CHARS = 2500;

export function splitAtMiddleHeading(body: string): [string, string] | null {
  if (body.length < MIN_CHARS) return null;
  const re = /^## /gm;
  const half = body.length / 2;
  let best = -1;
  for (let m = re.exec(body); m; m = re.exec(body)) {
    if (m.index === 0) continue; // never before the first section
    if (best < 0 || Math.abs(m.index - half) < Math.abs(best - half)) best = m.index;
  }
  // Too close to either end and the "middle" ad is really a top or bottom one.
  if (best < body.length * 0.25 || best > body.length * 0.8) return null;
  return [body.slice(0, best), body.slice(best)];
}

export default function ArticleBodyWithAd({ body }: { body: string }) {
  const parts = splitAtMiddleHeading(body);
  if (!parts) return <>{renderMarkdown(body)}</>;
  return (
    <>
      {renderMarkdown(parts[0])}
      <EzoicAd id={103} className="my-6" />
      {renderMarkdown(parts[1])}
    </>
  );
}
