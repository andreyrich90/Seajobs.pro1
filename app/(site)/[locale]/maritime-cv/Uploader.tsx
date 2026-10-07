"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Upload, FileText, LogIn, Loader2, AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { supabase } from "@/lib/supabase/client";
import { MAX_CV_BYTES, cvMediaType, importParsedCv, parseCvFile } from "@/lib/cvImport";
import { cvParseError } from "@/lib/cvParseError";
import { useT } from "@/components/DictProvider";
import type { MaritimeCvUploadCopy } from "@/lib/maritimeCv";

// The one interactive part of /maritime-cv: drop the old CV, sign in, and the
// profile fills itself.
//
// The order is the point. The file is taken *before* sign-in — someone who has
// already handed over their CV finds one Google button easy — and parsing waits
// until after, because /api/cv-parse is a paid Claude call and is closed to
// anonymous callers. Google sign-in leaves the page, so the file waits in this
// browser's IndexedDB across the round trip and is deleted the moment it has
// been read. Nothing leaves the device until the seafarer is signed in.

const DB = "seajobs";
const STORE = "pending";
const KEY = "cv";
// A file left behind by someone who never signed in should not resurface
// next month as a surprise.
const TTL_MS = 24 * 60 * 60 * 1000;

type Pending = { blob: Blob; name: string; type: string; at: number };

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function withStore<T>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const req = fn(db.transaction(STORE, mode).objectStore(STORE));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// Every one of these swallows its failure: a private window or blocked
// storage simply means the file is held in memory and asked for again after
// sign-in, which is a nuisance, not a broken page.
async function savePending(file: File) {
  try { await withStore("readwrite", (s) => s.put({ blob: file, name: file.name, type: file.type, at: Date.now() } satisfies Pending, KEY)); } catch { /* memory only */ }
}
async function loadPending(): Promise<Pending | null> {
  try {
    const p = (await withStore("readonly", (s) => s.get(KEY))) as Pending | undefined;
    if (!p) return null;
    if (Date.now() - p.at > TTL_MS) { await clearPending(); return null; }
    return p;
  } catch { return null; }
}
async function clearPending() {
  try { await withStore("readwrite", (s) => s.delete(KEY)); } catch { /* nothing stored */ }
}

type Phase = "idle" | "signin" | "reading" | "done" | "error";

