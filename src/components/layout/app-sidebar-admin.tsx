"use client";

import { usePathname } from "next/navigation";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";
import { CoinsIcon, LogOut, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "@/actions/auth-action";

const sidebarItems = [
  {
    label: "User Management",
    icon: UserCog,
    href: "/admin/user",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="floating" className="border-r border-slate-200 bg-slate-50/50">
      {/* HEADER: Disesuaikan dengan desain modern Finnotes */}
      <SidebarHeader className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-transparent active:bg-transparent">
              <Link href="/admin/user" className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                  <CoinsIcon className="size-5 text-primary-foreground" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-extrabold text-xl text-slate-800 tracking-tight">
                    Finnotes<span className="text-primary">Admin</span>
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* CONTENT: Navigasi Administrasi */}
      <SidebarContent className="px-2 gap-4 mt-4">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">Administration</SidebarGroupLabel>
          <SidebarMenu>
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
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
      </SidebarContent>

      {/* FOOTER: Tombol Logout Spesifik Admin */}
      <SidebarFooter className="p-4 border-t border-slate-200/50">
        <SidebarMenu>
          <SidebarMenuItem>
            {/* PERBAIKAN: Menggunakan SidebarMenuButton agar interaktif dan rapi */}
            <SidebarMenuButton
              onClick={() => signOut()}
              tooltip="Log out"
              className="w-full justify-start py-5 px-4 text-sm rounded-xl font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors shadow-sm border border-transparent hover:border-red-100"
            >
              <LogOut className="size-5 mr-1" />
              <span>Log out Admin</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
