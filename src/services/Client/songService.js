import { defaultImage } from "@/helpers/defaultImage";
import { get, patch, post } from "../../utils/request";

export async function getSuggestedSongs(params) {
  const response = await get("recommendation", params);
  return response;
}

export async function getNextSongs(data) {
  const response = await post("recommendation/by-songs", data);
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
  const response = await get("song/getAllLike");
  return response;
}

export async function getTopHits(country) {
  country = country.trim().replace(" ", "+");
  const response = await get("song/top/plays?limit=100&country=" + country);
  return response;
}

export async function getAllArtistSong(params) {
  const response = await get("/song/artist/my-song", params);
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
  const response = await patch(`song/artist/update-song/${id}`, {
    deleted: true
  })
  return response;
}

export async function sendPlayedHistory(id, data) {
  await post(`song/play/${id}`, data)
}