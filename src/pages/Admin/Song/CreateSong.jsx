import { memo, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import { uploadFile } from '../../../services/Admin/uploadFileService';
import { postSong } from '../../../services/Admin/songService';

function CreateSong(props) {
  const { onReload } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [backgroundPreview, setBackgroundPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: "",
    background: "",
    description: "",
    lyrics: "",
    audio: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileUpload = async (e) => {
    const { name, files } = e.target;
    if(!files[0]) {
      return;
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
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeModal();

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
        theme: "light",
      });
    } else {
      toast.error(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    onReload();
  }

  const openModal = () => {
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setBackgroundPreview(null);
    setThumbnailPreview(null);
    setIsModalOpen(false);
  }

  return (
    <>
      <ToastContainer />
      <button onClick={openModal}>New song</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        preventScroll={true}
      >
        <h3>Add a new song</h3>
        <button onClick={closeModal}><IoMdClose /></button>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <span style={{ color: 'rgb(255, 0, 0)' }}>*</span>
            <input type='text' name='title' onBlur={handleChange} required></input>
          </label>
          <label>
            Audio
            <span style={{ color: 'rgb(255, 0, 0)' }}>*</span>
            <input type='file' name='audio' onChange={handleFileUpload} accept='audio/*' required></input>
          </label>
          <label>
            Thumbnail
            <input type='file' name='thumbnail' onChange={handleFileUpload} accept="image/*"></input>
            {thumbnailPreview && (<img src={thumbnailPreview} alt='Uploaded' width='80px'></img>)}
          </label>
          <label>
            Background
            <input type='file' name='background' onChange={handleFileUpload} accept='image/*'></input>
            {backgroundPreview && (<img src={backgroundPreview} alt='Uploaded' width='80px'></img>)}
          </label>
          <label>
            Lyrics
            <input type='file' name='lyrics' onChange={handleFileUpload} accept='.lrc'></input>
          </label>
          <label>
            Description
            <textarea rows={4} name='description' onBlur={handleChange}></textarea>
          </label>
          <button onClick={closeModal}>Cancel</button>
          <button type='submit'>OK</button>
        </form>
      </Modal>
    </>
  );
}

export default memo(CreateSong)