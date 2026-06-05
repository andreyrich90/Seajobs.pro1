"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, AlertCircle, X, Briefcase, ToggleLeft, ToggleRight } from "lucide-react";
import { supabase, notify } from "@/lib/supabase/client";
import type { Vacancy } from "@/lib/supabase/types";
import { RANK_GROUPS } from "@/lib/ranks";

const VESSEL_TYPE_GROUPS = [
  { label: "Tankers", types: ["Oil Tanker (VLCC)", "Oil Tanker (Suezmax)", "Oil Tanker (Aframax)", "Oil Tanker (MR/Handysize)", "Chemical Tanker", "Product Tanker", "LNG Tanker", "LPG Tanker", "Crude Oil Tanker", "Bitumen Tanker"] },
  { label: "Dry Cargo", types: ["Bulk Carrier (Capesize)", "Bulk Carrier (Panamax)", "Bulk Carrier (Handymax)", "Bulk Carrier (Handysize)", "General Cargo", "Container (Feeder)", "Container (Panamax)", "Container (Post-Panamax)", "Reefer", "Heavy Lift / Project Cargo", "Coaster"] },
  { label: "RoRo / Passenger", types: ["RoRo (Pure Car Carrier)", "RoRo (PCTC)", "RoRo Cargo", "Cruise Ship", "Ferry (Passenger/Vehicle)", "High-Speed Craft", "River Cruise"] },
  { label: "Offshore", types: ["PSV (Platform Supply Vessel)", "AHTS (Anchor Handling Tug Supply)", "ERRV (Emergency Response)", "Construction Support Vessel", "Diving Support Vessel", "Crane Vessel", "Drill Ship", "Semi-Submersible", "Jack-Up Rig", "FPSO", "FSO", "FLNG", "Offshore Wind Installation Vessel", "CTV (Crew Transfer Vessel)"] },
  { label: "Specialized", types: ["Cable Layer", "Pipe Layer", "Dredger", "Hopper Dredger", "Research / Survey Vessel", "Icebreaker", "Tug", "Salvage Vessel", "Bunker Vessel", "Livestock Carrier", "Cement Carrier", "Wood Chip Carrier"] },
  { label: "Other", types: ["Fishing Vessel", "Training Vessel", "Patrol Vessel", "Navy / Military", "Yacht / Superyacht", "Other"] },
];

const CURRENCIES = ["USD", "EUR", "GBP"];

type VacancyForm = {
  title: string;
  rank: string;
  vessel_type: string;
  salary_from: string;
  salary_to: string;
  currency: string;
  contract_duration: string;
  joining_date: string;
  description: string;
  is_active: boolean;
};

