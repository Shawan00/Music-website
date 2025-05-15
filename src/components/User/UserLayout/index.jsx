import { Outlet } from "react-router-dom"
import Footer from "../Footer"
import Header from "../Header"
import PlayerControl from "../PlayerControl"
import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "../AppSidebar"

function UserLayout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar/>
        <main className="w-full">          
          <Header/>
          <div className="container-custom min-h-[calc(100vh-90px)]">
            <Outlet/>
            <Footer/>
          </div>
          <PlayerControl/>             
        </main>
      </SidebarProvider>
    </>
  )
}

export default UserLayout