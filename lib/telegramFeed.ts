import type { SupabaseClient } from "@supabase/supabase-js";
import { channelId, channelLang, channelMessage, telegramConfigured, tgSend, TG_COPY, vacancyUrl, type TgVacancy } from "@/lib/telegramBot";

// The public vacancy channel: every posting that goes live on the site is
// mirrored to Telegram.
//
// Two paths write to it and they are deliberately redundant. A vacancy is
// posted the moment it is published (fast), and an hourly cron sweeps anything
// still unposted (reliable). `vacancies.telegram_message_id` is the interlock:
// set on success, so the sweeper skips it and nothing is ever posted twice.

/* eslint-disable @typescript-eslint/no-explicit-any */
type Admin = SupabaseClient<any, any, any>;

const SELECT =
  "id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, telegram_message_id, is_active, companies(name)";

export type ChannelPostResult = { posted: boolean; reason?: string };

/**
 * Mirrors one vacancy to the channel. Never throws: a Telegram outage must not
 * fail the import or the company's publish, it just leaves the row for the
 * sweeper to pick up.
 */
export async function postVacancyToChannel(admin: Admin, vacancyId: string): Promise<ChannelPostResult> {
  try {
    if (!telegramConfigured()) return { posted: false, reason: "TELEGRAM_BOT_TOKEN not set" };
    const chat = channelId();
    if (!chat) return { posted: false, reason: "TELEGRAM_CHANNEL_ID not set" };

    const { data: v } = await admin.from("vacancies").select(SELECT).eq("id", vacancyId).single();
    if (!v) return { posted: false, reason: "vacancy not found" };
    if (v.telegram_message_id) return { posted: false, reason: "already posted" };
    if (!v.is_active) return { posted: false, reason: "vacancy is not active" };

    const lang = channelLang();
    const vacancy = v as unknown as TgVacancy;
    const sent = await tgSend(chat, channelMessage(vacancy, lang), {
      buttonText: TG_COPY[lang].view,
      buttonUrl: vacancyUrl(vacancy, lang),
    });
    if (!sent.ok) return { posted: false, reason: sent.error };

    await admin
      .from("vacancies")
      .update({ telegram_message_id: sent.result.message_id })
      .eq("id", vacancyId);
    return { posted: true };
  } catch (e) {
    const reason = e instanceof Error ? e.message : "unknown error";
    console.error("[telegram-channel] post failed:", reason);
    return { posted: false, reason };
  }
}

/**
 * Sweeps vacancies that are live on the site but not yet in the channel.
 *
 * `days` bounds how far back it looks, and defaults to two: without it,
 * switching the channel on would dump the entire historical board into a fresh
 * channel in one go. Pass a large value deliberately to seed the backlog.
 */
export async function sweepChannel(
  admin: Admin,
  opts: { limit?: number; days?: number } = {},
): Promise<{ posted: number; failed: number; pending: number }> {
  const limit = opts.limit ?? 15;
  const days = opts.days ?? 2;
  const since = new Date(Date.now() - days * 864e5).toISOString();

  const { data } = await admin
    .from("vacancies")
    .select("id")
    .is("telegram_message_id", null)
    .eq("is_active", true)
    .gte("created_at", since)
    // Oldest first: the channel then reads in the order things were posted,
    // and the newest vacancy ends up at the top of the channel view.
    .order("created_at", { ascending: true })
    .limit(limit + 1);

  const rows = data ?? [];
  const batch = rows.slice(0, limit);
  let posted = 0;
  let failed = 0;

  for (const [i, row] of batch.entries()) {
    // Telegram throttles posts to a single channel at roughly 20 a minute;
    // 3.5s between sends stays under that without needing retry handling.
    if (i > 0) await new Promise((r) => setTimeout(r, 3500));
    const res = await postVacancyToChannel(admin, row.id as string);
    if (res.posted) posted++;
    else failed++;
  }

  return { posted, failed, pending: Math.max(0, rows.length - batch.length) };
}
