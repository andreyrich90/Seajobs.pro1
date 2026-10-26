import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { buildCvDocx } from "@/lib/cvDocx";
import { hasCvAccess } from "@/lib/subscriptionAccess";
import { isFleetId } from "@/lib/cvFleets";

export const runtime = "nodejs";
export const maxDuration = 30;

// The Word export, and the gate in front of it.
//
//   GET  → the .docx, for a seafarer with a subscription — or one who bought
//          the Word export before the subscription replaced it (that purchase
//          was sold as "yours for good", lib/subscriptionAccess.ts)
//   POST → retired: Word is no longer sold on its own. Answers 410 so an old
//          tab that still shows the buy button gets a clear refusal.
//
// The check lives here and nowhere else. Hiding the button in the cabinet is
// presentation; this route is the boundary, and it re-derives who is asking
// from their bearer token rather than trusting anything in the request.

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function caller(req: Request) {
  const db = admin();
  if (!db) return { db: null, user: null };
  const token = req.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!token) return { db, user: null };
  const { data: { user } } = await db.auth.getUser(token);
  return { db, user };
}

export async function GET(req: Request) {
  const { db, user } = await caller(req);
  if (!db) return NextResponse.json({ error: "Server not configured" }, { status: 503 });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!(await hasCvAccess(db, user.id))) {
    return NextResponse.json({ error: "SUBSCRIPTION_REQUIRED" }, { status: 402 });
  }

  // `?fleet=offshore` and the rest pick the fleet template; anything else —
  // or nothing — is the general CV. The subscription covers every template.
  const fleet = new URL(req.url).searchParams.get("fleet");
  const { buffer, filename } = await buildCvDocx(db, user.id, user.email ?? null, isFleetId(fleet) ? fleet : null);
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      // RFC 5987 as well as the plain form: a seafarer's name is rarely ASCII,
      // and without filename* the browser saves "download".
      "Content-Disposition": `attachment; filename="cv.docx"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      "Cache-Control": "no-store",
    },
  });
}

export async function POST() {
  return NextResponse.json({ error: "Word is part of the subscription now", subscription: "/seafarer/subscription" }, { status: 410 });
}
