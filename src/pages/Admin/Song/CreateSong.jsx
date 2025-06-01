import { memo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { uploadFile } from '../../../services/Admin/uploadFileService';
import { postSong } from '../../../services/Admin/songService';
import { useTheme } from '@/components/theme/theme-provider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/SubmitButton';
import { predictGenre } from '@/services/Admin/AIService';
import { defaultImage } from '@/helpers/defaultImage';
import { Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

function CreateSong(props) {
  const { onReload } = props;
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [backgroundPreview, setBackgroundPreview] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: defaultImage,
    background: "",
    description: "",
    lyrics: "",
    audio: "",
    genre: ""
  });
  const [genrePredict, setGenrePredict] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileUpload = async (e) => {
    const { name, files } = e.target;
    if (!files[0]) {
      return;
    }
    if (name === 'audio') {
      setGenrePredict("pending")
      const genre = await predictGenre(files[0])
      console.log(genre)
      if (genre.request.status === 200) {
        setGenrePredict({
          genre: genre.data.genre,
          confidence: genre.data.confidence
        })
      } else {
        setGenrePredict("Cannot predict genre")
      }
    }
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
    if (name === 'audio') {
      setAudioPreview(url);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await postSong(formData);
    if (response.data.code === 200) {
      toast.success('Create song successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
      setIsOpen(false);
      clearPreviews();
    } else {
      toast.error(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
    }
    onReload();
  }

  const clearPreviews = () => {
    setBackgroundPreview(null);
    setThumbnailPreview(null);
    setAudioPreview(null)
    setGenrePredict(null)
  }

  return (
    <>
      <ToastContainer />
      <Dialog open={isOpen} onOpenChange={setIsOpen}> 
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-lg flex items-center"
          >
            <Plus className='size-lg' /> New song
          </Button>
        </DialogTrigger>

        <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Create a new song</DialogTitle>
          </DialogHeader>
          <div className='overflow-auto max-h-[70vh]'>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Title <span style={{ color: 'rgb(255, 0, 0)' }}>*</span></span>
                <input
                  type='text'
                  name='title'
                  onBlur={handleChange}
                  required
                ></input>
              </label>
              <label className='mt-5'>
                <span>Audio <span style={{ color: 'rgb(255, 0, 0)' }}>*</span></span>
                <Input
                  type='file'
                  name='audio'
                  onChange={handleFileUpload}
                  accept='audio/*'
                  required
                ></Input>
              </label>
              {audioPreview && (<audio src={audioPreview} controls></audio>)}
              {genrePredict && (<>
                {typeof genrePredict === 'string' ? (<div className='flex gap-1'>
                  <Loader2 className='animate-spin' />
                  <span>{genrePredict}</span>
                </div>) : (<>
                  <label className='mt-5'>
                    <span>Predicted genre</span>
                    <input
                      type='text'
                      name='genre'
                      value={genrePredict.genre}
                      onChange={handleChange}
                    ></input>
                  </label>
                </>)}
              </>)}

              <div className='grid md:grid-cols-2 gap-5 mt-5'>
                <label>
                  <span>Thumbnail</span>
                  <Input type='file' name='thumbnail' onChange={handleFileUpload} accept="image/*"></Input>
                  {thumbnailPreview && (<img src={thumbnailPreview} alt='Uploaded' width='80px'></img>)}
                </label>
                <label>
                  <span>Background</span>
                  <Input type='file' name='background' onChange={handleFileUpload} accept='image/*'></Input>
                  {backgroundPreview && (<img src={backgroundPreview} alt='Uploaded' width='80px'></img>)}
                </label>
                <label>
                  <span>Lyrics</span>
                  <Input type='file' name='lyrics' onChange={handleFileUpload} accept='.lrc'></Input>
                </label>
              </div>
              <label className='mt-5'>
                <span>Description</span>
                <textarea rows={4} name='description' onBlur={handleChange}></textarea>
              </label>
              <SubmitButton className="mt-5 ml-auto flex" />
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default memo(CreateSong)