import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

// A seafarer deletes their own account, from /seafarer/profile.
//
// The caller is re-derived from the bearer token, and the body must carry the
// word the page asked them to type (`confirm: "DELETE"`), so a stray request
// with a valid token is not enough. Seafarers only: a company account owns
// vacancies and applications other people depend on, and an admin deleting
// themselves by accident is not something this page should allow.
//
// What goes, in order:
//   1. the photo in the public `avatars` bucket (`<id>/…`);
//   2. CV-distribution requests: unpaid ones with their CV file; for a paid one
//      the CV file goes and the order row stays, without the CV, as a record of
//      the payment (its user_id is set null by the foreign key);
//   3. forum topics and posts stay — deleting them would break other people's
//      threads — but lose the name and the link to the account;
//   4. the `profiles` row, which cascades to everything else the account owns:
//      seafarers, certificates, sea service, applications, conversations and
//      messages, notifications, job alerts, saved vacancies, referrals, the
//      Telegram binding, CV share links, subscriptions, free contact opens;
//   5. the auth user itself, so the e-mail can register again from scratch.
// Payment webhook bodies (`payment_events`) are kept: they are the record that
// money moved, and their links to the deleted rows are set null.

const CONFIRM_WORD = "DELETE";

export async function POST(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 503 });
  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const token = req.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const { data: { user } } = await admin.auth.getUser(token);
  if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const body = (await req.json().catch(() => null)) as { confirm?: string } | null;
  if (body?.confirm !== CONFIRM_WORD) {
    return NextResponse.json({ ok: false, error: "CONFIRM_REQUIRED" }, { status: 400 });
  }

  const [{ data: profile }, { data: sf }] = await Promise.all([
    admin.from("profiles").select("is_admin").eq("id", user.id).maybeSingle(),
    admin.from("seafarers").select("id").eq("id", user.id).maybeSingle(),
  ]);
  if (profile?.is_admin) return NextResponse.json({ ok: false, error: "ADMIN" }, { status: 403 });
  if (!sf) return NextResponse.json({ ok: false, error: "NOT_SEAFARER" }, { status: 403 });

  const id = user.id;

  // 1. Photo.
  const { data: photos } = await admin.storage.from("avatars").list(id);
  if (photos?.length) {
    const { error } = await admin.storage.from("avatars").remove(photos.map((f) => `${id}/${f.name}`));
    if (error) console.error("[account-delete] avatars", error.message);
  }

  // 2. CV-distribution requests.
  const { data: requests } = await admin.from("service_requests").select("id, cv_path, paid_at").eq("user_id", id);
  const files = (requests ?? []).map((r) => r.cv_path).filter((p): p is string => !!p);
  if (files.length) {
    const { error } = await admin.storage.from("service-cv").remove(files);
    if (error) console.error("[account-delete] service-cv", error.message);
  }
  const unpaid = (requests ?? []).filter((r) => !r.paid_at).map((r) => r.id);
  if (unpaid.length) await admin.from("service_requests").delete().in("id", unpaid);
  const paid = (requests ?? []).filter((r) => r.paid_at).map((r) => r.id);
  if (paid.length) await admin.from("service_requests").update({ cv_path: null }).in("id", paid);

  // 3. Forum: keep the words, drop the name.
  for (const table of ["forum_topics", "forum_posts"] as const) {
    const { error } = await admin.from(table).update({ user_id: null, author_name: "Deleted user" }).eq("user_id", id);
    if (error) console.error(`[account-delete] ${table}`, error.message);
  }

  // 4. Everything the account owns, by cascade.
  const { error: delErr } = await admin.from("profiles").delete().eq("id", id);
  if (delErr) {
    console.error("[account-delete] profiles", delErr.message);
    return NextResponse.json({ ok: false, error: "Could not delete the profile" }, { status: 500 });
  }

  // 5. The login itself.
  const { error: authErr } = await admin.auth.admin.deleteUser(id);
  if (authErr) {
    // The data is already gone; a leftover login with no profile is harmless
    // and the callback would recreate an empty seafarer row on next sign-in.
    console.error("[account-delete] auth user", authErr.message);
  }

  return NextResponse.json({ ok: true });
}
