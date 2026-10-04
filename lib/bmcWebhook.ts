// Reading a Buy Me a Coffee webhook.
//
// Kept out of the route so it can be exercised on its own: the route needs a
// database and a network to say anything, while everything that can actually be
// wrong here — a forged signature, a payload shaped differently than expected —
// is decided by these two functions.
//
// The deliberate choice is that the payload is *hunted through* rather than
// declared. BMC's body differs between event kinds, and the fields we need sit
// at different depths depending on the event; a strict shape would drop a real
// payment the day they rename a key or add a wrapper. Guessing wrong here costs
// an unmatched payment, which is recoverable — the raw body is stored either
// way — while a parser that throws would cost the payment itself.

import crypto from "node:crypto";

/**
 * Is this request really from BMC?
 *
 * HMAC-SHA256 of the **raw** body under the webhook's signing secret, hex, in
 * `x-signature-sha256`. The raw bytes matter: re-serialising parsed JSON
 * changes key order and spacing, and the signature with it.
 *
 * Compared in constant time, so a wrong signature tells an attacker nothing by
 * how long the answer took.
 */
export function verifySignature(raw: string, header: string | null, secret: string): boolean {
  if (!header || !secret) return false;
  const expected = crypto.createHmac("sha256", secret).update(raw, "utf8").digest("hex");
  // Tolerate a "sha256=" prefix in case their format ever gains one.
  const got = header.trim().replace(/^sha256=/i, "").toLowerCase();
  if (got.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(got), Buffer.from(expected));
}

type Json = Record<string, unknown>;

