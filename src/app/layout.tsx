import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import QueryProvider from "@/providers/query-client";
import { Toaster } from "@/components/ui/sonner";

// Pastikan path impor ini sesuai dengan lokasi file theme-provider.tsx Anda
import { ThemeProvider } from "@/providers/theme-provider";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finnotes App - Smart Personal Finance",
  description: "Kelola keuangan pribadi Anda dengan cerdas menggunakan bantuan AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning SANGAT PENTING untuk next-themes
    // agar tidak error saat injeksi class dark/light di client-side
    <html lang="en" suppressHydrationWarning className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", outfit.variable)}>
      <body className="flex flex-col min-h-full">
        {/* Implementasi ThemeProvider sebagai pembungkus global tertinggi di bawah body */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <QueryProvider>
            <TooltipProvider>
              {children}
              <Toaster position="top-right" />
            </TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
