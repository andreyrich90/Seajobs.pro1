-- Rating guides, long versions: Bosun, Able Seaman, Ordinary Seaman, Ship's
-- Cook. Replaces the bodies inserted by part12; titles stay the same, so the
-- URLs do not change.
--
-- Added, as in part13: a typical day, differences by vessel type, documents
-- with their validity, interview questions, common mistakes, contracts and a
-- short FAQ. Facts beyond part12: STCW I/9 (medical up to 2 years), VI/1
-- (Basic Training refreshed every 5 years), MLC 2006 rest hours (10 in 24,
-- 77 in 7 days) and Standard A2.5.1 (less than 12 months on board), MLC
-- Regulation 3.2 (food and drinking water free of charge; documented
-- inspections of supplies and galley by the master or an officer).
--
-- UPDATE by English title: running it twice writes the same text twice.

-- ── 48. Bosun ────────────────────────────────────────────────────────────────
UPDATE news_articles SET body = jsonb_build_object(
  'en', $en$The **bosun** (boatswain) is the senior rating on deck — the foreman between the chief officer and the deck crew. The chief officer decides what has to be done; the bosun decides who does it, with which tools, and makes sure it is done safely. A good bosun is the reason a ship looks cared for, and the reason a mooring goes quietly. This guide covers the duties, a typical day, how the job changes by vessel type, the documents, the interview and the way up.

## What the bosun does

- **Runs the deck crew.** Turns the chief officer's plan into the day's jobs for the ABs and OSs, gives the toolbox talk, and checks the work.
- **Maintenance.** Rust removal and painting, greasing, hatch covers and their seals, mooring winches and ropes, lashing gear, cranes and derricks on cargo ships — following the planned maintenance system.
- **Mooring and anchoring.** Usually leads the forward mooring party together with the officer and handles the windlass; knows how ropes are led, where the snap-back zones are, and when to stop.
- **Rigging and gear.** Ropes, wires, shackles, blocks, pilot ladders, gangways and accommodation ladders — inspected, maintained and recorded.
- **Stores.** Paint, tools, ropes and deck consumables: keeps the deck store, counts what is left and tells the chief officer what to order.
- **Safety at work.** Work permits, working aloft and over the side, enclosed spaces, protective equipment. The bosun is the first person who stops an unsafe job.

## A typical day

- **07:30–08:00:** the plan from the chief officer, then a short toolbox meeting with the crew: jobs, risks, permits, protective equipment.
- **08:00–12:00:** maintenance on deck, with the bosun moving between the teams.
- **13:00–17:00:** more work, tidying up, putting tools and paint away, a short report to the chief officer.
- **Any hour:** mooring, anchoring, pilot ladders, taking stores.

The bosun is usually a **day worker** and does not keep a navigational watch, but is called out whenever the ship arrives, departs or anchors.

## Differences by vessel type

- **Bulk carriers:** hatch covers, hold cleaning between cargoes, cranes and grabs.
- **Container ships:** lashing gear by the thousand, short port stays and lashing checks before sea.
- **Tankers:** hoses and manifolds, strict permits, little painting near cargo areas during operations.
- **Offshore:** deck cargo, crane and rigging work close to installations — a separate world, often with offshore safety training.
- **Passenger ships:** a large deck team, tenders and lifeboats used daily, the ship's appearance always on show.

## Certificates and documents

There is **no separate STCW certificate for a bosun**. Companies expect:

- the **able seafarer deck** certificate (STCW II/5);
- **Basic Training**, refreshed every five years, and Security Awareness or Designated Security Duties;
- a **medical certificate**, valid for at most two years;
- often **crane operator**, **rigging** or **working at height** training, and on tankers or gas carriers the basic cargo courses;
- a seaman's book and passport, and visas for the trading area.

## What it takes

In practice — years as an AB, experience on the vessel type, and the ability to lead a mixed crew in English. Most companies promote an AB they already know after several contracts, often on the recommendation of the chief officer.

## The path

Ordinary seaman → able seaman → **bosun**. Some bosuns go on to study for an officer's certificate; many stay — an experienced bosun is valued and well paid among the ratings, and a company will keep a good one for years.

## Contracts and rotation

Ratings often sail longer than officers — **six to nine months** is common, depending on the company and the crew's nationality. MLC 2006 limits the time on board before repatriation to **less than 12 months**, and the rest-hour minimums — **10 hours in 24** and **77 in seven days** — apply to the bosun too, even on the day of a long mooring.

## Interview questions for a bosun

1. **"How do you organise a mooring on the forecastle?"** Positions, lines, communication, snap-back zones.
2. **"What does a permit for working aloft include?"** Harness, anchorage point, a second person, weather.
3. **"How do you inspect a pilot ladder?"** Steps, side ropes, securing, the certificate.
4. **"An AB refuses to wear a harness. What do you do?"** Stop the job, explain, report.
5. **"How do you plan painting with a small crew and bad weather?"**
6. **"What cargo gear have you maintained?"** Cranes, derricks, hatch covers — concretely.

## Common mistakes

- **Only practical experience in the CV**, without vessel types, gear and crew sizes.
- **Expired Basic Training** — still the most common reason for a fast "no".
- **Weak English.** A bosun gives instructions to a mixed crew and talks to the officers by radio.
- **Not mentioning leadership** — even acting as bosun for part of a contract counts.

## FAQ

**Does a bosun need a special certificate?**
No separate STCW certificate exists; the able seafarer deck certificate and experience are what count.

**Does the bosun keep a watch?**
Usually no — the bosun is a day worker called out for moorings.

**How long from AB to bosun?**
It depends on the company; typically several contracts as AB.

**Can a bosun become an officer?**
Yes, through the officer-of-the-watch certificate, which requires the sea service and exams of STCW II/1.

## Pay and jobs

The bosun is usually the highest-paid deck rating. The current range from real vacancies is on the [bosun jobs page](/jobs/rank/bosun); a comparison by rank is on our [salaries page](/salaries).

## Your CV

For a bosun, crewing desks look at vessel types, the cargo gear you have worked with and how long you have led a crew. The [maritime CV](/maritime-cv) puts this first.

*Certificates follow STCW and MLC 2006; your flag state may add its own requirements.*$en$,
  'ru', $ru$**Боцман** — старший из рядового состава на палубе, бригадир между старпомом и палубной командой. Старпом решает, что нужно сделать; боцман решает, кто это сделает, каким инструментом, и следит, чтобы сделали безопасно. Хороший боцман — причина того, что судно выглядит ухоженным, а швартовка проходит спокойно. В гайде — обязанности, типичный день, отличия по типам судов, документы, собеседование и путь наверх.

## Чем занимается боцман

- **Руководит палубной командой.** Превращает план старпома в работу на день для матросов, проводит инструктаж и проверяет работу.
- **Обслуживание.** Обивка ржавчины и покраска, смазка, люковые крышки и их уплотнения, швартовные лебёдки и концы, найтовы, краны и стрелы на грузовых судах — по системе планово-предупредительного обслуживания.
- **Швартовка и якорь.** Обычно руководит баковой швартовной партией вместе с помощником и работает на брашпиле; знает, как заводятся концы, где опасные зоны отдачи троса и когда нужно остановиться.
- **Такелаж.** Концы, тросы, скобы, блоки, лоцманские трапы, сходни и забортные трапы — осмотр, обслуживание и записи.
- **Снабжение.** Краска, инструмент, концы и палубные расходники: ведёт боцманскую кладовую, считает остатки и говорит старпому, что заказать.
- **Безопасность работ.** Наряды-допуски, работы на высоте и за бортом, закрытые помещения, средства защиты. Боцман первым останавливает опасную работу.

## Типичный день

- **07:30–08:00:** план от старпома, затем короткий инструктаж команды: работы, риски, допуски, средства защиты.
- **08:00–12:00:** работы на палубе, боцман переходит от одной группы к другой.
- **13:00–17:00:** продолжение работ, уборка, инструмент и краска на место, короткий доклад старпому.
- **В любое время:** швартовка, постановка на якорь, лоцманский трап, приём снабжения.

Боцман обычно **подвахтенный (day worker)** и ходовую вахту не стоит, но его поднимают на каждый приход, отход и постановку на якорь.

## Отличия по типам судов

- **Балкеры:** люковые крышки, мойка трюмов между грузами, краны и грейферы.
- **Контейнеровозы:** тысячи единиц крепления, короткие стоянки и проверка крепления перед выходом в море.
- **Танкеры:** шланги и манифолд, строгие допуски, почти никакой покраски у грузовой зоны во время операций.
- **Оффшор:** палубный груз, крановые и такелажные работы рядом с установками — отдельный мир, часто с оффшорными курсами безопасности.
- **Пассажирские суда:** большая палубная команда, тендеры и шлюпки в ежедневной работе, внешний вид судна всегда на виду.

## Дипломы и документы

**Отдельного диплома боцмана по ПДНВ нет.** Компании ожидают:

- свидетельство **матроса первого класса (able seafarer deck, ПДНВ II/5)**;
- **Basic Training** с переподготовкой каждые пять лет и Security Awareness или Designated Security Duties;
- **медицинское свидетельство** — не более двух лет;
- часто курсы **крановщика**, **такелажника** или **работ на высоте**, а на танкерах и газовозах — начальные грузовые курсы;
- мореходную книжку и паспорт, визы для района работы.

## Что для этого нужно

На практике — годы работы матросом, опыт на этом типе судов и умение руководить смешанным экипажем на английском. Большинство компаний повышают знакомого матроса после нескольких контрактов, часто по рекомендации старпома.

## Путь

Матрос второго класса (OS) → матрос первого класса (AB) → **боцман**. Часть боцманов потом учится на офицерский диплом; многие остаются — опытного боцмана ценят, среди рядового состава ему хорошо платят, и хорошего боцмана компания держит годами.

## Контракты и ротация

Рядовой состав часто работает дольше офицеров — **шесть–девять месяцев** встречаются часто, в зависимости от компании и национальности экипажа. MLC 2006 ограничивает время на борту до репатриации **сроком меньше 12 месяцев**, а минимум отдыха — **10 часов за 24** и **77 за семь дней** — касается и боцмана, даже в день долгой швартовки.

## Вопросы на собеседовании

1. **«Как вы организуете швартовку на баке?»** Расстановка, концы, связь, опасные зоны отдачи.
2. **«Что входит в допуск на работы на высоте?»** Страховочная привязь, точка крепления, второй человек, погода.
3. **«Как вы проверяете лоцманский трап?»** Ступени, тетивы, крепление, сертификат.
4. **«Матрос отказывается надеть страховочную привязь. Ваши действия?»** Остановить работу, объяснить, доложить.
5. **«Как планировать покраску при маленькой команде и плохой погоде?»**
6. **«Какое грузовое устройство вы обслуживали?»** Краны, стрелы, люковые крышки — конкретно.

## Частые ошибки

- **В CV только практика**, без типов судов, грузового устройства и размеров команды.
- **Просроченный Basic Training** — по-прежнему самая частая причина быстрого «нет».
- **Слабый английский.** Боцман даёт указания смешанному экипажу и говорит с помощниками по рации.
- **Не упомянуть руководство** — даже часть контракта исполняющим обязанности боцмана считается.

## Частые вопросы

**Нужен ли боцману особый диплом?**
Отдельного диплома по ПДНВ нет; важны свидетельство матроса первого класса и опыт.

**Стоит ли боцман вахту?**
Обычно нет — боцман подвахтенный, его поднимают на швартовки.

**Сколько времени от матроса до боцмана?**
Зависит от компании; обычно несколько контрактов матросом первого класса.

**Может ли боцман стать офицером?**
Да, через диплом вахтенного помощника, для которого нужны стаж и экзамены по правилу II/1 ПДНВ.

## Зарплата и вакансии

Боцман обычно самый высокооплачиваемый из палубного рядового состава. Актуальный диапазон по реальным вакансиям — на странице [вакансий боцмана](/ru/jobs/rank/bosun), сравнение по должностям — на странице [зарплат](/ru/salaries).

## Ваше CV

В CV боцмана крюинг смотрит на типы судов, грузовое устройство, с которым вы работали, и сколько вы руководили командой. [CV моряка](/ru/maritime-cv) ставит это в начало.

*Документы — по ПДНВ (STCW) и MLC 2006; государство флага может добавлять свои требования.*$ru$,
  'ua', $ua$**Боцман** — старший з рядового складу на палубі, бригадир між старпомом і палубною командою. Старпом вирішує, що треба зробити; боцман вирішує, хто це зробить, яким інструментом, і стежить, щоб зробили безпечно. Добрий боцман — причина того, що судно виглядає доглянутим, а швартування минає спокійно. У гайді — обов'язки, типовий день, відмінності за типами суден, документи, співбесіда й шлях угору.

## Чим займається боцман

- **Керує палубною командою.** Перетворює план старпома на роботу на день для матросів, проводить інструктаж і перевіряє роботу.
- **Обслуговування.** Оббивання іржі й фарбування, змащування, люкові кришки та їхні ущільнення, швартовні лебідки й кінці, найтови, крани й стріли на вантажних суднах — за системою планово-попереджувального обслуговування.
- **Швартування й якір.** Зазвичай керує баковою швартовною партією разом із помічником і працює на брашпилі; знає, як заводяться кінці, де небезпечні зони віддачі троса й коли треба зупинитися.
- **Такелаж.** Кінці, троси, скоби, блоки, лоцманські трапи, сходні й забортні трапи — огляд, обслуговування й записи.
- **Постачання.** Фарба, інструмент, кінці й палубні витратні матеріали: веде боцманську комору, рахує залишки й каже старпомові, що замовити.
- **Безпека робіт.** Наряди-допуски, роботи на висоті й за бортом, закриті приміщення, засоби захисту. Боцман першим зупиняє небезпечну роботу.

## Типовий день

- **07:30–08:00:** план від старпома, потім короткий інструктаж команди: роботи, ризики, допуски, засоби захисту.
- **08:00–12:00:** роботи на палубі, боцман переходить від однієї групи до іншої.
- **13:00–17:00:** продовження робіт, прибирання, інструмент і фарба на місце, коротка доповідь старпомові.
- **Будь-коли:** швартування, постановка на якір, лоцманський трап, приймання постачання.

Боцман зазвичай **підвахтовий (day worker)** і ходову вахту не несе, але його піднімають на кожен прихід, відхід і постановку на якір.

## Відмінності за типами суден

- **Балкери:** люкові кришки, миття трюмів між вантажами, крани й грейфери.
- **Контейнеровози:** тисячі одиниць кріплення, короткі стоянки й перевірка кріплення перед виходом у море.
- **Танкери:** шланги й маніфольд, суворі допуски, майже жодного фарбування біля вантажної зони під час операцій.
- **Офшор:** палубний вантаж, кранові й такелажні роботи поруч з установками — окремий світ, часто з офшорними курсами безпеки.
- **Пасажирські судна:** велика палубна команда, тендери й шлюпки в щоденній роботі, зовнішній вигляд судна завжди на виду.

## Дипломи й документи

**Окремого диплома боцмана за ПДНВ немає.** Компанії очікують:

- свідоцтво **матроса першого класу (able seafarer deck, ПДНВ II/5)**;
- **Basic Training** із перепідготовкою кожні п'ять років і Security Awareness або Designated Security Duties;
- **медичне свідоцтво** — не більше двох років;
- часто курси **кранівника**, **такелажника** чи **робіт на висоті**, а на танкерах і газовозах — початкові вантажні курси;
- послужну книжку й паспорт, візи для району роботи.

## Що для цього потрібно

На практиці — роки роботи матросом, досвід на цьому типі суден і вміння керувати змішаним екіпажем англійською. Більшість компаній підвищують знайомого матроса після кількох контрактів, часто за рекомендацією старпома.

## Шлях

Матрос другого класу (OS) → матрос першого класу (AB) → **боцман**. Частина боцманів потім навчається на офіцерський диплом; багато хто залишається — досвідченого боцмана цінують, серед рядового складу йому добре платять, і доброго боцмана компанія тримає роками.

## Контракти й ротація

Рядовий склад часто працює довше за офіцерів — **шість–дев'ять місяців** трапляються часто, залежно від компанії й національності екіпажу. MLC 2006 обмежує час на борту до репатріації **строком менше 12 місяців**, а мінімум відпочинку — **10 годин за 24** і **77 за сім днів** — стосується й боцмана, навіть у день довгого швартування.

## Питання на співбесіді

1. **«Як ви організовуєте швартування на баку?»** Розстановка, кінці, зв'язок, небезпечні зони віддачі.
2. **«Що входить у допуск на роботи на висоті?»** Страхувальна прив'язь, точка кріплення, друга людина, погода.
3. **«Як ви перевіряєте лоцманський трап?»** Сходинки, тятиви, кріплення, сертифікат.
4. **«Матрос відмовляється вдягнути страхувальну прив'язь. Ваші дії?»** Зупинити роботу, пояснити, доповісти.
5. **«Як планувати фарбування за маленької команди й поганої погоди?»**
6. **«Які вантажні пристрої ви обслуговували?»** Крани, стріли, люкові кришки — конкретно.

## Часті помилки

- **У CV лише практика**, без типів суден, вантажних пристроїв і розміру команди.
- **Прострочений Basic Training** — досі найчастіша причина швидкого «ні».
- **Слабка англійська.** Боцман дає вказівки змішаному екіпажу й говорить із помічниками по рації.
- **Не згадати керівництво** — навіть частина контракту виконувачем обов'язків боцмана рахується.

## Часті питання

**Чи потрібен боцманові особливий диплом?**
Окремого диплома за ПДНВ немає; важливі свідоцтво матроса першого класу й досвід.

**Чи несе боцман вахту?**
Зазвичай ні — боцман підвахтовий, його піднімають на швартування.

**Скільки часу від матроса до боцмана?**
Залежить від компанії; зазвичай кілька контрактів матросом першого класу.

**Чи може боцман стати офіцером?**
Так, через диплом вахтового помічника, для якого потрібні стаж та іспити за правилом II/1 ПДНВ.

## Зарплата й вакансії

Боцман зазвичай найбільш оплачуваний із палубного рядового складу. Актуальний діапазон за реальними вакансіями — на сторінці [вакансій боцмана](/ua/jobs/rank/bosun), порівняння за посадами — на сторінці [зарплат](/ua/salaries).

## Ваше CV

У CV боцмана крюїнг дивиться на типи суден, вантажні пристрої, з якими ви працювали, і скільки ви керували командою. [CV моряка](/ua/maritime-cv) ставить це на початок.

*Документи — за ПДНВ (STCW) і MLC 2006; держава прапора може додавати свої вимоги.*$ua$,
  'pl', $pl$**Bosman** to najstarszy z załogi szeregowej na pokładzie — brygadzista między starszym oficerem a załogą pokładową. Starszy oficer decyduje, co trzeba zrobić; bosman decyduje, kto to zrobi i jakim narzędziem, i pilnuje, by zrobiono to bezpiecznie. Dobry bosman to powód, dla którego statek wygląda na zadbany, a cumowanie przebiega spokojnie. W poradniku: obowiązki, typowy dzień, różnice według typu statku, dokumenty, rozmowa i droga w górę.

## Czym zajmuje się bosman

- **Kieruje załogą pokładową.** Zamienia plan starszego oficera na zadania dnia dla marynarzy, prowadzi odprawę i sprawdza pracę.
- **Konserwacja.** Odrdzewianie i malowanie, smarowanie, pokrywy lukowe i ich uszczelki, windy cumownicze i liny, sprzęt do mocowania, dźwigi i bomy na statkach ładunkowych — według systemu planowej konserwacji.
- **Cumowanie i kotwiczenie.** Zwykle kieruje grupą cumowniczą na dziobie razem z oficerem i obsługuje windę kotwiczną; wie, jak prowadzić liny, gdzie są strefy odbicia liny i kiedy przerwać pracę.
- **Olinowanie i osprzęt.** Liny, stalówki, szekle, bloki, sztormtrapy pilotowe, trapy i schodnie — przeglądy, konserwacja i zapisy.
- **Zaopatrzenie.** Farby, narzędzia, liny i materiały pokładowe: prowadzi magazyn bosmański, liczy zapasy i mówi starszemu oficerowi, co zamówić.
- **Bezpieczeństwo pracy.** Zezwolenia na pracę, prace na wysokości i za burtą, przestrzenie zamknięte, środki ochrony. Bosman pierwszy przerywa niebezpieczną pracę.

## Typowy dzień

- **07:30–08:00:** plan od starszego oficera, potem krótka odprawa załogi: prace, zagrożenia, zezwolenia, środki ochrony.
- **08:00–12:00:** prace na pokładzie, bosman przechodzi między grupami.
- **13:00–17:00:** dalsze prace, sprzątanie, narzędzia i farby na miejsce, krótki meldunek starszemu oficerowi.
- **O każdej porze:** cumowanie, kotwiczenie, sztormtrap pilotowy, przyjmowanie zaopatrzenia.

Bosman zwykle pracuje **na dniówce (day worker)** i nie pełni wachty nawigacyjnej, ale jest wzywany przy każdym wejściu, wyjściu i kotwiczeniu.

## Różnice według typu statku

- **Masowce:** pokrywy lukowe, mycie ładowni między ładunkami, dźwigi i chwytaki.
- **Kontenerowce:** tysiące elementów mocujących, krótkie postoje i kontrola mocowań przed wyjściem w morze.
- **Tankowce:** węże i manifold, ścisłe zezwolenia, prawie bez malowania przy strefie ładunkowej podczas operacji.
- **Offshore:** ładunek pokładowy, prace dźwigowe i olinowanie blisko instalacji — osobny świat, często z kursami bezpieczeństwa offshore.
- **Statki pasażerskie:** duża załoga pokładowa, tendry i szalupy w codziennej pracy, wygląd statku zawsze na widoku.

## Dyplomy i dokumenty

**Nie ma osobnego dyplomu bosmana według STCW.** Firmy oczekują:

- świadectwa **starszego marynarza (able seafarer deck, STCW II/5)**;
- **Basic Training** odnawianego co pięć lat oraz Security Awareness lub Designated Security Duties;
- **świadectwa zdrowia** — ważnego najwyżej dwa lata;
- często kursów **operatora dźwigu**, **olinowania** lub **pracy na wysokości**, a na tankowcach i gazowcach — podstawowych kursów ładunkowych;
- książeczki żeglarskiej i paszportu, wiz na rejon pływania.

## Czego to wymaga

W praktyce — lat pracy jako AB, doświadczenia na danym typie statków i umiejętności kierowania mieszaną załogą po angielsku. Większość firm awansuje znanego sobie marynarza po kilku kontraktach, często z polecenia starszego oficera.

## Ścieżka

Młodszy marynarz (OS) → starszy marynarz (AB) → **bosman**. Część bosmanów uczy się potem na dyplom oficerski; wielu zostaje — doświadczony bosman jest ceniony i wśród załogi szeregowej dobrze opłacany, a dobrego bosmana firma trzyma latami.

## Kontrakty i rotacja

Załoga szeregowa często pływa dłużej niż oficerowie — **sześć–dziewięć miesięcy** to częsty okres, zależnie od firmy i narodowości załogi. MLC 2006 ogranicza czas na burcie przed repatriacją do **mniej niż 12 miesięcy**, a minimum odpoczynku — **10 godzin na 24** i **77 na siedem dni** — dotyczy także bosmana, nawet w dniu długiego cumowania.

## Pytania na rozmowie

1. **„Jak organizuje Pan cumowanie na dziobie?”** Rozstawienie, liny, łączność, strefy odbicia.
2. **„Co obejmuje zezwolenie na pracę na wysokości?”** Szelki, punkt kotwiczenia, druga osoba, pogoda.
3. **„Jak sprawdza Pan sztormtrap pilotowy?”** Szczeble, liny boczne, mocowanie, certyfikat.
4. **„Marynarz odmawia założenia szelek. Co Pan robi?”** Przerwać pracę, wyjaśnić, zgłosić.
5. **„Jak zaplanować malowanie przy małej załodze i złej pogodzie?”**
6. **„Jakie urządzenia ładunkowe Pan konserwował?”** Dźwigi, bomy, pokrywy lukowe — konkretnie.

## Częste błędy

- **W CV tylko praktyka**, bez typów statków, urządzeń i wielkości załogi.
- **Nieważny Basic Training** — wciąż najczęstszy powód szybkiego „nie”.
- **Słaby angielski.** Bosman wydaje polecenia mieszanej załodze i rozmawia z oficerami przez radio.
- **Brak wzmianki o kierowaniu ludźmi** — nawet część kontraktu jako pełniący obowiązki bosmana się liczy.

## Najczęstsze pytania

**Czy bosman potrzebuje specjalnego dyplomu?**
Osobnego dyplomu STCW nie ma; liczą się świadectwo starszego marynarza i doświadczenie.

**Czy bosman pełni wachtę?**
Zwykle nie — bosman pracuje na dniówce i jest wzywany do cumowania.

**Ile trwa droga od AB do bosmana?**
Zależy od firmy; zwykle kilka kontraktów jako AB.

**Czy bosman może zostać oficerem?**
Tak, przez dyplom oficera wachtowego, który wymaga praktyki i egzaminów z prawidła II/1 STCW.

## Wynagrodzenie i oferty

Bosman jest zwykle najlepiej opłacanym marynarzem pokładowym. Aktualny przedział z prawdziwych ofert jest na stronie [ofert dla bosmanów](/pl/jobs/rank/bosun), a porównanie stanowisk — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

W CV bosmana agencja patrzy na typy statków, urządzenia ładunkowe, z którymi pracowałeś, i jak długo kierowałeś załogą. [CV marynarza](/pl/maritime-cv) stawia to na początku.

*Dokumenty według STCW i MLC 2006; państwo bandery może dodawać własne wymagania.*$pl$)
WHERE title->>'en' = 'Bosun on a ship: duties, requirements and how to become one';

