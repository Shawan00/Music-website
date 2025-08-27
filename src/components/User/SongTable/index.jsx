import { formatNumberWithDots, formatDateToString, resizeImage } from "@/helpers";
import { selectSong } from "@/features/playerControl/playerControlSlice";
import { useDispatch } from "react-redux";
import SongOptions from "../SongOptions";
import { Play } from "lucide-react";

function SongTable({ songs }) {
  const dispatch = useDispatch()

  return (
    <section className="px-3 lg:px-6">
      <table className="w-full overflow-auto">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="pl-2 sm:pl-4 text-left w-10">#</th>
            <th className="px-3 sm:px-6 py-3 text-left">Title</th>
            <th className="px-3 sm:px-6 py-3 text-left">Album</th>
            <th className="px-3 sm:px-6 py-3 text-left"></th>
            <th className="px-3 sm:px-6 py-3 text-left hidden lg:table-cell">Date added</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr key={song._id}
              className="font-medium group cursor-pointer"
              onClick={() => dispatch(selectSong(song))}
            >
              <td className="pl-2 sm:pl-4 w-10">
                <span className="group-hover:hidden">{index + 1}</span>
                <span className="hidden group-hover:block">
                  <Play className="size-4"
                    fill="var(--green-hover)"
                    color="var(--green-hover)"
                  />
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
              <td className="p-3 sm:px-6">{formatNumberWithDots(song.streams || 100000)}</td>
              <td className="p-3 sm:px-6 hidden lg:table-cell">{formatDateToString(song.createdAt)}</td>
              <td className="text-right opacity-100 xl:opacity-0 group-hover:opacity-100 transition-opacity">
                <SongOptions song={song} currentPlaylistId={songs._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default SongTable;