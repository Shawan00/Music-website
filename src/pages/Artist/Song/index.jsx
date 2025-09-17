import { copyToClipboard, formatDateToString, formatNumberWithDots, resizeImage } from "@/helpers";
import SongForm from "./songForm";
import { useContext, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { getAllArtistSong } from "@/services/Client/songService";
import DeleteSong from "./delete";
import { AuthContext } from "@/context/auth.context";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "@/components/Admin/Pagination";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy } from "lucide-react";
import VerifyArtist from "@/components/User/VerifyArtist";

function ArtistSong() {
  const [songs, setSongs] = useState(null);
  const [objectPagination, setObjectPagination] = useState(null);
  const { user } = useContext(AuthContext)
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const pageSize = parseInt(searchParams.get("pageSize")) || 8;
  const navigate = useNavigate()

  if (!user) {
    navigate("/login");
  }

  useEffect(() => {
    document.title = "Songs - Artist Studio";
  }, [])

  useEffect(() => {
    const fetchSongs = async () => {
      const res = await getAllArtistSong({
        page: page,
        limit: pageSize,
        sortKey: "createdAt",
        sortValue: "desc"
      });
      console.log(res)
      if (res.status === 200) {
        setSongs(res.data.songs);
        setObjectPagination(res.data.pagination);
      } else {
        setSongs([]);
      }
    }
    fetchSongs();
  }, [page, pageSize])

  if (!user.userInfo.verifyArtist) {
    return <VerifyArtist profile={user.userInfo} />;
  }

  if (!songs) return (
    <div className="w-full space-y-2">
      <Skeleton className="w-full h-13" />
      <Skeleton className="w-full h-13" />
      <Skeleton className="w-full h-13" />
      <Skeleton className="w-full h-13" />
      <Skeleton className="w-full h-13" />
      <Skeleton className="w-full h-13" />
    </div>
  )

  const renderSongTable = () => {
    if (songs.length === 0) return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <DotLottieReact
          src="https://lottie.host/b84dc140-256a-4180-a86e-6cba7543e18c/jJZEe9khfg.lottie"
          loop autoplay
          className="w-100 sm:w-150 aspect-ratio-2/1 mx-auto"
        />
        <p className="text-lg font-bold">You haven&apos;t uploaded any songs yet</p>
      </div>
    )

    return (
      <section className="px-3 lg:px-6 w-full">
        <table className="w-full overflow-auto">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="pl-2 sm:pl-4 text-left w-10">#</th>
              <th className="px-3 sm:px-6 py-3 text-left">Title</th>
              <th className="px-3 sm:px-6 py-3 text-left">Album</th>
              <th className="px-3 sm:px-6 py-3 text-left">Streams</th>
              <th className="px-3 sm:px-6 py-3 text-left hidden lg:table-cell">Date added</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => (
              <tr key={song._id} className="font-medium group">
                <td className="pl-2 sm:pl-4 w-10">
                  <span className="group-hover:hidden">{index + 1}</span>
                  <span className="hidden group-hover:inline-block">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button onClick={() => copyToClipboard(`listen?slug=${song.slug}`)}>
                          <Copy className="size-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy song url</p>
                      </TooltipContent>
                    </Tooltip>
                  </span>
                </td>
                <td className="p-3 sm:px-6 flex gap-2">
                  <div className="size-19 lg:size-15 rounded-xs overflow-hidden flex items-center justify-center">
                    <img
                      src={resizeImage(song.thumbnail, 60)}
                      alt={song.title}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-2">
                    <span className="font-medium group-hover:text-[var(--green-highlight)] line-clamp-1">{song.title}</span>
                    <span className="text-sm text-muted-foreground">{song.artist || "artist"}</span>
                  </div>
                </td>
                <td className="p-3 sm:px-6">{song.album?.title || "No album"}</td>
                <td className="p-3 sm:px-6">{formatNumberWithDots(song.playCount || 0)}</td>
                <td className="p-3 sm:px-6 hidden lg:table-cell">{formatDateToString(song.createdAt)}</td>
                <td className="py-3 ">
                  <div className="flex gap-2 justify-end">
                    <SongForm song={song} setSongs={setSongs} />
                    <DeleteSong song={song} setSongs={setSongs} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          objectPagination={objectPagination}
        />
      </section>
    )
  }

  return (
    <>
      <section className="flex justify-between">
        <h2>Your songs</h2>
        <SongForm />
      </section>

      {renderSongTable()}

    </>
  )
}

export default ArtistSong;