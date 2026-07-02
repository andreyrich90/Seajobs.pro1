-- Forum topics for SeaJobs.pro — July 2026 SEO batch (10 new posts).
-- Fills keyword clusters the forum does not yet cover (seaman CV, seaman's book,
-- taxes, becoming a seafarer, flags of convenience, DPO, cruise ships, ranks
-- glossary, seasickness, reading a contract). Each post is bilingual (ru + en)
-- so both the Russian and English sites rank; ua/pl can be auto-translated later
-- from the admin. Run in the Supabase SQL Editor (service role bypasses RLS).
-- Idempotent — each INSERT is guarded by the Russian title, safe to re-run.

-- Helper values reused by every insert:
--   author  = 'Редакция SeaJobs.pro'
--   user_id = the andreyrich90@gmail.com account
--   category_id resolved by name (tolerant ILIKE), NULL if the section is absent.

-- ── 1. Резюме моряка (CV) ─────────────────────────────────────────────────────
INSERT INTO forum_topics (user_id, author_name, title, content, category_id, is_pinned, created_at)
SELECT
  (SELECT id FROM auth.users WHERE email = 'andreyrich90@gmail.com' LIMIT 1),
  'Редакция SeaJobs.pro',
  jsonb_build_object(
    'ru', 'Резюме моряка (CV): как составить, что писать и образец, который берут на контракт',
    'en', 'Seaman CV: how to write a maritime resume that actually gets you the contract (with example)'),
  jsonb_build_object('ru', $ru$Крюинговый менеджер тратит на первый просмотр вашего CV меньше минуты. За эту минуту он решает: звонить вам или закрыть файл. Хорошее резюме моряка — это не творчество, это чёткая анкета, по которой сразу видно, подходите вы под вакансию или нет.

## Что должно быть в CV моряка

**Личные данные.** ФИО как в загранпаспорте, дата рождения, гражданство, город, телефон, email, Skype/WhatsApp. Фото в судовой или деловой одежде — обязательно.

**Должность и звание.** Ранг, на который претендуете (Master, Chief Officer, AB, 2nd Engineer и т.д.). Пишите так, как это называется в международной практике.

**Документы.** Диплом (CoC), подтверждения (endorsement) под флагами, паспорт моряка, виза США C1/D, срок годности каждого документа. Менеджер смотрит сюда в первую очередь.

**Опыт работы.** Таблицей, от последнего к первому: судно, тип судна, флаг, GT/DWT, тип двигателя (для механиков), судовладелец/крюинг, ваша должность, даты посадки и списания. Пробелы между контрактами лучше объяснить одной строкой.

**Сертификаты STCW.** Basic Safety, Advanced Fire Fighting, танкерные, GMDSS, DP — с датами.

**Образование и языки.** Морской вуз/училище, уровень английского (Marlins — балл, если сдавали).

## Частые ошибки

- Резюме на три страницы «воды». Крюинг хочет факты, а не эссе.
- Нет типа судна и GT — менеджер не может сопоставить с вакансией.
- Просрочены документы, а в CV это не видно.
- Одно резюме на все должности. Под танкер и под балкер акценты разные.
- Фото с отдыха, в футболке, с солнцезащитными очками.

## Формат и отправка

PDF, имя файла — `Familia_Rank_CV.pdf` (латиницей). В теле письма — одна-две строки: должность, готовность к посадке, ключевые документы. Не прикладывайте 20 сканов сразу — их попросят позже.

Готовое резюме? Загрузите его в профиль на **seajobs.pro** — и откликайтесь на вакансии в один клик, CV уходит напрямую крюинг-менеджеру.$ru$,
    'en', $en$A crewing manager spends less than a minute on the first look at your CV. In that minute they decide whether to call you or close the file. A good seaman CV is not a creative essay — it is a clear data sheet that instantly shows whether you fit the vacancy.

## What a seaman CV must contain

**Personal details.** Full name as in your passport, date of birth, nationality, city, phone, email, Skype/WhatsApp. A photo in uniform or business dress is a must.

**Rank / position.** The rank you are applying for (Master, Chief Officer, AB, 2nd Engineer, etc.), written the way it is used internationally.

**Documents.** CoC, flag endorsements, seaman's book, US C1/D visa, and the expiry date of each. This is the first thing a manager reads.

**Sea service.** A table, most recent first: vessel name, vessel type, flag, GT/DWT, engine type (for engineers), owner/manager, your rank, sign-on and sign-off dates. Explain gaps between contracts in one line.

**STCW certificates.** Basic Safety, Advanced Fire Fighting, tanker courses, GMDSS, DP — with dates.

**Education and languages.** Maritime academy, English level (Marlins score if taken).

## Common mistakes

- A three-page CV full of filler. Crewing wants facts, not prose.
- No vessel type or GT — the manager cannot match you to the job.
- Expired documents that the CV does not reveal.
- One CV for every rank. Tanker and bulker emphasis differ.
- A holiday photo in a T-shirt and sunglasses.

## Format and sending

PDF, file name `Surname_Rank_CV.pdf`. In the email body, one or two lines: rank, availability, key documents. Do not attach 20 scans at once — they will be requested later.

CV ready? Upload it to your profile on **seajobs.pro** and apply in one click — it goes straight to the crewing manager.$en$),
  (SELECT id FROM forum_categories WHERE name ILIKE 'Карьера%' LIMIT 1),
  false, '2026-06-22 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM forum_topics WHERE title->>'ru' = 'Резюме моряка (CV): как составить, что писать и образец, который берут на контракт');

