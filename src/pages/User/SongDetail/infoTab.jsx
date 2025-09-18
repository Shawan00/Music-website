import { useTheme } from "@/components/theme/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateToString, formatNumberWithDots, getAvatarFallback, resizeImage } from "@/helpers";
import { defaultBackgroundSong, defaultBackgroundSongLight } from "@/helpers/defaultImage";
import { Link } from "react-router-dom";

function InfoTab({ song }) {
  const { theme } = useTheme()
  const defaultBg = theme === "dark" ? defaultBackgroundSong : defaultBackgroundSongLight
  const backgroundStyle = {
    backgroundImage: `url(${song?.background || defaultBg})`
  };
  console.log(song)

  return (
    <>
      <div className="px-[20%] py-13 rounded-lg mask-x-from-85% mask-x-to-100% mask-y-from-92% mask-y-to-100% bg-no-repeat bg-cover bg-center relative"
        style={backgroundStyle}
      >
        <div className="overlay z-1"></div>
        <div className="gap-4 relative z-5">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-row sm:flex-col items-center sm:items-start gap-2 sm:gap-6 lg:gap-10">
              <div className="flex flex-col items-center justify-center size-18 sm:size-22 bg-[var(--blue-bg)] text-primary rounded-[50%]">
                <span className="font-bold text-xl sm:text-3xl">#1</span>
                <span className="text-sm sm:text-base">Peak Pos.</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl sm:text-4xl">{formatNumberWithDots(song.playCount)}</span>
                <span className="font-medium text-muted-foreground text-sm sm:text-base">Streams</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl sm:text-4xl">{formatNumberWithDots(song.like)}</span>
                <span className="font-medium text-muted-foreground text-sm sm:text-base">Likes</span>
              </div>
            </div>
            <div className="main-info flex flex-col gap-4">
              <div className="text-muted-foreground">
                <p className="text-justify whitespace-pre-wrap">{song.description}</p>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">Release</span>
                <span className="text-sm">{formatDateToString(song.createdAt)}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xl font-bold">Artist</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
                  <Link to={`/profile/${song.artistId._id}`}
                    className="flex flex-col items-center w-full gap-1 group"
                  >
                    <Avatar className="w-full h-auto aspect-square">
                      <AvatarImage src={resizeImage(song.artistId.avatar || "", 150)} className="w-full h-auto" />
                      <AvatarFallback className="text-4xl">{getAvatarFallback(song.artistId.fullName)}</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold group-hover:underline truncate">
                      {song.artistId.fullName}
                    </p>
                  </Link>
                  {song.collaborationArtistIds && song.collaborationArtistIds.map((artist) => (
                    <Link to={`/profile/${artist._id}`}
                      className="flex flex-col items-center w-full gap-1 group"
                    >
                      <Avatar className="w-full h-auto aspect-square">
                        <AvatarImage src={resizeImage(artist.avatar || "", 150)} className="w-full h-auto" />
                        <AvatarFallback className="text-4xl">{getAvatarFallback(artist.fullName)}</AvatarFallback>
                      </Avatar>
                      <p className="font-semibold group-hover:underline truncate">
                        {artist.fullName}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InfoTab;