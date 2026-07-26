-- Second batch of original long-form guides for /guides (category = 'guide').
-- Bilingual ru+en (ua/pl/ro via the admin "translate" button). Idempotent —
-- each INSERT is guarded by the English title. Body uses the site's markdown
-- subset: "## " headings, "- "/"1. " lists, **bold**, [text](url).
-- Run once in the Supabase SQL Editor.

-- ── 6. Documents and visas every seafarer needs ─────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Documents and visas every seafarer needs',
    'ru', 'Документы и визы, которые нужны каждому моряку'),
  jsonb_build_object(
    'en', $en$A ready seafarer is one whose papers are complete and valid. Many contracts are lost at the last minute because a single document has expired. This guide lists what you need and how to keep it in order.

## Core identity and service documents

- **Seaman's book (Seafarer's Identity Document)** — your official record of sea service and identity at sea. Keep it current and never let it fill up without a spare.
- **Foreign (biometric) passport** — with at least 12–18 months of validity, because crewing managers avoid candidates whose passport expires mid-contract.
- **Certificate of Competency (CoC)** and its endorsements — your rank licence under STCW.
- **Medical certificate (ENG1 or equivalent)** — proof you are fit for sea service, usually valid up to two years.

## Visas that open more contracts

- **US C1/D visa** — required for many vessels calling at US ports. It widens the number of jobs you can take significantly.
- **Schengen visa** — useful for joining and leaving vessels through European ports.
- **Yellow fever and other vaccination certificates** — needed for certain trading areas.

## Keep a validity calendar

The most common cause of a rejected candidate is an expired document. Build a simple calendar of every certificate and visa with its expiry date, and renew anything within six months of expiry before it becomes urgent.

On SeaJobs.pro you store all of this once in your [seafarer profile](/jobs) — documents, visas and certificate expiry dates — so a crewing manager sees at a glance that you are ready to join. Read our companion guide on [STCW and certificates](/guides) for the training side of the paperwork.$en$,
    'ru', $ru$Готовый моряк — тот, у кого документы полные и действующие. Многие контракты срываются в последний момент из-за одного просроченного документа. Разберём, что нужно и как держать всё в порядке.

## Основные документы личности и стажа

- **Морская книжка (удостоверение личности моряка)** — официальный учёт морского стажа и личности в море. Держите её актуальной и заранее позаботьтесь о новой, пока старая не заполнилась.
- **Загранпаспорт (биометрический)** — со сроком действия минимум 12–18 месяцев: крюинги избегают кандидатов, у которых паспорт истекает посреди контракта.
- **Диплом (CoC)** и подтверждения к нему — «лицензия» на должность по ПДНВ.
- **Медицинское свидетельство (ENG1 или аналог)** — подтверждение годности к работе в море, обычно действует до двух лет.

## Визы, открывающие больше контрактов

- **Виза США C1/D** — нужна для многих судов, заходящих в порты США. Заметно расширяет число доступных вакансий.
- **Шенгенская виза** — полезна для посадки и списания через европейские порты.
- **Сертификат о жёлтой лихорадке и другие прививки** — нужны для отдельных районов плавания.

## Ведите календарь сроков

Самая частая причина отказа кандидату — просроченный документ. Составьте простой календарь всех сертификатов и виз со сроками действия и продлевайте всё за полгода до истечения, пока это не стало срочным.

На SeaJobs.pro вы храните всё это один раз в [профиле моряка](/jobs) — документы, визы и сроки действия сертификатов, — чтобы крюинг-менеджер сразу видел, что вы готовы заступить. Про учебную часть бумаг читайте наш гайд про [ПДНВ и сертификаты](/guides).$ru$),
  'Documents', 'guide',
  'linear-gradient(135deg,#0e2a45,#0f766e)',
  true, '2026-07-25 08:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Documents and visas every seafarer needs');

