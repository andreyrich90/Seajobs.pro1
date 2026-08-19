"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface RecipeRow {
  id: string;
  slug: string;
  category: string;
  is_pp: boolean;
  image: string | null;
  title: { ru?: string; en?: string };
}

const CATEGORIES = ["breakfast", "soup", "main", "salad", "dessert", "drink", "baking", "snack"];
const DIFFICULTIES = ["easy", "medium", "hard"];
const CAT_RU: Record<string, string> = {
  breakfast: "Завтраки", soup: "Супы", main: "Основные", salad: "Салаты",
  dessert: "Десерты", drink: "Напитки", baking: "Выпечка", snack: "Перекусы",
};

export default function AdminPage() {
  const [pass, setPass] = useState("");
  const [authed, setAuthed] = useState(false);
  const [recipes, setRecipes] = useState<RecipeRow[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const authFetch = useCallback(
    (url: string, opts: RequestInit = {}, token?: string) =>
      fetch(url, {
        ...opts,
        headers: { ...(opts.headers || {}), Authorization: `Bearer ${token ?? pass}` },
      }),
    [pass]
  );

  const load = useCallback(
    async (token?: string) => {
      setLoading(true);
      setError("");
      try {
        const res = await authFetch("/api/admin/recipes", {}, token);
        if (res.status === 401) {
          setError("Неверный пароль");
          setAuthed(false);
          return false;
        }
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          setError(j.error || "Ошибка загрузки");
          return false;
        }
        const j = await res.json();
        setRecipes(j.recipes || []);
        setAuthed(true);
        return true;
      } catch {
        setError("Сеть недоступна");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [authFetch]
  );

  useEffect(() => {
    const saved = sessionStorage.getItem("svezho-admin-pass");
    if (saved) {
      setPass(saved);
      load(saved);
    }
  }, [load]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const ok = await load(pass);
    if (ok) sessionStorage.setItem("svezho-admin-pass", pass);
  }

  function logout() {
    sessionStorage.removeItem("svezho-admin-pass");
    setAuthed(false);
    setPass("");
    setRecipes([]);
  }

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-5">
        <h1 className="font-display text-3xl font-bold text-basil">Свежо · админка</h1>
        <p className="mt-2 text-sm text-muted">Введите пароль администратора.</p>
        <form onSubmit={login} className="mt-5 flex flex-col gap-3">
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Пароль"
            className="rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-basil"
            autoFocus
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-clay px-4 py-3 font-bold text-white transition hover:bg-clay2 disabled:opacity-60"
          >
            {loading ? "Проверяю…" : "Войти"}
          </button>
          {error && <p className="text-sm font-semibold text-clay">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-basil">Рецепты</h1>
        <button onClick={logout} className="text-sm font-semibold text-muted hover:text-ink">
          Выйти
        </button>
      </div>

      <AddRecipe authFetch={authFetch} onAdded={() => load()} />

      {error && <p className="mb-4 text-sm font-semibold text-clay">{error}</p>}

      <div className="flex flex-col gap-3">
        {recipes.map((r) => (
          <RecipeItem key={r.id} recipe={r} authFetch={authFetch} onUpdated={() => load()} />
        ))}
        {recipes.length === 0 && !loading && (
          <p className="text-muted">Пока нет рецептов.</p>
        )}
      </div>
    </div>
  );
}

function RecipeItem({
  recipe,
  authFetch,
  onUpdated,
}: {
  recipe: RecipeRow;
  authFetch: (u: string, o?: RequestInit) => Promise<Response>;
  onUpdated: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [showUrl, setShowUrl] = useState(false);
  const [url, setUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const cover = recipe.image || `/img/recipes/${recipe.category}.svg`;

  async function saveUrl() {
    setBusy(true);
    setMsg("");
    try {
      const res = await authFetch("/api/admin/set-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: recipe.slug, imageUrl: url }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) setMsg(j.error || "Ошибка");
      else {
        setMsg("Ссылка сохранена ✓");
        setShowUrl(false);
        setUrl("");
        onUpdated();
      }
    } catch {
      setMsg("Сеть недоступна");
    } finally {
      setBusy(false);
    }
  }

  async function upload(file: File) {
    setBusy(true);
    setMsg("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("slug", recipe.slug);
      const res = await authFetch("/api/admin/upload", { method: "POST", body: fd });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg(j.hint || j.error || "Ошибка загрузки");
      } else {
        setMsg("Фото обновлено ✓");
        onUpdated();
      }
    } catch {
      setMsg("Сеть недоступна");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl2 border border-line bg-surface p-3">
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover} alt="" className="h-16 w-16 shrink-0 rounded-lg object-cover" />
        <div className="min-w-0 flex-1">
          <div className="truncate font-semibold text-ink">
            {recipe.title?.ru || recipe.slug}
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-xs text-muted">
            <span className="rounded bg-cream2 px-1.5 py-0.5">{CAT_RU[recipe.category] || recipe.category}</span>
            {recipe.is_pp && <span className="rounded bg-leaf/20 px-1.5 py-0.5 text-basil2">ПП</span>}
            <span className={recipe.image ? "text-leaf" : "text-clay"}>
              {recipe.image ? "фото есть" : "нет фото"}
            </span>
          </div>
          {msg && <div className="mt-1 text-xs font-semibold text-basil2">{msg}</div>}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) upload(f);
            e.target.value = "";
          }}
        />
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <button
            onClick={() => fileRef.current?.click()}
            disabled={busy}
            className="rounded-full bg-basil px-4 py-2 text-sm font-bold text-cream transition hover:bg-basil2 disabled:opacity-60"
          >
            {busy ? "…" : recipe.image ? "Заменить фото" : "Загрузить фото"}
          </button>
          <button
            onClick={() => setShowUrl((v) => !v)}
            className="text-xs font-semibold text-muted hover:text-ink"
          >
            🔗 вставить ссылку
          </button>
        </div>
      </div>

      {showUrl && (
        <div className="mt-3 flex gap-2">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://…/photo.jpg"
            className="min-w-0 flex-1 rounded-lg border border-line bg-cream2 px-3 py-2 text-sm outline-none focus:border-basil"
          />
          <button
            onClick={saveUrl}
            disabled={busy}
            className="shrink-0 rounded-lg bg-clay px-4 py-2 text-sm font-bold text-white transition hover:bg-clay2 disabled:opacity-60"
          >
            Сохранить
          </button>
        </div>
      )}
    </div>
  );
}

const EMPTY = {
  slug: "", category: "snack", isPp: false, minutes: "", calories: "", servings: "",
  difficulty: "easy",
  titleRu: "", titleEn: "", descRu: "", descEn: "",
  ingRu: "", ingEn: "", stepsRu: "", stepsEn: "", tagsRu: "", tagsEn: "",
};

function AddRecipe({
  authFetch,
  onAdded,
}: {
  authFetch: (u: string, o?: RequestInit) => Promise<Response>;
  onAdded: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ ...EMPTY });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const set = (k: keyof typeof EMPTY, v: any) => setF((s) => ({ ...s, [k]: v }));
  const lines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);
  const commas = (s: string) => s.split(",").map((x) => x.trim()).filter(Boolean);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    try {
      const payload = {
        slug: f.slug, category: f.category, isPp: f.isPp,
        minutes: Number(f.minutes), calories: Number(f.calories), servings: Number(f.servings),
        difficulty: f.difficulty,
        title: { ru: f.titleRu, en: f.titleEn },
        description: { ru: f.descRu, en: f.descEn },
        ingredients: { ru: lines(f.ingRu), en: lines(f.ingEn) },
        steps: { ru: lines(f.stepsRu), en: lines(f.stepsEn) },
        tags: { ru: commas(f.tagsRu), en: commas(f.tagsEn) },
      };
      const res = await authFetch("/api/admin/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg(j.error || "Ошибка");
      } else {
        setMsg("Рецепт сохранён ✓ — теперь загрузите фото ниже");
        setF({ ...EMPTY });
        onAdded();
      }
    } catch {
      setMsg("Сеть недоступна");
    } finally {
      setBusy(false);
    }
  }

  const inp = "w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-basil";
  const ta = inp + " min-h-[80px]";

  return (
    <div className="mb-6 rounded-xl2 border border-line bg-cream2 p-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between font-bold text-basil"
      >
        <span>＋ Добавить рецепт (без SQL)</span>
        <span className="text-muted">{open ? "свернуть" : ""}</span>
      </button>

      {open && (
        <form onSubmit={submit} className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="text-xs font-semibold text-muted">Название RU
            <input className={inp} value={f.titleRu} onChange={(e) => set("titleRu", e.target.value)} required />
          </label>
          <label className="text-xs font-semibold text-muted">Название EN
            <input className={inp} value={f.titleEn} onChange={(e) => set("titleEn", e.target.value)} required />
          </label>

          <label className="text-xs font-semibold text-muted">Slug (необязательно)
            <input className={inp} value={f.slug} onChange={(e) => set("slug", e.target.value)} placeholder="авто из EN-названия" />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs font-semibold text-muted">Категория
              <select className={inp} value={f.category} onChange={(e) => set("category", e.target.value)}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{CAT_RU[c]}</option>)}
              </select>
            </label>
            <label className="text-xs font-semibold text-muted">Сложность
              <select className={inp} value={f.difficulty} onChange={(e) => set("difficulty", e.target.value)}>
                {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <label className="text-xs font-semibold text-muted">Мин.
              <input type="number" className={inp} value={f.minutes} onChange={(e) => set("minutes", e.target.value)} />
            </label>
            <label className="text-xs font-semibold text-muted">Ккал
              <input type="number" className={inp} value={f.calories} onChange={(e) => set("calories", e.target.value)} />
            </label>
            <label className="text-xs font-semibold text-muted">Порц.
              <input type="number" className={inp} value={f.servings} onChange={(e) => set("servings", e.target.value)} />
            </label>
          </div>
          <label className="flex items-center gap-2 self-end text-sm font-semibold text-ink">
            <input type="checkbox" checked={f.isPp} onChange={(e) => set("isPp", e.target.checked)} /> ПП-блюдо
          </label>

          <label className="text-xs font-semibold text-muted sm:col-span-2">Описание RU
            <textarea className={ta} value={f.descRu} onChange={(e) => set("descRu", e.target.value)} />
          </label>
          <label className="text-xs font-semibold text-muted sm:col-span-2">Описание EN
            <textarea className={ta} value={f.descEn} onChange={(e) => set("descEn", e.target.value)} />
          </label>

          <label className="text-xs font-semibold text-muted">Ингредиенты RU (по строке)
            <textarea className={ta} value={f.ingRu} onChange={(e) => set("ingRu", e.target.value)} />
          </label>
          <label className="text-xs font-semibold text-muted">Ингредиенты EN (по строке)
            <textarea className={ta} value={f.ingEn} onChange={(e) => set("ingEn", e.target.value)} />
          </label>

          <label className="text-xs font-semibold text-muted">Шаги RU (по строке)
            <textarea className={ta} value={f.stepsRu} onChange={(e) => set("stepsRu", e.target.value)} />
          </label>
          <label className="text-xs font-semibold text-muted">Шаги EN (по строке)
            <textarea className={ta} value={f.stepsEn} onChange={(e) => set("stepsEn", e.target.value)} />
          </label>

          <label className="text-xs font-semibold text-muted">Теги RU (через запятую)
            <input className={inp} value={f.tagsRu} onChange={(e) => set("tagsRu", e.target.value)} />
          </label>
          <label className="text-xs font-semibold text-muted">Теги EN (через запятую)
            <input className={inp} value={f.tagsEn} onChange={(e) => set("tagsEn", e.target.value)} />
          </label>

          <div className="flex items-center gap-3 sm:col-span-2">
            <button type="submit" disabled={busy} className="rounded-full bg-clay px-5 py-2.5 font-bold text-white transition hover:bg-clay2 disabled:opacity-60">
              {busy ? "Сохраняю…" : "Сохранить рецепт"}
            </button>
            {msg && <span className="text-sm font-semibold text-basil2">{msg}</span>}
          </div>
        </form>
      )}
    </div>
  );
}
