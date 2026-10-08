-- Tests and interviews (category = 'guide'): the Marlins English test, the CES
-- competence test, and the crewing-agency interview. Searched in every
-- language the site serves, and asked about by every cadet and junior.
--
-- Facts: Marlins' own test page (85 questions, the section split, 60-minute
-- recommended maximum, score as a percentage); Ocean Technologies Group's CES
-- page and trade press (STCW-based, three test types, English, randomised).
-- Pass marks are set by each employer, so none is stated as a rule; the one
-- reported figure (70%) is given as an example with its source.
--
-- pl + ru + ua + en. Covers are set at the end — run after the deploy that
-- adds public/guides/{marlins,ces-test,crewing-interview}.png.
-- Idempotent — guarded by the English title.

-- ── 41. Marlins ──────────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'The Marlins English test for seafarers: format, sections and how to prepare',
    'ru', 'Тест Marlins для моряков: формат, разделы и как подготовиться',
    'ua', 'Тест Marlins для моряків: формат, розділи та як підготуватися',
    'pl', 'Test Marlins dla marynarzy: format, części i jak się przygotować'),
  jsonb_build_object(
    'en', $en$**Marlins** is the English test crewing agencies ask for most often. It does not check maritime knowledge — it checks whether you will understand the master, the pilot and the safety briefing. Here is what is in it and how to pass it calmly.

## The format

According to Marlins, the English Language Test for Seafarers has **85 questions**:

- **Listening** — 25 questions: short dialogues and instructions, often with an accent.
- **Grammar** — 30 questions: tenses, prepositions, word order.
- **Vocabulary** — 15 questions, including shipboard words.
- **Pronunciation** — 9 questions on telling sounds apart.
- **Time and numbers** — 5 questions: times, dates, quantities.
- **Reading** — 1 question.

There is no hard time limit; the **recommended maximum is 60 minutes**. The result is an **overall percentage**. There is no single pass mark — each company sets its own, so ask the crewing agency what they need for your rank.

## How it is taken

The test is done on a computer, usually at the crewing office or a training centre, with headphones. A licence code starts it; if the connection drops, the same code resumes where you stopped.

## How to prepare

1. **Listening is a third of the test.** Listen every day to maritime English: VHF exchanges, safety briefings, English-language maritime videos.
2. **Grammar is the biggest block.** Revise tenses (present perfect vs past simple), prepositions of time and place, and modal verbs.
3. **Learn numbers and times by ear** — "fifteen" and "fifty" sound alike, and that is exactly what is tested.
4. **Shipboard vocabulary**: parts of the ship, equipment, ranks, safety terms. Our guide on Maritime English and SMCP is a good start.
5. **Take a practice test** in the same format before the real one — the second time is always calmer.

## After the test

Ask for your result and keep it: agencies often accept a recent Marlins score instead of a new test. Add it to your profile — the [maritime CV](/maritime-cv) has a place for languages — and look through the [vacancies](/jobs) that match your rank.

*Format as published by Marlins; the test is revised from time to time, so check the current version with the agency.*$en$,
    'ru', $ru$**Marlins** — тест по английскому, который крюинги просят чаще всего. Он проверяет не морские знания, а то, поймёте ли вы капитана, лоцмана и инструктаж по безопасности. Разберём, что в нём и как сдать спокойно.

## Формат

По данным Marlins, тест English Language Test for Seafarers состоит из **85 вопросов**:

- **Аудирование** — 25 вопросов: короткие диалоги и команды, часто с акцентом.
- **Грамматика** — 30 вопросов: времена, предлоги, порядок слов.
- **Лексика** — 15 вопросов, в том числе судовая.
- **Произношение** — 9 вопросов на различение звуков.
- **Время и числа** — 5 вопросов: время, даты, количества.
- **Чтение** — 1 вопрос.

Жёсткого лимита времени нет, **рекомендуемый максимум — 60 минут**. Результат — **общий процент**. Единого проходного балла нет: каждая компания устанавливает свой, поэтому спросите в крюинге, что нужно для вашей должности.

## Как проходит

Тест сдают на компьютере, обычно в крюинге или учебном центре, в наушниках. Его запускают по коду лицензии; если связь оборвётся, тот же код продолжит тест с того места, где вы остановились.

## Как подготовиться

1. **Аудирование — треть теста.** Каждый день слушайте морской английский: переговоры по УКВ, инструктажи, морские видео на английском.
2. **Грамматика — самый большой блок.** Повторите времена (present perfect и past simple), предлоги времени и места, модальные глаголы.
3. **Учите числа и время на слух** — «fifteen» и «fifty» звучат похоже, и именно это проверяют.
4. **Судовая лексика**: части судна, оборудование, должности, термины безопасности. Хорошее начало — наш гайд о Maritime English и SMCP.
5. **Пройдите пробный тест** в том же формате — второй раз всегда спокойнее.

## После теста

Попросите результат и сохраните его: крюинги часто принимают свежий балл Marlins вместо нового теста. Добавьте его в профиль — в [CV моряка](/ru/maritime-cv) есть место для языков — и посмотрите [вакансии](/ru/jobs) для вашей должности.

*Формат — по данным Marlins; тест время от времени обновляется, актуальную версию уточняйте в крюинге.*$ru$,
    'ua', $ua$**Marlins** — тест з англійської, який крюїнги просять найчастіше. Він перевіряє не морські знання, а те, чи зрозумієте ви капітана, лоцмана й інструктаж із безпеки. Розберімо, що в ньому і як скласти спокійно.

## Формат

За даними Marlins, тест English Language Test for Seafarers складається з **85 питань**:

- **Аудіювання** — 25 питань: короткі діалоги й команди, часто з акцентом.
- **Граматика** — 30 питань: часи, прийменники, порядок слів.
- **Лексика** — 15 питань, зокрема суднова.
- **Вимова** — 9 питань на розрізнення звуків.
- **Час і числа** — 5 питань: час, дати, кількості.
- **Читання** — 1 питання.

Жорсткого ліміту часу немає, **рекомендований максимум — 60 хвилин**. Результат — **загальний відсоток**. Єдиного прохідного балу немає: кожна компанія встановлює свій, тож запитайте в крюїнгу, що потрібно для вашої посади.

## Як проходить

Тест складають на комп'ютері, зазвичай у крюїнгу чи навчальному центрі, у навушниках. Його запускають за кодом ліцензії; якщо зв'язок обірветься, той самий код продовжить тест із того місця, де ви зупинилися.

## Як підготуватися

1. **Аудіювання — третина тесту.** Щодня слухайте морську англійську: переговори по УКХ, інструктажі, морські відео англійською.
2. **Граматика — найбільший блок.** Повторіть часи (present perfect і past simple), прийменники часу й місця, модальні дієслова.
3. **Вчіть числа й час на слух** — «fifteen» і «fifty» звучать схоже, і саме це перевіряють.
4. **Суднова лексика**: частини судна, обладнання, посади, терміни безпеки. Добрий початок — наш гайд про Maritime English і SMCP.
5. **Пройдіть пробний тест** у тому ж форматі — вдруге завжди спокійніше.

## Після тесту

Попросіть результат і збережіть його: крюїнги часто приймають свіжий бал Marlins замість нового тесту. Додайте його до профілю — у [CV моряка](/ua/maritime-cv) є місце для мов — і перегляньте [вакансії](/ua/jobs) для вашої посади.

*Формат — за даними Marlins; тест час від часу оновлюється, актуальну версію уточнюйте в крюїнгу.*$ua$,
    'pl', $pl$**Marlins** to test z angielskiego, o który agencje crewingowe proszą najczęściej. Nie sprawdza wiedzy morskiej — sprawdza, czy zrozumiesz kapitana, pilota i odprawę bezpieczeństwa. Oto co w nim jest i jak zdać go spokojnie.

## Format

Według Marlins test English Language Test for Seafarers ma **85 pytań**:

- **Słuchanie** — 25 pytań: krótkie dialogi i polecenia, często z akcentem.
- **Gramatyka** — 30 pytań: czasy, przyimki, szyk zdania.
- **Słownictwo** — 15 pytań, także okrętowe.
- **Wymowa** — 9 pytań na rozróżnianie dźwięków.
- **Czas i liczby** — 5 pytań: godziny, daty, ilości.
- **Czytanie** — 1 pytanie.

Nie ma sztywnego limitu czasu; **zalecane maksimum to 60 minut**. Wynik to **ogólny procent**. Nie ma jednego progu zaliczenia — każda firma ustala własny, więc zapytaj agencję, czego wymaga na Twoje stanowisko.

## Jak wygląda

Test zdaje się na komputerze, zwykle w agencji lub ośrodku szkoleniowym, w słuchawkach. Uruchamia go kod licencji; jeśli połączenie zostanie przerwane, ten sam kod wznowi test od miejsca, w którym przerwałeś.

## Jak się przygotować

1. **Słuchanie to jedna trzecia testu.** Codziennie słuchaj morskiego angielskiego: korespondencji UKF, odpraw, filmów morskich po angielsku.
2. **Gramatyka to największa część.** Powtórz czasy (present perfect i past simple), przyimki czasu i miejsca, czasowniki modalne.
3. **Ucz się liczb i godzin ze słuchu** — „fifteen” i „fifty” brzmią podobnie i właśnie to jest sprawdzane.
4. **Słownictwo okrętowe**: części statku, wyposażenie, stanowiska, terminy bezpieczeństwa. Dobry start to nasz poradnik o Maritime English i SMCP.
5. **Zrób test próbny** w tym samym formacie — za drugim razem zawsze jest spokojniej.

## Po teście

Poproś o wynik i zachowaj go: agencje często przyjmują świeży wynik Marlins zamiast nowego testu. Dodaj go do profilu — w [CV marynarza](/pl/maritime-cv) jest miejsce na języki — i przejrzyj [oferty pracy](/pl/jobs) na swoje stanowisko.

*Format według Marlins; test bywa aktualizowany, aktualną wersję sprawdź w agencji.*$pl$),
  'English', 'guide',
  'linear-gradient(135deg,#0e2a45,#1d6fa5)',
  true, '2026-10-09 12:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'The Marlins English test for seafarers: format, sections and how to prepare');

