import InputCustom from "@/components/ui/inputCustom";
import { EyeClosed, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { BiLogoFacebook, BiLogoGithub, BiLogoGoogle } from "react-icons/bi";


function LoginForm() {
  const handleLogin = () => {
    // Logic for handling login
    console.log("Login button clicked");
  }

  return (
    <div className="login form-box">
      <h1>Login</h1>
      <form action={handleLogin}>
        <InputCustom
          type="email"
          placeholder="Email"
          name="email"
          value=""
          handleChange={() => { }}
          icon={<Mail />}
        />
        <InputCustom
          type="password"
          placeholder="Password"
          name="password"
          value=""
          handleChange={() => { }}
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