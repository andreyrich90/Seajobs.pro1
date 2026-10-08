-- Deck ranks (category = 'guide'): Master, Chief Officer, Second Officer,
-- Third Officer. Answers the "what does a … do / how to become …" searches
-- that the /jobs/rank/<slug> landings cannot: the landing lists vacancies,
-- the guide explains the job and links to the landing.
--
-- Facts: STCW Regulation II/1 (officer in charge of a navigational watch,
-- 500 GT or more) and II/2 (chief mate and master, 3000 GT or more). Watch
-- times and the split of duties are the common practice, not a rule, and are
-- written as "usually". No salary figures: the rank landing shows the range
-- from live vacancies, which stays current where a number in a guide would not.
--
-- pl + ru + ua + en. Covers are set at the end — run after the deploy that
-- adds public/guides/{master,chief-officer,second-officer,third-officer}.png.
-- Idempotent — guarded by the English title.

-- ── 44. Master ───────────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Ship''s master (captain): duties, requirements and how to become one',
    'ru', 'Капитан судна: обязанности, требования и как им стать',
    'ua', 'Капітан судна: обов''язки, вимоги та як ним стати',
    'pl', 'Kapitan statku: obowiązki, wymagania i jak nim zostać'),
  jsonb_build_object(
    'en', $en$The **master** — the captain — commands the ship. Everyone on board, every document and every decision that matters ends with them. It is the top of the deck career, and the rank most cadets name when asked where they are going.

## What the master does

- **Command and safety.** The master is responsible for the safety of the ship, the crew and the cargo, and under the ISM Code has the **overriding authority** to put safety and the environment first — even against the owner's or charterer's wishes.
- **Navigation.** The master does not usually keep a watch on a merchant ship, but approves the passage plan, takes the con in pilotage waters, port approaches and bad weather, and writes the standing orders the officers follow.
- **The company and the port.** Reports to the owner and manager, works with charterers, agents, port state control and flag inspectors, signs the ship's papers and the cargo documents.
- **The crew.** Discipline, work and rest hours, welfare, training on board, and in many companies the crew's wages account.

## What it takes

Under **STCW Regulation II/2**, a master's certificate for ships of 3,000 GT or more requires an officer-of-the-watch certificate and at least **36 months** of approved sea service as an officer in charge of a navigational watch. That can be reduced to **24 months** if at least 12 of them were served as **chief officer**. On top of that come the exams of your maritime administration and the courses for the management level, such as Medical Care, and usually ECDIS, ERM/BRM and ship handling.

In practice, a company wants more than the certificate: years as chief officer on the same vessel type, a clean record with inspections, and the trust of its superintendents. Most masters are promoted from within the fleet.

## The path

Deck cadet → third officer → second officer → chief officer → master. With steady contracts it typically takes **8–12 years** from cadet to command, faster on some fleets and slower on others.

## Pay and jobs

A master is the highest-paid rank on board; the size of the gap depends on the vessel type — tankers, gas carriers and offshore pay more than general cargo. The current range from real vacancies is on the [master jobs page](/jobs/rank/master), and a comparison by rank is on our [salaries page](/salaries).

## Your CV

Crewing desks read a master's CV for the vessel types and sizes commanded, the trading areas and the inspection record. Put them first — the [maritime CV](/maritime-cv) does it from your profile.

*Requirements follow STCW; your flag state may add its own. Check them with your maritime administration.*$en$,
    'ru', $ru$**Капитан** командует судном. На нём замыкаются весь экипаж, все документы и каждое важное решение. Это вершина палубной карьеры и та должность, которую называет большинство кадетов, когда их спрашивают, куда они идут.

## Чем занимается капитан

- **Командование и безопасность.** Капитан отвечает за безопасность судна, экипажа и груза, а по Кодексу ISM обладает **преимущественным правом (overriding authority)** ставить безопасность и экологию на первое место — даже вопреки желанию судовладельца или фрахтователя.
- **Судовождение.** На торговом судне капитан обычно не стоит ходовую вахту, но утверждает план перехода, сам управляет судном в лоцманских водах, на подходах к порту и в шторм и пишет постоянные распоряжения, по которым работают помощники.
- **Компания и порт.** Отчитывается перед судовладельцем и менеджером, работает с фрахтователями, агентами, инспекциями port state control и флага, подписывает судовые и грузовые документы.
- **Экипаж.** Дисциплина, часы труда и отдыха, бытовые условия, обучение на борту, а во многих компаниях — и расчёт зарплаты экипажа.

## Что для этого нужно

По **правилу II/2 ПДНВ (STCW)** для диплома капитана судна валовой вместимостью 3000 и более нужен диплом вахтенного помощника и не менее **36 месяцев** одобренного стажа вахтенным помощником. Срок можно сократить до **24 месяцев**, если не менее 12 из них вы работали **старшим помощником**. Сверху — экзамены морской администрации и курсы уровня управления, например Medical Care, и обычно ECDIS, ERM/BRM и управление судном (ship handling).

На практике компании нужно больше, чем диплом: годы старпомом на том же типе судов, чистая история инспекций и доверие суперинтендантов. Большинство капитанов повышают внутри флота.

## Путь

Палубный кадет → третий помощник → второй помощник → старший помощник → капитан. При регулярных контрактах путь от кадета до капитана обычно занимает **8–12 лет**: на одних флотах быстрее, на других медленнее.

## Зарплата и вакансии

Капитан — самая высокооплачиваемая должность на борту; насколько выше остальных, зависит от типа судна: танкеры, газовозы и оффшор платят больше генгруза. Актуальный диапазон по реальным вакансиям — на странице [вакансий капитана](/ru/jobs/rank/master), сравнение по должностям — на странице [зарплат](/ru/salaries).

## Ваше CV

В CV капитана крюинг смотрит на типы и размеры судов, которыми вы командовали, районы плавания и историю инспекций. Поставьте это в начало — [CV моряка](/ru/maritime-cv) сделает это из вашего профиля.

*Требования — по ПДНВ (STCW); государство флага может добавлять свои. Уточняйте в морской администрации.*$ru$,
    'ua', $ua$**Капітан** командує судном. На ньому замикаються весь екіпаж, усі документи й кожне важливе рішення. Це вершина палубної кар'єри й та посада, яку називає більшість кадетів, коли їх питають, куди вони йдуть.

## Чим займається капітан

- **Командування й безпека.** Капітан відповідає за безпеку судна, екіпажу й вантажу, а за Кодексом ISM має **переважне право (overriding authority)** ставити безпеку й екологію на перше місце — навіть усупереч бажанню судновласника чи фрахтувальника.
- **Судноводіння.** На торговельному судні капітан зазвичай не несе ходову вахту, але затверджує план переходу, сам керує судном у лоцманських водах, на підходах до порту й у шторм і пише постійні розпорядження, за якими працюють помічники.
- **Компанія й порт.** Звітує перед судновласником і менеджером, працює з фрахтувальниками, агентами, інспекціями port state control і прапора, підписує суднові та вантажні документи.
- **Екіпаж.** Дисципліна, години праці й відпочинку, побутові умови, навчання на борту, а в багатьох компаніях — і розрахунок зарплати екіпажу.

## Що для цього потрібно

За **правилом II/2 ПДНВ (STCW)** для диплома капітана судна валовою місткістю 3000 і більше потрібен диплом вахтового помічника й не менше **36 місяців** схваленого стажу вахтовим помічником. Строк можна скоротити до **24 місяців**, якщо щонайменше 12 із них ви працювали **старшим помічником**. Зверху — іспити морської адміністрації та курси рівня управління, наприклад Medical Care, і зазвичай ECDIS, ERM/BRM та керування судном (ship handling).

На практиці компанії потрібно більше, ніж диплом: роки старпомом на тому самому типі суден, чиста історія інспекцій і довіра суперінтендантів. Більшість капітанів підвищують усередині флоту.

## Шлях

Палубний кадет → третій помічник → другий помічник → старший помічник → капітан. За регулярних контрактів шлях від кадета до капітана зазвичай триває **8–12 років**: на одних флотах швидше, на інших повільніше.

## Зарплата й вакансії

Капітан — найбільш оплачувана посада на борту; наскільки вище за інших, залежить від типу судна: танкери, газовози й офшор платять більше за генвантаж. Актуальний діапазон за реальними вакансіями — на сторінці [вакансій капітана](/ua/jobs/rank/master), порівняння за посадами — на сторінці [зарплат](/ua/salaries).

## Ваше CV

У CV капітана крюїнг дивиться на типи й розміри суден, якими ви командували, райони плавання та історію інспекцій. Поставте це на початок — [CV моряка](/ua/maritime-cv) зробить це з вашого профілю.

*Вимоги — за ПДНВ (STCW); держава прапора може додавати свої. Уточнюйте в морській адміністрації.*$ua$,
    'pl', $pl$**Kapitan** dowodzi statkiem. Na nim kończą się cała załoga, wszystkie dokumenty i każda ważna decyzja. To szczyt kariery pokładowej i stanowisko, które wymienia większość kadetów, gdy pyta się ich, dokąd zmierzają.

## Czym zajmuje się kapitan

- **Dowodzenie i bezpieczeństwo.** Kapitan odpowiada za bezpieczeństwo statku, załogi i ładunku, a zgodnie z Kodeksem ISM ma **nadrzędne uprawnienia (overriding authority)**, by stawiać bezpieczeństwo i środowisko na pierwszym miejscu — nawet wbrew armatorowi lub czarterującemu.
- **Nawigacja.** Na statku handlowym kapitan zwykle nie pełni wachty, ale zatwierdza plan podróży, sam prowadzi statek na wodach pilotowych, przy podejściu do portu i w sztormie oraz pisze stałe polecenia, według których pracują oficerowie.
- **Firma i port.** Raportuje armatorowi i menedżerowi, współpracuje z czarterującymi, agentami, inspekcjami port state control i bandery, podpisuje dokumenty statkowe i ładunkowe.
- **Załoga.** Dyscyplina, godziny pracy i odpoczynku, warunki bytowe, szkolenia na burcie, a w wielu firmach także rozliczenie płac załogi.

## Czego to wymaga

Zgodnie z **prawidłem II/2 STCW** dyplom kapitana na statkach o pojemności brutto 3000 i więcej wymaga dyplomu oficera wachtowego i co najmniej **36 miesięcy** zatwierdzonej praktyki pływania jako oficer wachtowy. Okres ten można skrócić do **24 miesięcy**, jeśli co najmniej 12 z nich przepracowano jako **starszy oficer**. Do tego dochodzą egzaminy administracji morskiej i kursy poziomu zarządzania, np. Medical Care, a zwykle także ECDIS, ERM/BRM i manewrowanie statkiem (ship handling).

W praktyce firma oczekuje więcej niż dyplomu: lat na stanowisku starszego oficera na tym samym typie statków, czystej historii inspekcji i zaufania inspektorów armatora. Większość kapitanów awansuje wewnątrz floty.

## Ścieżka

Kadet pokładowy → trzeci oficer → drugi oficer → starszy oficer → kapitan. Przy regularnych kontraktach droga od kadeta do kapitana trwa zwykle **8–12 lat**: w jednych flotach szybciej, w innych wolniej.

## Wynagrodzenie i oferty

Kapitan to najlepiej opłacane stanowisko na burcie; o ile lepiej, zależy od typu statku — tankowce, gazowce i offshore płacą więcej niż drobnicowce. Aktualny przedział z prawdziwych ofert jest na stronie [ofert dla kapitanów](/pl/jobs/rank/master), a porównanie stanowisk — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

W CV kapitana agencja patrzy na typy i wielkości statków, którymi dowodziłeś, rejony pływania i historię inspekcji. Postaw to na początku — [CV marynarza](/pl/maritime-cv) zrobi to z Twojego profilu.

*Wymagania według STCW; państwo bandery może dodawać własne. Sprawdź je w administracji morskiej.*$pl$),
  'Deck', 'guide',
  'linear-gradient(135deg,#0e2a45,#8a6d1d)',
  true, '2026-10-10 09:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Ship''s master (captain): duties, requirements and how to become one');

