import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VacancyCard from "@/components/VacancyCard";
import { monthlyEquivalent } from "@/lib/salary";
import { money } from "@/lib/format";
import { canonicalUrl, hreflangAlternates, OG_LOCALE, alternateOgLocales } from "@/lib/seo";
import type { Lang } from "@/lib/langs";
import { RANK_COPY, rankLandingBySlug, rankName } from "@/lib/rankLandings";
import { vesselLandingBySlug } from "@/lib/vesselLandings";
import {
  COMBO_COPY, MIN_COMBO_VACANCIES, inCombo, liveCombos, vesselOn,
} from "@/lib/rankVesselLandings";
import { getLandingVacancies } from "@/lib/landingVacancies";

// /jobs/rank/chief-engineer/bulk-carrier — see lib/rankVesselLandings.ts for
// why these exist and why only some of them are indexed.
export const revalidate = 300;

// Only the combinations that clear the bar today are prerendered. The rest are
// rendered on request with `noindex`, which is all a stale link deserves.
export async function generateStaticParams() {
  try {
    const combos = liveCombos(await getLandingVacancies());
    return routing.locales.flatMap((locale) =>
      combos.map((c) => ({ locale, slug: c.rank.slug, vessel: c.vessel.slug })),
    );
  } catch {
    // A build without database access still builds; the pages render on demand.
    return [];
  }
}

type Params = { params: Promise<{ slug: string; vessel: string; locale: string }> };

const DATE_LOCALE: Record<Lang, string> = { en: "en-GB", ru: "ru-RU", ua: "uk-UA", pl: "pl-PL", ro: "ro-RO" };

async function load(slug: string, vesselSlug: string) {
  const rank = rankLandingBySlug(slug);
  const vessel = vesselLandingBySlug(vesselSlug);
  if (!rank || !vessel) return null;
  const all = await getLandingVacancies();
  return { rank, vessel, all, vacancies: all.filter((v) => inCombo(v, rank, vessel)) };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, vessel: vesselSlug, locale } = await params;
  const data = await load(slug, vesselSlug);
  if (!data) return { title: "Not found — SeaJobs.pro" };
  const lang = locale as Lang;
  const copy = COMBO_COPY[lang] ?? COMBO_COPY.en;
  const r = rankName(data.rank, lang);
  const on = vesselOn(data.vessel, lang);
  const n = data.vacancies.length;
  const path = `/jobs/rank/${slug}/${vesselSlug}`;
  const canonical = canonicalUrl(path, locale);
  const title = copy.metaTitle(r, on);
  const description = copy.metaDesc(r, on, n);
  return {
    title,
    description,
    // Below the bar the page is a signpost, not something to rank.
    ...(n < MIN_COMBO_VACANCIES ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title, description, type: "website", siteName: "SeaJobs.pro", url: canonical,
      locale: OG_LOCALE[locale], alternateLocale: alternateOgLocales(locale),
    },
    twitter: { card: "summary", title, description },
    alternates: { canonical, languages: hreflangAlternates(path) },
  };
}

