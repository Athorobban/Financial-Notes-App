import { Metadata } from "next";
import InsightsDashboard from "./_components/insights";

export const metadata: Metadata = {
  title: "Finnotes App - AI Insights",
  description: "Dapatkan wawasan keuangan cerdas dan personal dari Gemini AI.",
};

export default function InsightsPage() {
  return (
    <div className="p-2 md:p-6 space-y-6 max-w-7xl mx-auto w-full pb-12">
      <section id="header" className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">AI Insights</h1>
        <p className="text-slate-500 mt-2 text-sm md:text-base">Wawasan otomatis dan konsultan keuangan personal Anda.</p>
      </section>

      <section id="content">
        {/* Render komponen dashboard AI */}
        <InsightsDashboard />
      </section>
    </div>
  );
}
