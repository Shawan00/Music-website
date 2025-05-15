import { Disc, DiscAlbum, Music, Settings, Wrench } from 'lucide-react'
import { Link } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import Logo from '@/components/Logo';


const menuItems = [
  {
    title: "Song",
    url: "/admin/song",
    icon: Music
  },
  {
    title: "Genre",
    url: "/admin/genre",
    icon: Disc
  },
  {
    title: "Album",
    url: "/admin/album",
    icon: DiscAlbum
  },
  {
    title: "AI Tuner",
    url: "/admin/tuner",
    icon: Wrench
  }
]

function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link to="/admin" className="px-2">
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

export default AppSidebar