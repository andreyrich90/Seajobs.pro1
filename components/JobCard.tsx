"use client";

import { Link } from "@/i18n/navigation";
import { Ship, TrendingUp, ArrowRight } from "lucide-react";
import { T, type Lang } from "@/lib/i18n";
import type { Job } from "@/lib/data";

export default function JobCard({ job, lang }: { job: Job; lang: Lang }) {
  const t = T[lang];

  const joinDate = new Date(job.joining).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  const symbol = job.currency === "EUR" ? "€" : "$";

  const stats = [
    { label: t.salary, value: `${symbol}${job.salary.toLocaleString()}` },
    { label: t.duration, value: `${job.duration} mo` },
    { label: t.joining, value: joinDate },
  ];

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-card px-5 py-4 transition hover:border-brass hover:shadow-2xl lg:flex-row lg:items-center lg:gap-6">
      {/* Left: logo + main info */}
      <div className="flex items-center gap-4 lg:w-[300px] lg:shrink-0">
        <div className="grid h-13 w-13 min-h-[52px] min-w-[52px] place-items-center rounded-xl bg-gradient-to-br from-brass to-brass2 text-base font-extrabold text-deep">
          {job.logo}
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-semibold text-white">{job.rank}</h3>
            {job.hot && (
              <span className="flex items-center gap-1 rounded-md bg-coral px-2 py-0.5 text-[11px] font-extrabold tracking-wide text-white">
                <TrendingUp size={11} /> HOT
              </span>
            )}
          </div>
          <div className="mt-0.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-teal">
            <Ship size={14} /> {job.vessel}
          </div>
          <div className="mt-1.5 text-[13px] text-mist">
            {job.flag} {job.company} · {job.location}
          </div>
        </div>
      </div>

      {/* Middle: stats */}
      <div className="grid grid-cols-3 gap-3 lg:flex-1">
        {stats.map((s) => (
          <div key={s.label} className="min-w-0">
            <div className="truncate text-[11px] uppercase tracking-wide text-mist">{s.label}</div>
            <div className="mt-0.5 truncate text-base font-bold text-white">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Right: view all jobs link */}
      <Link
        href="/jobs"
        className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-white/10 hover:-translate-y-0.5 lg:w-[180px] lg:shrink-0"
      >
        {t.view_all} <ArrowRight size={15} />
      </Link>
    </div>
  );
}
