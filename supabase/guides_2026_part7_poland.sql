-- Polish block (category = 'guide'), for the Poland report in Search Console:
-- "agencje pracy dla marynarzy" (41), "agencja pracy dla marynarzy" (35),
-- "pośrednictwo pracy dla marynarzy" (23), "morska agencja gdynia praca" (17),
-- "seafarer recruitment poland" (47), "kurs dp operator" (89), "trainee dpo",
-- "oow jobs poland" (53), "eto jobs poland" (30), "able seaman jobs poland"
-- (60), "seafarer jobs poland" (53), "maritime jobs poland" (49).
--
-- pl first (it is the market), with ru + ua + en: many of the seafarers who
-- look for work through Polish agencies are Ukrainian.
--
-- Legal points are from the Polish Act on Maritime Work (ustawa o pracy na
-- morzu, art. 18) and the KRAZ register; DP facts from the Nautical Institute
-- scheme as published by accredited centres. Prices and dates are given as
-- examples with their year, and the reader is told to check them.
-- Idempotent — guarded by the English title. Run once in the SQL editor.

-- ── 31. Crewing agencies in Poland ───────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Crewing agencies in Poland: how to choose one and check it is legal',
    'pl', 'Agencje pracy dla marynarzy w Polsce: jak wybrać i sprawdzić agencję',
    'ru', 'Крюинговые агентства в Польше: как выбрать и проверить агентство',
    'ua', 'Крюїнгові агентства в Польщі: як обрати й перевірити агентство'),
  jsonb_build_object(
    'pl', $pl$Polska to jeden z największych ośrodków crewingowych w Europie. W Gdyni, Gdańsku i Szczecinie działają dziesiątki agencji, które rekrutują marynarzy na statki handlowe, offshore i pasażerskie. Większość z nich działa uczciwie — ale żeby trafić do dobrej, warto wiedzieć, jak sprawdzić agencję, zanim wyśle się jej dokumenty.

## Dwa dokumenty, które musi mieć agencja

Agencja kierująca marynarzy do pracy na statkach potrzebuje w Polsce **dwóch rzeczy**:

1. **Wpisu do KRAZ** — Krajowego Rejestru Agencji Zatrudnienia. Sprawdzisz go na stronie kraz.praca.gov.pl.
2. **Dokumentu dyrektora urzędu morskiego** uprawniającego do kierowania marynarzy do pracy na statkach (ustawa o pracy na morzu, art. 18). Wydaje się go po pozytywnym audycie zgodności z Konwencją o pracy na morzu (MLC 2006), ma określony termin ważności i jest odnawiany po kolejnym audycie. Urzędy morskie publikują listy takich agencji.

Sam wpis do KRAZ to za mało — agencja bez dokumentu urzędu morskiego nie powinna kierować marynarzy na statki.

## Agencja nie bierze pieniędzy od marynarza

To zasada MLC 2006: **pośrednictwo pracy dla marynarzy jest dla marynarza bezpłatne**. Agencji płaci armator. Jeśli ktoś żąda opłaty za „miejsce na statku”, „rejestrację” czy „przyspieszenie” — to sygnał, żeby odejść. Za kursy i badania płacisz ośrodkowi szkoleniowemu lub przychodni, nigdy agencji.

## Agencje, które znajdziesz w Polsce

Na rynku działają zarówno biura dużych menedżerów statków, jak i niezależne agencje. Przykładowo w Szczecinie i Trójmieście działają m.in. **Polaris Maritime Services**, **Hartmann Crew Consultants**, **Wilhelmsen Marine Personnel**, **Morska Agencja Gdynia**, **Clyde Marine Recruitment Poland** i **Transport & Offshore Services Poland (TOS)**. To lista przykładów, nie ranking — każdą agencję sprawdź tak, jak opisano wyżej.

## Jak wybrać agencję

- **Flota i typ statków** — agencja pracująca z masowcami nie pomoże w karierze na gazowcach.
- **Przejrzysta umowa** — wynagrodzenie, długość kontraktu, rotacja, ubezpieczenie, koszty podróży.
- **Opinie innych marynarzy** — forum, znajomi z poprzednich kontraktów.
- **Kontakt** — dobra agencja odpowiada konkretnie i nie naciska na szybką decyzję.

## Jak aplikować

Przygotuj CV po angielsku z pełnym stażem i certyfikatami — możesz je [zbudować z profilu](/pl/maritime-cv). Aktualne oferty od polskich agencji znajdziesz na stronie [praca dla marynarzy — Polska](/pl/jobs/country/poland), a całą tablicę ofert w dziale [oferty pracy](/pl/jobs).

*Informacje prawne opisują stan na październik 2026 r. Przed podpisaniem umowy sprawdź aktualne wpisy agencji w KRAZ i na stronie urzędu morskiego.*$pl$,
    'en', $en$Poland is one of Europe's largest crewing centres. Dozens of agencies in Gdynia, Gdańsk and Szczecin recruit seafarers for merchant, offshore and passenger ships. Most are honest — but it pays to know how to check an agency before you send it your documents.

## Two documents a Polish agency must have

To place seafarers on ships, an agency in Poland needs **two things**:

1. **An entry in KRAZ**, the national register of employment agencies (kraz.praca.gov.pl).
2. **A document from the director of the maritime office** allowing it to place seafarers on ships (Act on Maritime Work, art. 18). It is issued after an audit of compliance with the Maritime Labour Convention (MLC 2006), is valid for a fixed period and is renewed after another audit. Maritime offices publish lists of these agencies.

A KRAZ entry alone is not enough: without the maritime office document, an agency should not be placing seafarers on ships.

## The agency does not charge the seafarer

This is an MLC 2006 rule: **recruitment and placement must be free for the seafarer**. The shipowner pays the agency. Anyone asking for a fee for "a place on a ship", "registration" or "speeding things up" is a reason to walk away. Courses and medicals are paid to a training centre or a clinic — never to the agency.

## Agencies you will find in Poland

The market has both offices of large ship managers and independent agencies. In Szczecin and the Tricity, for example, you will find **Polaris Maritime Services**, **Hartmann Crew Consultants**, **Wilhelmsen Marine Personnel**, **Morska Agencja Gdynia**, **Clyde Marine Recruitment Poland** and **Transport & Offshore Services Poland (TOS)**. This is a list of examples, not a ranking — check every agency as described above.

## How to choose

- **Fleet and vessel type** — an agency working with bulk carriers will not build your gas-carrier career.
- **A clear contract** — pay, contract length, rotation, insurance, travel costs.
- **Other seafarers' experience** — forums, colleagues from previous contracts.
- **Communication** — a good agency answers precisely and does not push for a quick decision.

## How to apply

Prepare an English CV with full sea service and certificates — you can [build it from your profile](/maritime-cv). Current offers from Polish agencies are on the [maritime jobs in Poland](/jobs/country/poland) page, and the whole board is under [vacancies](/jobs).

*Legal points describe the situation in October 2026. Before signing, check the agency's current entries in KRAZ and on the maritime office's website.*$en$,
    'ru', $ru$Польша — один из крупнейших крюинговых центров Европы. В Гдыне, Гданьске и Щецине работают десятки агентств, которые набирают моряков на торговые, оффшорные и пассажирские суда. Многие украинские моряки ищут работу именно через них. Большинство агентств честные, но перед тем как отправлять документы, стоит знать, как проверить агентство.

## Два документа, которые должны быть у агентства

Чтобы направлять моряков на суда, польскому агентству нужны **две вещи**:

1. **Запись в KRAZ** — национальном реестре агентств занятости (kraz.praca.gov.pl).
2. **Документ директора морского ведомства (urząd morski)**, который даёт право направлять моряков на суда (закон о работе на море, ст. 18). Его выдают после аудита на соответствие Конвенции о труде в морском судоходстве (MLC 2006), он действует ограниченный срок и продлевается после нового аудита. Морские ведомства публикуют списки таких агентств.

Одной записи в KRAZ мало: без документа морского ведомства агентство не должно направлять моряков на суда.

## Агентство не берёт деньги с моряка

Это правило MLC 2006: **трудоустройство для моряка бесплатно**. Агентству платит судовладелец. Если просят деньги за «место на судне», «регистрацию» или «ускорение» — уходите. Курсы и медкомиссию оплачивают учебному центру или клинике, но никогда — агентству.

## Какие агентства есть в Польше

На рынке работают и офисы крупных судовых менеджеров, и независимые агентства. Например, в Щецине и Труймясте (Гданьск — Гдыня — Сопот) работают **Polaris Maritime Services**, **Hartmann Crew Consultants**, **Wilhelmsen Marine Personnel**, **Morska Agencja Gdynia**, **Clyde Marine Recruitment Poland** и **Transport & Offshore Services Poland (TOS)**. Это примеры, а не рейтинг — каждое агентство проверяйте так, как описано выше.

## Как выбрать агентство

- **Флот и тип судов** — агентство, работающее с балкерами, не поможет с карьерой на газовозах.
- **Понятный договор** — зарплата, длительность контракта, ротация, страховка, расходы на дорогу.
- **Отзывы моряков** — форумы, коллеги с прошлых контрактов.
- **Общение** — хорошее агентство отвечает конкретно и не торопит с решением.

## Как подать заявку

Подготовьте CV на английском с полным стажем и сертификатами — его можно [собрать из профиля](/ru/maritime-cv). Актуальные предложения польских агентств — на странице [работа моряком — Польша](/ru/jobs/country/poland), а все вакансии — в разделе [вакансии](/ru/jobs).

*Правовые сведения описывают ситуацию на октябрь 2026 года. Перед подписанием договора проверьте записи агентства в KRAZ и на сайте морского ведомства.*$ru$,
    'ua', $ua$Польща — один із найбільших крюїнгових центрів Європи. У Гдині, Гданську та Щецині працюють десятки агентств, які набирають моряків на торговельні, офшорні та пасажирські судна. Багато українських моряків шукають роботу саме через них. Більшість агентств чесні, але перш ніж надсилати документи, варто знати, як перевірити агентство.

## Два документи, які мають бути в агентства

Щоб направляти моряків на судна, польському агентству потрібні **дві речі**:

1. **Запис у KRAZ** — національному реєстрі агентств зайнятості (kraz.praca.gov.pl).
2. **Документ директора морського відомства (urząd morski)**, що дає право направляти моряків на судна (закон про роботу на морі, ст. 18). Його видають після аудиту на відповідність Конвенції про працю в морському судноплавстві (MLC 2006), він діє обмежений строк і подовжується після нового аудиту. Морські відомства публікують списки таких агентств.

Самого запису в KRAZ замало: без документа морського відомства агентство не повинно направляти моряків на судна.

## Агентство не бере гроші з моряка

Це правило MLC 2006: **працевлаштування для моряка безкоштовне**. Агентству платить судновласник. Якщо просять гроші за «місце на судні», «реєстрацію» чи «прискорення» — ідіть. Курси й медкомісію оплачують навчальному центру або клініці, але ніколи — агентству.

## Які агентства є в Польщі

На ринку працюють і офіси великих суднових менеджерів, і незалежні агентства. Наприклад, у Щецині й Тримісті (Гданськ — Гдиня — Сопот) працюють **Polaris Maritime Services**, **Hartmann Crew Consultants**, **Wilhelmsen Marine Personnel**, **Morska Agencja Gdynia**, **Clyde Marine Recruitment Poland** і **Transport & Offshore Services Poland (TOS)**. Це приклади, а не рейтинг — кожне агентство перевіряйте так, як описано вище.

## Як обрати агентство

- **Флот і тип суден** — агентство, що працює з балкерами, не допоможе з кар'єрою на газовозах.
- **Зрозумілий договір** — зарплата, тривалість контракту, ротація, страховка, витрати на дорогу.
- **Відгуки моряків** — форуми, колеги з минулих контрактів.
- **Спілкування** — добре агентство відповідає конкретно й не квапить із рішенням.

## Як подати заявку

Підготуйте CV англійською з повним стажем і сертифікатами — його можна [зібрати з профілю](/ua/maritime-cv). Актуальні пропозиції польських агентств — на сторінці [робота моряком — Польща](/ua/jobs/country/poland), а всі вакансії — у розділі [вакансії](/ua/jobs).

*Правові відомості описують ситуацію на жовтень 2026 року. Перед підписанням договору перевірте записи агентства в KRAZ і на сайті морського відомства.*$ua$),
  'Companies', 'guide',
  'linear-gradient(135deg,#0e2a45,#9b2c3a)',
  true, '2026-10-08 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Crewing agencies in Poland: how to choose one and check it is legal');

