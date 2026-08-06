import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs";

// Where messages are forwarded by email. Partnership requests (they carry a
// company name, e.g. from the /for-companies form) go to partners@; general
// contact messages go to crewing@. Everything is also saved to the admin inbox.
const PARTNERS_INBOX = "partners@seajobs.pro";
const CONTACT_INBOX = "crewing@seajobs.pro";

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}


const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const esc = (s: string) =>
  s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] as string));
const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = str(body.name, 200);
  const company = str(body.company, 200);
  const email = str(body.email, 200);
  const subject = str(body.subject, 300);
  const content = str(body.content, 5000);

  // A message body is required; if an email is given it must look valid.
  if (!content || (email && !EMAIL_RE.test(email))) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  // Persist to the messages table (shows up in the admin inbox).
  try {
    const admin = getAdmin();
    await admin.from("messages").insert({
      user_id: null,
      name: name || null,
      email: email || null,
      subject: subject || null,
      content,
    });
  } catch (e) {
    console.error("[contact] insert failed:", e);
  }

  // Forward to the contact inbox so the team is notified by email too.
  const finalSubject =
    subject || (company ? `Partnership request: ${company}` : "New contact message — SeaJobs.pro");
  const html = `<p><strong>New message via SeaJobs.pro</strong></p>
<ul>
  ${name ? `<li>Name: ${esc(name)}</li>` : ""}
  ${company ? `<li>Company: ${esc(company)}</li>` : ""}
  ${email ? `<li>Email: ${esc(email)}</li>` : ""}
</ul>
<p style="white-space:pre-wrap">${esc(content)}</p>`;
  await sendEmail({
    to: company ? PARTNERS_INBOX : CONTACT_INBOX,
    subject: finalSubject,
    html,
    kind: "contact",
    replyTo: email || undefined,
  });

  return NextResponse.json({ ok: true });
}