-- ── 7. How to choose a reliable crewing agency ──────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'How to choose a reliable crewing agency',
    'ru', 'Как выбрать надёжное крюинговое агентство'),
  jsonb_build_object(
    'en', $en$The agency you sail through shapes your whole career — timely joining, correct wages, and support if something goes wrong. Choosing well is as important as the contract itself. Here is how to tell a solid crewing agency from a risky one.

## Signs of a reliable agency

- **A real presence.** A working website, a physical office and a company registration you can check.
- **Clear, written terms.** The salary, contract length, rotation and joining port are stated up front — not "we'll discuss it later".
- **No fees from you.** A legitimate agency is paid by the shipowner and never charges the seafarer.
- **Reputation.** Other seafarers know the name and speak about it. Ask around in crew communities.
- **Named vessels and owners.** They can tell you which principal and which ships you would sail on.

## Warning signs

- Requests to pay for registration, a medical, a visa or "processing".
- A salary far above the market for the rank and vessel.
- Contact only through a free email or messenger, with no verifiable company.
- Vague or shifting contract terms, or pressure to sign immediately.

## Questions worth asking before you commit

1. Who is the shipowner or principal, and what is the vessel?
2. What exactly does the salary include — is it on board only, and is overtime guaranteed?
3. What are the contract length and rotation?
4. Who do I contact if there is a problem during the contract?

## How SeaJobs.pro helps

On SeaJobs.pro, crewing companies carry a verified badge, every vacancy shows a real salary, and your application goes straight to the crewing manager with no fee in between. Pair this with our guide on [avoiding crewing scams](/guides), and browse [current vacancies](/jobs) from agencies across Europe.$en$,
    'ru', $ru$Агентство, через которое вы ходите в рейсы, определяет всю карьеру — своевременную посадку, правильную зарплату и поддержку, если что-то пойдёт не так. Выбрать надёжное так же важно, как и сам контракт. Разберём, как отличить солидный крюинг от рискованного.

## Признаки надёжного агентства

- **Реальное присутствие.** Рабочий сайт, физический офис и регистрация компании, которую можно проверить.
- **Понятные письменные условия.** Зарплата, длина контракта, ротация и порт посадки указаны сразу — а не «обсудим позже».
- **Никаких сборов с вас.** Легальному агентству платит судовладелец, оно никогда не берёт денег с моряка.
- **Репутация.** Другие моряки знают это название и отзываются о нём. Спросите в морских сообществах.
- **Названы суда и судовладельцы.** Вам могут сказать, у какого принципала и на каких судах вы будете ходить.

## Тревожные признаки

- Просьбы заплатить за регистрацию, медкомиссию, визу или «оформление».
- Зарплата сильно выше рынка для этой должности и судна.
- Связь только через бесплатную почту или мессенджер, без проверяемой компании.
- Размытые или меняющиеся условия контракта, давление подписать немедленно.

## Вопросы, которые стоит задать до согласия

1. Кто судовладелец или принципал и что за судно?
2. Что именно входит в зарплату — только на борту, гарантированы ли переработки?
3. Какая длина контракта и ротация?
4. К кому обращаться, если во время контракта возникнет проблема?

## Чем помогает SeaJobs.pro

На SeaJobs.pro у крюинговых компаний есть бейдж проверенной, в каждой вакансии указана реальная зарплата, а ваша заявка уходит напрямую крюинг-менеджеру — без посредника и комиссий. Дополните это нашим гайдом про [как не попасться на скам](/guides) и смотрите [актуальные вакансии](/jobs) от агентств по всей Европе.$ru$),
  'Career', 'guide',
  'linear-gradient(135deg,#0e2a45,#155e75)',
  true, '2026-07-24 08:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'How to choose a reliable crewing agency');

