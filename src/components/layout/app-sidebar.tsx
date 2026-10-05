"use client";

import { usePathname } from "next/navigation";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import Link from "next/link";
import { BanknoteIcon, CoinsIcon, EllipsisVertical, LayoutDashboardIcon, LogOut, UserCircle, Sparkles, PieChart, Settings, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { getProfileFromCookie, signOut } from "@/actions/auth-action";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect, useState } from "react";

// 1. Configuration-Driven Navigation: Memisahkan data dari UI
const NAVIGATION_CONFIG = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard", icon: LayoutDashboardIcon, href: "/dashboard" },
      { label: "Transaction", icon: BanknoteIcon, href: "/dashboard/transaction" },
    ],
  },
  {
    group: "Smart Tools",
    items: [
      { label: "AI Insights", icon: Sparkles, href: "/dashboard/insights" },
      { label: "Reports", icon: PieChart, href: "/dashboard/reports" },
    ],
  },
  {
    group: "Preferences",
    items: [{ label: "Account Settings", icon: Settings, href: "/dashboard/account-settings" }],
  },
];

export function AppSidebar() {
  const { isMobile } = useSidebar();
  const pathname = usePathname();

  // State Management
  const profile = useAuthStore((state) => state.profile);
  const setProfile = useAuthStore((state) => (state as any).setProfile);
  const [isLoading, setIsLoading] = useState(true);

  // HYDRATION: Menarik data dari server cookie ke client store saat pertama kali dimuat
  useEffect(() => {
    const hydrateProfile = async () => {
      if (!profile?.role) {
        try {
          const serverProfile = await getProfileFromCookie();
          if (serverProfile && setProfile) {
            setProfile(serverProfile);
          }
        } catch (error) {
          console.error("Gagal memuat profil:", error);
        }
      }
      setIsLoading(false);
    };

    hydrateProfile();
  }, [profile?.role, setProfile]);

  const userName = profile?.name;
  const userRole = profile?.role;

  return (
    <Sidebar collapsible="icon" variant="floating" className="border-r border-slate-200 bg-slate-50/50">
      {/* HEADER */}
      <SidebarHeader className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-transparent active:bg-transparent">
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                  <CoinsIcon className="size-5 text-primary-foreground" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-extrabold text-xl text-slate-800 tracking-tight">
                    Finnotes<span className="text-primary">App</span>
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* CONTENT: Dinamis berdasarkan konfigurasi */}
      <SidebarContent className="px-2 gap-4 mt-4">
        {NAVIGATION_CONFIG.map((navGroup) => (
          <SidebarGroup key={navGroup.group} className="p-0">
            <SidebarGroupLabel className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">{navGroup.group}</SidebarGroupLabel>
            <SidebarMenu>
              {navGroup.items.map((item) => {
                // PERBAIKAN LOGIKA ACTIVE STATE
                // Jika href adalah "/dashboard", wajib exact match.
                // Jika bukan, gunakan exact match ATAU startsWith untuk menangani sub-halaman (misal: /dashboard/transaction/detail)
                const isActive = item.href === "/dashboard" ? pathname === "/dashboard" : pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.label}
                      className={cn(
                        "py-5 px-4 text-sm rounded-xl transition-all duration-200",
                        isActive ? "bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/20 hover:bg-primary hover:text-primary-foreground" : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900",
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon className={cn("size-5", isActive ? "text-primary-foreground" : "text-slate-500")} />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all data-[state=open]:bg-slate-50 shadow-sm">
                  <UserCircle className="size-8 text-primary" />
                  <div className="flex-1 text-left leading-tight ml-2">
                    {isLoading ? (
                      <div className="flex flex-col gap-1.5 justify-center h-full">
                        <div className="h-3 w-20 bg-slate-200 animate-pulse rounded-full"></div>
                        <div className="h-2 w-12 bg-slate-200 animate-pulse rounded-full"></div>
                      </div>
                    ) : (
                      <>
                        <h4 className="truncate font-semibold text-sm text-slate-800">{userName || "User"}</h4>
                        <p className="text-primary truncate text-[11px] font-medium uppercase tracking-wider">{userRole || "Guest"}</p>
                      </>
                    )}
                  </div>
                  {isLoading ? <Loader2 className="ml-auto size-4 animate-spin text-slate-400" /> : <EllipsisVertical className="ml-auto size-4 text-slate-400" />}
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl shadow-lg border-slate-100" side={isMobile ? "bottom" : "right"} align="end" sideOffset={8}>
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-3 px-3 py-3 bg-slate-50/50 rounded-t-xl border-b border-slate-100">
                    <UserCircle className="size-9 text-primary" />
                    <div className="flex flex-col leading-tight">
                      <h4 className="truncate font-semibold text-sm">{userName}</h4>
                      <p className="text-muted-foreground truncate text-xs">{userRole}</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <div className="p-1">
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer py-2.5 px-3 rounded-lg text-red-600 focus:text-red-700 focus:bg-red-50 font-medium">
                    <LogOut className="mr-2 size-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
