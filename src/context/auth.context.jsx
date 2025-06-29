import { createContext, useState } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  // lấy dữ liệu từ local storage
  const accessToken = localStorage.getItem('accessToken') + ""
  const userInfo = localStorage.getItem('userInfo')
  const autoLogin = localStorage.getItem('rememberAdminLogin')

  const initialUser = accessToken && userInfo && autoLogin ? {
    accessToken,
    userInfo: JSON.parse(userInfo)
  } : null
  const [user, setUser] = useState(initialUser)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}