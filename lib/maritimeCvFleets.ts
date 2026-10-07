import type { Lang } from "@/lib/langs";
import type { FleetId } from "@/lib/cvFleets";
import { withPrice } from "@/lib/cvWord";

/**
 * /maritime-cv/[fleet] — one page per fleet, written to that fleet's searches
 * ("offshore CV template", "анкета моряка танкер").
 *
 * Each page is the main /maritime-cv page with its own head: title, lede, and
 * what the fleet's Word template puts at the top. That last block describes
 * lib/cvFleets.ts and nothing more — certificates the seafarer holds, sea time
 * they served, picked out by name. Keep it that way: a page that promises a
 * "DP hours" line the file does not have would be selling the wrong thing.
 */

export type FleetPageCopy = {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  h1: string;
  lede: string;
  /** Three lines: what goes first, what sea time is counted, how it is laid out. */
  top: [string, string, string];
};

export type FleetPagesCopy = {
  /** `{fleet}` is filled with the fleet's name. */
  topTitle: string;
  allFleets: string;
  pages: Record<FleetId, FleetPageCopy>;
};

const en: FleetPagesCopy = {
  topTitle: "What the {fleet} template puts at the top",
  allFleets: "All fleets",
  pages: {
    merchant: {
      metaTitle: "Merchant navy CV in Word — AI fills it from your old CV | SeaJobs.pro",
      metaDescription: "A seafarer's CV for bulk, container, general cargo and ro-ro: upload your old CV, AI fills it in, download. PDF free, Word {price} once.",
      keywords: "merchant navy cv, bulk carrier cv, container ship cv, general cargo cv, seaman cv template word",
      h1: "Merchant navy CV — filled in from the one you have",
      lede: "Bulk, container, general cargo, reefer, ro-ro. Drop your old CV, and the Word template leads with what a merchant-fleet crewing desk reads first.",
      top: [
        "GMDSS, ECDIS, ARPA, BRM/ERM and your other bridge and engine-room courses, first.",
        "Your sea time on bulk, container, general cargo, ro-ro and car carriers, counted for you.",
        "Those voyages in bold in the sea-service table; passport and documents right after, as crewing expects.",
      ],
    },
    offshore: {
      metaTitle: "Offshore CV in Word — DP, BOSIET up front, AI-filled | SeaJobs.pro",
      metaDescription: "An offshore seafarer's CV with DP and survival certificates at the top: upload your old CV, AI fills it in, download. PDF free, Word {price} once.",
      keywords: "offshore cv, offshore cv template, dp officer cv, ahts cv, psv cv, offshore seaman cv word",
      h1: "Offshore CV — with DP and BOSIET where they are read first",
      lede: "AHTS, PSV, SOV, DSV, jack-ups. Drop your old CV, and the Word template puts what an offshore crewing desk hires on at the top.",
      top: [
        "DP certificates, BOSIET/FOET, HUET, OGUK medical and OPITO courses, first.",
        "Your sea time on AHTS, PSV, SOV, DSV and other offshore units, counted for you.",
        "Certificates before identity documents, and offshore voyages in bold.",
      ],
    },
    tanker: {
      metaTitle: "Tanker & gas carrier CV in Word — endorsements up front | SeaJobs.pro",
      metaDescription: "A CV for oil, chemical, LNG and LPG tankers with your tanker endorsements at the top: upload your old CV, AI fills it in. PDF free, Word {price} once.",
      keywords: "tanker cv, lng carrier cv, lpg carrier cv, chemical tanker cv, oil tanker cv template, gas carrier cv",
      h1: "Tanker and gas carrier CV — endorsements first",
      lede: "Oil, chemical, LNG, LPG. Drop your old CV, and the Word template leads with the endorsements a tanker crewing desk checks before anything else.",
      top: [
        "Oil, chemical and gas tanker endorsements — Advanced Gas, IGF — first.",
        "Your sea time on tankers and gas carriers, counted for you.",
        "Certificates before identity documents, and tanker voyages in bold.",
      ],
    },
    passenger: {
      metaTitle: "Cruise & ferry CV in Word — passenger safety up front | SeaJobs.pro",
      metaDescription: "A CV for cruise ships, ferries and Ro-Pax with Crowd Management and passenger safety at the top: upload your old CV, AI fills it in. PDF free, Word {price} once.",
      keywords: "cruise ship cv, ferry cv, ro-pax cv, passenger ship cv, crowd management cv",
      h1: "Cruise and ferry CV — passenger certificates first",
      lede: "Cruise, ferries, Ro-Pax. Drop your old CV, and the Word template leads with the courses a passenger-ship crewing desk is required to see.",
      top: [
        "Crowd Management, Passenger Safety, Crisis Management and Human Behaviour, first.",
        "Your sea time on cruise ships, ferries and Ro-Pax, counted for you.",
        "Certificates before identity documents, and passenger voyages in bold.",
      ],
    },
    tug: {
      metaTitle: "Tug & dredger CV in Word — AI fills it from your old CV | SeaJobs.pro",
      metaDescription: "A CV for tugs, dredgers and workboats: upload your old CV, AI fills it in, download. PDF free, Word {price} once.",
      keywords: "tug cv, tugboat master cv, dredger cv, workboat cv, towing cv template",
      h1: "Tug and dredger CV — filled in from the one you have",
      lede: "Harbour and ocean towing, dredgers, workboats, multicats. Drop your old CV, and the Word template leads with what this work is hired on.",
      top: [
        "Towing, dredging, crane, winch and rigging courses, first.",
        "Your sea time on tugs, dredgers, workboats and barges, counted for you.",
        "Those voyages in bold in the sea-service table.",
      ],
    },
  },
};

