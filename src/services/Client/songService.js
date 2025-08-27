import { defaultImage } from "@/helpers/defaultImage";
import { get, patch, post } from "../../utils/request";

export async function getSuggestedSongs() {
  const response = await get("song/getAll");
  return response;
}

export async function getSongBySlug(slug) {
  const response = await get(`song/detail/${slug}`);
  return response;
}

export async function likeSong(slug) {
  const response = await post(`song/like/${slug}`);
  return response;
}

export async function getAllLikedSong() {
  const response = await get("song/getLikedSongs");
  return response;
}

export async function getAllArtistSong() {
  const response = await get("/song/artist/my-song");
  return response;
}

export async function createSong(data) {
  if (data.thumbnail === undefined) data.thumbnail = defaultImage;
  const response = await post("song/artist", data);
  return response;
}

export async function updateSong(id, data) {
  const response = await patch(`song/artist/update-song/${id}`, data);
  return response
}

export async function deleteSong(id) {
  // const response = await del(`song/artist/delete-song/${id}`);
  const response = {
    status: 200,
    data: {
      message: "Song deleted successfully",
      id
    }
  }
  return response;
}