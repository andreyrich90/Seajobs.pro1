-- Additional long-form guides for the /guides section (category = 'guide').
-- Bilingual ru+en (ua/pl/ro can be added via the admin "translate" button).
-- Each INSERT is idempotent — guarded by the English title. Body is the site's
-- markdown subset: "## " headings, "- "/"1. " lists, **bold**, [text](url).
-- Run once in the Supabase SQL Editor.

-- ── 16. The seafarer medical certificate (ENG1) ─────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'The seafarer medical certificate (ENG1): how to pass and what can fail you',
    'ru', 'Медкомиссия моряка (ENG1): как пройти и что может «завалить»'),
  jsonb_build_object(
    'en', $en$Every seafarer needs a valid medical certificate before joining a ship. It confirms you are fit for the physical demands of life on board and won't become a health risk far from hospitals. The best-known standard is the UK **ENG1**, but every flag state has an STCW-compliant equivalent. Here is what the exam checks and how to pass it first time.

## What the medical checks

- **Vision and colour perception** — critical for deck officers; a colour-vision defect can close a deck career.
- **Hearing.**
- **Blood pressure, heart and cardiovascular health.**
- **Urine test** — screens for diabetes and kidney problems.
- **BMI and general physical fitness** — you must be able to move and act in an emergency.
- **Medical history** — chronic conditions, medication and past surgeries.
- **Mental health declaration.**

## Common reasons seafarers fail

1. **Uncontrolled blood pressure or diabetes** — the most frequent. Managed with treatment and paperwork, many still pass.
2. **Colour-vision defects** — limit deck roles; engine and some other roles may still be open.
3. **Untreated dental problems** — a bad tooth at sea is a real risk, and some exams check dental fitness.
4. **BMI too high** — severe obesity can fail you on mobility and emergency grounds.
5. **Undeclared conditions** — hiding something that later surfaces can void the certificate and end a contract.

## How to prepare

- Book with a **doctor approved for your flag state** — an ENG1 must be issued by an MCA-approved doctor; other flags have their own approved lists.
- Sleep well and avoid salt and caffeine before a blood-pressure check.
- Bring your **glasses or contacts** and any prescriptions.
- Treat known issues — dental, blood pressure — **before** the exam.
- Be honest: declaring a managed condition is far safer than hiding it.

## Validity and renewal

Most seafarer medical certificates are valid for **up to 2 years** (1 year for under-18s). Renew before it expires — an expired medical means you cannot sign on. Keep a scan in your [SeaJobs.pro profile](/seafarer/certificates) so it is ready the moment a crewing agency asks, and when your papers are in order, browse [current vacancies](/jobs).$en$,
    'ru', $ru$Перед посадкой на судно каждому моряку нужен действующий медицинский сертификат. Он подтверждает, что вы годны к физическим нагрузкам на борту и не станете угрозой здоровью вдали от больниц. Самый известный стандарт — британский **ENG1**, но у каждого флага есть свой аналог по конвенции ПДНВ. Разбираем, что проверяют и как пройти с первого раза.

## Что проверяют на медкомиссии

- **Зрение и цветовосприятие** — критично для палубных офицеров; дефект цветовосприятия может закрыть палубную карьеру.
- **Слух.**
- **Давление, сердце и сосуды.**
- **Анализ мочи** — скрининг на диабет и проблемы с почками.
- **ИМТ и общая физическая форма** — вы должны двигаться и действовать в аварийной ситуации.
- **История болезней** — хронические заболевания, лекарства, перенесённые операции.
- **Декларация о психическом здоровье.**

## Частые причины «завала»

1. **Неконтролируемое давление или диабет** — самое частое. При лечении и с документами многие всё же проходят.
2. **Дефекты цветовосприятия** — ограничивают палубные должности; машинная и часть других ролей могут остаться доступны.
3. **Нелеченые зубы** — больной зуб в рейсе — реальная проблема, и часть комиссий проверяет состояние зубов.
4. **Слишком высокий ИМТ** — тяжёлое ожирение может «завалить» по мобильности и аварийным нормам.
5. **Скрытые заболевания** — то, что вы утаили и что всплыло позже, может аннулировать сертификат и прервать контракт.

## Как подготовиться

- Записывайтесь к **врачу, аккредитованному для вашего флага** — ENG1 выдаёт только врач, одобренный MCA; у других флагов свои списки.
- Выспитесь и откажитесь от соли и кофеина перед замером давления.
- Возьмите **очки или линзы** и рецепты.
- Пролечите известные проблемы — зубы, давление — **до** комиссии.
- Будьте честны: заявить о контролируемом заболевании гораздо безопаснее, чем скрыть его.

## Срок действия и продление

Большинство медсертификатов моряка действуют **до 2 лет** (1 год для лиц до 18). Продлевайте до истечения — просроченная медкомиссия не даст списаться на судно, точнее — подписаться на рейс. Храните скан в [профиле SeaJobs.pro](/seafarer/certificates), чтобы он был готов, как только крюинг спросит, а когда документы в порядке — смотрите [актуальные вакансии](/jobs).$ru$),
  'Health', 'guide',
  'linear-gradient(135deg,#0e2a45,#0d7d6b)',
  true, '2026-08-04 08:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'The seafarer medical certificate (ENG1): how to pass and what can fail you');

