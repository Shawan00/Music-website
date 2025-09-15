import { Skeleton } from "@/components/ui/skeleton";
import PlaylistCard from "@/components/User/PlaylistCard";
import { getAllPlaylist } from "@/services/Client/playlistService";
import { useEffect, useState } from "react";

function MyPlaylist() {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const res = await getAllPlaylist()
      if (res.status === 200) {
        setPlaylists(res.data.playlists)
      } else {
        setPlaylists([])
      }
    }
    fetchPlaylists()
  }, [])

  if (!playlists) return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
      <Skeleton className="w-full aspect-square" />
      <Skeleton className="w-full aspect-square" />
      <Skeleton className="w-full aspect-square" />
      <Skeleton className="w-full aspect-square" />
      <Skeleton className="w-full aspect-square" />
    </div>
  )

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 mb-5">
      {playlists.map((playlist) => (
        <PlaylistCard key={playlist._id} playlist={playlist} />
      ))}
    </section>
  )
}

export default MyPlaylist;