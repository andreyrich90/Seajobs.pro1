"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { TrendingUp, ChevronRight } from "lucide-react";
import { useLang } from "@/components/LangProvider";
import type { SalaryStats } from "@/lib/salaryStats";

const L: Record<string, Record<string, string>> = {
  title: {
    en: "Average salaries on the portal", ru: "Средние зарплаты на портале",
    ua: "Середні зарплати на порталі", pl: "Średnie zarobki na portalu", ro: "Salarii medii pe portal",
  },
  live: { en: "Live", ru: "Обновляется", ua: "Оновлюється", pl: "Na żywo", ro: "În timp real" },
  officers: { en: "Officers", ru: "Офицеры", ua: "Офіцери", pl: "Oficerowie", ro: "Ofițeri" },
  ratings: { en: "Ratings", ru: "Рядовые", ua: "Рядовий склад", pl: "Załoga", ro: "Nebrevetați" },
  role: { en: "Rank", ru: "Должность", ua: "Посада", pl: "Stanowisko", ro: "Funcție" },
  note: {
    en: "Average of current vacancies, EUR/month (other currencies converted). Tap a figure for the role guide and open jobs.",
    ru: "Среднее по актуальным вакансиям, EUR/мес (другие валюты пересчитаны). Нажмите на цифру — гайд по должности и вакансии.",
    ua: "Середнє за актуальними вакансіями, EUR/міс (інші валюти перераховано). Натисніть на цифру — гайд і вакансії.",
    pl: "Średnia z aktualnych ofert, EUR/mies (inne waluty przeliczone). Kliknij, aby zobaczyć poradnik i oferty.",
    ro: "Media joburilor curente, EUR/lună (alte valute convertite). Apasă o cifră pentru ghid și joburi.",
  },
  all: { en: "All vacancies", ru: "Все вакансии", ua: "Усі вакансії", pl: "Wszystkie oferty", ro: "Toate joburile" },
};

function fmt(n: number): string {
  if (n >= 1000) {
    const k = n / 1000;
    return (Number.isInteger(k) ? k.toString() : k.toFixed(1).replace(/\.0$/, "")) + "k";
  }
  return n.toString();
}

export default function SalaryStatsWidget({ stats }: { stats: SalaryStats }) {
  const { lang } = useLang();
  const [tab, setTab] = useState<"officers" | "ratings">("officers");
  const rows = tab === "officers" ? stats.officers : stats.ratings;
  const t = (k: string) => L[k][lang] ?? L[k].en;

  return (
    <div className="rounded-2xl border border-white/10 bg-card p-4 shadow-xl sm:p-5">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brass/15">
          <TrendingUp size={16} className="text-brass2" />
        </div>
        <h2 className="flex-1 font-display text-base font-bold text-white">{t("title")}</h2>
        <span className="inline-flex items-center gap-1 rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-teal">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal" /> {t("live")}
        </span>
      </div>

      {/* Tabs */}
      <div className="mb-3 inline-flex rounded-lg border border-white/10 bg-navy/40 p-0.5 text-xs font-semibold">
        {(["officers", "ratings"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`rounded-md px-3 py-1.5 transition ${
              tab === k ? "bg-brass text-[#061523]" : "text-mist hover:text-white"
            }`}
          >
            {t(k)}
          </button>
        ))}
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="px-1.5 py-2 text-left font-semibold text-mist">{t("role")}</th>
              {stats.vessels.map((col) => (
                <th key={col.key} className="px-1.5 py-2 text-center font-semibold">
                  <Link href={`/jobs/vessel/${col.key}`} className="text-teal hover:text-white transition">
                    {col.names[lang] ?? col.names.en}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.slug} className="border-t border-white/5">
                <td className="whitespace-nowrap px-1.5 py-2">
                  <Link href={`/jobs/rank/${r.slug}`} className="font-semibold text-white hover:text-brass2 transition">
                    {r.names[lang] ?? r.names.en}
                  </Link>
                </td>
                {stats.vessels.map((col) => {
                  const cell = r.cells[col.key];
                  return (
                    <td key={col.key} className="px-1 py-1.5 text-center">
                      {cell ? (
                        <Link
                          href={`/jobs/rank/${r.slug}`}
                          title={`${cell.count}`}
                          className="inline-block rounded-md bg-brass/10 px-1.5 py-1 font-bold text-brass2 tabular-nums transition hover:bg-brass/20"
                        >
                          €{fmt(cell.from)}–{fmt(cell.to)}
                        </Link>
                      ) : (
                        <span className="text-mist/40">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/10 pt-3">
        <p className="text-[11px] leading-snug text-mist">{t("note")}</p>
        <Link href="/jobs" className="flex shrink-0 items-center gap-0.5 text-xs font-bold text-brass2 hover:gap-1.5 transition-all">
          {t("all")} <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
}
