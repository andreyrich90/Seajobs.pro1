"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { COLLECTIONS } from "@/lib/collections";

interface RecipeRow {
  id: string;
  slug: string;
  category: string;
  is_pp: boolean;
  image: string | null;
  title: { ru?: string; en?: string };
  gallery?: string[];
}

const CATEGORIES = ["breakfast", "soup", "main", "salad", "dessert", "drink", "baking", "snack"];
const DIFFICULTIES = ["easy", "medium", "hard"];
const CAT_RU: Record<string, string> = {
  breakfast: "Завтраки", soup: "Супы", main: "Основные", salad: "Салаты",
  dessert: "Десерты", drink: "Напитки", baking: "Выпечка", snack: "Перекусы",
};

type AuthFetch = (u: string, o?: RequestInit) => Promise<Response>;

// ---- form value shape (all strings; arrays edited as newline / comma text) ----
interface FormValues {
  slug: string; category: string; isPp: boolean;
  minutes: string; calories: string; servings: string; difficulty: string;
  titleRu: string; titleEn: string; descRu: string; descEn: string;
  ingRu: string; ingEn: string; stepsRu: string; stepsEn: string;
  tagsRu: string; tagsEn: string;
}

const EMPTY: FormValues = {
  slug: "", category: "snack", isPp: false, minutes: "", calories: "", servings: "",
  difficulty: "easy",
  titleRu: "", titleEn: "", descRu: "", descEn: "",
  ingRu: "", ingEn: "", stepsRu: "", stepsEn: "", tagsRu: "", tagsEn: "",
};

const lines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);
const commas = (s: string) => s.split(/[,\n]/).map((x) => x.trim()).filter(Boolean);
const joinLines = (a?: string[]) => (a || []).join("\n");
const joinCommas = (a?: string[]) => (a || []).join(", ");

// Full recipe (from GET or the AI parser) -> editable form values.
function toForm(r: any): FormValues {
  return {
    slug: r.slug || "",
    category: r.category || "snack",
    isPp: Boolean(r.is_pp ?? r.isPp),
    minutes: r.minutes != null ? String(r.minutes) : "",
    calories: r.calories != null ? String(r.calories) : "",
    servings: r.servings != null ? String(r.servings) : "",
    difficulty: r.difficulty || "easy",
    titleRu: r.title?.ru || "", titleEn: r.title?.en || "",
    descRu: r.description?.ru || "", descEn: r.description?.en || "",
    ingRu: joinLines(r.ingredients?.ru), ingEn: joinLines(r.ingredients?.en),
    stepsRu: joinLines(r.steps?.ru), stepsEn: joinLines(r.steps?.en),
    tagsRu: joinCommas(r.tags?.ru), tagsEn: joinCommas(r.tags?.en),
  };
}

// Form values -> POST /api/admin/recipe payload.
function fromForm(f: FormValues) {
  return {
    slug: f.slug, category: f.category, isPp: f.isPp,
    minutes: Number(f.minutes), calories: Number(f.calories), servings: Number(f.servings),
    difficulty: f.difficulty,
    title: { ru: f.titleRu, en: f.titleEn },
    description: { ru: f.descRu, en: f.descEn },
    ingredients: { ru: lines(f.ingRu), en: lines(f.ingEn) },
    steps: { ru: lines(f.stepsRu), en: lines(f.stepsEn) },
    tags: { ru: commas(f.tagsRu), en: commas(f.tagsEn) },
  };
}

