import { Skeleton } from "@/components/ui/skeleton";
import ArtistUrl from "@/components/User/ArtistUrl";
import Marker from "@/components/User/Marker";
import SongOptions from "@/components/User/SongOptions";
import { playPlaylist, selectSong } from "@/features/playerControl/playerControlSlice";
import { resizeImage } from "@/helpers";
import { getAlbumById } from "@/services/Client/albumService";
import { Play } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AlbumTabs({ id }) {
  const [album, setAlbum] = useState(null);
  const songId = useSelector((state) => state.playerControl.song._id);
  const [selectedSong, setSelectedSong] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAlbum = async () => {
      const res = await getAlbumById(id);
      if (res.status === 200) {
        setAlbum(res.data.album);
      } else {
        setAlbum("error");
      }
    }
    fetchAlbum();
  }, [id])

  if (!album) {
    return (
      <div className="h-full container-custom py-2 sm:py-5 flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/3 flex flex-row items-center sm:flex-col gap-4">
          <Skeleton className="w-15 sm:w-full aspect-square" />
          <Skeleton className="w-full h-10" />
        </div>
        <div className="flex-1 overflow-auto hide-scrollbar">
          <Skeleton className="size-15 sm:size-20 rounded-full mb-4" />
          <Skeleton className="w-full h-15 mb-4" />
          <Skeleton className="w-full h-15 mb-4" />
          <Skeleton className="w-full h-15 mb-4" />
          <Skeleton className="w-full h-15 mb-4" />
        </div>
      </div>
    );
  }

  if (album === "error") {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-muted-foreground">This song is not in any album</p>
      </div>
    );
  }

  return (
    <>
      <div className="h-full container-custom-sm py-2 sm:py-5 flex flex-col sm:flex-row gap-4">
        <section className="w-full sm:w-1/3 flex flex-row items-center sm:flex-col gap-4">
          <div className="w-18 sm:w-full rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src={resizeImage(album.thumbnail || "", 400)}
              alt={album.title}
              className="w-full aspect-square object-cover"
            />
          </div>
          <Link to={`/album/${album._id}`} className="font-semibold sm:font-bold text-xl sm:text-2xl block text-center truncate hover:underline">
            {album.title}
          </Link>
        </section>

        <section className="flex-1 overflow-auto hide-scrollbar">
          <div className="px-3 flex items-center gap-5 mb-2 sm:mb-5">
            <button className="p-3 sm:p-4 rounded-full bg-[var(--green-bg)]"
              onClick={() => {
                dispatch(playPlaylist(album.songs))
              }}
            >
              <Play fill="var(--secondary)" color="var(--secondary)" />
            </button>
          </div>
          <div className="w-full space-y-1">
            {album.songs.map((item) => (
              <div
                className={`song-item ${item._id === songId ? "active" : item._id === selectedSong?._id ? "bg-muted" : ""}`}
                key={item._id}
                onClick={() => dispatch(selectSong(item))}
              >
                <div className='image w-15'>
                  <img src={resizeImage(item.thumbnail, 60)} alt={item.title}></img>
                </div>
                <div className='info flex-1 truncate'>
                  <span className='title'>{item.title}</span>
                  <ArtistUrl artistId={item.artistId} collaborationArtistIds={item.collaborationArtistIds}/>
                </div>
                {item._id === songId && (
                  <Marker />
                )}
                <div className={`options ${selectedSong?._id === item._id ? "visible" : ""}`}
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onMouseEnter={() => setSelectedSong(item)}
                  onMouseLeave={() => setSelectedSong(null)}
                >
                  <SongOptions song={item} />
                </div>
              </div>
            ))}
          </div>

        </section>
      </div>
    </>
  )
}

export default memo(AlbumTabs);