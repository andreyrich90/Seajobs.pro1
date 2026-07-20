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
  contractDuration: "", joiningDate: "", description: "", sourceUrl: "", contactEmail: "", contactPhone: "",
});

type Form = ReturnType<typeof empty>;

// Raw vacancy object as returned by /api/admin/parse-vacancy-image.
type ParsedVacancy = {
  companyName?: string | null; companyLocation?: string | null; companyWebsite?: string | null;
  title?: string | null; rank?: string | null; vesselType?: string | null;
  salaryFrom?: number | null; salaryTo?: number | null; currency?: string | null;
  contractDuration?: string | null; joiningDate?: string | null;
  description?: string | null; contactEmail?: string | null; contactPhone?: string | null;
};

export default function ImportVacancyPage() {
  const [form, setForm] = useState<Form>(empty());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<{ id: string; title: string }[]>([]);
  const [parsing, setParsing] = useState(false);
  const [parseProgress, setParseProgress] = useState<string | null>(null);
  // Remaining vacancies from multi-vacancy screenshots/text; the next one is
  // loaded into the form after each save (or via "load next").
  const [queue, setQueue] = useState<ParsedVacancy[]>([]);
  const [pasteOpen, setPasteOpen] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [tgHandle, setTgHandle] = useState("");
  const [tgProbing, setTgProbing] = useState(false);
  const [tgResult, setTgResult] = useState<{
    readable?: boolean; status?: number; ms?: number; messageCount?: number;
    sampleMessages?: string[]; error?: string; detail?: string; looksBlocked?: boolean;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function probeTelegram() {
    const handle = tgHandle.trim().replace(/^@/, "").replace(/^https?:\/\/t\.me\/(s\/)?/i, "");
    if (!handle) return;
    setTgProbing(true);
    setTgResult(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setTgResult({ error: "Not authenticated" }); return; }
      const res = await fetch(`/api/admin/tg-probe?handle=${encodeURIComponent(handle)}`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      setTgResult(await res.json());
    } catch (e) {
      setTgResult({ error: e instanceof Error ? e.message : "failed" });
    } finally {
      setTgProbing(false);
    }
  }

  function loadParsedList(list: ParsedVacancy[]) {
    applyParsed(list[0]);
    setQueue(list.slice(1));
  }

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  function applyParsed(v: ParsedVacancy) {
    setForm((p) => ({
      ...p,
      companyName: v.companyName ?? p.companyName,
      companyLocation: v.companyLocation ?? p.companyLocation,
      companyWebsite: v.companyWebsite ?? p.companyWebsite,
      title: v.title ?? "",
      rank: v.rank ?? "",
      vesselType: v.vesselType ?? "",
      salaryFrom: v.salaryFrom != null ? String(v.salaryFrom) : "",
      salaryTo: v.salaryTo != null ? String(v.salaryTo) : "",
      currency: v.currency ?? p.currency,
      contractDuration: v.contractDuration ?? "",
      joiningDate: v.joiningDate ?? "",
      description: v.description ?? "",
      contactEmail: v.contactEmail ?? p.contactEmail,
      contactPhone: v.contactPhone ?? p.contactPhone,
      // sourceUrl is set manually and shared by all vacancies from one page.
    }));
  }

  function loadNextFromQueue() {
    setQueue((q) => {
      const [next, ...rest] = q;
      if (next) applyParsed(next);
      return rest;
    });
  }

  async function handleScreenshot(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;

    setParsing(true);
    setError(null);
    setParseProgress(files.length > 1 ? `1/${files.length}` : null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setError("Not authenticated."); return; }

      // Parse screenshots one by one (predictable order, no API rate spikes);
      // vacancies from every file land in one review queue.
      const all: ParsedVacancy[] = [];
      const failed: string[] = [];
      for (let i = 0; i < files.length; i++) {
        setParseProgress(files.length > 1 ? `${i + 1}/${files.length}` : null);
        const file = files[i];
        try {
          const fileBase64: string = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });

          const res = await fetch("/api/admin/parse-vacancy-image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({ fileBase64, mediaType: file.type }),
          });
          const data = await res.json();
          const list: ParsedVacancy[] = data.ok
            ? Array.isArray(data.vacancies) ? data.vacancies : data.vacancy ? [data.vacancy] : []
            : [];
          if (list.length === 0) failed.push(file.name);
          else all.push(...list);
        } catch {
          failed.push(file.name);
        }
      }

      if (all.length === 0) {
        setError("No vacancy could be read from the screenshot" + (files.length > 1 ? "s." : "."));
        return;
      }
      if (failed.length > 0) {
        setError(`Could not read ${failed.length} of ${files.length} screenshots (${failed.join(", ")}) — the rest are loaded.`);
      }
      loadParsedList(all);
    } catch (err) {
      console.error(err);
      setError("Could not read the screenshot.");
    } finally {
      setParsing(false);
      setParseProgress(null);
    }
  }

  async function handlePasteText() {
    const text = pasteText.trim();
    if (!text) return;
    setParsing(true);
    setError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setError("Not authenticated."); return; }

      const res = await fetch("/api/admin/parse-vacancy-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.detail ?? data.error ?? "Could not read the text.");
        return;
      }
      const list: ParsedVacancy[] = Array.isArray(data.vacancies)
        ? data.vacancies : data.vacancy ? [data.vacancy] : [];
      if (list.length === 0) {
        setError("No vacancy could be read from the text.");
        return;
      }
      loadParsedList(list);
      setPasteText("");
      setPasteOpen(false);
    } catch (err) {
      console.error(err);
      setError("Could not read the text.");
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
        contactPhone:     form.contactPhone,
      }),
    });

    const data = await res.json();
    if (!data.ok) {
      setError(data.error ?? "Unknown error");
      setSaving(false);
      return;
    }

    setSaved((p) => [{ id: data.vacancyId, title: data.refreshed ? `${form.title} — refreshed (duplicate)` : form.title }, ...p]);

    if (queue.length > 0) {
      // Multi-vacancy screenshot: pull the next parsed vacancy into the form.
      loadNextFromQueue();
    } else if (andAnother) {
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
          multiple
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
          {parsing
            ? `Reading${parseProgress ? ` ${parseProgress}` : ""}...`
            : "Fill from screenshots"}
        </button>
        <button
          type="button"
          onClick={() => setPasteOpen((o) => !o)}
          disabled={parsing}
          className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-foam transition hover:bg-white/10 disabled:opacity-50"
        >
          <FileText size={15} /> Paste text
        </button>
        {saved.length > 0 && (
          <span className="rounded-full bg-teal/10 border border-teal/20 px-3 py-1 text-xs font-bold text-teal">
            {saved.length} imported
          </span>
        )}
      </div>

      {/* Telegram feasibility probe (temporary diagnostic) */}
      <div className="mb-6 rounded-2xl border border-white/10 bg-navy2 p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-mist">
          Telegram probe — can the server read a public channel? (diagnostic)
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={tgHandle}
            onChange={(e) => setTgHandle(e.target.value)}
            placeholder="channel handle, e.g. marinejobs"
            disabled={tgProbing}
            className="flex-1 min-w-[200px] rounded-xl border border-white/10 bg-navy px-4 py-2.5 text-sm text-white outline-none focus:border-brass placeholder:text-mist/40"
          />
          <button
            type="button"
            onClick={probeTelegram}
            disabled={tgProbing || !tgHandle.trim()}
            className="flex items-center gap-2 rounded-xl border border-brass/30 bg-brass/10 px-4 py-2.5 text-sm font-semibold text-brass2 transition hover:bg-brass/20 disabled:opacity-50"
          >
            {tgProbing ? <RefreshCw size={15} className="animate-spin" /> : <ExternalLink size={15} />}
            {tgProbing ? "Probing..." : "Probe channel"}
          </button>
        </div>
        {tgResult && (
          <div className="mt-3 rounded-xl border border-white/10 bg-navy p-3 text-xs">
            {tgResult.readable ? (
              <p className="font-bold text-teal">✓ Readable — server can fetch this channel ({tgResult.messageCount} posts, {tgResult.status}, {tgResult.ms}ms)</p>
            ) : (
              <p className="font-bold text-coral">✗ Not readable{tgResult.status ? ` (HTTP ${tgResult.status})` : ""}{tgResult.error ? ` — ${tgResult.error}` : ""}{tgResult.detail ? `: ${tgResult.detail}` : ""}</p>
            )}
            {tgResult.sampleMessages && tgResult.sampleMessages.length > 0 && (
              <div className="mt-2 space-y-2">
                {tgResult.sampleMessages.slice(0, 2).map((m, i) => (
                  <p key={i} className="whitespace-pre-wrap text-mist line-clamp-4">{m.slice(0, 400)}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Paste text (e.g. Telegram channel posts) */}
      {pasteOpen && (
        <div className="mb-6 rounded-2xl border border-white/10 bg-navy2 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-mist">
            Paste vacancy text — one or many postings (e.g. copied Telegram posts). Claude splits them into separate vacancies.
          </p>
          <textarea
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            rows={8}
            placeholder="Paste vacancy text here…"
            disabled={parsing}
            className="w-full rounded-xl border border-white/10 bg-navy px-4 py-3 text-sm text-white outline-none focus:border-brass placeholder:text-mist/40"
          />
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={handlePasteText}
              disabled={parsing || !pasteText.trim()}
              className="flex items-center gap-2 rounded-xl border border-brass/30 bg-brass/10 px-4 py-2 text-sm font-semibold text-brass2 transition hover:bg-brass/20 disabled:opacity-50"
            >
              {parsing ? <RefreshCw size={15} className="animate-spin" /> : <FileText size={15} />}
              {parsing ? "Reading text..." : "Parse text"}
            </button>
            <button
              type="button"
              onClick={() => { setPasteText(""); setPasteOpen(false); }}
              disabled={parsing}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-mist transition hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Multi-vacancy screenshot/text queue */}
      {queue.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-brass/30 bg-brass/10 p-4">
          <p className="text-sm font-semibold text-brass2">
            {queue.length} more {queue.length === 1 ? "vacancy" : "vacancies"} from this screenshot in the queue — save the current one and the next loads automatically.
          </p>
          <button
            type="button"
            onClick={loadNextFromQueue}
            className="ml-auto rounded-lg border border-brass/40 px-3 py-1.5 text-xs font-bold text-brass2 transition hover:bg-brass/20"
          >
            Skip current — load next
          </button>
        </div>
      )}

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

          <div className="mt-4">
            <label className={labelClass}>Crewing contact phone (optional)</label>
            <input
              type="tel"
              value={form.contactPhone}
              onChange={set("contactPhone")}
              placeholder="+380 50 123 45 67"
              className={inputClass}
            />
            <p className="mt-2 text-xs text-mist">
              If the ad lists a phone/WhatsApp/Viber, it is shown on the vacancy page so seafarers can contact the crewing directly.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => submit(true)}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-3 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5 disabled:opacity-50"
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
