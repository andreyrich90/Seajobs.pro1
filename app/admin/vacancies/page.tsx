"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Trash2, ToggleLeft, ToggleRight, Search } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { Vacancy } from "@/lib/supabase/types";

type VacancyRow = Vacancy & { company_name: string };

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminVacanciesPage() {
  const [vacancies, setVacancies] = useState<VacancyRow[]>([]);
  const [loading, setLoading]     = useState(true);
  const [filter, setFilter]       = useState<"all" | "active" | "inactive">("all");
  const [query, setQuery]         = useState("");

  useEffect(() => {
    async function load() {
      const [{ data: vacs }, { data: companies }] = await Promise.all([
        supabase.from("vacancies").select("*").order("created_at", { ascending: false }),
        supabase.from("companies").select("id, name"),
      ]);
      const coMap: Record<string, string> = {};
      for (const c of companies ?? []) coMap[c.id] = c.name ?? "(no name)";
      setVacancies((vacs ?? []).map((v) => ({ ...v, company_name: coMap[v.company_id] ?? "(unknown)" })));
      setLoading(false);
    }
    load();
  }, []);

  async function toggleActive(v: VacancyRow) {
    const { data } = await supabase.from("vacancies").update({ is_active: !v.is_active }).eq("id", v.id).select().single();
    if (data) setVacancies((prev) => prev.map((x) => x.id === v.id ? { ...data, company_name: v.company_name } : x));
  }

  async function deleteVacancy(id: string) {
    if (!confirm("Delete this vacancy?")) return;
    const { error } = await supabase.from("vacancies").delete().eq("id", id);
    if (!error) setVacancies((prev) => prev.filter((v) => v.id !== id));
  }

  const filtered = vacancies.filter((v) => {
    if (filter === "active"   && !v.is_active) return false;
    if (filter === "inactive" &&  v.is_active) return false;
    if (query && !v.title.toLowerCase().includes(query.toLowerCase()) && !v.company_name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-white">Vacancies</h1>
        <p className="mt-1 text-sm text-mist">{vacancies.length} total vacancies</p>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist" />
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="rounded-xl border border-white/10 bg-card pl-9 pr-4 py-2.5 text-sm text-white outline-none focus:border-brass w-52"
          />
        </div>
        {(["all","active","inactive"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold capitalize transition ${filter === f ? "bg-brass/15 text-brass2 border border-brass/20" : "border border-white/10 text-mist hover:text-white"}`}
          >{f}</button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48"><p className="text-mist text-sm">Loading...</p></div>
      ) : (
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-deep">
                <th className="px-4 py-3 text-left text-xs font-semibold text-mist uppercase">Vacancy</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-mist uppercase hidden sm:table-cell">Company</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-mist uppercase hidden md:table-cell">Posted</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-mist uppercase">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-mist uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-mist text-sm">No vacancies found.</td></tr>
              ) : filtered.map((v) => (
                <tr key={v.id} className="bg-card hover:bg-white/[0.02] transition">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-white">{v.title}</p>
                    <p className="text-xs text-mist">{v.rank ?? "—"} · {v.vessel_type ?? "—"}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-foam text-sm">{v.company_name}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-mist text-xs">{formatDate(v.created_at)}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      v.is_active ? "border-teal/20 bg-teal/10 text-teal" : "border-white/10 bg-white/5 text-mist"
                    }`}>{v.is_active ? "Active" : "Inactive"}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => toggleActive(v)} title={v.is_active ? "Deactivate" : "Activate"}
                        className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-mist hover:text-white transition">
                        {v.is_active ? <ToggleRight size={14} className="text-teal" /> : <ToggleLeft size={14} />}
                      </button>
                      <button onClick={() => deleteVacancy(v.id)}
                        className="rounded-lg border border-coral/20 bg-coral/10 p-1.5 text-coral hover:bg-coral/20 transition">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
