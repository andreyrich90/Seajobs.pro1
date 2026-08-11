import type { SupabaseClient } from "@supabase/supabase-js";
import { companyFromEmail } from "@/lib/companyName";
import { dispatchJobAlerts, type AlertResult } from "@/lib/jobAlerts";

// Shared "upsert one vacancy" used by the admin Import route and by approving a
// scraped draft. Finds/creates the company by name, then either refreshes a
// recurring posting (same company + title) or inserts a new one. Imported rows
// are flagged is_imported and carry the crewing contact_email so applications
// forward our CV straight to the agency.

export type ImportVacancyInput = {
  companyName?: string | null;
  companyLocation?: string | null;
  companyWebsite?: string | null;
  title?: string | null;
  rank?: string | null;
  vesselType?: string | null;
  salaryFrom?: number | string | null;
  salaryTo?: number | string | null;
  salaryPeriod?: string | null;
  currency?: string | null;
  contractDuration?: string | null;
  joiningDate?: string | null;
  description?: string | null;
  sourceUrl?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
};

export type ImportVacancyResult = {
  vacancyId: string;
  companyId: string;
  refreshed: boolean;
  // True when this screenshot had no crewing email and we reused the one from a
  // previous posting of the same company (so the admin can see/verify it).
  contactEmailInherited: boolean;
  contactEmail: string | null;
  /** Job-alert fan-out for this posting; all zeros for a refreshed duplicate. */
  alerts?: AlertResult;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function importVacancy(
  admin: SupabaseClient<any, any, any>,
  input: ImportVacancyInput
): Promise<ImportVacancyResult> {
  const title = input.title?.trim();
  // Fall back to the crewing email's domain when no company name was parsed
  // (e.g. cv@ariesnav.com → "Ariesnav").
  const companyName = input.companyName?.trim() || companyFromEmail(input.contactEmail) || "";
  if (!title || !companyName) throw new Error("Title and company name are required");

  // Find or create company by name (case-insensitive).
  let companyId: string;
  const { data: existing } = await admin
    .from("companies")
    .select("id")
    .ilike("name", companyName)
    .maybeSingle();

  if (existing) {
    companyId = existing.id;
  } else {
    const newId = crypto.randomUUID();
    await admin.from("companies").insert({
      id: newId,
      name: companyName,
      location: input.companyLocation?.trim() || null,
      website: input.companyWebsite?.trim() || null,
    });
    companyId = newId;
  }

  // Crewing contact email. When this screenshot didn't carry one, reuse the
  // email from the same company's most recent posting that had one — otherwise
  // applications to the new vacancy would have nowhere to forward the CV (and a
  // re-import of a recurring posting would wipe its existing email).
  let contactEmail = input.contactEmail?.trim() || null;
  let contactEmailInherited = false;
  if (!contactEmail) {
    const { data: prior } = await admin
      .from("vacancies")
      .select("contact_email")
      .eq("company_id", companyId)
      .not("contact_email", "is", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (prior?.contact_email) {
      contactEmail = prior.contact_email;
      contactEmailInherited = true;
    }
  }

  const fields = {
    rank: input.rank || null,
    vessel_type: input.vesselType || null,
    salary_from: input.salaryFrom ? Number(input.salaryFrom) : null,
    salary_to: input.salaryTo ? Number(input.salaryTo) : null,
    // Offshore, tug and yacht postings quote a DAY rate. Storing it as monthly
    // made a 450/day rate read as a 450/month wage, which wrecked the offshore
    // column of the salary table.
    salary_period: input.salaryPeriod === "day" ? "day" : "month",
    currency: input.currency || "USD",
    contract_duration: input.contractDuration?.trim() || null,
    joining_date: input.joiningDate || null,
    description: input.description?.trim() || null,
    is_active: true,
    is_imported: true,
    source_url: input.sourceUrl?.trim() || null,
    contact_email: contactEmail,
    contact_phone: input.contactPhone?.trim() || null,
  };

  // Recurring posting (same company + title) → refresh instead of cloning.
  const { data: duplicate } = await admin
    .from("vacancies")
    .select("id")
    .eq("company_id", companyId)
    .ilike("title", title)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (duplicate) {
    const now = new Date().toISOString();
    const { error: updErr } = await admin
      .from("vacancies")
      .update({ ...fields, created_at: now, updated_at: now })
      .eq("id", duplicate.id);
    if (updErr) throw new Error(updErr.message);
    return { vacancyId: duplicate.id, companyId, refreshed: true, contactEmailInherited, contactEmail };
  }

  const { data: vacancy, error: vacErr } = await admin
    .from("vacancies")
    .insert({ company_id: companyId, title, ...fields })
    .select("id")
    .single();
  if (vacErr) throw new Error(vacErr.message);

  // Fire job alerts here rather than at the call sites: imported postings are
  // most of the board and reach it through three different routes (the admin
  // form, the drafts queue and the Telegram collector). Alerts used to be sent
  // only by /api/notify, which none of them calls, so subscribers heard about
  // vacancies posted by a company through its own dashboard and nothing else.
  // Refreshing a recurring posting above is not new, so it stays silent.
  const alerts = await dispatchJobAlerts(admin, vacancy.id);

  return { vacancyId: vacancy.id, companyId, refreshed: false, contactEmailInherited, contactEmail, alerts };
}
