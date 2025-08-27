import { del, get, patch, post } from "@/utils/request";

export const getAllPlaylist = async () => {
  const response = await get("/playlist")
  return response;
}

export const getAllFollowedPlaylist = async () => {
  const response = await get("/playlist/follow")
  return response;
}

export const getPlaylistBySlug = async (slug) => {
  const response = await get(`/playlist/${slug}`);
  return response;
}

export const createPlaylist = async (data) => {
  const response = await post("/playlist", data);
  return response
}

export const addSongToPlaylist = async (playlistId, songId) => {
  const response = await post(`/playlist/${playlistId}/add/${songId}`);
  return response;
}

export const updatePlaylist = async (playlistId, data) => {
  const response = await patch(`/playlist/${playlistId}`, data);
  return response;
}

export const deletePlaylist = async (playlistId) => {
  const response = await del(`/playlist/${playlistId}`);
  return response;
}

export const followPlaylist = async (playlistId) => {
  const response = await post(`/playlist/follow/${playlistId}`);
  return response;
}