-- ── 42. CES ──────────────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'The CES test (Crew Evaluation System): what it checks and how to prepare',
    'ru', 'Тест CES (Crew Evaluation System): что проверяет и как подготовиться',
    'ua', 'Тест CES (Crew Evaluation System): що перевіряє та як підготуватися',
    'pl', 'Test CES (Crew Evaluation System): co sprawdza i jak się przygotować'),
  jsonb_build_object(
    'en', $en$**CES — Crew Evaluation System** — is the computer test many ship managers use to check a seafarer's professional knowledge before a contract. Where Marlins checks your English, CES checks whether you know your job.

## What it is

CES was created by the Norwegian company **Seagull**, now part of **Ocean Technologies Group**. It tests the knowledge areas set out in the **STCW Convention**: navigation, cargo work, engineering, safety, the environment and more. According to the developer, there are three kinds of test:

- an **STCW test** built for your **rank, department and vessel type**;
- a **detailed test** over ten functional areas;
- a **company-specific test** with the employer's own questions.

## How it is taken

The test is in **English**, on a computer at a crewing office or training centre, without access to the internet. Questions are drawn **at random** from a large bank, so learning a list of answers by heart does not work. The **pass mark is set by the company**: one Ukrainian training centre, for example, reported a 70% threshold with about a minute per question. Ask the agency which test and which threshold apply to you.

## How to prepare

1. **Know your rank's STCW competences** — the test is built from them.
2. **Revise by function**: for deck officers COLREG, stability, cargo work, navigation equipment; for engineers machinery, fuel and lubricating systems, electrics, MARPOL; for everyone fire-fighting, life-saving appliances and first aid.
3. **Read the questions in English** — terminology matters; translate the key terms of your rank.
4. **Use practice tests**, but as practice, not as an answer key: the real bank is larger and randomised.
5. **Answer every question** — an empty answer is always wrong.

## After the test

The result goes to the company and often stays in its system for your next contract. A good score is worth mentioning in your [maritime CV](/maritime-cv). Then look at the [vacancies for your rank](/jobs).

*Test types as described by Ocean Technologies Group; pass marks and timing depend on the company — check them with your agency.*$en$,
    'ru', $ru$**CES — Crew Evaluation System** — компьютерный тест, которым многие судовые менеджеры проверяют профессиональные знания моряка перед контрактом. Если Marlins проверяет английский, то CES — знаете ли вы свою работу.

## Что это

CES создала норвежская компания **Seagull**, сейчас она входит в **Ocean Technologies Group**. Тест проверяет области знаний из **конвенции ПДНВ (STCW)**: судовождение, грузовые операции, механику, безопасность, экологию и другое. По данным разработчика, есть три вида теста:

- **тест STCW**, собранный под вашу **должность, службу и тип судна**;
- **детальный тест** по десяти функциональным областям;
- **тест компании** с вопросами самого работодателя.

## Как проходит

Тест на **английском**, на компьютере в крюинге или учебном центре, без доступа к интернету. Вопросы выбираются **случайно** из большой базы, поэтому выучить список ответов наизусть не получится. **Проходной балл устанавливает компания**: например, один украинский учебный центр сообщал о пороге 70% и примерно минуте на вопрос. Уточните в крюинге, какой тест и какой порог нужны вам.

## Как подготовиться

1. **Знайте компетенции STCW для своей должности** — тест строится по ним.
2. **Повторяйте по функциям**: штурманам — МППСС, остойчивость, грузовые операции, навигационное оборудование; механикам — механизмы, топливные и масляные системы, электрику, MARPOL; всем — борьбу с пожаром, спасательные средства и первую помощь.
3. **Читайте вопросы на английском** — терминология решает; переведите ключевые термины своей должности.
4. **Используйте пробные тесты** как тренировку, а не как шпаргалку: настоящая база больше и случайна.
5. **Отвечайте на каждый вопрос** — пустой ответ всегда неверный.

## После теста

Результат уходит в компанию и часто хранится в её системе к следующему контракту. Хороший балл стоит упомянуть в [CV моряка](/ru/maritime-cv). Затем смотрите [вакансии для своей должности](/ru/jobs).

*Виды тестов — по описанию Ocean Technologies Group; проходной балл и время зависят от компании — уточняйте в крюинге.*$ru$,
    'ua', $ua$**CES — Crew Evaluation System** — комп'ютерний тест, яким багато суднових менеджерів перевіряють професійні знання моряка перед контрактом. Якщо Marlins перевіряє англійську, то CES — чи знаєте ви свою роботу.

## Що це

CES створила норвезька компанія **Seagull**, нині вона входить до **Ocean Technologies Group**. Тест перевіряє галузі знань із **конвенції ПДНВ (STCW)**: судноводіння, вантажні операції, механіку, безпеку, екологію та інше. За даними розробника, є три види тесту:

- **тест STCW**, складений під вашу **посаду, службу й тип судна**;
- **детальний тест** за десятьма функціональними галузями;
- **тест компанії** з питаннями самого роботодавця.

## Як проходить

Тест **англійською**, на комп'ютері в крюїнгу чи навчальному центрі, без доступу до інтернету. Питання обираються **випадково** з великої бази, тож вивчити список відповідей напам'ять не вийде. **Прохідний бал встановлює компанія**: наприклад, один український навчальний центр повідомляв про поріг 70% і приблизно хвилину на питання. Уточніть у крюїнгу, який тест і який поріг потрібні вам.

## Як підготуватися

1. **Знайте компетенції STCW для своєї посади** — тест будується за ними.
2. **Повторюйте за функціями**: штурманам — МППЗС, остійність, вантажні операції, навігаційне обладнання; механікам — механізми, паливні й оливні системи, електрику, MARPOL; усім — боротьбу з пожежею, рятувальні засоби й першу допомогу.
3. **Читайте питання англійською** — термінологія вирішує; перекладіть ключові терміни своєї посади.
4. **Використовуйте пробні тести** як тренування, а не як шпаргалку: справжня база більша й випадкова.
5. **Відповідайте на кожне питання** — порожня відповідь завжди неправильна.

## Після тесту

Результат іде в компанію й часто зберігається в її системі до наступного контракту. Добрий бал варто згадати в [CV моряка](/ua/maritime-cv). Потім дивіться [вакансії для своєї посади](/ua/jobs).

*Види тестів — за описом Ocean Technologies Group; прохідний бал і час залежать від компанії — уточнюйте в крюїнгу.*$ua$,
    'pl', $pl$**CES — Crew Evaluation System** — to test komputerowy, którym wielu menedżerów statków sprawdza wiedzę zawodową marynarza przed kontraktem. Marlins sprawdza angielski, a CES — czy znasz swoją pracę.

## Co to jest

CES stworzyła norweska firma **Seagull**, dziś część **Ocean Technologies Group**. Test sprawdza obszary wiedzy z **konwencji STCW**: nawigację, prace ładunkowe, mechanikę, bezpieczeństwo, ochronę środowiska i inne. Według producenta są trzy rodzaje testu:

- **test STCW** ułożony pod Twoje **stanowisko, dział i typ statku**;
- **test szczegółowy** z dziesięciu obszarów funkcyjnych;
- **test firmowy** z pytaniami samego pracodawcy.

## Jak wygląda

Test jest **po angielsku**, na komputerze w agencji lub ośrodku szkoleniowym, bez dostępu do internetu. Pytania są losowane z dużej bazy, więc nauka listy odpowiedzi na pamięć nie zadziała. **Próg zaliczenia ustala firma**: przykładowo jeden ukraiński ośrodek podawał próg 70% i około minuty na pytanie. Zapytaj agencję, jaki test i jaki próg obowiązują Ciebie.

## Jak się przygotować

1. **Znaj kompetencje STCW dla swojego stanowiska** — test jest z nich zbudowany.
2. **Powtarzaj według funkcji**: oficerowie pokładowi — COLREG, stateczność, prace ładunkowe, urządzenia nawigacyjne; mechanicy — maszyny, układy paliwa i smarowania, elektryka, MARPOL; wszyscy — ochrona przeciwpożarowa, środki ratunkowe i pierwsza pomoc.
3. **Czytaj pytania po angielsku** — liczy się terminologia; przetłumacz kluczowe pojęcia swojego stanowiska.
4. **Korzystaj z testów próbnych** jako treningu, a nie ściągi: prawdziwa baza jest większa i losowa.
5. **Odpowiadaj na każde pytanie** — brak odpowiedzi jest zawsze błędny.

## Po teście

Wynik trafia do firmy i często zostaje w jej systemie na kolejny kontrakt. Dobry wynik warto wspomnieć w [CV marynarza](/pl/maritime-cv). Potem przejrzyj [oferty na swoje stanowisko](/pl/jobs).

*Rodzaje testów według Ocean Technologies Group; próg i czas zależą od firmy — sprawdź w agencji.*$pl$),
  'Certificates', 'guide',
  'linear-gradient(135deg,#0e2a45,#0d7d6b)',
  true, '2026-10-09 12:10:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'The CES test (Crew Evaluation System): what it checks and how to prepare');

