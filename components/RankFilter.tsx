"use client";

import { useEffect, useState } from "react";
import { BadgeCheck, Check, ChevronDown, X } from "lucide-react";
import { useLang } from "@/components/LangProvider";
import { RANK_GROUPS } from "@/lib/ranks";

// Single-select rank/position chooser used on the homepage. Mirrors the look of
// VesselFilter (tabs → items) but is single-select, because /jobs filters by one
// exact `?rank=` value. Rank labels stay in English — the same strings the
// /jobs <select> uses — so the applied value matches there without translation.

const UI: Record<string, Record<string, string>> = {
  all: { en: "Position: all", ru: "Должность: все", ua: "Посада: усі", pl: "Stanowisko: wszystkie", ro: "Funcție: toate" },
  apply: { en: "Apply", ru: "Применить", ua: "Застосувати", pl: "Zastosuj", ro: "Aplică" },
  clear: { en: "Clear", ru: "Сбросить", ua: "Скинути", pl: "Wyczyść", ro: "Resetează" },
};

export default function RankFilter({
  value,
  onApply,
  className = "",
}: {
  value: string;
  onApply: (rank: string) => void;
  className?: string;
}) {
  const { lang } = useLang();
  const u = (k: string) => UI[k][lang] ?? UI[k].en;
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(RANK_GROUPS[0].label);
  const [draft, setDraft] = useState<string>(value);

  useEffect(() => { setDraft(value); }, [value]);

  const group = RANK_GROUPS.find((g) => g.label === tab) ?? RANK_GROUPS[0];
  const label = value ? value : u("all");

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => { setDraft(value); setOpen((o) => !o); }}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border px-3.5 py-3 text-sm font-semibold outline-none transition ${
          value
            ? "border-brass/50 bg-brass/10 text-brass2"
            : "border-white/10 bg-navy2 text-white hover:border-white/20"
        }`}
      >
        <span className="flex items-center gap-2 truncate">
          <BadgeCheck size={16} className="shrink-0 opacity-80" /> <span className="truncate">{label}</span>
        </span>
        <ChevronDown size={16} className={`shrink-0 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          {/* click-outside backdrop */}
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute left-0 z-40 mt-2 w-[min(92vw,640px)] rounded-2xl border border-white/10 bg-card p-3 shadow-2xl">
            {/* Group tabs */}
            <div className="mb-3 flex flex-wrap gap-1.5">
              {RANK_GROUPS.map((g) => (
                <button
                  key={g.label}
                  type="button"
                  onClick={() => setTab(g.label)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                    tab === g.label ? "bg-brass text-[#061523]" : "bg-white/5 text-mist hover:text-white"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>

            {/* Ranks for the active group (single-select) */}
            <div className="grid max-h-[46vh] grid-cols-1 gap-1 overflow-y-auto sm:grid-cols-2">
              {group.ranks.map((r) => {
                const checked = draft === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setDraft(checked ? "" : r)}
                    className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition ${
                      checked ? "bg-brass/10 text-white" : "text-mist hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span
                      className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
                        checked ? "border-brass bg-brass text-[#061523]" : "border-white/25"
                      }`}
                    >
                      {checked && <Check size={12} strokeWidth={3} />}
                    </span>
                    {r}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/10 pt-3">
              <button
                type="button"
                onClick={() => setDraft("")}
                className="flex items-center gap-1 text-xs font-semibold text-mist hover:text-white"
              >
                <X size={13} /> {u("clear")}
              </button>
              <button
                type="button"
                onClick={() => { onApply(draft); setOpen(false); }}
                className="rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5"
              >
                {u("apply")}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
