import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client (service role). Use in Server Components / route
// handlers to read data at request time so it lands in the server-rendered HTML.
export function getServerSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