export default function Uploader({ copy, locale }: { copy: MaritimeCvUploadCopy; locale: string }) {
  const t = useT();
  const router = useRouter();
  const input = useRef<HTMLInputElement | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [over, setOver] = useState(false);

  const run = useCallback(async (blob: Blob, mediaType: string, userId: string) => {
    if (localStorage.getItem("user_role") === "company") {
      setError(copy.company); setPhase("error"); return;
    }
    setPhase("reading"); setError("");
    const parsed = await parseCvFile(blob, mediaType);
    // Read or not, the file has done its job here; a retry starts from a fresh
    // upload rather than looping on the same unreadable scan.
    await clearPending();
    if (!parsed.ok) {
      setError(`${copy.failed} ${cvParseError(parsed.error, t)}`); setPhase("error"); return;
    }
    await importParsedCv(userId, parsed.profile);
    try { localStorage.removeItem("oauth_role"); } catch { /* fine */ }
    setPhase("done");
    router.push("/seafarer/cv?from=maker");
  }, [copy, router, t]);

  // Back from sign-in — or just back — with a file still waiting: carry on.
  useEffect(() => {
    let live = true;
    (async () => {
      const pending = await loadPending();
      if (!pending || !live) return;
      setFileName(pending.name);
      const { data: { session } } = await supabase.auth.getSession();
      if (!live) return;
      const type = cvMediaType({ name: pending.name, type: pending.type });
      if (!type) { await clearPending(); return; }
      if (session) void run(pending.blob, type, session.user.id);
      else setPhase("signin");
    })();
    return () => { live = false; };
  }, [run]);

  async function takeFile(file: File | undefined) {
    if (!file) return;
    const type = cvMediaType(file);
    if (!type) { setError(copy.badType); setPhase("error"); return; }
    if (file.size > MAX_CV_BYTES) { setError(copy.tooBig); setPhase("error"); return; }
    setFileName(file.name);
    await savePending(file);
    const { data: { session } } = await supabase.auth.getSession();
    if (session) void run(file, type, session.user.id);
    else setPhase("signin");
  }

  function signIn() {
    // A first Google sign-in asks "seafarer or company?". Anyone arriving from
    // this page is a seafarer, so the question is answered for them — the
    // callback reads this and clears it.
    try { localStorage.setItem("oauth_role", "seafarer"); } catch { /* the question will be asked */ }
    const back = `${locale === "en" ? "" : `/${locale}`}/maritime-cv`;
    window.location.href = `/auth/login?redirect=${encodeURIComponent(back)}`;
  }

  return (
    <div id="upload" className="mx-auto mt-8 w-full max-w-xl scroll-mt-24">
      {phase === "idle" && (
        <label
          onDragOver={(e) => { e.preventDefault(); setOver(true); }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => { e.preventDefault(); setOver(false); void takeFile(e.dataTransfer.files?.[0]); }}
          className={`flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed px-6 py-9 text-center transition ${
            over ? "border-brass bg-brass/10" : "border-brass/40 bg-card hover:border-brass/70"
          }`}
        >
          <Upload size={30} className="text-brassInk" />
          <span className="font-display text-lg font-semibold text-white">{copy.dropTitle}</span>
          <span className="text-sm text-mist">{copy.dropHint}</span>
          <span className="mt-2 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-6 py-3 text-sm font-bold text-[#061523]">
            <FileText size={16} /> {copy.dropButton}
          </span>
          <input
            ref={input}
            type="file"
            accept="application/pdf,.pdf,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            onChange={(e) => { void takeFile(e.target.files?.[0]); if (input.current) input.current.value = ""; }}
          />
        </label>
      )}

      {phase === "signin" && (
        <div className="rounded-2xl border border-brass/40 bg-card px-6 py-7 text-center">
          <p className="flex items-center justify-center gap-2 text-sm text-mist">
            <FileText size={15} className="shrink-0 text-brassInk" /> {copy.pendingFile}{" "}
            <span className="min-w-0 truncate font-semibold text-foam">{fileName}</span>
          </p>
          <h3 className="mt-4 font-display text-xl font-semibold text-white">{copy.signinTitle}</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-mist">{copy.signinBody}</p>
          <button
            type="button"
            onClick={signIn}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-6 py-3 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5"
          >
            <LogIn size={16} /> {copy.signinButton}
          </button>
        </div>
      )}

      {(phase === "reading" || phase === "done") && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-card px-6 py-9 text-center">
          {phase === "reading"
            ? <Loader2 size={28} className="animate-spin text-brassInk" />
            : <CheckCircle2 size={28} className="text-teal" />}
          <p className="text-sm font-semibold text-foam">{phase === "reading" ? copy.reading : copy.done}</p>
          {fileName && <p className="max-w-full truncate text-xs text-mist">{fileName}</p>}
        </div>
      )}

      {phase === "error" && (
        <div className="rounded-2xl border border-coral/30 bg-coral/10 px-6 py-6 text-center">
          <p className="flex items-start justify-center gap-2 text-sm text-coral">
            <AlertCircle size={16} className="mt-0.5 shrink-0" /> <span>{error}</span>
          </p>
          <button
            type="button"
            onClick={() => { setPhase("idle"); setError(""); }}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-foam transition hover:bg-white/10"
          >
            <Upload size={15} /> {copy.dropButton}
          </button>
        </div>
      )}

      <p className="mt-4 flex items-start justify-center gap-2 text-xs leading-relaxed text-mist">
        <ShieldCheck size={14} className="mt-0.5 shrink-0 text-teal" /> {copy.privacy}
      </p>
      <p className="mt-2 text-center text-xs">
        <Link href="/seafarer/profile" className="text-brassInk underline hover:text-brass">{copy.manual}</Link>
      </p>
    </div>
  );
}
