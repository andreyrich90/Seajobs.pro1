-- Third batch of original long-form guides for /guides (category = 'guide').
-- Bilingual ru+en (ua/pl/ro via the admin "translate" button). Idempotent —
-- each INSERT is guarded by the English title. Body uses the site's markdown
-- subset: "## " headings, "- "/"1. " lists, **bold**, [text](url).
-- Run once in the Supabase SQL Editor.

-- ── 11. The engine department explained ─────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'The engine department explained: from wiper to chief engineer',
    'ru', 'Машинная служба: от вайпера до старшего механика'),
  jsonb_build_object(
    'en', $en$The engine department keeps a ship alive — propulsion, power, fuel, fresh water and every system on board. If you are mechanically minded, it offers one of the clearest career ladders at sea. This guide explains who does what and how you climb.

## Ratings: where many careers start

- **Wiper** — the entry rating, cleaning and assisting in the engine room while learning the plant.
- **Motorman / Oiler** — maintains machinery, stands engine-room watches and supports the engineers.
- **Fitter** — the department's mechanic and welder, handling repairs and fabrication.
- **Pumpman** — on tankers, runs the cargo pumping systems.

## Officers: the licensed ranks

- **Fourth / Third Engineer** — junior engineers responsible for specific machinery such as generators, purifiers or the boiler.
- **Second Engineer** — runs day-to-day maintenance, the planned maintenance system and the engine-room team.
- **Chief Engineer** — heads the whole department and answers for the propulsion and power plant, budgets, spares and safety.

Alongside them, the **Electro-Technical Officer (ETO)** looks after electrical, electronic and automation systems.

## How you move up

1. **Build documented sea time** in each rank — the basis of every promotion.
2. **Earn the next Certificate of Competency (CoC)** under the STCW convention.
3. **Add high-value endorsements** — tanker, gas or DP — to reach better-paying fleets.

## Where it leads

Senior engineers are among the best-paid seafarers, and gas and offshore sit at the top. Compare pay on our [salary page](/salaries), read the wider [career path guide](/guides), and browse current openings for [Chief Engineer](/jobs/rank/chief-engineer) and [Second Engineer](/jobs/rank/2nd-engineer).$en$,
    'ru', $ru$Машинная служба поддерживает жизнь судна — движение, энергетику, топливо, пресную воду и все системы на борту. Если у вас техническая жилка, это одна из самых понятных карьерных лестниц в море. Разберём, кто чем занимается и как расти.

## Рядовой состав: с чего часто начинают

- **Вайпер** — начальная должность: уборка и помощь в машинном отделении с изучением установки.
- **Моторист / ойлер** — обслуживает механизмы, несёт машинные вахты и помогает механикам.
- **Токарь (фиттер)** — механик и сварщик службы: ремонт и изготовление деталей.
- **Помпмен (донкерман)** — на танкерах отвечает за грузовые насосные системы.

## Офицеры: дипломированные должности

- **Четвёртый / третий механик** — младшие механики, отвечающие за конкретные механизмы: генераторы, сепараторы, котёл.
- **Второй механик** — текущее обслуживание, система планового ТО и машинная команда.
- **Старший механик** — глава всей службы: движительная установка и энергетика, бюджеты, запчасти и безопасность.

Рядом — **электромеханик (ETO)**, отвечающий за электрические, электронные системы и автоматику.

## Как расти

1. **Набирайте задокументированный стаж** в каждой должности — основа любого повышения.
2. **Получайте следующий диплом (CoC)** по конвенции ПДНВ.
3. **Добавляйте ценные подтверждения** — танкерные, газовые или DP — чтобы выйти на более оплачиваемые флоты.

## Куда это ведёт

Старшие механики — среди самых высокооплачиваемых моряков, а газ и офшор — на вершине. Сравните оплату на [странице зарплат](/salaries), прочитайте общий [гайд по карьере](/guides) и смотрите вакансии для [старшего механика](/jobs/rank/chief-engineer) и [второго механика](/jobs/rank/2nd-engineer).$ru$),
  'Engine', 'guide',
  'linear-gradient(135deg,#0e2a45,#7c2d12)',
  true, '2026-07-30 08:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'The engine department explained: from wiper to chief engineer');

