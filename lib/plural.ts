/**
 * Russian / Ukrainian / Polish plural: 1 and 21 take `one`; 2–4 and 22–24 take
 * `few`; 5–20 and 11–14 take `many`. Polish 1 is the caller's business — it
 * says "1 oferta" but "21 ofert".
 */
export function slavic(n: number, one: string, few: string, many: string): string {
  const d = n % 10, h = n % 100;
  if (d === 1 && h !== 11) return one;
  if (d >= 2 && d <= 4 && (h < 12 || h > 14)) return few;
  return many;
}
