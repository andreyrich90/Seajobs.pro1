import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { esc, adminChatIds, tgSendAdmins, tgSendAdminsDocument, SITE } from "@/lib/telegramBot";
import { sendEmail } from "@/lib/email";
import { REPLY_TO } from "@/lib/outreach";
import { servicePaidEmail } from "@/lib/servicePaidEmail";
import { contactLines, parseContact } from "@/lib/serviceContact";
import { chooseWordMatch, classify, extraIds, readEvent, readState, refineKind, verifySignature, type WordMatchRow } from "@/lib/bmcWebhook";
import { CV_WORD, CV_WORD_EXTRA_ID } from "@/lib/cvWord";

export const runtime = "nodejs";

// Buy Me a Coffee's webhook: the only thing on the site that may say a
// CV-distribution order was paid for.
//
// Nothing is mailed to a few thousand crewing addresses on a maybe, so the bar
// for writing `paid_at` is a request this route can prove came from BMC. The
// proof is an HMAC-SHA256 of the *raw* body under the webhook's signing secret,
// arriving in `x-signature-sha256`. Without it anyone who learns the URL could
// mark their own order paid, and the URL is not a secret — it sits in BMC's
// dashboard and in every delivery log.
//
// The signature check and the payload reading both live in lib/bmcWebhook.ts,
// where they can be exercised without a database. What is left here is the part
// that needs one: match, record, announce.

/**
 * How long after opening the checkout a payment may still be matched to a
 * purchase by time rather than by e-mail. Twenty minutes is slack enough for
 * someone who left the tab to find their card, and short enough that two
 * unrelated buyers rarely overlap — and when they do, nothing is guessed.
 */
const WORD_MATCH_WINDOW_MIN = 20;

