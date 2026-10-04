"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Check, X, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { CV_WORD, cvWordPrice } from "@/lib/cvWord";

// Purchases of the Word export, and the one lever a person has over them.
//
// The webhook opens the export by itself and this screen is normally just a
// ledger. It exists for the case the matcher deliberately refuses: a payment
// with no address on it, or two buyers inside the same window, where guessing
// would hand one person's CV to the other's money. Then somebody reads the Buy
// Me a Coffee dashboard, finds who actually paid, and opens it here.
//
// "Opened by hand" is recorded as such — paid_ref keeps `manual:<admin id>`, so
// a year from now the row still says whether money arrived or a decision did.

type Row = {
  id: string;
  seafarer_id: string;
  email: string;
  status: string;
  price_usd: number | null;
  paid_at: string | null;
  paid_amount: number | null;
  paid_currency: string | null;
  paid_ref: string | null;
  created_at: string;
};

function when(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleString("en-GB", {
    timeZone: "UTC", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
  });
}

export default function AdminCvPurchasesPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [names, setNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data, error: err } = await supabase
      .from("cv_word_purchases")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (err) {
      // The table is missing only if the migration has not been run; say which
      // it is instead of showing an empty list that looks like "no sales yet".
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
      const { data: people } = await supabase
        .from("seafarers").select("id, first_name, last_name").in("id", ids);
      const map: Record<string, string> = {};
      for (const p of people ?? []) {
        map[p.id] = [p.first_name, p.last_name].filter(Boolean).join(" ") || "—";
      }
      setNames(map);
    }
    setLoading(false);
  }

  useEffect(() => { void load(); }, []);

  async function mark(id: string, paid: boolean) {
    setBusy(id);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const res = await fetch("/api/admin/cv-purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ id, paid }),
      });
      if (!res.ok) { setError(`Не удалось сохранить (${res.status})`); return; }
      await load();
    } finally {
      setBusy(null);
    }
  }

  const paid = rows.filter((r) => r.paid_at).length;
  const manual = rows.filter((r) => r.paid_ref?.startsWith("manual:")).length;

  return (
    <div className="p-5 sm:p-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">CV in Word</h1>
          <p className="mt-1 text-sm text-mist">
            Покупки выгрузки в Word, {cvWordPrice()} за штуку.{" "}
            {CV_WORD.payUrl ? "Продажа включена." : "Ссылка на оплату не задана — продажа выключена."}
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
        <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-mist">
          Всего: <b className="text-white">{rows.length}</b>
        </span>
        <span className="rounded-xl border border-teal/20 bg-teal/10 px-4 py-2 text-teal">
          Оплачено: <b>{paid}</b>
        </span>
        <span className="rounded-xl border border-brass/20 bg-brass/10 px-4 py-2 text-brassInk">
          Из них вручную: <b>{manual}</b>
        </span>
      </div>

      {error && (
        <p className="mb-4 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral">{error}</p>
      )}

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[720px] text-left">
          <thead className="bg-deep">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold uppercase text-mist">Моряк</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase text-mist">Почта при покупке</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase text-mist">Открыта</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase text-mist">Оплачено</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-mist">Действие</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-sm text-mist">Загрузка…</td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-sm text-mist">Покупок пока нет.</td></tr>
            ) : rows.map((r) => (
              <tr key={r.id} className="bg-card hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <p className="font-semibold text-white">{names[r.seafarer_id] ?? "—"}</p>
                  <p className="text-xs text-mist">{r.seafarer_id.slice(0, 8)}</p>
                </td>
                <td className="px-4 py-3 text-sm text-foam">{r.email}</td>
                <td className="px-4 py-3 text-xs text-mist">{when(r.created_at)}</td>
                <td className="px-4 py-3 text-sm">
                  {r.paid_at ? (
                    <>
                      <span className="rounded-full border border-teal/20 bg-teal/10 px-2.5 py-0.5 text-xs font-semibold text-teal">
                        {when(r.paid_at)}
                      </span>
                      <p className="mt-1 text-xs text-mist">
                        {r.paid_amount !== null ? `${r.paid_amount} ${r.paid_currency ?? ""} · ` : ""}
                        {r.paid_ref?.startsWith("manual:") ? "открыто вручную" : "платёж от BMC"}
                      </p>
                    </>
                  ) : (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-semibold text-mist">
                      ждёт оплаты
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end">
                    {r.paid_at ? (
                      <button
                        onClick={() => void mark(r.id, false)}
                        disabled={busy === r.id}
                        title="Закрыть доступ — например, после возврата денег"
                        className="flex items-center gap-1.5 rounded-lg border border-coral/20 bg-coral/10 px-3 py-1.5 text-xs font-semibold text-coral transition hover:bg-coral/20 disabled:opacity-50"
                      >
                        <X size={13} /> Закрыть
                      </button>
                    ) : (
                      <button
                        onClick={() => void mark(r.id, true)}
                        disabled={busy === r.id}
                        title="Открыть выгрузку — когда платёж пришёл, но не сопоставился"
                        className="flex items-center gap-1.5 rounded-lg border border-teal/20 bg-teal/10 px-3 py-1.5 text-xs font-semibold text-teal transition hover:bg-teal/20 disabled:opacity-50"
                      >
                        <Check size={13} /> Открыть доступ
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 max-w-2xl text-xs leading-relaxed text-mist">
        Обычно здесь ничего делать не нужно: оплата открывает выгрузку сама. «Открыть доступ» —
        для случая, когда платёж пришёл, но система отказалась угадывать: человек заплатил
        с другого ящика, или в одно окно попали двое. Кто именно заплатил, видно в кабинете
        Buy Me a Coffee — там же ответ на вопрос о почте, если он был задан при покупке.
      </p>
    </div>
  );
}
