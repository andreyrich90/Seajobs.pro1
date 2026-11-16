import type { Metadata } from "next";
import { guideMetadata, GuidePageView } from "../../guides/[id]/guidePage";

// A day, as the guides (see guides/[id]/page.tsx).
export const revalidate = 86400;

// Empty on purpose, as for guides: cache each article the first time it is
// asked for instead of rendering it per request.
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }): Promise<Metadata> {
  const { id, locale } = await params;
  return guideMetadata(id, locale, "handbook");
}

export default async function HandbookArticlePage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params;
  return <GuidePageView id={id} locale={locale} section="handbook" />;
}
