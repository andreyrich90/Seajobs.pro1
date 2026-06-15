import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export type TypedSupabaseClient = SupabaseClient<Database>;

// Wrap fetch with a timeout so queries never hang indefinitely. Auth requests
// (e.g. validating the access token from an OAuth redirect on the
// /auth/callback page) get a longer allowance — aborting them too eagerly on
// a slow connection makes the GoTrueClient discard a valid session and bounce
// the user back to the login page.
function fetchWithTimeout(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  const timeoutMs = url.includes("/auth/v1/") ? 20000 : 8000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(input, { ...init, signal: controller.signal }).finally(() => clearTimeout(timer));
}

let _client: TypedSupabaseClient | null = null;

function getClient(): TypedSupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
    _client = createClient<Database>(url, key, {
      global: { fetch: fetchWithTimeout as typeof fetch },
    });
  }
  return _client;
}

// Proxy object so `import { supabase }` still works
export const supabase = new Proxy({} as TypedSupabaseClient, {
  get(_target, prop) {
    return getClient()[prop as keyof TypedSupabaseClient];
  },
});

// Fire-and-forget POST to /api/notify, authenticated with the user's token.
export async function notify(payload: Record<string, unknown>): Promise<void> {
  try {
    const { data: { session } } = await getClient().auth.getSession();
    if (!session) return;
    await fetch("/api/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(payload),
    });
  } catch {
    // notifications are best-effort
  }
}

