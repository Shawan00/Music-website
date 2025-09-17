import { del, get, patch, post } from "@/utils/request"

export const getMyAlbums = async () => {
  const res = get("/album")
  return res
}

export const getSuggestedAlbum = async (params) => {
  const res = get("/recommendation/album", params)
  return res
}

export const getAlbumById = async (id) => {
  const res = get(`/album/${id}`)
  return res
}

export const createAlbum = async (data) => {
  const res = post("/album", data)
  return res
}

export const updateAlbum = async (id, data) => {
  const res = patch(`/album/${id}`, data)
  return res
}

export const deleteAlbum = async (id) => {
  const res = del(`/album/${id}`)
  return res
}

export const followAlbum = async (id) => {
  const res = post(`/album/follow/${id}`)
  return res
}