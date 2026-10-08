-- Company guides, second batch (category = 'guide'), for the employer-name
-- searches in Search Console: "wrs crewing" (23), "mcneill marine" (WRS's
-- consultants), "polaris szczecin" (13), "polsteam вакансии", "morska agencja
-- gdynia praca" (17).
--
-- Same rules as part 6: independent overviews, never the company's page; each
-- says SeaJobs.pro does not represent the company, points to its official site
-- and warns against anyone charging money in its name. Facts are from the
-- companies' own pages, crewing directories and the Gdynia Maritime Office's
-- agency list, stated with "according to" where sources differ. Two names in
-- the searches — "Альфа Марин Сервис" and "Baltimex" — could not be confirmed
-- in any source, so they have no guide rather than a guessed one.
--
-- pl + ru + ua + en. Idempotent — guarded by the English title.

-- ── 37. WRS ──────────────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'WRS (Worldwide Recruitment Solutions): offshore and marine jobs and how to apply',
    'ru', 'WRS (Worldwide Recruitment Solutions): работа в оффшоре и на флоте, как подать заявку',
    'ua', 'WRS (Worldwide Recruitment Solutions): робота в офшорі та на флоті, як подати заявку',
    'pl', 'WRS (Worldwide Recruitment Solutions): praca offshore i na morzu, jak aplikować'),
  jsonb_build_object(
    'en', $en$Worldwide Recruitment Solutions — usually just **WRS** — is a recruitment and crew-management company for the **offshore energy and marine** industries. Seafarers mostly meet it through its consultants, which is why searches for the company often include a consultant's name.

## What WRS does

According to the company, it recruits and manages crews for offshore and marine clients and has placed people in **more than 90 countries**. Its crew management covers planning, selection, placement on board, administration and training, and it states compliance with **ISO 9001:2015** and **MLC 2006**. Crewing directories describe its specialism as **subsea, diving, supply and anchor-handling** operations, and list a UK address.

## Who they look for

- **Back-deck crew:** deckhands, ABs, bosuns, riggers, crane operators, back-deck supervisors.
- **Officers and engineers:** masters, chief officers, engineers, **DP operators**.
- **Project specialists:** ROV personnel and offshore crane operators.

## What is usually required

Valid STCW certificates and a seafarer medical, offshore safety training (usually **BOSIET** with CA-EBS, or **GWO** for wind), DP certificates for DP roles, and a CV that shows the offshore experience at a glance.

## How to apply

1. Use the **official WRS website** and the contacts of a consultant listed there — and check that whoever writes to you really works for the company.
2. Send a full English CV with vessel types (AHTS, PSV, DSV, CSV), DP hours and every certificate with its expiry date. The [offshore CV template](/maritime-cv/offshore) puts those first.
3. Compare with [offshore vacancies](/jobs/vessel/offshore) and our guide on how to get into offshore.

## No fees

A legitimate agency is paid by its clients, **never by the seafarer**. Anyone asking you for money in WRS's name is not WRS.

*SeaJobs.pro is an independent job board and does not represent WRS. Details are taken from the company's public pages and crewing directories and may change.*$en$,
    'ru', $ru$Worldwide Recruitment Solutions — обычно просто **WRS** — кадровая и крюинговая компания для **оффшорной энергетики и морской отрасли**. Моряки чаще всего знакомятся с ней через её консультантов, поэтому компанию нередко ищут по имени конкретного менеджера.

## Чем занимается WRS

По данным компании, она набирает и сопровождает экипажи для оффшорных и морских заказчиков и уже направляла людей **более чем в 90 стран**. Крюинг включает планирование, отбор, посадку на судно, документы и обучение; компания заявляет соответствие **ISO 9001:2015** и **MLC 2006**. Каталоги крюингов называют её специализацией **подводные работы, водолазные суда, снабженцы и якорезаводчики (anchor handling)** и указывают адрес в Великобритании.

## Кого ищут

- **Палубная команда:** матросы (AB, deckhand), боцманы, риггеры, крановщики, старшие рабочей палубы.
- **Офицеры и механики:** капитаны, старпомы, механики, **DP-операторы**.
- **Проектные специалисты:** персонал ROV и оффшорные крановщики.

## Что обычно требуется

Действующие сертификаты STCW и медкомиссия моряка, оффшорная подготовка по безопасности (обычно **BOSIET** с CA-EBS или **GWO** для ветропарков), сертификаты DP для соответствующих должностей и CV, в котором оффшорный опыт виден сразу.

## Как подать заявку

1. Используйте **официальный сайт WRS** и контакты консультантов, указанные там, — и проверяйте, что вам пишет действительно сотрудник компании.
2. Отправьте полное CV на английском: типы судов (AHTS, PSV, DSV, CSV), часы DP и все сертификаты со сроками. [Шаблон CV для оффшора](/ru/maritime-cv/offshore) ставит это в начало.
3. Сравните с [оффшорными вакансиями](/ru/jobs/vessel/offshore) и нашим гайдом о том, как попасть в оффшор.

## Без оплаты

Честному агентству платят заказчики, **но никогда не моряк**. Тот, кто просит у вас деньги от имени WRS, — не WRS.

*SeaJobs.pro — независимый сайт вакансий и не представляет WRS. Сведения взяты с открытых страниц компании и из каталогов крюингов и могут меняться.*$ru$,
    'ua', $ua$Worldwide Recruitment Solutions — зазвичай просто **WRS** — кадрова та крюїнгова компанія для **офшорної енергетики й морської галузі**. Моряки найчастіше знайомляться з нею через її консультантів, тож компанію нерідко шукають за ім'ям конкретного менеджера.

## Чим займається WRS

За даними компанії, вона набирає й супроводжує екіпажі для офшорних і морських замовників і вже направляла людей **понад у 90 країн**. Крюїнг охоплює планування, відбір, посадку на судно, документи й навчання; компанія заявляє відповідність **ISO 9001:2015** і **MLC 2006**. Каталоги крюїнгів називають її спеціалізацією **підводні роботи, водолазні судна, постачальники та якорезавідники (anchor handling)** і вказують адресу у Великій Британії.

## Кого шукають

- **Палубна команда:** матроси (AB, deckhand), боцмани, ригери, кранівники, старші робочої палуби.
- **Офіцери й механіки:** капітани, старпоми, механіки, **DP-оператори**.
- **Проєктні фахівці:** персонал ROV та офшорні кранівники.

## Що зазвичай потрібно

Чинні сертифікати STCW і медкомісія моряка, офшорна підготовка з безпеки (зазвичай **BOSIET** з CA-EBS або **GWO** для вітропарків), сертифікати DP для відповідних посад і CV, у якому офшорний досвід видно одразу.

## Як подати заявку

1. Користуйтеся **офіційним сайтом WRS** і контактами консультантів, зазначеними там, — і перевіряйте, що вам пише справді працівник компанії.
2. Надішліть повне CV англійською: типи суден (AHTS, PSV, DSV, CSV), години DP і всі сертифікати зі строками. [Шаблон CV для офшору](/ua/maritime-cv/offshore) ставить це на початок.
3. Порівняйте з [офшорними вакансіями](/ua/jobs/vessel/offshore) і нашим гайдом про те, як потрапити в офшор.

## Без оплати

Чесному агентству платять замовники, **але ніколи не моряк**. Той, хто просить у вас гроші від імені WRS, — не WRS.

*SeaJobs.pro — незалежний сайт вакансій і не представляє WRS. Відомості взято з відкритих сторінок компанії та каталогів крюїнгів, вони можуть змінюватися.*$ua$,
    'pl', $pl$Worldwide Recruitment Solutions — zwykle po prostu **WRS** — to firma rekrutacyjna i crewingowa dla **energetyki offshore i branży morskiej**. Marynarze najczęściej poznają ją przez jej konsultantów, dlatego firmę często wyszukuje się po nazwisku konkretnego rekrutera.

## Czym zajmuje się WRS

Według firmy rekrutuje i obsługuje załogi dla klientów offshore i morskich, a jej pracownicy trafiali do **ponad 90 krajów**. Crew management obejmuje planowanie, selekcję, zaokrętowanie, dokumenty i szkolenia; firma deklaruje zgodność z **ISO 9001:2015** i **MLC 2006**. Katalogi crewingowe wskazują jej specjalizację: **prace podwodne, nurkowanie, statki zaopatrzeniowe i anchor handling**, oraz adres w Wielkiej Brytanii.

## Kogo szukają

- **Załoga pokładu roboczego:** marynarze (AB, deckhand), bosmani, riggerzy, operatorzy dźwigów, nadzorcy pokładu.
- **Oficerowie i mechanicy:** kapitanowie, starsi oficerowie, mechanicy, **operatorzy DP**.
- **Specjaliści projektowi:** personel ROV i operatorzy dźwigów offshore.

## Czego zwykle się wymaga

Ważnych certyfikatów STCW i świadectwa zdrowia, szkolenia bezpieczeństwa offshore (zwykle **BOSIET** z CA-EBS lub **GWO** dla farm wiatrowych), certyfikatów DP na stanowiskach DP oraz CV, w którym doświadczenie offshore widać od razu.

## Jak aplikować

1. Korzystaj z **oficjalnej strony WRS** i podanych tam kontaktów do konsultantów — i sprawdzaj, czy osoba, która do Ciebie pisze, naprawdę pracuje w firmie.
2. Wyślij pełne CV po angielsku: typy jednostek (AHTS, PSV, DSV, CSV), godziny DP i wszystkie certyfikaty z datami ważności. [Szablon CV offshore](/pl/maritime-cv/offshore) stawia to na początku.
3. Porównaj z [ofertami offshore](/pl/jobs/vessel/offshore) i naszym poradnikiem o tym, jak zacząć pracę w offshore.

## Bez opłat

Uczciwej agencji płacą klienci, **nigdy marynarz**. Ktoś, kto żąda od Ciebie pieniędzy w imieniu WRS, nie jest WRS.

*SeaJobs.pro to niezależny portal z ofertami pracy i nie reprezentuje WRS. Informacje pochodzą z publicznych stron firmy i katalogów crewingowych i mogą się zmieniać.*$pl$),
  'Companies', 'guide',
  'linear-gradient(135deg,#0e2a45,#13647a)',
  true, '2026-10-09 09:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'WRS (Worldwide Recruitment Solutions): offshore and marine jobs and how to apply');

