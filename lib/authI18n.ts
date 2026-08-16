// Copy for the auth screens, kept out of `lib/i18n.ts` on purpose.
//
// `app/auth/*` sits outside the `[locale]` tree, so it cannot be handed a
// dictionary by the server the way the rest of the app is — it only learns the
// reader's language in the browser. It therefore imports its strings directly,
// and if those strings lived beside `T` the login and registration pages would
// each pull all five languages of the entire site (~140 KB) to show one form.
//
// `localePath` comes along because the auth flow is its only caller.
import type { Lang } from "@/lib/langs";

// Prefix an app path with the locale (default English carries no prefix, per
// next-intl "as-needed"). Used to keep the language after the post-login
// redirect into the (non-localized) auth flow.
export function localePath(path: string, lang: Lang): string {
  return lang === "en" ? path : `/${lang}${path}`;
}

// Auth screens live outside the [locale] tree and had no i18n, so their copy
// lives here in a dedicated map (consumed via useLang() in app/auth/*).
export const AUTH_T: Record<Lang, Record<string, string>> = {
  en: {
    tab_seafarer: "Seafarer", tab_crewing: "Crewing",
    welcome: "Welcome back", signin_as: "Sign in as",
    role_seafarer: "Seafarer", role_company: "Crewing Company",
    google: "Sign in with Google", redirecting: "Redirecting...",
    or: "or", email: "Email", password: "Password", password_ph: "Enter your password",
    forgot: "Forgot password?", signin: "Sign in", signing: "Signing in...",
    no_account: "No account?", create_one: "Create one",
    blocked: "Your account has been blocked. Please contact support.",
    err_failed: "Sign in failed. Please try again.",
    err_unexpected: "An unexpected error occurred.",
  },
  ru: {
    tab_seafarer: "Моряк", tab_crewing: "Крюинг",
    welcome: "С возвращением", signin_as: "Вход как",
    role_seafarer: "Моряк", role_company: "Крюинговая компания",
    google: "Войти через Google", redirecting: "Перенаправление...",
    or: "или", email: "Эл. почта", password: "Пароль", password_ph: "Введите пароль",
    forgot: "Забыли пароль?", signin: "Войти", signing: "Вход...",
    no_account: "Нет аккаунта?", create_one: "Создать",
    blocked: "Ваш аккаунт заблокирован. Свяжитесь с поддержкой.",
    err_failed: "Не удалось войти. Попробуйте ещё раз.",
    err_unexpected: "Произошла непредвиденная ошибка.",
  },
  ua: {
    tab_seafarer: "Моряк", tab_crewing: "Крюїнг",
    welcome: "З поверненням", signin_as: "Вхід як",
    role_seafarer: "Моряк", role_company: "Крюїнгова компанія",
    google: "Увійти через Google", redirecting: "Перенаправлення...",
    or: "або", email: "Ел. пошта", password: "Пароль", password_ph: "Введіть пароль",
    forgot: "Забули пароль?", signin: "Увійти", signing: "Вхід...",
    no_account: "Немає акаунта?", create_one: "Створити",
    blocked: "Ваш акаунт заблоковано. Зверніться до підтримки.",
    err_failed: "Не вдалося увійти. Спробуйте ще раз.",
    err_unexpected: "Сталася непередбачена помилка.",
  },
  pl: {
    tab_seafarer: "Marynarz", tab_crewing: "Crewing",
    welcome: "Witaj ponownie", signin_as: "Zaloguj się jako",
    role_seafarer: "Marynarz", role_company: "Agencja crewingowa",
    google: "Zaloguj się przez Google", redirecting: "Przekierowanie...",
    or: "lub", email: "E-mail", password: "Hasło", password_ph: "Wprowadź hasło",
    forgot: "Nie pamiętasz hasła?", signin: "Zaloguj się", signing: "Logowanie...",
    no_account: "Nie masz konta?", create_one: "Utwórz",
    blocked: "Twoje konto zostało zablokowane. Skontaktuj się z pomocą.",
    err_failed: "Logowanie nie powiodło się. Spróbuj ponownie.",
    err_unexpected: "Wystąpił nieoczekiwany błąd.",
  },
  ro: {
    tab_seafarer: "Marinar", tab_crewing: "Crewing",
    welcome: "Bine ai revenit", signin_as: "Autentificare ca",
    role_seafarer: "Marinar", role_company: "Agenție de crewing",
    google: "Autentificare cu Google", redirecting: "Redirecționare...",
    or: "sau", email: "E-mail", password: "Parolă", password_ph: "Introduceți parola",
    forgot: "Ai uitat parola?", signin: "Autentificare", signing: "Se autentifică...",
    no_account: "Nu ai cont?", create_one: "Creează unul",
    blocked: "Contul tău a fost blocat. Contactează asistența.",
    err_failed: "Autentificare eșuată. Încearcă din nou.",
    err_unexpected: "A apărut o eroare neașteptată.",
  },
};

