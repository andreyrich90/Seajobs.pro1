import type { Lang } from "./langs";

/** Build a locale-prefixed path, e.g. href("ru", "/recipes") -> "/ru/recipes". */
export function href(lang: Lang, path = "/"): string {
  const clean = path === "/" ? "" : path;
  return `/${lang}${clean}`;
}
