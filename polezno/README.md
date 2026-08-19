# Просто Полезно · Simply Healthy

Мультиязычный (RU/EN) сайт с рецептами, правильным питанием (ПП) и кухонными
лайфхаками. Отдельный самостоятельный проект — не связан с кодом SeaJobs в
корне репозитория.

## Стек

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS 3** — тёплая «кухонная» палитра, светлая/тёмная темы
- **Supabase** (Postgres) как бэкенд контента — опционально

## Быстрый старт

```bash
cd polezno
npm install
npm run dev        # http://localhost:3000  →  редирект на /ru
```

Сайт запускается **без всякой настройки**: если переменные Supabase не заданы,
контент берётся из встроенных seed-данных (`lib/data.ts`).

## Скрипты

```bash
npm run dev      # дев-сервер
npm run build    # прод-сборка
npm run start    # запуск прод-сборки
npm run lint     # ESLint
npm run db:seed  # залить seed-контент в Supabase (нужны env-переменные)
```

## Подключение бэкенда (Supabase)

1. Скопируйте `.env.local.example` → `.env.local` и заполните:
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY`.
2. Примените `supabase/migrations/0001_init.sql` в SQL-редакторе Supabase.
3. Залейте стартовый контент: `npm run db:seed`.

Слой доступа к данным — `lib/content.ts`: если Supabase настроен, читает живые
таблицы `recipes` / `lifehacks`; иначе отдаёт seed-данные. Локализованные поля
хранятся как `jsonb` вида `{"ru": "...", "en": "..."}`.

## Структура

```
app/[locale]/            все страницы под /ru и /en
  page.tsx               главная (hero, подборки, ПП, лайфхаки)
  recipes/               каталог + /[slug] детальная
  pp/                    ПП-рецепты (фильтр is_pp)
  lifehacks/             список + /[slug] детальная
  about/
components/              Header, Footer, карточки, фильтры, провайдеры i18n
lib/                     langs, i18n (словари), types, data (seed), content
supabase/migrations/     схема БД + RLS
scripts/seed.ts          наполнение БД из seed-данных
```

## i18n

- Языки и `Lang` — `lib/langs.ts` (RU по умолчанию).
- UI-строки — `lib/i18n.ts` (`T`), сервер выбирает нужный словарь и отдаёт его
  клиентским компонентам через `DictProvider` (`useT()` / `useLang()`).
- Контент (тексты рецептов) локализован пофайлово в данных, а не в `T`.
- `middleware.ts` редиректит пути без префикса локали на `/ru`.

## Добавить рецепт

Без БД — добавьте объект в `SEED_RECIPES` (`lib/data.ts`), заполнив `ru` и `en`
во всех локализованных полях. С БД — вставьте строку в таблицу `recipes` (или
расширьте `lib/data.ts` и запустите `npm run db:seed`).
