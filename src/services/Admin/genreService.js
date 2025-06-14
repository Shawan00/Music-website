import { get, post } from "../../utils/request"

export async function getGenre(page = 1, limit = 8, sortKey = "title", sortValue = "asc", status = "active") {
  const params = { page, limit, sortKey, sortValue, status };
  const response = await get("admin/genre", params);
  return response;
}

export async function postGenre(data) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("thumbnail", data.thumbnail);
  formData.append("description", data.description);
  const response = await post("admin/genre/create", formData);
  return response;
}