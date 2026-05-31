"use client";

import { useState } from "react";
import { Ship, Send, CheckCircle2, TrendingUp } from "lucide-react";
import { T, type Lang } from "@/lib/i18n";
import type { Job } from "@/lib/data";

export default function JobCard({ job, lang }: { job: Job; lang: Lang }) {
  const t = T[lang];
  const [applied, setApplied] = useState(false);

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
    <div className="relative flex flex-wrap items-center gap-5 rounded-2xl border border-white/10 bg-card px-5 py-4 transition hover:border-brass hover:shadow-2xl">
      {/* Logo */}
      <div className="grid h-13 w-13 min-h-[52px] min-w-[52px] place-items-center rounded-xl bg-gradient-to-br from-brass to-brass2 text-base font-extrabold text-deep">
        {job.logo}
      </div>

      {/* Main info */}
      <div className="min-w-[170px]">
        <div className="flex items-center gap-2">
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

      {/* Stats */}
      <div className="flex flex-wrap gap-7 sm:ml-auto">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-[11px] uppercase tracking-wide text-mist">{s.label}</div>
            <div className="mt-0.5 text-base font-bold text-white">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Apply */}
      <button
        onClick={() => setApplied(true)}
        disabled={applied}
        className={`flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-6 py-2.5 text-sm font-bold transition ${
          applied
            ? "bg-teal/20 text-teal"
            : "bg-gradient-to-br from-brass to-brass2 text-deep hover:-translate-y-0.5"
        }`}
      >
        {applied ? (
          <>
            <CheckCircle2 size={16} /> {t.applied}
          </>
        ) : (
          <>
            <Send size={15} /> {t.apply}
          </>
        )}
      </button>
    </div>
  );
}
