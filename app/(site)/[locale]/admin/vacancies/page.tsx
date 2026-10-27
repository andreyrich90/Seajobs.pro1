"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Trash2, ToggleLeft, ToggleRight, Search } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { purgeVacancy } from "@/lib/purgeVacancy";
import { VACANCY_COLUMNS, type BrowserVacancy } from "@/lib/vacancyColumns";
import { pageAll, MAX_USER_ROWS, MAX_VACANCY_ROWS, type Page } from "@/lib/pageAll";

type VacancyRow = BrowserVacancy & { company_name: string };

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { timeZone: "UTC", day: "numeric", month: "short", year: "numeric" });
}

// The same 14-day rule the nightly cron applies, so the date that will cost a
// vacancy its place is marked before it does. Red means the next run closes it
// — unless the posting itself is younger than 14 days, which the cron now also
// requires.
function expiredJoining(d: string) {
  return d < new Date(Date.now() - 14 * 864e5).toISOString().slice(0, 10);
}

export default function AdminVacanciesPage() {
  const [vacancies, setVacancies] = useState<VacancyRow[]>([]);
  const [loading, setLoading]     = useState(true);
  const [filter, setFilter]       = useState<"all" | "active" | "inactive">("all");
  const [query, setQuery]         = useState("");
  const [queue, setQueue]         = useState<Record<string, string>>({});

  useEffect(() => {
    async function load() {
      // Both tables are past PostgREST's 1000-row answer: read them a page at
      // a time, or the oldest vacancies drop off the list (lib/pageAll.ts).
      let vacs: BrowserVacancy[];
      let companies: { id: string; name: string | null }[];
      try {
        [vacs, companies] = await Promise.all([
          pageAll((a, b) =>
            supabase
              .from("vacancies")
              .select(VACANCY_COLUMNS)
              .order("created_at", { ascending: false })
              .order("id")
              .range(a, b) as unknown as Page<BrowserVacancy>,
            MAX_VACANCY_ROWS,
          ),
          pageAll((a, b) =>
            supabase.from("companies").select("id, name").order("id").range(a, b) as unknown as Page<{ id: string; name: string | null }>,
            MAX_USER_ROWS,
          ),
        ]);
      } catch (e) {
        console.error("[admin/vacancies]", e);
        setLoading(false);
        return;
      }
      const coMap: Record<string, string> = {};
      for (const c of companies) coMap[c.id] = c.name ?? "(no name)";
      setVacancies(vacs.map((v) => ({ ...v, company_name: coMap[v.company_id] ?? "(unknown)" })));

      // Release times of the publish queue (lib/publishQueue.ts). Read on its
      // own, not through VACANCY_COLUMNS: before the migration that adds the
      // column, a failure here must only lose the badge, not the whole list.
      const { data: q } = await supabase
        .from("vacancies")
        .select("id, publish_at")
        .not("publish_at", "is", null)
        .limit(1000);
      const due: Record<string, string> = {};
      for (const r of (q ?? []) as unknown as { id: string; publish_at: string }[]) due[r.id] = r.publish_at;
      setQueue(due);
      setLoading(false);
    }
    load();
  }, []);

  async function toggleActive(v: VacancyRow) {
    // Switching a queued vacancy by hand takes it out of the queue, or the
    // release would bring it "back" later with a second round of alerts.
    const inQueue = Boolean(queue[v.id]);
    const { data, error } = await supabase
      .from("vacancies")
      .update({ is_active: !v.is_active, ...(inQueue ? { publish_at: null } : {}) })
      .eq("id", v.id)
      .select(VACANCY_COLUMNS)
      .single();
    // Publishing is blocked when the company has no name or no contact — say so
    // instead of leaving the toggle silently not moving.
    if (error) {
      alert(
        error.message.includes("company_contact_required")
          ? "Cannot publish: this company has no email or phone, and the vacancy carries no crewing contact."
          : error.message.includes("company_name_required")
          ? "Cannot publish: this company has no name."
          : error.message
      );
      return;
    }
    if (data) setVacancies((prev) => prev.map((x) => x.id === v.id ? { ...data, company_name: v.company_name } : x));
    if (inQueue) setQueue((prev) => { const next = { ...prev }; delete next[v.id]; return next; });
  }

  async function deleteVacancy(id: string) {
    if (!confirm("Delete this vacancy?")) return;
    const title = vacancies.find((v) => v.id === id)?.title;
    const { error } = await supabase.from("vacancies").delete().eq("id", id);
    if (!error) {
      purgeVacancy(id, [title]);
      setVacancies((prev) => prev.filter((v) => v.id !== id));
    }
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
        {vacancies.length >= MAX_VACANCY_ROWS && (
          <p className="mt-1 text-sm text-coral">
            Only the newest {MAX_VACANCY_ROWS.toLocaleString("en-US")} are loaded — raise MAX_VACANCY_ROWS in lib/pageAll.ts.
          </p>
        )}
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
            className={`rounded-xl px-4 py-2 text-sm font-semibold capitalize transition ${filter === f ? "bg-brass/15 text-brassInk border border-brass/20" : "border border-white/10 text-mist hover:text-white"}`}
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
                {/* Дата выхода стоит рядом со статусом не для красоты: именно по ней
                    ночной крон гасит вакансию, и без неё «почему Inactive» из
                    таблицы не читается. */}
                <th className="px-4 py-3 text-left text-xs font-semibold text-mist uppercase hidden lg:table-cell">Joining</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-mist uppercase">Views</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-mist uppercase">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-mist uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-mist text-sm">No vacancies found.</td></tr>
              ) : filtered.map((v) => (
                <tr key={v.id} className="bg-card hover:bg-white/[0.02] transition">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-white">{v.title}</p>
                    <p className="text-xs text-mist">{v.rank ?? "—"} · {v.vessel_type ?? "—"}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-foam text-sm">{v.company_name}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-mist text-xs">{formatDate(v.created_at)}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-xs">
                    {v.joining_date
                      ? <span className={expiredJoining(v.joining_date) ? "text-coral" : "text-mist"}>{formatDate(v.joining_date)}</span>
                      : <span className="text-mist">ASAP</span>}
                  </td>
                  {/* Единственное место на сайте, где показан счётчик просмотров. */}
                  <td className="px-4 py-3 text-right text-sm tabular-nums text-foam">{v.views_count ?? 0}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      v.is_active ? "border-teal/20 bg-teal/10 text-teal" : "border-white/10 bg-white/5 text-mist"
                    }`}>{v.is_active ? "Active" : "Inactive"}</span>
                    {queue[v.id] && (
                      <span
                        title="In the publish queue — goes live at this time (Kyiv)"
                        className="ml-1.5 inline-flex rounded-full border border-brass/30 bg-brass/10 px-2 py-0.5 text-[11px] font-semibold text-brassInk"
                      >
                        ⏳ {new Date(queue[v.id]).toLocaleString("en-GB", { timeZone: "Europe/Kyiv", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    )}
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
