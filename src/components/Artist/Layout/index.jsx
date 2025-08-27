import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./app-sidebar";
import { Outlet } from "react-router-dom";
import { ModeToggle } from "@/components/ModeToggle";

function ArtistLayout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="p-5 lg:px-10">
          <header className="flex items-center justify-between mb-4">
            <SidebarTrigger />
            <ModeToggle />
          </header>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}

export default ArtistLayout;