-- ── 2. Паспорт моряка / Seaman's Book ────────────────────────────────────────
INSERT INTO forum_topics (user_id, author_name, title, content, category_id, is_pinned, created_at)
SELECT
  (SELECT id FROM auth.users WHERE email = 'andreyrich90@gmail.com' LIMIT 1),
  'Редакция SeaJobs.pro',
  jsonb_build_object(
    'ru', 'Паспорт моряка и мореходная книжка: что это, зачем нужно и как получить в 2026 году',
    'en', 'Seaman''s Book and seafarer''s documents: what they are and how to get them in 2026'),
  jsonb_build_object('ru', $ru$Без правильного пакета документов вас не возьмут ни на одно судно, каким бы сильным ни было CV. Разберём базовый набор моряка и в каком порядке его собирать.

## Мореходная книжка (Seaman's Book)

Это ваш главный «трудовой» документ в море. В неё вносят каждый контракт: судно, должность, даты посадки и списания. Именно по книжке считается ваш морской стаж (ценз) для следующего диплома. Оформляется в морской администрации; для работы под иностранным флагом часто нужна книжка международного образца.

## Паспорт моряка (удостоверение личности моряка, SID)

Документ, удостоверяющий личность именно как моряка, по конвенции ILO. Позволяет проходить через границы в портах, съезжать на берег, следовать к судну и обратно. Не путать с загранпаспортом — нужны оба.

## Диплом (CoC) и подтверждения (Endorsement)

Диплом подтверждает вашу квалификацию (вахтенный помощник, механик, капитан). Endorsement — это признание вашего диплома конкретным флагом (Панама, Либерия, Мальта и т.д.). Судовладелец обычно говорит, под каким флагом нужно подтверждение.

## Медицинский сертификат

Заключение о годности к работе в море по международной форме. Без действующего медсертификата на судно не пустят. Срок обычно до 2 лет.

## Сертификаты STCW

Базовый набор: Basic Safety Training, Proficiency in Survival Craft, Advanced Fire Fighting, Medical First Aid, Security Awareness. Для танкеров, газовозов, пассажирских судов — дополнительные курсы.

## В каком порядке собирать

1. Загранпаспорт → 2. Медкомиссия и медсертификат → 3. Базовые курсы STCW → 4. Диплом и мореходная книжка → 5. Endorsement под нужный флаг → 6. Виза (например, США C1/D), если требует маршрут.

Следите за сроками годности — «просроченный» сертификат превращает готового кандидата в непроходного за один день.

Документы в порядке? Ищите контракт под свою квалификацию на **seajobs.pro** — фильтр по рангу и типу судна экономит недели поиска.$ru$,
    'en', $en$Without the right set of documents no ship will take you on, however strong your CV is. Here is the seafarer's core document set and the order in which to build it.

## Seaman's Book (Continuous Discharge Certificate)

Your main "service record" at sea. Every contract is entered in it: vessel, rank, sign-on and sign-off dates. Your sea service (the time counted toward your next CoC) is calculated from this book. Issued by the maritime administration; foreign-flag work often needs an internationally recognised book.

## Seafarer's Identity Document (SID)

An ID that identifies you specifically as a seafarer under the ILO convention. It lets you cross borders in ports, take shore leave, and travel to and from the ship. It is not the same as your travel passport — you need both.

## Certificate of Competency (CoC) and Endorsements

The CoC proves your qualification (watch officer, engineer, master). The endorsement is a specific flag's recognition of your CoC (Panama, Liberia, Malta, etc.). The owner usually tells you which flag endorsement is required.

## Medical certificate

A statement of fitness for sea service on the international form. No valid medical, no boarding. Usually valid up to 2 years.

## STCW certificates

Core set: Basic Safety Training, Proficiency in Survival Craft, Advanced Fire Fighting, Medical First Aid, Security Awareness. Tankers, gas carriers and passenger ships require extra courses.

## The order to collect them

1. Travel passport → 2. Medical exam and certificate → 3. Basic STCW courses → 4. CoC and Seaman's Book → 5. Flag endorsement → 6. Visa (e.g. US C1/D) if your route needs it.

Watch the expiry dates — an expired certificate turns a ready candidate into a rejected one overnight.

Documents in order? Find a contract for your qualification on **seajobs.pro** — filtering by rank and vessel type saves weeks of searching.$en$),
  (SELECT id FROM forum_categories WHERE name ILIKE 'Документ%' LIMIT 1),
  false, '2026-06-23 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM forum_topics WHERE title->>'ru' = 'Паспорт моряка и мореходная книжка: что это, зачем нужно и как получить в 2026 году');

