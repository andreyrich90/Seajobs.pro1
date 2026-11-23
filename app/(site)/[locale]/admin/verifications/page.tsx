"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Clock, X, Check, FileText, Send, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

// /admin/verifications — SeaJobs Partners (lib/partners.ts).
// Opens each company's documents (ten-minute signed links), approves or
// rejects with a reason, and sends the invitation to companies that have not
// applied yet. Everything goes through api/admin/company-verifications.

type Item = {
  id: string;
  company_id: string;
  status: "pending" | "approved" | "rejected";
  country: string | null;
  registry_number: string | null;
  note: string | null;
  admin_note: string | null;
  submitted_at: string;
  reviewed_at: string | null;
  files: { name: string; type: string; size: number }[];
  company: { name: string | null; logo_url: string | null; website: string | null; location: string | null; is_verified: boolean | null } | null;
  email: string | null;
};
type Stats = { accounts: number; verified: number; pending: number; invited: number; mailed: number };

async function call(method: "GET" | "POST", body?: unknown) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("no session");
  const res = await fetch("/api/admin/company-verifications", {
    method,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
    body: body ? JSON.stringify(body) : undefined,
  });
  const j = await res.json().catch(() => ({}));
  if (!res.ok || j.ok === false) throw new Error(j.error ?? String(res.status));
  return j;
}

const fmt = (d: string) => new Date(d).toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

