"use client";

import { usePathname } from "next/navigation";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";
import { BanknoteIcon, CoinsIcon, EllipsisVertical, LayoutDashboardIcon, LogOut, UserCircle, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { signOut } from "@/actions/auth-action";

const sidebarItems = [
  {
    label: "User Management",
    icon: <UserCog />,
    href: "/admin/user",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="gap-2 flex-row items-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard">
                <CoinsIcon className="text-primary size-5!" />
                <h1 className="text-2xl font-bold text-primary">Admin Finnotes</h1>
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
        <SidebarMenu onClick={() => signOut()} className="text-red-500 focus:text-red-600 focus:bg-red-50 cursor-pointer">
          <LogOut className="mr-2 size-4" />
          Logout
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