// Register + forgot-password copy, merged into AUTH_T per language.
Object.assign(AUTH_T.en, {
  reg_title: "Create your account", reg_subtitle: "Choose how you want to use SeaJobs.pro",
  card_company: "Company",
  card_seafarer_desc: "Find maritime jobs, build your CV, manage certificates and sea experience.",
  card_company_desc: "Post vacancies, find qualified seafarers, and manage your crew.",
  or_signup: "or sign up with", google_continue: "Continue with Google",
  have_account: "Already have an account?", signin_link: "Sign in",
  confirm_email: "Confirm your email", confirm_sent_pre: "We've sent a confirmation link to",
  confirm_sent_post: "Open it to finish creating your account.", back_to_signin: "Back to sign in",
  back: "Back", create_account: "Create account", fill_details: "Fill in your details to get started",
  email_address: "Email address", password_ph6: "At least 6 characters",
  confirm_password: "Confirm password", confirm_password_ph: "Repeat your password",
  creating: "Creating account...", or_continue: "or continue with",
  err_select_role: "Please select a role.", err_pw_match: "Passwords do not match.",
  err_pw_short: "Password must be at least 6 characters.", err_signup_failed: "Sign up failed. Please try again.",
  fp_title: "Forgot password?", fp_subtitle: "Enter your email address and we'll send you a reset link.",
  fp_check: "Check your email!", fp_sent_pre: "We've sent a password reset link to",
  fp_sent_post: "Check your inbox and follow the instructions.", fp_back: "Back to Login",
  fp_send: "Send Reset Link", fp_sending: "Sending...",
});
Object.assign(AUTH_T.ru, {
  reg_title: "Создайте аккаунт", reg_subtitle: "Выберите, как вы хотите использовать SeaJobs.pro",
  card_company: "Компания",
  card_seafarer_desc: "Ищите работу в море, создавайте CV, ведите сертификаты и морской стаж.",
  card_company_desc: "Публикуйте вакансии, находите квалифицированных моряков и управляйте экипажем.",
  or_signup: "или зарегистрируйтесь через", google_continue: "Продолжить с Google",
  have_account: "Уже есть аккаунт?", signin_link: "Войти",
  confirm_email: "Подтвердите email", confirm_sent_pre: "Мы отправили ссылку для подтверждения на",
  confirm_sent_post: "Откройте её, чтобы завершить создание аккаунта.", back_to_signin: "Назад ко входу",
  back: "Назад", create_account: "Создать аккаунт", fill_details: "Заполните данные, чтобы начать",
  email_address: "Эл. почта", password_ph6: "Минимум 6 символов",
  confirm_password: "Подтвердите пароль", confirm_password_ph: "Повторите пароль",
  creating: "Создание аккаунта...", or_continue: "или продолжить через",
  err_select_role: "Пожалуйста, выберите роль.", err_pw_match: "Пароли не совпадают.",
  err_pw_short: "Пароль должен содержать минимум 6 символов.", err_signup_failed: "Не удалось зарегистрироваться. Попробуйте ещё раз.",
  fp_title: "Забыли пароль?", fp_subtitle: "Введите ваш email, и мы отправим ссылку для сброса.",
  fp_check: "Проверьте почту!", fp_sent_pre: "Мы отправили ссылку для сброса пароля на",
  fp_sent_post: "Проверьте входящие и следуйте инструкциям.", fp_back: "Назад ко входу",
  fp_send: "Отправить ссылку", fp_sending: "Отправка...",
});
Object.assign(AUTH_T.ua, {
  reg_title: "Створіть акаунт", reg_subtitle: "Оберіть, як ви хочете використовувати SeaJobs.pro",
  card_company: "Компанія",
  card_seafarer_desc: "Шукайте роботу в морі, створюйте CV, ведіть сертифікати та морський стаж.",
  card_company_desc: "Публікуйте вакансії, знаходьте кваліфікованих моряків та керуйте екіпажем.",
  or_signup: "або зареєструйтеся через", google_continue: "Продовжити з Google",
  have_account: "Вже маєте акаунт?", signin_link: "Увійти",
  confirm_email: "Підтвердьте email", confirm_sent_pre: "Ми надіслали посилання для підтвердження на",
  confirm_sent_post: "Відкрийте його, щоб завершити створення акаунта.", back_to_signin: "Назад до входу",
  back: "Назад", create_account: "Створити акаунт", fill_details: "Заповніть дані, щоб почати",
  email_address: "Ел. пошта", password_ph6: "Мінімум 6 символів",
  confirm_password: "Підтвердьте пароль", confirm_password_ph: "Повторіть пароль",
  creating: "Створення акаунта...", or_continue: "або продовжити через",
  err_select_role: "Будь ласка, оберіть роль.", err_pw_match: "Паролі не збігаються.",
  err_pw_short: "Пароль має містити щонайменше 6 символів.", err_signup_failed: "Не вдалося зареєструватися. Спробуйте ще раз.",
  fp_title: "Забули пароль?", fp_subtitle: "Введіть ваш email, і ми надішлемо посилання для скидання.",
  fp_check: "Перевірте пошту!", fp_sent_pre: "Ми надіслали посилання для скидання пароля на",
  fp_sent_post: "Перевірте вхідні та дотримуйтесь інструкцій.", fp_back: "Назад до входу",
  fp_send: "Надіслати посилання", fp_sending: "Надсилання...",
});
Object.assign(AUTH_T.pl, {
  reg_title: "Utwórz konto", reg_subtitle: "Wybierz, jak chcesz korzystać z SeaJobs.pro",
  card_company: "Firma",
  card_seafarer_desc: "Znajdź pracę na morzu, zbuduj CV, zarządzaj certyfikatami i stażem morskim.",
  card_company_desc: "Publikuj oferty, znajduj wykwalifikowanych marynarzy i zarządzaj załogą.",
  or_signup: "lub zarejestruj się przez", google_continue: "Kontynuuj z Google",
  have_account: "Masz już konto?", signin_link: "Zaloguj się",
  confirm_email: "Potwierdź e-mail", confirm_sent_pre: "Wysłaliśmy link potwierdzający na",
  confirm_sent_post: "Otwórz go, aby dokończyć tworzenie konta.", back_to_signin: "Powrót do logowania",
  back: "Wstecz", create_account: "Utwórz konto", fill_details: "Wypełnij dane, aby rozpocząć",
  email_address: "Adres e-mail", password_ph6: "Co najmniej 6 znaków",
  confirm_password: "Potwierdź hasło", confirm_password_ph: "Powtórz hasło",
  creating: "Tworzenie konta...", or_continue: "lub kontynuuj przez",
  err_select_role: "Wybierz rolę.", err_pw_match: "Hasła nie są zgodne.",
  err_pw_short: "Hasło musi mieć co najmniej 6 znaków.", err_signup_failed: "Rejestracja nie powiodła się. Spróbuj ponownie.",
  fp_title: "Nie pamiętasz hasła?", fp_subtitle: "Podaj swój adres e-mail, a wyślemy link do resetu.",
  fp_check: "Sprawdź e-mail!", fp_sent_pre: "Wysłaliśmy link do zresetowania hasła na",
  fp_sent_post: "Sprawdź skrzynkę i postępuj zgodnie z instrukcjami.", fp_back: "Powrót do logowania",
  fp_send: "Wyślij link resetujący", fp_sending: "Wysyłanie...",
});
Object.assign(AUTH_T.ro, {
  reg_title: "Creează cont", reg_subtitle: "Alege cum vrei să folosești SeaJobs.pro",
  card_company: "Companie",
  card_seafarer_desc: "Găsește joburi maritime, creează-ți CV-ul, gestionează certificatele și experiența pe mare.",
  card_company_desc: "Publică posturi, găsește marinari calificați și gestionează-ți echipajul.",
  or_signup: "sau înscrie-te cu", google_continue: "Continuă cu Google",
  have_account: "Ai deja un cont?", signin_link: "Autentificare",
  confirm_email: "Confirmă-ți e-mailul", confirm_sent_pre: "Am trimis un link de confirmare la",
  confirm_sent_post: "Deschide-l pentru a finaliza crearea contului.", back_to_signin: "Înapoi la autentificare",
  back: "Înapoi", create_account: "Creează cont", fill_details: "Completează datele pentru a începe",
  email_address: "Adresă de e-mail", password_ph6: "Cel puțin 6 caractere",
  confirm_password: "Confirmă parola", confirm_password_ph: "Repetă parola",
  creating: "Se creează contul...", or_continue: "sau continuă cu",
  err_select_role: "Te rugăm să alegi un rol.", err_pw_match: "Parolele nu coincid.",
  err_pw_short: "Parola trebuie să aibă cel puțin 6 caractere.", err_signup_failed: "Înregistrarea a eșuat. Încearcă din nou.",
  fp_title: "Ai uitat parola?", fp_subtitle: "Introdu adresa de e-mail și îți vom trimite un link de resetare.",
  fp_check: "Verifică-ți e-mailul!", fp_sent_pre: "Am trimis un link de resetare a parolei la",
  fp_sent_post: "Verifică inbox-ul și urmează instrucțiunile.", fp_back: "Înapoi la autentificare",
  fp_send: "Trimite link de resetare", fp_sending: "Se trimite...",
});

