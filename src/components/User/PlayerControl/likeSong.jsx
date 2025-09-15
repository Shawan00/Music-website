import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AuthContext } from "@/context/auth.context";
import { showToast } from "@/helpers";
import { likeSong } from "@/services/Client/songService";
import { Heart } from "lucide-react";
import { useContext, useState } from "react";

function LikeSong({ song }) {
  const {user, setUser} = useContext(AuthContext);
  const [pending, setPending] = useState(false);

  const isLiked = () => {
    return user?.userInfo.songsLiked.includes(song._id)
  }

  const handleLike = async () => {
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
        setUser(newUser)
        localStorage.setItem("userInfo", JSON.stringify(newUser.userInfo))
      } else {
        const newUser = {
          ...user,
          userInfo: {
            ...user.userInfo,
            songsLiked: user.userInfo.songsLiked.filter(id => id !== song._id)
          }
        }
        setUser(newUser)
        localStorage.setItem("userInfo", JSON.stringify(newUser.userInfo))
      }
    } else {
      showToast(res.data.message, "error")
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button onClick={handleLike} disabled={pending}
          className="disabled:opacity-50"
        >
          <Heart
            strokeWidth={1.5}
            fill={isLiked() ? "var(--logo-color)" : "var(--primary)"}
            color={isLiked() ? "var(--logo-color)" : "var(--primary)"}
            className="size-5 lg:size-6"
          />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isLiked() ? "Unlike" : "Like"}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default LikeSong;