-- ── 43. Crewing interview ────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'The crewing agency interview: common questions and how to answer them',
    'ru', 'Собеседование в крюинге: частые вопросы и как на них отвечать',
    'ua', 'Співбесіда в крюїнгу: часті питання та як на них відповідати',
    'pl', 'Rozmowa w agencji crewingowej: najczęstsze pytania i jak odpowiadać'),
  jsonb_build_object(
    'en', $en$Between your CV and a contract there is almost always a conversation with a crewing manager — in the office, by phone or on video, usually partly in English. It is shorter and more practical than a shore job interview. Here is what they ask and what they are really checking.

## What the manager checks

- **That your documents are real and valid** — passport, seaman's book, certificate of competency, endorsements, medical, visas.
- **That your sea service matches the CV** — vessel names, types, dates, ranks.
- **That you can talk in English** — not perfectly, but clearly enough to work.
- **That you will be reliable** — finish the contract, follow procedures, get on with a mixed crew.

## Common questions

1. **"Tell me about your last contract."** Vessel type and size, trading area, your duties, why you signed off. Short and concrete.
2. **"Why did you leave your previous company?"** Be honest and neutral; never criticise the old employer.
3. **"What do you do if…?"** — a fire in the engine room, man overboard, oil spill, blackout. Name the alarm, the report and the first actions.
4. **Rank questions**: COLREG and passage planning for deck officers, main engine and purifiers for engineers, mooring and maintenance for ABs.
5. **"When are you ready to join, and for how long?"** Know your exact readiness date and preferred contract length.
6. **"What salary do you expect?"** Know the market for your rank and vessel type — our [salaries page](/salaries) shows current figures.

## How to prepare

- Bring **originals and copies** of every document, in date order.
- Make sure your **CV matches the seaman's book** to the day — inconsistencies are the most common reason for a quiet "no".
- Prepare a one-minute **introduction in English**.
- Read about the company and its fleet before the call.

## Red flags

An honest crewing agency **never asks you for money** — not for the interview, the contract, "registration" or a visa. A fee, pressure to decide "today", or a contract you are not allowed to read are reasons to walk away.

Keep your profile complete and your [maritime CV](/maritime-cv) up to date, and apply to the [vacancies](/jobs) that match your rank.$en$,
    'ru', $ru$Между CV и контрактом почти всегда есть разговор с крюинг-менеджером — в офисе, по телефону или по видео, обычно частично на английском. Он короче и практичнее, чем собеседование на берегу. Разберём, что спрашивают и что на самом деле проверяют.

## Что проверяет менеджер

- **Что документы настоящие и действующие** — паспорт, мореходная книжка, диплом, подтверждения, медкомиссия, визы.
- **Что стаж совпадает с CV** — названия судов, типы, даты, должности.
- **Что вы говорите по-английски** — не идеально, но достаточно ясно для работы.
- **Что вы надёжны** — доработаете контракт, соблюдаете процедуры, уживётесь в смешанном экипаже.

## Частые вопросы

1. **«Расскажите о последнем контракте».** Тип и размер судна, район плавания, ваши обязанности, почему списались. Коротко и конкретно.
2. **«Почему ушли из прошлой компании?»** Честно и нейтрально; никогда не критикуйте прежнего работодателя.
3. **«Что вы сделаете, если…?»** — пожар в машине, человек за бортом, разлив нефти, блэкаут. Назовите тревогу, доклад и первые действия.
4. **Вопросы по должности**: МППСС и прокладка для штурманов, главный двигатель и сепараторы для механиков, швартовка и обслуживание для матросов.
5. **«Когда готовы к посадке и на какой срок?»** Знайте точную дату готовности и желаемую длительность контракта.
6. **«На какую зарплату рассчитываете?»** Знайте рынок для своей должности и типа судна — актуальные цифры на нашей странице [зарплат](/ru/salaries).

## Как подготовиться

- Возьмите **оригиналы и копии** всех документов, по порядку дат.
- Проверьте, что **CV совпадает с мореходной книжкой** до дня — расхождения чаще всего становятся причиной тихого «нет».
- Подготовьте **рассказ о себе на английском** на одну минуту.
- Почитайте о компании и её флоте до звонка.

## Тревожные сигналы

Честный крюинг **никогда не просит у вас деньги** — ни за собеседование, ни за контракт, ни за «регистрацию» или визу. Плата, давление «решайте сегодня» или договор, который не дают прочитать, — поводы уйти.

Держите профиль заполненным, а [CV моряка](/ru/maritime-cv) — актуальным, и откликайтесь на [вакансии](/ru/jobs) для своей должности.$ru$,
    'ua', $ua$Між CV і контрактом майже завжди є розмова з крюїнг-менеджером — в офісі, телефоном чи відео, зазвичай частково англійською. Вона коротша й практичніша за співбесіду на березі. Розберімо, що питають і що насправді перевіряють.

## Що перевіряє менеджер

- **Що документи справжні й чинні** — паспорт, послужна книжка, диплом, підтвердження, медкомісія, візи.
- **Що стаж збігається з CV** — назви суден, типи, дати, посади.
- **Що ви говорите англійською** — не ідеально, але достатньо зрозуміло для роботи.
- **Що ви надійні** — допрацюєте контракт, дотримуєтеся процедур, уживетеся в змішаному екіпажі.

## Часті питання

1. **«Розкажіть про останній контракт».** Тип і розмір судна, район плавання, ваші обов'язки, чому списалися. Коротко й конкретно.
2. **«Чому пішли з попередньої компанії?»** Чесно й нейтрально; ніколи не критикуйте колишнього роботодавця.
3. **«Що ви зробите, якщо…?»** — пожежа в машині, людина за бортом, розлив нафти, блекаут. Назвіть тривогу, доповідь і перші дії.
4. **Питання за посадою**: МППЗС і прокладання для штурманів, головний двигун і сепаратори для механіків, швартування й обслуговування для матросів.
5. **«Коли готові до посадки й на який строк?»** Знайте точну дату готовності й бажану тривалість контракту.
6. **«На яку зарплату розраховуєте?»** Знайте ринок для своєї посади й типу судна — актуальні цифри на нашій сторінці [зарплат](/ua/salaries).

## Як підготуватися

- Візьміть **оригінали й копії** всіх документів, за порядком дат.
- Перевірте, що **CV збігається з послужною книжкою** до дня — розбіжності найчастіше стають причиною тихого «ні».
- Підготуйте **розповідь про себе англійською** на одну хвилину.
- Почитайте про компанію та її флот до дзвінка.

## Тривожні сигнали

Чесний крюїнг **ніколи не просить у вас гроші** — ні за співбесіду, ні за контракт, ні за «реєстрацію» чи візу. Плата, тиск «вирішуйте сьогодні» чи договір, який не дають прочитати, — приводи піти.

Тримайте профіль заповненим, а [CV моряка](/ua/maritime-cv) — актуальним, і відгукуйтеся на [вакансії](/ua/jobs) для своєї посади.$ua$,
    'pl', $pl$Między CV a kontraktem prawie zawsze jest rozmowa z menedżerem crewingowym — w biurze, przez telefon lub wideo, zwykle częściowo po angielsku. Jest krótsza i bardziej praktyczna niż rozmowa o pracę na lądzie. Oto o co pytają i co naprawdę sprawdzają.

## Co sprawdza menedżer

- **Czy dokumenty są prawdziwe i ważne** — paszport, książeczka żeglarska, dyplom, potwierdzenia, świadectwo zdrowia, wizy.
- **Czy staż zgadza się z CV** — nazwy statków, typy, daty, stanowiska.
- **Czy mówisz po angielsku** — nie idealnie, ale wystarczająco jasno do pracy.
- **Czy jesteś solidny** — dokończysz kontrakt, przestrzegasz procedur, odnajdziesz się w mieszanej załodze.

## Najczęstsze pytania

1. **„Proszę opowiedzieć o ostatnim kontrakcie”.** Typ i wielkość statku, rejon pływania, Twoje obowiązki, powód zejścia. Krótko i konkretnie.
2. **„Dlaczego odszedł Pan z poprzedniej firmy?”** Szczerze i neutralnie; nigdy nie krytykuj byłego pracodawcy.
3. **„Co Pan zrobi, jeśli…?”** — pożar w maszynowni, człowiek za burtą, wyciek ropy, blackout. Wymień alarm, meldunek i pierwsze działania.
4. **Pytania stanowiskowe**: COLREG i planowanie podróży dla oficerów pokładowych, silnik główny i wirówki dla mechaników, cumowanie i konserwacja dla marynarzy.
5. **„Kiedy jest Pan gotowy do zaokrętowania i na jak długo?”** Znaj dokładną datę gotowości i preferowaną długość kontraktu.
6. **„Jakiego wynagrodzenia Pan oczekuje?”** Znaj rynek dla swojego stanowiska i typu statku — aktualne kwoty są na naszej stronie [wynagrodzeń](/pl/salaries).

## Jak się przygotować

- Zabierz **oryginały i kopie** wszystkich dokumentów, w kolejności dat.
- Sprawdź, czy **CV zgadza się z książeczką żeglarską** co do dnia — rozbieżności są najczęstszym powodem cichego „nie”.
- Przygotuj **jednominutowe przedstawienie się po angielsku**.
- Przed rozmową przeczytaj o firmie i jej flocie.

## Sygnały ostrzegawcze

Uczciwa agencja **nigdy nie żąda od Ciebie pieniędzy** — ani za rozmowę, ani za kontrakt, „rejestrację” czy wizę. Opłata, presja „proszę zdecydować dziś” albo umowa, której nie wolno przeczytać, to powody, by odejść.

Dbaj o kompletny profil i aktualne [CV marynarza](/pl/maritime-cv) i aplikuj na [oferty](/pl/jobs) na swoje stanowisko.$pl$),
  'Career', 'guide',
  'linear-gradient(135deg,#0e2a45,#4a5fa8)',
  true, '2026-10-09 12:20:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'The crewing agency interview: common questions and how to answer them');

-- ── Covers ───────────────────────────────────────────────────────────────────
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/marlins.png?v=1'
WHERE title->>'en' = 'The Marlins English test for seafarers: format, sections and how to prepare' AND coalesce(cover_url, '') = '';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/ces-test.png?v=1'
WHERE title->>'en' = 'The CES test (Crew Evaluation System): what it checks and how to prepare' AND coalesce(cover_url, '') = '';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/crewing-interview.png?v=1'
WHERE title->>'en' = 'The crewing agency interview: common questions and how to answer them' AND coalesce(cover_url, '') = '';
