"use client";

import { useState } from "react";
import { Send, Copy, Check } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

// The Brevo panel on /admin/emails (Marketing e-mail in CLAUDE.md): checks the
// key, list and sender, pushes every opted-in seafarer to the list, and shows
// the webhook URL to paste into Brevo — all as the signed-in admin, because
// Vercel never shows a sensitive variable (CRON_SECRET) again once saved.

type Result = {
  ok: boolean;
  error?: string;
  key?: string;
  plan?: string[];
  list?: string;
  sender?: string;
  attributes?: string[];
  optedIn?: number;
  synced?: { ok: number; failed: number };
  webhookUrl?: string;
};

export default function BrevoPanel() {
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  async function run(sync: boolean) {
    setBusy(true);
    setRes(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("no session");
      const r = await fetch(`/api/brevo/setup${sync ? "?sync=1" : ""}`, { headers: { Authorization: `Bearer ${session.access_token}` } });
      setRes(await r.json().catch(() => ({ ok: false, error: `HTTP ${r.status}` })));
    } catch (e) {
      setRes({ ok: false, error: e instanceof Error ? e.message : "error" });
    } finally {
      setBusy(false);
    }
  }

  const line = (label: string, v?: string) => v !== undefined && (
    <p><span className="text-mist">{label}:</span> <span className={v.startsWith("ok") ? "text-teal" : "text-coral"}>{v}</span></p>
  );

  return (
    <div className="mb-6 rounded-2xl border border-white/10 bg-card p-5">
      <p className="font-semibold text-white">Brevo — подборки вакансий морякам</p>
      <p className="mt-1 text-sm text-mist">Проверить подключение и перенести в список Brevo всех моряков, подписавшихся на подборку.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={() => void run(false)} disabled={busy}
          className="min-h-[40px] rounded-xl border border-white/15 px-4 text-sm font-semibold text-foam disabled:opacity-50">
          Проверить
        </button>
        <button onClick={() => void run(true)} disabled={busy}
          className="flex min-h-[40px] items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-4 text-sm font-bold text-[#061523] disabled:opacity-50">
          <Send size={15} /> {busy ? "Работаю… (до минуты)" : "Проверить и перенести подписчиков"}
        </button>
      </div>

      {res && (
        <div className="mt-4 flex flex-col gap-1 text-sm">
          {res.error && <p className="text-coral">Ошибка: {res.error}</p>}
          {line("Ключ", res.key)}
          {line("Список", res.list)}
          {line("Отправитель", res.sender)}
          {res.plan?.length ? <p><span className="text-mist">Тариф:</span> <span className="text-foam">{res.plan.join("; ")}</span></p> : null}
          {res.optedIn !== undefined && <p><span className="text-mist">Подписано моряков:</span> <span className="text-foam">{res.optedIn}</span></p>}
          {res.synced && (
            <p><span className="text-mist">Перенесено в Brevo:</span> <span className="text-teal">{res.synced.ok}</span>
              {res.synced.failed ? <span className="text-coral"> · ошибок {res.synced.failed}</span> : null}</p>
          )}
          {res.webhookUrl && (
            <div className="mt-3 rounded-xl border border-white/10 bg-navy2 p-3">
              <p className="text-xs text-mist">Адрес вебхука для Brevo (Settings → Webhooks → Marketing; события Unsubscribed, Marked as spam, Hard bounce):</p>
              <div className="mt-2 flex items-center gap-2">
                <code className="min-w-0 flex-1 break-all text-xs text-foam">{res.webhookUrl}</code>
                <button onClick={() => { void navigator.clipboard.writeText(res.webhookUrl!); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className="flex shrink-0 items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-xs text-foam">
                  {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? "Скопировано" : "Копировать"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
