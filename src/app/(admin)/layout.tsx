import { AppSidebar } from "@/components/main/sidebar/AppSidebar";
import SiteHeader from "@/components/main/sidebar/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="container flex flex-1 flex-col gap-2 px-4 py-3">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
