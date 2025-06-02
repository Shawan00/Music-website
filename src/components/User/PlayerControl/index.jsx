import { resizeImage } from "@/helpers";
import { defaultImage } from "@/helpers/defaultImage";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "./ProgressBar";
import { Pause, Play, Repeat, SkipBack, SkipForward, Heart, X, Volume2, Volume1, Volume, MonitorPlay, ListMusic, EllipsisVertical, Repeat2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { removeSong } from "@/features/playerControl/playerControlSlice";
import ElasticSlider from "@/components/ui/ElasticSlider";
import { Link } from "react-router-dom";

function PlayerControl() {
  const song = useSelector(state => state.playerControl.song);
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [enableRepeat, setEnableRepeat] = useState(false);
  const [volume, setVolume] = useState(30);

  const togglePlay = () => { //gọi hàm từ component con điều kiển play/pause
    setIsPlaying(audioRef.current.togglePlay());
  }

  const toggleRepeat = () => { //gọi hàm từ component con điều kiển repeat
    setEnableRepeat(audioRef.current.toggleRepeat());
  }

  useEffect(() => {
    //Create media session
    if (!song) {
      return
    };

    setEnableRepeat(audioRef.current.audioLoopState());

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: song.title,
        artist: song.artist || "Unknow",
        album: song.album || "Unknow",
        artwork: [
          {
            src: song.thumbnail,
          }
        ]
      })

      const nextSong = () => {
        console.log("next song")
      }

      const prevSong = () => {
        console.log("prevsong");
      }

      navigator.mediaSession.setActionHandler('nexttrack', nextSong);
      navigator.mediaSession.setActionHandler('previoustrack', prevSong);

    }
  }, [song]);

  // Clear media session
  const clearMediaSession = () => {
    audioRef.current.cleanup()
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
      navigator.mediaSession.setActionHandler('nexttrack', null);
      navigator.mediaSession.setActionHandler('previoustrack', null);
      navigator.mediaSession.playbackState = "none";
    }
  }

  if (!song) return null;

  //background là ảnh bị mờ của song.background
  const backgroundStyle = {
    backgroundImage: `url(${song?.background || defaultImage})`
  };

  const VolumeIcon = () => {
    if (volume === 100) return <Volume2 />
    if (volume === 0) return <Volume />
    return <Volume1 />
  }

  return (
    <>
      <div className="player-control" style={backgroundStyle}>
        <div className="glass-background flex items-center justify-between">
          <div className="inner-rounded-thumbnail mr-3">
            <img
              src={resizeImage(song.thumbnail, 80)}
              alt={song.title}
              className="rounded-thumbnail animation-spin"
              style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}>
            </img>
          </div>
          <div className="flex items-center gap-2 w-40">
            <div className="inner-title">
              <span className="song-name">{song.title}</span>
              <div className="song-artist">{song.artist ? (<>{
                song.artist.map((item, index) => (
                  <div key={index} className="artist-item">
                    <Link>{item}</Link>
                  </div>
                ))
              }</>) : (<>
                Unknow
              </>)}</div>
            </div>
            <div className="options">
              <EllipsisVertical />
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-around gap-1">
            <div className="inner-button flex gap-4 items-center justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button>
                    <Heart
                      strokeWidth={1.5}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Like</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="active:text-[var(--green-highlight)] active:[&>svg]:fill-[var(--green-highlight)]">
                    <SkipBack
                      strokeWidth={1.5}
                      fill="var(--primary)"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Previous</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="border border-primary p-2 rounded-full hover:border-[var(--green-highlight)] hover:text-[var(--green-highlight)] hover:[&>svg]:fill-[var(--green-highlight)] transition-colors duration-300"
                    onClick={togglePlay}
                  >
                    {isPlaying ?
                      <Pause
                        fill="var(--primary)"
                        className="transition-colors duration-300"
                      /> :
                      <Play
                        fill="var(--primary)"
                        className="transition-colors duration-300"
                      />}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isPlaying ? "Pause" : "Play"}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="active:text-[var(--green-highlight)] active:[&>svg]:fill-[var(--green-highlight)]">
                    <SkipForward
                      strokeWidth={1.5}
                      fill="var(--primary)"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Next</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={() => toggleRepeat()} className="active:text-[var(--green-highlight)]">
                    <Repeat2
                      strokeWidth={1.5}
                      color={enableRepeat ? "var(--green-highlight)" : "var(--primary)"}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{enableRepeat ? "Disable repeat" : "Enable repeat"}</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <ProgressBar
              src={song.audio}
              volume={volume}
              ref={audioRef}
              setPlayingState={setIsPlaying}
            />
          </div>
          <div className="flex gap-5 items-center overflow-hidden">
            <div className="flex-shrink-0">
              <MonitorPlay />
            </div>
            <div className="flex-shrink-0">
              <ListMusic />
            </div>
            <ElasticSlider
              leftIcon={<><VolumeIcon /></>}
              rightIcon={<><Volume2 color="transparent" /></>}
              setVolume={setVolume}
            />
          </div>
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => {
                  clearMediaSession()
                  dispatch(removeSong())
                }}>
                  <X className="size-3 hover:text-destructive" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Close</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

      </div>
    </>
  );
}

export default PlayerControl