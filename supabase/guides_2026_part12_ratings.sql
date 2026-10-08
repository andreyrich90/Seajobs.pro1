-- Ratings (category = 'guide'): Bosun, Able Seaman (AB), Ordinary Seaman (OS),
-- Ship's Cook. The "what does a … do / how to become …" searches for the
-- ranks with the most vacancies on the board; each guide links to its
-- /jobs/rank/<slug> landing.
--
-- Facts: STCW Regulation II/4 (rating forming part of a navigational watch)
-- and II/5 (able seafarer deck); MLC 2006 Regulation 3.2 and Standard A3.2
-- (ship's cooks: trained and qualified, not under 18). The bosun has no STCW
-- certificate of their own — that is said plainly, not invented. No salary
-- figures: the rank landing shows the live range.
--
-- pl + ru + ua + en. Covers are set at the end — run after the deploy that
-- adds public/guides/{bosun,able-seaman,ordinary-seaman,ship-cook}.png.
-- Idempotent — guarded by the English title.

-- ── 48. Bosun ────────────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Bosun on a ship: duties, requirements and how to become one',
    'ru', 'Боцман на судне: обязанности, требования и как им стать',
    'ua', 'Боцман на судні: обов''язки, вимоги та як ним стати',
    'pl', 'Bosman na statku: obowiązki, wymagania i jak nim zostać'),
  jsonb_build_object(
    'en', $en$The **bosun** (boatswain) is the senior rating on deck — the foreman between the chief officer and the deck crew. The chief officer decides what has to be done; the bosun decides who does it, with which tools, and makes sure it is done safely.

## What the bosun does

- **Runs the deck crew.** Turns the chief officer's plan into the day's jobs for the ABs and OSs, and checks the work.
- **Maintenance.** Rust removal and painting, greasing, hatch covers and their seals, mooring winches and ropes, lashing gear, cranes and derricks on cargo ships.
- **Mooring and anchoring.** Usually leads the forward mooring party together with the officer, and handles the windlass.
- **Rigging and gear.** Ropes, wires, shackles, blocks, pilot ladders, gangways and accommodation ladders — inspected, maintained and recorded.
- **Stores.** Paint, tools, ropes and deck consumables: keeps the deck store and orders what is running out.
- **Safety at work.** Work permits, working aloft and over the side, enclosed spaces, protective equipment — the bosun is the first person who stops an unsafe job.

The bosun is usually a **day worker**, roughly 08:00–17:00, and is called out for mooring at any hour.

## What it takes

There is **no separate STCW certificate for a bosun**. What a company expects:

- the **able seafarer deck** certificate (STCW II/5) — in practice, years as an AB;
- Basic Training and the other mandatory safety courses, a valid medical;
- experience on the vessel type, and the ability to lead a mixed crew in English.

Most companies promote an AB they already know after several contracts.

## The path

Ordinary seaman → able seaman → **bosun**. Some bosuns go on to study for an officer's certificate; many stay — an experienced bosun is valued and well paid among the ratings.

## Pay and jobs

The bosun is usually the highest-paid deck rating. The current range from real vacancies is on the [bosun jobs page](/jobs/rank/bosun); a comparison by rank is on our [salaries page](/salaries).

## Your CV

For a bosun, crewing desks look at vessel types, the cargo gear you have worked with and how long you have led a crew. The [maritime CV](/maritime-cv) puts this first.

*Certificates follow STCW; your flag state may add its own requirements.*$en$,
    'ru', $ru$**Боцман** — старший из рядового состава на палубе, бригадир между старпомом и палубной командой. Старпом решает, что нужно сделать; боцман решает, кто это сделает, каким инструментом, и следит, чтобы сделали безопасно.

## Чем занимается боцман

- **Руководит палубной командой.** Превращает план старпома в работу на день для матросов и проверяет её.
- **Обслуживание.** Обивка ржавчины и покраска, смазка, люковые крышки и их уплотнения, швартовные лебёдки и концы, найтовы, краны и стрелы на грузовых судах.
- **Швартовка и якорь.** Обычно руководит баковой швартовной партией вместе с помощником и работает на брашпиле.
- **Такелаж.** Концы, тросы, скобы, блоки, лоцманские трапы, сходни и забортные трапы — осмотр, обслуживание и записи.
- **Снабжение.** Краска, инструмент, концы и палубные расходники: ведёт боцманскую кладовую и заказывает то, что заканчивается.
- **Безопасность работ.** Наряды-допуски, работы на высоте и за бортом, закрытые помещения, средства защиты — боцман первым останавливает опасную работу.

Боцман обычно **подвахтенный (day worker)**, примерно с 08:00 до 17:00, и его поднимают на швартовку в любое время.

## Что для этого нужно

**Отдельного диплома боцмана по ПДНВ нет.** Компания ожидает:

- свидетельство **матроса первого класса (able seafarer deck, ПДНВ II/5)** — на практике годы работы матросом;
- Basic Training и другие обязательные курсы безопасности, действующую медкомиссию;
- опыт на этом типе судов и умение руководить смешанным экипажем на английском.

Большинство компаний повышают знакомого матроса после нескольких контрактов.

## Путь

Матрос второго класса (OS) → матрос первого класса (AB) → **боцман**. Часть боцманов потом учится на офицерский диплом; многие остаются — опытного боцмана ценят, и среди рядового состава ему платят хорошо.

## Зарплата и вакансии

Боцман обычно самый высокооплачиваемый из палубного рядового состава. Актуальный диапазон по реальным вакансиям — на странице [вакансий боцмана](/ru/jobs/rank/bosun), сравнение по должностям — на странице [зарплат](/ru/salaries).

## Ваше CV

В CV боцмана крюинг смотрит на типы судов, грузовое устройство, с которым вы работали, и сколько вы руководили командой. [CV моряка](/ru/maritime-cv) ставит это в начало.

*Документы — по ПДНВ (STCW); государство флага может добавлять свои требования.*$ru$,
    'ua', $ua$**Боцман** — старший з рядового складу на палубі, бригадир між старпомом і палубною командою. Старпом вирішує, що треба зробити; боцман вирішує, хто це зробить, яким інструментом, і стежить, щоб зробили безпечно.

## Чим займається боцман

- **Керує палубною командою.** Перетворює план старпома на роботу на день для матросів і перевіряє її.
- **Обслуговування.** Оббивання іржі й фарбування, змащування, люкові кришки та їхні ущільнення, швартовні лебідки й кінці, найтови, крани й стріли на вантажних суднах.
- **Швартування й якір.** Зазвичай керує баковою швартовною партією разом із помічником і працює на брашпилі.
- **Такелаж.** Кінці, троси, скоби, блоки, лоцманські трапи, сходні й забортні трапи — огляд, обслуговування й записи.
- **Постачання.** Фарба, інструмент, кінці й палубні витратні матеріали: веде боцманську комору й замовляє те, що закінчується.
- **Безпека робіт.** Наряди-допуски, роботи на висоті й за бортом, закриті приміщення, засоби захисту — боцман першим зупиняє небезпечну роботу.

Боцман зазвичай **підвахтовий (day worker)**, приблизно з 08:00 до 17:00, і його піднімають на швартування будь-коли.

## Що для цього потрібно

**Окремого диплома боцмана за ПДНВ немає.** Компанія очікує:

- свідоцтво **матроса першого класу (able seafarer deck, ПДНВ II/5)** — на практиці роки роботи матросом;
- Basic Training та інші обов'язкові курси безпеки, чинну медкомісію;
- досвід на цьому типі суден і вміння керувати змішаним екіпажем англійською.

Більшість компаній підвищують знайомого матроса після кількох контрактів.

## Шлях

Матрос другого класу (OS) → матрос першого класу (AB) → **боцман**. Частина боцманів потім навчається на офіцерський диплом; багато хто залишається — досвідченого боцмана цінують, і серед рядового складу йому платять добре.

## Зарплата й вакансії

Боцман зазвичай найбільш оплачуваний із палубного рядового складу. Актуальний діапазон за реальними вакансіями — на сторінці [вакансій боцмана](/ua/jobs/rank/bosun), порівняння за посадами — на сторінці [зарплат](/ua/salaries).

## Ваше CV

У CV боцмана крюїнг дивиться на типи суден, вантажні пристрої, з якими ви працювали, і скільки ви керували командою. [CV моряка](/ua/maritime-cv) ставить це на початок.

*Документи — за ПДНВ (STCW); держава прапора може додавати свої вимоги.*$ua$,
    'pl', $pl$**Bosman** to najstarszy z załogi szeregowej na pokładzie — brygadzista między starszym oficerem a załogą pokładową. Starszy oficer decyduje, co trzeba zrobić; bosman decyduje, kto to zrobi i jakim narzędziem, i pilnuje, by zrobiono to bezpiecznie.

## Czym zajmuje się bosman

- **Kieruje załogą pokładową.** Zamienia plan starszego oficera na zadania dnia dla marynarzy i sprawdza ich pracę.
- **Konserwacja.** Odrdzewianie i malowanie, smarowanie, pokrywy lukowe i ich uszczelki, windy cumownicze i liny, sprzęt do mocowania, dźwigi i bomy na statkach ładunkowych.
- **Cumowanie i kotwiczenie.** Zwykle kieruje grupą cumowniczą na dziobie razem z oficerem i obsługuje windę kotwiczną.
- **Olinowanie i osprzęt.** Liny, stalówki, szekle, bloki, sztormtrapy pilotowe, trapy i schodnie — przeglądy, konserwacja i zapisy.
- **Zaopatrzenie.** Farby, narzędzia, liny i materiały pokładowe: prowadzi magazyn bosmański i zamawia to, co się kończy.
- **Bezpieczeństwo pracy.** Zezwolenia na pracę, prace na wysokości i za burtą, przestrzenie zamknięte, środki ochrony — bosman pierwszy przerywa niebezpieczną pracę.

Bosman zwykle pracuje **na dniówce (day worker)**, mniej więcej 08:00–17:00, i jest wzywany do cumowania o każdej porze.

## Czego to wymaga

**Nie ma osobnego dyplomu bosmana według STCW.** Firma oczekuje:

- świadectwa **starszego marynarza (able seafarer deck, STCW II/5)** — w praktyce lat pracy jako AB;
- Basic Training i innych obowiązkowych kursów bezpieczeństwa, ważnego świadectwa zdrowia;
- doświadczenia na danym typie statków i umiejętności kierowania mieszaną załogą po angielsku.

Większość firm awansuje znanego sobie marynarza po kilku kontraktach.

## Ścieżka

Młodszy marynarz (OS) → starszy marynarz (AB) → **bosman**. Część bosmanów uczy się potem na dyplom oficerski; wielu zostaje — doświadczony bosman jest ceniony i wśród załogi szeregowej dobrze opłacany.

## Wynagrodzenie i oferty

Bosman jest zwykle najlepiej opłacanym marynarzem pokładowym. Aktualny przedział z prawdziwych ofert jest na stronie [ofert dla bosmanów](/pl/jobs/rank/bosun), a porównanie stanowisk — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

W CV bosmana agencja patrzy na typy statków, urządzenia ładunkowe, z którymi pracowałeś, i jak długo kierowałeś załogą. [CV marynarza](/pl/maritime-cv) stawia to na początku.

*Dokumenty według STCW; państwo bandery może dodawać własne wymagania.*$pl$),
  'Deck', 'guide',
  'linear-gradient(135deg,#0e2a45,#8a6d1d)',
  true, '2026-10-10 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Bosun on a ship: duties, requirements and how to become one');

