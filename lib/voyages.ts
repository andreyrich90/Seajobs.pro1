// When two sea-service rows are the same contract.
//
// Uploading a CV twice, or an old CV and then a newer one, used to leave the
// same voyage on file twice: the parser reads "C/O" once and "Chief Officer"
// the next time, "MV ATLANTIC" and "Atlantic", 1 March and 15 March for
// "03.2024". An exact match on every field let all of those through, and the
// CV then listed one contract as two.
//
// The rule here is about the seafarer, not the text: one person cannot serve
// on the same ship twice over the same weeks. Same vessel and the dates
// overlap — or start within a month of each other — is one contract, whatever
// rank or company each copy wrote down. Two genuine contracts on one ship are
// months apart and never overlap, so they are left alone.
//
// Pure, so the browser sweep, the CV import and the server-side CV loader all
// apply the same rule and a document cannot show a pair the editor merged.

export type VoyageLike = {
  id?: string;
  vessel_name?: string | null;
  from_date?: string | null;
  to_date?: string | null;
};

/** The fields a duplicate may fill in on the copy that is kept. Dates are not
 *  among them: they are what decided the two were the same. */
export const VOYAGE_FILL_FIELDS = ["vessel_type", "rank", "company", "flag", "imo_number", "dwt", "engine"] as const;

// Prefixes that say what kind of ship it is, not which one. Kept in step with
// the migration that cleaned the rows already on file.
const PREFIX = /^(m\s*[\/.]?\s*[vts]|s\s*[\/.]?\s*s|mts|lng\s*c|lpg\s*c)\.?\s+/i;

/** "M/V Atlantic Star" and "ATLANTIC STAR" are one ship. */
export function vesselKey(name?: string | null): string {
  return (name ?? "").trim().replace(PREFIX, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
}

const DAY = 86_400_000;
function day(d?: string | null): number | null {
  if (!d) return null;
  const t = Date.parse(d);
  return Number.isNaN(t) ? null : Math.floor(t / DAY);
}

export function sameVoyage(a: VoyageLike, b: VoyageLike, today = Math.floor(Date.now() / DAY)): boolean {
  const k = vesselKey(a.vessel_name);
  if (!k || k !== vesselKey(b.vessel_name)) return false;
  const af = day(a.from_date), bf = day(b.from_date);
  // Neither copy has a start: only the same end (or no dates at all) is safe
  // to call one contract. One dated and one not is left for a person to judge.
  if (af === null || bf === null) return af === bf && day(a.to_date) === day(b.to_date);
  if (Math.abs(af - bf) <= 31) return true;
  // An empty end is a contract still running.
  const ae = day(a.to_date) ?? today, be = day(b.to_date) ?? today;
  // More than a crew-change handover: a relief signing on the day the other
  // signs off is two contracts, not one.
  return Math.min(ae, be) - Math.max(af, bf) > 15;
}

function filled(r: Record<string, unknown>): number {
  return Object.values(r).filter((v) => v !== null && v !== undefined && v !== "").length;
}

/**
 * Collapse every group of rows that are the same contract into one.
 *
 * The kept row is the most complete copy; its empty fields are filled from the
 * others. `rows` is the result in the original order, `drop` the copies to
 * delete, `patched` the kept rows that gained a field and need saving.
 */
export function dedupeVoyages<T extends VoyageLike>(input: T[]): { rows: T[]; drop: T[]; patched: T[] } {
  const parent = input.map((_, i) => i);
  const find = (i: number): number => (parent[i] === i ? i : (parent[i] = find(parent[i])));
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (sameVoyage(input[i], input[j])) parent[find(j)] = find(i);
    }
  }

  const groups = new Map<number, number[]>();
  input.forEach((_, i) => {
    const g = find(i);
    groups.set(g, [...(groups.get(g) ?? []), i]);
  });

  const keepAt = new Map<number, T>();
  const drop: T[] = [];
  const patched: T[] = [];
  for (const idx of groups.values()) {
    if (idx.length === 1) { keepAt.set(idx[0], input[idx[0]]); continue; }
    // Most complete first; on a tie, the one that came first.
    const best = [...idx].sort((x, y) => filled(input[y]) - filled(input[x]) || x - y)[0];
    const kept = { ...input[best] } as Record<string, unknown>;
    let changed = false;
    for (const i of idx) {
      if (i === best) continue;
      drop.push(input[i]);
      const other = input[i] as Record<string, unknown>;
      for (const f of VOYAGE_FILL_FIELDS) {
        if ((kept[f] === null || kept[f] === undefined || kept[f] === "") && other[f]) { kept[f] = other[f]; changed = true; }
      }
    }
    keepAt.set(best, kept as T);
    if (changed) patched.push(kept as T);
  }

  const rows = input.map((_, i) => keepAt.get(i)).filter((r): r is T => r !== undefined);
  return { rows, drop, patched };
}
