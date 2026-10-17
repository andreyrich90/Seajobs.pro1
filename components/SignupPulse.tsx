"use client";

import type { Lang } from "@/lib/langs";
import type { SignupPulse as Pulse } from "@/lib/signupPulse";
import { money } from "@/lib/format";
import { slavic } from "@/lib/plural";
import { RefreshCw, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

// The "+N seafarers joined today" strip in the home page's hero: today's
// figure, yesterday's, the week's sum, the seven days as labelled bars, and
// between them how many vacancies are live on the board. It does not
// show how many seafarers the board holds in all — the owner asked for that to
// stay off the home page. The numbers come from the server
// (lib/signupPulse.ts); this only words and draws them.
//
// The copy carries all five languages, about 1 KB: each line needs a plural
// rule, which the flat strings in lib/i18n.ts cannot express.

/** Romanian: 1 "marinar", 2–19 "marinari", 20+ "de marinari" (by the last two digits). */
function ro(n: number, one: string, few: string, many: string): string {
  if (n === 1) return one;
  const h = n % 100;
  return n === 0 || (h >= 1 && h <= 19) ? few : many;
}

type Copy = {
  today: string;
  yesterday: string;
  joined: (n: number) => string;
  prev: (n: number) => string;
  week: (n: number) => string;
  refresh: (m: number) => string;
  /** Label over the live-vacancy count, and the words after the number. */
  liveEyebrow: string;
  live: (n: number) => string;
  /** Weekday abbreviations, Sunday first (Date.getUTCDay order). */
  wd: string[];
};

const COPY: Record<Lang, Copy> = {
  en: {
    today: "Today on SeaJobs",
    yesterday: "Yesterday on SeaJobs",
    joined: (n) => (n === 1 ? "new seafarer joined" : "new seafarers joined"),
    prev: (n) => `Yesterday +${money(n)}`,
    week: (n) => `+${money(n)} in 7 days`,
    refresh: (m) => `Updates every ${m} ${m === 1 ? "minute" : "minutes"}`,
    liveEyebrow: "On the board now",
    live: (n) => (n === 1 ? "live vacancy" : "live vacancies"),
    wd: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  },
  ru: {
    today: "Сегодня на SeaJobs",
    yesterday: "Вчера на SeaJobs",
    joined: (n) => slavic(n, "новый моряк", "новых моряка", "новых моряков"),
    prev: (n) => `Вчера +${money(n)}`,
    week: (n) => `+${money(n)} за 7 дней`,
    refresh: (m) => `Обновляется каждые ${m} ${slavic(m, "минуту", "минуты", "минут")}`,
    liveEyebrow: "Сейчас на сайте",
    live: (n) => slavic(n, "актуальная вакансия", "актуальные вакансии", "актуальных вакансий"),
    wd: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  },
  ua: {
    today: "Сьогодні на SeaJobs",
    yesterday: "Учора на SeaJobs",
    joined: (n) => slavic(n, "новий моряк", "нових моряки", "нових моряків"),
    prev: (n) => `Учора +${money(n)}`,
    week: (n) => `+${money(n)} за 7 днів`,
    refresh: (m) => `Оновлюється кожні ${m} ${slavic(m, "хвилину", "хвилини", "хвилин")}`,
    liveEyebrow: "Зараз на сайті",
    live: (n) => slavic(n, "актуальна вакансія", "актуальні вакансії", "актуальних вакансій"),
    wd: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  },
  pl: {
    today: "Dziś na SeaJobs",
    yesterday: "Wczoraj na SeaJobs",
    // With a numeral, Polish masculine-personal nouns take the genitive from 2 on.
    joined: (n) => (n === 1 ? "nowy marynarz" : "nowych marynarzy"),
    prev: (n) => `Wczoraj +${money(n)}`,
    week: (n) => `+${money(n)} w 7 dni`,
    refresh: (m) => `Aktualizowane co ${m} ${m === 1 ? "minutę" : slavic(m, "minutę", "minuty", "minut")}`,
    liveEyebrow: "Teraz na stronie",
    live: (n) => (n === 1 ? "aktualna oferta" : slavic(n, "aktualnych ofert", "aktualne oferty", "aktualnych ofert")),
    wd: ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "So"],
  },
  ro: {
    today: "Astăzi pe SeaJobs",
    yesterday: "Ieri pe SeaJobs",
    joined: (n) => ro(n, "marinar nou", "marinari noi", "de marinari noi"),
    prev: (n) => `Ieri +${money(n)}`,
    week: (n) => `+${money(n)} în 7 zile`,
    refresh: (m) => `Se actualizează la fiecare ${m} ${m === 1 ? "minut" : ro(m, "minut", "minute", "de minute")}`,
    liveEyebrow: "Acum pe site",
    live: (n) => ro(n, "post activ", "posturi active", "de posturi active"),
    wd: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"],
  },
};

