"use client";

import { useEffect, useState } from "react";
import { Ship, Check, ChevronDown, X } from "lucide-react";
import { useLang } from "@/components/LangProvider";
import { VESSEL_CATEGORIES, itemName } from "@/lib/vesselFilter";

const UI: Record<string, Record<string, string>> = {
  all: { en: "Vessel: all", ru: "Судно: все", ua: "Судно: усі", pl: "Statek: wszystkie", ro: "Navă: toate" },
  sel: { en: "Vessel", ru: "Судно", ua: "Судно", pl: "Statek", ro: "Navă" },
  apply: { en: "Apply", ru: "Применить", ua: "Застосувати", pl: "Zastosuj", ro: "Aplică" },
  clear: { en: "Clear", ru: "Сбросить", ua: "Скинути", pl: "Wyczyść", ro: "Resetează" },
};

export default function VesselFilter({
  value,
  onApply,
  className = "",
}: {
  value: string[];
  onApply: (keys: string[]) => void;
  className?: string;
}) {
  const { lang } = useLang();
  const u = (k: string) => UI[k][lang] ?? UI[k].en;
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(VESSEL_CATEGORIES[0].key);
  const [draft, setDraft] = useState<string[]>(value);

  // Keep the draft in sync when the applied value changes from outside.
  useEffect(() => { setDraft(value); }, [value]);

  const cat = VESSEL_CATEGORIES.find((c) => c.key === tab) ?? VESSEL_CATEGORIES[0];
  const toggle = (key: string) =>
    setDraft((d) => (d.includes(key) ? d.filter((k) => k !== key) : [...d, key]));

  const label = value.length === 0 ? u("all") : `${u("sel")}: ${value.length}`;

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => { setDraft(value); setOpen((o) => !o); }}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border px-3.5 py-3 text-sm font-semibold outline-none transition ${
          value.length > 0
            ? "border-brass/50 bg-brass/10 text-brass2"
            : "border-white/10 bg-navy2 text-white hover:border-white/20"
        }`}
      >
        <span className="flex items-center gap-2 truncate">
          <Ship size={16} className="shrink-0 opacity-80" /> {label}
        </span>
        <ChevronDown size={16} className={`shrink-0 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          {/* click-outside backdrop */}
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute left-0 z-40 mt-2 w-[min(92vw,640px)] rounded-2xl border border-white/10 bg-card p-3 shadow-2xl">
            {/* Category tabs */}
            <div className="mb-3 flex flex-wrap gap-1.5">
              {VESSEL_CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setTab(c.key)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                    tab === c.key ? "bg-brass text-[#061523]" : "bg-white/5 text-mist hover:text-white"
                  }`}
                >
                  {c.names[lang] ?? c.names.en}
                </button>
              ))}
            </div>

            {/* Checkboxes for the active category */}
            <div className="grid max-h-[46vh] grid-cols-1 gap-1 overflow-y-auto sm:grid-cols-2">
              {cat.items.map((item) => {
                const checked = draft.includes(item.key);
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => toggle(item.key)}
                    className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition ${
                      checked ? "bg-brass/10 text-white" : "text-mist hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span
                      className={`grid h-4 w-4 shrink-0 place-items-center rounded border ${
                        checked ? "border-brass bg-brass text-[#061523]" : "border-white/25"
                      }`}
                    >
                      {checked && <Check size={12} strokeWidth={3} />}
                    </span>
                    {itemName(item, lang)}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/10 pt-3">
              <button
                type="button"
                onClick={() => setDraft([])}
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
