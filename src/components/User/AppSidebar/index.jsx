import { Link } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { ListMusic, Home, Heart, ChartBarDecreasing, Settings } from "lucide-react";
import Logo from "@/components/Logo";


//Menu items
const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: Home
  },
  {
    title: "Playlists",
    url: "/playlists",
    icon: ListMusic
  },
  {
    title: "Liked Songs",
    url: "/liked-songs",
    icon: Heart
  },
  {
    title: "Top Hits",
    url: "/top-hits",
    icon: ChartBarDecreasing
  }
]

function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link to="/" className="px-2">
          <Logo width="150" />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild
                    tooltip={{
                      children: item.title,
                      side: "right",
                      align: "center"
                    }}                  
                  >
                    <Link to={item.url} className="px-2 gap-4">
                      <item.icon className="!w-6 !h-6 shrink-0"/>
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
        <>
          <>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild
                  tooltip="Settings"
                >
                  <Link to="settings" className="gap-4">
                    <Settings className="!w-6 !h-6 shrink-0" fill="transparent"/>
                    <span className="text-base font-base">Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </>
        </>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;