// Reset-password screen (the target of the email reset link).
Object.assign(AUTH_T.en, {
  rp_title: "Set a new password", rp_subtitle: "Enter and confirm your new password below.",
  rp_new_password: "New password", rp_confirm_ph: "Repeat new password",
  rp_submit: "Update password", rp_updating: "Updating...",
  rp_success_title: "Password updated!", rp_success_body: "Your password has been changed. You can now sign in.",
  rp_go_login: "Go to sign in", rp_verifying: "Verifying your reset link...",
  rp_invalid: "This password reset link is invalid or has expired. Please request a new one.",
  rp_request_new: "Request a new link",
});
Object.assign(AUTH_T.ru, {
  rp_title: "Задайте новый пароль", rp_subtitle: "Введите и подтвердите новый пароль.",
  rp_new_password: "Новый пароль", rp_confirm_ph: "Повторите новый пароль",
  rp_submit: "Обновить пароль", rp_updating: "Обновление...",
  rp_success_title: "Пароль обновлён!", rp_success_body: "Ваш пароль изменён. Теперь вы можете войти.",
  rp_go_login: "Перейти ко входу", rp_verifying: "Проверяем ссылку для сброса...",
  rp_invalid: "Ссылка для сброса пароля недействительна или истекла. Запросите новую.",
  rp_request_new: "Запросить новую ссылку",
});
Object.assign(AUTH_T.ua, {
  rp_title: "Задайте новий пароль", rp_subtitle: "Введіть і підтвердіть новий пароль.",
  rp_new_password: "Новий пароль", rp_confirm_ph: "Повторіть новий пароль",
  rp_submit: "Оновити пароль", rp_updating: "Оновлення...",
  rp_success_title: "Пароль оновлено!", rp_success_body: "Ваш пароль змінено. Тепер ви можете увійти.",
  rp_go_login: "Перейти до входу", rp_verifying: "Перевіряємо посилання для скидання...",
  rp_invalid: "Посилання для скидання пароля недійсне або застаріле. Запросіть нове.",
  rp_request_new: "Запросити нове посилання",
});
Object.assign(AUTH_T.pl, {
  rp_title: "Ustaw nowe hasło", rp_subtitle: "Wprowadź i potwierdź nowe hasło poniżej.",
  rp_new_password: "Nowe hasło", rp_confirm_ph: "Powtórz nowe hasło",
  rp_submit: "Zaktualizuj hasło", rp_updating: "Aktualizowanie...",
  rp_success_title: "Hasło zaktualizowane!", rp_success_body: "Twoje hasło zostało zmienione. Możesz się teraz zalogować.",
  rp_go_login: "Przejdź do logowania", rp_verifying: "Weryfikacja linku resetującego...",
  rp_invalid: "Ten link do resetu hasła jest nieprawidłowy lub wygasł. Poproś o nowy.",
  rp_request_new: "Poproś o nowy link",
});
Object.assign(AUTH_T.ro, {
  rp_title: "Setează o parolă nouă", rp_subtitle: "Introdu și confirmă noua parolă mai jos.",
  rp_new_password: "Parolă nouă", rp_confirm_ph: "Repetă parola nouă",
  rp_submit: "Actualizează parola", rp_updating: "Se actualizează...",
  rp_success_title: "Parolă actualizată!", rp_success_body: "Parola ta a fost schimbată. Acum te poți autentifica.",
  rp_go_login: "Mergi la autentificare", rp_verifying: "Se verifică linkul de resetare...",
  rp_invalid: "Acest link de resetare a parolei este invalid sau a expirat. Solicită unul nou.",
  rp_request_new: "Solicită un link nou",
});
