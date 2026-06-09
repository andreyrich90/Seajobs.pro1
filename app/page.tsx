"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Compass, ArrowRight, ChevronRight, Briefcase, ShieldCheck, Building2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import ContactForm from "@/components/ContactForm";
import { T } from "@/lib/i18n";
import { useLang } from "@/components/LangProvider";
import { JOBS } from "@/lib/data";
import { supabase } from "@/lib/supabase/client";

type DbVacancy = {
  id: string;
  title: string;
  rank: string | null;
  vessel_type: string | null;
  salary_from: number | null;
  salary_to: number | null;
  currency: string;
  joining_date: string | null;
  companies: { name: string | null; is_verified: boolean } | null;
};

export default function Home() {
  const { lang } = useLang();
  const [query, setQuery] = useState("");
  const [dbVacancies, setDbVacancies] = useState<DbVacancy[]>([]);
  const t = T[lang];

  useEffect(() => {
    supabase
      .from("vacancies")
      .select("id, title, rank, vessel_type, salary_from, salary_to, currency, joining_date, companies(name, is_verified)")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(25)
      .then(({ data }) => { if (data?.length) setDbVacancies(data as DbVacancy[]); });
  }, []);

  const stats = [
    { n: "1 240+", l: t.stat_jobs },
    { n: "180+", l: t.stat_companies },
    { n: "32k+", l: t.stat_seafarers },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_500px_at_70%_-10%,#0e2a45,#0a1f33_60%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brass bg-brass/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brass2">
              <Compass size={14} /> {t.hero_kicker}
            </div>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              {t.hero_title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist">{t.hero_sub}</p>

            <div className="mt-8 flex max-w-2xl flex-wrap gap-2.5 rounded-2xl bg-white p-2 shadow-2xl">
              <div className="flex min-w-[200px] flex-1 items-center gap-2.5 px-3">
                <Search size={20} className="text-navy" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.hero_search}
                  className="w-full bg-transparent py-3 text-base text-navy outline-none"
                />
              </div>
              <Link
                href={query.trim() ? `/jobs?q=${encodeURIComponent(query.trim())}` : "/jobs"}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-navy to-navy2 px-6 py-3 text-base font-bold text-white transition hover:-translate-y-0.5"
              >
                {t.hero_cta} <ArrowRight size={17} />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-10">
              {stats.map((s) => (
                <div key={s.l}>
                  <div className="font-display text-4xl font-bold text-brass2">{s.n}</div>
                  <div className="text-sm font-medium text-mist">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LATEST JOBS */}
      <section className="mx-auto max-w-7xl px-5 py-12">
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
          {dbVacancies.length > 0 ? dbVacancies.map((v) => (
            <Link key={v.id} href={`/jobs/${v.id}`}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-card px-5 py-4 transition hover:border-white/20 hover:bg-white/5">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brass/10">
                <Briefcase size={18} className="text-brass2" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-white truncate">{v.title}</p>
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
          )) : JOBS.map((job) => (
            <JobCard key={job.id} job={job} lang={lang} />
          ))}
        </div>
      </section>

      {/* SEO TEXT SECTION */}
      <section className="mx-auto max-w-7xl px-5 pb-4 pt-2">
        <div className="rounded-2xl border border-white/10 bg-card px-8 py-8">
          <h2 className="font-display text-2xl font-semibold text-white mb-4">{t.home_seo_title}</h2>
          <p className="text-sm text-mist leading-relaxed mb-3">{t.home_seo_p1}</p>
          <p className="text-sm text-mist leading-relaxed">{t.home_seo_p2}</p>
        </div>
      </section>

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

      <Footer />
    </div>
  );
}
