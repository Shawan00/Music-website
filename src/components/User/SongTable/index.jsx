import { formatNumberWithDots, formatDateToString, resizeImage } from "@/helpers";
import { selectSong } from "@/features/playerControl/playerControlSlice";
import { useDispatch, useSelector } from "react-redux";
import SongOptions from "../SongOptions";
import { Play } from "lucide-react";
import Marker from "../Marker";
import ArtistUrl from "../ArtistUrl";
import { Link } from "react-router-dom";

function SongTable({ songs, currentPlaylistId, setCurrentPlaylist, setLikedSongs, hideAlbum = undefined }) {
  const dispatch = useDispatch()
  const playingSong = useSelector(state => state.playerControl.song);

  if (songs.length === 0) {
    return (
      <section className="px-0 lg:px-6">
        <p className="text-center text-muted-foreground">You haven&apos;t added any songs to this playlist yet</p>
      </section>
    )
  }

  return (
    <section className="px-0 lg:px-6">
      <table className="w-full overflow-auto">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="pl-2 sm:pl-4 text-left w-10">#</th>
            <th className="px-3 sm:px-6 py-3 text-left">Title</th>
            <th className={`px-3 sm:px-6 py-3 text-left ${hideAlbum ? "hidden" : "hidden sm:table-cell"}`}>Album</th>
            <th className="px-3 sm:px-6 py-3 text-left hidden sm:table-cell">Streams</th>
            <th className="px-3 sm:px-6 py-3 text-left hidden sm:table-cell">Likes</th>
            <th className="px-3 sm:px-6 py-3 text-left hidden lg:table-cell">Release</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr key={song._id}
              className={`font-medium group cursor-pointer ${playingSong && playingSong._id === song._id ? "bg-green-100 dark:bg-green-900" : ""}`}
              onClick={() => dispatch(selectSong(song))}
            >
              <td className="pl-2 sm:pl-4 w-10">
                {playingSong && playingSong._id === song._id ? (
                  <Marker />
                ) : (
                  <>
                    <span className="group-hover:hidden">{index + 1}</span>
                    <span className="hidden group-hover:block">
                      <Play className="size-4"
                        fill="var(--green-hover)"
                        color="var(--green-hover)"
                      />
                    </span>
                  </>
                )}
              </td>
              <td className="p-3 sm:px-6 flex gap-2 max-w-[80vw]">
                <div className="size-15 lg:size-15 rounded-xs overflow-hidden flex items-center justify-center">
                  <img
                    src={resizeImage(song.thumbnail, 60)}
                    alt={song.title}
                    className="w-full aspect-square object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center gap-2 flex-1 overflow-auto">
                  <span className="font-medium group-hover:text-[var(--logo-color)] line-clamp-1">{song.title}</span>
                  <span className="text-sm text-muted-foreground">
                    <ArtistUrl artistId={song.artistId} collaborationArtistIds={song.collaborationArtistIds} />
                  </span>
                </div>
              </td>
              <td className={`p-3 sm:px-6 ${hideAlbum ? "hidden" : "hidden sm:table-cell"}`}
                onClick={(e) => e.stopPropagation()}
              >
                {song.albumId ? (
                  <>
                    <Link to={`/album/${song.albumId._id}`} className="hover:underline">
                      {song.albumId.title}
                    </Link>
                  </>
                ) : (
                  <span className="text-muted-foreground">No album</span>
                )}
              </td>
              <td className="p-3 sm:px-6 hidden sm:table-cell">{formatNumberWithDots(song.playCount || 0)}</td>
              <td className="p-3 sm:px-6 hidden sm:table-cell">{formatNumberWithDots(song.like || 0)}</td>
              <td className="p-3 sm:px-6 hidden lg:table-cell">{formatDateToString(song.createdAt)}</td>
              <td className="px-3 text-right opacity-100 xl:opacity-0 group-hover:opacity-100 transition-opacity">
                <SongOptions
                  song={song}
                  currentPlaylistId={currentPlaylistId}
                  setCurrentPlaylist={setCurrentPlaylist}
                  setLikedSongs={setLikedSongs}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default SongTable;