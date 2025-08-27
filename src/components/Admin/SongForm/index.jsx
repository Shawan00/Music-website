import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { defaultImage } from "@/helpers/defaultImage";
import { createSong, updateSong } from "@/services/Admin/songService";
import { uploadFile } from "@/services/Admin/uploadFileService";
import { useState } from "react";

function SongForm({ defaultValues, sendResponseToParent }) {
  const initialFormData = {
    title: defaultValues?.title || null,
    thumbnail: defaultValues?.thumbnail || defaultImage,
    background: defaultValues?.background || null,
    description: defaultValues?.description || null,
    lyrics: defaultValues?.lyrics || null,
    audio: defaultValues?.audio || null,
    genre: defaultValues?.genre || null
  }

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [backgroundPreview, setBackgroundPreview] = useState(null);
  const [pending, setPending] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => { //cập nhật dữ liệu khi người dùng nhập vào
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileUpload = async (e) => { // upload lên cloudinary và lấy về url
    const { name, files } = e.target;
    if (!files[0]) {
      return;
    }
    setPending(true);
    const res = await uploadFile(files[0]);
    const url = res.data.secure_url;
    setFormData(prev => ({
      ...prev,
      [name]: url
    }));
    if (name === 'thumbnail') {
      setThumbnailPreview(url);
    }
    if (name === 'background') {
      setBackgroundPreview(url);
    }
    setPending(false);
  }

  const handleSubmit = async () => { // gửi dữ liệu lên server
    const response = defaultValues ? await updateSong(defaultValues._id, formData) : await createSong(formData);
    if (response.status === 200) {
      clearPreviews();
      sendResponseToParent('success');
    } else {
      sendResponseToParent('error', response.data.message);
    }
  }

  const clearPreviews = () => {
    setBackgroundPreview(null);
    setThumbnailPreview(null);
    setFormData(initialFormData);
  }

  return (
    <>
      <div className='overflow-auto max-h-[70vh]'>
        <form action={handleSubmit}>
          <label>
            <span>Title</span>
            <input
              type='text'
              name='title'
              onBlur={handleChange}
              defaultValue={initialFormData.title}
              required
            ></input>
          </label>

          <div className='grid md:grid-cols-2 gap-5 mt-5'>
            <label>
              <span>Audio</span>
              <Input
                type='file'
                name='audio'
                onChange={handleFileUpload}
                accept='audio/*'
              ></Input>
            </label>
            <label>
              <span>Lyrics</span>
              <Input
                type='file'
                name='lyrics'
                onChange={handleFileUpload}
                accept='.lrc'
              ></Input>
            </label>
            <label>
              <span>Thumbnail</span>
              <Input
                type='file'
                name='thumbnail'
                onChange={handleFileUpload}
                accept="image/*"
              ></Input>
              {thumbnailPreview && (<img src={thumbnailPreview} alt='Uploaded' width='80px'></img>)}
            </label>
            <label>
              <span>Background</span>
              <Input
                type='file'
                name='background'
                onChange={handleFileUpload}
                accept='image/*'
              ></Input>
              {backgroundPreview && (<img src={backgroundPreview} alt='Uploaded' width='80px'></img>)}
            </label>
          </div>
          <label className='mt-5'>
            <span>Description</span>
            <textarea 
              rows={4} 
              name='description' 
              onBlur={handleChange}
              defaultValue={initialFormData.description}
            ></textarea>
          </label>
          <SubmitButton className="mt-5 ml-auto flex" isDisabled={pending}/>
        </form>
      </div>
    </>
  )
}

export default SongForm;