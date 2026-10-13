"use client";

import type { Lang } from "@/lib/langs";
import type { SignupPulse as Pulse } from "@/lib/signupPulse";
import { money } from "@/lib/format";
import { slavic } from "@/lib/plural";

// The "+N seafarers joined today" strip in the home page's hero: today's
// figure, yesterday's, the week's sum, and the seven days as bars. It does not
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
};

const COPY: Record<Lang, Copy> = {
  en: {
    today: "Today on SeaJobs",
    yesterday: "Yesterday on SeaJobs",
    joined: (n) => (n === 1 ? "new seafarer joined" : "new seafarers joined"),
    prev: (n) => `Yesterday +${money(n)}`,
    week: (n) => `+${money(n)} in 7 days`,
  },
  ru: {
    today: "Сегодня на SeaJobs",
    yesterday: "Вчера на SeaJobs",
    joined: (n) => slavic(n, "новый моряк", "новых моряка", "новых моряков"),
    prev: (n) => `Вчера +${money(n)}`,
    week: (n) => `+${money(n)} за 7 дней`,
  },
  ua: {
    today: "Сьогодні на SeaJobs",
    yesterday: "Учора на SeaJobs",
    joined: (n) => slavic(n, "новий моряк", "нових моряки", "нових моряків"),
    prev: (n) => `Учора +${money(n)}`,
    week: (n) => `+${money(n)} за 7 днів`,
  },
  pl: {
    today: "Dziś na SeaJobs",
    yesterday: "Wczoraj na SeaJobs",
    // With a numeral, Polish masculine-personal nouns take the genitive from 2 on.
    joined: (n) => (n === 1 ? "nowy marynarz" : "nowych marynarzy"),
    prev: (n) => `Wczoraj +${money(n)}`,
    week: (n) => `+${money(n)} w 7 dni`,
  },
  ro: {
    today: "Astăzi pe SeaJobs",
    yesterday: "Ieri pe SeaJobs",
    joined: (n) => ro(n, "marinar nou", "marinari noi", "de marinari noi"),
    prev: (n) => `Ieri +${money(n)}`,
    week: (n) => `+${money(n)} în 7 zile`,
  },
};

export default function SignupPulse({ data, lang }: { data: Pulse; lang: Lang }) {
  const c = COPY[lang] ?? COPY.en;
  const eyebrow = data.useYesterday ? c.yesterday : c.today;
  const joined = c.joined(data.count);
  const max = Math.max(1, ...data.days.map((d) => d.n));
  // The bar that matches the headline figure is gold; yesterday's, when it is
  // the second line, is half-gold.
  const hot = data.useYesterday ? data.days.length - 2 : data.days.length - 1;

  return (
    <div
      role="group"
      aria-label={`${eyebrow}: +${data.count} ${joined}. ${data.useYesterday ? "" : `${c.prev(data.yesterday)}. `}${c.week(data.week)}.`}
      className="mt-6 flex items-center gap-4 rounded-2xl border border-teal/25 bg-card/80 px-4 py-3.5 shadow-xl backdrop-blur sm:gap-6 sm:px-5 sm:py-4"
    >
      <div className="min-w-0 flex-1" aria-hidden="true">
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-teal">
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

      {/* Seven days, oldest on the left. A day with sign-ups never drops below
          a stub, so a quiet morning still reads as a bar rather than a gap. */}
      <div aria-hidden="true" className="flex h-12 shrink-0 items-end gap-1 sm:h-14 sm:gap-1.5">
        {data.days.map((d, i) => (
          <span
            key={d.date}
            title={`${d.date}: ${d.n}`}
            className={`w-1.5 rounded-full sm:w-2 ${
              i === hot ? "bg-brass" : i === hot - 1 && !data.useYesterday ? "bg-brass/45" : "bg-mist/35"
            }`}
            style={{ height: `${d.n === 0 ? 6 : Math.max(18, Math.round((d.n / max) * 100))}%` }}
          />
        ))}
      </div>
    </div>
  );
}
