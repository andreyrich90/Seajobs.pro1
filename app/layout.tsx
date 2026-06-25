import "./globals.css";
import Script from "next/script";
import { Fraunces, Archivo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { LangProvider } from "@/components/LangProvider";
import CookieBanner from "@/components/CookieBanner";
import { HREFLANG } from "@/lib/seo";
import enMessages from "@/messages/en.json";

// Self-hosted fonts (no render-blocking request to Google Fonts).
const fraunces = Fraunces({ subsets: ["latin"], display: "swap", variable: "--font-fraunces" });
const archivo = Archivo({ subsets: ["latin"], display: "swap", variable: "--font-archivo" });

export const metadata = {
  metadataBase: new URL("https://seajobs.pro"),
  title: "Maritime Jobs for Seafarers & Crewing Companies | SeaJobs",
  description: "Find maritime jobs worldwide. Search vacancies by rank, vessel type and salary. / Вакансии для моряков по всему миру — поиск по рангу, типу судна и зарплате. Free platform for seafarers and crewing companies.",
  keywords: "maritime jobs, seafarer jobs, crewing, maritime career, ship jobs, jobs for seamen, crew jobs, sailor jobs, marine jobs, able seaman jobs, chief engineer jobs, deck officer jobs, crewing agency vacancies, " +
    "вакансии для моряков, работа в море, работа на судне, крюинг вакансии, работа моряком, морские вакансии, вакансии моряк, контракт на судно, крюинговая компания вакансии, " +
    "робота для моряків, вакансії моряк, робота на судні, " +
    "praca dla marynarzy, oferty pracy marynarz",
  openGraph: {
    title: "Maritime Jobs for Seafarers & Crewing Companies | SeaJobs",
    description: "Find maritime jobs worldwide. Search vacancies by rank, vessel type and salary. / Вакансии для моряков — поиск по рангу, типу судна и зарплате.",
    type: "website",
    siteName: "SeaJobs.pro",
    locale: "en_US",
    alternateLocale: ["ru_RU", "uk_UA", "pl_PL"],
  },
  twitter: {
    card: "summary",
    title: "Maritime Jobs for Seafarers & Crewing Companies | SeaJobs",
    description: "Find maritime jobs worldwide. Search vacancies by rank, vessel type and salary.",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://seajobs.pro/#organization",
      "name": "SeaJobs.pro",
      "alternateName": ["Вакансии для моряков", "Робота для моряків", "Praca dla marynarzy"],
      "url": "https://seajobs.pro",
      "description": "Maritime job board connecting seafarers with crewing companies worldwide",
      "logo": {
        "@type": "ImageObject",
        "url": "https://seajobs.pro/opengraph-image",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://seajobs.pro/#website",
      "url": "https://seajobs.pro",
      "name": "SeaJobs.pro",
      "inLanguage": ["en", "ru", "uk", "pl"],
      "publisher": { "@id": "https://seajobs.pro/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://seajobs.pro/jobs?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Resolved by the next-intl middleware for [locale] routes; falls back to
  // the default locale on unlocalized routes (e.g. /auth/*).
  const locale = await getLocale();
  const htmlLang = HREFLANG[locale] ?? locale;

  return (
    <html lang={htmlLang} className={`${fraunces.variable} ${archivo.variable}`}>
      <body className="bg-navy text-foam font-body overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9585615049936117"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1H5KRW7TS9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1H5KRW7TS9');
          `}
        </Script>
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <LangProvider>{children}</LangProvider>
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
