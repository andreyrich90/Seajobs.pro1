"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Clock, AlertTriangle, Upload, FileText, X } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useLang } from "@/components/LangProvider";
import { partnerCopy, PARTNER_MAX_BYTES, PARTNER_MAX_FILES, PARTNER_TYPES } from "@/lib/partnerCopy";

// /company/verification — a crewing company asks to become a SeaJobs Partner
// (lib/partners.ts). Documents go to api/company/verification; photos are
// shrunk here first, because a Vercel function refuses a body over 4.5 MB and
// a phone photo of a licence is often 4 MB on its own.

type Last = { status: "pending" | "approved" | "rejected"; admin_note: string | null; submitted_at: string } | null;

async function shrink(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.size < 900 * 1024) return file;
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 2000 / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob: Blob | null = await new Promise((r) => canvas.toBlob(r, "image/jpeg", 0.85));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export default function CompanyVerificationPage() {
  const { lang } = useLang();
  const c = partnerCopy(lang);
  const [verified, setVerified] = useState(false);
  const [last, setLast] = useState<Last>(null);
  const [loaded, setLoaded] = useState(false);
  const [country, setCountry] = useState("");
  const [registry, setRegistry] = useState("");
  const [note, setNote] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function load() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    const res = await fetch("/api/company/verification", { headers: { Authorization: `Bearer ${session.access_token}` } }).catch(() => null);
    if (res?.ok) {
      const j = await res.json();
      setVerified(!!j.verified);
      setLast(j.last ?? null);
    }
    setLoaded(true);
  }
  useEffect(() => { void load(); }, []);

  async function pick(list: FileList | null) {
    if (!list) return;
    setError(null);
    const chosen = Array.from(list).slice(0, PARTNER_MAX_FILES);
    if (chosen.some((f) => !PARTNER_TYPES.includes(f.type))) { setError(c.errType); return; }
    setFiles(await Promise.all(chosen.map(shrink)));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!files.length) { setError(c.errFiles); return; }
    if (files.reduce((n, f) => n + f.size, 0) > PARTNER_MAX_BYTES) { setError(c.errTooBig); return; }
    setBusy(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("no session");
      const fd = new FormData();
      files.forEach((f) => fd.append("files", f));
      fd.append("country", country);
      fd.append("registry_number", registry);
      fd.append("note", note);
      const res = await fetch("/api/company/verification", {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: fd,
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j.error === "TOO_BIG" ? c.errTooBig : j.error === "BAD_TYPE" ? c.errType : c.errFailed);
        return;
      }
      setSent(true);
      setFiles([]);
      await load();
    } catch {
      setError(c.errFailed);
    } finally {
      setBusy(false);
    }
  }

  const showForm = loaded && !verified && last?.status !== "pending";

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-8">
      <h1 className="flex items-center gap-2 font-display text-2xl font-semibold text-white">
        <ShieldCheck size={24} className="text-teal" /> {c.pageTitle}
      </h1>

      {verified && (
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-teal/30 bg-teal/10 p-5 text-sm text-foam">
          <ShieldCheck size={18} className="mt-0.5 shrink-0 text-teal" /> {c.approved}
        </div>
      )}
      {!verified && last?.status === "pending" && (
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-brass/40 bg-brass/10 p-5 text-sm text-foam">
          <Clock size={18} className="mt-0.5 shrink-0 text-brassInk" /> {sent ? c.sent : c.pending}
        </div>
      )}
      {!verified && last?.status === "rejected" && (
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-coral/30 bg-coral/10 p-5 text-sm text-foam">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-coral" />
          <div>
            <p className="font-semibold text-white">{c.rejected}</p>
            {last.admin_note && <p className="mt-1">{c.reason} {last.admin_note}</p>}
            <p className="mt-1">{c.resubmit}</p>
          </div>
        </div>
      )}

      {showForm && (
        <>
          <div className="mt-5 rounded-2xl border border-white/10 bg-card p-5 text-sm leading-relaxed text-foam">
            <p>{c.modalBody}</p>
            <p className="mt-3 font-semibold text-white">{c.whatTitle}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {c.what.map((w) => <li key={w}>{w}</li>)}
            </ul>
            <p className="mt-3 text-xs text-mist">{c.privacy}</p>
          </div>

          <form onSubmit={submit} className="mt-5 flex flex-col gap-4 rounded-2xl border border-white/10 bg-card p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm font-semibold text-foam">
                {c.country}
                <input value={country} onChange={(e) => setCountry(e.target.value)} maxLength={80}
                  className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm font-normal text-white outline-none focus:border-brass" />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold text-foam">
                {c.registry}
                <input value={registry} onChange={(e) => setRegistry(e.target.value)} maxLength={120}
                  className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm font-normal text-white outline-none focus:border-brass" />
              </label>
            </div>

            <div className="flex flex-col gap-1.5 text-sm font-semibold text-foam">
              {c.files}
              <label className="flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-navy2 px-4 py-3 text-sm font-semibold text-brassInk transition hover:border-brass">
                <Upload size={16} /> {c.choose}
                <input type="file" multiple accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
                  className="sr-only" onChange={(e) => void pick(e.target.files)} />
              </label>
              {files.length > 0 && (
                <ul className="flex flex-col gap-1.5">
                  {files.map((f, i) => (
                    <li key={i} className="flex items-center justify-between gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs font-normal text-foam">
                      <span className="flex min-w-0 items-center gap-2"><FileText size={14} className="shrink-0 text-mist" /> <span className="truncate">{f.name}</span></span>
                      <span className="flex shrink-0 items-center gap-2 text-mist">
                        {(f.size / 1024 / 1024).toFixed(1)} MB
                        <button type="button" onClick={() => setFiles((x) => x.filter((_, j) => j !== i))} aria-label="×"><X size={14} /></button>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <label className="flex flex-col gap-1.5 text-sm font-semibold text-foam">
              {c.note}
              <textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={1000} rows={3}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm font-normal text-white outline-none focus:border-brass" />
            </label>

            {error && <p className="text-sm text-coral">{error}</p>}

            <button type="submit" disabled={busy}
              className="min-h-[44px] rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 text-sm font-bold text-[#061523] transition disabled:opacity-50">
              {busy ? c.sending : c.submit}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
