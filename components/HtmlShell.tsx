import "../app/globals.css";
import Script from "next/script";
import { Fraunces, Archivo } from "next/font/google";
import { LangProvider } from "@/components/LangProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

// The document itself: <html>, <body>, fonts, the pre-paint theme script, the
// site-wide JSON-LD and the analytics tags.
//
// It lives in a component rather than in one root layout because the site has
// two of them. The reason is `lang`: it has to be the reader's language, and a
// layout can only know that from the URL, which means the layout that owns
// <html> must sit *under* the [locale] segment. A single root layout above it
// could only learn the locale by reading request headers — and that one call
// made every page on the site render per request, ignoring every `revalidate`
// in the codebase. Splitting the root is what lets the public pages be cached.
//
// So: app/(site)/[locale]/layout.tsx wraps the localized tree and passes the
// real language; app/(plain)/layout.tsx wraps /auth and /cv, which have no
// locale in the URL; app/not-found.tsx wraps itself, since an unmatched URL
// belongs to neither group.

// Self-hosted fonts (no render-blocking request to Google Fonts).
// NOTE: neither Fraunces nor Archivo ships a Cyrillic subset on Google Fonts
// (latin / latin-ext / vietnamese only), so ru/ua text renders in the fallback
// system font. Changing that needs a different family, not a subset tweak.
const fraunces = Fraunces({ subsets: ["latin"], display: "swap", variable: "--font-fraunces" });
const archivo = Archivo({ subsets: ["latin"], display: "swap", variable: "--font-archivo" });

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
      "sameAs": ["https://www.linkedin.com/in/seajobs-pro"],
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

export default function HtmlShell({
  lang,
  children,
}: {
  /** A BCP-47 tag — "uk", not the "ua" used in URLs. See HREFLANG in lib/seo. */
  lang: string;
  children: React.ReactNode;
}) {
  return (
    <html lang={lang} className={`${fraunces.variable} ${archivo.variable}`} suppressHydrationWarning>
      <body className="bg-navy text-foam font-body overflow-x-hidden">
        <script
          dangerouslySetInnerHTML={{
            // «Открытый океан» is the CSS default, so nothing has to run for
            // it to appear — this only marks the opt-in light theme, before
            // paint. Preference comes from localStorage, falling back to the
            // `theme` cookie (survives in-app browsers that wipe localStorage).
            // The stored values are unchanged, so anyone who previously chose
            // a theme keeps the one they chose.
            // suppressHydrationWarning on <html> keeps React from stripping the
            // attribute during hydration.
            __html:
              "try{var t=localStorage.getItem('theme');if(!t){var m=document.cookie.match(/(?:^|;\\s*)theme=(light|dark)/);t=m&&m[1];}if(t==='light')document.documentElement.setAttribute('data-theme','light');}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {/* Ads and analytics are not needed for interactivity — load them
            during idle time so they stop adding to Total Blocking Time. */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9585615049936117"
          strategy="lazyOnload"
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
        {/* CookieBanner is NOT here, though it is on every page: it links to
            /privacy through @/i18n/navigation, which needs next-intl's locale
            context. That provider is supplied by each root layout, below this
            one, so the banner is rendered there — inside it. */}
        <ThemeProvider>
          <LangProvider>{children}</LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

/** The site-wide defaults every root layout repeats. */
export const SITE_METADATA = {
  metadataBase: new URL("https://seajobs.pro"),
  keywords:
    "maritime jobs, seafarer jobs, crewing, maritime career, ship jobs, jobs for seamen, crew jobs, sailor jobs, marine jobs, jobs at sea, seafarer recruitment, able seaman jobs, ordinary seaman jobs, bosun jobs, motorman jobs, oiler jobs, ship cook jobs, chief engineer jobs, second engineer jobs, deck officer jobs, master mariner jobs, ETO jobs, deck cadet jobs, engine cadet jobs, crewing agency vacancies, tanker jobs, container ship jobs, bulk carrier jobs, offshore vacancies, cruise ship jobs, seafarer jobs no experience, " +
    "вакансии для моряков, работа в море, работа на судне, крюинг вакансии, работа моряком, работа моряком без опыта, морские вакансии, вакансии моряк, свежие вакансии для моряков, контракт на судно, крюинговая компания вакансии, крюинговые компании, вакансии матрос, вакансии моторист, вакансии повар на судно, вакансии механик, вакансии капитан, работа на танкере, работа на оффшоре, зарплата моряка, " +
    "робота для моряків, вакансії моряк, робота на судні, робота моряком, робота в морі, крюїнг вакансії, робота моряком без досвіду, " +
    "praca dla marynarzy, oferty pracy marynarz, praca na statku, praca na morzu, crewing praca, praca marynarz bez doświadczenia, " +
    "joburi pentru marinari, locuri de munca marinari, angajari marinari, munca pe mare, joburi pe vapor, agentii crewing",
};