-- ── 3. Налоги моряка ──────────────────────────────────────────────────────────
INSERT INTO forum_topics (user_id, author_name, title, content, category_id, is_pinned, created_at)
SELECT
  (SELECT id FROM auth.users WHERE email = 'andreyrich90@gmail.com' LIMIT 1),
  'Редакция SeaJobs.pro',
  jsonb_build_object(
    'ru', 'Налоги моряка: надо ли платить, правило 183 дней и как не попасть на штрафы',
    'en', 'Seafarer taxes: do you have to pay, the 183-day rule, and how to stay out of trouble'),
  jsonb_build_object('ru', $ru$«Моряки налоги не платят» — фраза, из-за которой люди попадают на неприятности. Правда сложнее и зависит от вашего налогового резидентства. Это не юридическая консультация, а карта, чтобы задать правильные вопросы своему бухгалтеру.

## От чего вообще зависит налог

Ключевое понятие — налоговое резидентство. Как правило, оно определяется тем, сколько дней в году вы физически провели в стране (часто порог — 183 дня). Резидент обычно обязан декларировать мировой доход, нерезидент — по особым правилам.

## Правило 183 дней

Во многих странах, если вы провели за пределами страны больше определённого числа дней (часто 183+), ваш статус и ставка меняются. Именно поэтому морякам важно **вести учёт дней**: даты посадки и списания, штампы, авиабилеты. Мореходная книжка и билеты — ваша доказательная база.

## Почему «ничего не платить» — опасная стратегия

- Банк может запросить источник средств при крупных переводах.
- При покупке недвижимости/авто спрашивают происхождение денег.
- Отсутствие деклараций годами — риск доначислений и штрафов.
- В некоторых странах есть специальные (льготные) режимы для моряков — но чтобы ими пользоваться, нужно правильно оформиться, а не просто молчать.

## Что делать практично

1. Узнайте правила именно вашей страны резидентства — они у всех разные.
2. Ведите личный табель: дни в стране и вне её, контракты.
3. Сохраняйте контракты, расчётные листы (payslips), выписки о переводах.
4. Раз в год консультируйтесь с бухгалтером, который понимает моряков.
5. Если есть льготный морской режим — оформите его официально.

Спокойные финансы начинаются со стабильных контрактов. Свежие вакансии от проверенных судовладельцев — на **seajobs.pro**.$ru$,
    'en', $en$"Seafarers don't pay tax" is the phrase that gets people into trouble. The truth is more nuanced and depends on your tax residency. This is not legal advice — it is a map to help you ask your accountant the right questions.

## What the tax actually depends on

The key concept is tax residency. It is usually decided by how many days per year you were physically in a country (183 days is a common threshold). A resident generally must declare worldwide income; a non-resident is taxed under special rules.

## The 183-day rule

In many countries, if you spend more than a set number of days outside the country (often 183+), your status and rate change. That is why seafarers must **track their days**: sign-on/sign-off dates, stamps, flight tickets. Your seaman's book and tickets are your evidence.

## Why "paying nothing" is a risky strategy

- Banks can ask for the source of funds on large transfers.
- Buying property or a car triggers questions about where the money came from.
- Years with no declarations invite back-taxes and penalties.
- Some countries have special (favourable) regimes for seafarers — but you must register for them properly, not just stay silent.

## Practical steps

1. Learn the rules of your own country of residency — they differ everywhere.
2. Keep a personal log: days in and out of the country, contracts.
3. Save contracts, payslips and transfer statements.
4. Once a year, consult an accountant who understands seafarers.
5. If a seafarer tax regime exists, register for it officially.

Calm finances start with steady contracts. Fresh vacancies from verified owners are on **seajobs.pro**.$en$),
  (SELECT id FROM forum_categories WHERE name ILIKE 'Карьера%' LIMIT 1),
  false, '2026-06-24 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM forum_topics WHERE title->>'ru' = 'Налоги моряка: надо ли платить, правило 183 дней и как не попасть на штрафы');

-- ── 4. Как стать моряком с нуля ──────────────────────────────────────────────
INSERT INTO forum_topics (user_id, author_name, title, content, category_id, is_pinned, created_at)
SELECT
  (SELECT id FROM auth.users WHERE email = 'andreyrich90@gmail.com' LIMIT 1),
  'Редакция SeaJobs.pro',
  jsonb_build_object(
    'ru', 'Как стать моряком с нуля: путь от берега до первого контракта в 2026 году',
    'en', 'How to become a seafarer from scratch: the path to your first contract in 2026'),
  jsonb_build_object('ru', $ru$Хотите в море, но не знаете, с какого конца подступиться? Разложим по шагам — без иллюзий и без занудства.

## Шаг 1. Решите, какая служба вам ближе

**Палуба (Deck)** — навигация, груз, работа на открытом воздухе, путь к капитану. **Машина (Engine)** — двигатели, механика, техника, путь к старшему механику. **Камбуз/сервис** — повар, стюард. От выбора зависит, какие курсы и диплом вам нужны.

## Шаг 2. Образование

Есть два пути: морской вуз/училище (даёт диплом офицера и практику кадетом) или старт с рядового состава (матрос, моторист) через базовые курсы. Второй путь короче и дешевле, но потолок роста ниже, пока не получите диплом.

## Шаг 3. Базовые документы и курсы

Загранпаспорт, медкомиссия, базовые STCW-курсы (Basic Safety Training и др.), мореходная книжка, паспорт моряка. Это минимальный «билет» на борт.

## Шаг 4. Первый контракт — самое трудное

Без опыта берут неохотно, это правда. Что реально помогает:
- регистрация сразу в нескольких крюингах и на профильных площадках;
- готовность идти на низкую стартовую позицию (OS, wiper, ученик повара);
- честное CV без выдуманного опыта;
- гибкость по типу судна и региону.

## Шаг 5. Наберите ценз и растите

Первые 1–2 контракта — это про опыт и записи в книжку, а не про деньги. Дальше начинается нормальный доход и карьерная лестница: OS → AB → боцман, или моторист → 4-й механик и выше.

## Сколько это стоит и сколько занимает

Базовый пакет курсов и документов — ощутимая, но окупаемая инвестиция. От старта до первого выхода в море при активных действиях — обычно несколько месяцев.

Готовы искать первый рейс? На **seajobs.pro** есть фильтр вакансий, где встречаются позиции «без опыта» и для кадетов — начните отсюда.$ru$,
    'en', $en$You want to go to sea but have no idea where to start? Here is the path, step by step — no illusions, no filler.

## Step 1. Decide which department suits you

**Deck** — navigation, cargo, outdoor work, the road to master. **Engine** — engines, machinery, technical work, the road to chief engineer. **Galley/service** — cook, steward. Your choice decides which courses and CoC you need.

## Step 2. Education

Two routes: a maritime academy (gives an officer CoC and cadet sea time) or starting as a rating (deckhand, motorman) through basic courses. The second route is shorter and cheaper, but your ceiling is lower until you earn a CoC.

## Step 3. Core documents and courses

Travel passport, medical exam, basic STCW courses (Basic Safety Training, etc.), seaman's book, seafarer ID. This is the minimum "ticket" aboard.

## Step 4. The first contract — the hardest part

It is true that companies are reluctant to take someone with no experience. What actually helps:
- registering with several crewing agencies and job boards at once;
- being willing to take a low entry position (OS, wiper, galley trainee);
- an honest CV with no invented experience;
- flexibility on vessel type and region.

## Step 5. Build sea time and grow

The first one or two contracts are about experience and book entries, not money. After that a proper income and career ladder begin: OS → AB → bosun, or motorman → 4th engineer and up.

## Cost and timeline

The basic package of courses and documents is a noticeable but recoverable investment. From start to first sailing, with active effort, usually a few months.

Ready to look for your first voyage? **seajobs.pro** has a filter where "no experience" and cadet positions appear — start there.$en$),
  (SELECT id FROM forum_categories WHERE name ILIKE 'Карьера%' LIMIT 1),
  false, '2026-06-25 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM forum_topics WHERE title->>'ru' = 'Как стать моряком с нуля: путь от берега до первого контракта в 2026 году');