-- ── 17. Crew change explained ───────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Crew change explained: signing on and off, flights and joining agents',
    'ru', 'Смена экипажа: посадка и списание, перелёты и агент в порту'),
  jsonb_build_object(
    'en', $en$Every contract begins with a **sign-on** — joining the ship — and ends with a **sign-off** — leaving it. Between those two moments sits a chain of flights, agents, documents and port formalities. Understanding it keeps you calm when plans shift, because crew-change delays cost time and money.

## Before you fly

1. The crewing agency sends a **joining letter** with the vessel, port, join date and rank.
2. You receive **flight tickets** and, where needed, a **letter of guarantee** for immigration.
3. Check every document is valid well beyond the contract: passport, seaman's book, visas, medical, certificates.
4. Confirm the **port agent's** contact — the agent meets you and handles local formalities.

## Joining the ship (sign-on)

- At the airport of the joining country, the **port agent** — or a taxi arranged by the agent — takes you to the vessel or a hotel.
- You clear immigration as a joining crew member, often on a seaman's book and joining letter rather than a tourist visa.
- On board you sign the **crew agreement**, hand your documents to the Master, get a safety familiarisation and your cabin.

## Leaving the ship (sign-off)

- Your **relief must join before you can leave** — no relief, no sign-off. This is the single biggest cause of crew-change delays.
- You settle your wage account, sign off the crew agreement, and the agent arranges transport and flights home.

## When things go wrong

- **Visa or transit issues** — always carry printed joining and sign-off letters and the agent's phone number.
- **Delayed relief** — contracts can be extended; know your rights on maximum service (see our guide on the [seafarer contract](/guides)).
- **Flight disruption** — keep the crewing agency and agent informed and they will rebook.

## Keep your papers ready

Fast crew changes favour seafarers whose documents are complete and current. Store yours in your [SeaJobs.pro profile](/seafarer/certificates), keep your readiness date updated in your [profile](/seafarer/profile), and browse [open vacancies](/jobs) for your next join.$en$,
    'ru', $ru$Каждый контракт начинается с **посадки** (join) — вы прибываете на судно — и заканчивается **списанием** (sign-off) — вы его покидаете. Между этими моментами — цепочка перелётов, агентов, документов и портовых формальностей. Понимание процесса помогает не нервничать, когда планы меняются, ведь задержки смены экипажа стоят времени и денег.

## Перед вылетом

1. Крюинг присылает **письмо о назначении** (joining letter): судно, порт, дата посадки и должность.
2. Вы получаете **билеты** и, при необходимости, **гарантийное письмо** для иммиграции.
3. Проверьте, что каждый документ действует с запасом сверх контракта: паспорт, мореходная книжка, визы, медкомиссия, сертификаты.
4. Уточните контакт **портового агента** — он встречает вас и решает местные формальности.

## Посадка на судно (sign-on)

- В аэропорту страны посадки **агент** — или заказанное им такси — везёт вас на судно или в гостиницу.
- Иммиграцию проходите как член экипажа, часто по мореходной книжке и письму о назначении, а не по туристической визе.
- На борту вы подписываете **договор экипажа** (crew agreement), сдаёте документы капитану, проходите инструктаж по безопасности и получаете каюту.

## Списание с судна (sign-off)

- **Смена должна прийти раньше, чем вы уйдёте** — нет сменщика, нет списания. Это главная причина задержек смены экипажа.
- Вы закрываете расчёт по зарплате, списываетесь из договора экипажа, а агент организует транспорт и перелёт домой.

## Когда что-то идёт не так

- **Проблемы с визой или транзитом** — всегда имейте распечатки писем о посадке/списании и телефон агента.
- **Задержка сменщика** — контракт могут продлить; знайте свои права на максимальный срок службы (см. гайд про [контракт моряка](/guides)).
- **Сбой рейса** — держите крюинг и агента в курсе, они перебронируют.

## Держите документы наготове

Быстрая смена достаётся тем, у кого документы полны и актуальны. Храните их в [профиле SeaJobs.pro](/seafarer/certificates), обновляйте дату готовности в [профиле](/seafarer/profile) и смотрите [открытые вакансии](/jobs) для следующей посадки.$ru$),
  'Crew change', 'guide',
  'linear-gradient(135deg,#0e2a45,#1e5fa8)',
  true, '2026-08-04 09:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Crew change explained: signing on and off, flights and joining agents');

