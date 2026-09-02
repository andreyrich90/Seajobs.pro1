import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { CV_BLAST_COPY } from "@/lib/cvBlast";
import type { Lang } from "@/lib/langs";
import CvDistributionClient from "./CvDistributionClient";

// The copy for this page lives in lib/cvBlast.ts rather than lib/i18n.ts, so the
// server picks one language here and hands it down — the same split the site
// dictionary uses. A `"use client"` import of the five-language map would ship
// all of them.
export default async function CvDistributionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const lang = locale as Lang;
  return <CvDistributionClient copy={CV_BLAST_COPY[lang]} lang={lang} />;
}
