"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Check, X, RefreshCw, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { PLAN_IDS, SUB_PLANS, SUB_SELLING, subPrice, type PlanId } from "@/lib/subscription";

// Seafarer subscriptions, and the one lever a person has over them.
//
// The webhook opens a subscription by itself and this screen is normally a
// ledger. It exists for the payments the matcher refuses to guess at — another
// mailbox and no checkout in the window, two buyers at once — for refunds, and
// for someone who paid without opening a checkout here at all ("Выдать").
// Whatever is done by hand keeps `paid_ref = manual:<admin id>`.

type Row = {
  id: string;
  seafarer_id: string;
  plan: PlanId;
  months: number;
  email: string;
  status: string;
  paid_at: string | null;
  paid_until: string | null;
  paid_amount: number | null;
  paid_currency: string | null;
  paid_ref: string | null;
  created_at: string;
};

function when(d: string | null, withTime = true) {
  if (!d) return "—";
  return new Date(d).toLocaleString("ru-RU", {
    timeZone: "Europe/Kyiv", day: "numeric", month: "short", year: withTime ? undefined : "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
}

export default function AdminSubscriptionsPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [names, setNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [grantEmail, setGrantEmail] = useState("");
  const [grantPlan, setGrantPlan] = useState<PlanId>("3m");
  const [notice, setNotice] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data, error: err } = await supabase
      .from("seafarer_subscriptions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(300);
    if (err) {
      // Missing only if the migration has not been run; say so rather than
      // showing an empty list that reads as "no sales yet".
      setError(err.message);
      setRows([]);
      setLoading(false);
      return;
    }
    setError(null);
    const list = (data ?? []) as Row[];
    setRows(list);
    const ids = [...new Set(list.map((r) => r.seafarer_id))];
    if (ids.length) {
      const { data: people } = await supabase.from("seafarers").select("id, first_name, last_name").in("id", ids);
      const map: Record<string, string> = {};
      for (const p of people ?? []) map[p.id] = [p.first_name, p.last_name].filter(Boolean).join(" ") || "—";
      setNames(map);
    }
    setLoading(false);
  }

  useEffect(() => { void load(); }, []);

  async function call(payload: Record<string, unknown>, key: string) {
    setBusy(key);
    setNotice(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return false;
      const res = await fetch("/api/admin/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify(payload),
      });
      const j = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; until?: string };
      if (!j.ok) {
        setError(
          j.error === "no_account" ? "Аккаунта с такой почтой нет."
            : j.error === "not_seafarer" ? "Это не аккаунт моряка."
              : `Не удалось сохранить (${j.error ?? res.status})`,
        );
        return false;
      }
      setError(null);
      if (j.until) setNotice(`Доступ до ${when(j.until, false)}.`);
      await load();
      return true;
    } finally {
      setBusy(null);
    }
  }

  const now = Date.now();
  const active = new Set(rows.filter((r) => r.paid_until && new Date(r.paid_until).getTime() > now).map((r) => r.seafarer_id)).size;
  const paid = rows.filter((r) => r.paid_at);
  const revenue = paid.reduce((s, r) => s + (r.paid_ref?.startsWith("manual:") ? 0 : Number(r.paid_amount ?? 0)), 0);

  return (
    <div className="p-5 sm:p-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">Subscriptions</h1>
          <p className="mt-1 text-sm text-mist">
            Подписка моряков: {PLAN_IDS.map((p) => `${SUB_PLANS[p].months} мес. — ${subPrice(p)}`).join(" · ")}.{" "}
            {SUB_SELLING ? "Продажа включена." : "Ссылки на оплату не заданы — продажа выключена."}
          </p>
        </div>
        <button
          onClick={() => void load()}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-mist transition hover:text-white"
        >
          <RefreshCw size={15} /> Обновить
        </button>
      </div>

      <div className="mb-5 flex flex-wrap gap-3 text-sm">
        <span className="rounded-xl border border-teal/20 bg-teal/10 px-4 py-2 text-teal">
          Активных сейчас: <b>{active}</b>
        </span>
        <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-mist">
          Оплат: <b className="text-white">{paid.length}</b>
        </span>
        <span className="rounded-xl border border-brass/20 bg-brass/10 px-4 py-2 text-brassInk">
          Получено: <b>${revenue.toFixed(2)}</b>
        </span>
        <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-mist">
          Ждут оплаты: <b className="text-white">{rows.filter((r) => r.status === "pending").length}</b>
        </span>
      </div>

      {/* For a seafarer who paid without opening a checkout here. */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (await call({ action: "grant", email: grantEmail, plan: grantPlan }, "grant")) setGrantEmail("");
        }}
        className="mb-5 flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-card p-4"
      >
        <span className="text-sm font-semibold text-foam">Выдать подписку:</span>
        <input
          type="email"
          required
          value={grantEmail}
          onChange={(e) => setGrantEmail(e.target.value)}
          placeholder="почта аккаунта моряка"
          className="min-w-[14rem] flex-1 rounded-xl border border-white/10 bg-navy2 px-3 py-2 text-sm text-white outline-none focus:border-brass"
        />
        <select
          value={grantPlan}
          onChange={(e) => setGrantPlan(e.target.value as PlanId)}
          className="rounded-xl border border-white/10 bg-navy2 px-3 py-2 text-sm text-white outline-none focus:border-brass"
        >
          {PLAN_IDS.map((p) => <option key={p} value={p}>{SUB_PLANS[p].months} мес.</option>)}
        </select>
        <button
          type="submit"
          disabled={busy === "grant"}
          className="flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-brass to-brass2 px-4 py-2 text-sm font-bold text-[#061523] disabled:opacity-50"
        >
          <Plus size={15} /> Выдать
        </button>
      </form>

      {error && <p className="mb-4 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral">{error}</p>}
      {notice && <p className="mb-4 rounded-xl border border-teal/30 bg-teal/10 px-4 py-3 text-sm text-teal">{notice}</p>}

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[820px] text-left">
          <thead className="bg-deep">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold uppercase text-mist">Моряк</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase text-mist">Почта</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase text-mist">Тариф</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase text-mist">Открыта</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase text-mist">Статус</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-mist">Действие</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-sm text-mist">Загрузка…</td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-sm text-mist">Подписок пока нет.</td></tr>
            ) : rows.map((r) => (
              <tr key={r.id} className="bg-card hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <p className="font-semibold text-white">{names[r.seafarer_id] ?? "—"}</p>
                  <p className="text-xs text-mist">{r.seafarer_id.slice(0, 8)}</p>
                </td>
                <td className="px-4 py-3 text-sm text-foam">{r.email}</td>
                <td className="px-4 py-3 text-sm text-foam">{r.months} мес.</td>
                <td className="px-4 py-3 text-xs text-mist">{when(r.created_at)}</td>
                <td className="px-4 py-3 text-sm">
                  {r.status === "paid" ? (
                    <>
                      <span className="rounded-full border border-teal/20 bg-teal/10 px-2.5 py-0.5 text-xs font-semibold text-teal">
                        до {when(r.paid_until, false)}
                      </span>
                      <p className="mt-1 text-xs text-mist">
                        {r.paid_amount !== null ? `${r.paid_amount} ${r.paid_currency ?? ""} · ` : ""}
                        {r.paid_ref?.startsWith("manual:") ? "вручную" : "платёж от BMC"}
                      </p>
                    </>
                  ) : r.status === "refunded" ? (
                    <span className="rounded-full border border-coral/20 bg-coral/10 px-2.5 py-0.5 text-xs font-semibold text-coral">возврат / закрыта</span>
                  ) : (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-semibold text-mist">ждёт оплаты</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end">
                    {r.status === "paid" ? (
                      <button
                        onClick={() => void call({ action: "close", id: r.id }, r.id)}
                        disabled={busy === r.id}
                        title="Закрыть доступ — например, после возврата денег"
                        className="flex items-center gap-1.5 rounded-lg border border-coral/20 bg-coral/10 px-3 py-1.5 text-xs font-semibold text-coral transition hover:bg-coral/20 disabled:opacity-50"
                      >
                        <X size={13} /> Закрыть
                      </button>
                    ) : r.status === "pending" ? (
                      <button
                        onClick={() => void call({ action: "open", id: r.id }, r.id)}
                        disabled={busy === r.id}
                        title="Открыть доступ — когда платёж пришёл, но не сопоставился"
                        className="flex items-center gap-1.5 rounded-lg border border-teal/20 bg-teal/10 px-3 py-1.5 text-xs font-semibold text-teal transition hover:bg-teal/20 disabled:opacity-50"
                      >
                        <Check size={13} /> Открыть доступ
                      </button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 max-w-2xl text-xs leading-relaxed text-mist">
        Обычно здесь ничего делать не нужно: оплата открывает подписку сама, и в Telegram приходит
        «⭐ ПІДПИСКА». «Открыть доступ» — когда платёж пришёл, но система отказалась угадывать
        (другая почта, или двое оплачивали одновременно). «Выдать» — когда человек заплатил, не
        нажимая тариф на сайте. Повторная оплата добавляет месяцы к текущему сроку.
      </p>
    </div>
  );
}
