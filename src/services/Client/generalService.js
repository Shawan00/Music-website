import { get } from "@/utils/request";

export const getSearch = async (keyword) => {
  const response = await get(`/search?keySearch=${keyword}`)
  return response;
}