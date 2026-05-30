import "./globals.css";

export const metadata = {
  title: "SeaJobs.pro — Maritime Jobs",
  description: "Maritime career platform for seafarers and crewing companies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-navy text-foam font-body">{children}</body>
    </html>
  );
}
