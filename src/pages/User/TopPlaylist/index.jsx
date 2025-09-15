import { Skeleton } from "@/components/ui/skeleton";
import ArtistUrl from "@/components/User/ArtistUrl";
import Marker from "@/components/User/Marker";
import SongOptions from "@/components/User/SongOptions";
import { playPlaylist, selectSong } from "@/features/playerControl/playerControlSlice";
import { resizeImage } from "@/helpers";
import NotFound from "@/pages/Error/404NotFound";
import { getPlaylistBySlug } from "@/services/Client/playlistService";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function TopPlaylist() {
  const { slug } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const dispatch = useDispatch();
  const playingSong = useSelector((state) => state.playerControl.song)

  useEffect(() => {
    document.title = "Top Playlist"
    const fetchPlaylist = async () => {
      const res = await getPlaylistBySlug(slug);
      if (res.status === 200) {
        setPlaylist(res.data.playlist)
        document.title = res.data.playlist.title;
      } else {
        setPlaylist("error");
      }
    }
    fetchPlaylist();
  }, [slug])

  if (!playlist) {
    return (
      <>
        <div className="grid grid-cols-2 lg:grid-cols-7 gap-3 lg:gap-5">
          <section className="col-span-2 flex flex-row lg:flex-col gap-3 lg:gap-5 h-fit static lg:sticky top-0">
            <Skeleton className="w-1/2 sm:w-1/3 lg:w-full aspect-square" />
            <Skeleton className="flex-1 lg:flex-none lg:w-full self-end h-20" />
          </section>
          <section className="col-span-5 space-y-2 mb-5">
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
          </section>
        </div>
      </>
    )
  }

  if (playlist === "error") {
    return <NotFound />
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-7 gap-3 lg:gap-5 xl:gap-7">
        <section className="col-span-2 flex flex-row lg:flex-col gap-3 xl:gap-5 h-fit static lg:sticky top-0">
          <div className="w-3/10 sm:w-1/3 lg:w-full rounded-sm overflow-hidden flex items-center justify-center">
            <img
              src={resizeImage(playlist.thumbnail || "", 400)}
              alt={playlist.title}
              className="w-full aspect-square object-cover"
            />
          </div>
          <div className="self-end lg:self-start">
            <h2 className="mb-0 text-base sm:text-xl lg:text-2xl xl:text-3xl truncate">{playlist.title}</h2>
            <p className="text-muted-foreground">{playlist.songs.length} songs</p>
            <div className="mt-5 w-fit px-4 py-2 flex items-center gap-2 bg-[var(--blue-bg)] rounded-full cursor-pointer"
              onClick={() => dispatch(playPlaylist(playlist.songs))}
            >
              <Play className="size-4" fill="var(--primary)" />
              <span>Play all</span>
            </div>
          </div>
        </section>
        <section className="col-span-5 mb-5">
          {playlist.songs.map((song, index) => (
            <div key={song._id}
              className="flex items-center gap-4 sm:gap-6 xl:gap-10 px-0 sm:px-4 py-3 cursor-pointer
                  hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md border-b border-border"
              onClick={() => dispatch(selectSong(song))}
            >
              <div className="flex items-center gap-2 sm:gap-4 w-2/3">
                <strong className="text-base sm:text-xl block min-w-5">{index + 1}</strong>
                <div className="w-13 sm:w-15 rounded-sm overflow-hidden relative group">
                  <img
                    src={resizeImage(song.thumbnail, 60)}
                    alt={song.title}
                    className={`w-full aspect-square object-cover ${playingSong && playingSong._id === song._id ? "brightness-50" : "group-hover:brightness-65 transition-all duration-300"}`}
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    {playingSong && playingSong._id === song._id ? (
                      <>
                        <Marker />
                      </>
                    ) : (
                      <>
                        <Play className="size-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          color="var(--color-primary)"
                          fill="var(--color-primary)"
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="space-y-2 flex-1 overflow-hidden">
                  <p className={`mb-0 text-sm sm:text-base font-semibold truncate w-full ${playingSong && playingSong._id === song._id ? "text-[var(--logo-color)]" : "hover:text-[var(--logo-color)] transition-color duration-300"}`}>
                    {song.title}
                  </p>
                  <ArtistUrl artistId={song.artistId} collaborationArtistIds={song.collaborationArtistIds} />
                </div>
              </div>
              <div className="flex-1 flex items-center justify-end overflow-hidden">
                <div className="hidden sm:block flex-1 truncate">Album</div>
                <SongOptions song={song} />
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  )
}

export default TopPlaylist;