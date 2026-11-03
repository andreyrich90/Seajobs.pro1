import type { ReactNode } from "react";
import type { Lang } from "@/lib/langs";

// The row of European flags under the home hero. Drawn as small inline SVGs
// rather than emoji: Windows renders flag emoji as two letters ("PL"), which
// would turn the row into a list of codes for most desktop readers.
//
// Flags are simplified where a coat of arms would be a smudge at 22 px
// (Croatia keeps a checkered shield, Portugal a gold disc, Spain the plain
// civil flag). Names are written out per language — the row is rendered on the
// server and hydrated in the browser, which need not agree on Intl names.
//
// Order: the countries most of our seafarers come from first, then the rest.

type Flag = { code: string; names: Record<Lang, string>; svg: ReactNode; box: string };

const h3 = (a: string, b: string, c: string) => (
  <>
    <rect width="30" height="20" fill={b} />
    <rect width="30" height="6.67" fill={a} />
    <rect y="13.33" width="30" height="6.67" fill={c} />
  </>
);
const v3 = (a: string, b: string, c: string) => (
  <>
    <rect width="30" height="20" fill={b} />
    <rect width="10" height="20" fill={a} />
    <rect x="20" width="10" height="20" fill={c} />
  </>
);
const nordic = (bg: string, cross: string, inner?: string) => (
  <>
    <rect width="30" height="20" fill={bg} />
    <rect x="8" width={inner ? 6 : 4} height="20" fill={cross} />
    <rect y={inner ? 7 : 8} width="30" height={inner ? 6 : 4} fill={cross} />
    {inner && (
      <>
        <rect x="9.5" width="3" height="20" fill={inner} />
        <rect y="8.5" width="30" height="3" fill={inner} />
      </>
    )}
  </>
);

