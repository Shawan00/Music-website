import { get } from "../../utils/request";

export async function getSuggestedSongs() {
  const response = await get("song/getAll");
  return response;
}