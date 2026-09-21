import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { OG_LOCALE, alternateOgLocales, contentCanonicalUrl, contentHreflangAlternates } from "@/lib/seo";
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
  // Company profiles are stored English-only → fold pl/ro onto the English
  // canonical and keep the hreflang cluster to en/ru/ua.
  const canonical = contentCanonicalUrl(path, locale);
  const languages = contentHreflangAlternates(path);

  if (!name) {
    return {
      title: "Crewing company — maritime vacancies | SeaJobs.pro",
      alternates: { canonical, languages },
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
    alternates: { canonical, languages },
  };
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Does this company still exist? The profile itself is rendered by the client,
 * which is why a deleted company used to answer 200 and then say "not found" in
 * the body — a soft 404, recrawled forever and liable to be folded into another
 * page as a duplicate. One cheap server-side lookup turns it into a real 404.
 *
 * Same split as the vacancy page: PGRST116 ("no rows") is the only error that
 * means gone; anything else is our side failing and must not be reported as a
 * missing company.
 */
async function companyExists(id: string): Promise<boolean> {
  if (!UUID.test(id)) return false; // never a company URL — don't ask Postgres
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const { error } = await supabase.from("companies").select("id").eq("id", id).single();
  if (error && error.code !== "PGRST116") {
    throw new Error(`company lookup failed: ${error.message}`);
  }
  return !error;
}

export default async function PublicCompanyPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!(await companyExists(id))) notFound();
  return <CompanyClient />;
}
