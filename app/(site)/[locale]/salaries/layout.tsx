import { hasLocale } from "next-intl";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates, canonicalUrl } from "@/lib/seo";

const SITE_META: Record<string, { title: string; description: string }> = {
  en: {
    title: "Seafarer Salary Comparison — Pay by Rank & Vessel Type | SeaJobs.pro",
    description:
      "Compare seafarer salary ranges by rank and vessel type, based on current vacancies on SeaJobs.pro. EUR and USD, per month.",
  },
  ru: {
    title: "Сравнение зарплат моряков — оплата по должности и типу судна | SeaJobs.pro",
    description:
      "Сравнивайте диапазоны зарплат моряков по должности и типу судна на основе актуальных вакансий SeaJobs.pro. EUR и USD, за месяц.",
  },
  ua: {
    title: "Порівняння зарплат моряків — оплата за посадою та типом судна | SeaJobs.pro",
    description:
      "Порівнюйте діапазони зарплат моряків за посадою та типом судна на основі актуальних вакансій SeaJobs.pro. EUR і USD, за місяць.",
  },
  pl: {
    title: "Porównanie zarobków marynarzy — płaca wg stanowiska i typu statku | SeaJobs.pro",
    description:
      "Porównuj widełki płac marynarzy według stanowiska i typu statku na podstawie aktualnych ofert SeaJobs.pro. EUR i USD, miesięcznie.",
  },
  ro: {
    title: "Comparație salarii marinari — plata după funcție și tipul navei | SeaJobs.pro",
    description:
      "Compară intervalele salariale ale marinarilor după funcție și tipul navei, pe baza joburilor curente de pe SeaJobs.pro. EUR și USD, pe lună.",
  },
};

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
      canonical: canonicalUrl("/salaries", locale),
      languages: hreflangAlternates("/salaries"),
    },
  };
}

export default function SalariesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