-- ── 49. Able Seaman ──────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Able seaman (AB): duties, the STCW certificate and how to get hired',
    'ru', 'Матрос первого класса (AB): обязанности, свидетельство ПДНВ и как устроиться',
    'ua', 'Матрос першого класу (AB): обов''язки, свідоцтво ПДНВ і як влаштуватися',
    'pl', 'Starszy marynarz (AB): obowiązki, świadectwo STCW i jak znaleźć pracę'),
  jsonb_build_object(
    'en', $en$The **able seaman (AB)** is the backbone of the deck crew: on watch at the wheel and on lookout, on day work keeping the ship in shape, and at every mooring. It is also one of the ranks with the most vacancies on any job board.

## What an AB does

- **Watchkeeping.** Lookout and helmsman on the bridge watch, usually alongside an officer of the watch; gangway and deck watches in port.
- **Maintenance.** Rust removal and painting, greasing, cleaning holds or tanks, repairs under the bosun's direction.
- **Mooring and anchoring.** Handling ropes and winches fore and aft — the moment where an AB's experience matters most.
- **Cargo.** Lashing and unlashing, hatch covers, assisting with hoses and manifolds on tankers.
- **Safety.** Drills, maintenance of the life-saving equipment, rigging pilot ladders.

## What it takes

The certificate is **able seafarer deck** under **STCW Regulation II/5**:

- at least **18 years** old;
- first qualified as a **rating forming part of a navigational watch** (STCW II/4);
- then at least **18 months** of approved sea service in the deck department in that capacity — or **12 months** if you completed approved training.

You also need **Basic Training** (fire-fighting, survival, first aid, personal safety), Security Awareness or Designated Security Duties, a valid seafarer medical, and your seaman's book and passport. Tankers and gas carriers add the cargo familiarisation courses.

## How to get the first AB contract

1. **Count your sea time carefully** — the months as OS are what the AB certificate is built from.
2. **Keep every course valid** before you apply; an expired one is the most common reason for a "no".
3. **Start where juniors are hired** — bulk carriers and general cargo — and move to tankers or offshore later.
4. **Basic English matters**: you will be taking helm orders and working with a mixed crew.

## The path

Ordinary seaman → **able seaman** → bosun. Some ABs study for the officer-of-the-watch certificate and move to the bridge.

## Pay and jobs

The current range from real vacancies is on the [able seaman jobs page](/jobs/rank/able-seaman); a comparison by rank is on our [salaries page](/salaries).

## Your CV

Crewing desks read an AB's CV for vessel types, months at sea and certificates with expiry dates. The [maritime CV](/maritime-cv) lays them out on one page.

*Requirements follow STCW; your flag state may add its own. Check them with your maritime administration.*$en$,
    'ru', $ru$**Матрос первого класса (AB)** — основа палубной команды: на вахте у руля и впередсмотрящим, на дневных работах держит судно в порядке, и на каждой швартовке. Это ещё и одна из должностей с наибольшим числом вакансий на любом сайте.

## Чем занимается AB

- **Вахта.** Впередсмотрящий и рулевой на ходовой вахте, обычно вместе с вахтенным помощником; вахта у трапа и на палубе в порту.
- **Обслуживание.** Обивка ржавчины и покраска, смазка, мойка трюмов или танков, ремонт под руководством боцмана.
- **Швартовка и якорь.** Работа с концами и лебёдками на баке и корме — именно здесь опыт матроса важнее всего.
- **Груз.** Крепление и раскрепление, люковые крышки, помощь со шлангами и манифолдом на танкерах.
- **Безопасность.** Учения, обслуживание спасательного оборудования, установка лоцманского трапа.

## Что для этого нужно

Нужно свидетельство **матроса первого класса (able seafarer deck)** по **правилу II/5 ПДНВ (STCW)**:

- возраст не менее **18 лет**;
- сначала квалификация **матроса, входящего в состав ходовой навигационной вахты** (ПДНВ II/4);
- затем не менее **18 месяцев** одобренного стажа в палубной службе в этом качестве — или **12 месяцев**, если вы прошли одобренную подготовку.

Также нужны **Basic Training** (борьба с пожаром, выживание, первая помощь, личная безопасность), Security Awareness или Designated Security Duties, действующая медкомиссия моряка, мореходная книжка и паспорт. Для танкеров и газовозов — курсы начальной грузовой подготовки.

## Как получить первый контракт AB

1. **Внимательно посчитайте стаж** — месяцы матросом второго класса и есть основа свидетельства AB.
2. **Держите все курсы действующими** до подачи; просроченный курс — самая частая причина отказа.
3. **Начинайте там, где берут младших**, — балкеры и генгруз, а на танкеры и оффшор переходите потом.
4. **Базовый английский важен**: вы будете выполнять команды на руль и работать в смешанном экипаже.

## Путь

Матрос второго класса (OS) → **матрос первого класса (AB)** → боцман. Часть матросов учится на диплом вахтенного помощника и уходит на мостик.

## Зарплата и вакансии

Актуальный диапазон по реальным вакансиям — на странице [вакансий матроса AB](/ru/jobs/rank/able-seaman), сравнение по должностям — на странице [зарплат](/ru/salaries).

## Ваше CV

В CV матроса крюинг смотрит на типы судов, месяцы в море и сертификаты со сроками. [CV моряка](/ru/maritime-cv) собирает их на одной странице.

*Требования — по ПДНВ (STCW); государство флага может добавлять свои. Уточняйте в морской администрации.*$ru$,
    'ua', $ua$**Матрос першого класу (AB)** — основа палубної команди: на вахті біля стерна й упередсмотрящим, на денних роботах тримає судно в порядку, і на кожному швартуванні. Це ще й одна з посад із найбільшою кількістю вакансій на будь-якому сайті.

## Чим займається AB

- **Вахта.** Упередсмотрящий і стерновий на ходовій вахті, зазвичай разом із вахтовим помічником; вахта біля трапа й на палубі в порту.
- **Обслуговування.** Оббивання іржі й фарбування, змащування, миття трюмів чи танків, ремонт під керівництвом боцмана.
- **Швартування й якір.** Робота з кінцями й лебідками на баку й кормі — саме тут досвід матроса найважливіший.
- **Вантаж.** Кріплення й розкріплення, люкові кришки, допомога зі шлангами й маніфольдом на танкерах.
- **Безпека.** Навчання, обслуговування рятувального обладнання, встановлення лоцманського трапа.

## Що для цього потрібно

Потрібне свідоцтво **матроса першого класу (able seafarer deck)** за **правилом II/5 ПДНВ (STCW)**:

- вік щонайменше **18 років**;
- спочатку кваліфікація **матроса, що входить до складу ходової навігаційної вахти** (ПДНВ II/4);
- потім щонайменше **18 місяців** схваленого стажу в палубній службі в цій якості — або **12 місяців**, якщо ви пройшли схвалену підготовку.

Також потрібні **Basic Training** (боротьба з пожежею, виживання, перша допомога, особиста безпека), Security Awareness або Designated Security Duties, чинна медкомісія моряка, послужна книжка й паспорт. Для танкерів і газовозів — курси початкової вантажної підготовки.

## Як отримати перший контракт AB

1. **Уважно порахуйте стаж** — місяці матросом другого класу й є основою свідоцтва AB.
2. **Тримайте всі курси чинними** до подання; прострочений курс — найчастіша причина відмови.
3. **Починайте там, де беруть молодших**, — балкери й генвантаж, а на танкери й офшор переходьте потім.
4. **Базова англійська важлива**: ви виконуватимете команди на стерно й працюватимете в змішаному екіпажі.

## Шлях

Матрос другого класу (OS) → **матрос першого класу (AB)** → боцман. Частина матросів навчається на диплом вахтового помічника й переходить на місток.

## Зарплата й вакансії

Актуальний діапазон за реальними вакансіями — на сторінці [вакансій матроса AB](/ua/jobs/rank/able-seaman), порівняння за посадами — на сторінці [зарплат](/ua/salaries).

## Ваше CV

У CV матроса крюїнг дивиться на типи суден, місяці в морі й сертифікати зі строками. [CV моряка](/ua/maritime-cv) збирає їх на одній сторінці.

*Вимоги — за ПДНВ (STCW); держава прапора може додавати свої. Уточнюйте в морській адміністрації.*$ua$,
    'pl', $pl$**Starszy marynarz (AB)** to trzon załogi pokładowej: na wachcie za sterem i na oku, na dniówce dba o stan statku i jest przy każdym cumowaniu. To także jedno ze stanowisk z największą liczbą ofert na każdym portalu.

## Czym zajmuje się AB

- **Wachta.** Obserwator i sternik na wachcie nawigacyjnej, zwykle razem z oficerem wachtowym; wachta przy trapie i na pokładzie w porcie.
- **Konserwacja.** Odrdzewianie i malowanie, smarowanie, mycie ładowni lub zbiorników, naprawy pod kierunkiem bosmana.
- **Cumowanie i kotwiczenie.** Praca z linami i windami na dziobie i rufie — tu doświadczenie marynarza liczy się najbardziej.
- **Ładunek.** Mocowanie i zdejmowanie mocowań, pokrywy lukowe, pomoc przy wężach i manifoldzie na tankowcach.
- **Bezpieczeństwo.** Ćwiczenia, konserwacja sprzętu ratunkowego, wystawianie sztormtrapu pilotowego.

## Czego to wymaga

Potrzebne jest świadectwo **starszego marynarza (able seafarer deck)** z **prawidła II/5 STCW**:

- co najmniej **18 lat**;
- najpierw kwalifikacja **marynarza wchodzącego w skład wachty nawigacyjnej** (STCW II/4);
- potem co najmniej **18 miesięcy** zatwierdzonej praktyki w dziale pokładowym na tym stanowisku — lub **12 miesięcy** po zatwierdzonym szkoleniu.

Potrzebne są też **Basic Training** (ochrona przeciwpożarowa, przetrwanie, pierwsza pomoc, bezpieczeństwo własne), Security Awareness lub Designated Security Duties, ważne świadectwo zdrowia, książeczka żeglarska i paszport. Na tankowce i gazowce dochodzą podstawowe kursy ładunkowe.

## Jak zdobyć pierwszy kontrakt AB

1. **Dokładnie policz praktykę** — miesiące jako OS to podstawa świadectwa AB.
2. **Pilnuj ważności wszystkich kursów** przed aplikowaniem; nieważny kurs to najczęstszy powód odmowy.
3. **Zacznij tam, gdzie biorą młodszych** — masowce i drobnicowce — a na tankowce i offshore przejdź później.
4. **Podstawowy angielski jest ważny**: będziesz wykonywać komendy sterowe i pracować w mieszanej załodze.

## Ścieżka

Młodszy marynarz (OS) → **starszy marynarz (AB)** → bosman. Część marynarzy uczy się na dyplom oficera wachtowego i przechodzi na mostek.

## Wynagrodzenie i oferty

Aktualny przedział z prawdziwych ofert jest na stronie [ofert dla AB](/pl/jobs/rank/able-seaman), a porównanie stanowisk — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

W CV marynarza agencja patrzy na typy statków, miesiące na morzu i certyfikaty z datami ważności. [CV marynarza](/pl/maritime-cv) zbiera je na jednej stronie.

*Wymagania według STCW; państwo bandery może dodawać własne. Sprawdź je w administracji morskiej.*$pl$),
  'Deck', 'guide',
  'linear-gradient(135deg,#0e2a45,#13647a)',
  true, '2026-10-10 10:10:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Able seaman (AB): duties, the STCW certificate and how to get hired');