-- ── 5. Флаги удобства ─────────────────────────────────────────────────────────
INSERT INTO forum_topics (user_id, author_name, title, content, category_id, is_pinned, created_at)
SELECT
  (SELECT id FROM auth.users WHERE email = 'andreyrich90@gmail.com' LIMIT 1),
  'Редакция SeaJobs.pro',
  jsonb_build_object(
    'ru', 'Флаги удобства (Панама, Либерия, Маршалловы острова): что значит флаг судна для моряка',
    'en', 'Flags of convenience (Panama, Liberia, Marshall Islands): what a ship''s flag means for you'),
  jsonb_build_object('ru', $ru$Судно ходит под флагом Панамы, экипаж — с трёх континентов, судовладелец — из Германии, а управляет крюинг из Польши. Нормально ли это? Да. Разберём, что такое флаг судна и почему это важно для моряка.

## Что такое флаг судна

Флаг — это страна регистрации судна. Её законы определяют требования к документам экипажа, трудовые нормы, налоги судовладельца, стандарты безопасности. «Флаг удобства» — когда судно регистрируют в стране, где это дешевле и проще (Панама, Либерия, Маршалловы острова, Мальта и др.), даже если владелец из другой страны.

## Почему это важно вам

**Подтверждение диплома (endorsement).** Под каждый флаг ваш диплом нужно подтвердить. Панамский endorsement не подойдёт для мальтийского судна. Судовладелец обычно оплачивает или организует нужное подтверждение.

**Трудовые условия.** Флаги бывают разные по репутации. Есть флаги из «белого списка» с нормальным контролем, есть проблемные. От флага зависит, насколько реально защищены ваши права.

**Виза и порты.** Флаг влияет на маршруты и заходы, а значит — на визовые требования (например, C1/D для США).

## Как понять, что флаг «нормальный»

- Флаг в белом списке Парижского/Токийского меморандума (Paris/Tokyo MoU) — хороший признак.
- Судовладелец без проблем называет флаг и коллективный договор (ITF/MLC).
- На судне действует конвенция MLC 2006 — базовая защита ваших прав.

## Красные флаги (в переносном смысле)

- Владелец уходит от прямого ответа, под каким флагом судно.
- Нет коллективного договора, зарплата «в конверте».
- Флаг из «чёрного списка» и старое судно с плохой историей задержаний в портах.

Флаг сам по себе — не приговор: под «удобными» флагами ходят и отличные суда серьёзных компаний. Важно смотреть на связку флаг + судовладелец + договор.

Ищите контракты, где условия прозрачны, — вакансии от проверенных крюингов на **seajobs.pro**.$ru$,
    'en', $en$A ship flies the Panama flag, the crew is from three continents, the owner is German and the crewing is run from Poland. Is that normal? Yes. Here is what a ship's flag is and why it matters to you.

## What a ship's flag is

The flag is the country where the ship is registered. Its laws set the crew document requirements, labour standards, the owner's taxes and safety rules. A "flag of convenience" is when a ship is registered in a country where it is cheaper and simpler (Panama, Liberia, Marshall Islands, Malta, etc.), even if the owner is elsewhere.

## Why it matters to you

**Endorsement.** Your CoC must be endorsed for each flag. A Panama endorsement will not work on a Maltese ship. The owner usually pays for or arranges the endorsement you need.

**Working conditions.** Flags vary in reputation. Some are "white list" flags with proper oversight; others are problematic. The flag affects how real your protections are.

**Visa and ports.** The flag influences routes and port calls, and therefore visa requirements (for example US C1/D).

## How to tell a "good" flag

- The flag is on the white list of the Paris/Tokyo MoU — a good sign.
- The owner readily names the flag and the collective agreement (ITF/MLC).
- MLC 2006 applies on board — the baseline protection of your rights.

## Warning signs

- The owner dodges the question of which flag the ship flies.
- No collective agreement, cash-in-hand wages.
- A black-list flag on an old ship with a poor port-detention record.

The flag alone is not a verdict: excellent ships from serious companies also sail under convenient flags. What matters is the combination of flag + owner + agreement.

Look for contracts with transparent terms — vacancies from verified crewing agencies on **seajobs.pro**.$en$),
  (SELECT id FROM forum_categories WHERE name ILIKE 'Суда%' LIMIT 1),
  false, '2026-06-26 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM forum_topics WHERE title->>'ru' = 'Флаги удобства (Панама, Либерия, Маршалловы острова): что значит флаг судна для моряка');

