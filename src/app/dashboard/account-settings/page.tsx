import { Metadata } from "next";
import AccountSettingsForm from "./_components/account-settings";

export const metadata: Metadata = {
  title: "Finnotes App - Pengaturan Akun",
  description: "Kelola pengaturan akun, profil, dan keamanan Anda.",
};

export default function AccountSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto w-full space-y-8 pb-12">
      <section id="header" className="border-b border-slate-200 pb-6 pt-4">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Pengaturan Akun</h1>
        <p className="text-slate-500 mt-2 text-sm md:text-base">Kelola informasi identitas publik dan preferensi keamanan Anda.</p>
      </section>

      <section id="content">
        <AccountSettingsForm />
      </section>
    </div>
  );
}
