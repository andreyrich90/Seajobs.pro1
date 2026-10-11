import type { Vacancy } from "@/lib/supabase/types";

// The vacancy columns a browser may read.
//
// `contact_email`, `contact_phone` and `source_url` (the agency's own post,
// contacts and all) are closed to the anon and authenticated roles by column
// privileges (20261011010000_vacancy_contacts_private.sql). A seafarer gets them
// from api/vacancy-contact once the profile is complete (lib/profileGate.ts);
// an admin from api/admin/vacancy-contacts. Server code reads with the service
// role and is unaffected.
//
// Two consequences for browser code:
//   - `select("*")` on vacancies, and a bare `.select()` after an insert or
//     update, now fail with "permission denied" — `*` includes the closed
//     columns. Select these columns instead.
//   - A column added to `vacancies` later is invisible to the browser until it
//     is granted, because the grant is per column. Add it here and grant it:
//       grant select (new_column) on public.vacancies to anon, authenticated;
export const VACANCY_COLUMNS =
  "id, company_id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, description, is_active, is_imported, country, region, city, postal_code, valid_through, views_count, created_at, updated_at, featured_until, telegram_message_id";

/** A vacancy as the browser may see it. */
export type BrowserVacancy = Omit<Vacancy, "contact_email" | "contact_phone" | "source_url">;
