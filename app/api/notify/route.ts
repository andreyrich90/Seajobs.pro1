import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const isUuid = (v: unknown): v is string => typeof v === "string" && UUID_RE.test(v);

async function sendEmail(to: string, subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: "SeaJobs.pro <noreply@seajobs.pro>", to, subject, html }),
  }).catch(() => {});
}

export async function POST(req: Request) {
  try {
    const admin = getAdmin();

    // ── Authenticate caller via their Supabase access token ──────────────────
    const authHeader = req.headers.get("authorization") ?? "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { data: { user: caller }, error: authErr } = await admin.auth.getUser(token);
    if (authErr || !caller) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { type } = body;

    // ── A seafarer applied → notify the company ──────────────────────────────
    if (type === "application_received") {
      const { vacancyId, seafarerId } = body as { vacancyId: string; seafarerId: string };
      if (!isUuid(vacancyId) || !isUuid(seafarerId)) {
        return NextResponse.json({ ok: false, error: "Bad input" }, { status: 400 });
      }
      // The caller must be the seafarer who applied.
      if (caller.id !== seafarerId) {
        return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
      }
      // And an application must actually exist.
      const { data: appExists } = await admin
        .from("applications").select("id").eq("vacancy_id", vacancyId).eq("seafarer_id", seafarerId).maybeSingle();
      if (!appExists) return NextResponse.json({ ok: false }, { status: 404 });

      const { data: vacancy } = await admin
        .from("vacancies").select("title, company_id").eq("id", vacancyId).single();
      if (!vacancy) return NextResponse.json({ ok: false }, { status: 404 });

      const { data: seafarer } = await admin
        .from("seafarers").select("first_name, last_name").eq("id", seafarerId).single();
      const name = [seafarer?.first_name, seafarer?.last_name].filter(Boolean).join(" ") || "A seafarer";

      await admin.from("notifications").insert({
        user_id: vacancy.company_id,
        type: "application_received",
        title: "New Application",
        body: `${name} applied for "${vacancy.title}"`,
        link: "/company/applications",
      });

      const { data: { user } } = await admin.auth.admin.getUserById(vacancy.company_id);
      if (user?.email) {
        await sendEmail(
          user.email,
          `New application for "${vacancy.title}"`,
          `<p>Hello,</p><p><strong>${name}</strong> has applied for your vacancy "<strong>${vacancy.title}</strong>".</p><p><a href="https://seajobs.pro/company/applications">View applications →</a></p>`,
        );
      }
      return NextResponse.json({ ok: true });
    }

    // ── Company changed an application's status → notify the seafarer ─────────
    if (type === "status_changed") {
      const { applicationId, status } = body as { applicationId: string; status: string };
      if (!isUuid(applicationId) || !["viewed", "accepted", "rejected"].includes(status)) {
        return NextResponse.json({ ok: false, error: "Bad input" }, { status: 400 });
      }
      const { data: application } = await admin
        .from("applications")
        .select("seafarer_id, vacancies(title, company_id)")
        .eq("id", applicationId)
        .single();
      if (!application) return NextResponse.json({ ok: false }, { status: 404 });

      const vac = application.vacancies as unknown as { title: string; company_id: string } | null;
      // The caller must own the vacancy this application is for.
      if (!vac || caller.id !== vac.company_id) {
        return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
      }
      const vacancyTitle = vac.title ?? "a vacancy";

      await admin.from("notifications").insert({
        user_id: application.seafarer_id,
        type: "status_changed",
        title: `Application ${status}`,
        body: `Your application for "${vacancyTitle}" has been ${status}.`,
        link: "/seafarer/applications",
      });

      const { data: { user } } = await admin.auth.admin.getUserById(application.seafarer_id);
      if (user?.email) {
        await sendEmail(
          user.email,
          `Application update: "${vacancyTitle}"`,
          `<p>Hello,</p><p>Your application for "<strong>${vacancyTitle}</strong>" has been <strong>${status}</strong>.</p><p><a href="https://seajobs.pro/seafarer/applications">View applications →</a></p>`,
        );
      }
      return NextResponse.json({ ok: true });
    }

    // ── New vacancy posted → notify seafarers subscribed to that rank ────────
    if (type === "new_vacancy") {
      const { vacancyId } = body as { vacancyId: string };
      if (!isUuid(vacancyId)) return NextResponse.json({ ok: false, error: "Bad input" }, { status: 400 });

      const { data: vacancy } = await admin
        .from("vacancies").select("title, rank, company_id, companies(name)").eq("id", vacancyId).single();
      if (!vacancy) return NextResponse.json({ ok: false }, { status: 404 });
      // The caller must own this vacancy.
      if (caller.id !== vacancy.company_id) {
        return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
      }
      if (!vacancy.rank) return NextResponse.json({ ok: true });

      const { data: alerts } = await admin
        .from("job_alerts").select("seafarer_id").eq("rank", vacancy.rank);

      const companyName = (vacancy.companies as unknown as { name: string | null } | null)?.name ?? "A company";

      const rows = (alerts ?? []).map((a) => ({
        user_id: a.seafarer_id,
        type: "new_vacancy",
        title: "New Job Match",
        body: `${companyName} posted a new ${vacancy.rank} position: "${vacancy.title}"`,
        link: `/jobs/${vacancyId}`,
      }));
      if (rows.length > 0) await admin.from("notifications").insert(rows); // batch insert

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false, error: "Unknown type" }, { status: 400 });
  } catch (err) {
    console.error("[notify]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