-- ── 18. Money management for seafarers ──────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Money management for seafarers: allotments, tax and saving your salary',
    'ru', 'Деньги моряка: аллотменты, налоги и как сохранить зарплату'),
  jsonb_build_object(
    'en', $en$A sea salary is good money — but it arrives in bursts, in foreign currency, while you are away from home for months. Managing it well is what turns a good wage into real savings. Here is a practical guide to allotments, tax and saving as a seafarer.

## Allotments — sending money home

An **allotment** is an automatic monthly transfer of part of your wages to your bank or family while you are on board. Set it up with the crewing agency or in the crew agreement:

- Decide a split — for example 70–80% home by allotment, the rest as cash or an on-board balance.
- Confirm the **currency and bank details** carefully; fixing a mistake mid-contract is slow.
- Keep your **payslips** — they are proof of income for loans, visas and mortgages.

## Tax and residency

Tax depends on your **country of residence**, not the ship's flag:

- Many countries offer a **seafarers' tax relief** or non-resident status if you spend enough days outside the country (for example the UK Seafarers' Earnings Deduction).
- Keep a **record of your sea service and travel dates** — you will need it to claim relief.
- When in doubt, use an accountant who specialises in seafarers. The fee is usually far smaller than the tax saved.

## Saving and avoiding traps

1. **Pay yourself first.** Treat savings as a fixed monthly allotment, not whatever is left over.
2. **Build an emergency fund** of 3–6 months of expenses — contracts and crew changes are unpredictable.
3. **Watch transfer fees and exchange rates.** Small percentages add up over a career; compare providers.
4. **Never pay to get a job.** No legitimate agency charges you for a contract (see our [scam guide](/guides)).

## Know your worth first

Good money management starts with a fair contract. Check the [real salary ranges](/salaries) for your rank and vessel type before you sign, and compare [current vacancies](/jobs) so you never accept below the market rate.$en$,
    'ru', $ru$Морская зарплата — хорошие деньги, но приходят они рывками, в валюте, пока вы месяцами вдали от дома. Умелое управление превращает хороший заработок в реальные накопления. Вот практический гайд по аллотментам, налогам и сбережениям для моряка.

## Аллотменты — отправка денег домой

**Аллотмент** — это автоматический ежемесячный перевод части зарплаты на ваш счёт или семье, пока вы на борту. Настраивается через крюинг или в договоре экипажа:

- Определите доли — например 70–80% домой аллотментом, остальное наличными или балансом на судне.
- Внимательно проверьте **валюту и реквизиты**; исправление ошибки в середине рейса идёт медленно.
- Храните **расчётные листы** — это подтверждение дохода для кредитов, виз и ипотеки.

## Налоги и резидентство

Налоги зависят от вашей **страны проживания**, а не от флага судна:

- Многие страны дают **налоговую льготу морякам** или статус нерезидента, если вы проводите достаточно дней за пределами страны (например, британский Seafarers' Earnings Deduction).
- Ведите **учёт морского стажа и дат поездок** — он понадобится для льготы.
- Если сомневаетесь — обратитесь к бухгалтеру, специализирующемуся на моряках. Гонорар обычно намного меньше сэкономленного налога.

## Сбережения и как не попасть в ловушки

1. **Сначала заплатите себе.** Считайте накопления фиксированным аллотментом, а не остатком.
2. **Создайте подушку** на 3–6 месяцев расходов — контракты и смены непредсказуемы.
3. **Следите за комиссиями и курсом.** Маленькие проценты за карьеру складываются в крупные суммы; сравнивайте сервисы.
4. **Никогда не платите за работу.** Ни один честный крюинг не берёт денег за контракт (см. наш [гайд про скам](/guides)).

## Сначала — знать себе цену

Управление деньгами начинается со справедливого контракта. Сверьте [реальные вилки зарплат](/salaries) по своей должности и типу судна до подписания и сравните [актуальные вакансии](/jobs), чтобы не соглашаться ниже рынка.$ru$),
  'Finance', 'guide',
  'linear-gradient(135deg,#0e2a45,#b7791f)',
  true, '2026-08-04 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Money management for seafarers: allotments, tax and saving your salary');