/** First value under any of these keys, at any depth. */
function pick(obj: unknown, keys: string[], depth = 0): unknown {
  if (depth > 6 || obj === null || typeof obj !== "object") return undefined;
  const o = obj as Json;
  for (const k of keys) {
    const v = o[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  for (const v of Object.values(o)) {
    const found = pick(v, keys, depth + 1);
    if (found !== undefined) return found;
  }
  return undefined;
}

const str = (v: unknown): string | null => {
  const s = typeof v === "string" ? v.trim() : typeof v === "number" ? String(v) : "";
  return s || null;
};

const num = (v: unknown): number | null => {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v.replace(",", ".")) : NaN;
  return Number.isFinite(n) ? n : null;
};

export type BmcEvent = {
  eventType: string;
  /** Lower-cased: the form stores what the seafarer typed, the till what they typed there. */
  email: string | null;
  amount: number | null;
  currency: string | null;
  /** Their id for this purchase, or a hash of the body when there is none. */
  eventKey: string;
};

/**
 * What this event means for the order.
 *
 * The webhook is subscribed to three kinds — purchased, updated, refunded —
 * and only the first is money arriving. Treating them alike would mark an
 * order paid because its title was edited, or because the money went back.
 *
 * Matched on substrings because the exact strings BMC puts in `type` are not
 * something we have seen yet: the dashboard calls them "Extra purchased",
 * "Extra updated" and "Extra refunded", and the payload may spell them
 * `extra_purchase.created`, `extra.purchased` or something else again.
 *
 * **An unrecognised type is never a payment.** Failing that way costs a
 * message you have to act on by hand; failing the other way would start a
 * mailing to thousands of addresses for an order nobody paid for.
 */
export function classify(eventType: string): "paid" | "refund" | "other" {
  const t = eventType.toLowerCase();
  // Order matters. "extra_purchase.refunded" and "extra_purchase.updated" both
  // contain "purchase", so the verbs that are *not* money have to be read
  // first — otherwise editing a product's title would mark an order paid.
  if (t.includes("refund") || t.includes("chargeback") || t.includes("cancel")) return "refund";
  if (t.includes("updated") || t.includes("edited") || t.includes("changed")) return "other";
  if (t.includes("purchas") || t.includes("sale") || t.includes("order")) return "paid";
  return "other";
}

/**
 * What the body itself says about the money, as opposed to what the event is
 * called.
 *
 * A real delivery carries `status: "succeeded"`, `refunded: false` and
 * `refunded_at: null` beside the amount. Those are worth reading, because the
 * event type is the provider's description of *why they wrote to us* and these
 * are their description of *the payment*, and only the second can say that the
 * money went back after the fact. A re-sent purchase event for an order that
 * has since been refunded carries the same type it always did.
 *
 * `refunded_at` is read as well as `refunded` on the assumption that one of
 * them may be the only one present in some event kind; a timestamp there means
 * the same thing as the flag.
 */
export function readState(body: unknown): { refunded: boolean; status: string | null } {
  // `pick` skips null and "", so `refunded: false` comes back as false and a
  // null `refunded_at` reads as absent — both of which are what we want.
  return {
    refunded: pick(body, ["refunded"]) === true || str(pick(body, ["refunded_at"])) !== null,
    status: str(pick(body, ["status", "payment_status"]))?.toLowerCase() ?? null,
  };
}

/** Statuses that mean the money actually arrived. */
const SETTLED = ["succeeded", "success", "successful", "paid", "completed", "complete", "captured", "ok"];

/**
 * The event type, corrected by what the body says about the payment.
 *
 * Two corrections, both in the safe direction:
 *
 * - **Refunded is a refund**, whatever the event is called. Otherwise a
 *   re-delivery of the original purchase event would re-open an export whose
 *   money has gone back.
 * - **A status we do not recognise as settled is not money.** A payment that is
 *   pending, failed or disputed should change nothing; it is still recorded and
 *   still announced, so a status we have not seen before surfaces as a message
 *   rather than as an unlock. This mirrors `classify`: failing this way costs
 *   somebody a minute in the admin ledger, failing the other way hands out a
 *   product or starts a mailing for money that never came.
 *
 * A body with no status at all is left alone — most event kinds will not carry
 * one, and absence is not a failure.
 */
export function refineKind(kind: "paid" | "refund" | "other", body: unknown): "paid" | "refund" | "other" {
  const { refunded, status } = readState(body);
  if (refunded) return "refund";
  if (kind === "paid" && status !== null && !SETTLED.includes(status)) return "other";
  return kind;
}

export function readEvent(body: unknown, raw: string): BmcEvent {
  return {
    eventType: str(pick(body, ["type", "event", "event_type"])) ?? "unknown",
    email: str(pick(body, ["supporter_email", "payer_email", "email"]))?.toLowerCase() ?? null,
    amount: num(pick(body, ["amount", "total_amount", "support_coffee_price", "value"])),
    currency: str(pick(body, ["currency", "currency_code"])),
    eventKey:
      str(pick(body, ["id", "purchase_id", "payment_id", "transaction_id", "object_id"])) ??
      crypto.createHash("sha256").update(raw).digest("hex").slice(0, 40),
  };
}

export type WordMatchRow = { id: string; email: string };

/**
 * Which pending Word-export purchase a payment belongs to — the decision,
 * separated from the queries that feed it so it can be exercised without a
 * database, which is what this file is for.
 *
 * The order is deliberate:
 *
 * 1. **Too large to be a Word export → nothing.** The same checkout also sells
 *    mailing packages that cost tens of dollars. Clearing the wrong one would
 *    mark a $35 order paid on the strength of a $5 payment and start a mailing
 *    nobody bought, so anything above the price falls through to the package
 *    matching untouched. The margin covers a tip or a rounding, not a package.
 * 2. **By e-mail**, when the provider sent one and it matches a row.
 * 3. **By time**, when it does not. The buyer paid from a second mailbox, or the
 *    payload carried no address; the row was written the moment the checkout
 *    opened and the payment lands seconds later. Only when there is exactly one
 *    candidate — two buyers in the same window is where a guess becomes a coin
 *    toss, and handing one person's file to the other's payment is worse than a
 *    wait. Then nothing matches, and the payment is still recorded and
 *    announced for a human to settle.
 * 4. **Never by time for a refund.** Taking access away from someone whose money
 *    may not even be involved is not a mistake worth automating.
 */
export function chooseWordMatch(opts: {
  kind: "paid" | "refund" | "other";
  amount: number | null;
  /** The catalogue price, in the same currency the checkout charges. */
  price: number;
  /** Tolerance above the price before the payment is read as something else. */
  margin?: number;
  /**
   * Did the body name this product? `true` means the payment carries our
   * extra's id and the amount no longer has to be consulted; `false` means it
   * named a different product and this is certainly not a Word payment; `null`
   * means the body said nothing, and the amount is all there is.
   */
  isWordProduct?: boolean | null;
  /** The row found by e-mail, if any. */
  byEmail: WordMatchRow | null;
  /** Unpaid rows opened inside the matching window — two is enough to know it is ambiguous. */
  pending: WordMatchRow[];
}): { row: WordMatchRow; by: "email" | "recency" } | null {
  const { kind, amount, price, margin = 2, isWordProduct = null, byEmail, pending } = opts;
  if (kind === "other") return null;
  // The provider named a different product: nothing here is ours, whatever it cost.
  if (isWordProduct === false) return null;
  // It named ours, so the price is no longer evidence — only a fallback for the
  // bodies that say nothing.
  if (isWordProduct !== true && amount !== null && amount > price + margin) return null;
  if (byEmail) return { row: byEmail, by: "email" };
  if (kind !== "paid") return null;
  if (pending.length !== 1) return null;
  return { row: pending[0], by: "recency" };
}

/**
 * The provider's product ids carried by a payment body.
 *
 * Buy Me a Coffee names what was bought: an extra purchase carries
 * `data.extras[]`, each with the `id` that also appears in the checkout link.
 * That turns "which product is this payment for" from a guess based on the
 * amount into a fact — a mailing package can then never be mistaken for a Word
 * export however either is priced.
 *
 * Walked rather than read from a fixed path, for the same reason `readEvent`
 * searches the body: the shape differs between event kinds, and a strict path
 * would return nothing the day they nest it one level deeper. An empty result
 * means "the body does not say", which is different from "a different product"
 * — the caller has to treat those apart.
 */
export function extraIds(body: unknown): number[] {
  const found: number[] = [];
  const seen = new Set<unknown>();

  const walk = (node: unknown, key?: string) => {
    if (!node || typeof node !== "object" || seen.has(node)) return;
    seen.add(node);
    if (Array.isArray(node)) {
      // An `extras` array is the one that names products; any other array is
      // walked but its ids are not collected.
      for (const item of node) {
        if (key === "extras" && item && typeof item === "object") {
          const id = (item as Record<string, unknown>).id;
          if (typeof id === "number") found.push(id);
          else if (typeof id === "string" && /^\d+$/.test(id)) found.push(Number(id));
        }
        walk(item, key);
      }
      return;
    }
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) walk(v, k);
  };

  walk(body);
  return found;
}
