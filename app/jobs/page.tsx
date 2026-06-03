"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, ShieldCheck, Building2 } from "lucide-react";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase/client";

const RANK_GROUPS = [
  { label: "Deck Officers", ranks: ["Master (Captain)", "Chief Officer (Chief Mate)", "2nd Officer", "3rd Officer", "Junior Officer", "Deck Cadet"] },
  { label: "Engine Officers", ranks: ["Chief Engineer", "2nd Engineer", "3rd Engineer", "4th Engineer", "Junior Engineer", "Engine Cadet"] },
  { label: "Electro-Technical / Specialized", ranks: ["ETO (Electro-Technical Officer)", "DPO (Dynamic Positioning Operator)", "Safety Officer", "Cargo Officer", "Pumpman Officer"] },
  { label: "Deck Ratings", ranks: ["Bosun", "AB (Able Seaman)", "OS (Ordinary Seaman)", "Deck Fitter"] },
  { label: "Engine Ratings", ranks: ["Motorman", "Oiler", "Fitter", "Wiper", "Pumpman", "Electrician"] },
  { label: "Catering / Hotel", ranks: ["Chief Cook / Cook", "2nd Cook", "Messman / Steward", "Chief Steward", "Purser", "Hotel Director"] },
];

const VESSEL_TYPE_GROUPS = [
  { label: "Tankers", types: ["Oil Tanker (VLCC)", "Oil Tanker (Suezmax)", "Oil Tanker (Aframax)", "Oil Tanker (MR/Handysize)", "Chemical Tanker", "Product Tanker", "LNG Tanker", "LPG Tanker", "Crude Oil Tanker", "Bitumen Tanker"] },
  { label: "Dry Cargo", types: ["Bulk Carrier (Capesize)", "Bulk Carrier (Panamax)", "Bulk Carrier (Handymax)", "Bulk Carrier (Handysize)", "General Cargo", "Container (Feeder)", "Container (Panamax)", "Container (Post-Panamax)", "Reefer", "Heavy Lift / Project Cargo", "Coaster"] },
  { label: "RoRo / Passenger", types: ["RoRo (Pure Car Carrier)", "RoRo (PCTC)", "RoRo Cargo", "Cruise Ship", "Ferry (Passenger/Vehicle)", "High-Speed Craft", "River Cruise"] },
  { label: "Offshore", types: ["PSV (Platform Supply Vessel)", "AHTS (Anchor Handling Tug Supply)", "ERRV (Emergency Response)", "Construction Support Vessel", "Diving Support Vessel", "Crane Vessel", "Drill Ship", "Semi-Submersible", "Jack-Up Rig", "FPSO", "FSO", "FLNG", "Offshore Wind Installation Vessel", "CTV (Crew Transfer Vessel)"] },
  { label: "Specialized", types: ["Cable Layer", "Pipe Layer", "Dredger", "Hopper Dredger", "Research / Survey Vessel", "Icebreaker", "Tug", "Salvage Vessel", "Bunker Vessel", "Livestock Carrier", "Cement Carrier", "Wood Chip Carrier"] },
  { label: "Other", types: ["Fishing Vessel", "Training Vessel", "Patrol Vessel", "Navy / Military", "Yacht / Superyacht", "Other"] },
];

