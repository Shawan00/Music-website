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
      if (response.status === 200) {
        setSongs(response.data.songsLiked);
      } else {
        setSongs([])
      }
    }
    fetchLikedSongs();
  }, [])

  if (!songs) return (
    <div className="space-y-3">
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  )

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
      <section className="flex gap-3 sm:gap-6 my-4 p-5 bg-linear-to-b from-[#5038A0] to-[#5038A0]/20 rounded-t-lg">
        <div className="w-[130px] md:w-[200px] rounded-xs overflow-hidden flex items-center justify-center justify-center">
          <img
            src="/like.webp"
            alt={"Liked songs"}
            className="w-full aspect-square object-cover"
          />
        </div>
        <div className="self-end flex flex-col gap-1 sm:gap-3 flex-1">
          <p className="capitalize font-semibold text-xs sm:text-base">Playlist</p>
          <h1 className="line-clamp-1 xl:leading-12">Liked songs</h1>
          <div className="flex items-center flex-wrap gap-1 sm:gap-2">
            <p>{songs?.length} {songs?.length > 1 ? "songs" : "song"}</p>
          </div>
        </div>
      </section>

      <section className="px-5 flex items-center gap-5 mb-5">
        <button className="p-4 rounded-full bg-[var(--green-bg)]"
          onClick={() => {
            dispatch(playPlaylist(songs))
          }}
        >
          <Play fill="var(--secondary)" color="var(--secondary" />
        </button>
      </section>

      <SongTable songs={songs} 
        setLikedSongs={setSongs}
      />
    </>
  )
}

export default LikedSong;