import { Navigate, Outlet } from "react-router-dom";
import Header from "../Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../AppSidebar";
import { useContext } from "react";
import { AuthContext } from "@/context/auth.context";

function AdminLayout() {
  const { user } = useContext(AuthContext)

  if (!user) {
    return (
      <Navigate to="/admin/login" />
    )
  } else if (user.userInfo.type === 'admin') {
    return (
      <>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <Header />
            <div className="container-custom min-h-[calc(100vh-90px)]">
              <Outlet />
            </div>
          </main>
        </SidebarProvider>
      </>
    );
  } else {
    return (
      <>Error 401</>
    )
  }

}

export default AdminLayout