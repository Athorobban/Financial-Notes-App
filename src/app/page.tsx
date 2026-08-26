import { Button } from "@/components/ui/button";
import { CoinsIcon, Sparkles, LineChart, ShieldCheck, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Finnotes App - Smart Personal Finance",
  description: "Kelola keuangan pribadi Anda dengan cerdas menggunakan bantuan AI.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-primary/20">
      {/* Navbar Minimalis */}
      <header className="px-6 lg:px-12 py-5 flex items-center justify-between bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary rounded-lg">
            <CoinsIcon className="text-white size-6" />
          </div>
          <span className="font-extrabold text-2xl text-slate-800 tracking-tight">
            Finnotes<span className="text-primary">App</span>
          </span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-slate-600 hover:text-primary font-medium hidden sm:flex">
              Masuk
            </Button>
          </Link>
          <Link href="/login">
            <Button className="font-semibold shadow-md hover:shadow-lg transition-all rounded-full px-6">Mulai Sekarang</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 lg:py-32 flex flex-col items-center justify-center text-center px-4 bg-linear-to-b from-white to-slate-50">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-8 border border-primary/20">
            <Sparkles className="size-4" />
            <span>Didukung oleh Generative AI</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 max-w-4xl tracking-tight leading-[1.1] mb-6">
            Kendalikan Keuanganmu, <br className="hidden md:block" />
            <span className="text-primary">Wujudkan Tujuanmu</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">Finnotes App membantu kamu mencatat, melacak, dan merencanakan masa depan dengan *insight* berbasis AI yang personal dan akurat.</p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full text-base gap-2 shadow-xl shadow-primary/20 hover:scale-105 transition-all rounded-full px-8 h-14">
                Eksplorasi Dashboard <ArrowRight className="size-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-24 bg-white border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Fitur Unggulan Finnotes</h2>
              <p className="text-slate-600 text-lg">Semua yang Anda butuhkan untuk menjadi lebih sadar secara finansial.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                  <LineChart className="size-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Tracking Pintar</h3>
                <p className="text-slate-600 leading-relaxed">Catat setiap pengeluaran dan pemasukan dengan sangat detail. Pantau *cash flow* harianmu melalui ringkasan dashboard yang interaktif.</p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Sparkles className="size-32" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary relative z-10">
                  <Sparkles className="size-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Generative AI Insights</h3>
                <p className="text-slate-600 leading-relaxed relative z-10">Dapatkan rekomendasi keuangan instan! Tanyakan langsung pada AI kami untuk strategi menghemat uang berdasarkan gaya hidup Anda.</p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                  <ShieldCheck className="size-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Aman & Terpusat</h3>
                <p className="text-slate-600 leading-relaxed">Tidak ada lagi catatan yang tercecer. Data finansial Anda diamankan dengan sistem autentikasi modern untuk privasi penuh.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call To Action Section */}
        <section className="w-full py-24 bg-primary text-primary-foreground text-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Siap Membangun Masa Depan Finansialmu?</h2>
            <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-10 text-lg md:text-xl">Bergabung sekarang dan sadari potensi finansialmu. Pengelolaan uang yang disiplin dimulai dari satu langkah kecil hari ini.</p>
            <Link href="/login">
              <Button size="lg" variant="secondary" className="text-primary font-bold text-lg px-10 py-7 rounded-full shadow-2xl hover:scale-105 transition-transform">
                Buka Dashboard App
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="w-full py-10 text-center text-slate-500 bg-slate-50 border-t border-slate-200">
        <p className="font-medium">© {new Date().getFullYear()} Finnotes App. Dirancang dengan cermat untuk literasi keuangan.</p>
      </footer>
    </div>
  );
}
