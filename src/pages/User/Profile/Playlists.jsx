import { Skeleton } from "@/components/ui/skeleton";
import { getAllPlaylist } from "@/services/Client/playlistService";
import { useEffect, useState } from "react";

function Playlists() {
  const [playlists, setPlaylists] = useState(null)
  useEffect(() => {
    const fetchPlaylists = async () => {
      const res = await getAllPlaylist();
      console.log(res)
      if (res.status === 200) {
        setPlaylists(res.data)
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
      <div className="grid grid-cols-2 sm:grid-cols-4"></div>
    </>
  )
}

export default Playlists;