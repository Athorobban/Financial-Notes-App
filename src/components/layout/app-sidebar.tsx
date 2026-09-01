"use client";

import { usePathname } from "next/navigation";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import Link from "next/link";
import {
  BanknoteIcon,
  CoinsIcon,
  EllipsisVertical,
  LayoutDashboardIcon,
  LogOut,
  UserCircle, // Ikon tambahan untuk representasi user tanpa avatar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { signOut } from "@/actions/auth-action";
import { useAuthStore } from "@/stores/auth-store";

const sidebarItems = [
  {
    label: "Dashboard",
    icon: <LayoutDashboardIcon />,
    href: "/dashboard",
  },
  {
    label: "Transaction",
    icon: <BanknoteIcon />,
    href: "/dashboard/transaction",
  },
];

export function AppSidebar() {
  const { isMobile } = useSidebar();
  const pathname = usePathname();

  // Mengambil profile dari global store
  const profile = useAuthStore((state) => state.profile);

  // Fallback state jika profile sedang dimuat
  const userName = profile?.name || "Memuat...";
  const userRole = profile?.role || "Memuat...";

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="gap-2 flex-row items-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard">
                <CoinsIcon className="text-primary size-5" />
                <span className="font-extrabold text-2xl text-slate-800 tracking-tight">
                  Finnotes<span className="text-primary">App</span>
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild tooltip={item.label} className={cn("py-6 px-5 text-md", pathname === item.href ? "bg-primary text-primary-foreground font-semibold hover:bg-primary hover:text-primary-foreground" : "")}>
                  <Link href={item.href}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <UserCircle className="size-8 text-primary" />
                  <div className="leading-tight ml-2">
                    {/* Menggunakan variabel fallback untuk keamanan render */}
                    <h4 className="truncate font-medium">{userName}</h4>
                    <p className="text-muted-foreground truncate text-xs capitalize">{userRole}</p>
                  </div>
                  <EllipsisVertical className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="min-w-56 rounded-lg" side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-3 px-2 py-2">
                    <UserCircle className="size-8 text-primary/80" />
                    <div className="leading-tight">
                      <h4 className="truncate font-medium">{userName}</h4>
                      <p className="text-muted-foreground truncate text-xs capitalize">{userRole}</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => signOut()} className="text-red-500 focus:text-red-600 focus:bg-red-50 cursor-pointer">
                    <LogOut className="mr-2 size-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
