import type { SupabaseClient } from "@supabase/supabase-js";
import { dispatchJobAlerts } from "@/lib/jobAlerts";
import { postVacancyToChannel } from "@/lib/telegramFeed";

// The publish queue for vacancies the Telegram collector finds.
//
// A collection runs every six hours and used to put everything it found on the
// board — and in our Telegram channel, and into subscribers' alerts — in the
// same minute: twenty or thirty vacancies at once, then nothing for six hours.
// Now the collector imports them hidden (is_active = false) with a time in
// `vacancies.publish_at`, two or three per slot, 15–40 minutes apart, and the
// release cron (api/cron/release-vacancies, every 10 minutes) turns each one on
// when its time comes. Releasing is the moment a vacancy is new: it moves to
// the top of the board, goes to the channel and fires its job alerts.
//
// Nothing is released at night in Kyiv, where most readers and the operator
// are: a slot that falls between QUIET_FROM and QUIET_TO moves to the morning.
//
// Only the collector queues. A vacancy an admin imports or approves by hand is
// published at once — someone pressed a button and is waiting to see it.
//
// Needs migration 20261017000000_vacancy_publish_queue.sql. Until it is run,
// queueReady() says no and the collector publishes immediately, as before.

/* eslint-disable @typescript-eslint/no-explicit-any */
type Db = SupabaseClient<any, any, any>;

const ZONE = "Europe/Kyiv";
/** No releases from 23:00 to 08:00 Kyiv time. */
export const QUIET_FROM = 23;
export const QUIET_TO = 8;
/** Gaps between slots, in minutes; one is picked at random for each. */
const GAPS = [15, 20, 30, 40];
/**
 * How long one run's batch may take, in daytime minutes: the six hours until
 * the next collection, less a margin. A bigger batch has its gaps shrunk to
 * fit; the night pause comes on top.
 */
const WINDOW_MIN = 345;
/** Shortest gap a shrunk schedule may use. */
const MIN_GAP = 5;
/**
 * Where a queued row waits until scheduleQueued() gives it its real slot. Six
 * hours out, so a run that dies between the two steps still releases its
 * vacancies — late, but not never.
 */
export const PLACEHOLDER_DELAY_MIN = 360;

// ---- Kyiv wall-clock helpers ------------------------------------------------

type Wall = { y: number; m: number; d: number; h: number; mi: number };

const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: ZONE,
  year: "numeric", month: "2-digit", day: "2-digit",
  hour: "2-digit", minute: "2-digit", hourCycle: "h23",
});

export function kyivWall(t: Date): Wall {
  const p = Object.fromEntries(fmt.formatToParts(t).map((x) => [x.type, x.value]));
  return { y: +p.year, m: +p.month, d: +p.day, h: +p.hour, mi: +p.minute };
}

/** The instant at which Kyiv's clock shows the given wall time. */
export function kyivToInstant(w: Wall): Date {
  const asUtc = Date.UTC(w.y, w.m - 1, w.d, w.h, w.mi);
  let t = asUtc;
  // The offset is +2 or +3 hours; two passes settle it either side of a clock change.
  for (let i = 0; i < 2; i++) {
    const seen = kyivWall(new Date(t));
    const seenAsUtc = Date.UTC(seen.y, seen.m - 1, seen.d, seen.h, seen.mi);
    t += asUtc - seenAsUtc;
  }
  return new Date(t);
}

export function isQuiet(t: Date): boolean {
  const h = kyivWall(t).h;
  return h >= QUIET_FROM || h < QUIET_TO;
}

/** `t` itself in the daytime; otherwise the next 08:00 in Kyiv, plus a few minutes. */
function daytime(t: Date, rand: () => number): Date {
  if (!isQuiet(t)) return t;
  const w = kyivWall(t);
  // Before midnight the morning is tomorrow's; after it, today's.
  const day = w.h >= QUIET_FROM ? new Date(Date.UTC(w.y, w.m - 1, w.d + 1)) : new Date(Date.UTC(w.y, w.m - 1, w.d));
  const morning = kyivToInstant({
    y: day.getUTCFullYear(), m: day.getUTCMonth() + 1, d: day.getUTCDate(), h: QUIET_TO, mi: 0,
  });
  return new Date(morning.getTime() + Math.floor(rand() * 10) * 60_000);
}

// ---- Planning ---------------------------------------------------------------

/**
 * Release times for `n` vacancies starting at `start`: groups of two or three
 * share a time, groups are 15–40 minutes apart, shrunk if the lot would take
 * longer than WINDOW_MIN, and nothing lands at night. Pure, so it can be
 * checked without a database; `rand` is injectable for the same reason.
 */
export function planSlots(n: number, start: Date, rand: () => number = Math.random): Date[] {
  if (n <= 0) return [];
  const groups: number[] = [];
  for (let left = n; left > 0; ) {
    const size = left <= 3 ? left : rand() < 0.5 ? 2 : 3;
    groups.push(size);
    left -= size;
  }
  let gaps = groups.slice(1).map(() => GAPS[Math.floor(rand() * GAPS.length)]);
  const total = gaps.reduce((s, g) => s + g, 0);
  if (total > WINDOW_MIN) {
    const k = WINDOW_MIN / total;
    gaps = gaps.map((g) => Math.max(MIN_GAP, Math.round(g * k)));
  }

  const out: Date[] = [];
  let t = daytime(start, rand);
  groups.forEach((size, gi) => {
    if (gi > 0) t = daytime(new Date(t.getTime() + gaps[gi - 1] * 60_000), rand);
    for (let j = 0; j < size; j++) out.push(t);
  });
  return out;
}

