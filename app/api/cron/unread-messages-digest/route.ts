import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const maxDuration = 60;

async function sendEmail(to: string, subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: "SeaJobs.pro <noreply@seajobs.pro>", to, subject, html }),
  }).catch(() => {});
}

// Daily Vercel cron. Companion to the instant-email throttle in /api/notify:
// a message burst emails only its first message, so this digest sends ONE
// follow-up per conversation for messages that arrived after the last email
// and are still unread ("you have unread messages"). Nothing unread → no email.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ ok: false, error: "Missing Supabase env vars" }, { status: 500 });
  }
  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  // Only conversations active in the last 7 days are worth a reminder.
  const since = new Date(Date.now() - 7 * 864e5).toISOString();
  const { data: convos } = await admin
    .from("conversations")
    .select("id, company_id, seafarer_id")
    .gte("last_message_at", since)
    .limit(500);
  if (!convos?.length) return NextResponse.json({ ok: true, sent: 0 });

  const convoIds = convos.map((c) => c.id);
  const [{ data: unread }, { data: logs }] = await Promise.all([
    admin
      .from("chat_messages")
      .select("conversation_id, sender_id, created_at")
      .in("conversation_id", convoIds)
      .is("read_at", null)
      .gte("created_at", since),
    admin
      .from("chat_email_log")
      .select("conversation_id, recipient_id, sent_at")
      .in("conversation_id", convoIds),
  ]);
  if (!unread?.length) return NextResponse.json({ ok: true, sent: 0 });

  const logAt = new Map<string, string>();
  for (const l of logs ?? []) logAt.set(`${l.conversation_id}:${l.recipient_id}`, l.sent_at);

  let sent = 0;
  for (const convo of convos) {
    for (const recipientId of [convo.company_id, convo.seafarer_id]) {
      // Unread messages addressed to this participant (sent by the other side).
      const incoming = unread.filter(
        (m) => m.conversation_id === convo.id && m.sender_id !== recipientId
      );
      if (!incoming.length) continue;

      // Skip if the last email already covers every unread message.
      const lastEmail = logAt.get(`${convo.id}:${recipientId}`);
      const newestUnread = incoming.reduce((a, m) => (m.created_at > a ? m.created_at : a), incoming[0].created_at);
      if (lastEmail && newestUnread <= lastEmail) continue;

      const { data: { user } } = await admin.auth.admin.getUserById(recipientId);
      if (!user?.email) continue;

      // Sender label mirrors /api/notify: admins show as "SeaJobs Team".
      const senderId = recipientId === convo.company_id ? convo.seafarer_id : convo.company_id;
      let senderName = "Someone";
      const { data: senderProfile } = await admin.from("profiles").select("is_admin").eq("id", senderId).single();
      if (senderProfile?.is_admin) {
        senderName = "SeaJobs Team";
      } else if (senderId === convo.company_id) {
        const { data: c } = await admin.from("companies").select("name").eq("id", senderId).single();
        senderName = c?.name || "A company";
      } else {
        const { data: sf } = await admin.from("seafarers").select("first_name, last_name").eq("id", senderId).single();
        senderName = [sf?.first_name, sf?.last_name].filter(Boolean).join(" ") || "A seafarer";
      }

      const link = recipientId === convo.seafarer_id ? "/seafarer/messages" : "/company/messages";
      const count = incoming.length;
      await sendEmail(
        user.email,
        `You have ${count === 1 ? "an unread message" : `${count} unread messages`} from ${senderName}`,
        `<p>Hello,</p><p>You have <strong>${count === 1 ? "an unread message" : `${count} unread messages`}</strong> from <strong>${senderName}</strong> on SeaJobs.pro.</p><p><a href="https://seajobs.pro${link}">Open chat →</a></p>`,
      );
      await admin.from("chat_email_log").upsert({
        conversation_id: convo.id,
        recipient_id: recipientId,
        sent_at: new Date().toISOString(),
      });
      sent++;
    }
  }

  return NextResponse.json({ ok: true, sent });
}
