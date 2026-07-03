-- Forum topics for SeaJobs.pro — Maritime English learning series (10 posts).
-- Creates a dedicated "Морской английский" section and fills it with practical
-- English-for-seafarers lessons (ratings, officers, engineers, catering,
-- interview, wheel/engine orders, VHF, mooring, cargo/bunkering, emergencies).
-- Each post is bilingual (ru teaches English to Russian speakers; en is a
-- parallel maritime-English lesson) so both sites rank. Idempotent — guarded by
-- the Russian title. Run in the Supabase SQL Editor (service role bypasses RLS).

-- ── Section ──────────────────────────────────────────────────────────────────
INSERT INTO forum_categories (name, description, sort_order)
SELECT 'Морской английский', 'Английский для моряков: слова, фразы и разбор по специальностям', 20
WHERE NOT EXISTS (SELECT 1 FROM forum_categories WHERE name ILIKE 'Морской английский');

-- ── 1. Английский для матросов ───────────────────────────────────────────────
INSERT INTO forum_topics (user_id, author_name, title, content, category_id, is_pinned, created_at)
SELECT
  (SELECT id FROM auth.users WHERE email = 'andreyrich90@gmail.com' LIMIT 1),
  'Редакция SeaJobs.pro',
  jsonb_build_object(
    'ru', 'Английский для матросов: палубные работы, швартовка и руль — слова и фразы с разбором',
    'en', 'Maritime English for deck ratings: deck work, mooring and helm — words and phrases'),
  jsonb_build_object('ru', $ru$Матросу не нужен идеальный английский — нужен рабочий. Достаточно уверенно понимать команды и докладывать. Разберём базу, которую спрашивают чаще всего.

## На палубе (deck work)

- **Deck** — палуба. **On deck** — на палубе.
- **Rope / line** — трос, конец. **Wire** — стальной трос.
- **Winch** — лебёдка. **Windlass** — брашпиль (для якоря).
- **Hatch** — люк (грузовой). **Hatch cover** — крышка трюма.
- **Chipping and painting** — обивка ржавчины и покраска (главная работа матроса).
- **Lashing** — крепление груза. **To lash** — крепить.

## Швартовка (mooring)

- **Fore / forward** — нос. **Aft** — корма. **Amidships** — середина.
- **Heaving line** — бросательный конец (лёгкий, с грузиком).
- **Make fast** — закрепить (швартов). **Let go** — отдать.
- **Slack away** — потравить (ослабить). **Heave up / heave in** — выбирать.
- **Fender** — кранец.

## Команды на руле (helm) — отвечай повторяя

- **Midships** — прямо руль. Ответ: "Midships".
- **Port five / ten / twenty** — лево 5/10/20.
- **Starboard five / ten** — право 5/10.
- **Steady** — так держать. **Steady as she goes** — держать текущий курс.

Важное правило: **всегда повторяй команду вслух** (repeat back), выполни, потом доложи. Это стандарт безопасности, а не вежливость.

## Мини-диалог

> Officer: "Port ten."
> AB: "Port ten." (крутишь) "Ten of port wheel on."
> Officer: "Steady."
> AB: "Steady... Course one-eight-five."

Хотите проверить английский в деле? Ищите вакансии для матросов на **seajobs.pro** — там же видно требования к языку в каждом объявлении.$ru$,
    'en', $en$A deck rating does not need perfect English — just working English. It is enough to understand orders confidently and report back. Here is the base that is asked about most often.

## On deck

- **Deck / on deck** — the working surface of the ship.
- **Rope / line** — a fibre rope; **wire** — a steel rope.
- **Winch** — for mooring lines; **windlass** — for the anchor.
- **Hatch / hatch cover** — cargo hold opening and its lid.
- **Chipping and painting** — removing rust and repainting (the rating's main job).
- **Lashing / to lash** — securing cargo.

## Mooring

- **Fore / forward** — the bow; **aft** — the stern; **amidships** — the middle.
- **Heaving line** — the light line thrown ashore first.
- **Make fast** — secure a line; **let go** — release it.
- **Slack away** — pay out/loosen; **heave in** — take up the slack.
- **Fender** — protects the hull alongside.

## Helm orders — always repeat back

- **Midships** — rudder to zero.
- **Port/Starboard five / ten / twenty** — rudder degrees left/right.
- **Steady / steady as she goes** — hold the present heading.

Key rule: **always repeat the order aloud**, carry it out, then report. It is a safety standard, not politeness.

## Mini-dialogue

> Officer: "Port ten."
> AB: "Port ten." (turning) "Ten of port wheel on."
> Officer: "Steady."
> AB: "Steady... Course one-eight-five."

Want to put your English to work? Find deck-rating vacancies on **seajobs.pro** — each ad shows the language level required.$en$),
  (SELECT id FROM forum_categories WHERE name ILIKE 'Морской английский' LIMIT 1),
  false, '2026-06-11 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM forum_topics WHERE title->>'ru' = 'Английский для матросов: палубные работы, швартовка и руль — слова и фразы с разбором');

-- ── 2. Английский для штурманов ──────────────────────────────────────────────
INSERT INTO forum_topics (user_id, author_name, title, content, category_id, is_pinned, created_at)
SELECT
  (SELECT id FROM auth.users WHERE email = 'andreyrich90@gmail.com' LIMIT 1),
  'Редакция SeaJobs.pro',
  jsonb_build_object(
    'ru', 'Английский для штурманов: мостик, вахта и навигация — фразы, которые нужны каждый день',
    'en', 'Maritime English for deck officers: bridge, watch and navigation phrases'),
  jsonb_build_object('ru', $ru$Штурман говорит по-английски постоянно: сдаёт и принимает вахту, командует рулевым, ведёт радиообмен, докладывает капитану. Собрали рабочий минимум.

## Мостик и вахта (bridge & watch)

- **Bridge** — мостик. **Watch** — вахта. **Watchkeeping** — несение вахты.
- **To take over the watch** — принять вахту. **To hand over** — сдать.
- **Lookout** — впередсмотрящий. **Keep a proper lookout** — вести надлежащее наблюдение.
- **Course** — курс. **Heading** — текущий курс по компасу. **Bearing** — пеленг.
- **Fix / position** — обсервация / место судна.

## Навигация (navigation)

- **Chart** — карта. **ECDIS** — электронная картография.
- **Waypoint** — путевая точка. **Route** — маршрут.
- **To alter course** — изменить курс. **To reduce / increase speed** — снизить / увеличить скорость.
- **Give way** — уступить дорогу. **Stand on** — сохранять курс и скорость (по МППСС/COLREGs).
- **Under keel clearance (UKC)** — запас воды под килем.

## Приём/сдача вахты — что доложить

Курс, скорость, режим управления рулём, движение вокруг (traffic), погода, задачи капитана (Master's standing orders), особые указания. Фраза-шаблон:

> "I have the watch. Course one-two-zero, speed twelve knots, hand steering, two targets on the starboard bow, visibility good."

## Доклад капитану

- **Nothing to report, sir** — без замечаний.
- **A vessel is crossing from starboard, I intend to alter to starboard** — судно пересекает справа, намерен отвернуть вправо.

Готовы к позиции офицера? Смотрите вакансии 2nd/3rd Officer на **seajobs.pro**.$ru$,
    'en', $en$A deck officer speaks English constantly: handing over and taking the watch, conning the helmsman, working the radio, reporting to the Master. Here is the working minimum.

## Bridge & watch

- **Bridge / watch / watchkeeping** — the command position and the duty period.
- **To take over / hand over the watch** — start and end your duty.
- **Lookout** — keep a proper lookout at all times.
- **Course / heading / bearing** — intended track / compass heading / direction to an object.
- **Fix / position** — the ship's determined location.

## Navigation

- **Chart / ECDIS** — paper and electronic charts.
- **Waypoint / route** — points and the planned track.
- **To alter course / reduce / increase speed** — the core manoeuvring verbs.
- **Give way / stand on** — COLREGs terms for who keeps clear.
- **Under keel clearance (UKC)** — water depth below the keel.

## Handover — what to report

Course, speed, steering mode, traffic around, weather, the Master's standing orders, any special instructions. Template:

> "I have the watch. Course one-two-zero, speed twelve knots, hand steering, two targets on the starboard bow, visibility good."

## Reporting to the Master

- **Nothing to report, sir.**
- **A vessel is crossing from starboard; I intend to alter to starboard.**

Ready for an officer position? Browse 2nd/3rd Officer vacancies on **seajobs.pro**.$en$),
  (SELECT id FROM forum_categories WHERE name ILIKE 'Морской английский' LIMIT 1),
  false, '2026-06-12 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM forum_topics WHERE title->>'ru' = 'Английский для штурманов: мостик, вахта и навигация — фразы, которые нужны каждый день');

-- ── 3. Английский для механиков ──────────────────────────────────────────────
INSERT INTO forum_topics (user_id, author_name, title, content, category_id, is_pinned, created_at)
SELECT
  (SELECT id FROM auth.users WHERE email = 'andreyrich90@gmail.com' LIMIT 1),
  'Редакция SeaJobs.pro',
  jsonb_build_object(
    'ru', 'Английский для механиков: машинное отделение, инструменты и поломки — словарь с пояснениями',
    'en', 'Maritime English for engineers: engine room, tools and breakdowns'),
  jsonb_build_object('ru', $ru$В машине английский нужен не для красоты, а чтобы понять чек-лист, объяснить поломку суперинтенданту и заказать запчасть. Вот база.

## Машинное отделение (engine room)

- **Main engine (M/E)** — главный двигатель. **Auxiliary engine (A/E) / generator** — вспомогательный двигатель / генератор.
- **Boiler** — котёл. **Purifier / separator** — сепаратор. **Cooler / heat exchanger** — охладитель / теплообменник.
- **Pump** — насос. **Valve** — клапан. **Pipe / line** — трубопровод.
- **Fuel oil (FO) / diesel oil (DO) / lube oil (LO)** — топливо / дизтопливо / масло.

## Инструменты (tools)

- **Spanner / wrench** — ключ гаечный. **Socket** — головка. **Screwdriver** — отвёртка.
- **Hammer** — молоток. **Grinder** — болгарка. **Feeler gauge** — щуп.
- **To tighten / to loosen** — затянуть / ослабить. **To overhaul** — перебрать (провести ремонт).

## Поломки и состояние (troubleshooting)

- **Leak / leakage** — течь. **The pump is leaking** — насос течёт.
- **Overheating** — перегрев. **Vibration** — вибрация. **Alarm** — тревога/сигнал.
- **Spare part** — запчасть. **Worn out** — изношено. **To replace** — заменить.
- **Breakdown / failure** — поломка / отказ.

## Доклад о неисправности — шаблон

> "The number two generator is overheating. The cooling water temperature is high. I suspect the cooler is fouled. Request permission to stop and clean it."

Коротко и по делу — именно так и надо. Ищете контракт механика? Вакансии Chief/2nd/3rd Engineer — на **seajobs.pro**.$ru$,
    'en', $en$In the engine room English is not decoration — you need it to read a checklist, explain a breakdown to the superintendent and order a spare. Here is the base.

## Engine room

- **Main engine (M/E) / auxiliary engine (A/E) / generator** — the core machinery.
- **Boiler / purifier (separator) / cooler (heat exchanger)** — steam, fuel cleaning, cooling.
- **Pump / valve / pipe (line)** — the fluid systems.
- **Fuel oil (FO) / diesel oil (DO) / lube oil (LO)** — the main consumables.

## Tools

- **Spanner (wrench) / socket / screwdriver** — the basics.
- **Hammer / grinder / feeler gauge** — striking, cutting, measuring clearances.
- **To tighten / to loosen / to overhaul** — the key maintenance verbs.

## Troubleshooting

- **Leak / leakage** — "the pump is leaking".
- **Overheating / vibration / alarm** — the words for abnormal conditions.
- **Spare part / worn out / to replace** — parts and wear.
- **Breakdown / failure** — a stoppage.

## Reporting a fault — template

> "The number two generator is overheating. The cooling water temperature is high. I suspect the cooler is fouled. Request permission to stop and clean it."

Short and to the point is exactly right. Looking for an engine contract? Chief/2nd/3rd Engineer vacancies are on **seajobs.pro**.$en$),
  (SELECT id FROM forum_categories WHERE name ILIKE 'Морской английский' LIMIT 1),
  false, '2026-06-13 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM forum_topics WHERE title->>'ru' = 'Английский для механиков: машинное отделение, инструменты и поломки — словарь с пояснениями');

-- ── 4. Английский для повара и стюарда ───────────────────────────────────────
INSERT INTO forum_topics (user_id, author_name, title, content, category_id, is_pinned, created_at)
SELECT
  (SELECT id FROM auth.users WHERE email = 'andreyrich90@gmail.com' LIMIT 1),
  'Редакция SeaJobs.pro',
  jsonb_build_object(
    'ru', 'Английский для повара и стюарда: камбуз, провизия и меню — нужные слова и фразы',
    'en', 'Maritime English for cook and steward: galley, provisions and menu'),
  jsonb_build_object('ru', $ru$Повар и стюард общаются с многонациональным экипажем, принимают провизию в порту и ведут учёт. Английский здесь очень практичный.

## Камбуз (galley)

- **Galley** — камбуз. **Mess room** — столовая. **Pantry** — буфетная.
- **Stove / oven** — плита / духовка. **Fridge / freezer** — холодильник / морозильник.
- **Provisions / stores** — провизия / запасы. **Dry stores** — сухие продукты.

## Продукты (food)

- **Meat / poultry / fish** — мясо / птица / рыба.
- **Vegetables / fruit** — овощи / фрукты. **Dairy** — молочное.
- **Flour / rice / pasta** — мука / рис / макароны.
- **Fresh / frozen / canned** — свежий / замороженный / консервированный.

## Приёмка провизии (taking provisions)

- **Delivery / supply** — поставка. **Order list / requisition** — заявка.
- **Quantity / weight** — количество / вес. **Expiry date** — срок годности.
- **To check / to sign for** — проверить / расписаться за.
- **Shortage** — недостача. **The delivery is short by five kilos** — недовес пять кг.

## Меню и диеты (menu & diets)

- **Breakfast / lunch / dinner / supper** — завтрак / обед / ужин.
- **Halal / vegetarian / no pork** — халяль / вегетарианское / без свинины (важно для смешанного экипажа!).
- **Portion / serving** — порция.

## Фраза дня

> "Today's lunch: chicken soup, beef with rice, and a vegetarian option. Dinner at eighteen hundred."

Хороший кок ценится на вес золота. Вакансии Cook / Chief Cook / Steward — на **seajobs.pro**.$ru$,
    'en', $en$The cook and steward deal with a multinational crew, take provisions in port and keep records. The English here is very practical.

## Galley

- **Galley / mess room / pantry** — where food is cooked, eaten and stored.
- **Stove / oven / fridge / freezer** — the main equipment.
- **Provisions / stores / dry stores** — the food supplies.

## Food

- **Meat / poultry / fish** — the proteins.
- **Vegetables / fruit / dairy** — the fresh groups.
- **Flour / rice / pasta** — the staples.
- **Fresh / frozen / canned** — the three storage states.

## Taking provisions

- **Delivery / supply / order list (requisition)** — the paperwork.
- **Quantity / weight / expiry date** — what you check.
- **To check / to sign for** — the receiving verbs.
- **Shortage** — "the delivery is short by five kilos".

## Menu & diets

- **Breakfast / lunch / dinner / supper** — the meals.
- **Halal / vegetarian / no pork** — essential for a mixed crew.
- **Portion / serving** — the amount per person.

## Phrase of the day

> "Today's lunch: chicken soup, beef with rice, and a vegetarian option. Dinner at eighteen hundred."

A good cook is worth their weight in gold. Cook / Chief Cook / Steward vacancies are on **seajobs.pro**.$en$),
  (SELECT id FROM forum_categories WHERE name ILIKE 'Морской английский' LIMIT 1),
  false, '2026-06-14 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM forum_topics WHERE title->>'ru' = 'Английский для повара и стюарда: камбуз, провизия и меню — нужные слова и фразы');

-- ── 5. Собеседование на английском ───────────────────────────────────────────
INSERT INTO forum_topics (user_id, author_name, title, content, category_id, is_pinned, created_at)
SELECT
  (SELECT id FROM auth.users WHERE email = 'andreyrich90@gmail.com' LIMIT 1),
  'Редакция SeaJobs.pro',
  jsonb_build_object(
    'ru', 'Собеседование на английском: типичные вопросы крюинга и как отвечать (с примерами)',
    'en', 'The crewing interview in English: typical questions and how to answer (with examples)'),
  jsonb_build_object('ru', $ru$Собеседование с судовладельцем часто идёт на английском по Skype. Разберём частые вопросы и готовые ответы-шаблоны — выучите их, и половина стресса уйдёт.

## О себе и опыте

- **"Tell me about yourself."** — Расскажите о себе.

> "My name is Ivan. I am an Able Seaman with four years of experience, mostly on bulk carriers and general cargo vessels."

- **"What was your last vessel?"** — Какое было последнее судно?

> "My last vessel was a 25,000 DWT bulk carrier under Panama flag. I worked as AB for four months."

## О документах

- **"Are your documents valid?"** — Документы действующие?

> "Yes. My CoC, STCW certificates and medical are all valid. My US C1/D visa is valid until 2028."

## Профессиональные / ситуационные

- **"What would you do in case of fire?"** — Что сделаете при пожаре?

> "I would raise the alarm, report to the bridge, and act according to the muster list and the vessel's procedures."

- **"Why did you leave your last company?"** — Почему ушли?

> "My contract finished and I was looking for a different vessel type." (никогда не ругайте прошлого капитана!)

## Если не поняли вопрос — это нормально

- **"Could you repeat that, please?"** — Повторите, пожалуйста.
- **"Sorry, could you speak a bit slower?"** — Можно чуть медленнее?

## Три правила

1. Говорите **медленно и понятно**, а не быстро и красиво.
2. Отвечайте **конкретно**: тип судна, срок, должность.
3. Никогда не врите на технических вопросах — это проверяется на борту в первый день.

Готовы пройти интервью? Актуальные вакансии от судовладельцев — на **seajobs.pro**.$ru$,
    'en', $en$The interview with an owner is often held in English over Skype. Here are the frequent questions with ready-made answer templates — learn them and half the stress disappears.

## About you and your experience

- **"Tell me about yourself."**

> "My name is Ivan. I am an Able Seaman with four years of experience, mostly on bulk carriers and general cargo vessels."

- **"What was your last vessel?"**

> "My last vessel was a 25,000 DWT bulk carrier under Panama flag. I worked as AB for four months."

## About documents

- **"Are your documents valid?"**

> "Yes. My CoC, STCW certificates and medical are all valid. My US C1/D visa is valid until 2028."

## Professional / situational

- **"What would you do in case of fire?"**

> "I would raise the alarm, report to the bridge, and act according to the muster list and the vessel's procedures."

- **"Why did you leave your last company?"**

> "My contract finished and I was looking for a different vessel type." (never criticise a former captain!)

## If you don't understand — that's fine

- **"Could you repeat that, please?"**
- **"Sorry, could you speak a bit slower?"**

## Three rules

1. Speak **slowly and clearly**, not fast and fancy.
2. Answer **specifically**: vessel type, duration, rank.
3. Never lie on technical questions — it is checked on board on day one.

Ready to interview? Current owner vacancies are on **seajobs.pro**.$en$),
  (SELECT id FROM forum_categories WHERE name ILIKE 'Морской английский' LIMIT 1),
  false, '2026-06-15 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM forum_topics WHERE title->>'ru' = 'Собеседование на английском: типичные вопросы крюинга и как отвечать (с примерами)');

-- ── 6. Команды на руле и в машину (SMCP) ─────────────────────────────────────
INSERT INTO forum_topics (user_id, author_name, title, content, category_id, is_pinned, created_at)
SELECT
  (SELECT id FROM auth.users WHERE email = 'andreyrich90@gmail.com' LIMIT 1),
  'Редакция SeaJobs.pro',
  jsonb_build_object(
    'ru', 'Команды на руле и в машину (SMCP): стандартные фразы, которые обязан знать каждый',
    'en', 'Standard wheel and engine orders (SMCP): the phrases everyone must know'),
  jsonb_build_object('ru', $ru$Это не «разговорный» английский, а стандартные морские команды (IMO SMCP). Они одинаковы во всём мире — выучите их дословно, импровизировать здесь нельзя.

## Команды на руль (helm / wheel orders)

- **Midships** — прямо руль (0°).
- **Port five / ten / fifteen / twenty** — лево 5/10/15/20°.
- **Starboard five / ten / fifteen / twenty** — право 5/10/15/20°.
- **Hard-a-port / Hard-a-starboard** — лево / право на борт (максимум).
- **Ease to five / ten** — уменьшить перекладку до 5/10°.
- **Steady** — одерживать. **Steady as she goes** — держать курс, каким идём.
- **Meet her** — одерживать поворот.

Рулевой **всегда повторяет команду**, выполняет и докладывает: "Port ten, ten of port wheel on."

## Команды курса

- **Steer one-eight-five** — держать курс 185. (цифры по одной: "one-eight-five", не "one hundred eighty-five").

## Команды в машину (engine orders — телеграф)

- **Full ahead / Half ahead / Slow ahead / Dead slow ahead** — полный / средний / малый / самый малый вперёд.
- **Stop engine** — стоп машина.
- **Dead slow astern / Slow astern / Half astern / Full astern** — назад с той же градацией.
- **Finished with engines (F.W.E.)** — машина больше не нужна.

## Почему это критично

Одинаковые слова = ноль недопонимания в стрессовой ситуации при маневрировании или швартовке. Ошибка в команде руля может стоить очень дорого.

Прокачиваете вахтенные навыки? Вакансии для рулевых и офицеров — на **seajobs.pro**.$ru$,
    'en', $en$This is not "conversational" English but standard marine orders (IMO SMCP). They are identical worldwide — learn them word for word; improvisation is not allowed here.

## Helm / wheel orders

- **Midships** — rudder to 0°.
- **Port / Starboard five / ten / fifteen / twenty** — rudder degrees.
- **Hard-a-port / Hard-a-starboard** — full rudder.
- **Ease to five / ten** — reduce the rudder angle.
- **Steady / steady as she goes** — hold the heading.
- **Meet her** — check the swing.

The helmsman **always repeats** the order, acts, and reports: "Port ten, ten of port wheel on."

## Course orders

- **Steer one-eight-five** — steer 185. (digits one by one: "one-eight-five", not "one hundred eighty-five").

## Engine orders (telegraph)

- **Full / Half / Slow / Dead slow ahead** — the ahead steps.
- **Stop engine.**
- **Dead slow / Slow / Half / Full astern** — the astern steps.
- **Finished with engines (F.W.E.)** — the engine is no longer needed.

## Why it is critical

Identical words = zero misunderstanding in the stress of manoeuvring or mooring. A wrong helm order can be very costly.

Building your watchkeeping skills? Helmsman and officer vacancies are on **seajobs.pro**.$en$),
  (SELECT id FROM forum_categories WHERE name ILIKE 'Морской английский' LIMIT 1),
  false, '2026-06-16 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM forum_topics WHERE title->>'ru' = 'Команды на руле и в машину (SMCP): стандартные фразы, которые обязан знать каждый');

-- ── 7. VHF-радиообмен ────────────────────────────────────────────────────────
INSERT INTO forum_topics (user_id, author_name, title, content, category_id, is_pinned, created_at)
SELECT
  (SELECT id FROM auth.users WHERE email = 'andreyrich90@gmail.com' LIMIT 1),
  'Редакция SeaJobs.pro',
  jsonb_build_object(
    'ru', 'VHF-радиообмен на английском: procedure words и фразы (Mayday, Pan-Pan, Over, Roger)',
    'en', 'VHF radio communication: procedure words and phrases (Mayday, Pan-Pan, Over, Roger)'),
  jsonb_build_object('ru', $ru$Радиообмен идёт по строгим правилам, чтобы всех поняли даже при плохой слышимости. Разберём служебные слова (procedure words) и сигналы бедствия.

## Служебные слова (procedure words)

- **Over** — приём (я закончил, жду ответа).
- **Out** — конец связи (ответа не жду). Никогда не говорят "over and out".
- **Roger** — принято, понял.
- **Copy / Copied** — принял (информацию).
- **Say again** — повторите (НЕ "repeat" — у "repeat" другое значение).
- **Stand by** — ждите на связи.
- **Affirmative / Negative** — да / нет.
- **This is...** — вас вызывает... (называешь судно).

## Три уровня срочности

- **Mayday** — сигнал бедствия, угроза жизни / судну. Повторяется три раза.
- **Pan-Pan** — срочность (проблема, но пока не бедствие).
- **Sécurité** (сэкюритэ) — безопасность (навигационное / метео предупреждение).

## Фонетический алфавит (обязательно знать)

Alpha, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliett, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu.

## Пример вызова

> "Port Control, Port Control, this is motor vessel Neptune, Neptune, over."
> "Motor vessel Neptune, this is Port Control, go ahead, over."
> "Port Control, request permission to enter, my ETA is one-four-three-zero, over."

## Пример Mayday

> "Mayday, Mayday, Mayday. This is Neptune, Neptune, Neptune. Position six-zero degrees north... We have a fire on board, require immediate assistance. Over."

Учите радиообмен — это спасает жизни. Вакансии для моряков всех рангов — на **seajobs.pro**.$ru$,
    'en', $en$Radio traffic follows strict rules so that everyone is understood even with poor reception. Here are the procedure words and distress signals.

## Procedure words

- **Over** — I have finished and expect a reply.
- **Out** — end of contact, no reply expected. Never say "over and out".
- **Roger** — received and understood.
- **Copy / Copied** — I received the information.
- **Say again** — please repeat (NOT "repeat" — that word means something else).
- **Stand by** — wait on the channel.
- **Affirmative / Negative** — yes / no.
- **This is...** — used to identify the calling station.

## Three levels of urgency

- **Mayday** — distress, grave and imminent danger. Spoken three times.
- **Pan-Pan** — urgency (a problem, but not yet distress).
- **Sécurité** — safety (navigational or weather warning).

## Phonetic alphabet (must know)

Alpha, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliett, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu.

## Example call

> "Port Control, Port Control, this is motor vessel Neptune, Neptune, over."
> "Motor vessel Neptune, this is Port Control, go ahead, over."
> "Port Control, request permission to enter, my ETA is one-four-three-zero, over."

## Example Mayday

> "Mayday, Mayday, Mayday. This is Neptune, Neptune, Neptune. Position six-zero degrees north... We have a fire on board, require immediate assistance. Over."

Learn radio work — it saves lives. Vacancies for all ranks are on **seajobs.pro**.$en$),
  (SELECT id FROM forum_categories WHERE name ILIKE 'Морской английский' LIMIT 1),
  false, '2026-06-17 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM forum_topics WHERE title->>'ru' = 'VHF-радиообмен на английском: procedure words и фразы (Mayday, Pan-Pan, Over, Roger)');

-- ── 8. Швартовные команды ────────────────────────────────────────────────────
INSERT INTO forum_topics (user_id, author_name, title, content, category_id, is_pinned, created_at)
SELECT
  (SELECT id FROM auth.users WHERE email = 'andreyrich90@gmail.com' LIMIT 1),
  'Редакция SeaJobs.pro',
  jsonb_build_object(
    'ru', 'Швартовные команды на английском: слова и фразы для бака и кормы',
    'en', 'Mooring commands in English: words and phrases for the mooring stations'),
  jsonb_build_object('ru', $ru$Швартовка — момент, где недопонимание опасно для рук и ног. Команды короткие и стандартные. Учим.

## Швартовы (mooring lines)

- **Headline** — продольный носовой. **Stern line** — продольный кормовой.
- **Spring** — шпринг (не даёт двигаться вперёд/назад).
- **Breast line** — прижимной.
- **Fore / aft station** — носовой / кормовой пост швартовки.

## Команды (commands) — с мостика на баки

- **Send the heaving line** — подать бросательный.
- **Send one headline / two springs** — подать один носовой / два шпринга.
- **Slack away the headline** — потравить носовой.
- **Heave in / heave away** — выбирать.
- **Hold on** — задержать (стоп травить/выбирать).
- **Make fast** — закрепить. **All fast fore and aft** — всё закреплено нос и корма.
- **Let go** — отдать. **Let go everything** — отдать всё.
- **Stand by fore and aft** — приготовиться на баке и корме.

## Отчёт с поста на мостик

- **Ready fore and aft** — готово на баке и корме.
- **All lines are fast** — все концы закреплены.
- **All clear** — всё чисто (концы в воде убраны от винта).

## Безопасность (важно!)

- **Snap-back zone** — опасная зона отскока лопнувшего троса. Никогда не стой в ней.
- **Mind your hands / mind the line** — берегите руки / следите за концом.

## Мини-диалог

> Bridge: "Fore station, send one headline and one spring."
> Fore: "One headline and one spring, roger." ... "Headline is fast."

Опытный швартовщик — ценный член команды. Вакансии для матросов и боцманов — на **seajobs.pro**.$ru$,
    'en', $en$Mooring is the moment where a misunderstanding is dangerous for hands and legs. The commands are short and standard. Let's learn them.

## Mooring lines

- **Headline / stern line** — the fore-and-aft lines.
- **Spring** — stops the ship moving ahead/astern.
- **Breast line** — holds the ship in alongside.
- **Fore / aft station** — the forward and after mooring positions.

## Commands — bridge to stations

- **Send the heaving line** — throw the light line ashore.
- **Send one headline / two springs** — pass specific lines.
- **Slack away the headline** — pay out.
- **Heave in / heave away** — take up.
- **Hold on** — stop and hold.
- **Make fast / all fast fore and aft** — secured everywhere.
- **Let go / let go everything** — release the lines.
- **Stand by fore and aft** — be ready at both stations.

## Report — station to bridge

- **Ready fore and aft.**
- **All lines are fast.**
- **All clear** — lines are clear of the propeller.

## Safety (important!)

- **Snap-back zone** — where a parted line whips back. Never stand in it.
- **Mind your hands / mind the line** — watch out.

## Mini-dialogue

> Bridge: "Fore station, send one headline and one spring."
> Fore: "One headline and one spring, roger." ... "Headline is fast."

An experienced mooring hand is a valued crew member. Deck-rating and bosun vacancies are on **seajobs.pro**.$en$),
  (SELECT id FROM forum_categories WHERE name ILIKE 'Морской английский' LIMIT 1),
  false, '2026-06-18 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM forum_topics WHERE title->>'ru' = 'Швартовные команды на английском: слова и фразы для бака и кормы');

-- ── 9. Грузовые операции и бункеровка ────────────────────────────────────────
INSERT INTO forum_topics (user_id, author_name, title, content, category_id, is_pinned, created_at)
SELECT
  (SELECT id FROM auth.users WHERE email = 'andreyrich90@gmail.com' LIMIT 1),
  'Редакция SeaJobs.pro',
  jsonb_build_object(
    'ru', 'Грузовые операции и бункеровка на английском: словарь и фразы для палубы и машины',
    'en', 'Cargo operations and bunkering in English: vocabulary and phrases'),
  jsonb_build_object('ru', $ru$Погрузка, выгрузка и бункеровка — это работа с терминалом, сюрвейером и баржой, часто на английском. Собрали ключевое.

## Грузовые операции (cargo operations)

- **To load / to discharge** — грузить / выгружать.
- **Cargo hold** — трюм. **Tank** — танк (на танкере).
- **Loading rate** — темп погрузки. **To start / stop loading** — начать / остановить погрузку.
- **Draft / draught** — осадка. **Trim** — дифферент. **List** — крен.
- **Ballast / deballast** — принимать / откачивать балласт.
- **Stevedore** — докер. **Surveyor** — сюрвейер. **Tally** — счёт мест груза.
- **Lashing / securing** — крепление груза.

## Документы груза

- **Bill of lading (B/L)** — коносамент. **Manifest** — грузовой манифест.
- **Stowage plan** — план размещения груза.

## Бункеровка (bunkering)

- **Bunker / bunkering** — топливо / приём топлива.
- **Barge** — бункеровочная баржа. **Hose** — шланг. **Manifold** — приёмный коллектор.
- **Connect / disconnect the hose** — присоединить / отсоединить шланг.
- **Start / stop pumping** — начать / прекратить перекачку.
- **Sounding** — замер уровня в танке. **Overflow / spill** — перелив / разлив (авария!).
- **SOPEP** — судовой план ликвидации разливов нефти.

## Фраза для бункеровки

> "Stand by to start bunkering. Agreed rate two hundred cubic metres per hour. Emergency stop signal: three long blasts. Confirm, please."

Знание процедур на английском ценят на каждом судне. Вакансии на танкеры, балкеры и контейнеровозы — на **seajobs.pro**.$ru$,
    'en', $en$Loading, discharging and bunkering mean working with the terminal, the surveyor and the barge, often in English. Here are the essentials.

## Cargo operations

- **To load / to discharge** — the two core verbs.
- **Cargo hold / tank** — where cargo goes on dry ships / tankers.
- **Loading rate / to start / stop loading** — controlling the flow.
- **Draft (draught) / trim / list** — how the ship sits in the water.
- **Ballast / deballast** — adjusting stability.
- **Stevedore / surveyor / tally** — the shore people and cargo count.
- **Lashing / securing** — holding cargo in place.

## Cargo documents

- **Bill of lading (B/L) / manifest** — the cargo paperwork.
- **Stowage plan** — where each cargo is placed.

## Bunkering

- **Bunker / bunkering** — the fuel and the operation.
- **Barge / hose / manifold** — the transfer equipment.
- **Connect / disconnect the hose** — the connection verbs.
- **Start / stop pumping** — controlling the transfer.
- **Sounding / overflow (spill)** — measuring level / a pollution emergency.
- **SOPEP** — the ship's oil pollution emergency plan.

## Bunkering phrase

> "Stand by to start bunkering. Agreed rate two hundred cubic metres per hour. Emergency stop signal: three long blasts. Confirm, please."

Knowing the procedures in English is valued on every ship. Tanker, bulker and container vacancies are on **seajobs.pro**.$en$),
  (SELECT id FROM forum_categories WHERE name ILIKE 'Морской английский' LIMIT 1),
  false, '2026-06-19 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM forum_topics WHERE title->>'ru' = 'Грузовые операции и бункеровка на английском: словарь и фразы для палубы и машины');

-- ── 10. Аварийные ситуации и безопасность ────────────────────────────────────
INSERT INTO forum_topics (user_id, author_name, title, content, category_id, is_pinned, created_at)
SELECT
  (SELECT id FROM auth.users WHERE email = 'andreyrich90@gmail.com' LIMIT 1),
  'Редакция SeaJobs.pro',
  jsonb_build_object(
    'ru', 'Аварийный английский: тревоги, учения и команды в чрезвычайной ситуации',
    'en', 'Emergency English: alarms, drills and commands in an emergency'),
  jsonb_build_object('ru', $ru$В аварии нет времени подбирать слова. Эти термины и команды нужно знать на автомате — от них зависит жизнь.

## Тревоги (alarms) и сигналы

- **General alarm** — общесудовая тревога (семь коротких + один длинный сигнал).
- **Fire alarm** — пожарная тревога. **Abandon ship** — оставление судна.
- **Man overboard (MOB)** — человек за бортом.
- **Muster** — сбор по тревоге. **Muster station / muster list** — место сбора / расписание по тревогам.

## Учения (drills)

- **Fire drill** — учебная пожарная тревога. **Boat drill / abandon ship drill** — шлюпочная тревога.
- **Head count** — перекличка (все ли на месте).
- **This is a drill** — это учение (важно объявлять, чтобы не было паники).

## Команды и доклады

- **Raise the alarm** — поднять тревогу.
- **Report to your muster station** — прибыть на место сбора.
- **All crew accounted for** — весь экипаж на месте.
- **Fight the fire / boundary cooling** — тушить пожар / охлаждать переборки.
- **Is anyone injured?** — есть пострадавшие?

## Спасательное оборудование (LSA/FFA)

- **Lifejacket** — спасжилет. **Immersion suit** — гидрокостюм. **Lifeboat / liferaft** — шлюпка / плот.
- **EPIRB** — аварийный радиобуй. **Fire extinguisher** — огнетушитель. **Fire hose** — пожарный рукав.
- **Breathing apparatus (SCBA)** — дыхательный аппарат.

## Фраза, которую нельзя перепутать

> "Attention all crew. Fire in the engine room. This is NOT a drill. Report to your muster stations."

Безопасность — общий язык моряков всего мира. Вакансии от судовладельцев, которые серьёзно относятся к безопасности, — на **seajobs.pro**.$ru$,
    'en', $en$In an emergency there is no time to search for words. These terms and commands must be automatic — lives depend on them.

## Alarms and signals

- **General alarm** — seven short blasts plus one long.
- **Fire alarm / abandon ship** — the two most serious.
- **Man overboard (MOB).**
- **Muster / muster station / muster list** — the assembly and who goes where.

## Drills

- **Fire drill / boat drill (abandon ship drill)** — the routine exercises.
- **Head count** — checking everyone is present.
- **This is a drill** — always announced to avoid panic.

## Commands and reports

- **Raise the alarm.**
- **Report to your muster station.**
- **All crew accounted for.**
- **Fight the fire / boundary cooling.**
- **Is anyone injured?**

## Life-saving and fire-fighting appliances

- **Lifejacket / immersion suit / lifeboat / liferaft** — survival gear.
- **EPIRB / fire extinguisher / fire hose** — locating and fighting.
- **Breathing apparatus (SCBA)** — for smoke and enclosed spaces.

## The phrase you must not confuse

> "Attention all crew. Fire in the engine room. This is NOT a drill. Report to your muster stations."

Safety is the common language of seafarers everywhere. Vacancies from owners who take safety seriously are on **seajobs.pro**.$en$),
  (SELECT id FROM forum_categories WHERE name ILIKE 'Морской английский' LIMIT 1),
  false, '2026-06-20 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM forum_topics WHERE title->>'ru' = 'Аварийный английский: тревоги, учения и команды в чрезвычайной ситуации');
