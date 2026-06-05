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

