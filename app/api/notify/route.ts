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

    // ── A seafarer applied to an imported vacancy → email the crewing agency ──
    if (type === "external_application") {
      const { vacancyId, seafarerId } = body as { vacancyId: string; seafarerId: string };
      if (!isUuid(vacancyId) || !isUuid(seafarerId)) {
        return NextResponse.json({ ok: false, error: "Bad input" }, { status: 400 });
      }
      if (caller.id !== seafarerId) {
        return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
      }
      const { data: appExists } = await admin
        .from("applications").select("id, cover_letter").eq("vacancy_id", vacancyId).eq("seafarer_id", seafarerId).maybeSingle();
      if (!appExists) return NextResponse.json({ ok: false }, { status: 404 });

      const { data: vacancy } = await admin
        .from("vacancies").select("title, contact_email").eq("id", vacancyId).single();
      if (!vacancy?.contact_email) return NextResponse.json({ ok: false }, { status: 404 });

      const [{ data: seafarer }, { data: experience }, { data: certificates }] = await Promise.all([
        admin.from("seafarers").select("first_name, last_name, nationality, phone, rank, readiness_date, about").eq("id", seafarerId).single(),
        admin.from("sea_experience").select("vessel_name, vessel_type, rank, company, from_date, to_date").eq("seafarer_id", seafarerId).order("from_date", { ascending: false }),
        admin.from("certificates").select("name, issuing_authority, expiry_date").eq("seafarer_id", seafarerId).order("expiry_date", { ascending: false }),
      ]);

      const name = [seafarer?.first_name, seafarer?.last_name].filter(Boolean).join(" ") || "Seafarer";

      // Total sea time across all experience entries, in months.
      let totalMonths = 0;
      for (const e of experience ?? []) {
        if (!e.from_date) continue;
        const start = new Date(e.from_date);
        const end = e.to_date ? new Date(e.to_date) : new Date();
        totalMonths += Math.max(0, (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()));
      }
      const seaTime = totalMonths > 0
        ? `${Math.floor(totalMonths / 12)}y ${totalMonths % 12}m`
        : "—";

      const expRows = (experience ?? []).map((e) => {
        const period = e.from_date
          ? `${new Date(e.from_date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })} – ${e.to_date ? new Date(e.to_date).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : "present"}`
          : "";
        return `<li>${[e.rank, e.vessel_name, e.vessel_type, e.company, period].filter(Boolean).join(" — ")}</li>`;
      }).join("");

      const certRows = (certificates ?? []).map((c) => {
        const expiry = c.expiry_date ? `, exp. ${new Date(c.expiry_date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}` : "";
        return `<li>${[c.name, c.issuing_authority].filter(Boolean).join(" — ")}${expiry}</li>`;
      }).join("");

      await sendEmail(
        vacancy.contact_email,
        `New application for "${vacancy.title}" — ${name}`,
        `<p>A seafarer applied for <strong>${vacancy.title}</strong> via SeaJobs.pro.</p>
<h3>Candidate</h3>
<ul>
  <li>Name: ${name}</li>
  <li>Rank: ${seafarer?.rank ?? "—"}</li>
  <li>Nationality: ${seafarer?.nationality ?? "—"}</li>
  <li>Total sea time: ${seaTime}</li>
  <li>Available from: ${seafarer?.readiness_date ? new Date(seafarer.readiness_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—"}</li>
  <li>Phone: ${seafarer?.phone ?? "—"}</li>
  <li>Email: ${caller.email ?? "—"}</li>
</ul>
${seafarer?.about ? `<h3>About</h3><p>${seafarer.about}</p>` : ""}
${appExists.cover_letter ? `<h3>Cover letter</h3><p>${appExists.cover_letter}</p>` : ""}
${expRows ? `<h3>Sea experience</h3><ul>${expRows}</ul>` : ""}
${certRows ? `<h3>Certificates</h3><ul>${certRows}</ul>` : ""}
<p><a href="https://seajobs.pro/seafarers/${seafarerId}">View full profile →</a></p>`,
      );

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
      if (rows.length > 0) await admin.from("notifications").insert(rows);

      // Send email to each subscribed seafarer
      for (const a of alerts ?? []) {
        const { data: { user } } = await admin.auth.admin.getUserById(a.seafarer_id);
        if (user?.email) {
          await sendEmail(
            user.email,
            `New ${vacancy.rank} job: "${vacancy.title}"`,
            `<p>Hello,</p>
<p><strong>${companyName}</strong> posted a new <strong>${vacancy.rank}</strong> position:</p>
<p style="font-size:18px"><strong>${vacancy.title}</strong></p>
<p><a href="https://seajobs.pro/jobs/${vacancyId}" style="background:#c9a227;color:#000;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">View Vacancy →</a></p>
<hr style="margin:24px 0;border:none;border-top:1px solid #eee"/>
<p style="color:#999;font-size:12px;">You receive this because you set up a job alert for <strong>${vacancy.rank}</strong> on SeaJobs.pro. <a href="https://seajobs.pro/seafarer/dashboard">Manage alerts →</a></p>`,
          );
        }
      }

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false, error: "Unknown type" }, { status: 400 });
  } catch (err) {
    console.error("[notify]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