-- ── 6. DP-оператор (DPO) ─────────────────────────────────────────────────────
INSERT INTO forum_topics (user_id, author_name, title, content, category_id, is_pinned, created_at)
SELECT
  (SELECT id FROM auth.users WHERE email = 'andreyrich90@gmail.com' LIMIT 1),
  'Редакция SeaJobs.pro',
  jsonb_build_object(
    'ru', 'DP-оператор (DPO): как получить сертификат, сколько стоит обучение и сколько платят',
    'en', 'DP Operator (DPO): how to get certified, what training costs, and how much it pays'),
  jsonb_build_object('ru', $ru$Динамическое позиционирование (DP) — это система, которая удерживает судно на точке без якоря, компьютерами и подруливающими устройствами. На офшоре без DPO никуда, и платят таким специалистам заметно выше рынка. Разберём, как туда попасть.

## Кто такой DPO

Офицер, который управляет судном в режиме DP: снабжение платформ (PSV), якорные операции (AHTS), укладка труб, строительные и буровые суда. Ошибка у платформы стоит очень дорого, поэтому требования высокие.

## Схема сертификации (IMCA/Nautical Institute)

Путь обычно такой:
1. **Induction course** — вводный курс DP.
2. **Морская практика (DP sea time)** — набор часов и записей в DP logbook под наблюдением.
3. **Simulator/Advanced course** — продвинутый курс на симуляторе.
4. **Ещё практика** и оформление сертификата (Limited, затем Unlimited).

Нужен действующий диплом вахтенного помощника как база — DP надстраивается на офицерскую квалификацию.

## Сколько стоит и сколько занимает

Курсы DP — ощутимая инвестиция, плюс время на набор морского ценза на DP-судах. Полный путь от Induction до Unlimited обычно занимает от года и больше, в зависимости от того, как быстро набираете часы.

## Сколько платят

DPO и особенно SDPO — один из самых доходных сегментов. Ротации часто короче торгового флота (нередко 4/4 или 5/5 недель), а ставки выше. Рынок зависит от офшорной активности, но хороших DPO всегда не хватает.

## С чего начать реально

- Получите/подтвердите офицерский диплом.
- Пройдите Induction course в аккредитованном центре.
- Ищите первый контракт на DP-судне, где можно набирать ценз (иногда как 2nd/3rd Officer).
- Ведите DP logbook аккуратно — это ваш пропуск на следующий уровень.

Смотрите офшорные вакансии (PSV, AHTS, DP) на **seajobs.pro** — фильтр по типу судна поможет найти старт для набора DP-ценза.$ru$,
    'en', $en$Dynamic Positioning (DP) is the system that holds a ship on a fixed point without anchoring, using computers and thrusters. Offshore work is impossible without DPOs, and they are paid well above the market. Here is how to get in.

## What a DPO does

An officer who runs the ship in DP mode: platform supply (PSV), anchor handling (AHTS), pipe-laying, construction and drilling vessels. A mistake next to a platform is extremely costly, so the requirements are high.

## The certification path (IMCA/Nautical Institute)

The route usually is:
1. **Induction course** — the introductory DP course.
2. **DP sea time** — logging hours and entries in a DP logbook under supervision.
3. **Simulator/Advanced course** — the advanced simulator course.
4. **More sea time** and issuance of the certificate (Limited, then Unlimited).

You need a valid watch officer CoC as a base — DP is built on top of an officer qualification.

## Cost and timeline

DP courses are a noticeable investment, plus the time to build DP sea service. The full path from Induction to Unlimited usually takes a year or more, depending on how fast you log hours.

## How much it pays

DPO, and especially SDPO, is one of the best-paid segments. Rotations are often shorter than the merchant fleet (frequently 4/4 or 5/5 weeks) and rates are higher. The market depends on offshore activity, but good DPOs are always in short supply.

## Where to actually start

- Obtain/endorse an officer CoC.
- Take an Induction course at an accredited centre.
- Find a first contract on a DP vessel where you can build sea time (sometimes as 2nd/3rd Officer).
- Keep the DP logbook meticulously — it is your pass to the next level.

Browse offshore vacancies (PSV, AHTS, DP) on **seajobs.pro** — the vessel-type filter helps you find a starting point to build DP time.$en$),
  (SELECT id FROM forum_categories WHERE name ILIKE 'Суда%' LIMIT 1),
  false, '2026-06-27 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM forum_topics WHERE title->>'ru' = 'DP-оператор (DPO): как получить сертификат, сколько стоит обучение и сколько платят');

