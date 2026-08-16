import type { SupabaseClient } from "@supabase/supabase-js";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Db = SupabaseClient<any, any, any>;

// The seafarer's CV as self-contained, email-safe HTML — header with contacts,
// personal information, identity documents & visas, certificates, sea service.
//
// Two things render it and they must not drift apart: the application email to
// a crewing agency, and the shared CV page a seafarer links to from their own
// mail. Inline styles rather than Tailwind precisely because the email copy has
// no stylesheet to lean on.
export async function buildCvHtml(
  admin: Db,
  seafarerId: string,
  email: string | null,
  coverLetter?: string | null,
): Promise<{ html: string; name: string }> {
  const [{ data: sf }, { data: experience }, { data: certificates }] = await Promise.all([
    admin.from("seafarers")
      .select("first_name, last_name, nationality, date_of_birth, phone, rank, readiness_date, about, passport_no, passport_expiry, seamans_book, seamans_book_expiry, medical, medical_expiry, diploma, diploma_expiry, schengen_visa, us_visa")
      .eq("id", seafarerId).single(),
    admin.from("sea_experience")
      .select("vessel_name, vessel_type, rank, company, dwt, engine, from_date, to_date")
      .eq("seafarer_id", seafarerId).order("from_date", { ascending: false }).limit(10),
    admin.from("certificates")
      .select("name, issuing_authority, expiry_date")
      .eq("seafarer_id", seafarerId).order("expiry_date", { ascending: false }).limit(20),
  ]);

  const name = [sf?.first_name, sf?.last_name].filter(Boolean).join(" ") || "Seafarer";
  const fmt = (d?: string | null) =>
    d ? new Date(d).toLocaleDateString("en-GB", { timeZone: "UTC", month: "short", year: "numeric" }) : null;
  const availability = sf?.readiness_date
    ? new Date(sf.readiness_date).toLocaleDateString("en-GB", { timeZone: "UTC", day: "numeric", month: "short", year: "numeric" })
    : "Immediate";

  const th = "background:#16324f;color:#ffffff;text-align:left;padding:8px 12px;font-size:13px;letter-spacing:0.4px;";
  const label = "background:#f4f6f8;padding:8px 12px;border:1px solid #e3e8ee;width:38%;color:#334155;font-size:13px;";
  const val = "padding:8px 12px;border:1px solid #e3e8ee;color:#111827;font-size:13px;";
  const section = (title: string) => `<tr><td colspan="2" style="${th}">${title}</td></tr>`;
  const row = (l: string, v?: string | null) =>
    v ? `<tr><td style="${label}">${l}</td><td style="${val}">${v}</td></tr>` : "";
  const withExpiry = (no?: string | null, expiry?: string | null) =>
    no ? `${no}${fmt(expiry) ? ` — exp. ${fmt(expiry)}` : ""}` : null;

  const docRows = [
    row("Foreign passport", withExpiry(sf?.passport_no, sf?.passport_expiry)),
    row("Seaman's book", withExpiry(sf?.seamans_book, sf?.seamans_book_expiry)),
    row("Medical certificate", withExpiry(sf?.medical, sf?.medical_expiry)),
    row("Diploma / CoC", withExpiry(sf?.diploma, sf?.diploma_expiry)),
    row("Schengen visa", sf?.schengen_visa),
    row("US visa", sf?.us_visa),
  ].join("");

  const certRows = (certificates ?? []).map((c) =>
    row(c.name, [c.issuing_authority, fmt(c.expiry_date) ? `exp. ${fmt(c.expiry_date)}` : null].filter(Boolean).join(" · ") || "—")
  ).join("");

  const expHeader = `<tr>${["Vessel", "Type", "DWT", "Rank", "Company", "Period"]
    .map((h) => `<td style="${label}width:auto;font-weight:bold;">${h}</td>`).join("")}</tr>`;
  const expRows = (experience ?? []).map((e) => {
    const period = e.from_date ? `${fmt(e.from_date)} – ${e.to_date ? fmt(e.to_date) : "present"}` : "—";
    return `<tr>${[e.vessel_name, e.vessel_type ?? "—", e.dwt ?? "—", e.rank ?? "—", e.company ?? "—", period]
      .map((v) => `<td style="${val}">${v}</td>`).join("")}</tr>`;
  }).join("");

  const html = `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;">
  <h2 style="color:#16324f;margin:20px 0 2px;text-transform:uppercase;">${name}</h2>
  <p style="color:#b8860b;font-weight:bold;margin:0 0 10px;text-transform:uppercase;">${sf?.rank ?? ""}</p>
  <p style="margin:0 0 10px;font-size:13px;color:#111827;">
    <strong>Email:</strong> ${email ?? "—"}<br/>
    <strong>Phone / WhatsApp:</strong> ${sf?.phone ?? "—"}<br/>
    <strong>Availability:</strong> ${availability}${sf?.nationality ? ` · ${sf.nationality}` : ""}
  </p>
  ${sf?.about ? `<p style="font-size:13px;color:#374151;">${sf.about}</p>` : ""}
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;margin-top:12px;">
    ${section("PERSONAL INFORMATION")}
    ${row("Date of birth", sf?.date_of_birth ? new Date(sf.date_of_birth).toLocaleDateString("en-GB", { timeZone: "UTC", day: "numeric", month: "long", year: "numeric" }) : null)}
    ${row("Citizenship", sf?.nationality)}
    ${row("Availability", availability)}
    ${row("Rank / Position", sf?.rank)}
    ${row("Phone", sf?.phone)}
    ${row("Email", email)}
    ${docRows ? section("IDENTITY DOCUMENTS &amp; VISAS") + docRows : ""}
    ${certRows ? section("COMPETENCY &amp; STCW CERTIFICATES") + certRows : ""}
  </table>
  ${expRows ? `
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;margin-top:14px;">
    <tr><td colspan="6" style="${th}">SEA SERVICE HISTORY — last ${(experience ?? []).length} voyages</td></tr>
    ${expHeader}
    ${expRows}
  </table>` : ""}
  ${coverLetter ? `<h3 style="color:#16324f;margin:16px 0 6px;">Cover letter</h3><p style="font-size:13px;color:#374151;">${coverLetter}</p>` : ""}
  <p style="margin-top:18px;"><a href="https://seajobs.pro/seafarers/${seafarerId}" style="background:#c9a227;color:#000;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">View full profile on SeaJobs.pro →</a></p>
</div>`;

  return { html, name };
}
