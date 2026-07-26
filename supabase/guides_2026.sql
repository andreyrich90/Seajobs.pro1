-- Original long-form guides for the /guides section (category = 'guide').
-- Bilingual ru+en (ua/pl/ro can be added via the admin "translate" button).
-- Each INSERT is idempotent — guarded by the English title. Body is the site's
-- markdown subset: "## " headings, "- "/"1. " lists, **bold**, [text](url).
-- Run once in the Supabase SQL Editor.

-- ── 1. Maritime career path: from cadet to captain ──────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Maritime career path: from cadet to captain',
    'ru', 'Карьера моряка: путь от кадета до капитана'),
  jsonb_build_object(
    'en', $en$A career at sea is one of the few where a motivated person can climb from an entry-level trainee to command of a multi-million-dollar vessel in roughly a decade. The path is well defined, governed by the international STCW convention, and every step is measured in **sea time** — the months you actually spend working on board.

This guide maps the two main departments, deck and engine, and what it takes to move up each one.

## The deck department

The deck department runs navigation, cargo and the safety of the ship. The ladder looks like this:

- **Deck Cadet** — a trainee officer completing a structured training record book while studying for the first certificate.
- **Third / Second Officer** — a junior watchkeeping officer responsible for navigation watches, safety equipment and, for the Second Officer, passage planning.
- **Chief Officer (Chief Mate)** — second in command; runs cargo operations, stability and the deck crew.
- **Master (Captain)** — total command of the vessel, crew and safe navigation, and legally responsible for the ship.

## The engine department

The engine department keeps the ship moving and every system running:

- **Engine Cadet** — a trainee engineer building sea time and completing a training record.
- **Fourth / Third Engineer** — junior engineers responsible for specific machinery and watchkeeping.
- **Second Engineer** — runs the day-to-day maintenance and the engine-room team.
- **Chief Engineer** — heads the whole engineering department and answers for the propulsion and power plant.

Alongside these sit **ratings** (Able Seaman, Bosun, Motorman, Fitter), **electro-technical officers (ETO)** and **catering crew** — every one of them essential to a working ship.

## How you actually move up

1. **Get sea time.** Promotion is tied to documented months in rank. Keep an accurate service record book.
2. **Earn the next Certificate of Competency (CoC).** Each rank requires exams and approved sea service under the STCW convention.
3. **Add specialised endorsements.** Tanker, DP (dynamic positioning), gas or offshore endorsements open higher-paying fleets.
4. **Build a track record with reliable crewing agencies** who will promote you when a slot opens.

## Where to start

If you are early in your career, the fastest way to accumulate sea time is to stay employed and keep sailing. Browse current openings for [cadets and junior officers](/jobs), and when you are ready to step up, filter by your target rank — for example [Master](/jobs/rank/master) or [Chief Engineer](/jobs/rank/chief-engineer) — to see what employers expect at that level.$en$,
    'ru', $ru$Морская карьера — одна из немногих, где мотивированный человек за примерно десять лет может пройти путь от практиканта до командования судном стоимостью в миллионы долларов. Путь чётко определён международной конвенцией ПДНВ (STCW), и каждый шаг измеряется **морским стажем** — месяцами, которые вы реально отработали на борту.

В этом гайде — две основные службы, палубная и машинная, и что нужно, чтобы расти в каждой из них.

## Палубная служба

Палубная служба отвечает за навигацию, груз и безопасность судна. Лестница выглядит так:

- **Кадет палубный** — практикант, заполняющий книжку регистрации подготовки и готовящийся к первому диплому.
- **Третий / Второй помощник** — младший вахтенный офицер: навигационные вахты, спасательное оборудование, а у второго помощника — планирование перехода.
- **Старший помощник (чиф-мейт)** — второе лицо на судне: грузовые операции, остойчивость и палубная команда.
- **Капитан (мастер)** — полное командование судном, экипажем и безопасностью плавания; несёт юридическую ответственность за судно.

## Машинная служба

Машинная служба обеспечивает ход судна и работу всех систем:

- **Кадет машинный** — практикант, набирающий стаж и заполняющий книжку подготовки.
- **Четвёртый / Третий механик** — младшие механики, отвечающие за конкретные механизмы и вахту.
- **Второй механик** — текущее обслуживание и машинная команда.
- **Старший механик (чиф)** — глава всей машинной службы, отвечает за движительную установку и энергетику.

Рядом с ними — **рядовой состав** (матрос, боцман, моторист, токарь), **электромеханики (ETO)** и **кейтеринг**; без каждого из них судно не работает.

## Как реально расти

1. **Набирайте стаж.** Повышение привязано к задокументированным месяцам в должности. Ведите книжку морского стажа аккуратно.
2. **Получайте следующий диплом (CoC).** Каждый ранг требует экзаменов и одобренного ценза по конвенции ПДНВ.
3. **Добавляйте специализированные подтверждения.** Танкерные, DP (динамическое позиционирование), газовые или офшорные эндорсменты открывают более высокооплачиваемые флоты.
4. **Нарабатывайте репутацию у надёжных крюингов**, которые повысят вас, когда откроется вакансия.

## С чего начать

Если вы в начале карьеры, самый быстрый способ набирать стаж — оставаться в работе и продолжать ходить в рейсы. Смотрите текущие вакансии для [кадетов и младших офицеров](/jobs), а когда будете готовы к повышению — фильтруйте по целевой должности, например [Капитан](/jobs/rank/master) или [Старший механик](/jobs/rank/chief-engineer), чтобы увидеть требования работодателей на этом уровне.$ru$),
  'Career', 'guide',
  'linear-gradient(135deg,#0e2a45,#155e75)',
  true, '2026-07-20 08:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Maritime career path: from cadet to captain');

