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