-- ── 7. Работа на круизных лайнерах ───────────────────────────────────────────
INSERT INTO forum_topics (user_id, author_name, title, content, category_id, is_pinned, created_at)
SELECT
  (SELECT id FROM auth.users WHERE email = 'andreyrich90@gmail.com' LIMIT 1),
  'Редакция SeaJobs.pro',
  jsonb_build_object(
    'ru', 'Работа на круизных лайнерах: какие есть должности, сколько платят и как туда попасть',
    'en', 'Working on cruise ships: the jobs, the pay, and how to get hired'),
  jsonb_build_object('ru', $ru$Круизный лайнер — это плавучий город: тысячи пассажиров, рестораны, театры, бассейны. И это отдельный рынок труда со своими правилами, который часто открыт даже для тех, у кого нет классического морского диплома.

## Кто нужен на круизах

**Морская команда (Marine/Deck/Engine).** Капитан, офицеры, механики, матросы, электрики — как на торговом флоте, только акцент на безопасности пассажиров.

**Отельный департамент (Hotel).** Самый большой блок: официанты, бармены, повара, стюарды кают, ресепшн, продавцы магазинов, охрана. Сюда часто берут без морского диплома — важнее сервис и английский.

**Развлечения и сервисы.** Аниматоры, музыканты, фотографы, спа, фитнес-инструкторы, детские аниматоры.

## Сколько платят

Базовые ставки в отельном департаменте могут быть скромными, но многое добирается чаевыми (особенно официанты, бармены, стюарды кают). Морская и техническая команда получает фиксированную зарплату как на торговом флоте. Контракты длинные (часто 4–8 месяцев), но питание и проживание — за счёт компании.

## Особенности, о которых лучше знать заранее

- Строгий стандарт внешнего вида и поведения.
- Работа с людьми = эмоциональная нагрузка каждый день.
- Короткие, но частые заходы в красивые порты.
- Большой международный экипаж — нужен уверенный английский.

## Как попасть

1. Определите департамент (отель, морская команда, развлечения).
2. Соберите пакет: STCW Basic Safety обязателен даже для отельного персонала, паспорт моряка, медсертификат, виза (часто C1/D для США).
3. Составьте CV с акцентом на сервис/специальность и английский.
4. Регистрируйтесь в круизных агентствах и на профильных площадках.

Ищете морскую или сервисную позицию? Смотрите вакансии круизного и пассажирского флота на **seajobs.pro**.$ru$,
    'en', $en$A cruise liner is a floating city: thousands of passengers, restaurants, theatres, pools. It is also a separate job market with its own rules, and it is often open even to people without a classic maritime CoC.

## Who is needed on cruise ships

**Marine team (Deck/Engine).** Captain, officers, engineers, deckhands, electricians — as on the merchant fleet, but with the emphasis on passenger safety.

**Hotel department.** The largest block: waiters, bartenders, cooks, cabin stewards, reception, shop staff, security. Many of these are hired without a maritime CoC — service skills and English matter more.

**Entertainment and services.** Animators, musicians, photographers, spa, fitness instructors, kids' club staff.

## How much it pays

Base pay in the hotel department can be modest, but a lot is topped up by tips (especially waiters, bartenders, cabin stewards). The marine and technical crew get a fixed salary like the merchant fleet. Contracts are long (often 4–8 months), but food and accommodation are covered by the company.

## Things to know in advance

- A strict standard of appearance and behaviour.
- Working with people = emotional load every day.
- Short but frequent calls at beautiful ports.
- A large international crew — confident English is required.

## How to get hired

1. Choose your department (hotel, marine team, entertainment).
2. Gather the pack: STCW Basic Safety is mandatory even for hotel staff, plus seaman's book, medical, and a visa (often US C1/D).
3. Write a CV focused on service/specialty and English.
4. Register with cruise agencies and job boards.

Looking for a marine or service position? Browse cruise and passenger fleet vacancies on **seajobs.pro**.$en$),
  (SELECT id FROM forum_categories WHERE name ILIKE 'Суда%' LIMIT 1),
  false, '2026-06-28 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM forum_topics WHERE title->>'ru' = 'Работа на круизных лайнерах: какие есть должности, сколько платят и как туда попасть');

