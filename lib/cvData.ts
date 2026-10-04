import type { SupabaseClient } from "@supabase/supabase-js";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Db = SupabaseClient<any, any, any>;

// One loader for everything that renders a seafarer's CV.
//
// There are now three renderers — the application e-mail, the tokenised /cv
// page (both through lib/cvHtml) and the paid Word export (lib/cvDocx) — and
// they must show the same document. A CV that lists a certificate in the e-mail
// and omits it in the file the agency is asked to read is worse than either
// alone, so the query lives here rather than being copied per renderer.
//
// The limits are deliberate: ten voyages and twenty certificates are what a
// crewing manager reads, and the same cut has been in the e-mail since it was
// written.

export type CvSeafarer = {
  first_name: string | null;
  last_name: string | null;
  nationality: string | null;
  date_of_birth: string | null;
  phone: string | null;
  rank: string | null;
  readiness_date: string | null;
  about: string | null;
  passport_no: string | null;
  passport_expiry: string | null;
  seamans_book: string | null;
  seamans_book_expiry: string | null;
  medical: string | null;
  medical_expiry: string | null;
  diploma: string | null;
  diploma_expiry: string | null;
  schengen_visa: string | null;
  us_visa: string | null;
};

export type CvVoyage = {
  vessel_name: string | null;
  vessel_type: string | null;
  rank: string | null;
  company: string | null;
  dwt: string | number | null;
  engine: string | null;
  from_date: string | null;
  to_date: string | null;
};

export type CvCertificate = {
  name: string | null;
  issuing_authority: string | null;
  expiry_date: string | null;
};

export type CvData = {
  seafarer: CvSeafarer | null;
  experience: CvVoyage[];
  certificates: CvCertificate[];
  /** "First Last", or "Seafarer" when the profile has neither. */
  name: string;
  email: string | null;
};

export const CV_SEAFARER_COLUMNS =
  "first_name, last_name, nationality, date_of_birth, phone, rank, readiness_date, about, passport_no, passport_expiry, seamans_book, seamans_book_expiry, medical, medical_expiry, diploma, diploma_expiry, schengen_visa, us_visa";

export async function loadCvData(admin: Db, seafarerId: string, email: string | null): Promise<CvData> {
  const [{ data: sf }, { data: experience }, { data: certificates }] = await Promise.all([
    admin.from("seafarers").select(CV_SEAFARER_COLUMNS).eq("id", seafarerId).single(),
    admin.from("sea_experience")
      .select("vessel_name, vessel_type, rank, company, dwt, engine, from_date, to_date")
      .eq("seafarer_id", seafarerId).order("from_date", { ascending: false }).limit(10),
    admin.from("certificates")
      .select("name, issuing_authority, expiry_date")
      .eq("seafarer_id", seafarerId).order("expiry_date", { ascending: false }).limit(20),
  ]);

  const seafarer = (sf ?? null) as CvSeafarer | null;
  return {
    seafarer,
    experience: (experience ?? []) as CvVoyage[],
    certificates: (certificates ?? []) as CvCertificate[],
    name: [seafarer?.first_name, seafarer?.last_name].filter(Boolean).join(" ") || "Seafarer",
    email,
  };
}

/** "Mar 2026" — the short form every renderer uses for a document's expiry. */
export function cvMonth(d?: string | null): string | null {
  return d ? new Date(d).toLocaleDateString("en-GB", { timeZone: "UTC", month: "short", year: "numeric" }) : null;
}

/** "3 March 2026" — the long form, used where a date is the subject rather than a footnote. */
export function cvDate(d?: string | null): string | null {
  return d ? new Date(d).toLocaleDateString("en-GB", { timeZone: "UTC", day: "numeric", month: "long", year: "numeric" }) : null;
}

/** When the seafarer is free to join. An empty readiness date means now, not unknown. */
export function cvAvailability(sf: CvSeafarer | null): string {
  return cvDate(sf?.readiness_date) ?? "Immediate";
}

/** "AB1234567 — exp. Mar 2026", or nothing at all when the document is not on file. */
export function cvDocument(no?: string | null, expiry?: string | null): string | null {
  if (!no) return null;
  const until = cvMonth(expiry);
  return until ? `${no} — exp. ${until}` : no;
}
