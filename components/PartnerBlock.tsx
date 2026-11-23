"use client";

import { ShieldCheck } from "lucide-react";
import VacancyCard, { type CardVacancy } from "@/components/VacancyCard";
import type { Lang } from "@/lib/langs";

// "SeaJobs Partners" — the block that opens the home page and /jobs: vacancies
// of crewing companies whose documents an admin has checked (lib/partners.ts).
// The caller picks the vacancies; an empty list renders nothing, so the block
// simply appears once the first company is approved.

const COPY: Record<string, { title: string; sub: string }> = {
  en: { title: "SeaJobs Partners", sub: "Crewing agencies whose licence and documents the SeaJobs team has checked." },
  ru: { title: "Партнёры SeaJobs", sub: "Крюинговые компании, чью лицензию и документы проверила команда SeaJobs." },
  ua: { title: "Партнери SeaJobs", sub: "Крюїнгові компанії, чию ліцензію та документи перевірила команда SeaJobs." },
  pl: { title: "Partnerzy SeaJobs", sub: "Agencje crewingowe, których licencję i dokumenty sprawdził zespół SeaJobs." },
  ro: { title: "Parteneri SeaJobs", sub: "Agenții de crewing ale căror licență și documente au fost verificate de echipa SeaJobs." },
};

export default function PartnerBlock({ vacancies, lang, className = "" }: { vacancies: CardVacancy[]; lang: Lang; className?: string }) {
  if (!vacancies.length) return null;
  const c = COPY[lang] ?? COPY.en;
  return (
    <section aria-labelledby="partners-title" className={`rounded-2xl border border-teal/30 bg-teal/[0.06] p-4 md:p-5 ${className}`}>
      <h2 id="partners-title" className="flex items-center gap-2 font-display text-xl font-semibold text-white">
        <ShieldCheck size={20} className="shrink-0 text-teal" /> {c.title}
      </h2>
      <p className="mt-1 text-sm text-mist">{c.sub}</p>
      <div className="mt-4 flex flex-col gap-3">
        {vacancies.map((v) => <VacancyCard key={v.id} vacancy={v} lang={lang} />)}
      </div>
    </section>
  );
}