-- ── 38. Polaris Maritime Services ────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Polaris Maritime Services (Szczecin): crewing for merchant and offshore fleets',
    'ru', 'Polaris Maritime Services (Щецин): крюинг для торгового и оффшорного флота',
    'ua', 'Polaris Maritime Services (Щецин): крюїнг для торгового й офшорного флоту',
    'pl', 'Polaris Maritime Services (Szczecin): crewing dla floty handlowej i offshore'),
  jsonb_build_object(
    'pl', $pl$**Polaris Maritime Services** to jedna z najstarszych polskich agencji crewingowych. Działa od **1991 roku**, ma siedzibę w **Szczecinie**, a od 2001 roku także **oddział w Gdyni**.

## Czym się zajmuje

Według firmy Polaris obsadza załogami jednostki we wszystkich sektorach żeglugi, w tym **offshore — ropa i gaz, energetyka wiatrowa** i inne instalacje morskie. Obsługa obejmuje cały cykl: wyszukanie kandydata, organizację szkoleń i certyfikatów, dowiezienie marynarza do trapu statku oraz **listę płac**. Podróże załóg obsługuje firmowe biuro **Polaris Travels** — loty, transfery, promy i hotele.

Według katalogów crewingowych agencja zapewnia pracę około **1000 marynarzy**. Firma podaje, że posiada krajowy certyfikat MLC oraz certyfikat **ISO 9001** (LRQA). Polaris był też przedmiotem studium przypadku polskiej agencji crewingowej w pracy naukowej Akademii Morskiej w Szczecinie.

## Kogo szukają

Oficerów, mechaników i załogę szeregową na statki handlowe oraz jednostki offshore. Na jednostkach offshore zwykle potrzebne są szkolenia **BOSIET/GWO**, a na stanowiskach oficerskich często **DP**.

## Jak aplikować

1. Sprawdź aktualne kontakty i oferty na **oficjalnej stronie Polaris** (maritime.pl).
2. Przygotuj CV po angielsku z pełnym stażem i certyfikatami — możesz je [zbudować z profilu](/pl/maritime-cv).
3. Zobacz też oferty od [polskich agencji](/pl/jobs/country/poland) i [w offshore](/pl/jobs/vessel/offshore) oraz nasz poradnik o tym, jak sprawdzić agencję w KRAZ i w urzędzie morskim.

## Bez opłat

Pośrednictwo pracy dla marynarzy jest dla marynarza **bezpłatne**. Każdy, kto żąda pieniędzy w imieniu agencji, nie działa w jej imieniu.

*SeaJobs.pro to niezależny portal z ofertami pracy i nie reprezentuje Polaris Maritime Services. Informacje pochodzą z publicznych źródeł i mogą się zmieniać.*$pl$,
    'en', $en$**Polaris Maritime Services** is one of the oldest Polish crewing agencies. It has worked since **1991**, is based in **Szczecin**, and has had a **branch in Gdynia** since 2001.

## What it does

According to the company, Polaris crews vessels in every sector of shipping, including **offshore — oil and gas, wind** and other installations at sea. The service covers the whole cycle: finding the candidate, arranging training and certificates, bringing the seafarer to the ship's gangway, and **payroll**. Crew travel is handled by its in-house **Polaris Travels** — flights, transfers, ferries and hotels.

Crewing directories put the number of seafarers it employs at about **1,000**. The company states that it holds the national MLC certificate and an **ISO 9001** certificate (LRQA). Polaris was also the case study of a Polish crewing agency in research from the Maritime University of Szczecin.

## Who they look for

Officers, engineers and ratings for merchant ships and offshore units. Offshore usually needs **BOSIET/GWO** training, and officer roles there often need **DP**.

## How to apply

1. Check the current contacts and vacancies on the **official Polaris website** (maritime.pl).
2. Prepare an English CV with full sea service and certificates — you can [build it from your profile](/maritime-cv).
3. See also offers from [Polish agencies](/jobs/country/poland) and [offshore jobs](/jobs/vessel/offshore), and our guide on checking an agency in KRAZ and with the maritime office.

## No fees

Recruitment is **free for the seafarer**. Anyone asking for money in an agency's name is not acting for it.

*SeaJobs.pro is an independent job board and does not represent Polaris Maritime Services. Details are taken from public sources and may change.*$en$,
    'ru', $ru$**Polaris Maritime Services** — одно из старейших польских крюинговых агентств. Работает с **1991 года**, головной офис — в **Щецине**, с 2001 года есть **филиал в Гдыне**.

## Чем занимается

По данным компании, Polaris комплектует экипажи во всех секторах судоходства, включая **оффшор — нефтегаз, ветроэнергетику** и другие морские объекты. Сервис охватывает весь цикл: поиск кандидата, организацию обучения и сертификатов, доставку моряка до трапа судна и **начисление зарплаты**. Поездки экипажей ведёт собственное бюро **Polaris Travels** — перелёты, трансферы, паромы и гостиницы.

По данным каталогов крюингов, агентство обеспечивает работой около **1000 моряков**. Компания указывает, что у неё есть национальный сертификат MLC и сертификат **ISO 9001** (LRQA). Polaris также был примером польского крюингового агентства в исследовании Морского университета в Щецине.

## Кого ищут

Штурманов, механиков и рядовой состав на торговые суда и оффшорные объекты. В оффшоре обычно нужны курсы **BOSIET/GWO**, а для офицерских должностей там часто — **DP**.

## Как подать заявку

1. Проверьте актуальные контакты и вакансии на **официальном сайте Polaris** (maritime.pl).
2. Подготовьте CV на английском с полным стажем и сертификатами — его можно [собрать из профиля](/ru/maritime-cv).
3. Смотрите также предложения [польских агентств](/ru/jobs/country/poland) и [вакансии в оффшоре](/ru/jobs/vessel/offshore), а также наш гайд о том, как проверить агентство в KRAZ и в морском ведомстве.

## Без оплаты

Трудоустройство для моряка **бесплатно**. Тот, кто просит деньги от имени агентства, действует не от его имени.

*SeaJobs.pro — независимый сайт вакансий и не представляет Polaris Maritime Services. Сведения взяты из открытых источников и могут меняться.*$ru$,
    'ua', $ua$**Polaris Maritime Services** — одне з найстаріших польських крюїнгових агентств. Працює з **1991 року**, головний офіс — у **Щецині**, з 2001 року є **філія в Гдині**.

## Чим займається

За даними компанії, Polaris комплектує екіпажі в усіх секторах судноплавства, зокрема в **офшорі — нафтогаз, вітроенергетика** та інші морські об'єкти. Сервіс охоплює весь цикл: пошук кандидата, організацію навчання й сертифікатів, доставку моряка до трапа судна та **нарахування зарплати**. Поїздки екіпажів веде власне бюро **Polaris Travels** — перельоти, трансфери, пороми й готелі.

За даними каталогів крюїнгів, агентство забезпечує роботою близько **1000 моряків**. Компанія зазначає, що має національний сертифікат MLC і сертифікат **ISO 9001** (LRQA). Polaris також був прикладом польського крюїнгового агентства в дослідженні Морського університету в Щецині.

## Кого шукають

Штурманів, механіків і рядовий склад на торговельні судна та офшорні об'єкти. В офшорі зазвичай потрібні курси **BOSIET/GWO**, а для офіцерських посад там часто — **DP**.

## Як подати заявку

1. Перевірте актуальні контакти й вакансії на **офіційному сайті Polaris** (maritime.pl).
2. Підготуйте CV англійською з повним стажем і сертифікатами — його можна [зібрати з профілю](/ua/maritime-cv).
3. Дивіться також пропозиції [польських агентств](/ua/jobs/country/poland) і [вакансії в офшорі](/ua/jobs/vessel/offshore), а також наш гайд про те, як перевірити агентство в KRAZ і в морському відомстві.

## Без оплати

Працевлаштування для моряка **безкоштовне**. Той, хто просить гроші від імені агентства, діє не від його імені.

*SeaJobs.pro — незалежний сайт вакансій і не представляє Polaris Maritime Services. Відомості взято з відкритих джерел, вони можуть змінюватися.*$ua$),
  'Companies', 'guide',
  'linear-gradient(135deg,#0e2a45,#2a6f97)',
  true, '2026-10-09 09:10:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Polaris Maritime Services (Szczecin): crewing for merchant and offshore fleets');

-- ── 39. Polsteam (PŻM) ───────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Polsteam (Polish Steamship Company): jobs on bulk carriers and how to join',
    'ru', 'Polsteam (Польское морское пароходство): работа на балкерах и как устроиться',
    'ua', 'Polsteam (Польське морське пароплавство): робота на балкерах і як влаштуватися',
    'pl', 'Polsteam (Polska Żegluga Morska): praca na masowcach i jak dołączyć'),
  jsonb_build_object(
    'pl', $pl$**Polska Żegluga Morska (PŻM), czyli Polsteam**, to państwowy armator z siedzibą w **Szczecinie** specjalizujący się w przewozach ładunków masowych. W odróżnieniu od agencji crewingowej to **armator** — marynarz pracuje na jego własnych statkach.

## Flota

Trzon floty to **masowce** — ponad 50 jednostek typu **handysize** i **kamsarmax** — przewożące ładunki masowe w żegludze nieregularnej, głównie na **Atlantyku** i na **Wielkich Jeziorach** Ameryki Północnej. Do grupy należą też **promy Unity Line** na Bałtyku. Firma zamówiła nowe masowce handysize w Chinach. Dokładna liczba statków zmienia się — sprawdź aktualną listę floty na stronie armatora.

## Praca na statkach PŻM

Strona kariery Polsteam oddziela pracę na morzu od pracy na lądzie. Według firmy do grupy marynarzy można dołączyć także **bez doświadczenia** — to jedna z dróg dla absolwentów i praktykantów. Na masowcach poszukiwani są oficerowie, mechanicy, elektrycy, załoga pokładowa i maszynowa oraz kuchnia.

## Jak aplikować

1. Wejdź na **stronę kariery Polsteam** (polsteam.com) i skontaktuj się z działem kadr floty.
2. Przygotuj CV z pełnym stażem — szczególnie na masowcach — i aktualnymi certyfikatami. Możesz je [zbudować z profilu](/pl/maritime-cv).
3. Porównaj z innymi [ofertami na masowcach](/pl/jobs/vessel/bulk-carrier).

## Bez opłat

Armator płaci za pracę marynarzowi, a nie odwrotnie. Każdy, kto żąda pieniędzy za „miejsce na statku PŻM”, nie działa w imieniu armatora.

*SeaJobs.pro to niezależny portal z ofertami pracy i nie reprezentuje Polsteam. Informacje pochodzą z publicznych źródeł i mogą się zmieniać.*$pl$,
    'en', $en$**Polska Żegluga Morska (PŻM), known as Polsteam**, is a state-owned shipowner based in **Szczecin** specialising in bulk cargo. Unlike a crewing agency, it is an **owner**: seafarers work on its own ships.

## The fleet

The core of the fleet is **bulk carriers** — over 50 **handysize** and **kamsarmax** ships — carrying bulk cargo in tramp trades, mainly in the **Atlantic** and on the North American **Great Lakes**. The group also runs **Unity Line** ferries in the Baltic, and has ordered new handysize bulk carriers in China. The exact number of ships changes, so check the current fleet list on the owner's site.

## Working on PŻM ships

Polsteam's careers page separates sea-based from shore-based jobs. According to the company, you can join its seafarers **even without experience** — one of the routes for graduates and cadets. On bulk carriers it needs officers, engineers, electricians, deck and engine ratings and galley crew.

## How to apply

1. Go to the **Polsteam careers page** (polsteam.com) and contact the fleet personnel department.
2. Prepare a CV with full sea service — bulk-carrier time especially — and current certificates. You can [build it from your profile](/maritime-cv).
3. Compare with other [bulk carrier jobs](/jobs/vessel/bulk-carrier).

## No fees

The owner pays the seafarer for the work, never the other way round. Anyone asking for money for "a place on a PŻM ship" is not acting for the company.

*SeaJobs.pro is an independent job board and does not represent Polsteam. Details are taken from public sources and may change.*$en$,
    'ru', $ru$**Polska Żegluga Morska (PŻM), или Polsteam** — государственный судовладелец из **Щецина** с упором на перевозку навалочных грузов. В отличие от крюингового агентства это **судовладелец**: моряк работает на его собственных судах.

## Флот

Основа флота — **балкеры**: более 50 судов типов **handysize** и **kamsarmax**, которые перевозят навалочные грузы в трамповом судоходстве, в основном в **Атлантике** и на **Великих озёрах** Северной Америки. В группу входят и **паромы Unity Line** на Балтике; компания заказала новые балкеры handysize в Китае. Точное число судов меняется — проверяйте актуальный список флота на сайте судовладельца.

## Работа на судах PŻM

Страница карьеры Polsteam разделяет работу в море и на берегу. По данным компании, к её морякам можно присоединиться **даже без опыта** — это один из путей для выпускников и кадетов. На балкерах нужны штурманы, механики, электрики, палубная и машинная команда и камбуз.

## Как подать заявку

1. Зайдите на **страницу карьеры Polsteam** (polsteam.com) и свяжитесь с отделом кадров флота.
2. Подготовьте CV с полным стажем — особенно на балкерах — и действующими сертификатами. Его можно [собрать из профиля](/ru/maritime-cv).
3. Сравните с другими [вакансиями на балкерах](/ru/jobs/vessel/bulk-carrier).

## Без оплаты

Судовладелец платит моряку за работу, а не наоборот. Тот, кто просит деньги за «место на судне PŻM», действует не от имени компании.

*SeaJobs.pro — независимый сайт вакансий и не представляет Polsteam. Сведения взяты из открытых источников и могут меняться.*$ru$,
    'ua', $ua$**Polska Żegluga Morska (PŻM), або Polsteam** — державний судновласник зі **Щецина** з наголосом на перевезенні навалювальних вантажів. На відміну від крюїнгового агентства, це **судновласник**: моряк працює на його власних суднах.

## Флот

Основа флоту — **балкери**: понад 50 суден типів **handysize** і **kamsarmax**, які перевозять навалювальні вантажі в трамповому судноплавстві, переважно в **Атлантиці** та на **Великих озерах** Північної Америки. До групи входять і **пороми Unity Line** на Балтиці; компанія замовила нові балкери handysize у Китаї. Точна кількість суден змінюється — перевіряйте актуальний список флоту на сайті судновласника.

## Робота на суднах PŻM

Сторінка кар'єри Polsteam розділяє роботу в морі й на березі. За даними компанії, до її моряків можна приєднатися **навіть без досвіду** — це один зі шляхів для випускників і кадетів. На балкерах потрібні штурмани, механіки, електрики, палубна й машинна команда та камбуз.

## Як подати заявку

1. Зайдіть на **сторінку кар'єри Polsteam** (polsteam.com) і зв'яжіться з відділом кадрів флоту.
2. Підготуйте CV з повним стажем — особливо на балкерах — і чинними сертифікатами. Його можна [зібрати з профілю](/ua/maritime-cv).
3. Порівняйте з іншими [вакансіями на балкерах](/ua/jobs/vessel/bulk-carrier).

## Без оплати

Судновласник платить моряку за роботу, а не навпаки. Той, хто просить гроші за «місце на судні PŻM», діє не від імені компанії.

*SeaJobs.pro — незалежний сайт вакансій і не представляє Polsteam. Відомості взято з відкритих джерел, вони можуть змінюватися.*$ua$),
  'Companies', 'guide',
  'linear-gradient(135deg,#0e2a45,#1d4f8a)',
  true, '2026-10-09 09:20:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Polsteam (Polish Steamship Company): jobs on bulk carriers and how to join');

