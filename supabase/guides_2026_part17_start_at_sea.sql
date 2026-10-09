-- Starting at sea (category = 'guide'), long format: without a maritime
-- education, on yachts, after 30, on fishing vessels. High-volume searches the
-- site had no page for.
--
-- Facts: STCW II/4, II/5, III/4, III/5, II/1 and III/1 (the 36-month routes
-- without an approved training programme), VI/1 (Basic Training), V/2
-- (passenger ship training), I/9 (medical); MLC 2006 Standard A1.4 (no fees
-- for recruitment), Regulation 3.2 (ship's cook); STCW-F 1995 (in force 2012)
-- for fishing vessel personnel, and ILO Work in Fishing Convention C188 (in
-- force 2017: minimum age 16, medical certificate, written work agreement,
-- rest hours, no recruitment fees). STCW sets no upper age limit. Yacht
-- practice (ENG1, RYA Powerboat Level 2, food hygiene, seasons, dockwalking)
-- is written as common practice, not as a rule. No salary figures.
--
-- pl + ru + ua + en. Covers are set at the end — run after the deploy that
-- adds public/guides/{seafarer-no-education,yacht-crew,seafarer-after-30,fishing-vessels}.png.
-- Idempotent — guarded by the English title.

-- ── 60. Without a maritime education ─────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'How to become a seafarer without a maritime education',
    'ru', 'Как стать моряком без морского образования',
    'ua', 'Як стати моряком без морської освіти',
    'pl', 'Jak zostać marynarzem bez wykształcenia morskiego'),
  jsonb_build_object(
    'en', $en$Most seafarers come to sea through a maritime academy or college — but not all of them, and not every job at sea needs one. Ratings on deck and in the engine room, cooks and stewards, hotel staff on cruise ships and yacht crew all start with a few short courses and the right documents. Even the officer's certificate can be reached without an academy, by a longer road. This guide explains which jobs are open, what you need for each, the order to get the documents in, and how to avoid the people who sell "guaranteed jobs at sea".

## Which jobs do not need a maritime education

- **Ordinary seaman (OS)** — the entry rank on deck: maintenance, mooring, lookout.
- **Wiper** — the entry rank in the engine room: cleaning, helping the engineers and motormen.
- **Messman and steward** — the galley and accommodation on cargo ships.
- **Cook** — a cook's qualification is needed, but not a maritime one (see our guide on the ship's cook).
- **Cruise ship hotel jobs** — waiters, cabin stewards, bar, kitchen, entertainment, spa: hundreds of jobs on one ship.
- **Yacht crew** — deckhands and stewardesses on private and charter yachts.
- **Fishing vessels** — deckhands and processing crew, under their own rules.

Skilled shore workers have shortcuts: an electrician can become a ship's **electrician** (STCW III/7) with as little as three months at sea, a welder or machinist can go as a **fitter**, a mechanic as a **motorman**.

## The documents, in order

1. **Passport.**
2. **Seafarer medical certificate** — from a doctor approved by your maritime administration; valid for up to two years.
3. **Basic Training** (STCW VI/1) — fire-fighting, survival at sea, first aid, personal safety and social responsibility. About a week at an approved training centre; refreshed every five years.
4. **Security Awareness** — a short course.
5. **Seaman's book** — issued by your maritime administration.
6. For passenger ships — **crowd management and passenger ship training** (STCW V/2).

That is enough to apply for an entry job. The rating certificates — **watch rating** on deck (STCW II/4) or in the engine room (III/4) — need sea service or approved training and usually come after the first contract.

## The road to officer without an academy

STCW allows the officer-of-the-watch certificate — on deck (II/1) or in the engine room (III/1) — without an approved training programme, if you have at least **36 months** of approved sea service (for engineers, with workshop training, and at least 30 months in the engine department) and pass the exams of your maritime administration. It is slow — three years of sea time as a rating — and the exams are the same as for academy graduates. But many captains and chief engineers started exactly this way.

## How to get the first contract

1. **Do the documents first.** Without Basic Training and a medical, nobody will consider you.
2. **Learn basic English.** Commands, safety words, numbers. For hotel jobs on cruise ships, English is the main requirement.
3. **Choose the door that fits you**: deck, engine room, galley, hotel, yacht, fishing.
4. **Apply to licensed agencies** and check them before you sign — in Poland in the KRAZ register, elsewhere with your maritime administration.
5. **Accept the first honest contract.** Sea time matters more than the vessel type at the start.

## Never pay for a job

Under the Maritime Labour Convention (MLC 2006, Standard A1.4), recruitment and placement must not be charged to the seafarer. You pay for your own courses, medical and documents — but never for "a place on a ship", "registration in the database" or a "guaranteed contract". Beginners are the main target of these scams. A real agency is paid by the shipowner.

## What the first contract is like

- **Length:** usually 6–9 months for ratings; less than 12 months on board under MLC 2006.
- **Work:** physical, repetitive, often outdoors or in a hot engine room; 8–12 hours a day, with the right to at least 10 hours of rest in any 24.
- **Life:** a small cabin, shared mess, limited internet, a mixed crew of several nationalities.
- **Money:** food and accommodation on board are free, and the wage is usually paid monthly, often partly as an allotment to your family.

## Interview questions for a beginner

1. **"Why do you want to go to sea?"** Be honest and concrete.
2. **"What did you learn in Basic Training?"**
3. **"Have you worked with tools, in a kitchen, in a hotel?"** Any shore work counts.
4. **"Are you ready to be away for six months or more?"**
5. **"Can you understand these English words?"**

## FAQ

**Can I go to sea without any education?**
Yes — as an ordinary seaman, wiper, messman, cruise ship hotel crew or yacht crew, with Basic Training, a medical and a seaman's book.

**How long does it take to get the documents?**
Often two to four weeks, depending on the training centre and the administration's queue.

**Is there an age limit?**
STCW sets no upper limit; what matters is the medical. See our guide on going to sea after 30.

**Can I become a captain without an academy?**
Yes, through 36 months of approved sea service and the exams — a long road, but a real one.

## Jobs

Look at the [ordinary seaman](/jobs/rank/ordinary-seaman) and [messman](/jobs/rank/messman) vacancies, or the whole [jobs board](/jobs).

## Your CV

With no sea time yet, the [maritime CV](/maritime-cv) shows what you do have — courses, documents, languages, shore experience — in the order a crewing manager reads it.

*Requirements follow STCW and MLC 2006; your maritime administration may add its own. Check them before you pay for courses.*$en$,
    'ru', $ru$Большинство моряков приходят в море через морскую академию или колледж — но не все, и не для каждой работы в море он нужен. Рядовой состав на палубе и в машине, повара и стюарды, гостиничный персонал круизных лайнеров и экипажи яхт начинают с нескольких коротких курсов и правильных документов. Даже до офицерского диплома можно дойти без академии — просто дорога длиннее. В гайде — какие должности открыты, что нужно для каждой, в каком порядке получать документы и как не попасться тем, кто продаёт «гарантированную работу в море».

## Какие должности не требуют морского образования

- **Матрос второго класса (OS)** — начальная должность на палубе: обслуживание, швартовка, впередсмотрящий.
- **Вайпер** — начальная должность в машине: уборка, помощь механикам и мотористам.
- **Мессмен и стюард** — камбуз и жилые помещения на грузовых судах.
- **Повар** — нужна квалификация повара, но не морская (см. наш гайд о судовом поваре).
- **Гостиничные должности на круизных лайнерах** — официанты, стюарды кают, бар, кухня, анимация, спа: сотни вакансий на одном судне.
- **Экипаж яхт** — палубные матросы и стюардессы на частных и чартерных яхтах.
- **Рыболовные суда** — палубная команда и обработчики, по своим правилам.

У квалифицированных береговых работников есть короткие пути: электрик может стать **судовым электриком** (ПДНВ III/7) всего с тремя месяцами стажа в море, сварщик или токарь — уйти **фиттером**, автомеханик — **мотористом**.

## Документы по порядку

1. **Заграничный паспорт.**
2. **Медицинское свидетельство моряка** — у врача, признанного морской администрацией; действует до двух лет.
3. **Basic Training** (ПДНВ VI/1) — борьба с пожаром, выживание в море, первая помощь, личная безопасность и социальная ответственность. Около недели в одобренном учебном центре; переподготовка каждые пять лет.
4. **Security Awareness** — короткий курс.
5. **Мореходная книжка** — выдаёт морская администрация.
6. Для пассажирских судов — **курсы управления толпой и подготовки для пассажирских судов** (ПДНВ V/2).

Этого достаточно, чтобы подаваться на начальную должность. Свидетельства рядового состава — **матрос вахты** (ПДНВ II/4) или **моторист вахты** (III/4) — требуют стажа или одобренной подготовки и обычно приходят после первого контракта.

## Путь в офицеры без академии

ПДНВ допускает диплом вахтенного помощника (II/1) или вахтенного механика (III/1) без одобренной программы подготовки, если у вас не менее **36 месяцев** одобренного стажа (для механиков — с подготовкой в мастерских и не менее 30 месяцев в машинной службе) и вы сдали экзамены морской администрации. Это медленно — три года стажа рядовым, — а экзамены те же, что у выпускников академий. Но многие капитаны и стармехи начинали именно так.

## Как получить первый контракт

1. **Сначала документы.** Без Basic Training и медкомиссии вас не рассмотрят.
2. **Выучите базовый английский.** Команды, слова безопасности, числа. Для гостиничных должностей на круизных судах английский — главное требование.
3. **Выберите свою дверь**: палуба, машина, камбуз, гостиница, яхта, рыболовство.
4. **Подавайтесь в лицензированные агентства** и проверяйте их до подписания — в Польше по реестру KRAZ, в других странах через морскую администрацию.
5. **Соглашайтесь на первый честный контракт.** В начале стаж важнее типа судна.

## Никогда не платите за работу

По Конвенции о труде в морском судоходстве (MLC 2006, стандарт A1.4) услуги по найму и трудоустройству не должны оплачиваться моряком. Свои курсы, медкомиссию и документы вы оплачиваете сами — но никогда не «место на судне», «регистрацию в базе» или «гарантированный контракт». Новички — главная цель таких мошенников. Настоящему агентству платит судовладелец.

## Каким бывает первый контракт

- **Длительность:** обычно 6–9 месяцев для рядового состава; по MLC 2006 — меньше 12 месяцев на борту.
- **Работа:** физическая, однообразная, часто на открытой палубе или в жаркой машине; 8–12 часов в день, с правом на не менее 10 часов отдыха за любые 24.
- **Быт:** маленькая каюта, общая столовая, ограниченный интернет, смешанный экипаж из нескольких национальностей.
- **Деньги:** питание и проживание на борту бесплатны, зарплату обычно платят ежемесячно, часто частично переводом семье (аллотмент).

## Вопросы новичку на собеседовании

1. **«Почему вы хотите в море?»** Честно и конкретно.
2. **«Чему вас научили на Basic Training?»**
3. **«Работали ли вы с инструментом, на кухне, в гостинице?»** Любой береговой опыт засчитывается.
4. **«Готовы ли вы уехать на полгода и дольше?»**
5. **«Понимаете ли вы эти английские слова?»**

## Частые вопросы

**Можно ли уйти в море совсем без образования?**
Да — матросом второго класса, вайпером, мессменом, в гостиничный экипаж круизного судна или на яхту, с Basic Training, медкомиссией и мореходной книжкой.

**Сколько времени занимают документы?**
Часто от двух до четырёх недель — зависит от учебного центра и очереди в администрации.

**Есть ли возрастной предел?**
ПДНВ верхнего предела не устанавливает; важна медкомиссия. См. наш гайд о том, как уйти в море после 30.

**Можно ли стать капитаном без академии?**
Да, через 36 месяцев одобренного стажа и экзамены — долгий путь, но реальный.

## Вакансии

Смотрите вакансии [матроса второго класса](/ru/jobs/rank/ordinary-seaman) и [мессмена](/ru/jobs/rank/messman) или весь [список вакансий](/ru/jobs).

## Ваше CV

Пока стажа нет, [CV моряка](/ru/maritime-cv) показывает то, что у вас есть, — курсы, документы, языки, береговой опыт — в том порядке, в каком его читает крюинг-менеджер.

