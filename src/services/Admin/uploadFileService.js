import axios from "axios";

const CLOUD_NAME = "dndo7fe82";
const UPLOAD_PRESET = "upload_music_project";
const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

const axiosUploadFile = axios.create()

export async function uploadFile(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await axiosUploadFile.post(api, data);
    return response;
  } catch (error) {
    return {
      status: 500,
      message: "Error uploading file",
    }
  }
}