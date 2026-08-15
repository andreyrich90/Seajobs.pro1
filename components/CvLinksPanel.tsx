"use client";

import { useCallback, useEffect, useState } from "react";
import { Link2, Eye, Ban } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useLang } from "@/components/LangProvider";
import { T } from "@/lib/i18n";

// The CV links a seafarer handed out when they wrote to an agency from their own
// mailbox.
//
// A link is a bearer credential for a document holding a passport number and
// visas, so being able to withdraw one is not a nicety — it is the reason the
// links are tokenised per application rather than being one permanent URL.
// `opened_at` is the only feedback this flow can give back: we never learn
// whether the letter was sent, but we do know when the agency opened the CV.

type CvLink = {
  token: string;
  sent_to: string | null;
  created_at: string;
  expires_at: string;
  revoked_at: string | null;
  opened_at: string | null;
  opened_count: number;
};

export default function CvLinksPanel({ seafarerId }: { seafarerId: string }) {
  const { lang } = useLang();
  const t = T[lang];
  const [links, setLinks] = useState<CvLink[]>([]);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("cv_share_tokens")
      .select("token, sent_to, created_at, expires_at, revoked_at, opened_at, opened_count")
      .eq("seafarer_id", seafarerId)
      .order("created_at", { ascending: false })
      .limit(25);
    setLinks((data ?? []) as CvLink[]);
  }, [seafarerId]);

  useEffect(() => { load(); }, [load]);

  async function revoke(token: string) {
    if (busy) return;
    setBusy(token);
    await supabase
      .from("cv_share_tokens")
      .update({ revoked_at: new Date().toISOString() })
      .eq("token", token);
    await load();
    setBusy(null);
  }

  // Nothing shared yet is the normal state — say nothing rather than showing an
  // empty panel on a page that is about applications.
  if (links.length === 0) return null;

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === "en" ? "en-GB" : lang === "ua" ? "uk-UA" : `${lang}-${lang.toUpperCase()}`, {
      day: "numeric", month: "short",
    });

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-card p-5 sm:p-6">
      <div className="mb-1 flex items-center gap-2">
        <Link2 size={15} className="shrink-0 text-brassInk" />
        <h2 className="font-semibold text-white">{t.cvlinks_title}</h2>
      </div>
      <p className="mb-4 text-xs leading-relaxed text-mist">{t.cvlinks_lead}</p>

      <ul className="flex flex-col gap-2">
        {links.map((l) => {
          const dead = !!l.revoked_at || new Date(l.expires_at) < new Date();
          return (
            <li
              key={l.token}
              className={`flex flex-col gap-2 rounded-xl border p-3 sm:flex-row sm:items-center sm:justify-between ${
                dead ? "border-white/10 bg-white/[0.02]" : "border-teal/25 bg-teal/5"
              }`}
            >
              <div className="min-w-0">
                <p className={`truncate text-sm font-semibold ${dead ? "text-mist" : "text-white"}`}>
                  {l.sent_to || t.cvlinks_no_recipient}
                </p>
                <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-mist">
                  <span>
                    {l.revoked_at
                      ? t.cvlinks_revoked
                      : new Date(l.expires_at) < new Date()
                      ? t.cvlinks_expired
                      : `${t.cvlinks_until} ${fmt(l.expires_at)}`}
                  </span>
                  {l.opened_count > 0 && (
                    <span className="inline-flex items-center gap-1 text-teal">
                      <Eye size={11} /> {t.cvlinks_opened} {l.opened_count}×
                    </span>
                  )}
                </p>
              </div>

              {!dead && (
                <button
                  onClick={() => revoke(l.token)}
                  disabled={busy === l.token}
                  className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-coral/30 bg-coral/10 px-4 py-2 text-xs font-bold text-coral transition hover:bg-coral/20 disabled:opacity-50"
                >
                  <Ban size={13} /> {busy === l.token ? "…" : t.cvlinks_revoke}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
