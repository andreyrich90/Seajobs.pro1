"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Bell } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

type Notification = {
  id: string;
  type: string;
  title: string;
  body: string | null;
  link: string | null;
  is_read: boolean;
  created_at: string;
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function NotificationBell({ placement = "down-right" }: { placement?: "down-right" | "up-left" }) {
  const router = useRouter();
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
            <span className="text-sm font-semibold text-white">Notifications</span>
            {unread > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs font-semibold text-brass2 hover:text-brass transition"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Bell size={28} className="mx-auto mb-2 text-mist/30" />
                <p className="text-sm text-mist">No notifications yet</p>
              </div>
            ) : (
              notifications.map((n) => (
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
                      {n.title}
                    </p>
                    {n.body && (
                      <p className="mt-0.5 text-xs text-mist line-clamp-2">{n.body}</p>
                    )}
                    <p className="mt-1 text-xs text-mist/50">{timeAgo(n.created_at)}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