export default function SignupPulse({
  data,
  lang,
  refreshMinutes,
  liveVacancies,
}: {
  data: Pulse;
  lang: Lang;
  /** The page's revalidate interval in minutes; omitted, the line is not shown. */
  refreshMinutes?: number;
  /**
   * Live vacancies on the board, counted the way /jobs lists them (page.tsx).
   * Null when the count failed: the middle block is then left out.
   */
  liveVacancies?: number | null;
}) {
  const c = COPY[lang] ?? COPY.en;
  const eyebrow = data.useYesterday ? c.yesterday : c.today;
  const joined = c.joined(data.count);
  const max = Math.max(1, ...data.days.map((d) => d.n));
  // The bar that matches the headline figure is the brightest.
  const hot = data.useYesterday ? data.days.length - 2 : data.days.length - 1;
  const hasLive = typeof liveVacancies === "number" && liveVacancies > 0;
  const liveLabel = hasLive ? c.live(liveVacancies!) : "";
  // Calendar dates, read at noon UTC so the weekday is the same on the server
  // and in any reader's browser.
  const weekday = (date: string) => c.wd[new Date(`${date}T12:00:00Z`).getUTCDay()];

  return (
    <div
      role="group"
      aria-label={
        `${eyebrow}: +${data.count} ${joined}. ` +
        `${data.useYesterday ? "" : `${c.prev(data.yesterday)}. `}${c.week(data.week)}.` +
        (hasLive ? ` ${c.liveEyebrow}: ${money(liveVacancies!)} ${c.live(liveVacancies!)}.` : "")
      }
      className="mt-6 rounded-2xl border border-teal/25 bg-card/80 px-4 py-3.5 shadow-xl backdrop-blur sm:px-5 sm:py-4"
    >
      {/* Seafarers | vacancies on one row, the week underneath at full width —
          on a desktop too: three across squeezed the seafarer figure onto two
          lines in the hero's column. */}
      <div className={`grid gap-x-4 gap-y-4 sm:gap-x-6 ${hasLive ? "grid-cols-2" : "grid-cols-1"}`}>
        <div className="min-w-0" aria-hidden="true">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-teal sm:tracking-[0.16em]">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-70 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            {eyebrow}
          </p>
          <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="font-display text-3xl font-bold leading-none text-brassInk sm:text-4xl">
              +{money(data.count)}
            </span>
            <span className="text-sm font-semibold text-foam sm:text-base">{joined}</span>
          </p>
          {/* Yesterday and the week; the size of the whole base is deliberately
              not shown. When the headline already is yesterday, only the week.
              Each half stays whole, so a narrow phone breaks the line at the dot. */}
          <p className="mt-1.5 flex flex-wrap gap-x-1.5 text-xs text-mist">
            {!data.useYesterday && (
              <>
                <span className="whitespace-nowrap font-semibold text-foam/80">{c.prev(data.yesterday)}</span>
                <span aria-hidden="true">·</span>
              </>
            )}
            <span className="whitespace-nowrap">{c.week(data.week)}</span>
          </p>
        </div>

        {/* What a seafarer can apply to right now — the same count /jobs lists. */}
        {hasLive && (
          <Link
            href="/jobs"
            aria-label={`${money(liveVacancies!)} ${c.live(liveVacancies!)}`}
            className="group min-w-0 border-l border-teal/15 pl-4 sm:pl-6"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-mist sm:tracking-[0.16em]">{c.liveEyebrow}</p>
            <p className="mt-1.5 font-display text-3xl font-bold leading-none text-foam transition group-hover:text-brassInk sm:text-4xl">
              {money(liveVacancies!)}
            </p>
            {/* The arrow is glued to the last word, or a narrow column drops it
                onto a line of its own. */}
            <p className="mt-1.5 text-xs font-semibold text-mist transition group-hover:text-brassInk">
              {liveLabel.slice(0, liveLabel.lastIndexOf(" ") + 1)}
              <span className="whitespace-nowrap">
                {liveLabel.slice(liveLabel.lastIndexOf(" ") + 1)}
                <ArrowRight size={12} className="ml-1 inline-block align-[-1px]" />
              </span>
            </p>
          </Link>
        )}

        {/* The week, oldest on the left: every day lit and labelled with its
            count, today the brightest. A day with sign-ups never drops below a
            stub, so a quiet morning still reads as a bar rather than a gap. */}
        <div aria-hidden="true" className={`flex items-end justify-between gap-1 sm:gap-2 ${hasLive ? "col-span-2" : ""}`}>
          {data.days.map((d, i) => {
            const isHot = i === hot;
            return (
              <div key={d.date} className="flex flex-1 flex-col items-center" title={`${d.date}: ${d.n}`}>
                <span className={`text-[10px] font-semibold tabular-nums leading-none ${isHot ? "text-brassInk" : "text-mist"}`}>
                  {d.n}
                </span>
                <div className="mt-1 flex h-12 w-full items-end justify-center sm:h-14">
                  <span
                    className={`w-4 rounded-t-md sm:w-5 ${isHot ? "bg-brass" : "bg-brass/60"}`}
                    style={{ height: `${d.n === 0 ? 6 : Math.max(14, Math.round((d.n / max) * 100))}%` }}
                  />
                </div>
                <span className={`mt-1 text-[10px] leading-none ${isHot ? "font-bold text-foam" : "text-mist"}`}>
                  {weekday(d.date)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* How fresh the figures are: the home page is regenerated on this
          interval (its `revalidate`), so this is a fact about the page, not a
          promise of live data. */}
      {refreshMinutes ? (
        <p className="mt-3 flex items-center gap-1.5 border-t border-teal/15 pt-2.5 text-[11px] text-mist">
          <RefreshCw size={11} aria-hidden="true" className="shrink-0 text-teal/80" />
          {c.refresh(refreshMinutes)}
        </p>
      ) : null}
    </div>
  );
}
