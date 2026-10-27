import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { routing } from "@/i18n/routing";
import { slugId } from "@/lib/slug";

export const runtime = "nodejs";

// Drops a vacancy's cached page in every language, right after it was edited
// or deleted. The page itself refreshes only once a day (jobs/[id]/page.tsx),
// so without this an edit would wait up to a day and a deleted vacancy would
// keep answering for as long.
//
// The URL carries the title as a slug, so the page is cached per title: the
// caller sends the title it had before the change, and the route adds the one
// in the database now. Only a company or an admin may ask. Ownership is not
// checked — after a delete there is no row left to check it against — and
// purging a page costs at most one re-render, so there is nothing to protect.

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 503 });
  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const token = req.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const { data: { user } } = await admin.auth.getUser(token);
  if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const body = (await req.json().catch(() => null)) as { id?: string; titles?: unknown } | null;
  const id = body?.id ?? "";
  if (!UUID_RE.test(id)) return NextResponse.json({ ok: false, error: "Bad input" }, { status: 400 });

  const [{ data: profile }, { data: company }, { data: v }] = await Promise.all([
    admin.from("profiles").select("is_admin").eq("id", user.id).maybeSingle(),
    admin.from("companies").select("id").eq("id", user.id).maybeSingle(),
    admin.from("vacancies").select("title").eq("id", id).maybeSingle(),
  ]);
  if (!profile?.is_admin && !company) return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });

  const titles = new Set<string>();
  if (v?.title) titles.add(v.title);
  if (Array.isArray(body?.titles)) {
    for (const t of body.titles.slice(0, 3)) if (typeof t === "string" && t.trim()) titles.add(t.slice(0, 300));
  }

  // English is served without a prefix but cached under /en, like every page
  // the middleware rewrites; both are named so either form is dropped.
  const paths = new Set<string>();
  for (const t of titles) {
    const slug = slugId(t, id);
    for (const locale of routing.locales) paths.add(`/${locale}/jobs/${slug}`);
    paths.add(`/jobs/${slug}`);
  }
  for (const p of paths) revalidatePath(p);
  return NextResponse.json({ ok: true, purged: paths.size });
}