const ru: FleetPagesCopy = {
  topTitle: "Что шаблон «{fleet}» ставит наверх",
  allFleets: "Все флоты",
  pages: {
    merchant: {
      metaTitle: "Анкета моряка торгового флота в Word — ИИ заполнит из резюме | SeaJobs.pro",
      metaDescription: "Анкета моряка для балкеров, контейнеровозов, генкарго и ро-ро: загрузите старое резюме, ИИ заполнит, скачайте. PDF бесплатно, Word за {price} один раз.",
      keywords: "анкета моряка торговый флот, анкета моряка балкер, резюме моряка контейнеровоз, анкета моряка генкарго, анкета моряка word",
      h1: "Анкета для торгового флота — из вашего старого резюме",
      lede: "Балкеры, контейнеровозы, генкарго, рефрижераторы, ро-ро. Загрузите старое резюме, и шаблон Word начнётся с того, что крюинг торгового флота читает первым.",
      top: [
        "GMDSS, ECDIS, ARPA, BRM/ERM и другие курсы мостика и машины — в начале.",
        "Ваш стаж на балкерах, контейнеровозах, генкарго, ро-ро и автовозах — посчитан за вас.",
        "Эти рейсы жирным в таблице стажа; паспорт и документы сразу после, как ждёт крюинг.",
      ],
    },
    offshore: {
      metaTitle: "Анкета моряка для офшора в Word — DP и BOSIET наверху | SeaJobs.pro",
      metaDescription: "Анкета моряка для офшора, где DP и сертификаты выживания стоят первыми: загрузите старое резюме, ИИ заполнит. PDF бесплатно, Word за {price} один раз.",
      keywords: "анкета моряка офшор, резюме офшор, cv офшор шаблон, анкета dp оператора, анкета моряка ahts, анкета моряка psv",
      h1: "Анкета для офшора — DP и BOSIET там, где их читают первыми",
      lede: "AHTS, PSV, SOV, DSV, самоподъёмные установки. Загрузите старое резюме, и шаблон Word поставит наверх то, по чему нанимают в офшор.",
      top: [
        "DP-сертификаты, BOSIET/FOET, HUET, медицина OGUK и курсы OPITO — в начале.",
        "Ваш стаж на AHTS, PSV, SOV, DSV и других офшорных судах — посчитан за вас.",
        "Сертификаты раньше документов, офшорные рейсы — жирным.",
      ],
    },
    tanker: {
      metaTitle: "Анкета моряка на танкер и газовоз в Word — допуски наверху | SeaJobs.pro",
      metaDescription: "Анкета для нефтяных, химических танкеров, LNG и LPG, где танкерные допуски стоят первыми: загрузите старое резюме, ИИ заполнит. PDF бесплатно, Word за {price}.",
      keywords: "анкета моряка танкер, анкета моряка газовоз, резюме lng, резюме lpg, анкета химовоз, cv танкер шаблон",
      h1: "Анкета на танкер и газовоз — допуски первыми",
      lede: "Нефть, химия, LNG, LPG. Загрузите старое резюме, и шаблон Word начнётся с допусков, которые танкерный крюинг проверяет раньше всего.",
      top: [
        "Танкерные и газовые допуски — Advanced Gas, IGF — в начале.",
        "Ваш стаж на танкерах и газовозах — посчитан за вас.",
        "Сертификаты раньше документов, танкерные рейсы — жирным.",
      ],
    },
    passenger: {
      metaTitle: "Анкета моряка на круизный лайнер и паром в Word | SeaJobs.pro",
      metaDescription: "Анкета для круизных судов, паромов и Ro-Pax, где Crowd Management и безопасность пассажиров стоят первыми: загрузите старое резюме, ИИ заполнит. PDF бесплатно, Word за {price}.",
      keywords: "анкета моряка круизный лайнер, анкета моряка паром, резюме ro-pax, crowd management, анкета пассажирский флот",
      h1: "Анкета на круизный лайнер и паром — пассажирские сертификаты первыми",
      lede: "Круизные суда, паромы, Ro-Pax. Загрузите старое резюме, и шаблон Word начнётся с курсов, которые крюинг пассажирского флота обязан увидеть.",
      top: [
        "Crowd Management, Passenger Safety, Crisis Management и Human Behaviour — в начале.",
        "Ваш стаж на круизных судах, паромах и Ro-Pax — посчитан за вас.",
        "Сертификаты раньше документов, пассажирские рейсы — жирным.",
      ],
    },
    tug: {
      metaTitle: "Анкета моряка на буксир и земснаряд в Word | SeaJobs.pro",
      metaDescription: "Анкета для буксиров, земснарядов и рабочих судов: загрузите старое резюме, ИИ заполнит, скачайте. PDF бесплатно, Word за {price} один раз.",
      keywords: "анкета моряка буксир, резюме капитан буксира, анкета земснаряд, анкета моряка рабочее судно",
      h1: "Анкета на буксир и земснаряд — из вашего старого резюме",
      lede: "Портовая и морская буксировка, земснаряды, рабочие суда, мультикаты. Загрузите старое резюме, и шаблон Word начнётся с того, по чему нанимают на эту работу.",
      top: [
        "Курсы буксировки, дноуглубления, крана, лебёдок и такелажа — в начале.",
        "Ваш стаж на буксирах, земснарядах, рабочих судах и баржах — посчитан за вас.",
        "Эти рейсы — жирным в таблице стажа.",
      ],
    },
  },
};

