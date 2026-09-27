import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { esc, tgSend, SITE } from "@/lib/telegramBot";

export const runtime = "nodejs";

// "Went to pay" — the reader pressed the pay button on the success panel.
//
// This is intent, not money, and the two are kept apart everywhere: a checkout
// can be abandoned on the next screen. It earns its place because it arrives
// instantly and needs nothing configured on the provider's side, so it is the
// signal that works from the moment this ships, while `paid_at` waits on the
// BMC webhook being wired up.
//
// Read as: this person is at the till. If no payment follows within the hour,
// they are worth an e-mail — their CV is already in hand.
//
// Not authenticated, and it does not need to be: the only thing it can write is
// a timestamp on a row whose uuid the caller must already know, and the id is
// handed out to exactly one browser — the one that just created the request.

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: NextRequest) {
  const db = admin();
  if (!db) return NextResponse.json({ error: "Server not configured" }, { status: 503 });

  // sendBeacon posts text/plain, so the body is read as text and parsed here.
  const raw = await req.text().catch(() => "");
  let id = "";
  try {
    id = String((JSON.parse(raw) as { id?: unknown }).id ?? "");
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  if (!UUID.test(id)) return NextResponse.json({ error: "Bad id" }, { status: 400 });

  // Only the first click is recorded: a reader who comes back to the tab and
  // presses again has not done anything new, and the first time is the one that
  // says how long the checkout has been open.
  const { data, error } = await db
    .from("service_requests")
    .update({ pay_clicked_at: new Date().toISOString() })
    .eq("id", id)
    .is("pay_clicked_at", null)
    .select("package_label, name, email, price_usd")
    .maybeSingle();

  if (error) {
    console.error("[pay-click]", error.message);
    return NextResponse.json({ error: "Could not record" }, { status: 500 });
  }
  if (data) await announce(data);
  return NextResponse.json({ ok: true });
}

async function announce(row: {
  package_label: string;
  name: string | null;
  email: string;
  price_usd: number | null;
}) {
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID?.trim();
  if (!chatId) return;
  try {
    await tgSend(
      chatId,
      [
        "🧾 <b>Перейшов до оплати</b>",
        "",
        `<b>${esc(row.package_label)}</b>${row.price_usd !== null ? ` — $${row.price_usd}` : ""}`,
        row.name ? `👤 ${esc(row.name)}` : null,
        `✉️ ${esc(row.email)}`,
        "",
        "Це ще не оплата. Якщо гроші не прийдуть — напишіть йому, CV вже у нас.",
      ]
        .filter(Boolean)
        .join("\n"),
      { buttonText: "Відкрити в адмінці", buttonUrl: `${SITE}/admin/service-requests` },
    );
  } catch (e) {
    console.error("[pay-click] telegram", e instanceof Error ? e.message : e);
  }
}
