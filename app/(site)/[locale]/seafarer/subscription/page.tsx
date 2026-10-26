"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Star, Lock, ArrowLeft, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { supabase } from "@/lib/supabase/client";
import { useLang } from "@/components/LangProvider";
import { PLAN_IDS, SUB_PLANS, SUB_SELLING, subLock, subPrice, type PlanId } from "@/lib/subscription";
import type { FreeState } from "@/lib/freeUnlocks";
import { subCopy } from "@/lib/subscriptionCopy";

// The seafarer subscription, from the cabinet: what it opens, the three plans,
// and where the seafarer stands.
//
// Paying happens at Buy Me a Coffee. Pressing a plan opens a checkout row first
// (POST /api/subscription) and the provider's page in a new tab; this tab then
// polls until the payment webhook has marked the row paid. The checkout's
// "redirect after purchase" points back here with ?paid=1, so the tab the buyer
// lands in waits too, rather than showing an unchanged page.
//
// Nothing here is a boundary: the routes that hand out contacts and CV files
// check the subscription themselves (lib/subscriptionAccess.ts).

const DATE_LOCALE: Record<string, string> = { en: "en-GB", ru: "ru-RU", ua: "uk-UA", pl: "pl-PL", ro: "ro-RO" };
/** How long a tab waits for the webhook before giving the buttons back. */
const WAIT_MS = 15 * 60_000;

type Status = { active: boolean; activeUntil: string | null; email: string | null; free: FreeState | null };

