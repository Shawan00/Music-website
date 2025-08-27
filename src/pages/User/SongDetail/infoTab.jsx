import { useTheme } from "@/components/theme/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateToString, formatNumberWithDots } from "@/helpers";
import { defaultBackgroundSong, defaultBackgroundSongLight } from "@/helpers/defaultImage";
import { Link } from "react-router-dom";

function InfoTab({ song }) {
  const { theme } = useTheme()
  const defaultBg = theme === "dark" ? defaultBackgroundSong : defaultBackgroundSongLight
  const backgroundStyle = {
    backgroundImage: `url(${song?.background || defaultBg})`
  };

  return (
    <>
      <div className="px-[20%] py-13 rounded-lg mask-x-from-85% mask-x-to-100% mask-y-from-92% mask-y-to-100% bg-no-repeat bg-cover bg-center relative"
        style={backgroundStyle}
      >
        <div className="overlay z-1"></div>
        <div className="gap-4 relative z-5">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col items-center justify-center size-22 bg-[var(--blue-bg)] text-primary rounded-[50%]">
                <span className="font-bold text-3xl">#1</span>
                <span>Peak Pos.</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-4xl">{formatNumberWithDots("1098146")}</span>
                <span className="font-medium text-muted-foreground">Streams</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-4xl">{formatNumberWithDots("27146")}</span>
                <span className="font-medium text-muted-foreground">Listeners</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-4xl">{formatNumberWithDots(song.like)}</span>
                <span className="font-medium text-muted-foreground">Likes</span>
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
                <div className="flex flex-col items-center w-fit gap-1">
                  <Avatar className="size-25">
                    <AvatarImage src={song.artist?.avatar} />
                    <AvatarFallback className="text-4xl">P</AvatarFallback>
                  </Avatar>
                  <Link
                    className="font-semibold hover:underline"
                  >Pháo
                  </Link>
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