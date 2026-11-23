"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { supabase } from "@/lib/supabase/client";
import { useLang } from "@/components/LangProvider";
import { partnerCopy } from "@/lib/partnerCopy";

// The invitation to become a SeaJobs Partner, in the company cabinet
// (lib/partners.ts). Two forms:
//
//   variant="modal"  — a window, once per browser session, mounted by
//                      CompanyShell so it greets the company on entering;
//   variant="banner" — a strip above the vacancy form.
//
// Both show only to a company that is not verified and has nothing waiting
// for review (never asked, or rejected). Voluntary by the owner's choice:
// "Later" closes it and nothing is locked.

const LATER_KEY = "partner_invite_later";

export default function PartnerInvite({ variant }: { variant: "modal" | "banner" }) {
  const { lang } = useLang();
  const pathname = usePathname() ?? "";
  const c = partnerCopy(lang);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (pathname.endsWith("/company/verification")) return;
    if (variant === "modal") {
      try { if (sessionStorage.getItem(LATER_KEY)) return; } catch { /* storage blocked */ }
    }
    let alive = true;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const res = await fetch("/api/company/verification", { headers: { Authorization: `Bearer ${session.access_token}` } }).catch(() => null);
      if (!res?.ok || !alive) return;
      const j = (await res.json()) as { verified?: boolean; last?: { status: string } | null; unavailable?: boolean };
      if (j.unavailable || j.verified || j.last?.status === "pending") return;
      setShow(true);
    })();
    return () => { alive = false; };
  }, [variant, pathname]);

  if (!show || pathname.endsWith("/company/verification")) return null;

  function later() {
    try { sessionStorage.setItem(LATER_KEY, "1"); } catch { /* storage blocked */ }
    setShow(false);
  }

  if (variant === "banner") {
    return (
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-teal/30 bg-teal/10 px-4 py-3 text-sm text-foam">
        <ShieldCheck size={18} className="shrink-0 text-teal" />
        <span className="min-w-0 flex-1">{c.banner}</span>
        <Link href="/company/verification" className="shrink-0 font-bold text-brassInk hover:underline">
          {c.bannerCta} →
        </Link>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-3 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="partner-title">
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-brass/40 bg-card p-6 shadow-2xl">
        <button type="button" onClick={later} aria-label={c.later} className="absolute right-3 top-3 rounded-lg p-1 text-mist hover:text-white">
          <X size={18} />
        </button>
        <p id="partner-title" className="flex items-center gap-2 pr-8 font-display text-xl font-semibold text-white">
          <ShieldCheck size={22} className="shrink-0 text-teal" /> {c.modalTitle}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-foam">{c.modalBody}</p>
        <p className="mt-4 text-sm font-semibold text-white">{c.whatTitle}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-foam">
          {c.what.map((w) => <li key={w}>{w}</li>)}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-mist">{c.privacy}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/company/verification"
            onClick={later}
            className="inline-flex min-h-[44px] items-center rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 text-sm font-bold text-[#061523]"
          >
            {c.upload}
          </Link>
          <button type="button" onClick={later}
            className="min-h-[44px] rounded-xl border border-white/15 px-5 text-sm font-semibold text-foam transition hover:bg-white/5">
            {c.later}
          </button>
        </div>
      </div>
    </div>
  );
}
