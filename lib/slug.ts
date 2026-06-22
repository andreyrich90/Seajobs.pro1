// Pretty URL slugs: "<slug>-<uuid>". The record is always looked up by the
// trailing UUID, so old plain-id links keep working and the slug is cosmetic.

const UUID = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";

export function slugify(input: string): string {
  return (input || "")
    .toLowerCase()
    .replace(/[«»"'’`]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-") // keep letters (incl. Cyrillic) and numbers
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
