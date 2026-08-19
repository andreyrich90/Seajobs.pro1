import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";

const display = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});
const body = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Готово — админка",
  robots: { index: false, follow: false },
};

// Standalone admin, outside the [locale] tree — renders its own <html>/<body>
// (the root layout is a pass-through). globals.css is loaded by the root layout.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-cream text-ink font-body antialiased">{children}</body>
    </html>
  );
}
