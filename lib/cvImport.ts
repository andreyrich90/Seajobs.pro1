// Reading a seafarer's existing CV into their profile, in the browser.
//
// Two screens do the whole thing in one go — the apply window on a vacancy and
// the /maritime-cv landing — and they used to carry a copy each of the same
// sixty lines. A third copy was about to appear, so it lives here instead.
// (The profile page parses too, but fills its form for the seafarer to review
// rather than writing straight to the database, so it keeps its own path.)

import { supabase } from "@/lib/supabase/client";

export const PDF_TYPE = "application/pdf";
export const DOCX_TYPE = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

/**
 * The file travels as base64, which is a third larger than the file, and
 * Vercel refuses a request body above ~4.5 MB — so a 3 MB file is the most
 * that arrives whole.
 */
export const MAX_CV_BYTES = 3 * 1024 * 1024;

/** The media type to send, or null for a file the parser cannot read. */
export function cvMediaType(file: { name: string; type: string }): string | null {
  const lower = file.name.toLowerCase();
  if (file.type === PDF_TYPE || lower.endsWith(".pdf")) return PDF_TYPE;
  if (file.type === DOCX_TYPE || lower.endsWith(".docx")) return DOCX_TYPE;
  return null;
}

export function readAsDataURL(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });
}

export type ParseResult =
  | { ok: true; profile: Record<string, unknown> }
  | { ok: false; error: string };

/** Send the file to /api/cv-parse as the signed-in seafarer. */
export async function parseCvFile(file: Blob, mediaType: string): Promise<ParseResult> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { ok: false, error: "unauthorized" };
  const fileBase64 = await readAsDataURL(file);
  const res = await fetch("/api/cv-parse", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
    body: JSON.stringify({ fileBase64, mediaType }),
  });
  const data = (await res.json().catch(() => ({}))) as { ok?: boolean; profile?: Record<string, unknown>; error?: string };
  return data.ok && data.profile ? { ok: true, profile: data.profile } : { ok: false, error: data.error ?? "request_failed" };
}

const PROFILE_FIELDS = [
  "first_name", "last_name", "rank", "nationality", "phone", "date_of_birth",
  "readiness_date", "about", "seamans_book", "seamans_book_expiry", "passport_no",
  "passport_expiry", "service_record_book", "medical", "medical_expiry", "diploma",
  "diploma_expiry", "us_visa", "schengen_visa", "education", "languages", "competencies",
] as const;

/**
 * Write a parsed CV into the seafarer's profile.
 *
 * Only fields the CV actually holds are overwritten, so importing a thin CV
 * never blanks a fuller profile. Certificates and sea service already on file
 * are skipped, so uploading the same CV twice never doubles them.
 */
export async function importParsedCv(userId: string, p: Record<string, unknown>): Promise<void> {
  const upd: { [K in (typeof PROFILE_FIELDS)[number]]?: string } = {};
  for (const k of PROFILE_FIELDS) if (typeof p[k] === "string" && p[k]) upd[k] = p[k] as string;
  if (Object.keys(upd).length) {
    await supabase.from("seafarers").update(upd).eq("id", userId);
  }

  const [{ data: exCerts }, { data: exExp }] = await Promise.all([
    supabase.from("certificates").select("name, number").eq("seafarer_id", userId),
    supabase.from("sea_experience").select("vessel_name, rank, from_date, to_date").eq("seafarer_id", userId),
  ]);
  const certKey = (name?: string | null, number?: string | null) =>
    `${(name ?? "").trim().toLowerCase()}|${(number ?? "").trim().toLowerCase()}`;
  const expKey = (vessel?: string | null, rank?: string | null, from?: string | null, to?: string | null) =>
    `${(vessel ?? "").trim().toLowerCase()}|${(rank ?? "").trim().toLowerCase()}|${from ?? ""}|${to ?? ""}`;
  const seenCerts = new Set((exCerts ?? []).map((c) => certKey(c.name, c.number)));
  const seenExp = new Set((exExp ?? []).map((e) => expKey(e.vessel_name, e.rank, e.from_date, e.to_date)));

  if (Array.isArray(p.certificates)) {
    const rows = (p.certificates as Record<string, string | null>[])
      .filter((c) => c?.name)
      .filter((c) => {
        const k = certKey(c.name, c.number);
        if (seenCerts.has(k)) return false;
        seenCerts.add(k);
        return true;
      })
      .map((c) => ({
        seafarer_id: userId,
        name: c.name as string,
        number: c.number ?? null,
        issue_date: c.issue_date ?? null,
        expiry_date: c.expiry_date ?? null,
        issuing_authority: c.issuing_authority ?? null,
      }));
    if (rows.length) await supabase.from("certificates").insert(rows);
  }

  if (Array.isArray(p.experience)) {
    const rows = (p.experience as Record<string, string | null>[])
      .filter((x) => x?.vessel_name)
      .filter((x) => {
        const k = expKey(x.vessel_name, x.rank, x.from_date, x.to_date);
        if (seenExp.has(k)) return false;
        seenExp.add(k);
        return true;
      })
      .map((x) => ({
        seafarer_id: userId,
        vessel_name: x.vessel_name as string,
        vessel_type: x.vessel_type ?? null,
        rank: x.rank ?? null,
        company: x.company ?? null,
        flag: x.flag ?? null,
        dwt: x.dwt ?? null,
        engine: x.engine ?? null,
        from_date: x.from_date ?? null,
        to_date: x.to_date ?? null,
      }));
    if (rows.length) await supabase.from("sea_experience").insert(rows);
  }
}