const EMPTY_FORM: VacancyForm = {
  title: "",
  rank: "",
  vessel_type: "",
  salary_from: "",
  salary_to: "",
  currency: "USD",
  contract_duration: "",
  joining_date: "",
  description: "",
  is_active: true,
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function VacanciesPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [appCounts, setAppCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<VacancyForm>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUserId(session.user.id);

      const { data } = await supabase
        .from("vacancies")
        .select("*")
        .eq("company_id", session.user.id)
        .order("created_at", { ascending: false });

      setVacancies(data ?? []);

      // Fetch application counts per vacancy
      const ids = (data ?? []).map((v) => v.id);
      if (ids.length > 0) {
        const { data: appData } = await supabase
          .from("applications")
          .select("vacancy_id")
          .in("vacancy_id", ids);

        const counts: Record<string, number> = {};
        for (const a of appData ?? []) {
          counts[a.vacancy_id] = (counts[a.vacancy_id] ?? 0) + 1;
        }
        setAppCounts(counts);
      }

      setLoading(false);
    }
    load();
  }, []);

  function handleChange(field: keyof VacancyForm, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  }

  function openAdd() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError(null);
    setShowForm(true);
  }

  function openEdit(v: Vacancy) {
    setEditingId(v.id);
    setForm({
      title: v.title ?? "",
      rank: v.rank ?? "",
      vessel_type: v.vessel_type ?? "",
      salary_from: v.salary_from != null ? String(v.salary_from) : "",
      salary_to: v.salary_to != null ? String(v.salary_to) : "",
      currency: v.currency ?? "USD",
      contract_duration: v.contract_duration ?? "",
      joining_date: v.joining_date ?? "",
      description: v.description ?? "",
      is_active: v.is_active,
    });
    setError(null);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    if (!form.title.trim()) { setError("Job title is required."); return; }
    setSubmitting(true);
    setError(null);

    const payload = {
      title: form.title.trim(),
      rank: form.rank || null,
      vessel_type: form.vessel_type || null,
      salary_from: form.salary_from ? parseInt(form.salary_from) : null,
      salary_to: form.salary_to ? parseInt(form.salary_to) : null,
      currency: form.currency,
      contract_duration: form.contract_duration || null,
      joining_date: form.joining_date || null,
      description: form.description || null,
      is_active: form.is_active,
      updated_at: new Date().toISOString(),
    };

    if (editingId) {
      const { data, error: updateError } = await supabase
        .from("vacancies")
        .update(payload)
        .eq("id", editingId)
        .select()
        .single();

      if (updateError) {
        setError("Failed to update: " + updateError.message);
      } else if (data) {
        setVacancies((prev) => prev.map((v) => (v.id === editingId ? data : v)));
        closeForm();
      }
    } else {
      // Ensure company record exists (foreign key requirement)
      await supabase.from("companies").upsert({ id: userId }, { onConflict: "id" });

      const { data, error: insertError } = await supabase
        .from("vacancies")
        .insert({ ...payload, company_id: userId })
        .select()
        .single();

      if (insertError) {
        setError("Failed to post vacancy: " + insertError.message);
      } else if (data) {
        setVacancies((prev) => [data, ...prev]);
        closeForm();
        // Notify subscribed seafarers (fire and forget)
        notify({ type: "new_vacancy", vacancyId: data.id });
      }
    }
    setSubmitting(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this vacancy?")) return;
    const { error: deleteError } = await supabase.from("vacancies").delete().eq("id", id);
    if (!deleteError) setVacancies((prev) => prev.filter((v) => v.id !== id));
  }

  async function toggleActive(v: Vacancy) {
    const { data } = await supabase
      .from("vacancies")
      .update({ is_active: !v.is_active })
      .eq("id", v.id)
      .select()
      .single();
    if (data) setVacancies((prev) => prev.map((x) => (x.id === v.id ? data : x)));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-mist text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-semibold text-white">Vacancies</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5"
        >
          <Plus size={16} /> Post vacancy
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="rounded-2xl border border-white/10 bg-card p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg font-semibold text-white">
              {editingId ? "Edit Vacancy" : "New Vacancy"}
            </h2>
            <button onClick={closeForm} className="text-mist hover:text-white transition">
              <X size={18} />
            </button>
          </div>

          {error && (
            <div className="mb-4 flex items-start gap-3 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3">
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-coral" />
              <p className="text-sm text-coral">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Title */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-semibold text-foam">Job title *</label>
              <input
                type="text" value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g. Chief Engineer for LNG Tanker"
                required disabled={submitting}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>

            {/* Rank */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">Required rank</label>
              <select
                value={form.rank} onChange={(e) => handleChange("rank", e.target.value)}
                disabled={submitting}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              >
                <option value="">Select rank...</option>
                {RANK_GROUPS.map((g) => (
                  <optgroup key={g.label} label={g.label}>
                    {g.ranks.map((r) => <option key={r} value={r}>{r}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Vessel type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">Vessel type</label>
              <select
                value={form.vessel_type} onChange={(e) => handleChange("vessel_type", e.target.value)}
                disabled={submitting}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              >
                <option value="">Select type...</option>
                {VESSEL_TYPE_GROUPS.map((g) => (
                  <optgroup key={g.label} label={g.label}>
                    {g.types.map((t) => <option key={t} value={t}>{t}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Salary from */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">Salary from</label>
              <input
                type="number" value={form.salary_from}
                onChange={(e) => handleChange("salary_from", e.target.value)}
                placeholder="e.g. 5000" min={0} disabled={submitting}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>

            {/* Salary to */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">Salary to</label>
              <div className="flex gap-2">
                <input
                  type="number" value={form.salary_to}
                  onChange={(e) => handleChange("salary_to", e.target.value)}
                  placeholder="e.g. 7000" min={0} disabled={submitting}
                  className="flex-1 rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
                />
                <select
                  value={form.currency} onChange={(e) => handleChange("currency", e.target.value)}
                  disabled={submitting}
                  className="w-24 rounded-xl border border-white/10 bg-navy2 px-3 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
                >
                  {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Contract duration */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">Contract duration</label>
              <input
                type="text" value={form.contract_duration}
                onChange={(e) => handleChange("contract_duration", e.target.value)}
                placeholder="e.g. 4 months" disabled={submitting}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>

            {/* Joining date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">Joining date</label>
              <input
                type="date" value={form.joining_date}
                onChange={(e) => handleChange("joining_date", e.target.value)}
                disabled={submitting}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-semibold text-foam">Description / Requirements</label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe the position, required certificates, experience, etc."
                rows={4} disabled={submitting}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50 resize-none"
              />
            </div>

            {/* Active toggle */}
            <div className="flex items-center gap-3 sm:col-span-2">
              <button
                type="button"
                onClick={() => handleChange("is_active", !form.is_active)}
                className="text-mist hover:text-white transition"
              >
                {form.is_active
                  ? <ToggleRight size={28} className="text-teal" />
                  : <ToggleLeft size={28} />
                }
              </button>
              <span className="text-sm font-semibold text-foam">
                {form.is_active ? "Active — visible to seafarers" : "Inactive — hidden from seafarers"}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3 sm:col-span-2">
              <button
                type="submit" disabled={submitting}
                className="rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
              >
                {submitting ? "Saving..." : editingId ? "Update" : "Post Vacancy"}
              </button>
              <button
                type="button" onClick={closeForm}
                className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-mist transition hover:bg-white/5"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      {vacancies.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-card p-12 text-center">
          <p className="text-mist text-sm">No vacancies yet. Post your first job above.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {vacancies.map((v) => (
            <div key={v.id} className="rounded-2xl border border-white/10 bg-card p-5 flex items-start gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brass/10 mt-0.5">
                <Briefcase size={18} className="text-brass2" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-white">{v.title}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
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
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                        v.is_active
                          ? "bg-teal/10 border-teal/20 text-teal"
                          : "bg-white/5 border-white/10 text-mist"
                      }`}>
                        {v.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    {(v.salary_from || v.salary_to) && (
                      <p className="text-sm font-semibold text-white">
                        {v.salary_from && v.salary_to
                          ? `${v.salary_from.toLocaleString()}–${v.salary_to.toLocaleString()} ${v.currency}`
                          : v.salary_from
                          ? `from ${v.salary_from.toLocaleString()} ${v.currency}`
                          : `up to ${v.salary_to!.toLocaleString()} ${v.currency}`}
                      </p>
                    )}
                    {v.joining_date && (
                      <p className="text-xs text-mist mt-0.5">Joining: {formatDate(v.joining_date)}</p>
                    )}
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap gap-4 text-xs text-mist">
                  {v.contract_duration && <span>Contract: {v.contract_duration}</span>}
                  {v.description && (
                    <span className="line-clamp-1 max-w-sm">{v.description}</span>
                  )}
                </div>

                <div className="mt-2 flex flex-wrap gap-4 text-xs text-mist/60">
                  <span>Views: {v.views_count}</span>
                  <span>Applications: {appCounts[v.id] ?? 0}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleActive(v)}
                  title={v.is_active ? "Deactivate" : "Activate"}
                  className="rounded-lg bg-white/5 border border-white/10 p-1.5 text-mist hover:text-white hover:bg-white/10 transition"
                >
                  {v.is_active ? <ToggleRight size={14} className="text-teal" /> : <ToggleLeft size={14} />}
                </button>
                <button
                  onClick={() => openEdit(v)}
                  className="rounded-lg bg-white/5 border border-white/10 p-1.5 text-mist hover:text-white hover:bg-white/10 transition"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(v.id)}
                  className="rounded-lg bg-coral/10 border border-coral/20 p-1.5 text-coral hover:bg-coral/20 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