export default function AdminPage() {
  const [pass, setPass] = useState("");
  const [authed, setAuthed] = useState(false);
  const [recipes, setRecipes] = useState<RecipeRow[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const authFetch = useCallback<AuthFetch>(
    (url, opts = {}) =>
      fetch(url, {
        ...opts,
        headers: { ...(opts.headers || {}), Authorization: `Bearer ${pass}` },
      }),
    [pass]
  );

  const load = useCallback(
    async (token?: string) => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/admin/recipes", {
          headers: { Authorization: `Bearer ${token ?? pass}` },
        });
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
    [pass]
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
        <h1 className="font-display text-3xl font-bold text-basil">Recepto · админка</h1>
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

      <AiImport authFetch={authFetch} onSaved={() => load()} />

      <CollectionCovers authFetch={authFetch} />

      <AddRecipe authFetch={authFetch} onAdded={() => load()} />

      {error && <p className="mb-4 text-sm font-semibold text-clay">{error}</p>}

      <div className="mb-3 text-sm font-semibold text-muted">
        Всего рецептов: {recipes.length}
      </div>
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

// ------------------------- shared recipe form -------------------------
const inp = "w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-basil";
const ta = inp + " min-h-[80px]";

function RecipeForm({
  value,
  onChange,
  slugEditable = true,
}: {
  value: FormValues;
  onChange: (v: FormValues) => void;
  slugEditable?: boolean;
}) {
  const set = (k: keyof FormValues, v: any) => onChange({ ...value, [k]: v });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <label className="text-xs font-semibold text-muted">Название RU
        <input className={inp} value={value.titleRu} onChange={(e) => set("titleRu", e.target.value)} />
      </label>
      <label className="text-xs font-semibold text-muted">Название EN
        <input className={inp} value={value.titleEn} onChange={(e) => set("titleEn", e.target.value)} />
      </label>

      {slugEditable ? (
        <label className="text-xs font-semibold text-muted">Slug (необязательно)
          <input className={inp} value={value.slug} onChange={(e) => set("slug", e.target.value)} placeholder="авто из EN-названия" />
        </label>
      ) : (
        <label className="text-xs font-semibold text-muted">Slug (не меняется)
          <input className={inp + " opacity-60"} value={value.slug} readOnly />
        </label>
      )}
      <div className="grid grid-cols-2 gap-3">
        <label className="text-xs font-semibold text-muted">Категория
          <select className={inp} value={value.category} onChange={(e) => set("category", e.target.value)}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{CAT_RU[c]}</option>)}
          </select>
        </label>
        <label className="text-xs font-semibold text-muted">Сложность
          <select className={inp} value={value.difficulty} onChange={(e) => set("difficulty", e.target.value)}>
            {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <label className="text-xs font-semibold text-muted">Мин.
          <input type="number" className={inp} value={value.minutes} onChange={(e) => set("minutes", e.target.value)} />
        </label>
        <label className="text-xs font-semibold text-muted">Ккал
          <input type="number" className={inp} value={value.calories} onChange={(e) => set("calories", e.target.value)} />
        </label>
        <label className="text-xs font-semibold text-muted">Порц.
          <input type="number" className={inp} value={value.servings} onChange={(e) => set("servings", e.target.value)} />
        </label>
      </div>
      <label className="flex items-center gap-2 self-end text-sm font-semibold text-ink">
        <input type="checkbox" checked={value.isPp} onChange={(e) => set("isPp", e.target.checked)} /> ПП-блюдо
      </label>

      <label className="text-xs font-semibold text-muted sm:col-span-2">Описание RU
        <textarea className={ta} value={value.descRu} onChange={(e) => set("descRu", e.target.value)} />
      </label>
      <label className="text-xs font-semibold text-muted sm:col-span-2">Описание EN
        <textarea className={ta} value={value.descEn} onChange={(e) => set("descEn", e.target.value)} />
      </label>

      <label className="text-xs font-semibold text-muted">Ингредиенты RU (по строке)
        <textarea className={ta} value={value.ingRu} onChange={(e) => set("ingRu", e.target.value)} />
      </label>
      <label className="text-xs font-semibold text-muted">Ингредиенты EN (по строке)
        <textarea className={ta} value={value.ingEn} onChange={(e) => set("ingEn", e.target.value)} />
      </label>

      <label className="text-xs font-semibold text-muted">Шаги RU (по строке)
        <textarea className={ta} value={value.stepsRu} onChange={(e) => set("stepsRu", e.target.value)} />
      </label>
      <label className="text-xs font-semibold text-muted">Шаги EN (по строке)
        <textarea className={ta} value={value.stepsEn} onChange={(e) => set("stepsEn", e.target.value)} />
      </label>

      <label className="text-xs font-semibold text-muted">Теги RU (через запятую)
        <input className={inp} value={value.tagsRu} onChange={(e) => set("tagsRu", e.target.value)} />
      </label>
      <label className="text-xs font-semibold text-muted">Теги EN (через запятую)
        <input className={inp} value={value.tagsEn} onChange={(e) => set("tagsEn", e.target.value)} />
      </label>
    </div>
  );
}

