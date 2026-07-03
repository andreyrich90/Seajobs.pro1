"use client";

import { Link } from "@/i18n/navigation";
import { useLang } from "@/components/LangProvider";

// Internal-linking block to the rank/vessel filter landing pages. These are the
// same URLs the sitemap and jobs/page.tsx generateMetadata already treat as SEO
// landing pages, so every page that renders this passes link equity to them and
// helps Google index the "Discovered / Crawled - currently not indexed" URLs.
// Values MUST match the taxonomy in lib/ranks.ts / JobsClient exactly.
const RANKS: { label: string; rank: string }[] = [
  { label: "AB", rank: "AB (Able Seaman)" },
  { label: "OS", rank: "OS (Ordinary Seaman)" },
  { label: "Bosun", rank: "Bosun" },
  { label: "Motorman", rank: "Motorman" },
  { label: "Cook", rank: "Chief Cook / Cook" },
  { label: "Master", rank: "Master (Captain)" },
  { label: "Chief Officer", rank: "Chief Officer (Chief Mate)" },
  { label: "2nd Officer", rank: "2nd Officer" },
  { label: "Chief Engineer", rank: "Chief Engineer" },
  { label: "2nd Engineer", rank: "2nd Engineer" },
  { label: "ETO", rank: "ETO (Electro-Technical Officer)" },
  { label: "Deck Cadet", rank: "Deck Cadet" },
];

const VESSELS: { label: string; vessel: string }[] = [
  { label: "General Cargo", vessel: "General Cargo" },
  { label: "Bulk Carrier", vessel: "Bulk Carrier" },
  { label: "Container Ship", vessel: "Container Ship" },
  { label: "Chemical Tanker", vessel: "Chemical Tanker" },
  { label: "RoRo", vessel: "RoRo Cargo" },
  { label: "Coaster", vessel: "Coaster" },
];

const HEADING: Record<string, { jobs: string; vessels: string }> = {
  en: { jobs: "Jobs by rank", vessels: "Jobs by vessel type" },
  ru: { jobs: "Вакансии по должности", vessels: "Вакансии по типу судна" },
  ua: { jobs: "Вакансії за посадою", vessels: "Вакансії за типом судна" },
  pl: { jobs: "Praca według stanowiska", vessels: "Praca według typu statku" },
};

export default function PopularJobLinks({ variant = "section" }: { variant?: "section" | "footer" }) {
  const { lang } = useLang();
  const h = HEADING[lang] ?? HEADING.en;

  const rankLinks = RANKS.map((r) => (
    <Link
      key={r.rank}
      href={{ pathname: "/jobs", query: { rank: r.rank } }}
      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-mist transition hover:border-brass/40 hover:text-brass2"
    >
      {r.label}
    </Link>
  ));
  const vesselLinks = VESSELS.map((v) => (
    <Link
      key={v.vessel}
      href={{ pathname: "/jobs", query: { vessel: v.vessel } }}
      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-mist transition hover:border-brass/40 hover:text-brass2"
    >
      {v.label}
    </Link>
  ));

  if (variant === "footer") {
    return (
      <div className="mt-10 border-t border-white/10 pt-8">
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-mist">{h.jobs}</h4>
        <div className="mb-5 flex flex-wrap gap-2">{rankLinks}</div>
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-mist">{h.vessels}</h4>
        <div className="flex flex-wrap gap-2">{vesselLinks}</div>
      </div>
    );
  }

  return (
    <section className="mt-8 rounded-2xl border border-white/10 bg-card/40 p-5">
      <h3 className="mb-3 font-display text-base font-semibold text-white">{h.jobs}</h3>
      <div className="mb-5 flex flex-wrap gap-2">{rankLinks}</div>
      <h3 className="mb-3 font-display text-base font-semibold text-white">{h.vessels}</h3>
      <div className="flex flex-wrap gap-2">{vesselLinks}</div>
    </section>
  );
}
