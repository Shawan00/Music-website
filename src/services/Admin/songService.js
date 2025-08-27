import { del, get, patch, post } from "../../utils/request";

export async function getSong(page = 1, limit = 8, sortKey = "title", sortValue = "asc", status = "active") {
  const params = { page, limit, sortKey, sortValue, status };
  const response = await get("admin/song", params);
  return response;
}

export async function createSong(data) {
  const response = await post("admin/song/create", data);
  return response;
}

export async function updateSong(id, data) {
  const response = await patch(`admin/song/update/${id}`, data);
  return response;
}

export async function moveSongToBin(id) {
  const response = await patch(`admin/song/delete/${id}`);
  return response;
}

export async function deleteSong(id) {
  const response = await del(`admin/song/delete/${id}`);
  return response;
}