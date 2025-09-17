import { Skeleton } from "@/components/ui/skeleton";
import PlaylistCard from "@/components/User/PlaylistCard";
import { getAllPlaylist } from "@/services/Client/playlistService";
import { useEffect, useState } from "react";

function Playlists() {
  const [playlists, setPlaylists] = useState(null)
  useEffect(() => {
    const fetchPlaylists = async () => {
      const res = await getAllPlaylist();
      if (res.status === 200) {
        setPlaylists(res.data.playlists)
      } else setPlaylists([])
    }
    fetchPlaylists()
  }, [])

  if (!playlists) return (
    <Skeleton className="w-full h-20"/>
  )
  if (playlists.length === 0) return (
    <p className="text-center text-muted-foreground">You haven&apos;t created any playlists yet</p>
  )

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-5 gap-3 mb-5">
        {playlists.map(playlist => (
          <PlaylistCard key={playlist._id} playlist={playlist} />
        ))}
      </div>
    </>
  )
}

export default Playlists;