-- ── 2. STCW and seafarer certificates explained ─────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'STCW and seafarer certificates explained',
    'ru', 'Сертификаты моряка и ПДНВ (STCW): простое объяснение'),
  jsonb_build_object(
    'en', $en$Before a crewing manager will consider you, your certificates have to be in order. For newcomers the alphabet soup — STCW, CoC, GMDSS, BST — can be confusing. This guide explains what each document is and why it matters.

## What STCW is

STCW is the International Convention on **Standards of Training, Certification and Watchkeeping for Seafarers**. It sets the minimum training every seafarer in the world must complete before working on a commercial ship. When a vacancy says "valid STCW", it means your basic safety training and certificates meet this global standard.

## The certificates you will need

- **Basic Safety Training (BST)** — four short courses every seafarer must hold: personal survival techniques, fire prevention and fire fighting, elementary first aid, and personal safety and social responsibility.
- **Certificate of Competency (CoC)** — your rank licence. It proves you are qualified to serve as, say, a Second Officer or Chief Engineer. Each promotion needs a higher CoC.
- **GMDSS** — the Global Maritime Distress and Safety System radio certificate, required for deck officers.
- **Medical certificate (ENG1 or equivalent)** — proof you are medically fit for sea service.
- **Seaman's book (Seafarer's Identity Document)** — your official record of sea service and identity at sea.

## Endorsements that raise your value

On top of the basics, specialised courses let you work on higher-paying vessels:

- **Tanker familiarisation and advanced** courses for oil, chemical and gas carriers.
- **Dynamic Positioning (DP)** for offshore supply and construction vessels.
- **Advanced fire fighting, medical care, proficiency in survival craft (PSCRB)** for senior roles.

## Keep track of expiry dates

Most certificates are valid for five years and must be revalidated. A single expired document can cost you a contract at the last moment. Keep a simple list of every certificate and its expiry date — and update it before every job search.

On SeaJobs.pro you can store all of this in your profile: build your [seafarer profile and CV](/jobs) once, add your certificates and their validity, and apply to any vacancy in a click with everything a crewing manager needs already attached.$en$,
    'ru', $ru$Прежде чем крюинг-менеджер начнёт вас рассматривать, ваши сертификаты должны быть в порядке. Для новичков вся эта «азбука» — ПДНВ, CoC, ГМССБ, BST — сбивает с толку. Разберём, что за каждым документом стоит и зачем он нужен.

## Что такое ПДНВ (STCW)

ПДНВ — это Международная конвенция о **подготовке и дипломировании моряков и несении вахты**. Она задаёт минимум подготовки, который должен пройти любой моряк в мире, прежде чем работать на коммерческом судне. Когда в вакансии написано «valid STCW», имеется в виду, что ваша базовая подготовка по безопасности и сертификаты соответствуют этому мировому стандарту.

## Какие сертификаты понадобятся

- **Базовая подготовка по безопасности (BST)** — четыре коротких курса, обязательных для каждого моряка: способы личного выживания, предотвращение и борьба с пожаром, элементарная первая помощь, личная безопасность и общественные обязанности.
- **Диплом (CoC)** — ваша «лицензия» на должность. Подтверждает право работать, например, вторым помощником или старшим механиком. Каждое повышение требует более высокого диплома.
- **ГМССБ (GMDSS)** — радиосвязь Глобальной морской системы связи при бедствии; обязательна для палубных офицеров.
- **Медицинское свидетельство (ENG1 или аналог)** — подтверждение годности к работе в море.
- **Морская книжка (удостоверение личности моряка)** — официальный документ учёта стажа и личности в море.