*Требования — по ПДНВ (STCW) и MLC 2006; морская администрация может добавлять свои. Уточняйте до того, как платить за курсы.*$ru$,
    'ua', $ua$Більшість моряків приходять у море через морську академію чи коледж — але не всі, і не для кожної роботи в морі вона потрібна. Рядовий склад на палубі й у машині, кухарі й стюарди, готельний персонал круїзних лайнерів і екіпажі яхт починають із кількох коротких курсів і правильних документів. Навіть до офіцерського диплома можна дійти без академії — просто дорога довша. У гайді — які посади відкриті, що потрібно для кожної, у якому порядку отримувати документи і як не потрапити до тих, хто продає «гарантовану роботу в морі».

## Які посади не потребують морської освіти

- **Матрос другого класу (OS)** — початкова посада на палубі: обслуговування, швартування, упередсмотрящий.
- **Вайпер** — початкова посада в машині: прибирання, допомога механікам і мотористам.
- **Месмен і стюард** — камбуз і житлові приміщення на вантажних суднах.
- **Кухар** — потрібна кваліфікація кухаря, але не морська (див. наш гайд про суднового кухаря).
- **Готельні посади на круїзних лайнерах** — офіціанти, стюарди кают, бар, кухня, анімація, спа: сотні вакансій на одному судні.
- **Екіпаж яхт** — палубні матроси й стюардеси на приватних і чартерних яхтах.
- **Рибальські судна** — палубна команда й обробники, за своїми правилами.

У кваліфікованих берегових працівників є короткі шляхи: електрик може стати **судновим електриком** (ПДНВ III/7) лише з трьома місяцями стажу в морі, зварник чи токар — піти **фітером**, автомеханік — **мотористом**.

## Документи по порядку

1. **Закордонний паспорт.**
2. **Медичне свідоцтво моряка** — у лікаря, визнаного морською адміністрацією; чинне до двох років.
3. **Basic Training** (ПДНВ VI/1) — боротьба з пожежею, виживання в морі, перша допомога, особиста безпека й соціальна відповідальність. Близько тижня в схваленому навчальному центрі; перепідготовка кожні п'ять років.
4. **Security Awareness** — короткий курс.
5. **Послужна книжка** — видає морська адміністрація.
6. Для пасажирських суден — **курси управління натовпом і підготовки для пасажирських суден** (ПДНВ V/2).

Цього досить, щоб подаватися на початкову посаду. Свідоцтва рядового складу — **матрос вахти** (ПДНВ II/4) чи **моторист вахти** (III/4) — потребують стажу або схваленої підготовки й зазвичай приходять після першого контракту.

## Шлях в офіцери без академії

ПДНВ допускає диплом вахтового помічника (II/1) чи вахтового механіка (III/1) без схваленої програми підготовки, якщо у вас щонайменше **36 місяців** схваленого стажу (для механіків — із підготовкою в майстернях і щонайменше 30 місяцями в машинній службі) і ви склали іспити морської адміністрації. Це повільно — три роки стажу рядовим, — а іспити ті самі, що й у випускників академій. Але багато капітанів і стармехів починали саме так.

## Як отримати перший контракт

1. **Спочатку документи.** Без Basic Training і медкомісії вас не розглянуть.
2. **Вивчіть базову англійську.** Команди, слова безпеки, числа. Для готельних посад на круїзних суднах англійська — головна вимога.
3. **Оберіть свої двері**: палуба, машина, камбуз, готель, яхта, рибальство.
4. **Подавайтеся в ліцензовані агентства** й перевіряйте їх до підписання — у Польщі за реєстром KRAZ, в інших країнах через морську адміністрацію.
5. **Погоджуйтеся на перший чесний контракт.** На початку стаж важливіший за тип судна.

## Ніколи не платіть за роботу

За Конвенцією про працю в морському судноплавстві (MLC 2006, стандарт A1.4) послуги з найму й працевлаштування не повинні оплачуватися моряком. Свої курси, медкомісію й документи ви оплачуєте самі — але ніколи не «місце на судні», «реєстрацію в базі» чи «гарантований контракт». Новачки — головна ціль таких шахраїв. Справжньому агентству платить судновласник.

## Яким буває перший контракт

- **Тривалість:** зазвичай 6–9 місяців для рядового складу; за MLC 2006 — менше 12 місяців на борту.
- **Робота:** фізична, одноманітна, часто на відкритій палубі чи в спекотній машині; 8–12 годин на день, із правом на щонайменше 10 годин відпочинку за будь-які 24.
- **Побут:** маленька каюта, спільна їдальня, обмежений інтернет, змішаний екіпаж із кількох національностей.
- **Гроші:** харчування й проживання на борту безкоштовні, зарплату зазвичай платять щомісяця, часто частково переказом родині (алотмент).

## Питання новачкові на співбесіді

1. **«Чому ви хочете в море?»** Чесно й конкретно.
2. **«Чого вас навчили на Basic Training?»**
3. **«Чи працювали ви з інструментом, на кухні, у готелі?»** Будь-який береговий досвід зараховується.
4. **«Чи готові ви поїхати на пів року й довше?»**
5. **«Чи розумієте ви ці англійські слова?»**

## Часті питання

**Чи можна піти в море зовсім без освіти?**
Так — матросом другого класу, вайпером, месменом, у готельний екіпаж круїзного судна чи на яхту, з Basic Training, медкомісією й послужною книжкою.

**Скільки часу займають документи?**
Часто від двох до чотирьох тижнів — залежить від навчального центру й черги в адміністрації.

**Чи є вікова межа?**
ПДНВ верхньої межі не встановлює; важлива медкомісія. Див. наш гайд про те, як піти в море після 30.

**Чи можна стати капітаном без академії?**
Так, через 36 місяців схваленого стажу й іспити — довгий шлях, але реальний.

## Вакансії

Дивіться вакансії [матроса другого класу](/ua/jobs/rank/ordinary-seaman) і [месмена](/ua/jobs/rank/messman) або весь [список вакансій](/ua/jobs).

## Ваше CV

Поки стажу немає, [CV моряка](/ua/maritime-cv) показує те, що у вас є, — курси, документи, мови, береговий досвід — у тому порядку, в якому його читає крюїнг-менеджер.

*Вимоги — за ПДНВ (STCW) і MLC 2006; морська адміністрація може додавати свої. Уточнюйте до того, як платити за курси.*$ua$,
    'pl', $pl$Większość marynarzy trafia na morze przez akademię lub szkołę morską — ale nie wszyscy i nie każda praca na morzu jej wymaga. Załoga szeregowa na pokładzie i w maszynowni, kucharze i stewardzi, personel hotelowy na wycieczkowcach i załogi jachtów zaczynają od kilku krótkich kursów i właściwych dokumentów. Nawet do dyplomu oficerskiego można dojść bez akademii — tylko droga jest dłuższa. W poradniku: które stanowiska są otwarte, czego potrzeba do każdego, w jakiej kolejności zdobywać dokumenty i jak nie dać się oszukać tym, którzy sprzedają „gwarantowaną pracę na morzu”.

## Które stanowiska nie wymagają wykształcenia morskiego

- **Młodszy marynarz (OS)** — stanowisko wejściowe na pokładzie: konserwacja, cumowanie, obserwacja.
- **Wiper** — stanowisko wejściowe w maszynowni: sprzątanie, pomoc mechanikom i motorzystom.
- **Messman i steward** — kambuz i pomieszczenia mieszkalne na statkach towarowych.
- **Kucharz** — potrzebne są kwalifikacje kucharskie, ale nie morskie (zob. nasz poradnik o kucharzu okrętowym).
- **Stanowiska hotelowe na wycieczkowcach** — kelnerzy, stewardzi kabinowi, bar, kuchnia, animacja, spa: setki ofert na jednym statku.
- **Załogi jachtów** — marynarze pokładowi i stewardesy na jachtach prywatnych i czarterowych.
- **Statki rybackie** — załoga pokładowa i przetwórcza, według własnych zasad.

Wykwalifikowani pracownicy z lądu mają skróty: elektryk może zostać **elektrykiem okrętowym** (STCW III/7) już po trzech miesiącach praktyki na morzu, spawacz lub tokarz — pójść jako **fitter**, mechanik samochodowy — jako **motorzysta**.

## Dokumenty po kolei

1. **Paszport.**
2. **Świadectwo zdrowia marynarza** — u lekarza uznanego przez administrację morską; ważne do dwóch lat.
3. **Basic Training** (STCW VI/1) — ochrona przeciwpożarowa, przetrwanie na morzu, pierwsza pomoc, bezpieczeństwo własne i odpowiedzialność społeczna. Około tygodnia w zatwierdzonym ośrodku; odnawiany co pięć lat.
4. **Security Awareness** — krótki kurs.
5. **Książeczka żeglarska** — wydaje administracja morska.
6. Na statki pasażerskie — **kursy kierowania tłumem i szkolenia dla statków pasażerskich** (STCW V/2).

To wystarczy, by aplikować na stanowisko wejściowe. Świadectwa załogi szeregowej — **marynarz wachty** na pokładzie (STCW II/4) lub w maszynowni (III/4) — wymagają praktyki lub zatwierdzonego szkolenia i przychodzą zwykle po pierwszym kontrakcie.

## Droga do stopnia oficera bez akademii

STCW dopuszcza dyplom oficera wachtowego — pokładowego (II/1) lub maszynowego (III/1) — bez zatwierdzonego programu szkolenia, jeśli masz co najmniej **36 miesięcy** zatwierdzonej praktyki (mechanicy — ze szkoleniem warsztatowym i co najmniej 30 miesiącami w dziale maszynowym) i zdasz egzaminy administracji morskiej. To powolne — trzy lata praktyki jako marynarz szeregowy — a egzaminy są takie same jak dla absolwentów akademii. Ale wielu kapitanów i starszych mechaników zaczynało właśnie tak.

## Jak zdobyć pierwszy kontrakt

1. **Najpierw dokumenty.** Bez Basic Training i świadectwa zdrowia nikt Cię nie rozważy.
2. **Naucz się podstaw angielskiego.** Komendy, słownictwo bezpieczeństwa, liczby. Na stanowiskach hotelowych na wycieczkowcach angielski to główny wymóg.
3. **Wybierz swoje drzwi**: pokład, maszynownia, kambuz, hotel, jacht, rybołówstwo.
4. **Aplikuj do licencjonowanych agencji** i sprawdzaj je przed podpisaniem — w Polsce w rejestrze KRAZ, w innych krajach w administracji morskiej.
5. **Przyjmij pierwszy uczciwy kontrakt.** Na początku praktyka liczy się bardziej niż typ statku.

## Nigdy nie płać za pracę

Zgodnie z Konwencją o pracy na morzu (MLC 2006, norma A1.4) marynarz nie może płacić za rekrutację i pośrednictwo. Za swoje kursy, badania i dokumenty płacisz sam — ale nigdy za „miejsce na statku”, „rejestrację w bazie” czy „gwarantowany kontrakt”. Początkujący to główny cel takich oszustów. Prawdziwej agencji płaci armator.

## Jak wygląda pierwszy kontrakt

- **Długość:** zwykle 6–9 miesięcy dla załogi szeregowej; według MLC 2006 — mniej niż 12 miesięcy na burcie.
- **Praca:** fizyczna, powtarzalna, często na otwartym pokładzie lub w gorącej maszynowni; 8–12 godzin dziennie, z prawem do co najmniej 10 godzin odpoczynku w każdych 24.
- **Życie:** mała kabina, wspólna mesa, ograniczony internet, mieszana załoga kilku narodowości.
- **Pieniądze:** wyżywienie i zakwaterowanie na burcie są bezpłatne, a pensja wypłacana zwykle co miesiąc, często częściowo przelewem dla rodziny (allotment).

## Pytania do początkującego na rozmowie

1. **„Dlaczego chce Pan iść na morze?”** Szczerze i konkretnie.
2. **„Czego nauczył się Pan na Basic Training?”**
3. **„Czy pracował Pan z narzędziami, w kuchni, w hotelu?”** Każde doświadczenie z lądu się liczy.
4. **„Czy jest Pan gotów wyjechać na pół roku i dłużej?”**
5. **„Czy rozumie Pan te angielskie słowa?”**

## Najczęstsze pytania

**Czy można iść na morze zupełnie bez wykształcenia?**
Tak — jako młodszy marynarz, wiper, messman, w załodze hotelowej wycieczkowca lub na jachcie, z Basic Training, świadectwem zdrowia i książeczką żeglarską.

**Ile trwa zdobycie dokumentów?**
Często od dwóch do czterech tygodni — zależy od ośrodka szkoleniowego i kolejki w administracji.

**Czy jest limit wieku?**
STCW nie określa górnej granicy; liczy się świadectwo zdrowia. Zob. nasz poradnik o pójściu na morze po trzydziestce.

