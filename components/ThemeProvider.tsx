"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "light",
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

// Light («Глубина») is the CSS default and needs no attribute; dark is opt-in
// and marked by data-theme="dark", set by an inline script in layout.tsx before
// paint (no flash). This provider mirrors that into React state, persists
// changes to localStorage and flips the attribute on toggle.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Light is the default; the inline script in layout.tsx has already put
  // the attribute on <html> by the time this mounts.
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      const root = document.documentElement;
      if (next === "dark") root.setAttribute("data-theme", "dark");
      else root.removeAttribute("data-theme");
      // Persist in BOTH localStorage and a cookie. Some in-app browsers
      // (Telegram, Instagram, etc.) drop localStorage between page loads but
      // keep cookies — the cookie makes the choice actually stick on reload.
      try {
        localStorage.setItem("theme", next);
      } catch {}
      try {
        document.cookie = `theme=${next}; path=/; max-age=31536000; SameSite=Lax`;
      } catch {}
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}
