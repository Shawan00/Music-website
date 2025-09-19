import { AuthContext } from "@/context/auth.context";
import { getTopHits } from "@/services/Client/songService";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectCountry from "./selectCountry";
import { Play } from "lucide-react";
import { playPlaylist, selectSong } from "@/features/playerControl/playerControlSlice";
import Marker from "@/components/User/Marker";
import { resizeImage } from "@/helpers";
import { Button } from "@/components/ui/button";
import ArtistUrl from "@/components/User/ArtistUrl";
import { Skeleton } from "@/components/ui/skeleton";
import SongOptions from "@/components/User/SongOptions";
import { Link } from "react-router-dom";

function TopHit() {
  const [songs, setSongs] = useState(null);
  const { user } = useContext(AuthContext);
  const [country, setCountry] = useState(user?.userInfo.country || "United States");
  const [showAll, setShowAll] = useState(false);
  const dispatch = useDispatch();
  const playingSong = useSelector((state) => state.playerControl.song);

  useEffect(() => {
    document.title = "Top Hits - " + country;
    setSongs(null);
    setShowAll(false);
    const fetchData = async () => {
      const response = await getTopHits(country)
      if (response.status === 200) {
        if (response.data.data.length === 0) {
          setSongs("empty");
        } else {
          setSongs({
            top3: response.data.data.slice(0, 3),
            next7: response.data.data.slice(3, 10),
            rest: response.data.data.slice(10, 20),
          });
        }
      } else {
        setSongs("error");
      }
    }
    fetchData();
  }, [country])

  if (!songs) return (
    <>
      <section className="mt-2 mb-5 flex items-center justify-between gap-4">
        <Skeleton className="w-50 h-10" />
        <Skeleton className="w-30 h-10" />
      </section>
      <section className="grid grid-cols-3 gap-1 sm:gap-4 lg:gap-8 xl:gap-16 pt-10 pb-5 mb-5 px-0 lg:px-15 xl:px-30 -z-5">
        <Skeleton className="w-full aspect-square rounded-md mt-5" />
        <Skeleton className="w-full aspect-square rounded-md" />
        <Skeleton className="w-full aspect-square rounded-md mt-5" />
      </section>
      <section className="space-y-2">
        <Skeleton className="w-full h-15" />
        <Skeleton className="w-full h-15" />
        <Skeleton className="w-full h-15" />
        <Skeleton className="w-full h-15" />
      </section>
    </>
  )

  if (songs === "error") return (
    <div className="w-full h-full m-auto space-y-3">
      <p className="text-center text-muted-foreground">Something went wrong. Please try again!</p>
    </div>
  )

  if (songs === "empty" || songs.top3.length < 3) return (
    <>
      <section className="mt-2 mb-4 flex items-center justify-between gap-4">
        <h1>Music Chart</h1>
        <SelectCountry country={country} setCountry={setCountry} />
      </section>
      <div className="w-full h-full m-auto space-y-3">
        <p className="text-center text-muted-foreground">This country has no top hits yet.</p>
      </div>
    </>
  )

  const songRow = (song, index) => {
    return (
      <div key={song._id}
        className="flex items-center gap-4 sm:gap-6 xl:gap-10 px-0 sm:px-4 py-3 cursor-pointer
              hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md border-b border-border"
        onClick={() => dispatch(selectSong(song))}
      >
        <div className="w-3/4 sm:w-2/3 flex items-center gap-2 sm:gap-4">
          <strong className="text-base sm:text-xl font-extrabold text-green-500 block min-w-7 sm:min-w-9">#{index}</strong>
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
            <p className={`mb-0 text-sm sm:text-base font-semibold w-full truncate ${playingSong && playingSong._id === song._id ? "text-[var(--logo-color)]" : "hover:text-[var(--logo-color)] transition-color duration-300"}`}>
              {song.title}
            </p>
            <ArtistUrl artistId={song.artistId} collaborationArtistIds={song.collaborationArtistIds} />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {song.albumId && (
            <Link to={`/album/${song.albumId._id}`}
              className="hidden sm:block flex-1 truncate text-muted-foreground hover:text-primary hover:underline">
              {song.albumId.title}
            </Link>
          )}
          <SongOptions song={song} />
        </div>
      </div>
    )
  }

  return (
    <>
      <section className="mt-2 mb-5 flex items-center justify-between gap-4">
        <h1>Music Chart</h1>
        <SelectCountry country={country} setCountry={setCountry} />
      </section>

      <div className="mb-5 w-fit px-4 py-2 flex items-center gap-2 bg-[var(--blue-bg)] rounded-full cursor-pointer"
        onClick={() => dispatch(playPlaylist([...songs.top3, ...songs.next7]))}
      >
        <Play className="size-4" fill="var(--primary)" />
        <span>Play all</span>
      </div>

      <section className="grid grid-cols-3 gap-1 sm:gap-4 lg:gap-8 xl:gap-16 pt-10 pb-5 mb-5 px-0 lg:px-15 xl:px-30 -z-5">
        <div className="relative space-y-2 h-fit mt-10 sm:mt-15 cursor-pointer"
          onClick={() => dispatch(selectSong(songs.top3[1]))}
        >
          <div className="w-10/15 ml-auto rounded-md overflow-hidden flex items-center justify-center group relative">
            <img
              src={songs.top3[1].thumbnail}
              alt={songs.top3[1].title}
              className={`w-full aspect-square object-cover transition-all duration-300 ${playingSong && playingSong._id === songs.top3[1]._id ? "brightness-50" : "group-hover:brightness-65"}`}
            />
            {playingSong && playingSong._id === songs.top3[1]._id ? (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              >
                <Marker className="scale-110 sm:scale-150 lg:scale-175 xl:scale-220" />
              </div>
            ) : (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                      p-2 rounded-full border border-primary hover:border-[var(--main-green)] hover:text-[var(--main-green)] hover:[&>svg]:fill-[var(--main-green)]"
              >
                <Play className="w-10 h-10" strokeWidth={1} fill="var(--primary)" />
              </div>
            )}
          </div>
          <img
            src="/2.png"
            className="h-8/11 absolute -top-5 left-0 -z-1"
          />
          <div className="w-10/15 ml-auto overflow-hidden">
            <h2 className="mb-0 text-xs sm:text-base lg:text-xl xl:text-2xl">{songs.top3[1].title}</h2>
            <ArtistUrl artistId={songs.top3[1].artistId} collaborationArtistIds={songs.top3[1].collaborationArtistIds} />
          </div>
        </div>
        <div className="relative space-y-2 h-fit cursor-pointer"
          onClick={() => dispatch(selectSong(songs.top3[0]))}
        >
          <div className="w-10/13 ml-auto rounded-md overflow-hidden flex items-center justify-center group relative">
            <img
              src={songs.top3[0].thumbnail}
              alt={songs.top3[0].title}
              className={`w-full aspect-square object-cover transition-all duration-300 ${playingSong && playingSong._id === songs.top3[0]._id ? "brightness-50" : "group-hover:brightness-65"}`}
            />
            {playingSong && playingSong._id === songs.top3[0]._id ? (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              >
                <Marker className="scale-110 sm:scale-150 lg:scale-175 xl:scale-220" />
              </div>
            ) : (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                      p-2 rounded-full border border-primary hover:border-[var(--main-green)] hover:text-[var(--main-green)] hover:[&>svg]:fill-[var(--main-green)]"
              >
                <Play className="w-10 h-10" strokeWidth={1} fill="var(--primary)" />
              </div>
            )}
          </div>
          <img
            src="/1.png"
            className="h-8/10 absolute -top-5 left-0 -z-1"
          />
          <div className="w-10/13 ml-auto overflow-hidden">
            <h2 className="mb-0 text-xs sm:text-base lg:text-xl xl:text-2xl">{songs.top3[0].title}</h2>
            <ArtistUrl artistId={songs.top3[0].artistId} collaborationArtistIds={songs.top3[0].collaborationArtistIds} />
          </div>
        </div>
        <div className="relative space-y-2 h-fit mt-10 sm:mt-15 cursor-pointer"
          onClick={() => dispatch(selectSong(songs.top3[2]))}
        >
          <div className="w-10/15 ml-auto rounded-md overflow-hidden flex items-center justify-center group relative">
            <img
              src={songs.top3[2].thumbnail}
              alt={songs.top3[2].title}
              className={`w-full aspect-square object-cover transition-all duration-300 ${playingSong && playingSong._id === songs.top3[2]._id ? "brightness-50" : "group-hover:brightness-65"}`}
            />
            {playingSong && playingSong._id === songs.top3[2]._id ? (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              >
                <Marker className="scale-110 sm:scale-150 lg:scale-175 xl:scale-220" />
              </div>
            ) : (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                      p-2 rounded-full border border-primary hover:border-[var(--main-green)] hover:text-[var(--main-green)] hover:[&>svg]:fill-[var(--main-green)]"
              >
                <Play className="w-10 h-10" strokeWidth={1} fill="var(--primary)" />
              </div>
            )}
          </div>
          <img
            src="/3.png"
            className="h-8/11 absolute -top-5 left-0 -z-1"
          />
          <div className="w-10/15 ml-auto overflow-hidden">
            <h2 className="mb-0 text-xs sm:text-base lg:text-xl xl:text-2xl">{songs.top3[2].title}</h2>
            <ArtistUrl artistId={songs.top3[2].artistId} collaborationArtistIds={songs.top3[2].collaborationArtistIds} />
          </div>
        </div>
      </section>

      <section>
        {songs.next7.map((song, index) => (
          songRow(song, index + 4)
        ))}
      </section>

      {showAll && (
        <section>
          {songs.rest.map((song, index) => (
            songRow(song, index + 11)
          ))}
        </section>
      )}

      {songs.rest.length > 0 && (
        <Button onClick={() => setShowAll(!showAll)}
          variant="outline"
          className="mx-auto flex rounded-full my-5"
        >
          {showAll ? "Hide" : "Show More"}
        </Button>
      )}

    </>
  )
}

export default TopHit;