## Подтверждения, повышающие вашу ценность

Сверх базы специализированные курсы открывают доступ к более высокооплачиваемым судам:

- **Танкерные курсы** (базовый и продвинутый) для нефтяных, химических и газовых танкеров.
- **Динамическое позиционирование (DP)** для офшорных снабженцев и монтажных судов.
- **Продвинутая борьба с пожаром, медицинский уход, спасательные шлюпки (PSCRB)** для старших должностей.

## Следите за сроками действия

Большинство сертификатов действуют пять лет и требуют переподтверждения. Один просроченный документ может стоить вам контракта в последний момент. Ведите простой список всех сертификатов и их сроков — и обновляйте его перед каждым поиском работы.

На SeaJobs.pro всё это можно хранить в профиле: один раз соберите [профиль моряка и CV](/jobs), добавьте сертификаты и их срок действия — и откликайтесь на любую вакансию в один клик, уже приложив всё, что нужно крюинг-менеджеру.$ru$),
  'Certificates', 'guide',
  'linear-gradient(135deg,#134e4a,#0e7490)',
  true, '2026-07-19 08:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'STCW and seafarer certificates explained');

-- ── 3. How much do seafarers earn: salaries by rank and vessel ──────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'How much do seafarers earn? Salaries by rank and vessel type',
    'ru', 'Сколько зарабатывают моряки? Зарплаты по рангам и типам судов'),
  jsonb_build_object(
    'en', $en$"How much does the job pay?" is the first question every seafarer asks — and too often the answer is a vague "negotiable". This guide explains what actually drives a seafarer's wage and how to compare offers honestly.

## What determines the salary

Four factors move a seafarer's pay more than anything else:

1. **Rank.** The single biggest factor. A Master or Chief Engineer earns several times what a rating does.
2. **Vessel type.** Tankers, gas carriers and offshore units pay a premium over dry cargo for the same rank, because of the extra certificates and responsibility involved.
3. **Certificates and experience.** Tanker and DP endorsements, and time already served in rank, push an offer up.
4. **Company and trade.** Established operators and demanding trading areas pay more.

## Typical ranges

Pay is usually quoted per month (offshore is often per day). As a rough guide across the current market:

- **Ratings** (AB, Bosun, Motorman, Cook) — roughly €1,400–3,500 per month depending on vessel and experience.
- **Junior officers** (2nd/3rd Officer, 3rd/4th Engineer) — roughly €3,500–7,000 per month.
- **Senior officers** (Master, Chief Engineer, Chief Officer, 2nd Engineer) — roughly €7,000–14,000+ per month, with gas and offshore at the top.

These are indicative ranges, not a promise — always check the actual figure on the vacancy.

## Compare before you sign

Never accept "salary negotiable" as a final answer. A fair employer states the pay. Watch for whether the figure is **on board only** or includes leave, and whether overtime is guaranteed.

On SeaJobs.pro every vacancy shows a real salary range, and our [salary comparison page](/salaries) lets you see average pay by rank and vessel type — updated from current vacancies on the portal. Use it to benchmark any offer before you commit.$en$,
    'ru', $ru$«Сколько платят?» — первый вопрос любого моряка, и слишком часто ответ звучит расплывчато: «договорная». Разберём, что на самом деле определяет зарплату моряка и как честно сравнивать предложения.

## От чего зависит зарплата

Сильнее всего на оплату влияют четыре фактора:

1. **Ранг.** Главный фактор. Капитан или старший механик зарабатывает в несколько раз больше рядового.
2. **Тип судна.** Танкеры, газовозы и офшор платят больше, чем сухогрузы, за ту же должность — из-за дополнительных сертификатов и ответственности.
3. **Сертификаты и опыт.** Танкерные и DP-подтверждения и уже наработанный ценз в должности поднимают предложение.
4. **Компания и район плавания.** Крупные операторы и сложные районы платят больше.

## Типичные диапазоны

Зарплату обычно указывают за месяц (офшор часто — за день). Ориентировочно по текущему рынку:

- **Рядовой состав** (матрос, боцман, моторист, повар) — примерно €1 400–3 500 в месяц в зависимости от судна и опыта.
- **Младшие офицеры** (2-й/3-й помощник, 3-й/4-й механик) — примерно €3 500–7 000 в месяц.
- **Старшие офицеры** (капитан, старший механик, старпом, второй механик) — примерно €7 000–14 000+ в месяц; газ и офшор — на верхней границе.

Это ориентировочные диапазоны, а не обещание — всегда сверяйтесь с реальной цифрой в вакансии.

## Сравнивайте перед подписанием

Никогда не принимайте «зарплата договорная» как окончательный ответ. Добросовестный работодатель называет оплату. Обращайте внимание, указана ли сумма **только на борту** или с отпускными, и гарантированы ли переработки.

На SeaJobs.pro в каждой вакансии показана реальная вилка зарплаты, а на [странице сравнения зарплат](/salaries) можно увидеть средние выплаты по рангу и типу судна — по актуальным вакансиям портала. Используйте её, чтобы оценить любое предложение до того, как соглашаться.$ru$),
  'Salaries', 'guide',
  'linear-gradient(135deg,#0a1f33,#b45309)',
  true, '2026-07-18 08:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'How much do seafarers earn? Salaries by rank and vessel type');

