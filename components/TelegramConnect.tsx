"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Check, Radio } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useLang } from "@/components/LangProvider";
import { T } from "@/lib/i18n";

// "Connect Telegram" for the seafarer dashboard.
//
// The flow is Telegram's own deep link: we mint a one-time code server-side,
// open t.me/<bot>?start=<code>, and the bot binds the chat when the person
// presses Start. Nothing comes back to this tab, so after opening the link we
// poll our own row until the binding appears — which is also what makes the
// card update when they press Start on their phone rather than here.

const CHANNEL = process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL || "seajobspro";

// The card stays hidden until the bot is actually wired up. Offering "Connect
// Telegram" before the token, the webhook and the channel exist would hand
// seafarers a button that can only fail. Set NEXT_PUBLIC_TELEGRAM_ENABLED=1 in
// the same deploy that adds TELEGRAM_BOT_TOKEN — NEXT_PUBLIC_ values are baked
// in at build time, so it takes effect on the next build, not before.
export const TELEGRAM_UI_ENABLED = process.env.NEXT_PUBLIC_TELEGRAM_ENABLED === "1";

export default function TelegramConnect({
  seafarerId,
  linked,
  onChange,
}: {
  seafarerId: string;
  linked: boolean;
  onChange: (linked: boolean) => void;
}) {
  const { lang } = useLang();
  const t = T[lang];
  const [busy, setBusy] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const poll = useRef<ReturnType<typeof setInterval> | null>(null);

  // Stop polling on unmount — the dashboard is a client route, and a stray
  // interval would keep querying Supabase after the user navigated away.
  useEffect(() => () => { if (poll.current) clearInterval(poll.current); }, []);

  function watchForLink() {
    setWaiting(true);
    const started = Date.now();
    if (poll.current) clearInterval(poll.current);
    poll.current = setInterval(async () => {
      // Give up after two minutes rather than polling forever: by then they
      // either pressed Start or closed Telegram.
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
        onChange(true);
      }
    }, 3000);
  }

  async function connect() {
    if (busy) return;
    setBusy(true);
    setError(null);
    // Open the tab before awaiting: a popup opened after an await has lost the
    // user-gesture context and gets blocked on Safari and mobile browsers.
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
    onChange(false);
    setBusy(false);
  }

  // After the hooks, never before: React requires the same hook order on every
  // render, so an early return has to come below them.
  if (!TELEGRAM_UI_ENABLED) return null;

  return (
    <div
      className={`mt-4 rounded-2xl border p-6 ${
        linked ? "border-teal/30 bg-teal/5" : "border-white/10 bg-card"
      }`}
    >
      {/* Stacked on phones: side by side, a long button label ("Подключить
          Telegram") squeezes the copy into a four-word-wide column. */}
      <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
              linked ? "bg-teal/20" : "bg-white/5"
            }`}
          >
            {linked ? <Check size={18} className="text-teal" /> : <Send size={18} className="text-mist" />}
          </div>
          <div>
            <p className="font-semibold text-white">{t.dash_tg_title}</p>
            <p className={`text-xs ${linked ? "text-teal" : "text-mist"}`}>
              {linked ? t.dash_tg_on : waiting ? t.dash_tg_waiting : t.dash_tg_off}
            </p>
            {error && <p className="mt-1 text-xs text-coral">{error}</p>}
          </div>
        </div>

        <button
          onClick={linked ? disconnect : connect}
          disabled={busy}
          className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition disabled:opacity-50 sm:w-auto ${
            linked
              ? "border border-coral/30 bg-coral/10 text-coral hover:bg-coral/20"
              : "bg-gradient-to-br from-brass to-brass2 text-[#061523] hover:-translate-y-0.5"
          }`}
        >
          {busy ? "…" : linked ? t.dash_tg_disconnect : t.dash_tg_connect}
        </button>
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
  );
}