type VacancyWithCompany = {
  id: string;
  title: string;
  rank: string | null;
  vessel_type: string | null;
  salary_from: number | null;
  salary_to: number | null;
  currency: string;
  contract_duration: string | null;
  joining_date: string | null;
  created_at: string;
  companies: {
    name: string | null;
    logo_url: string | null;
    location: string | null;
    is_verified: boolean;
  } | null;
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function formatSalary(v: VacancyWithCompany): string {
  if (!v.salary_from && !v.salary_to) return "";
  if (v.salary_from && v.salary_to) return `${v.salary_from.toLocaleString()}–${v.salary_to.toLocaleString()} ${v.currency}`;
  if (v.salary_from) return `from ${v.salary_from.toLocaleString()} ${v.currency}`;
  return `up to ${v.salary_to!.toLocaleString()} ${v.currency}`;
}

export default function JobsPage() {
  const [vacancies, setVacancies] = useState<VacancyWithCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [rank, setRank] = useState("");
  const [vessel, setVessel] = useState("");

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("vacancies")
        .select("id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, created_at, companies(name, logo_url, location, is_verified)")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      setVacancies((data as VacancyWithCompany[]) ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = vacancies.filter((v) => {
    const q = query.toLowerCase();
    const companyName = v.companies?.name?.toLowerCase() ?? "";
    const matchQuery = !q || v.title.toLowerCase().includes(q) || (v.rank?.toLowerCase().includes(q) ?? false) || (v.vessel_type?.toLowerCase().includes(q) ?? false) || companyName.includes(q);
    const matchRank = !rank || v.rank === rank;
    const matchVessel = !vessel || v.vessel_type === vessel;
    return matchQuery && matchRank && matchVessel;
  });

  const selectClass = "rounded-xl border border-white/10 bg-navy2 px-3.5 py-3 text-sm font-semibold text-white outline-none focus:border-brass";

  return (
    <div className="min-h-screen">
      <Header />

      <div className="mx-auto max-w-7xl px-5 py-10">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-white">Maritime Jobs</h1>
        <p className="mt-1 text-base text-mist">{loading ? "Loading..." : `${filtered.length} vacancies found`}</p>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-card p-3.5">
          <div className="flex min-w-[200px] flex-1 items-center gap-2.5 rounded-xl border border-white/10 bg-navy2 px-3.5">
            <Search size={18} className="text-mist" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jobs, rank, vessel, company..."
              className="w-full bg-transparent py-3 text-sm text-white outline-none"
            />
          </div>
          <select value={rank} onChange={(e) => setRank(e.target.value)} className={selectClass}>
            <option value="">Rank: All</option>
            {RANK_GROUPS.map((g) => (
              <optgroup key={g.label} label={g.label}>
                {g.ranks.map((r) => <option key={r} value={r}>{r}</option>)}
              </optgroup>
            ))}
          </select>
          <select value={vessel} onChange={(e) => setVessel(e.target.value)} className={selectClass}>
            <option value="">Vessel: All</option>
            {VESSEL_TYPE_GROUPS.map((g) => (
              <optgroup key={g.label} label={g.label}>
                {g.types.map((t) => <option key={t} value={t}>{t}</option>)}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Results */}
        {loading ? (
          <div className="mt-16 flex justify-center">
            <p className="text-mist text-sm">Loading...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-card p-12 text-center">
            <Building2 size={40} className="mx-auto mb-3 text-mist/40" />
            <p className="text-lg font-semibold text-foam">No vacancies found</p>
            <p className="mt-1 text-sm text-mist">Try adjusting your search filters.</p>
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-3">
            {filtered.map((v) => {
              const salary = formatSalary(v);
              return (
                <Link
                  key={v.id}
                  href={`/jobs/${v.id}`}
                  className="group block rounded-2xl border border-white/10 bg-card p-5 transition hover:border-white/20"
                >
                  <div className="flex items-start gap-4">
                    {/* Company logo */}
                    <div className="shrink-0">
                      {v.companies?.logo_url ? (
                        <img
                          src={v.companies.logo_url}
                          alt={v.companies.name ?? ""}
                          className="h-12 w-12 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/10">
                          <Building2 size={22} className="text-mist" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-xs text-mist">
                              {v.companies?.name ?? "Unknown company"}
                            </p>
                            {v.companies?.is_verified && (
                              <ShieldCheck size={13} className="text-teal" />
                            )}
                            {v.companies?.location && (
                              <span className="text-xs text-mist">· {v.companies.location}</span>
                            )}
                          </div>
                          <h3 className="mt-0.5 font-semibold text-white group-hover:text-brass2 transition">
                            {v.title}
                          </h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {v.rank && (
                              <span className="rounded-full bg-brass/10 border border-brass/20 px-2.5 py-0.5 text-xs font-semibold text-brass2">
                                {v.rank}
                              </span>
                            )}
                            {v.vessel_type && (
                              <span className="rounded-full bg-teal/10 border border-teal/20 px-2.5 py-0.5 text-xs font-semibold text-teal">
                                {v.vessel_type}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="shrink-0 text-right">
                          {salary && (
                            <p className="text-sm font-bold text-white">{salary}</p>
                          )}
                          {v.contract_duration && (
                            <p className="text-xs text-mist mt-0.5">{v.contract_duration}</p>
                          )}
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-4 text-xs text-mist">
                        {v.joining_date && <span>Joining: {formatDate(v.joining_date)}</span>}
                        <span>Posted: {formatDate(v.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
