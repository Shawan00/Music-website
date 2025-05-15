import { ModeToggle } from "@/components/ModeToggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import SearchInput from "@/components/ui/search-input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { defaultImage } from "@/helpers/defaultImage";
import { useIsMobile } from "@/hooks/use-mobile"
import { LifeBuoy, LogOut, Search, User, UserPlus, Users } from "lucide-react";
import { useState } from "react";

function Header() {
  //For Mobile
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => {
    setIsSearchOpen(true);
  }

  const closeSearch =() => {
    setIsSearchOpen(false);
  }

  return (
    <>
      <header className="header-user container-custom">
        <SidebarTrigger/>
        {isMobile ? (
          <>
            {/* Mobile */}
            <Search className="box-content !w-6 !h-6 p-2 rounded-full active:bg-gray-300"
                    onClick={openSearch}
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
              <SearchInput placeholder="What are you looking for?"/>
            </div>
          </>
        )}
        
        <div className="flex gap-4 items-center">
          <ModeToggle/>

          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <Avatar>
                <AvatarImage src={defaultImage}/>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-52" side="bottom" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User/>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users/>
                  <span>Community</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserPlus/>
                  <span>Invite friends</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LifeBuoy/>
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                  <LogOut/>
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>        
        
        
      </header>
      
    </>
  )
}

export default Header