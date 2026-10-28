"use client";

import { useEffect, useState } from "react";
import { EyeOff, Eye, Trash2, AlertTriangle } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useLang } from "@/components/LangProvider";

// The bottom of /seafarer/profile: hide the profile from crewing companies,
// and delete the account.
//
// Hiding is one column, `seafarers.is_hidden`; what it hides is decided by the
// database (20261028000000_seafarer_hidden_profile.sql), so this switch only
// flips it. Deleting goes through api/account/delete, which re-derives the
// caller from the token and wants the confirmation word in the body.

type Copy = {
  title: string;
  hideTitle: string;
  hideOn: string;
  hideOff: string;
  hideNote: string;
  hideFailed: string;
  delTitle: string;
  delBody: string;
  delList: string[];
  delKeep: string;
  delOpen: string;
  delType: string;
  delWord: string;
  delGo: string;
  delCancel: string;
  delFailed: string;
};

const COPY: Record<string, Copy> = {
  en: {
    title: "Privacy and account",
    hideTitle: "Hide my profile from crewing companies",
    hideOn: "Your profile is hidden. Crewing companies cannot find it in the seafarer search or open it.",
    hideOff: "Your profile is visible to crewing companies in the seafarer search.",
    hideNote: "Your account stays active: you can search vacancies and apply as before. A company you apply to, or are already talking to, still sees your profile — applying is your choice to be seen.",
    hideFailed: "Could not change the setting. Try again in a minute.",
    delTitle: "Delete account",
    delBody: "This deletes your account for good. It cannot be undone.",
    delList: ["your profile and CV", "certificates and sea service", "applications and messages", "your photo, notifications, alerts and saved vacancies", "your subscription (no refund for the time left)"],
    delKeep: "Your forum posts stay, without your name. Payment records are kept for accounting.",
    delOpen: "Delete my account",
    delType: "To confirm, type {word}",
    delWord: "DELETE",
    delGo: "Delete for good",
    delCancel: "Cancel",
    delFailed: "Could not delete the account. Try again, or write to partners@seajobs.pro.",
  },
  ru: {
    title: "Приватность и аккаунт",
    hideTitle: "Скрыть профиль от крюингов",
    hideOn: "Профиль скрыт. Крюинговые компании не найдут его в поиске моряков и не смогут открыть.",
    hideOff: "Профиль виден крюинговым компаниям в поиске моряков.",
    hideNote: "Аккаунт остаётся активным: вы так же ищете вакансии и откликаетесь. Компания, в которую вы откликнулись или с которой уже переписываетесь, ваш профиль видит — отклик и есть ваш выбор показаться ей.",
    hideFailed: "Не удалось изменить настройку. Попробуйте ещё раз через минуту.",
    delTitle: "Удалить аккаунт",
    delBody: "Аккаунт будет удалён навсегда. Отменить это нельзя.",
    delList: ["профиль и CV", "сертификаты и морской стаж", "отклики и переписка", "фото, уведомления, подписки на вакансии и сохранённые вакансии", "подписка (оставшееся время не возвращается)"],
    delKeep: "Ваши сообщения на форуме останутся, но без имени. Записи об оплатах сохраняются для бухгалтерии.",
    delOpen: "Удалить мой аккаунт",
    delType: "Для подтверждения введите {word}",
    delWord: "УДАЛИТЬ",
    delGo: "Удалить навсегда",
    delCancel: "Отмена",
    delFailed: "Не удалось удалить аккаунт. Попробуйте ещё раз или напишите на partners@seajobs.pro.",
  },
  ua: {
    title: "Приватність і акаунт",
    hideTitle: "Приховати профіль від крюїнгів",
    hideOn: "Профіль приховано. Крюїнгові компанії не знайдуть його в пошуку моряків і не зможуть відкрити.",
    hideOff: "Профіль видно крюїнговим компаніям у пошуку моряків.",
    hideNote: "Акаунт залишається активним: ви так само шукаєте вакансії та відгукуєтеся. Компанія, до якої ви відгукнулися або з якою вже листуєтеся, ваш профіль бачить — відгук і є вашим вибором показатися їй.",
    hideFailed: "Не вдалося змінити налаштування. Спробуйте ще раз за хвилину.",
    delTitle: "Видалити акаунт",
    delBody: "Акаунт буде видалено назавжди. Скасувати це неможливо.",
    delList: ["профіль і CV", "сертифікати й морський стаж", "відгуки та листування", "фото, сповіщення, підписки на вакансії та збережені вакансії", "підписка (час, що залишився, не повертається)"],
    delKeep: "Ваші повідомлення на форумі залишаться, але без імені. Записи про оплати зберігаються для бухгалтерії.",
    delOpen: "Видалити мій акаунт",
    delType: "Для підтвердження введіть {word}",
    delWord: "ВИДАЛИТИ",
    delGo: "Видалити назавжди",
    delCancel: "Скасувати",
    delFailed: "Не вдалося видалити акаунт. Спробуйте ще раз або напишіть на partners@seajobs.pro.",
  },
  pl: {
    title: "Prywatność i konto",
    hideTitle: "Ukryj profil przed agencjami crewingowymi",
    hideOn: "Profil jest ukryty. Agencje crewingowe nie znajdą go w wyszukiwarce marynarzy ani go nie otworzą.",
    hideOff: "Profil jest widoczny dla agencji crewingowych w wyszukiwarce marynarzy.",
    hideNote: "Konto pozostaje aktywne: nadal szukasz ofert i aplikujesz. Firma, do której aplikujesz lub z którą już korespondujesz, widzi Twój profil — aplikacja to Twój wybór, by się jej pokazać.",
    hideFailed: "Nie udało się zmienić ustawienia. Spróbuj ponownie za minutę.",
    delTitle: "Usuń konto",
    delBody: "Konto zostanie usunięte na zawsze. Tego nie da się cofnąć.",
    delList: ["profil i CV", "certyfikaty i staż na morzu", "aplikacje i wiadomości", "zdjęcie, powiadomienia, alerty i zapisane oferty", "subskrypcja (pozostały czas nie jest zwracany)"],
    delKeep: "Twoje wpisy na forum zostaną, ale bez imienia. Zapisy płatności są przechowywane dla księgowości.",
    delOpen: "Usuń moje konto",
    delType: "Aby potwierdzić, wpisz {word}",
    delWord: "USUŃ",
    delGo: "Usuń na zawsze",
    delCancel: "Anuluj",
    delFailed: "Nie udało się usunąć konta. Spróbuj ponownie lub napisz na partners@seajobs.pro.",
  },
  ro: {
    title: "Confidențialitate și cont",
    hideTitle: "Ascunde profilul de agențiile de crewing",
    hideOn: "Profilul este ascuns. Agențiile de crewing nu îl găsesc în căutarea de marinari și nu îl pot deschide.",
    hideOff: "Profilul este vizibil agențiilor de crewing în căutarea de marinari.",
    hideNote: "Contul rămâne activ: cauți posturi și aplici ca înainte. Compania la care aplici sau cu care vorbești deja îți vede profilul — aplicarea este alegerea ta de a te arăta.",
    hideFailed: "Setarea nu a putut fi schimbată. Încearcă din nou peste un minut.",
    delTitle: "Șterge contul",
    delBody: "Contul va fi șters definitiv. Nu se poate anula.",
    delList: ["profilul și CV-ul", "certificatele și stagiul pe mare", "aplicările și mesajele", "fotografia, notificările, alertele și posturile salvate", "abonamentul (timpul rămas nu se rambursează)"],
    delKeep: "Mesajele tale de pe forum rămân, fără numele tău. Înregistrările plăților se păstrează pentru contabilitate.",
    delOpen: "Șterge contul meu",
    delType: "Pentru confirmare, scrie {word}",
    delWord: "ȘTERGE",
    delGo: "Șterge definitiv",
    delCancel: "Anulează",
    delFailed: "Contul nu a putut fi șters. Încearcă din nou sau scrie la partners@seajobs.pro.",
  },
};