**Czy można zostać kapitanem bez akademii?**
Tak, przez 36 miesięcy zatwierdzonej praktyki i egzaminy — długa droga, ale realna.

## Oferty pracy

Zobacz oferty dla [młodszych marynarzy](/pl/jobs/rank/ordinary-seaman) i [messmanów](/pl/jobs/rank/messman) albo całą [listę ofert](/pl/jobs).

## Twoje CV

Gdy praktyki jeszcze nie ma, [CV marynarza](/pl/maritime-cv) pokazuje to, co masz — kursy, dokumenty, języki, doświadczenie z lądu — w kolejności, w jakiej czyta je menedżer agencji.

*Wymagania według STCW i MLC 2006; administracja morska może dodawać własne. Sprawdź je, zanim zapłacisz za kursy.*$pl$),
  'Career', 'guide',
  'linear-gradient(135deg,#0e2a45,#1d6fa5)',
  true, '2026-10-13 09:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'How to become a seafarer without a maritime education');

-- ── 61. Yacht crew ───────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Working on a yacht without experience: deckhand and stewardess jobs, documents and how to start',
    'ru', 'Работа на яхте без опыта: матрос и стюардесса, документы и с чего начать',
    'ua', 'Робота на яхті без досвіду: матрос і стюардеса, документи та з чого почати',
    'pl', 'Praca na jachcie bez doświadczenia: marynarz pokładowy i stewardesa, dokumenty i jak zacząć'),
  jsonb_build_object(
    'en', $en$Superyachts — private and charter yachts of 24 metres and more — employ tens of thousands of crew worldwide, and the entry jobs, **deckhand** and **stewardess/steward**, do not need a maritime education. What they need is a few short courses, the right medical, a good CV and the persistence to look for work where the yachts are. This guide covers the jobs, the documents, the seasons, how crew actually get hired, and what life on a yacht is like.

## The entry jobs

- **Deckhand.** Washing and polishing the yacht, maintenance of the exterior, tenders and water toys, mooring and anchoring, keeping watch, and helping guests with water sports.
- **Stewardess / steward (interior).** Service at the table and on deck, cabin and laundry work, flowers and table settings, looking after guests — the yacht's hotel side.
- **Galley.** A **crew cook** or **chef** needs culinary qualifications; it is not an entry job, but good cooks move into yachting from restaurants.
- **Engineering.** Junior engineer roles exist, but need engineering qualifications — for many, the way in is from a mechanic's job ashore.

Larger yachts have bigger teams — bosun, lead deckhand, chief stew, second and third stews — and a clear path upwards.

## The documents

- **STCW Basic Training** (STCW VI/1) — fire-fighting, survival, first aid, personal safety. Required for every crew member.
- **A seafarer medical.** Many yachts — especially those under the Red Ensign flags — ask for the UK **ENG1** or an equivalent medical recognised by the flag.
- **Security:** Proficiency in Designated Security Duties (PDSD) is often asked for.
- **Deckhands:** a powerboat / tender driving certificate is commonly expected — the **RYA Powerboat Level 2** is the usual one.
- **Interior:** a **food safety and hygiene** certificate is useful, and hospitality courses help.
- **Passport and visas:** a Schengen visa (if you need one) for the Mediterranean; for the United States most yacht crew use a **B1/B2** visa — check the rules for your nationality and the yacht's situation.

None of these needs a maritime education; most take a few days each.

## The seasons and where to look

The superyacht year has two seasons:

- **Mediterranean summer**, roughly May to October — the busiest hiring is in spring.
- **Caribbean winter**, roughly December to April, with the Atlantic crossings in between.

Crew look for work in the yachting hubs: **Antibes and the Côte d'Azur**, **Palma de Mallorca**, **Fort Lauderdale**. Many start with **daywork** — paid short jobs on yachts preparing for the season — which often turns into a permanent position.

## How crew actually get hired

1. **A yacht CV.** One page, a professional photo (in yachting this is normal), your courses, languages, skills (hospitality, water sports, boating, cooking) and references.
2. **Yacht crew agencies.** Register with several; they place crew on yachts that do not advertise.
3. **Being where the yachts are.** "Dockwalking" — handing in CVs at marinas — and daywork remain a common first step in the hubs, where it is allowed.
4. **References.** Yachting is a small world; a good word from a captain or chief stew matters a lot.

## What life on a yacht is like

- **Long days in season.** When guests are on board, 12-hour days or more are common; off-charter, the schedule is calmer.
- **Shared cabins**, crew mess, and living with the same team for months.
- **Presentation matters.** Uniforms, grooming and discretion — guests often value privacy.
- **Tips.** On charter yachts, guests often leave a tip that is shared among the crew; it is common but never guaranteed.
- **Contracts and rights.** Commercially operated yachts fall under the Maritime Labour Convention through their flag's rules; private yachts may not, depending on the flag. Always get a written contract.

## Interview questions

1. **"Why yachting?"** Show that you understand the service side, not only the travel.
2. **"What water sports or boating experience do you have?"** (deck)
3. **"How would you handle a difficult guest request?"** (interior)
4. **"Are you available for the whole season?"**
5. **"What would you do if you saw a fire in the laundry?"** Basic Training in practice.

## Common mistakes

- **A CV without a photo or with an unprofessional one.**
- **Arriving after the season has started** — most hiring happens before it.
- **Paying someone for a "guaranteed yacht job".** Recruitment must not be charged to crew under MLC 2006; reputable agencies are paid by the yachts.
- **Only applying online** in an industry that still hires through people.

## FAQ

**Can I work on a yacht without experience?**
Yes — as a deckhand or stewardess, with STCW Basic Training, a seafarer medical and the right attitude.

**Do I need English?**
Yes — good spoken English is essential, especially for interior jobs. Other languages are a plus.

**Is it seasonal work?**
Some jobs are seasonal, others are permanent positions on yachts that work all year.

**Is a maritime education useful?**
Not required for entry jobs, but officer certificates are needed to move up to mate, captain or engineer.

## Jobs

Look for yacht vacancies on our [jobs board](/jobs?q=yacht).

## Your CV

The [maritime CV](/maritime-cv) builds a clean one-page CV from your profile, with your courses and languages where a crew agent looks first.

*Requirements depend on the yacht's flag and the country where you join. Check them with the agency before you pay for courses.*$en$,
    'ru', $ru$Суперъяхты — частные и чартерные яхты от 24 метров — дают работу десяткам тысяч членов экипажа по всему миру, а начальные должности, **палубный матрос (deckhand)** и **стюардесса/стюард**, не требуют морского образования. Нужны несколько коротких курсов, правильная медкомиссия, хорошее CV и упорство искать работу там, где стоят яхты. В гайде — должности, документы, сезоны, как на самом деле нанимают экипаж и какова жизнь на яхте.

## Начальные должности

- **Палубный матрос (deckhand).** Мойка и полировка яхты, уход за экстерьером, тендеры и водные игрушки, швартовка и якорь, вахты и помощь гостям с водными видами спорта.
- **Стюардесса / стюард (интерьер).** Сервировка и обслуживание за столом и на палубе, уборка кают и прачечная, цветы и оформление стола, забота о гостях — гостиничная часть яхты.
- **Камбуз.** **Повар экипажа** или **шеф** нужны с кулинарной квалификацией; это не начальная должность, но хорошие повара приходят на яхты из ресторанов.
- **Механика.** Должности младшего механика есть, но нужна техническая квалификация — для многих путь лежит через работу механиком на берегу.

На больших яхтах команды больше — боцман, старший матрос, шеф-стюардесса, вторая и третья стюардессы — и понятный путь наверх.

## Документы

- **STCW Basic Training** (ПДНВ VI/1) — борьба с пожаром, выживание, первая помощь, личная безопасность. Обязателен для всех.
- **Медкомиссия моряка.** Многие яхты — особенно под флагами группы Red Ensign — просят британский **ENG1** или равноценное свидетельство, признанное флагом.
- **Охрана:** часто просят Proficiency in Designated Security Duties (PDSD).
- **Палубным матросам:** обычно ждут удостоверение на управление тендером — чаще всего **RYA Powerboat Level 2**.
- **Интерьеру:** полезен сертификат по **гигиене и безопасности питания**, помогают курсы гостеприимства.
- **Паспорт и визы:** шенгенская виза (если нужна) для Средиземноморья; для США большинство экипажей яхт используют визу **B1/B2** — уточняйте правила для своего гражданства и ситуации яхты.

Ни для чего из этого не нужно морское образование; большинство курсов занимают по несколько дней.

## Сезоны и где искать

В году суперъяхт два сезона:

- **Средиземноморское лето**, примерно с мая по октябрь — больше всего найма весной.
- **Карибская зима**, примерно с декабря по апрель, с переходами через Атлантику между ними.

Работу ищут в яхтенных центрах: **Антиб и Лазурный берег**, **Пальма-де-Майорка**, **Форт-Лодердейл**. Многие начинают с **дейворка** (daywork) — оплачиваемых коротких работ на яхтах, которые готовятся к сезону, — и он часто превращается в постоянное место.

## Как на самом деле нанимают

1. **Яхтенное CV.** Одна страница, профессиональное фото (в яхтинге это норма), курсы, языки, навыки (сервис, водные виды спорта, лодки, кухня) и рекомендации.
2. **Яхтенные крюинговые агентства.** Зарегистрируйтесь в нескольких — они устраивают на яхты, которые не дают объявлений.
3. **Быть там, где яхты.** «Докволкинг» — разносить CV по маринам — и дейворк по-прежнему частый первый шаг в яхтенных центрах, там, где это разрешено.
4. **Рекомендации.** Яхтенный мир маленький; доброе слово капитана или шеф-стюардессы значит очень много.

## Какова жизнь на яхте

- **Длинные дни в сезон.** Когда на борту гости, обычны рабочие дни по 12 часов и больше; без чартера график спокойнее.
- **Общие каюты**, столовая экипажа и месяцы с одной и той же командой.
- **Внешний вид важен.** Форма, опрятность и деликатность — гости часто ценят приватность.
- **Чаевые.** На чартерных яхтах гости часто оставляют чаевые, которые делят на экипаж; это обычно, но никогда не гарантировано.
- **Контракт и права.** Коммерческие яхты подпадают под Конвенцию о труде в морском судоходстве через правила своего флага; частные — могут не подпадать, в зависимости от флага. Всегда берите письменный контракт.

## Вопросы на собеседовании

1. **«Почему яхтинг?»** Покажите, что понимаете сервис, а не только путешествия.
2. **«Какой у вас опыт с лодками и водными видами спорта?»** (палуба)
3. **«Как вы поступите с трудной просьбой гостя?»** (интерьер)
4. **«Вы свободны на весь сезон?»**
5. **«Что вы сделаете, если увидите пожар в прачечной?»** Basic Training на практике.

## Частые ошибки

- **CV без фото или с непрофессиональным фото.**
- **Приехать, когда сезон уже начался**, — основной найм идёт до него.
- **Платить кому-то за «гарантированную работу на яхте».** По MLC 2006 за трудоустройство с экипажа брать нельзя; добросовестным агентствам платят яхты.
- **Подаваться только онлайн** в отрасли, которая всё ещё нанимает через людей.

## Частые вопросы

**Можно ли работать на яхте без опыта?**
Да — палубным матросом или стюардессой, с STCW Basic Training, медкомиссией моряка и правильным настроем.

**Нужен ли английский?**
Да — хороший разговорный английский обязателен, особенно для интерьера. Другие языки — плюс.

**Это сезонная работа?**
Часть мест сезонные, другие — постоянные на яхтах, которые работают круглый год.

**Пригодится ли морское образование?**
Для начальных должностей не обязательно, но для роста до помощника, капитана или механика нужны офицерские дипломы.

## Вакансии

Ищите вакансии на яхтах на нашем [сайте вакансий](/ru/jobs?q=yacht).

## Ваше CV

[CV моряка](/ru/maritime-cv) соберёт аккуратное одностраничное CV из вашего профиля — с курсами и языками там, куда агент смотрит первым.

*Требования зависят от флага яхты и страны посадки. Уточняйте в агентстве, прежде чем платить за курсы.*$ru$,
    'ua', $ua$Суперяхти — приватні й чартерні яхти від 24 метрів — дають роботу десяткам тисяч членів екіпажу по всьому світу, а початкові посади, **палубний матрос (deckhand)** і **стюардеса/стюард**, не потребують морської освіти. Потрібні кілька коротких курсів, правильна медкомісія, добре CV й наполегливість шукати роботу там, де стоять яхти. У гайді — посади, документи, сезони, як насправді наймають екіпаж і яке життя на яхті.

## Початкові посади

- **Палубний матрос (deckhand).** Миття й полірування яхти, догляд за екстер'єром, тендери й водні іграшки, швартування й якір, вахти й допомога гостям із водними видами спорту.
- **Стюардеса / стюард (інтер'єр).** Сервірування й обслуговування за столом і на палубі, прибирання кают і пральня, квіти й оформлення столу, турбота про гостей — готельна частина яхти.
- **Камбуз.** **Кухар екіпажу** чи **шеф** потрібні з кулінарною кваліфікацією; це не початкова посада, але добрі кухарі приходять на яхти з ресторанів.
- **Механіка.** Посади молодшого механіка є, але потрібна технічна кваліфікація — для багатьох шлях лежить через роботу механіком на березі.

На великих яхтах команди більші — боцман, старший матрос, шеф-стюардеса, друга й третя стюардеси — і зрозумілий шлях угору.

## Документи

- **STCW Basic Training** (ПДНВ VI/1) — боротьба з пожежею, виживання, перша допомога, особиста безпека. Обов'язковий для всіх.
- **Медкомісія моряка.** Багато яхт — особливо під прапорами групи Red Ensign — просять британський **ENG1** або рівноцінне свідоцтво, визнане прапором.
- **Охорона:** часто просять Proficiency in Designated Security Duties (PDSD).
- **Палубним матросам:** зазвичай чекають посвідчення на керування тендером — найчастіше **RYA Powerboat Level 2**.
- **Інтер'єру:** корисний сертифікат із **гігієни й безпеки харчування**, допомагають курси гостинності.
- **Паспорт і візи:** шенгенська віза (якщо потрібна) для Середземномор'я; для США більшість екіпажів яхт використовують візу **B1/B2** — уточнюйте правила для свого громадянства й ситуації яхти.

Для жодного з цього не потрібна морська освіта; більшість курсів тривають по кілька днів.

## Сезони й де шукати

У році суперяхт два сезони:

- **Середземноморське літо**, приблизно з травня по жовтень — найбільше найму навесні.
- **Карибська зима**, приблизно з грудня по квітень, із переходами через Атлантику між ними.

Роботу шукають у яхтових центрах: **Антіб і Лазуровий берег**, **Пальма-де-Мальорка**, **Форт-Лодердейл**. Багато хто починає з **дейворку** (daywork) — оплачуваних коротких робіт на яхтах, що готуються до сезону, — і він часто перетворюється на постійне місце.

## Як насправді наймають

1. **Яхтове CV.** Одна сторінка, професійне фото (у яхтингу це норма), курси, мови, навички (сервіс, водні види спорту, човни, кухня) і рекомендації.
2. **Яхтові крюїнгові агентства.** Зареєструйтеся в кількох — вони влаштовують на яхти, які не дають оголошень.
3. **Бути там, де яхти.** «Доквокінг» — розносити CV маринами — і дейворк досі частий перший крок у яхтових центрах, там, де це дозволено.
4. **Рекомендації.** Яхтовий світ маленький; добре слово капітана чи шеф-стюардеси важить дуже багато.

## Яке життя на яхті

- **Довгі дні в сезон.** Коли на борту гості, звичні робочі дні по 12 годин і більше; без чартеру графік спокійніший.
- **Спільні каюти**, їдальня екіпажу й місяці з тією самою командою.
- **Зовнішній вигляд важливий.** Форма, охайність і делікатність — гості часто цінують приватність.
- **Чайові.** На чартерних яхтах гості часто залишають чайові, які ділять на екіпаж; це звично, але ніколи не гарантовано.
- **Контракт і права.** Комерційні яхти підпадають під Конвенцію про працю в морському судноплавстві через правила свого прапора; приватні — можуть не підпадати, залежно від прапора. Завжди беріть письмовий контракт.

## Питання на співбесіді

1. **«Чому яхтинг?»** Покажіть, що розумієте сервіс, а не лише подорожі.
2. **«Який у вас досвід із човнами й водними видами спорту?»** (палуба)
3. **«Як ви вчините з важким проханням гостя?»** (інтер'єр)
4. **«Ви вільні на весь сезон?»**
5. **«Що ви зробите, якщо побачите пожежу в пральні?»** Basic Training на практиці.

## Часті помилки

- **CV без фото або з непрофесійним фото.**
- **Приїхати, коли сезон уже почався**, — основний найм іде до нього.
- **Платити комусь за «гарантовану роботу на яхті».** За MLC 2006 за працевлаштування з екіпажу брати не можна; сумлінним агентствам платять яхти.
- **Подаватися лише онлайн** у галузі, яка досі наймає через людей.

## Часті питання

**Чи можна працювати на яхті без досвіду?**
Так — палубним матросом чи стюардесою, з STCW Basic Training, медкомісією моряка й правильним настроєм.

**Чи потрібна англійська?**
Так — добра розмовна англійська обов'язкова, особливо для інтер'єру. Інші мови — плюс.

**Це сезонна робота?**
Частина місць сезонні, інші — постійні на яхтах, які працюють цілий рік.

**Чи знадобиться морська освіта?**
Для початкових посад не обов'язково, але для зростання до помічника, капітана чи механіка потрібні офіцерські дипломи.

## Вакансії

Шукайте вакансії на яхтах на нашому [сайті вакансій](/ua/jobs?q=yacht).

## Ваше CV

[CV моряка](/ua/maritime-cv) збере охайне односторінкове CV з вашого профілю — з курсами й мовами там, куди агент дивиться першим.

*Вимоги залежать від прапора яхти й країни посадки. Уточнюйте в агентстві, перш ніж платити за курси.*$ua$,
    'pl', $pl$Superjachty — prywatne i czarterowe jachty od 24 metrów — dają pracę dziesiątkom tysięcy członków załóg na całym świecie, a stanowiska wejściowe, **marynarz pokładowy (deckhand)** i **stewardesa/steward**, nie wymagają wykształcenia morskiego. Potrzeba kilku krótkich kursów, właściwych badań, dobrego CV i wytrwałości w szukaniu pracy tam, gdzie stoją jachty. W poradniku: stanowiska, dokumenty, sezony, jak naprawdę zatrudnia się załogi i jak wygląda życie na jachcie.

## Stanowiska wejściowe

- **Marynarz pokładowy (deckhand).** Mycie i polerowanie jachtu, dbanie o zewnętrze, tendry i zabawki wodne, cumowanie i kotwiczenie, wachty i pomoc gościom przy sportach wodnych.
- **Stewardesa / steward (interior).** Serwis przy stole i na pokładzie, sprzątanie kabin i pralnia, kwiaty i nakrycia stołu, opieka nad gośćmi — hotelowa część jachtu.
- **Kambuz.** **Kucharz załogi** lub **szef kuchni** potrzebuje kwalifikacji kulinarnych; to nie jest stanowisko wejściowe, ale dobrzy kucharze przychodzą na jachty z restauracji.
- **Mechanika.** Stanowiska młodszego mechanika istnieją, ale wymagają kwalifikacji technicznych — dla wielu droga prowadzi przez pracę mechanika na lądzie.

Na większych jachtach zespoły są większe — bosman, starszy marynarz, szefowa stewardes, druga i trzecia stewardesa — i jest jasna droga w górę.

## Dokumenty

- **STCW Basic Training** (STCW VI/1) — ochrona przeciwpożarowa, przetrwanie, pierwsza pomoc, bezpieczeństwo własne. Wymagany od każdego członka załogi.
- **Badania marynarskie.** Wiele jachtów — zwłaszcza pod banderami grupy Red Ensign — prosi o brytyjskie **ENG1** lub równoważne świadectwo uznawane przez banderę.
- **Ochrona:** często wymagane jest Proficiency in Designated Security Duties (PDSD).
- **Marynarze pokładowi:** zwykle oczekuje się uprawnień do prowadzenia tendra — najczęściej **RYA Powerboat Level 2**.
- **Interior:** przydaje się certyfikat z **higieny i bezpieczeństwa żywności**, pomagają kursy hotelarskie.
- **Paszport i wizy:** wiza Schengen (jeśli potrzebna) na Morze Śródziemne; do USA większość załóg jachtów używa wizy **B1/B2** — sprawdź zasady dla swojego obywatelstwa i sytuacji jachtu.

Żaden z tych dokumentów nie wymaga wykształcenia morskiego; większość kursów trwa po kilka dni.

## Sezony i gdzie szukać

Rok superjachtów ma dwa sezony:

- **Lato na Morzu Śródziemnym**, mniej więcej od maja do października — najwięcej zatrudnień wiosną.
- **Zima na Karaibach**, mniej więcej od grudnia do kwietnia, z przejściami przez Atlantyk pomiędzy.

Pracy szuka się w centrach jachtowych: **Antibes i Lazurowe Wybrzeże**, **Palma de Mallorca**, **Fort Lauderdale**. Wielu zaczyna od **daywork** — płatnych krótkich prac na jachtach przygotowujących się do sezonu — które często zamieniają się w stałe stanowisko.

## Jak naprawdę zatrudnia się załogi

1. **Jachtowe CV.** Jedna strona, profesjonalne zdjęcie (w jachtingu to norma), kursy, języki, umiejętności (obsługa, sporty wodne, łodzie, gotowanie) i referencje.
2. **Agencje załóg jachtowych.** Zarejestruj się w kilku — obsadzają jachty, które nie publikują ogłoszeń.
3. **Być tam, gdzie są jachty.** „Dockwalking” — roznoszenie CV po marinach — i daywork to wciąż częsty pierwszy krok w centrach jachtowych, tam, gdzie jest to dozwolone.
4. **Referencje.** Świat jachtów jest mały; dobre słowo kapitana lub szefowej stewardes znaczy bardzo wiele.

## Jak wygląda życie na jachcie

- **Długie dni w sezonie.** Gdy na burcie są goście, 12-godzinne dni i dłuższe są normalne; poza czarterem grafik jest spokojniejszy.
- **Wspólne kabiny**, mesa załogi i miesiące z tym samym zespołem.
- **Wygląd ma znaczenie.** Mundury, schludność i dyskrecja — goście często cenią prywatność.
- **Napiwki.** Na jachtach czarterowych goście często zostawiają napiwek dzielony między załogę; to częste, ale nigdy niegwarantowane.
- **Umowa i prawa.** Jachty komercyjne podlegają Konwencji o pracy na morzu przez przepisy swojej bandery; prywatne mogą nie podlegać, zależnie od bandery. Zawsze bierz pisemną umowę.

## Pytania na rozmowie

1. **„Dlaczego jachting?”** Pokaż, że rozumiesz stronę usługową, a nie tylko podróże.
2. **„Jakie masz doświadczenie z łodziami i sportami wodnymi?”** (pokład)
3. **„Co zrobisz z trudną prośbą gościa?”** (interior)
4. **„Czy jesteś dostępny na cały sezon?”**
5. **„Co zrobisz, gdy zobaczysz pożar w pralni?”** Basic Training w praktyce.

## Częste błędy

- **CV bez zdjęcia lub z nieprofesjonalnym zdjęciem.**
- **Przyjazd, gdy sezon już się zaczął** — większość zatrudnień odbywa się przed nim.
- **Płacenie komuś za „gwarantowaną pracę na jachcie”.** Zgodnie z MLC 2006 załoga nie może płacić za pośrednictwo; rzetelnym agencjom płacą jachty.
- **Aplikowanie tylko online** w branży, która wciąż zatrudnia przez ludzi.

## Najczęstsze pytania

**Czy można pracować na jachcie bez doświadczenia?**
Tak — jako marynarz pokładowy lub stewardesa, ze STCW Basic Training, badaniami marynarskimi i właściwym nastawieniem.

**Czy potrzebny jest angielski?**
Tak — dobry angielski w mowie jest niezbędny, zwłaszcza w interiorze. Inne języki to plus.

**Czy to praca sezonowa?**
Część stanowisk jest sezonowa, inne są stałe na jachtach pływających cały rok.

**Czy wykształcenie morskie się przyda?**
Na stanowiskach wejściowych nie jest wymagane, ale awans na oficera, kapitana lub mechanika wymaga dyplomów oficerskich.

## Oferty pracy

Szukaj ofert na jachtach na naszym [portalu z ofertami](/pl/jobs?q=yacht).

## Twoje CV

[CV marynarza](/pl/maritime-cv) zbuduje schludne jednostronicowe CV z Twojego profilu — z kursami i językami tam, gdzie agent patrzy najpierw.

*Wymagania zależą od bandery jachtu i kraju zaokrętowania. Sprawdź je w agencji, zanim zapłacisz za kursy.*$pl$),
  'Yachts', 'guide',
  'linear-gradient(135deg,#0e2a45,#13647a)',
  true, '2026-10-13 09:10:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Working on a yacht without experience: deckhand and stewardess jobs, documents and how to start');

-- ── 62. After 30 ─────────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Becoming a seafarer after 30 (or 40): is it too late, and where to start',
    'ru', 'Как стать моряком после 30 (и 40): не поздно ли и с чего начать',
    'ua', 'Як стати моряком після 30 (і 40): чи не пізно і з чого почати',
    'pl', 'Jak zostać marynarzem po trzydziestce (i czterdziestce): czy nie za późno i od czego zacząć'),
  jsonb_build_object(
    'en', $en$"Is it too late?" is the question behind thousands of searches every month — from mechanics, electricians, cooks, drivers and office workers in their thirties and forties who want to go to sea. The short answer: there is no upper age limit in the international rules, and many crews have people who started late. The longer answer depends on what you already know how to do, what your health allows, and how long you are prepared to wait for an officer's rank. This guide gives the honest version.

## What the rules say

- **STCW sets no upper age limit** for any certificate. The minimums are 16 for some ratings and 18 for officers and senior ratings.
- **What decides is the medical.** A seafarer medical (valid for up to two years) checks eyesight, hearing, heart, general fitness — the same at 25 and at 45. If you pass, the rules do not care about your age.
- **Companies may have their own preferences.** Cadet programmes often prefer younger applicants; for ratings with useful skills, age matters much less.

## The fastest routes: use what you already know

Your shore experience is the strongest card you hold. Typical career changes:

- **Electrician → ship's electrician** (STCW III/7) with as little as three months of approved sea time, and later **ETO** (III/6).
- **Mechanic, machinist, welder → motorman or fitter** in the engine room.
- **Cook or chef → ship's cook**, under MLC 2006 Regulation 3.2, with a ship's cook certificate.
- **Hotel, restaurant, spa staff → cruise ship hotel department** — the largest single employer of career changers at sea.
- **Driver, builder, factory worker → ordinary seaman or wiper**, the entry ranks on deck and in the engine room.

In each case the documents are the same short list: **Basic Training**, a **seafarer medical**, **Security Awareness** and a **seaman's book** — plus the qualification you already have.

## The officer route after 30

Two ways:

1. **A maritime academy or college.** Some offer evening, extramural or accelerated programmes for adults; you still need the sea time as a cadet.
2. **Through the ratings.** STCW allows the officer-of-the-watch certificate — deck (II/1) or engine (III/1) — after at least **36 months** of approved sea service without an approved training programme, plus the exams.

Be realistic about the timeline: starting at 35 as an ordinary seaman, the earliest officer's certificate is usually around 38–40, and the senior ranks come years after that. Many people find a senior rating — bosun, motorman, fitter, electrician — a good and well-paid career in itself.

## What is harder after 30

- **Family and time away.** Six- to nine-month contracts for ratings are hard with small children; talk it through at home first.
- **Starting at the bottom.** You may take orders from a bosun ten years younger. People who accept this progress fastest.
- **Physical work.** Mooring, painting and engine-room heat are demanding at any age; the medical is the minimum, not the whole story.
- **Money at the start.** Courses and documents cost money before the first salary arrives — budget for a few weeks without income.

## What is easier after 30

- **Maturity.** Crewing managers often prefer calm, reliable people who finish contracts.
- **Skills.** A trade from shore can put you straight into a better-paid rank.
- **Motivation.** People who chose the sea deliberately tend to stay.

## How to get the first contract

1. **Pass the medical first** — before you spend money on courses.
2. **Do Basic Training and get a seaman's book.**
3. **Put your shore experience at the top of your CV**, with dates and specifics.
4. **Apply to licensed agencies** and to fleets that hire juniors.
5. **Never pay for a job.** Under MLC 2006 recruitment must not be charged to the seafarer — and career changers are a favourite target of "guaranteed job" scams.

## Interview questions you may get

1. **"Why the sea, now?"** Give a real reason, not a romantic one.
2. **"How does your family feel about long contracts?"**
3. **"Are you ready to take orders from younger crew members?"**
4. **"What skills from your previous job will you use on board?"**
5. **"Have you passed the seafarer medical?"**

## FAQ

**Is 35 too late to become a seafarer?**
No. There is no upper age limit in STCW; the medical decides.

**Is 45 too late?**
Not for rating jobs, especially with a useful trade. An officer's career takes years to build, so it is a longer bet.

**Will companies hire an inexperienced 40-year-old?**
Some will, especially as electrician, fitter, motorman, cook or hotel crew; for entry deck jobs it is harder but possible.

**Do I need an academy?**
No for ratings, cooks and hotel jobs; for officers there is the academy route or the 36-month route through the ratings.

## Jobs

Look at the vacancies for [electricians](/jobs/rank/electrician), [fitters](/jobs/rank/fitter), [motormen](/jobs/rank/motorman), [cooks](/jobs/rank/cook) and [ordinary seamen](/jobs/rank/ordinary-seaman).

## Your CV

The [maritime CV](/maritime-cv) puts your shore trade and your new courses together in the order a crewing manager reads them.

*Requirements follow STCW and MLC 2006; your maritime administration may add its own.*$en$,
    'ru', $ru$«Не поздно ли?» — вопрос, который стоит за тысячами запросов каждый месяц: от механиков, электриков, поваров, водителей и офисных работников за тридцать и сорок, которые хотят в море. Короткий ответ: в международных правилах нет верхнего предела возраста, и во многих экипажах есть люди, начавшие поздно. Длинный ответ зависит от того, что вы уже умеете, что позволяет здоровье и сколько вы готовы ждать офицерской должности. В гайде — честная версия.

## Что говорят правила

- **ПДНВ не устанавливает верхнего предела возраста** ни для одного диплома или свидетельства. Минимум — 16 лет для части рядовых и 18 для офицеров и старшего рядового состава.
- **Решает медкомиссия.** Медицинское свидетельство моряка (до двух лет) проверяет зрение, слух, сердце, общую годность — одинаково в 25 и в 45. Если вы её прошли, правилам ваш возраст безразличен.
- **У компаний могут быть свои предпочтения.** Кадетские программы часто предпочитают молодых; для рядового состава с полезной специальностью возраст значит гораздо меньше.

## Самые быстрые пути: используйте то, что уже умеете

Береговой опыт — ваш самый сильный козырь. Типичные смены профессии:

- **Электрик → судовой электрик** (ПДНВ III/7) всего с тремя месяцами одобренного стажа, а позже **электромеханик** (III/6).
- **Автомеханик, токарь, сварщик → моторист или фиттер** в машинном отделении.
- **Повар → судовой повар** по правилу 3.2 MLC 2006, со свидетельством судового повара.
- **Персонал гостиниц, ресторанов, спа → гостиничная служба круизных судов** — крупнейший работодатель для тех, кто меняет профессию.
- **Водитель, строитель, рабочий → матрос второго класса или вайпер** — начальные должности на палубе и в машине.

В каждом случае документы — тот же короткий список: **Basic Training**, **медкомиссия моряка**, **Security Awareness** и **мореходная книжка** — плюс квалификация, которая у вас уже есть.

## Путь в офицеры после 30

Два варианта:

1. **Морская академия или колледж.** Некоторые предлагают вечерние, заочные или ускоренные программы для взрослых; кадетский стаж всё равно нужен.
2. **Через рядовой состав.** ПДНВ допускает диплом вахтенного помощника (II/1) или вахтенного механика (III/1) после не менее **36 месяцев** одобренного стажа без одобренной программы подготовки, плюс экзамены.

Трезво оцените сроки: начав в 35 матросом второго класса, первый офицерский диплом обычно получают к 38–40, а старшие должности — годы спустя. Многие находят хорошую и достойно оплачиваемую карьеру в старшем рядовом составе — боцман, моторист, фиттер, электрик.

## Что труднее после 30

- **Семья и разлука.** Контракты рядового состава по 6–9 месяцев тяжелы с маленькими детьми; сначала обсудите это дома.
- **Начинать снизу.** Возможно, вы будете выполнять указания боцмана на десять лет моложе. Быстрее всех растут те, кто это принимает.
- **Физическая работа.** Швартовки, покраска и жара в машине тяжелы в любом возрасте; медкомиссия — это минимум, а не вся история.
- **Деньги на старте.** Курсы и документы стоят денег до первой зарплаты — заложите несколько недель без дохода.

## Что легче после 30

- **Зрелость.** Крюинг-менеджеры часто предпочитают спокойных и надёжных людей, которые дорабатывают контракты.
- **Навыки.** Береговая специальность может сразу дать более оплачиваемую должность.
- **Мотивация.** Те, кто выбрал море осознанно, обычно остаются.

## Как получить первый контракт

1. **Сначала пройдите медкомиссию** — до того, как тратить деньги на курсы.
2. **Пройдите Basic Training и получите мореходную книжку.**
3. **Поставьте береговой опыт в начало CV**, с датами и конкретикой.
4. **Подавайтесь в лицензированные агентства** и на флоты, которые берут младших.
5. **Никогда не платите за работу.** По MLC 2006 трудоустройство не должно оплачиваться моряком — а те, кто меняет профессию, любимая цель мошенников с «гарантированной работой».

## Вопросы, которые могут задать

1. **«Почему море и почему сейчас?»** Назовите настоящую причину, а не романтическую.
2. **«Как ваша семья относится к долгим контрактам?»**
3. **«Готовы ли вы выполнять указания более молодых членов экипажа?»**
4. **«Какие навыки с прежней работы пригодятся на борту?»**
5. **«Вы прошли медкомиссию моряка?»**

## Частые вопросы

**В 35 стать моряком поздно?**
Нет. В ПДНВ нет верхнего предела возраста; решает медкомиссия.

**А в 45?**
Не для рядового состава, особенно с полезной специальностью. Офицерская карьера строится годами, так что это более долгая ставка.

**Возьмут ли 40-летнего без опыта?**
Некоторые компании — да, особенно электриком, фиттером, мотористом, поваром или в гостиничный экипаж; на начальные палубные должности труднее, но возможно.

**Нужна ли академия?**
Для рядового состава, поваров и гостиничных должностей — нет; для офицеров есть путь через академию или 36-месячный путь через рядовой состав.

## Вакансии

Смотрите вакансии [электрика](/ru/jobs/rank/electrician), [фиттера](/ru/jobs/rank/fitter), [моториста](/ru/jobs/rank/motorman), [повара](/ru/jobs/rank/cook) и [матроса второго класса](/ru/jobs/rank/ordinary-seaman).

## Ваше CV

[CV моряка](/ru/maritime-cv) соединяет вашу береговую специальность и новые курсы в том порядке, в каком их читает крюинг-менеджер.

*Требования — по ПДНВ (STCW) и MLC 2006; морская администрация может добавлять свои.*$ru$,
    'ua', $ua$«Чи не пізно?» — питання, що стоїть за тисячами запитів щомісяця: від механіків, електриків, кухарів, водіїв і офісних працівників за тридцять і сорок, які хочуть у море. Коротка відповідь: у міжнародних правилах немає верхньої межі віку, і в багатьох екіпажах є люди, що почали пізно. Довга відповідь залежить від того, що ви вже вмієте, що дозволяє здоров'я і скільки ви готові чекати офіцерської посади. У гайді — чесна версія.

## Що кажуть правила

- **ПДНВ не встановлює верхньої межі віку** для жодного диплома чи свідоцтва. Мінімум — 16 років для частини рядових і 18 для офіцерів і старшого рядового складу.
- **Вирішує медкомісія.** Медичне свідоцтво моряка (до двох років) перевіряє зір, слух, серце, загальну придатність — однаково у 25 і в 45. Якщо ви її пройшли, правилам ваш вік байдужий.
- **У компаній можуть бути свої вподобання.** Кадетські програми часто віддають перевагу молодим; для рядового складу з корисною спеціальністю вік важить набагато менше.

## Найшвидші шляхи: використайте те, що вже вмієте

Береговий досвід — ваш найсильніший козир. Типові зміни професії:

- **Електрик → судновий електрик** (ПДНВ III/7) лише з трьома місяцями схваленого стажу, а згодом **електромеханік** (III/6).
- **Автомеханік, токар, зварник → моторист чи фітер** у машинному відділенні.
- **Кухар → судновий кухар** за правилом 3.2 MLC 2006, зі свідоцтвом суднового кухаря.
- **Персонал готелів, ресторанів, спа → готельна служба круїзних суден** — найбільший роботодавець для тих, хто змінює професію.
- **Водій, будівельник, робітник → матрос другого класу чи вайпер** — початкові посади на палубі й у машині.

У кожному випадку документи — той самий короткий список: **Basic Training**, **медкомісія моряка**, **Security Awareness** і **послужна книжка** — плюс кваліфікація, яка у вас уже є.

## Шлях в офіцери після 30

Два варіанти:

1. **Морська академія чи коледж.** Деякі пропонують вечірні, заочні чи прискорені програми для дорослих; кадетський стаж однаково потрібен.
2. **Через рядовий склад.** ПДНВ допускає диплом вахтового помічника (II/1) чи вахтового механіка (III/1) після щонайменше **36 місяців** схваленого стажу без схваленої програми підготовки, плюс іспити.

Тверезо оцініть строки: почавши у 35 матросом другого класу, перший офіцерський диплом зазвичай отримують до 38–40, а старші посади — роки потому. Багато хто знаходить добру й гідно оплачувану кар'єру в старшому рядовому складі — боцман, моторист, фітер, електрик.

## Що важче після 30

- **Родина й розлука.** Контракти рядового складу по 6–9 місяців важкі з малими дітьми; спершу обговоріть це вдома.
- **Починати знизу.** Можливо, ви виконуватимете вказівки боцмана на десять років молодшого. Найшвидше ростуть ті, хто це приймає.
- **Фізична робота.** Швартування, фарбування й спека в машині важкі в будь-якому віці; медкомісія — це мінімум, а не вся історія.
- **Гроші на старті.** Курси й документи коштують грошей до першої зарплати — закладіть кілька тижнів без доходу.

## Що легше після 30

- **Зрілість.** Крюїнг-менеджери часто віддають перевагу спокійним і надійним людям, які допрацьовують контракти.
- **Навички.** Берегова спеціальність може одразу дати краще оплачувану посаду.
- **Мотивація.** Ті, хто обрав море свідомо, зазвичай залишаються.

## Як отримати перший контракт

1. **Спочатку пройдіть медкомісію** — до того, як витрачати гроші на курси.
2. **Пройдіть Basic Training і отримайте послужну книжку.**
3. **Поставте береговий досвід на початок CV**, з датами й конкретикою.
4. **Подавайтеся в ліцензовані агентства** й на флоти, які беруть молодших.
5. **Ніколи не платіть за роботу.** За MLC 2006 працевлаштування не має оплачуватися моряком — а ті, хто змінює професію, улюблена ціль шахраїв із «гарантованою роботою».

## Питання, які можуть поставити

1. **«Чому море і чому зараз?»** Назвіть справжню причину, а не романтичну.
2. **«Як ваша родина ставиться до довгих контрактів?»**
3. **«Чи готові ви виконувати вказівки молодших членів екіпажу?»**
4. **«Які навички з попередньої роботи знадобляться на борту?»**
5. **«Ви пройшли медкомісію моряка?»**

## Часті питання

**У 35 стати моряком пізно?**
Ні. У ПДНВ немає верхньої межі віку; вирішує медкомісія.

**А в 45?**
Не для рядового складу, особливо з корисною спеціальністю. Офіцерська кар'єра будується роками, тож це довша ставка.

**Чи візьмуть 40-річного без досвіду?**
Деякі компанії — так, особливо електриком, фітером, мотористом, кухарем чи в готельний екіпаж; на початкові палубні посади важче, але можливо.

**Чи потрібна академія?**
Для рядового складу, кухарів і готельних посад — ні; для офіцерів є шлях через академію або 36-місячний шлях через рядовий склад.

## Вакансії

Дивіться вакансії [електрика](/ua/jobs/rank/electrician), [фітера](/ua/jobs/rank/fitter), [моториста](/ua/jobs/rank/motorman), [кухаря](/ua/jobs/rank/cook) і [матроса другого класу](/ua/jobs/rank/ordinary-seaman).

## Ваше CV

[CV моряка](/ua/maritime-cv) поєднує вашу берегову спеціальність і нові курси в тому порядку, в якому їх читає крюїнг-менеджер.

*Вимоги — за ПДНВ (STCW) і MLC 2006; морська адміністрація може додавати свої.*$ua$,
    'pl', $pl$„Czy nie za późno?” — to pytanie stoi za tysiącami wyszukiwań co miesiąc: mechaników, elektryków, kucharzy, kierowców i pracowników biurowych po trzydziestce i czterdziestce, którzy chcą iść na morze. Krótka odpowiedź: w przepisach międzynarodowych nie ma górnej granicy wieku, a w wielu załogach są ludzie, którzy zaczęli późno. Dłuższa odpowiedź zależy od tego, co już umiesz, na co pozwala zdrowie i jak długo jesteś gotów czekać na stopień oficerski. W poradniku — uczciwa wersja.

## Co mówią przepisy

- **STCW nie określa górnej granicy wieku** dla żadnego dyplomu ani świadectwa. Minimum to 16 lat dla części załogi szeregowej i 18 dla oficerów i starszej załogi.
- **Decydują badania.** Świadectwo zdrowia marynarza (do dwóch lat) sprawdza wzrok, słuch, serce i ogólną sprawność — tak samo w wieku 25 i 45 lat. Jeśli je przejdziesz, przepisom Twój wiek jest obojętny.
- **Firmy mogą mieć własne preferencje.** Programy kadeckie często wolą młodszych; przy załodze szeregowej z przydatnym zawodem wiek liczy się znacznie mniej.

## Najszybsze drogi: wykorzystaj to, co już umiesz

Doświadczenie z lądu to Twój najmocniejszy atut. Typowe zmiany zawodu:

- **Elektryk → elektryk okrętowy** (STCW III/7) już po trzech miesiącach zatwierdzonej praktyki, a później **ETO** (III/6).
- **Mechanik, tokarz, spawacz → motorzysta lub fitter** w maszynowni.
- **Kucharz → kucharz okrętowy** według prawidła 3.2 MLC 2006, ze świadectwem kucharza okrętowego.
- **Personel hoteli, restauracji, spa → dział hotelowy wycieczkowców** — największy pracodawca osób zmieniających zawód na morzu.
- **Kierowca, budowlaniec, pracownik fabryki → młodszy marynarz lub wiper** — stanowiska wejściowe na pokładzie i w maszynowni.

W każdym przypadku dokumenty to ta sama krótka lista: **Basic Training**, **świadectwo zdrowia marynarza**, **Security Awareness** i **książeczka żeglarska** — plus kwalifikacje, które już masz.

## Droga do stopnia oficera po trzydziestce

Dwie możliwości:

1. **Akademia lub szkoła morska.** Niektóre oferują programy wieczorowe, zaoczne lub przyspieszone dla dorosłych; praktyka kadecka i tak jest potrzebna.
2. **Przez załogę szeregową.** STCW dopuszcza dyplom oficera wachtowego — pokładowego (II/1) lub maszynowego (III/1) — po co najmniej **36 miesiącach** zatwierdzonej praktyki bez zatwierdzonego programu szkolenia, plus egzaminy.

Realnie oceń czas: zaczynając w wieku 35 lat jako młodszy marynarz, pierwszy dyplom oficerski zdobywa się zwykle około 38–40 roku życia, a wyższe stanowiska — lata później. Wielu znajduje dobrą i dobrze płatną karierę w starszej załodze szeregowej — bosman, motorzysta, fitter, elektryk.

## Co jest trudniejsze po trzydziestce

- **Rodzina i rozłąka.** Kontrakty załogi szeregowej po 6–9 miesięcy są trudne przy małych dzieciach; najpierw omów to w domu.
- **Zaczynanie od dołu.** Możesz wykonywać polecenia bosmana młodszego o dziesięć lat. Najszybciej awansują ci, którzy to akceptują.
- **Praca fizyczna.** Cumowanie, malowanie i upał w maszynowni są wymagające w każdym wieku; badania to minimum, a nie cała historia.
- **Pieniądze na start.** Kursy i dokumenty kosztują, zanim przyjdzie pierwsza pensja — zaplanuj kilka tygodni bez dochodu.

## Co jest łatwiejsze po trzydziestce

- **Dojrzałość.** Menedżerowie agencji często wolą spokojnych i solidnych ludzi, którzy kończą kontrakty.
- **Umiejętności.** Zawód z lądu może od razu dać lepiej płatne stanowisko.
- **Motywacja.** Ci, którzy wybrali morze świadomie, zwykle zostają.

## Jak zdobyć pierwszy kontrakt

1. **Najpierw przejdź badania** — zanim wydasz pieniądze na kursy.
2. **Zrób Basic Training i wyrób książeczkę żeglarską.**
3. **Postaw doświadczenie z lądu na początku CV**, z datami i konkretami.
4. **Aplikuj do licencjonowanych agencji** i na floty, które zatrudniają młodszych.
5. **Nigdy nie płać za pracę.** Zgodnie z MLC 2006 marynarz nie może płacić za pośrednictwo — a osoby zmieniające zawód to ulubiony cel oszustów z „gwarantowaną pracą”.

## Pytania, które mogą paść

1. **„Dlaczego morze i dlaczego teraz?”** Podaj prawdziwy powód, nie romantyczny.
2. **„Co Twoja rodzina sądzi o długich kontraktach?”**
3. **„Czy jesteś gotów wykonywać polecenia młodszych członków załogi?”**
4. **„Jakie umiejętności z poprzedniej pracy wykorzystasz na burcie?”**
5. **„Czy przeszedłeś badania marynarskie?”**

## Najczęstsze pytania

**Czy w wieku 35 lat jest za późno?**
Nie. W STCW nie ma górnej granicy wieku; decydują badania.

**A w wieku 45 lat?**
Nie na stanowiska szeregowe, zwłaszcza z przydatnym zawodem. Kariera oficerska buduje się latami, więc to dłuższy zakład.

**Czy firmy zatrudnią 40-latka bez doświadczenia?**
Niektóre tak, szczególnie jako elektryka, fittera, motorzystę, kucharza lub w załodze hotelowej; na wejściowe stanowiska pokładowe jest trudniej, ale to możliwe.

**Czy potrzebna jest akademia?**
Nie dla załogi szeregowej, kucharzy i stanowisk hotelowych; dla oficerów jest droga przez akademię lub 36-miesięczna droga przez załogę szeregową.

## Oferty pracy

Zobacz oferty dla [elektryków](/pl/jobs/rank/electrician), [fitterów](/pl/jobs/rank/fitter), [motorzystów](/pl/jobs/rank/motorman), [kucharzy](/pl/jobs/rank/cook) i [młodszych marynarzy](/pl/jobs/rank/ordinary-seaman).

## Twoje CV

[CV marynarza](/pl/maritime-cv) łączy Twój zawód z lądu i nowe kursy w kolejności, w jakiej czyta je menedżer agencji.

*Wymagania według STCW i MLC 2006; administracja morska może dodawać własne.*$pl$),
  'Career', 'guide',
  'linear-gradient(135deg,#0e2a45,#8a6d1d)',
  true, '2026-10-13 09:20:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Becoming a seafarer after 30 (or 40): is it too late, and where to start');

