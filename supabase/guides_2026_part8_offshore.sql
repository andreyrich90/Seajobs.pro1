-- Offshore block (category = 'guide'), for the offshore searches in Search
-- Console: "oiler offshore" (41), "stewardess offshore", "eto offshore
-- vacancies", "offshore vessel vacancies", "trainee dpo" (covered by the DP
-- guide, linked from here).
--
-- ru + ua + en + pl (offshore is a large share of the Polish searches).
-- Certificate validity is from training providers' published course pages
-- (OPITO BOSIET/FOET 4 years, GWO BST 24 months, OEUK medical usually
-- 2 years), stated as "usually" and with a "check with the employer" — the
-- issuing bodies revise these.
-- Idempotent — guarded by the English title. Run once in the SQL editor.

-- ── 34. Getting into offshore ────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'How to get into offshore: certificates, vessels and the first contract',
    'ru', 'Как попасть в оффшор: сертификаты, типы судов и первый контракт',
    'ua', 'Як потрапити в офшор: сертифікати, типи суден і перший контракт',
    'pl', 'Jak zacząć pracę w offshore: certyfikaty, statki i pierwszy kontrakt'),
  jsonb_build_object(
    'en', $en$Offshore means ships and units that serve the oil, gas and wind industries at sea. Many seafarers move there for the rotations — often equal time on and off — and day rates that are usually higher than in the merchant fleet. The way in is different from the merchant fleet, so here is what you need.

## The vessels

- **PSV** (platform supply vessels) carry cargo, fuel and water to platforms.
- **AHTS** (anchor handling tug supply) move rigs and handle their anchors.
- **SOV and CTV** serve offshore wind farms — SOVs house technicians for weeks, CTVs take them out for the day.
- **Construction, diving support and survey vessels**, jack-up and installation units.

Most of them use **dynamic positioning (DP)**.

## The certificates offshore employers ask for

On top of your STCW certificates and a seafarer medical, offshore usually requires:

- **OPITO BOSIET** (Basic Offshore Safety Induction and Emergency Training) with **CA-EBS** — sea survival, helicopter underwater escape (HUET), fire fighting and first aid. It is usually valid for **4 years** and renewed with the **FOET** refresher.
- An **offshore medical** — for UK and North Sea work the **OEUK** certificate, usually valid for up to **2 years**.
- For wind farms, **GWO Basic Safety Training** — first aid, manual handling, fire awareness, working at heights and sea survival, valid for **24 months**.
- For officers on DP vessels, a **DP certificate** — see our guide to the DP operator course.

Requirements depend on the region and the client, so check what each vacancy names before paying for a course.

## Getting the first contract without offshore experience

1. **Start from a related rank.** Deck officers, engineers, ABs and motormen with merchant experience are hired into offshore every day; what they lack is the offshore certificates, not the seamanship.
2. **Get BOSIET/GWO first** — without them an agency often cannot even put you forward.
3. **Show the relevant experience** — crane work, mooring, towing, DP hours, high voltage for engineers and ETOs.
4. **Apply to offshore-focused agencies** and watch the [offshore vacancies](/jobs/vessel/offshore).

A CV that puts the offshore points first helps — use the [offshore CV template](/maritime-cv/offshore). And remember: offshore training is paid to a training centre, while **the job itself costs a seafarer nothing**.$en$,
    'ru', $ru$Оффшор — это суда и объекты, которые обслуживают нефтегазовую отрасль и морскую ветроэнергетику. Многие моряки уходят туда ради вахт — часто «месяц через месяц» — и суточных ставок, которые обычно выше, чем в торговом флоте. Вход в оффшор устроен иначе, поэтому разберём, что нужно.

## Суда

- **PSV** (снабженцы платформ) возят на платформы грузы, топливо и воду.
- **AHTS** (буксиры-якорезаводчики) буксируют буровые установки и работают с их якорями.
- **SOV и CTV** обслуживают морские ветропарки: SOV неделями живёт рядом с парком вместе с техниками, CTV возит их туда на день.
- **Строительные, водолазные и исследовательские суда**, самоподъёмные и монтажные установки.

На большинстве из них стоит система **динамического позиционирования (DP)**.

## Какие сертификаты спрашивают в оффшоре

Кроме сертификатов STCW и медкомиссии моряка, в оффшоре обычно нужны:

- **OPITO BOSIET** (базовая оффшорная подготовка по безопасности) с модулем **CA-EBS** — выживание на море, эвакуация из вертолёта под водой (HUET), борьба с пожаром и первая помощь. Обычно действует **4 года** и продлевается курсом **FOET**.
- **Оффшорная медкомиссия** — для Великобритании и Северного моря сертификат **OEUK**, обычно на срок до **2 лет**.
- Для ветропарков — **GWO Basic Safety Training**: первая помощь, перемещение грузов, пожарная безопасность, работа на высоте и выживание на море; действует **24 месяца**.
- Для офицеров на судах с DP — **сертификат DP**; см. наш гайд о курсе DP-оператора.

Требования зависят от региона и заказчика, поэтому прежде чем платить за курс, проверьте, что указано в вакансии.

## Первый контракт без оффшорного опыта

1. **Начните со смежной должности.** Штурманов, механиков, матросов и мотористов с опытом в торговом флоте берут в оффшор постоянно: им не хватает оффшорных сертификатов, а не морского опыта.
2. **Сначала получите BOSIET/GWO** — без них агентство часто даже не может выдвинуть вашу кандидатуру.
3. **Покажите нужный опыт** — работа с кранами, швартовки, буксировка, часы DP, высокое напряжение для механиков и ETO.
4. **Обращайтесь в агентства, работающие с оффшором**, и следите за [оффшорными вакансиями](/ru/jobs/vessel/offshore).

Поможет CV, в котором оффшорное стоит первым, — воспользуйтесь [шаблоном CV для оффшора](/ru/maritime-cv/offshore). И помните: за оффшорные курсы платят учебному центру, а **сама работа моряку ничего не стоит**.$ru$,
    'ua', $ua$Офшор — це судна й об'єкти, які обслуговують нафтогазову галузь і морську вітроенергетику. Багато моряків ідуть туди заради вахт — часто «місяць через місяць» — і добових ставок, які зазвичай вищі, ніж у торговому флоті. Вхід в офшор влаштований інакше, тож розберімо, що потрібно.

## Судна

- **PSV** (постачальники платформ) возять на платформи вантажі, паливо й воду.
- **AHTS** (буксири-якорезавідники) буксирують бурові установки й працюють з їхніми якорями.
- **SOV і CTV** обслуговують морські вітропарки: SOV тижнями живе поруч із парком разом із техніками, CTV возить їх туди на день.
- **Будівельні, водолазні та дослідницькі судна**, самопідйомні й монтажні установки.

На більшості з них стоїть система **динамічного позиціонування (DP)**.

## Які сертифікати питають в офшорі

Окрім сертифікатів STCW і медкомісії моряка, в офшорі зазвичай потрібні:

- **OPITO BOSIET** (базова офшорна підготовка з безпеки) з модулем **CA-EBS** — виживання на морі, евакуація з гелікоптера під водою (HUET), боротьба з пожежею й перша допомога. Зазвичай діє **4 роки** й подовжується курсом **FOET**.
- **Офшорна медкомісія** — для Великої Британії та Північного моря сертифікат **OEUK**, зазвичай на строк до **2 років**.
- Для вітропарків — **GWO Basic Safety Training**: перша допомога, переміщення вантажів, пожежна безпека, робота на висоті й виживання на морі; діє **24 місяці**.
- Для офіцерів на суднах із DP — **сертифікат DP**; див. наш гайд про курс DP-оператора.

Вимоги залежать від регіону й замовника, тож перш ніж платити за курс, перевірте, що вказано у вакансії.

## Перший контракт без офшорного досвіду

1. **Почніть із суміжної посади.** Штурманів, механіків, матросів і мотористів з досвідом у торговому флоті беруть в офшор постійно: їм бракує офшорних сертифікатів, а не морського досвіду.
2. **Спершу отримайте BOSIET/GWO** — без них агентство часто навіть не може висунути вашу кандидатуру.
3. **Покажіть потрібний досвід** — робота з кранами, швартування, буксирування, години DP, висока напруга для механіків і ETO.
4. **Звертайтеся до агентств, що працюють з офшором**, і стежте за [офшорними вакансіями](/ua/jobs/vessel/offshore).

Допоможе CV, у якому офшорне стоїть першим, — скористайтеся [шаблоном CV для офшору](/ua/maritime-cv/offshore). І пам'ятайте: за офшорні курси платять навчальному центру, а **сама робота моряку нічого не коштує**.$ua$,
    'pl', $pl$Offshore to statki i jednostki obsługujące przemysł naftowy, gazowy i morską energetykę wiatrową. Wielu marynarzy przechodzi tam ze względu na system rotacyjny — często tyle samo czasu na statku i w domu — oraz stawki dzienne, zwykle wyższe niż we flocie handlowej. Wejście do offshore wygląda inaczej, więc oto, czego potrzebujesz.

## Jednostki

- **PSV** (statki zaopatrzeniowe) dowożą na platformy ładunki, paliwo i wodę.
- **AHTS** (holowniki do obsługi kotwic) holują platformy wiertnicze i obsługują ich kotwice.
- **SOV i CTV** obsługują morskie farmy wiatrowe: SOV przez tygodnie stoi przy farmie z technikami na pokładzie, CTV dowozi ich na jeden dzień.
- **Statki budowlane, do wsparcia nurkowego i badawcze**, platformy samopodnośne i instalacyjne.

Większość z nich korzysta z **dynamicznego pozycjonowania (DP)**.

## Jakich certyfikatów wymaga offshore

Oprócz certyfikatów STCW i świadectwa zdrowia marynarza offshore zwykle wymaga:

- **OPITO BOSIET** z modułem **CA-EBS** — przetrwanie na morzu, ewakuacja ze śmigłowca pod wodą (HUET), gaszenie pożarów i pierwsza pomoc. Zwykle ważny **4 lata**, odnawiany kursem **FOET**.
- **Badania offshore** — dla Wielkiej Brytanii i Morza Północnego certyfikat **OEUK**, zwykle ważny do **2 lat**.
- Dla farm wiatrowych — **GWO Basic Safety Training**: pierwsza pomoc, ręczne przenoszenie ładunków, ochrona przeciwpożarowa, praca na wysokości i przetrwanie na morzu; ważny **24 miesiące**.
- Dla oficerów na jednostkach DP — **certyfikat DP**; zobacz nasz poradnik o kursie DP operatora.

Wymagania zależą od regionu i klienta, więc zanim zapłacisz za kurs, sprawdź, co jest w ofercie.

## Pierwszy kontrakt bez doświadczenia w offshore

1. **Zacznij od pokrewnego stanowiska.** Oficerów, mechaników, marynarzy (AB) i motorzystów z doświadczeniem we flocie handlowej zatrudnia się w offshore codziennie — brakuje im certyfikatów offshore, a nie doświadczenia morskiego.
2. **Najpierw zrób BOSIET/GWO** — bez nich agencja często nie może nawet zgłosić Twojej kandydatury.
3. **Pokaż przydatne doświadczenie** — praca z dźwigami, cumowanie, holowanie, godziny DP, wysokie napięcie dla mechaników i ETO.
4. **Aplikuj do agencji specjalizujących się w offshore** i śledź [oferty offshore](/pl/jobs/vessel/offshore).

Pomoże CV, w którym offshore jest na pierwszym miejscu — skorzystaj z [szablonu CV offshore](/pl/maritime-cv/offshore). I pamiętaj: za kursy offshore płaci się ośrodkowi szkoleniowemu, a **sama praca nic marynarza nie kosztuje**.$pl$),
  'Offshore', 'guide',
  'linear-gradient(135deg,#0e2a45,#13647a)',
  true, '2026-10-08 11:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'How to get into offshore: certificates, vessels and the first contract');

