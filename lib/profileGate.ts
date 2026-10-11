// What a seafarer's profile must hold before a vacancy's contacts are shown
// and before an application can be sent.
//
// An account is only an e-mail address, and a crewing agency that receives
// "an application" from one learns nothing about who wrote it. So the agency's
// e-mail and phone, and the apply button, wait until the profile names a person
// and a rank: first name, last name, phone, rank. (The e-mail is the account's
// own and always there.)
//
// The same four fields are checked in three more places, which are the real
// boundary — this file is what the page and the routes agree on:
//   - `api/vacancy-contact` hands out the contacts only past this check;
//   - `api/cv-share` mints a CV link only past it;
//   - the `enforce_profile_complete_on_apply` trigger
//     (20261011000000_profile_fields_for_apply.sql) refuses the application row.
// Change the list here and in that trigger together.
//
// Sending an application additionally needs one sea-service record, as before:
// the CV the agency receives is built from them. That rule stays where it was
// (the trigger and `api/cv-share`); viewing the contacts does not need it, so a
// cadet with no voyages yet can still see whom to write to.

export type ProfileField = "first_name" | "last_name" | "phone" | "rank";

export const PROFILE_FIELDS: ProfileField[] = ["first_name", "last_name", "phone", "rank"];

/** The select list that feeds `profileGaps`. */
export const PROFILE_SELECT = PROFILE_FIELDS.join(", ");

/** The fields still empty, in display order; an empty list means complete. */
export function profileGaps(
  sf: Partial<Record<ProfileField, string | null>> | null | undefined,
): ProfileField[] {
  return PROFILE_FIELDS.filter((f) => !(sf?.[f] ?? "").trim());
}
