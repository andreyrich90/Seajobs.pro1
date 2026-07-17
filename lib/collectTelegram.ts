import type { SupabaseClient } from "@supabase/supabase-js";
import { createHash } from "crypto";
import { fetchTelegramPosts } from "@/lib/telegram";
import { parseVacancies } from "@/lib/parseVacancy";

// Poll every active Telegram source and turn fresh posts into vacancy_drafts
// for admin review. Shared by the hourly cron (api/cron/collect-telegram) and
// the admin "run now" button (api/admin/collect-now). Nothing goes live here —
// drafts only become real vacancies when an admin approves them.

// Cap posts parsed per run so one busy channel can't blow the time/token budget.
const MAX_POSTS_PER_SOURCE = 8;
// Skip obvious non-vacancy chatter before spending an LLM call.
const VACANCY_HINT =
  /(vacan|position|rank|master|officer|engineer|cook|bosun|able seaman|ordinary seaman|fitter|electric|cadet|crew|joining|salary|usd|eur|vessel|tanker|bulk|container|offshore|contract|dwt|imo|c\/o|2\/o|3\/o|c\/e|2\/e|3\/e)/i;

export type CollectReport = {
  ok: boolean;
  sources: number;
  drafts: number;
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
      let scanned = 0;

      for (const post of fresh) {
        if (post.id && post.id > maxId) maxId = post.id;
        if (!VACANCY_HINT.test(post.text)) continue;
        scanned++;

        const parsed = await parseVacancies({ text: post.text });
        for (let i = 0; i < parsed.length; i++) {
          const v = parsed[i];
          if (!v.title && !v.rank) continue;
          const dedupKey = createHash("sha256")
            .update(`tg:${source.handle}:${post.id ?? post.text}:${i}`)
            .digest("hex");

          const { error: insErr } = await admin.from("vacancy_drafts").insert({
            source_id: source.id,
            source_kind: "telegram",
            source_handle: source.handle,
            source_url: post.url,
            raw_text: post.text,
            parsed: {
              ...v,
              contactEmail: v.contactEmail || source.default_contact_email || null,
            },
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
      entry.scanned = scanned;
      entry.drafted = drafted;
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

  return { ok: true, sources: report.length, drafts: totalDrafts, report };
}