-- ── 35. Oiler / motorman offshore ────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Oiler and motorman jobs offshore: duties, certificates and how to get hired',
    'ru', 'Oiler и моторист в оффшоре: обязанности, сертификаты и как устроиться',
    'ua', 'Oiler і моторист в офшорі: обов''язки, сертифікати та як влаштуватися',
    'pl', 'Oiler i motorzysta w offshore: obowiązki, certyfikaty i jak dostać pracę'),
  jsonb_build_object(
    'en', $en$The oiler — on many ships called the motorman — is the engine-room rating who keeps machinery running between the engineers' checks. Offshore vessels carry a lot of machinery for their size: several diesel generators, thrusters, cranes and pumps — so experienced engine ratings are steadily in demand.

## What an oiler does offshore

- **Engine-room rounds** — temperatures, pressures, levels, leaks — and keeping the log.
- **Lubrication and topping up** of engines, gearboxes and thrusters.
- **Planned maintenance** with the engineers: filters, purifiers, pumps, generators.
- **Fuel and water transfers** to platforms — a routine job on supply vessels.
- **Keeping the engine room clean** and helping with repairs.

## Certificates

- **Engine rating certificate** — rating forming part of an engineering watch (STCW III/4), or able seafarer engine (III/5) for a senior rating.
- **STCW basic training** and a seafarer medical.
- **Offshore safety training** — usually **OPITO BOSIET** with CA-EBS, renewed with FOET every 4 years; **GWO** for wind farm vessels.
- **An offshore medical** where the client requires it (OEUK for the North Sea).

## What helps you get hired

- Experience on **diesel-electric** plants, **thrusters** and **high-speed engines** — common on offshore vessels.
- Welding or workshop skills.
- English good enough for the engine-room team and safety briefings.
- A clear CV that lists the engines and vessel types you worked with.

## Rotation and pay

Offshore oilers usually work on rotation and are often paid a **day rate**; the level depends on the region, the client and the vessel. Current offers with pay are on the [oiler vacancies](/jobs/rank/oiler) and [motorman vacancies](/jobs/rank/motorman) pages, and all offshore postings are under [offshore jobs](/jobs/vessel/offshore).

New to offshore? Read our guide on how to get into offshore first, then put the engines and certificates up front in your CV with the [offshore template](/maritime-cv/offshore).$en$,
    'ru', $ru$Oiler — на многих судах его называют мотористом — член машинной команды, который следит за механизмами между проверками механиков. На оффшорных судах для их размера очень много техники: несколько дизель-генераторов, подруливающие устройства, краны и насосы, — поэтому опытные мотористы нужны постоянно.

## Чем занимается oiler в оффшоре

- **Обходы машинного отделения** — температуры, давления, уровни, протечки — и записи в журнал.
- **Смазка и доливка** двигателей, редукторов и подруливающих устройств.
- **Плановое обслуживание** вместе с механиками: фильтры, сепараторы, насосы, генераторы.
- **Передача топлива и воды** на платформы — обычная работа на снабженцах.
- **Чистота машинного отделения** и помощь в ремонтах.

## Сертификаты

- **Свидетельство моториста** — рядовой состав машинной вахты (STCW III/4) или квалифицированный моторист (III/5) для старшего рядового.
- **Базовая подготовка STCW** и медкомиссия моряка.
- **Оффшорная подготовка по безопасности** — обычно **OPITO BOSIET** с CA-EBS, продлевается курсом FOET каждые 4 года; **GWO** — для судов ветропарков.
- **Оффшорная медкомиссия**, если её требует заказчик (OEUK для Северного моря).

## Что помогает устроиться

- Опыт с **дизель-электрическими** установками, **подруливающими устройствами** и **высокооборотными двигателями** — они часто стоят на оффшорных судах.
- Навыки сварки и работы в мастерской.
- Английский на уровне, достаточном для машинной команды и инструктажей по безопасности.
- Понятное CV со списком двигателей и типов судов, на которых вы работали.

## Ротация и оплата

Мотористы в оффшоре обычно работают вахтами, оплата часто **посуточная**; её уровень зависит от региона, заказчика и судна. Актуальные предложения с зарплатами — на страницах [вакансий oiler](/ru/jobs/rank/oiler) и [вакансий моториста](/ru/jobs/rank/motorman), а все оффшорные вакансии — в разделе [работа в оффшоре](/ru/jobs/vessel/offshore).

Впервые в оффшоре? Сначала прочитайте наш гайд о том, как попасть в оффшор, а затем вынесите двигатели и сертификаты в начало CV с помощью [шаблона для оффшора](/ru/maritime-cv/offshore).$ru$,
    'ua', $ua$Oiler — на багатьох суднах його називають мотористом — член машинної команди, який стежить за механізмами між перевірками механіків. На офшорних суднах для їхнього розміру дуже багато техніки: кілька дизель-генераторів, підрулювальні пристрої, крани й насоси, — тож досвідчені мотористи потрібні постійно.

## Чим займається oiler в офшорі

- **Обходи машинного відділення** — температури, тиски, рівні, протікання — і записи в журнал.
- **Мащення й доливання** двигунів, редукторів і підрулювальних пристроїв.
- **Планове обслуговування** разом із механіками: фільтри, сепаратори, насоси, генератори.
- **Передавання палива й води** на платформи — звичайна робота на постачальниках.
- **Чистота машинного відділення** й допомога в ремонтах.

## Сертифікати

- **Свідоцтво моториста** — рядовий склад машинної вахти (STCW III/4) або кваліфікований моторист (III/5) для старшого рядового.
- **Базова підготовка STCW** і медкомісія моряка.
- **Офшорна підготовка з безпеки** — зазвичай **OPITO BOSIET** з CA-EBS, подовжується курсом FOET кожні 4 роки; **GWO** — для суден вітропарків.
- **Офшорна медкомісія**, якщо її вимагає замовник (OEUK для Північного моря).

## Що допомагає влаштуватися

- Досвід із **дизель-електричними** установками, **підрулювальними пристроями** й **високообертовими двигунами** — вони часто стоять на офшорних суднах.
- Навички зварювання й роботи в майстерні.
- Англійська на рівні, достатньому для машинної команди та інструктажів із безпеки.
- Зрозуміле CV зі списком двигунів і типів суден, на яких ви працювали.

## Ротація й оплата

Мотористи в офшорі зазвичай працюють вахтами, оплата часто **подобова**; її рівень залежить від регіону, замовника й судна. Актуальні пропозиції із зарплатами — на сторінках [вакансій oiler](/ua/jobs/rank/oiler) і [вакансій моториста](/ua/jobs/rank/motorman), а всі офшорні вакансії — у розділі [робота в офшорі](/ua/jobs/vessel/offshore).

Уперше в офшорі? Спершу прочитайте наш гайд про те, як потрапити в офшор, а потім винесіть двигуни й сертифікати на початок CV за допомогою [шаблону для офшору](/ua/maritime-cv/offshore).$ua$,
    'pl', $pl$Oiler — na wielu statkach nazywany motorzystą — to członek załogi maszynowej, który pilnuje maszyn między obchodami mechaników. Jednostki offshore mają jak na swoją wielkość bardzo dużo urządzeń: kilka zespołów prądotwórczych, pędniki, dźwigi i pompy — dlatego doświadczeni motorzyści są stale poszukiwani.

## Czym zajmuje się oiler w offshore

- **Obchody maszynowni** — temperatury, ciśnienia, poziomy, przecieki — i wpisy do dziennika.
- **Smarowanie i uzupełnianie** silników, przekładni i pędników.
- **Planowa obsługa** razem z mechanikami: filtry, wirówki, pompy, generatory.
- **Przekazywanie paliwa i wody** na platformy — codzienność na statkach zaopatrzeniowych.
- **Porządek w maszynowni** i pomoc przy naprawach.

## Certyfikaty

- **Świadectwo motorzysty** — członek wachty maszynowej (STCW III/4) lub starszy motorzysta (III/5).
- **Podstawowe szkolenia STCW** i świadectwo zdrowia marynarza.
- **Szkolenie bezpieczeństwa offshore** — zwykle **OPITO BOSIET** z CA-EBS, odnawiany kursem FOET co 4 lata; **GWO** — na statki farm wiatrowych.
- **Badania offshore**, jeśli wymaga ich klient (OEUK dla Morza Północnego).

## Co pomaga dostać pracę

- Doświadczenie z napędami **spalinowo-elektrycznymi**, **pędnikami** i **silnikami szybkoobrotowymi** — częstymi na jednostkach offshore.
- Umiejętności spawania i pracy w warsztacie.
- Angielski wystarczający do pracy z mechanikami i odpraw bezpieczeństwa.
- Przejrzyste CV z listą silników i typów statków, na których pracowałeś.

## Rotacja i wynagrodzenie

Motorzyści w offshore zwykle pracują w systemie rotacyjnym, często za **stawkę dzienną**; jej wysokość zależy od regionu, klienta i jednostki. Aktualne oferty z wynagrodzeniem znajdziesz na stronach [oiler](/pl/jobs/rank/oiler) i [motorzysta](/pl/jobs/rank/motorman), a wszystkie oferty offshore — w dziale [praca offshore](/pl/jobs/vessel/offshore).

Nowy w offshore? Najpierw przeczytaj nasz poradnik o tym, jak zacząć pracę w offshore, a potem przenieś silniki i certyfikaty na początek CV dzięki [szablonowi offshore](/pl/maritime-cv/offshore).$pl$),
  'Offshore', 'guide',
  'linear-gradient(135deg,#0e2a45,#a5521d)',
  true, '2026-10-08 11:10:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Oiler and motorman jobs offshore: duties, certificates and how to get hired');