-- ── 12. Working on cruise ships ─────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Working on cruise ships: departments, life and how to get hired',
    'ru', 'Работа на круизных судах: службы, жизнь и как устроиться'),
  jsonb_build_object(
    'en', $en$Cruise ships are floating towns, and they need three very different kinds of crew: the mariners who run the ship, the technical teams who keep it powered, and the large hotel department that looks after thousands of guests. Whatever your background, there is likely a role for you.

## The three departments

- **Deck** — navigation and safety: from cadets and officers up to the Staff Captain and Master, plus ratings and security.
- **Engine** — propulsion, power, air conditioning and water: engineers, electricians and ratings keep a small city running.
- **Hotel** — by far the largest department: galley and restaurant, bars, housekeeping, guest services, entertainment, retail, spa and medical.

## What life is like

Cruise contracts usually run several months with structured schedules and busy days — guests are on board around the clock. In return you travel, live and eat on board, and work in an international team. Standards of service are high, and reliability and a guest-focused attitude matter as much as skills.

## How to get hired

1. **Match your experience to a department.** Hospitality, catering, retail or medical experience ashore transfers well to the hotel side; certified mariners and engineers apply to deck and engine.
2. **Hold the required STCW basic safety training** — every crew member needs it, regardless of role.
3. **Prepare a clear CV and a professional photo.** See our guide on [writing a maritime CV](/guides).

## Start your search

Browse [cruise and passenger vacancies](/jobs/vessel/cruise-ship) on SeaJobs.pro, build your [profile and CV](/jobs), and apply directly to the crewing manager — always free for seafarers.$en$,
    'ru', $ru$Круизное судно — это плавучий город, и ему нужны три совершенно разных типа экипажа: моряки, которые управляют судном, технические команды, которые дают ему энергию, и большая отельная служба, которая заботится о тысячах гостей. С каким бы опытом вы ни были, роль, скорее всего, найдётся.

## Три службы

- **Палубная** — навигация и безопасность: от кадетов и офицеров до стафф-капитана и капитана, плюс рядовой состав и служба безопасности.
- **Машинная** — движение, энергетика, кондиционирование и вода: механики, электрики и рядовые поддерживают работу «маленького города».
- **Отельная** — самая большая служба: камбуз и рестораны, бары, хаускипинг, гостевой сервис, развлечения, магазины, спа и медицина.

## Какая там жизнь

Круизные контракты обычно идут несколько месяцев с чётким графиком и насыщенными днями — гости на борту круглосуточно. Взамен вы путешествуете, живёте и питаетесь на борту и работаете в международной команде. Стандарты сервиса высокие, и надёжность и ориентация на гостя важны не меньше навыков.

## Как устроиться

1. **Соотнесите опыт со службой.** Опыт в гостеприимстве, кейтеринге, рознице или медицине на берегу хорошо переносится в отельную часть; дипломированные моряки и механики идут на палубу и в машину.
2. **Имейте обязательную подготовку STCW по безопасности** — она нужна каждому члену экипажа независимо от роли.
3. **Подготовьте понятное CV и профессиональное фото.** Смотрите наш гайд про [морское CV](/guides).

## Начните поиск

Смотрите [вакансии на круизные и пассажирские суда](/jobs/vessel/cruise-ship) на SeaJobs.pro, соберите [профиль и CV](/jobs) и откликайтесь напрямую крюинг-менеджеру — для моряков всегда бесплатно.$ru$),
  'Cruise', 'guide',
  'linear-gradient(135deg,#0c4a6e,#155e75)',
  true, '2026-07-29 08:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Working on cruise ships: departments, life and how to get hired');

