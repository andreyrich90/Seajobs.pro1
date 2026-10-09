import type { Metadata } from "next";
import { guideIndexMetadata, GuideIndexView } from "./guideIndex";


// Guides change about never; an hour is already generous.
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return guideIndexMetadata(locale, "guide");
}

export default function GuidesPage() {
  return <GuideIndexView section="guide" />;
}
