"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLang } from "@/components/LangProvider";

const TRANSLATIONS = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated: June 2026",
    intro: "SeaJobs.pro (\"we\", \"our\", or \"us\") is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights regarding your data.",
    sections: [
      {
        title: "1. Information We Collect",
        body: "We collect information you provide when registering, including your name, email address, and role (seafarer or company). Seafarers may also provide additional profile information such as nationality, rank, date of birth, phone number, sea service records, and certificates. Companies may provide business name, location, website, and logo. If you sign in with Google, we receive your name and email address from Google.",
      },
      {
        title: "2. How We Use Your Information",
        body: "We use your information to operate the platform, facilitate connections between seafarers and crewing companies, send relevant notifications about job applications and account activity, and improve our services. We do not sell your personal information to third parties.",
      },
      {
        title: "3. Profile Visibility",
        body: "Seafarer profiles (name, rank, nationality, sea experience) may be visible to registered crewing companies on the platform. Sensitive information such as phone numbers and dates of birth are not displayed publicly. You can update or remove your profile information at any time from your dashboard.",
      },
      {
        title: "4. Email Communications",
        body: "We may send transactional emails related to your account activity, such as application status updates and job alerts you have subscribed to. These emails are necessary for the operation of the service. You can manage notification preferences in your account settings.",
      },
      {
        title: "5. Data Storage & Security",
        body: "Your data is stored on secure servers provided by Supabase (hosted on AWS infrastructure). We implement industry-standard security measures including encrypted connections (HTTPS/TLS), secure authentication via Supabase Auth, and row-level security (RLS) policies to ensure users can only access their own data.",
      },
      {
        title: "6. Cookies & Analytics",
        body: "We use session cookies necessary for authentication. We also use Google Analytics 4 to collect anonymized usage statistics (pages visited, session duration, country). Google Analytics may set its own cookies. We do not use advertising or retargeting cookies. Your language preference is stored in your browser's local storage.",
      },
      {
        title: "7. Third-Party Services",
        body: "We use the following third-party services: Supabase (database and authentication), Google OAuth (sign-in with Google), Google Analytics (anonymized site statistics), and Vercel (hosting). Each of these services has its own privacy policy. We do not share your personal data with any other third parties.",
      },
      {
        title: "8. Your Rights (GDPR)",
        body: "If you are located in the European Union or Ukraine, you have the right to access, correct, export, or delete your personal data. You may request a copy of your data or ask us to delete your account by contacting us through the contact form. We will respond within 5 business days.",
      },
      {
        title: "9. Data Retention",
        body: "We retain your account data for as long as your account is active. If you request account deletion, your personal data is removed within 30 days, except where retention is required by law. Application records may be retained in anonymized form for statistical purposes.",
      },
      {
        title: "10. Children's Privacy",
        body: "SeaJobs.pro is not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with personal data, please contact us so we can remove it.",
      },
      {
        title: "11. Changes to This Policy",
        body: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of the platform after changes constitutes acceptance of the updated policy.",
      },
      {
        title: "12. Contact",
        body: "For any privacy-related questions, data access requests, or deletion requests, please contact us through the contact form on our website. We will respond within 5 business days.",
      },
    ],
  },
  uk: {
    title: "Політика конфіденційності",
    updated: "Оновлено: червень 2026",
    intro: "SeaJobs.pro («ми», «нас» або «наш») прагне захистити вашу конфіденційність. Ця політика пояснює, яку інформацію ми збираємо, як ми її використовуємо та які права ви маєте щодо своїх даних.",
    sections: [
      {
        title: "1. Інформація, яку ми збираємо",
        body: "Ми збираємо інформацію, яку ви надаєте під час реєстрації: ім'я, адресу електронної пошти та роль (моряк або компанія). Моряки можуть надавати додаткову інформацію профілю: громадянство, ранг, дату народження, номер телефону, записи про морську службу та сертифікати. Компанії можуть надавати назву, місцезнаходження, вебсайт і логотип. Якщо ви входите через Google, ми отримуємо ваше ім'я та email від Google.",
      },
      {
        title: "2. Як ми використовуємо вашу інформацію",
        body: "Ми використовуємо вашу інформацію для роботи платформи, полегшення зв'язків між моряками та крюїнговими компаніями, надсилання відповідних сповіщень про заявки та активність акаунту, а також для вдосконалення наших послуг. Ми не продаємо вашу особисту інформацію третім особам.",
      },
      {
        title: "3. Видимість профілю",
        body: "Профілі моряків (ім'я, ранг, громадянство, морський досвід) можуть бути видимими зареєстрованим крюїнговим компаніям на платформі. Конфіденційна інформація, зокрема номери телефонів і дати народження, публічно не відображається. Ви можете оновити або видалити інформацію профілю в будь-який час через особистий кабінет.",
      },
      {
        title: "4. Email-комунікації",
        body: "Ми можемо надсилати транзакційні листи, пов'язані з активністю вашого акаунту: оновлення статусу заявок і підписані вами сповіщення про вакансії. Ці листи необхідні для роботи сервісу. Налаштування сповіщень можна змінити в параметрах акаунту.",
      },
      {
        title: "5. Зберігання та безпека даних",
        body: "Ваші дані зберігаються на захищених серверах Supabase (розміщених на інфраструктурі AWS). Ми застосовуємо стандартні галузеві заходи безпеки: шифрування з'єднань (HTTPS/TLS), безпечну автентифікацію через Supabase Auth та політики безпеки на рівні рядків (RLS), що гарантують доступ лише до власних даних.",
      },
      {
        title: "6. Куки та аналітика",
        body: "Ми використовуємо сесійні куки, необхідні для автентифікації. Також ми використовуємо Google Analytics 4 для збору анонімізованої статистики (сторінки, час сесії, країна). Google Analytics може встановлювати власні куки. Ми не використовуємо рекламні або ретаргетингові куки. Ваші мовні налаштування зберігаються в локальному сховищі браузера.",
      },
      {
        title: "7. Сторонні сервіси",
        body: "Ми використовуємо такі сторонні сервіси: Supabase (база даних та автентифікація), Google OAuth (вхід через Google), Google Analytics (анонімізована статистика), Vercel (хостинг). Кожен із цих сервісів має власну політику конфіденційності. Ми не передаємо ваші персональні дані жодним іншим третім особам.",
      },
      {
        title: "8. Ваші права (GDPR)",
        body: "Якщо ви перебуваєте в Євросоюзі або Україні, ви маєте право на доступ, виправлення, експорт або видалення своїх персональних даних. Ви можете запросити копію своїх даних або попросити видалити акаунт через контактну форму. Ми відповімо протягом 5 робочих днів.",
      },
      {
        title: "9. Зберігання даних",
        body: "Ми зберігаємо дані акаунту протягом усього часу, поки він активний. Якщо ви запросите видалення акаунту, ваші персональні дані буде видалено протягом 30 днів, крім випадків, коли зберігання вимагається законом. Записи про заявки можуть зберігатися в анонімізованому вигляді для статистичних цілей.",
      },
      {
        title: "10. Конфіденційність дітей",
        body: "SeaJobs.pro не призначена для осіб молодших 18 років. Ми свідомо не збираємо персональні дані неповнолітніх. Якщо ви вважаєте, що дитина надала нам персональні дані, будь ласка, зв'яжіться з нами для їх видалення.",
      },
      {
        title: "11. Зміни цієї політики",
        body: "Ми можемо оновлювати цю Політику конфіденційності час від часу. Зміни будуть опубліковані на цій сторінці з оновленою датою. Продовження використання платформи після змін означає прийняття оновленої політики.",
      },
      {
        title: "12. Контакт",
        body: "З будь-яких питань щодо конфіденційності, запитів на доступ до даних або їх видалення, будь ласка, зв'яжіться з нами через контактну форму на нашому вебсайті. Ми відповімо протягом 5 робочих днів.",
      },
    ],
  },
  pl: {
    title: "Polityka prywatności",
    updated: "Ostatnia aktualizacja: czerwiec 2026",
    intro: "SeaJobs.pro ('my', 'nas' lub 'nasz') zobowiązuje się do ochrony Twojej prywatności. Niniejsza polityka wyjaśnia, jakie informacje zbieramy, jak je wykorzystujemy i jakie masz prawa w odniesieniu do swoich danych.",
    sections: [
      {
        title: "1. Informacje, które zbieramy",
        body: "Zbieramy informacje podane podczas rejestracji: imię i nazwisko, adres e-mail oraz rolę (marynarz lub firma). Marynarze mogą podać dodatkowe informacje profilowe, takie jak narodowość, ranga, data urodzenia, numer telefonu, historia służby morskiej i certyfikaty. Firmy mogą podać nazwę, lokalizację, stronę internetową i logo. Jeśli logujesz się przez Google, otrzymujemy Twoje imię i adres e-mail od Google.",
      },
      {
        title: "2. Jak wykorzystujemy Twoje informacje",
        body: "Wykorzystujemy Twoje informacje do obsługi platformy, ułatwiania połączeń między marynarzami a firmami crewingowymi, wysyłania powiadomień o aplikacjach i aktywności konta oraz ulepszania naszych usług. Nie sprzedajemy Twoich danych osobowych stronom trzecim.",
      },
      {
        title: "3. Widoczność profilu",
        body: "Profile marynarzy (imię, ranga, narodowość, doświadczenie morskie) mogą być widoczne dla zarejestrowanych firm crewingowych na platformie. Wrażliwe informacje, takie jak numery telefonów i daty urodzenia, nie są wyświetlane publicznie. Możesz aktualizować lub usuwać informacje profilowe w dowolnym momencie z poziomu panelu.",
      },
      {
        title: "4. Komunikacja e-mail",
        body: "Możemy wysyłać e-maile transakcyjne związane z aktywnością Twojego konta, takie jak aktualizacje statusu aplikacji i alerty o ofertach, na które się zapisałeś. Te e-maile są niezbędne do działania usługi. Możesz zarządzać preferencjami powiadomień w ustawieniach konta.",
      },
      {
        title: "5. Przechowywanie danych i bezpieczeństwo",
        body: "Twoje dane są przechowywane na bezpiecznych serwerach Supabase (hostowanych na infrastrukturze AWS). Stosujemy standardowe branżowe środki bezpieczeństwa, w tym szyfrowane połączenia (HTTPS/TLS), bezpieczne uwierzytelnianie przez Supabase Auth oraz polityki bezpieczeństwa na poziomie wierszy (RLS) zapewniające dostęp wyłącznie do własnych danych.",
      },
      {
        title: "6. Pliki cookie i analityka",
        body: "Używamy sesyjnych plików cookie niezbędnych do uwierzytelniania. Korzystamy również z Google Analytics 4 do zbierania anonimowych statystyk użytkowania (odwiedzane strony, czas sesji, kraj). Google Analytics może ustawiać własne pliki cookie. Nie używamy reklamowych ani retargetingowych plików cookie. Twoje preferencje językowe są przechowywane w lokalnym magazynie przeglądarki.",
      },
      {
        title: "7. Usługi zewnętrzne",
        body: "Korzystamy z następujących usług zewnętrznych: Supabase (baza danych i uwierzytelnianie), Google OAuth (logowanie przez Google), Google Analytics (anonimowe statystyki), Vercel (hosting). Każda z tych usług ma własną politykę prywatności. Nie udostępniamy Twoich danych osobowych żadnym innym stronom trzecim.",
      },
      {
        title: "8. Twoje prawa (RODO)",
        body: "Jeśli przebywasz w Unii Europejskiej, masz prawo do dostępu, poprawiania, eksportowania lub usunięcia swoich danych osobowych. Możesz poprosić o kopię swoich danych lub zażądać usunięcia konta przez formularz kontaktowy. Odpowiemy w ciągu 5 dni roboczych.",
      },
      {
        title: "9. Przechowywanie danych",
        body: "Przechowujemy dane konta przez cały czas, gdy konto jest aktywne. Jeśli poprosisz o usunięcie konta, Twoje dane osobowe zostaną usunięte w ciągu 30 dni, z wyjątkiem przypadków wymaganych przez prawo. Rekordy aplikacji mogą być przechowywane w zanonimizowanej formie do celów statystycznych.",
      },
      {
        title: "10. Prywatność dzieci",
        body: "SeaJobs.pro nie jest skierowany do osób poniżej 18 roku życia. Świadomie nie zbieramy danych osobowych od nieletnich. Jeśli uważasz, że nieletni przekazał nam dane osobowe, skontaktuj się z nami, abyśmy mogli je usunąć.",
      },
      {
        title: "11. Zmiany w tej polityce",
        body: "Możemy od czasu do czasu aktualizować niniejszą Politykę prywatności. Zmiany będą publikowane na tej stronie z zaktualizowaną datą. Dalsze korzystanie z platformy po wprowadzeniu zmian oznacza akceptację zaktualizowanej polityki.",
      },
      {
        title: "12. Kontakt",
        body: "W przypadku pytań dotyczących prywatności, wniosków o dostęp do danych lub ich usunięcie, skontaktuj się z nami przez formularz kontaktowy na naszej stronie. Odpowiemy w ciągu 5 dni roboczych.",
      },
    ],
  },
  ru: {
    title: "Политика конфиденциальности",
    updated: "Обновлено: июнь 2026",
    intro: "SeaJobs.pro («мы», «нас» или «наш») стремится защищать вашу конфиденциальность. Настоящая политика объясняет, какую информацию мы собираем, как её используем и какие права у вас есть в отношении ваших данных.",
    sections: [
      {
        title: "1. Информация, которую мы собираем",
        body: "Мы собираем информацию, которую вы предоставляете при регистрации: имя, адрес электронной почты и роль (моряк или компания). Моряки могут предоставлять дополнительную информацию профиля: гражданство, ранг, дату рождения, номер телефона, записи о морской службе и сертификаты. Компании могут предоставлять название, местонахождение, сайт и логотип. Если вы входите через Google, мы получаем ваше имя и email от Google.",
      },
      {
        title: "2. Как мы используем вашу информацию",
        body: "Мы используем вашу информацию для работы платформы, обеспечения связи между моряками и крюинговыми компаниями, отправки уведомлений о заявках и активности аккаунта, а также для улучшения наших услуг. Мы не продаём ваши персональные данные третьим лицам.",
      },
      {
        title: "3. Видимость профиля",
        body: "Профили моряков (имя, ранг, гражданство, морской опыт) могут быть видны зарегистрированным крюинговым компаниям на платформе. Конфиденциальная информация, такая как номера телефонов и даты рождения, публично не отображается. Вы можете обновить или удалить информацию профиля в любое время через личный кабинет.",
      },
      {
        title: "4. Email-коммуникации",
        body: "Мы можем отправлять транзакционные письма, связанные с активностью вашего аккаунта: обновления статуса заявок и подписанные вами уведомления о вакансиях. Эти письма необходимы для работы сервиса. Настройки уведомлений можно изменить в параметрах аккаунта.",
      },
      {
        title: "5. Хранение данных и безопасность",
        body: "Ваши данные хранятся на защищённых серверах Supabase (размещённых на инфраструктуре AWS). Мы применяем стандартные отраслевые меры безопасности: шифрование соединений (HTTPS/TLS), безопасную аутентификацию через Supabase Auth и политики безопасности на уровне строк (RLS), обеспечивающие доступ только к собственным данным.",
      },
      {
        title: "6. Куки и аналитика",
        body: "Мы используем сессионные куки, необходимые для аутентификации. Также мы используем Google Analytics 4 для сбора анонимизированной статистики (страницы, время сессии, страна). Google Analytics может устанавливать собственные куки. Мы не используем рекламные или ретаргетинговые куки. Ваши языковые настройки хранятся в локальном хранилище браузера.",
      },
      {
        title: "7. Сторонние сервисы",
        body: "Мы используем следующие сторонние сервисы: Supabase (база данных и аутентификация), Google OAuth (вход через Google), Google Analytics (анонимизированная статистика), Vercel (хостинг). Каждый из этих сервисов имеет собственную политику конфиденциальности. Мы не передаём ваши персональные данные никаким другим третьим лицам.",
      },
      {
        title: "8. Ваши права (GDPR)",
        body: "Если вы находитесь в Европейском союзе или Украине, вы имеете право на доступ, исправление, экспорт или удаление своих персональных данных. Вы можете запросить копию своих данных или попросить удалить аккаунт через контактную форму. Мы ответим в течение 5 рабочих дней.",
      },
      {
        title: "9. Хранение данных",
        body: "Мы храним данные аккаунта в течение всего времени его активности. Если вы запросите удаление аккаунта, ваши персональные данные будут удалены в течение 30 дней, кроме случаев, когда хранение требуется по закону. Записи о заявках могут храниться в анонимизированном виде для статистических целей.",
      },
      {
        title: "10. Конфиденциальность детей",
        body: "SeaJobs.pro не предназначен для лиц младше 18 лет. Мы сознательно не собираем персональные данные несовершеннолетних. Если вы считаете, что ребёнок передал нам персональные данные, пожалуйста, свяжитесь с нами для их удаления.",
      },
      {
        title: "11. Изменения этой политики",
        body: "Мы можем время от времени обновлять настоящую Политику конфиденциальности. Изменения будут опубликованы на этой странице с обновлённой датой. Продолжение использования платформы после изменений означает принятие обновлённой политики.",
      },
      {
        title: "12. Контакт",
        body: "По любым вопросам конфиденциальности, запросам на доступ к данным или их удаление, пожалуйста, свяжитесь с нами через контактную форму на нашем сайте. Мы ответим в течение 5 рабочих дней.",
      },
    ],
  },
};

export default function PrivacyPage() {
  const { lang } = useLang();
  const t = TRANSLATIONS[lang] ?? TRANSLATIONS.en;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-5 py-16">
          <h1 className="font-display text-4xl font-semibold text-white">{t.title}</h1>
          <p className="mt-3 text-mist">{t.updated}</p>
          <p className="mt-4 text-mist leading-relaxed">{t.intro}</p>

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