// ---- Database ---------------------------------------------------------------

/** True once the migration has added `vacancies.publish_at`. */
export async function queueReady(admin: Db): Promise<boolean> {
  const { error } = await admin.from("vacancies").select("publish_at").limit(1);
  return !error;
}

/**
 * Give queued rows their real slots. The queue is continuous across runs: a
 * new batch starts after the last slot already waiting, so two runs close
 * together (the cron and the "Collect now" button) do not double the pace.
 * `ids` should already be interleaved across channels.
 */
export async function scheduleQueued(admin: Db, ids: string[], now = new Date()): Promise<Date[]> {
  if (ids.length === 0) return [];
  const { data: last } = await admin
    .from("vacancies")
    .select("publish_at")
    .not("publish_at", "is", null)
    .not("id", "in", `(${ids.join(",")})`)
    .order("publish_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  const soonest = now.getTime() + 2 * 60_000;
  const afterQueue = last?.publish_at ? new Date(last.publish_at).getTime() + GAPS[0] * 60_000 : 0;
  const slots = planSlots(ids.length, new Date(Math.max(soonest, afterQueue)));
  for (let i = 0; i < ids.length; i++) {
    await admin.from("vacancies").update({ publish_at: slots[i].toISOString() }).eq("id", ids[i]);
  }
  return slots;
}

/** Round-robin across channels, so one busy channel does not fill an hour of the feed. */
export function interleave<T extends { source: string }>(items: T[]): T[] {
  const bySource = new Map<string, T[]>();
  for (const it of items) {
    const list = bySource.get(it.source);
    if (list) list.push(it);
    else bySource.set(it.source, [it]);
  }
  const lists = [...bySource.values()];
  const out: T[] = [];
  for (let i = 0; out.length < items.length; i++) {
    for (const l of lists) if (i < l.length) out.push(l[i]);
  }
  return out;
}

export type ReleaseReport = {
  ok: boolean;
  quiet?: boolean;
  missing?: boolean;
  released: number;
  failed: number;
  details: Array<Record<string, unknown>>;
};

/**
 * Turn on every queued vacancy whose time has come. Releasing makes it the
 * newest posting (created_at = now), and a vacancy that is new — not a
 * re-advertised one — also goes to the channel and fires its job alerts, which
 * is what importVacancy used to do at once.
 */
export async function releaseDue(admin: Db, now = new Date(), limit = 20): Promise<ReleaseReport> {
  if (isQuiet(now)) return { ok: true, quiet: true, released: 0, failed: 0, details: [] };

  const { data, error } = await admin
    .from("vacancies")
    .select("id, is_active, publish_alerts")
    .not("publish_at", "is", null)
    .lte("publish_at", now.toISOString())
    .order("publish_at")
    .limit(limit);
  // Before the migration the column does not exist: nothing is ever queued.
  if (error) return { ok: true, missing: true, released: 0, failed: 0, details: [{ error: error.message }] };

  const details: Array<Record<string, unknown>> = [];
  let released = 0;
  let failed = 0;
  for (const row of data ?? []) {
    // A new vacancy that is already visible was published by hand while it
    // waited (the admin toggle, or a hand import of the same posting). It has
    // had its moment; just take it out of the queue.
    if (row.is_active && row.publish_alerts) {
      await admin.from("vacancies").update({ publish_at: null, publish_alerts: false }).eq("id", row.id);
      details.push({ id: row.id, skipped: "already_live" });
      continue;
    }
    const stamp = new Date().toISOString();
    const { error: upErr } = await admin
      .from("vacancies")
      .update({ is_active: true, created_at: stamp, updated_at: stamp, publish_at: null, publish_alerts: false })
      .eq("id", row.id)
      .not("publish_at", "is", null); // a second run in parallel releases nothing twice
    if (upErr) {
      // The company lost its name or contact since queuing (the publish check
      // in 20260812000000_require_company_details.sql). Leave the row hidden
      // and stop retrying; it stays in /admin/vacancies as inactive.
      failed++;
      await admin.from("vacancies").update({ publish_at: null }).eq("id", row.id);
      details.push({ id: row.id, error: upErr.message });
      continue;
    }
    released++;
    const entry: Record<string, unknown> = { id: row.id };
    if (row.publish_alerts) {
      try {
        entry.alerts = await dispatchJobAlerts(admin, row.id);
      } catch (e) {
        entry.alertsError = e instanceof Error ? e.message : String(e);
      }
      // Best-effort, as at import: the hourly sweeper retries what fails here.
      try {
        entry.channel = await postVacancyToChannel(admin, row.id);
      } catch (e) {
        entry.channelError = e instanceof Error ? e.message : String(e);
      }
    }
    details.push(entry);
  }
  return { ok: true, released, failed, details };
}
