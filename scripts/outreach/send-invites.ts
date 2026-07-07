/**
 * One-off crewing-agency outreach mailer.
 *
 * Sends each agency ONE personalised invite in its own language (from
 * recipients.json), so no recipient ever sees another's address — this is
 * better than BCC for both privacy and deliverability (own From/domain,
 * per-language copy = far less likely to land in spam).
 *
 * Usage (run from repo root):
 *   npx tsx scripts/outreach/send-invites.ts              # DRY RUN — prints what it would send
 *   TEST_TO=you@mail.com npx tsx scripts/outreach/send-invites.ts   # send all 3 languages to yourself to preview
 *   SEND=1 npx tsx scripts/outreach/send-invites.ts        # actually send to everyone in recipients.json
 *   SEND=1 ONLY=baltimex npx tsx scripts/outreach/send-invites.ts   # send to matching companies/emails only
 *   SEND=1 LIMIT=10 npx tsx scripts/outreach/send-invites.ts        # send to first 10 only (batch it)
 *
 * Needs RESEND_API_KEY in the environment (or in .env.local, which this
 * script reads automatically). The sending domain seajobs.pro must be
 * verified in Resend (it already is — used by app/api/notify).
 *
 * Resend rate limit is ~2 req/s; we pace at ~1.4/s. Already-sent addresses
 * are logged to scripts/outreach/sent.log and skipped on re-run, so the job
 * is safely resumable if it stops halfway.
 */
import { readFileSync, existsSync, appendFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));

type Lang = "en" | "pl" | "uk";
interface Recipient { company: string; email: string; lang?: Lang }

const FROM = "Andrii — SeaJobs.pro <partners@seajobs.pro>";
const REPLY_TO = "partners@seajobs.pro";
const SENT_LOG = join(HERE, "sent.log");
const DELAY_MS = 700; // ~1.4 emails/sec, under Resend's 2/sec limit

const SUBJECTS: Record<Lang, string> = {
  en: "SeaJobs.pro — post your crew vacancies for free (Google-indexed in ~1h)",
  pl: "SeaJobs.pro — publikuj oferty crewingowe za darmo (w Google w ~1h)",
  uk: "SeaJobs.pro — розміщуйте вакансії безкоштовно (у Google за ~1 год)",
};

const TEMPLATES: Record<Lang, string> = {
  en: readFileSync(join(HERE, "invite_EN.html"), "utf8"),
  pl: readFileSync(join(HERE, "invite_PL.html"), "utf8"),
  uk: readFileSync(join(HERE, "invite_UK.html"), "utf8"),
};

// Load .env.local (RESEND_API_KEY=...) without pulling in a dotenv dependency.
function loadEnvLocal() {
  const p = join(process.cwd(), ".env.local");
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}
loadEnvLocal();

// Domain heuristic used only when a recipient has no explicit lang.
function pickLang(email: string): Lang {
  const e = email.toLowerCase();
  const domain = e.split("@")[1] ?? "";
  if (domain.endsWith(".pl")) return "pl";
  if (domain.endsWith(".ua") || /ukraine|odes/.test(e)) return "uk";
  return "en";
}

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

  const all: Recipient[] = JSON.parse(readFileSync(join(HERE, "recipients.json"), "utf8"));

  // Preview mode: send one of each language to yourself, then stop.
  if (TEST_TO) {
    console.log(`TEST mode → sending EN/PL/UK previews to ${TEST_TO}\n`);
    for (const lang of ["en", "pl", "uk"] as Lang[]) {
      const r = await sendEmail(TEST_TO, `[${lang.toUpperCase()}] ${SUBJECTS[lang]}`, TEMPLATES[lang]);
      console.log(`  ${lang}: ${r.ok ? "OK " + r.info : "FAIL " + r.info}`);
      await sleep(DELAY_MS);
    }
    return;
  }

  const sent = new Set(
    existsSync(SENT_LOG) ? readFileSync(SENT_LOG, "utf8").split("\n").map((l) => l.split("\t")[0].trim().toLowerCase()).filter(Boolean) : []
  );

  let queue = all.filter((r) => !sent.has(r.email.toLowerCase()));
  if (ONLY) queue = queue.filter((r) => (r.company + " " + r.email).toLowerCase().includes(ONLY));
  queue = queue.slice(0, LIMIT);

  console.log(`Recipients total: ${all.length} | already sent: ${sent.size} | to send now: ${queue.length}`);
  console.log(SEND ? "MODE: LIVE SEND\n" : "MODE: DRY RUN (set SEND=1 to actually send)\n");

  let ok = 0, fail = 0;
  for (const r of queue) {
    const lang = r.lang ?? pickLang(r.email);
    const subject = SUBJECTS[lang];
    if (!SEND) {
      console.log(`  [dry] ${lang}  ${r.email.padEnd(38)} ${r.company}`);
      continue;
    }
    const res = await sendEmail(r.email, subject, TEMPLATES[lang]);
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