-- ── 50. Ordinary Seaman ──────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Ordinary seaman (OS): how to start at sea without experience',
    'ru', 'Матрос второго класса (OS): как начать работу в море без опыта',
    'ua', 'Матрос другого класу (OS): як почати роботу в морі без досвіду',
    'pl', 'Młodszy marynarz (OS): jak zacząć pracę na morzu bez doświadczenia'),
  jsonb_build_object(
    'en', $en$The **ordinary seaman (OS)** is the entry rank on deck — the job most people mean when they search for "work at sea without experience". It does not need years of college, and it is the first step to able seaman and bosun.

## What an OS does

- **Maintenance.** Rust removal, painting, cleaning and greasing under the direction of the bosun and the ABs.
- **Watchkeeping.** Lookout on the bridge watch once qualified, and deck and gangway watches in port.
- **Mooring.** Assisting the ABs with ropes and heaving lines fore and aft.
- **Cargo and stores.** Lashing, hold cleaning, taking provisions and stores on board.

## What it takes

To stand a navigational watch you need the certificate of a **rating forming part of a navigational watch** under **STCW Regulation II/4**:

- at least **16 years** old (many companies hire from 18);
- approved sea service including at least **six months** of training and experience — or special training ashore or on board that includes at least **two months** of approved sea service;
- Basic Training (fire-fighting, survival, first aid, personal safety) and Security Awareness;
- a valid seafarer medical, a seaman's book and a passport.

The exact route — a short course at a maritime school or training on board — depends on your country's maritime administration.

## How to get the first contract

1. **Get the documents first**: seaman's book, medical, Basic Training. Without them nobody will consider you.
2. **Learn basic English** — commands, safety words, numbers.
3. **Apply to agencies that take juniors**, and to the fleets that hire them: bulk carriers, general cargo, river-sea ships.
4. **Never pay for a job.** An honest agency is paid by the shipowner; "a fee for a place on board" is a scam.

## The path

**Ordinary seaman** → able seaman (after the sea time required by STCW II/5) → bosun, or study for the officer-of-the-watch certificate.

## Pay and jobs

The OS is the entry rank, so the pay is the lowest on deck — and it rises with each step. The current range from real vacancies is on the [ordinary seaman jobs page](/jobs/rank/ordinary-seaman); compare ranks on our [salaries page](/salaries).

## Your CV

With little sea time, the [maritime CV](/maritime-cv) shows what you do have — courses, documents, languages and any work with tools — in the order a crewing manager reads it.

*Requirements follow STCW; your flag state may add its own. Check them with your maritime administration.*$en$,
    'ru', $ru$**Матрос второго класса (OS)** — начальная должность на палубе, та самая работа, которую ищут по запросу «работа в море без опыта». Для неё не нужны годы учёбы, и это первый шаг к матросу первого класса и боцману.

## Чем занимается OS

- **Обслуживание.** Обивка ржавчины, покраска, уборка и смазка под руководством боцмана и матросов.
- **Вахта.** Впередсмотрящий на ходовой вахте после получения квалификации, вахта на палубе и у трапа в порту.
- **Швартовка.** Помогает матросам с концами и выбросками на баке и корме.
- **Груз и снабжение.** Крепление, мойка трюмов, погрузка провизии и снабжения.

## Что для этого нужно

Чтобы стоять ходовую вахту, нужно свидетельство **матроса, входящего в состав ходовой навигационной вахты**, по **правилу II/4 ПДНВ (STCW)**:

- возраст не менее **16 лет** (многие компании берут с 18);
- одобренный стаж, включающий не менее **шести месяцев** подготовки и опыта, — или специальная подготовка на берегу либо на судне с одобренным стажем не менее **двух месяцев**;
- Basic Training (борьба с пожаром, выживание, первая помощь, личная безопасность) и Security Awareness;
- действующая медкомиссия моряка, мореходная книжка и паспорт.

Конкретный путь — короткий курс в морской школе или подготовка на судне — зависит от морской администрации вашей страны.

## Как получить первый контракт

1. **Сначала документы**: мореходная книжка, медкомиссия, Basic Training. Без них вас не рассмотрят.
2. **Выучите базовый английский** — команды, слова безопасности, числа.
3. **Подавайтесь в агентства, которые берут младших**, и на флоты, где их берут: балкеры, генгруз, суда река-море.
4. **Никогда не платите за работу.** Честному агентству платит судовладелец; «взнос за место на судне» — это мошенничество.

## Путь

**Матрос второго класса** → матрос первого класса (после стажа по правилу II/5 ПДНВ) → боцман или учёба на диплом вахтенного помощника.

## Зарплата и вакансии

OS — начальная должность, поэтому зарплата самая низкая на палубе, и она растёт с каждым шагом. Актуальный диапазон по реальным вакансиям — на странице [вакансий матроса OS](/ru/jobs/rank/ordinary-seaman), сравнение должностей — на странице [зарплат](/ru/salaries).

## Ваше CV

Когда стажа мало, [CV моряка](/ru/maritime-cv) показывает то, что у вас есть, — курсы, документы, языки и любой опыт работы с инструментом — в том порядке, в каком его читает крюинг-менеджер.

*Требования — по ПДНВ (STCW); государство флага может добавлять свои. Уточняйте в морской администрации.*$ru$,
    'ua', $ua$**Матрос другого класу (OS)** — початкова посада на палубі, та сама робота, яку шукають за запитом «робота в морі без досвіду». Для неї не потрібні роки навчання, і це перший крок до матроса першого класу й боцмана.

## Чим займається OS

- **Обслуговування.** Оббивання іржі, фарбування, прибирання й змащування під керівництвом боцмана й матросів.
- **Вахта.** Упередсмотрящий на ходовій вахті після отримання кваліфікації, вахта на палубі й біля трапа в порту.
- **Швартування.** Допомагає матросам із кінцями й кидальними кінцями на баку й кормі.
- **Вантаж і постачання.** Кріплення, миття трюмів, завантаження провізії й постачання.

## Що для цього потрібно

Щоб нести ходову вахту, потрібне свідоцтво **матроса, що входить до складу ходової навігаційної вахти**, за **правилом II/4 ПДНВ (STCW)**:

- вік щонайменше **16 років** (багато компаній беруть із 18);
- схвалений стаж, що включає щонайменше **шість місяців** підготовки й досвіду, — або спеціальна підготовка на березі чи на судні зі схваленим стажем щонайменше **два місяці**;
- Basic Training (боротьба з пожежею, виживання, перша допомога, особиста безпека) і Security Awareness;
- чинна медкомісія моряка, послужна книжка й паспорт.

Конкретний шлях — короткий курс у морській школі чи підготовка на судні — залежить від морської адміністрації вашої країни.

## Як отримати перший контракт

1. **Спочатку документи**: послужна книжка, медкомісія, Basic Training. Без них вас не розглянуть.
2. **Вивчіть базову англійську** — команди, слова безпеки, числа.
3. **Подавайтеся в агентства, які беруть молодших**, і на флоти, де їх беруть: балкери, генвантаж, судна ріка-море.
4. **Ніколи не платіть за роботу.** Чесному агентству платить судновласник; «внесок за місце на судні» — це шахрайство.

## Шлях

**Матрос другого класу** → матрос першого класу (після стажу за правилом II/5 ПДНВ) → боцман або навчання на диплом вахтового помічника.

## Зарплата й вакансії

OS — початкова посада, тому зарплата найнижча на палубі, і вона зростає з кожним кроком. Актуальний діапазон за реальними вакансіями — на сторінці [вакансій матроса OS](/ua/jobs/rank/ordinary-seaman), порівняння посад — на сторінці [зарплат](/ua/salaries).

## Ваше CV

Коли стажу мало, [CV моряка](/ua/maritime-cv) показує те, що у вас є, — курси, документи, мови й будь-який досвід роботи з інструментом — у тому порядку, в якому його читає крюїнг-менеджер.

*Вимоги — за ПДНВ (STCW); держава прапора може додавати свої. Уточнюйте в морській адміністрації.*$ua$,
    'pl', $pl$**Młodszy marynarz (OS)** to stanowisko wejściowe na pokładzie — ta praca, której ludzie szukają, wpisując „praca na morzu bez doświadczenia”. Nie wymaga lat nauki i jest pierwszym krokiem do starszego marynarza i bosmana.

## Czym zajmuje się OS

- **Konserwacja.** Odrdzewianie, malowanie, sprzątanie i smarowanie pod kierunkiem bosmana i starszych marynarzy.
- **Wachta.** Obserwator na wachcie nawigacyjnej po uzyskaniu kwalifikacji, wachta na pokładzie i przy trapie w porcie.
- **Cumowanie.** Pomaga marynarzom przy linach i rzutkach na dziobie i rufie.
- **Ładunek i zaopatrzenie.** Mocowanie, mycie ładowni, przyjmowanie prowiantu i zaopatrzenia.

## Czego to wymaga

Aby pełnić wachtę nawigacyjną, potrzebne jest świadectwo **marynarza wchodzącego w skład wachty nawigacyjnej** z **prawidła II/4 STCW**:

- co najmniej **16 lat** (wiele firm zatrudnia od 18);
- zatwierdzona praktyka obejmująca co najmniej **sześć miesięcy** szkolenia i doświadczenia — lub specjalne szkolenie na lądzie albo na statku z zatwierdzoną praktyką co najmniej **dwóch miesięcy**;
- Basic Training (ochrona przeciwpożarowa, przetrwanie, pierwsza pomoc, bezpieczeństwo własne) i Security Awareness;
- ważne świadectwo zdrowia, książeczka żeglarska i paszport.

Konkretna droga — krótki kurs w szkole morskiej lub szkolenie na statku — zależy od administracji morskiej Twojego kraju.

## Jak zdobyć pierwszy kontrakt

1. **Najpierw dokumenty**: książeczka żeglarska, świadectwo zdrowia, Basic Training. Bez nich nikt Cię nie rozważy.
2. **Naucz się podstaw angielskiego** — komendy, słownictwo bezpieczeństwa, liczby.
3. **Aplikuj do agencji, które biorą młodszych**, i na floty, które ich zatrudniają: masowce, drobnicowce, statki rzeczno-morskie.
4. **Nigdy nie płać za pracę.** Uczciwej agencji płaci armator; „opłata za miejsce na statku” to oszustwo.

## Ścieżka

**Młodszy marynarz** → starszy marynarz (po praktyce wymaganej przez STCW II/5) → bosman albo nauka na dyplom oficera wachtowego.

## Wynagrodzenie i oferty

OS to stanowisko wejściowe, więc płaca jest najniższa na pokładzie — i rośnie z każdym krokiem. Aktualny przedział z prawdziwych ofert jest na stronie [ofert dla OS](/pl/jobs/rank/ordinary-seaman), a porównanie stanowisk — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

Przy krótkiej praktyce [CV marynarza](/pl/maritime-cv) pokazuje to, co masz — kursy, dokumenty, języki i doświadczenie z narzędziami — w kolejności, w jakiej czyta je menedżer agencji.

*Wymagania według STCW; państwo bandery może dodawać własne. Sprawdź je w administracji morskiej.*$pl$),
  'Deck', 'guide',
  'linear-gradient(135deg,#0e2a45,#1d6fa5)',
  true, '2026-10-10 10:20:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Ordinary seaman (OS): how to start at sea without experience');

