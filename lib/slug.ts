// Pretty URL slugs: "<slug>-<uuid>". The record is always looked up by the
// trailing UUID, so old plain-id links keep working and the slug is cosmetic.

const UUID = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";

// Cyrillic → Latin (Russian + Ukrainian). Titles are often in ru/ua, and if we
// kept the Cyrillic in the slug the URL would become a wall of "%D1%80%D0%BE…"
// when shared to LinkedIn/Telegram. Transliterating keeps the slug readable ASCII.
const CYRILLIC: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", ґ: "g", д: "d", е: "e", ё: "e", є: "ye",
  ж: "zh", з: "z", и: "i", і: "i", ї: "yi", й: "y", к: "k", л: "l", м: "m",
  н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh",
  ц: "ts", ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e",
  ю: "yu", я: "ya",
};

// A few Latin letters that don't decompose via NFD (Polish/Romanian/etc.).
const LATIN_SPECIAL: Record<string, string> = {
  ł: "l", đ: "d", ø: "o", ß: "ss", æ: "ae", œ: "oe", þ: "th",
};

export function slugify(input: string): string {
  return (input || "")
    .toLowerCase()
    .replace(/[«»"'’`]/g, "")
    .replace(/[а-яёіїєґ]/g, (c) => CYRILLIC[c] ?? "")
    .replace(/[łđøßæœþ]/g, (c) => LATIN_SPECIAL[c] ?? c)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip Latin diacritics (é→e, ș→s, ă→a…)
    .replace(/[^a-z0-9]+/g, "-") // ASCII-only now → clean, shareable slugs
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

// Build the "<slug>-<id>" path segment. Falls back to the bare id if the title
// produces no slug (e.g. empty).
export function slugId(title: string, id: string): string {
  const s = slugify(title);
  return s ? `${s}-${id}` : id;
}

// Extract the trailing UUID from a route param (or null if there isn't one).
export function extractId(param: string): string | null {
  const m = param.match(new RegExp(UUID + "$", "i"));
  return m ? m[0] : null;
}