export default async function RankVesselPage({ params }: Params) {
  const { slug, vessel: vesselSlug, locale } = await params;
  const data = await load(slug, vesselSlug);
  if (!data) notFound();
  const { rank, vessel, all, vacancies } = data;

  const lang = locale as Lang;
  const copy = COMBO_COPY[lang] ?? COMBO_COPY.en;
  const rankCopy = RANK_COPY[lang] ?? RANK_COPY.en;
  const r = rankName(rank, lang);
  const on = vesselOn(vessel, lang);

  // Salary range in the dominant currency, day rates as a monthly equivalent —
  // the same reading the rank and vessel pages give.
  const withSal = vacancies.filter((v) => v.salary_from || v.salary_to);
  const curTally = new Map<string, number>();
  for (const v of withSal) curTally.set(v.currency, (curTally.get(v.currency) ?? 0) + 1);
  const curr = [...curTally.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "USD";
  const inCur = withSal.filter((v) => v.currency === curr);
  const lows = inCur.map((v) => monthlyEquivalent(v.salary_from ?? v.salary_to!, v.salary_period));
  const highs = inCur.map((v) => monthlyEquivalent(v.salary_to ?? v.salary_from!, v.salary_period));
  const salaryMin = lows.length ? Math.min(...lows) : 0;
  const salaryMax = highs.length ? Math.max(...highs) : 0;

  // Who is hiring and how soon — the facts that make one combination's page
  // say something its neighbours do not.
  const companyTally = new Map<string, number>();
  for (const v of vacancies) {
    const name = v.companies?.name?.trim();
    if (name) companyTally.set(name, (companyTally.get(name) ?? 0) + 1);
  }
  const companies = [...companyTally.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k]) => k);
  const today = new Date().toISOString().slice(0, 10);
  const soonest = vacancies.map((v) => v.joining_date).filter((d): d is string => !!d && d >= today).sort()[0];
  const soonestText = soonest
    ? new Date(soonest).toLocaleDateString(DATE_LOCALE[lang] ?? "en-GB", { timeZone: "UTC", day: "numeric", month: "long", year: "numeric" })
        // "20 октября 2026 г." — the sentence brings its own full stop.
        .replace(/\.$/, "")
    : null;

  // Neighbours worth a link: only combinations that are themselves indexable.
  const combos = liveCombos(all);
  const sameRank = combos.filter((c) => c.rank.slug === rank.slug && c.vessel.slug !== vessel.slug);
  const sameVessel = combos.filter((c) => c.vessel.slug === vessel.slug && c.rank.slug !== rank.slug);

  const path = `/jobs/rank/${slug}/${vesselSlug}`;
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: rankCopy.home, item: canonicalUrl("/", locale) },
      { "@type": "ListItem", position: 2, name: rankCopy.jobsCrumb, item: canonicalUrl("/jobs", locale) },
      { "@type": "ListItem", position: 3, name: rankCopy.h1(r), item: canonicalUrl(`/jobs/rank/${slug}`, locale) },
      { "@type": "ListItem", position: 4, name: copy.h1(r, on), item: canonicalUrl(path, locale) },
    ],
  };

  const chip = "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-mist transition hover:border-brass/40 hover:text-brassInk";

  return (
    <div className="min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <main className="mx-auto max-w-7xl px-5 py-8">
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-mist" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brassInk">{rankCopy.home}</Link>
          <ChevronRight size={12} />
          <Link href="/jobs" className="hover:text-brassInk">{rankCopy.jobsCrumb}</Link>
          <ChevronRight size={12} />
          <Link href={`/jobs/rank/${slug}`} className="hover:text-brassInk">{rankCopy.h1(r)}</Link>
          <ChevronRight size={12} />
          <span className="text-foam">{on}</span>
        </nav>

        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {copy.h1(r, on)}
        </h1>

        <div className="mt-4 max-w-3xl space-y-2 text-[15px] leading-relaxed text-mist">
          {vacancies.length > 0
            ? <p>{copy.countLine(vacancies.length, r, on)}</p>
            : <p>{copy.noneYet(r, on)}</p>}
          {salaryMin > 0 && salaryMax > 0 && <p>{rankCopy.salaryLine(money(salaryMin), money(salaryMax), curr)}</p>}
          {companies.length > 0 && <p>{copy.companiesLine(companies.join(", "))}</p>}
          {soonestText && <p>{copy.soonestLine(soonestText)}</p>}
          {rank.blurb[lang] && <p>{rank.blurb[lang]}</p>}
          {vessel.blurb[lang] && <p>{vessel.blurb[lang]}</p>}
          <p>{rankCopy.requirements}</p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {vacancies.slice(0, 60).map((v) => <VacancyCard key={v.id} vacancy={v} lang={lang} />)}
        </div>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <Link href={`/jobs/rank/${slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brassInk transition hover:gap-2.5">
            {copy.seeRank(r)} <ArrowRight size={16} />
          </Link>
          <Link href={`/jobs/vessel/${vesselSlug}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brassInk transition hover:gap-2.5">
            {copy.seeVessel(on)} <ArrowRight size={16} />
          </Link>
        </div>

        {sameRank.length > 0 && (
          <section className="mt-12 rounded-2xl border border-white/10 bg-card/40 p-5">
            <h2 className="mb-3 font-display text-base font-semibold text-white">{copy.sameRankHeading(r)}</h2>
            <div className="flex flex-wrap gap-2">
              {sameRank.map((c) => (
                <Link key={c.vessel.slug} href={`/jobs/rank/${slug}/${c.vessel.slug}`} className={chip}>
                  {vesselOn(c.vessel, lang)} · {c.count}
                </Link>
              ))}
            </div>
          </section>
        )}

        {sameVessel.length > 0 && (
          <section className="mt-4 rounded-2xl border border-white/10 bg-card/40 p-5">
            <h2 className="mb-3 font-display text-base font-semibold text-white">{copy.sameVesselHeading(on)}</h2>
            <div className="flex flex-wrap gap-2">
              {sameVessel.map((c) => (
                <Link key={c.rank.slug} href={`/jobs/rank/${c.rank.slug}/${vesselSlug}`} className={chip}>
                  {rankName(c.rank, lang)} · {c.count}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
