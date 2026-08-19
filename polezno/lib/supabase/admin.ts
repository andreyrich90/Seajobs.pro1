import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Service-role client for trusted server-side reads (Server Components, route
// handlers). Never import this into a "use client" file — the key must never
// reach the browser.
let cached: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

// Normalise the project URL to a bare origin. A trailing slash or a pasted
// path (…supabase.co/, …/rest/v1) makes PostgREST return
// "Invalid path specified in request URL", so we strip everything but the origin.
function cleanUrl(raw: string): string {
  try {
    return new URL(raw).origin;
  } catch {
    return raw.replace(/\/+$/, "");
  }
}

export function getServerSupabase(): SupabaseClient {
  if (cached) return cached;
  const url = cleanUrl(process.env.NEXT_PUBLIC_SUPABASE_URL!);
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
