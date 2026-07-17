import type { SupabaseClient } from "@supabase/supabase-js";
import { companyFromEmail } from "@/lib/companyName";

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
  currency?: string | null;
  contractDuration?: string | null;
  joiningDate?: string | null;
  description?: string | null;
  sourceUrl?: string | null;
  contactEmail?: string | null;
};

export type ImportVacancyResult = {
  vacancyId: string;
  companyId: string;
  refreshed: boolean;
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

  const fields = {
    rank: input.rank || null,
    vessel_type: input.vesselType || null,
    salary_from: input.salaryFrom ? Number(input.salaryFrom) : null,
    salary_to: input.salaryTo ? Number(input.salaryTo) : null,
    currency: input.currency || "USD",
    contract_duration: input.contractDuration?.trim() || null,
    joining_date: input.joiningDate || null,
    description: input.description?.trim() || null,
    is_active: true,
    is_imported: true,
    source_url: input.sourceUrl?.trim() || null,
    contact_email: input.contactEmail?.trim() || null,
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
    return { vacancyId: duplicate.id, companyId, refreshed: true };
  }

  const { data: vacancy, error: vacErr } = await admin
    .from("vacancies")
    .insert({ company_id: companyId, title, ...fields })
    .select("id")
    .single();
  if (vacErr) throw new Error(vacErr.message);
  return { vacancyId: vacancy.id, companyId, refreshed: false };
}
