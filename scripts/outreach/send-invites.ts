/**
 * One-off crewing-agency outreach mailer (CLI variant).
 *
 * Prefer the browser route (app/api/outreach) — no terminal needed. This CLI
 * exists for local runs. Both share lib/outreach.ts (templates, subjects,
 * recipients), so copy stays in one place.
 *
 * Sends each agency ONE personalised invite in its own language, so no
 * recipient ever sees another's address (better than BCC for privacy and
 * deliverability).
 *
 * Usage (run from repo root):
 *   npm run outreach                                  # DRY RUN — prints what it would send
 *   TEST_TO=you@mail.com npm run outreach             # send EN/PL/UK previews to yourself
 *   SEND=1 npm run outreach                           # actually send to everyone
 *   SEND=1 ONLY=baltimex npm run outreach             # only matching companies/emails
 *   SEND=1 LIMIT=10 npm run outreach                  # first 10 only (batch it)
 *
 * Needs RESEND_API_KEY in the environment (or in .env.local, read here).
 * Already-sent addresses are logged to scripts/outreach/sent.log and skipped
 * on re-run, so the job is safely resumable.
 */
import { readFileSync, existsSync, appendFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { RECIPIENTS, TEMPLATES, SUBJECTS, FROM, REPLY_TO, pickLang, type OutreachLang } from "../../lib/outreach";

const HERE = dirname(fileURLToPath(import.meta.url));
const SENT_LOG = join(HERE, "sent.log");
const DELAY_MS = 700; // ~1.4 emails/sec, under Resend's 2/sec limit

// Load .env.local (RESEND_API_KEY=...) without a dotenv dependency.
function loadEnvLocal() {
  const p = join(process.cwd(), ".env.local");
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
loadEnvLocal();

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function sendEmail(to: string, subject: string, html: string): Promise<{ ok: boolean; info: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, info: "no RESEND_API_KEY" };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to, reply_to: REPLY_TO, subject, html }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, info: `${res.status} ${JSON.stringify(body)}` };
    return { ok: true, info: (body as { id?: string }).id ?? "sent" };
  } catch (err) {
    return { ok: false, info: String(err) };
  }
}

async function main() {
  const SEND = process.env.SEND === "1";
  const TEST_TO = process.env.TEST_TO?.trim();
  const ONLY = process.env.ONLY?.trim().toLowerCase();
  const LIMIT = process.env.LIMIT ? parseInt(process.env.LIMIT, 10) : Infinity;

  if (TEST_TO) {
    console.log(`TEST mode → sending EN/PL/UK previews to ${TEST_TO}\n`);
    for (const lang of ["en", "pl", "uk"] as OutreachLang[]) {
      const r = await sendEmail(TEST_TO, `[${lang.toUpperCase()}] ${SUBJECTS[lang]}`, TEMPLATES[lang]);
      console.log(`  ${lang}: ${r.ok ? "OK " + r.info : "FAIL " + r.info}`);
      await sleep(DELAY_MS);
    }
    return;
  }

  const sent = new Set(
    existsSync(SENT_LOG) ? readFileSync(SENT_LOG, "utf8").split("\n").map((l) => l.split("\t")[0].trim().toLowerCase()).filter(Boolean) : []
  );

  let queue = RECIPIENTS.filter((r) => !sent.has(r.email.toLowerCase()));
  if (ONLY) queue = queue.filter((r) => (r.company + " " + r.email).toLowerCase().includes(ONLY));
  queue = queue.slice(0, LIMIT);

  console.log(`Recipients total: ${RECIPIENTS.length} | already sent: ${sent.size} | to send now: ${queue.length}`);
  console.log(SEND ? "MODE: LIVE SEND\n" : "MODE: DRY RUN (set SEND=1 to actually send)\n");

  let ok = 0, fail = 0;
  for (const r of queue) {
    const lang = r.lang ?? pickLang(r.email);
    if (!SEND) {
      console.log(`  [dry] ${lang}  ${r.email.padEnd(38)} ${r.company}`);
      continue;
    }
    const res = await sendEmail(r.email, SUBJECTS[lang], TEMPLATES[lang]);
    if (res.ok) {
      ok++;
      appendFileSync(SENT_LOG, `${r.email}\t${lang}\t${res.info}\t${new Date().toISOString()}\n`);
      console.log(`  ✓ ${lang}  ${r.email.padEnd(38)} ${r.company}`);
    } else {
      fail++;
      console.log(`  ✗ ${lang}  ${r.email.padEnd(38)} ${r.company}  — ${res.info}`);
    }
    await sleep(DELAY_MS);
  }

  if (SEND) console.log(`\nDone. Sent ${ok}, failed ${fail}. Log: scripts/outreach/sent.log`);
  else console.log(`\nDry run complete. ${queue.length} would be sent. Add SEND=1 to send for real.`);
}

main();
