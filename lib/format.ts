// Number and date formatting that does not depend on where it runs.
//
// `Number.prototype.toLocaleString()` with no locale argument uses the
// *runtime's* locale. On the server that is the container's — "10,350" — and in
// the browser it is the seafarer's: "10 350" for ru/ua/pl, "10.350" for de.
// React compares the two, finds different text and aborts hydration, which is
// what the console reports as "Minified React error #418". Every salary on
// every server-rendered page fired it, so the whole page fell back to a client
// re-render: slower, and flagged by PageSpeed as a browser error.
//
// The same trap applies to dates: the server runs in UTC and the reader does
// not, so a date near midnight renders one day on one side and another on the
// other.

/** Thin space between thousands, identical on both sides of hydration. */
const GROUP = "\u00A0"; // written as an escape — a literal NBSP is invisible in a diff

/** 10350 → "10 350". Use for every salary, DWT and count shown to a reader. */
export function money(n: number): string {
  const neg = n < 0;
  const digits = Math.round(Math.abs(n)).toString();
  let out = "";
  for (let i = 0; i < digits.length; i++) {
    if (i > 0 && (digits.length - i) % 3 === 0) out += GROUP;
    out += digits[i];
  }
  return neg ? `-${out}` : out;
}

const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * "2026-09-03" → "3 Sep 2026", read in UTC on both sides.
 *
 * Dates on this board are calendar dates — a joining date, a posting date — not
 * instants, so UTC is the correct reading everywhere and the only one that
 * cannot drift between the server and a reader two time zones away.
 */
export function shortDate(value: string | Date | null | undefined, withYear = true): string {
  if (!value) return "";
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const day = d.getUTCDate();
  const month = MONTHS_EN[d.getUTCMonth()];
  return withYear ? `${day} ${month} ${d.getUTCFullYear()}` : `${day} ${month}`;
}