-- ── 45. Chief Officer ────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Chief officer (chief mate): duties, requirements and the step to master',
    'ru', 'Старший помощник капитана (старпом): обязанности, требования и путь к капитану',
    'ua', 'Старший помічник капітана (старпом): обов''язки, вимоги та шлях до капітана',
    'pl', 'Starszy oficer (chief mate): obowiązki, wymagania i droga do kapitana'),
  jsonb_build_object(
    'en', $en$The **chief officer** — chief mate, or simply "chief" on deck — is second in command after the master and the head of the deck department. If the master is the one who decides, the chief officer is the one who makes the ship work.

## What the chief officer does

- **Cargo.** Loading and discharge plans, stowage, lashing, hold or tank preparation, and the documents that go with them. On a tanker the chief officer is usually the cargo officer.
- **Stability and ballast.** Calculations before and during cargo operations, ballast water management, draft and trim.
- **The deck crew.** Plans the bosun's and ABs' work, maintenance of hull, hatches, mooring and cargo gear, painting and rust removal, and the work-and-rest hours of the deck team.
- **Watchkeeping.** Usually keeps the **04:00–08:00 and 16:00–20:00** watches — dawn and dusk, when star sights were once taken.
- **Safety.** On many ships the chief officer is the safety officer and leads the emergency party in drills, and is often in charge of medical care on board.
- **Second in command.** Takes over if the master cannot act, and is the master's right hand with inspections and vetting.

## What it takes

Under **STCW Regulation II/2**, a chief mate's certificate for ships of 3,000 GT or more requires an officer-of-the-watch certificate and at least **12 months** of approved sea service — in practice, time as second or third officer. It is a management-level certificate: on top come your administration's exams and courses such as Medical Care, ERM/BRM and ECDIS, and for tankers and gas carriers the advanced cargo training.

## The path

Usually after one or two contracts as **second officer**. Companies like to promote from their own fleet: someone who already knows the vessel type, the procedures and the superintendents. From chief officer, the step to **master** needs the master's certificate and, under STCW, at least 12 months as chief officer for the shorter 24-month route.

## Pay and jobs

The chief officer is usually the second-highest-paid on deck, with a clear step up from second officer. The current range from real vacancies is on the [chief officer jobs page](/jobs/rank/chief-officer); a comparison by rank and vessel type is on our [salaries page](/salaries).

## Your CV

For a chief officer, crewing desks look at the cargo handled (and how), vessel types and sizes, and vetting experience on tankers. The [maritime CV](/maritime-cv) puts these first, and the tanker template brings the endorsements to the top.

*Requirements follow STCW; your flag state may add its own. Check them with your maritime administration.*$en$,
    'ru', $ru$**Старший помощник** — старпом, на палубе просто «чиф» — второй после капитана и глава палубной службы. Если капитан решает, то старпом делает так, чтобы судно работало.

## Чем занимается старпом

- **Груз.** Грузовые планы погрузки и выгрузки, укладка, крепление, подготовка трюмов или танков и все связанные документы. На танкере старпом обычно и есть грузовой помощник.
- **Остойчивость и балласт.** Расчёты до и во время грузовых операций, управление балластными водами, осадка и дифферент.
- **Палубная команда.** Планирует работу боцмана и матросов, обслуживание корпуса, люковых крышек, швартовного и грузового устройства, покраску и обивку ржавчины, следит за часами труда и отдыха палубы.
- **Вахта.** Обычно стоит вахту **с 04:00 до 08:00 и с 16:00 до 20:00** — рассвет и закат, когда когда-то брали высоты звёзд.
- **Безопасность.** На многих судах старпом — офицер по безопасности, руководит аварийной партией на учениях и часто отвечает за медицинскую помощь на борту.
- **Заместитель капитана.** Принимает командование, если капитан не может действовать, и помогает ему на инспекциях и вэттинге.

## Что для этого нужно

По **правилу II/2 ПДНВ (STCW)** для диплома старшего помощника на суда валовой вместимостью 3000 и более нужен диплом вахтенного помощника и не менее **12 месяцев** одобренного стажа — на практике вторым или третьим помощником. Это диплом уровня управления: сверху — экзамены администрации и курсы вроде Medical Care, ERM/BRM и ECDIS, а для танкеров и газовозов — расширенная грузовая подготовка.

## Путь

Обычно после одного-двух контрактов **вторым помощником**. Компании охотно повышают своих: того, кто уже знает тип судна, процедуры и суперинтендантов. Со старпома шаг к **капитану** требует капитанского диплома, а по ПДНВ сокращённый 24-месячный путь возможен при стаже старпомом не менее 12 месяцев.

## Зарплата и вакансии

Старпом обычно второй по зарплате на палубе, с заметным шагом вверх от второго помощника. Актуальный диапазон по реальным вакансиям — на странице [вакансий старпома](/ru/jobs/rank/chief-officer), сравнение по должностям и типам судов — на странице [зарплат](/ru/salaries).

## Ваше CV

В CV старпома крюинг смотрит, какие грузы вы возили и как, типы и размеры судов, а на танкерах — опыт вэттинга. [CV моряка](/ru/maritime-cv) ставит это в начало, а шаблон для танкеров поднимает наверх подтверждения.

*Требования — по ПДНВ (STCW); государство флага может добавлять свои. Уточняйте в морской администрации.*$ru$,
    'ua', $ua$**Старший помічник** — старпом, на палубі просто «чіф» — другий після капітана й голова палубної служби. Якщо капітан вирішує, то старпом робить так, щоб судно працювало.

## Чим займається старпом

- **Вантаж.** Вантажні плани завантаження й вивантаження, укладання, кріплення, підготовка трюмів чи танків і всі пов'язані документи. На танкері старпом зазвичай і є вантажним помічником.
- **Остійність і баласт.** Розрахунки до й під час вантажних операцій, керування баластними водами, осадка й диферент.
- **Палубна команда.** Планує роботу боцмана й матросів, обслуговування корпусу, люкових кришок, швартовного й вантажного пристроїв, фарбування й оббивання іржі, стежить за годинами праці й відпочинку палуби.
- **Вахта.** Зазвичай несе вахту **з 04:00 до 08:00 і з 16:00 до 20:00** — світанок і захід, коли колись брали висоти зірок.
- **Безпека.** На багатьох суднах старпом — офіцер із безпеки, керує аварійною партією на навчаннях і часто відповідає за медичну допомогу на борту.
- **Заступник капітана.** Приймає командування, якщо капітан не може діяти, і допомагає йому на інспекціях і веттингу.

## Що для цього потрібно

За **правилом II/2 ПДНВ (STCW)** для диплома старшого помічника на судна валовою місткістю 3000 і більше потрібен диплом вахтового помічника й не менше **12 місяців** схваленого стажу — на практиці другим чи третім помічником. Це диплом рівня управління: зверху — іспити адміністрації й курси на кшталт Medical Care, ERM/BRM і ECDIS, а для танкерів і газовозів — розширена вантажна підготовка.

## Шлях

Зазвичай після одного-двох контрактів **другим помічником**. Компанії охоче підвищують своїх: того, хто вже знає тип судна, процедури й суперінтендантів. Зі старпома крок до **капітана** вимагає капітанського диплома, а за ПДНВ скорочений 24-місячний шлях можливий за стажу старпомом щонайменше 12 місяців.

## Зарплата й вакансії

Старпом зазвичай другий за зарплатою на палубі, з помітним кроком угору від другого помічника. Актуальний діапазон за реальними вакансіями — на сторінці [вакансій старпома](/ua/jobs/rank/chief-officer), порівняння за посадами й типами суден — на сторінці [зарплат](/ua/salaries).

## Ваше CV

У CV старпома крюїнг дивиться, які вантажі ви возили й як, типи й розміри суден, а на танкерах — досвід веттингу. [CV моряка](/ua/maritime-cv) ставить це на початок, а шаблон для танкерів піднімає нагору підтвердження.

*Вимоги — за ПДНВ (STCW); держава прапора може додавати свої. Уточнюйте в морській адміністрації.*$ua$,
    'pl', $pl$**Starszy oficer** — chief mate, na pokładzie po prostu „chief” — jest drugi po kapitanie i kieruje działem pokładowym. Jeśli kapitan decyduje, to starszy oficer sprawia, że statek działa.

## Czym zajmuje się starszy oficer

- **Ładunek.** Plany załadunku i wyładunku, sztauowanie, mocowanie, przygotowanie ładowni lub zbiorników i cała związana dokumentacja. Na tankowcu starszy oficer jest zwykle oficerem ładunkowym.
- **Stateczność i balast.** Obliczenia przed i w trakcie operacji ładunkowych, zarządzanie wodami balastowymi, zanurzenie i przegłębienie.
- **Załoga pokładowa.** Planuje pracę bosmana i marynarzy, konserwację kadłuba, pokryw lukowych, urządzeń cumowniczych i ładunkowych, malowanie i odrdzewianie, pilnuje godzin pracy i odpoczynku pokładu.
- **Wachta.** Zwykle pełni wachtę **04:00–08:00 i 16:00–20:00** — o świcie i o zmierzchu, gdy kiedyś mierzono wysokości gwiazd.
- **Bezpieczeństwo.** Na wielu statkach starszy oficer jest oficerem ds. bezpieczeństwa, kieruje grupą awaryjną podczas ćwiczeń i często odpowiada za opiekę medyczną na burcie.
- **Zastępca kapitana.** Przejmuje dowodzenie, gdy kapitan nie może działać, i wspiera go przy inspekcjach i vettingu.

## Czego to wymaga

Zgodnie z **prawidłem II/2 STCW** dyplom starszego oficera na statkach o pojemności brutto 3000 i więcej wymaga dyplomu oficera wachtowego i co najmniej **12 miesięcy** zatwierdzonej praktyki pływania — w praktyce jako drugi lub trzeci oficer. To dyplom poziomu zarządzania: dochodzą egzaminy administracji i kursy takie jak Medical Care, ERM/BRM i ECDIS, a na tankowcach i gazowcach — zaawansowane szkolenie ładunkowe.

## Ścieżka

Zwykle po jednym lub dwóch kontraktach jako **drugi oficer**. Firmy chętnie awansują swoich: kogoś, kto zna już typ statku, procedury i inspektorów armatora. Krok od starszego oficera do **kapitana** wymaga dyplomu kapitana, a według STCW krótsza, 24-miesięczna droga jest możliwa po co najmniej 12 miesiącach jako starszy oficer.

## Wynagrodzenie i oferty

Starszy oficer zarabia zwykle najwięcej na pokładzie zaraz po kapitanie, z wyraźnym skokiem względem drugiego oficera. Aktualny przedział z prawdziwych ofert jest na stronie [ofert dla starszych oficerów](/pl/jobs/rank/chief-officer), a porównanie stanowisk i typów statków — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

W CV starszego oficera agencja patrzy, jakie ładunki przewoziłeś i jak, na typy i wielkości statków, a na tankowcach — na doświadczenie z vettingiem. [CV marynarza](/pl/maritime-cv) stawia to na początku, a szablon tankowcowy wyciąga potwierdzenia na górę.

*Wymagania według STCW; państwo bandery może dodawać własne. Sprawdź je w administracji morskiej.*$pl$),
  'Deck', 'guide',
  'linear-gradient(135deg,#0e2a45,#2a6f97)',
  true, '2026-10-10 09:10:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Chief officer (chief mate): duties, requirements and the step to master');