-- ── 63. Fishing vessels ──────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Working on fishing vessels: jobs, documents, pay by share and what to check before you go',
    'ru', 'Работа на рыболовных судах: должности, документы, оплата с улова и что проверить до отъезда',
    'ua', 'Робота на рибальських суднах: посади, документи, оплата з улову і що перевірити до від''їзду',
    'pl', 'Praca na statkach rybackich: stanowiska, dokumenty, wynagrodzenie z połowu i co sprawdzić przed wyjazdem'),
  jsonb_build_object(
    'en', $en$Fishing is a world of its own at sea. The vessels are different, the rules are different — STCW, the convention that governs merchant ships, does not apply to fishing vessels — and the pay is often different too: on many boats the crew earns a share of the catch. It can be one of the best-paid jobs a beginner can get at sea, and also one of the hardest and most dangerous. This guide covers the jobs, the documents, how pay works, life on board, and the checks that protect you from the bad employers in this industry.

## Types of fishing vessels

- **Trawlers** — towing nets along the bottom or in mid-water; from small coastal boats to large ocean trawlers.
- **Factory trawlers and processing vessels** — catching and processing fish on board: filleting, freezing, packing. Large crews, long trips, work in shifts.
- **Longliners** — long lines with thousands of hooks; a lot of manual work with the gear.
- **Purse seiners** — encircling shoals of pelagic fish such as tuna or herring.
- **Pot and crab vessels** — heavy pots on deck in cold, rough water; famously hard work.

## The jobs

- **Deckhand / fisherman** — handling the nets, lines or pots, sorting and gutting the catch, maintenance of the gear.
- **Factory or processing worker** — on processing vessels: cutting, filleting, freezing and packing in shifts.
- **Cook** — one per crew, cooking for people doing heavy physical work.
- **Engineer and motorman** — the vessel's engine room, refrigeration plant and hydraulics.
- **Skipper and mates** — navigation, fishing operations and the crew; they need fishing certificates.

## The rules: STCW-F and the Work in Fishing Convention

- **STCW does not apply to fishing vessels.** Fishing has its own convention, **STCW-F** (1995, in force since 2012). It covers seagoing fishing vessels of 24 metres and more: **basic safety training** for all personnel, and certificates for skippers, officers and engineers.
- **The ILO Work in Fishing Convention (C188)**, in force since 2017, sets the working conditions for fishers in the countries that ratified it: a **minimum age of 16**, a **medical certificate**, a **written work agreement**, **rest hours** (on vessels staying at sea more than three days, at least 10 hours in any 24 and 77 in any seven days), repatriation, and **no recruitment fees charged to fishers**.

Which rules apply to your vessel depends on its flag and size — ask the employer, and read the agreement.

## Documents

- **Passport** and visas for the country of the vessel.
- **Medical certificate** for fishers or seafarers, as the flag requires.
- **Basic safety training** — fishing basic safety training under STCW-F, or STCW Basic Training, depending on the flag.
- A **seaman's or fisher's book** where your country issues one.
- For skippers, mates and engineers — **STCW-F certificates** of the flag state.

## How pay works

There are two models, and sometimes a mix:

- **A fixed wage**, paid monthly, as on merchant ships.
- **A share of the catch** — after costs, the crew divides an agreed share of the catch's value. A good season can pay very well; a bad one can pay little. Ask exactly how the share is calculated, which costs come off first, and whether there is a guaranteed minimum.

Get the pay terms in writing, in a language you understand, before you travel.

## Life on board

- **Long hours when the fish are there.** Fishing follows the catch, not the clock; processing vessels often work in shifts, for example six hours on and six off.
- **Cold, wet and heavy.** Gear, weather and motion make fishing one of the most dangerous occupations at sea. Safety gear, training and a careful crew matter more than anywhere.
- **Trips** range from days on coastal boats to months on factory vessels.

## Protect yourself: the checks before you go

Fishing has excellent employers — and, in some fleets, some of the worst abuses at sea. Before you travel:

1. **Get the written work agreement** — pay, share calculation, hours, trip length, repatriation.
2. **Never pay a recruitment fee.** C188 and MLC both say fishers and seafarers must not be charged for recruitment.
3. **Keep your own passport.** Nobody has a right to hold it for you.
4. **Never accept a debt to the agency** for travel, visas or "placement" that you repay from wages.
5. **Check the vessel and the company** — its name, flag and owner — and talk to people who have worked there.

## Interview questions

1. **"Have you done physical work in cold or bad weather?"**
2. **"Do you get seasick?"** Be honest.
3. **"Have you worked with knives, fish or food processing?"**
4. **"Are you ready for long shifts and long trips?"**
5. **"Do you have basic safety training?"**

## FAQ

**Can I work on a fishing vessel without experience?**
Yes — as a deckhand or processing worker, with basic safety training and a medical, though experience with physical work helps.

**Is STCW Basic Training enough?**
Often it is accepted, but fishing vessels follow STCW-F and the flag's rules; check what the flag requires.

**Is working "for a share" good or bad?**
It depends on the vessel, the season and the terms. Understand the calculation and ask about a guaranteed minimum.

**What is the minimum age?**
Under C188, 16 — and 18 for hazardous work — in the countries that ratified it.

## Jobs

Look at the fishing vacancies on our [jobs board](/jobs?fleet=fishing).

## Your CV

The [maritime CV](/maritime-cv) puts your safety training, physical work experience and languages on one page.

*Rules depend on the vessel's flag and size. Check the work agreement and the flag's requirements before you travel.*$en$,
    'ru', $ru$Рыболовство — отдельный мир в море. Суда другие, правила другие — ПДНВ (STCW), конвенция для торговых судов, на рыболовные суда не распространяется, — и оплата часто тоже другая: на многих судах экипаж получает долю улова. Для новичка это может быть одна из самых высокооплачиваемых работ в море — и одна из самых тяжёлых и опасных. В гайде — должности, документы, как устроена оплата, жизнь на борту и проверки, которые защищают от плохих работодателей в этой отрасли.

## Типы рыболовных судов

- **Траулеры** — тянут сети по дну или в толще воды; от небольших прибрежных до крупных океанских.
- **Рыбоперерабатывающие траулеры и плавзаводы** — ловят и перерабатывают рыбу на борту: разделка, филе, заморозка, упаковка. Большие экипажи, долгие рейсы, работа сменами.
- **Ярусоловы** — длинные ярусы с тысячами крючков; много ручной работы со снастями.
- **Кошельковые суда (сейнеры)** — окружают косяки пелагической рыбы, например тунца или сельди.
- **Ловушечные и крабовые суда** — тяжёлые ловушки на палубе в холодной и бурной воде; известны особенно тяжёлой работой.

## Должности

- **Матрос-рыбак** — работа с сетями, ярусами или ловушками, сортировка и разделка улова, обслуживание снастей.
- **Обработчик на рыбцехе** — на перерабатывающих судах: резка, филе, заморозка и упаковка посменно.
- **Повар** — один на экипаж, готовит для людей, занятых тяжёлым физическим трудом.
- **Механик и моторист** — машинное отделение, холодильная установка и гидравлика.
- **Капитан и помощники** — судовождение, промысел и экипаж; им нужны рыболовные дипломы.

## Правила: ПДНВ-Р и Конвенция о труде в рыболовстве

- **ПДНВ не применяется к рыболовным судам.** У рыболовства своя конвенция — **ПДНВ-Р (STCW-F)** 1995 года, вступившая в силу в 2012-м. Она охватывает морские рыболовные суда длиной 24 метра и более: **базовую подготовку по безопасности** для всего персонала и дипломы для капитанов, помощников и механиков.
- **Конвенция МОТ о труде в рыболовстве (C188)**, действующая с 2017 года, устанавливает условия труда рыбаков в странах, которые её ратифицировали: **минимальный возраст 16 лет**, **медицинское свидетельство**, **письменный трудовой договор**, **часы отдыха** (на судах, находящихся в море более трёх суток, — не менее 10 часов за любые 24 и 77 за любые семь дней), репатриацию и **запрет брать с рыбаков плату за трудоустройство**.

Какие правила действуют на вашем судне, зависит от флага и размера — спрашивайте работодателя и читайте договор.

## Документы

- **Заграничный паспорт** и визы страны судна.
- **Медицинское свидетельство** рыбака или моряка — как требует флаг.
- **Базовая подготовка по безопасности** — для рыбаков по ПДНВ-Р или STCW Basic Training, в зависимости от флага.
- **Мореходная книжка или книжка рыбака**, если ваша страна её выдаёт.
- Для капитанов, помощников и механиков — **дипломы ПДНВ-Р** государства флага.

## Как устроена оплата

Есть две модели, иногда смешанные:

- **Фиксированная зарплата**, помесячно, как на торговых судах.
- **Доля улова** — после вычета расходов экипаж делит оговорённую долю стоимости улова. Хороший сезон может принести очень много, плохой — мало. Спросите, как именно считается доля, какие расходы вычитаются сначала и есть ли гарантированный минимум.

Получите условия оплаты письменно, на понятном вам языке, до отъезда.

## Жизнь на борту

- **Долгие часы, когда идёт рыба.** Промысел подчиняется улову, а не часам; перерабатывающие суда часто работают сменами, например шесть часов через шесть.
- **Холодно, мокро и тяжело.** Снасти, погода и качка делают рыболовство одной из самых опасных профессий в море. Средства защиты, подготовка и внимательный экипаж здесь важнее, чем где-либо.
- **Рейсы** — от нескольких дней на прибрежных судах до месяцев на плавзаводах.

## Защитите себя: проверки до отъезда

В рыболовстве есть отличные работодатели — и, в некоторых флотах, одни из худших злоупотреблений в море. До поездки:

1. **Получите письменный трудовой договор** — оплата, расчёт доли, часы, длительность рейса, репатриация.
2. **Никогда не платите за трудоустройство.** И C188, и MLC говорят, что рыбаки и моряки не должны платить за найм.
3. **Держите паспорт при себе.** Никто не вправе хранить его за вас.
4. **Никогда не соглашайтесь на долг агентству** за дорогу, визы или «устройство», который удерживают из зарплаты.
5. **Проверьте судно и компанию** — название, флаг, владельца — и поговорите с теми, кто там работал.

## Вопросы на собеседовании

1. **«Работали ли вы физически в холод и плохую погоду?»**
2. **«Вас укачивает?»** Отвечайте честно.
3. **«Работали ли вы с ножом, рыбой или в пищевой переработке?»**
4. **«Готовы ли вы к длинным сменам и долгим рейсам?»**
5. **«Есть ли у вас базовая подготовка по безопасности?»**

## Частые вопросы

**Можно ли работать на рыболовном судне без опыта?**
Да — матросом-рыбаком или обработчиком, с базовой подготовкой по безопасности и медкомиссией, хотя опыт физической работы помогает.

**Достаточно ли STCW Basic Training?**
Часто его принимают, но рыболовные суда работают по ПДНВ-Р и правилам флага; уточните требования флага.

**Работа «на долю» — это хорошо или плохо?**
Зависит от судна, сезона и условий. Разберитесь в расчёте и спросите о гарантированном минимуме.

**Какой минимальный возраст?**
По C188 — 16 лет, а для опасных работ — 18, в странах, которые её ратифицировали.

## Вакансии

Смотрите вакансии на рыболовных судах на нашем [сайте вакансий](/ru/jobs?fleet=fishing).

## Ваше CV

[CV моряка](/ru/maritime-cv) соберёт на одной странице подготовку по безопасности, опыт физической работы и языки.

*Правила зависят от флага и размера судна. Проверьте трудовой договор и требования флага до отъезда.*$ru$,
    'ua', $ua$Рибальство — окремий світ у морі. Судна інші, правила інші — ПДНВ (STCW), конвенція для торговельних суден, на рибальські судна не поширюється, — і оплата часто теж інша: на багатьох суднах екіпаж отримує частку улову. Для новачка це може бути одна з найбільш оплачуваних робіт у морі — і одна з найважчих і найнебезпечніших. У гайді — посади, документи, як влаштована оплата, життя на борту й перевірки, що захищають від поганих роботодавців у цій галузі.

## Типи рибальських суден

- **Траулери** — тягнуть сіті по дну чи в товщі води; від невеликих прибережних до великих океанських.
- **Рибопереробні траулери й плавзаводи** — ловлять і переробляють рибу на борту: розбирання, філе, заморожування, пакування. Великі екіпажі, довгі рейси, робота змінами.
- **Ярусолови** — довгі яруси з тисячами гачків; багато ручної роботи зі снастями.
- **Кошелькові судна (сейнери)** — оточують косяки пелагічної риби, наприклад тунця чи оселедця.
- **Пасткові й крабові судна** — важкі пастки на палубі в холодній і бурхливій воді; відомі особливо важкою роботою.

## Посади

- **Матрос-рибалка** — робота із сітями, ярусами чи пастками, сортування й розбирання улову, обслуговування снастей.
- **Обробник у рибцеху** — на переробних суднах: різання, філе, заморожування й пакування позмінно.
- **Кухар** — один на екіпаж, готує для людей, зайнятих важкою фізичною працею.
- **Механік і моторист** — машинне відділення, холодильна установка й гідравліка.
- **Капітан і помічники** — судноводіння, промисел і екіпаж; їм потрібні рибальські дипломи.

## Правила: ПДНВ-Р і Конвенція про працю в рибальстві

- **ПДНВ не застосовується до рибальських суден.** У рибальства своя конвенція — **ПДНВ-Р (STCW-F)** 1995 року, що набула чинності 2012-го. Вона охоплює морські рибальські судна довжиною 24 метри й більше: **базову підготовку з безпеки** для всього персоналу й дипломи для капітанів, помічників і механіків.
- **Конвенція МОП про працю в рибальстві (C188)**, чинна з 2017 року, встановлює умови праці рибалок у країнах, які її ратифікували: **мінімальний вік 16 років**, **медичне свідоцтво**, **письмовий трудовий договір**, **години відпочинку** (на суднах, що перебувають у морі понад три доби, — щонайменше 10 годин за будь-які 24 і 77 за будь-які сім днів), репатріацію й **заборону брати з рибалок плату за працевлаштування**.

Які правила діють на вашому судні, залежить від прапора й розміру — питайте роботодавця й читайте договір.

## Документи

- **Закордонний паспорт** і візи країни судна.
- **Медичне свідоцтво** рибалки чи моряка — як вимагає прапор.
- **Базова підготовка з безпеки** — для рибалок за ПДНВ-Р або STCW Basic Training, залежно від прапора.
- **Послужна книжка чи книжка рибалки**, якщо ваша країна її видає.
- Для капітанів, помічників і механіків — **дипломи ПДНВ-Р** держави прапора.

## Як влаштована оплата

Є дві моделі, іноді змішані:

- **Фіксована зарплата**, щомісяця, як на торговельних суднах.
- **Частка улову** — після вирахування витрат екіпаж ділить обумовлену частку вартості улову. Добрий сезон може принести дуже багато, поганий — мало. Запитайте, як саме рахується частка, які витрати вираховуються спочатку і чи є гарантований мінімум.

Отримайте умови оплати письмово, зрозумілою вам мовою, до від'їзду.

## Життя на борту

- **Довгі години, коли йде риба.** Промисел підпорядковується улову, а не годиннику; переробні судна часто працюють змінами, наприклад шість годин через шість.
- **Холодно, мокро й важко.** Снасті, погода й хитавиця роблять рибальство однією з найнебезпечніших професій у морі. Засоби захисту, підготовка й уважний екіпаж тут важливіші, ніж будь-де.
- **Рейси** — від кількох днів на прибережних суднах до місяців на плавзаводах.

## Захистіть себе: перевірки до від'їзду

У рибальстві є чудові роботодавці — і, в деяких флотах, одні з найгірших зловживань у морі. До поїздки:

1. **Отримайте письмовий трудовий договір** — оплата, розрахунок частки, години, тривалість рейсу, репатріація.
2. **Ніколи не платіть за працевлаштування.** І C188, і MLC кажуть, що рибалки й моряки не повинні платити за найм.
3. **Тримайте паспорт при собі.** Ніхто не має права зберігати його за вас.
4. **Ніколи не погоджуйтеся на борг агентству** за дорогу, візи чи «влаштування», який утримують із зарплати.
5. **Перевірте судно й компанію** — назву, прапор, власника — і поговоріть із тими, хто там працював.

## Питання на співбесіді

1. **«Чи працювали ви фізично в холод і погану погоду?»**
2. **«Вас заколисує?»** Відповідайте чесно.
3. **«Чи працювали ви з ножем, рибою чи в харчовій переробці?»**
4. **«Чи готові ви до довгих змін і довгих рейсів?»**
5. **«Чи є у вас базова підготовка з безпеки?»**

## Часті питання

**Чи можна працювати на рибальському судні без досвіду?**
Так — матросом-рибалкою чи обробником, із базовою підготовкою з безпеки й медкомісією, хоча досвід фізичної роботи допомагає.

**Чи достатньо STCW Basic Training?**
Часто його приймають, але рибальські судна працюють за ПДНВ-Р і правилами прапора; уточніть вимоги прапора.

**Робота «на частку» — це добре чи погано?**
Залежить від судна, сезону й умов. Розберіться в розрахунку й запитайте про гарантований мінімум.

**Який мінімальний вік?**
За C188 — 16 років, а для небезпечних робіт — 18, у країнах, які її ратифікували.

## Вакансії

Дивіться вакансії на рибальських суднах на нашому [сайті вакансій](/ua/jobs?fleet=fishing).

## Ваше CV

[CV моряка](/ua/maritime-cv) збере на одній сторінці підготовку з безпеки, досвід фізичної роботи й мови.

*Правила залежать від прапора й розміру судна. Перевірте трудовий договір і вимоги прапора до від'їзду.*$ua$,
    'pl', $pl$Rybołówstwo to osobny świat na morzu. Statki są inne, przepisy są inne — STCW, konwencja dla statków handlowych, nie obejmuje statków rybackich — i wynagrodzenie często też jest inne: na wielu jednostkach załoga dostaje udział w połowie. Dla początkującego to może być jedna z najlepiej płatnych prac na morzu — i jedna z najcięższych i najniebezpieczniejszych. W poradniku: stanowiska, dokumenty, jak działa wynagrodzenie, życie na burcie i to, co chroni przed złymi pracodawcami w tej branży.

## Typy statków rybackich

- **Trawlery** — ciągną sieci po dnie lub w toni; od małych przybrzeżnych po duże oceaniczne.
- **Trawlery przetwórnie i statki przetwórcze** — łowią i przetwarzają rybę na burcie: patroszenie, filetowanie, mrożenie, pakowanie. Duże załogi, długie rejsy, praca na zmiany.
- **Taklowce** — długie sznury z tysiącami haczyków; dużo ręcznej pracy przy narzędziach połowowych.
- **Sejnery (okrężnice)** — otaczają ławice ryb pelagicznych, np. tuńczyka lub śledzia.
- **Statki z pułapkami i krabowe** — ciężkie pułapki na pokładzie w zimnej, wzburzonej wodzie; znane z wyjątkowo ciężkiej pracy.

## Stanowiska

- **Rybak / marynarz pokładowy** — praca z sieciami, takami lub pułapkami, sortowanie i patroszenie połowu, konserwacja sprzętu.
- **Pracownik przetwórni** — na statkach przetwórczych: krojenie, filetowanie, mrożenie i pakowanie na zmiany.
- **Kucharz** — jeden na załogę, gotuje dla ludzi wykonujących ciężką pracę fizyczną.
- **Mechanik i motorzysta** — maszynownia, instalacja chłodnicza i hydraulika.
- **Szyper i oficerowie** — nawigacja, połowy i załoga; potrzebują dyplomów rybackich.

## Przepisy: STCW-F i Konwencja o pracy w rybołówstwie

- **STCW nie dotyczy statków rybackich.** Rybołówstwo ma własną konwencję — **STCW-F** z 1995 roku, obowiązującą od 2012. Obejmuje morskie statki rybackie o długości 24 metrów i więcej: **podstawowe szkolenie z bezpieczeństwa** dla całego personelu i dyplomy dla szyprów, oficerów i mechaników.
- **Konwencja MOP o pracy w rybołówstwie (C188)**, obowiązująca od 2017 roku, określa warunki pracy rybaków w krajach, które ją ratyfikowały: **minimalny wiek 16 lat**, **świadectwo zdrowia**, **pisemna umowa o pracę**, **godziny odpoczynku** (na statkach przebywających na morzu ponad trzy doby — co najmniej 10 godzin w każdych 24 i 77 w każdych siedmiu dniach), repatriacja i **zakaz pobierania od rybaków opłat za rekrutację**.

To, jakie przepisy obowiązują na Twoim statku, zależy od bandery i wielkości — pytaj pracodawcę i czytaj umowę.

## Dokumenty

- **Paszport** i wizy kraju statku.
- **Świadectwo zdrowia** rybaka lub marynarza — zgodnie z wymogami bandery.
- **Podstawowe szkolenie z bezpieczeństwa** — rybackie według STCW-F lub STCW Basic Training, zależnie od bandery.
- **Książeczka żeglarska lub rybacka**, jeśli Twój kraj ją wydaje.
- Dla szyprów, oficerów i mechaników — **dyplomy STCW-F** państwa bandery.

## Jak działa wynagrodzenie

Są dwa modele, czasem mieszane:

- **Stała pensja**, wypłacana co miesiąc, jak na statkach handlowych.
- **Udział w połowie** — po odliczeniu kosztów załoga dzieli uzgodnioną część wartości połowu. Dobry sezon może dać bardzo dużo, zły — niewiele. Zapytaj, jak dokładnie liczy się udział, które koszty odlicza się najpierw i czy jest gwarantowane minimum.

Warunki wynagrodzenia weź na piśmie, w zrozumiałym dla Ciebie języku, przed wyjazdem.

## Życie na burcie

- **Długie godziny, gdy jest ryba.** Połowy podporządkowane są rybie, nie zegarowi; statki przetwórcze często pracują na zmiany, np. sześć godzin pracy i sześć wolnego.
- **Zimno, mokro i ciężko.** Sprzęt, pogoda i kołysanie czynią rybołówstwo jednym z najniebezpieczniejszych zawodów na morzu. Środki ochrony, szkolenie i uważna załoga liczą się tu bardziej niż gdziekolwiek.
- **Rejsy** trwają od kilku dni na jednostkach przybrzeżnych do miesięcy na statkach przetwórczych.

## Chroń się: co sprawdzić przed wyjazdem

W rybołówstwie są świetni pracodawcy — i, w niektórych flotach, jedne z najgorszych nadużyć na morzu. Przed wyjazdem:

1. **Weź pisemną umowę o pracę** — wynagrodzenie, sposób liczenia udziału, godziny, długość rejsu, repatriacja.
2. **Nigdy nie płać za rekrutację.** Zarówno C188, jak i MLC mówią, że rybacy i marynarze nie mogą płacić za zatrudnienie.
3. **Trzymaj paszport przy sobie.** Nikt nie ma prawa go przechowywać za Ciebie.
4. **Nigdy nie zgadzaj się na dług wobec agencji** za podróż, wizy lub „pośrednictwo”, potrącany z pensji.
5. **Sprawdź statek i firmę** — nazwę, banderę, właściciela — i porozmawiaj z ludźmi, którzy tam pracowali.

## Pytania na rozmowie

1. **„Czy pracowałeś fizycznie w zimnie i złej pogodzie?”**
2. **„Czy masz chorobę morską?”** Odpowiadaj szczerze.
3. **„Czy pracowałeś z nożem, rybami lub w przetwórstwie żywności?”**
4. **„Czy jesteś gotów na długie zmiany i długie rejsy?”**
5. **„Czy masz podstawowe szkolenie z bezpieczeństwa?”**

## Najczęstsze pytania

**Czy można pracować na statku rybackim bez doświadczenia?**
Tak — jako rybak lub pracownik przetwórni, z podstawowym szkoleniem z bezpieczeństwa i świadectwem zdrowia, choć doświadczenie w pracy fizycznej pomaga.

**Czy STCW Basic Training wystarczy?**
Często jest akceptowany, ale statki rybackie stosują STCW-F i przepisy bandery; sprawdź wymagania bandery.

**Czy praca „na udział” jest dobra czy zła?**
Zależy od statku, sezonu i warunków. Zrozum sposób liczenia i zapytaj o gwarantowane minimum.

**Jaki jest minimalny wiek?**
Według C188 — 16 lat, a przy pracach niebezpiecznych 18, w krajach, które ją ratyfikowały.

## Oferty pracy

Zobacz oferty na statkach rybackich na naszym [portalu z ofertami](/pl/jobs?fleet=fishing).

## Twoje CV

[CV marynarza](/pl/maritime-cv) zbierze na jednej stronie szkolenie z bezpieczeństwa, doświadczenie w pracy fizycznej i języki.

*Przepisy zależą od bandery i wielkości statku. Przed wyjazdem sprawdź umowę o pracę i wymagania bandery.*$pl$),
  'Fishing', 'guide',
  'linear-gradient(135deg,#0e2a45,#2a6f97)',
  true, '2026-10-13 09:30:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Working on fishing vessels: jobs, documents, pay by share and what to check before you go');

-- ── Covers ───────────────────────────────────────────────────────────────────
UPDATE news_articles SET cover_url = v.url FROM (VALUES
 ('How to become a seafarer without a maritime education', 'https://seajobs.pro/guides/seafarer-no-education.png?v=1'),
 ('Working on a yacht without experience: deckhand and stewardess jobs, documents and how to start', 'https://seajobs.pro/guides/yacht-crew.png?v=1'),
 ('Becoming a seafarer after 30 (or 40): is it too late, and where to start', 'https://seajobs.pro/guides/seafarer-after-30.png?v=1'),
 ('Working on fishing vessels: jobs, documents, pay by share and what to check before you go', 'https://seajobs.pro/guides/fishing-vessels.png?v=1')
) AS v(t, url)
WHERE news_articles.title->>'en' = v.t AND coalesce(news_articles.cover_url, '') = '';
