"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import JobCard from "@/components/JobCard";
import { T } from "@/lib/i18n";
import { useLang } from "@/components/LangProvider";
import { JOBS } from "@/lib/data";

const RANKS = ["Master", "Chief Officer", "2nd Engineer", "Chief Engineer", "ETO", "AB"];
const VESSELS = ["Bulk Carrier", "Tanker", "Container", "LNG", "Cruise", "Offshore"];

export default function JobsPage() {
  const { lang } = useLang();
  const t = T[lang];
  const [query, setQuery] = useState("");
  const [rank, setRank] = useState("");
  const [vessel, setVessel] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return JOBS.filter(
      (j) =>
        (!q ||
          j.rank.toLowerCase().includes(q) ||
          j.vessel.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q)) &&
        (!rank || j.rank === rank) &&
        (!vessel || j.vessel === vessel)
    );
  }, [query, rank, vessel]);

  const selectClass =
    "rounded-xl border border-white/10 bg-navy2 px-3.5 py-3 text-sm font-semibold text-white outline-none focus:border-brass";

  return (
    <div className="min-h-screen">
      <Header />

      <div className="mx-auto max-w-7xl px-5 py-10">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-white">
          {t.jobs_title}
        </h1>
        <p className="mt-1 text-base text-mist">
          {filtered.length} {t.jobs_found}
        </p>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-card p-3.5">
          <div className="flex min-w-[200px] flex-1 items-center gap-2.5 rounded-xl border border-white/10 bg-navy2 px-3.5">
            <Search size={18} className="text-mist" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.hero_search}
              className="w-full bg-transparent py-3 text-sm text-white outline-none"
            />
          </div>
          <select value={rank} onChange={(e) => setRank(e.target.value)} className={selectClass}>
            <option value="">{t.f_rank}: {t.f_all}</option>
            {RANKS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <select value={vessel} onChange={(e) => setVessel(e.target.value)} className={selectClass}>
            <option value="">{t.f_vessel}: {t.f_all}</option>
            {VESSELS.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center text-lg text-mist">{t.nothing}</div>
        )}
      </div>
    </div>
  );
}