-- ── 46. Second Officer ───────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Second officer on a ship: duties, watch, requirements and promotion',
    'ru', 'Второй помощник капитана: обязанности, вахта, требования и повышение',
    'ua', 'Другий помічник капітана: обов''язки, вахта, вимоги та підвищення',
    'pl', 'Drugi oficer na statku: obowiązki, wachta, wymagania i awans'),
  jsonb_build_object(
    'en', $en$The **second officer** is the ship's **navigating officer**. Every passage the ship makes starts on their chart table — or, today, on their ECDIS.

## What the second officer does

- **Passage planning.** Prepares the berth-to-berth plan for the master's approval: route, safe depths, no-go areas, reporting points, tidal windows, weather routing.
- **Charts and publications.** Keeps the electronic and paper charts, Notices to Mariners, lists of lights and radio signals and sailing directions up to date.
- **Navigation equipment.** ECDIS, radars, GPS, gyro and magnetic compasses, echo sounder, AIS — checks, error logs and defects reported.
- **Watchkeeping.** Usually keeps the **00:00–04:00 and 12:00–16:00** watches, the "graveyard" watch at night.
- **Other duties** vary by company: often the GMDSS equipment and radio log, and on many ships medical stores and first aid.
- **In port and at manoeuvres.** Usually stationed aft at mooring, and assists with cargo watches.

## What it takes

The second officer holds the same certificate as the third: **officer in charge of a navigational watch**, STCW Regulation II/1. That requires at least 12 months of approved sea service as part of an approved training programme (or 36 months otherwise), including at least six months of bridge watchkeeping under supervision, plus the GMDSS operator certificate and the basic safety courses. What separates second from third is experience, not paper: companies promote after one or two contracts as third officer.

Courses the companies ask for almost everywhere: **ECDIS** (generic and type-specific), **ERM/BRM**, and for tankers or gas carriers the cargo familiarisation courses.

## The path

Third officer → **second officer** → chief officer. The step to chief officer needs the chief mate's certificate under STCW II/2 and at least 12 months of approved sea service as an officer of the watch.

## Pay and jobs

A clear step up from third officer, and a big one again to chief officer. The current range from real vacancies is on the [second officer jobs page](/jobs/rank/2nd-officer); a comparison by rank and vessel type is on our [salaries page](/salaries).

## Your CV

Crewing desks look for the vessel types, ECDIS types you have worked with and the trading areas. List them in the [maritime CV](/maritime-cv) — it puts them where a manager looks first.

*Requirements follow STCW; your flag state may add its own. Check them with your maritime administration.*$en$,
    'ru', $ru$**Второй помощник** — **штурман-навигатор** судна. Каждый переход начинается на его штурманском столе, а сегодня — в его ECDIS.

## Чем занимается второй помощник

- **План перехода.** Готовит план «от причала до причала» на утверждение капитану: маршрут, безопасные глубины, опасные районы, точки докладов, приливные окна, погодную проводку.
- **Карты и пособия.** Держит в актуальном состоянии электронные и бумажные карты, извещения мореплавателям, огни и знаки, радиосигналы и лоции.
- **Навигационное оборудование.** ECDIS, радары, GPS, гиро- и магнитный компасы, эхолот, АИС — проверки, журналы поправок, доклады о неисправностях.
- **Вахта.** Обычно стоит **с 00:00 до 04:00 и с 12:00 до 16:00** — ночная «собака».
- **Другие обязанности** зависят от компании: часто ГМССБ и радиожурнал, а на многих судах — медикаменты и первая помощь.
- **В порту и на швартовках.** Обычно на корме при швартовке, помогает с грузовыми вахтами.

## Что для этого нужно

У второго помощника тот же диплом, что и у третьего: **вахтенный помощник капитана**, правило II/1 ПДНВ (STCW). Для него нужно не менее 12 месяцев одобренного стажа в рамках одобренной программы подготовки (иначе 36 месяцев), включая не менее шести месяцев ходовых вахт под наблюдением, плюс диплом оператора ГМССБ и базовые курсы безопасности. Второго от третьего отличает опыт, а не бумага: компании повышают после одного-двух контрактов третьим помощником.

Курсы, которые просят почти везде: **ECDIS** (общий и на конкретный тип), **ERM/BRM**, а для танкеров и газовозов — курсы начальной грузовой подготовки.

## Путь

Третий помощник → **второй помощник** → старший помощник. Для шага к старпому нужен диплом по правилу II/2 ПДНВ и не менее 12 месяцев одобренного стажа вахтенным помощником.

## Зарплата и вакансии

Заметный шаг вверх от третьего помощника и ещё один большой — к старпому. Актуальный диапазон по реальным вакансиям — на странице [вакансий второго помощника](/ru/jobs/rank/2nd-officer), сравнение по должностям и типам судов — на странице [зарплат](/ru/salaries).

## Ваше CV

Крюинг ищет в CV типы судов, типы ECDIS, с которыми вы работали, и районы плавания. Укажите их в [CV моряка](/ru/maritime-cv) — оно ставит их туда, куда менеджер смотрит первым.

*Требования — по ПДНВ (STCW); государство флага может добавлять свои. Уточняйте в морской администрации.*$ru$,
    'ua', $ua$**Другий помічник** — **штурман-навігатор** судна. Кожен перехід починається на його штурманському столі, а сьогодні — в його ECDIS.

## Чим займається другий помічник

- **План переходу.** Готує план «від причалу до причалу» на затвердження капітанові: маршрут, безпечні глибини, небезпечні райони, точки доповідей, припливні вікна, погодне проведення.
- **Карти й посібники.** Тримає в актуальному стані електронні й паперові карти, повідомлення мореплавцям, вогні та знаки, радіосигнали й лоції.
- **Навігаційне обладнання.** ECDIS, радари, GPS, гіро- й магнітний компаси, ехолот, АІС — перевірки, журнали поправок, доповіді про несправності.
- **Вахта.** Зазвичай несе **з 00:00 до 04:00 і з 12:00 до 16:00** — нічна «собака».
- **Інші обов'язки** залежать від компанії: часто ГМЗЛБ і радіожурнал, а на багатьох суднах — медикаменти й перша допомога.
- **У порту й на швартуваннях.** Зазвичай на кормі під час швартування, допомагає з вантажними вахтами.

## Що для цього потрібно

У другого помічника той самий диплом, що й у третього: **вахтовий помічник капітана**, правило II/1 ПДНВ (STCW). Для нього потрібно щонайменше 12 місяців схваленого стажу в межах схваленої програми підготовки (інакше 36 місяців), зокрема щонайменше шість місяців ходових вахт під наглядом, плюс диплом оператора ГМЗЛБ і базові курси безпеки. Другого від третього відрізняє досвід, а не папір: компанії підвищують після одного-двох контрактів третім помічником.

Курси, які просять майже скрізь: **ECDIS** (загальний і на конкретний тип), **ERM/BRM**, а для танкерів і газовозів — курси початкової вантажної підготовки.

## Шлях

Третій помічник → **другий помічник** → старший помічник. Для кроку до старпома потрібен диплом за правилом II/2 ПДНВ і щонайменше 12 місяців схваленого стажу вахтовим помічником.

## Зарплата й вакансії

Помітний крок угору від третього помічника й ще один великий — до старпома. Актуальний діапазон за реальними вакансіями — на сторінці [вакансій другого помічника](/ua/jobs/rank/2nd-officer), порівняння за посадами й типами суден — на сторінці [зарплат](/ua/salaries).

## Ваше CV

Крюїнг шукає в CV типи суден, типи ECDIS, з якими ви працювали, і райони плавання. Зазначте їх у [CV моряка](/ua/maritime-cv) — воно ставить їх туди, куди менеджер дивиться першим.

*Вимоги — за ПДНВ (STCW); держава прапора може додавати свої. Уточнюйте в морській адміністрації.*$ua$,
    'pl', $pl$**Drugi oficer** to **oficer nawigacyjny** statku. Każda podróż zaczyna się na jego stole nawigacyjnym — a dziś w jego ECDIS.

## Czym zajmuje się drugi oficer

- **Plan podróży.** Przygotowuje plan „od nabrzeża do nabrzeża” do zatwierdzenia przez kapitana: trasa, bezpieczne głębokości, obszary zakazane, punkty meldunkowe, okna pływowe, prowadzenie pogodowe.
- **Mapy i publikacje.** Aktualizuje mapy elektroniczne i papierowe, Wiadomości Żeglarskie, spisy świateł i sygnałów radiowych oraz locje.
- **Urządzenia nawigacyjne.** ECDIS, radary, GPS, żyrokompas i kompas magnetyczny, echosonda, AIS — kontrole, dzienniki poprawek, zgłaszanie usterek.
- **Wachta.** Zwykle pełni wachtę **00:00–04:00 i 12:00–16:00** — nocną „psią wachtę”.
- **Inne obowiązki** zależą od firmy: często GMDSS i dziennik radiowy, a na wielu statkach apteczka i pierwsza pomoc.
- **W porcie i przy manewrach.** Zwykle na rufie przy cumowaniu, pomaga przy wachtach ładunkowych.

## Czego to wymaga

Drugi oficer ma ten sam dyplom co trzeci: **oficer wachtowy**, prawidło II/1 STCW. Wymaga on co najmniej 12 miesięcy zatwierdzonej praktyki w ramach zatwierdzonego programu szkolenia (inaczej 36 miesięcy), w tym co najmniej sześciu miesięcy wacht nawigacyjnych pod nadzorem, a także świadectwa operatora GMDSS i podstawowych kursów bezpieczeństwa. Drugiego od trzeciego odróżnia doświadczenie, nie papier: firmy awansują po jednym lub dwóch kontraktach jako trzeci oficer.

Kursy, o które proszą prawie wszędzie: **ECDIS** (ogólny i typowy), **ERM/BRM**, a na tankowce i gazowce — podstawowe kursy ładunkowe.

## Ścieżka

Trzeci oficer → **drugi oficer** → starszy oficer. Krok do starszego oficera wymaga dyplomu z prawidła II/2 STCW i co najmniej 12 miesięcy zatwierdzonej praktyki jako oficer wachtowy.

## Wynagrodzenie i oferty

Wyraźny krok w górę względem trzeciego oficera i kolejny duży — do starszego oficera. Aktualny przedział z prawdziwych ofert jest na stronie [ofert dla drugich oficerów](/pl/jobs/rank/2nd-officer), a porównanie stanowisk i typów statków — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

Agencja szuka w CV typów statków, typów ECDIS, na których pracowałeś, i rejonów pływania. Wpisz je w [CV marynarza](/pl/maritime-cv) — stawia je tam, gdzie menedżer patrzy najpierw.

*Wymagania według STCW; państwo bandery może dodawać własne. Sprawdź je w administracji morskiej.*$pl$),
  'Deck', 'guide',
  'linear-gradient(135deg,#0e2a45,#13647a)',
  true, '2026-10-10 09:20:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Second officer on a ship: duties, watch, requirements and promotion');