async function saveRecipe(authFetch: AuthFetch, f: FormValues): Promise<{ ok: boolean; slug?: string; error?: string }> {
  if (!f.titleRu || !f.titleEn) return { ok: false, error: "Заполните название RU и EN" };
  try {
    const res = await authFetch("/api/admin/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fromForm(f)),
    });
    const j = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: j.error || "Ошибка" };
    return { ok: true, slug: j.slug };
  } catch {
    return { ok: false, error: "Сеть недоступна" };
  }
}

async function uploadCover(authFetch: AuthFetch, slug: string, file: File): Promise<string | null> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("slug", slug);
  const res = await authFetch("/api/admin/upload", { method: "POST", body: fd });
  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    return j.hint || j.error || "Ошибка загрузки фото";
  }
  return null;
}

// ------------------------- AI: photo -> recipe -------------------------
interface AiCard {
  id: number;
  form: FormValues;
  coverFile: File | null;
  coverUrl: string | null; // object URL for preview
  saving: boolean;
  saved: boolean;
  msg: string;
}

let aiCardSeq = 1;

function AiImport({ authFetch, onSaved }: { authFetch: AuthFetch; onSaved: () => void }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [cards, setCards] = useState<AiCard[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  async function parse(files: FileList) {
    setBusy(true);
    setMsg("Читаю фото и составляю рецепты… это занимает 10–30 секунд.");
    try {
      const fd = new FormData();
      const arr = Array.from(files);
      arr.forEach((f) => fd.append("files", f));
      const res = await authFetch("/api/admin/parse-recipe-image", { method: "POST", body: fd });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg(j.hint || j.detail || j.error || "Не удалось распознать");
        return;
      }
      const parsed: any[] = j.recipes || [];
      // Map a cover photo to each recipe when the counts line up 1:1.
      const oneToOne = parsed.length === arr.length;
      const next: AiCard[] = parsed.map((r, i) => {
        const file = oneToOne ? arr[i] : null;
        return {
          id: aiCardSeq++,
          form: toForm(r),
          coverFile: file,
          coverUrl: file ? URL.createObjectURL(file) : null,
          saving: false,
          saved: false,
          msg: "",
        };
      });
      setCards((c) => [...next, ...c]);
      setMsg(
        `Готово: ${parsed.length} рецепт(ов). Проверьте и сохраните.` +
          (oneToOne ? "" : " Фото-обложки добавьте вручную в карточках.")
      );
    } catch {
      setMsg("Сеть недоступна");
    } finally {
      setBusy(false);
    }
  }

  function patch(id: number, p: Partial<AiCard>) {
    setCards((cs) => cs.map((c) => (c.id === id ? { ...c, ...p } : c)));
  }

  async function saveCard(card: AiCard) {
    patch(card.id, { saving: true, msg: "" });
    const r = await saveRecipe(authFetch, card.form);
    if (!r.ok || !r.slug) {
      patch(card.id, { saving: false, msg: r.error || "Ошибка" });
      return;
    }
    if (card.coverFile) {
      const err = await uploadCover(authFetch, r.slug, card.coverFile);
      if (err) {
        patch(card.id, { saving: false, saved: true, msg: "Рецепт сохранён, но фото: " + err });
        onSaved();
        return;
      }
    }
    patch(card.id, { saving: false, saved: true, msg: "Сохранено ✓" });
    onSaved();
  }

  async function saveAll() {
    for (const c of cards) {
      if (!c.saved) await saveCard(c);
    }
  }

  function pickCover(id: number, file: File) {
    const c = cards.find((x) => x.id === id);
    if (c?.coverUrl) URL.revokeObjectURL(c.coverUrl);
    patch(id, { coverFile: file, coverUrl: URL.createObjectURL(file) });
  }

  function removeCard(id: number) {
    const c = cards.find((x) => x.id === id);
    if (c?.coverUrl) URL.revokeObjectURL(c.coverUrl);
    setCards((cs) => cs.filter((x) => x.id !== id));
  }

  const pending = cards.filter((c) => !c.saved).length;

  return (
    <div className="mb-6 rounded-xl2 border-2 border-brass/40 bg-brass/5 p-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between font-bold text-basil"
      >
        <span>🤖 AI: рецепт из фото</span>
        <span className="text-muted">{open ? "свернуть" : ""}</span>
      </button>

      {open && (
        <div className="mt-4">
          <p className="mb-3 text-sm text-muted">
            Загрузите одно или несколько фото блюд (можно инфографику с текстом).
            Claude сам напишет уникальное описание, ингредиенты и шаги на русском и
            английском. Затем проверьте и сохраните. Если фото 1-в-1 с рецептами,
            оно сразу станет обложкой.
          </p>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) parse(e.target.files);
              e.target.value = "";
            }}
          />
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => fileRef.current?.click()}
              disabled={busy}
              className="rounded-full bg-brass px-5 py-2.5 font-bold text-ink transition hover:brightness-95 disabled:opacity-60"
            >
              {busy ? "Обрабатываю…" : "＋ Загрузить фото"}
            </button>
            {pending > 1 && (
              <button
                onClick={saveAll}
                className="rounded-full bg-clay px-5 py-2.5 font-bold text-white transition hover:bg-clay2"
              >
                Сохранить все ({pending})
              </button>
            )}
            {msg && <span className="text-sm font-semibold text-basil2">{msg}</span>}
          </div>

          <div className="mt-4 flex flex-col gap-4">
            {cards.map((card) => (
              <AiRecipeCard
                key={card.id}
                card={card}
                onChange={(form) => patch(card.id, { form })}
                onPickCover={(f) => pickCover(card.id, f)}
                onSave={() => saveCard(card)}
                onRemove={() => removeCard(card.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AiRecipeCard({
  card,
  onChange,
  onPickCover,
  onSave,
  onRemove,
}: {
  card: AiCard;
  onChange: (f: FormValues) => void;
  onPickCover: (f: File) => void;
  onSave: () => void;
  onRemove: () => void;
}) {
  const coverRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`rounded-xl2 border border-line bg-surface p-4 ${card.saved ? "opacity-70" : ""}`}>
      <div className="mb-3 flex items-center gap-3">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-cream2">
          {card.coverUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={card.coverUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl">🍽️</div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate font-semibold text-ink">
            {card.form.titleRu || "Новый рецепт"}
          </div>
          <input
            ref={coverRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onPickCover(f);
              e.target.value = "";
            }}
          />
          <button
            onClick={() => coverRef.current?.click()}
            className="mt-1 text-xs font-semibold text-muted hover:text-ink"
          >
            {card.coverFile ? "🖼 заменить фото обложки" : "🖼 выбрать фото обложки"}
          </button>
        </div>
        <button onClick={onRemove} className="shrink-0 text-sm text-muted hover:text-clay">
          убрать
        </button>
      </div>

      <RecipeForm value={card.form} onChange={onChange} />

      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={onSave}
          disabled={card.saving || card.saved}
          className="rounded-full bg-clay px-5 py-2.5 font-bold text-white transition hover:bg-clay2 disabled:opacity-60"
        >
          {card.saving ? "Сохраняю…" : card.saved ? "Сохранено ✓" : "Сохранить рецепт"}
        </button>
        {card.msg && <span className="text-sm font-semibold text-basil2">{card.msg}</span>}
      </div>
    </div>
  );
}

// ------------------------- recipe list item -------------------------
function RecipeItem({
  recipe,
  authFetch,
  onUpdated,
}: {
  recipe: RecipeRow;
  authFetch: AuthFetch;
  onUpdated: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [showUrl, setShowUrl] = useState(false);
  const [url, setUrl] = useState("");
  const [showGallery, setShowGallery] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<FormValues | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const cover = recipe.image || `/img/recipes/${recipe.category}.svg`;
  const gallery = recipe.gallery || [];

  async function openEdit() {
    setBusy(true);
    setMsg("");
    try {
      const res = await authFetch(`/api/admin/recipe?slug=${encodeURIComponent(recipe.slug)}`);
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg(j.error || "Не удалось загрузить рецепт");
        return;
      }
      setEditForm(toForm(j.recipe));
      setEditing(true);
    } catch {
      setMsg("Сеть недоступна");
    } finally {
      setBusy(false);
    }
  }

  async function saveEdit() {
    if (!editForm) return;
    setBusy(true);
    setMsg("");
    const r = await saveRecipe(authFetch, editForm);
    setBusy(false);
    if (!r.ok) {
      setMsg(r.error || "Ошибка");
      return;
    }
    setEditing(false);
    setMsg("Изменения сохранены ✓");
    onUpdated();
  }

  async function del() {
    if (!confirm(`Удалить рецепт «${recipe.title?.ru || recipe.slug}»? Это действие необратимо.`)) return;
    setBusy(true);
    setMsg("");
    try {
      const res = await authFetch(`/api/admin/recipe?slug=${encodeURIComponent(recipe.slug)}`, {
        method: "DELETE",
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg(j.error || "Ошибка удаления");
        return;
      }
      onUpdated();
    } catch {
      setMsg("Сеть недоступна");
    } finally {
      setBusy(false);
    }
  }

  async function uploadGallery(files: FileList) {
    setBusy(true);
    setMsg("");
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("slug", recipe.slug);
        const res = await authFetch("/api/admin/gallery", { method: "POST", body: fd });
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          setMsg(j.hint || j.error || "Ошибка загрузки");
          break;
        }
      }
      setMsg("Фото шагов обновлены ✓");
      onUpdated();
    } catch {
      setMsg("Сеть недоступна");
    } finally {
      setBusy(false);
    }
  }

  async function removeGalleryAt(i: number) {
    setBusy(true);
    setMsg("");
    try {
      const next = gallery.filter((_, idx) => idx !== i);
      const res = await authFetch("/api/admin/gallery-set", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: recipe.slug, gallery: next }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setMsg(j.error || "Ошибка");
      } else {
        onUpdated();
      }
    } catch {
      setMsg("Сеть недоступна");
    } finally {
      setBusy(false);
    }
  }

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
          <div className="flex items-center gap-2">
            <button
              onClick={() => (editing ? setEditing(false) : openEdit())}
              disabled={busy}
              className="text-xs font-semibold text-basil hover:underline"
            >
              ✎ {editing ? "закрыть" : "редактировать"}
            </button>
            <button
              onClick={del}
              disabled={busy}
              className="text-xs font-semibold text-clay hover:underline"
            >
              🗑 удалить
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowUrl((v) => !v)}
              className="text-xs font-semibold text-muted hover:text-ink"
            >
              🔗 ссылка
            </button>
            <button
              onClick={() => setShowGallery((v) => !v)}
              className="text-xs font-semibold text-muted hover:text-ink"
            >
              🖼 шаги ({gallery.length})
            </button>
          </div>
        </div>
      </div>

      {editing && editForm && (
        <div className="mt-3 border-t border-line pt-3">
          <RecipeForm value={editForm} onChange={setEditForm} slugEditable={false} />
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={saveEdit}
              disabled={busy}
              className="rounded-full bg-clay px-5 py-2.5 font-bold text-white transition hover:bg-clay2 disabled:opacity-60"
            >
              {busy ? "Сохраняю…" : "Сохранить изменения"}
            </button>
            <button
              onClick={() => setEditing(false)}
              className="text-sm font-semibold text-muted hover:text-ink"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {showGallery && (
        <div className="mt-3 border-t border-line pt-3">
          <div className="mb-2 text-xs font-semibold text-muted">
            Порядок фото = порядок шагов. Первое фото — под шагом 1, второе — под шагом 2 и т.д.
          </div>
          <div className="flex flex-wrap gap-2">
            {gallery.map((g, i) => (
              <div key={i} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g} alt="" className="h-20 w-20 rounded-lg object-cover" />
                <span className="absolute left-1 top-1 rounded bg-ink/70 px-1 text-[10px] font-bold text-cream">
                  {i + 1}
                </span>
                <button
                  onClick={() => removeGalleryAt(i)}
                  disabled={busy}
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-clay text-xs font-bold text-white"
                  aria-label="remove"
                >
                  ✕
                </button>
              </div>
            ))}
            <input
              ref={galleryRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.length) uploadGallery(e.target.files);
                e.target.value = "";
              }}
            />
            <button
              onClick={() => galleryRef.current?.click()}
              disabled={busy}
              className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-line text-2xl text-muted transition hover:border-basil hover:text-basil disabled:opacity-60"
            >
              ＋
            </button>
          </div>
        </div>
      )}

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