-- ── 19. Life after sea: shore-based maritime careers ────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Life after sea: shore-based maritime careers for former seafarers',
    'ru', 'Жизнь после моря: береговые профессии для бывших моряков'),
  jsonb_build_object(
    'en', $en$Sea time is one of the most valuable assets in the maritime industry — and it does not only pay off at sea. Sooner or later many seafarers want a career ashore, closer to family. The good news: your experience is exactly what shore-based employers look for. Here are the main paths.

## Ship management and operations

- **Superintendent (technical or marine)** — oversees a fleet from the office; a natural step for Chief Engineers and Masters.
- **DPA / CSO** — the Designated Person Ashore and Company Security Officer, the link between ship and company for safety and security.
- **Fleet / operations manager** — coordinates schedules, cargo and crew.

## Crewing and training

- **Crewing manager / crew coordinator** — recruits and rosters seafarers; deep knowledge of ranks and certificates is essential.
- **Instructor / assessor** — teach at an academy or run STCW courses and simulators.

## Surveying, ports and other shore roles

- **Marine surveyor** — inspect vessels for class societies, flag states, P&I clubs or cargo interests.
- **Port captain / terminal operations** — run cargo and vessel operations at a terminal.
- **Pilot** — one of the best-paid shore-adjacent roles, highly competitive and requiring senior deck experience.
- **Vetting, QHSE, chartering, marine insurance and claims** — office roles that value sea experience.

## How to make the move

1. **Bank senior sea time.** Most shore roles want management-level experience — Chief Engineer, Chief Officer or Master.
2. **Add shore-relevant qualifications** — ISM/ISPS auditing, surveying courses, or a maritime degree.
3. **Network.** Many shore jobs are filled through contacts and the crewing companies you already work with.
4. **Keep a strong CV** — translate your sea experience into shore language: management, budgets, compliance.

Build that CV now — create a professional maritime CV in minutes with the [SeaJobs.pro CV builder](/seafarer/cv), and watch the [company profiles](/companies) hiring across the industry.$en$,
    'ru', $ru$Морской стаж — один из самых ценных активов в отрасли, и окупается он не только в море. Рано или поздно многие моряки хотят карьеру на берегу, ближе к семье. Хорошая новость: ваш опыт — именно то, что ищут береговые работодатели. Вот основные пути.

## Управление судами и операции

- **Суперинтендант (технический или морской)** — курирует флот из офиса; естественный шаг для старших механиков и капитанов.
- **DPA / CSO** — Designated Person Ashore и Company Security Officer, связующее звено между судном и компанией по безопасности.
- **Флит- / операционный менеджер** — координирует расписания, груз и экипаж.

## Крюинг и обучение

- **Крюинг-менеджер / координатор экипажей** — набирает и расписывает моряков; нужно глубокое знание должностей и сертификатов.
- **Преподаватель / экзаменатор** — учить в академии или вести курсы ПДНВ и тренажёры.

## Сюрвей, порты и другие береговые роли

- **Морской сюрвейер** — инспектирует суда для классификационных обществ, флагов, P&I-клубов или грузовладельцев.
- **Порт-капитан / операции терминала** — управляет грузовыми и судовыми операциями на терминале.
- **Лоцман** — одна из самых высокооплачиваемых «околобереговых» ролей, очень конкурентная, требует старшего палубного опыта.
- **Веттинг, QHSE, чартеринг, морское страхование и претензии** — офисные роли, ценящие морской опыт.

## Как сделать переход

1. **Накопите старший стаж.** Большинству береговых ролей нужен управленческий уровень — старший механик, старший помощник или капитан.
2. **Добавьте береговые квалификации** — аудит ISM/ISPS, курсы сюрвея или морское высшее.
3. **Нетворкинг.** Многие береговые вакансии закрываются через контакты и крюинги, с которыми вы уже работаете.
4. **Держите сильное CV** — переведите морской опыт на береговой язык: управление, бюджеты, соответствие требованиям.

Соберите такое CV сейчас — сделайте профессиональную анкету моряка за пару минут в [конструкторе CV SeaJobs.pro](/seafarer/cv) и следите за [профилями компаний](/companies), которые нанимают в отрасли.$ru$),
  'Shore careers', 'guide',
  'linear-gradient(135deg,#0e2a45,#5b3fa8)',
  true, '2026-08-04 11:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Life after sea: shore-based maritime careers for former seafarers');

