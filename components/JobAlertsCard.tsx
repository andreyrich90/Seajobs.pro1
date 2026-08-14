"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bell, Check, Plus, Radio, Send, X } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useLang } from "@/components/LangProvider";
import RankFilter from "@/components/RankFilter";
import { T } from "@/lib/i18n";

// Job alerts on the seafarer dashboard: which positions they follow, and where
// the alert is delivered.
//
// The two used to be separate cards further down the page, which read as two
// unrelated settings. They are one thing — a subscription and its channel —
// and Telegram is the channel worth pushing: it is instant, it is unmetered,
// and every seafarer who links frees an email slot from a daily budget of a
// hundred that the whole product shares.

const CHANNEL = process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL || "seajobs_pro";

export default function JobAlertsCard({
  seafarerId,
  profileRank,
}: {
  seafarerId: string;
  /** The rank from their profile — offered as the first subscription. */
  profileRank?: string | null;
}) {
  const { lang } = useLang();
  const t = T[lang];

  const [ranks, setRanks] = useState<string[]>([]);
  const [linked, setLinked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const poll = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => { if (poll.current) clearInterval(poll.current); }, []);

  useEffect(() => {
    async function load() {
      const [alertsRes, tgRes] = await Promise.all([
        supabase.from("job_alerts").select("rank").eq("seafarer_id", seafarerId),
        supabase.from("seafarer_telegram").select("chat_id").eq("seafarer_id", seafarerId).maybeSingle(),
      ]);
      setRanks(((alertsRes.data ?? []) as { rank: string }[]).map((r) => r.rank));
      setLinked(!!tgRes.data?.chat_id);
      setLoading(false);
    }
    load();
  }, [seafarerId]);

  /** Writes the whole set: insert what's new, delete what's gone. */
  const saveRanks = useCallback(
    async (next: string[]) => {
      const added = next.filter((r) => !ranks.includes(r));
      const removed = ranks.filter((r) => !next.includes(r));
      setRanks(next); // optimistic — the list is the control, it must not lag
      if (added.length) {
        await supabase
          .from("job_alerts")
          .upsert(added.map((rank) => ({ seafarer_id: seafarerId, rank })), {
            onConflict: "seafarer_id,rank",
          });
      }
      if (removed.length) {
        await supabase.from("job_alerts").delete().eq("seafarer_id", seafarerId).in("rank", removed);
      }
    },
    [ranks, seafarerId],
  );

  function watchForLink() {
    setWaiting(true);
    const started = Date.now();
    if (poll.current) clearInterval(poll.current);
    poll.current = setInterval(async () => {
      // Two minutes is long enough: by then they have either pressed Start or
      // closed Telegram.
      if (Date.now() - started > 120_000) {
        if (poll.current) clearInterval(poll.current);
        setWaiting(false);
        return;
      }
      const { data } = await supabase
        .from("seafarer_telegram")
        .select("chat_id")
        .eq("seafarer_id", seafarerId)
        .maybeSingle();
      if (data?.chat_id) {
        if (poll.current) clearInterval(poll.current);
        setWaiting(false);
        setLinked(true);
      }
    }, 3000);
  }

  async function connect() {
    if (busy) return;
    setBusy(true);
    setError(null);
    // Open the tab before awaiting — a popup opened after an await has lost the
    // user-gesture context and gets blocked on Safari and on mobile.
    const tab = window.open("", "_blank");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/telegram/link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token ?? ""}`,
        },
        body: JSON.stringify({ lang }),
      });
      const json = (await res.json()) as { ok?: boolean; url?: string };
      if (!json.ok || !json.url) throw new Error("no link");
      if (tab) tab.location.href = json.url;
      else window.location.href = json.url;
      watchForLink();
    } catch {
      tab?.close();
      setError(t.dash_tg_error);
    } finally {
      setBusy(false);
    }
  }

  async function disconnect() {
    if (busy) return;
    setBusy(true);
    await supabase.from("seafarer_telegram").delete().eq("seafarer_id", seafarerId);
    setLinked(false);
    setBusy(false);
  }

  if (loading) return null;

  const suggestion = profileRank?.trim();
  const canSuggest = !!suggestion && !ranks.includes(suggestion);

  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-brass/30 bg-gradient-to-br from-brass/10 to-transparent">
      {/* ── Telegram: the headline, not a footnote ─────────────────────────── */}
      <div className="flex flex-col items-stretch gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-3">
          <div
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
              linked ? "bg-teal/20" : "bg-gradient-to-br from-brass to-brass2"
            }`}
          >
            {linked ? <Check size={20} className="text-teal" /> : <Send size={20} className="text-[#061523]" />}
          </div>
          <div>
            <p className="font-display text-lg font-semibold text-white">{t.dash_alerts_title}</p>
            <p className={`text-xs leading-relaxed ${linked ? "text-teal" : "text-mist"}`}>
              {linked ? t.dash_tg_on : waiting ? t.dash_tg_waiting : t.dash_alerts_lead}
            </p>
            {error && <p className="mt-1 text-xs text-coral">{error}</p>}
          </div>
        </div>

        <button
          onClick={linked ? disconnect : connect}
          disabled={busy}
          className={`shrink-0 cursor-pointer rounded-xl px-5 py-3 text-sm font-bold transition disabled:opacity-50 sm:w-auto ${
            linked
              ? "border border-coral/30 bg-coral/10 text-coral hover:bg-coral/20"
              : "bg-gradient-to-br from-brass to-brass2 text-[#061523] hover:-translate-y-0.5"
          }`}
        >
          {busy ? "…" : linked ? t.dash_tg_disconnect : t.dash_tg_connect}
        </button>
      </div>

      {/* ── Which positions ───────────────────────────────────────────────── */}
      <div className="p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-2">
          <Bell size={14} className="shrink-0 text-brassInk" />
          <p className="text-xs font-semibold uppercase tracking-wider text-mist">{t.dash_alerts_ranks}</p>
        </div>

        {ranks.length > 0 ? (
          <div className="mb-4 flex flex-wrap gap-2">
            {ranks.map((r) => (
              <span
                key={r}
                className="inline-flex items-center gap-1.5 rounded-full border border-brass/25 bg-brass/10 py-1 pl-3 pr-1.5 text-sm font-semibold text-brassInk"
              >
                {r}
                <button
                  onClick={() => saveRanks(ranks.filter((x) => x !== r))}
                  aria-label={`${t.dash_alerts_remove} ${r}`}
                  className="grid h-6 w-6 cursor-pointer place-items-center rounded-full text-brassInk/70 transition hover:bg-brass/20 hover:text-brassInk"
                >
                  <X size={13} />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="mb-4 text-sm text-mist">{t.dash_alerts_none}</p>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <RankFilter value={ranks} onApply={saveRanks} label={t.dash_alerts_add} />
          {canSuggest && (
            <button
              onClick={() => saveRanks([...ranks, suggestion!])}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-teal/30 bg-teal/10 px-3 py-2 text-sm font-semibold text-teal transition hover:bg-teal/20"
            >
              <Plus size={14} /> {suggestion}
            </button>
          )}
        </div>

        <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-white/10 pt-3 text-xs text-mist">
          <Radio size={12} className="shrink-0" />
          {t.dash_tg_channel}
          <a
            href={`https://t.me/${CHANNEL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brassInk hover:underline"
          >
            {t.dash_tg_channel_link} →
          </a>
        </p>
      </div>
    </div>
  );
}
