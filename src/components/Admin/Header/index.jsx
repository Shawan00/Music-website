import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ModeToggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { defaultImage } from "@/helpers/defaultImage";
import { useIsMobile } from "@/hooks/use-mobile"
import { LifeBuoy, LogOut, User, UserPlus, Users } from "lucide-react";

function Header() {
  return (
    <>
      <header className="flex items-center justify-end header-user container-custom">
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
  );
}

export default Header