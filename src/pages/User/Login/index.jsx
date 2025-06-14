import { ModeToggle } from "@/components/ModeToggle";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useState } from "react";

function Login() {
  const [isRegister, setIsRegister] = useState(false)

  const setRegisterTrue = () => {
    setIsRegister(true);
  }

  const setRegisterFalse = () => {
    setIsRegister(false);
  }

  return (
    <div className="login-register-page @container">
      <div className="mode-toggle-container">
        <ModeToggle />
      </div>
      <div className={`login-register-container ${isRegister ? 'active' : ''}`}>
        <LoginForm />

        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button onClick={setRegisterTrue}>Register</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome back!</h1>
            <p>Already have an account?</p>
            <button onClick={setRegisterFalse}>Login</button>
          </div>
        </div>

        
        <RegisterForm />
      </div>

    </div>
  )
}

export default Login;