const ua: FleetPagesCopy = {
  topTitle: "Що шаблон «{fleet}» ставить нагору",
  allFleets: "Усі флоти",
  pages: {
    merchant: {
      metaTitle: "Анкета моряка торговельного флоту у Word — ШІ заповнить з резюме | SeaJobs.pro",
      metaDescription: "Анкета моряка для балкерів, контейнеровозів, генкарго й ро-ро: завантажте старе резюме, ШІ заповнить, завантажте. PDF безкоштовно, Word за {price} один раз.",
      keywords: "анкета моряка торговий флот, анкета моряка балкер, резюме моряка контейнеровоз, анкета моряка генкарго, анкета моряка word",
      h1: "Анкета для торговельного флоту — з вашого старого резюме",
      lede: "Балкери, контейнеровози, генкарго, рефрижератори, ро-ро. Завантажте старе резюме, і шаблон Word почнеться з того, що крюїнг торговельного флоту читає першим.",
      top: [
        "GMDSS, ECDIS, ARPA, BRM/ERM та інші курси містка й машини — на початку.",
        "Ваш стаж на балкерах, контейнеровозах, генкарго, ро-ро й автовозах — пораховано за вас.",
        "Ці рейси жирним у таблиці стажу; паспорт і документи одразу після, як чекає крюїнг.",
      ],
    },
    offshore: {
      metaTitle: "Анкета моряка для офшору у Word — DP і BOSIET нагорі | SeaJobs.pro",
      metaDescription: "Анкета моряка для офшору, де DP і сертифікати виживання стоять першими: завантажте старе резюме, ШІ заповнить. PDF безкоштовно, Word за {price} один раз.",
      keywords: "анкета моряка офшор, резюме офшор, cv офшор шаблон, анкета dp оператора, анкета моряка ahts, анкета моряка psv",
      h1: "Анкета для офшору — DP і BOSIET там, де їх читають першими",
      lede: "AHTS, PSV, SOV, DSV, самопідйомні установки. Завантажте старе резюме, і шаблон Word поставить нагору те, за чим наймають в офшор.",
      top: [
        "DP-сертифікати, BOSIET/FOET, HUET, медицина OGUK і курси OPITO — на початку.",
        "Ваш стаж на AHTS, PSV, SOV, DSV та інших офшорних суднах — пораховано за вас.",
        "Сертифікати раніше за документи, офшорні рейси — жирним.",
      ],
    },
    tanker: {
      metaTitle: "Анкета моряка на танкер і газовоз у Word — допуски нагорі | SeaJobs.pro",
      metaDescription: "Анкета для нафтових, хімічних танкерів, LNG і LPG, де танкерні допуски стоять першими: завантажте старе резюме, ШІ заповнить. PDF безкоштовно, Word за {price}.",
      keywords: "анкета моряка танкер, анкета моряка газовоз, резюме lng, резюме lpg, анкета хімовоз, cv танкер шаблон",
      h1: "Анкета на танкер і газовоз — допуски першими",
      lede: "Нафта, хімія, LNG, LPG. Завантажте старе резюме, і шаблон Word почнеться з допусків, які танкерний крюїнг перевіряє раніше за все.",
      top: [
        "Танкерні й газові допуски — Advanced Gas, IGF — на початку.",
        "Ваш стаж на танкерах і газовозах — пораховано за вас.",
        "Сертифікати раніше за документи, танкерні рейси — жирним.",
      ],
    },
    passenger: {
      metaTitle: "Анкета моряка на круїзний лайнер і пором у Word | SeaJobs.pro",
      metaDescription: "Анкета для круїзних суден, поромів і Ro-Pax, де Crowd Management і безпека пасажирів стоять першими: завантажте старе резюме, ШІ заповнить. PDF безкоштовно, Word за {price}.",
      keywords: "анкета моряка круїзний лайнер, анкета моряка пором, резюме ro-pax, crowd management, анкета пасажирський флот",
      h1: "Анкета на круїзний лайнер і пором — пасажирські сертифікати першими",
      lede: "Круїзні судна, пороми, Ro-Pax. Завантажте старе резюме, і шаблон Word почнеться з курсів, які крюїнг пасажирського флоту мусить побачити.",
      top: [
        "Crowd Management, Passenger Safety, Crisis Management і Human Behaviour — на початку.",
        "Ваш стаж на круїзних суднах, поромах і Ro-Pax — пораховано за вас.",
        "Сертифікати раніше за документи, пасажирські рейси — жирним.",
      ],
    },
    tug: {
      metaTitle: "Анкета моряка на буксир і земснаряд у Word | SeaJobs.pro",
      metaDescription: "Анкета для буксирів, земснарядів і робочих суден: завантажте старе резюме, ШІ заповнить, завантажте. PDF безкоштовно, Word за {price} один раз.",
      keywords: "анкета моряка буксир, резюме капітан буксира, анкета земснаряд, анкета моряка робоче судно",
      h1: "Анкета на буксир і земснаряд — з вашого старого резюме",
      lede: "Портове й морське буксирування, земснаряди, робочі судна, мультикати. Завантажте старе резюме, і шаблон Word почнеться з того, за чим наймають на цю роботу.",
      top: [
        "Курси буксирування, днопоглиблення, крана, лебідок і такелажу — на початку.",
        "Ваш стаж на буксирах, земснарядах, робочих суднах і баржах — пораховано за вас.",
        "Ці рейси — жирним у таблиці стажу.",
      ],
    },
  },
};

