"use client";

import { useState } from "react";
import { Ship, Award, Clock, Calendar, MapPin, Send, CheckCircle2, TrendingUp } from "lucide-react";
import { T, type Lang } from "@/lib/i18n";
import type { Job } from "@/lib/data";

export default function JobCard({ job, lang }: { job: Job; lang: Lang }) {
  const t = T[lang];
  const [applied, setApplied] = useState(false);

  const joinDate = new Date(job.joining).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  const meta = [
    { icon: Award, label: t.salary, value: `$${job.salary.toLocaleString()}` },
    { icon: Clock, label: t.duration, value: `${job.duration} mo` },
    { icon: Calendar, label: t.joining, value: joinDate },
    { icon: MapPin, label: t.flag_l, value: job.flag },
  ];

  return (
    <div className="relative flex flex-col rounded-2xl border border-white/10 bg-card p-5 transition hover:-translate-y-1 hover:border-brass hover:shadow-2xl">
      {job.hot && (
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-md bg-coral px-2 py-0.5 text-[11px] font-extrabold tracking-wide text-white">
          <TrendingUp size={11} /> HOT
        </div>
      )}

      {/* Company */}
      <div className="mb-3.5 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brass to-brass2 text-sm font-extrabold text-deep">
          {job.logo}
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{job.company}</div>
          <div className="flex items-center gap-1.5 text-[13px] text-mist">
            {job.flag} {job.location}
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-display text-xl font-semibold text-white">{job.rank}</h3>
      <div className="mb-3.5 mt-1 inline-flex items-center gap-1.5 text-[13px] font-semibold text-teal">
        <Ship size={14} /> {job.vessel}
      </div>

      {/* Meta grid */}
      <div className="mb-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-3.5">
        {meta.map((m) => (
          <div key={m.label}>
            <div className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-mist">
              <m.icon size={12} /> {m.label}
            </div>
            <div className="mt-0.5 text-[15px] font-bold text-white">{m.value}</div>
          </div>
        ))}
      </div>

      {/* Apply */}
      <button
        onClick={() => setApplied(true)}
        disabled={applied}
        className={`mt-auto flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition ${
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
