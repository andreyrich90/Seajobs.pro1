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

// Renders the seafarer's CV as email-safe HTML, mirroring the /seafarer/cv
// sheet (header with contacts, personal information, identity documents &
// visas, certificates, sea service history). Sent to the crewing agency /
// company with every application, so they get contacts + the full CV at once.
async function buildCvEmailHtml(
  admin: ReturnType<typeof getAdmin>,
  seafarerId: string,
  email: string | null,
  coverLetter?: string | null,
): Promise<{ html: string; name: string }> {
  const [{ data: sf }, { data: experience }, { data: certificates }] = await Promise.all([
    admin.from("seafarers")
      .select("first_name, last_name, nationality, date_of_birth, phone, rank, readiness_date, about, passport_no, passport_expiry, seamans_book, seamans_book_expiry, medical, medical_expiry, diploma, diploma_expiry, schengen_visa, us_visa")
      .eq("id", seafarerId).single(),
    admin.from("sea_experience")
      .select("vessel_name, vessel_type, rank, company, dwt, engine, from_date, to_date")
      .eq("seafarer_id", seafarerId).order("from_date", { ascending: false }).limit(10),
    admin.from("certificates")
      .select("name, issuing_authority, expiry_date")
      .eq("seafarer_id", seafarerId).order("expiry_date", { ascending: false }).limit(20),
  ]);

  const name = [sf?.first_name, sf?.last_name].filter(Boolean).join(" ") || "Seafarer";
  const fmt = (d?: string | null) =>
    d ? new Date(d).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : null;
  const availability = sf?.readiness_date
    ? new Date(sf.readiness_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "Immediate";

  const th = "background:#16324f;color:#ffffff;text-align:left;padding:8px 12px;font-size:13px;letter-spacing:0.4px;";
  const label = "background:#f4f6f8;padding:8px 12px;border:1px solid #e3e8ee;width:38%;color:#334155;font-size:13px;";
  const val = "padding:8px 12px;border:1px solid #e3e8ee;color:#111827;font-size:13px;";
  const section = (title: string) => `<tr><td colspan="2" style="${th}">${title}</td></tr>`;
  const row = (l: string, v?: string | null) =>
    v ? `<tr><td style="${label}">${l}</td><td style="${val}">${v}</td></tr>` : "";
  const withExpiry = (no?: string | null, expiry?: string | null) =>
    no ? `${no}${fmt(expiry) ? ` — exp. ${fmt(expiry)}` : ""}` : null;

  const docRows = [
    row("Foreign passport", withExpiry(sf?.passport_no, sf?.passport_expiry)),
    row("Seaman's book", withExpiry(sf?.seamans_book, sf?.seamans_book_expiry)),
    row("Medical certificate", withExpiry(sf?.medical, sf?.medical_expiry)),
    row("Diploma / CoC", withExpiry(sf?.diploma, sf?.diploma_expiry)),
    row("Schengen visa", sf?.schengen_visa),
    row("US visa", sf?.us_visa),
  ].join("");

  const certRows = (certificates ?? []).map((c) =>
    row(c.name, [c.issuing_authority, fmt(c.expiry_date) ? `exp. ${fmt(c.expiry_date)}` : null].filter(Boolean).join(" · ") || "—")
  ).join("");

  const expHeader = `<tr>${["Vessel", "Type", "DWT", "Rank", "Company", "Period"]
    .map((h) => `<td style="${label}width:auto;font-weight:bold;">${h}</td>`).join("")}</tr>`;
  const expRows = (experience ?? []).map((e) => {
    const period = e.from_date ? `${fmt(e.from_date)} – ${e.to_date ? fmt(e.to_date) : "present"}` : "—";
    return `<tr>${[e.vessel_name, e.vessel_type ?? "—", e.dwt ?? "—", e.rank ?? "—", e.company ?? "—", period]
      .map((v) => `<td style="${val}">${v}</td>`).join("")}</tr>`;
  }).join("");

  const html = `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;">
  <h2 style="color:#16324f;margin:20px 0 2px;text-transform:uppercase;">${name}</h2>
  <p style="color:#b8860b;font-weight:bold;margin:0 0 10px;text-transform:uppercase;">${sf?.rank ?? ""}</p>
  <p style="margin:0 0 10px;font-size:13px;color:#111827;">
    <strong>Email:</strong> ${email ?? "—"}<br/>
    <strong>Phone / WhatsApp:</strong> ${sf?.phone ?? "—"}<br/>
    <strong>Availability:</strong> ${availability}${sf?.nationality ? ` · ${sf.nationality}` : ""}
  </p>
  ${sf?.about ? `<p style="font-size:13px;color:#374151;">${sf.about}</p>` : ""}
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;margin-top:12px;">
    ${section("PERSONAL INFORMATION")}
    ${row("Date of birth", sf?.date_of_birth ? new Date(sf.date_of_birth).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : null)}
    ${row("Citizenship", sf?.nationality)}
    ${row("Availability", availability)}
    ${row("Rank / Position", sf?.rank)}
    ${row("Phone", sf?.phone)}
    ${row("Email", email)}
    ${docRows ? section("IDENTITY DOCUMENTS &amp; VISAS") + docRows : ""}
    ${certRows ? section("COMPETENCY &amp; STCW CERTIFICATES") + certRows : ""}
  </table>
  ${expRows ? `
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;margin-top:14px;">
    <tr><td colspan="6" style="${th}">SEA SERVICE HISTORY — last ${(experience ?? []).length} voyages</td></tr>
    ${expHeader}
    ${expRows}
  </table>` : ""}
  ${coverLetter ? `<h3 style="color:#16324f;margin:16px 0 6px;">Cover letter</h3><p style="font-size:13px;color:#374151;">${coverLetter}</p>` : ""}
  <p style="margin-top:18px;"><a href="https://seajobs.pro/seafarers/${seafarerId}" style="background:#c9a227;color:#000;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">View full profile on SeaJobs.pro →</a></p>
</div>`;

  return { html, name };
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
        .from("applications").select("id, cover_letter").eq("vacancy_id", vacancyId).eq("seafarer_id", seafarerId).maybeSingle();
      if (!appExists) return NextResponse.json({ ok: false }, { status: 404 });

      const { data: vacancy } = await admin
        .from("vacancies").select("title, company_id").eq("id", vacancyId).single();
      if (!vacancy) return NextResponse.json({ ok: false }, { status: 404 });

      const { data: { user: seafarerUser } } = await admin.auth.admin.getUserById(seafarerId);
      const cv = await buildCvEmailHtml(admin, seafarerId, seafarerUser?.email ?? caller.email ?? null, appExists.cover_letter);

      await admin.from("notifications").insert({
        user_id: vacancy.company_id,
        type: "application_received",
        title: "New Application",
        body: `${cv.name} applied for "${vacancy.title}"`,
        link: "/company/applications",
      });

      // Recipients: the company's account email + any configured contact emails.
      const { data: companyRow } = await admin
        .from("companies").select("emails").eq("id", vacancy.company_id).single();
      const { data: { user: companyUser } } = await admin.auth.admin.getUserById(vacancy.company_id);

      const recipients = [
        ...(companyUser?.email ? [companyUser.email] : []),
        ...((companyRow?.emails ?? []) as string[]),
      ].filter((e, i, arr) => e && arr.indexOf(e) === i);

      const html =
        `<p>Hello,</p>
<p>You have a new candidate for <strong>${vacancy.title}</strong> on SeaJobs.pro. The full CV is below.</p>
${cv.html}
<p style="margin-top:14px;"><a href="https://seajobs.pro/company/applications">Reply in your SeaJobs.pro cabinet →</a></p>`;

      for (const to of recipients) {
        await sendEmail(to, `New candidate for "${vacancy.title}" — ${cv.name}`, html);
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

      const { data: { user: sfUser } } = await admin.auth.admin.getUserById(seafarerId);
      const cv = await buildCvEmailHtml(admin, seafarerId, sfUser?.email ?? caller.email ?? null, appExists.cover_letter);

      await sendEmail(
        vacancy.contact_email,
        `New application for "${vacancy.title}" — ${cv.name}`,
        `<p>A seafarer applied for <strong>${vacancy.title}</strong> via SeaJobs.pro. The full CV is below.</p>${cv.html}`,
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

    // ── A chat message was sent → notify the other participant ───────────────
    if (type === "new_message") {
      const { conversationId } = body as { conversationId: string };
      if (!isUuid(conversationId)) {
        return NextResponse.json({ ok: false, error: "Bad input" }, { status: 400 });
      }
      const { data: convo } = await admin
        .from("conversations").select("company_id, seafarer_id").eq("id", conversationId).single();
      if (!convo) return NextResponse.json({ ok: false }, { status: 404 });

      // The caller must be a participant.
      if (caller.id !== convo.company_id && caller.id !== convo.seafarer_id) {
        return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
      }

      const recipientId = caller.id === convo.company_id ? convo.seafarer_id : convo.company_id;
      const recipientIsSeafarer = recipientId === convo.seafarer_id;

      // Sender's display name. An admin participant (SeaJobs staff messaging a
      // user) has no companies/seafarers row, so label them explicitly.
      let senderName = "Someone";
      const { data: callerProfile } = await admin.from("profiles").select("is_admin").eq("id", caller.id).single();
      if (callerProfile?.is_admin) {
        senderName = "SeaJobs Team";
      } else if (caller.id === convo.company_id) {
        const { data: c } = await admin.from("companies").select("name").eq("id", caller.id).single();
        senderName = c?.name || "A company";
      } else {
        const { data: sf } = await admin.from("seafarers").select("first_name, last_name").eq("id", caller.id).single();
        senderName = [sf?.first_name, sf?.last_name].filter(Boolean).join(" ") || "A seafarer";
      }

      const link = recipientIsSeafarer ? "/seafarer/messages" : "/company/messages";

      await admin.from("notifications").insert({
        user_id: recipientId,
        type: "new_message",
        title: "New message",
        body: `${senderName} sent you a message`,
        link,
      });

      const { data: { user } } = await admin.auth.admin.getUserById(recipientId);
      if (user?.email) {
        // Throttle: at most one instant email per conversation/recipient per
        // 15 minutes — a burst of messages emails only its FIRST message. The
        // daily unread-messages digest cron picks up anything that arrived
        // after this email and is still unread. In-app notifications above are
        // untouched and fire for every message.
        const { data: log } = await admin
          .from("chat_email_log")
          .select("sent_at")
          .eq("conversation_id", conversationId)
          .eq("recipient_id", recipientId)
          .maybeSingle();
        const throttled = !!log?.sent_at && Date.now() - new Date(log.sent_at).getTime() < 15 * 60_000;
        if (!throttled) {
          await sendEmail(
            user.email,
            `New message from ${senderName}`,
            `<p>Hello,</p><p><strong>${senderName}</strong> sent you a message on SeaJobs.pro.</p><p><a href="https://seajobs.pro${link}">Open chat →</a></p>`,
          );
          await admin.from("chat_email_log").upsert({
            conversation_id: conversationId,
            recipient_id: recipientId,
            sent_at: new Date().toISOString(),
          });
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
