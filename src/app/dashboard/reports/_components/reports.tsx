"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, PieChart as PieChartIcon, BarChart3, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { createClient } from "@/lib/supabase/client"; // Sesuaikan path ini dengan helper Supabase Anda

// Import jsPDF untuk export PDF
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Tipe data sesuai skema database[cite: 24]
type Transaction = {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  description: string | null;
  date: string;
};

// Palet warna untuk Pie Chart
const COLORS = ["#f43f5e", "#f59e0b", "#3b82f6", "#10b981", "#8b5cf6", "#ec4899", "#06b6d4"];

export default function ReportsDashboard() {
  const supabase = createClient();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  // 1. Fetching Data dari Supabase
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) return;

        const { data, error } = await supabase.from("transactions").select("*").order("date", { ascending: true }); // Urutkan dari yang terlama ke terbaru

        if (error) throw error;
        setTransactions((data as Transaction[]) || []);
      } catch (error: any) {
        toast.error("Gagal memuat data laporan", { description: error.message });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [supabase]);

  // 2. Agregasi Data untuk Bar Chart (Per Bulan) & Pie Chart (Per Kategori Expense)
  const { monthlyData, categoryData } = useMemo(() => {
    const monthlyMap = new Map<string, { name: string; income: number; expense: number }>();
    const categoryMap = new Map<string, number>();

    transactions.forEach((trx) => {
      // Format Bulan (Contoh: "Jan 2026")
      const dateObj = new Date(trx.date);
      const monthName = dateObj.toLocaleDateString("id-ID", { month: "short", year: "numeric" });
      const amount = Number(trx.amount);

      // Agregasi Bulanan
      if (!monthlyMap.has(monthName)) {
        monthlyMap.set(monthName, { name: monthName, income: 0, expense: 0 });
      }
      const monthData = monthlyMap.get(monthName)!;

      if (trx.type === "income") {
        monthData.income += amount;
      } else {
        monthData.expense += amount;

        // Agregasi Kategori (Hanya untuk Expense)
        const currentCatTotal = categoryMap.get(trx.category) || 0;
        categoryMap.set(trx.category, currentCatTotal + amount);
      }
    });

    // Mapping Kategori ke format Recharts (dengan warna)
    const pieData = Array.from(categoryMap.entries())
      .map(([name, value], index) => ({
        name,
        value,
        color: COLORS[index % COLORS.length],
      }))
      .sort((a, b) => b.value - a.value); // Urutkan dari pengeluaran terbesar

    return {
      monthlyData: Array.from(monthlyMap.values()),
      categoryData: pieData,
    };
  }, [transactions]);

  // Fungsi helper format mata uang
  const formatCurrency = (value: any) => {
    const numValue = Number(value) || 0;
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(numValue);
  };

  // 3. Logika Export CSV
  const exportToCSV = () => {
    setIsExporting(true);
    try {
      const headers = ["Tanggal,Tipe,Kategori,Jumlah,Deskripsi"];
      const rows = transactions.map((t) => `${t.date},${t.type},${t.category},${t.amount},"${t.description || ""}"`);

      const csvContent = headers.concat(rows).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Laporan_Finnotes_${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Laporan CSV berhasil diunduh!");
    } catch (error) {
      toast.error("Gagal mengekspor CSV");
    } finally {
      setIsExporting(false);
    }
  };

  // 4. Logika Export PDF
  const exportToPDF = () => {
    setIsExporting(true);
    try {
      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.text("Laporan Transaksi Finnotes", 14, 15);

      doc.setFontSize(10);
      doc.text(`Dicetak pada: ${new Date().toLocaleDateString("id-ID")}`, 14, 22);

      const tableData = transactions.map((t) => [t.date, t.type === "income" ? "Pemasukan" : "Pengeluaran", t.category, formatCurrency(t.amount), t.description || "-"]);

      autoTable(doc, {
        startY: 28,
        head: [["Tanggal", "Tipe", "Kategori", "Jumlah", "Deskripsi"]],
        body: tableData,
        theme: "striped",
        headStyles: { fillColor: [15, 23, 42] }, // Slate 900 warna header
      });

      doc.save(`Laporan_Finnotes_${new Date().toISOString().split("T")[0]}.pdf`);
      toast.success("Laporan PDF berhasil diunduh!");
    } catch (error) {
      toast.error("Gagal mengekspor PDF");
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-slate-400">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p>Memuat data laporan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* SECTION 1: Action Bar (Export) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Laporan Keuangan Anda</h2>
          <p className="text-sm text-slate-500">Ringkasan aktivitas finansial periode ini.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={exportToCSV} disabled={isExporting || transactions.length === 0} className="flex-1 sm:flex-none">
            <FileText className="size-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={exportToPDF} disabled={isExporting || transactions.length === 0} className="flex-1 sm:flex-none bg-primary text-primary-foreground">
            <Download className="size-4 mr-2" />
            Unduh PDF
          </Button>
        </div>
      </div>

      {/* SECTION 2: Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Bar Chart (Pemasukan vs Pengeluaran) */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="size-5 text-primary" />
              <CardTitle>Arus Kas Bulanan</CardTitle>
            </div>
            <CardDescription>Perbandingan pemasukan dan pengeluaran.</CardDescription>
          </CardHeader>
          <CardContent>
            {monthlyData.length > 0 ? (
              <div className="h-[350px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} tickFormatter={(value) => `Rp ${value / 1000000}M`} />
                    <Tooltip cursor={{ fill: "#f1f5f9" }} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} formatter={formatCurrency} />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px" }} />
                    <Bar dataKey="income" name="Pemasukan" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                    <Bar dataKey="expense" name="Pengeluaran" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[350px] flex items-center justify-center text-slate-400">Belum ada data arus kas.</div>
            )}
          </CardContent>
        </Card>

        {/* Chart 2: Pie Chart (Alokasi Kategori) */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <PieChartIcon className="size-5 text-amber-500" />
              <CardTitle>Distribusi Pengeluaran</CardTitle>
            </div>
            <CardDescription>Porsi pengeluaran berdasarkan kategori.</CardDescription>
          </CardHeader>
          <CardContent>
            {categoryData.length > 0 ? (
              <div className="h-[350px] w-full mt-4 flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} formatter={formatCurrency} />
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="value" stroke="none">
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[350px] flex items-center justify-center text-slate-400">Belum ada data pengeluaran.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
