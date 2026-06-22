"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useLang } from "@/components/LangProvider";
import ChatPanel from "@/components/ChatPanel";

type Convo = {
  id: string;
  otherId: string;
  name: string;
  subtitle: string | null;
  avatar: string | null;
  lastBody: string | null;
  lastAt: string | null;
  lastMine: boolean;
  unread: number;
};

const TXT: Record<string, Record<string, string>> = {
  title:   { ua: "Повідомлення", pl: "Wiadomości", ru: "Сообщения", en: "Messages" },
  empty:   { ua: "Поки немає листувань", pl: "Brak wiadomości", ru: "Пока нет переписок", en: "No messages yet" },
  emptyC:  { ua: "Напишіть кандидату зі сторінки відгуків.", pl: "Napisz do kandydata ze strony aplikacji.", ru: "Напишите кандидату со страницы откликов.", en: "Message a candidate from the applications page." },
  emptyS:  { ua: "Компанія напише вам після вашого відгуку.", pl: "Firma napisze do Ciebie po Twojej aplikacji.", ru: "Компания напишет вам после вашего отклика.", en: "A company will message you after you apply." },
  pick:    { ua: "Виберіть листування", pl: "Wybierz wiadomość", ru: "Выберите переписку", en: "Select a conversation" },
  you:     { ua: "Ви: ", pl: "Ty: ", ru: "Вы: ", en: "You: " },
};

