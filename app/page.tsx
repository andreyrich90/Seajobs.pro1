"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Compass, ArrowRight, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import JobCard from "@/components/JobCard";
import { T } from "@/lib/i18n";
import { useLang } from "@/components/LangProvider";
import { JOBS } from "@/lib/data";

export default function Home() {
  const { lang } = useLang();
  const [query, setQuery] = useState("");
  const t = T[lang];

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
                href="/jobs"
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
          {JOBS.map((job) => (
            <JobCard key={job.id} job={job} lang={lang} />
          ))}
        </div>
      </section>
    </div>
  );
}
