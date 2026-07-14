import { connection } from "next/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Building2, ShieldCheck, ChevronRight, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getServerSupabase } from "@/lib/supabase/admin";
import { slugId } from "@/lib/slug";
import { monthlyEquivalent } from "@/lib/salary";
import { canonicalUrl, hreflangAlternates, OG_LOCALE, alternateOgLocales } from "@/lib/seo";
import type { Lang } from "@/lib/i18n";
import {
  COUNTRY_LANDINGS, COUNTRY_COPY, countryLandingBySlug, countryName, vacancyMatchesCountry,
} from "@/lib/countryLandings";

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
  country: string | null;
  joining_date: string | null;
  companies: { name: string | null; location: string | null; is_verified: boolean } | null;
};

const SAL: Record<Lang, { from: string; upTo: string; day: string }> = {
  en: { from: "from", upTo: "up to", day: "/day" },
  ru: { from: "от", upTo: "до", day: "/день" },
  ua: { from: "від", upTo: "до", day: "/день" },
  pl: { from: "od", upTo: "do", day: "/dzień" },
  ro: { from: "de la", upTo: "până la", day: "/zi" },
};

async function fetchCountryVacancies(keywords: string[]): Promise<Vac[]> {
  const cutoff = new Date(Date.now() - 14 * 864e5).toISOString().slice(0, 10);
  const { data } = await getServerSupabase()
    .from("vacancies")
    .select("id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, country, joining_date, companies(name, location, is_verified)")
    .eq("is_active", true)
    .or(`joining_date.is.null,joining_date.gte.${cutoff}`)
    .order("created_at", { ascending: false })
    .limit(1000);
  return ((data ?? []) as Vac[]).filter((v) => vacancyMatchesCountry(v.companies?.location ?? null, v.country, keywords));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string; locale: string }> }
): Promise<Metadata> {
  const { slug, locale } = await params;
  const landing = countryLandingBySlug(slug);
  if (!landing) return { title: "Not found — SeaJobs.pro" };
  const lang = locale as Lang;
  const copy = COUNTRY_COPY[lang] ?? COUNTRY_COPY.en;
  const name = countryName(landing, lang);
  const path = `/jobs/country/${slug}`;
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

export default async function CountryLandingPage(
  { params }: { params: Promise<{ slug: string; locale: string }> }
) {
  await connection();
  const { slug, locale } = await params;
  const landing = countryLandingBySlug(slug);
  if (!landing) notFound();

  const lang = locale as Lang;
  const copy = COUNTRY_COPY[lang] ?? COUNTRY_COPY.en;
  const sal = SAL[lang] ?? SAL.en;
  const name = countryName(landing, lang);
  const vacancies = await fetchCountryVacancies(landing.keywords);

  const withSal = vacancies.filter((v) => v.salary_from || v.salary_to);
  const curTally = new Map<string, number>();
  for (const v of withSal) curTally.set(v.currency, (curTally.get(v.currency) ?? 0) + 1);
  const curr = [...curTally.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "USD";
  const inCur = withSal.filter((v) => v.currency === curr);
  const lows = inCur.map((v) => monthlyEquivalent(v.salary_from ?? v.salary_to!, v.salary_period));
  const highs = inCur.map((v) => monthlyEquivalent(v.salary_to ?? v.salary_from!, v.salary_period));
  const salaryMin = lows.length ? Math.min(...lows) : 0;
  const salaryMax = highs.length ? Math.max(...highs) : 0;

  // Top agencies hiring in this country.
  const agencyTally = new Map<string, number>();
  for (const v of vacancies) {
    const n = v.companies?.name;
    if (n) agencyTally.set(n, (agencyTally.get(n) ?? 0) + 1);
  }
  const topAgencies = [...agencyTally.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([k]) => k);

  const fmtSalary = (v: Vac): string | null => {
    if (!v.salary_from && !v.salary_to) return null;
    const day = v.salary_period === "day" ? sal.day : "";
    const num =
      v.salary_from && v.salary_to
        ? `${v.salary_from.toLocaleString()}–${v.salary_to.toLocaleString()}`
        : v.salary_from
        ? `${sal.from} ${v.salary_from.toLocaleString()}`
        : `${sal.upTo} ${v.salary_to!.toLocaleString()}`;
    return `${num} ${v.currency}${day}`;
  };

  const relative = COUNTRY_LANDINGS.filter((c) => c.slug !== slug);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: copy.home, item: canonicalUrl("/", locale) },
      { "@type": "ListItem", position: 2, name: copy.jobsCrumb, item: canonicalUrl("/jobs", locale) },
      { "@type": "ListItem", position: 3, name: copy.h1(name), item: canonicalUrl(`/jobs/country/${slug}`, locale) },
    ],
  };

  return (
    <div className="min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <main className="mx-auto max-w-7xl px-5 py-8">
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-mist" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brass2">{copy.home}</Link>
          <ChevronRight size={12} />
          <Link href="/jobs" className="hover:text-brass2">{copy.jobsCrumb}</Link>
          <ChevronRight size={12} />
          <span className="text-foam">{copy.h1(name)}</span>
        </nav>

        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {copy.h1(name)}
        </h1>

        <div className="mt-4 max-w-3xl space-y-2 text-[15px] leading-relaxed text-mist">
          <p>{copy.countLine(vacancies.length, name)}</p>
          {landing.blurb[lang] && <p>{landing.blurb[lang]}</p>}
          {salaryMin > 0 && salaryMax > 0 && (
            <p>{copy.salaryLine(salaryMin.toLocaleString(), salaryMax.toLocaleString(), curr)}</p>
          )}
          {topAgencies.length > 0 && <p>{copy.agencyLine(topAgencies.join(", "))}</p>}
          <p>{copy.requirements}</p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {vacancies.length > 0 ? vacancies.slice(0, 60).map((v) => {
            const salary = fmtSalary(v);
            return (
              <Link key={v.id} href={`/jobs/${slugId(v.title, v.id)}`}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-card px-5 py-4 transition hover:border-white/20 hover:bg-white/5">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold leading-snug text-white">{v.title}</p>
                    {v.companies?.is_verified && <ShieldCheck size={14} className="shrink-0 text-teal" />}
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-mist">
                    {v.companies?.name && <span className="flex items-center gap-1"><Building2 size={11} />{v.companies.name}</span>}
                    {v.rank && <span className="rounded-full border border-brass/20 bg-brass/10 px-2 py-0.5 font-semibold text-brass2">{v.rank}</span>}
                    {v.vessel_type && <span className="rounded-full border border-teal/20 bg-teal/10 px-2 py-0.5 font-semibold text-teal">{v.vessel_type}</span>}
                  </div>
                </div>
                {salary && <p className="shrink-0 whitespace-nowrap text-sm font-semibold text-white">{salary}</p>}
              </Link>
            );
          }) : (
            <div className="rounded-2xl border border-white/10 bg-card px-5 py-10 text-center">
              <p className="text-sm text-mist">{copy.noneYet(name)}</p>
            </div>
          )}
        </div>

        {vacancies.length > 0 && (
          <Link href="/jobs"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brass2 transition hover:gap-2.5">
            {copy.allJobs} <ArrowRight size={16} />
          </Link>
        )}

        <section className="mt-12 rounded-2xl border border-white/10 bg-card/40 p-5">
          <h2 className="mb-3 font-display text-base font-semibold text-white">{copy.relatedHeading}</h2>
          <div className="flex flex-wrap gap-2">
            {relative.map((c) => (
              <Link key={c.slug} href={`/jobs/country/${c.slug}`}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-mist transition hover:border-brass/40 hover:text-brass2">
                {countryName(c, lang)}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
