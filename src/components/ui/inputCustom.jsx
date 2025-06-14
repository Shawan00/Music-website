import { Eye, EyeClosed } from "lucide-react";
import { memo,  useState } from "react";

function InputCustom({ type, placeholder, name, value, handleChange, className="", icon, color }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={`input-custom ${className}`}>
      <input
        type={type === 'password' && showPassword ? 'text' : type} // chuyển từ type = password sang type = text để xem mật khẩu
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        className="input-field"
      />
      {type === 'password' ? (
        <div
          onClick={toggleShowPassword}
          className="cursor-pointer"
        >
          {showPassword ? <Eye color={color}/> : <EyeClosed color={color}/>}
        </div>
      ) : (
        <div className="icon">
          {icon}
        </div>
      )}
    </div>
  );
}

export default memo(InputCustom);