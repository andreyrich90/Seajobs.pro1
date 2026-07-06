"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLang } from "@/components/LangProvider";
import type { Lang } from "@/lib/i18n";

const TRANSLATIONS = {
  ro: {
    title: "Termeni și condiții",
    updated: "Ultima actualizare: iunie 2026",
    sections: [
      {
        title: "1. Acceptarea termenilor",
        body: "Prin accesarea sau utilizarea SeaJobs.pro, sunteți de acord să respectați acești Termeni și condiții. Dacă nu sunteți de acord cu acești termeni, vă rugăm să nu utilizați platforma. Acești termeni se aplică tuturor vizitatorilor, marinarilor și companiilor care utilizează platforma.",
      },
      {
        title: "2. Utilizarea platformei",
        body: "SeaJobs.pro oferă o piață digitală care conectează marinarii cu agențiile de crewing. Puteți utiliza platforma pentru a vă crea un profil, a aplica la posturi vacante și a comunica cu potențiali angajatori. Sunteți de acord să nu utilizați platforma în mod abuziv, să nu publicați informații false și să nu vă implicați în activități frauduloase.",
      },
      {
        title: "3. Conturile utilizatorilor",
        body: "Sunteți responsabil pentru păstrarea confidențialității datelor de acces ale contului dumneavoastră. Sunteți de acord să furnizați informații corecte, actuale și complete la înregistrare și să vă mențineți profilul actualizat. SeaJobs.pro își rezervă dreptul de a suspenda sau închide conturile care încalcă acești termeni.",
      },
      {
        title: "4. Profilurile marinarilor",
        body: "Când vă creați un profil de marinar, anumite informații pot fi vizibile companiilor de crewing înregistrate. Dumneavoastră controlați ce informații includeți în profil. SeaJobs.pro nu este responsabil pentru modul în care companiile utilizează informațiile afișate în profilul dumneavoastră public.",
      },
      {
        title: "5. Conturile companiilor",
        body: "Companiile trebuie să furnizeze informații corecte despre activitatea lor. Publicarea de anunțuri de angajare frauduloase sau colectarea de date personale în alte scopuri decât recrutarea legitimă este strict interzisă și poate duce la închiderea definitivă a contului.",
      },
      {
        title: "6. Proprietate intelectuală",
        body: "Întregul conținut de pe SeaJobs.pro, inclusiv logo-urile, designul și textele, este proprietatea SeaJobs.pro și este protejat de legislația aplicabilă privind proprietatea intelectuală. Nu puteți reproduce sau distribui niciun conținut fără permisiunea scrisă prealabilă.",
      },
      {
        title: "7. Limitarea răspunderii",
        body: "SeaJobs.pro acționează ca platformă intermediară și nu este responsabil pentru deciziile de angajare ale companiilor sau pentru acuratețea anunțurilor. Nu garantăm obținerea unui loc de muncă și nu răspundem pentru niciun prejudiciu rezultat din utilizarea platformei.",
      },
      {
        title: "8. Modificarea termenilor",
        body: "Ne rezervăm dreptul de a modifica acești Termeni și condiții în orice moment. Modificările intră în vigoare imediat după publicare. Continuarea utilizării platformei după modificări constituie acceptarea termenilor actualizați.",
      },
    ],
  },
  en: {
    title: "Terms of Service",
    updated: "Last updated: June 2026",
    sections: [
      {
        title: "1. Acceptance of Terms",
        body: "By accessing or using SeaJobs.pro, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the platform. These terms apply to all visitors, seafarers, and company users of the platform.",
      },
      {
        title: "2. Platform Use",
        body: "SeaJobs.pro provides a digital marketplace connecting seafarers with crewing agencies. You may use the platform to create a profile, apply for vacancies, and communicate with potential employers. You agree not to misuse the platform, post false information, or engage in any fraudulent activity.",
      },
      {
        title: "3. User Accounts",
        body: "You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate, current, and complete information during registration and to keep your profile updated. SeaJobs.pro reserves the right to suspend or terminate accounts that violate these terms.",
      },
      {
        title: "4. Seafarer Profiles",
        body: "When you create a seafarer profile, certain information may be visible to registered crewing companies. You control what information you include in your profile. SeaJobs.pro is not responsible for how companies use information displayed on your public profile.",
      },
      {
        title: "5. Company Accounts",
        body: "Companies must provide accurate information about their business. Posting fraudulent job listings or collecting personal data for purposes other than legitimate recruitment is strictly prohibited and may result in permanent account termination.",
      },
      {
        title: "6. Intellectual Property",
        body: "All content on SeaJobs.pro, including logos, designs, and text, is the property of SeaJobs.pro and protected by applicable intellectual property laws. You may not reproduce or distribute any content without prior written permission.",
      },
      {
        title: "7. Limitation of Liability",
        body: "SeaJobs.pro acts as an intermediary platform and is not responsible for the hiring decisions of companies or the accuracy of job listings. We do not guarantee employment outcomes and are not liable for any damages arising from your use of the platform.",
      },
      {
        title: "8. Changes to Terms",
        body: "We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Continued use of the platform after changes constitutes acceptance of the updated terms.",
      },
    ],
  },
  ua: {
    title: "Умови використання",
    updated: "Оновлено: червень 2026",
    sections: [
      {
        title: "1. Прийняття умов",
        body: "Користуючись платформою SeaJobs.pro, ви погоджуєтесь з цими Умовами використання. Якщо ви не згодні з цими умовами, будь ласка, не використовуйте платформу. Ці умови застосовуються до всіх відвідувачів, моряків і компаній-користувачів платформи.",
      },
      {
        title: "2. Використання платформи",
        body: "SeaJobs.pro надає цифровий майданчик для з'єднання моряків із крюїнговими агенціями. Ви можете використовувати платформу для створення профілю, подачі заявок на вакансії та спілкування з потенційними роботодавцями. Ви погоджуєтесь не зловживати платформою, не розміщувати неправдиву інформацію та не вдаватись до шахрайської діяльності.",
      },
      {
        title: "3. Облікові записи",
        body: "Ви несете відповідальність за збереження конфіденційності даних вашого облікового запису. Ви погоджуєтесь надавати точну, актуальну та повну інформацію під час реєстрації та підтримувати профіль в актуальному стані. SeaJobs.pro залишає за собою право призупинити або видалити облікові записи, що порушують ці умови.",
      },
      {
        title: "4. Профілі моряків",
        body: "Під час створення профілю моряка певна інформація може бути видима зареєстрованим крюїнговим компаніям. Ви контролюєте, яку інформацію включати до свого профілю. SeaJobs.pro не несе відповідальності за те, як компанії використовують інформацію з вашого публічного профілю.",
      },
      {
        title: "5. Акаунти компаній",
        body: "Компанії зобов'язані надавати достовірну інформацію про свій бізнес. Публікація фіктивних вакансій або збір персональних даних для цілей, відмінних від законного найму, суворо заборонені та можуть призвести до постійного видалення акаунту.",
      },
      {
        title: "6. Інтелектуальна власність",
        body: "Весь контент на SeaJobs.pro, включаючи логотипи, дизайн та тексти, є власністю SeaJobs.pro і захищений відповідним законодавством про інтелектуальну власність. Ви не можете відтворювати або поширювати будь-який контент без попереднього письмового дозволу.",
      },
      {
        title: "7. Обмеження відповідальності",
        body: "SeaJobs.pro діє як посередницька платформа і не несе відповідальності за рішення компаній щодо найму або точність вакансій. Ми не гарантуємо працевлаштування та не несемо відповідальності за будь-які збитки, що виникли внаслідок використання платформи.",
      },
      {
        title: "8. Зміни умов",
        body: "Ми залишаємо за собою право вносити зміни до цих Умов використання в будь-який час. Зміни набирають чинності одразу після публікації. Продовження використання платформи після змін означає прийняття оновлених умов.",
      },
    ],
  },
  pl: {
    title: "Regulamin",
    updated: "Ostatnia aktualizacja: czerwiec 2026",
    sections: [
      {
        title: "1. Akceptacja warunków",
        body: "Korzystając z SeaJobs.pro, wyrażasz zgodę na niniejszy Regulamin. Jeśli nie zgadzasz się z tymi warunkami, prosimy o nieużywanie platformy. Warunki dotyczą wszystkich odwiedzających, marynarzy i firm korzystających z platformy.",
      },
      {
        title: "2. Korzystanie z platformy",
        body: "SeaJobs.pro udostępnia cyfrowy rynek łączący marynarzy z agencjami crewingowymi. Możesz korzystać z platformy, aby tworzyć profil, aplikować na oferty pracy i komunikować się z potencjalnymi pracodawcami. Zgadzasz się nie nadużywać platformy, nie zamieszczać fałszywych informacji ani nie angażować się w żadne oszukańcze działania.",
      },
      {
        title: "3. Konta użytkowników",
        body: "Jesteś odpowiedzialny za zachowanie poufności danych logowania. Zgadzasz się podawać dokładne, aktualne i kompletne informacje podczas rejestracji oraz aktualizować swój profil. SeaJobs.pro zastrzega sobie prawo do zawieszenia lub usunięcia kont naruszających niniejszy regulamin.",
      },
      {
        title: "4. Profile marynarzy",
        body: "Po utworzeniu profilu marynarza pewne informacje mogą być widoczne dla zarejestrowanych firm crewingowych. Kontrolujesz, jakie informacje umieszczasz w swoim profilu. SeaJobs.pro nie ponosi odpowiedzialności za sposób, w jaki firmy wykorzystują informacje z Twojego publicznego profilu.",
      },
      {
        title: "5. Konta firm",
        body: "Firmy muszą podawać rzetelne informacje o swojej działalności. Zamieszczanie fałszywych ogłoszeń o pracę lub zbieranie danych osobowych w celach innych niż legalna rekrutacja jest surowo zabronione i może skutkować trwałym usunięciem konta.",
      },
      {
        title: "6. Własność intelektualna",
        body: "Wszelkie treści na SeaJobs.pro, w tym logo, projekty i teksty, są własnością SeaJobs.pro i chronione przepisami prawa własności intelektualnej. Nie możesz reprodukować ani rozpowszechniać żadnych treści bez uprzedniej pisemnej zgody.",
      },
      {
        title: "7. Ograniczenie odpowiedzialności",
        body: "SeaJobs.pro działa jako platforma pośrednicząca i nie ponosi odpowiedzialności za decyzje rekrutacyjne firm ani za dokładność ogłoszeń o pracę. Nie gwarantujemy znalezienia zatrudnienia i nie ponosimy odpowiedzialności za jakiekolwiek szkody wynikające z korzystania z platformy.",
      },
      {
        title: "8. Zmiany warunków",
        body: "Zastrzegamy sobie prawo do modyfikacji niniejszego Regulaminu w dowolnym momencie. Zmiany wchodzą w życie natychmiast po opublikowaniu. Dalsze korzystanie z platformy po wprowadzeniu zmian oznacza akceptację zaktualizowanych warunków.",
      },
    ],
  },
  ru: {
    title: "Условия использования",
    updated: "Обновлено: июнь 2026",
    sections: [
      {
        title: "1. Принятие условий",
        body: "Используя платформу SeaJobs.pro, вы соглашаетесь с настоящими Условиями использования. Если вы не согласны с этими условиями, пожалуйста, не используйте платформу. Условия распространяются на всех посетителей, моряков и компании-пользователи платформы.",
      },
      {
        title: "2. Использование платформы",
        body: "SeaJobs.pro предоставляет цифровую площадку для связи моряков с крюинговыми агентствами. Вы можете использовать платформу для создания профиля, подачи заявок на вакансии и общения с потенциальными работодателями. Вы обязуетесь не злоупотреблять платформой, не размещать ложную информацию и не совершать мошеннических действий.",
      },
      {
        title: "3. Учётные записи",
        body: "Вы несёте ответственность за сохранность данных вашей учётной записи. Вы обязуетесь предоставлять точную, актуальную и полную информацию при регистрации и поддерживать профиль в актуальном состоянии. SeaJobs.pro оставляет за собой право приостановить или удалить аккаунты, нарушающие настоящие условия.",
      },
      {
        title: "4. Профили моряков",
        body: "При создании профиля моряка определённая информация может быть видна зарегистрированным крюинговым компаниям. Вы контролируете, какую информацию включать в профиль. SeaJobs.pro не несёт ответственности за то, как компании используют информацию из вашего публичного профиля.",
      },
      {
        title: "5. Аккаунты компаний",
        body: "Компании обязаны предоставлять достоверную информацию о своём бизнесе. Публикация фиктивных вакансий или сбор персональных данных для целей, отличных от законного найма, строго запрещены и могут привести к постоянному удалению аккаунта.",
      },
      {
        title: "6. Интеллектуальная собственность",
        body: "Весь контент на SeaJobs.pro, включая логотипы, дизайн и тексты, является собственностью SeaJobs.pro и защищён законодательством об интеллектуальной собственности. Воспроизведение или распространение любого контента без предварительного письменного разрешения запрещено.",
      },
      {
        title: "7. Ограничение ответственности",
        body: "SeaJobs.pro выступает в роли платформы-посредника и не несёт ответственности за решения компаний о найме или точность вакансий. Мы не гарантируем трудоустройство и не несём ответственности за ущерб, возникший в результате использования платформы.",
      },
      {
        title: "8. Изменение условий",
        body: "Мы оставляем за собой право вносить изменения в настоящие Условия использования в любое время. Изменения вступают в силу немедленно после публикации. Продолжение использования платформы после изменений означает принятие обновлённых условий.",
      },
    ],
  },
};

export default function TermsPage() {
  const { lang } = useLang();
  const t = TRANSLATIONS[lang] ?? TRANSLATIONS.en;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-5 py-16">
          <h1 className="font-display text-4xl font-semibold text-white">{t.title}</h1>
          <p className="mt-3 text-mist">{t.updated}</p>

          <div className="mt-10 flex flex-col gap-8">
            {t.sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-lg font-semibold text-white mb-3">{s.title}</h2>
                <p className="text-mist leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
