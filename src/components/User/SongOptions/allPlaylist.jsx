import { CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { showToast } from "@/helpers";
import { addSongToPlaylist, getAllPlaylist } from "@/services/Client/playlistService";
import { useEffect } from "react";

function AllPlaylist({ song, playlists, setPlaylists }) {
  useEffect(() => {
    const fetchPlaylists = async () => {
      const response = await getAllPlaylist();
      if (response.status === 200) {
        setPlaylists(response.data.playlists)
      } else {
        setPlaylists([])
      }
    };
    fetchPlaylists();
  }, []);

  const handleAddToPlaylist = async (playlistId) => {
    const res = await addSongToPlaylist(playlistId, song._id);
    if (res.status === 200) {
      showToast("Song added to playlist", "success");
    } else if (res.status === 400) {
      showToast("Song already exists in playlist", "warning");
    } else {
      showToast(res.data.message || "Failed to add song to playlist", "error");
    }
  };

  if (!playlists) return (
    <CommandList>
      <Skeleton className="w-full h-2" />
    </CommandList>
  )

  return (
    <CommandList>
      <CommandEmpty>No playlists found</CommandEmpty>
      <CommandGroup>
        {playlists.map((playlist) => (
          <CommandItem
            key={playlist._id}
            value={playlist.title}
            onSelect={() => handleAddToPlaylist(playlist._id)}
          >
            {playlist.title}
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandList>
  )
}

export default AllPlaylist;