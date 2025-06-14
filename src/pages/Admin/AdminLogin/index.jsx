import { ModeToggle } from "@/components/ModeToggle"
import SubmitButton from "@/components/SubmitButton"
import { Checkbox } from "@/components/ui/checkbox"
import InputCustom from "@/components/ui/inputCustom"
import { AuthContext } from "@/context/auth.context"
import { showToast } from "@/helpers"
import { adminLogin } from "@/services/Auth/authService"
import { EyeClosed, Mail } from "lucide-react"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

function AdminLogin() {
  const {setUser} = useContext(AuthContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData ({
      ...formData,
      [name]: value
    })
  }

  const handleLogin = async () => {
    const response = await adminLogin(formData);
    if (response.status === 200) {
      localStorage.setItem('rememberAdminLogin', formData.remember)
      setUser({
        userInfo: response.data.user,
        accessToken: response.data.accessToken
      })
      navigate("/admin")
    } else {
      showToast(response.data.message, 'error')
    }
  }

  return (
    <>
      <div className="login-register-page @container">
        <div className="mode-toggle-container">
          <ModeToggle />
        </div>
        <div className={`login-register-container`}>
          <div className="login form-box">
            <h1>Administrator Login</h1>
            <form action={handleLogin}>
              <InputCustom
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                handleChange={handleChange}
                icon={<Mail />}
              />
              <InputCustom
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                handleChange={handleChange}
                icon={<EyeClosed />}
              />
              <label className="w-fit self-start flex flex-row items-center gap-2 mb-4 cursor-pointer">
                <Checkbox
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormData({
                        ...formData,
                        remember: true
                      })
                    } else {
                      setFormData({
                        ...formData,
                        remember: false
                      })
                    }
                  }}
                />
                <span>Remember me</span>
              </label>
              <SubmitButton
                className="!py-6"
                title="Login"
              />
            </form>
          </div>

          <div className="toggle-box">
            <div className="toggle-panel toggle-left">
              <h1>Welcome back!</h1>
              <p
                className="px-2 text-center"
              >Authorized personnel only.</p>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default AdminLogin