const pl: FleetPagesCopy = {
  topTitle: "Co szablon „{fleet}” stawia na górze",
  allFleets: "Wszystkie floty",
  pages: {
    merchant: {
      metaTitle: "CV marynarza floty handlowej w Wordzie — AI wypełni ze starego CV | SeaJobs.pro",
      metaDescription: "CV marynarza na masowce, kontenerowce, drobnicowce i ro-ro: wgraj stare CV, AI je wypełni, pobierz. PDF za darmo, Word za {price} jednorazowo.",
      keywords: "cv marynarza flota handlowa, cv masowiec, cv kontenerowiec, cv drobnicowiec, wzór cv marynarza word",
      h1: "CV na flotę handlową — z tego, które już masz",
      lede: "Masowce, kontenerowce, drobnicowce, chłodniowce, ro-ro. Wgraj stare CV, a szablon Word zacznie się od tego, co agencja floty handlowej czyta najpierw.",
      top: [
        "GMDSS, ECDIS, ARPA, BRM/ERM i inne kursy mostkowe i maszynowe — na początku.",
        "Twój staż na masowcach, kontenerowcach, drobnicowcach, ro-ro i samochodowcach — policzony za Ciebie.",
        "Te rejsy pogrubione w tabeli stażu; paszport i dokumenty zaraz potem, jak oczekuje agencja.",
      ],
    },
    offshore: {
      metaTitle: "CV offshore w Wordzie — DP i BOSIET na górze, wypełnione przez AI | SeaJobs.pro",
      metaDescription: "CV marynarza offshore z certyfikatami DP i ratowniczymi na początku: wgraj stare CV, AI je wypełni. PDF za darmo, Word za {price} jednorazowo.",
      keywords: "cv offshore, wzór cv offshore, cv dpo, cv ahts, cv psv, cv marynarza offshore word",
      h1: "CV offshore — DP i BOSIET tam, gdzie czyta się je najpierw",
      lede: "AHTS, PSV, SOV, DSV, platformy samopodnośne. Wgraj stare CV, a szablon Word postawi na górze to, po czym zatrudnia się w offshore.",
      top: [
        "Certyfikaty DP, BOSIET/FOET, HUET, badania OGUK i kursy OPITO — na początku.",
        "Twój staż na AHTS, PSV, SOV, DSV i innych jednostkach offshore — policzony za Ciebie.",
        "Certyfikaty przed dokumentami, rejsy offshore pogrubione.",
      ],
    },
    tanker: {
      metaTitle: "CV na tankowiec i gazowiec w Wordzie — uprawnienia na górze | SeaJobs.pro",
      metaDescription: "CV na tankowce olejowe, chemikaliowce, LNG i LPG z uprawnieniami tankowcowymi na początku: wgraj stare CV, AI je wypełni. PDF za darmo, Word za {price}.",
      keywords: "cv tankowiec, cv gazowiec, cv lng, cv lpg, cv chemikaliowiec, wzór cv tankowiec",
      h1: "CV na tankowiec i gazowiec — uprawnienia najpierw",
      lede: "Ropa, chemikalia, LNG, LPG. Wgraj stare CV, a szablon Word zacznie się od uprawnień, które agencja tankowcowa sprawdza przed wszystkim innym.",
      top: [
        "Uprawnienia tankowcowe i gazowe — Advanced Gas, IGF — na początku.",
        "Twój staż na tankowcach i gazowcach — policzony za Ciebie.",
        "Certyfikaty przed dokumentami, rejsy tankowcowe pogrubione.",
      ],
    },
    passenger: {
      metaTitle: "CV na statek wycieczkowy i prom w Wordzie | SeaJobs.pro",
      metaDescription: "CV na statki wycieczkowe, promy i Ro-Pax z Crowd Management i bezpieczeństwem pasażerów na początku: wgraj stare CV, AI je wypełni. PDF za darmo, Word za {price}.",
      keywords: "cv statek wycieczkowy, cv prom, cv ro-pax, crowd management, cv flota pasażerska",
      h1: "CV na wycieczkowiec i prom — certyfikaty pasażerskie najpierw",
      lede: "Statki wycieczkowe, promy, Ro-Pax. Wgraj stare CV, a szablon Word zacznie się od kursów, które agencja floty pasażerskiej musi zobaczyć.",
      top: [
        "Crowd Management, Passenger Safety, Crisis Management i Human Behaviour — na początku.",
        "Twój staż na wycieczkowcach, promach i Ro-Pax — policzony za Ciebie.",
        "Certyfikaty przed dokumentami, rejsy pasażerskie pogrubione.",
      ],
    },
    tug: {
      metaTitle: "CV na holownik i pogłębiarkę w Wordzie | SeaJobs.pro",
      metaDescription: "CV na holowniki, pogłębiarki i jednostki robocze: wgraj stare CV, AI je wypełni, pobierz. PDF za darmo, Word za {price} jednorazowo.",
      keywords: "cv holownik, cv kapitan holownika, cv pogłębiarka, cv jednostka robocza",
      h1: "CV na holownik i pogłębiarkę — z tego, które już masz",
      lede: "Holowanie portowe i oceaniczne, pogłębiarki, jednostki robocze, multicaty. Wgraj stare CV, a szablon Word zacznie się od tego, po czym zatrudnia się do tej pracy.",
      top: [
        "Kursy holowania, pogłębiania, dźwigu, wciągarek i takielunku — na początku.",
        "Twój staż na holownikach, pogłębiarkach, jednostkach roboczych i barkach — policzony za Ciebie.",
        "Te rejsy pogrubione w tabeli stażu.",
      ],
    },
  },
};

