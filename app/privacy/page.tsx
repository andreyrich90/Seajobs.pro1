"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: "We collect information you provide when registering, including your name, email address, and role (seafarer or company). Seafarers may also provide additional profile information such as nationality, rank, date of birth, phone number, sea service records, and certificates. Companies may provide business name, location, website, and logo. If you sign in with Google, we receive your name and email address from Google.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use your information to operate the platform, facilitate connections between seafarers and crewing companies, send relevant notifications about job applications and account activity, and improve our services. We do not sell your personal information to third parties.",
  },
  {
    title: "3. Profile Visibility",
    body: "Seafarer profiles (name, rank, nationality, sea experience) may be visible to registered crewing companies on the platform. Sensitive information such as phone numbers and dates of birth are not displayed publicly. You can update or remove your profile information at any time from your dashboard.",
  },
  {
    title: "4. Email Communications",
    body: "We may send transactional emails related to your account activity, such as application status updates and job alerts you have subscribed to. These emails are necessary for the operation of the service. You can manage notification preferences in your account settings.",
  },
  {
    title: "5. Data Storage & Security",
    body: "Your data is stored on secure servers provided by Supabase (hosted on AWS infrastructure). We implement industry-standard security measures including encrypted connections (HTTPS/TLS), secure authentication via Supabase Auth, and row-level security (RLS) policies to ensure users can only access their own data.",
  },
  {
    title: "6. Cookies & Analytics",
    body: "We use session cookies necessary for authentication. We also use Google Analytics 4 to collect anonymized usage statistics (pages visited, session duration, country). Google Analytics may set its own cookies. We do not use advertising or retargeting cookies. Your language preference is stored in your browser's local storage.",
  },
  {
    title: "7. Third-Party Services",
    body: "We use the following third-party services: Supabase (database and authentication), Google OAuth (sign-in with Google), Google Analytics (anonymized site statistics), and Vercel (hosting). Each of these services has its own privacy policy. We do not share your personal data with any other third parties.",
  },
  {
    title: "8. Your Rights (GDPR)",
    body: "If you are located in the European Union or Ukraine, you have the right to access, correct, export, or delete your personal data. You may request a copy of your data or ask us to delete your account by contacting us through the contact form. We will respond within 5 business days.",
  },
  {
    title: "9. Data Retention",
    body: "We retain your account data for as long as your account is active. If you request account deletion, your personal data is removed within 30 days, except where retention is required by law. Application records may be retained in anonymized form for statistical purposes.",
  },
  {
    title: "10. Children's Privacy",
    body: "SeaJobs.pro is not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with personal data, please contact us so we can remove it.",
  },
  {
    title: "11. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of the platform after changes constitutes acceptance of the updated policy.",
  },
  {
    title: "12. Contact",
    body: "For any privacy-related questions, data access requests, or deletion requests, please contact us through the contact form on our website. We will respond within 5 business days.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-5 py-16">
          <h1 className="font-display text-4xl font-semibold text-white">Privacy Policy</h1>
          <p className="mt-3 text-mist">Last updated: June 2026</p>
          <p className="mt-4 text-mist leading-relaxed">
            SeaJobs.pro ("we", "our", or "us") is committed to protecting your privacy.
            This policy explains what information we collect, how we use it, and your rights regarding your data.
          </p>

          <div className="mt-10 flex flex-col gap-8">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-lg font-semibold text-white mb-3">{s.title}</h2>
                <p className="text-mist leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
