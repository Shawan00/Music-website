import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { showToast } from "@/helpers";
import { deleteSong } from "@/services/Client/songService";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";

function DeleteSong({ song, setSongs }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const handleDelete = async () => {
    setPending(true);
    const res = await deleteSong(song._id);
    if (res.status === 200) {
      showToast("Delete song successfully", "success");
      setSongs(prev => prev.filter(prev => prev._id !== song._id));
      setDialogOpen(false);
    } else {
      if (res.status === 401) {
        showToast("Please login to delete song", "error");
      } else {
        showToast("Delete song failed", "error");
      }
    }
    setPending(false);
  }

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger>
          <Trash className="size-5 text-destructive" />
        </DialogTrigger>
        <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Delete Song</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <span className="font-semibold">{song.title}</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={pending}
            >
              {pending ? (
                <>
                  <Loader2 className='animate-spin' />
                  Deleting
                </>
              ) : (
                <>Delete</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DeleteSong;