"use client";

import { useRef, useState } from "react";
import {
  Upload, CheckCircle, AlertCircle, RefreshCw, ExternalLink,
  Building2, Briefcase, DollarSign, Clock, Calendar, FileText, Link2,
  ImagePlus,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { RANK_GROUPS } from "@/lib/ranks";

const VESSEL_TYPE_GROUPS = [
  { label: "Tankers", types: ["Oil Tanker (VLCC)", "Oil Tanker (Suezmax)", "Oil Tanker (Aframax)", "Oil Tanker (MR/Handysize)", "Chemical Tanker", "Product Tanker", "LNG Tanker", "LPG Tanker", "Crude Oil Tanker", "Bitumen Tanker"] },
  { label: "Dry Cargo", types: ["Bulk Carrier (Capesize)", "Bulk Carrier (Panamax)", "Bulk Carrier (Handymax)", "Bulk Carrier (Handysize)", "General Cargo", "Container (Feeder)", "Container (Panamax)", "Container (Post-Panamax)", "Reefer", "Heavy Lift / Project Cargo", "Coaster"] },
  { label: "RoRo / Passenger", types: ["RoRo (Pure Car Carrier)", "RoRo (PCTC)", "RoRo Cargo", "Cruise Ship", "Ferry (Passenger/Vehicle)", "High-Speed Craft", "River Cruise"] },
  { label: "Offshore", types: ["PSV (Platform Supply Vessel)", "AHTS (Anchor Handling Tug Supply)", "ERRV (Emergency Response)", "Construction Support Vessel", "Diving Support Vessel", "Crane Vessel", "Drill Ship", "Semi-Submersible", "Jack-Up Rig", "FPSO", "FSO", "FLNG", "Offshore Wind Installation Vessel", "CTV (Crew Transfer Vessel)"] },
  { label: "Specialized", types: ["Cable Layer", "Pipe Layer", "Dredger", "Hopper Dredger", "Research / Survey Vessel", "Icebreaker", "Tug", "Salvage Vessel", "Bunker Vessel", "Livestock Carrier", "Cement Carrier", "Wood Chip Carrier"] },
  { label: "Other", types: ["Fishing Vessel", "Training Vessel", "Patrol Vessel", "Navy / Military", "Yacht / Superyacht", "Other"] },
];

const CURRENCIES = ["USD", "EUR", "GBP", "NOK", "SGD", "AUD", "CAD"];

const empty = () => ({
  companyName: "", companyLocation: "", companyWebsite: "",
  title: "", rank: "", vesselType: "",
  salaryFrom: "", salaryTo: "", currency: "USD",
  contractDuration: "", joiningDate: "", description: "", sourceUrl: "", contactEmail: "",
});

type Form = ReturnType<typeof empty>;

export default function ImportVacancyPage() {
  const [form, setForm] = useState<Form>(empty());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<{ id: string; title: string }[]>([]);
  const [parsing, setParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  async function handleScreenshot(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setParsing(true);
    setError(null);
    try {
      const fileBase64: string = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setError("Not authenticated."); setParsing(false); return; }

      const res = await fetch("/api/admin/parse-vacancy-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ fileBase64, mediaType: file.type }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.detail ?? data.error ?? "Could not read the screenshot.");
        setParsing(false);
        return;
      }

      const v = data.vacancy ?? {};
      setForm((p) => ({
        ...p,
        companyName: v.companyName ?? p.companyName,
        companyLocation: v.companyLocation ?? p.companyLocation,
        companyWebsite: v.companyWebsite ?? p.companyWebsite,
        title: v.title ?? p.title,
        rank: v.rank ?? p.rank,
        vesselType: v.vesselType ?? p.vesselType,
        salaryFrom: v.salaryFrom != null ? String(v.salaryFrom) : p.salaryFrom,
        salaryTo: v.salaryTo != null ? String(v.salaryTo) : p.salaryTo,
        currency: v.currency ?? p.currency,
        contractDuration: v.contractDuration ?? p.contractDuration,
        joiningDate: v.joiningDate ?? p.joiningDate,
        description: v.description ?? p.description,
        contactEmail: v.contactEmail ?? p.contactEmail,
      }));
    } catch (err) {
      console.error(err);
      setError("Could not read the screenshot.");
    } finally {
      setParsing(false);
    }
  }

  async function submit(andAnother: boolean) {
    if (!form.title.trim() || !form.companyName.trim()) {
      setError("Title and company name are required.");
      return;
    }
    setSaving(true);
    setError(null);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setError("Not authenticated."); setSaving(false); return; }

    const res = await fetch("/api/admin/import-vacancy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        companyName:      form.companyName,
        companyLocation:  form.companyLocation,
        companyWebsite:   form.companyWebsite,
        title:            form.title,
        rank:             form.rank || null,
        vesselType:       form.vesselType || null,
        salaryFrom:       form.salaryFrom ? Number(form.salaryFrom) : null,
        salaryTo:         form.salaryTo ? Number(form.salaryTo) : null,
        currency:         form.currency,
        contractDuration: form.contractDuration,
        joiningDate:      form.joiningDate || null,
        description:      form.description,
        sourceUrl:        form.sourceUrl,
        contactEmail:     form.contactEmail,
      }),
    });

    const data = await res.json();
    if (!data.ok) {
      setError(data.error ?? "Unknown error");
      setSaving(false);
      return;
    }

    setSaved((p) => [{ id: data.vacancyId, title: form.title }, ...p]);

    if (andAnother) {
      // Keep company fields, clear vacancy fields
      setForm((p) => ({
        ...empty(),
        companyName: p.companyName,
        companyLocation: p.companyLocation,
        companyWebsite: p.companyWebsite,
        currency: p.currency,
      }));
    } else {
      setForm(empty());
    }
    setSaving(false);
  }

  const inputClass = "w-full rounded-xl border border-white/10 bg-navy2 px-4 py-2.5 text-sm text-white outline-none focus:border-brass placeholder:text-mist/40";
  const selectClass = "w-full rounded-xl border border-white/10 bg-navy2 px-4 py-2.5 text-sm text-white outline-none focus:border-brass";
  const labelClass = "block text-xs font-semibold text-mist mb-1.5 uppercase tracking-wide";

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-brass/10 border border-brass/20">
          <Upload size={20} className="text-brass2" />
        </div>
        <div>
          <h1 className="font-display text-xl font-semibold text-white">Import Vacancy</h1>
          <p className="text-xs text-mist mt-0.5">
            Imported vacancies are visible on site but excluded from Google for Jobs indexing.
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleScreenshot}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={parsing}
          className="ml-auto flex items-center gap-2 rounded-xl border border-brass/30 bg-brass/10 px-4 py-2.5 text-sm font-semibold text-brass2 transition hover:bg-brass/20 disabled:opacity-50"
        >
          {parsing ? <RefreshCw size={15} className="animate-spin" /> : <ImagePlus size={15} />}
          {parsing ? "Reading screenshot..." : "Fill from screenshot"}
        </button>
        {saved.length > 0 && (
          <span className="rounded-full bg-teal/10 border border-teal/20 px-3 py-1 text-xs font-bold text-teal">
            {saved.length} imported
          </span>
        )}
      </div>

      {/* Saved log */}
      {saved.length > 0 && (
        <div className="mb-6 rounded-2xl border border-teal/20 bg-teal/5 p-4">
          <p className="text-xs font-semibold text-teal mb-2 uppercase tracking-wide">Just imported</p>
          <div className="flex flex-col gap-1.5">
            {saved.slice(0, 5).map((v) => (
              <div key={v.id} className="flex items-center gap-2 text-sm">
                <CheckCircle size={13} className="text-teal shrink-0" />
                <span className="text-foam flex-1 truncate">{v.title}</span>
                <a
                  href={`/jobs/${v.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brass2 hover:underline text-xs flex items-center gap-1"
                >
                  View <ExternalLink size={11} />
                </a>
              </div>
            ))}
            {saved.length > 5 && (
              <p className="text-xs text-mist">+{saved.length - 5} more</p>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 flex items-start gap-3 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3">
          <AlertCircle size={15} className="mt-0.5 shrink-0 text-coral" />
          <p className="text-sm text-coral">{error}</p>
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); submit(false); }} className="flex flex-col gap-5">

        {/* Company */}
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Building2 size={16} className="text-brass2" />
            <span className="text-sm font-semibold text-white">Company</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass}>Company name *</label>
              <input value={form.companyName} onChange={set("companyName")} placeholder="e.g. Maersk Line" className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input value={form.companyLocation} onChange={set("companyLocation")} placeholder="e.g. Copenhagen, Denmark" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Website</label>
              <input value={form.companyWebsite} onChange={set("companyWebsite")} placeholder="https://maersk.com" className={inputClass} />
            </div>
          </div>
        </div>

        {/* Vacancy */}
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase size={16} className="text-brass2" />
            <span className="text-sm font-semibold text-white">Vacancy</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass}>Job title *</label>
              <input value={form.title} onChange={set("title")} placeholder="e.g. Chief Officer — Oil Tanker" className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Rank</label>
              <select value={form.rank} onChange={set("rank")} className={selectClass}>
                <option value="">— Select rank —</option>
                {RANK_GROUPS.map((g) => (
                  <optgroup key={g.label} label={g.label}>
                    {g.ranks.map((r) => <option key={r} value={r}>{r}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Vessel type</label>
              <select value={form.vesselType} onChange={set("vesselType")} className={selectClass}>
                <option value="">— Select vessel —</option>
                {VESSEL_TYPE_GROUPS.map((g) => (
                  <optgroup key={g.label} label={g.label}>
                    {g.types.map((t) => <option key={t} value={t}>{t}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Salary & Terms */}
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign size={16} className="text-brass2" />
            <span className="text-sm font-semibold text-white">Salary & Terms</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            <div>
              <label className={labelClass}>From</label>
              <input type="number" value={form.salaryFrom} onChange={set("salaryFrom")} placeholder="3000" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>To</label>
              <input type="number" value={form.salaryTo} onChange={set("salaryTo")} placeholder="5000" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Currency</label>
              <select value={form.currency} onChange={set("currency")} className={selectClass}>
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Contract</label>
              <input value={form.contractDuration} onChange={set("contractDuration")} placeholder="4+2 months" className={inputClass} />
            </div>
          </div>
          <div className="mt-3">
            <label className={labelClass}>Joining date</label>
            <input type="date" value={form.joiningDate} onChange={set("joiningDate")} className={inputClass} />
          </div>
        </div>

        {/* Description */}
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={16} className="text-brass2" />
            <span className="text-sm font-semibold text-white">Description</span>
          </div>
          <textarea
            value={form.description}
            onChange={set("description")}
            placeholder="Requirements, responsibilities, working conditions..."
            rows={5}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Source */}
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Link2 size={16} className="text-brass2" />
            <span className="text-sm font-semibold text-white">Source</span>
          </div>
          <label className={labelClass}>Original URL</label>
          <input
            value={form.sourceUrl}
            onChange={set("sourceUrl")}
            placeholder="https://marinetraffic.com/jobs/..."
            className={inputClass}
          />
          <p className="mt-2 text-xs text-mist">Shown as reference. Not indexed by Google for Jobs.</p>

          <div className="mt-4">
            <label className={labelClass}>Crewing contact email (optional)</label>
            <input
              type="email"
              value={form.contactEmail}
              onChange={set("contactEmail")}
              placeholder="crew@agency.com"
              className={inputClass}
            />
            <p className="mt-2 text-xs text-mist">
              If set, &quot;Apply&quot; sends the seafarer&apos;s profile (name, rank, experience, certificates, contacts) directly to this email instead of the in-app inbox.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => submit(true)}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-3 text-sm font-bold text-deep transition hover:-translate-y-0.5 disabled:opacity-50"
          >
            <RefreshCw size={15} className={saving ? "animate-spin" : ""} />
            {saving ? "Saving..." : "Save & Add Another"}
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
          >
            <CheckCircle size={15} />
            Save & Finish
          </button>
          <button
            type="button"
            onClick={() => { setForm(empty()); setError(null); }}
            className="rounded-xl px-4 py-3 text-sm text-mist hover:text-white transition"
          >
            Clear form
          </button>
        </div>
      </form>
    </div>
  );
}
