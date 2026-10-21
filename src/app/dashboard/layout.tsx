import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import ChatbotDrawer from "./_components/chatbot-drawer";
import { Separator } from "@/components/ui/separator";
import DashboardBreadcrumb from "../(dashboard-admin)/_components/dashboard-breadcrumb";
import { DarkmodeToggle } from "@/components/common/darkmode-toggle";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-x-hidden">
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="cursor-pointer" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <DashboardBreadcrumb />
          </div>
          <div className="px-4">
            <DarkmodeToggle />
          </div>
        </header>
        <main className="flex-1 p-4">
          {children}
          <ChatbotDrawer />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
