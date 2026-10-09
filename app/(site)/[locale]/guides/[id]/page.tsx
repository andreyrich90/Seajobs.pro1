import type { Metadata } from "next";
import { guideMetadata, GuidePageView } from "./guidePage";


// As the index: an hour.
export const revalidate = 3600;

// Empty on purpose. A dynamic segment with no generateStaticParams is rendered
// per request and never cached, so `revalidate` above would do nothing. An
// empty list says "prerender none of them at build, cache each one the first
// time it is asked for" — which keeps the build cheap and still serves the
// second visitor from the cache.
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }): Promise<Metadata> {
  const { id, locale } = await params;
  return guideMetadata(id, locale, "guide");
}

export default async function GuidePage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params;
  return <GuidePageView id={id} locale={locale} section="guide" />;
}
