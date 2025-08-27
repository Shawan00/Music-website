import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { resizeImage } from "@/helpers"
import { Ellipsis, ListMusic } from "lucide-react"
import { useSelector } from "react-redux"
import NextSongs from "./nextSongs"
import History from "./history"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

function Queue() {
  const playerControl = useSelector(state => state.playerControl)

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex-shrink-0">
                <ListMusic strokeWidth={1.75} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Queue</p>
            </TooltipContent>
          </Tooltip>

        </SheetTrigger>
        <SheetContent aria-describedby={undefined}>
          <SheetHeader>
            <SheetTitle className="mb-0 px-2">Queue</SheetTitle>
          </SheetHeader>

          <div className="px-4 flex-1 overflow-auto">
            <History playedHistory={playerControl.playedHistory} />

            <h4 className="text-[var(--green-highlight)] font-bold px-2 mb-2">Now playing</h4>
            <div className="song-item bg-muted p-2 mb-5">
              <div className='image'>
                <img src={resizeImage(playerControl.song.thumbnail, 60)} alt="thumbnail"></img>
              </div>
              <div className='info'>
                <span className='title text-green-500'>{playerControl.song.title}</span>
                <span className='artist'>artist</span>
              </div>
              <div>
                <Ellipsis strokeWidth={1.5} size={20} />
              </div>
            </div>

            <h4 className="font-bold px-2 mb-2">Next songs</h4>
            <NextSongs nextSongs={playerControl.nextSongs} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default Queue