import { Skeleton } from "@/components/ui/skeleton";
import { getSuggestedSongs } from "@/services/Client/songService";
import { useEffect, useState } from "react";
import SongItem from "./songItem";
import { useIsTablet } from "@/hooks/use-tablet";

function Trending() {
  const [songs, setSongs] = useState(null);
  const tablet = useIsTablet();

  useEffect(() => {
    const fetchSong = async () => {
      const res = await getSuggestedSongs({
        type: "trending",
        limit: tablet ? 6 : 12
      })
      if (res.status === 200) {
        setSongs(res.data.recommendations)
      } else {
        setSongs([])
      }
    }
    fetchSong()
  }, [tablet])

  if (!songs) return (
    <Skeleton className="w-full h-100 mb-5" />
  )

  if (songs.length === 0) return null

  const textColor = (number) => {
    if (number === 1) return "text-red-500/70"
    if (number === 2) return "text-teal-500/70"
    if (number === 3) return "text-purple-500/70"
    return "text-gray-500"
  }

  const gridRows = () => {
    switch (songs.length) {
      case 1:
        return "grid-rows-1"
      case 2:
        return "grid-rows-2"
      case 3:
        return "grid-rows-3"
      case 4:
        return "grid-rows-4"
      case 5:
        return "grid-rows-5"
      default:
        return "grid-rows-6"
    }
  }

  return (
    <>
      <h2>On top Trending</h2>
      <section className={`grid grid-cols-1 lg:grid-cols-2 ${gridRows()} grid-flow-col gap-x-4 gap-y-0 mb-5`}>
        {songs.map((song, index) => (
          <div key={song._id}
            className="flex items-center gap-2"
          >
            <span className={`text-xl font-extrabold w-5 ${textColor(index + 1)}`}>{index + 1}</span>
            <SongItem item={song} />
          </div>
        ))}
      </section>
    </>
  )
}

export default Trending