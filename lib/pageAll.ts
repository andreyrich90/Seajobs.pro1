// Read every row of a query, a page at a time.
//
// PostgREST answers at most 1000 rows per request (Supabase's `max-rows`), and
// `.limit(5000)` does not lift that — it silently stops at the thousandth row.
// That is how 375 live vacancies fell out of the sitemap, the /jobs list and the
// rank, vessel and country pages once the board passed a thousand.
//
// `run` builds the same query for a given range. The query must have a total
// order (end it with `.order("id")`), or rows can repeat or go missing between
// pages. Throws on error: a page that half-loaded must not pass for the whole.

export const PAGE_SIZE = 1000;

type Page<T> = PromiseLike<{ data: T[] | null; error: { message: string } | null }>;

export async function pageAll<T>(run: (from: number, to: number) => Page<T>, maxRows = 20000): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; from < maxRows; from += PAGE_SIZE) {
    const { data, error } = await run(from, from + PAGE_SIZE - 1);
    if (error) throw new Error(error.message);
    const rows = data ?? [];
    out.push(...rows);
    if (rows.length < PAGE_SIZE) break;
  }
  return out;
}