-- ── 49. Able Seaman ──────────────────────────────────────────────────────────
UPDATE news_articles SET body = jsonb_build_object(
  'en', $en$The **able seaman (AB)** is the backbone of the deck crew: on watch at the wheel and on lookout, on day work keeping the ship in shape, and at every mooring. It is also one of the ranks with the most vacancies on any job board — which means more chances, and more competition. This guide covers what an AB does, a typical day, how the job changes by vessel type, the certificate and courses, the interview and the mistakes that cost contracts.

## What an AB does

- **Watchkeeping.** Lookout and helmsman on the bridge watch alongside the officer of the watch: reporting lights, ships and anything unusual, steering by hand when ordered. In port — gangway and deck watches, checking moorings and who comes on board.
- **Maintenance.** Rust removal and painting, greasing, cleaning holds or tanks, small repairs under the bosun's direction.
- **Mooring and anchoring.** Handling ropes and winches fore and aft — the moment where an AB's experience matters most and where the most serious accidents on deck happen.
- **Cargo.** Lashing and unlashing, hatch covers, assisting with hoses and manifolds on tankers, sounding tanks.
- **Safety.** Drills, maintenance of the life-saving equipment, rigging pilot ladders and accommodation ladders.

## A typical day

There are two kinds of AB on most ships:

- **Watchkeeping AB:** a **four-on, eight-off** pattern — for example 08:00–12:00 and 20:00–24:00 on the bridge with the officer of the watch, sometimes with a few hours of day work added.
- **Day-working AB:** roughly 08:00–17:00 on deck with the bosun — maintenance, painting, cleaning — and called out for moorings.

In port everybody's day changes: gangway watches, cargo work, stores and moorings at any hour.

## Differences by vessel type

- **Bulk carriers:** hold cleaning, hatch covers, long sea passages with a lot of maintenance.
- **Container ships:** lashing, many ports, short stays and frequent moorings.
- **Tankers:** cargo hoses and manifolds, strict permits and gas-free procedures; the basic tanker course is required.
- **Offshore:** deck cargo, crane signals, work close to installations; offshore safety training is often needed.
- **Passenger ships:** tenders and lifeboats, a large deck team, and the ship's appearance always on show.

## Certificates and documents

- **Able seafarer deck** (STCW II/5) — and before it, **rating forming part of a navigational watch** (STCW II/4).
- **Basic Training** — fire-fighting, survival, first aid, personal safety; refreshed every **five years**.
- **Security Awareness** or **Designated Security Duties**.
- **Medical certificate** — valid for at most **two years**.
- A seaman's book, a passport and visas for the trading area.
- On tankers and gas carriers, the **basic cargo** courses; on some ships **survival craft (PSCRB)**.

## What it takes

Under **STCW Regulation II/5** the able seafarer deck must be at least **18**, be qualified as a rating forming part of a navigational watch, and then have at least **18 months** of approved sea service in the deck department — or **12 months** after approved training.

## How to get the first AB contract

1. **Count your sea time carefully** — the months as OS are what the AB certificate is built from. Keep the discharge entries in your seaman's book in order.
2. **Keep every course valid** before you apply; an expired one is the most common reason for a "no".
3. **Start where juniors are hired** — bulk carriers and general cargo — and move to tankers or offshore later.
4. **Basic English matters**: helm orders, safety words, numbers and radio talk.
5. **Ask your last ship for a reference** — a word from the bosun or chief officer helps.

## Contracts and rotation

ABs often sail **six to nine months**, depending on the company and the crew's nationality. MLC 2006 limits the time on board before repatriation to **less than 12 months**, and the rest-hour minimums — **10 hours in 24** and **77 in seven days** — must be respected and recorded.

## Interview questions for an AB

1. **"Repeat this helm order: port twenty."** Helm orders in English and how you confirm them.
2. **"What do you report as lookout?"** Lights, ships, buoys, anything in the water — and how.
3. **"What are snap-back zones?"** The danger areas when a mooring line parts.
4. **"What do you do before entering an enclosed space?"** Permit, gas test, ventilation, an attendant.
5. **"How do you rig a pilot ladder?"** Height, securing, lighting, lifebuoy.
6. **"Which vessel types have you worked on, and what did you do there?"**

## Common mistakes

- **Unclear sea time** — months that do not match the seaman's book.
- **Courses expiring during the contract.** Companies compare the dates with the contract length.
- **No English at all.** You will not pass the helm-order question.
- **Paying an agency.** Recruitment is free for the seafarer — the owner pays.

## FAQ

**What is the difference between AB and OS?**
The OS is the entry rank; the AB holds the able seafarer deck certificate and more sea time.

**Can an AB become an officer?**
Yes — through the officer-of-the-watch certificate under STCW II/1, which needs approved sea service and exams.

**Do ABs keep watches?**
Watchkeeping ABs do; day-working ABs work with the bosun and are called out for moorings.

**Is the AB the same as an "able seafarer deck"?**
Yes — "able seafarer deck" is the STCW term for the AB.

## Pay and jobs

The current range from real vacancies is on the [able seaman jobs page](/jobs/rank/able-seaman); a comparison by rank is on our [salaries page](/salaries).

## Your CV

Crewing desks read an AB's CV for vessel types, months at sea and certificates with expiry dates. The [maritime CV](/maritime-cv) lays them out on one page.

*Requirements follow STCW and MLC 2006; your flag state may add its own. Check them with your maritime administration.*$en$,
  'ru', $ru$**Матрос первого класса (AB)** — основа палубной команды: на вахте у руля и впередсмотрящим, на дневных работах держит судно в порядке, и на каждой швартовке. Это ещё и одна из должностей с наибольшим числом вакансий на любом сайте — значит, больше шансов и больше конкуренции. В гайде — чем занимается AB, типичный день, отличия по типам судов, свидетельство и курсы, собеседование и ошибки, которые стоят контрактов.

## Чем занимается AB

- **Вахта.** Впередсмотрящий и рулевой на ходовой вахте вместе с вахтенным помощником: докладывает об огнях, судах и всём необычном, по команде правит вручную. В порту — вахта у трапа и на палубе, контроль швартовов и тех, кто поднимается на борт.
- **Обслуживание.** Обивка ржавчины и покраска, смазка, мойка трюмов или танков, мелкий ремонт под руководством боцмана.
- **Швартовка и якорь.** Работа с концами и лебёдками на баке и корме — здесь опыт матроса важнее всего и здесь случаются самые серьёзные травмы на палубе.
- **Груз.** Крепление и раскрепление, люковые крышки, помощь со шлангами и манифолдом на танкерах, замеры танков.
- **Безопасность.** Учения, обслуживание спасательного оборудования, установка лоцманского и забортного трапов.

## Типичный день

На большинстве судов матросы бывают двух видов:

- **Вахтенный AB:** график **четыре через восемь** — например, с 08:00 до 12:00 и с 20:00 до 24:00 на мостике с вахтенным помощником, иногда плюс несколько часов работ днём.
- **Подвахтенный AB:** примерно с 08:00 до 17:00 на палубе с боцманом — обслуживание, покраска, уборка — и подъём на швартовки.

В порту меняется день у всех: вахты у трапа, грузовые работы, снабжение и швартовки в любое время.

## Отличия по типам судов

- **Балкеры:** мойка трюмов, люковые крышки, длинные переходы с большим объёмом работ по обслуживанию.
- **Контейнеровозы:** крепление, много портов, короткие стоянки и частые швартовки.
- **Танкеры:** грузовые шланги и манифолд, строгие допуски и дегазация; обязателен начальный танкерный курс.
- **Оффшор:** палубный груз, сигналы крановщику, работа рядом с установками; часто нужны оффшорные курсы безопасности.
- **Пассажирские суда:** тендеры и шлюпки, большая палубная команда, внешний вид судна всегда на виду.

## Свидетельства и документы

- **Матрос первого класса (able seafarer deck)**, ПДНВ II/5, — а до него **матрос, входящий в состав ходовой вахты**, ПДНВ II/4.
- **Basic Training** — борьба с пожаром, выживание, первая помощь, личная безопасность; переподготовка каждые **пять лет**.
- **Security Awareness** или **Designated Security Duties**.
- **Медицинское свидетельство** — не более **двух лет**.
- Мореходная книжка, паспорт и визы для района работы.
- На танкерах и газовозах — **начальные грузовые курсы**; на некоторых судах — **спасательные средства (PSCRB)**.

## Что для этого нужно

По **правилу II/5 ПДНВ (STCW)** матрос первого класса должен быть не младше **18 лет**, иметь квалификацию матроса ходовой вахты и затем не менее **18 месяцев** одобренного стажа в палубной службе — или **12 месяцев** после одобренной подготовки.

## Как получить первый контракт AB

1. **Внимательно посчитайте стаж** — месяцы матросом второго класса и есть основа свидетельства AB. Держите записи о списании в мореходной книжке в порядке.
2. **Держите все курсы действующими** до подачи; просроченный курс — самая частая причина отказа.
3. **Начинайте там, где берут младших**, — балкеры и генгруз, а на танкеры и оффшор переходите потом.
4. **Базовый английский важен**: команды на руль, слова безопасности, числа и переговоры по рации.
5. **Попросите рекомендацию на последнем судне** — слово боцмана или старпома помогает.

## Контракты и ротация

Матросы часто работают **шесть–девять месяцев**, в зависимости от компании и национальности экипажа. MLC 2006 ограничивает время на борту до репатриации **сроком меньше 12 месяцев**, а минимум отдыха — **10 часов за 24** и **77 за семь дней** — нужно соблюдать и записывать.

## Вопросы на собеседовании

1. **«Повторите команду на руль: port twenty».** Команды на руль по-английски и как их подтверждать.
2. **«О чём докладывает впередсмотрящий?»** Огни, суда, буи, всё, что в воде, — и как именно.
3. **«Что такое snap-back zones?»** Опасные зоны при обрыве швартовного конца.
4. **«Что вы делаете перед входом в закрытое помещение?»** Допуск, замер газа, вентиляция, наблюдающий.
5. **«Как устанавливается лоцманский трап?»** Высота, крепление, освещение, спасательный круг.
6. **«На каких типах судов вы работали и что там делали?»**

## Частые ошибки

- **Непонятный стаж** — месяцы, которые не сходятся с мореходной книжкой.
- **Курсы, которые истекают во время контракта.** Компании сверяют даты с длительностью контракта.
- **Совсем нет английского.** Вопрос с командами на руль не пройти.
- **Платить агентству.** Трудоустройство для моряка бесплатно — платит судовладелец.

## Частые вопросы

**Чем AB отличается от OS?**
OS — начальная должность; у AB есть свидетельство матроса первого класса и больше стажа.

**Может ли матрос стать офицером?**
Да — через диплом вахтенного помощника по правилу II/1 ПДНВ, для которого нужны одобренный стаж и экзамены.

**Стоят ли матросы вахту?**
Вахтенные — да; подвахтенные работают с боцманом и выходят на швартовки.

**AB и «able seafarer deck» — одно и то же?**
Да — «able seafarer deck» — термин ПДНВ для матроса первого класса.

## Зарплата и вакансии

Актуальный диапазон по реальным вакансиям — на странице [вакансий матроса AB](/ru/jobs/rank/able-seaman), сравнение по должностям — на странице [зарплат](/ru/salaries).

## Ваше CV

В CV матроса крюинг смотрит на типы судов, месяцы в море и сертификаты со сроками. [CV моряка](/ru/maritime-cv) собирает их на одной странице.

*Требования — по ПДНВ (STCW) и MLC 2006; государство флага может добавлять свои. Уточняйте в морской администрации.*$ru$,
  'ua', $ua$**Матрос першого класу (AB)** — основа палубної команди: на вахті біля стерна й упередсмотрящим, на денних роботах тримає судно в порядку, і на кожному швартуванні. Це ще й одна з посад із найбільшою кількістю вакансій на будь-якому сайті — тобто більше шансів і більше конкуренції. У гайді — чим займається AB, типовий день, відмінності за типами суден, свідоцтво й курси, співбесіда й помилки, які коштують контрактів.

## Чим займається AB

- **Вахта.** Упередсмотрящий і стерновий на ходовій вахті разом із вахтовим помічником: доповідає про вогні, судна й усе незвичне, за командою керує вручну. У порту — вахта біля трапа й на палубі, контроль швартовів і тих, хто піднімається на борт.
- **Обслуговування.** Оббивання іржі й фарбування, змащування, миття трюмів чи танків, дрібний ремонт під керівництвом боцмана.
- **Швартування й якір.** Робота з кінцями й лебідками на баку й кормі — тут досвід матроса найважливіший і тут стаються найсерйозніші травми на палубі.
- **Вантаж.** Кріплення й розкріплення, люкові кришки, допомога зі шлангами й маніфольдом на танкерах, заміри танків.
- **Безпека.** Навчання, обслуговування рятувального обладнання, встановлення лоцманського й забортного трапів.

## Типовий день

На більшості суден матроси бувають двох видів:

- **Вахтовий AB:** графік **чотири через вісім** — наприклад, з 08:00 до 12:00 і з 20:00 до 24:00 на містку з вахтовим помічником, іноді плюс кілька годин робіт удень.
- **Підвахтовий AB:** приблизно з 08:00 до 17:00 на палубі з боцманом — обслуговування, фарбування, прибирання — і підйом на швартування.

У порту змінюється день у всіх: вахти біля трапа, вантажні роботи, постачання й швартування будь-коли.

## Відмінності за типами суден

- **Балкери:** миття трюмів, люкові кришки, довгі переходи з великим обсягом робіт з обслуговування.
- **Контейнеровози:** кріплення, багато портів, короткі стоянки й часті швартування.
- **Танкери:** вантажні шланги й маніфольд, суворі допуски й дегазація; обов'язковий початковий танкерний курс.
- **Офшор:** палубний вантаж, сигнали кранівникові, робота поруч з установками; часто потрібні офшорні курси безпеки.
- **Пасажирські судна:** тендери й шлюпки, велика палубна команда, зовнішній вигляд судна завжди на виду.

## Свідоцтва й документи

- **Матрос першого класу (able seafarer deck)**, ПДНВ II/5, — а до нього **матрос, що входить до складу ходової вахти**, ПДНВ II/4.
- **Basic Training** — боротьба з пожежею, виживання, перша допомога, особиста безпека; перепідготовка кожні **п'ять років**.
- **Security Awareness** або **Designated Security Duties**.
- **Медичне свідоцтво** — не більше **двох років**.
- Послужна книжка, паспорт і візи для району роботи.
- На танкерах і газовозах — **початкові вантажні курси**; на деяких суднах — **рятувальні засоби (PSCRB)**.

## Що для цього потрібно

За **правилом II/5 ПДНВ (STCW)** матрос першого класу має бути не молодшим **18 років**, мати кваліфікацію матроса ходової вахти й потім щонайменше **18 місяців** схваленого стажу в палубній службі — або **12 місяців** після схваленої підготовки.

## Як отримати перший контракт AB

1. **Уважно порахуйте стаж** — місяці матросом другого класу й є основою свідоцтва AB. Тримайте записи про списання в послужній книжці в порядку.
2. **Тримайте всі курси чинними** до подання; прострочений курс — найчастіша причина відмови.
3. **Починайте там, де беруть молодших**, — балкери й генвантаж, а на танкери й офшор переходьте потім.
4. **Базова англійська важлива**: команди на стерно, слова безпеки, числа й переговори по рації.
5. **Попросіть рекомендацію на останньому судні** — слово боцмана чи старпома допомагає.

## Контракти й ротація

Матроси часто працюють **шість–дев'ять місяців**, залежно від компанії й національності екіпажу. MLC 2006 обмежує час на борту до репатріації **строком менше 12 місяців**, а мінімум відпочинку — **10 годин за 24** і **77 за сім днів** — треба дотримуватися й записувати.

## Питання на співбесіді

1. **«Повторіть команду на стерно: port twenty».** Команди на стерно англійською і як їх підтверджувати.
2. **«Про що доповідає впередсмотрящий?»** Вогні, судна, буї, усе, що у воді, — і як саме.
3. **«Що таке snap-back zones?»** Небезпечні зони під час обриву швартовного кінця.
4. **«Що ви робите перед входом у закрите приміщення?»** Допуск, замір газу, вентиляція, спостерігач.
5. **«Як встановлюється лоцманський трап?»** Висота, кріплення, освітлення, рятувальний круг.
6. **«На яких типах суден ви працювали й що там робили?»**

## Часті помилки

- **Незрозумілий стаж** — місяці, які не сходяться з послужною книжкою.
- **Курси, що спливають під час контракту.** Компанії звіряють дати з тривалістю контракту.
- **Зовсім немає англійської.** Питання з командами на стерно не пройти.
- **Платити агентству.** Працевлаштування для моряка безкоштовне — платить судновласник.

## Часті питання

**Чим AB відрізняється від OS?**
OS — початкова посада; в AB є свідоцтво матроса першого класу й більше стажу.

**Чи може матрос стати офіцером?**
Так — через диплом вахтового помічника за правилом II/1 ПДНВ, для якого потрібні схвалений стаж та іспити.

**Чи несуть матроси вахту?**
Вахтові — так; підвахтові працюють із боцманом і виходять на швартування.

**AB і «able seafarer deck» — одне й те саме?**
Так — «able seafarer deck» — термін ПДНВ для матроса першого класу.

## Зарплата й вакансії

Актуальний діапазон за реальними вакансіями — на сторінці [вакансій матроса AB](/ua/jobs/rank/able-seaman), порівняння за посадами — на сторінці [зарплат](/ua/salaries).

## Ваше CV

У CV матроса крюїнг дивиться на типи суден, місяці в морі й сертифікати зі строками. [CV моряка](/ua/maritime-cv) збирає їх на одній сторінці.

*Вимоги — за ПДНВ (STCW) і MLC 2006; держава прапора може додавати свої. Уточнюйте в морській адміністрації.*$ua$,
  'pl', $pl$**Starszy marynarz (AB)** to trzon załogi pokładowej: na wachcie za sterem i na oku, na dniówce dba o stan statku i jest przy każdym cumowaniu. To także jedno ze stanowisk z największą liczbą ofert na każdym portalu — czyli więcej szans i więcej konkurencji. W poradniku: czym zajmuje się AB, typowy dzień, różnice według typu statku, świadectwo i kursy, rozmowa i błędy, które kosztują kontrakty.

## Czym zajmuje się AB

- **Wachta.** Obserwator i sternik na wachcie nawigacyjnej razem z oficerem wachtowym: melduje światła, statki i wszystko, co nietypowe, steruje ręcznie na komendę. W porcie — wachta przy trapie i na pokładzie, kontrola cum i osób wchodzących na burtę.
- **Konserwacja.** Odrdzewianie i malowanie, smarowanie, mycie ładowni lub zbiorników, drobne naprawy pod kierunkiem bosmana.
- **Cumowanie i kotwiczenie.** Praca z linami i windami na dziobie i rufie — tu doświadczenie marynarza liczy się najbardziej i tu zdarzają się najpoważniejsze wypadki na pokładzie.
- **Ładunek.** Mocowanie i zdejmowanie mocowań, pokrywy lukowe, pomoc przy wężach i manifoldzie na tankowcach, sondowanie zbiorników.
- **Bezpieczeństwo.** Ćwiczenia, konserwacja sprzętu ratunkowego, wystawianie sztormtrapu pilotowego i trapu burtowego.

## Typowy dzień

Na większości statków są dwa rodzaje AB:

- **AB wachtowy:** system **cztery na osiem** — np. 08:00–12:00 i 20:00–24:00 na mostku z oficerem wachtowym, czasem z kilkoma godzinami pracy w dzień.
- **AB na dniówce:** mniej więcej 08:00–17:00 na pokładzie z bosmanem — konserwacja, malowanie, sprzątanie — i wzywany do cumowania.

W porcie dzień zmienia się wszystkim: wachty przy trapie, prace ładunkowe, zaopatrzenie i cumowanie o każdej porze.

## Różnice według typu statku

- **Masowce:** mycie ładowni, pokrywy lukowe, długie przejścia z dużą ilością konserwacji.
- **Kontenerowce:** mocowanie, wiele portów, krótkie postoje i częste cumowania.
- **Tankowce:** węże ładunkowe i manifold, ścisłe zezwolenia i odgazowanie; wymagany podstawowy kurs tankowcowy.
- **Offshore:** ładunek pokładowy, sygnały dla dźwigowego, praca blisko instalacji; często potrzebne kursy bezpieczeństwa offshore.
- **Statki pasażerskie:** tendry i szalupy, duża załoga pokładowa, wygląd statku zawsze na widoku.

## Świadectwa i dokumenty

- **Starszy marynarz (able seafarer deck)**, STCW II/5 — a przed nim **marynarz wchodzący w skład wachty nawigacyjnej**, STCW II/4.
- **Basic Training** — ochrona przeciwpożarowa, przetrwanie, pierwsza pomoc, bezpieczeństwo własne; odnawiany co **pięć lat**.
- **Security Awareness** lub **Designated Security Duties**.
- **Świadectwo zdrowia** — ważne najwyżej **dwa lata**.
- Książeczka żeglarska, paszport i wizy na rejon pływania.
- Na tankowcach i gazowcach — **podstawowe kursy ładunkowe**; na niektórych statkach — **środki ratunkowe (PSCRB)**.

## Czego to wymaga

Zgodnie z **prawidłem II/5 STCW** starszy marynarz musi mieć co najmniej **18 lat**, kwalifikację marynarza wachty nawigacyjnej, a potem co najmniej **18 miesięcy** zatwierdzonej praktyki w dziale pokładowym — lub **12 miesięcy** po zatwierdzonym szkoleniu.

## Jak zdobyć pierwszy kontrakt AB

1. **Dokładnie policz praktykę** — miesiące jako OS to podstawa świadectwa AB. Pilnuj porządku wpisów o wyokrętowaniu w książeczce żeglarskiej.
2. **Pilnuj ważności wszystkich kursów** przed aplikowaniem; nieważny kurs to najczęstszy powód odmowy.
3. **Zacznij tam, gdzie biorą młodszych** — masowce i drobnicowce — a na tankowce i offshore przejdź później.
4. **Podstawowy angielski jest ważny**: komendy sterowe, słownictwo bezpieczeństwa, liczby i rozmowy przez radio.
5. **Poproś o referencje na ostatnim statku** — słowo bosmana lub starszego oficera pomaga.

## Kontrakty i rotacja

AB pływają często **sześć–dziewięć miesięcy**, zależnie od firmy i narodowości załogi. MLC 2006 ogranicza czas na burcie przed repatriacją do **mniej niż 12 miesięcy**, a minimum odpoczynku — **10 godzin na 24** i **77 na siedem dni** — trzeba przestrzegać i zapisywać.

## Pytania na rozmowie

1. **„Proszę powtórzyć komendę: port twenty”.** Komendy sterowe po angielsku i jak je potwierdzać.
2. **„Co melduje obserwator?”** Światła, statki, boje, wszystko w wodzie — i w jaki sposób.
3. **„Czym są snap-back zones?”** Strefy zagrożenia przy zerwaniu cumy.
4. **„Co Pan robi przed wejściem do przestrzeni zamkniętej?”** Zezwolenie, pomiar gazu, wentylacja, asekurujący.
5. **„Jak wystawia się sztormtrap pilotowy?”** Wysokość, mocowanie, oświetlenie, koło ratunkowe.
6. **„Na jakich typach statków Pan pracował i co tam robił?”**

## Częste błędy

- **Niejasna praktyka** — miesiące, które nie zgadzają się z książeczką żeglarską.
- **Kursy wygasające w trakcie kontraktu.** Firmy porównują daty z długością kontraktu.
- **Brak angielskiego.** Pytania o komendy sterowe nie da się zaliczyć.
- **Płacenie agencji.** Pośrednictwo jest dla marynarza bezpłatne — płaci armator.

## Najczęstsze pytania

**Czym AB różni się od OS?**
OS to stanowisko wejściowe; AB ma świadectwo starszego marynarza i dłuższą praktykę.

**Czy AB może zostać oficerem?**
Tak — przez dyplom oficera wachtowego z prawidła II/1 STCW, który wymaga zatwierdzonej praktyki i egzaminów.

**Czy AB pełnią wachty?**
Wachtowi tak; ci na dniówce pracują z bosmanem i są wzywani do cumowania.

**Czy AB to to samo co „able seafarer deck”?**
Tak — „able seafarer deck” to termin STCW dla starszego marynarza.

## Wynagrodzenie i oferty

Aktualny przedział z prawdziwych ofert jest na stronie [ofert dla AB](/pl/jobs/rank/able-seaman), a porównanie stanowisk — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

W CV marynarza agencja patrzy na typy statków, miesiące na morzu i certyfikaty z datami ważności. [CV marynarza](/pl/maritime-cv) zbiera je na jednej stronie.

*Wymagania według STCW i MLC 2006; państwo bandery może dodawać własne. Sprawdź je w administracji morskiej.*$pl$)
WHERE title->>'en' = 'Able seaman (AB): duties, the STCW certificate and how to get hired';

