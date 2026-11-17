"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabase/client";
import { CONSENT_VERSION } from "@/lib/consent";

// The consent banner on every localized page, for signed-in readers only.
//
// This wrapper is all an anonymous visitor's browser loads: it reads the
// local session and, only when there is one that has not already confirmed
// this version, pulls in the banner with its five languages of copy. The
// banner itself stays out of the cabinets, which carry their own.

const ConsentBanner = dynamic(() => import("@/components/ConsentBanner"), { ssr: false });

export default function SiteConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let alive = true;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!alive || !session) return;
      try {
        if (localStorage.getItem("consent_ok") === `${session.user.id}:${CONSENT_VERSION}`
          && !localStorage.getItem("pending_consent")) return;
      } catch { /* storage blocked: ask the server */ }
      setShow(true);
    }).catch(() => {});
    return () => { alive = false; };
  }, []);

  return show ? <ConsentBanner variant="site" /> : null;
}
