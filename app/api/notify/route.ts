import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email";
import { buildCvHtml } from "@/lib/cvHtml";
import { dispatchJobAlerts } from "@/lib/jobAlerts";
import { postVacancyToChannel } from "@/lib/telegramFeed";

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const isUuid = (v: unknown): v is string => typeof v === "string" && UUID_RE.test(v);

// Job alerts are the only fan-out here: one email per subscriber per vacancy.
// Left uncapped it could exhaust the provider's daily quota in a single
// Telegram import run (several vacancies × every subscriber for that rank),
// which would then silently drop the emails that actually matter — a CV on its
// way to a crewing agency. So alerts get a bounded share of the daily budget;
// the transactional emails below stay uncapped because they are low volume and
// must not be lost. Everyone still gets the in-app notification either way.

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
      const cv = await buildCvHtml(admin, seafarerId, seafarerUser?.email ?? caller.email ?? null, appExists.cover_letter);

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
        await sendEmail({
          to,
          subject: `New candidate for "${vacancy.title}" — ${cv.name}`,
          html,
          kind: "application_received",
        });
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
      const cv = await buildCvHtml(admin, seafarerId, sfUser?.email ?? caller.email ?? null, appExists.cover_letter);

      const sent = await sendEmail({
        to: vacancy.contact_email,
        subject: `New application for "${vacancy.title}" — ${cv.name}`,
        html: `<p>A seafarer applied for <strong>${vacancy.title}</strong> via SeaJobs.pro. The full CV is below.</p>${cv.html}`,
        kind: "external_application",
      });
      // This one carries the seafarer's CV to the agency — report a failure so
      // the client can tell them instead of pretending it was delivered.
      if (!sent.ok) {
        return NextResponse.json({ ok: false, error: "email_failed" }, { status: 502 });
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
        await sendEmail({
          to: user.email,
          subject: `Application update: "${vacancyTitle}"`,
          html: `<p>Hello,</p><p>Your application for "<strong>${vacancyTitle}</strong>" has been <strong>${status}</strong>.</p><p><a href="https://seajobs.pro/seafarer/applications">View applications →</a></p>`,
          kind: "status_changed",
        });
      }
      return NextResponse.json({ ok: true });
    }

    // ── New vacancy posted → notify seafarers subscribed to that rank ────────
    if (type === "new_vacancy") {
      const { vacancyId } = body as { vacancyId: string };
      if (!isUuid(vacancyId)) return NextResponse.json({ ok: false, error: "Bad input" }, { status: 400 });

      const { data: vacancy } = await admin
        .from("vacancies").select("company_id").eq("id", vacancyId).single();
      if (!vacancy) return NextResponse.json({ ok: false }, { status: 404 });
      // The caller must own this vacancy.
      if (caller.id !== vacancy.company_id) {
        return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
      }

      const result = await dispatchJobAlerts(admin, vacancyId);
      // …and mirror it to the public channel, same as an imported posting.
      const channel = await postVacancyToChannel(admin, vacancyId);
      return NextResponse.json({ ok: true, ...result, channel });
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
          await sendEmail({
            to: user.email,
            subject: `New message from ${senderName}`,
            html: `<p>Hello,</p><p><strong>${senderName}</strong> sent you a message on SeaJobs.pro.</p><p><a href="https://seajobs.pro${link}">Open chat →</a></p>`,
            kind: "new_message",
          });
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
