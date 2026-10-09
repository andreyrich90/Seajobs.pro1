import type { Metadata } from "next";
import { guideIndexMetadata, GuideIndexView } from "../guides/guideIndex";

// The seafarer's handbook: conventions and codes (MARPOL, ISGOTT, …) written
// around what interviews and CES tests ask. Same table and pages as /guides,
// category 'handbook'.
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return guideIndexMetadata(locale, "handbook");
}

export default function HandbookPage() {
  return <GuideIndexView section="handbook" />;
}
