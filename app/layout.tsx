import "./globals.css";
import Script from "next/script";
import { Fraunces, Archivo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { LangProvider } from "@/components/LangProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
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
  keywords: "maritime jobs, seafarer jobs, crewing, maritime career, ship jobs, jobs for seamen, crew jobs, sailor jobs, marine jobs, jobs at sea, seafarer recruitment, able seaman jobs, ordinary seaman jobs, bosun jobs, motorman jobs, oiler jobs, ship cook jobs, chief engineer jobs, second engineer jobs, deck officer jobs, master mariner jobs, ETO jobs, deck cadet jobs, engine cadet jobs, crewing agency vacancies, tanker jobs, container ship jobs, bulk carrier jobs, offshore vacancies, cruise ship jobs, seafarer jobs no experience, " +
    "вакансии для моряков, работа в море, работа на судне, крюинг вакансии, работа моряком, работа моряком без опыта, морские вакансии, вакансии моряк, свежие вакансии для моряков, контракт на судно, крюинговая компания вакансии, крюинговые компании, вакансии матрос, вакансии моторист, вакансии повар на судно, вакансии механик, вакансии капитан, работа на танкере, работа на оффшоре, зарплата моряка, " +
    "робота для моряків, вакансії моряк, робота на судні, робота моряком, робота в морі, крюїнг вакансії, робота моряком без досвіду, " +
    "praca dla marynarzy, oferty pracy marynarz, praca na statku, praca na morzu, crewing praca, praca marynarz bez doświadczenia, " +
    "joburi pentru marinari, locuri de munca marinari, angajari marinari, munca pe mare, joburi pe vapor, agentii crewing",
  openGraph: {
    title: "Maritime Jobs for Seafarers & Crewing Companies | SeaJobs",
    description: "Find maritime jobs worldwide. Search vacancies by rank, vessel type and salary. / Вакансии для моряков — поиск по рангу, типу судна и зарплате.",
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

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://seajobs.pro/#organization",
      "name": "SeaJobs.pro",
      "alternateName": ["Вакансии для моряков", "Робота для моряків", "Praca dla marynarzy", "Joburi pentru marinari"],
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
      "inLanguage": ["en", "ru", "uk", "pl", "ro"],
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
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('theme')==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}",
          }}
        />
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
          <ThemeProvider>
            <LangProvider>{children}</LangProvider>
            <CookieBanner />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
