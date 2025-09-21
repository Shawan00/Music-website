import { Skeleton } from "@/components/ui/skeleton";
import { getSuggestedSongs } from "@/services/Client/songService";
import { useEffect, useState } from "react";
import SongItem from "./songItem";

function Trending() {
  const [songs, setSongs] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      const res = await getSuggestedSongs({
        type: "trending",
        limit: 10
      })
      if (res.status === 200) {
        setSongs(res.data.recommendations)
      } else {
        setSongs([])
      }
    }
    fetchSong()
  }, [])

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
        return "lg:grid-rows-1"
      case 2:
        return "lg:grid-rows-2"
      case 3:
        return "lg:grid-rows-3"
      case 4:
        return "lg:grid-rows-4"
      default:
        return "lg:grid-rows-5"
    }
  }

  return (
    <>
      <h2>On top Trending</h2>
      <section className={`grid grid-cols-1 lg:grid-cols-2 ${gridRows()} lg:grid-flow-col gap-x-4 gap-y-0 mb-5`}>
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