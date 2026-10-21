"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";

// Our own cookie banner — for visitors outside the EEA, the UK and Switzerland.
//
// There, Google's consent message (AdSense → Privacy & messaging) asks instead:
// a Google-certified TCF CMP, which AdSense requires for personalised ads, and
// which tells Analytics the answer through Consent Mode (components/
// GoogleScripts.tsx). Two prompts on one screen would be one too many, so this
// banner waits briefly for that CMP's TCF API and stays hidden wherever it
// says GDPR applies. Where it does not, or no CMP turns up, this banner shows.
//
// Its buttons are not decoration: Decline switches Analytics and ad storage
// off through Consent Mode now, and GoogleScripts reads the stored answer on
// every later page load.

const CONSENT_KEY = "cookie_consent";
/** How long to wait for Google's consent message before showing ours. */
const CMP_WAIT_MS = 8000;

type TcData = { gdprApplies?: boolean; listenerId?: number } | null;
type TcfApi = (command: string, version: number, callback: (data: TcData, success: boolean) => void, parameter?: unknown) => void;

declare global {
  interface Window {
    __tcfapi?: TcfApi;
    gtag?: (...args: unknown[]) => void;
  }
}

function setConsent(granted: boolean) {
  const v = granted ? "granted" : "denied";
  window.gtag?.("consent", "update", { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v });
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(CONSENT_KEY)) return;
    } catch {
      return;
    }
    let decided = false;
    const decide = (show: boolean) => {
      if (decided) return;
      decided = true;
      setVisible(show);
    };
    const started = Date.now();
    const timer = window.setInterval(() => {
      const tcf = window.__tcfapi;
      if (tcf) {
        window.clearInterval(timer);
        try {
          tcf("addEventListener", 2, (data, success) => {
            if (!success || !data || typeof data.gdprApplies !== "boolean") return;
            decide(!data.gdprApplies);
            if (data.listenerId !== undefined) tcf("removeEventListener", 2, () => {}, data.listenerId);
          });
        } catch {
          decide(true);
        }
        // A CMP that never answers must not leave the visitor without a banner.
        window.setTimeout(() => decide(true), CMP_WAIT_MS);
      } else if (Date.now() - started > CMP_WAIT_MS) {
        window.clearInterval(timer);
        decide(true);
      }
    }, 400);
    return () => window.clearInterval(timer);
  }, []);

  function accept() {
    try { localStorage.setItem(CONSENT_KEY, "accepted"); } catch {}
    setConsent(true);
    setVisible(false);
  }

  function decline() {
    try { localStorage.setItem(CONSENT_KEY, "declined"); } catch {}
    setConsent(false);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-deep/95 backdrop-blur-md px-5 py-4">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="flex-1 text-sm text-mist leading-relaxed">
          We use cookies for authentication,{" "}
          <span className="text-foam">Google Analytics</span> and advertising{" "}
          (<span className="text-foam">Google AdSense</span>) to run and improve the site.{" "}
          <Link href="/privacy" className="text-brassInk underline underline-offset-2 hover:text-brass transition">
            Privacy Policy
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="rounded-lg border border-white/15 px-4 py-2 text-sm text-mist transition hover:border-white/30 hover:text-white"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="rounded-lg bg-brass px-5 py-2 text-sm font-semibold text-[#061523] transition hover:bg-brass2"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
