import { Button } from "@/components/ui/button";
import { CoinsIcon, Sparkles, LineChart, ShieldCheck, ChevronRight, Search, Wallet, PieChart, Target } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Finnotes App - Smart Personal Finance",
  description: "Kelola keuangan pribadi Anda dengan cerdas menggunakan bantuan AI.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-primary/30">
      {/* 1. Navbar: Clean & Minimal (Mirip Adobe Header) */}
      <header className="px-6 lg:px-12 py-4 flex items-center justify-between bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <CoinsIcon className="text-primary size-6" />
            <span className="font-extrabold text-xl text-slate-800 tracking-tight">
              Finnotes<span className="text-primary">App</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center justify-center p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <Search className="size-5" />
          </button>
          <Link href="/login">
            <Button variant="ghost" className="text-slate-700 font-semibold hover:bg-slate-100">
              Masuk
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* 2. Immersive Hero Section (Background Image dengan Overlay) */}
        <section className="relative w-full h-[85vh] min-h-600px flex items-center px-6 lg:px-24">
          {/* Background Image Placeholder (Ganti dengan gambar bernuansa finansial/AI yang gelap) */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=2671&auto=format&fit=crop')" }} />
          {/* Dark Gradient Overlay agar teks terbaca */}
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-900/60 to-transparent" />

          <div className="relative z-10 max-w-2xl text-white mt-12">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">Mimpi Lebih Besar.</h1>
            <p className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed font-light max-w-xl">
              Melangkah ke masa depan pengelolaan keuangan dengan Finnotes. Kini dilengkapi dengan teknologi Generative AI untuk wawasan personal yang belum pernah Anda bayangkan sebelumnya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-base font-semibold border-0">
                  Mulai Gunakan Finnotes
                </Button>
              </Link>
              <Link href="#ai-features">
                <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 hover:text-white rounded-full px-8 py-6 text-base font-medium">
                  Pelajari Gemini AI <ChevronRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 3. Quick Tools Bar (Pill Buttons) */}
        <section className="w-full border-b border-slate-200 bg-white py-4 px-6 lg:px-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <span className="text-slate-800 font-semibold text-sm md:text-base mr-2">Akses cepat fitur utama.</span>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Catat Transaksi", icon: Wallet },
              { label: "Tanya AI", icon: Sparkles },
              { label: "Lihat Laporan", icon: PieChart },
              { label: "Atur Target", icon: Target },
            ].map((tool, idx) => (
              <button key={idx} className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-full text-sm font-medium text-slate-700 hover:border-slate-900 hover:bg-slate-50 transition-colors">
                <tool.icon className="size-4" />
                {tool.label}
              </button>
            ))}
          </div>
        </section>

        {/* 4. Feature Cards Grid (Solid & Gradient Blocks) */}
        <section className="w-full py-16 px-6 lg:px-12 bg-white">
          <div className="max-w-1400px mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group relative p-10 md:p-12 rounded-lg bg-linear-to-br from-yellow-100 to-amber-200 overflow-hidden flex flex-col justify-between min-h-350px transition-transform hover:scale-[1.01]">
              <div>
                <LineChart className="size-10 text-amber-900 mb-6" />
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Tracking <br />
                  Pintar.
                </h2>
                <p className="text-slate-800 font-medium max-w-sm">Catat setiap pengeluaran dan pemasukan. Pantau *cash flow* harianmu melalui ringkasan interaktif.</p>
              </div>
              <Link href="/dashboard" className="text-amber-900 font-semibold hover:underline mt-8 inline-flex items-center">
                Eksplorasi Fitur <ChevronRight className="ml-1 size-4" />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="group relative p-10 md:p-12 rounded-lg bg-linear-to-br from-orange-300 to-rose-400 overflow-hidden flex flex-col justify-between min-h-350px transition-transform hover:scale-[1.01]">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles className="size-40" />
              </div>
              <div className="relative z-10">
                <Sparkles className="size-10 text-white mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">
                  Generative <br />
                  AI Insights.
                </h2>
                <p className="text-white/90 font-medium max-w-sm">Tanyakan pada AI kami untuk strategi jitu menghemat uang berdasarkan kebiasaan transaksimu.</p>
              </div>
              <Link href="/dashboard" className="relative z-10 text-white font-semibold hover:underline mt-8 inline-flex items-center">
                Coba Gemini AI <ChevronRight className="ml-1 size-4" />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="group relative p-10 md:p-12 rounded-lg bg-linear-to-br from-purple-700 to-indigo-900 overflow-hidden flex flex-col justify-between min-h-350px transition-transform hover:scale-[1.01]">
              <div>
                <ShieldCheck className="size-10 text-purple-200 mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">
                  Aman & <br />
                  Terpusat.
                </h2>
                <p className="text-purple-100 font-medium max-w-sm">Data finansial Anda diamankan dengan sistem autentikasi modern Supabase. Privasi penuh di tangan Anda.</p>
              </div>
              <Link href="/dashboard" className="text-purple-200 font-semibold hover:underline mt-8 inline-flex items-center">
                Pelajari Keamanan <ChevronRight className="ml-1 size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Minimalis */}
      <footer className="w-full py-12 px-6 lg:px-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-1400px mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p className="font-medium">© {new Date().getFullYear()} Finnotes App. Hak Cipta Dilindungi.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-slate-900">
              Privasi
            </Link>
            <Link href="#" className="hover:text-slate-900">
              Ketentuan
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
