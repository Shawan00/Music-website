import { post } from "@/utils/request"

export async function predictGenre(audio) {
  const formData = new FormData()
  formData.append('file', audio)
  const response = await post("http://127.0.0.1:5000/predict", formData)
  return response
}

export async function retrainModel(file) {
  const formData = new FormData()
  formData.append('file', file)
  const response = await post("http://127.0.0.1:5000/retrain", formData)
  return response
}