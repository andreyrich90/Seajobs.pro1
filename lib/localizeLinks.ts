import type { SupabaseClient } from "@supabase/supabase-js";
import { routing } from "@/i18n/routing";
import { extractId } from "@/lib/slug";
import { guideLocales, guidePath } from "@/lib/guideUrls";

// Machine translation copies a body's links as they are, so an English
// article's /jobs/rank/master stays /jobs/rank/master in the Romanian text and
// a link to another guide keeps its English slug: the reader is sent out of
// their language at every link. This points each internal link at the target
// language — a page link gets the locale prefix, and a link to a guide or a
// handbook article gets that article's own URL in the language, or its English
// one when it has no text there, since that is then its canonical (see
// lib/guideUrls.ts).
//
// Images, files, the API, the auth screens and the tokenised CV pages are left
// alone: they live outside the [locale] tree.

/* eslint-disable @typescript-eslint/no-explicit-any */
type Db = SupabaseClient<any, any, any>;

const LINK = /(!?)\[([^\]]*)\]\((\/[^)\s]*)\)/g;
const LOCALE = new RegExp(`^/(?:${routing.locales.join("|")})(?=/|$)`);
const ARTICLE = /^\/(guides|handbook)\/([^/]+)$/;
const OUTSIDE = /^\/(api|auth|cv|_next)(\/|$)|\.[a-z0-9]{2,5}$/i;

const prefix = (lang: string) => (lang === routing.defaultLocale ? "" : `/${lang}`);

export async function localizeLinks(db: Db, md: string, lang: string): Promise<string> {
  const matches = [...md.matchAll(LINK)].filter((m) => !m[1]);
  if (!matches.length) return md;

  // Every guide/handbook article the body links to, looked up in one query.
  const ids = new Set<string>();
  for (const m of matches) {
    const path = m[3].split(/[?#]/)[0].replace(LOCALE, "") || "/";
    const a = path.match(ARTICLE);
    const id = a && extractId(a[2]);
    if (id) ids.add(id);
  }
  const articles = new Map<string, { title: unknown; body: unknown }>();
  if (ids.size) {
    const { data } = await db.from("news_articles").select("id, title, body").in("id", [...ids]);
    for (const row of data ?? []) articles.set(row.id, row);
  }

  return md.replace(LINK, (whole, bang: string, text: string, href: string) => {
    if (bang) return whole;
    const cut = href.search(/[?#]/);
    const tail = cut === -1 ? "" : href.slice(cut);
    const path = (cut === -1 ? href : href.slice(0, cut)).replace(LOCALE, "") || "/";
    if (OUTSIDE.test(path)) return whole;

    const a = path.match(ARTICLE);
    const id = a && extractId(a[2]);
    if (a && id) {
      const row = articles.get(id);
      if (!row) return whole; // a link to an article that is gone: leave it be
      const have = guideLocales(row.body as Record<string, string>);
      const target = have.includes(lang) ? lang : have.includes(routing.defaultLocale) ? routing.defaultLocale : have[0];
      const url = prefix(target) + guidePath(row.title as Record<string, string>, id, target, `/${a[1]}`);
      return `[${text}](${url}${tail})`;
    }

    const url = path === "/" ? prefix(lang) || "/" : prefix(lang) + path;
    return `[${text}](${url}${tail})`;
  });
}
