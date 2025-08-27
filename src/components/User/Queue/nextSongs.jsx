import { Skeleton } from "@/components/ui/skeleton"
import { playFromNextSongs } from "@/features/playerControl/playerControlSlice"
import { resizeImage } from "@/helpers"
import { Ellipsis } from "lucide-react"
import { useDispatch } from "react-redux"

function NextSongs({ nextSongs }) {
  const dispatch = useDispatch()

  if (nextSongs.length === 0) {
    return (
      <>
        <div className="w-full h-18 p-2 flex gap-2">
          <Skeleton className="size-[60px]" />
          <div className="flex flex-col gap-2 flex-1 justify-around">
            <Skeleton className="w-full h-4"/>
            <Skeleton className="w-full h-4"/>
          </div>
        </div>
        <div className="w-full h-18 p-2 flex gap-2">
          <Skeleton className="size-[60px]" />
          <div className="flex flex-col gap-2 flex-1 justify-around">
            <Skeleton className="w-full h-4"/>
            <Skeleton className="w-full h-4"/>
          </div>
        </div>
        <div className="w-full h-18 p-2 flex gap-2">
          <Skeleton className="size-[60px]" />
          <div className="flex flex-col gap-2 flex-1 justify-around">
            <Skeleton className="w-full h-4"/>
            <Skeleton className="w-full h-4"/>
          </div>
        </div>
        <div className="w-full h-18 p-2 flex gap-2">
          <Skeleton className="size-[60px]" />
          <div className="flex flex-col gap-2 flex-1 justify-around">
            <Skeleton className="w-full h-4"/>
            <Skeleton className="w-full h-4"/>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      {nextSongs.map((item, index) => (
        <div key={index}
          className="song-item p-2"
          onClick={() => dispatch(playFromNextSongs(index))}
        >
          <div className='image'>
            <img src={resizeImage(item.thumbnail, 60)} alt="thumbnail"></img>
          </div>
          <div className='info'>
            <span className='title'>{item.title}</span>
            <span className='artist'>artist</span>
          </div>
          <div>
            <Ellipsis strokeWidth={1.5} size={20} />
          </div>
        </div>
      ))}
    </>
  )
}

export default NextSongs