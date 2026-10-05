"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, TrendingUp, Wallet, Send, Bot, User, AlertCircle, Loader2, ShieldCheck, Zap, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const RISK_PROFILES = [
  {
    id: "conservative",
    name: "Konservatif",
    icon: ShieldCheck,
    target_return_annual: "4% - 7%",
    time_horizon: "< 3 Tahun",
    allocation: [
      { asset_class: "Pasar Uang & Deposito", percentage: 65, color: "#10B981" },
      { asset_class: "Obligasi & SBN", percentage: 25, color: "#3B82F6" },
      { asset_class: "Saham & ETF", percentage: 10, color: "#F59E0B" },
    ],
  },
  {
    id: "moderate",
    name: "Moderat",
    icon: Activity,
    target_return_annual: "7% - 11%",
    time_horizon: "3 - 5 Tahun",
    allocation: [
      { asset_class: "Obligasi & SBN", percentage: 45, color: "#3B82F6" },
      { asset_class: "Saham & ETF", percentage: 35, color: "#F59E0B" },
      { asset_class: "Pasar Uang & Kas", percentage: 20, color: "#10B981" },
    ],
  },
  {
    id: "aggressive",
    name: "Agresif",
    icon: Zap,
    target_return_annual: "11% - 18%+",
    time_horizon: "> 5 Tahun",
    allocation: [
      { asset_class: "Saham & ETF", percentage: 70, color: "#F59E0B" },
      { asset_class: "Obligasi & Pendapatan Tetap", percentage: 15, color: "#3B82F6" },
      { asset_class: "Aset Alternatif & Kripto", percentage: 10, color: "#EF4444" },
      { asset_class: "Pasar Uang & Kas", percentage: 5, color: "#10B981" },
    ],
  },
];

type ChatMessage = {
  id: string;
  role: "user" | "ai";
  content: string;
};

type Transaction = {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
};

