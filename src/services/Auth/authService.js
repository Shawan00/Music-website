import { post } from "@/utils/request"

const saveToLocalSorage = (res) => {
  if (!res.err) {
    localStorage.setItem("userInfo", JSON.stringify(res.data.user))
    localStorage.setItem("accessToken", res.data.accessToken)
  }
}

export const adminLogin = async (data) => {
  const response = await post("/admin/login", data)
  saveToLocalSorage(response)
  return response
}

export const adminRefreshToken = async () => {
  const response = await post("/admin/refreshToken")
  return response
}