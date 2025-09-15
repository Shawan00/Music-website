import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dot, Edit, MoreHorizontal, Play, Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import EditPlaylist from "./edit";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DeletePlaylist from "./delete";
import NotFound from "@/pages/Error/404NotFound";
import { useContext, useEffect, useState } from "react";
import { followPlaylist, getPlaylistBySlug } from "@/services/Client/playlistService";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthContext } from "@/context/auth.context";
import { playPlaylist } from "@/features/playerControl/playerControlSlice";
import { Button } from "@/components/ui/button";
import SongTable from "@/components/User/SongTable";
import { getAvatarFallback, resizeImage, showToast } from "@/helpers";

function PlaylistDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const { user, setUser } = useContext(AuthContext);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const res = await getPlaylistBySlug(slug);
      if (res.status === 200) {
        setCurrentPlaylist(res.data.playlist);
        document.title = `${res.data.playlist.title} - Playlist`;
      } else {
        setCurrentPlaylist("not found");
      }
    }
    fetchPlaylists();
  }, [slug])

  if (!currentPlaylist) {
    return (
      <>
        <Skeleton className="w-full h-53 mt-4" />
      </>
    )
  }

  if (currentPlaylist === "not found") {
    return <NotFound />;
  }

  const isFollowing = () => {
    if (!user) return false;
    return user.userInfo.playlistsFollowed.includes(currentPlaylist._id);
  }

  const isOwnPlaylist = () => {
    if (!user) return false;
    return user.userInfo._id === currentPlaylist.idUser._id;
  }

  const handleFollowPlaylist = async () => {
    if (!user) {
      showToast("Please login to follow playlist", "error");
      return;
    }
    setFollowing(true);
    const res = await followPlaylist(currentPlaylist._id);
    if (res.status === 200) {
      showToast(res.data.message, "success");
      if (res.data.message === "Unfollow playlist successfully") {
        const newUserInfo = {
          ...user.userInfo,
          playlistsFollowed: user.userInfo.playlistsFollowed.filter(id => id !== currentPlaylist._id)
        }
        setUser(prev => ({
          ...prev,
          userInfo: newUserInfo
        }));
        localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
      } else {
        const newUserInfo = {
          ...user.userInfo,
          playlistsFollowed: [...user.userInfo.playlistsFollowed, currentPlaylist._id]
        }
        setUser(prev => ({
          ...prev,
          userInfo: newUserInfo
        }));
        localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
      }
    } else {
      showToast("Failed to follow playlist", "error");
    }
    setFollowing(false);
  }

  return (
    <>
      <section className="flex gap-3 sm:gap-6 my-4 p-5 bg-linear-to-b from-[var(--green-bg)] to-background rounded-t-lg">
        <div className="w-[130px] md:w-[200px] rounded-xs overflow-hidden flex items-center justify-center justify-center">
          <img
            src={resizeImage(currentPlaylist.thumbnail, 200)}
            alt={currentPlaylist.title}
            className="w-full aspect-square object-cover"
          />
        </div>
        <div className="self-end flex flex-col gap-1 sm:gap-3 flex-1">
          <p className="capitalize font-semibold text-xs sm:text-base">{currentPlaylist.status} Playlist</p>
          <h1 className="line-clamp-1 xl:leading-11.5">{currentPlaylist.title}</h1>
          <p className="text-sm sm:text-base line-clamp-1">{currentPlaylist.description}</p>
          <div className="flex items-center flex-wrap gap-1 sm:gap-2">
            <Avatar>
              <AvatarImage
                src={resizeImage(currentPlaylist.idUser.avatar || "", 40)}
                alt={currentPlaylist.idUser.fullName}
              />
              <AvatarFallback>{getAvatarFallback(currentPlaylist.idUser.fullName)}</AvatarFallback>
            </Avatar>
            <Link className="font-medium hover:underline"
              to={`/profile/${currentPlaylist.idUser._id}`}
            >{currentPlaylist.idUser.fullName}</Link>
            <Dot />
            <p>{currentPlaylist.songs.length} songs</p>
            {user && user.userInfo._id === currentPlaylist.idUser._id ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button type="button">
                    <MoreHorizontal />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" >
                  <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogTrigger asChild>
                      <DropdownMenuItem
                        className="flex items-center gap-2"
                        onSelect={(e) => e.preventDefault()}
                      >
                        <Edit /> <span>Edit</span>
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <EditPlaylist
                      playlist={currentPlaylist}
                      setEditDialogOpen={setEditDialogOpen}
                    />
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <DropdownMenuItem
                        className="flex items-center gap-2"
                        variant="destructive"
                        onSelect={(e) => e.preventDefault()}
                      >
                        <Trash color="var(--destructive)" /> <span>Delete</span>
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DeletePlaylist playlist={currentPlaylist} />
                  </Dialog>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant={isFollowing() ? "outline" : "default"}
                  onClick={handleFollowPlaylist}
                  className="ml-2 rounded-full"
                  disabled={following}
                >
                  {following ? isFollowing() ? "Unfollowing..." : "Following..." : isFollowing() ? "Unfollow" : "Follow"}
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="px-5 flex items-center gap-5 mb-5">
        <button className="p-3 sm:p-4 rounded-full bg-[var(--green-bg)]"
          onClick={() => {
            dispatch(playPlaylist(currentPlaylist.songs))
          }}
        >
          <Play fill="var(--secondary)" color="var(--secondary)" />
        </button>
      </section>

      {isOwnPlaylist() ? (
        <SongTable
          songs={currentPlaylist.songs}
          currentPlaylistId={currentPlaylist._id}
          setCurrentPlaylist={setCurrentPlaylist}
        />
      ) : (
        <SongTable songs={currentPlaylist.songs}/>
      )}

    </>
  )
}

export default PlaylistDetail;