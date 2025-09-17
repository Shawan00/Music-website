import { resizeImage } from "@/helpers";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "./ProgressBar";
import { Pause, Play, SkipBack, SkipForward, X, Volume2, Volume1, Volume, MonitorPlay, Repeat2, ChevronUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { playNextSong, playPrevSong, removeSong, setNextSongs } from "@/features/playerControl/playerControlSlice";
import ElasticSlider from "@/components/ui/ElasticSlider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Queue from "../Queue";
import LikeSong from "./likeSong";
import SongOptions from "../SongOptions";
import ArtistUrl from "../ArtistUrl";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsTablet } from "@/hooks/use-tablet";
import { getNextSongs } from "@/services/Client/songService";

function PlayerControl() {
  const tablet = useIsTablet()
  const playerControl = useSelector(state => state.playerControl);
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
    if (tablet) {
      setVolume(100)
    } else {
      setVolume(30)
    }
  }, [tablet])

  useEffect(() => {
    if (playerControl.nextSongs.length === 0 && playerControl.song) {
      const fetchNextSongs = async () => {
        const response = await getNextSongs({
          songIds: [playerControl.song._id, ...playerControl.playedHistory.map(song => song._id)],
          limit: 10
        })
        console.log(response)
        if (response.status === 200) {
          dispatch(setNextSongs(response.data.recommendations))
        } else {
          setTimeout(() => {
            fetchNextSongs()
          }, 60000)
        }
      }
      fetchNextSongs()
    }
  }, [dispatch, playerControl])

  useEffect(() => {
    //Create media session
    if (!playerControl.song) {
      return
    };

    const getArtistsName = () => {
      const firstArtist = playerControl.song.artistId.fullName;
      const otherArtists = playerControl.song.collaborationArtistIds.map(artist => artist.fullName).join(", ");
      return otherArtists.length > 0 ? `${firstArtist}, ${otherArtists}` : firstArtist;
    }

    if (location.pathname.includes('/listen')) {
      navigate(`/listen?slug=${playerControl.song.slug}`)
    }

    setEnableRepeat(audioRef.current.audioLoopState());

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: playerControl.song.title,
        artist: getArtistsName() || "Unknow",
        album: playerControl.song.albumId?.title || "Unknow",
        artwork: [
          {
            src: playerControl.song.thumbnail,
          }
        ]
      })

      const nextSong = () => {
        audioRef.current.handleSendPlayedHistory()
        dispatch(playNextSong())
      }

      const prevSong = () => {
        audioRef.current.handleSendPlayedHistory()
        dispatch(playPrevSong());
      }

      navigator.mediaSession.setActionHandler('nexttrack', nextSong);
      if (playerControl.playedHistory.length > 0) {
        navigator.mediaSession.setActionHandler('previoustrack', prevSong);
      } else {
        navigator.mediaSession.setActionHandler('previoustrack', null);
      }
    }
  }, [playerControl, dispatch, navigate, location.pathname]);

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

  if (!playerControl.song) return null;

  const VolumeIcon = () => {
    if (volume === 100) return <Volume2 />
    if (volume === 0) return <Volume />
    return <Volume1 />
  }

  return (
    <>
      <div className="player-control" >
        <div className="glass-background flex items-center justify-between">
          <div className="inner-rounded-thumbnail mr-3 hidden lg:block">
            <img
              src={resizeImage(playerControl.song.thumbnail, 80)}
              alt={playerControl.song.title}
              className="rounded-thumbnail animation-spin"
              style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}>
            </img>
          </div>
          <div className="hidden lg:flex items-center gap-2 w-35 xl:w-40">
            <div className="inner-title truncate text-ellipsis">
              <span className="song-name">{playerControl.song.title}</span>
              <ArtistUrl artistId={playerControl.song.artistId} collaborationArtistIds={playerControl.song.collaborationArtistIds} />
            </div>
            <div className="options">
              <SongOptions song={playerControl.song} />
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-around gap-1">
            <div className="inner-button flex gap-4 items-center justify-center">
              <LikeSong song={playerControl.song} />

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="active:text-[var(--logo-color)] active:[&>svg]:fill-[var(--logo-color)] disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                      audioRef.current.handleSendPlayedHistory()
                      dispatch(playPrevSong())
                    }}
                    disabled={playerControl.playedHistory.length === 0}
                  >
                    <SkipBack
                      strokeWidth={1.5}
                      fill="var(--primary)"
                      className="size-5 lg:size-6"
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
                        className="transition-colors duration-300 size-5 lg:size-6"
                      /> :
                      <Play
                        fill="var(--primary)"
                        className="transition-colors duration-300 size-5 lg:size-6"
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
                    onClick={() => {
                      audioRef.current.handleSendPlayedHistory()
                      dispatch(playNextSong())
                    }}
                  >
                    <SkipForward
                      strokeWidth={1.5}
                      fill="var(--primary)"
                      className="size-5 lg:size-6"
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
                      className="size-5 lg:size-6"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{enableRepeat ? "Disable repeat" : "Enable repeat"}</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <ProgressBar
              id={playerControl.song._id}
              src={playerControl.song.audio}
              volume={volume}
              ref={audioRef}
              setPlayingState={setIsPlaying}
            />
          </div>

          {/* For tablet & mobile */}
          <div className="hidden lg:flex gap-3 xl:gap-4 items-center overflow-hidden">
            <Tooltip>
              <TooltipTrigger>
                <Link to={`/listen?slug=${playerControl.song.slug}`}
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
              rightIcon={<></>}
              defaultValue={volume}
              setVolume={setVolume}
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => {
                  audioRef.current.handleSendPlayedHistory()
                  clearMediaSession()
                  if (location.pathname.includes('/listen')) {
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

          <Sheet>
            <SheetTrigger className="block lg:hidden">
              <ChevronUp className="ml-3 sm:ml-0 size-5 text-muted-foreground" />
            </SheetTrigger>
            <SheetContent side="bottom" aria-describedby={undefined}
              className="p-5 space-y-4"
            >
              <div className="w-full flex flex-col items-center gap-2">
                <div className="w-3/5 sm:w-1/3 rounded-full overflow-hidden">
                  <img
                    src={resizeImage(playerControl.song.thumbnail, 250)}
                    alt={playerControl.song.title}
                    className="w-full aspect-square object-cover"
                  />
                </div>
                <span className="text-base font-medium -mb-2">{playerControl.song.title}</span>
                <ArtistUrl artistId={playerControl.song.artistId} collaborationArtistIds={playerControl.song.collaborationArtistIds} />
              </div>
              <div className="flex-1 flex flex-col items-center justify-around gap-1">
                <div className="inner-button flex gap-4 items-center justify-center">
                  <Link to={`/listen?slug=${playerControl.song.slug}`}
                    className={`flex-shrink-0 ${location.pathname.includes('/listen') ? 'text-[var(--logo-color)]' : ''}`}
                  >
                    <MonitorPlay
                      strokeWidth={1.75}
                    />
                  </Link>
                  <LikeSong song={playerControl.song} />
                  <button
                    className="active:text-[var(--logo-color)] active:[&>svg]:fill-[var(--logo-color)] disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                      audioRef.current.handleSendPlayedHistory()
                      dispatch(playPrevSong())
                    }}
                    disabled={playerControl.playedHistory.length === 0}
                  >
                    <SkipBack
                      strokeWidth={1.5}
                      fill="var(--primary)"
                      className="size-5 lg:size-6"
                    />
                  </button>
                  <button
                    className="border-2 border-primary p-2 rounded-full hover:border-[var(--logo-color)] hover:text-[var(--logo-color)] hover:[&>svg]:fill-[var(--logo-color)] transition-colors duration-300"
                    onClick={togglePlay}
                  >
                    {isPlaying ?
                      <Pause
                        fill="var(--primary)"
                        className="transition-colors duration-300 size-5 lg:size-6"
                      /> :
                      <Play
                        fill="var(--primary)"
                        className="transition-colors duration-300 size-5 lg:size-6"
                      />}
                  </button>

                  <button
                    className="active:text-[var(--logo-color)] active:[&>svg]:fill-[var(--logo-color)]"
                    onClick={() => {
                      audioRef.current.handleSendPlayedHistory()
                      dispatch(playNextSong())
                    }}
                  >
                    <SkipForward
                      strokeWidth={1.5}
                      fill="var(--primary)"
                      className="size-5 lg:size-6"
                    />
                  </button>

                  <button onClick={() => toggleRepeat()} className="active:text-[var(--logo-color)]">
                    <Repeat2
                      strokeWidth={1.5}
                      color={enableRepeat ? "var(--logo-color)" : "var(--primary)"}
                      className="size-5 lg:size-6"
                    />
                  </button>

                  <Queue />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </>
  );
}

export default PlayerControl