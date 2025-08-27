import { resizeImage } from "@/helpers";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "./ProgressBar";
import { Pause, Play, SkipBack, SkipForward, Heart, X, Volume2, Volume1, Volume, MonitorPlay, ListMusic, EllipsisVertical, Repeat2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { playNextSong, playPrevSong, removeSong } from "@/features/playerControl/playerControlSlice";
import ElasticSlider from "@/components/ui/ElasticSlider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Queue from "../Queue";
import LikeSong from "./likeSong";

function PlayerControl() {
  const song = useSelector(state => state.playerControl.song);
  const prevSongs = useSelector(state => state.playerControl.playedHistory);
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [enableRepeat, setEnableRepeat] = useState(false);
  const [volume, setVolume] = useState(30);
  const location = useLocation()
  const navigate = useNavigate()

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
        dispatch(playNextSong())
      }

      const prevSong = () => {
        dispatch(playPrevSong());
      }

      navigator.mediaSession.setActionHandler('nexttrack', nextSong);
      navigator.mediaSession.setActionHandler('previoustrack', prevSong);

    }
  }, [song, dispatch]);

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

  const VolumeIcon = () => {
    if (volume === 100) return <Volume2 />
    if (volume === 0) return <Volume />
    return <Volume1 />
  }

  return (
    <>
      <div className="player-control" >
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
              <EllipsisVertical strokeWidth={1.5} />
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-around gap-1">
            <div className="inner-button flex gap-4 items-center justify-center">
              <LikeSong song={song} />

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="active:text-[var(--logo-color)] active:[&>svg]:fill-[var(--logo-color)] disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                      dispatch(playPrevSong())
                    }}
                    disabled={prevSongs.length === 0}
                  >
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
                    className="border-2 border-primary p-2 rounded-full hover:border-[var(--logo-color)] hover:text-[var(--logo-color)] hover:[&>svg]:fill-[var(--logo-color)] transition-colors duration-300"
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
                  <button
                    className="active:text-[var(--logo-color)] active:[&>svg]:fill-[var(--logo-color)]"
                    onClick={() => dispatch(playNextSong())}
                  >
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
                  <button onClick={() => toggleRepeat()} className="active:text-[var(--logo-color)]">
                    <Repeat2
                      strokeWidth={1.5}
                      color={enableRepeat ? "var(--logo-color)" : "var(--primary)"}
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
            <Tooltip>
              <TooltipTrigger>
                <Link to={`/listen?slug=${song.slug}`}
                  className={`flex-shrink-0 ${location.pathname.includes('/listen') ? 'text-[var(--logo-color)]' : ''}`}
                >
                  <MonitorPlay
                    strokeWidth={1.75}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Now playing view</p>
              </TooltipContent>
            </Tooltip>

            <Queue />
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
                  if (location.pathname.includes('/listen/')) {
                    navigate("/")
                  }
                  dispatch(removeSong())
                }}>
                  <X className="size-4 hover:text-destructive" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Stop</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

      </div>
    </>
  );
}

export default PlayerControl