-- ── 20. Mental health and wellbeing at sea ──────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Mental health and wellbeing at sea: staying healthy on long contracts',
    'ru', 'Психическое здоровье и благополучие в море: как держаться в долгом рейсе'),
  jsonb_build_object(
    'en', $en$Life at sea is rewarding, but it is demanding: long contracts, time away from family, fatigue and isolation all take a toll. Looking after your mental wellbeing is as important as any safety drill — and it makes you a safer, more effective crew member. Here is what helps.

## Why it matters

Fatigue and stress are safety issues, not just personal ones — most accidents at sea involve human factors. A crew that sleeps, eats and communicates well makes fewer mistakes.

## What helps on board

- **Protect your sleep.** Fatigue is the biggest enemy; use your rest hours, and speak up if watch schedules leave you exhausted — MLC sets minimum rest hours.
- **Stay connected.** Use ship Wi-Fi to keep in touch with family — one of the strongest protective factors. Many owners now provide crew internet.
- **Move and eat well.** Use the gym, get daylight on deck, and help the cook keep meals varied.
- **Build routine and small goals** — study for the next certificate, a hobby, a fitness target.
- **Look out for each other.** Notice when a shipmate withdraws; a conversation matters.

## Know the support available

- **MLC 2006** guarantees decent living conditions, rest hours, and access to medical care and shore leave.
- Free, confidential helplines exist for seafarers, such as **ISWAN's SeafarerHelp** — 24/7 and multilingual.
- A good crewing agency and owner take welfare seriously — it is a fair question to ask before you sign.

## Choose employers who care

Welfare varies hugely between companies. Read reviews and discuss conditions on the [SeaJobs.pro forum](/forum), check [company profiles](/companies), and pick contracts from agencies with a good reputation. Your wellbeing is part of the deal — treat it that way.$en$,
    'ru', $ru$Жизнь в море приносит удовлетворение, но она требовательна: долгие контракты, разлука с семьёй, усталость и изоляция берут своё. Забота о психическом благополучии не менее важна, чем любая тренировочная тревога, — и делает вас более безопасным и эффективным членом экипажа. Вот что помогает.

## Почему это важно

Усталость и стресс — вопрос безопасности, а не только личный: большинство аварий на море связаны с человеческим фактором. Экипаж, который высыпается, нормально питается и общается, делает меньше ошибок.

## Что помогает на борту

- **Берегите сон.** Усталость — главный враг; используйте часы отдыха и говорите, если график вахт выматывает — MLC задаёт минимальные часы отдыха.
- **Оставайтесь на связи.** Пользуйтесь судовым Wi-Fi, чтобы общаться с семьёй — один из сильнейших защитных факторов. Многие судовладельцы теперь дают интернет экипажу.
- **Двигайтесь и хорошо ешьте.** Используйте спортзал, бывайте на дневном свете на палубе, помогайте коку разнообразить меню.
- **Стройте распорядок и маленькие цели** — учёба на следующий диплом, хобби, спортивная задача.
- **Приглядывайте друг за другом.** Замечайте, когда сослуживец замыкается; разговор важен.

## Знайте, какая поддержка есть

- **MLC 2006** гарантирует достойные условия жизни, часы отдыха и доступ к медпомощи и берегу.
- Существуют бесплатные конфиденциальные линии помощи морякам, например **SeafarerHelp от ISWAN** — круглосуточно и на многих языках.
- Хороший крюинг и судовладелец серьёзно относятся к благополучию — об этом уместно спросить до подписания.

## Выбирайте работодателей, которым не всё равно

Отношение к благополучию сильно различается между компаниями. Читайте отзывы и обсуждайте условия на [форуме SeaJobs.pro](/forum), смотрите [профили компаний](/companies) и берите контракты у крюингов с хорошей репутацией. Ваше благополучие — часть сделки; относитесь к нему так же.$ru$),
  'Wellbeing', 'guide',
  'linear-gradient(135deg,#0e2a45,#2a8f8f)',
  true, '2026-08-04 12:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Mental health and wellbeing at sea: staying healthy on long contracts');
