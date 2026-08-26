import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import ChatbotDrawer from "../dashboard/_components/chatbot-drawer";
import { AdminSidebar } from "@/components/layout/app-sidebar-admin";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="flex-1 p-4">
        <SidebarTrigger />
        {children}
        <ChatbotDrawer />
      </main>
    </SidebarProvider>
  );
}