-- ── 50. Ordinary Seaman ──────────────────────────────────────────────────────
UPDATE news_articles SET body = jsonb_build_object(
  'en', $en$The **ordinary seaman (OS)** is the entry rank on deck — the job most people mean when they search for "work at sea without experience". It does not need years of college, and it is the first step to able seaman and bosun, or even, later, to the bridge. It is also the rank where most scams aimed at seafarers start. This guide covers what an OS does, a typical day, the documents in the order you will need them, how to get the first contract, the interview, and the mistakes to avoid.

## What an OS does

- **Maintenance.** Rust removal, painting, cleaning and greasing under the direction of the bosun and the ABs — the bulk of an OS's time.
- **Watchkeeping.** Lookout on the bridge watch once qualified, and deck and gangway watches in port.
- **Mooring.** Assisting the ABs with ropes and heaving lines fore and aft, learning how lines are led and where not to stand.
- **Cargo and stores.** Lashing, hold cleaning, taking provisions and stores on board.
- **Learning.** An OS is expected to ask, watch and learn — the AB certificate is built on the sea time and the skills gained in this rank.

## A typical day

Most OSs are **day workers**: roughly 08:00–17:00 with breaks, working with the bosun and the ABs. Some ships put the OS on a watch as lookout once they hold the watch rating certificate. Moorings, anchoring and stores come at any hour, and the first weeks are mostly about learning the ship: where everything is, how the crew works, and what the alarms mean.

## Documents — in the order you will need them

1. **Passport.**
2. **Seafarer medical certificate** — valid for at most two years (one year under 18).
3. **Basic Training** — fire-fighting, survival, first aid, personal safety; refreshed every five years.
4. **Security Awareness.**
5. **Seaman's book**, issued by your maritime administration.
6. **Rating forming part of a navigational watch** (STCW II/4) once you have the required sea service or training.
7. **Visas** where the trading area requires them — many agencies help with these once you have a contract.

## What it takes

Under **STCW Regulation II/4**, the watch rating must be at least **16** (many companies hire from 18) and have approved sea service including at least **six months** of training and experience — or special training ashore or on board that includes at least **two months** of approved sea service. The exact route depends on your country's maritime administration.

## How to get the first contract

1. **Get the documents first**: seaman's book, medical, Basic Training. Without them nobody will consider you.
2. **Learn basic English** — commands, safety words, numbers.
3. **Apply to agencies that take juniors**, and to the fleets that hire them: bulk carriers, general cargo, river-sea ships.
4. **Be flexible about the vessel type and the joining date** — the first contract is about getting sea time.
5. **Never pay for a job.** An honest agency is paid by the shipowner; "a fee for a place on board" is a scam.

## Contracts and rotation

Ratings often sail **six to nine months**. MLC 2006 limits the time on board before repatriation to **less than 12 months**; the employer pays the repatriation, and you are entitled to at least **10 hours of rest in any 24** and **77 in any seven days**.

## Interview questions for an OS

1. **"Why do you want to work at sea?"** Be honest and concrete.
2. **"What did you learn in Basic Training?"** Fire classes and extinguishers, survival in water, first aid.
3. **"What do you do when you hear the general alarm?"** Go to your muster station with your lifejacket.
4. **"Have you worked with tools, painting or heights?"** Any work ashore counts.
5. **"Can you understand these words?"** Port, starboard, forward, aft, stop, let go.

## Common mistakes

- **Paying for "a guaranteed place on board".** It is the most common scam aimed at beginners.
- **Buying courses from unrecognised centres** — certificates must come from centres approved by your maritime administration.
- **No English at all.**
- **Waiting for the perfect first ship.** Any honest contract gives you sea time.

## FAQ

**Can I go to sea without a maritime education?**
Yes, as an ordinary seaman, with the documents above. Officer ranks need longer training.

**How old do you have to be?**
STCW allows a watch rating from 16; many companies hire from 18.

**How long until I become an AB?**
At least 18 months of approved sea service as a watch rating, or 12 after approved training, under STCW II/5.

**Is it true that agencies charge for a first job?**
Honest agencies do not — under MLC 2006 recruitment must not be charged to the seafarer.

## Pay and jobs

The OS is the entry rank, so the pay is the lowest on deck — and it rises with each step. The current range from real vacancies is on the [ordinary seaman jobs page](/jobs/rank/ordinary-seaman); compare ranks on our [salaries page](/salaries).

## Your CV

With little sea time, the [maritime CV](/maritime-cv) shows what you do have — courses, documents, languages and any work with tools — in the order a crewing manager reads it.

*Requirements follow STCW and MLC 2006; your flag state may add its own. Check them with your maritime administration.*$en$,
  'ru', $ru$**Матрос второго класса (OS)** — начальная должность на палубе, та самая работа, которую ищут по запросу «работа в море без опыта». Для неё не нужны годы учёбы, и это первый шаг к матросу первого класса и боцману, а позже — и на мостик. Это же должность, с которой начинается большинство мошенничеств против моряков. В гайде — чем занимается OS, типичный день, документы в том порядке, в каком они понадобятся, как получить первый контракт, собеседование и ошибки, которых стоит избегать.

## Чем занимается OS

- **Обслуживание.** Обивка ржавчины, покраска, уборка и смазка под руководством боцмана и матросов — большая часть времени OS.
- **Вахта.** Впередсмотрящий на ходовой вахте после получения квалификации, вахта на палубе и у трапа в порту.
- **Швартовка.** Помогает матросам с концами и выбросками на баке и корме, учится, как заводятся концы и где нельзя стоять.
- **Груз и снабжение.** Крепление, мойка трюмов, погрузка провизии и снабжения.
- **Учёба.** От OS ждут, что он будет спрашивать, смотреть и учиться: свидетельство AB строится на стаже и навыках этой должности.

## Типичный день

Большинство OS — **подвахтенные**: примерно с 08:00 до 17:00 с перерывами, вместе с боцманом и матросами. На некоторых судах OS ставят впередсмотрящим на вахту, когда у него есть свидетельство матроса вахты. Швартовки, якорь и снабжение — в любое время, а первые недели уходят в основном на то, чтобы узнать судно: где что находится, как работает экипаж и что означают тревоги.

## Документы — в том порядке, в каком они понадобятся

1. **Заграничный паспорт.**
2. **Медицинское свидетельство моряка** — не более двух лет (до 18 лет — один год).
3. **Basic Training** — борьба с пожаром, выживание, первая помощь, личная безопасность; переподготовка каждые пять лет.
4. **Security Awareness.**
5. **Мореходная книжка**, которую выдаёт морская администрация.
6. **Свидетельство матроса ходовой вахты** (ПДНВ II/4), когда наберётся нужный стаж или подготовка.
7. **Визы**, если их требует район работы, — многие агентства помогают с ними, когда контракт уже есть.

## Что для этого нужно

По **правилу II/4 ПДНВ (STCW)** матрос вахты должен быть не младше **16 лет** (многие компании берут с 18) и иметь одобренный стаж, включающий не менее **шести месяцев** подготовки и опыта, — или специальную подготовку на берегу либо на судне с одобренным стажем не менее **двух месяцев**. Конкретный путь зависит от морской администрации вашей страны.

## Как получить первый контракт

1. **Сначала документы**: мореходная книжка, медкомиссия, Basic Training. Без них вас не рассмотрят.
2. **Выучите базовый английский** — команды, слова безопасности, числа.
3. **Подавайтесь в агентства, которые берут младших**, и на флоты, где их берут: балкеры, генгруз, суда река-море.
4. **Будьте гибкими по типу судна и дате посадки** — первый контракт нужен ради стажа.
5. **Никогда не платите за работу.** Честному агентству платит судовладелец; «взнос за место на судне» — это мошенничество.

## Контракты и ротация

Рядовой состав часто работает **шесть–девять месяцев**. MLC 2006 ограничивает время на борту до репатриации **сроком меньше 12 месяцев**; репатриацию оплачивает работодатель, а вам положено не менее **10 часов отдыха в любые 24 часа** и **77 за любые семь дней**.

## Вопросы на собеседовании

1. **«Почему вы хотите работать в море?»** Честно и конкретно.
2. **«Чему вас научили на Basic Training?»** Классы пожаров и огнетушители, выживание в воде, первая помощь.
3. **«Что вы делаете по общесудовой тревоге?»** Идёте к месту сбора со спасательным жилетом.
4. **«Работали ли вы с инструментом, покраской, на высоте?»** Любой опыт на берегу засчитывается.
5. **«Понимаете ли вы эти слова?»** Port, starboard, forward, aft, stop, let go.

## Частые ошибки

- **Платить за «гарантированное место на судне».** Это самое частое мошенничество с новичками.
- **Покупать курсы в непризнанных центрах** — сертификаты должны быть от центров, одобренных морской администрацией.
- **Совсем нет английского.**
- **Ждать идеальное первое судно.** Любой честный контракт даёт стаж.

## Частые вопросы

**Можно ли уйти в море без морского образования?**
Да, матросом второго класса, с документами выше. Для офицерских должностей нужна более долгая подготовка.

**С какого возраста можно?**
ПДНВ допускает матроса вахты с 16 лет; многие компании берут с 18.

**Когда я стану AB?**
По правилу II/5 ПДНВ — после не менее 18 месяцев одобренного стажа матросом вахты или 12 месяцев после одобренной подготовки.

**Правда ли, что агентства берут деньги за первую работу?**
Честные — нет: по MLC 2006 трудоустройство не должно оплачиваться моряком.

## Зарплата и вакансии

OS — начальная должность, поэтому зарплата самая низкая на палубе, и она растёт с каждым шагом. Актуальный диапазон по реальным вакансиям — на странице [вакансий матроса OS](/ru/jobs/rank/ordinary-seaman), сравнение должностей — на странице [зарплат](/ru/salaries).

## Ваше CV

Когда стажа мало, [CV моряка](/ru/maritime-cv) показывает то, что у вас есть, — курсы, документы, языки и любой опыт работы с инструментом — в том порядке, в каком его читает крюинг-менеджер.

*Требования — по ПДНВ (STCW) и MLC 2006; государство флага может добавлять свои. Уточняйте в морской администрации.*$ru$,
  'ua', $ua$**Матрос другого класу (OS)** — початкова посада на палубі, та сама робота, яку шукають за запитом «робота в морі без досвіду». Для неї не потрібні роки навчання, і це перший крок до матроса першого класу й боцмана, а згодом — і на місток. Це ж посада, з якої починається більшість шахрайств проти моряків. У гайді — чим займається OS, типовий день, документи в тому порядку, в якому вони знадобляться, як отримати перший контракт, співбесіда й помилки, яких варто уникати.

## Чим займається OS

- **Обслуговування.** Оббивання іржі, фарбування, прибирання й змащування під керівництвом боцмана й матросів — більша частина часу OS.
- **Вахта.** Упередсмотрящий на ходовій вахті після отримання кваліфікації, вахта на палубі й біля трапа в порту.
- **Швартування.** Допомагає матросам із кінцями й кидальними кінцями на баку й кормі, вчиться, як заводяться кінці й де не можна стояти.
- **Вантаж і постачання.** Кріплення, миття трюмів, завантаження провізії й постачання.
- **Навчання.** Від OS чекають, що він питатиме, дивитиметься й учитиметься: свідоцтво AB будується на стажі й навичках цієї посади.

## Типовий день

Більшість OS — **підвахтові**: приблизно з 08:00 до 17:00 з перервами, разом із боцманом і матросами. На деяких суднах OS ставлять упередсмотрящим на вахту, коли в нього є свідоцтво матроса вахти. Швартування, якір і постачання — будь-коли, а перші тижні йдуть переважно на те, щоб пізнати судно: де що розташоване, як працює екіпаж і що означають тривоги.

## Документи — у тому порядку, в якому вони знадобляться

1. **Закордонний паспорт.**
2. **Медичне свідоцтво моряка** — не більше двох років (до 18 років — один рік).
3. **Basic Training** — боротьба з пожежею, виживання, перша допомога, особиста безпека; перепідготовка кожні п'ять років.
4. **Security Awareness.**
5. **Послужна книжка**, яку видає морська адміністрація.
6. **Свідоцтво матроса ходової вахти** (ПДНВ II/4), коли набереться потрібний стаж або підготовка.
7. **Візи**, якщо їх вимагає район роботи, — багато агентств допомагають із ними, коли контракт уже є.

## Що для цього потрібно

За **правилом II/4 ПДНВ (STCW)** матрос вахти має бути не молодшим **16 років** (багато компаній беруть із 18) і мати схвалений стаж, що включає щонайменше **шість місяців** підготовки й досвіду, — або спеціальну підготовку на березі чи на судні зі схваленим стажем щонайменше **два місяці**. Конкретний шлях залежить від морської адміністрації вашої країни.

## Як отримати перший контракт

1. **Спочатку документи**: послужна книжка, медкомісія, Basic Training. Без них вас не розглянуть.
2. **Вивчіть базову англійську** — команди, слова безпеки, числа.
3. **Подавайтеся в агентства, які беруть молодших**, і на флоти, де їх беруть: балкери, генвантаж, судна ріка-море.
4. **Будьте гнучкими щодо типу судна й дати посадки** — перший контракт потрібен заради стажу.
5. **Ніколи не платіть за роботу.** Чесному агентству платить судновласник; «внесок за місце на судні» — це шахрайство.

## Контракти й ротація

Рядовий склад часто працює **шість–дев'ять місяців**. MLC 2006 обмежує час на борту до репатріації **строком менше 12 місяців**; репатріацію оплачує роботодавець, а вам належить щонайменше **10 годин відпочинку за будь-які 24 години** і **77 за будь-які сім днів**.

## Питання на співбесіді

1. **«Чому ви хочете працювати в морі?»** Чесно й конкретно.
2. **«Чого вас навчили на Basic Training?»** Класи пожеж і вогнегасники, виживання у воді, перша допомога.
3. **«Що ви робите за загальносудновою тривогою?»** Ідете до місця збору з рятувальним жилетом.
4. **«Чи працювали ви з інструментом, фарбуванням, на висоті?»** Будь-який досвід на березі зараховується.
5. **«Чи розумієте ви ці слова?»** Port, starboard, forward, aft, stop, let go.

## Часті помилки

- **Платити за «гарантоване місце на судні».** Це найчастіше шахрайство з новачками.
- **Купувати курси в невизнаних центрах** — сертифікати мають бути від центрів, схвалених морською адміністрацією.
- **Зовсім немає англійської.**
- **Чекати ідеальне перше судно.** Будь-який чесний контракт дає стаж.

## Часті питання

**Чи можна піти в море без морської освіти?**
Так, матросом другого класу, з документами вище. Для офіцерських посад потрібна довша підготовка.

**З якого віку можна?**
ПДНВ допускає матроса вахти з 16 років; багато компаній беруть із 18.

**Коли я стану AB?**
За правилом II/5 ПДНВ — після щонайменше 18 місяців схваленого стажу матросом вахти або 12 місяців після схваленої підготовки.

**Чи правда, що агентства беруть гроші за першу роботу?**
Чесні — ні: за MLC 2006 працевлаштування не має оплачуватися моряком.

## Зарплата й вакансії

OS — початкова посада, тому зарплата найнижча на палубі, і вона зростає з кожним кроком. Актуальний діапазон за реальними вакансіями — на сторінці [вакансій матроса OS](/ua/jobs/rank/ordinary-seaman), порівняння посад — на сторінці [зарплат](/ua/salaries).

## Ваше CV

Коли стажу мало, [CV моряка](/ua/maritime-cv) показує те, що у вас є, — курси, документи, мови й будь-який досвід роботи з інструментом — у тому порядку, в якому його читає крюїнг-менеджер.

*Вимоги — за ПДНВ (STCW) і MLC 2006; держава прапора може додавати свої. Уточнюйте в морській адміністрації.*$ua$,
  'pl', $pl$**Młodszy marynarz (OS)** to stanowisko wejściowe na pokładzie — ta praca, której ludzie szukają, wpisując „praca na morzu bez doświadczenia”. Nie wymaga lat nauki i jest pierwszym krokiem do starszego marynarza i bosmana, a później nawet na mostek. To także stanowisko, od którego zaczyna się większość oszustw wobec marynarzy. W poradniku: czym zajmuje się OS, typowy dzień, dokumenty w kolejności, w jakiej będą potrzebne, jak zdobyć pierwszy kontrakt, rozmowa i błędy, których warto unikać.

## Czym zajmuje się OS

- **Konserwacja.** Odrdzewianie, malowanie, sprzątanie i smarowanie pod kierunkiem bosmana i starszych marynarzy — większość czasu OS.
- **Wachta.** Obserwator na wachcie nawigacyjnej po uzyskaniu kwalifikacji, wachta na pokładzie i przy trapie w porcie.
- **Cumowanie.** Pomaga marynarzom przy linach i rzutkach na dziobie i rufie, uczy się, jak prowadzi się liny i gdzie nie wolno stać.
- **Ładunek i zaopatrzenie.** Mocowanie, mycie ładowni, przyjmowanie prowiantu i zaopatrzenia.
- **Nauka.** Od OS oczekuje się, że będzie pytał, patrzył i się uczył: świadectwo AB opiera się na praktyce i umiejętnościach z tego stanowiska.

## Typowy dzień

Większość OS pracuje **na dniówce**: mniej więcej 08:00–17:00 z przerwami, z bosmanem i starszymi marynarzami. Na niektórych statkach OS trafia na wachtę jako obserwator, gdy ma świadectwo marynarza wachtowego. Cumowanie, kotwiczenie i zaopatrzenie — o każdej porze, a pierwsze tygodnie to głównie poznawanie statku: gdzie co jest, jak pracuje załoga i co oznaczają alarmy.

## Dokumenty — w kolejności, w jakiej będą potrzebne

1. **Paszport.**
2. **Świadectwo zdrowia marynarza** — ważne najwyżej dwa lata (poniżej 18 lat — rok).
3. **Basic Training** — ochrona przeciwpożarowa, przetrwanie, pierwsza pomoc, bezpieczeństwo własne; odnawiany co pięć lat.
4. **Security Awareness.**
5. **Książeczka żeglarska** wydawana przez administrację morską.
6. **Świadectwo marynarza wachty nawigacyjnej** (STCW II/4), gdy uzbierasz wymaganą praktykę lub szkolenie.
7. **Wizy**, jeśli wymaga ich rejon pływania — wiele agencji pomaga w nich, gdy kontrakt już jest.

## Czego to wymaga

Zgodnie z **prawidłem II/4 STCW** marynarz wachtowy musi mieć co najmniej **16 lat** (wiele firm zatrudnia od 18) i zatwierdzoną praktykę obejmującą co najmniej **sześć miesięcy** szkolenia i doświadczenia — lub specjalne szkolenie na lądzie albo na statku z zatwierdzoną praktyką co najmniej **dwóch miesięcy**. Konkretna droga zależy od administracji morskiej Twojego kraju.

## Jak zdobyć pierwszy kontrakt

1. **Najpierw dokumenty**: książeczka żeglarska, świadectwo zdrowia, Basic Training. Bez nich nikt Cię nie rozważy.
2. **Naucz się podstaw angielskiego** — komendy, słownictwo bezpieczeństwa, liczby.
3. **Aplikuj do agencji, które biorą młodszych**, i na floty, które ich zatrudniają: masowce, drobnicowce, statki rzeczno-morskie.
4. **Bądź elastyczny co do typu statku i daty zaokrętowania** — pierwszy kontrakt jest po to, by zdobyć praktykę.
5. **Nigdy nie płać za pracę.** Uczciwej agencji płaci armator; „opłata za miejsce na statku” to oszustwo.

## Kontrakty i rotacja

Załoga szeregowa pływa często **sześć–dziewięć miesięcy**. MLC 2006 ogranicza czas na burcie przed repatriacją do **mniej niż 12 miesięcy**; repatriację opłaca pracodawca, a Tobie przysługuje co najmniej **10 godzin odpoczynku w każdych 24 godzinach** i **77 w każdych siedmiu dniach**.

## Pytania na rozmowie

1. **„Dlaczego chce Pan pracować na morzu?”** Szczerze i konkretnie.
2. **„Czego nauczył się Pan na Basic Training?”** Grupy pożarów i gaśnice, przetrwanie w wodzie, pierwsza pomoc.
3. **„Co Pan robi na alarm ogólny?”** Idzie na miejsce zbiórki z kamizelką ratunkową.
4. **„Czy pracował Pan z narzędziami, przy malowaniu, na wysokości?”** Każde doświadczenie z lądu się liczy.
5. **„Czy rozumie Pan te słowa?”** Port, starboard, forward, aft, stop, let go.

## Częste błędy

- **Płacenie za „gwarantowane miejsce na statku”.** To najczęstsze oszustwo wobec początkujących.
- **Kupowanie kursów w nieuznanych ośrodkach** — świadectwa muszą pochodzić z ośrodków zatwierdzonych przez administrację morską.
- **Brak angielskiego.**
- **Czekanie na idealny pierwszy statek.** Każdy uczciwy kontrakt daje praktykę.

## Najczęstsze pytania

**Czy można iść na morze bez wykształcenia morskiego?**
Tak, jako młodszy marynarz, z dokumentami wymienionymi wyżej. Stanowiska oficerskie wymagają dłuższego szkolenia.

**Od jakiego wieku?**
STCW dopuszcza marynarza wachtowego od 16 lat; wiele firm zatrudnia od 18.

**Kiedy zostanę AB?**
Zgodnie z prawidłem II/5 STCW — po co najmniej 18 miesiącach zatwierdzonej praktyki jako marynarz wachtowy lub 12 miesiącach po zatwierdzonym szkoleniu.

**Czy to prawda, że agencje biorą pieniądze za pierwszą pracę?**
Uczciwe nie — zgodnie z MLC 2006 marynarz nie może płacić za pośrednictwo.

## Wynagrodzenie i oferty

OS to stanowisko wejściowe, więc płaca jest najniższa na pokładzie — i rośnie z każdym krokiem. Aktualny przedział z prawdziwych ofert jest na stronie [ofert dla OS](/pl/jobs/rank/ordinary-seaman), a porównanie stanowisk — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

Przy krótkiej praktyce [CV marynarza](/pl/maritime-cv) pokazuje to, co masz — kursy, dokumenty, języki i doświadczenie z narzędziami — w kolejności, w jakiej czyta je menedżer agencji.

*Wymagania według STCW i MLC 2006; państwo bandery może dodawać własne. Sprawdź je w administracji morskiej.*$pl$)
WHERE title->>'en' = 'Ordinary seaman (OS): how to start at sea without experience';