-- ── 8. Life on board: contracts, rotations and daily routine ────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Life on board: contracts, rotations and daily routine',
    'ru', 'Жизнь на борту: контракты, ротации и распорядок дня'),
  jsonb_build_object(
    'en', $en$For anyone new to the sea, the biggest unknown is not the work itself but the rhythm of life on board. Understanding contracts, rotations and the daily routine helps you choose the right job and arrive prepared.

## Contract length and rotation

Contracts are usually measured in months on board, followed by paid leave at home. Common patterns:

- **Merchant fleet:** typically 4–9 months on, with leave afterwards. Longer trips often mean higher total earnings.
- **Offshore:** equal rotations such as 4 weeks on / 4 weeks off, sometimes with pay only for time on board.
- **Cruise and ferry:** contracts of several months with structured schedules.

Always check whether the salary is **on board only** or includes leave, and whether overtime is guaranteed.

## A day at sea

Life on board runs on watches and routines. A typical day includes:

- **Watchkeeping** — navigation or engine-room watches, often in a 4-on/8-off pattern for officers.
- **Maintenance and operations** — cargo work, drills, inspections and upkeep of the ship.
- **Meals and rest** — regulated rest hours are a legal requirement under the MLC.
- **Downtime** — gym, films, calls home where internet is available.

## Wellbeing matters

Long contracts test anyone. The Maritime Labour Convention (MLC) sets standards for rest, food, accommodation and access to shore. Good employers respect them — another reason to choose a reliable company.

## Match the job to your life

Rotation and trade area affect your life as much as the salary. Decide whether you want longer trips with bigger cheques or shorter, balanced rotations, then filter by fleet on [our vacancies](/jobs) — from [offshore](/jobs/vessel/offshore) to [tankers](/jobs/vessel/tanker) and [bulk carriers](/jobs/vessel/bulk-carrier).$en$,
    'ru', $ru$Для новичка на флоте главная неизвестность — не сама работа, а ритм жизни на борту. Понимание контрактов, ротаций и распорядка помогает выбрать подходящую работу и приехать подготовленным.

## Длина контракта и ротация

Контракты обычно измеряются месяцами на борту, после которых — оплачиваемый отпуск дома. Частые схемы:

- **Торговый флот:** как правило 4–9 месяцев на борту, затем отпуск. Более длинные рейсы часто означают больший суммарный заработок.
- **Офшор:** равные ротации, например 4 недели через 4, иногда с оплатой только за время на борту.
- **Круизы и паромы:** контракты на несколько месяцев с чётким графиком.

Всегда проверяйте, указана ли зарплата **только на борту** или с отпускными, и гарантированы ли переработки.

## День в море

Жизнь на борту строится на вахтах и распорядке. Типичный день включает:

- **Несение вахты** — навигационные или машинные вахты, у офицеров часто по схеме 4 через 8.
- **Обслуживание и операции** — грузовые работы, учения, инспекции и уход за судном.
- **Приёмы пищи и отдых** — нормируемые часы отдыха обязательны по MLC.
- **Свободное время** — спортзал, фильмы, звонки домой там, где есть интернет.

## Благополучие важно

Длинные контракты — испытание для любого. Конвенция о труде в морском судоходстве (MLC) задаёт нормы отдыха, питания, размещения и доступа на берег. Хорошие работодатели их соблюдают — ещё один повод выбирать надёжную компанию.

## Подбирайте работу под свою жизнь

Ротация и район плавания влияют на жизнь не меньше зарплаты. Решите, что вам ближе — длинные рейсы с большими чеками или короткие сбалансированные ротации, — и фильтруйте по флоту в [наших вакансиях](/jobs): от [офшора](/jobs/vessel/offshore) до [танкеров](/jobs/vessel/tanker) и [балкеров](/jobs/vessel/bulk-carrier).$ru$),
  'Life at sea', 'guide',
  'linear-gradient(135deg,#0c4a6e,#155e75)',
  true, '2026-07-23 08:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Life on board: contracts, rotations and daily routine');

