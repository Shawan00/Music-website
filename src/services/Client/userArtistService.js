import { get, patch } from "@/utils/request"

export const updateProfile = async (profileData) => {
  const res = await patch(`user`, profileData)
  return res
}

export const verifyArtist = async () => {
  const res = await patch(`user`, {
    verifyArtist: true
  })
  return res
}

export const getUserProfileById = async (userId) => {
  const res = await get(`user/${userId}`)
  return res
}