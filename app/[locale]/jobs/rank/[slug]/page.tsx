import { connection } from "next/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Building2, ShieldCheck, ChevronRight, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getServerSupabase } from "@/lib/supabase/admin";
import { slugId } from "@/lib/slug";
import VacancyCard from "@/components/VacancyCard";
import { monthlyEquivalent } from "@/lib/salary";
import { canonicalUrl, hreflangAlternates, OG_LOCALE, alternateOgLocales } from "@/lib/seo";
import type { Lang } from "@/lib/i18n";
import { money } from "@/lib/format";
import {
  RANK_LANDINGS, RANK_COPY, rankLandingBySlug, rankName, vacancyMatchesRank,
} from "@/lib/rankLandings";

export const dynamic = "force-dynamic";

type Vac = {
  id: string;
  title: string;
  rank: string | null;
  vessel_type: string | null;
  salary_from: number | null;
  salary_to: number | null;
  salary_period: string | null;
  currency: string;
  contract_duration: string | null;
  joining_date: string | null;
  companies: { name: string | null; is_verified: boolean } | null;
};

const SAL: Record<Lang, { from: string; upTo: string; day: string }> = {
  en: { from: "from", upTo: "up to", day: "/day" },
  ru: { from: "от", upTo: "до", day: "/день" },
  ua: { from: "від", upTo: "до", day: "/день" },
  pl: { from: "od", upTo: "do", day: "/dzień" },
  ro: { from: "de la", upTo: "până la", day: "/zi" },
};

async function fetchRankVacancies(rank: string): Promise<Vac[]> {
  const cutoff = new Date(Date.now() - 14 * 864e5).toISOString().slice(0, 10);
  const { data } = await getServerSupabase()
    .from("vacancies")
    .select("id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, companies(name, is_verified)")
    .eq("is_active", true)
    .or(`joining_date.is.null,joining_date.gte.${cutoff}`)
    .order("created_at", { ascending: false })
    .limit(1000);
  return ((data ?? []) as Vac[]).filter((v) => vacancyMatchesRank(v.rank, rank));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string; locale: string }> }
): Promise<Metadata> {
  const { slug, locale } = await params;
  const landing = rankLandingBySlug(slug);
  if (!landing) return { title: "Not found — SeaJobs.pro" };
  const lang = locale as Lang;
  const copy = RANK_COPY[lang] ?? RANK_COPY.en;
  const name = rankName(landing, lang);
  const path = `/jobs/rank/${slug}`;
  const canonical = canonicalUrl(path, locale);

  return {
    title: copy.metaTitle(name),
    description: copy.metaDesc(name),
    openGraph: {
      title: copy.metaTitle(name),
      description: copy.metaDesc(name),
      type: "website",
      siteName: "SeaJobs.pro",
      url: canonical,
      locale: OG_LOCALE[locale],
      alternateLocale: alternateOgLocales(locale),
    },
    twitter: { card: "summary", title: copy.metaTitle(name), description: copy.metaDesc(name) },
    alternates: { canonical, languages: hreflangAlternates(path) },
  };
}

