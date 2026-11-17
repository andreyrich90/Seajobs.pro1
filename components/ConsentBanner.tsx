"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, X } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useLang } from "@/components/LangProvider";
import { clearPendingConsent, readPendingConsent, type ConsentKind } from "@/lib/consent";
import { consentCopy } from "@/lib/consentCopy";
import ConsentText from "@/components/ConsentText";

// The consent banner at the top of both cabinets (lib/consent.ts).
//
// First it sends the boxes ticked on the registration form, if any wait in
// this browser. Then it asks api/consent what is still missing under the
// current version and, if anything is, shows those boxes. It is a soft ask by
// the owner's choice: "Later" hides it for this browser session and nothing in
// the cabinet is locked. It shows again on the next visit until confirmed.

const DISMISS_KEY = "consent_banner_later";

export default function ConsentBanner() {
  const { lang } = useLang();
  const c = consentCopy(lang);
  const [missing, setMissing] = useState<ConsentKind[]>([]);
  const [ticked, setTicked] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const auth = { Authorization: `Bearer ${session.access_token}` };

      const pending = readPendingConsent();
      if (pending) {
        const res = await fetch("/api/consent", {
          method: "POST",
          headers: { "Content-Type": "application/json", ...auth },
          body: JSON.stringify({ kinds: pending.kinds, source: "register", locale: lang }),
        }).catch(() => null);
        // Kept on failure, so the next cabinet visit tries again.
        if (res?.ok) clearPendingConsent();
      }

      try {
        if (sessionStorage.getItem(DISMISS_KEY)) setHidden(true);
      } catch { /* storage blocked */ }

      const res = await fetch("/api/consent", { headers: auth }).catch(() => null);
      if (!res?.ok || !alive) return;
      const j = (await res.json()) as { missing?: ConsentKind[] };
      setMissing(j.missing ?? []);
    })();
    return () => { alive = false; };
  }, [lang]);

  if (done) {
    return (
      <div className="mx-4 mt-4 flex items-center gap-2 rounded-2xl border border-teal/30 bg-teal/10 px-4 py-3 text-sm text-foam md:mx-8">
        <ShieldCheck size={16} className="text-teal" /> {c.thanks}
      </div>
    );
  }
  if (!missing.length || hidden) return null;

  const all = missing.every((k) => ticked[k]);

  async function confirm() {
    setBusy(true);
    setFailed(false);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("no session");
      const res = await fetch("/api/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ kinds: missing, source: "banner", locale: lang }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setDone(true);
      setTimeout(() => { setDone(false); setMissing([]); }, 4000);
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  function later() {
    try { sessionStorage.setItem(DISMISS_KEY, "1"); } catch { /* storage blocked */ }
    setHidden(true);
  }

  return (
    <section
      aria-labelledby="consent-title"
      className="relative mx-4 mt-4 rounded-2xl border border-brass/40 bg-card p-5 md:mx-8"
    >
      <button
        type="button"
        onClick={later}
        aria-label={c.later}
        className="absolute right-3 top-3 rounded-lg p-1 text-mist transition hover:text-white"
      >
        <X size={18} />
      </button>
      <p id="consent-title" className="flex items-center gap-2 pr-8 font-semibold text-white">
        <ShieldCheck size={18} className="shrink-0 text-brassInk" /> {c.bannerTitle}
      </p>
      <p className="mt-1 text-sm text-mist">{c.bannerBody}</p>
      <div className="mt-4 flex flex-col gap-3">
        {missing.map((k) => (
          <label key={k} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-foam">
            <input
              type="checkbox"
              checked={!!ticked[k]}
              onChange={(e) => setTicked((x) => ({ ...x, [k]: e.target.checked }))}
              className="mt-1 h-4 w-4 shrink-0 accent-[#c9a227]"
            />
            <span><ConsentText text={c.boxes[k]} lang={lang} /></span>
          </label>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => void confirm()}
          disabled={!all || busy}
          className="min-h-[44px] rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 text-sm font-bold text-[#061523] transition disabled:opacity-40"
        >
          {busy ? "…" : c.confirm}
        </button>
        <button
          type="button"
          onClick={later}
          className="min-h-[44px] rounded-xl border border-white/15 px-5 text-sm font-semibold text-foam transition hover:bg-white/5"
        >
          {c.later}
        </button>
        {failed && <span className="text-sm text-coral">{c.failed}</span>}
      </div>
    </section>
  );
}
