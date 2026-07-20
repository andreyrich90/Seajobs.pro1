import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates, canonicalUrl } from "@/lib/seo";
import CompanyClient from "./CompanyClient";

export const dynamic = "force-dynamic";

const TITLES: Record<string, (name: string) => string> = {
  en: (n) => `${n} — maritime vacancies & crewing | SeaJobs.pro`,
  ru: (n) => `${n} — вакансии и крюинг для моряков | SeaJobs.pro`,
  ua: (n) => `${n} — вакансії та крюїнг для моряків | SeaJobs.pro`,
  pl: (n) => `${n} — oferty pracy i crewing dla marynarzy | SeaJobs.pro`,
  ro: (n) => `${n} — joburi și crewing pentru marinari | SeaJobs.pro`,
};

const DESCS: Record<string, (name: string) => string> = {
  en: (n) => `Current maritime vacancies from ${n}. View open positions, requirements and apply directly on SeaJobs.pro.`,
  ru: (n) => `Актуальные вакансии для моряков от ${n}. Открытые позиции, требования и отклик прямо на SeaJobs.pro.`,
  ua: (n) => `Актуальні вакансії для моряків від ${n}. Відкриті позиції, вимоги та відгук прямо на SeaJobs.pro.`,
  pl: (n) => `Aktualne oferty pracy dla marynarzy od ${n}. Otwarte stanowiska, wymagania i aplikacja na SeaJobs.pro.`,
  ro: (n) => `Joburi actuale pentru marinari de la ${n}. Poziții deschise, cerințe și aplicare direct pe SeaJobs.pro.`,
};

export async function generateMetadata(
  { params }: { params: Promise<{ id: string; locale: string }> }
): Promise<Metadata> {
  const { id, locale } = await params;
  let name = "";
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    const { data } = await supabase.from("companies").select("name").eq("id", id).single();
    name = data?.name?.trim() ?? "";
  } catch {
    /* fall through to default */
  }

  const path = `/companies/${id}`;
  const canonical = canonicalUrl(path, locale);

  if (!name) {
    return {
      title: "Crewing company — maritime vacancies | SeaJobs.pro",
      alternates: { canonical, languages: hreflangAlternates(path) },
    };
  }

  const title = (TITLES[locale] ?? TITLES.en)(name);
  const description = (DESCS[locale] ?? DESCS.en)(name);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "SeaJobs.pro",
      url: canonical,
      locale: OG_LOCALE[locale],
      alternateLocale: alternateOgLocales(locale),
    },
    twitter: { card: "summary", title, description },
    alternates: { canonical, languages: hreflangAlternates(path) },
  };
}

export default function PublicCompanyPage() {
  return <CompanyClient />;
}
