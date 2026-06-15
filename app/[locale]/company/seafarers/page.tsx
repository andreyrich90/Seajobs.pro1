"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Search, User, MapPin, Ship, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { RANK_GROUPS } from "@/lib/ranks";

type SeafarerRow = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  photo_url: string | null;
  nationality: string | null;
  rank: string | null;
  readiness_date: string | null;
  about: string | null;
};

const ALL_RANKS = RANK_GROUPS.flatMap((g) => g.ranks);

function formatDate(d: string | null): string {
  if (!d) return "Not set";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function CompanySeafarersPage() {
  const [seafarers, setSeafarers] = useState<SeafarerRow[]>([]);
  const [filtered, setFiltered] = useState<SeafarerRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [rankFilter, setRankFilter] = useState("");
  const [nationalityFilter, setNationalityFilter] = useState("");
  const [availableFilter, setAvailableFilter] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase
          .from("seafarers")
          .select("id, first_name, last_name, photo_url, nationality, rank, readiness_date, about")
          .not("first_name", "is", null)
          .order("updated_at", { ascending: false })
          .limit(200);

        setSeafarers((data as SeafarerRow[]) ?? []);
        setFiltered((data as SeafarerRow[]) ?? []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    let result = seafarers;

    if (rankFilter) {
      result = result.filter((s) => s.rank === rankFilter);
    }
    if (nationalityFilter.trim()) {
      const q = nationalityFilter.trim().toLowerCase();
      result = result.filter((s) => s.nationality?.toLowerCase().includes(q));
    }
    if (availableFilter) {
      const cutoff = new Date(availableFilter);
      result = result.filter((s) => {
        if (!s.readiness_date) return false;
        return new Date(s.readiness_date) <= cutoff;
      });
    }

    setFiltered(result);
  }, [rankFilter, nationalityFilter, availableFilter, seafarers]);

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-white">Seafarer Database</h1>
        <p className="mt-1 text-sm text-mist">Browse seafarers looking for opportunities. Click a profile to view full details.</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        {/* Rank filter */}
        <select
          value={rankFilter}
          onChange={(e) => setRankFilter(e.target.value)}
          className="rounded-xl border border-white/10 bg-navy2 px-3.5 py-2.5 text-sm font-semibold text-white outline-none focus:border-brass min-w-[180px]"
        >
          <option value="">All Ranks</option>
          {RANK_GROUPS.map((g) => (
            <optgroup key={g.label} label={g.label}>
              {g.ranks.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </optgroup>
          ))}
        </select>

        {/* Nationality filter */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist/50" />
          <input
            type="text"
            value={nationalityFilter}
            onChange={(e) => setNationalityFilter(e.target.value)}
            placeholder="Nationality…"
            className="rounded-xl border border-white/10 bg-navy2 pl-8 pr-4 py-2.5 text-sm text-white outline-none focus:border-brass placeholder:text-mist/40 min-w-[160px]"
          />
        </div>

        {/* Available by filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-mist whitespace-nowrap">Available by:</label>
          <input
            type="date"
            value={availableFilter}
            onChange={(e) => setAvailableFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-navy2 px-3 py-2.5 text-sm text-white outline-none focus:border-brass"
          />
        </div>

        {/* Reset */}
        {(rankFilter || nationalityFilter || availableFilter) && (
          <button
            onClick={() => { setRankFilter(""); setNationalityFilter(""); setAvailableFilter(""); }}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-mist hover:text-white transition"
          >
            Reset
          </button>
        )}
      </div>

      {/* Count */}
      <p className="text-xs text-mist mb-4">{filtered.length} seafarer{filtered.length !== 1 ? "s" : ""} found</p>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-mist text-sm">Loading...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-card p-12 text-center">
          <User size={36} className="mx-auto mb-3 text-mist/30" />
          <p className="text-lg font-semibold text-foam">No seafarers found</p>
          <p className="text-sm text-mist mt-1">Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => {
            const name = [s.first_name, s.last_name].filter(Boolean).join(" ") || "Seafarer";
            const initials = [s.first_name?.[0], s.last_name?.[0]].filter(Boolean).join("").toUpperCase() || "S";
            return (
              <Link
                key={s.id}
                href={`/seafarers/${s.id}`}
                target="_blank"
                className="group rounded-2xl border border-white/10 bg-card p-5 transition hover:border-brass/30"
              >
                <div className="flex items-start gap-3">
                  {s.photo_url ? (
                    <img src={s.photo_url} alt={name} className="h-12 w-12 rounded-xl object-cover shrink-0" />
                  ) : (
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-brass/20 font-bold text-brass2 shrink-0">
                      {initials}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white group-hover:text-brass2 transition truncate">{name}</p>
                    {s.rank && (
                      <span className="mt-1 inline-block rounded-full bg-brass/10 border border-brass/20 px-2.5 py-0.5 text-xs font-semibold text-brass2">
                        {s.rank}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex flex-col gap-1.5">
                  {s.nationality && (
                    <div className="flex items-center gap-1.5 text-xs text-mist">
                      <MapPin size={12} className="shrink-0" /> {s.nationality}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-mist">
                    <Calendar size={12} className="shrink-0" />
                    Available: {formatDate(s.readiness_date)}
                  </div>
                </div>
                {s.about && (
                  <p className="mt-3 text-xs text-mist/70 line-clamp-2">{s.about}</p>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
