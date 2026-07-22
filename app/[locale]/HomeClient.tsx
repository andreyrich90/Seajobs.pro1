"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Link, useRouter } from "@/i18n/navigation";
import { Search, Compass, ArrowRight, ChevronRight, ChevronLeft, ShieldCheck, Building2, Calendar, Tag, Clock, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import FaqSection from "@/components/FaqSection";
import SalaryStatsWidget from "@/components/SalaryStats";
import VesselFilter from "@/components/VesselFilter";
import RankFilter from "@/components/RankFilter";
import type { SalaryStats } from "@/lib/salaryStats";
import { FAQ_SEAFARERS } from "@/lib/faq";
import { NEWS } from "@/lib/data";
import { T } from "@/lib/i18n";
import { useLang } from "@/components/LangProvider";
import { slugId } from "@/lib/slug";
import { FLEETS, fleetLabel } from "@/lib/fleets";

export type DbVacancy = {
  id: string;
  title: string;
  rank: string | null;
  vessel_type: string | null;
  salary_from: number | null;
  salary_to: number | null;
  salary_period: string | null;
  currency: string;
  joining_date: string | null;
  companies: { name: string | null; is_verified: boolean } | null;
};

export type DbNews = {
  id: string;
  title: Record<string, string>;
  body: Record<string, string> | null;
  tag: string | null;
  cover_gradient: string | null;
  cover_url: string | null;
  published_at: string | null;
  created_at: string;
};

function newsExcerpt(text: string, max = 120): string {
  const clean = text.replace(/^#{1,6}\s.*$/gm, "").replace(/[#*_>`]/g, "").replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max).replace(/\s+\S*$/, "") + "…" : clean;
}
function newsReadMins(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

const NEWS_TAG_COLORS: Record<string, string> = {
  Regulation: "bg-teal/10 border-teal/20 text-teal",
  Market: "bg-coral/10 border-coral/20 text-coral",
  Industry: "bg-brass/10 border-brass/20 text-brass2",
  Safety: "bg-teal/10 border-teal/20 text-teal",
  Technology: "bg-brass/10 border-brass/20 text-brass2",
};

export default function HomeClient({
  initialVacancies,
  initialNews,
  salaryStats,
}: {
  initialVacancies: DbVacancy[];
  initialNews: DbNews[];
  salaryStats: SalaryStats;
}) {
  const { lang } = useLang();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const t = T[lang];
  const router = useRouter();

  function runSearch() {
    const q = query.trim();
    router.push(q ? `/jobs?q=${encodeURIComponent(q)}` : "/jobs");
  }

  const dbVacancies = initialVacancies;
  const heroCards = dbVacancies.slice(0, 3);
  const PAGE_SIZE = 30;
  const jobsRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.max(1, Math.ceil(dbVacancies.length / PAGE_SIZE));
  const pageItems = dbVacancies.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function goToPage(p: number) {
    setPage(Math.min(Math.max(1, p), totalPages));
    jobsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function pageList(): (number | "…")[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const out: (number | "…")[] = [1];
    if (page > 3) out.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) out.push(i);
    if (page < totalPages - 2) out.push("…");
    out.push(totalPages);
    return out;
  }

  // Latest news for the homepage block (DB articles + static editorial), newest first.
  const ukKey = lang === "ua" ? "uk" : lang;
  const minLabel = lang === "ua" ? "хв читання" : lang === "pl" ? "min czytania" : lang === "ru" ? "мин чтения" : "min read";
  const latestNews = [
    ...initialNews.map((a) => {
      const body = a.body?.[lang] || a.body?.[ukKey] || a.body?.en || "";
      const title = a.title?.[lang] || a.title?.[ukKey] || a.title?.en || "";
      return {
        id: slugId(title, a.id),
        title,
        tag: a.tag ?? "News",
        date: a.published_at ?? a.created_at,
        gradient: a.cover_gradient ?? "linear-gradient(135deg,#0c4a6e,#155e75)",
        coverUrl: a.cover_url ?? null,
        excerpt: newsExcerpt(body),
        readMins: newsReadMins(body),
      };
    }),
    ...NEWS.map((n) => {
      const body = n.body[lang] ?? n.body.en ?? "";
      return {
        id: n.slug,
        title: n.title[lang] ?? n.title.en,
        tag: n.tag,
        date: n.date,
        gradient: n.gradient,
        coverUrl: n.coverUrl ?? null,
        excerpt: newsExcerpt(body),
        readMins: newsReadMins(body),
      };
    }),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const newsDate = (d: string) =>
    new Date(d).toLocaleDateString(
      lang === "ua" ? "uk-UA" : lang === "pl" ? "pl-PL" : lang === "ru" ? "ru-RU" : "en-GB",
      { day: "numeric", month: "long", year: "numeric" },
    );

  return (
    <div className="min-h-screen">
      <Header />

      <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="hero-surface absolute inset-0" />
        <div className="absolute -right-32 top-8 hidden h-96 w-96 rounded-full bg-brass/10 blur-3xl lg:block" />
        <div className="relative mx-auto grid min-w-0 max-w-7xl items-center gap-12 px-5 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left column — copy + search */}
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-brass bg-brass/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brass2">
              <Compass size={14} /> {t.hero_kicker}
            </div>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-foam md:text-6xl">
              {t.hero_title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist">{t.hero_sub}</p>

            <div className="mt-8 flex flex-wrap gap-2.5 rounded-2xl border border-white/10 bg-white p-2 shadow-2xl">
              <div className="flex min-w-[200px] flex-1 items-center gap-2.5 px-3">
                <Search size={20} className="text-[#0a1f33]" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); runSearch(); } }}
                  placeholder={t.hero_search}
                  className="w-full bg-transparent py-3 text-base text-[#0a1f33] outline-none placeholder:text-[#0a1f33]/45"
                />
              </div>
              <Link
                href={query.trim() ? `/jobs?q=${encodeURIComponent(query.trim())}` : "/jobs"}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-6 py-3 text-base font-bold text-[#0a1f33] transition hover:-translate-y-0.5"
              >
                {t.hero_cta} <ArrowRight size={17} />
              </Link>
            </div>

            {/* Position + vessel filters → jump to /jobs with the selection */}
            <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <RankFilter
                value={[]}
                onApply={(ranks) => {
                  const params = new URLSearchParams();
                  if (query.trim()) params.set("q", query.trim());
                  if (ranks.length) params.set("rank", ranks.join(","));
                  const qs = params.toString();
                  router.push(qs ? `/jobs?${qs}` : "/jobs");
                }}
              />
              <VesselFilter
                value={[]}
                onApply={(keys) => {
                  const params = new URLSearchParams();
                  if (query.trim()) params.set("q", query.trim());
                  if (keys.length) params.set("vessel", keys.join(","));
                  const qs = params.toString();
                  router.push(qs ? `/jobs?${qs}` : "/jobs");
                }}
              />
            </div>

            {/* Fleet quick links */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {FLEETS.map((f) => (
                <Link
                  key={f.key}
                  href={{ pathname: "/jobs", query: { fleet: f.key } }}
                  className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-mist backdrop-blur transition hover:border-brass/50 hover:text-brass2"
                >
                  {fleetLabel(f.key, lang)}
                </Link>
              ))}
            </div>

            {/* Salary comparison — desktop shows the full widget on the right; on
                mobile it lives on its own page, linked here. */}
            {salaryStats.hasData && (
              <Link
                href="/salaries"
                className="mt-4 flex items-center justify-between gap-2 rounded-xl border border-brass/30 bg-brass/10 px-4 py-3 text-sm font-bold text-brass2 transition hover:bg-brass/20 lg:hidden"
              >
                <span className="flex items-center gap-2">
                  <TrendingUp size={16} /> {t.salaries_title}
                </span>
                <ArrowRight size={16} />
              </Link>
            )}
          </div>

          {/* Right column — live salary comparison across fleets.
              Desktop only: on mobile the comparison lives on its own /salaries
              page (linked below the search) to keep the hero short. */}
          {salaryStats.hasData ? (
            <div className="relative hidden min-w-0 lg:block">
              <SalaryStatsWidget stats={salaryStats} />
            </div>
          ) : heroCards.length > 0 && (
            <div className="relative hidden lg:block">
              <div className="flex flex-col gap-4">
                {heroCards.map((v, i) => (
                  <Link
                    key={v.id}
                    href={`/jobs/${slugId(v.title, v.id)}`}
                    style={{ marginLeft: i === 1 ? "2.5rem" : i === 2 ? "1.25rem" : 0 }}
                    className="group block rounded-2xl border border-white/10 bg-card px-5 py-4 shadow-xl backdrop-blur transition hover:-translate-y-0.5 hover:border-brass/40"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="truncate font-semibold text-sm text-white">{v.title}</p>
                          {v.companies?.is_verified && <ShieldCheck size={13} className="shrink-0 text-teal" />}
                        </div>
                        {v.companies?.name && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-mist">
                            <Building2 size={11} /> {v.companies.name}
                          </p>
                        )}
                      </div>
                      {(v.salary_from || v.salary_to) && (
                        <span className="shrink-0 rounded-lg bg-brass/10 px-2 py-1 text-xs font-bold text-brass2">
                          {v.salary_from ? v.salary_from.toLocaleString() : v.salary_to!.toLocaleString()} {v.currency}
                        </span>
                      )}
                    </div>
                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                      {v.rank && <span className="rounded-full border border-brass/20 bg-brass/10 px-2 py-0.5 text-[11px] font-semibold text-brass2">{v.rank}</span>}
                      {v.vessel_type && <span className="rounded-full border border-teal/20 bg-teal/10 px-2 py-0.5 text-[11px] font-semibold text-teal">{v.vessel_type}</span>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* LATEST JOBS */}
      <section ref={jobsRef} className="mx-auto max-w-7xl px-5 py-12 scroll-mt-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white">
            {t.jobs_latest}
          </h2>
          <Link
            href="/jobs"
            className="flex cursor-pointer items-center gap-1 text-sm font-bold text-brass2 transition hover:gap-2"
          >
            {t.view_all} <ChevronRight size={17} />
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {dbVacancies.length > 0 ? pageItems.map((v) => (
            <Link key={v.id} href={`/jobs/${slugId(v.title, v.id)}`}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-card px-5 py-4 transition hover:border-white/20 hover:bg-white/5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-sm text-white leading-snug">{v.title}</p>
                  {v.companies?.is_verified && <ShieldCheck size={14} className="text-teal shrink-0" />}
                </div>
                <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-mist">
                  {v.companies?.name && <span className="flex items-center gap-1"><Building2 size={11} />{v.companies.name}</span>}
                  {v.rank && <span className="rounded-full bg-brass/10 border border-brass/20 px-2 py-0.5 text-brass2 font-semibold">{v.rank}</span>}
                  {v.vessel_type && <span className="rounded-full bg-teal/10 border border-teal/20 px-2 py-0.5 text-teal font-semibold">{v.vessel_type}</span>}
                </div>
              </div>
              {(v.salary_from || v.salary_to) && (
                <p className="shrink-0 text-sm font-semibold text-white">
                  {v.salary_from && v.salary_to ? `${v.salary_from.toLocaleString()}–${v.salary_to.toLocaleString()}` : v.salary_from ? `from ${v.salary_from.toLocaleString()}` : `up to ${v.salary_to!.toLocaleString()}`}
                  {" "}{v.currency}
                </p>
              )}
            </Link>
          )) : (
            <div className="rounded-2xl border border-white/10 bg-card px-5 py-10 text-center">
              <p className="text-sm text-mist">{t.jobs_none}</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="flex h-9 items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-semibold text-mist transition hover:text-white disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>
            {pageList().map((p, i) =>
              p === "…" ? (
                <span key={`e${i}`} className="px-2 text-sm text-mist">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`h-9 min-w-9 rounded-lg border px-3 text-sm font-semibold transition ${
                    p === page
                      ? "border-brass/40 bg-brass/15 text-brass2"
                      : "border-white/10 bg-white/5 text-mist hover:text-white"
                  }`}
                >
                  {p}
                </button>
              )
            )}
            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="flex h-9 items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-semibold text-mist transition hover:text-white disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </section>

      {/* LATEST NEWS */}
      {latestNews.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-12">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white">{t.nav_news}</h2>
            <Link
              href="/news"
              className="flex cursor-pointer items-center gap-1 text-sm font-bold text-brass2 transition hover:gap-2"
            >
              {t.view_all} <ChevronRight size={17} />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {latestNews.map((n) => (
              <Link key={n.id} href={`/news/${n.id}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-card transition hover:border-white/20">
                <div className="relative h-32 overflow-hidden" style={{ background: n.coverUrl ? undefined : n.gradient }}>
                  {n.coverUrl && <Image src={n.coverUrl} alt={n.title} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />}
                </div>
                <div className="p-4">
                  <span className={`mb-2 inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${NEWS_TAG_COLORS[n.tag] ?? "bg-white/10 border-white/20 text-white"}`}>
                    <Tag size={10} /> {n.tag}
                  </span>
                  <h3 className="font-display text-sm font-semibold leading-snug text-white transition group-hover:text-brass2 line-clamp-2">
                    {n.title}
                  </h3>
                  <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-mist">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {newsDate(n.date)}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {n.readMins} {minLabel}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* SEO TEXT SECTION */}
      <section className="mx-auto max-w-7xl px-5 pb-4 pt-2">
        <div className="rounded-2xl border border-white/10 bg-card px-8 py-8">
          <h2 className="font-display text-2xl font-semibold text-white mb-4">{t.home_seo_title}</h2>
          <p className="text-sm text-mist leading-relaxed mb-3">{t.home_seo_p1}</p>
          <p className="text-sm text-mist leading-relaxed">{t.home_seo_p2}</p>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection items={FAQ_SEAFARERS} />

      {/* Contact / Suggestions */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="rounded-2xl border border-white/10 bg-card p-8 sm:p-10">
          <div className="mx-auto max-w-xl">
            <ContactForm
              title="Suggestions & Contact"
              subtitle="Have a suggestion, question or feedback? Write to us — we read everything."
            />
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
