// Brevo (brevo.com) — the marketing side of e-mail.
//
// Resend stays the sender of everything that must arrive: CVs on their way to
// a company, payment receipts, notifications. Brevo carries what a seafarer
// asked for and can do without — the weekly vacancy digest and the owner's own
// campaigns — so a campaign's complaints can never drag a receipt into spam.
//
// Env (Vercel, server only):
//   BREVO_API_KEY        — the API key (SMTP & API → API keys).
//   BREVO_LIST_ID        — the contact list opted-in seafarers are kept in.
//   BREVO_SENDER_EMAIL   — a sender verified in Brevo; news@seajobs.pro by default.
//   BREVO_DIGEST_DAILY_CAP — digests a day, 100 by default. The free plan sends
//                          300 a day across campaigns and the API together.
//
// Every call is best-effort: nothing here may fail a consent being saved.

const API = "https://api.brevo.com/v3";

export function brevoConfigured(): boolean {
  return !!process.env.BREVO_API_KEY;
}

export function brevoListId(): number | null {
  const n = Number(process.env.BREVO_LIST_ID);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export function brevoSender() {
  return { name: "SeaJobs.pro", email: process.env.BREVO_SENDER_EMAIL || "news@seajobs.pro" };
}

export function digestDailyCap(): number {
  const n = Number(process.env.BREVO_DIGEST_DAILY_CAP);
  return Number.isInteger(n) && n > 0 ? Math.min(n, 290) : 100;
}

type BrevoResult = { ok: boolean; status: number; body: unknown };

async function call(path: string, init: { method?: string; body?: unknown } = {}): Promise<BrevoResult> {
  const key = process.env.BREVO_API_KEY;
  if (!key) return { ok: false, status: 0, body: "BREVO_API_KEY is not set" };
  try {
    const res = await fetch(`${API}${path}`, {
      method: init.method ?? "GET",
      headers: { "api-key": key, accept: "application/json", "content-type": "application/json" },
      body: init.body === undefined ? undefined : JSON.stringify(init.body),
      signal: AbortSignal.timeout(10_000),
    });
    const text = await res.text();
    let body: unknown = text;
    try { body = text ? JSON.parse(text) : null; } catch { /* keep text */ }
    return { ok: res.ok, status: res.status, body };
  } catch (e) {
    return { ok: false, status: 0, body: String(e) };
  }
}

export type BrevoContact = {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  rank?: string | null;
  lang?: string | null;
};

/**
 * Adds the contact to the list, or updates it. RANK and LANG are custom
 * attributes the setup route creates; until it has run, Brevo refuses them,
 * so a refusal is retried with the built-in name fields only.
 */
export async function brevoUpsertContact(c: BrevoContact): Promise<BrevoResult> {
  const list = brevoListId();
  const base = { email: c.email, updateEnabled: true, ...(list ? { listIds: [list] } : {}) };
  const names: Record<string, string> = {};
  if (c.firstName) names.FIRSTNAME = c.firstName;
  if (c.lastName) names.LASTNAME = c.lastName;
  const extra: Record<string, string> = {};
  if (c.rank) extra.RANK = c.rank;
  if (c.lang) extra.LANG = c.lang;

  const first = await call("/contacts", { method: "POST", body: { ...base, attributes: { ...names, ...extra } } });
  if (first.ok || first.status !== 400 || !Object.keys(extra).length) return first;
  return call("/contacts", { method: "POST", body: { ...base, attributes: names } });
}

/** Takes the address off the list. The contact itself stays in Brevo, unlisted. */
export async function brevoUnlist(email: string): Promise<BrevoResult> {
  const list = brevoListId();
  if (!list) return { ok: true, status: 204, body: null };
  const r = await call(`/contacts/lists/${list}/contacts/remove`, { method: "POST", body: { emails: [email] } });
  // "Contact already removed from list" / not in it is not a failure.
  if (!r.ok && r.status === 400) return { ok: true, status: 204, body: r.body };
  return r;
}

export async function brevoSend(opts: {
  to: { email: string; name?: string };
  subject: string;
  html: string;
  headers?: Record<string, string>;
  tags?: string[];
}): Promise<BrevoResult> {
  return call("/smtp/email", {
    method: "POST",
    body: {
      sender: brevoSender(),
      to: [opts.to.name ? opts.to : { email: opts.to.email }],
      replyTo: { email: "partners@seajobs.pro" },
      subject: opts.subject,
      htmlContent: opts.html,
      headers: opts.headers,
      tags: opts.tags,
    },
  });
}

/** What the setup route reports: is the key good, the list there, the sender verified. */
export async function brevoCheck() {
  const [account, senders] = await Promise.all([call("/account"), call("/senders")]);
  const list = brevoListId();
  const listRes = list ? await call(`/contacts/lists/${list}`) : null;
  const sender = brevoSender().email.toLowerCase();
  const senderList = ((senders.body as { senders?: { email?: string; active?: boolean }[] })?.senders ?? []);
  const senderRow = senderList.find((s) => (s.email ?? "").toLowerCase() === sender);
  const plan = (account.body as { plan?: { type?: string; credits?: number; creditsType?: string }[] })?.plan ?? [];
  return {
    key: account.ok ? "ok" : `failed (${account.status})`,
    plan: plan.map((p) => `${p.type ?? "?"}: ${p.credits ?? "?"} ${p.creditsType ?? ""}`.trim()),
    list: !list ? "BREVO_LIST_ID is not set"
      : listRes?.ok ? `ok — ${(listRes.body as { name?: string; totalSubscribers?: number })?.name ?? list}, ${(listRes.body as { totalSubscribers?: number })?.totalSubscribers ?? "?"} subscribers`
      : `not found (${listRes?.status})`,
    sender: senderRow ? (senderRow.active ? `ok — ${sender}` : `${sender} is not verified yet`) : `${sender} is not a sender in Brevo yet`,
  };
}

/** Creates the RANK and LANG attributes; "already exists" counts as done. */
export async function brevoEnsureAttributes(): Promise<string[]> {
  const out: string[] = [];
  for (const name of ["RANK", "LANG"]) {
    const r = await call(`/contacts/attributes/normal/${name}`, { method: "POST", body: { type: "text" } });
    out.push(`${name}: ${r.ok ? "created" : r.status === 400 ? "exists" : `failed (${r.status})`}`);
  }
  return out;
}
