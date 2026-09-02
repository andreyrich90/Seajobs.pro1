import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { BLAST_PACKAGES, CV_BLAST_COPY, packageName } from "@/lib/cvBlast";
import type { Lang } from "@/lib/langs";
import { esc, tgSend, SITE } from "@/lib/telegramBot";

export const runtime = "nodejs";

// A request for the CV-distribution service.
//
// The insert runs here rather than from the browser for two reasons. The price
// and the package name are read from BLAST_PACKAGES on the server, so a forged
// POST cannot write a package that does not exist or a price nobody was shown —
// and those numbers are the entire point of collecting the rows. And the admin
// gets a Telegram message the moment a request lands, which a client-side
// insert could not trigger without exposing the bot token.
//
// Telegram is best-effort: a failed notification must never lose the request.

const LANGS: Lang[] = ["ua", "pl", "ru", "en", "ro"];

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

type Db = NonNullable<ReturnType<typeof admin>>;

/** Who is asking, when they are signed in. Never taken from the body. */
async function callerId(req: NextRequest, db: Db): Promise<string | null> {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  const { data } = await db.auth.getUser(auth.slice(7));
  return data?.user?.id ?? null;
}

export async function POST(req: NextRequest) {
  const db = admin();
  if (!db) return NextResponse.json({ error: "Server not configured" }, { status: 503 });

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Bad request" }, { status: 400 });

  const email = String(body.email ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const lang: Lang = LANGS.includes(body.lang as Lang) ? (body.lang as Lang) : "en";
  const copy = CV_BLAST_COPY[lang];

  // The catalogue is the authority. An unknown code is recorded as "unspecified"
  // with no price rather than rejected: someone who filled the form without
  // picking a package is still a person who wants the service.
  const pkg = BLAST_PACKAGES.find((p) => p.code === body.package_code) ?? null;

  const text = (v: unknown, max: number) => {
    const s = String(v ?? "").trim();
    return s ? s.slice(0, max) : null;
  };

  // Cheap flood guard. The rows are a demand measurement, so a bot filling them
  // does not just cost storage — it destroys the only number this page exists
  // to produce.
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await db
    .from("service_requests")
    .select("id", { count: "exact", head: true })
    .eq("email", email)
    .gte("created_at", since);
  if ((count ?? 0) >= 5) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const row = {
    user_id: await callerId(req, db),
    package_code: pkg?.code ?? "unspecified",
    package_label: pkg ? packageName(pkg, copy) : "—",
    price_eur: pkg?.eur ?? null,
    price_usd: pkg?.usd ?? null,
    name: text(body.name, 120),
    email,
    phone: text(body.phone, 80),
    rank: text(body.rank, 80),
    fleet: text(body.fleet, 40),
    note: text(body.note, 2000),
    lang,
  };

  const { error } = await db.from("service_requests").insert(row);
  if (error) {
    console.error("[service-request]", error.message);
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }

  await notifyAdmin(row);
  return NextResponse.json({ ok: true });
}

/** Ping the admin's private chat. Silent when the chat id is not configured. */
async function notifyAdmin(row: {
  package_label: string;
  price_eur: number | null;
  name: string | null;
  email: string;
  phone: string | null;
  rank: string | null;
  fleet: string | null;
  note: string | null;
  lang: string;
}) {
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID?.trim();
  if (!chatId) return;

  const lines = [
    "<b>Нова заявка на розсилку CV</b>",
    "",
    `<b>${esc(row.package_label)}</b>${row.price_eur !== null ? ` — €${row.price_eur}` : ""}`,
    row.name ? `👤 ${esc(row.name)}` : null,
    `✉️ ${esc(row.email)}`,
    row.phone ? `📞 ${esc(row.phone)}` : null,
    row.rank ? `⚓ ${esc(row.rank)}` : null,
    row.fleet ? `🚢 ${esc(row.fleet)}` : null,
    `🌐 ${esc(row.lang.toUpperCase())}`,
    row.note ? `\n${esc(row.note)}` : null,
  ].filter(Boolean) as string[];

  try {
    await tgSend(chatId, lines.join("\n"), {
      buttonText: "Відкрити в адмінці",
      buttonUrl: `${SITE}/admin/service-requests`,
    });
  } catch (e) {
    console.error("[service-request] telegram", e instanceof Error ? e.message : e);
  }
}
