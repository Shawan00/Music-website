import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumberWithDots, getAvatarFallback, resizeImage } from "@/helpers";
import NotFound from "@/pages/Error/404NotFound";
import { getUserProfileById } from "@/services/Client/userArtistService";
import { BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Albums from "./albums";
import Songs from "./songs";
import { defaultBackgroundSong, defaultBackgroundSongLight } from "@/helpers/defaultImage";
import { useTheme } from "@/components/theme/theme-provider";
import PlaylistCard from "@/components/User/PlaylistCard";
import FollowArtist from "./follow";

function ProfileUser() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const { theme } = useTheme()

  useEffect(() => {
    document.title = `Profile`;
    const getArtist = async () => {
      const response = await getUserProfileById(id);
      if (response.status === 200) {
        document.title = `${response.data.user.fullName} - Profile`;
        setUserProfile(response.data);
      } else {
        setUserProfile("error");
      }
    }
    getArtist();
  }, [id])

  if (!userProfile) return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 my-4 p-5">
        <Skeleton className="size-30 sm:size-50 rounded-full" />
        <div className="space-y-3">
          <Skeleton className="w-full h-20" />
          <Skeleton className="w-full h-20" />
        </div>
      </div>
    </>
  )

  if (userProfile === "error") return (
    <NotFound />
  )

  const defaultBg = theme === "dark" ? defaultBackgroundSong : defaultBackgroundSongLight
  const backgroundStyle = {
    backgroundImage: `url(${userProfile?.user.avatar || defaultBg})`
  };

  return (
    <>
      <section className="flex flex-col sm:flex-row gap-3 sm:gap-6 my-4 p-5 bg-linear-to-b from-[var(--green-bg)]/30 to-background rounded-lg mb-5">
        <Avatar className="size-30 sm:size-50">
          <AvatarImage src={resizeImage(userProfile.user.avatar || "", 200)} />
          <AvatarFallback className="text-xl sm:text-4xl">{getAvatarFallback(userProfile.user.fullName)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex flex-col gap-2 sm:gap-3 sm:self-end">
          {userProfile.user.verifyArtist ? (
            <div className="flex items-center gap-1 text-green-600 dark:text-green-300">
              <BadgeCheck />
              <span>Verified Artist</span>
            </div>
          ) : (
            <p>User profile</p>
          )}
          <div className="flex items-center gap-2">
            <h1>{userProfile.user.fullName}</h1>
            {userProfile.user.verifyArtist && <FollowArtist artistId={userProfile.user._id} />}
          </div>
        </div>
      </section>

      {userProfile.user.verifyArtist && (
        <>
          <section className="mb-5">
            <h2>Latest release</h2>
            <Songs songs={userProfile.top5NewestSongs} />
          </section>
          <section className="mb-5">
            <h2>Albums</h2>
            <Albums albums={userProfile.albums} />
          </section>
          <section className="mb-5">
            <h2>About</h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 lg:gap-15">
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-6 py-3 sm:py-6">
                <div className="flex flex-col">
                  <span className="font-bold text-lg">{formatNumberWithDots("1098")}</span>
                  <span className="font-medium text-muted-foreground">Streams</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg">{formatNumberWithDots(userProfile.user.followCount)}</span>
                  <span className="font-medium text-muted-foreground">Followers</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg">{userProfile.user.country}</span>
                  <span className="font-medium text-muted-foreground">Country</span>
                </div>
              </div>

              <div className="flex-1 p-3 sm:p-6 bg-no-repeat bg-cover bg-center relative"
                style={backgroundStyle}>
                <div className="overlay z-1"></div>
                <p className="relative z-5 whitespace-pre-wrap">{userProfile.user.bio}</p>
              </div>
            </div>
          </section>
        </>
      )}
      <section className="mb-5">
        <h2>Public playlist of {userProfile.user.fullName}</h2>
        {userProfile.playlists.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
            {userProfile.playlists.map((playlist) => (
              <PlaylistCard key={playlist._id} playlist={playlist} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground  text-center">No public playlist</p>
        )}
      </section>
    </>
  )
}

export default ProfileUser;