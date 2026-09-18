import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { BLAST_PACKAGES, CV_BLAST_COPY, packageName } from "@/lib/cvBlast";
import type { Lang } from "@/lib/langs";
import { esc, tgSend, tgSendDocument, SITE } from "@/lib/telegramBot";

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
// An attached CV rides along as multipart. It goes into a private bucket the
// anon key cannot reach — a CV carries a passport number, visas and a date of
// birth — and to the operator's Telegram chat as a document, so no readable URL
// for it exists anywhere.
//
// Telegram is best-effort throughout: a failed notification must never lose the
// request, and a failed upload must never lose it either.

const LANGS: Lang[] = ["ua", "pl", "ru", "en", "ro"];

const CV_BUCKET = "service-cv";
const CV_MAX_BYTES = 8 * 1024 * 1024;
const CV_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};
const CV_EXTS = new Set(["pdf", "doc", "docx"]);

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

/** Keep a filename that is safe as an object key and still recognisable. */
function safeName(raw: string): string {
  const base = raw.split(/[/\\]/).pop() ?? "cv";
  return base.replace(/[^\w.\- ]+/g, "_").slice(-80) || "cv";
}

export async function POST(req: NextRequest) {
  const db = admin();
  if (!db) return NextResponse.json({ error: "Server not configured" }, { status: 503 });

  // The form always posts multipart now that the CV is required. JSON is still
  // parsed so a request without a file fails on the missing CV with a clear
  // message, rather than on a content type it never got to explain.
  let body: Record<string, unknown>;
  let cv: File | null = null;
  if ((req.headers.get("content-type") ?? "").includes("multipart/form-data")) {
    const form = await req.formData().catch(() => null);
    if (!form) return NextResponse.json({ error: "Bad request" }, { status: 400 });
    body = {};
    for (const [k, v] of form.entries()) {
      if (typeof v === "string") body[k] = v;
      else if (k === "cv") cv = v;
    }
  } else {
    const json = (await req.json().catch(() => null)) as Record<string, unknown> | null;
    if (!json) return NextResponse.json({ error: "Bad request" }, { status: 400 });
    body = json;
  }

  const email = String(body.email ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const lang: Lang = LANGS.includes(body.lang as Lang) ? (body.lang as Lang) : "en";
  const copy = CV_BLAST_COPY[lang];

  // The catalogue is the authority, and a request must name a package in it.
  // A row without one carries no base, no price and no number of sends: it can
  // be neither quoted nor counted, and the counts per package are what this
  // page exists to produce. Refused here as well as in the form, because the
  // form is not a boundary.
  const pkg = BLAST_PACKAGES.find((p) => p.code === body.package_code) ?? null;
  if (!pkg) {
    return NextResponse.json({ error: "Package required" }, { status: 400 });
  }

  const text = (v: unknown, max: number) => {
    const s = String(v ?? "").trim();
    return s ? s.slice(0, max) : null;
  };

  // Required, and enforced here rather than only in the form: the CV is the
  // work. Note the split — the *file* must be present, but its *upload* is
  // allowed to fail below, because the contacts are still worth keeping.
  if (!cv) {
    return NextResponse.json({ error: "CV required" }, { status: 400 });
  }
  {
    const ext = (cv.name.split(".").pop() ?? "").toLowerCase();
    if (!CV_TYPES[cv.type] && !CV_EXTS.has(ext)) {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
    }
    if (cv.size === 0 || cv.size > CV_MAX_BYTES) {
      return NextResponse.json({ error: "File too large" }, { status: 400 });
    }
  }

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

  // Upload before the insert, so the row either carries a working path or none.
  let cvPath: string | null = null;
  const cvBytes = await cv.arrayBuffer();
  {
    const path = `${crypto.randomUUID()}/${safeName(cv.name)}`;
    const { error: upErr } = await db.storage
      .from(CV_BUCKET)
      .upload(path, cvBytes, { contentType: cv.type || "application/octet-stream", upsert: false });
    if (upErr) {
      // Losing the request over a storage hiccup would be worse than losing the
      // file: the contacts are what we came for.
      console.error("[service-request] cv upload", upErr.message);
    } else {
      cvPath = path;
    }
  }

  const row = {
    user_id: await callerId(req, db),
    package_code: pkg.code,
    package_label: packageName(pkg, copy),
    price_eur: pkg.eur,
    price_usd: pkg.usd,
    name: text(body.name, 120),
    email,
    phone: text(body.phone, 80),
    rank: text(body.rank, 80),
    fleet: text(body.fleet, 40),
    note: text(body.note, 2000),
    lang,
    cv_path: cvPath,
    cv_name: safeName(cv.name),
    cv_size: cv.size,
  };

  const { error } = await db.from("service_requests").insert(row);
  if (error) {
    console.error("[service-request]", error.message);
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }

  await notifyAdmin(row, { name: safeName(cv.name), type: cv.type, bytes: cvBytes });
  return NextResponse.json({ ok: true });
}

/** Ping the admin's private chat. Silent when the chat id is not configured. */
async function notifyAdmin(
  row: {
    package_label: string;
    price_eur: number | null;
    name: string | null;
    email: string;
    phone: string | null;
    rank: string | null;
    fleet: string | null;
    note: string | null;
    lang: string;
    cv_name: string | null;
    cv_path: string | null;
  },
  file: { name: string; type: string; bytes: ArrayBuffer } | null,
) {
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
    // Say which of the three states this is, so a missing file is never read as
    // "the seafarer did not attach one".
    row.cv_name
      ? row.cv_path
        ? `📎 ${esc(row.cv_name)}`
        : `📎 ${esc(row.cv_name)} — не збереглося, попросіть надіслати ще раз`
      : "📎 без CV",
    row.note ? `\n${esc(row.note)}` : null,
  ].filter(Boolean) as string[];

  try {
    await tgSend(chatId, lines.join("\n"), {
      buttonText: "Відкрити в адмінці",
      buttonUrl: `${SITE}/admin/service-requests`,
    });
    if (file) {
      await tgSendDocument(chatId, file, `CV — ${esc(row.name ?? row.email)}`);
    }
  } catch (e) {
    console.error("[service-request] telegram", e instanceof Error ? e.message : e);
  }
}
