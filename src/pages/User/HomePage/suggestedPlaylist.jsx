import { Skeleton } from "@/components/ui/skeleton";
import PlaylistCard from "@/components/User/PlaylistCard";
import { getSuggestedPlaylist } from "@/services/Client/playlistService";
import { useEffect, useState } from "react";

function SuggestedPlaylist() {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const getPlaylists = async () => {
      const response = await getSuggestedPlaylist();
      if (response.status === 200) {
        setPlaylists(response.data.playlists.slice(0, 6));
      } else {
        setPlaylists([]);
      }
    }
    getPlaylists();
  }, [])

  if (!playlists) return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
      <Skeleton className="w-full aspect-9/10" />
      <Skeleton className="w-full aspect-9/10" />
      <Skeleton className="w-full aspect-9/10" />
      <Skeleton className="w-full aspect-9/10" />
      <Skeleton className="w-full aspect-9/10" />
      <Skeleton className="w-full aspect-9/10" />
    </div>
  )

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist._id} playlist={playlist} />
        ))}
      </div>
    </>
  )
}

export default SuggestedPlaylist;