-- ── 8. Ранги и должности на судне ────────────────────────────────────────────
INSERT INTO forum_topics (user_id, author_name, title, content, category_id, is_pinned, created_at)
SELECT
  (SELECT id FROM auth.users WHERE email = 'andreyrich90@gmail.com' LIMIT 1),
  'Редакция SeaJobs.pro',
  jsonb_build_object(
    'ru', 'Кто есть кто на судне: ранги и должности экипажа простыми словами (AB, OS, боцман, ETO)',
    'en', 'Who is who on board: ship ranks and crew positions explained (AB, OS, bosun, ETO)'),
  jsonb_build_object('ru', $ru$Master, C/O, AB, OS, ETO, oiler — новичку эти сокращения кажутся шифром. Разложим экипаж по полочкам, чтобы вы понимали, кто за что отвечает и куда расти.

## Палубная команда (Deck)

- **Master (Капитан)** — главный на судне, полная ответственность за всё.
- **Chief Officer / Chief Mate (Старший помощник)** — груз, остойчивость, палубная команда; заместитель капитана.
- **2nd Officer (Второй помощник)** — навигация, карты, ECDIS.
- **3rd Officer (Третий помощник)** — спасательные и пожарные средства, вахта.
- **Bosun (Боцман)** — старший над рядовым палубным составом, «прораб» палубы.
- **AB (Able Seaman, матрос 1 класса)** — квалифицированный матрос, вахта на руле, палубные работы.
- **OS (Ordinary Seaman, матрос 2 класса)** — начальная палубная позиция.

## Машинная команда (Engine)

- **Chief Engineer (Старший механик)** — «капитан машины», ответственность за всю технику.
- **2nd Engineer (Второй механик)** — главный двигатель и основные системы, практический руководитель машины.
- **3rd / 4th Engineer** — вспомогательные механизмы, насосы, сепараторы.
- **ETO (Electro-Technical Officer, электромеханик)** — электрика и автоматика.
- **Motorman / Oiler / Wiper** — рядовой машинный состав.
- **Fitter** — судовой слесарь/сварщик.

## Камбуз и сервис (Catering)

- **Chief Cook / Cook (Повар)** — питание экипажа, «половина успеха рейса».
- **Messman / Steward** — помощь на камбузе, уборка, сервировка.

## Как расти

Палуба: OS → AB → боцман → (с дипломом) 3rd → 2nd → Chief Officer → Master. Машина: wiper/motorman → 4th → 3rd → 2nd → Chief Engineer. Каждый следующий шаг требует ценза (морского стажа) и, для офицеров, диплома.

Знаете, куда хотите расти? Найдите вакансию под свой ранг на **seajobs.pro** — фильтр по должности показывает подходящие контракты сразу.$ru$,
    'en', $en$Master, C/O, AB, OS, ETO, oiler — to a newcomer these abbreviations look like code. Here is the crew laid out clearly, so you understand who does what and where to grow.

## Deck department

- **Master** — the top authority on the ship, full responsibility for everything.
- **Chief Officer / Chief Mate** — cargo, stability, deck crew; the captain's deputy.
- **2nd Officer** — navigation, charts, ECDIS.
- **3rd Officer** — life-saving and fire-fighting appliances, watchkeeping.
- **Bosun** — the senior over the deck ratings, the deck "foreman".
- **AB (Able Seaman)** — a qualified rating, helm watch, deck work.
- **OS (Ordinary Seaman)** — the entry-level deck position.

## Engine department

- **Chief Engineer** — the "captain of the engine", responsible for all machinery.
- **2nd Engineer** — the main engine and key systems, the practical head of the engine room.
- **3rd / 4th Engineer** — auxiliary machinery, pumps, separators.
- **ETO (Electro-Technical Officer)** — electrics and automation.
- **Motorman / Oiler / Wiper** — engine ratings.
- **Fitter** — the ship's mechanic/welder.

## Galley and service

- **Chief Cook / Cook** — feeds the crew, "half the success of a voyage".
- **Messman / Steward** — galley help, cleaning, serving.

## How to grow

Deck: OS → AB → bosun → (with a CoC) 3rd → 2nd → Chief Officer → Master. Engine: wiper/motorman → 4th → 3rd → 2nd → Chief Engineer. Each step up requires sea time and, for officers, a CoC.

Know where you want to grow? Find a vacancy for your rank on **seajobs.pro** — the rank filter shows matching contracts right away.$en$),
  (SELECT id FROM forum_categories WHERE name ILIKE 'Суда%' LIMIT 1),
  false, '2026-06-29 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM forum_topics WHERE title->>'ru' = 'Кто есть кто на судне: ранги и должности экипажа простыми словами (AB, OS, боцман, ETO)');

-- ── 9. Морская болезнь ────────────────────────────────────────────────────────
INSERT INTO forum_topics (user_id, author_name, title, content, category_id, is_pinned, created_at)
SELECT
  (SELECT id FROM auth.users WHERE email = 'andreyrich90@gmail.com' LIMIT 1),
  'Редакция SeaJobs.pro',
  jsonb_build_object(
    'ru', 'Морская болезнь: почему укачивает, пройдёт ли это и что реально помогает',
    'en', 'Seasickness: why it happens, whether it passes, and what actually helps'),
  jsonb_build_object('ru', $ru$«А если меня будет укачивать?» — страх номер один у новичков. Хорошая новость: у подавляющего большинства морская болезнь проходит за несколько дней, и её можно пережить. Разберём без паники.

## Почему укачивает

Мозг получает противоречивые сигналы: вестибулярный аппарат чувствует качку, а глаза (например, в каюте) — нет. Этот конфликт и вызывает тошноту, слабость, холодный пот. Это не слабость характера, это физиология.

## Хорошая новость про адаптацию

У большинства людей организм адаптируется за 2–4 дня («морские ноги»). После этого качка почти не мешает. Есть редкие исключения, кому море не подходит совсем, но это меньшинство.

## Что реально помогает в первые дни

- **Смотрите на горизонт**, будьте на палубе на свежем воздухе — глаза и вестибулярный аппарат «договариваются».
- **Держитесь ближе к центру судна** и к ватерлинии — там качает меньше всего.
- **Ешьте понемногу**, простую пищу; сухари, крекеры, имбирь помогают многим.
- **Пейте воду**, избегайте алкоголя и жирного.
- **Занимайте себя работой** — вахта и дело отвлекают лучше, чем лежание в каюте.
- **Медикаменты** (таблетки от укачивания, пластыри со скополамином) — по инструкции и лучше заранее, до появления симптомов. Учтите: некоторые вызывают сонливость.

## Чего не делать

- Не залегать в тёмной каюте, уткнувшись в телефон, — станет хуже.
- Не голодать (пустой желудок переносит качку хуже).
- Не паниковать: это временно.

## Стоит ли из-за этого бояться идти в море

Нет. Многие капитаны и старпомы в первые рейсы страдали от укачивания. Организм привыкает, а профессия остаётся с вами на всю жизнь.

Готовы попробовать море по-настоящему? Первые вакансии, в том числе для новичков, ищите на **seajobs.pro**.$ru$,
    'en', $en$"What if I get seasick?" is the number-one fear of newcomers. The good news: for the vast majority seasickness passes within a few days and is survivable. Let's break it down without panic.

## Why it happens

The brain gets conflicting signals: the inner ear feels the motion, but the eyes (say, in a cabin) do not. That conflict causes nausea, weakness and cold sweat. It is not weakness of character — it is physiology.

## The good news about adaptation

Most people's bodies adapt in 2–4 days ("sea legs"). After that the motion barely bothers you. There are rare exceptions for whom the sea does not suit at all, but they are a minority.

## What actually helps in the first days

- **Look at the horizon**, stay on deck in fresh air — the eyes and inner ear "reach agreement".
- **Stay near the middle of the ship** and close to the waterline — the motion is smallest there.
- **Eat small amounts** of plain food; dry crackers and ginger help many people.
- **Drink water**, avoid alcohol and greasy food.
- **Keep busy with work** — a watch and a task distract better than lying in the cabin.
- **Medication** (motion-sickness tablets, scopolamine patches) — per instructions and ideally before symptoms start. Note: some cause drowsiness.

## What not to do

- Don't hole up in a dark cabin staring at your phone — it gets worse.
- Don't starve (an empty stomach handles motion worse).
- Don't panic: it is temporary.

## Should this fear keep you off the sea

No. Many captains and chief officers were seasick on their first voyages. The body adapts, and the profession stays with you for life.

Ready to really try the sea? Find first-timer vacancies too on **seajobs.pro**.$en$),
  (SELECT id FROM forum_categories WHERE name ILIKE 'Суда%' LIMIT 1),
  false, '2026-06-30 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM forum_topics WHERE title->>'ru' = 'Морская болезнь: почему укачивает, пройдёт ли это и что реально помогает');

