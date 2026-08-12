// Contract length is free text: it comes from a crewing agency's own wording,
// through the screenshot parser, so it arrives in whatever shape the source had.
// The one form that reliably comes out mangled is a tolerance — "4 +/- 1 month"
// becomes "4+-1 months", which reads as a typo on the card.
//
// Note "4+1" is NOT a tolerance and must be left alone: in crewing it means a
// four-month contract with a one-month margin, and every seafarer reads it that
// way. Only an explicit +/- or +- is rewritten.

export function normalizeContractDuration(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const s = raw
    .trim()
    .replace(/\s*\+\s*\/\s*-\s*/g, " ± ") // "4 +/- 1" → "4 ± 1"
    .replace(/\s*\+-\s*/g, " ± ")          // "2+-1"    → "2 ± 1"
    .replace(/\s*±\s*/g, " ± ")            // already a ±, just space it evenly
    .replace(/\s+/g, " ")
    .trim();
  return s || null;
}