export default async function RankLandingPage(
  { params }: { params: Promise<{ slug: string; locale: string }> }
) {
  await connection();
  const { slug, locale } = await params;
  const landing = rankLandingBySlug(slug);
  if (!landing) notFound();

  const lang = locale as Lang;
  const copy = RANK_COPY[lang] ?? RANK_COPY.en;
  const sal = SAL[lang] ?? SAL.en;
  const name = rankName(landing, lang);
  const vacancies = await fetchRankVacancies(landing.rank);

  // ── Live stats woven into the intro ──
  // Day rates are converted to a monthly equivalent (×30) so they're comparable
  // with monthly salaries in the range. Compare within one (dominant) currency.
  const withSal = vacancies.filter((v) => v.salary_from || v.salary_to);
  const curTally = new Map<string, number>();
  for (const v of withSal) curTally.set(v.currency, (curTally.get(v.currency) ?? 0) + 1);
  const curr = [...curTally.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "USD";
  const inCur = withSal.filter((v) => v.currency === curr);
  const lows = inCur.map((v) => monthlyEquivalent(v.salary_from ?? v.salary_to!, v.salary_period));
  const highs = inCur.map((v) => monthlyEquivalent(v.salary_to ?? v.salary_from!, v.salary_period));
  const salaryMin = lows.length ? Math.min(...lows) : 0;
  const salaryMax = highs.length ? Math.max(...highs) : 0;

  const vesselTally = new Map<string, number>();
  for (const v of vacancies) {
    if (v.vessel_type) vesselTally.set(v.vessel_type, (vesselTally.get(v.vessel_type) ?? 0) + 1);
  }
  const topVessels = [...vesselTally.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k]) => k);

  const fmtSalary = (v: Vac): string | null => {
    if (!v.salary_from && !v.salary_to) return null;
    const day = v.salary_period === "day" ? sal.day : "";
    const num =
      v.salary_from && v.salary_to
        ? `${money(v.salary_from)}–${money(v.salary_to)}`
        : v.salary_from
        ? `${sal.from} ${money(v.salary_from)}`
        : `${sal.upTo} ${money(v.salary_to!)}`;
    return `${num} ${v.currency}${day}`;
  };

  const relative = RANK_LANDINGS.filter((r) => r.slug !== slug);

  // ── Breadcrumb structured data ──
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: copy.home, item: canonicalUrl("/", locale) },
      { "@type": "ListItem", position: 2, name: copy.jobsCrumb, item: canonicalUrl("/jobs", locale) },
      { "@type": "ListItem", position: 3, name: copy.h1(name), item: canonicalUrl(`/jobs/rank/${slug}`, locale) },
    ],
  };

  return (
    <div className="min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <main className="mx-auto max-w-7xl px-5 py-8">
        {/* Breadcrumbs */}
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-mist" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brassInk">{copy.home}</Link>
          <ChevronRight size={12} />
          <Link href="/jobs" className="hover:text-brassInk">{copy.jobsCrumb}</Link>
          <ChevronRight size={12} />
          <span className="text-foam">{copy.h1(name)}</span>
        </nav>

        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {copy.h1(name)}
        </h1>

        {/* Intro — localized template woven with live data */}
        <div className="mt-4 max-w-3xl space-y-2 text-[15px] leading-relaxed text-mist">
          <p>{copy.countLine(vacancies.length, name)}</p>
          {landing.blurb[lang] && <p>{landing.blurb[lang]}</p>}
          {salaryMin > 0 && salaryMax > 0 && (
            <p>{copy.salaryLine(money(salaryMin), money(salaryMax), curr)}</p>
          )}
          {topVessels.length > 0 && <p>{copy.vesselLine(topVessels.join(", "))}</p>}
          <p>{copy.requirements}</p>
        </div>

        {/* Vacancy list */}
        <div className="mt-8 flex flex-col gap-3">
          {vacancies.length > 0 ? vacancies.slice(0, 60).map((v) => {
            return (
              <VacancyCard key={v.id} vacancy={v} lang={lang} />
            );
          }) : (
            <div className="rounded-2xl border border-white/10 bg-card px-5 py-10 text-center">
              <p className="text-sm text-mist">{copy.noneYet(name)}</p>
            </div>
          )}
        </div>

        {vacancies.length > 0 && (
          <Link href={{ pathname: "/jobs", query: { rank: landing.rank } }}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brassInk transition hover:gap-2.5">
            {copy.allJobs} <ArrowRight size={16} />
          </Link>
        )}

        {/* Related ranks — internal linking */}
        <section className="mt-12 rounded-2xl border border-white/10 bg-card/40 p-5">
          <h2 className="mb-3 font-display text-base font-semibold text-white">{copy.relatedHeading}</h2>
          <div className="flex flex-wrap gap-2">
            {relative.map((r) => (
              <Link key={r.slug} href={`/jobs/rank/${r.slug}`}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-mist transition hover:border-brass/40 hover:text-brassInk">
                {rankName(r, lang)}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
