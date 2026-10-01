import { Suspense } from "react";
import { connection } from "next/server";
import type { Metadata } from "next";
import { getServerSupabase } from "@/lib/supabase/admin";
import { hreflangAlternates, canonicalUrl } from "@/lib/seo";
import { RANK_LANDINGS } from "@/lib/rankLandings";
import { VESSEL_LANDINGS } from "@/lib/vesselLandings";
import JobsClient, { type VacancyWithCompany } from "./JobsClient";

export const dynamic = "force-dynamic";

// Rank/vessel-filtered listings get their own title/description/canonical so
// "/jobs?rank=AB (Able Seaman)" ranks as a landing page for that query
// cluster. Unfiltered pages keep the metadata from layout.tsx (empty object).
const FILTER_META: Record<string, { title: (label: string) => string; desc: (label: string) => string }> = {
  en: {
    title: (l) => `${l} Jobs at Sea — Fresh Maritime Vacancies | SeaJobs.pro`,
    desc: (l) => `Current ${l} vacancies from verified crewing companies: salary, contract length and joining dates. Apply free on SeaJobs.pro.`,
  },
  ru: {
    title: (l) => `${l} — вакансии, работа в море | SeaJobs.pro`,
    desc: (l) => `Свежие вакансии ${l} от проверенных крюинговых компаний: зарплата, длительность контракта, даты посадки. Откликайтесь бесплатно на SeaJobs.pro.`,
  },
  ua: {
    title: (l) => `${l} — вакансії, робота в морі | SeaJobs.pro`,
    desc: (l) => `Свіжі вакансії ${l} від перевірених крюїнгових компаній: зарплата, тривалість контракту, дати посадки. Відгукуйтесь безкоштовно на SeaJobs.pro.`,
  },
  pl: {
    title: (l) => `${l} — oferty pracy na morzu | SeaJobs.pro`,
    desc: (l) => `Aktualne oferty ${l} od zweryfikowanych firm crewingowych: wynagrodzenie, długość kontraktu, daty zaokrętowania. Aplikuj bezpłatnie na SeaJobs.pro.`,
  },
  ro: {
    title: (l) => `${l} — joburi pe mare | SeaJobs.pro`,
    desc: (l) => `Posturi actuale de ${l} de la companii de crewing verificate: salariu, durata contractului, date de îmbarcare. Aplică gratuit pe SeaJobs.pro.`,
  },
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ rank?: string; vessel?: string }>;
}): Promise<Metadata> {
  const [{ locale }, sp] = await Promise.all([params, searchParams]);
  const rank = (sp.rank ?? "").trim();
  const vessel = (sp.vessel ?? "").trim();
  if (!rank && !vessel) return {}; // plain /jobs → layout metadata

  const label = [rank, vessel].filter(Boolean).join(" — ");
  const meta = FILTER_META[locale] ?? FILTER_META.en;

  const qs = new URLSearchParams();
  if (rank) qs.set("rank", rank);
  if (vessel) qs.set("vessel", vessel);
  const query = `?${qs.toString()}`;

  // A rank-only filter has a dedicated landing at /jobs/rank/<slug> — point the
  // canonical + hreflang there so the query-param URL doesn't compete with it.
  const rankSlug = rank && !vessel
    ? RANK_LANDINGS.find((r) => r.rank === rank)?.slug
    : undefined;

  const vesselSlug = vessel && !rank
    ? VESSEL_LANDINGS.find((vl) => vl.keywords.some((k) => vessel.toLowerCase().includes(k)))?.slug
    : undefined;

  const landingPath = rankSlug ? `/jobs/rank/${rankSlug}` : vesselSlug ? `/jobs/vessel/${vesselSlug}` : null;
  if (landingPath) {
    return {
      title: meta.title(label),
      description: meta.desc(label),
      alternates: { canonical: canonicalUrl(landingPath, locale), languages: hreflangAlternates(landingPath) },
    };
  }

  // hreflang map for the same filter on every locale variant.
  const languages = Object.fromEntries(
    Object.entries(hreflangAlternates("/jobs")).map(([k, v]) => [k, `${v}${query}`])
  );

  return {
    title: meta.title(label),
    description: meta.desc(label),
    alternates: {
      canonical: `${canonicalUrl("/jobs", locale)}${query}`,
      languages,
    },
  };
}

export default async function JobsPage() {
  await connection(); // render per request (fresh vacancies), not at build time
  // Keep vacancies visible for 2 weeks after the joining date (grace period).
  const cutoff = new Date(Date.now() - 14 * 864e5).toISOString().slice(0, 10);
  // Fetch vacancies on the server so the listing is in the initial HTML
  // (SEO + faster first paint). Search/filters/pagination stay client-side.
  // Hide vacancies whose joining date passed more than 2 weeks ago.
  const { data } = await getServerSupabase()
    .from("vacancies")
    .select("id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, created_at, featured_until, companies(name, logo_url, location, is_verified)")
    .eq("is_active", true)
    .or(`joining_date.is.null,joining_date.gte.${cutoff}`)
    .order("featured_until", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .limit(1000);

  return (
    <Suspense>
      <JobsClient initialVacancies={(data ?? []) as VacancyWithCompany[]} />
    </Suspense>
  );
}