const FLAGS: Flag[] = [
  { code: "ua", box: "0 0 30 20", names: { en: "Ukraine", ru: "Украина", ua: "Україна", pl: "Ukraina", ro: "Ucraina" },
    svg: <><rect width="30" height="10" fill="#0057B7" /><rect y="10" width="30" height="10" fill="#FFD700" /></> },
  { code: "pl", box: "0 0 30 20", names: { en: "Poland", ru: "Польша", ua: "Польща", pl: "Polska", ro: "Polonia" },
    svg: <><rect width="30" height="10" fill="#FFFFFF" /><rect y="10" width="30" height="10" fill="#DC143C" /></> },
  { code: "ro", box: "0 0 30 20", names: { en: "Romania", ru: "Румыния", ua: "Румунія", pl: "Rumunia", ro: "România" },
    svg: v3("#002B7F", "#FCD116", "#CE1126") },
  { code: "hr", box: "0 0 30 20", names: { en: "Croatia", ru: "Хорватия", ua: "Хорватія", pl: "Chorwacja", ro: "Croația" },
    svg: (
      <>
        {h3("#FF0000", "#FFFFFF", "#171796")}
        <rect x="11.5" y="5" width="7" height="9" fill="#FFFFFF" />
        {[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => ((r + c) % 2 === 0 ? (
          <rect key={`${r}${c}`} x={11.5 + c * 2.33} y={5 + r * 3} width="2.34" height="3" fill="#FF0000" />
        ) : null)))}
      </>
    ) },
  { code: "lv", box: "0 0 30 20", names: { en: "Latvia", ru: "Латвия", ua: "Латвія", pl: "Łotwa", ro: "Letonia" },
    svg: <><rect width="30" height="20" fill="#9E3039" /><rect y="8" width="30" height="4" fill="#FFFFFF" /></> },
  { code: "lt", box: "0 0 30 20", names: { en: "Lithuania", ru: "Литва", ua: "Литва", pl: "Litwa", ro: "Lituania" },
    svg: h3("#FDB913", "#006A44", "#C1272D") },
  { code: "bg", box: "0 0 30 20", names: { en: "Bulgaria", ru: "Болгария", ua: "Болгарія", pl: "Bułgaria", ro: "Bulgaria" },
    svg: h3("#FFFFFF", "#00966E", "#D62612") },
  { code: "ee", box: "0 0 30 20", names: { en: "Estonia", ru: "Эстония", ua: "Естонія", pl: "Estonia", ro: "Estonia" },
    svg: h3("#0072CE", "#000000", "#FFFFFF") },
  { code: "gr", box: "0 0 27 18", names: { en: "Greece", ru: "Греция", ua: "Греція", pl: "Grecja", ro: "Grecia" },
    svg: (
      <>
        <rect width="27" height="18" fill="#0D5EAF" />
        {[1, 3, 5, 7].map((i) => <rect key={i} y={i * 2} width="27" height="2" fill="#FFFFFF" />)}
        <rect width="10" height="10" fill="#0D5EAF" />
        <rect x="4" width="2" height="10" fill="#FFFFFF" />
        <rect y="4" width="10" height="2" fill="#FFFFFF" />
      </>
    ) },
  { code: "nl", box: "0 0 30 20", names: { en: "Netherlands", ru: "Нидерланды", ua: "Нідерланди", pl: "Holandia", ro: "Țările de Jos" },
    svg: h3("#AE1C28", "#FFFFFF", "#21468B") },
  { code: "dk", box: "0 0 30 20", names: { en: "Denmark", ru: "Дания", ua: "Данія", pl: "Dania", ro: "Danemarca" },
    svg: nordic("#C8102E", "#FFFFFF") },
  { code: "no", box: "0 0 30 20", names: { en: "Norway", ru: "Норвегия", ua: "Норвегія", pl: "Norwegia", ro: "Norvegia" },
    svg: nordic("#BA0C2F", "#FFFFFF", "#00205B") },
  { code: "se", box: "0 0 30 20", names: { en: "Sweden", ru: "Швеция", ua: "Швеція", pl: "Szwecja", ro: "Suedia" },
    svg: nordic("#006AA7", "#FECC02") },
  { code: "fi", box: "0 0 30 20", names: { en: "Finland", ru: "Финляндия", ua: "Фінляндія", pl: "Finlandia", ro: "Finlanda" },
    svg: nordic("#FFFFFF", "#002F6C") },
  { code: "de", box: "0 0 30 20", names: { en: "Germany", ru: "Германия", ua: "Німеччина", pl: "Niemcy", ro: "Germania" },
    svg: h3("#000000", "#DD0000", "#FFCE00") },
  { code: "gb", box: "0 0 60 30", names: { en: "United Kingdom", ru: "Великобритания", ua: "Велика Британія", pl: "Wielka Brytania", ro: "Regatul Unit" },
    svg: (
      <>
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2" />
        <path d="M30,0 V30 M0,15 H60" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
      </>
    ) },
  { code: "ie", box: "0 0 30 20", names: { en: "Ireland", ru: "Ирландия", ua: "Ірландія", pl: "Irlandia", ro: "Irlanda" },
    svg: v3("#169B62", "#FFFFFF", "#FF883E") },
  { code: "it", box: "0 0 30 20", names: { en: "Italy", ru: "Италия", ua: "Італія", pl: "Włochy", ro: "Italia" },
    svg: v3("#009246", "#FFFFFF", "#CE2B37") },
  { code: "es", box: "0 0 30 20", names: { en: "Spain", ru: "Испания", ua: "Іспанія", pl: "Hiszpania", ro: "Spania" },
    svg: <><rect width="30" height="20" fill="#AA151B" /><rect y="5" width="30" height="10" fill="#F1BF00" /></> },
  { code: "pt", box: "0 0 30 20", names: { en: "Portugal", ru: "Португалия", ua: "Португалія", pl: "Portugalia", ro: "Portugalia" },
    svg: <><rect width="30" height="20" fill="#DA291C" /><rect width="12" height="20" fill="#046A38" /><circle cx="12" cy="10" r="4" fill="#FFE900" /></> },
  { code: "fr", box: "0 0 30 20", names: { en: "France", ru: "Франция", ua: "Франція", pl: "Francja", ro: "Franța" },
    svg: v3("#0055A4", "#FFFFFF", "#EF4135") },
  { code: "be", box: "0 0 30 20", names: { en: "Belgium", ru: "Бельгия", ua: "Бельгія", pl: "Belgia", ro: "Belgia" },
    svg: v3("#000000", "#FDDA24", "#EF3340") },
];

const MORE: Record<Lang, string> = {
  en: "and more",
  ru: "и другие",
  ua: "та інші",
  pl: "i inne",
  ro: "și altele",
};

function Chips({ lang, hidden }: { lang: Lang; hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 gap-2 pr-2" aria-hidden={hidden || undefined}>
      {FLAGS.map((f) => (
        <li
          key={f.code}
          className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3 text-xs font-semibold text-foam"
        >
          <svg
            viewBox={f.box}
            width="22"
            height="15"
            preserveAspectRatio="none"
            className="shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/25"
            aria-hidden="true"
          >
            {f.svg}
          </svg>
          {f.names[lang] ?? f.names.en}
        </li>
      ))}
      <li className="flex items-center whitespace-nowrap rounded-full border border-dashed border-white/15 px-3 py-1.5 text-xs font-semibold text-mist">
        {MORE[lang] ?? MORE.en}
      </li>
    </ul>
  );
}

export default function EuropeFlags({ lang, title }: { lang: Lang; title: string }) {
  return (
    <div className="mt-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-mist">{title}</p>
      {/* A slow ticker: the list twice in a row, moved by half its width. The
          second copy is hidden from screen readers; with reduced motion the
          list stands still and wraps instead (app/globals.css). */}
      <div className="flags-viewport mt-3 overflow-hidden">
        <div className="flags-track flex w-max">
          <Chips lang={lang} />
          <div className="flags-dup flex">
            <Chips lang={lang} hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