-- ── 13. Understanding your seafarer contract ────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Understanding your seafarer contract: salary, overtime, leave and MLC rights',
    'ru', 'Как разобраться в контракте моряка: зарплата, переработки, отпуск и права по MLC'),
  jsonb_build_object(
    'en', $en$A job offer at sea is only as good as its contract. Two offers with the same headline salary can be very different once you read the details. This guide explains the terms that decide what you actually take home — and the rights that protect you.

## Read the salary terms carefully

- **On board only vs. including leave.** Some wages are paid only for days on board; others include paid leave. This changes your real annual income a lot.
- **Basic wage vs. total.** Check whether overtime, leave pay and allowances are part of the figure or on top of it.
- **Guaranteed overtime.** Many contracts include a fixed number of guaranteed overtime hours — know how much and how extra hours are paid.
- **Currency and payment.** Confirm the currency, how often you are paid and to which account.

## Know the rest of the terms

- **Contract length and rotation** — months on board and the leave that follows.
- **Joining and repatriation** — who pays for travel to and from the vessel.
- **Notice and early termination** — what happens if either side ends the contract early.

## Your rights under the MLC

The **Maritime Labour Convention (MLC)** sets minimum global standards for seafarers: a written employment agreement, regulated hours of rest, decent food and accommodation, medical care, and repatriation. A legitimate employer respects them. If a contract undercuts these basics, treat it as a red flag.

## Before you sign

1. **Read the whole contract** — never sign what you have not fully read.
2. **Ask about anything vague** and get answers in writing.
3. **Compare the pay** to the market on our [salary page](/salaries).
4. **Watch for scams** — never pay to be hired. See our guide on [avoiding crewing scams](/guides).$en$,
    'ru', $ru$Предложение работы в море стоит ровно столько, сколько стоит его контракт. Два предложения с одинаковой «заявленной» зарплатой могут сильно отличаться, когда прочитаешь детали. Разберём условия, которые определяют, сколько вы реально получите на руки, и права, которые вас защищают.

## Внимательно читайте условия по зарплате

- **Только на борту или с отпускными.** Одни зарплаты платят только за дни на борту, другие включают оплачиваемый отпуск. Это сильно меняет реальный годовой доход.
- **Базовая ставка или общая сумма.** Проверьте, входят ли переработки, отпускные и надбавки в цифру или идут сверху.
- **Гарантированные переработки.** Во многих контрактах есть фиксированное число гарантированных часов переработки — узнайте, сколько и как оплачиваются дополнительные часы.
- **Валюта и выплаты.** Уточните валюту, периодичность выплат и на какой счёт.

## Знайте остальные условия

- **Длина контракта и ротация** — месяцы на борту и последующий отпуск.
- **Посадка и репатриация** — кто оплачивает дорогу на судно и обратно.
- **Уведомление и досрочное прекращение** — что будет, если одна из сторон завершит контракт раньше.

## Ваши права по MLC

**Конвенция о труде в морском судоходстве (MLC)** задаёт минимальные мировые стандарты для моряков: письменный трудовой договор, нормируемые часы отдыха, достойное питание и размещение, медицинская помощь и репатриация. Добросовестный работодатель их соблюдает. Если контракт урезает эту базу — считайте это тревожным признаком.

## Перед подписанием

1. **Прочитайте контракт целиком** — никогда не подписывайте то, что не прочитали полностью.
2. **Спрашивайте про всё непонятное** и получайте ответы письменно.
3. **Сравните оплату** с рынком на [странице зарплат](/salaries).
4. **Остерегайтесь скама** — за трудоустройство не платят. Смотрите гайд про [как не попасться на скам](/guides).$ru$),
  'Contracts', 'guide',
  'linear-gradient(135deg,#0e2a45,#334155)',
  true, '2026-07-28 08:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Understanding your seafarer contract: salary, overtime, leave and MLC rights');

-- ── 14. Maritime English (SMCP) ─────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Maritime English and SMCP: why it matters and how to improve',
    'ru', 'Морской английский и SMCP: зачем он нужен и как подтянуть'),
  jsonb_build_object(
    'en', $en$On an international crew, English is the working language of the ship. It is how the bridge talks to the engine room, how you coordinate with port control, and how you handle an emergency without confusion. Strong maritime English is not just a hiring filter — it keeps the ship safe.

## Why crewing managers test it

Most interviews include an English check, because a misunderstanding at sea can be dangerous. Officers especially need clear communication for navigation, cargo and safety. Better English widens the fleets and companies open to you and often the salary too.

## What SMCP is

**SMCP** stands for the IMO **Standard Marine Communication Phrases** — a set of standardised phrases for shipboard and ship-to-shore communication. They cover navigation, safety, cargo, drills and emergencies, and are designed so seafarers of any first language understand each other. Officers are expected to know them.

## How to improve

1. **Learn the SMCP phrases** for your department and use them until they are automatic.
2. **Practise listening** — VHF recordings, maritime videos and English-language safety briefings.
3. **Build your vocabulary** around your rank: machinery, cargo operations, navigation, safety equipment.
4. **Speak whenever you can** — English conversation on board is the fastest way to improve.
5. **Prepare for the interview** — rehearse describing your experience, your vessels and your duties out loud.

## It pays off

Confident maritime English opens more contracts and higher-paying roles. Present it clearly on your CV, and when you are ready, browse [officer and rating vacancies](/jobs) on SeaJobs.pro.$en$,
    'ru', $ru$В международном экипаже английский — рабочий язык судна. На нём мостик говорит с машинным отделением, вы координируетесь с портовым контролем и без путаницы действуете в аварийной ситуации. Хороший морской английский — это не просто фильтр при найме, он держит судно в безопасности.

## Почему крюинги его проверяют

Почти любое собеседование включает проверку английского, потому что недопонимание в море может быть опасным. Офицерам особенно нужна чёткая коммуникация по навигации, грузу и безопасности. Лучший английский расширяет доступные вам флоты и компании, а часто и зарплату.

## Что такое SMCP

**SMCP** — это **Стандартные морские коммуникационные фразы** ИМО: набор стандартизированных фраз для связи на борту и «судно — берег». Они охватывают навигацию, безопасность, груз, учения и аварийные ситуации и составлены так, чтобы моряки с любым родным языком понимали друг друга. Офицеры должны их знать.

## Как подтянуть

1. **Выучите фразы SMCP** для своей службы и используйте их до автоматизма.
2. **Тренируйте аудирование** — записи УКВ-связи, морские видео и брифинги по безопасности на английском.
3. **Наращивайте словарь** под свою должность: механизмы, грузовые операции, навигация, спасательное оборудование.
4. **Говорите при любой возможности** — разговорный английский на борту улучшает язык быстрее всего.
5. **Готовьтесь к собеседованию** — проговаривайте вслух свой опыт, суда и обязанности.

## Это окупается

Уверенный морской английский открывает больше контрактов и более оплачиваемые должности. Чётко покажите его в CV, а когда будете готовы — смотрите [вакансии для офицеров и рядовых](/jobs) на SeaJobs.pro.$ru$),
  'English', 'guide',
  'linear-gradient(135deg,#134e4a,#0e7490)',
  true, '2026-07-27 08:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Maritime English and SMCP: why it matters and how to improve');

