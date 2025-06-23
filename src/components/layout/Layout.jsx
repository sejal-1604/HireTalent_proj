import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Outlet } from "react-router-dom";
 
export const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="app-container">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};