-- ── 47. Third Officer ────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Third officer on a ship: duties, the first officer''s certificate and the first contract',
    'ru', 'Третий помощник капитана: обязанности, первый диплом и первый контракт',
    'ua', 'Третій помічник капітана: обов''язки, перший диплом і перший контракт',
    'pl', 'Trzeci oficer na statku: obowiązki, pierwszy dyplom i pierwszy kontrakt'),
  jsonb_build_object(
    'en', $en$The **third officer** is the first officer's rank a deck cadet reaches — the moment you stand a bridge watch on your own. It is also the rank with the hardest first step: every company wants a third officer with experience, and nobody has it at the start.

## What the third officer does

- **Watchkeeping.** Usually keeps the **08:00–12:00 and 20:00–24:00** watches, often the one the master is most likely to visit.
- **Safety equipment.** Usually in charge of the life-saving and fire-fighting equipment: lifeboats and rafts, lifejackets and immersion suits, fire extinguishers, breathing apparatus, the monthly and weekly checks and their records.
- **Assisting the master.** On many ships helps with port papers, crew lists and arrival documents, and keeps the flags and signals.
- **Moorings and cargo.** Usually forward at mooring with the bosun, and keeps cargo watches in port.

## What it takes

The certificate is **officer in charge of a navigational watch** under STCW Regulation II/1, for ships of 500 GT or more:

- at least **18 years** old;
- at least **12 months** of approved sea service as part of an approved training programme with a training record book — or **36 months** without one;
- of that, at least **six months of bridge watchkeeping** under the supervision of the master or a qualified officer;
- the **GMDSS** operator certificate, the basic safety courses, Advanced Fire Fighting, Medical First Aid and survival craft (PSCRB);
- the exams of your maritime administration.

Companies almost always add **ECDIS** (and a type-specific course for their equipment) and **ERM/BRM**.

## The first contract

The certificate is the easy part. The hard part is the first company. What works:

1. **Stay with the company you were a cadet with.** It is the most common way — they already know you.
2. **Accept the vessel type that is hiring** — bulk carriers and general cargo take juniors more often than tankers and gas carriers.
3. **Show the cadet time in detail** in your CV: vessel types, months, what you did on the bridge.
4. **Apply widely** and keep your documents valid — a missing course is the most common reason for a fast "no".

## Pay and the path

Third officer is the entry level for officers; the step to second officer usually comes after one or two contracts. The current range from real vacancies is on the [third officer jobs page](/jobs/rank/3rd-officer), and a comparison by rank on our [salaries page](/salaries).

## Your CV

For a junior officer, the [maritime CV](/maritime-cv) matters more than for anyone: it shows the cadet sea service, the courses and their dates on one page, the way crewing managers read them.

*Requirements follow STCW; your flag state may add its own. Check them with your maritime administration.*$en$,
    'ru', $ru$**Третий помощник** — первая офицерская должность, до которой доходит палубный кадет: момент, когда вы впервые стоите ходовую вахту сами. И должность с самым трудным первым шагом: каждой компании нужен третий помощник с опытом, а в начале его нет ни у кого.

## Чем занимается третий помощник

- **Вахта.** Обычно стоит **с 08:00 до 12:00 и с 20:00 до 24:00** — ту вахту, на которую чаще всего заходит капитан.
- **Спасательное и противопожарное оборудование.** Обычно отвечает за шлюпки и плоты, спасательные жилеты и гидрокостюмы, огнетушители, дыхательные аппараты, еженедельные и ежемесячные проверки и их записи.
- **Помощь капитану.** На многих судах помогает с портовыми документами, судовыми ролями и приходными бумагами, ведёт флаги и сигналы.
- **Швартовка и груз.** Обычно на баке при швартовке вместе с боцманом, несёт грузовые вахты в порту.

## Что для этого нужно

Нужен диплом **вахтенного помощника капитана** по правилу II/1 ПДНВ (STCW) для судов валовой вместимостью 500 и более:

- возраст не менее **18 лет**;
- не менее **12 месяцев** одобренного стажа в рамках одобренной программы подготовки с книжкой регистрации подготовки — или **36 месяцев** без неё;
- из них не менее **шести месяцев ходовых вахт** под наблюдением капитана или квалифицированного помощника;
- диплом оператора **ГМССБ**, базовые курсы безопасности, Advanced Fire Fighting, Medical First Aid и спасательные средства (PSCRB);
- экзамены морской администрации.

Компании почти всегда добавляют **ECDIS** (и курс на конкретный тип их оборудования) и **ERM/BRM**.

## Первый контракт

Диплом — лёгкая часть. Трудная — первая компания. Что работает:

1. **Оставайтесь в компании, где были кадетом.** Это самый частый путь: вас там уже знают.
2. **Соглашайтесь на тот тип судна, где берут**: балкеры и генгруз берут младших чаще, чем танкеры и газовозы.
3. **Подробно покажите кадетский стаж** в CV: типы судов, месяцы, что вы делали на мостике.
4. **Подавайтесь широко** и держите документы действующими: недостающий курс — самая частая причина быстрого «нет».

## Зарплата и путь

Третий помощник — начальный уровень для офицеров; шаг ко второму помощнику обычно приходит после одного-двух контрактов. Актуальный диапазон по реальным вакансиям — на странице [вакансий третьего помощника](/ru/jobs/rank/3rd-officer), сравнение по должностям — на странице [зарплат](/ru/salaries).

## Ваше CV

Для младшего офицера [CV моряка](/ru/maritime-cv) важнее, чем для кого-либо: оно показывает кадетский стаж, курсы и их сроки на одной странице — так, как их читают крюинг-менеджеры.

*Требования — по ПДНВ (STCW); государство флага может добавлять свои. Уточняйте в морской администрации.*$ru$,
    'ua', $ua$**Третій помічник** — перша офіцерська посада, до якої доходить палубний кадет: момент, коли ви вперше несете ходову вахту самостійно. І посада з найважчим першим кроком: кожній компанії потрібен третій помічник із досвідом, а на початку його немає ні в кого.

## Чим займається третій помічник

- **Вахта.** Зазвичай несе **з 08:00 до 12:00 і з 20:00 до 24:00** — ту вахту, на яку найчастіше заходить капітан.
- **Рятувальне й протипожежне обладнання.** Зазвичай відповідає за шлюпки й плоти, рятувальні жилети й гідрокостюми, вогнегасники, дихальні апарати, щотижневі й щомісячні перевірки та їхні записи.
- **Допомога капітанові.** На багатьох суднах допомагає з портовими документами, судновими ролями й прихідними паперами, веде прапори й сигнали.
- **Швартування й вантаж.** Зазвичай на баку під час швартування разом із боцманом, несе вантажні вахти в порту.

## Що для цього потрібно

Потрібен диплом **вахтового помічника капітана** за правилом II/1 ПДНВ (STCW) для суден валовою місткістю 500 і більше:

- вік щонайменше **18 років**;
- щонайменше **12 місяців** схваленого стажу в межах схваленої програми підготовки з книжкою реєстрації підготовки — або **36 місяців** без неї;
- з них щонайменше **шість місяців ходових вахт** під наглядом капітана чи кваліфікованого помічника;
- диплом оператора **ГМЗЛБ**, базові курси безпеки, Advanced Fire Fighting, Medical First Aid і рятувальні засоби (PSCRB);
- іспити морської адміністрації.

Компанії майже завжди додають **ECDIS** (і курс на конкретний тип їхнього обладнання) та **ERM/BRM**.

## Перший контракт

Диплом — легка частина. Важка — перша компанія. Що працює:

1. **Залишайтеся в компанії, де були кадетом.** Це найчастіший шлях: вас там уже знають.
2. **Погоджуйтеся на той тип судна, де беруть**: балкери й генвантаж беруть молодших частіше, ніж танкери й газовози.
3. **Детально покажіть кадетський стаж** у CV: типи суден, місяці, що ви робили на містку.
4. **Подавайтеся широко** й тримайте документи чинними: відсутній курс — найчастіша причина швидкого «ні».

## Зарплата й шлях

Третій помічник — початковий рівень для офіцерів; крок до другого помічника зазвичай приходить після одного-двох контрактів. Актуальний діапазон за реальними вакансіями — на сторінці [вакансій третього помічника](/ua/jobs/rank/3rd-officer), порівняння за посадами — на сторінці [зарплат](/ua/salaries).

## Ваше CV

Для молодшого офіцера [CV моряка](/ua/maritime-cv) важливіше, ніж для будь-кого: воно показує кадетський стаж, курси та їхні строки на одній сторінці — так, як їх читають крюїнг-менеджери.

*Вимоги — за ПДНВ (STCW); держава прапора може додавати свої. Уточнюйте в морській адміністрації.*$ua$,
    'pl', $pl$**Trzeci oficer** to pierwsze stanowisko oficerskie, do którego dochodzi kadet pokładowy — moment, gdy pierwszy raz samodzielnie pełnisz wachtę na mostku. I stanowisko z najtrudniejszym pierwszym krokiem: każda firma chce trzeciego oficera z doświadczeniem, a na początku nikt go nie ma.

## Czym zajmuje się trzeci oficer

- **Wachta.** Zwykle pełni wachtę **08:00–12:00 i 20:00–24:00** — tę, na którą kapitan zagląda najczęściej.
- **Sprzęt ratunkowy i przeciwpożarowy.** Zwykle odpowiada za szalupy i tratwy, kamizelki i kombinezony ratunkowe, gaśnice, aparaty oddechowe, cotygodniowe i comiesięczne przeglądy oraz ich zapisy.
- **Pomoc kapitanowi.** Na wielu statkach pomaga przy dokumentach portowych, listach załogi i papierach na wejście, prowadzi flagi i sygnały.
- **Cumowanie i ładunek.** Zwykle na dziobie przy cumowaniu razem z bosmanem, pełni wachty ładunkowe w porcie.

## Czego to wymaga

Potrzebny jest dyplom **oficera wachtowego** z prawidła II/1 STCW na statki o pojemności brutto 500 i więcej:

- co najmniej **18 lat**;
- co najmniej **12 miesięcy** zatwierdzonej praktyki w ramach zatwierdzonego programu szkolenia z książką praktyk — lub **36 miesięcy** bez niej;
- w tym co najmniej **sześć miesięcy wacht nawigacyjnych** pod nadzorem kapitana lub wykwalifikowanego oficera;
- świadectwo operatora **GMDSS**, podstawowe kursy bezpieczeństwa, Advanced Fire Fighting, Medical First Aid i środki ratunkowe (PSCRB);
- egzaminy administracji morskiej.

Firmy prawie zawsze dodają **ECDIS** (i kurs typowy dla ich sprzętu) oraz **ERM/BRM**.

## Pierwszy kontrakt

Dyplom to łatwa część. Trudna — pierwsza firma. Co działa:

1. **Zostań w firmie, w której byłeś kadetem.** To najczęstsza droga: już Cię tam znają.
2. **Przyjmij typ statku, na który biorą**: masowce i drobnicowce przyjmują młodszych częściej niż tankowce i gazowce.
3. **Pokaż szczegółowo praktykę kadecką** w CV: typy statków, miesiące, co robiłeś na mostku.
4. **Aplikuj szeroko** i pilnuj ważności dokumentów: brakujący kurs to najczęstszy powód szybkiego „nie”.

## Wynagrodzenie i ścieżka

Trzeci oficer to poziom wejściowy dla oficerów; awans na drugiego oficera przychodzi zwykle po jednym lub dwóch kontraktach. Aktualny przedział z prawdziwych ofert jest na stronie [ofert dla trzecich oficerów](/pl/jobs/rank/3rd-officer), a porównanie stanowisk — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

Dla młodszego oficera [CV marynarza](/pl/maritime-cv) ma większe znaczenie niż dla kogokolwiek: pokazuje praktykę kadecką, kursy i ich terminy na jednej stronie — tak, jak czytają je menedżerowie agencji.

*Wymagania według STCW; państwo bandery może dodawać własne. Sprawdź je w administracji morskiej.*$pl$),
  'Deck', 'guide',
  'linear-gradient(135deg,#0e2a45,#1d6fa5)',
  true, '2026-10-10 09:30:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Third officer on a ship: duties, the first officer''s certificate and the first contract');

-- ── Covers ───────────────────────────────────────────────────────────────────
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/master.png?v=1'
WHERE title->>'en' = 'Ship''s master (captain): duties, requirements and how to become one' AND coalesce(cover_url,'')='';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/chief-officer.png?v=1'
WHERE title->>'en' = 'Chief officer (chief mate): duties, requirements and the step to master' AND coalesce(cover_url,'')='';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/second-officer.png?v=1'
WHERE title->>'en' = 'Second officer on a ship: duties, watch, requirements and promotion' AND coalesce(cover_url,'')='';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/third-officer.png?v=1'
WHERE title->>'en' = 'Third officer on a ship: duties, the first officer''s certificate and the first contract' AND coalesce(cover_url,'')='';