export default function SubscriptionPage() {
  const { lang } = useLang();
  const c = subCopy(lang);
  const [status, setStatus] = useState<Status | null>(null);
  const [busy, setBusy] = useState<PlanId | null>(null);
  const [waiting, setWaiting] = useState(false);
  const [stale, setStale] = useState(false);
  const [back, setBack] = useState<string | null>(null);
  // The window end before this tab sent the buyer to pay: a later one means
  // the payment landed. A first purchase has none, so "active" is enough then.
  const before = useRef<string | null>(null);
  const waitSince = useRef(0);

  const load = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;
    try {
      const res = await fetch("/api/subscription", { headers: { Authorization: `Bearer ${session.access_token}` }, cache: "no-store" });
      const j = (await res.json()) as Partial<Status> & { ok?: boolean };
      if (!j.ok) return null;
      const s: Status = { active: !!j.active, activeUntil: j.activeUntil ?? null, email: j.email ?? null, free: j.free ?? null };
      setStatus(s);
      return s;
    } catch {
      return null;
    }
  }, []);

  // ?back= (a vacancy, the CV page) and ?paid=1 (the checkout's redirect).
  // Read off location rather than useSearchParams, as elsewhere in the cabinet.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const b = q.get("back");
    if (b && b.startsWith("/") && !b.startsWith("//")) setBack(b);
    void load().then((s) => {
      if (q.get("paid") === "1" && !s?.active) {
        before.current = s?.activeUntil ?? null;
        waitSince.current = Date.now();
        setWaiting(true);
      }
    });
  }, [load]);

  // A payment in flight: the webhook flips the row a few seconds after it
  // lands. Poll gently; give the buttons back once it is clearly not coming.
  useEffect(() => {
    if (!waiting) return;
    const id = setInterval(async () => {
      if (Date.now() - waitSince.current > WAIT_MS) {
        setWaiting(false);
        setStale(true);
        return;
      }
      const s = await load();
      if (s?.active && s.activeUntil !== before.current) setWaiting(false);
    }, 4000);
    return () => clearInterval(id);
  }, [waiting, load]);

  async function buy(plan: PlanId) {
    const payUrl = SUB_PLANS[plan].payUrl;
    if (!payUrl) return;
    setBusy(plan);
    // Open the tab before awaiting: a window opened after an await has lost
    // the click and is blocked on Safari and on mobile.
    const tab = window.open("", "_blank");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { tab?.close(); return; }
      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ plan }),
      });
      const j = (await res.json().catch(() => null)) as { ok?: boolean; payUrl?: string } | null;
      if (!j?.ok) { tab?.close(); return; }
      before.current = status?.activeUntil ?? null;
      waitSince.current = Date.now();
      setStale(false);
      setWaiting(true);
      if (tab) tab.location.href = j.payUrl ?? payUrl;
      else window.location.href = j.payUrl ?? payUrl;
    } finally {
      setBusy(null);
    }
  }

  const until = status?.activeUntil
    ? new Date(status.activeUntil).toLocaleDateString(DATE_LOCALE[lang] ?? "en-GB", {
        timeZone: "Europe/Kyiv", day: "numeric", month: "long", year: "numeric",
      })
    : null;

  return (
    <div className="p-5 sm:p-8">
      {back && (
        <Link href={back} className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brassInk hover:text-brass">
          <ArrowLeft size={15} /> {back.startsWith("/jobs/") ? c.back : c.backCv}
        </Link>
      )}

      <h1 className="font-display text-2xl font-semibold text-[#ffffff]">{c.title}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist">{c.lede}</p>

      <ul className="mt-4 grid max-w-2xl gap-2">
        {c.perks.map((p) => (
          <li key={p} className="flex items-start gap-2 text-sm text-foam">
            <Check size={16} className="mt-0.5 shrink-0 text-teal" /> {p}
          </li>
        ))}
      </ul>
      <p className="mt-3 max-w-2xl text-xs text-mist">{c.free}</p>

      {/* Where the seafarer stands. */}
      <div className={`mt-6 max-w-3xl rounded-2xl border px-5 py-4 ${status?.active ? "border-teal/30 bg-teal/10" : "border-white/10 bg-card"}`}>
        {status === null ? (
          <p className="text-sm text-mist">…</p>
        ) : waiting ? (
          <p className="flex items-center gap-2 text-sm font-semibold text-foam">
            <Clock size={16} className="animate-pulse text-brassInk" /> {c.waiting}
          </p>
        ) : status.active && until ? (
          <p className="flex items-center gap-2 text-sm font-semibold text-teal">
            <Star size={16} /> {c.activeUntil.replace("{date}", until)}
          </p>
        ) : (
          <p className="flex items-center gap-2 text-sm text-mist">
            <Lock size={15} /> {c.inactive}
          </p>
        )}
        {/* No subscription: how much of the week's free tier is left. */}
        {SUB_SELLING && status && !status.active && !waiting && status.free && (
          <p className="mt-2 text-xs text-mist">
            {subLock(lang).freeLeft.replace("{left}", String(status.free.left)).replace("{limit}", String(status.free.limit))}
          </p>
        )}
        {stale && <p className="mt-2 text-xs text-mist">{c.trouble}</p>}
        {status?.active && !waiting && back && (
          <Link href={back} className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brassInk hover:text-brass">
            <ArrowLeft size={15} /> {back.startsWith("/jobs/") ? c.back : c.backCv}
          </Link>
        )}
      </div>

      {!SUB_SELLING && (
        <p className="mt-6 max-w-3xl rounded-2xl border border-brass/30 bg-brass/10 px-5 py-4 text-sm text-foam">{c.soon}</p>
      )}

      {/* The three plans. */}
      <div className="mt-6 grid max-w-3xl gap-4 sm:grid-cols-3">
        {PLAN_IDS.map((plan) => {
          const { months, usd, payUrl } = SUB_PLANS[plan];
          const perMonth = usd / months;
          const pm = Number.isInteger(perMonth) ? String(perMonth) : perMonth.toFixed(2);
          const pmText = lang === "pl" || lang === "ro" ? `${pm.replace(".", ",")} $` : `$${pm}`;
          const best = plan === "12m";
          return (
            <div
              key={plan}
              className={`relative flex flex-col rounded-2xl border p-5 ${best ? "border-brass/50 bg-brass/10" : "border-white/10 bg-card"}`}
            >
              {best && (
                <span className="absolute -top-3 left-5 rounded-full bg-gradient-to-br from-brass to-brass2 px-3 py-0.5 text-xs font-bold text-[#061523]">
                  {c.best}
                </span>
              )}
              <p className="text-sm font-semibold text-mist">{c.plan[plan]}</p>
              <p className="mt-1 font-display text-3xl font-bold text-brassInk">{subPrice(plan, lang)}</p>
              <p className="mt-1 text-xs text-mist">{c.perMonth.replace("{price}", pmText)}</p>
              <button
                onClick={() => void buy(plan)}
                disabled={!payUrl || busy !== null || waiting}
                className="mt-4 rounded-xl bg-gradient-to-br from-brass to-brass2 px-4 py-2.5 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50"
              >
                {busy === plan ? "…" : status?.active ? `${c.extend} ${c.plan[plan]}` : c.buy}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid max-w-3xl gap-2 text-xs leading-relaxed text-mist">
        <p>{c.noRenew}</p>
        {status?.email && <p>{c.payNote.replace("{email}", status.email)}</p>}
        <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">{c.legal}</p>
      </div>
    </div>
  );
}
