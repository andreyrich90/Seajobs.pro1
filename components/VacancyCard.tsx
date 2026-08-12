"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  Ship, User, Calendar, Clock, Bookmark, BookmarkCheck, ShieldCheck, Sparkles, MapPin,
} from "lucide-react";
import { slugId } from "@/lib/slug";
import { normalizeContractDuration } from "@/lib/contract";
import type { Lang } from "@/lib/i18n";

// The one vacancy card. It used to be copy-pasted inline into the job board,
// the homepage, the rank/vessel/country landing pages and the company profile —
// six places that drifted apart. Everything optional degrades: a listing that
// doesn't select `contract_duration` simply doesn't show it.

export type CardVacancy = {
  id: string;
  title: string;
  rank?: string | null;
  vessel_type?: string | null;
  salary_from?: number | null;
  salary_to?: number | null;
  salary_period?: string | null;
  currency?: string | null;
  joining_date?: string | null;
  contract_duration?: string | null;
  featured_until?: string | null;
  companies?: {
    name?: string | null;
    logo_url?: string | null;
    location?: string | null;
    is_verified?: boolean | null;
  } | null;
};

// Letter avatars for companies with no logo. Without one the card loses its
// left column and the list goes ragged. The colour is derived from the name so
// a company always looks the same, and every shade clears 4.5:1 against white.
const AVATAR_COLORS = [
  "#1B4F8A", "#0E6F68", "#7A4FA8", "#2E7D52", "#A9491F", "#155E75", "#8A3B6B", "#3E5C8A",
];
function avatarColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

const MONTHS: Record<string, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  ru: ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
  ua: ["січ", "лют", "бер", "кві", "тра", "чер", "лип", "сер", "вер", "жов", "лис", "гру"],
  pl: ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"],
  ro: ["ian", "feb", "mar", "apr", "mai", "iun", "iul", "aug", "sep", "oct", "noi", "dec"],
};

const UI: Record<string, { from: string; upTo: string; perMonth: string; perDay: string; since: string; save: string; unsave: string; featured: string; noCompany: string; noSalary: string; asap: string; contract: string }> = {
  en: { from: "from", upTo: "up to", perMonth: "USD/mo", perDay: "USD/day", since: "from", save: "Save job", unsave: "Unsave job", featured: "Featured", noCompany: "Company", noSalary: "Salary on request", asap: "ASAP", contract: "contract" },
  ru: { from: "от", upTo: "до", perMonth: "в месяц", perDay: "в сутки", since: "с", save: "Сохранить", unsave: "Убрать из сохранённых", featured: "Рекомендуем", noCompany: "Компания", noSalary: "Зарплата по запросу", asap: "ASAP", contract: "контракт" },
  ua: { from: "від", upTo: "до", perMonth: "на місяць", perDay: "на добу", since: "з", save: "Зберегти", unsave: "Прибрати зі збережених", featured: "Рекомендуємо", noCompany: "Компанія", noSalary: "Зарплата за запитом", asap: "ASAP", contract: "контракт" },
  pl: { from: "od", upTo: "do", perMonth: "mies.", perDay: "dziennie", since: "od", save: "Zapisz", unsave: "Usuń z zapisanych", featured: "Polecane", noCompany: "Firma", noSalary: "Stawka na zapytanie", asap: "ASAP", contract: "kontrakt" },
  ro: { from: "de la", upTo: "până la", perMonth: "pe lună", perDay: "pe zi", since: "din", save: "Salvează", unsave: "Elimină din salvate", featured: "Recomandat", noCompany: "Companie", noSalary: "Salariu la cerere", asap: "ASAP", contract: "contract" },
};

function formatDate(iso: string, lang: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const m = (MONTHS[lang] ?? MONTHS.en)[d.getMonth()];
  return `${d.getDate()} ${m}`;
}

