import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { defaultImage } from "@/helpers/defaultImage";
import { postGenre } from "@/services/Admin/genreService";
import { uploadFile } from "@/services/Admin/uploadFileService";
import { useState } from "react";

function GenreForm({ defaultValues, sendResponseToParent }) {
  const [formData, setFormData] = useState({
    title: defaultValues?.title || "",
    thumbnail: defaultValues?.thumbnail || defaultImage,
    description: defaultValues?.description || ""
  });
  const [thumbnailPreview, setThumbnailPreview] = useState(defaultValues?.thumbnail || null);
  const [pending, setPending] = useState(false);

  const handleFileUpload = async (e) => { //upload lên cloudinary và lấy về url
    const file = e.target.files[0];
    if (file) {
      setPending(true);
      const upploadResponse = await uploadFile(file);
      if (upploadResponse.status === 200) {
        const url = upploadResponse.data.secure_url;
        setThumbnailPreview(url);
        setFormData(prev => ({
          ...prev,
          thumbnail: url
        }));
      } else {
        sendResponseToParent({
          type: 'error',
          message: "Error uploading file",
        });
      }
      setPending(false);
    }
  }

  const handleChange = (e) => { // Cập nhật formData khi người dùng nhập liệu
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async () => { // Gửi dữ liệu lên server
    if (defaultValues) {
      console.log("Update genre", formData);
    } else {
      const response = await postGenre(formData);
      if (response.data.code === 200) {
        sendResponseToParent({
          type: 'success',
          message: response.data.message || 'Create/Update genre successfully!',
        });
      } else {
        sendResponseToParent({
          type: 'error',
          message: response.data.message || 'Failed to create/update genre!',
        });
      }
    }

  }

  return (
    <>
      <div className="overflow-auto max-h-[70vh]">
        <form action={handleSubmit}>
          <label>
            <span>Title <span style={{ color: 'rgb(255, 0, 0)' }}>*</span></span>
            <input
              type='text'
              placeholder='Title'
              name='title'
              onBlur={handleChange}
              defaultValue={defaultValues?.title || ''}
              required
            ></input>
          </label>
          <label>
            <span>Thumbnail</span>
            <Input
              type='file'
              name='thumbnail'
              onChange={handleFileUpload}
              accept="image/*"
            ></Input>
            {thumbnailPreview && (
              <div className="size-22 rounded-sm overflow-hidden border mt-2">
                <img
                  src={thumbnailPreview}
                  alt='Uploaded'
                  className="w-full object-cover aspect-square"
                ></img>
              </div>
            )}
            {pending && <Skeleton className="size-22 rounded-sm mt-2" />}
          </label>
          <label>
            <span>Description</span>
            <textarea
              rows={4}
              placeholder='Description'
              name='description'
              onBlur={handleChange}
              defaultValue={defaultValues?.description || ''}
            ></textarea>
          </label>

          <SubmitButton className="mt-5 ml-auto flex" isDisabled={pending} />
        </form>
      </div>
    </>
  );
}

export default GenreForm