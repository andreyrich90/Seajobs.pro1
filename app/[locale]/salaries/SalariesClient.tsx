"use client";

import { TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SalaryStatsWidget from "@/components/SalaryStats";
import { useLang } from "@/components/LangProvider";
import { T } from "@/lib/i18n";
import type { SalaryStats } from "@/lib/salaryStats";

const EMPTY: Record<string, string> = {
  en: "No salary data yet — check back once more vacancies are published.",
  ru: "Пока нет данных по зарплатам — загляните позже, когда появятся вакансии.",
  ua: "Поки немає даних по зарплатах — завітайте пізніше, коли з'являться вакансії.",
  pl: "Brak danych o zarobkach — zajrzyj później, gdy pojawi się więcej ofert.",
  ro: "Încă nu există date despre salarii — reveniți când vor apărea mai multe joburi.",
};

export default function SalariesClient({ stats }: { stats: SalaryStats }) {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-10">
        <div className="mb-6 flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brass/15">
            <TrendingUp size={22} className="text-brass2" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {t.salaries_title}
            </h1>
            <p className="mt-1 max-w-2xl text-base text-mist">{t.salaries_sub}</p>
          </div>
        </div>

        {stats.hasData ? (
          <SalaryStatsWidget stats={stats} />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-card p-10 text-center text-mist">
            {EMPTY[lang] ?? EMPTY.en}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
