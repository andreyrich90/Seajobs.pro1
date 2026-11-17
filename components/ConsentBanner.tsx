"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ShieldCheck, X } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useLang } from "@/components/LangProvider";
import {
  CONSENT_CONFIRMED_EVENT, CONSENT_VERSION, clearPendingConsent, readPendingConsent, type ConsentKind,
} from "@/lib/consent";
import { consentCopy } from "@/lib/consentCopy";
import ConsentText from "@/components/ConsentText";

// The consent banner (lib/consent.ts), in two places:
//
//   variant="cabinet" — at the top of both cabinet shells;
//   variant="site"    — a card fixed to the bottom of every other localized
//                       page, for a signed-in reader who does not open the
//                       cabinet. It stays out of the cabinets (they have their
//                       own) and waits until the cookie banner is answered, so
//                       the two never sit on top of each other.
//
// First it sends the boxes ticked on the registration form, if any wait in
// this browser. Then it asks api/consent what is still missing under the
// current version and shows those boxes. A soft ask by the owner's choice:
// "Later" hides it for this browser session and nothing is locked; it comes
// back on the next visit until confirmed. Confirming removes the bell
// notification on the server and tells every banner and the bell on the page
// (CONSENT_CONFIRMED_EVENT), so all of them disappear at once.
//
// An account known to have confirmed this version is remembered in
// localStorage, so a signed-in reader browsing public pages does not cost an
// API call per page load once the question is settled.

const DISMISS_KEY = "consent_banner_later";
const OK_KEY = "consent_ok";
const COOKIE_KEY = "cookie_consent";
export const COOKIE_CHOICE_EVENT = "seajobs:cookie-choice";

const CABINET_PATH = /^(\/(ru|ua|pl|ro))?\/(seafarer|company|admin)(\/|$)/;

function rememberOk(userId: string) {
  try { localStorage.setItem(OK_KEY, `${userId}:${CONSENT_VERSION}`); } catch { /* storage blocked */ }
}

export default function ConsentBanner({ variant = "cabinet" }: { variant?: "cabinet" | "site" }) {
  const { lang } = useLang();
  const pathname = usePathname() ?? "";
  const c = consentCopy(lang);
  const [missing, setMissing] = useState<ConsentKind[]>([]);
  const [ticked, setTicked] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [cookieAnswered, setCookieAnswered] = useState(variant === "cabinet");

  const offPage = variant === "site" && CABINET_PATH.test(pathname);

  useEffect(() => {
    if (offPage) return;
    let alive = true;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const userId = session.user.id;
      const auth = { Authorization: `Bearer ${session.access_token}` };

      const pending = readPendingConsent();
      if (pending) {
        const res = await fetch("/api/consent", {
          method: "POST",
          headers: { "Content-Type": "application/json", ...auth },
          body: JSON.stringify({ kinds: pending.kinds, source: "register", locale: lang }),
        }).catch(() => null);
        // Kept on failure, so the next visit tries again.
        if (res?.ok) clearPendingConsent();
      }

      try {
        if (!pending && localStorage.getItem(OK_KEY) === `${userId}:${CONSENT_VERSION}`) return;
        if (sessionStorage.getItem(DISMISS_KEY)) setHidden(true);
      } catch { /* storage blocked */ }

      const res = await fetch("/api/consent", { headers: auth }).catch(() => null);
      if (!res?.ok || !alive) return;
      const j = (await res.json()) as { missing?: ConsentKind[]; role?: string | null; unavailable?: boolean };
      const m = j.missing ?? [];
      setMissing(m);
      if (!m.length && j.role && !j.unavailable) rememberOk(userId);
    })();
    return () => { alive = false; };
  }, [lang, offPage]);

  // Another banner on the page confirmed: this one has nothing left to ask.
  useEffect(() => {
    const onConfirmed = () => setMissing([]);
    window.addEventListener(CONSENT_CONFIRMED_EVENT, onConfirmed);
    return () => window.removeEventListener(CONSENT_CONFIRMED_EVENT, onConfirmed);
  }, []);

  useEffect(() => {
    if (variant !== "site") return;
    const check = () => {
      try { setCookieAnswered(!!localStorage.getItem(COOKIE_KEY)); } catch { setCookieAnswered(true); }
    };
    check();
    window.addEventListener(COOKIE_CHOICE_EVENT, check);
    return () => window.removeEventListener(COOKIE_CHOICE_EVENT, check);
  }, [variant]);

  if (offPage) return null;

  const box = variant === "site"
    ? "fixed inset-x-3 bottom-3 z-40 mx-auto max-h-[80vh] max-w-2xl overflow-y-auto rounded-2xl border border-brass/50 bg-card p-5 shadow-2xl"
    : "relative mx-4 mt-4 rounded-2xl border border-brass/40 bg-card p-5 md:mx-8";

  if (done) {
    return (
      <div className={`${box} flex items-center gap-2 text-sm text-foam`} role="status">
        <ShieldCheck size={16} className="text-teal" /> {c.thanks}
      </div>
    );
  }
  if (!missing.length || hidden || !cookieAnswered) return null;

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
        body: JSON.stringify({ kinds: missing, source: variant === "site" ? "site_banner" : "banner", locale: lang }),
      });
      if (!res.ok) throw new Error(String(res.status));
      rememberOk(session.user.id);
      window.dispatchEvent(new Event(CONSENT_CONFIRMED_EVENT));
      setDone(true);
      setTimeout(() => setDone(false), 4000);
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
    <section aria-labelledby={`consent-title-${variant}`} className={box}>
      <button
        type="button"
        onClick={later}
        aria-label={c.later}
        className="absolute right-3 top-3 rounded-lg p-1 text-mist transition hover:text-white"
      >
        <X size={18} />
      </button>
      <p id={`consent-title-${variant}`} className="flex items-center gap-2 pr-8 font-semibold text-white">
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
