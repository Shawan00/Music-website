import { Skeleton } from "@/components/ui/skeleton";
import SongTable from "@/components/User/SongTable";
import { playPlaylist } from "@/features/playerControl/playerControlSlice";
import { getAllLikedSong } from "@/services/Client/songService";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function LikedSong() {
  const dispatch = useDispatch()
  const [songs, setSongs] = useState(null);

  useEffect(() => {
    document.title = "Liked Songs - Music Project";
    const fetchLikedSongs = async () => {
      const response = await getAllLikedSong();
      console.log(response);
      if (response.status === 200) {
        setSongs(response.data.data);
      } else {
        setSongs([])
      }
    }
    fetchLikedSongs();
  }, [])

  const renderSongs = () => {
    if (!songs) return (
      <div className="space-y-3">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    )

    return (
      <SongTable songs={songs} />
    )

  }

  if (songs && songs.length === 0) return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <DotLottieReact
        src="https://lottie.host/b84dc140-256a-4180-a86e-6cba7543e18c/jJZEe9khfg.lottie"
        loop autoplay
        className="w-100 sm:w-150 aspect-ratio-2/1 mx-auto"
      />
      <p className="text-lg font-bold">You haven&apos;t liked any songs yet</p>
    </div>
  )

  return (
    <>
      <h2 className="mb-5">Liked Songs</h2>
      <section className="px-5 flex items-center gap-5 mb-5">
        <button className="p-4 rounded-full bg-[var(--green-bg)]"
          onClick={() => {
            dispatch(playPlaylist(songs))
          }}
        >
          <Play fill="var(--secondary)" color="var(--secondary" />
        </button>
      </section>

      {renderSongs()}
    </>
  )
}

export default LikedSong;