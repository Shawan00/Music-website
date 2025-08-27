import { Outlet } from "react-router-dom"
import Footer from "../Footer"
import Header from "../Header"
import PlayerControl from "../PlayerControl"
import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "../AppSidebar"

function UserLayout() {
  return (
    <>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar/>
        <main className="w-full h-screen flex flex-col">          
          <Header/>
          <div className="container-custom flex-1 min-h-0 min-w-0 overflow-auto">
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