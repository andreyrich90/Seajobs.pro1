import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import HtmlShell, { SITE_METADATA } from "@/components/HtmlShell";
import CookieBanner from "@/components/CookieBanner";

// The root layout for the routes that carry no locale in the URL: the auth
// screens and the tokenised CV page. Both are English by design — /auth/*
// learns its language in the browser from `lib/authI18n`, and a CV is written
// in English whoever reads it — so the document language is fixed here.
//
// The localized half of the site has its own root layout at
// app/(site)/[locale]/layout.tsx; see components/HtmlShell for why there are
// two of them.

export const metadata: Metadata = {
  ...SITE_METADATA,
  title: "Maritime Jobs for Seafarers & Crewing Companies | SeaJobs",
  description:
    "Find maritime jobs worldwide. Search vacancies by rank, vessel type and salary. / Вакансии для моряков по всему миру — поиск по рангу, типу судна и зарплате. Free platform for seafarers and crewing companies.",
  openGraph: {
    title: "Maritime Jobs for Seafarers & Crewing Companies | SeaJobs",
    description:
      "Find maritime jobs worldwide. Search vacancies by rank, vessel type and salary. / Вакансии для моряков — поиск по рангу, типу судна и зарплате.",
    type: "website",
    siteName: "SeaJobs.pro",
    locale: "en_US",
    alternateLocale: ["ru_RU", "uk_UA", "pl_PL", "ro_RO"],
  },
  twitter: {
    card: "summary",
    title: "Maritime Jobs for Seafarers & Crewing Companies | SeaJobs",
    description: "Find maritime jobs worldwide. Search vacancies by rank, vessel type and salary.",
  },
};

export default function PlainLayout({ children }: { children: React.ReactNode }) {
  // No `messages` on the provider: nothing in the app calls useTranslations, so
  // serialising a dictionary here only added weight. It stays because
  // `@/i18n/navigation` reads its locale.
  return (
    <HtmlShell lang="en">
      <NextIntlClientProvider locale="en">
        {children}
        <CookieBanner />
      </NextIntlClientProvider>
    </HtmlShell>
  );
}
