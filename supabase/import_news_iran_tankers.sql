-- News article: Iran tankers breaching the US blockade line (17.06.2026)
-- Published immediately, with EN/RU provided by the user and UK/PL translated.
-- Run this whole script once in the Supabase SQL Editor.

DO $$
DECLARE
  title_en TEXT := $en$Iran Tests the Waters: First Tankers Breach US Blockade Line Amid Signals of Loosening Tension$en$;
  title_ru TEXT := $ru$Перезагрузка в Персидском заливе: первые нефтяные танкеры Ирана прорывают блокаду США$ru$;
  title_uk TEXT := $uk$Перезавантаження в Персидській затоці: перші нафтові танкери Ірану проривають блокаду США$uk$;
  title_pl TEXT := $pl$Restart w Zatoce Perskiej: pierwsze irańskie tankowce przełamują blokadę USA$pl$;

  body_en TEXT := $en$After a months-long standoff, there are signs that the naval blockade around Iran may be easing, with the first Iranian tankers observed breaching the line to export crude oil. The consulting firm TankerTrackers.com, which has been meticulously logging the movement, noted that while a small number of empty "shadow fleet" tankers had been sneaking into Iranian waters for weeks to provide floating storage, a dynamic shift occurred this week.

US Central Command has officially maintained that the blockade is in effect until June 19th. However, two Iranian-owned Very Large Crude Carriers (VLCCs), the Diona (IMO 9569695) and the Hero2 (IMO 9362073), both owned by NITC, turned on their AIS transponders on Tuesday and made the unprecedented outbound run. They were followed shortly by a Suezmax tanker, the Sonia I (IMO 9357365), also an NITC vessel, as confirmed by Pole Star Global. These moves are the definitive signals of a change in posture.

"These are Iran's first crude oil exports in two months," TankerTrackers.com reported. This analysis was reinforced by tracking firm Kpler, which identified a total of four Iran-linked tankers exiting the Gulf of Oman, signaling a potent motivation for Iran to clear its stored inventory.

This movement is the strongest evidence to date that the extreme navigational restrictions in the strait are being relaxed, likely tied to a recently signed Memorandum of Understanding (MOU). This relaxation is not a complete de-escalation, however. Reports suggest that Iranian forces have continued to launch small-scale drone attacks at ships in the Strait of Hormuz since the MOU was signed. Central Command's Joint Maritime Information Center (JMIC) maintains that a "substantial" risk to navigation persists in the area.

Despite the remaining risks, the market is bracing for a rush. A massive amount of global tanker tonnage is currently converging on the region, positioning itself to seize the moment when the Strait of Hormuz formally reopens. Goldman Sachs estimates that over 800 million barrels of tanker capacity—representing a substantial portion of the global fleet—is within five days' sailing distance of the strait.

The maritime intelligence firm Windward noted, "VLCCs signaling the UAE as their next destination are tracked sailing from as far as the South China Sea and across the Indian Ocean." According to their data, "At least 23 VLCCs are currently heading for the UAE ports of Khor Fakkan or Fujairah... joining at least 30 already at anchorage there."

The critical bottleneck remains war risk insurance cover, as is standard in conflict zones. The Trump administration is reportedly encouraging insurers to provide viable commercial cover and has even considered implementing a "VIP pass" system. This novel concept would include a "pay-for" element, potentially providing commercial shipowners with the security benefit of US Navy escorts, which has not previously been available.

For now, caution prevails among the largest fleet owners. "Most shipowners appear to be cautiously awaiting more details before planning new transits," Niels Rasmussen, chief analyst at BIMCO, told CNBC. "They will seek reassurance that transits are not only permitted but also safe before sending their ships through the strait."$en$;

  body_ru TEXT := $ru$После нескольких месяцев жесткого противостояния блокада вокруг Ирана начала демонстрировать признаки ослабления. Впервые за долгое время зафиксирован выход иранских танкеров с сырой нефтью на экспорт. Аналитическая компания TankerTrackers.com, внимательно отслеживающая перемещения судов в регионе, сообщила о динамическом сдвиге: если раньше «теневой флот» пустых танкеров пробирался в иранские воды лишь для использования в качестве плавучих хранилищ, то на этой неделе ситуация изменилась.

