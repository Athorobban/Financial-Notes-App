import { Metadata } from "next";
import ReportsDashboard from "./_components/reports";

export const metadata: Metadata = {
  title: "Finnotes App - Laporan Finansial",
  description: "Lihat visualisasi dan laporan detail keuangan Anda.",
};

export default function ReportsPage() {
  return (
    <div className="p-2 md:p-6 space-y-6 max-w-7xl mx-auto w-full pb-12">
      <section id="header" className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Laporan</h1>
        <p className="text-slate-500 mt-2 text-sm md:text-base">Analisis komprehensif arus kas dan distribusi pengeluaran Anda.</p>
      </section>

      <section id="content">
        <ReportsDashboard />
      </section>
    </div>
  );
}