-- ── 9. Tanker, bulk or offshore: choosing the right fleet ───────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Tanker, bulk or offshore: choosing the right fleet',
    'ru', 'Танкер, балкер или офшор: как выбрать свой флот'),
  jsonb_build_object(
    'en', $en$The type of vessel you work on shapes your pay, your certificates and your daily work. Many seafarers build a whole career in one segment. This guide compares the main fleets so you can choose where to specialise.

## Dry cargo: bulk carriers and general cargo

Bulk carriers move commodities like grain, coal and ore; general cargo and MPP ships carry mixed loads. The work is cargo-focused with long ocean passages. Entry requirements are the most accessible, which makes dry cargo a common starting point. See [bulk carrier vacancies](/jobs/vessel/bulk-carrier).

## Tankers: oil, chemical, product

Tankers carry liquid cargo and demand extra tanker endorsements and strict safety discipline. In return, they pay a premium over dry cargo for the same rank. If you are ready to invest in tanker courses, this is a reliable step up in earnings. See [tanker vacancies](/jobs/vessel/tanker).

## Gas carriers: LNG and LPG

Gas carriers are the specialist end of the tanker world — high standards, high responsibility and among the highest salaries afloat for senior officers.

## Offshore: AHTS, PSV and DP vessels

Offshore supply and construction vessels support oil, gas and wind projects. Work is often on equal rotations (for example 4 weeks on / 4 off) and pay is frequently quoted per day. DP (dynamic positioning) certification opens the best-paid offshore roles. See [offshore vacancies](/jobs/vessel/offshore).

## How to decide

1. **Earnings:** gas and offshore sit at the top, then tankers, then dry cargo. Compare on our [salary page](/salaries).
2. **Certificates:** tankers, gas and DP require extra courses — an investment that pays back.
3. **Lifestyle:** offshore rotations are shorter and more predictable; deep-sea trades mean longer trips.

Pick the segment that matches your goals, add the certificates it needs, and build your sea time there.$en$,
    'ru', $ru$Тип судна, на котором вы работаете, определяет и зарплату, и сертификаты, и повседневную работу. Многие моряки строят всю карьеру в одном сегменте. Сравним основные флоты, чтобы вы выбрали, где специализироваться.

## Сухой груз: балкеры и генеральный груз

Балкеры возят навалочные грузы — зерно, уголь, руду; суда генерального груза и MPP берут смешанные партии. Работа сосредоточена на грузе, с долгими океанскими переходами. Требования на вход самые доступные, поэтому сухогрузы — частая стартовая точка. Смотрите [вакансии на балкеры](/jobs/vessel/bulk-carrier).

## Танкеры: нефтяные, химические, продуктовые

Танкеры перевозят жидкий груз и требуют дополнительных танкерных подтверждений и строгой дисциплины безопасности. Взамен они платят больше сухогрузов за ту же должность. Если готовы вложиться в танкерные курсы — это надёжный шаг к росту дохода. Смотрите [вакансии на танкеры](/jobs/vessel/tanker).

## Газовозы: LNG и LPG

Газовозы — самый специализированный край танкерного мира: высокие стандарты, высокая ответственность и одни из самых больших зарплат в море для старших офицеров.

## Офшор: AHTS, PSV и DP-суда

Офшорные снабженцы и монтажные суда обслуживают нефтегазовые и ветровые проекты. Работа часто на равных ротациях (например, 4 недели через 4), а оплата нередко указывается за день. Сертификат DP (динамическое позиционирование) открывает самые оплачиваемые офшорные должности. Смотрите [офшорные вакансии](/jobs/vessel/offshore).

## Как определиться

1. **Заработок:** сверху газ и офшор, затем танкеры, потом сухогрузы. Сравнивайте на [странице зарплат](/salaries).
2. **Сертификаты:** танкеры, газ и DP требуют дополнительных курсов — вложение, которое окупается.
3. **Образ жизни:** офшорные ротации короче и предсказуемее; океанские перевозки означают долгие рейсы.

Выберите сегмент под свои цели, доберите нужные ему сертификаты и набирайте стаж именно там.$ru$),
  'Fleets', 'guide',
  'linear-gradient(135deg,#0a1f33,#0e7490)',
  true, '2026-07-22 08:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Tanker, bulk or offshore: choosing the right fleet');

