import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import SongTable from "@/components/User/SongTable";
import { playPlaylist } from "@/features/playerControl/playerControlSlice";
import { formatDateToString, getAvatarFallback, resizeImage } from "@/helpers";
import NotFound from "@/pages/Error/404NotFound";
import { getAlbumById } from "@/services/Client/albumService";
import { Dot, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

function AlbumDetail() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Album";
    const getAlbum = async () => {
      const response = await getAlbumById(id);
      console.log(response);
      if (response.status === 200) {
        setAlbum(response.data.album);
        document.title = response.data.album.title + " - Album";
      } else {
        setAlbum("error")
      }
    }
    getAlbum();
  }, [id])

  if (!album) return (
    <div className="space-y-3">
      <Skeleton className="w-full h-50" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
    </div>
  )

  if (album === "error") return (
    <NotFound />
  )

  return (
    <>
      <section className="flex gap-3 sm:gap-6 my-4 p-5 bg-linear-to-b from-[var(--green-bg)] to-background rounded-t-lg">
        <div className="w-[130px] md:w-[200px] rounded-xs overflow-hidden flex items-center justify-center justify-center">
          <img
            src={resizeImage(album.thumbnail, 200)}
            alt={album.title}
            className="w-full aspect-square object-cover"
          />
        </div>
        <div className="self-end flex flex-col gap-1 sm:gap-3 flex-1">
          <p className="capitalize font-semibold text-xs sm:text-base">Album</p>
          <h1 className="line-clamp-1 xl:leading-11.5">{album.title}</h1>
          <div className="flex items-center flex-wrap gap-1 sm:gap-2">
            <Avatar>
              <AvatarImage
                src={resizeImage(album.idArtist.avatar || "", 40)}
                alt={album.idArtist.fullName}
              />
              <AvatarFallback>{getAvatarFallback(album.idArtist.fullName)}</AvatarFallback>
            </Avatar>
            <Link className="font-medium hover:underline"
              to={`/profile/${album.idArtist._id}`}
            >
              {album.idArtist.fullName}
            </Link>
            <Dot />
            <p>{album.songs.length} songs</p>
          </div>
        </div>
      </section>

      <section className="px-5 flex items-center gap-5 mb-5">
        <button className="p-3 sm:p-4 rounded-full bg-[var(--green-bg)]"
          onClick={() => {
            dispatch(playPlaylist(album.songs))
          }}
        >
          <Play fill="var(--secondary)" color="var(--secondary)" />
        </button>
      </section>

      <section className="mb-5">
        <SongTable songs={album.songs} hideAlbum />
      </section>

      <section className="mb-5 px-5">
        <h2 className="text-lg sm:text-xl xl:text-3xl font-bold">About this album</h2>
        <p className="text-sm sm:text-base mb-2">{album.description}</p>
        <h4 className="font-semibold">Release</h4>
        <p>{formatDateToString(album.createdAt)}</p>
      </section>
    </>
  );
}

export default AlbumDetail;