export default function AdminVerificationsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [inviteResult, setInviteResult] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const j = await call("GET");
      setItems(j.items ?? []);
      setStats(j.stats ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "error");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { void load(); }, []);

  async function openFile(id: string, i: number) {
    try {
      const j = await call("POST", { action: "file", id, i });
      window.open(j.url, "_blank", "noopener");
    } catch (e) {
      alert(e instanceof Error ? e.message : "error");
    }
  }

  async function decide(id: string, decision: "approve" | "reject") {
    const note = (reasons[id] ?? "").trim();
    if (decision === "reject" && !note) { alert("Напишите причину отказа — компания её увидит."); return; }
    setBusy(id);
    try {
      await call("POST", { action: "decide", id, decision, note });
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "error");
    } finally {
      setBusy(null);
    }
  }

  async function invite() {
    if (!confirm("Отправить приглашение «Партнёр SeaJobs» компаниям (уведомление в колокольчик и письмо, до 25 писем)?")) return;
    setBusy("invite");
    setInviteResult(null);
    try {
      const j = await call("POST", { action: "invite", limit: 25 });
      setInviteResult(`Компаний без статуса: ${j.targets}. Уведомлений в колокольчик: ${j.notified}. Писем отправлено: ${j.mailed}${j.failed ? `, ошибок: ${j.failed}` : ""}. Осталось без письма: ${j.left}${j.left ? " — нажмите снова завтра" : ""}.`);
      await load();
    } catch (e) {
      setInviteResult(`Ошибка: ${e instanceof Error ? e.message : "error"}`);
    } finally {
      setBusy(null);
    }
  }

  const pending = items.filter((i) => i.status === "pending");
  const done = items.filter((i) => i.status !== "pending");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="flex items-center gap-2 font-display text-2xl font-semibold text-white">
          <ShieldCheck size={24} className="text-teal" /> Партнёры SeaJobs
        </h1>
        <button onClick={() => void load()} className="flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-sm text-mist hover:text-white">
          <RefreshCw size={14} /> Обновить
        </button>
      </div>

      {error && <p className="rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral">{error}</p>}

      {stats && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {[
            ["Компаний с аккаунтом", stats.accounts],
            ["Партнёров", stats.verified],
            ["На проверке", stats.pending],
            ["Приглашено (колокольчик)", stats.invited],
            ["Писем-приглашений", stats.mailed],
          ].map(([label, n]) => (
            <div key={label as string} className="rounded-2xl border border-white/10 bg-card p-4">
              <p className="text-2xl font-bold text-white">{n}</p>
              <p className="mt-1 text-xs text-mist">{label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-2xl border border-white/10 bg-card p-5">
        <p className="font-semibold text-white">Пригласить компании</p>
        <p className="mt-1 text-sm text-mist">
          Уведомление в колокольчик — всем компаниям без статуса партнёра и без заявки на проверке. Письмо — до 25 за раз и не больше 80 писем за день в сумме
          (лимит Resend общий с CV моряков). Повторно никому не пишем — если остались компании без письма, нажмите завтра.
        </p>
        <button onClick={() => void invite()} disabled={busy === "invite"}
          className="mt-3 flex min-h-[40px] items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-4 text-sm font-bold text-[#061523] disabled:opacity-50">
          <Send size={15} /> {busy === "invite" ? "Отправляем…" : "Отправить приглашения"}
        </button>
        {inviteResult && <p className="mt-3 text-sm text-foam">{inviteResult}</p>}
      </div>

      <section>
        <h2 className="mb-3 flex items-center gap-2 font-semibold text-white"><Clock size={16} className="text-brassInk" /> На проверке ({pending.length})</h2>
        {loading ? <p className="text-sm text-mist">Загрузка…</p> : pending.length === 0 ? (
          <p className="text-sm text-mist">Новых заявок нет.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {pending.map((it) => (
              <div key={it.id} className="rounded-2xl border border-brass/30 bg-card p-5">
                <div className="flex flex-wrap items-start gap-4">
                  {it.company?.logo_url
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={it.company.logo_url} alt="" className="h-12 w-12 rounded-xl bg-white object-contain" />
                    : <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 text-mist">—</div>}
                  <div className="min-w-0 flex-1 text-sm text-foam">
                    <p className="text-base font-semibold text-white">{it.company?.name ?? "Без названия"}</p>
                    <p className="text-mist">{[it.email, it.company?.location, it.company?.website].filter(Boolean).join(" · ")}</p>
                    <p className="mt-2">Страна: <b>{it.country ?? "—"}</b> · Номер: <b>{it.registry_number ?? "—"}</b></p>
                    {it.note && <p className="mt-1 text-mist">Комментарий: {it.note}</p>}
                    <p className="mt-1 text-xs text-mist">Отправлено {fmt(it.submitted_at)}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {it.files.map((f, i) => (
                        <button key={i} onClick={() => void openFile(it.id, i)}
                          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-foam hover:border-brass">
                          <FileText size={13} /> {f.name} · {(f.size / 1024 / 1024).toFixed(1)} MB
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button onClick={() => void decide(it.id, "approve")} disabled={busy === it.id}
                    className="flex min-h-[40px] items-center gap-1.5 rounded-xl bg-teal px-4 text-sm font-bold text-[#061523] disabled:opacity-50">
                    <Check size={15} /> Подтвердить
                  </button>
                  <input value={reasons[it.id] ?? ""} onChange={(e) => setReasons((r) => ({ ...r, [it.id]: e.target.value }))}
                    placeholder="Причина отказа (её увидит компания)"
                    className="min-w-0 flex-1 basis-60 rounded-xl border border-white/10 bg-navy2 px-3 py-2 text-sm text-white outline-none focus:border-coral" />
                  <button onClick={() => void decide(it.id, "reject")} disabled={busy === it.id}
                    className="flex min-h-[40px] items-center gap-1.5 rounded-xl border border-coral/50 px-4 text-sm font-bold text-coral disabled:opacity-50">
                    <X size={15} /> Отклонить
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {done.length > 0 && (
        <section>
          <h2 className="mb-3 font-semibold text-white">Решённые</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-card">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-mist">
                <tr><th className="px-4 py-3">Компания</th><th className="px-4 py-3">Статус</th><th className="px-4 py-3">Решение</th><th className="px-4 py-3">Документы</th><th className="px-4 py-3"></th></tr>
              </thead>
              <tbody>
                {done.map((it) => (
                  <tr key={it.id} className="border-t border-white/5 text-foam">
                    <td className="px-4 py-3">{it.company?.name ?? "—"}<div className="text-xs text-mist">{it.email}</div></td>
                    <td className="px-4 py-3">
                      {it.status === "approved"
                        ? <span className="text-teal">✓ Партнёр</span>
                        : <span className="text-coral">Отклонено{it.admin_note ? `: ${it.admin_note}` : ""}</span>}
                    </td>
                    <td className="px-4 py-3 text-xs text-mist">{it.reviewed_at ? fmt(it.reviewed_at) : "—"}</td>
                    <td className="px-4 py-3">
                      {it.files.map((f, i) => (
                        <button key={i} onClick={() => void openFile(it.id, i)} className="mr-2 text-xs text-brassInk hover:underline">{f.name}</button>
                      ))}
                    </td>
                    <td className="px-4 py-3">
                      {it.status === "approved" ? (
                        <button onClick={() => {
                          const why = prompt("Снять статус партнёра? Напишите причину — компания её увидит.");
                          if (why) { setReasons((r) => ({ ...r, [it.id]: why })); void (async () => { setBusy(it.id); try { await call("POST", { action: "decide", id: it.id, decision: "reject", note: why }); await load(); } finally { setBusy(null); } })(); }
                        }} className="text-xs text-coral hover:underline">Снять статус</button>
                      ) : (
                        <button onClick={() => void decide(it.id, "approve")} className="text-xs text-teal hover:underline">Подтвердить</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