function fmtWhen(d: string | null): string {
  if (!d) return "";
  const date = new Date(d);
  const now = new Date();
  const sameDay = date.toDateString() === now.toDateString();
  return sameDay
    ? date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
    : date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function MessagesView({ role }: { role: "company" | "seafarer" }) {
  const { lang } = useLang();
  const tx = (k: string) => TXT[k]?.[lang] ?? TXT[k]?.en ?? k;
  const searchParams = useSearchParams();

  const [userId, setUserId] = useState<string | null>(null);
  const [convos, setConvos] = useState<Convo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  const load = useCallback(async (uid: string) => {
    const mineCol = role === "company" ? "company_id" : "seafarer_id";
    const otherCol = role === "company" ? "seafarer_id" : "company_id";

    const { data: rows } = await supabase
      .from("conversations")
      .select("id, company_id, seafarer_id, last_message_at, created_at")
      .eq(mineCol, uid)
      .order("last_message_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    const list = rows ?? [];
    const otherIds = [...new Set(list.map((r) => r[otherCol] as string))];

    // Counterpart names/avatars/subtitles.
    const names: Record<string, { name: string; avatar: string | null; subtitle: string | null }> = {};
    if (otherIds.length > 0) {
      if (role === "company") {
        const { data: sf } = await supabase.from("seafarers").select("id, first_name, last_name, photo_url, rank").in("id", otherIds);
        for (const s of sf ?? []) names[s.id] = { name: [s.first_name, s.last_name].filter(Boolean).join(" ") || "Seafarer", avatar: s.photo_url, subtitle: s.rank };
      } else {
        const { data: co } = await supabase.from("companies").select("id, name, logo_url, location").in("id", otherIds);
        for (const c of co ?? []) names[c.id] = { name: c.name || "Company", avatar: c.logo_url, subtitle: c.location };
      }
    }

    // Last message + unread counts in one query.
    const convoIds = list.map((r) => r.id);
    const lastByConvo: Record<string, { body: string; at: string; mine: boolean }> = {};
    const unreadByConvo: Record<string, number> = {};
    if (convoIds.length > 0) {
      const { data: msgs } = await supabase
        .from("chat_messages")
        .select("conversation_id, sender_id, body, read_at, created_at")
        .in("conversation_id", convoIds)
        .order("created_at", { ascending: true });
      for (const m of msgs ?? []) {
        lastByConvo[m.conversation_id] = { body: m.body, at: m.created_at, mine: m.sender_id === uid };
        if (m.sender_id !== uid && !m.read_at) unreadByConvo[m.conversation_id] = (unreadByConvo[m.conversation_id] ?? 0) + 1;
      }
    }

    setConvos(
      list.map((r) => {
        const otherId = r[otherCol] as string;
        return {
          id: r.id,
          otherId,
          name: names[otherId]?.name ?? "—",
          subtitle: names[otherId]?.subtitle ?? null,
          avatar: names[otherId]?.avatar ?? null,
          lastBody: lastByConvo[r.id]?.body ?? null,
          lastAt: lastByConvo[r.id]?.at ?? r.last_message_at,
          lastMine: lastByConvo[r.id]?.mine ?? false,
          unread: unreadByConvo[r.id] ?? 0,
        };
      })
    );
    setLoading(false);
  }, [role]);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setLoading(false); return; }
      setUserId(session.user.id);
      await load(session.user.id);
    })();
  }, [load]);

  // Preselect from ?c= once conversations are loaded.
  useEffect(() => {
    const c = searchParams.get("c");
    if (c && convos.some((x) => x.id === c)) setSelected(c);
  }, [searchParams, convos]);

  const selectedConvo = convos.find((c) => c.id === selected) ?? null;

  return (
    <div className="p-5 sm:p-8">
      <h1 className="mb-5 font-display text-2xl font-semibold text-white">{tx("title")}</h1>

      {loading ? (
        <p className="text-sm text-mist">…</p>
      ) : convos.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-card p-12 text-center">
          <MessageCircle size={40} className="mx-auto mb-3 text-mist/40" />
          <p className="text-lg font-semibold text-foam">{tx("empty")}</p>
          <p className="mt-1 text-sm text-mist">{role === "company" ? tx("emptyC") : tx("emptyS")}</p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* Conversation list */}
          <div className={`rounded-2xl border border-white/10 bg-card ${selected ? "hidden lg:block" : ""}`}>
            <div className="flex flex-col divide-y divide-white/5">
              {convos.map((c) => {
                const unread = c.unread > 0;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelected(c.id)}
                    className={`flex items-center gap-3 px-4 py-3 text-left transition hover:bg-white/5 ${
                      selected === c.id ? "bg-white/5" : ""
                    }`}
                  >
                    {c.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.avatar} alt={c.name} className="h-11 w-11 shrink-0 rounded-full object-cover" />
                    ) : (
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-bold text-white">
                        {c.name[0]?.toUpperCase() ?? "?"}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className={`truncate text-sm ${unread ? "font-bold text-white" : "font-semibold text-foam"}`}>{c.name}</p>
                        <span className="shrink-0 text-[11px] text-mist/70">{fmtWhen(c.lastAt)}</span>
                      </div>
                      <p className={`truncate text-xs ${unread ? "font-semibold text-foam" : "text-mist"}`}>
                        {c.lastMine && c.lastBody ? tx("you") : ""}{c.lastBody ?? "—"}
                      </p>
                    </div>
                    {unread && (
                      <span className="grid h-5 min-w-5 shrink-0 place-items-center rounded-full bg-brass px-1.5 text-[11px] font-bold text-deep">
                        {c.unread}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat pane */}
          <div className={`h-[70vh] rounded-2xl border border-white/10 bg-card ${selected ? "" : "hidden lg:block"}`}>
            {selectedConvo && userId ? (
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                  <button onClick={() => setSelected(null)} className="text-mist transition hover:text-white lg:hidden" aria-label="Back">
                    <ArrowLeft size={18} />
                  </button>
                  {selectedConvo.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={selectedConvo.avatar} alt={selectedConvo.name} className="h-9 w-9 rounded-full object-cover" />
                  ) : (
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-sm font-bold text-white">
                      {selectedConvo.name[0]?.toUpperCase() ?? "?"}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-white">{selectedConvo.name}</p>
                    {selectedConvo.subtitle && <p className="truncate text-xs text-mist">{selectedConvo.subtitle}</p>}
                  </div>
                </div>
                <div className="min-h-0 flex-1">
                  <ChatPanel
                    conversationId={selectedConvo.id}
                    currentUserId={userId}
                    onSent={() => userId && load(userId)}
                  />
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-mist">{tx("pick")}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
