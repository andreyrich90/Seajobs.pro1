"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Bell } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useLang } from "@/components/LangProvider";
import type { Lang } from "@/lib/i18n";

type Notification = {
  id: string;
  type: string;
  title: string;
  body: string | null;
  link: string | null;
  is_read: boolean;
  created_at: string;
};

const UI: Record<string, Record<Lang, string>> = {
  notifications: { ua: "Сповіщення", pl: "Powiadomienia", ru: "Уведомления", en: "Notifications" },
  markAll:       { ua: "Прочитати все", pl: "Oznacz przeczytane", ru: "Прочитать все", en: "Mark all read" },
  empty:         { ua: "Поки немає сповіщень", pl: "Brak powiadomień", ru: "Пока нет уведомлений", en: "No notifications yet" },
  justNow:       { ua: "щойно", pl: "przed chwilą", ru: "только что", en: "just now" },
};

function timeAgo(dateStr: string, lang: Lang): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return UI.justNow[lang];
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  const unit = (n: number, u: "m" | "h" | "d") => {
    const map = {
      m: { ua: `${n} хв тому`, pl: `${n} min temu`, ru: `${n} мин назад`, en: `${n}m ago` },
      h: { ua: `${n} год тому`, pl: `${n} godz temu`, ru: `${n} ч назад`, en: `${n}h ago` },
      d: { ua: `${n} дн тому`, pl: `${n} dni temu`, ru: `${n} дн назад`, en: `${n}d ago` },
    } as const;
    return map[u][lang];
  };
  if (m < 60) return unit(m, "m");
  if (h < 24) return unit(h, "h");
  return unit(d, "d");
}

// Notification text is stored in English in the DB. Re-localise it on render
// from the type + the dynamic parts parsed out of the stored strings, so both
// old and new notifications appear in the user's language.
function localize(n: Notification, lang: Lang): { title: string; body: string | null } {
  if (lang === "en") return { title: n.title, body: n.body };
  const body = n.body ?? "";

  const quoted = body.match(/"([^"]+)"/)?.[1] ?? "";

  if (n.type === "new_message") {
    const who = body.replace(/ sent you a message$/, "");
    const title = { ua: "Нове повідомлення", pl: "Nowa wiadomość", ru: "Новое сообщение" }[lang];
    const b = { ua: `${who} надіслав вам повідомлення`, pl: `${who} wysłał Ci wiadomość`, ru: `${who} отправил вам сообщение` }[lang];
    return { title, body: b };
  }

  if (n.type === "application_received") {
    const who = body.match(/^(.+?) applied for/)?.[1] ?? "";
    const title = { ua: "Новий відгук", pl: "Nowe zgłoszenie", ru: "Новый отклик" }[lang];
    const b = { ua: `${who} відгукнувся на «${quoted}»`, pl: `${who} zgłosił się na „${quoted}”`, ru: `${who} откликнулся на «${quoted}»` }[lang];
    return { title, body: b };
  }

  if (n.type === "status_changed") {
    const status = body.match(/has been (accepted|viewed|rejected)/)?.[1] ?? "";
    const titleMap: Record<string, Record<"ua" | "pl" | "ru", string>> = {
      accepted: { ua: "Відгук прийнято", pl: "Zgłoszenie zaakceptowane", ru: "Отклик принят" },
      viewed:   { ua: "Відгук переглянуто", pl: "Zgłoszenie przejrzane", ru: "Отклик просмотрен" },
      rejected: { ua: "Відгук відхилено", pl: "Zgłoszenie odrzucone", ru: "Отклик отклонён" },
    };
    const bodyMap: Record<string, Record<"ua" | "pl" | "ru", string>> = {
      accepted: { ua: `Ваш відгук на «${quoted}» прийнято.`, pl: `Twoje zgłoszenie na „${quoted}” zostało zaakceptowane.`, ru: `Ваш отклик на «${quoted}» принят.` },
      viewed:   { ua: `Ваш відгук на «${quoted}» переглянуто.`, pl: `Twoje zgłoszenie na „${quoted}” zostało przejrzane.`, ru: `Ваш отклик на «${quoted}» просмотрен.` },
      rejected: { ua: `Ваш відгук на «${quoted}» відхилено.`, pl: `Twoje zgłoszenie na „${quoted}” zostało odrzucone.`, ru: `Ваш отклик на «${quoted}» отклонён.` },
    };
    if (status && titleMap[status]) return { title: titleMap[status][lang], body: bodyMap[status][lang] };
  }

  if (n.type === "new_vacancy") {
    const m = body.match(/^(.+?) posted a new (.+?) position:/);
    const company = m?.[1] ?? "";
    const rank = m?.[2] ?? "";
    const title = { ua: "Нова вакансія", pl: "Nowa oferta", ru: "Новая вакансия" }[lang];
    const b = { ua: `${company} розмістив нову вакансію ${rank}: «${quoted}»`, pl: `${company} dodał nową ofertę ${rank}: „${quoted}”`, ru: `${company} разместил новую вакансию ${rank}: «${quoted}»` }[lang];
    return { title, body: b };
  }

  return { title: n.title, body: n.body };
}

