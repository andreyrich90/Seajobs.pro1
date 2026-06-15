import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export type TypedSupabaseClient = SupabaseClient<Database>;

// Wrap fetch with an 8-second timeout so queries never hang indefinitely
function fetchWithTimeout(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  return fetch(input, { ...init, signal: controller.signal }).finally(() => clearTimeout(timer));
}

let _client: TypedSupabaseClient | null = null;

function getClient(): TypedSupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

    // Guard against missing env vars (e.g. a Vercel Preview deployment that
    // wasn't given the Supabase keys). createClient("", "") throws
    // "supabaseUrl is required" synchronously — and because the client is
    // first touched inside component effects, that throw white-screens the
    // whole app. Fall back to a placeholder so the UI still renders;
    // Supabase-backed requests then fail gracefully (handled by callers /
    // the fetch timeout) instead of crashing.
    if (!url || !key) {
      if (typeof console !== "undefined") {
        console.error(
          "[supabase] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set — " +
            "auth and data features are disabled for this deployment."
        );
      }
    }

    _client = createClient<Database>(
      url || "https://placeholder.supabase.co",
      key || "placeholder-anon-key",
      {
        auth: {
          // PKCE is more robust than the implicit flow on Safari / iPadOS,
          // where Intelligent Tracking Prevention can break hash-fragment
          // token delivery. The /auth/callback page relies on the automatic
          // ?code= exchange that detectSessionInUrl performs on load.
          flowType: "pkce",
          detectSessionInUrl: true,
          persistSession: true,
          autoRefreshToken: true,
        },
        global: { fetch: fetchWithTimeout as typeof fetch },
      }
    );
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

