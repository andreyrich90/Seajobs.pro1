import { supabase } from "@/lib/supabase/client";

const REF_STORAGE_KEY = "pending_ref";

// Call on mount of the register/login pages to remember a "?ref=<code>" deep
// link across the signup flow (including the OAuth/email-confirmation
// round-trip through /auth/callback).
export function captureRefParam() {
  if (typeof window === "undefined") return;
  const code = new URLSearchParams(window.location.search).get("ref");
  if (code) localStorage.setItem(REF_STORAGE_KEY, code.trim().toUpperCase());
}

// Call once the new user has an authenticated session (right after their
// profile/seafarers row is created) to record the referral, if any.
export async function recordReferral(referredUserId: string) {
  if (typeof window === "undefined") return;
  const code = localStorage.getItem(REF_STORAGE_KEY);
  if (!code) return;
  localStorage.removeItem(REF_STORAGE_KEY);

  const { data: referrer } = await supabase
    .from("seafarers")
    .select("id")
    .eq("referral_code", code)
    .maybeSingle();

  if (!referrer || referrer.id === referredUserId) return;

  await supabase.from("referrals").insert({ referrer_id: referrer.id, referred_id: referredUserId });
}