-- ── 10. Getting your first contract: a guide for cadets and juniors ─────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Getting your first contract: a guide for cadets and juniors',
    'ru', 'Первый контракт: гайд для кадетов и начинающих'),
  jsonb_build_object(
    'en', $en$The hardest contract to get is your first one — everyone wants experience, and you are trying to earn it. The good news: with an officer shortage across the industry, motivated newcomers are in demand. Here is how to land that first job.

## Get the basics in place

1. **Complete your basic safety training (STCW BST)** — the four courses every seafarer must hold.
2. **Get a medical certificate and a seaman's book.**
3. **Prepare a clean, honest CV** — even with little sea time, present your training, courses and readiness clearly. Our guide on [writing a maritime CV](/guides) walks through it.

## Be realistic and flexible

- **Start where the door is open.** Dry cargo and general cargo ships have the most accessible entry requirements.
- **Consider a cadetship or junior rating role** to build documented sea time — the currency of every future promotion.
- **Be flexible on trade area and rotation** for the first contract; it opens the next one.

## Apply widely and follow up

Apply to many suitable vacancies, keep your profile complete, and respond quickly when a crewing manager contacts you. Reliability and availability matter as much as experience at this stage.

## Protect yourself from day one

Never pay to get hired — a legitimate agency never charges a seafarer. Read our guide on [avoiding crewing scams](/guides) before you send any money to anyone.

## Start now

Build your [seafarer profile and CV](/jobs) on SeaJobs.pro, then browse entry-level and cadet vacancies. Every contract you complete adds sea time — and sea time is what turns a newcomer into a sought-after officer.$en$,
    'ru', $ru$Самый трудный контракт — первый: всем нужен опыт, а вы как раз пытаетесь его получить. Хорошая новость: на фоне нехватки офицеров в отрасли мотивированные новички востребованы. Разберём, как получить первую работу.

## Заложите базу

1. **Пройдите базовую подготовку по безопасности (STCW BST)** — четыре курса, обязательных для каждого моряка.
2. **Оформите медицинское свидетельство и морскую книжку.**
3. **Подготовьте аккуратное честное CV** — даже с малым стажем чётко покажите обучение, курсы и готовность. Как это сделать — в нашем гайде про [морское CV](/guides).

## Будьте реалистичны и гибки

- **Начинайте там, где дверь открыта.** У сухогрузов и судов генерального груза самые доступные требования на вход.
- **Рассмотрите кадетство или младшую рядовую должность**, чтобы набрать задокументированный стаж — валюту любого будущего повышения.
- **Будьте гибки по району плавания и ротации** на первом контракте; он открывает следующий.

## Откликайтесь широко и не пропадайте

Откликайтесь на много подходящих вакансий, держите профиль заполненным и быстро отвечайте, когда крюинг-менеджер выходит на связь. Надёжность и готовность на этом этапе важны не меньше опыта.

## Защищайте себя с первого дня

Никогда не платите за трудоустройство — легальное агентство не берёт денег с моряка. Прочитайте наш гайд про [как не попасться на скам](/guides), прежде чем кому-либо переводить деньги.

## Начните сейчас

Соберите [профиль моряка и CV](/jobs) на SeaJobs.pro и смотрите вакансии для начинающих и кадетов. Каждый завершённый контракт добавляет стаж — а именно стаж превращает новичка в востребованного офицера.$ru$),
  'Career', 'guide',
  'linear-gradient(135deg,#134e4a,#155e75)',
  true, '2026-07-21 08:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Getting your first contract: a guide for cadets and juniors');
