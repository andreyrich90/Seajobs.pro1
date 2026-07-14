"use client";

import { Link } from "@/i18n/navigation";
import { useLang } from "@/components/LangProvider";
import { RANK_LANDINGS, rankName } from "@/lib/rankLandings";
import { VESSEL_LANDINGS, vesselName } from "@/lib/vesselLandings";
import { COUNTRY_LANDINGS, countryName } from "@/lib/countryLandings";

// Internal-linking block to the SEO landing pages. Ranks link to the dedicated
// /jobs/rank/<slug> pages (unique title/H1/intro); vessels stay on the /jobs
// query-param filter for now. Every page that renders this passes link equity
// to the landings and helps Google index them.
const RANK_CHIP_SLUGS = [
  "master", "chief-officer", "2nd-officer", "chief-engineer", "2nd-engineer",
  "3rd-engineer", "eto", "able-seaman", "ordinary-seaman", "bosun", "motorman", "cook",
];
const RANK_CHIPS = RANK_CHIP_SLUGS
  .map((s) => RANK_LANDINGS.find((r) => r.slug === s))
  .filter((r): r is (typeof RANK_LANDINGS)[number] => Boolean(r));

const VESSEL_CHIP_SLUGS = [
  "tanker", "bulk-carrier", "container-ship", "general-cargo", "gas-carrier",
  "car-carrier", "offshore", "cruise-ship", "ferry", "tug",
];
const VESSEL_CHIPS = VESSEL_CHIP_SLUGS
  .map((s) => VESSEL_LANDINGS.find((v) => v.slug === s))
  .filter((v): v is (typeof VESSEL_LANDINGS)[number] => Boolean(v));

const HEADING: Record<string, { jobs: string; vessels: string; countries: string }> = {
  en: { jobs: "Jobs by rank", vessels: "Jobs by vessel type", countries: "Jobs by country" },
  ru: { jobs: "Вакансии по должности", vessels: "Вакансии по типу судна", countries: "Вакансии по странам" },
  ua: { jobs: "Вакансії за посадою", vessels: "Вакансії за типом судна", countries: "Вакансії за країнами" },
  pl: { jobs: "Praca według stanowiska", vessels: "Praca według typu statku", countries: "Praca według kraju" },
  ro: { jobs: "Joburi după rang", vessels: "Joburi după tipul navei", countries: "Joburi după țară" },
};

export default function PopularJobLinks({ variant = "section" }: { variant?: "section" | "footer" }) {
  const { lang } = useLang();
  const h = HEADING[lang] ?? HEADING.en;

  const rankLinks = RANK_CHIPS.map((r) => (
    <Link
      key={r.slug}
      href={`/jobs/rank/${r.slug}`}
      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-mist transition hover:border-brass/40 hover:text-brass2"
    >
      {rankName(r, lang)}
    </Link>
  ));
  const vesselLinks = VESSEL_CHIPS.map((v) => (
    <Link
      key={v.slug}
      href={`/jobs/vessel/${v.slug}`}
      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-mist transition hover:border-brass/40 hover:text-brass2"
    >
      {vesselName(v, lang)}
    </Link>
  ));
  const countryLinks = COUNTRY_LANDINGS.map((c) => (
    <Link
      key={c.slug}
      href={`/jobs/country/${c.slug}`}
      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-mist transition hover:border-brass/40 hover:text-brass2"
    >
      {countryName(c, lang)}
    </Link>
  ));

  if (variant === "footer") {
    return (
      <div className="mt-10 border-t border-white/10 pt-8">
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-mist">{h.jobs}</h4>
        <div className="mb-5 flex flex-wrap gap-2">{rankLinks}</div>
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-mist">{h.vessels}</h4>
        <div className="mb-5 flex flex-wrap gap-2">{vesselLinks}</div>
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-mist">{h.countries}</h4>
        <div className="flex flex-wrap gap-2">{countryLinks}</div>
      </div>
    );
  }

  return (
    <section className="mt-8 rounded-2xl border border-white/10 bg-card/40 p-5">
      <h3 className="mb-3 font-display text-base font-semibold text-white">{h.jobs}</h3>
      <div className="mb-5 flex flex-wrap gap-2">{rankLinks}</div>
      <h3 className="mb-3 font-display text-base font-semibold text-white">{h.vessels}</h3>
      <div className="mb-5 flex flex-wrap gap-2">{vesselLinks}</div>
      <h3 className="mb-3 font-display text-base font-semibold text-white">{h.countries}</h3>
      <div className="flex flex-wrap gap-2">{countryLinks}</div>
    </section>
  );
}
