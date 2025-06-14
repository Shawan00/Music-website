import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function UpdateSong({ song, setSong, onReload }) {
  console.log(!!song)
  return (
    <>
      <Dialog open={!!song} onOpenChange={(open) => !open && setSong(null)}>
        <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Update Song</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <SubmitButton />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UpdateSong;