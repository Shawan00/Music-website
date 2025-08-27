import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton";
import { showToast } from "@/helpers";
import { uploadFile } from "@/services/Admin/uploadFileService";
import { createPlaylist } from "@/services/Client/playlistService";
import { Edit, Plus } from "lucide-react";
import { useState } from "react";

function CreatePlaylist({ defaultThumbnail, setPlaylists }) {
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: defaultThumbnail,
    description: ""
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleFileUpload = async (e) => {
    const { files } = e.target;
    if (!files[0]) return;

    setFormData(prev => ({
      ...prev,
      thumbnail: null
    }))
    const res = await uploadFile(files[0]);
    
    if (res.status === 200) {
      setFormData(prev => ({
        ...prev,
        thumbnail: res.data.secure_url
      }));
    } else {
      showToast("Failed to upload Image", "error");
      setFormData(prev => ({
        ...prev,
        thumbnail: defaultThumbnail
      }));
    }
  }

  const handleSubmit = async () => {
    const res = await createPlaylist(formData);
    if (res.status === 201) {
      showToast("Playlist created successfully", "success");
      setPlaylists(prev => [...prev, res.data.playlist]);
      setFormData({
        title: "",
        thumbnail: defaultThumbnail,
        description: ""
      });
      setIsOpen(false);
    } else {
      showToast(res.data.message || "Failed to create playlist", "error");
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger onSelect={() => setIsOpen(true)}>
          <div className="px-1.5 mx-1.5 py-1 mt-1 text-sm rounded-sm flex items-center gap-1 cursor-pointer hover:bg-muted">
            <Plus /> New playlist
          </div>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="text-lg">New playlist</DialogTitle>
          </DialogHeader>
          <form action={handleSubmit}>
            <div className="w-full flex items-start gap-4">
              <label className={`cursor-pointer relative group ${formData.thumbnail ? '' : 'pointer-events-none'}`}>
                <input
                  type="file"
                  name="thumbnail"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                {formData.thumbnail ? (
                  <div className="size-30 rounded-sm overflow-hidden group-hover:brightness-65">
                    <img src={formData.thumbnail} alt="Playlist thumbnail"
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                ) : (
                  <div className="size-30 rounded-sm bg-muted flex items-center justify-center group-hover:brightness-65">
                    <Skeleton className="size-full" />
                  </div>
                )}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Edit className="size-6" />
                </div>
              </label>
              <div className="flex flex-col gap-2 flex-1">
              <label>
                <span>Title</span>
                <input
                  type="text"
                  name="title"
                  defaultValue={formData.title}
                  onBlur={handleChange}
                  required
                />
              </label>
              <label>
                <span>Description</span>
                <textarea
                  name="description"
                  defaultValue={formData.description}
                  onBlur={handleChange}
                  rows={4}
                />
              </label>
              </div>
            </div>
            <DialogFooter className={'mt-3'}>
              <DialogClose asChild>
                <Button variant="outline" type="button">Cancel</Button>
              </DialogClose>
              <SubmitButton title="Create" />
            </DialogFooter>
          </form>

        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreatePlaylist;