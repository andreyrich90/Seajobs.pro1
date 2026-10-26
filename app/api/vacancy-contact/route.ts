import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { PROFILE_SELECT, profileGaps } from "@/lib/profileGate";
import { contactsInText } from "@/lib/vacancyContacts";
import { hasToolAccess } from "@/lib/subscriptionAccess";
import { freeState, isUnlocked, unlockVacancy, type FreeState } from "@/lib/freeUnlocks";
import { SUB_SELLING } from "@/lib/subscription";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// A vacancy's crewing e-mail and phone, for a seafarer with a subscription or
// one who has opened this vacancy with a free unlock (lib/subscription.ts,
// lib/freeUnlocks.ts). Before anything is on sale, for a seafarer whose
// profile says who they are (lib/profileGate.ts).
//
//   GET  — the contacts, if this reader may have them; otherwise why not, and
//          for a seafarer on the free tier how many opens the week has left.
//   POST — spend one of the week's free opens on this vacancy, then answer as
//          GET does. Opening is a button, never a page view.
//
// The vacancy page is cached and identical for every visitor, so the contacts
// cannot be in it: they are asked for here, per reader, after the page loads.
// This route is the gate; the lock box on the page only explains it.

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const NO_STORE = { "Cache-Control": "no-store" };

export async function GET(req: Request) {
  return answer(req, new URL(req.url).searchParams.get("id") ?? "", false);
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { id?: string } | null;
  return answer(req, body?.id ?? "", true);
}

async function answer(req: Request, id: string, unlock: boolean) {
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401, headers: NO_STORE });

  if (!UUID_RE.test(id)) return NextResponse.json({ ok: false, error: "Bad input" }, { status: 400, headers: NO_STORE });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ ok: false, error: "Missing Supabase env vars" }, { status: 500, headers: NO_STORE });
  }
  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const { data: { user: caller }, error: authErr } = await admin.auth.getUser(token);
  if (authErr || !caller) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401, headers: NO_STORE });

  const [{ data: profile }, { data: sf }] = await Promise.all([
    admin.from("profiles").select("is_admin, is_blocked").eq("id", caller.id).maybeSingle(),
    admin.from("seafarers").select(PROFILE_SELECT).eq("id", caller.id).maybeSingle(),
  ]);
  if (profile?.is_blocked) return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403, headers: NO_STORE });

  // Set when the reader is on the free tier, so the page can say what is left.
  let free: FreeState | null = null;

  if (!profile?.is_admin) {
    // Companies are not handed a competitor's crewing desk.
    if (!sf) return NextResponse.json({ ok: false, error: "NOT_SEAFARER" }, { status: 403, headers: NO_STORE });
    // No subscription: the free tier. A vacancy already opened answers as if
    // subscribed; otherwise a GET says how many opens are left, and a POST
    // spends one (FREE_LIMIT when the week's are gone).
    if (!(await hasToolAccess(admin, caller.id))) {
      if (await isUnlocked(admin, caller.id, id)) {
        free = await freeState(admin, caller.id);
      } else if (!unlock) {
        return NextResponse.json(
          { ok: false, error: "SUBSCRIPTION_REQUIRED", free: await freeState(admin, caller.id) },
          { status: 403, headers: NO_STORE },
        );
      } else {
        const { data: exists } = await admin.from("vacancies").select("id").eq("id", id).maybeSingle();
        if (!exists) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404, headers: NO_STORE });
        const r = await unlockVacancy(admin, caller.id, id);
        if (!r.ok) {
          return NextResponse.json({ ok: false, error: "FREE_LIMIT", free: r.state }, { status: 403, headers: NO_STORE });
        }
        free = r.state;
      }
    }
    // Once the subscription is on sale it is the whole key: someone who has
    // paid is not sent to fill in fields before seeing what they paid for.
    // Until then the profile is the gate, as it always was.
    if (!SUB_SELLING) {
      const missing = profileGaps(sf as unknown as Record<string, string | null>);
      if (missing.length) {
        return NextResponse.json({ ok: false, error: "PROFILE_INCOMPLETE", missing }, { status: 403, headers: NO_STORE });
      }
    }
  }

  const { data: v, error } = await admin
    .from("vacancies").select("contact_email, contact_phone, description").eq("id", id).maybeSingle();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500, headers: NO_STORE });
  if (!v) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404, headers: NO_STORE });

  // `email` is the one applications go to; the rest are whatever the page
  // blanked out of the posting's text. `description` is that text as written,
  // contacts in place, so the reader who passes the gate reads the posting
  // whole rather than the cached page's 🔒 placeholders.
  const email = v.contact_email?.trim() || null;
  const phone = v.contact_phone?.trim() || null;
  const inText = contactsInText(v.description);
  const digits = (p: string) => p.replace(/\D/g, "");
  return NextResponse.json(
    {
      ok: true,
      email,
      phone,
      moreEmails: inText.emails.filter((e) => e.toLowerCase() !== email?.toLowerCase()),
      morePhones: inText.phones.filter((p) => !phone || digits(p) !== digits(phone)),
      description: v.description ?? null,
      free,
    },
    { headers: NO_STORE },
  );
}
