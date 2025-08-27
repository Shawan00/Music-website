import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { showToast } from "@/helpers";
import { uploadFile } from "@/services/Admin/uploadFileService";
import { updatePlaylist } from "@/services/Client/playlistService";
import { Edit } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditPlaylist({ playlist, setEditDialogOpen }) {
  const [formData, setFormData] = useState({
    title: playlist.title,
    thumbnail: playlist.thumbnail,
    description: playlist.description,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        thumbnail: playlist.thumbnail
      }));
    }
  }

  const handleSubmit = async () => {
    const res = await updatePlaylist(playlist._id, formData);
    if (res.status === 200) {
      showToast("Playlist updated successfully", "success");
      navigate(`/playlist/${res.data.playlist.slug}`);
      setEditDialogOpen(false);
    } else {
      showToast(res.data.message || "Failed to update playlist", "error");
    }
  }

  return (
    <>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle className="text-xl font-medium">Edit Playlist</DialogTitle>
        <form action={handleSubmit}>
          <div className="w-full flex items-start gap-4">
            <label className="cursor-pointer relative group">
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

            <div className="flex-1 flex flex-col">
            <label>
              <span>Title</span>
              <input
                type="text"
                name="title"
                defaultValue={formData.title}
                onChange={handleChange}
              />
            </label>
              <label>
                <span>Description</span>
                <textarea
                  name="description"
                  defaultValue={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </label>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <SubmitButton title="Save changes" isDisabled={!formData.thumbnail}/>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  )
}

export default EditPlaylist;