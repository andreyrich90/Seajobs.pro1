import { hasLocale } from "next-intl";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates, canonicalUrl } from "@/lib/seo";

const SITE_META: Record<string, { title: string; description: string }> = {
  en: {
    title: "Galley Menu — Simple Recipes for Ship Crews | SeaJobs.pro",
    description:
      "Easy, budget-friendly galley recipes for seafarers — potatoes, rice, pasta and grains. Open the menu by QR code on any phone.",
  },
  ru: {
    title: "Меню камбуза — простые рецепты для экипажа | SeaJobs.pro",
    description:
      "Простые и недорогие рецепты для камбуза: картофель, рис, паста и крупы. Откройте меню по QR-коду на любом телефоне.",
  },
  ua: {
    title: "Меню камбуза — прості рецепти для екіпажу | SeaJobs.pro",
    description:
      "Прості та недорогі рецепти для камбуза: картопля, рис, паста та крупи. Відкрийте меню за QR-кодом на будь-якому телефоні.",
  },
  pl: {
    title: "Menu kambuza — proste przepisy dla załogi | SeaJobs.pro",
    description:
      "Proste i tanie przepisy dla kambuza: ziemniaki, ryż, makaron i kasze. Otwórz menu kodem QR na dowolnym telefonie.",
  },
  ro: {
    title: "Meniul cambuzei — rețete simple pentru echipaj | SeaJobs.pro",
    description:
      "Rețete simple și ieftine pentru cambuză: cartofi, orez, paste și cereale. Deschide meniul prin cod QR pe orice telefon.",
  },
};

const KEYWORDS =
  "galley menu, ship cook recipes, seafarer recipes, cooking on board, " +
  "меню камбуза, рецепты для моряков, судовой повар, готовим на борту";

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
      canonical: canonicalUrl("/menu", locale),
      languages: hreflangAlternates("/menu"),
    },
  };
}

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return children;
}
