import { NextResponse } from "next/server";
import { emailQuotaExhausted } from "@/lib/email";

export const runtime = "nodejs";
// Changes through the day; a cached "fine" would hide the limit for hours.
export const dynamic = "force-dynamic";

// Asked by the apply window when it opens: has today's portal mail run out?
// If so the window leads with "write from your own email" instead of letting
// the seafarer press a button we already know will fail.
//
// Unauthenticated on purpose. The answer is one boolean about our own mail
// budget, the same for every visitor, and the window opens before anyone has
// a reason to send a token.
export async function GET() {
  const exhausted = await emailQuotaExhausted();
  return NextResponse.json({ exhausted }, { headers: { "Cache-Control": "no-store" } });
}
