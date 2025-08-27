import { Command, CommandInput } from "@/components/ui/command";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Plus } from "lucide-react";
import CreatePlaylist from "./createPlaylist";
import AllPlaylist from "./allPlaylist";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth.context";

function SongOptions({ song, currentPlaylistId }) {
  const [playlists, setPlaylists] = useState(null);
  const { user } = useContext(AuthContext);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button">
            <MoreVertical strokeWidth={1.5} size={20} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            {user?.userInfo && (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Plus /> Add to Playlist
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <Command className="rounded-sm border-none bg-transparent hover:bg-transparent">
                    <CommandInput placeholder="Search playlists..." />

                    <CreatePlaylist defaultThumbnail={song.thumbnail} setPlaylists={setPlaylists} />
                    <AllPlaylist song={song} playlists={playlists} setPlaylists={setPlaylists} />
                  </Command>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            )}

          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default SongOptions;