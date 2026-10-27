import { supabase } from "@/lib/supabase/client";

/**
 * Ask the server to drop a vacancy's cached page after an edit or a delete
 * (api/revalidate-vacancy). `titles` are the titles the page may be cached
 * under — the one before the change; the server adds the current one.
 * Fire and forget: a failure only means the page catches up within a day.
 */
export function purgeVacancy(id: string, titles: (string | null | undefined)[] = []): void {
  void (async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      await fetch("/api/revalidate-vacancy", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ id, titles: titles.filter(Boolean) }),
      });
    } catch { /* the daily refresh catches up */ }
  })();
}
