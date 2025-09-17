import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth.context";
import { showToast } from "@/helpers";
import { followArtist } from "@/services/Client/userArtistService";
import { useContext, useState } from "react";

function FollowArtist({ artistId }) {
  const { user, setUser } = useContext(AuthContext);
  const [pending, setPending] = useState(false);

  const isFollowed = () => {
    return user?.userInfo.artistsFollowed.includes(artistId);
  }

  const handleFollowArtist = async () => {
    if (!user) {
      showToast("Please login to follow artist", "error");
      return;
    }
    setPending(true);
    const res = await followArtist(artistId);
    if (res.status === 200) {
      showToast(res.data.message, "success");
      if (res.data.message === "Unfollow artist successfully") {
        const newUserInfo = {
          ...user.userInfo,
          artistsFollowed: user.userInfo.artistsFollowed.filter(id => id !== artistId)
        }
        setUser(prev => ({
          ...prev,
          userInfo: newUserInfo
        }));
        localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
      } else {
        const newUserInfo = {
          ...user.userInfo,
          artistsFollowed: [...user.userInfo.artistsFollowed, artistId]
        }
        setUser(prev => ({
          ...prev,
          userInfo: newUserInfo
        }));
        localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
      }
    } else {
      showToast("Failed to follow artist", "error");
    }
    setPending(false);
  }

  return (
    <Button
      variant={isFollowed() ? "outline" : "default"}
      className="ml-2 rounded-full"
      disabled={pending}
      onClick={handleFollowArtist}
    >
      {pending ? isFollowed() ? "Unfollowing..." : "Following..." : isFollowed() ? "Unfollow" : "Follow"}
    </Button>
  );
}

export default FollowArtist;