-- ── 36. Steward / stewardess offshore ────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Steward and stewardess jobs offshore: catering crew on vessels and platforms',
    'ru', 'Стюард и стюардесса в оффшоре: работа камбуза на судах и платформах',
    'ua', 'Стюард і стюардеса в офшорі: робота камбуза на суднах і платформах',
    'pl', 'Steward i stewardesa w offshore: praca w kuchni na statkach i platformach'),
  jsonb_build_object(
    'en', $en$Offshore vessels and accommodation units often carry many more people than a merchant ship: technicians, divers, surveyors and client staff on top of the crew. Feeding and housing them is the job of the catering team — stewards, stewardesses, cooks and chief cooks. It is one of the ways into offshore that does not start with a nautical school.

## What a steward or stewardess does

- **Cabins and accommodation** — cleaning, linen, laundry.
- **The mess room** — setting up, serving, clearing, keeping it clean.
- **Helping the cook** in the galley — preparation, dishwashing, storage.
- **Provisions** — receiving stores and keeping the storerooms in order.
- On larger units, **night shifts** and work for 50–100+ people.

## Documents and certificates

- **STCW basic training** — the same as for any seafarer.
- A **seafarer medical**, and an **offshore medical** where the client requires it (OEUK in the North Sea).
- **Offshore safety training** — usually **OPITO BOSIET** with CA-EBS (valid 4 years, renewed with FOET); **GWO** on wind-farm vessels.
- A **food hygiene / food safety certificate** — catering roles almost always need one.
- For cooks: a **ship's cook certificate** — under MLC 2006 the person cooking for the crew must be trained and qualified.
- A seaman's book and passport.

## What helps you get hired

- Experience in **hotels, restaurants or catering** — this matters more than sea time for a first offshore contract.
- **English** for working with an international crew and clients.
- Reliability and stamina: shifts are long and the work is physical.

## Rotation and where to look

Offshore catering usually works on rotation, often on a day rate. Look for **steward**, **messman** and **cook** postings: see [messman / steward vacancies](/jobs/rank/messman), [cook vacancies](/jobs/rank/cook) and all [offshore jobs](/jobs/vessel/offshore). Cruise ships also hire large hotel departments — a related path covered in our cruise guide.

Never pay for a "guaranteed place" on a platform or vessel — offshore catering jobs are among the most faked. Courses are paid to a training centre; the job itself costs nothing.$en$,
    'ru', $ru$На оффшорных судах и жилых платформах людей часто намного больше, чем на торговом судне: кроме экипажа там техники, водолазы, сюрвейеры и представители заказчика. Накормить и разместить их — работа команды камбуза: стюардов, стюардесс, поваров и шеф-поваров. Это один из путей в оффшор, который начинается не с мореходки.

## Чем занимается стюард или стюардесса

- **Каюты и жилые помещения** — уборка, бельё, прачечная.
- **Столовая** — сервировка, подача, уборка, чистота.
- **Помощь повару** на камбузе — заготовка, мойка посуды, хранение продуктов.
- **Провизия** — приёмка и порядок в кладовых.
- На крупных объектах — **ночные смены** и работа на 50–100 и больше человек.

## Документы и сертификаты

- **Базовая подготовка STCW** — как у любого моряка.
- **Медкомиссия моряка**, а если требует заказчик — **оффшорная медкомиссия** (OEUK для Северного моря).
- **Оффшорная подготовка по безопасности** — обычно **OPITO BOSIET** с CA-EBS (действует 4 года, продлевается курсом FOET); **GWO** — на судах ветропарков.
- **Сертификат по гигиене питания (food hygiene / food safety)** — на камбузе он нужен почти всегда.
- Для поваров — **сертификат судового повара**: по MLC 2006 тот, кто готовит для экипажа, должен быть обучен и иметь квалификацию.
- Мореходная книжка и паспорт.

## Что помогает устроиться

- Опыт в **гостиницах, ресторанах или кейтеринге** — для первого оффшорного контракта он важнее морского стажа.
- **Английский** для работы с международным экипажем и заказчиками.
- Надёжность и выносливость: смены длинные, работа физическая.

## Ротация и где искать

Камбуз в оффшоре обычно работает вахтами, часто с посуточной оплатой. Ищите вакансии **steward**, **messman** и **cook**: смотрите [вакансии мессбоя / стюарда](/ru/jobs/rank/messman), [вакансии повара](/ru/jobs/rank/cook) и все [вакансии в оффшоре](/ru/jobs/vessel/offshore). Большие гостиничные службы набирают и круизные суда — это смежный путь, о нём наш гайд о круизах.

Никогда не платите за «гарантированное место» на платформе или судне — вакансии камбуза в оффшоре подделывают особенно часто. Курсы оплачиваются учебному центру, а сама работа ничего не стоит.$ru$,
    'ua', $ua$На офшорних суднах і житлових платформах людей часто набагато більше, ніж на торговому судні: окрім екіпажу там техніки, водолази, сюрвеєри та представники замовника. Нагодувати й розмістити їх — робота команди камбуза: стюардів, стюардес, кухарів і шеф-кухарів. Це один зі шляхів в офшор, що починається не з мореходки.

## Чим займається стюард або стюардеса

- **Каюти й житлові приміщення** — прибирання, білизна, пральня.
- **Їдальня** — сервірування, подача, прибирання, чистота.
- **Допомога кухарю** на камбузі — заготівля, миття посуду, зберігання продуктів.
- **Провізія** — приймання й порядок у коморах.
- На великих об'єктах — **нічні зміни** й робота на 50–100 і більше осіб.

## Документи й сертифікати

- **Базова підготовка STCW** — як у будь-якого моряка.
- **Медкомісія моряка**, а якщо вимагає замовник — **офшорна медкомісія** (OEUK для Північного моря).
- **Офшорна підготовка з безпеки** — зазвичай **OPITO BOSIET** з CA-EBS (діє 4 роки, подовжується курсом FOET); **GWO** — на суднах вітропарків.
- **Сертифікат із гігієни харчування (food hygiene / food safety)** — на камбузі він потрібен майже завжди.
- Для кухарів — **сертифікат суднового кухаря**: за MLC 2006 той, хто готує для екіпажу, має бути навчений і кваліфікований.
- Послужна книжка й паспорт.

## Що допомагає влаштуватися

- Досвід у **готелях, ресторанах чи кейтерингу** — для першого офшорного контракту він важливіший за морський стаж.
- **Англійська** для роботи з міжнародним екіпажем і замовниками.
- Надійність і витривалість: зміни довгі, робота фізична.

## Ротація й де шукати

Камбуз в офшорі зазвичай працює вахтами, часто з подобовою оплатою. Шукайте вакансії **steward**, **messman** і **cook**: дивіться [вакансії месбоя / стюарда](/ua/jobs/rank/messman), [вакансії кухаря](/ua/jobs/rank/cook) і всі [вакансії в офшорі](/ua/jobs/vessel/offshore). Великі готельні служби набирають і круїзні судна — це суміжний шлях, про нього наш гайд про круїзи.

Ніколи не платіть за «гарантоване місце» на платформі чи судні — вакансії камбуза в офшорі підробляють особливо часто. Курси оплачуються навчальному центру, а сама робота нічого не коштує.$ua$,
    'pl', $pl$Na jednostkach offshore i platformach mieszkalnych często przebywa dużo więcej osób niż na statku handlowym: oprócz załogi technicy, nurkowie, geodeci i przedstawiciele klienta. Wyżywienie i zakwaterowanie ich to praca działu kuchennego — stewardów, stewardes, kucharzy i szefów kuchni. To jedna z dróg do offshore, która nie zaczyna się od szkoły morskiej.

## Czym zajmuje się steward lub stewardesa

- **Kabiny i pomieszczenia mieszkalne** — sprzątanie, pościel, pralnia.
- **Mesa** — nakrywanie, wydawanie posiłków, sprzątanie.
- **Pomoc kucharzowi** w kambuzie — przygotowanie, zmywanie, przechowywanie żywności.
- **Prowiant** — przyjmowanie dostaw i porządek w magazynach.
- Na dużych jednostkach — **nocne zmiany** i praca dla 50–100 i więcej osób.

## Dokumenty i certyfikaty

- **Podstawowe szkolenia STCW** — jak u każdego marynarza.
- **Świadectwo zdrowia marynarza**, a jeśli wymaga tego klient — **badania offshore** (OEUK na Morzu Północnym).
- **Szkolenie bezpieczeństwa offshore** — zwykle **OPITO BOSIET** z CA-EBS (ważny 4 lata, odnawiany kursem FOET); **GWO** na statkach farm wiatrowych.
- **Certyfikat z higieny żywności (food hygiene / food safety)** — w kuchni potrzebny niemal zawsze.
- Dla kucharzy — **świadectwo kucharza okrętowego**: zgodnie z MLC 2006 osoba gotująca dla załogi musi być przeszkolona i mieć kwalifikacje.
- Książeczka żeglarska i paszport.

## Co pomaga dostać pracę

- Doświadczenie w **hotelach, restauracjach lub cateringu** — przy pierwszym kontrakcie offshore ważniejsze niż staż na morzu.
- **Angielski** do pracy z międzynarodową załogą i klientami.
- Rzetelność i wytrzymałość: zmiany są długie, a praca fizyczna.

## Rotacja i gdzie szukać

Kuchnia w offshore zwykle pracuje w systemie rotacyjnym, często za stawkę dzienną. Szukaj ofert **steward**, **messman** i **cook**: zobacz [oferty messman / steward](/pl/jobs/rank/messman), [oferty dla kucharzy](/pl/jobs/rank/cook) i wszystkie [oferty offshore](/pl/jobs/vessel/offshore). Duże działy hotelowe mają też statki wycieczkowe — to pokrewna droga, opisana w naszym poradniku o rejsach.

Nigdy nie płać za „gwarantowane miejsce” na platformie czy statku — oferty pracy w kuchni offshore są fałszowane szczególnie często. Za kursy płaci się ośrodkowi szkoleniowemu, a sama praca nic nie kosztuje.$pl$),
  'Offshore', 'guide',
  'linear-gradient(135deg,#0e2a45,#7a3e8f)',
  true, '2026-10-08 11:20:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Steward and stewardess jobs offshore: catering crew on vessels and platforms');