export default function VacancyCard({
  vacancy: v,
  lang,
  saved,
  onToggleSave,
  className = "",
}: {
  vacancy: CardVacancy;
  lang: Lang;
  /** Omit both to hide the bookmark button (listings without a signed-in seafarer). */
  saved?: boolean;
  onToggleSave?: (vacancyId: string) => void;
  className?: string;
}) {
  const ui = UI[lang] ?? UI.en;
  const company = v.companies?.name?.trim() || "";
  const featured = !!v.featured_until && new Date(v.featured_until) > new Date();

  // Day rates must say so: an offshore "450" read as a monthly wage looks like
  // a joke, and that unit is exactly what the importer used to lose.
  const perUnit = v.salary_period === "day" ? ui.perDay : ui.perMonth;
  const cur = v.currency || "USD";
  const money =
    v.salary_from && v.salary_to && v.salary_from !== v.salary_to
      ? `${v.salary_from.toLocaleString()}–${v.salary_to.toLocaleString()}`
      : v.salary_from
      ? `${ui.from} ${v.salary_from.toLocaleString()}`
      : v.salary_to
      ? `${ui.upTo} ${v.salary_to.toLocaleString()}`
      : null;

  // Joining date and contract length are what a seafarer checks after the
  // money, so they get the right half of the footer. A posting with no date is
  // an ASAP one — saying so beats leaving the row half empty.
  const joining = v.joining_date ? `${ui.since} ${formatDate(v.joining_date, lang)}` : ui.asap;
  const duration = normalizeContractDuration(v.contract_duration);

  const moneyEl = money ? (
    <p className="font-display text-[17px] font-bold leading-tight text-white">
      {money} <span className="text-[11.5px] font-semibold text-mist">{cur} {perUnit}</span>
    </p>
  ) : (
    <p className="text-xs font-semibold text-mist">{ui.noSalary}</p>
  );

  const termsEl = (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-mist">
      {duration && (
        <span className="inline-flex items-center gap-1.5" title={ui.contract}>
          <Clock size={12} className="shrink-0" /> {duration}
        </span>
      )}
      <span className="inline-flex items-center gap-1.5">
        <Calendar size={12} className="shrink-0" /> {joining}
      </span>
    </div>
  );

  return (
    <div
      className={`group relative rounded-2xl border bg-card p-3.5 transition hover:border-brass/40 ${
        featured ? "border-brass/40" : "border-white/10"
      } ${className}`}
    >
      {featured && (
        <span className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-brass/20 bg-brass/10 px-2.5 py-0.5 text-[11px] font-bold text-brassInk">
          <Sparkles size={11} /> {ui.featured}
        </span>
      )}

      <div className="flex items-start gap-3">
        {v.companies?.logo_url ? (
          <Image
            src={v.companies.logo_url}
            alt={company}
            width={42}
            height={42}
            className="h-[42px] w-[42px] shrink-0 rounded-xl object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl font-display text-[17px] font-bold text-white"
            style={{ backgroundColor: avatarColor(company || v.title) }}
          >
            {(company || v.title).trim().charAt(0).toUpperCase()}
          </span>
        )}

        <div className="min-w-0 flex-1">
          {(company || v.companies?.location) && (
            <p className="flex items-center gap-1.5 text-xs text-mist">
              {company && <span className="truncate">{company}</span>}
              {v.companies?.is_verified && <ShieldCheck size={12} className="shrink-0 text-teal" />}
              {v.companies?.location && (
                <span className="hidden shrink-0 items-center gap-1 sm:inline-flex">
                  <MapPin size={11} /> {v.companies.location}
                </span>
              )}
            </p>
          )}
          {/* The whole card is the link — the overlay below carries the click,
              so nothing inside needs its own anchor. */}
          <h3 className="mt-0.5 font-semibold leading-snug text-white transition group-hover:text-brassInk">
            <Link href={`/jobs/${slugId(v.title, v.id)}`} className="after:absolute after:inset-0">
              {v.title}
            </Link>
          </h3>
        </div>

        {/* Desktop: the money block sits level with the title instead of at the
            bottom of the card, with the terms under it. Phones keep it in a
            row of its own below — a narrow card has no room beside the title. */}
        <div className="hidden shrink-0 flex-col items-end gap-1 md:flex">
          {moneyEl}
          {termsEl}
        </div>

        {onToggleSave && (
          <button
            type="button"
            onClick={() => onToggleSave(v.id)}
            aria-label={saved ? ui.unsave : ui.save}
            className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-white/10 text-mist transition hover:border-brass/40 hover:text-brassInk"
          >
            {saved ? <BookmarkCheck size={15} className="text-brassInk" /> : <Bookmark size={15} />}
          </button>
        )}
      </div>

      {(v.rank || v.vessel_type) && (
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {v.rank && (
            <span className="inline-flex items-center gap-1 rounded-full border border-brass/20 bg-brass/10 px-2.5 py-0.5 text-[11.5px] font-semibold text-brassInk">
              <User size={11} /> {v.rank}
            </span>
          )}
          {v.vessel_type && (
            <span className="inline-flex items-center gap-1 rounded-full border border-teal/20 bg-teal/10 px-2.5 py-0.5 text-[11.5px] font-semibold text-teal">
              <Ship size={11} /> {v.vessel_type}
            </span>
          )}
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 md:hidden">
        {moneyEl}
        {termsEl}
      </div>
    </div>
  );
}
