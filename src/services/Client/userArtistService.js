import { get, patch } from "@/utils/request"

export const getAllArtists = async () => {
  const res = await get(`user/artists`)
  return res
}

export const getSuggestedArtists = async (params) => {
  const res = await get(`recommendation/artist`, params)
  return res
}

export const getFollowingArtist = async () => {
  const res = await get(`/user/follow/artists`)
  return res
}

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

export const followArtist = async (artistId) => {
  const res = await patch(`user/follow/${artistId}`)
  return res
}