Хотя Центральное командование США (CENTCOM) официально заявляло, что режим блокады сохраняется как минимум до 19 июня, два иранских сверхкрупных нефтяных танкера (VLCC) — Diona (IMO 9569695) и Hero2 (IMO 9362073), принадлежащие Национальной иранской танкерной компании (NITC), — во вторник включили свои транспондеры АИС и совершили беспрецедентный рейс на выход из залива. Вскоре за ними последовал танкер типоразмера Suezmax — Sonia I (IMO 9357365), также принадлежащий NITC. Данный маневр подтверждается данными Pole Star Global.

«Это первые экспортные поставки сырой нефти из Ирана за два месяца», — констатируют в TankerTrackers.com. Данные выводы подтверждаются и аналитиками Kpler, зафиксировавшими выход в общей сложности четырех связанных с Ираном танкеров из Оманского залива, что указывает на высокую мотивацию Тегерана по реализации накопленных запасов.

Текущие перемещения судов — это, пожалуй, самое убедительное на данный момент свидетельство смягчения навигационных ограничений в проливе, вероятно, связанное с недавно подписанным Меморандумом о взаимопонимании (MOU). Тем не менее, говорить о полной деэскалации пока рано. По сообщениям NBC News, иранские силы продолжили наносить точечные удары с использованием дронов по судам в Ормузском проливе уже после подписания меморандума. Объединенный морской информационный центр CENTCOM (JMIC) по-прежнему предупреждает судоходные компании о «существенном» риске для навигации в данном районе.

Несмотря на сохраняющиеся риски, рынок готовится к резкому росту активности. Огромный тоннаж мирового танкерного флота в данный момент стягивается к региону в балласте, готовясь использовать момент официального открытия Ормузского пролива. По оценкам Goldman Sachs, мощности танкеров, способных принять более 800 миллионов баррелей нефти, находятся на расстоянии не более пяти дней пути от пролива и готовы приступить к погрузке накопленной нефти для ее доставки на мировые рынки.

В аналитической записке компании Windward, специализирующейся на морской разведке, отмечается: «VLCC, указывающие ОАЭ в качестве следующего пункта назначения, отслеживаются на пути из Южно-Китайского моря и через Индийский океан». По их данным, «как минимум 23 VLCC в настоящее время направляются к портам ОАЭ Хор-Факкан или Эль-Фуджайра... присоединяясь к как минимум 30 судам, уже стоящим там на якоре».

Критическим препятствием остается вопрос страхования военных рисков, что является стандартной практикой для зон конфликтов. По данным Politico, администрация Трампа поощряет страховщиков к скорейшему предоставлению коммерчески жизнеспособного страхового покрытия для пролива и даже рассматривает возможность внедрения системы «VIP-пропусков». Эта концепция может включать платный элемент, предоставляющий коммерческим судовладельцам доступ к конвоированию ВМС США — услуге, которая ранее была недоступна.

На данный момент среди крупнейших судовладельцев преобладает осторожность. «Большинство судовладельцев, похоже, осторожно ожидают более подробной информации, прежде чем планировать новые рейсы через Ормузский пролив», — сообщил CNBC Нильс Расмуссен, главный аналитик ассоциации BIMCO. «Прежде чем отправлять свои суда через пролив, они захотят получить заверения в том, что проход не только разрешен, но и безопасен».$ru$;

  body_uk TEXT := $uk$Після кількамісячного жорсткого протистояння блокада навколо Ірану почала демонструвати ознаки послаблення. Вперше за тривалий час зафіксовано вихід іранських танкерів із сирою нафтою на експорт. Аналітична компанія TankerTrackers.com, яка уважно стежить за рухом суден у регіоні, повідомила про динамічний зсув: якщо раніше «тіньовий флот» порожніх танкерів пробирався в іранські води лише для використання як плавучі сховища, то цього тижня ситуація змінилася.