export default function AccountPrivacy() {
  const { lang } = useLang();
  const c = COPY[lang] ?? COPY.en;
  const [hidden, setHidden] = useState<boolean | null>(null);
  const [savingHidden, setSavingHidden] = useState(false);
  const [hideError, setHideError] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data, error } = await supabase.from("seafarers").select("is_hidden").eq("id", session.user.id).maybeSingle();
      // Before the migration the column does not exist: the switch stays off and disabled.
      if (!error && data) setHidden(!!data.is_hidden);
    })();
  }, []);

  async function toggleHidden() {
    if (hidden === null) return;
    setSavingHidden(true);
    setHideError(false);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setSavingHidden(false); return; }
    const next = !hidden;
    const { error } = await supabase.from("seafarers").update({ is_hidden: next }).eq("id", session.user.id);
    if (error) setHideError(true);
    else setHidden(next);
    setSavingHidden(false);
  }

  async function deleteAccount() {
    setDeleting(true);
    setDeleteError(false);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("no session");
      const res = await fetch("/api/account/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ confirm: "DELETE" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      try { localStorage.removeItem("user_role"); } catch { /* storage blocked */ }
      await supabase.auth.signOut();
      window.location.href = lang === "en" ? "/" : `/${lang}`;
    } catch {
      setDeleteError(true);
      setDeleting(false);
    }
  }

  const wordOk = typed.trim().toLocaleUpperCase() === c.delWord;

  return (
    <section className="mt-10 flex flex-col gap-5" aria-labelledby="privacy-title">
      <h2 id="privacy-title" className="text-sm font-semibold uppercase tracking-wider text-mist">{c.title}</h2>

      <div className="rounded-2xl border border-white/10 bg-card p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1 basis-72">
            <p className="flex items-center gap-2 font-semibold text-white">
              {hidden ? <EyeOff size={17} className="text-brassInk" /> : <Eye size={17} className="text-teal" />}
              {c.hideTitle}
            </p>
            <p className="mt-1 text-sm text-foam">{hidden ? c.hideOn : c.hideOff}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={!!hidden}
            aria-label={c.hideTitle}
            onClick={() => void toggleHidden()}
            disabled={hidden === null || savingHidden}
            className={`relative h-8 w-14 shrink-0 rounded-full border transition disabled:opacity-50 ${hidden ? "border-brass bg-brass" : "border-white/20 bg-navy2"}`}
          >
            <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${hidden ? "left-7" : "left-1"}`} />
          </button>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-mist">{c.hideNote}</p>
        {hideError && <p className="mt-2 text-xs text-coral">{c.hideFailed}</p>}
      </div>

      <div className="rounded-2xl border border-coral/30 bg-coral/5 p-5">
        <p className="flex items-center gap-2 font-semibold text-white">
          <Trash2 size={17} className="text-coral" /> {c.delTitle}
        </p>
        <p className="mt-1 text-sm text-foam">{c.delBody}</p>
        {!confirmOpen ? (
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="mt-4 min-h-[44px] rounded-xl border border-coral/50 px-4 text-sm font-bold text-coral transition hover:bg-coral/10"
          >
            {c.delOpen}
          </button>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            <ul className="list-disc pl-5 text-sm text-foam">
              {c.delList.map((x) => <li key={x}>{x}</li>)}
            </ul>
            <p className="text-xs text-mist">{c.delKeep}</p>
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-foam">
              {c.delType.replace("{word}", c.delWord)}
              <input
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                autoComplete="off"
                disabled={deleting}
                className="max-w-xs rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-coral disabled:opacity-50"
              />
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => void deleteAccount()}
                disabled={!wordOk || deleting}
                className="min-h-[44px] rounded-xl bg-coral px-5 text-sm font-bold text-white transition disabled:opacity-40"
              >
                {deleting ? "…" : c.delGo}
              </button>
              <button
                type="button"
                onClick={() => { setConfirmOpen(false); setTyped(""); setDeleteError(false); }}
                disabled={deleting}
                className="min-h-[44px] rounded-xl border border-white/15 px-5 text-sm font-semibold text-foam transition hover:bg-white/5"
              >
                {c.delCancel}
              </button>
            </div>
            {deleteError && (
              <p className="flex items-center gap-2 text-sm text-coral"><AlertTriangle size={15} /> {c.delFailed}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
