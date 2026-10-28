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

  // Referral codes are unique across both seafarers and companies. Resolved by
  // the referrer_by_code RPC, because a seafarer who hid their profile is not
  // readable from the seafarers table — their link must still count. The two
  // direct reads are the fallback for a database without that function yet.
  let referrerId: string | null = null;
  const { data: viaRpc, error: rpcError } = await supabase.rpc("referrer_by_code", { code });
  if (!rpcError) {
    referrerId = viaRpc ?? null;
  } else {
    const [{ data: seafarerReferrer }, { data: companyReferrer }] = await Promise.all([
      supabase.from("seafarers").select("id").eq("referral_code", code).maybeSingle(),
      supabase.from("companies").select("id").eq("referral_code", code).maybeSingle(),
    ]);
    referrerId = (seafarerReferrer ?? companyReferrer)?.id ?? null;
  }

  if (!referrerId || referrerId === referredUserId) return;

  await supabase.from("referrals").insert({ referrer_id: referrerId, referred_id: referredUserId });
}
