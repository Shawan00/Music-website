import SongForm from "@/components/Admin/SongForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { showToast } from "@/helpers";

function UpdateSong({ song, setSong, onReload }) {

  const handleResponse = (type, message) => {
    if (type === 'success') {
      showToast(message || 'Song updated successfully!', type);
      onReload();
      setSong(null);
    } else {
      showToast(message || 'Failed to update song.', type);
    }
  }

  return (
    <>
      <Dialog open={!!song} onOpenChange={(open) => !open && setSong(null)}>
        <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Update Song</DialogTitle>
          </DialogHeader>

          <SongForm
            defaultValues={song}
            sendResponseToParent={handleResponse}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UpdateSong;