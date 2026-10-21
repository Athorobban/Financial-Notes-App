import { Button } from "@/components/ui/button";
import { CoinsIcon, Sparkles, ChevronRight, PieChart, Target, Rocket, TrendingUp, Lock, CheckCircle2, MessageSquare } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Finnotes App - Smart Personal Finance",
  description: "Kelola keuangan pribadi Anda dengan cerdas menggunakan bantuan AI.",
};

export default function Home() {
  return (
    // 1. Root Container: Tema Gelap (Slate-950) ala Tech Platform
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
      {/* 2. Navbar: Glassmorphism Modern */}
      <header className="px-6 lg:px-12 py-4 flex items-center justify-between sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-emerald-500 p-1.5 rounded-lg group-hover:bg-emerald-400 transition-colors">
              <CoinsIcon className="text-slate-950 size-5" />
            </div>
            <span className="font-extrabold text-xl text-white tracking-tight">
              Finnotes<span className="text-emerald-400">App</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-slate-300 font-semibold hover:bg-white/10 hover:text-white rounded-full px-6">
              Masuk
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-full px-6 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] hidden md:flex">
              Daftar Gratis
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* 3. Hero Section: High Contrast & Tech Vibe dengan Glowing Orbs */}
        <section className="relative w-full py-20 lg:py-32 px-6 lg:px-12 flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Efek Cahaya Latar Belakang (Glowing Background Orbs) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-600px h-600px bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-0 right-0 w-400px h-400px bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            {/* Badge Bantuan AI */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm font-medium mb-8">
              <Sparkles className="size-4" />
              <span>Didukung oleh Gemini AI</span>
            </div>

            {/* Heading Text Gradient */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-transparent bg-clip-text bg-linear-to-b from-white to-slate-400">
              Kuasai Finansialmu. <br className="hidden md:block" />
              Rancang Masa Depan.
            </h1>

            <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl">
              Platform manajemen keuangan dan investasi modern untuk generasi muda. Catat transaksi, pantau portofolio, dan dapatkan wawasan finansial eksklusif dari AI dalam satu tempat.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-full px-8 py-6 text-base font-bold shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all hover:scale-105">
                  Mulai Perjalananmu
                </Button>
              </Link>
              <Link href="#features" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full bg-transparent border-white/20 text-white hover:bg-white/5 rounded-full px-8 py-6 text-base font-medium transition-all">
                  Jelajahi Fitur <ChevronRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>

            {/* Checklist Value Props ala WPU Course */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-slate-400 font-medium">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-400" /> Akses Selamanya
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-400" /> Keamanan Bank-Grade
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-400" /> Analisis AI Real-time
              </span>
            </div>
          </div>
        </section>

        {/* 4. Fitur Cerdas Grid Section (Terinspirasi dari "Tools AI WPU") */}
        <section id="features" className="w-full py-20 px-6 lg:px-12 bg-slate-950 relative border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Fitur AI & Tracking Cerdas</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Hadirkan pengalaman manajemen keuangan yang personal dengan berbagai fitur analisis cerdas untuk mengembangkan portofolio kamu.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: AI Advisor */}
              <div className="group bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 hover:bg-slate-900 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl">
                    <MessageSquare className="size-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100">AI Advisor Buddy</h3>
                </div>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">Partner diskusi finansial dua arah dengan Gemini AI. Dapatkan saran alokasi dana dan koreksi kebiasaan belanjamu secara presisi.</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-400/10 px-2 py-1 rounded-md flex items-center gap-1">✓ Real-time Insight</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-400/10 px-2 py-1 rounded-md flex items-center gap-1">✓ Smart Analysis</span>
                </div>
              </div>

              {/* Card 2: Portfolio Tracker (Disorot) */}
              <div className="group bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/50 hover:bg-slate-900 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">Populer</div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
                    <TrendingUp className="size-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100">Portofolio Tracker</h3>
                </div>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">Lacak semua aset investasimu mulai dari Reksadana, Saham, hingga Kripto. Analisis pergerakan nilai aset dengan grafik interaktif.</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md flex items-center gap-1">✓ Visualisasi Data</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md flex items-center gap-1">✓ Multi-Asset</span>
                </div>
              </div>

              {/* Card 3: Smart Target */}
              <div className="group bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 hover:bg-slate-900 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl">
                    <Target className="size-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100">Smart Target Saving</h3>
                </div>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">Tetapkan mimpi finansialmu (misal: Gadget Baru, Dana Darurat). Sistem akan menghitung target tabungan harian secara otomatis.</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-400/10 px-2 py-1 rounded-md flex items-center gap-1">✓ Auto-Calculate</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-400/10 px-2 py-1 rounded-md flex items-center gap-1">✓ Motivator</span>
                </div>
              </div>

              {/* Card 4: Reports */}
              <div className="group bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:border-rose-500/50 hover:bg-slate-900 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-xl">
                    <PieChart className="size-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100">Cashflow & Reports</h3>
                </div>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">Rekapitulasi pemasukan dan pengeluaran harian hingga tahunan. Export laporan ke PDF atau CSV dengan sekali klik.</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-400/10 px-2 py-1 rounded-md flex items-center gap-1">✓ Export Data</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-400/10 px-2 py-1 rounded-md flex items-center gap-1">✓ Chart Cerdas</span>
                </div>
              </div>

              {/* Card 5: Security (Spans 2 columns on tablet) */}
              <div className="group bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:border-amber-500/50 hover:bg-slate-900 transition-all duration-300 md:col-span-2 lg:col-span-1 lg:col-start-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl">
                    <Lock className="size-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100">Bank-Grade Security</h3>
                </div>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">Data privasimu diamankan tingkat tinggi menggunakan Supabase Row Level Security (RLS) dan enkripsi standar industri terkini.</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-1 rounded-md flex items-center gap-1">✓ Supabase RLS</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-1 rounded-md flex items-center gap-1">✓ Enkripsi Data</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Call to Action (Gaya Bootcamp Block WPU) */}
        <section className="w-full py-20 px-6 lg:px-12 bg-linear-to-b from-slate-950 to-emerald-950/20 border-t border-white/5">
          <div className="max-w-4xl mx-auto bg-linear-to-tr from-emerald-900/40 to-slate-900 border border-emerald-500/20 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

            <Rocket className="size-16 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Siap Mengubah Kebiasaan Finansialmu?</h2>
            <p className="text-slate-300 mb-10 max-w-2xl mx-auto text-lg">Bergabunglah dengan generasi muda lainnya yang telah beralih ke Finnotes App untuk merencanakan kebebasan finansial di masa depan.</p>
            <Link href="/register">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-full px-10 py-6 text-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 transition-all">
                Daftar Sekarang — Gratis
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* 6. Footer Modern Dark Mode */}
      <footer className="w-full py-12 px-6 lg:px-12 bg-slate-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <CoinsIcon className="text-emerald-400 size-6" />
              <span className="font-extrabold text-xl text-white tracking-tight">
                Finnotes<span className="text-emerald-400">App</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">Platform inovatif untuk manajemen keuangan dan investasi berbasis AI, dirancang khusus untuk generasi muda Indonesia.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Produk</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">
                  Dashboard User
                </Link>
              </li>
              <li>
                <Link href="/dashboard/insights" className="hover:text-emerald-400 transition-colors">
                  AI Insights
                </Link>
              </li>
              <li>
                <Link href="/dashboard/transaction" className="hover:text-emerald-400 transition-colors">
                  Tracker & Laporan
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Bantuan</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="#" className="hover:text-emerald-400 transition-colors">
                  Hubungi Kami
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-400 transition-colors">
                  Syarat dan Ketentuan
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-400 transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 text-center md:text-left text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Finnotes App. Hak Cipta Dilindungi.</p>
          <p className="mt-2 md:mt-0">
            Didesain dengan <span className="text-emerald-500">♥</span> untuk Masa Depan.
          </p>
        </div>
      </footer>
    </div>
  );
}
