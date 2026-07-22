"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { Search, ShieldCheck, Building2, ArrowRight, Bookmark, BookmarkCheck, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase/client";
import { searchMatches } from "@/lib/searchSynonyms";
import { slugId } from "@/lib/slug";
import { FLEETS, fleetLabel, fleetMatches } from "@/lib/fleets";
import { vesselFilterMatches } from "@/lib/vesselFilter";
import VesselFilter from "@/components/VesselFilter";
import RankFilter from "@/components/RankFilter";
import { useLang } from "@/components/LangProvider";
import { T } from "@/lib/i18n";

export type VacancyWithCompany = {
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
  created_at: string;
  featured_until: string | null;
  companies: {
    name: string | null;
    logo_url: string | null;
    location: string | null;
    is_verified: boolean;
  } | null;
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function isFeatured(featuredUntil: string | null): boolean {
  return !!featuredUntil && new Date(featuredUntil) > new Date();
}

function formatSalary(v: VacancyWithCompany, fromLabel: string, upToLabel: string, perDayLabel: string): string {
  if (!v.salary_from && !v.salary_to) return "";
  const per = v.salary_period === "day" ? perDayLabel : "";
  if (v.salary_from && v.salary_to) return `${v.salary_from.toLocaleString()}–${v.salary_to.toLocaleString()} ${v.currency}${per}`;
  if (v.salary_from) return `${fromLabel} ${v.salary_from.toLocaleString()} ${v.currency}${per}`;
  return `${upToLabel} ${v.salary_to!.toLocaleString()} ${v.currency}${per}`;
}

export default function JobsClient({ initialVacancies }: { initialVacancies: VacancyWithCompany[] }) {
  const searchParams = useSearchParams();
  const vacancies = initialVacancies;
  // Initialise filters from the URL so they survive a back-navigation from a
  // vacancy detail page (state alone would reset on remount).
  const { lang } = useLang();
  const t = T[lang];
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [ranks, setRanks] = useState<string[]>(
    (searchParams.get("rank") ?? "").split(",").map((s) => s.trim()).filter(Boolean)
  );
  const [vessels, setVessels] = useState<string[]>(
    (searchParams.get("vessel") ?? "").split(",").map((s) => s.trim()).filter(Boolean)
  );
  const [fleet, setFleet] = useState(searchParams.get("fleet") ?? "");
  const [userId, setUserId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(() => {
    const p = parseInt(searchParams.get("page") ?? "1", 10);
    return Number.isFinite(p) && p > 0 ? p : 1;
  });
  const PAGE_SIZE = 30;
  const resultsRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);

  useEffect(() => {
    // Saved jobs are user-specific — load them on the client.
    async function loadSaved() {
      const { data: { session } } = await supabase.auth.getSession();
      const uid = session?.user?.id ?? null;
      setUserId(uid);
      if (!uid) return;

      const { data } = await supabase
        .from("saved_vacancies")
        .select("vacancy_id")
        .eq("seafarer_id", uid);
      setSavedIds(new Set((data ?? []).map((r) => r.vacancy_id as string)));
    }
    loadSaved();
  }, []);

  async function toggleSave(e: React.MouseEvent, vacancyId: string) {
    e.preventDefault();
    e.stopPropagation();
    if (!userId) return;

    if (savedIds.has(vacancyId)) {
      await supabase.from("saved_vacancies").delete().eq("vacancy_id", vacancyId).eq("seafarer_id", userId);
      setSavedIds((prev) => {
        const next = new Set(prev);
        next.delete(vacancyId);
        return next;
      });
    } else {
      await supabase.from("saved_vacancies").insert({ vacancy_id: vacancyId, seafarer_id: userId });
      setSavedIds((prev) => new Set(prev).add(vacancyId));
    }
  }

  const filtered = vacancies.filter((v) => {
    // Bilingual search: "капитан" matches "Master" and vice-versa.
    const haystack = `${v.title} ${v.rank ?? ""} ${v.vessel_type ?? ""} ${v.companies?.name ?? ""}`;
    const matchQuery = searchMatches(haystack, query);
    const matchRank =
      ranks.length === 0 ||
      ranks.some((rank) =>
        v.rank === rank ||
        (rank === "AB (Able Seaman)" && (v.rank?.startsWith("AB ") ?? false)) ||
        (rank === "OS (Ordinary Seaman)" && (v.rank?.startsWith("OS ") ?? false)),
      );
    const matchVessel = vesselFilterMatches(vessels, `${v.vessel_type ?? ""} ${v.title}`);
    const matchFleet = !fleet || fleetMatches(fleet, `${v.vessel_type ?? ""} ${v.title}`);
    return matchQuery && matchRank && matchVessel && matchFleet;
  });

  // Reset to the first page whenever the filters change the result set — but
  // not on the initial mount, so a page restored from the URL is preserved.
  useEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    setPage(1);
  }, [query, ranks, vessels, fleet]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Mirror the active filters into the URL (without a navigation/refetch) so
  // returning to this page via the browser Back button restores them.
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (ranks.length) params.set("rank", ranks.join(","));
    if (vessels.length) params.set("vessel", vessels.join(","));
    if (fleet) params.set("fleet", fleet);
    if (currentPage > 1) params.set("page", String(currentPage));
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [query, ranks, vessels, fleet, currentPage]);

  function goToPage(p: number) {
    setPage(Math.min(Math.max(1, p), totalPages));
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function pageList(): (number | "…")[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const out: (number | "…")[] = [1];
    if (currentPage > 3) out.push("…");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) out.push(i);
    if (currentPage < totalPages - 2) out.push("…");
    out.push(totalPages);
    return out;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="mx-auto max-w-7xl px-5 py-10">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-white">{t.jobs_title}</h1>
        <p className="mt-1 text-base text-mist">{`${filtered.length} ${t.jobs_found}`}</p>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-card p-3.5">
          <div className="flex w-full items-center gap-2.5 rounded-xl border border-white/10 bg-navy2 px-3.5 sm:w-auto sm:min-w-[220px] sm:flex-[2]">
            <Search size={18} className="text-mist" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.jobs_search_ph}
              className="w-full bg-transparent py-3 text-sm text-white outline-none"
            />
          </div>
          <RankFilter value={ranks} onApply={setRanks} className="w-full sm:w-auto sm:min-w-[160px] sm:flex-1" />
          <VesselFilter value={vessels} onApply={setVessels} className="w-full sm:w-auto sm:min-w-[160px] sm:flex-1" />

          {/* Fleet quick filter */}
          <div className="flex w-full flex-wrap gap-2 border-t border-white/10 pt-3">
            {FLEETS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFleet(fleet === f.key ? "" : f.key)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                  fleet === f.key
                    ? "border-brass bg-brass/20 text-brass2"
                    : "border-white/10 bg-white/5 text-mist hover:border-brass/40 hover:text-brass2"
                }`}
              >
                {fleetLabel(f.key, lang)}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-card p-12 text-center">
            <Building2 size={40} className="mx-auto mb-3 text-mist/40" />
            <p className="text-lg font-semibold text-foam">{t.jobs_no_results}</p>
            <p className="mt-1 text-sm text-mist">{t.jobs_none_hint}</p>
          </div>
        ) : (
          <div ref={resultsRef} className="mt-6 flex flex-col gap-3 scroll-mt-20">
            {pageItems.map((v) => {
              const salary = formatSalary(v, t.jobs_from, t.jobs_up_to, t.jobs_per_day);
              const featured = isFeatured(v.featured_until);
              return (
                <Link
                  key={v.id}
                  href={`/jobs/${slugId(v.title, v.id)}`}
                  className={`group block rounded-2xl border bg-card p-5 transition hover:border-white/20 ${
                    featured ? "border-brass/40" : "border-white/10"
                  }`}
                >
                  {featured && (
                    <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-brass/10 border border-brass/20 px-2.5 py-0.5 text-[11px] font-semibold text-brass2">
                      <Sparkles size={11} /> {t.jobs_featured}
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    {/* Company logo */}
                    {v.companies?.logo_url && (
                      <div className="shrink-0">
                        <Image
                          src={v.companies.logo_url}
                          alt={v.companies.name ?? ""}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-xl object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-xs text-mist">
                              {v.companies?.name ?? t.jobs_unknown_company}
                            </p>
                            {v.companies?.is_verified && (
                              <ShieldCheck size={13} className="text-teal" />
                            )}
                            {v.companies?.location && (
                              <span className="text-xs text-mist">· {v.companies.location}</span>
                            )}
                          </div>
                          <h3 className="mt-0.5 font-semibold text-white group-hover:text-brass2 transition line-clamp-2 break-words">
                            {v.title}
                          </h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {v.rank && (
                              <span className="rounded-full bg-brass/10 border border-brass/20 px-2.5 py-0.5 text-xs font-semibold text-brass2">
                                {v.rank}
                              </span>
                            )}
                            {v.vessel_type && (
                              <span className="rounded-full bg-teal/10 border border-teal/20 px-2.5 py-0.5 text-xs font-semibold text-teal">
                                {v.vessel_type}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex shrink-0 items-start gap-2">
                          <div className="text-right">
                            {salary && (
                              <p className="whitespace-nowrap text-sm font-bold text-white">{salary}</p>
                            )}
                          </div>
                          {userId && (
                            <button
                              onClick={(e) => toggleSave(e, v.id)}
                              className="rounded-lg p-1.5 text-mist transition hover:bg-white/10 hover:text-brass2"
                              aria-label={savedIds.has(v.id) ? "Unsave job" : "Save job"}
                            >
                              {savedIds.has(v.id) ? (
                                <BookmarkCheck size={18} className="text-brass2" />
                              ) : (
                                <Bookmark size={18} />
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-mist">
                          {v.contract_duration && <span>{v.contract_duration}</span>}
                          {v.joining_date && <span>{t.jobs_joining}: {formatDate(v.joining_date)}</span>}
                          <span>{t.jobs_posted}: {formatDate(v.created_at)}</span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brass2 group-hover:gap-2.5 transition-all">
                          {t.jobs_view_apply} <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
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
                        p === currentPage
                          ? "border-brass/40 bg-brass/15 text-brass2"
                          : "border-white/10 bg-white/5 text-mist hover:text-white"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex h-9 items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-semibold text-mist transition hover:text-white disabled:opacity-40"
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
