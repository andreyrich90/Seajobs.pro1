import "./globals.css";
import Script from "next/script";
import { LangProvider } from "@/components/LangProvider";

export const metadata = {
  title: "SeaJobs.pro — Maritime Jobs for Seafarers",
  description: "Find maritime jobs worldwide. Platform for seafarers and crewing companies. Search vacancies by rank, vessel type, salary.",
  keywords: "maritime jobs, seafarer jobs, crewing, maritime career, ship jobs",
  openGraph: {
    title: "SeaJobs.pro — Maritime Jobs",
    description: "Find maritime jobs worldwide for seafarers",
    type: "website",
    siteName: "SeaJobs.pro",
  },
  twitter: {
    card: "summary",
    title: "SeaJobs.pro — Maritime Jobs",
    description: "Find maritime jobs worldwide for seafarers",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-navy text-foam font-body overflow-x-hidden">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1H5KRW7TS9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1H5KRW7TS9');
          `}
        </Script>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
