import { hasLocale } from "next-intl";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates, canonicalUrl } from "@/lib/seo";

const SITE_META: Record<string, { title: string; description: string }> = {
  en: {
    title: "CV distribution to crewing companies | SeaJobs.pro",
    description:
      "Send your seafarer CV straight to the HR desks of shipping companies and crewing agencies — by fleet type. Packages, prices and what the service is not.",
  },
  ru: {
    title: "Рассылка резюме по крюинговым компаниям | SeaJobs.pro",
    description:
      "Анкета моряка уходит напрямую в отделы кадров судоходных компаний и крюингов — по базе вашего флота. Пакеты, цены и чем услуга не является.",
  },
  ua: {
    title: "Розсилка резюме по крюїнгових компаніях | SeaJobs.pro",
    description:
      "Анкета моряка йде напряму у відділи кадрів судноплавних компаній і крюїнгів — по базі вашого флоту. Пакети, ціни та чим послуга не є.",
  },
  pl: {
    title: "Wysyłka CV do firm crewingowych | SeaJobs.pro",
    description:
      "CV marynarza trafia prosto do działów kadr armatorów i agencji crewingowych — według typu floty. Pakiety, ceny i czym ta usługa nie jest.",
  },
  ro: {
    title: "Distribuirea CV-ului către companiile de crewing | SeaJobs.pro",
    description:
      "CV-ul navigatorului ajunge direct la departamentele de personal ale armatorilor și agențiilor de crewing — după tipul flotei. Pachete, prețuri și ce nu este acest serviciu.",
  },
};

const KEYWORDS =
  "cv distribution seafarers, seafarer cv mailing, crewing agencies email list, maritime cv sending service, " +
  "рассылка резюме моряка, разослать резюме по крюингам, рассылка анкеты моряка, " +
  "розсилка резюме моряка, розіслати резюме по крюїнгах, wysyłka cv marynarz, cv do crewingu";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const meta = SITE_META[locale] ?? SITE_META.en;

  return {
    title: meta.title,
    description: meta.description,
    keywords: KEYWORDS,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      siteName: "SeaJobs.pro",
      locale: OG_LOCALE[locale],
      alternateLocale: alternateOgLocales(locale),
    },
    twitter: {
      card: "summary",
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: canonicalUrl("/cv-distribution", locale),
      languages: hreflangAlternates("/cv-distribution"),
    },
  };
}

export default function CvDistributionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
