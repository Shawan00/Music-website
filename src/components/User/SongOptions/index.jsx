import { Command, CommandInput } from "@/components/ui/command";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CircleUser, Copy, Disc, DiscAlbum, Heart, ListPlus, ListX, MoreVertical, Plus } from "lucide-react";
import CreatePlaylist from "./createPlaylist";
import AllPlaylist from "./allPlaylist";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth.context";
import { likeSong } from "@/services/Client/songService";
import { copyToClipboard, showToast } from "@/helpers";
import { useNavigate } from "react-router-dom";
import { removeSongFromPlaylist } from "@/services/Client/playlistService";
import { useDispatch } from "react-redux";
import { addSongToQueue } from "@/features/playerControl/playerControlSlice";

function SongOptions({ song, currentPlaylistId, setCurrentPlaylist, setLikedSongs }) {
  const [playlists, setPlaylists] = useState(null);
  const { user, setUser } = useContext(AuthContext);
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLiked = () => {
    return user?.userInfo.songsLiked.includes(song._id)
  }

  const handleLike = async () => {
    if (!user) {
      showToast("You are not logged in", "error")
      return
    }
    setPending(true)
    const res = await likeSong(song.slug);
    setPending(false)

    if (res.status === 200) {
      showToast(res.data.message, "success")
      if (res.data.message === "Song liked successfully") {
        const newUser = {
          ...user,
          userInfo: {
            ...user.userInfo,
            songsLiked: [...user.userInfo.songsLiked, song._id]
          }
        }
        localStorage.setItem("userInfo", JSON.stringify(newUser.userInfo))
        setUser(newUser)
        setLikedSongs(prev => [...prev, song])
      } else {
        const newUser = {
          ...user,
          userInfo: {
            ...user.userInfo,
            songsLiked: user.userInfo.songsLiked.filter(id => id !== song._id)
          }
        }
        localStorage.setItem("userInfo", JSON.stringify(newUser.userInfo))
        setUser(newUser)
        setLikedSongs(prev => prev.filter(prevSong => prevSong._id !== song._id))
      }
    } else {
      if (res.status === 401) {
        showToast("You are not logged in", "error")
      } else {
        showToast(res.data.message, "error")
      }
    }
  }

  const handleRemoveFromPlaylist = async () => {
    setPending(true)
    const res = await removeSongFromPlaylist(currentPlaylistId, song._id)
    if (res.status === 200) {
      showToast(res.data.message, "success")
      setCurrentPlaylist(prev => ({
        ...prev,
        songs: prev.songs.filter(prevSong => prevSong._id !== song._id),
      }))
    } else {
      showToast(res.data.message, "error")
    }
    setPending(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <MoreVertical strokeWidth={1.5} size={20} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <DropdownMenuGroup>
            {user?.userInfo && (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center gap-2">
                  <Plus className="size-5" /> Add to Playlist
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <Command className="rounded-sm border-none bg-transparent hover:bg-transparent">
                    <CommandInput placeholder="Search playlists..." />

                    <CreatePlaylist defaultThumbnail={song.thumbnail} setPlaylists={setPlaylists} />
                    <AllPlaylist song={song} playlists={playlists} setPlaylists={setPlaylists} />
                  </Command>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            )}
            <DropdownMenuItem className="flex items-center gap-2 disabled:opacity-50"
              onClick={handleLike}
              disabled={pending}
            >
              <Heart
                className="size-5"
                fill={isLiked() ? "var(--logo-color)" : ""}
                color={isLiked() ? "var(--logo-color)" : "var(--primary)"}
              />
              <span>{isLiked() ? "Unlike" : "Like"}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2"
              onClick={() => {
                dispatch(addSongToQueue(song))
                showToast("Song added to queue", "success")
              }}
            >
              <ListPlus className="size-5" color="var(--primary)" />
              <span>Add to queue</span>
            </DropdownMenuItem>
            {currentPlaylistId &&
              <DropdownMenuItem className="flex items-center gap-2"
                onClick={handleRemoveFromPlaylist}
                disabled={pending}
              >
                <ListX className="size-5" color="var(--primary)" />
                <span>Remove from this playlist</span>
              </DropdownMenuItem>
            }
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex items-center gap-2"
              onClick={() => {
                navigate(`/listen?slug=${song.slug}`)
              }}
            >
              <Disc className="size-5" color="var(--primary)" />
              <span>Go to song radio</span>
            </DropdownMenuItem>
            {song.albumId && (
              <DropdownMenuItem className="flex items-center gap-2"
                onClick={() => {
                  navigate(`/album/${song.albumId._id}`)
                }}
              >
                <DiscAlbum className="size-5" color="var(--primary)" />
                <span>Go to album</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center gap-2">
                <CircleUser className="size-5" color="var(--primary)" />
                <span>Go to artist</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => {
                    navigate(`/profile/${song.artistId._id}`)
                  }}
                >
                  <span>{song.artistId.fullName}</span>
                </DropdownMenuItem>
                {song.collaborationArtistIds && song.collaborationArtistIds.map(artist => (
                  <DropdownMenuItem
                    key={artist._id}
                    onClick={() => {
                      navigate(`/profile/${artist._id}`)
                    }}
                  >
                    <span>{artist.fullName}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex items-center gap-2"
              onClick={() => copyToClipboard(`listen?slug=${song.slug}`)}
            >
              <Copy className="size-5" color="var(--primary)" />
              <span>Copy link to song</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default SongOptions;