-- ── 10. Как читать морской контракт ──────────────────────────────────────────
INSERT INTO forum_topics (user_id, author_name, title, content, category_id, is_pinned, created_at)
SELECT
  (SELECT id FROM auth.users WHERE email = 'andreyrich90@gmail.com' LIMIT 1),
  'Редакция SeaJobs.pro',
  jsonb_build_object(
    'ru', 'Как читать морской контракт (SEA): на что смотреть, чтобы вас не обманули',
    'en', 'How to read a seafarer''s contract (SEA): what to check so you are not cheated'),
  jsonb_build_object('ru', $ru$Морской трудовой контракт (Seafarer's Employment Agreement, SEA) — это документ, который определяет всё: зарплату, длину рейса, что вам должны и что вы должны. Подписывать его «не читая» — классическая дорогая ошибка. Вот на что смотреть.

## Ключевые пункты, которые обязаны быть

- **Стороны договора.** Кто работодатель — судовладелец или крюинг? Название, реквизиты.
- **Судно и должность.** Название/тип судна, ваш ранг.
- **Зарплата.** Базовая ставка, овертайм, надбавки, валюта, дата выплаты, кому и как переводят.
- **Срок контракта.** Длительность и допуск (например, 4 месяца ± 1). Смотрите, как оформляется продление.
- **Рабочее время и отдых.** Должны соответствовать MLC 2006.
- **Отпускные (leave pay).** Начисляются ли за каждый месяц.
- **Репатриация.** Кто и в каких случаях оплачивает дорогу домой.
- **Медицина и страхование.** Покрытие болезни/травмы, компенсации.

## На что смотреть особенно внимательно

- **Овертайм: fixed или по часам?** «Гарантированный» овертайм уже включён в цифру или доплачивается сверху?
- **Что входит в «зарплату» в объявлении** — gross или net, с овертаймом или без. Разница бывает огромной.
- **Условия досрочного списания** — что будет с оплатой, если рейс прервут.
- **Штрафы и удержания** — за что могут вычесть.
- **Коллективный договор (CBA/ITF).** Если судно под ITF-договором — это дополнительная защита.

## Красные флаги

- Контракт только устно «на словах», без подписанного документа.
- Отказ дать текст SEA до посадки.
- Пункты, противоречащие MLC (например, плата за трудоустройство).
- Разница между тем, что обещал менеджер, и тем, что в бумаге.

## Практика

Читайте контракт целиком до подписания. Непонятное — спрашивайте у менеджера письменно. Сохраняйте свою копию. Помните: по MLC вам обязаны дать понятный экземпляр SEA.

Ищите контракты от проверенных судовладельцев с прозрачными условиями на **seajobs.pro**.$ru$,
    'en', $en$A Seafarer's Employment Agreement (SEA) defines everything: pay, voyage length, what you are owed and what you owe. Signing it "without reading" is a classic, expensive mistake. Here is what to check.

## Key clauses that must be present

- **Parties.** Who is the employer — the owner or the crewing agency? Name and details.
- **Vessel and rank.** Vessel name/type, your rank.
- **Wages.** Base rate, overtime, allowances, currency, pay date, how and to whom it is transferred.
- **Contract length.** Duration and tolerance (e.g. 4 months ± 1). Check how extensions are handled.
- **Hours of work and rest.** Must comply with MLC 2006.
- **Leave pay.** Whether it accrues for each month.
- **Repatriation.** Who pays for the trip home, and in which cases.
- **Medical and insurance.** Cover for illness/injury and compensation.

## What to watch especially closely

- **Overtime: fixed or hourly?** Is "guaranteed" overtime already inside the figure, or paid on top?
- **What the advertised "salary" includes** — gross or net, with or without overtime. The difference can be huge.
- **Early sign-off terms** — what happens to your pay if the voyage is cut short.
- **Fines and deductions** — what can be taken off.
- **Collective agreement (CBA/ITF).** An ITF-covered ship gives you extra protection.

## Warning signs

- A contract agreed only verbally, with no signed document.
- Refusal to show you the SEA text before boarding.
- Clauses that conflict with MLC (for example, a fee for employment).
- A gap between what the manager promised and what is on paper.

## In practice

Read the whole contract before signing. Ask about anything unclear in writing. Keep your own copy. Remember: under MLC you are entitled to a clear copy of the SEA.

Find contracts from verified owners with transparent terms on **seajobs.pro**.$en$),
  (SELECT id FROM forum_categories WHERE name ILIKE 'Документ%' LIMIT 1),
  false, '2026-07-01 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM forum_topics WHERE title->>'ru' = 'Как читать морской контракт (SEA): на что смотреть, чтобы вас не обманули');