export default function InsightsDashboard() {
  const supabase = createClient();

  // State Data Database
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // State Profil Risiko Terpilih
  const [activeProfileId, setActiveProfileId] = useState<string>("moderate");
  const currentProfile = useMemo(() => RISK_PROFILES.find((p) => p.id === activeProfileId) || RISK_PROFILES[1], [activeProfileId]);

  // State Chat AI
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "ai",
      content: "Halo! Saya Gemini, asisten keuangan personal Anda. Data transaksi Anda bulan ini sudah saya baca. Ada yang ingin dianalisis lebih dalam?",
    },
  ]);

  // 1. Fetching Data Transaksi dari Supabase
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) return;

        const { data, error } = await supabase.from("transactions").select("id, type, category, amount, date").order("date", { ascending: false });

        if (error) throw error;
        setTransactions((data as Transaction[]) || []);
      } catch (error: any) {
        toast.error("Gagal memuat data transaksi", { description: error.message });
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchTransactions();
  }, [supabase]);

  // 2. Kalkulasi Data Dinamis (Sisa Dana & Kategori)
  const { totalIncome, totalExpense, sisaDana, highestExpenseCategory } = useMemo(() => {
    let income = 0;
    let expense = 0;
    const categoryTotals: Record<string, number> = {};

    transactions.forEach((trx) => {
      const amount = Number(trx.amount);
      if (trx.type === "income") {
        income += amount;
      } else if (trx.type === "expense") {
        expense += amount;
        categoryTotals[trx.category] = (categoryTotals[trx.category] || 0) + amount;
      }
    });

    const highestCategory = Object.keys(categoryTotals).reduce((a, b) => (categoryTotals[a] > categoryTotals[b] ? a : b), "");

    return {
      totalIncome: income,
      totalExpense: expense,
      sisaDana: Math.max(0, income - expense),
      highestExpenseCategory: highestCategory || "Belum ada data",
    };
  }, [transactions]);

  // 3. Format Currency Helper
  const formatIDR = (value: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
  };

  // 4. Handler Chatbot dengan Konteks Data
  const handleSendPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const newUserMsg: ChatMessage = { id: Date.now().toString(), role: "user", content: prompt };
    setChatHistory((prev) => [...prev, newUserMsg]);
    setPrompt("");
    setIsGenerating(true);

    // AI Context Update: Kini menyertakan profil risiko pengguna untuk jawaban yang lebih personal
    const systemContext = `Konteks User: Sisa dana bulan ini ${sisaDana}, pengeluaran terbesar di kategori ${highestExpenseCategory}. Profil Risiko Investasi: ${currentProfile.name}.`;
    console.log("Mengirim ke Gemini API dengan konteks:", systemContext);

    // Simulasi respons API
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: `Mengingat Anda memiliki profil risiko **${currentProfile.name}**, saya menyarankan sisa dana ${formatIDR(sisaDana)} difokuskan pada instrumen aman seperti ${currentProfile.allocation[0].asset_class}. Selain itu, mari kurangi pengeluaran di sektor "${highestExpenseCategory}".`,
      };
      setChatHistory((prev) => [...prev, aiResponse]);
      setIsGenerating(false);
    }, 1500);
  };

  if (isLoadingData) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-slate-400">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p>Menganalisis data transaksi Anda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {/* ROW 1: Panel Ringkasan & Saran Alokasi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel 1: Ringkasan Otomatis AI */}
        <Card className="border-slate-200 shadow-sm relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <TrendingUp className="size-24" />
          </div>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-amber-500" />
              <CardTitle className="text-lg">Deteksi Gemini AI</CardTitle>
            </div>
            <CardDescription>Ringkasan pola pengeluaran terkini Anda.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-900">
                <AlertCircle className="size-5 text-rose-500 mt-0.5 shrink-0" />
                <p className="text-sm leading-relaxed">
                  <strong>Peringatan:</strong> Pengeluaran terbesar Anda saat ini berada di kategori <span className="font-semibold uppercase">{highestExpenseCategory}</span>. Perketat anggaran di sektor ini.
                </p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-900">
                <TrendingUp className="size-5 text-emerald-500 mt-0.5 shrink-0" />
                <p className="text-sm leading-relaxed">
                  <strong>Pencapaian:</strong> Arus kas Anda tercatat positif. Total Pemasukan tercatat sebesar <span className="font-semibold">{formatIDR(totalIncome)}</span>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Panel 2: Saran Alokasi Tabungan (Dinamis berdasarkan Sisa Dana & Profil Risiko) */}
        <Card className="border-slate-200 shadow-sm flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Wallet className="size-5 text-primary" />
              <CardTitle className="text-lg">Strategi Alokasi Dana</CardTitle>
            </div>
            <CardDescription>
              Rekomendasi penempatan dari sisa bersih: <strong>{formatIDR(sisaDana)}</strong>.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {/* Risk Profile Selector (Toggle Group) */}
            <div className="flex bg-slate-100 p-1.5 rounded-xl mb-4 border border-slate-200">
              {RISK_PROFILES.map((profile) => {
                const Icon = profile.icon;
                const isActive = activeProfileId === profile.id;
                return (
                  <button
                    key={profile.id}
                    onClick={() => setActiveProfileId(profile.id)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold py-2 rounded-lg transition-all duration-200",
                      isActive ? "bg-white shadow-sm text-slate-900 ring-1 ring-black/5" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50",
                    )}
                  >
                    <Icon className={cn("size-3.5 hidden sm:block", isActive ? "text-primary" : "text-slate-400")} />
                    {profile.name}
                  </button>
                );
              })}
            </div>

            {/* Profile Info Metadata */}
            <div className="flex justify-between items-center text-xs font-medium text-slate-500 mb-5 px-1 bg-slate-50 py-2 rounded-md border border-slate-100">
              <span className="px-2">
                ⏱ Horizon: <strong className="text-slate-700">{currentProfile.time_horizon}</strong>
              </span>
              <span className="px-2 border-l border-slate-200">
                🎯 Target: <strong className="text-emerald-600">{currentProfile.target_return_annual}</strong>
              </span>
            </div>

            {/* Dynamic Allocation Bars */}
            <div className="space-y-4 flex-1">
              {currentProfile.allocation.map((alloc) => {
                const allocatedAmount = sisaDana * (alloc.percentage / 100);
                return (
                  <div key={alloc.asset_class}>
                    <div className="flex justify-between text-sm font-medium mb-1.5">
                      <span className="text-slate-700 flex items-center gap-1.5">
                        <span className="size-2 rounded-full" style={{ backgroundColor: alloc.color }}></span>
                        {alloc.asset_class} <span className="text-slate-400 text-xs font-normal">({alloc.percentage}%)</span>
                      </span>
                      <span className="text-slate-900 font-bold">{formatIDR(allocatedAmount)}</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${alloc.percentage}%`, backgroundColor: alloc.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ROW 2: Modul Prompting Chatbot Keuangan */}
      <Card className="border-slate-200 shadow-sm flex flex-col h-[500px]">
        <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Bot className="size-6 text-primary" />
            <div>
              <CardTitle className="text-lg">Konsultan Keuangan AI</CardTitle>
              <CardDescription>Didukung oleh model Generative AI Gemini</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
          {chatHistory.map((msg) => (
            <div key={msg.id} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
              <div className={cn("flex gap-3 max-w-[85%] md:max-w-[75%]", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                <div className={cn("size-8 shrink-0 rounded-full flex items-center justify-center shadow-sm", msg.role === "user" ? "bg-slate-900 text-white" : "bg-primary/10 text-primary border border-primary/20")}>
                  {msg.role === "user" ? <User className="size-4" /> : <Sparkles className="size-4" />}
                </div>
                <div className={cn("p-4 rounded-2xl text-sm leading-relaxed shadow-sm", msg.role === "user" ? "bg-slate-900 text-white rounded-tr-none" : "bg-white border border-slate-200 text-slate-800 rounded-tl-none")}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {isGenerating && (
            <div className="flex w-full justify-start">
              <div className="flex gap-3 max-w-[75%] flex-row">
                <div className="size-8 shrink-0 rounded-full flex items-center justify-center bg-primary/10 text-primary border border-primary/20">
                  <Sparkles className="size-4" />
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-500 rounded-tl-none flex items-center gap-2 shadow-sm">
                  <div className="size-1.5 bg-slate-400 rounded-full animate-bounce" />
                  <div className="size-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="size-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <div className="p-4 border-t border-slate-100 bg-white rounded-b-xl">
          <form onSubmit={handleSendPrompt} className="relative flex items-center">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Tanya Gemini strategi alokasi untuk profil ${currentProfile.name.toLowerCase()}...`}
              className="pr-14 py-6 rounded-full bg-slate-50 border-slate-200 focus-visible:ring-primary/20 shadow-inner"
              disabled={isGenerating}
            />
            <Button type="submit" size="icon" disabled={!prompt.trim() || isGenerating} className="absolute right-1.5 size-10 rounded-full shadow-md transition-transform active:scale-95">
              <Send className="size-4 ml-0.5" />
            </Button>
          </form>
          <p className="text-center text-[10px] text-slate-400 mt-2.5 font-medium">AI dapat membuat kesalahan. Keputusan finansial akhir berada di tangan Anda.</p>
        </div>
      </Card>
    </div>
  );
}
