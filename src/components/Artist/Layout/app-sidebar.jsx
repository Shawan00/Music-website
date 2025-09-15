import Logo from "@/components/Logo";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { AuthContext } from "@/context/auth.context";
import { DiscAlbum, FileMusic, LayoutDashboard } from "lucide-react";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

const navMain = [
  // {
  //   title: "Overview",
  //   path: "/studio",
  //   icon: LayoutDashboard
  // },
  {
    title: "Album",
    path: "/studio/album",
    icon: DiscAlbum
  },
  {
    title: "Song",
    path: "/studio/song",
    icon: FileMusic
  }
]

function AppSidebar() {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  return (
    <>
      <Sidebar collapsible="icon"
        className="h-screen"
      >
        <SidebarHeader>
          <Link to="/studio" className="px-2">
            <Logo width="150" />
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navMain.map((item, index) => (
                  <SidebarMenuItem key={index} >
                    <SidebarMenuButton asChild
                      tooltip={{
                        children: item.title,
                        side: "right",
                        align: "center"
                      }}
                      isActive={location.pathname === item.path}
                    >
                      <Link to={item.path} className="px-2 gap-4">
                        <item.icon className="!w-6 !h-6 shrink-0" />
                        <span className="text-base font-base">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>

        </SidebarFooter>
      </Sidebar>
    </>
  )
}

export default AppSidebar;