import { del, get, patch, post } from "../../utils/request";

export async function getSong(page = 1, limit = 8, sortKey = "title", sortValue = "asc", status = "active") {
  const params = { page, limit, sortKey, sortValue, status };
  try {
    const response = await get("admin/song", params);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function postSong(data) {
  try {
    const response = await post("admin/song/create", data);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function patchSong(data) {
  try {
    const response = await patch(`admin/song/update/${data.id}`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function moveSongToBin(id) {
  try {
    const response = await patch(`admin/song/delete/${id}`);
    return response;
  } catch (error) {
    console.log(error);    
  }
}

export async function deleteSong(id) {
  try {
    const response = await del(`admin/song/delete/${id}`);
    return response;
  } catch (error) {
    console.log(error);    
  }
}