const ro: FleetPagesCopy = {
  topTitle: "Ce pune șablonul «{fleet}» în față",
  allFleets: "Toate flotele",
  pages: {
    merchant: {
      metaTitle: "CV de marinar pentru flota comercială în Word — completat de AI | SeaJobs.pro",
      metaDescription: "CV de marinar pentru vrachiere, portcontainere, cargouri și ro-ro: încarci CV-ul vechi, AI-ul îl completează, descarci. PDF gratuit, Word cu {price} o dată.",
      keywords: "cv marinar flota comerciala, cv vrachier, cv portcontainer, cv cargou, model cv marinar word",
      h1: "CV pentru flota comercială — din cel pe care îl ai",
      lede: "Vrachiere, portcontainere, cargouri, frigorifice, ro-ro. Încarci CV-ul vechi, iar șablonul Word începe cu ce citește întâi o agenție de flotă comercială.",
      top: [
        "GMDSS, ECDIS, ARPA, BRM/ERM și celelalte cursuri de punte și mașini — în față.",
        "Vechimea ta pe vrachiere, portcontainere, cargouri, ro-ro și car carriere — calculată pentru tine.",
        "Acele voiaje îngroșate în tabelul de vechime; pașaportul și actele imediat după, cum așteaptă agenția.",
      ],
    },
    offshore: {
      metaTitle: "CV offshore în Word — DP și BOSIET în față, completat de AI | SeaJobs.pro",
      metaDescription: "CV de marinar offshore cu certificatele DP și de supraviețuire în față: încarci CV-ul vechi, AI-ul îl completează. PDF gratuit, Word cu {price} o dată.",
      keywords: "cv offshore, model cv offshore, cv dpo, cv ahts, cv psv, cv marinar offshore word",
      h1: "CV offshore — DP și BOSIET acolo unde se citesc primele",
      lede: "AHTS, PSV, SOV, DSV, platforme autoridicătoare. Încarci CV-ul vechi, iar șablonul Word pune în față ce contează la angajarea în offshore.",
      top: [
        "Certificatele DP, BOSIET/FOET, HUET, medicalul OGUK și cursurile OPITO — în față.",
        "Vechimea ta pe AHTS, PSV, SOV, DSV și alte unități offshore — calculată pentru tine.",
        "Certificatele înaintea actelor, voiajele offshore îngroșate.",
      ],
    },
    tanker: {
      metaTitle: "CV pentru petroliere și gaziere în Word — atestatele în față | SeaJobs.pro",
      metaDescription: "CV pentru petroliere, chimicaliere, LNG și LPG cu atestatele de tanc în față: încarci CV-ul vechi, AI-ul îl completează. PDF gratuit, Word cu {price}.",
      keywords: "cv petrolier, cv gazier, cv lng, cv lpg, cv chimicalier, model cv petrolier",
      h1: "CV pentru petroliere și gaziere — atestatele întâi",
      lede: "Petrol, chimicale, LNG, LPG. Încarci CV-ul vechi, iar șablonul Word începe cu atestatele pe care agenția de tancuri le verifică înaintea oricărui alt lucru.",
      top: [
        "Atestatele de tanc petrolier, chimic și gaz — Advanced Gas, IGF — în față.",
        "Vechimea ta pe petroliere și gaziere — calculată pentru tine.",
        "Certificatele înaintea actelor, voiajele pe tancuri îngroșate.",
      ],
    },
    passenger: {
      metaTitle: "CV pentru nave de croazieră și feriboturi în Word | SeaJobs.pro",
      metaDescription: "CV pentru nave de croazieră, feriboturi și Ro-Pax cu Crowd Management și siguranța pasagerilor în față: încarci CV-ul vechi, AI-ul îl completează. PDF gratuit, Word cu {price}.",
      keywords: "cv nava de croaziera, cv ferry, cv ro-pax, crowd management, cv flota de pasageri",
      h1: "CV pentru croazieră și feribot — certificatele de pasageri întâi",
      lede: "Nave de croazieră, feriboturi, Ro-Pax. Încarci CV-ul vechi, iar șablonul Word începe cu cursurile pe care agenția flotei de pasageri trebuie să le vadă.",
      top: [
        "Crowd Management, Passenger Safety, Crisis Management și Human Behaviour — în față.",
        "Vechimea ta pe nave de croazieră, feriboturi și Ro-Pax — calculată pentru tine.",
        "Certificatele înaintea actelor, voiajele cu pasageri îngroșate.",
      ],
    },
    tug: {
      metaTitle: "CV pentru remorcher și dragă în Word | SeaJobs.pro",
      metaDescription: "CV pentru remorchere, drage și nave de lucru: încarci CV-ul vechi, AI-ul îl completează, descarci. PDF gratuit, Word cu {price} o dată.",
      keywords: "cv remorcher, cv comandant remorcher, cv draga, cv nava de lucru",
      h1: "CV pentru remorcher și dragă — din cel pe care îl ai",
      lede: "Remorcaj portuar și oceanic, drage, nave de lucru, multicat-uri. Încarci CV-ul vechi, iar șablonul Word începe cu ce contează la angajarea pentru această muncă.",
      top: [
        "Cursurile de remorcaj, dragare, macara, troliu și matisare — în față.",
        "Vechimea ta pe remorchere, drage, nave de lucru și barje — calculată pentru tine.",
        "Acele voiaje îngroșate în tabelul de vechime.",
      ],
    },
  },
};

const COPY: Record<Lang, FleetPagesCopy> = { en, ru, ua, pl, ro };

export function fleetPagesCopy(lang: Lang): FleetPagesCopy {
  return withPrice(COPY[lang] ?? COPY.en, lang);
}