-- ── 4. How to avoid crewing scams ───────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'How to avoid crewing scams: never pay to get a job at sea',
    'ru', 'Как не попасться на скам крюинга: за работу в море не платят'),
  jsonb_build_object(
    'en', $en$Where there are seafarers looking for contracts, there are scammers pretending to be crewing agencies. The scam is almost always the same: they promise a well-paid contract, then ask you to pay — for "registration", a medical, a visa or "processing" — and disappear once you send the money.

The rule that protects you is simple.

## The golden rule

**A legitimate crewing agency never asks a seafarer for money to get hired.** Agencies are paid by shipowners, not by you. If anyone asks you to pay to be placed on a ship, it is a scam — full stop.

## Red flags to watch for

- A request to **pay a fee** for a job, an interview, a medical, a visa or "document processing".
- Pressure to decide **immediately** or send money "today to hold the place".
- A salary that is **far above the market** for the rank and vessel.
- Contact only through a **free email or messenger**, with no real company website or office.
- A "contract" full of errors, or one they refuse to let you read carefully.
- Requests for your **passport scans, bank details or a deposit** before any genuine process.

## How to protect yourself

1. **Never pay.** No exceptions.
2. **Verify the company.** Check the agency's real website, address and reputation. Ask other seafarers.
3. **Keep everything in writing** and read the contract in full before signing.
4. **Trust your instincts.** If it feels too good to be true, it is.

## How SeaJobs.pro helps

On SeaJobs.pro, applying is always free for seafarers, crewing companies carry a verified badge, and your application goes directly to the crewing manager — no middleman collecting a fee. We display an anti-scam warning across the site and remove listings and companies that break the rule. If you are ever asked to pay, stop all contact and let us know.$en$,
    'ru', $ru$Там, где моряки ищут контракты, всегда есть мошенники, выдающие себя за крюинговые агентства. Схема почти всегда одна: обещают хорошо оплачиваемый контракт, затем просят заплатить — за «регистрацию», медкомиссию, визу или «оформление» — и исчезают, как только вы переводите деньги.

Правило, которое вас защищает, простое.

## Золотое правило

**Легальное крюинговое агентство никогда не просит у моряка денег за трудоустройство.** Агентствам платят судовладельцы, а не вы. Если у вас просят деньги за место на судне — это скам, точка.

## Тревожные признаки

- Просьба **заплатить** за работу, собеседование, медкомиссию, визу или «оформление документов».
- Давление принять решение **немедленно** или прислать деньги «сегодня, чтобы придержать место».
- Зарплата **сильно выше рынка** для этой должности и судна.
- Связь только через **бесплатную почту или мессенджер**, без реального сайта и офиса компании.
- «Контракт» с ошибками или который вам не дают спокойно прочитать.
- Просьбы прислать **сканы паспорта, банковские данные или задаток** до всякого реального процесса.

## Как себя защитить

1. **Никогда не платите.** Без исключений.
2. **Проверяйте компанию.** Смотрите реальный сайт, адрес и репутацию агентства. Спросите других моряков.
3. **Всё фиксируйте письменно** и читайте контракт целиком до подписания.
4. **Доверяйте чутью.** Если предложение слишком хорошее, чтобы быть правдой, — так и есть.

## Чем помогает SeaJobs.pro

На SeaJobs.pro отклик для моряков всегда бесплатный, у крюинговых компаний есть бейдж проверенной, а ваша заявка уходит напрямую крюинг-менеджеру — без посредника, собирающего комиссию. Мы показываем предупреждение о скаме по всему сайту и удаляем объявления и компании, нарушающие правило. Если у вас когда-либо просят деньги — прекратите общение и сообщите нам.$ru$),
  'Safety', 'guide',
  'linear-gradient(135deg,#7f1d1d,#b45309)',
  true, '2026-07-17 08:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'How to avoid crewing scams: never pay to get a job at sea');

