import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { maritimeCvCopy } from "@/lib/maritimeCv";
import { fleetPagesCopy } from "@/lib/maritimeCvFleets";
import type { Lang } from "@/lib/langs";
import MaritimeCvView from "./View";

// The page that sells the CV. Its first job is the upload box — everything
// below it answers the questions that stop someone from using it: what
// happens to the file, what it costs, what crewing managers look for.
//
// A Server Component: the copy arrives as HTML in one language, and only the
// upload box ships JavaScript. Each fleet has its own page under
// /maritime-cv/[fleet], built from the same view.
export const revalidate = 86400;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function MaritimeCvPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return <MaritimeCvView c={maritimeCvCopy(locale as Lang)} fleets={fleetPagesCopy(locale as Lang)} locale={locale} />;
}