-- ── 15. Dynamic Positioning (DP) careers ────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Dynamic Positioning (DP): careers and how to become a DPO',
    'ru', 'Динамическое позиционирование (DP): карьера и как стать DPO'),
  jsonb_build_object(
    'en', $en$Dynamic Positioning is the technology that lets a vessel hold its exact position and heading automatically, using thrusters and computer control instead of anchors. It is essential to the offshore industry — supply, construction, diving, drilling and wind — and DP skills open some of the best-paid roles at sea.

## What a DPO does

A **Dynamic Positioning Operator (DPO)** controls the DP system from the bridge, keeping the vessel precisely on station during offshore operations — often within a metre while a crane lifts, a diver works or a supply run is underway. It is demanding, safety-critical work.

## The DP career ladder

- **Trainee / Junior DPO** — a deck officer beginning the DP certification path.
- **DPO** — a qualified operator standing DP watches.
- **Senior DPO (SDPO)** — an experienced operator, often the Master or Chief Officer on DP vessels.

## How to get certified

1. **Start as a certified deck officer** with a valid CoC.
2. **Follow the DP training scheme** — an induction course, logged DP sea time on a DP vessel, and a simulator/advanced course, leading to a DP certificate.
3. **Build DP sea time** across DP1, DP2 and DP3 vessels to widen the roles you qualify for.

## Why it is worth it

DP-certified officers are in steady demand in offshore, and the pay reflects the responsibility — offshore and DP roles sit among the highest on the market. Compare on our [salary page](/salaries), read the [fleet-choosing guide](/guides), and browse [offshore vacancies](/jobs/vessel/offshore) on SeaJobs.pro.$en$,
    'ru', $ru$Динамическое позиционирование — технология, позволяющая судну автоматически удерживать точную позицию и курс за счёт подруливающих устройств и компьютерного управления вместо якорей. Она незаменима в офшоре — снабжение, монтаж, водолазные работы, бурение и ветер — и навыки DP открывают одни из самых оплачиваемых должностей в море.

## Чем занимается DPO

**Оператор динамического позиционирования (DPO)** управляет системой DP с мостика, удерживая судно точно на месте во время офшорных операций — нередко в пределах метра, пока кран поднимает груз, работает водолаз или идёт передача снабжения. Это ответственная, критичная для безопасности работа.

## Карьерная лестница DP

- **Стажёр / младший DPO** — палубный офицер, начинающий путь сертификации DP.
- **DPO** — квалифицированный оператор, несущий DP-вахты.
- **Старший DPO (SDPO)** — опытный оператор, часто капитан или старпом на DP-судах.

## Как получить сертификат

1. **Начните как дипломированный палубный офицер** с действующим CoC.
2. **Пройдите схему подготовки DP** — вводный курс, засчитанный DP-стаж на DP-судне и симуляторный/продвинутый курс, ведущие к сертификату DP.
3. **Набирайте DP-стаж** на судах DP1, DP2 и DP3, чтобы расширить доступные должности.

## Почему оно того стоит

Офицеры с сертификатом DP стабильно востребованы в офшоре, и оплата соответствует ответственности — офшор и DP среди самых высоких на рынке. Сравните на [странице зарплат](/salaries), прочитайте [гайд по выбору флота](/guides) и смотрите [офшорные вакансии](/jobs/vessel/offshore) на SeaJobs.pro.$ru$),
  'Offshore', 'guide',
  'linear-gradient(135deg,#0a1f33,#0e7490)',
  true, '2026-07-26 08:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Dynamic Positioning (DP): careers and how to become a DPO');