-- ── 32. DP operator course ───────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'DP operator course: steps, sea time and where to train',
    'pl', 'Kurs DP operatora: etapy, staż i gdzie się szkolić',
    'ru', 'Курс DP-оператора (DPO): этапы, стаж и где учиться',
    'ua', 'Курс DP-оператора (DPO): етапи, стаж і де навчатися'),
  jsonb_build_object(
    'pl', $pl$Operator DP (Dynamic Positioning Operator, DPO) obsługuje system dynamicznego pozycjonowania — komputer, który utrzymuje statek w miejscu lub na zadanym kursie bez kotwicy. To podstawa pracy na jednostkach offshore: PSV, AHTS, statkach serwisowych farm wiatrowych, jednostkach budowlanych i nurkowych. Certyfikat DPO wyraźnie podnosi zarobki i otwiera drogę do offshore.

## Kto może zostać DPO

Zwykle oficerowie pokładowi z dyplomem oficera wachtowego lub wyższym. Kurs podstawowy mogą odbyć także kadeci i studenci w trakcie szkolenia do świadectwa STCW — ale certyfikat wymaga potem praktyki na statku DP.

## Etapy schematu Nautical Institute

Najbardziej rozpoznawany certyfikat wydaje **The Nautical Institute**. Schemat składa się z dwóch kursów i dwóch okresów praktyki:

1. **Kurs DP Induction (Basic)** — zwykle 5 dni (ok. 28–30 godzin) zakończonych testem online.
2. **Pierwszy okres praktyki** — **60 dni DP** na morzu; dzień DP liczy się zwykle przy co najmniej 2 godzinach pracy z systemem. Zadania wpisuje się do dziennika (logbook / task book).
3. **Kurs DP Simulator (Advanced)** — ok. 5 dni na symulatorze z egzaminem praktycznym.
4. **Drugi okres praktyki** — kolejne **60 dni DP**, potem **oświadczenie kapitana o przydatności** (Statement of Suitability).
5. **Wniosek do Nautical Institute** — certyfikat jest wydawany po weryfikacji dokumentów. Rodzaj certyfikatu zależy od klasy DP jednostek, na których zdobyto praktykę.

Elementy schematu trzeba zwykle ukończyć w określonym czasie (najczęściej podaje się 5 lat). Od 2024 roku przy odnowieniu certyfikatu wymagane jest potwierdzenie praktyki i rozwoju zawodowego, a dla osób z za małym stażem — kurs **DP Revalidation**.

## Gdzie się szkolić w Polsce

- **Politechnika Morska w Szczecinie** (ośrodek szkoleniowy oficerów) prowadzi kursy **DP Induction** i **DP Simulator** akredytowane przez Nautical Institute, a także kurs DP Revalidation.
- **Szkoła Morska w Gdyni** prowadziła kurs „DP Podstawowy” (28 godzin); w 2025 roku cena wynosiła 5 700 zł brutto.

Przed zapisem sprawdź **aktualną akredytację** kursu na liście Nautical Institute oraz terminy i ceny — zmieniają się co roku. Istnieje też alternatywna certyfikacja DNV; dowiedz się, który certyfikat uznaje firma, w której chcesz pracować.

## Jak zdobyć pierwsze dni DP

To najtrudniejszy etap: po kursie podstawowym trzeba trafić na statek DP. Szukaj ofert **trainee DPO** lub junior DPO i stanowisk oficerskich na jednostkach z DP2/DP3. Aktualne oferty znajdziesz w dziale [praca offshore](/pl/jobs/vessel/offshore). Do aplikacji przyda się CV z wyraźnie opisanym doświadczeniem — skorzystaj z [szablonu CV offshore](/pl/maritime-cv/offshore).

*Opis schematu na podstawie informacji ośrodków akredytowanych; zasady Nautical Institute bywają aktualizowane — sprawdź je przed rozpoczęciem szkolenia.*$pl$,
    'en', $en$A DP operator (DPO) runs the dynamic positioning system — the computer that holds a vessel in position or on a set track without an anchor. It is the core of work on offshore units: PSVs, AHTSs, wind-farm service vessels, construction and diving support vessels. A DPO certificate noticeably raises pay and opens the way into offshore.

## Who can become a DPO

Usually deck officers with an officer-of-the-watch certificate or higher. Cadets and students training for an STCW certificate can take the induction course too — but the certificate then requires time on a DP vessel.

## The Nautical Institute scheme, step by step

The most widely recognised certificate is issued by **The Nautical Institute**. The scheme has two courses and two periods of sea time:

1. **DP Induction (Basic) course** — usually 5 days (about 28–30 hours) ending with an online test.
2. **First sea-time block** — **60 DP days**; a DP day usually counts with at least 2 hours of operating the system. Tasks are recorded in the logbook / task book.
3. **DP Simulator (Advanced) course** — about 5 days on a simulator with a practical assessment.
4. **Second sea-time block** — another **60 DP days**, followed by the master's **Statement of Suitability**.
5. **Application to the Nautical Institute** — the certificate is issued after the documents are verified. Its type depends on the DP class of the vessels where the time was earned.

The elements usually have to be completed within a set period (five years is the figure most often given). Since 2024, renewal requires proof of recent experience and professional development, and people short of sea time take a **DP Revalidation** course.

## Where to train in Poland

- **The Maritime University of Szczecin** (its officers' training centre) runs Nautical Institute-accredited **DP Induction** and **DP Simulator** courses, and a DP Revalidation course.
- **Szkoła Morska w Gdyni** has run a "DP Basic" course (28 hours); in 2025 it cost PLN 5,700 gross.

Before you enrol, check the course's **current accreditation** on the Nautical Institute list, and the current dates and prices — they change every year. DNV also certifies DP operators; find out which certificate the company you want to work for accepts.

## Getting your first DP days

This is the hardest step: after the induction course you need to get onto a DP vessel. Look for **trainee DPO** or junior DPO positions and officer jobs on DP2/DP3 units. Current offers are in [offshore jobs](/jobs/vessel/offshore). For applications, a CV that shows your experience clearly helps — use the [offshore CV template](/maritime-cv/offshore).

*The scheme is described from accredited centres' information; Nautical Institute rules are revised from time to time — check them before you start.*$en$,
    'ru', $ru$DP-оператор (Dynamic Positioning Operator, DPO) управляет системой динамического позиционирования — компьютером, который удерживает судно на месте или на заданном курсе без якоря. Это основа работы в оффшоре: PSV, AHTS, суда обслуживания ветропарков, строительные и водолазные суда. Сертификат DPO заметно поднимает зарплату и открывает дорогу в оффшор.

## Кто может стать DPO

Обычно палубные офицеры с дипломом вахтенного помощника и выше. Базовый курс могут пройти и кадеты, и студенты, которые учатся на диплом STCW, — но для сертификата потом нужна практика на судне с DP.

## Этапы схемы Nautical Institute

Самый признанный сертификат выдаёт **The Nautical Institute**. Схема состоит из двух курсов и двух периодов практики:

1. **Курс DP Induction (Basic)** — обычно 5 дней (около 28–30 часов), в конце онлайн-тест.
2. **Первый период практики** — **60 дней DP** в море; день DP обычно засчитывается при работе с системой не меньше 2 часов. Задания записываются в журнал (logbook / task book).
3. **Курс DP Simulator (Advanced)** — около 5 дней на тренажёре с практическим экзаменом.
4. **Второй период практики** — ещё **60 дней DP**, затем **заключение капитана о пригодности** (Statement of Suitability).
5. **Заявка в Nautical Institute** — сертификат выдают после проверки документов. Его вид зависит от класса DP судов, на которых набрана практика.

Все этапы обычно нужно пройти за определённый срок (чаще всего называют 5 лет). С 2024 года для продления сертификата нужно подтвердить недавнюю практику и профессиональное развитие, а тем, кому не хватает стажа, — пройти курс **DP Revalidation**.

## Где учиться

- **Морской политехнический университет в Щецине** (Politechnika Morska w Szczecinie) проводит курсы **DP Induction** и **DP Simulator**, аккредитованные Nautical Institute, а также курс DP Revalidation.
- **Szkoła Morska w Gdyni** проводила курс «DP Podstawowy» (28 часов); в 2025 году он стоил 5 700 злотых брутто.
- Аккредитованные центры есть во многих странах — список ведёт сам Nautical Institute.

Перед записью проверьте **действующую аккредитацию** курса в списке Nautical Institute, а также даты и цены — они меняются каждый год. Есть и альтернативная сертификация DNV; узнайте, какой сертификат признаёт компания, в которой вы хотите работать.

## Как набрать первые дни DP

Это самый трудный этап: после базового курса нужно попасть на судно с DP. Ищите вакансии **trainee DPO** или junior DPO и офицерские должности на судах DP2/DP3. Актуальные предложения — в разделе [работа в оффшоре](/ru/jobs/vessel/offshore). Для отклика пригодится CV, где опыт виден сразу, — воспользуйтесь [шаблоном CV для оффшора](/ru/maritime-cv/offshore).

*Схема описана по данным аккредитованных центров; правила Nautical Institute время от времени обновляются — проверьте их перед началом обучения.*$ru$,
    'ua', $ua$DP-оператор (Dynamic Positioning Operator, DPO) керує системою динамічного позиціонування — комп'ютером, який утримує судно на місці або на заданому курсі без якоря. Це основа роботи в офшорі: PSV, AHTS, судна обслуговування вітропарків, будівельні та водолазні судна. Сертифікат DPO помітно підвищує зарплату й відкриває дорогу в офшор.

## Хто може стати DPO

Зазвичай палубні офіцери з дипломом вахтового помічника й вище. Базовий курс можуть пройти й кадети, і студенти, які навчаються на диплом STCW, — але для сертифіката потім потрібна практика на судні з DP.

## Етапи схеми Nautical Institute

Найбільш визнаний сертифікат видає **The Nautical Institute**. Схема складається з двох курсів і двох періодів практики:

1. **Курс DP Induction (Basic)** — зазвичай 5 днів (близько 28–30 годин), наприкінці онлайн-тест.
2. **Перший період практики** — **60 днів DP** у морі; день DP зазвичай зараховується за роботи із системою не менше 2 годин. Завдання записуються в журнал (logbook / task book).
3. **Курс DP Simulator (Advanced)** — близько 5 днів на тренажері з практичним іспитом.
4. **Другий період практики** — ще **60 днів DP**, потім **висновок капітана про придатність** (Statement of Suitability).
5. **Заявка до Nautical Institute** — сертифікат видають після перевірки документів. Його вид залежить від класу DP суден, на яких набрано практику.

Усі етапи зазвичай треба пройти за визначений строк (найчастіше називають 5 років). З 2024 року для подовження сертифіката потрібно підтвердити недавню практику й професійний розвиток, а тим, кому бракує стажу, — пройти курс **DP Revalidation**.

## Де навчатися

- **Морський політехнічний університет у Щецині** (Politechnika Morska w Szczecinie) проводить курси **DP Induction** і **DP Simulator**, акредитовані Nautical Institute, а також курс DP Revalidation.
- **Szkoła Morska w Gdyni** проводила курс «DP Podstawowy» (28 годин); у 2025 році він коштував 5 700 злотих брутто.
- Акредитовані центри є в багатьох країнах — список веде сам Nautical Institute.

Перед записом перевірте **чинну акредитацію** курсу в списку Nautical Institute, а також дати й ціни — вони змінюються щороку. Є й альтернативна сертифікація DNV; дізнайтеся, який сертифікат визнає компанія, у якій ви хочете працювати.

## Як набрати перші дні DP

Це найважчий етап: після базового курсу треба потрапити на судно з DP. Шукайте вакансії **trainee DPO** або junior DPO та офіцерські посади на суднах DP2/DP3. Актуальні пропозиції — у розділі [робота в офшорі](/ua/jobs/vessel/offshore). Для відгуку знадобиться CV, де досвід видно одразу, — скористайтеся [шаблоном CV для офшору](/ua/maritime-cv/offshore).

*Схему описано за даними акредитованих центрів; правила Nautical Institute час від часу оновлюються — перевірте їх перед початком навчання.*$ua$),
  'Offshore', 'guide',
  'linear-gradient(135deg,#0e2a45,#0f6e86)',
  true, '2026-10-08 10:10:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'DP operator course: steps, sea time and where to train');

-- ── 33. Jobs at sea from Poland ──────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Seafarer jobs in Poland: officers of the watch, ETOs and able seamen',
    'pl', 'Praca na morzu z Polski: oferty dla oficerów wachtowych, ETO i marynarzy (AB)',
    'ru', 'Работа моряком через Польшу: вахтенные помощники, ETO и матросы (AB)',
    'ua', 'Робота моряком через Польщу: вахтові помічники, ETO і матроси (AB)'),
  jsonb_build_object(
    'pl', $pl$Polscy marynarze i marynarze z sąsiednich krajów szukają pracy przez polskie agencje z kilku powodów: bliskość biur w Szczecinie i Trójmieście, dobre kontakty z armatorami z Niemiec, Norwegii i Holandii oraz silna pozycja w offshore. Najwięcej ofert dotyczy trzech grup stanowisk.

## Oficer wachtowy (OOW)

Oficer wachtowy — **trzeci lub drugi oficer** po stronie pokładu albo **trzeci mechanik** w maszynowni — to stanowisko, od którego zaczyna się kariera oficerska. Zwykle wymagane są:

- dyplom oficera wachtowego (STCW II/1 lub III/1) i ważne potwierdzenia;
- **ECDIS** (dla pokładu) i kursy typu statku;
- doświadczenie na danym typie jednostki — przy ofertach „OOW” armatorzy często szukają osób z jednym–dwoma kontraktami;
- dobry angielski.

Zobacz oferty: [trzeci oficer](/pl/jobs/rank/3rd-officer), [drugi oficer](/pl/jobs/rank/2nd-officer), [trzeci mechanik](/pl/jobs/rank/3rd-engineer).

## Oficer elektroautomatyk (ETO)

ETO odpowiada za instalacje elektryczne, elektronikę i automatykę. Ze względu na niedobór specjalistów to jedno z najbardziej poszukiwanych stanowisk, szczególnie w **offshore**, na **statkach pasażerskich** i **gazowcach**. Wymagany jest dyplom ETO (STCW III/6) i doświadczenie z systemami wysokiego napięcia (High Voltage) — kurs HV jest często wymagany. Oferty: [ETO](/pl/jobs/rank/eto).

## Starszy marynarz (AB)

AB to doświadczony członek załogi pokładowej: wachta, cumowanie, prace ładunkowe, konserwacja. Wymagane jest świadectwo starszego marynarza (STCW II/5), kursy podstawowe i doświadczenie. W offshore AB często potrzebuje dodatkowo szkoleń offshore (np. BOSIET) i doświadczenia z dźwigami lub pracami na pokładzie roboczym. Oferty: [AB](/pl/jobs/rank/able-seaman).

## Dokumenty polskiego marynarza

- **Dyplom lub świadectwo** wydane przez dyrektora urzędu morskiego.
- **Książeczka żeglarska** i paszport.
- **Świadectwo zdrowia** (badania marynarskie).
- Kursy STCW z aktualną ważnością; dla wielu linii — **wiza C1/D**.

## Jak szukać

1. Zarejestruj się w kilku sprawdzonych agencjach — jak sprawdzić agencję, opisujemy w poradniku o agencjach pracy dla marynarzy.
2. Przygotuj CV po angielsku na jedną–dwie strony — [zbuduj je z profilu](/pl/maritime-cv).
3. Śledź oferty od polskich agencji na stronie [praca dla marynarzy — Polska](/pl/jobs/country/poland).

Pamiętaj: **pośrednictwo pracy dla marynarzy jest bezpłatne**. Nikt nie powinien żądać od Ciebie pieniędzy za kontrakt.$pl$,
    'en', $en$Polish seafarers, and seafarers from neighbouring countries, look for work through Polish agencies for several reasons: offices close by in Szczecin and the Tricity, long-standing links with owners from Germany, Norway and the Netherlands, and a strong position in offshore. Most offers fall into three groups of ranks.

## Officer of the watch (OOW)

The officer of the watch — **third or second officer** on deck, or **third engineer** in the engine room — is where an officer's career starts. Usually required:

- an officer-of-the-watch certificate (STCW II/1 or III/1) with valid endorsements;
- **ECDIS** (for deck) and type-specific courses;
- experience on the vessel type — for "OOW" offers owners often look for one or two completed contracts;
- good English.

See the offers: [third officer](/jobs/rank/3rd-officer), [second officer](/jobs/rank/2nd-officer), [third engineer](/jobs/rank/3rd-engineer).

## Electro-technical officer (ETO)

The ETO is responsible for electrical systems, electronics and automation. With specialists in short supply, it is one of the most sought-after ranks, especially in **offshore**, on **passenger ships** and **gas carriers**. An ETO certificate (STCW III/6) is required, and high-voltage experience — a **High Voltage** course is often requested. Offers: [ETO](/jobs/rank/eto).

## Able seaman (AB)

An AB is an experienced deck rating: watchkeeping, mooring, cargo work, maintenance. An able seafarer deck certificate (STCW II/5), basic courses and experience are required. In offshore, ABs often also need offshore training (such as BOSIET) and experience with cranes or work on the working deck. Offers: [AB](/jobs/rank/able-seaman).

## A Polish seafarer's documents

- A **certificate of competency or proficiency** issued by the director of the maritime office.
- A **seaman's book** (książeczka żeglarska) and passport.
- A **seafarer medical certificate**.
- STCW courses within validity; for many trades, a **C1/D visa**.

## How to look

1. Register with several reputable agencies — our guide to crewing agencies in Poland explains how to check one.
2. Prepare a one-to-two-page English CV — [build it from your profile](/maritime-cv).
3. Follow the offers from Polish agencies on the [maritime jobs in Poland](/jobs/country/poland) page.

Remember: **recruitment is free for seafarers**. Nobody should ask you for money for a contract.$en$,
    'ru', $ru$Польские моряки и моряки из соседних стран, в том числе из Украины, ищут работу через польские агентства по нескольким причинам: офисы рядом — в Щецине и Труймясте, давние связи с судовладельцами из Германии, Норвегии и Нидерландов, сильные позиции в оффшоре. Больше всего предложений — в трёх группах должностей.

## Вахтенный помощник / механик (OOW)

Вахтенный офицер — **третий или второй помощник** на палубе либо **третий механик** в машине — это должность, с которой начинается офицерская карьера. Обычно требуются:

- диплом вахтенного офицера (STCW II/1 или III/1) и действующие подтверждения;
- **ECDIS** (для палубы) и курсы по типу судна;
- опыт на данном типе судов — по вакансиям «OOW» судовладельцы часто ищут людей с одним-двумя контрактами;
- хороший английский.

Вакансии: [третий помощник](/ru/jobs/rank/3rd-officer), [второй помощник](/ru/jobs/rank/2nd-officer), [третий механик](/ru/jobs/rank/3rd-engineer).

## Электромеханик (ETO)

ETO отвечает за электрику, электронику и автоматику. Специалистов не хватает, поэтому это одна из самых востребованных должностей — особенно в **оффшоре**, на **пассажирских судах** и **газовозах**. Нужен диплом ETO (STCW III/6) и опыт с высоким напряжением — курс **High Voltage** часто обязателен. Вакансии: [ETO](/ru/jobs/rank/eto).

## Матрос (AB)

AB — опытный член палубной команды: вахта, швартовка, грузовые работы, обслуживание судна. Нужно свидетельство матроса (STCW II/5), базовые курсы и опыт. В оффшоре матросу часто нужны ещё оффшорные курсы (например, BOSIET) и опыт с кранами или работами на рабочей палубе. Вакансии: [матрос (AB)](/ru/jobs/rank/able-seaman).

## Документы

- **Диплом или свидетельство**, признанные флагом судна (для работы под многими флагами украинский диплом подтверждается флагом).
- **Мореходная книжка** и паспорт.
- **Медицинский сертификат моряка**.
- Курсы STCW с действующим сроком; для многих линий — **виза C1/D**.

## Как искать

1. Зарегистрируйтесь в нескольких проверенных агентствах — как проверить агентство, мы разбирали в гайде о крюингах в Польше.
2. Подготовьте CV на английском на одну-две страницы — [соберите его из профиля](/ru/maritime-cv).
3. Следите за предложениями польских агентств на странице [работа моряком — Польша](/ru/jobs/country/poland).

Помните: **трудоустройство для моряка бесплатно**. Никто не должен требовать с вас деньги за контракт.$ru$,
    'ua', $ua$Польські моряки й моряки з сусідніх країн, зокрема з України, шукають роботу через польські агентства з кількох причин: офіси поруч — у Щецині й Тримісті, давні зв'язки із судновласниками з Німеччини, Норвегії та Нідерландів, сильні позиції в офшорі. Найбільше пропозицій — у трьох групах посад.

## Вахтовий помічник / механік (OOW)

Вахтовий офіцер — **третій або другий помічник** на палубі чи **третій механік** у машині — це посада, з якої починається офіцерська кар'єра. Зазвичай потрібні:

- диплом вахтового офіцера (STCW II/1 або III/1) і чинні підтвердження;
- **ECDIS** (для палуби) та курси за типом судна;
- досвід на цьому типі суден — за вакансіями «OOW» судновласники часто шукають людей з одним-двома контрактами;
- добра англійська.

Вакансії: [третій помічник](/ua/jobs/rank/3rd-officer), [другий помічник](/ua/jobs/rank/2nd-officer), [третій механік](/ua/jobs/rank/3rd-engineer).

## Електромеханік (ETO)

ETO відповідає за електрику, електроніку й автоматику. Фахівців бракує, тому це одна з найзатребуваніших посад — особливо в **офшорі**, на **пасажирських суднах** і **газовозах**. Потрібен диплом ETO (STCW III/6) і досвід із високою напругою — курс **High Voltage** часто обов'язковий. Вакансії: [ETO](/ua/jobs/rank/eto).

## Матрос (AB)

AB — досвідчений член палубної команди: вахта, швартування, вантажні роботи, обслуговування судна. Потрібне свідоцтво матроса (STCW II/5), базові курси й досвід. В офшорі матросу часто потрібні ще офшорні курси (наприклад, BOSIET) і досвід із кранами чи роботами на робочій палубі. Вакансії: [матрос (AB)](/ua/jobs/rank/able-seaman).

## Документи

- **Диплом або свідоцтво**, визнані прапором судна (для роботи під багатьма прапорами український диплом підтверджується прапором).
- **Посвідчення особи моряка (послужна книжка)** і паспорт.
- **Медичний сертифікат моряка**.
- Курси STCW із чинним строком; для багатьох ліній — **віза C1/D**.

## Як шукати

1. Зареєструйтеся в кількох перевірених агентствах — як перевірити агентство, ми розбирали в гайді про крюїнги в Польщі.
2. Підготуйте CV англійською на одну-дві сторінки — [зберіть його з профілю](/ua/maritime-cv).
3. Стежте за пропозиціями польських агентств на сторінці [робота моряком — Польща](/ua/jobs/country/poland).

Пам'ятайте: **працевлаштування для моряка безкоштовне**. Ніхто не повинен вимагати з вас гроші за контракт.$ua$),
  'Career', 'guide',
  'linear-gradient(135deg,#0e2a45,#c0392b)',
  true, '2026-10-08 10:20:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Seafarer jobs in Poland: officers of the watch, ETOs and able seamen');
