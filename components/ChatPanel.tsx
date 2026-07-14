"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Send, Loader2 } from "lucide-react";
import { supabase, notify } from "@/lib/supabase/client";
import { useLang } from "@/components/LangProvider";
import type { Database } from "@/lib/supabase/types";

type Message = Database["public"]["Tables"]["chat_messages"]["Row"];

const PLACEHOLDER: Record<string, string> = {
  ua: "Напишіть повідомлення…", pl: "Napisz wiadomość…", ru: "Напишите сообщение…", en: "Type a message…",
  ro: "Scrie un mesaj…",
};

function fmtTime(d: string): string {
  return new Date(d).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export default function ChatPanel({
  conversationId,
  currentUserId,
  onSent,
}: {
  conversationId: string;
  currentUserId: string;
  onSent?: () => void;
}) {
  const { lang } = useLang();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }));
  }, []);

  const markRead = useCallback(async (msgs: Message[]) => {
    const unreadIds = msgs.filter((m) => m.sender_id !== currentUserId && !m.read_at).map((m) => m.id);
    if (unreadIds.length === 0) return;
    await supabase.from("chat_messages").update({ read_at: new Date().toISOString() }).in("id", unreadIds);
  }, [currentUserId]);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });
    const rows = data ?? [];
    setMessages(rows);
    setLoading(false);
    markRead(rows);
  }, [conversationId, markRead]);

  // Initial load + realtime subscription + polling fallback.
  useEffect(() => {
    setLoading(true);
    setMessages([]);
    load();

    const channel = supabase
      .channel(`chat:${conversationId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages", filter: `conversation_id=eq.${conversationId}` },
        (payload) => {
          const m = payload.new as Message;
          setMessages((prev) => (prev.some((x) => x.id === m.id) ? prev : [...prev, m]));
          if (m.sender_id !== currentUserId) markRead([m]);
        }
      )
      .subscribe();

    const poll = setInterval(load, 5000);
    return () => { supabase.removeChannel(channel); clearInterval(poll); };
  }, [conversationId, load, markRead, currentUserId]);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  async function send() {
    const body = input.trim();
    if (!body || sending) return;
    setSending(true);
    setInput("");
    const { data, error } = await supabase
      .from("chat_messages")
      .insert({ conversation_id: conversationId, sender_id: currentUserId, body })
      .select("*")
      .single();
    if (!error && data) {
      setMessages((prev) => (prev.some((x) => x.id === data.id) ? prev : [...prev, data]));
      await supabase.from("conversations").update({ last_message_at: new Date().toISOString() }).eq("id", conversationId);
      notify({ type: "new_message", conversationId });
      onSent?.();
    } else {
      setInput(body); // restore on failure
    }
    setSending(false);
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-10 text-mist">
            <Loader2 size={16} className="animate-spin" /> …
          </div>
        ) : messages.length === 0 ? (
          <p className="py-10 text-center text-sm text-mist">—</p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {messages.map((m) => {
              const mine = m.sender_id === currentUserId;
              return (
                <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-sm ${
                      mine
                        ? "rounded-br-md bg-brass/20 text-foam"
                        : "rounded-bl-md border border-white/10 bg-navy2 text-foam/90"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">{m.body}</p>
                    <p className={`mt-1 text-[10px] ${mine ? "text-brass2/70" : "text-mist/60"}`}>{fmtTime(m.created_at)}</p>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className="flex items-end gap-2 border-t border-white/10 p-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
          }}
          rows={1}
          placeholder={PLACEHOLDER[lang] ?? PLACEHOLDER.en}
          className="max-h-32 min-h-[42px] flex-1 resize-none rounded-xl border border-white/10 bg-navy2 px-3 py-2.5 text-sm text-foam placeholder:text-mist/50 focus:border-brass/40 focus:outline-none"
        />
        <button
          onClick={send}
          disabled={sending || !input.trim()}
          aria-label="Send"
          className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl bg-brass text-[#061523] transition hover:bg-brass2 disabled:opacity-40"
        >
          {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        </button>
      </div>
    </div>
  );
}
