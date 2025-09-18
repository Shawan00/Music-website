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

export const clientLogin = async (data) => {
  const response = await post('user/auth/login', data)
  saveToLocalSorage(response)
  return response
}

export const clientLogout = async () => {
  const response = await post('user/auth/logout')
  return response
}

export const clientRegister = async (data) => {
  const response = await post('user/auth/register', data)
  return response
}

export const clientRefreshToken = async () => {
  const response = await post('user/auth/refreshToken')
  console.log(response)
  return response
}