Хоча Центральне командування США (CENTCOM) офіційно заявляло, що режим блокади зберігається щонайменше до 19 червня, два іранські супервеликі нафтові танкери (VLCC) — Diona (IMO 9569695) та Hero2 (IMO 9362073), що належать Національній іранській танкерній компанії (NITC), — у вівторок увімкнули свої транспондери АІС і здійснили безпрецедентний рейс на вихід із затоки. Невдовзі за ними пішов танкер типорозміру Suezmax — Sonia I (IMO 9357365), що теж належить NITC. Цей маневр підтверджується даними Pole Star Global.

«Це перші експортні постачання сирої нафти з Ірану за два місяці», — констатують у TankerTrackers.com. Ці висновки підтверджують й аналітики Kpler, які зафіксували вихід загалом чотирьох пов'язаних з Іраном танкерів з Оманської затоки, що вказує на високу мотивацію Тегерана реалізувати накопичені запаси.

Поточний рух суден — це, мабуть, найпереконливіший на сьогодні доказ послаблення навігаційних обмежень у проливі, ймовірно, пов'язаний із нещодавно підписаним Меморандумом про взаєморозуміння (MOU). Утім, говорити про повну деескалацію ще зарано. За повідомленнями NBC News, іранські сили продовжили завдавати точкових ударів дронами по суднах у Ормузькій протоці навіть після підписання меморандуму. Об'єднаний морський інформаційний центр CENTCOM (JMIC) і надалі попереджає судноплавні компанії про «суттєвий» ризик для навігації в цьому районі.

Незважаючи на ризики, що залишаються, ринок готується до різкого зростання активності. Величезний тоннаж світового танкерного флоту наразі стягується до регіону в баласті, готуючись скористатися моментом офіційного відкриття Ормузької протоки. За оцінками Goldman Sachs, потужності танкерів, здатних прийняти понад 800 мільйонів барелів нафти, перебувають на відстані не більше п'яти днів шляху від протоки і готові розпочати завантаження накопиченої нафти для її доставки на світові ринки.

В аналітичній записці компанії Windward, що спеціалізується на морській розвідці, зазначається: «VLCC, які вказують ОАЕ як наступний пункт призначення, відстежуються на шляху з Південно-Китайського моря та через Індійський океан». За їхніми даними, «щонайменше 23 VLCC наразі прямують до портів ОАЕ Хор-Факкан або Ель-Фуджейра... приєднуючись щонайменше до 30 суден, які вже стоять там на якорі».

Критичною перешкодою залишається питання страхування воєнних ризиків, що є стандартною практикою для зон конфлікту. За даними Politico, адміністрація Трампа заохочує страховиків якнайшвидше надати комерційно життєздатне страхове покриття для протоки і навіть розглядає можливість впровадження системи «VIP-пропусків». Ця концепція може включати платний елемент, що надаватиме комерційним судновласникам доступ до супроводу ВМС США — послуги, яка раніше була недоступною.

Наразі серед найбільших судновласників переважає обережність. «Більшість судновласників, схоже, обережно очікують детальнішої інформації, перш ніж планувати нові рейси через Ормузьку протоку», — повідомив CNBC Нільс Расмуссен, головний аналітик асоціації BIMCO. «Перш ніж відправляти свої судна через протоку, вони захочуть отримати підтвердження того, що прохід не лише дозволений, а й безпечний».$uk$;

  body_pl TEXT := $pl$Po wielomiesięcznym, twardym napięciu blokada wokół Iranu zaczęła wykazywać oznaki słabnięcia. Po raz pierwszy od dawna odnotowano wyjście irańskich tankowców z ropą naftową na eksport. Firma analityczna TankerTrackers.com, która dokładnie śledzi ruch statków w regionie, poinformowała o dynamicznej zmianie: jeśli wcześniej „flota cieni" pustych tankowców przemykała do irańskich wód jedynie w celu wykorzystania jako pływające magazyny, to w tym tygodniu sytuacja się zmieniła.