-- ── 51. Ship's Cook ──────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Ship''s cook: duties, required certificates and how to get a job at sea',
    'ru', 'Повар на судне (кок): обязанности, документы и как устроиться в море',
    'ua', 'Кухар на судні (кок): обов''язки, документи та як влаштуватися в море',
    'pl', 'Kucharz okrętowy: obowiązki, wymagane dokumenty i jak znaleźć pracę na morzu'),
  jsonb_build_object(
    'en', $en$The **ship's cook** — chief cook on larger crews — feeds twenty people three times a day for months, far from any shop. On a long contract the food is one of the few things everyone looks forward to, which is why a good cook is valued by every master.

## What the cook does

- **Menus.** Plans meals for the whole crew, often of several nationalities, with religious and medical diets.
- **Provisions.** Orders and receives stores, checks quality and dates, and works within the company's daily food budget per person.
- **The galley and stores.** Hygiene, cold and dry stores, temperatures and records, cleaning schedules — all checked by the master and by inspectors.
- **The team.** On bigger ships the chief cook leads a second cook and the messmen or stewards.
- **Safety.** Galley fire risks, fryers and gas, plus the cook's own role in drills.

## What it takes

Under the **Maritime Labour Convention (MLC 2006), Regulation 3.2**, a ship's cook must be **trained and qualified** for the job, and nobody **under 18** may be employed as a ship's cook. In practice that means:

- a **ship's cook certificate** issued or recognised by the flag state (often a course at a maritime training centre) — or a recognised culinary qualification plus food-hygiene training;
- **Basic Training** and Security Awareness, a valid seafarer medical, a seaman's book and a passport;
- experience in a professional kitchen; companies often ask for previous sea time as cook or second cook.

On ships with a small prescribed crew the rules can be lighter, but food-hygiene training is still required.

## How to get the first contract

1. **Get the cook's certificate and Basic Training** before applying.
2. **Show your kitchen experience** — restaurants, canteens, catering — with dates.
3. **Start as second cook or messman** if no company takes you as cook at once.
4. **Learn the basics of international cooking** and of the diets you will meet.

## Pay and jobs

The cook's pay sits in the middle of the ratings and rises with the size of the crew. The current range from real vacancies is on the [cook jobs page](/jobs/rank/cook); compare ranks on our [salaries page](/salaries).

## Your CV

For a cook, crewing desks look at the size and nationalities of the crews you fed, the vessel types and the certificates with dates. The [maritime CV](/maritime-cv) puts them on one page.

*MLC 2006 sets the minimum; your flag state decides which certificates it recognises.*$en$,
    'ru', $ru$**Повар на судне (кок)** — на больших экипажах шеф-повар (chief cook) — кормит двадцать человек три раза в день месяцами, вдали от любого магазина. В долгом контракте еда — одна из немногих радостей для всех, поэтому хорошего кока ценит каждый капитан.

## Чем занимается кок

- **Меню.** Планирует питание всего экипажа, часто нескольких национальностей, с религиозными и медицинскими диетами.
- **Провизия.** Заказывает и принимает продукты, проверяет качество и сроки, укладывается в суточную норму компании на человека.
- **Камбуз и кладовые.** Гигиена, холодильные и сухие кладовые, температуры и записи, графики уборки — всё это проверяют капитан и инспекторы.
- **Команда.** На больших судах шеф-повар руководит вторым поваром и мессменами или стюардами.
- **Безопасность.** Пожароопасность камбуза, фритюр и газ, плюс собственная роль кока на учениях.

## Что для этого нужно

По **Конвенции о труде в морском судоходстве (MLC 2006), правило 3.2**, судовой повар должен быть **подготовлен и квалифицирован**, и никто **младше 18 лет** не может работать судовым поваром. На практике это:

- **свидетельство судового повара**, выданное или признанное государством флага (часто курс в морском учебном центре), — или признанная кулинарная квалификация плюс подготовка по пищевой гигиене;
- **Basic Training** и Security Awareness, действующая медкомиссия моряка, мореходная книжка и паспорт;
- опыт работы на профессиональной кухне; компании часто просят стаж в море поваром или вторым поваром.

На судах с небольшим составом экипажа требования могут быть мягче, но подготовка по пищевой гигиене всё равно нужна.

## Как получить первый контракт

1. **Получите свидетельство повара и Basic Training** до подачи.
2. **Покажите опыт на кухне** — рестораны, столовые, кейтеринг — с датами.
3. **Начните вторым поваром или мессменом**, если сразу поваром не берут.
4. **Освойте основы интернациональной кухни** и диет, с которыми встретитесь.

## Зарплата и вакансии

Зарплата кока — в середине шкалы рядового состава и растёт с размером экипажа. Актуальный диапазон по реальным вакансиям — на странице [вакансий повара](/ru/jobs/rank/cook), сравнение должностей — на странице [зарплат](/ru/salaries).

## Ваше CV

В CV повара крюинг смотрит, какие экипажи вы кормили — размер и национальности, — типы судов и сертификаты со сроками. [CV моряка](/ru/maritime-cv) собирает их на одной странице.

*MLC 2006 задаёт минимум; какие свидетельства признаются, решает государство флага.*$ru$,
    'ua', $ua$**Кухар на судні (кок)** — на великих екіпажах шеф-кухар (chief cook) — годує двадцять людей тричі на день місяцями, далеко від будь-якого магазину. У довгому контракті їжа — одна з небагатьох радощів для всіх, тому доброго кока цінує кожен капітан.

## Чим займається кок

- **Меню.** Планує харчування всього екіпажу, часто кількох національностей, із релігійними й медичними дієтами.
- **Провізія.** Замовляє й приймає продукти, перевіряє якість і строки, вкладається в добову норму компанії на людину.
- **Камбуз і комори.** Гігієна, холодильні й сухі комори, температури й записи, графіки прибирання — усе це перевіряють капітан та інспектори.
- **Команда.** На великих суднах шеф-кухар керує другим кухарем і месменами чи стюардами.
- **Безпека.** Пожежна небезпека камбуза, фритюр і газ, плюс власна роль кока на навчаннях.

## Що для цього потрібно

За **Конвенцією про працю в морському судноплавстві (MLC 2006), правило 3.2**, судновий кухар має бути **підготовленим і кваліфікованим**, і ніхто **молодше 18 років** не може працювати судновим кухарем. На практиці це:

- **свідоцтво суднового кухаря**, видане або визнане державою прапора (часто курс у морському навчальному центрі), — або визнана кулінарна кваліфікація плюс підготовка з харчової гігієни;
- **Basic Training** і Security Awareness, чинна медкомісія моряка, послужна книжка й паспорт;
- досвід роботи на професійній кухні; компанії часто просять стаж у морі кухарем чи другим кухарем.

На суднах із невеликим складом екіпажу вимоги можуть бути м'якшими, але підготовка з харчової гігієни все одно потрібна.

## Як отримати перший контракт

1. **Отримайте свідоцтво кухаря й Basic Training** до подання.
2. **Покажіть досвід на кухні** — ресторани, їдальні, кейтеринг — із датами.
3. **Почніть другим кухарем або месменом**, якщо одразу кухарем не беруть.
4. **Опануйте основи інтернаціональної кухні** й дієт, з якими зустрінетеся.

## Зарплата й вакансії

Зарплата кока — у середині шкали рядового складу й зростає з розміром екіпажу. Актуальний діапазон за реальними вакансіями — на сторінці [вакансій кухаря](/ua/jobs/rank/cook), порівняння посад — на сторінці [зарплат](/ua/salaries).

## Ваше CV

У CV кухаря крюїнг дивиться, які екіпажі ви годували — розмір і національності, — типи суден і сертифікати зі строками. [CV моряка](/ua/maritime-cv) збирає їх на одній сторінці.

*MLC 2006 задає мінімум; які свідоцтва визнаються, вирішує держава прапора.*$ua$,
    'pl', $pl$**Kucharz okrętowy** — przy większych załogach szef kuchni (chief cook) — przez miesiące karmi dwadzieścia osób trzy razy dziennie, z dala od jakiegokolwiek sklepu. Na długim kontrakcie jedzenie to jedna z niewielu rzeczy, na które czekają wszyscy, dlatego dobrego kucharza ceni każdy kapitan.

## Czym zajmuje się kucharz

- **Jadłospis.** Planuje posiłki dla całej załogi, często kilku narodowości, z dietami religijnymi i medycznymi.
- **Prowiant.** Zamawia i przyjmuje zapasy, sprawdza jakość i daty, mieści się w dziennej stawce wyżywienia firmy na osobę.
- **Kambuz i magazyny.** Higiena, chłodnie i magazyny suche, temperatury i zapisy, harmonogramy sprzątania — sprawdzane przez kapitana i inspektorów.
- **Zespół.** Na większych statkach szef kuchni kieruje drugim kucharzem i messmanami lub stewardami.
- **Bezpieczeństwo.** Zagrożenie pożarowe w kambuzie, frytownice i gaz, a także własna rola kucharza w ćwiczeniach.

## Czego to wymaga

Zgodnie z **Konwencją o pracy na morzu (MLC 2006), prawidło 3.2**, kucharz okrętowy musi być **przeszkolony i wykwalifikowany**, a nikt **poniżej 18 lat** nie może być zatrudniony jako kucharz okrętowy. W praktyce oznacza to:

- **świadectwo kucharza okrętowego** wydane lub uznane przez państwo bandery (często kurs w ośrodku szkolenia morskiego) — albo uznane kwalifikacje kulinarne plus szkolenie z higieny żywności;
- **Basic Training** i Security Awareness, ważne świadectwo zdrowia, książeczka żeglarska i paszport;
- doświadczenie w profesjonalnej kuchni; firmy często proszą o praktykę na morzu jako kucharz lub drugi kucharz.

Na statkach z małą załogą wymagania mogą być łagodniejsze, ale szkolenie z higieny żywności i tak jest potrzebne.

## Jak zdobyć pierwszy kontrakt

1. **Zdobądź świadectwo kucharza i Basic Training** przed aplikowaniem.
2. **Pokaż doświadczenie kuchenne** — restauracje, stołówki, catering — z datami.
3. **Zacznij jako drugi kucharz lub messman**, jeśli od razu nie przyjmą Cię na kucharza.
4. **Opanuj podstawy kuchni międzynarodowej** i diet, z którymi się spotkasz.

## Wynagrodzenie i oferty

Płaca kucharza mieści się w środku skali załogi szeregowej i rośnie z wielkością załogi. Aktualny przedział z prawdziwych ofert jest na stronie [ofert dla kucharzy](/pl/jobs/rank/cook), a porównanie stanowisk — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

W CV kucharza agencja patrzy, jakie załogi karmiłeś — wielkość i narodowości — na typy statków i certyfikaty z datami. [CV marynarza](/pl/maritime-cv) zbiera je na jednej stronie.

*MLC 2006 określa minimum; to państwo bandery decyduje, jakie świadectwa uznaje.*$pl$),
  'Galley', 'guide',
  'linear-gradient(135deg,#0e2a45,#9b4a2c)',
  true, '2026-10-10 10:30:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Ship''s cook: duties, required certificates and how to get a job at sea');

-- ── Covers ───────────────────────────────────────────────────────────────────
UPDATE news_articles SET cover_url = v.url FROM (VALUES
 ('Bosun on a ship: duties, requirements and how to become one', 'https://seajobs.pro/guides/bosun.png?v=1'),
 ('Able seaman (AB): duties, the STCW certificate and how to get hired', 'https://seajobs.pro/guides/able-seaman.png?v=1'),
 ('Ordinary seaman (OS): how to start at sea without experience', 'https://seajobs.pro/guides/ordinary-seaman.png?v=1'),
 ('Ship''s cook: duties, required certificates and how to get a job at sea', 'https://seajobs.pro/guides/ship-cook.png?v=1')
) AS v(t, url)
WHERE news_articles.title->>'en' = v.t AND coalesce(news_articles.cover_url, '') = '';
