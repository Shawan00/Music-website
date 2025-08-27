import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { showToast } from "@/helpers";
import { deletePlaylist } from "@/services/Client/playlistService";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DeletePlaylist({ playlist }) {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  const handleDelete = async () => {
    setPending(true);
    const res = await deletePlaylist(playlist._id);
    if (res.status === 200) {
      showToast("Playlist deleted successfully", "success");
      navigate("/playlist");
    } else {
      showToast(res.data.message || "Failed to delete playlist", "error");
    }
    setPending(false);
  }

  return (
    <>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle className="text-xl font-medium">Delete Playlist</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete <span className="font-medium">{playlist.title}</span>? This action cannot be undone.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            type="submit" 
            variant="destructive"
            disabled={pending}
            onClick={handleDelete}
          >
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Deleting
              </>
            ) : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  )
}

export default DeletePlaylist;