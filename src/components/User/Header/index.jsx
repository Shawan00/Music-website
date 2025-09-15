import { ModeToggle } from "@/components/ModeToggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import SearchInput from "@/components/ui/search-input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { AuthContext } from "@/context/auth.context";
import { getAvatarFallback } from "@/helpers";
import { useIsMobile } from "@/hooks/use-mobile"
import { Bell, FileMusic, LifeBuoy, LogOut, Search, User } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("accessToken");
    setUser(null);
  }

  return (
    <>
      <header className="header-user container-custom">
        <div>
          <SidebarTrigger className="block sm:hidden lg:block" />
        </div>
        {isMobile ? (
          <>
            {/* Mobile */}
            <Search className="box-content !w-6 !h-6 m-2 rounded-full active:bg-gray-300"
              onClick={() => setIsSearchOpen(true)}
            />
            <div className="w-100">
              <SearchInput placeholder="What are you looking for?"
                isOpen={isSearchOpen}
                setIsOpen={setIsSearchOpen}
              />
            </div>
          </>
        ) : (
          <>
            {/* Desktop */}
            <div className="w-100 md:w-70 lg:w-100 xl:w-120">
              <SearchInput placeholder="What are you looking for?" />
            </div>
          </>
        )}

        <div className="flex gap-4 items-center">

          {user?.userInfo ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer">
                  <Avatar>
                    <AvatarImage src={user.userInfo.avatar || ""} />
                    <AvatarFallback>{getAvatarFallback(user.userInfo.fullName)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-52" side="bottom" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={() => navigate(`/profile`)}>
                      <User />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <a href="/studio/album" target="_blank">
                      <DropdownMenuItem>
                        <FileMusic />
                        <span>Artist Studio</span>
                      </DropdownMenuItem>
                    </a>
                    <DropdownMenuItem disabled>
                      <Bell />
                      <span>Notificaton</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                      <LifeBuoy />
                      <span>Support</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={handleLogout}>
                      <LogOut />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button onClick={() => {
                navigate('/login')
              }}>Login</Button>
            </>
          )}
          <ModeToggle />
        </div>


      </header>

    </>
  )
}

export default Header