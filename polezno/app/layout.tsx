import "./globals.css";

// Pass-through root layout. The real <html>/<body> is rendered by
// app/[locale]/layout.tsx so the `lang` attribute and fonts can depend on the
// active locale. All routes live under [locale].
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
