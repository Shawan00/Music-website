import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { resizeImage, showToast } from "@/helpers";
import { defaultImage } from "@/helpers/defaultImage";
import { uploadFile } from "@/services/Admin/uploadFileService";
import { createAlbum, updateAlbum } from "@/services/Client/albumService";
import { Edit, Plus } from "lucide-react";
import { useState } from "react";

function AlbumForm({ album = null, setAlbums }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: album?.title || "",
    thumbnail: album?.thumbnail || defaultImage,
    description: album?.description || ""
  })

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
        thumbnail: album.thumbnail || defaultImage
      }));
    }
  }

  const handleSubmit = async () => {
    const res = album ? await updateAlbum(album._id, formData) : await createAlbum(formData);
    if (res.status === 200 || res.status === 201) {
      showToast(res.data.message, "success");
      setAlbums(prev => {
        return album ? prev.map(item => item._id === album._id ? res.data.album : item) : [res.data.album, ...prev];
      })
      setDialogOpen(false);
    } else {
      showToast(res.data.message, "error");
    }
  }

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          {album ? (
            <Button variant="outline">
              <Edit/> Edit
            </Button>
          ) : (
            <Button>
              <Plus /> New Album
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>{album ? "Edit Album" : "New Album"}</DialogTitle>
          </DialogHeader>
          <form action={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 max-h-[60vh] overflow-y-auto">
              <label className="w-full sm:w-fit">
                <span>Cover photo</span>
                <input
                  name="thumbnail"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <div className="size-40 rounded-sm overflow-hidden relative group cursor-pointer mx-auto">
                  {formData.thumbnail ? (
                    <>
                      <img
                        src={resizeImage(formData.thumbnail, 160)}
                        alt="Thumbnail"
                        className="w-full aspect-square object-cover group-hover:brightness-65"
                      />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Edit className="size-6" />
                      </div>
                    </>
                  ) : (
                    <div className="size-full bg-muted flex items-center justify-center pointer-events-none">
                      <Skeleton className="size-full rounded-sm" />
                    </div>
                  )}
                </div>
              </label>
              <div className="w-full flex flex-col gap-1.5 sm:gap-3">
                <label className="w-full">
                  <span>Title</span>
                  <input
                    name="title"
                    type="text"
                    defaultValue={formData.title}
                    onBlur={handleChange}
                    className="w-full"
                    required
                  />
                </label>
                <label className="w-full">
                  <span>Description</span>
                  <textarea
                    name="description"
                    defaultValue={formData.description}
                    onBlur={handleChange}
                    className="w-full"
                    rows={5}
                  />
                </label>
              </div>
            </div>
            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <SubmitButton 
                title={album ? "Save changes" : "Create"} 
                isDisabled={!formData.thumbnail}
              />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AlbumForm;