-- ── 40. Morska Agencja Gdynia ────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Morska Agencja Gdynia (MAG): crewing jobs for officers and ratings',
    'ru', 'Morska Agencja Gdynia (MAG): работа для офицеров и рядового состава',
    'ua', 'Morska Agencja Gdynia (MAG): робота для офіцерів і рядового складу',
    'pl', 'Morska Agencja Gdynia (MAG): praca dla oficerów i marynarzy'),
  jsonb_build_object(
    'pl', $pl$**Morska Agencja Gdynia (MAG)** to jedna z najdłużej działających polskich firm morskich. Powstała w **1951 roku** jako agencja reprezentująca zagranicznych armatorów, a crewingiem — kierowaniem polskich marynarzy do pracy u armatorów zagranicznych — zajmuje się od **1981 roku**. W 1991 roku została sprywatyzowana, a w 1994 otworzyła biuro w **Londynie**.

## Skala

Według firmy MAG zawiera rocznie około **1500 kontraktów** dla oficerów i załogi szeregowej. Pracodawcami są armatorzy z **Wielkiej Brytanii, Irlandii, Grecji, Niemiec i USA**.

## Dokumenty agencji

MAG podaje wpis do rejestru agencji zatrudnienia prowadzonego przez marszałka województwa pomorskiego (KRAZ). Agencja figurowała też w wykazie agencji pośrednictwa pracy dla marynarzy uznanych przez dyrektora **Urzędu Morskiego w Gdyni**. Taki dokument ma termin ważności — przed podpisaniem umowy sprawdź aktualny wykaz na stronie urzędu, tak jak w przypadku każdej agencji.

## Jak aplikować

1. Skorzystaj z **oficjalnej strony MAG** (mag.pl, sekcja crewing) — tam są aktualne oferty i kontakty.
2. Przygotuj CV po angielsku z pełnym stażem i certyfikatami — [zbuduj je z profilu](/pl/maritime-cv).
3. Porównaj z ofertami od [polskich agencji](/pl/jobs/country/poland).

## Bez opłat

Pośrednictwo pracy dla marynarzy jest dla marynarza **bezpłatne** — płaci armator. Każdy, kto żąda pieniędzy w imieniu agencji, nie działa w jej imieniu.

*SeaJobs.pro to niezależny portal z ofertami pracy i nie reprezentuje Morskiej Agencji Gdynia. Informacje pochodzą z publicznych źródeł i mogą się zmieniać.*$pl$,
    'en', $en$**Morska Agencja Gdynia (MAG)** is one of the longest-running Polish maritime companies. It was founded in **1951** to represent foreign shipowners, and has done crewing — placing Polish seafarers with foreign owners — since **1981**. It was privatised in 1991 and opened an office in **London** in 1994.

## Scale

According to the company, MAG arranges about **1,500 contracts** a year for officers and ratings. The employers are owners from the **United Kingdom, Ireland, Greece, Germany and the United States**.

## The agency's documents

MAG states its entry in the employment-agency register kept by the Pomeranian voivodeship (KRAZ). It has also appeared on the list of seafarer placement agencies recognised by the director of the **Maritime Office in Gdynia**. That recognition has an expiry date — check the current list on the office's site before signing, as with any agency.

## How to apply

1. Use the **official MAG website** (mag.pl, crewing section) for current vacancies and contacts.
2. Prepare an English CV with full sea service and certificates — [build it from your profile](/maritime-cv).
3. Compare with offers from [Polish agencies](/jobs/country/poland).

## No fees

Recruitment is **free for the seafarer** — the owner pays. Anyone asking for money in the agency's name is not acting for it.

*SeaJobs.pro is an independent job board and does not represent Morska Agencja Gdynia. Details are taken from public sources and may change.*$en$,
    'ru', $ru$**Morska Agencja Gdynia (MAG)** — одна из старейших польских морских компаний. Основана в **1951 году** как агентство, представлявшее иностранных судовладельцев, а крюингом — направлением польских моряков к иностранным судовладельцам — занимается с **1981 года**. В 1991 году компанию приватизировали, в 1994-м открыли офис в **Лондоне**.

## Масштаб

По данным компании, MAG оформляет около **1500 контрактов** в год для офицеров и рядового состава. Работодатели — судовладельцы из **Великобритании, Ирландии, Греции, Германии и США**.

## Документы агентства

MAG указывает запись в реестре агентств занятости Поморского воеводства (KRAZ). Агентство также было в списке агентств по трудоустройству моряков, признанных директором **Морского ведомства в Гдыне**. Такой документ действует ограниченный срок — перед подписанием договора проверьте актуальный список на сайте ведомства, как и для любого агентства.

## Как подать заявку

1. Используйте **официальный сайт MAG** (mag.pl, раздел crewing) — там актуальные вакансии и контакты.
2. Подготовьте CV на английском с полным стажем и сертификатами — [соберите его из профиля](/ru/maritime-cv).
3. Сравните с предложениями [польских агентств](/ru/jobs/country/poland).

## Без оплаты

Трудоустройство для моряка **бесплатно** — платит судовладелец. Тот, кто просит деньги от имени агентства, действует не от его имени.

*SeaJobs.pro — независимый сайт вакансий и не представляет Morska Agencja Gdynia. Сведения взяты из открытых источников и могут меняться.*$ru$,
    'ua', $ua$**Morska Agencja Gdynia (MAG)** — одна з найстаріших польських морських компаній. Заснована в **1951 році** як агентство, що представляло іноземних судновласників, а крюїнгом — направленням польських моряків до іноземних судновласників — займається з **1981 року**. У 1991 році компанію приватизували, у 1994-му відкрили офіс у **Лондоні**.

## Масштаб

За даними компанії, MAG оформлює близько **1500 контрактів** на рік для офіцерів і рядового складу. Роботодавці — судновласники з **Великої Британії, Ірландії, Греції, Німеччини та США**.

## Документи агентства

MAG зазначає запис у реєстрі агентств зайнятості Поморського воєводства (KRAZ). Агентство також було в списку агентств із працевлаштування моряків, визнаних директором **Морського відомства в Гдині**. Такий документ діє обмежений строк — перед підписанням договору перевірте актуальний список на сайті відомства, як і для будь-якого агентства.

## Як подати заявку

1. Користуйтеся **офіційним сайтом MAG** (mag.pl, розділ crewing) — там актуальні вакансії й контакти.
2. Підготуйте CV англійською з повним стажем і сертифікатами — [зберіть його з профілю](/ua/maritime-cv).
3. Порівняйте з пропозиціями [польських агентств](/ua/jobs/country/poland).

## Без оплати

Працевлаштування для моряка **безкоштовне** — платить судновласник. Той, хто просить гроші від імені агентства, діє не від його імені.

*SeaJobs.pro — незалежний сайт вакансій і не представляє Morska Agencja Gdynia. Відомості взято з відкритих джерел, вони можуть змінюватися.*$ua$),
  'Companies', 'guide',
  'linear-gradient(135deg,#0e2a45,#9b2c3a)',
  true, '2026-10-09 09:30:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Morska Agencja Gdynia (MAG): crewing jobs for officers and ratings');

-- ── Covers (public/guides/*.png — run after the deploy that adds them) ───────
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/wrs.png?v=1'
WHERE title->>'en' = 'WRS (Worldwide Recruitment Solutions): offshore and marine jobs and how to apply' AND coalesce(cover_url, '') = '';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/polaris.png?v=1'
WHERE title->>'en' = 'Polaris Maritime Services (Szczecin): crewing for merchant and offshore fleets' AND coalesce(cover_url, '') = '';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/polsteam.png?v=1'
WHERE title->>'en' = 'Polsteam (Polish Steamship Company): jobs on bulk carriers and how to join' AND coalesce(cover_url, '') = '';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/morska-agencja-gdynia.png?v=1'
WHERE title->>'en' = 'Morska Agencja Gdynia (MAG): crewing jobs for officers and ratings' AND coalesce(cover_url, '') = '';