export default function NotificationBell({ placement = "down-right" }: { placement?: "down-right" | "up-left" }) {
  const router = useRouter();
  const { lang } = useLang();
  const tx = (k: string) => UI[k][lang];
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unread, setUnread] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  async function fetchNotifications() {
    const { data } = await supabase
      .from("notifications")
      .select("id, type, title, body, link, is_read, created_at")
      .order("created_at", { ascending: false })
      .limit(20);

    if (data) {
      setNotifications(data as Notification[]);
      setUnread(data.filter((n) => !n.is_read).length);
    }
  }

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  async function handleOpen() {
    setOpen((o) => !o);
    if (!open) await fetchNotifications();
  }

  async function handleClick(n: Notification) {
    if (!n.is_read) {
      await supabase.from("notifications").update({ is_read: true }).eq("id", n.id);
      setNotifications((prev) => prev.map((x) => (x.id === n.id ? { ...x, is_read: true } : x)));
      setUnread((c) => Math.max(0, c - 1));
    }
    setOpen(false);
    if (n.link) router.push(n.link);
  }

  async function markAllRead() {
    const unreadIds = notifications.filter((n) => !n.is_read).map((n) => n.id);
    if (unreadIds.length === 0) return;
    await supabase.from("notifications").update({ is_read: true }).in("id", unreadIds);
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    setUnread(0);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={handleOpen}
        className="relative flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-mist transition hover:bg-white/10 hover:text-white"
        title="Notifications"
      >
        <Bell size={18} />
        {unread > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-coral text-[10px] font-bold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div
          className={`absolute z-50 w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-white/10 bg-navy2 shadow-2xl ${
            placement === "up-left" ? "bottom-12 left-0" : "right-0 top-12"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="text-sm font-semibold text-white">{tx("notifications")}</span>
            {unread > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs font-semibold text-brass2 hover:text-brass transition"
              >
                {tx("markAll")}
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Bell size={28} className="mx-auto mb-2 text-mist/30" />
                <p className="text-sm text-mist">{tx("empty")}</p>
              </div>
            ) : (
              notifications.map((n) => {
                const loc = localize(n, lang);
                return (
                <button
                  key={n.id}
                  onClick={() => handleClick(n)}
                  className={`flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-white/5 border-b border-white/5 last:border-0 ${
                    !n.is_read ? "bg-brass/5" : ""
                  }`}
                >
                  {!n.is_read && (
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brass2" />
                  )}
                  {n.is_read && <span className="mt-1.5 h-2 w-2 shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${n.is_read ? "text-mist" : "text-white"}`}>
                      {loc.title}
                    </p>
                    {loc.body && (
                      <p className="mt-0.5 text-xs text-mist line-clamp-2">{loc.body}</p>
                    )}
                    <p className="mt-1 text-xs text-mist/50">{timeAgo(n.created_at, lang)}</p>
                  </div>
                </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
