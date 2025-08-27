import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { showToast } from "@/helpers"
import { deleteSong } from "@/services/Admin/songService"
import { memo } from "react"

function DeleteSong({ songId, setSongId, onReload }) {

  const handleDelete = async () => {
    const response = await deleteSong(songId)
    if (response.status === 200) {
      showToast("Song deleted successfully!", 'success')
      onReload()
      setSongId(null)
    } else {
      showToast(response.data.message || "Failed to delete song", 'error')
    }
  }
  return (
    <>
      <Dialog open={!!songId} onOpenChange={(open) => !open && setSongId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Song</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this song? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default memo(DeleteSong)