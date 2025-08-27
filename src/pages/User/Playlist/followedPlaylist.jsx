import { Skeleton } from "@/components/ui/skeleton";
import { resizeImage } from "@/helpers";
import { getAllFollowedPlaylist } from "@/services/Client/playlistService";
import { PlayIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FollowedPlaylist() {
  const [playlists, setPlaylists] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      const res = await getAllFollowedPlaylist()
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
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mb-5">
      {playlists.map((playlist) => (
        <div key={playlist._id} className="w-full">
          <div className="w-full rounded-sm overflow-hidden relative group"
            onClick={() => {
              navigate(`/playlist/${playlist.slug}`);
            }}
          >
            <img src={resizeImage(playlist.thumbnail, 300)} alt={playlist.title}
              className="object-cover aspect-square 
                group-hover:scale-105 group-hover:brightness-65 transition-all duration-300"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer
                      opacity-0 group-hover:opacity-100 transition-all duration-300 
                      p-2 rounded-full border border-primary hover:border-[var(--main-green)] hover:text-[var(--main-green)] hover:[&>svg]:fill-[var(--main-green)]"
            >
              <PlayIcon className="w-10 h-10" strokeWidth={1} fill="var(--primary)" />
            </div>
          </div>
          <h5 className="mt-3 cursor-pointer hover:text-[var(--main-green)] transition-all duration-300"
            onClick={() => {
              navigate(`/playlist/${playlist.slug}`);
            }}
          >{playlist.title}</h5>
        </div>
      ))}
    </section>
  )
}

export default FollowedPlaylist;