Choć Centralne Dowództwo USA (CENTCOM) oficjalnie twierdziło, że reżim blokady obowiązuje co najmniej do 19 czerwca, dwa irańskie supertankowce (VLCC) — Diona (IMO 9569695) i Hero2 (IMO 9362073), należące do Narodowej Irańskiej Kompanii Tankowej (NITC) — we wtorek włączyły swoje transpondery AIS i wykonały bezprecedensowy rejs na wyjście z zatoki. Wkrótce po nich popłynął tankowiec klasy Suezmax — Sonia I (IMO 9357365), również należący do NITC. Manewr ten potwierdzają dane Pole Star Global.

„To pierwsze eksportowe dostawy ropy naftowej z Iranu od dwóch miesięcy" — stwierdza TankerTrackers.com. Te wnioski potwierdzają również analitycy Kpler, którzy odnotowali wyjście łącznie czterech tankowców związanych z Iranem z Zatoki Omańskiej, co wskazuje na silną motywację Teheranu do upłynnienia zgromadzonych zapasów.

Obecny ruch statków jest jak dotąd najbardziej przekonującym dowodem łagodzenia ograniczeń nawigacyjnych w cieśninie, prawdopodobnie związanym z niedawno podpisanym Memorandum of Understanding (MOU). Nie oznacza to jednak pełnej deeskalacji. Według NBC News, siły irańskie nadal przeprowadzały precyzyjne ataki dronów na statki w Cieśninie Hormuz już po podpisaniu memorandum. Wspólne Centrum Informacji Morskiej CENTCOM (JMIC) wciąż ostrzega armatorów o „istotnym" ryzyku dla nawigacji w tym rejonie.

Mimo utrzymującego się ryzyka rynek przygotowuje się na gwałtowny wzrost aktywności. Ogromny tonaż światowej flotylli tankowców obecnie zbiera się w regionie w balaście, gotowy wykorzystać moment formalnego otwarcia Cieśniny Hormuz. Według szacunków Goldman Sachs, zdolności przewozowe tankowców mogących przyjąć ponad 800 milionów baryłek ropy znajdują się w odległości nie większej niż pięć dni żeglugi od cieśniny i są gotowe rozpocząć załadunek zgromadzonej ropy w celu dostarczenia jej na rynki światowe.

W notatce analitycznej firmy Windward, specjalizującej się w wywiadzie morskim, czytamy: „VLCC wskazujące ZEA jako kolejny cel podróży są śledzone w drodze z Morza Południowochińskiego i przez Ocean Indyjski". Według ich danych, „co najmniej 23 VLCC kierują się obecnie do portów ZEA Khor Fakkan lub Fudżajra... dołączając do co najmniej 30 statków już stojących tam na kotwicy".

Kluczową przeszkodą pozostaje kwestia ubezpieczenia od ryzyka wojennego, co jest standardową praktyką w strefach konfliktu. Według Politico, administracja Trumpa zachęca ubezpieczycieli do jak najszybszego zapewnienia komercyjnie opłacalnej ochrony ubezpieczeniowej dla cieśniny i rozważa nawet wprowadzenie systemu „przepustek VIP". Koncepcja ta może obejmować element płatny, zapewniający komercyjnym armatorom dostęp do eskorty US Navy — usługi, która wcześniej nie była dostępna.

Na razie wśród największych armatorów przeważa ostrożność. „Większość armatorów wydaje się ostrożnie czekać na więcej szczegółów, zanim zaplanuje nowe przejścia przez cieśninę" — powiedział CNBC Niels Rasmussen, główny analityk BIMCO. „Będą szukać zapewnienia, że przejścia są nie tylko dozwolone, ale również bezpieczne, zanim wyślą swoje statki przez cieśninę".$pl$;
BEGIN
  INSERT INTO news_articles (title, body, tag, cover_gradient, is_published, published_at)
  VALUES (
    jsonb_build_object('en', title_en, 'ru', title_ru, 'uk', title_uk, 'pl', title_pl),
    jsonb_build_object('en', body_en, 'ru', body_ru, 'uk', body_uk, 'pl', body_pl),
    'Industry',
    'linear-gradient(135deg,#1e293b,#334155)',
    true,
    NOW()
  );
END $$;