-- ── 51. Ship's Cook ──────────────────────────────────────────────────────────
UPDATE news_articles SET body = jsonb_build_object(
  'en', $en$The **ship's cook** — chief cook on larger crews — feeds twenty people three times a day for months, far from any shop. On a long contract the food is one of the few things everyone looks forward to, which is why a good cook is valued by every master, and a bad one is remembered by every crew. This guide covers the duties, a typical day in the galley, how the job differs by vessel type, the certificates, the interview and how to make the move from a shore kitchen to a ship.

## What the cook does

- **Menus.** Plans meals for the whole crew, often of several nationalities, with religious, cultural and medical diets — and enough variety for months at sea.
- **Provisions.** Orders and receives stores, checks quality, temperatures and dates, and works within the company's daily food budget per person (the victualling rate). Plans stores for long passages when the next supply port is weeks away.
- **The galley and stores.** Hygiene, cold rooms, freezers and dry stores, temperature records, cleaning schedules and waste. Under MLC 2006 the master or an officer carries out regular, documented inspections of the food, the water, the stores and the galley.
- **The team.** On bigger ships the chief cook leads a second cook and the messmen or stewards, and plans their work.
- **Safety.** Galley fire risks — fryers, oil and gas — and the cook's own duties in drills.
- **Welfare.** Birthday cakes, holiday meals, the barbecue on deck: on a long contract this matters more than it looks.

## A typical day

- **05:30–06:00:** the galley opens; breakfast is ready before the 07:00 shift.
- **Morning:** lunch preparation, receiving or counting stores, cleaning.
- **11:30–12:30:** lunch, served so that the watchkeepers can eat before or after their watch.
- **Afternoon:** a break, then dinner preparation; menus and orders for the coming days.
- **17:30–18:30:** dinner, then cleaning and closing the galley; night snacks for the watchkeepers are often left out.

On most cargo ships the cook works a long day with a break in the afternoon and is not on a watch. Stores are taken in port, often at inconvenient hours.

## Differences by vessel type

- **Cargo ships (bulk, tankers, containers):** crews of about 18–25, one cook, sometimes with a messman; long passages, so stores planning matters.
- **Offshore vessels and platforms:** a catering team, often a contractor, food served around the clock for shift workers; offshore safety training may be needed.
- **Passenger ships and cruise ships:** a large galley brigade with chefs de partie, sous-chefs and executive chefs — a separate career with its own ranks.
- **Small ships:** where the prescribed crew is small, the cook may combine duties, but food-hygiene training is still required.

## Certificates and documents

- **Ship's cook certificate** issued or recognised by the flag state — or a recognised culinary qualification plus food-hygiene training.
- **Basic Training** (refreshed every five years) and **Security Awareness**.
- **Medical certificate** — valid for at most two years; companies may ask for additional health checks for food handlers.
- **Seaman's book**, passport and visas.
- **Food safety / HACCP** training is a strong plus.

## What it takes

Under **MLC 2006, Regulation 3.2**, a ship's cook must be **trained and qualified**, and nobody **under 18** may be employed as one. The same regulation requires food and drinking water to be provided **free of charge** to the crew, of a quality, quantity and variety suitable for the voyage, and respecting religious and cultural practices. In practice companies want a cook's certificate, kitchen experience, and ideally previous sea time as cook or second cook.

## From a shore kitchen to a ship

1. **Get the ship's cook certificate and Basic Training** before applying — without them a crewing agency cannot place you.
2. **Write your kitchen experience with dates and volumes**: how many portions a day, which cuisines, whether you managed stock and orders.
3. **Start as second cook or messman** if no company takes you as cook at once; it counts as sea time in the galley.
4. **Learn international dishes and diets** — Filipino, Indian, Eastern European and Western crews often eat together.
5. **Practise budgeting.** Being able to feed a crew well within the daily rate is what masters remember.

## Contracts and rotation

Cooks usually sail **six to nine months** on cargo ships, often shorter offshore. MLC 2006 limits time on board before repatriation to **less than 12 months**, and the rest-hour minimums — **10 hours in 24** and **77 in seven days** — apply in the galley too.

## Interview questions for a cook

1. **"Make a menu for a week for a crew of 20 of three nationalities."**
2. **"How do you plan stores for a 30-day passage?"** Quantities, storage, rotation.
3. **"At what temperatures do you keep chilled and frozen food?"** And how you record them.
4. **"How do you handle a crew member with a food allergy or a religious diet?"**
5. **"What do you do if a fryer catches fire?"** Never water — the lid, the fire blanket, the alarm.
6. **"How do you stay within the daily food budget?"**

## Common mistakes

- **A CV without numbers** — portions, crew size, cuisines, budgets.
- **No ship's cook certificate**, expecting the shore diploma to be enough everywhere.
- **Ignoring hygiene records** — inspectors check them, and so does the master.
- **One cuisine only.** A mixed crew notices quickly.

## FAQ

**Can I become a ship's cook without sea experience?**
Yes, with the cook's certificate, Basic Training and solid kitchen experience; starting as second cook or messman is common.

**Do I need English?**
Basic English, yes: you talk to the master, the agent and a mixed crew.

**Who pays for the crew's food?**
The shipowner. Under MLC 2006 food and drinking water are free of charge for the crew.

**What is the difference between chief cook and cook?**
On larger crews the chief cook leads the galley and the second cook assists; on most cargo ships there is one cook.

## Pay and jobs

The cook's pay sits in the middle of the ratings and rises with the size of the crew and the vessel type. The current range from real vacancies is on the [cook jobs page](/jobs/rank/cook); compare ranks on our [salaries page](/salaries).

## Your CV

For a cook, crewing desks look at the size and nationalities of the crews you fed, the vessel types and the certificates with dates. The [maritime CV](/maritime-cv) puts them on one page.

*MLC 2006 sets the minimum; your flag state decides which certificates it recognises.*$en$,
  'ru', $ru$**Повар на судне (кок)** — на больших экипажах шеф-повар (chief cook) — кормит двадцать человек три раза в день месяцами, вдали от любого магазина. В долгом контракте еда — одна из немногих радостей для всех, поэтому хорошего кока ценит каждый капитан, а плохого помнит каждый экипаж. В гайде — обязанности, типичный день на камбузе, отличия по типам судов, документы, собеседование и как перейти с береговой кухни на судно.

## Чем занимается кок

- **Меню.** Планирует питание всего экипажа, часто нескольких национальностей, с религиозными, культурными и медицинскими диетами — и с разнообразием на месяцы в море.
- **Провизия.** Заказывает и принимает продукты, проверяет качество, температуры и сроки, укладывается в суточную норму компании на человека. Планирует запасы на долгие переходы, когда до следующего порта снабжения недели.
- **Камбуз и кладовые.** Гигиена, холодильные и морозильные камеры, сухие кладовые, журналы температур, графики уборки и отходы. По MLC 2006 капитан или помощник проводит регулярные документируемые проверки продуктов, воды, кладовых и камбуза.
- **Команда.** На больших судах шеф-повар руководит вторым поваром и мессменами или стюардами и планирует их работу.
- **Безопасность.** Пожароопасность камбуза — фритюр, масло и газ — и собственные обязанности кока на учениях.
- **Быт экипажа.** Торт на день рождения, праздничный ужин, барбекю на палубе: в долгом контракте это важнее, чем кажется.

## Типичный день

- **05:30–06:00:** камбуз открывается; завтрак готов до начала смены в 07:00.
- **Утро:** подготовка обеда, приём или пересчёт продуктов, уборка.
- **11:30–12:30:** обед, так чтобы вахтенные успели поесть до или после вахты.
- **День:** перерыв, затем подготовка ужина; меню и заказы на ближайшие дни.
- **17:30–18:30:** ужин, потом уборка и закрытие камбуза; для ночных вахт часто оставляют перекус.

На большинстве грузовых судов кок работает длинный день с перерывом после обеда и вахту не стоит. Продукты принимают в порту, часто в неудобное время.

## Отличия по типам судов

- **Грузовые суда (балкеры, танкеры, контейнеровозы):** экипаж около 18–25 человек, один кок, иногда с мессменом; длинные переходы, поэтому важно планирование запасов.
- **Оффшорные суда и платформы:** команда кейтеринга, часто подрядчик, питание круглые сутки для сменного персонала; могут понадобиться оффшорные курсы безопасности.
- **Пассажирские и круизные суда:** большая бригада камбуза с поварами цехов, су-шефами и шеф-поварами — отдельная карьера со своими должностями.
- **Небольшие суда:** при малом составе экипажа кок может совмещать обязанности, но подготовка по пищевой гигиене всё равно нужна.

## Свидетельства и документы

- **Свидетельство судового повара**, выданное или признанное государством флага, — или признанная кулинарная квалификация плюс подготовка по пищевой гигиене.
- **Basic Training** (переподготовка каждые пять лет) и **Security Awareness**.
- **Медицинское свидетельство** — не более двух лет; компании могут требовать дополнительные проверки для работников пищеблока.
- **Мореходная книжка**, паспорт и визы.
- Подготовка по **пищевой безопасности / HACCP** — серьёзный плюс.

## Что для этого нужно

По **MLC 2006, правило 3.2**, судовой повар должен быть **подготовлен и квалифицирован**, и никто **младше 18 лет** не может работать судовым поваром. То же правило требует, чтобы питание и питьевая вода предоставлялись экипажу **бесплатно**, в качестве, количестве и разнообразии, подходящих для рейса, и с учётом религиозных и культурных обычаев. На практике компании ждут свидетельство повара, опыт на кухне и желательно стаж в море поваром или вторым поваром.

## С береговой кухни на судно

1. **Получите свидетельство судового повара и Basic Training** до подачи — без них крюинг не сможет вас направить.
2. **Опишите опыт на кухне с датами и объёмами**: сколько порций в день, какие кухни, вели ли вы склад и заказы.
3. **Начните вторым поваром или мессменом**, если сразу поваром не берут; это засчитывается как стаж на камбузе.
4. **Освойте интернациональные блюда и диеты** — филиппинские, индийские, восточноевропейские и западные экипажи часто едят вместе.
5. **Научитесь считать бюджет.** Хорошо кормить экипаж в пределах суточной нормы — то, что капитаны запоминают.

## Контракты и ротация

На грузовых судах коки обычно работают **шесть–девять месяцев**, в оффшоре часто меньше. MLC 2006 ограничивает время на борту до репатриации **сроком меньше 12 месяцев**, а минимум отдыха — **10 часов за 24** и **77 за семь дней** — действует и на камбузе.

## Вопросы на собеседовании

1. **«Составьте меню на неделю для экипажа из 20 человек трёх национальностей».**
2. **«Как вы планируете запасы на 30-дневный переход?»** Количество, хранение, ротация.
3. **«При каких температурах вы храните охлаждённые и замороженные продукты?»** И как вы это записываете.
4. **«Как вы поступите с членом экипажа с пищевой аллергией или религиозной диетой?»**
5. **«Что вы делаете, если загорелась фритюрница?»** Никакой воды — крышка, кошма, тревога.
6. **«Как вы укладываетесь в суточную норму на питание?»**

## Частые ошибки

- **CV без цифр** — порции, размер экипажа, кухни, бюджеты.
- **Нет свидетельства судового повара** в расчёте, что берегового диплома везде хватит.
- **Пренебрежение журналами гигиены** — их проверяют инспекторы и капитан.
- **Только одна кухня.** Смешанный экипаж замечает это быстро.

## Частые вопросы

**Можно ли стать судовым поваром без опыта в море?**
Да, со свидетельством повара, Basic Training и хорошим опытом на кухне; начать вторым поваром или мессменом — обычный путь.

**Нужен ли английский?**
Базовый — да: вы говорите с капитаном, агентом и смешанным экипажем.

**Кто платит за питание экипажа?**
Судовладелец. По MLC 2006 питание и питьевая вода для экипажа бесплатны.

**Чем chief cook отличается от cook?**
На больших экипажах шеф-повар руководит камбузом, а второй повар помогает; на большинстве грузовых судов кок один.

## Зарплата и вакансии

Зарплата кока — в середине шкалы рядового состава и растёт с размером экипажа и типом судна. Актуальный диапазон по реальным вакансиям — на странице [вакансий повара](/ru/jobs/rank/cook), сравнение должностей — на странице [зарплат](/ru/salaries).

## Ваше CV

В CV повара крюинг смотрит, какие экипажи вы кормили — размер и национальности, — типы судов и сертификаты со сроками. [CV моряка](/ru/maritime-cv) собирает их на одной странице.

*MLC 2006 задаёт минимум; какие свидетельства признаются, решает государство флага.*$ru$,
  'ua', $ua$**Кухар на судні (кок)** — на великих екіпажах шеф-кухар (chief cook) — годує двадцять людей тричі на день місяцями, далеко від будь-якого магазину. У довгому контракті їжа — одна з небагатьох радощів для всіх, тому доброго кока цінує кожен капітан, а поганого пам'ятає кожен екіпаж. У гайді — обов'язки, типовий день на камбузі, відмінності за типами суден, документи, співбесіда й як перейти з берегової кухні на судно.

## Чим займається кок

- **Меню.** Планує харчування всього екіпажу, часто кількох національностей, із релігійними, культурними й медичними дієтами — і з різноманіттям на місяці в морі.
- **Провізія.** Замовляє й приймає продукти, перевіряє якість, температури й строки, вкладається в добову норму компанії на людину. Планує запаси на довгі переходи, коли до наступного порту постачання тижні.
- **Камбуз і комори.** Гігієна, холодильні й морозильні камери, сухі комори, журнали температур, графіки прибирання й відходи. За MLC 2006 капітан або помічник проводить регулярні задокументовані перевірки продуктів, води, комор і камбуза.
- **Команда.** На великих суднах шеф-кухар керує другим кухарем і месменами чи стюардами та планує їхню роботу.
- **Безпека.** Пожежна небезпека камбуза — фритюр, олія й газ — і власні обов'язки кока на навчаннях.
- **Побут екіпажу.** Торт на день народження, святкова вечеря, барбекю на палубі: у довгому контракті це важливіше, ніж здається.

## Типовий день

- **05:30–06:00:** камбуз відкривається; сніданок готовий до початку зміни о 07:00.
- **Ранок:** підготовка обіду, приймання чи перерахунок продуктів, прибирання.
- **11:30–12:30:** обід, щоб вахтові встигли поїсти до чи після вахти.
- **День:** перерва, потім підготовка вечері; меню й замовлення на найближчі дні.
- **17:30–18:30:** вечеря, потім прибирання й закриття камбуза; для нічних вахт часто залишають перекус.

На більшості вантажних суден кок працює довгий день із перервою після обіду й вахту не несе. Продукти приймають у порту, часто в незручний час.

## Відмінності за типами суден

- **Вантажні судна (балкери, танкери, контейнеровози):** екіпаж близько 18–25 людей, один кок, іноді з месменом; довгі переходи, тому важливе планування запасів.
- **Офшорні судна й платформи:** команда кейтерингу, часто підрядник, харчування цілодобово для змінного персоналу; можуть знадобитися офшорні курси безпеки.
- **Пасажирські й круїзні судна:** велика бригада камбуза з кухарями цехів, су-шефами й шеф-кухарями — окрема кар'єра зі своїми посадами.
- **Невеликі судна:** за малого складу екіпажу кок може суміщати обов'язки, але підготовка з харчової гігієни все одно потрібна.

## Свідоцтва й документи

- **Свідоцтво суднового кухаря**, видане або визнане державою прапора, — або визнана кулінарна кваліфікація плюс підготовка з харчової гігієни.
- **Basic Training** (перепідготовка кожні п'ять років) і **Security Awareness**.
- **Медичне свідоцтво** — не більше двох років; компанії можуть вимагати додаткові перевірки для працівників харчоблоку.
- **Послужна книжка**, паспорт і візи.
- Підготовка з **харчової безпеки / HACCP** — серйозний плюс.

## Що для цього потрібно

За **MLC 2006, правило 3.2**, судновий кухар має бути **підготовленим і кваліфікованим**, і ніхто **молодше 18 років** не може працювати судновим кухарем. Те саме правило вимагає, щоб харчування й питна вода надавалися екіпажу **безкоштовно**, у якості, кількості й різноманітті, придатних для рейсу, і з урахуванням релігійних і культурних звичаїв. На практиці компанії чекають свідоцтво кухаря, досвід на кухні й бажано стаж у морі кухарем чи другим кухарем.

## З берегової кухні на судно

1. **Отримайте свідоцтво суднового кухаря й Basic Training** до подання — без них крюїнг не зможе вас направити.
2. **Опишіть досвід на кухні з датами й обсягами**: скільки порцій на день, які кухні, чи вели ви склад і замовлення.
3. **Почніть другим кухарем або месменом**, якщо одразу кухарем не беруть; це зараховується як стаж на камбузі.
4. **Опануйте інтернаціональні страви й дієти** — філіппінські, індійські, східноєвропейські й західні екіпажі часто їдять разом.
5. **Навчіться рахувати бюджет.** Добре годувати екіпаж у межах добової норми — те, що капітани запам'ятовують.

## Контракти й ротація

На вантажних суднах коки зазвичай працюють **шість–дев'ять місяців**, в офшорі часто менше. MLC 2006 обмежує час на борту до репатріації **строком менше 12 місяців**, а мінімум відпочинку — **10 годин за 24** і **77 за сім днів** — діє й на камбузі.

## Питання на співбесіді

1. **«Складіть меню на тиждень для екіпажу з 20 людей трьох національностей».**
2. **«Як ви плануєте запаси на 30-денний перехід?»** Кількість, зберігання, ротація.
3. **«За яких температур ви зберігаєте охолоджені й заморожені продукти?»** І як ви це записуєте.
4. **«Як ви вчините з членом екіпажу з харчовою алергією чи релігійною дієтою?»**
5. **«Що ви робите, якщо загорілася фритюрниця?»** Жодної води — кришка, кошма, тривога.
6. **«Як ви вкладаєтеся в добову норму на харчування?»**

## Часті помилки

- **CV без цифр** — порції, розмір екіпажу, кухні, бюджети.
- **Немає свідоцтва суднового кухаря** з розрахунку, що берегового диплома скрізь вистачить.
- **Нехтування журналами гігієни** — їх перевіряють інспектори й капітан.
- **Лише одна кухня.** Змішаний екіпаж помічає це швидко.

## Часті питання

**Чи можна стати судновим кухарем без досвіду в морі?**
Так, зі свідоцтвом кухаря, Basic Training і добрим досвідом на кухні; почати другим кухарем чи месменом — звичайний шлях.

**Чи потрібна англійська?**
Базова — так: ви говорите з капітаном, агентом і змішаним екіпажем.

**Хто платить за харчування екіпажу?**
Судновласник. За MLC 2006 харчування й питна вода для екіпажу безкоштовні.

**Чим chief cook відрізняється від cook?**
На великих екіпажах шеф-кухар керує камбузом, а другий кухар допомагає; на більшості вантажних суден кок один.

## Зарплата й вакансії

Зарплата кока — у середині шкали рядового складу й зростає з розміром екіпажу й типом судна. Актуальний діапазон за реальними вакансіями — на сторінці [вакансій кухаря](/ua/jobs/rank/cook), порівняння посад — на сторінці [зарплат](/ua/salaries).

## Ваше CV

У CV кухаря крюїнг дивиться, які екіпажі ви годували — розмір і національності, — типи суден і сертифікати зі строками. [CV моряка](/ua/maritime-cv) збирає їх на одній сторінці.

*MLC 2006 задає мінімум; які свідоцтва визнаються, вирішує держава прапора.*$ua$,
  'pl', $pl$**Kucharz okrętowy** — przy większych załogach szef kuchni (chief cook) — przez miesiące karmi dwadzieścia osób trzy razy dziennie, z dala od jakiegokolwiek sklepu. Na długim kontrakcie jedzenie to jedna z niewielu rzeczy, na które czekają wszyscy, dlatego dobrego kucharza ceni każdy kapitan, a złego pamięta każda załoga. W poradniku: obowiązki, typowy dzień w kambuzie, różnice według typu statku, dokumenty, rozmowa i jak przejść z kuchni na lądzie na statek.

## Czym zajmuje się kucharz

- **Jadłospis.** Planuje posiłki dla całej załogi, często kilku narodowości, z dietami religijnymi, kulturowymi i medycznymi — i z różnorodnością na miesiące na morzu.
- **Prowiant.** Zamawia i przyjmuje zapasy, sprawdza jakość, temperatury i daty, mieści się w dziennej stawce wyżywienia firmy na osobę. Planuje zapasy na długie przejścia, gdy do następnego portu zaopatrzenia są tygodnie.
- **Kambuz i magazyny.** Higiena, chłodnie i zamrażarki, magazyny suche, rejestry temperatur, harmonogramy sprzątania i odpady. Zgodnie z MLC 2006 kapitan lub oficer przeprowadza regularne, udokumentowane kontrole żywności, wody, magazynów i kambuza.
- **Zespół.** Na większych statkach szef kuchni kieruje drugim kucharzem i messmanami lub stewardami i planuje ich pracę.
- **Bezpieczeństwo.** Zagrożenie pożarowe w kambuzie — frytownice, olej i gaz — i własne obowiązki kucharza podczas ćwiczeń.
- **Dobrostan załogi.** Tort urodzinowy, świąteczna kolacja, grill na pokładzie: na długim kontrakcie to ważniejsze, niż się wydaje.

## Typowy dzień

- **05:30–06:00:** kambuz się otwiera; śniadanie gotowe przed zmianą o 07:00.
- **Rano:** przygotowanie obiadu, przyjęcie lub liczenie zapasów, sprzątanie.
- **11:30–12:30:** obiad, tak by wachtowi zdążyli zjeść przed wachtą lub po niej.
- **Po południu:** przerwa, potem przygotowanie kolacji; jadłospisy i zamówienia na najbliższe dni.
- **17:30–18:30:** kolacja, potem sprzątanie i zamknięcie kambuza; dla nocnych wacht często zostawia się przekąskę.

Na większości statków towarowych kucharz pracuje długi dzień z przerwą po południu i nie pełni wachty. Prowiant przyjmuje się w porcie, często o niewygodnych porach.

## Różnice według typu statku

- **Statki towarowe (masowce, tankowce, kontenerowce):** załoga około 18–25 osób, jeden kucharz, czasem z messmanem; długie przejścia, więc liczy się planowanie zapasów.
- **Jednostki i platformy offshore:** zespół cateringowy, często firma zewnętrzna, posiłki przez całą dobę dla pracowników zmianowych; mogą być potrzebne kursy bezpieczeństwa offshore.
- **Statki pasażerskie i wycieczkowe:** duża brygada kuchenna z kucharzami stanowiskowymi, sous-chefami i szefami kuchni — osobna kariera z własnymi stanowiskami.
- **Małe statki:** przy niewielkiej załodze kucharz może łączyć obowiązki, ale szkolenie z higieny żywności i tak jest wymagane.

## Świadectwa i dokumenty

- **Świadectwo kucharza okrętowego** wydane lub uznane przez państwo bandery — albo uznane kwalifikacje kulinarne plus szkolenie z higieny żywności.
- **Basic Training** (odnawiany co pięć lat) i **Security Awareness**.
- **Świadectwo zdrowia** — ważne najwyżej dwa lata; firmy mogą wymagać dodatkowych badań dla osób pracujących z żywnością.
- **Książeczka żeglarska**, paszport i wizy.
- Szkolenie z **bezpieczeństwa żywności / HACCP** to duży plus.

## Czego to wymaga

Zgodnie z **MLC 2006, prawidło 3.2**, kucharz okrętowy musi być **przeszkolony i wykwalifikowany**, a nikt **poniżej 18 lat** nie może być nim zatrudniony. To samo prawidło wymaga, by wyżywienie i woda pitna były dla załogi **bezpłatne**, odpowiedniej jakości, ilości i różnorodności dla danej podróży i z poszanowaniem zwyczajów religijnych i kulturowych. W praktyce firmy oczekują świadectwa kucharza, doświadczenia w kuchni i najlepiej praktyki na morzu jako kucharz lub drugi kucharz.

## Z kuchni na lądzie na statek

1. **Zdobądź świadectwo kucharza okrętowego i Basic Training** przed aplikowaniem — bez nich agencja nie może Cię skierować.
2. **Opisz doświadczenie kuchenne z datami i skalą**: ile porcji dziennie, jakie kuchnie, czy prowadziłeś magazyn i zamówienia.
3. **Zacznij jako drugi kucharz lub messman**, jeśli od razu nie przyjmą Cię na kucharza; liczy się to jako praktyka w kambuzie.
4. **Opanuj dania i diety międzynarodowe** — załogi filipińskie, indyjskie, wschodnioeuropejskie i zachodnie często jedzą razem.
5. **Naucz się liczyć budżet.** Dobre karmienie załogi w ramach dziennej stawki to coś, co kapitanowie zapamiętują.

## Kontrakty i rotacja

Na statkach towarowych kucharze pływają zwykle **sześć–dziewięć miesięcy**, w offshore często krócej. MLC 2006 ogranicza czas na burcie przed repatriacją do **mniej niż 12 miesięcy**, a minimum odpoczynku — **10 godzin na 24** i **77 na siedem dni** — obowiązuje także w kambuzie.

## Pytania na rozmowie

1. **„Proszę ułożyć jadłospis na tydzień dla załogi 20 osób trzech narodowości”.**
2. **„Jak planuje Pan zapasy na 30-dniowe przejście?”** Ilości, przechowywanie, rotacja.
3. **„W jakich temperaturach przechowuje Pan żywność chłodzoną i mrożoną?”** I jak to zapisuje.
4. **„Co Pan zrobi z członkiem załogi z alergią pokarmową lub dietą religijną?”**
5. **„Co Pan robi, gdy zapali się frytownica?”** Nigdy wody — pokrywa, koc gaśniczy, alarm.
6. **„Jak mieści się Pan w dziennej stawce wyżywienia?”**

## Częste błędy

- **CV bez liczb** — porcje, wielkość załogi, kuchnie, budżety.
- **Brak świadectwa kucharza okrętowego** w przekonaniu, że dyplom z lądu wszędzie wystarczy.
- **Lekceważenie rejestrów higieny** — sprawdzają je inspektorzy i kapitan.
- **Tylko jedna kuchnia.** Mieszana załoga szybko to zauważa.

## Najczęstsze pytania

**Czy można zostać kucharzem okrętowym bez doświadczenia na morzu?**
Tak, ze świadectwem kucharza, Basic Training i solidnym doświadczeniem kuchennym; start jako drugi kucharz lub messman to częsta droga.

**Czy potrzebny jest angielski?**
Podstawowy tak: rozmawiasz z kapitanem, agentem i mieszaną załogą.

**Kto płaci za wyżywienie załogi?**
Armator. Zgodnie z MLC 2006 wyżywienie i woda pitna są dla załogi bezpłatne.

**Czym różni się chief cook od cook?**
Przy większych załogach szef kuchni kieruje kambuzem, a drugi kucharz pomaga; na większości statków towarowych jest jeden kucharz.

## Wynagrodzenie i oferty

Płaca kucharza mieści się w środku skali załogi szeregowej i rośnie z wielkością załogi i typem statku. Aktualny przedział z prawdziwych ofert jest na stronie [ofert dla kucharzy](/pl/jobs/rank/cook), a porównanie stanowisk — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

W CV kucharza agencja patrzy, jakie załogi karmiłeś — wielkość i narodowości — na typy statków i certyfikaty z datami. [CV marynarza](/pl/maritime-cv) zbiera je na jednej stronie.

*MLC 2006 określa minimum; to państwo bandery decyduje, jakie świadectwa uznaje.*$pl$)
WHERE title->>'en' = 'Ship''s cook: duties, required certificates and how to get a job at sea';