const PROVIDER = "buymeacoffee";

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(req: NextRequest) {
  const secret = process.env.BMC_WEBHOOK_SECRET?.trim();
  // 503, not 200: a webhook that silently accepts everything while unconfigured
  // would let the first real payment vanish with no trace and no retry.
  if (!secret) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const db = admin();
  if (!db) return NextResponse.json({ error: "Server not configured" }, { status: 503 });

  const raw = await req.text();
  if (!verifySignature(raw, req.headers.get("x-signature-sha256"), secret)) {
    return NextResponse.json({ error: "Bad signature" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Bad JSON" }, { status: 400 });
  }

  const { eventType, email, amount, currency, eventKey } = readEvent(body, raw);

  // Money, money going back, or neither. The webhook is subscribed to three
  // kinds of event and only one of them pays for anything — then the body is
  // allowed to correct that, because `refunded` and `status` describe the
  // payment while the type only describes why they wrote to us. A re-sent
  // purchase event for an order refunded since carries its original type.
  const state = readState(body);
  const kind = refineKind(classify(eventType), body);

  // Two different things are sold through the same checkout, so decide which
  // one this payment is for before touching either.
  //
  // The Word export costs a few dollars; a distribution package costs tens. A
  // buyer can plausibly have both pending at once, and clearing the wrong one
  // is the expensive mistake: it would mark a $35 order paid on the strength of
  // a $5 payment and start a mailing nobody bought. So the Word purchase is
  // tried first and only when the amount fits it — a payment too large to be a
  // Word export falls through to the package matching below, unchanged.
  const word = await matchWordPurchase(db, email, kind, amount, body);
  if (word) {
    const { error: evErr } = await db.from("payment_events").insert({
      provider: PROVIDER, event_key: eventKey, event_type: eventType,
      email, amount, currency, cv_purchase_id: word.id, matched: true, payload: body,
    });
    if (evErr) {
      if (evErr.code === "23505") return NextResponse.json({ ok: true, duplicate: true });
      console.error("[bmc] event insert (word)", evErr.message);
      return NextResponse.json({ error: "Could not record" }, { status: 500 });
    }

    const patch = kind === "paid"
      ? { status: "paid", paid_at: new Date().toISOString(), paid_amount: amount, paid_currency: currency, paid_ref: eventKey }
      : { status: "refunded", paid_at: null };
    const { error } = await db.from("cv_word_purchases").update(patch).eq("id", word.id);
    if (error) console.error("[bmc] word update", error.message);

    await tgSendAdmins(
      kind === "paid"
        ? `📄 <b>ОПЛАЧЕНО — CV у Word</b>\n\n✉️ ${esc(word.email)}\nСума: ${amount ?? "—"} ${esc(currency ?? "")}\n\nВивантаження відкрито автоматично, робити нічого не треба.`
        : `↩️ <b>ПОВЕРНЕННЯ — CV у Word</b>\n\n✉️ ${esc(word.email)}\n\nДоступ до вивантаження закрито.`,
    );
    return NextResponse.json({ ok: true, kind, matched: true, product: "cv_word" });
  }

  // The row this event belongs to, matched on e-mail. A payment looks for the
  // newest *unpaid* request; a refund looks for the newest *paid* one, since
  // that is the order whose money is being returned.
  //
  // Matching on e-mail is imperfect — people pay from a second mailbox — and an
  // unmatched event is a normal outcome, not an error. It is still recorded,
  // and still announced, so nobody has to notice it by hand.
  let matched: Matched | null = null;
  if (email) {
    const q = db
      .from("service_requests")
      .select("id, package_label, name, email, phone, lang, user_id, cv_path, cv_name")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1);
    const { data } = await (kind === "refund" ? q.not("paid_at", "is", null) : q.is("paid_at", null));
    matched = data?.[0] ?? null;
  }

  // Store the event first. If the update below fails, the money is still on
  // record. The unique (provider, event_key) index makes a BMC retry a no-op.
  const { error: evErr } = await db.from("payment_events").insert({
    provider: PROVIDER,
    event_key: eventKey,
    event_type: eventType,
    email,
    amount,
    currency,
    request_id: matched?.id ?? null,
    matched: !!matched,
    payload: body,
  });
  if (evErr) {
    // 23505 is "already have it": BMC retried a delivery we handled. Answer 200
    // so they stop retrying, and do nothing else — the order is already paid.
    if (evErr.code === "23505") return NextResponse.json({ ok: true, duplicate: true });
    console.error("[bmc] event insert", evErr.message);
    return NextResponse.json({ error: "Could not record" }, { status: 500 });
  }

  // Only a purchase writes paid_at, and only paid_at authorises a mailing.
  // A refund takes it away again: an order whose money went back is not paid,
  // whatever it was a minute ago. "other" — an edit to the product, an event
  // kind we have not seen — changes nothing and is only announced.
  if (matched && kind === "paid") {
    const { error } = await db
      .from("service_requests")
      .update({
        status: "paid",
        paid_at: new Date().toISOString(),
        paid_amount: amount,
        paid_currency: currency,
        paid_ref: eventKey,
      })
      .eq("id", matched.id);
    if (error) console.error("[bmc] request update", error.message);
  } else if (matched && kind === "refund") {
    const { error } = await db
      .from("service_requests")
      .update({ status: "dropped", paid_at: null })
      .eq("id", matched.id);
    if (error) console.error("[bmc] refund update", error.message);
  }

  // The buyer's receipt: payment arrived, and when the mailing starts — on a
  // Saturday or Sunday that is Monday. Sent once: a retried delivery returned
  // above, at the duplicate event.
  let receipt: boolean | null = null;
  if (matched && kind === "paid") {
    const mail = servicePaidEmail(matched.lang ?? "en", matched.package_label);
    const res = await sendEmail({ to: matched.email, subject: mail.subject, html: mail.html, kind: "service_paid", replyTo: REPLY_TO });
    receipt = res.ok;
  }

  await announce({ matched, email, amount, currency, eventType, kind, status: state.status, receipt, db });
  return NextResponse.json({ ok: true, kind, matched: !!matched });
}

type Db = NonNullable<ReturnType<typeof admin>>;

type Matched = {
  id: string;
  package_label: string;
  name: string | null;
  email: string;
  phone: string | null;
  lang: string | null;
  user_id: string | null;
  cv_path: string | null;
  cv_name: string | null;
};

/** Tell the operator, loudly. This is the message the work starts from. */
async function announce(p: {
  matched: Matched | null;
  email: string | null;
  amount: number | null;
  currency: string | null;
  eventType: string;
  kind: "paid" | "refund" | "other";
  /** What the body said about the payment, when it said anything. */
  status?: string | null;
  /** Whether the buyer's receipt went out; null when none was due. */
  receipt?: boolean | null;
  db: Db;
}) {
  if (adminChatIds().length === 0) return;

  const sum = p.amount !== null ? `${p.amount} ${esc(p.currency ?? "")}`.trim() : "—";
  const who = [
    p.matched?.name ? `👤 ${esc(p.matched.name)}` : null,
    `✉️ ${esc(p.matched?.email ?? p.email ?? "пошта не вказана")}`,
  ].filter(Boolean) as string[];

  // Three messages, because three different things are being asked of the
  // reader: start the work, stop it, or look at something unexpected.
  let lines: (string | null)[];
  if (p.kind === "refund") {
    lines = [
      "↩️ <b>ПОВЕРНЕННЯ КОШТІВ</b>",
      "",
      p.matched ? `<b>${esc(p.matched.package_label)}</b> — ${sum}` : `Сума: ${sum}`,
      ...who,
      "",
      p.matched
        ? "Заявку знято з оплати (<b>dropped</b>). <b>Не запускайте розсилку.</b> Якщо вона вже пішла — вирішуйте окремо."
        : "Повернення не зіставилося з жодною оплаченою заявкою. Перевірте вручну.",
    ];
  } else if (p.kind === "paid" && p.matched) {
    // Everything needed to get in touch at once: the "phone or Telegram" box
    // as tappable links, and the account they connected to the bot, if any.
    const linked = p.matched.user_id ? await linkedChat(p.db, p.matched.user_id) : null;
    lines = [
      "💰 <b>ОПЛАЧЕНО</b>",
      "",
      `<b>${esc(p.matched.package_label)}</b> — ${sum}`,
      ...who,
      ...contactLines(parseContact(p.matched.phone), esc, linked),
      "",
      "Заявка позначена як <b>paid</b> — можна запускати розсилку.",
      p.receipt === true ? "✅ Клієнту надіслано лист: оплату отримано, коли почнеться розсилка."
        : p.receipt === false ? "⚠️ Лист клієнту не пішов — напишіть йому самі." : null,
    ];
  } else if (p.kind === "paid") {
    lines = [
      "💰 <b>Оплата без заявки</b>",
      "",
      `Сума: ${sum}`,
      ...who,
      `Подія: ${esc(p.eventType)}`,
      "",
      "Платіж не зіставився з жодною неоплаченою заявкою — можливо, платили з іншої пошти. Знайдіть заявку в адмінці й позначте вручну.",
    ];
  } else {
    // Not recognised as money either way. Announced rather than swallowed: if
    // this turns out to be how Buy Me a Coffee spells a purchase, the message
    // is what tells us to teach the code that spelling.
    lines = [
      "ℹ️ <b>Подія від Buy Me a Coffee</b>",
      "",
      `Тип: <code>${esc(p.eventType)}</code>`,
      p.status ? `Статус платежу: <code>${esc(p.status)}</code>` : null,
      `Сума: ${sum}`,
      ...who,
      "",
      // The status line matters here: a payment that is pending or failed is
      // deliberately left alone, and without naming it this message reads as a
      // mystery rather than as a decision.
      "Нічого не змінено. Якщо це була оплата — позначте заявку вручну й перешліть це повідомлення розробнику.",
    ];
  }

  try {
    await tgSendAdmins(lines.filter(Boolean).join("\n"), {
      buttonText: "Відкрити в адмінці",
      buttonUrl: `${SITE}/admin/service-requests`,
    });
    // The CV again, under the payment, so the work starts from this one
    // message instead of a search back through the chat for the request.
    if (p.kind === "paid" && p.matched?.cv_path) {
      const file = await cvFile(p.db, p.matched.cv_path, p.matched.cv_name);
      if (file) await tgSendAdminsDocument(file, `CV — ${esc(p.matched.name ?? p.matched.email)} · оплачено`);
    }
  } catch (e) {
    console.error("[bmc] telegram", e instanceof Error ? e.message : e);
  }
}

/** The chat id the seafarer connected to the bot from the cabinet, if any. */
async function linkedChat(db: Db, userId: string): Promise<number | null> {
  const { data } = await db.from("seafarer_telegram").select("chat_id").eq("seafarer_id", userId).maybeSingle();
  return (data?.chat_id as number | undefined) ?? null;
}

/** The request's CV from the private bucket — only the service role reaches it. */
async function cvFile(db: Db, path: string, name: string | null) {
  const { data, error } = await db.storage.from("service-cv").download(path);
  if (error || !data) {
    console.error("[bmc] cv download", error?.message);
    return null;
  }
  return { name: name || path.split("/").pop() || "cv", type: data.type || "application/octet-stream", bytes: await data.arrayBuffer() };
}

/**
 * The pending Word-export purchase this payment belongs to, if it is one.
 *
 * Returns null — meaning "not a Word payment, carry on" — whenever the amount
 * is larger than a Word export could be. The tolerance is deliberately small:
 * it exists because a provider may report a figure that includes a tip or a
 * rounding, not to catch anything in the price range of a mailing package.
 *
 * A missing table (the migration has not been run) is not an error here: the
 * product simply is not live yet, and distribution payments must keep working.
 */
async function matchWordPurchase(
  db: NonNullable<ReturnType<typeof admin>>,
  email: string | null,
  kind: "paid" | "refund" | "other",
  amount: number | null,
  body: unknown,
): Promise<WordMatchRow | null> {
  if (kind === "other") return null;

  // What did they buy? Buy Me a Coffee names it: an extra purchase carries the
  // same id that sits in the checkout link. When the body says so, the price
  // stops being evidence — which is what keeps a mailing package and a Word
  // export apart no matter how either is priced.
  const ids = extraIds(body);
  const isWordProduct = ids.length === 0 || CV_WORD_EXTRA_ID === null
    ? null
    : ids.includes(CV_WORD_EXTRA_ID);
  if (isWordProduct === false) return null;

  // By e-mail first, when the provider gave us one.
  let byEmail: WordMatchRow | null = null;
  if (email) {
    const q = db
      .from("cv_word_purchases")
      .select("id, email")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1);
    const { data, error } = await (kind === "refund" ? q.not("paid_at", "is", null) : q.is("paid_at", null));
    if (error) {
      console.error("[bmc] word lookup", error.message);
      return null;
    }
    byEmail = (data?.[0] as WordMatchRow | undefined) ?? null;
  }

  // Everything opened recently and still unpaid. Two rows is already enough to
  // know the window is ambiguous, so the query stops there.
  const since = new Date(Date.now() - WORD_MATCH_WINDOW_MIN * 60_000).toISOString();
  const { data: openRows, error: openErr } = await db
    .from("cv_word_purchases")
    .select("id, email")
    .is("paid_at", null)
    .gte("created_at", since)
    .limit(2);
  if (openErr) console.error("[bmc] word recency lookup", openErr.message);

  const hit = chooseWordMatch({
    kind,
    amount,
    price: CV_WORD.usd,
    isWordProduct,
    byEmail,
    pending: (openRows ?? []) as WordMatchRow[],
  });
  if (!hit) return null;
  if (hit.by === "recency") {
    console.warn(`[bmc] word purchase ${hit.row.id} matched by recency, not e-mail (paid as ${email ?? "no address"})`);
  }
  return hit.row;
}
