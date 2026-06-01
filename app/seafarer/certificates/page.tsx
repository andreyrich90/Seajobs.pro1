"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, AlertCircle, X } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { Certificate } from "@/lib/supabase/types";

const CERT_SUGGESTIONS = [
  "STCW Basic Safety",
  "GMDSS GOC",
  "GMDSS ROC",
  "Medical Certificate (STCW)",
  "Proficiency in Survival Craft",
  "Advanced Fire Fighting",
  "Medical First Aid",
  "Tanker Familiarization",
  "ECDIS",
  "BRM",
  "AFF",
  "SSO",
  "Basic Training",
  "Crowd Management",
  "Crisis Management",
  "Security Awareness",
  "Passenger Ship Safety",
  "High Voltage",
  "Tank Barge",
  "IGF Code",
];

type CertForm = {
  name: string;
  number: string;
  issue_date: string;
  expiry_date: string;
  issuing_authority: string;
  file_url: string;
};

const EMPTY_FORM: CertForm = {
  name: "",
  number: "",
  issue_date: "",
  expiry_date: "",
  issuing_authority: "",
  file_url: "",
};

function isExpired(expiry_date: string | null): boolean {
  if (!expiry_date) return false;
  return new Date(expiry_date) < new Date();
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function CertificatesPage() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CertForm>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function loadCerts() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUserId(session.user.id);

      const { data } = await supabase
        .from("certificates")
        .select("*")
        .eq("seafarer_id", session.user.id)
        .order("expiry_date", { ascending: true, nullsFirst: false });

      setCerts(data ?? []);
      setLoading(false);
    }
    loadCerts();
  }, []);

  function handleChange(field: keyof CertForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    if (!form.name.trim()) {
      setError("Certificate name is required.");
      return;
    }
    setSubmitting(true);
    setError(null);

    const { data, error: insertError } = await supabase
      .from("certificates")
      .insert({
        seafarer_id: userId,
        name: form.name.trim(),
        number: form.number || null,
        issue_date: form.issue_date || null,
        expiry_date: form.expiry_date || null,
        issuing_authority: form.issuing_authority || null,
        file_url: form.file_url || null,
      })
      .select()
      .single();

    if (insertError) {
      setError("Failed to add certificate: " + insertError.message);
    } else if (data) {
      setCerts((prev) => [...prev, data]);
      setForm(EMPTY_FORM);
      setShowForm(false);
    }
    setSubmitting(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this certificate?")) return;

    const { error: deleteError } = await supabase
      .from("certificates")
      .delete()
      .eq("id", id);

    if (!deleteError) {
      setCerts((prev) => prev.filter((c) => c.id !== id));
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
        <h1 className="font-display text-2xl font-semibold text-white">Certificates</h1>
        <button
          onClick={() => { setShowForm(true); setError(null); }}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5"
        >
          <Plus size={16} /> Add Certificate
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="rounded-2xl border border-white/10 bg-card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-white">New Certificate</h2>
            <button onClick={() => setShowForm(false)} className="text-mist hover:text-white transition">
              <X size={18} />
            </button>
          </div>

          {error && (
            <div className="mb-4 flex items-start gap-3 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3">
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-coral" />
              <p className="text-sm text-coral">{error}</p>
            </div>
          )}

          <form onSubmit={handleAdd} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-semibold text-foam">Certificate name *</label>
              <input
                type="text"
                list="cert-suggestions"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g. STCW Basic Safety"
                required
                disabled={submitting}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
              <datalist id="cert-suggestions">
                {CERT_SUGGESTIONS.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">Certificate number</label>
              <input
                type="text"
                value={form.number}
                onChange={(e) => handleChange("number", e.target.value)}
                placeholder="e.g. UA-2024-12345"
                disabled={submitting}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">Issuing authority</label>
              <input
                type="text"
                value={form.issuing_authority}
                onChange={(e) => handleChange("issuing_authority", e.target.value)}
                placeholder="e.g. Maritime Administration"
                disabled={submitting}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">Issue date</label>
              <input
                type="date"
                value={form.issue_date}
                onChange={(e) => handleChange("issue_date", e.target.value)}
                disabled={submitting}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">Expiry date</label>
              <input
                type="date"
                value={form.expiry_date}
                onChange={(e) => handleChange("expiry_date", e.target.value)}
                disabled={submitting}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-semibold text-foam">File URL (optional)</label>
              <input
                type="url"
                value={form.file_url}
                onChange={(e) => handleChange("file_url", e.target.value)}
                placeholder="https://example.com/certificate.pdf"
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
                {submitting ? "Saving..." : "Add Certificate"}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setForm(EMPTY_FORM); setError(null); }}
                className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-mist transition hover:bg-white/5"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Certificates table */}
      {certs.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-card p-12 text-center">
          <p className="text-mist text-sm">No certificates yet. Add your first certificate above.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-mist uppercase tracking-wider">Name</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-mist uppercase tracking-wider">Number</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-mist uppercase tracking-wider">Issue Date</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-mist uppercase tracking-wider">Expiry Date</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-mist uppercase tracking-wider">Authority</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-mist uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {certs.map((cert) => {
                  const expired = isExpired(cert.expiry_date);
                  return (
                    <tr key={cert.id} className={expired ? "bg-coral/5" : ""}>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${expired ? "text-coral" : "text-white"}`}>
                            {cert.name}
                          </span>
                          {expired && (
                            <span className="rounded-full bg-coral/20 border border-coral/30 px-2 py-0.5 text-xs text-coral">
                              Expired
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-mist">{cert.number ?? "—"}</td>
                      <td className="px-5 py-3.5 text-mist">{formatDate(cert.issue_date)}</td>
                      <td className={`px-5 py-3.5 ${expired ? "text-coral font-semibold" : "text-mist"}`}>
                        {formatDate(cert.expiry_date)}
                      </td>
                      <td className="px-5 py-3.5 text-mist">{cert.issuing_authority ?? "—"}</td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {cert.file_url && (
                            <a
                              href={cert.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-semibold text-foam hover:bg-white/10 transition"
                            >
                              View
                            </a>
                          )}
                          <button
                            onClick={() => handleDelete(cert.id)}
                            className="rounded-lg bg-coral/10 border border-coral/20 p-1.5 text-coral hover:bg-coral/20 transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
