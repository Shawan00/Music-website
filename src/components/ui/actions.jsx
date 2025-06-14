import { Ellipsis, EllipsisVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from './dropdown-menu'

import { memo } from "react";

function Actions({vertical, song, setDeleteSongId, setUpdateSong}) {
  return (
    <div className="flex items-center justify-between w-fit">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full p-1 transition-all duration-300 hover:bg-muted">
            {vertical ? <EllipsisVertical /> : <Ellipsis />}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className='w-50'
          align="end"
          sideOffset={5}
        >
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => setUpdateSong(song)}
              className='cursor-pointer'
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className='text-destructive cursor-pointer'
              onClick={() => setDeleteSongId(song._id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  )
}

export default memo(Actions)