"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, AlertCircle, X, Ship } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { SeaExperience } from "@/lib/supabase/types";

const VESSEL_TYPES = [
  "Bulk Carrier",
  "Tanker",
  "Container",
  "LNG",
  "Cruise",
  "Offshore",
  "General Cargo",
  "RoRo",
  "Passenger",
];

const RANKS = [
  "Master",
  "Chief Officer",
  "2nd Officer",
  "3rd Officer",
  "Chief Engineer",
  "2nd Engineer",
  "3rd Engineer",
  "ETO",
  "AB",
  "OS",
  "Cook",
  "Bosun",
  "Motorman",
];

type ExpForm = {
  vessel_name: string;
  vessel_type: string;
  rank: string;
  company: string;
  flag: string;
  imo_number: string;
  from_date: string;
  to_date: string;
};

const EMPTY_FORM: ExpForm = {
  vessel_name: "",
  vessel_type: "",
  rank: "",
  company: "",
  flag: "",
  imo_number: "",
  from_date: "",
  to_date: "",
};

function calcDuration(from: string | null, to: string | null): string {
  if (!from) return "";
  const start = new Date(from);
  const end = to ? new Date(to) : new Date();
  const months = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
  if (months < 1) return "< 1 month";
  if (months < 12) return `${months} month${months > 1 ? "s" : ""}`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return `${y}y ${m > 0 ? `${m}m` : ""}`.trim();
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Present";
  return new Date(dateStr).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export default function ExperiencePage() {
  const [entries, setEntries] = useState<SeaExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ExpForm>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function loadExperience() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUserId(session.user.id);

      const { data } = await supabase
        .from("sea_experience")
        .select("*")
        .eq("seafarer_id", session.user.id)
        .order("from_date", { ascending: false, nullsFirst: false });

      setEntries(data ?? []);
      setLoading(false);
    }
    loadExperience();
  }, []);

  function handleChange(field: keyof ExpForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  }

  function openAdd() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError(null);
    setShowForm(true);
  }

  function openEdit(entry: SeaExperience) {
    setEditingId(entry.id);
    setForm({
      vessel_name: entry.vessel_name ?? "",
      vessel_type: entry.vessel_type ?? "",
      rank: entry.rank ?? "",
      company: entry.company ?? "",
      flag: entry.flag ?? "",
      imo_number: entry.imo_number ?? "",
      from_date: entry.from_date ?? "",
      to_date: entry.to_date ?? "",
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
    if (!form.vessel_name.trim()) {
      setError("Vessel name is required.");
      return;
    }
    setSubmitting(true);
    setError(null);

    const payload = {
      vessel_name: form.vessel_name.trim(),
      vessel_type: form.vessel_type || null,
      rank: form.rank || null,
      company: form.company || null,
      flag: form.flag || null,
      imo_number: form.imo_number || null,
      from_date: form.from_date || null,
      to_date: form.to_date || null,
    };

    if (editingId) {
      const { data, error: updateError } = await supabase
        .from("sea_experience")
        .update(payload)
        .eq("id", editingId)
        .select()
        .single();

      if (updateError) {
        setError("Failed to update: " + updateError.message);
      } else if (data) {
        setEntries((prev) =>
          prev
            .map((e) => (e.id === editingId ? data : e))
            .sort((a, b) => {
              if (!a.from_date) return 1;
              if (!b.from_date) return -1;
              return new Date(b.from_date).getTime() - new Date(a.from_date).getTime();
            })
        );
        closeForm();
      }
    } else {
      const { data, error: insertError } = await supabase
        .from("sea_experience")
        .insert({ ...payload, seafarer_id: userId })
        .select()
        .single();

      if (insertError) {
        setError("Failed to add entry: " + insertError.message);
      } else if (data) {
        setEntries((prev) =>
          [...prev, data].sort((a, b) => {
            if (!a.from_date) return 1;
            if (!b.from_date) return -1;
            return new Date(b.from_date).getTime() - new Date(a.from_date).getTime();
          })
        );
        closeForm();
      }
    }
    setSubmitting(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this experience entry?")) return;
    const { error: deleteError } = await supabase.from("sea_experience").delete().eq("id", id);
    if (!deleteError) {
      setEntries((prev) => prev.filter((e) => e.id !== id));
    }
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
        <h1 className="font-display text-2xl font-semibold text-white">Sea Experience</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5"
        >
          <Plus size={16} /> Add Experience
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="rounded-2xl border border-white/10 bg-card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-white">
              {editingId ? "Edit Experience" : "New Experience"}
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
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">Vessel name *</label>
              <input
                type="text"
                value={form.vessel_name}
                onChange={(e) => handleChange("vessel_name", e.target.value)}
                placeholder="e.g. MV Atlantic Star"
                required
                disabled={submitting}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">Vessel type</label>
              <select
                value={form.vessel_type}
                onChange={(e) => handleChange("vessel_type", e.target.value)}
                disabled={submitting}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              >
                <option value="">Select type...</option>
                {VESSEL_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">Rank</label>
              <select
                value={form.rank}
                onChange={(e) => handleChange("rank", e.target.value)}
                disabled={submitting}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              >
                <option value="">Select rank...</option>
                {RANKS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">Company</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => handleChange("company", e.target.value)}
                placeholder="e.g. Maersk Line"
                disabled={submitting}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">Flag</label>
              <input
                type="text"
                value={form.flag}
                onChange={(e) => handleChange("flag", e.target.value)}
                placeholder="e.g. Marshall Islands"
                disabled={submitting}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">IMO number</label>
              <input
                type="text"
                value={form.imo_number}
                onChange={(e) => handleChange("imo_number", e.target.value)}
                placeholder="e.g. 9876543"
                disabled={submitting}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">From date</label>
              <input
                type="date"
                value={form.from_date}
                onChange={(e) => handleChange("from_date", e.target.value)}
                disabled={submitting}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">To date</label>
              <input
                type="date"
                value={form.to_date}
                onChange={(e) => handleChange("to_date", e.target.value)}
                disabled={submitting}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>

            <div className="flex gap-3 sm:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
              >
                {submitting ? "Saving..." : editingId ? "Update" : "Add Entry"}
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-mist transition hover:bg-white/5"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Timeline */}
      {entries.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-card p-12 text-center">
          <p className="text-mist text-sm">No sea experience logged yet. Add your first entry above.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-2xl border border-white/10 bg-card p-5 flex items-start gap-4"
            >
              {/* Icon */}
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal/10 mt-0.5">
                <Ship size={18} className="text-teal" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-white">{entry.vessel_name}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      {entry.vessel_type && (
                        <span className="rounded-full bg-teal/10 border border-teal/20 px-2.5 py-0.5 text-xs font-semibold text-teal">
                          {entry.vessel_type}
                        </span>
                      )}
                      {entry.rank && (
                        <span className="rounded-full bg-brass/10 border border-brass/20 px-2.5 py-0.5 text-xs font-semibold text-brass2">
                          {entry.rank}
                        </span>
                      )}
                      {entry.flag && (
                        <span className="text-xs text-mist">Flag: {entry.flag}</span>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold text-white">
                      {formatDate(entry.from_date)} — {formatDate(entry.to_date)}
                    </p>
                    {entry.from_date && (
                      <p className="text-xs text-mist mt-0.5">
                        {calcDuration(entry.from_date, entry.to_date)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap gap-4 text-xs text-mist">
                  {entry.company && <span>Company: {entry.company}</span>}
                  {entry.imo_number && <span>IMO: {entry.imo_number}</span>}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openEdit(entry)}
                  className="rounded-lg bg-white/5 border border-white/10 p-1.5 text-mist hover:text-white hover:bg-white/10 transition"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
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
