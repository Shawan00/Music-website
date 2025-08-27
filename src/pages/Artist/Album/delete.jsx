import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { showToast } from "@/helpers";
import { deleteAlbum } from "@/services/Client/albumService";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";

function DeleteAlbum({ albumId, setAlbums }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const handleDelete = async () => {
    setPending(true);
    const res = await deleteAlbum(albumId);
    console.log(res);
    if (res.status === 200) {
      showToast(res.data.message, "success");
      setAlbums(prev => prev.filter(album => album._id !== albumId));
    } else {
      showToast(res.data.message, "error");
    }
    setPending(false);
    setDialogOpen(false);
  }

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive">
            <Trash /> Delete
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Delete Album</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this album? This action cannot be undone.
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

export default DeleteAlbum;