// ------------------------- add recipe (manual) -------------------------
function AddRecipe({ authFetch, onAdded }: { authFetch: AuthFetch; onAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState<FormValues>({ ...EMPTY });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const r = await saveRecipe(authFetch, f);
    setBusy(false);
    if (!r.ok) {
      setMsg(r.error || "Ошибка");
      return;
    }
    setMsg("Рецепт сохранён ✓ — теперь загрузите фото ниже");
    setF({ ...EMPTY });
    onAdded();
  }

  return (
    <div className="mb-6 rounded-xl2 border border-line bg-cream2 p-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between font-bold text-basil"
      >
        <span>＋ Добавить рецепт вручную</span>
        <span className="text-muted">{open ? "свернуть" : ""}</span>
      </button>

      {open && (
        <form onSubmit={submit} className="mt-4">
          <RecipeForm value={f} onChange={setF} />
          <div className="mt-3 flex items-center gap-3">
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

// ------------------------- collection covers -------------------------
function CollectionCovers({ authFetch }: { authFetch: AuthFetch }) {
  const [open, setOpen] = useState(false);
  const [covers, setCovers] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    try {
      const res = await authFetch("/api/admin/collection-cover");
      if (res.ok) {
        const j = await res.json();
        setCovers(j.covers || {});
      }
    } catch {
      /* ignore */
    }
  }, [authFetch]);

  useEffect(() => {
    if (open) load();
  }, [open, load]);

  return (
    <div className="mb-6 rounded-xl2 border border-line bg-cream2 p-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between font-bold text-basil"
      >
        <span>🖼 Обложки подборок</span>
        <span className="text-muted">{open ? "свернуть" : ""}</span>
      </button>
      {open && (
        <div className="mt-4 flex flex-col gap-3">
          {COLLECTIONS.map((c) => (
            <CoverRow
              key={c.slug}
              slug={c.slug}
              emoji={c.emoji}
              title={c.title.ru}
              cover={covers[c.slug]}
              authFetch={authFetch}
              onUpdated={load}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CoverRow({
  slug,
  emoji,
  title,
  cover,
  authFetch,
  onUpdated,
}: {
  slug: string;
  emoji: string;
  title: string;
  cover?: string;
  authFetch: AuthFetch;
  onUpdated: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setBusy(true);
    setMsg("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("slug", slug);
      const res = await authFetch("/api/admin/collection-cover", { method: "POST", body: fd });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) setMsg(j.hint || j.error || "Ошибка");
      else {
        setMsg("Обложка обновлена ✓");
        onUpdated();
      }
    } catch {
      setMsg("Сеть недоступна");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-4 rounded-xl border border-line bg-surface p-3">
      <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-cream2">
        {cover ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={cover} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl">{emoji}</div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-semibold text-ink">
          {emoji} {title}
        </div>
        <div className={`text-xs ${cover ? "text-leaf" : "text-clay"}`}>
          {cover ? "обложка своя" : "обложка по 1-му рецепту"}
        </div>
        {msg && <div className="mt-0.5 text-xs font-semibold text-basil2">{msg}</div>}
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
      <button
        onClick={() => fileRef.current?.click()}
        disabled={busy}
        className="shrink-0 rounded-full bg-basil px-4 py-2 text-sm font-bold text-cream transition hover:bg-basil2 disabled:opacity-60"
      >
        {busy ? "…" : "Загрузить обложку"}
      </button>
    </div>
  );
}
