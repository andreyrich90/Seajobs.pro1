import type { SupabaseClient } from "@supabase/supabase-js";
import { createHash } from "crypto";
import { fetchTelegramPosts } from "@/lib/telegram";
import { parseVacancies } from "@/lib/parseVacancy";
import { companyFromEmail } from "@/lib/companyName";
import { importVacancy } from "@/lib/importVacancy";

// Poll every active Telegram source and turn fresh posts into vacancies.
// Shared by the scheduled cron (api/cron/collect-telegram, every 6h) and the admin "run now"
// button (api/admin/collect-now). Per source: auto_publish channels turn a
// qualifying post (position + crewing name) straight into a live vacancy;
// otherwise it becomes a pending draft for manual review. Posts with no crewing
// name at all are dropped either way.

// Cap posts parsed per run so one busy channel can't blow the time/token budget.
const MAX_POSTS_PER_SOURCE = 8;
// Skip obvious non-vacancy chatter before spending an LLM call.
const VACANCY_HINT =
  /(vacan|position|rank|master|officer|engineer|cook|bosun|able seaman|ordinary seaman|fitter|electric|cadet|crew|joining|salary|usd|eur|vessel|tanker|bulk|container|offshore|contract|dwt|imo|c\/o|2\/o|3\/o|c\/e|2\/e|3\/e)/i;

// Vacancies quoted in Russian rubles are not published on the site. The parser
// normalises currency to an ISO code, but be lenient about symbols/spellings.
function isRubCurrency(currency?: string | null): boolean {
  if (!currency) return false;
  const s = currency.trim().toLowerCase();
  return s === "rub" || s === "rur" || s === "₽" || s.includes("руб") || s.includes("rouble") || s.includes("ruble");
}

export type CollectReport = {
  ok: boolean;
  sources: number;
  drafts: number;
  published: number;
  report: Array<Record<string, unknown>>;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function collectTelegram(admin: SupabaseClient<any, any, any>): Promise<CollectReport> {
  const { data: sources, error: srcErr } = await admin
    .from("import_sources")
    .select("*")
    .eq("is_active", true)
    .eq("kind", "telegram");
  if (srcErr) throw new Error(srcErr.message);

  const report: Array<Record<string, unknown>> = [];
  let totalDrafts = 0;
  let totalPublished = 0;

  for (const source of sources ?? []) {
    const entry: Record<string, unknown> = { handle: source.handle };
    try {
      const posts = await fetchTelegramPosts(source.handle);

      const hwm = typeof source.last_post_id === "number" ? source.last_post_id : 0;
      const fresh = posts
        .filter((p) => (p.id ?? 0) > hwm)
        .sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
        .slice(-MAX_POSTS_PER_SOURCE);

      let maxId = hwm;
      let drafted = 0;
      let published = 0;
      let scanned = 0;
      let skipped = 0; // vacancies dropped for having no crewing name
      let skippedRub = 0; // vacancies dropped for a ruble salary

      for (const post of fresh) {
        if (post.id && post.id > maxId) maxId = post.id;
        if (!VACANCY_HINT.test(post.text)) continue;
        scanned++;

        const parsed = await parseVacancies({ text: post.text });
        for (let i = 0; i < parsed.length; i++) {
          const v = parsed[i];
          if (!v.title && !v.rank) continue;
          // Never publish ruble-denominated vacancies.
          if (isRubCurrency(v.currency)) { skippedRub++; continue; }

          const contactEmail = v.contactEmail || source.default_contact_email || null;
          // Company name: stated in the post, else derived from the crewing
          // email domain (cv@ariesnav.com → "Ariesnav"). We only keep vacancies
          // that end up with a real crewing name — posts with no name and only
          // a free mailbox (gmail, mail.ru, …) or no email at all are skipped
          // entirely so the site stays clean of anonymous listings.
          const companyName = v.companyName?.trim() || companyFromEmail(contactEmail);
          if (!companyName) { skipped++; continue; }

          const dedupKey = createHash("sha256")
            .update(`tg:${source.handle}:${post.id ?? post.text}:${i}`)
            .digest("hex");
          const payload = { ...v, contactEmail, companyName };

          // Auto-publish channels: qualifying posts (position + crewing name)
          // become live vacancies straight away. Dedup + the unique-description
          // rewrite already run inside importVacancy / the parser. A record is
          // still written to vacancy_drafts (status "approved") for the audit
          // trail and the dedup key. Sources with auto_publish off go to the
          // manual review queue as pending drafts.
          if (source.auto_publish) {
            try {
              const res = await importVacancy(admin, { ...payload, sourceUrl: post.url });
              published++;
              await admin.from("vacancy_drafts").insert({
                source_id: source.id, source_kind: "telegram", source_handle: source.handle,
                source_url: post.url, raw_text: post.text, parsed: payload,
                dedup_key: dedupKey, status: "approved",
                vacancy_id: res.vacancyId, reviewed_at: new Date().toISOString(),
              });
            } catch {
              // Publishing failed — fall back to a pending draft so it's not lost.
              const { error: fbErr } = await admin.from("vacancy_drafts").insert({
                source_id: source.id, source_kind: "telegram", source_handle: source.handle,
                source_url: post.url, raw_text: post.text, parsed: payload,
                dedup_key: dedupKey, status: "pending",
              });
              if (!fbErr) drafted++;
            }
            continue;
          }

          const { error: insErr } = await admin.from("vacancy_drafts").insert({
            source_id: source.id,
            source_kind: "telegram",
            source_handle: source.handle,
            source_url: post.url,
            raw_text: post.text,
            parsed: payload,
            dedup_key: dedupKey,
            status: "pending",
          });
          if (!insErr) drafted++;
        }
      }

      await admin
        .from("import_sources")
        .update({ last_checked_at: new Date().toISOString(), last_post_id: maxId, last_error: null })
        .eq("id", source.id);

      totalDrafts += drafted;
      totalPublished += published;
      entry.scanned = scanned;
      entry.drafted = drafted;
      entry.published = published;
      entry.skippedNoName = skipped;
      entry.skippedRub = skippedRub;
      entry.newHwm = maxId;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      entry.error = msg;
      await admin
        .from("import_sources")
        .update({ last_checked_at: new Date().toISOString(), last_error: msg.slice(0, 300) })
        .eq("id", source.id);
    }
    report.push(entry);
  }

  return { ok: true, sources: report.length, drafts: totalDrafts, published: totalPublished, report };
}
