import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

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
    const body = await req.json();
    const { type } = body;
    const admin = getAdmin();

    if (type === "application_received") {
      const { vacancyId, seafarerId } = body as { vacancyId: string; seafarerId: string };

      const { data: vacancy } = await admin
        .from("vacancies")
        .select("title, company_id")
        .eq("id", vacancyId)
        .single();

      if (!vacancy) return NextResponse.json({ ok: false }, { status: 404 });

      const { data: seafarer } = await admin
        .from("seafarers")
        .select("first_name, last_name")
        .eq("id", seafarerId)
        .single();

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

    if (type === "status_changed") {
      const { applicationId, status } = body as { applicationId: string; status: string };

      const { data: application } = await admin
        .from("applications")
        .select("seafarer_id, vacancies(title)")
        .eq("id", applicationId)
        .single();

      if (!application) return NextResponse.json({ ok: false }, { status: 404 });

      const vacancyTitle = (application.vacancies as { title: string } | null)?.title ?? "a vacancy";
      const labels: Record<string, string> = { viewed: "viewed", accepted: "accepted", rejected: "rejected" };
      const label = labels[status] ?? status;

      await admin.from("notifications").insert({
        user_id: application.seafarer_id,
        type: "status_changed",
        title: `Application ${label}`,
        body: `Your application for "${vacancyTitle}" has been ${label}.`,
        link: "/seafarer/applications",
      });

      const { data: { user } } = await admin.auth.admin.getUserById(application.seafarer_id);
      if (user?.email) {
        await sendEmail(
          user.email,
          `Application update: "${vacancyTitle}"`,
          `<p>Hello,</p><p>Your application for "<strong>${vacancyTitle}</strong>" has been <strong>${label}</strong>.</p><p><a href="https://seajobs.pro/seafarer/applications">View applications →</a></p>`,
        );
      }

      return NextResponse.json({ ok: true });
    }

    if (type === "new_vacancy") {
      const { vacancyId } = body as { vacancyId: string };

      const { data: vacancy } = await admin
        .from("vacancies")
        .select("title, rank, companies(name)")
        .eq("id", vacancyId)
        .single();

      if (!vacancy || !vacancy.rank) return NextResponse.json({ ok: true });

      const { data: alerts } = await admin
        .from("job_alerts")
        .select("seafarer_id")
        .eq("rank", vacancy.rank);

      const companyName = (vacancy.companies as { name: string | null } | null)?.name ?? "A company";

      for (const alert of alerts ?? []) {
        await admin.from("notifications").insert({
          user_id: alert.seafarer_id,
          type: "new_vacancy",
          title: "New Job Match",
          body: `${companyName} posted a new ${vacancy.rank} position: "${vacancy.title}"`,
          link: `/jobs/${vacancyId}`,
        });
      }

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false, error: "Unknown type" }, { status: 400 });
  } catch (err) {
    console.error("[notify]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
