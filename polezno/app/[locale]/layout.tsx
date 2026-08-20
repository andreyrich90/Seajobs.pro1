import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { DictProvider } from "@/components/DictProvider";
import { getDict } from "@/lib/i18n";
import { isLang, LOCALES, type Lang } from "@/lib/langs";

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

const display = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Lang = isLang(locale) ? locale : "ru";
  const dict = getDict(lang);
  return {
    title: {
      default: `${dict["brand"]} — ${dict["brand.tagline"]}`,
      template: `%s · ${dict["brand"]}`,
    },
    description: dict["brand.tagline"],
    metadataBase: new URL("https://recepto.io"),
    alternates: {
      languages: { ru: "/ru", en: "/en" },
    },
    openGraph: {
      title: dict["brand"],
      description: dict["brand.tagline"],
      type: "website",
    },
  };
}

// Light (the warm "Свежо" look) is the default for everyone, regardless of the
// device's system theme. Dark is opt-in only: it applies solely when the user
// picked it with the theme toggle (stored as 'dark'). Runs before paint so
// there is no flash.
const themeScript = `
(function(){try{
  if(localStorage.getItem('polezno-theme')==='dark'){
    document.documentElement.setAttribute('data-theme','dark');
  }
}catch(e){}})();
`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLang(locale)) notFound();
  const lang: Lang = locale;
  const dict = getDict(lang);

  return (
    <html lang={lang} className={`${display.variable} ${body.variable}`}>
      <head>
        {/* Google AdSense loader — only when a publisher id is configured. */}
        {ADSENSE_ID && (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-screen bg-cream text-ink font-body antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <DictProvider lang={lang} dict={dict}>
          <div id="app-root" className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CookieBanner />
        </DictProvider>
      </body>
    </html>
  );
}
