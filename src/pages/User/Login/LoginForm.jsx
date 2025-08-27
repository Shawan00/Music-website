import InputCustom from "@/components/ui/inputCustom";
import { EyeClosed, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BiLogoFacebook, BiLogoGithub, BiLogoGoogle } from "react-icons/bi";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth.context";
import { clientLogin } from "@/services/Auth/authService";
import { showToast } from "@/helpers";


function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const {setUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogin = async () => {
    const response = await clientLogin(formData)
    console.log(response)
    if (response.status === 200) {
      setUser({
        accessToken: response.data.accessToken,
        userInfo: response.data.user
      })
      showToast(response.data.message, 'success')
      navigate('/')
    } else {
      showToast(response.data.message, 'error')
    }
  }

  return (
    <div className="login form-box">
      <h1>Login</h1>
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
        <div className="forgot">
          <Link to="/forgot-password">
            Forgot Password?
          </Link>
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="social-login">
        <p className="mb-4">Or login with social platforms</p>
        <div className="inner-social">
          <a href="#" className="google">
            <BiLogoGoogle />
          </a>
          <a href="#" className="facebook">
            <BiLogoFacebook />
          </a>
          <a href="#" className="github">
            <BiLogoGithub />
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;