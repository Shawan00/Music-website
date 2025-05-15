import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../AppSidebar";

function AdminLayout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar/>
        <main className="w-full">
          <Header/>
          <div className="container-custom min-h-[calc(100vh-90px)]">
            <Outlet/>
          </div>
        </main>
      </SidebarProvider>
    </>
  );
}

export default AdminLayout