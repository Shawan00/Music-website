import { AuthContext } from "@/context/auth.context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import MyPlaylist from "./myPlaylist";
import FollowedPlaylist from "./followedPlaylist";

function Playlist() {
  const { user } = useContext(AuthContext);

  document.title = "Playlist - Music Project";

  if (!user) return (
    <div className="flex flex-col items-center justify-center h-full">
      <p>You need to log in to view your playlists.</p>
      <Link to="/login" className="bg-[var(--main-green)] font-medium p-3 rounded-sm mt-3">
        Go to Login
      </Link>
    </div>
  )

  return (
    <>
      <h2 className="mb-5">Your Playlist</h2>
      <MyPlaylist />

      <h2 className="mb-5">Your are following</h2>
      <FollowedPlaylist />
    </>
  )
}

export default Playlist;