-- ── 5. How to write a maritime CV that gets you hired ───────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'How to write a maritime CV that gets you hired',
    'ru', 'Как составить морское CV, которое приведёт к контракту'),
  jsonb_build_object(
    'en', $en$A crewing manager may open dozens of CVs for a single vacancy. Yours has a few seconds to show that you are qualified, available and easy to hire. A maritime CV is not a general résumé — it has its own conventions. Here is what to include and how to stand out.

## What a maritime CV must contain

- **Personal and contact details** — full name, nationality, date of birth, phone/WhatsApp and email.
- **Rank and readiness date** — the position you apply for and the date you can join. Crewing managers filter on availability.
- **Sea service history** — for each vessel: name, type, DWT/GRT, engine, your rank, flag, company and the exact dates. This is the part employers study most.
- **Certificates and documents** — CoC, STCW courses, GMDSS, medical, seaman's book, passport and visas (US C1/D, Schengen) with expiry dates.
- **A short professional summary** — two or three sentences on your experience and strengths.

## Make it easy to say yes

1. **Lead with your rank and total sea time** — the two facts a manager checks first.
2. **List experience newest first**, and keep vessel data consistent.
3. **Show valid documents.** Highlight expiry dates so there is no doubt you can join now.
4. **Add a clear photo** in work clothing — professional, not a selfie.
5. **Keep it to one or two pages.** Dense, relevant, no filler.

## Avoid these mistakes

- Gaps in sea service with no explanation.
- Expired certificates left on the CV.
- A generic office-style résumé with no vessel details.
- Typos in dates, ranks or vessel names — they read as carelessness.

## Build it in minutes

You do not have to format all this by hand. On SeaJobs.pro you fill your profile once — rank, sea service, certificates, documents and readiness date — and the built-in [CV builder](/jobs) generates a clean, professional maritime CV you can download as a PDF or a shareable card. When you apply, that complete CV goes straight to the crewing manager.$en$,
    'ru', $ru$На одну вакансию крюинг-менеджер может открыть десятки CV. У вашего есть несколько секунд, чтобы показать: вы квалифицированы, свободны и вас легко нанять. Морское CV — это не обычное резюме, у него свои правила. Разберём, что включить и как выделиться.

## Что обязательно в морском CV

- **Личные и контактные данные** — ФИО, национальность, дата рождения, телефон/WhatsApp и email.
- **Ранг и дата готовности** — должность, на которую претендуете, и дата, когда можете заступить. Крюинги фильтруют по готовности.
- **История морского стажа** — по каждому судну: название, тип, DWT/GRT, двигатель, ваш ранг, флаг, компания и точные даты. Именно это работодатель изучает внимательнее всего.
- **Сертификаты и документы** — диплом (CoC), курсы STCW, ГМССБ, медкомиссия, морская книжка, паспорт и визы (US C1/D, Шенген) со сроками действия.
- **Короткое профессиональное резюме** — две-три фразы об опыте и сильных сторонах.

## Сделайте так, чтобы вам легко было сказать «да»

1. **Начните с ранга и общего стажа** — два факта, которые менеджер проверяет первыми.
2. **Опыт — от свежего к старому**, данные по судам единообразны.
3. **Покажите действующие документы.** Выделите сроки действия, чтобы не было сомнений, что можете заступить сейчас.
4. **Добавьте чёткое фото** в рабочей одежде — профессиональное, не селфи.
5. **Одна-две страницы.** Плотно, по делу, без «воды».

## Избегайте этих ошибок

- Пробелы в стаже без объяснения.
- Просроченные сертификаты, оставленные в CV.
- Обычное «офисное» резюме без данных по судам.
- Опечатки в датах, рангах и названиях судов — читаются как небрежность.

## Соберите его за минуты

Всё это не нужно оформлять вручную. На SeaJobs.pro вы один раз заполняете профиль — ранг, стаж, сертификаты, документы и дату готовности — и встроенный [конструктор CV](/jobs) собирает аккуратное профессиональное морское CV, которое можно скачать в PDF или как карточку для соцсетей. При отклике это готовое CV уходит напрямую крюинг-менеджеру.$ru$),
  'CV', 'guide',
  'linear-gradient(135deg,#0e2a45,#334155)',
  true, '2026-07-16 08:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'How to write a maritime CV that gets you hired');
