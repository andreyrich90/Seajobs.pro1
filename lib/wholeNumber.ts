// Salaries are whole numbers in the database (`vacancies.salary_from` and
// `salary_to` are integer columns). A parsed "7800.5", or "8 350,50" typed by
// hand, used to stop the import with "invalid input syntax for type integer"
// until the decimals were deleted by hand. Rounded here instead, on both the
// form and the server.

/** A whole number from a number or a loosely written string; null when there is none. */
export function toWholeNumber(raw: number | string | null | undefined): number | null {
  if (raw === null || raw === undefined) return null;
  if (typeof raw === "number") return Number.isFinite(raw) ? Math.round(raw) : null;
  let s = raw.replace(/[\s ]/g, "").replace(/[^\d.,-]/g, "");
  if (!s) return null;
  // "7,800" / "12,500.50": commas group thousands. Otherwise a comma is the
  // decimal mark, as in "7800,5".
  if (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(s)) s = s.replace(/,/g, "");
  else s = s.replace(/\.(?=\d{3}(\D|$))(?=.*[.,])/g, "").replace(",", ".");
  const n = Number(s);
  return Number.isFinite(n) ? Math.round(n) : null;
}
