// How long a vacancy title may be.
//
// A title is the rank and the vessel ("Chief Engineer — Oil Tanker"), not the
// posting: a company once pasted a whole 679-character Telegram post into the
// field, contacts included, and it filled the home page. The database trigger
// in 20261011020000_vacancy_title_tidy.sql enforces this whoever writes the
// row — it strips contacts and turns a longer title into "<rank> — <vessel>" —
// and the company form stops typing at the same number. Change both together.
export const TITLE_MAX = 90;
