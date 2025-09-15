import InputCustom from "@/components/ui/inputCustom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { showToast } from "@/helpers";
import { hasLowercase, hasMinLength, hasNumber, hasSpecialChar, hasUppercase, validateEmail } from "@/helpers/validation";
import { clientRegister } from "@/services/Auth/authService";
import { BadgeCheck, BadgeX, EyeClosed, Mail, User } from "lucide-react";
import { useState } from "react";

const validatePasswordConditions = {
  length: 'At least 8 characters long',
  uppercase: 'At least one uppercase letter',
  lowercase: 'At least one lowercase letter',
  number: 'At least one number',
  specialChar: 'At least one special character',
}

function RegisterForm({ setRegisterFalse }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [isValid, setIsValid] = useState({
    fullName: 0,
    email: 0,
    password: 0,
    confirmPassword: 0
  });

  const [passwordConditions, setPasswordConditions] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const validatePassword = (password) => {
    const checkLength = hasMinLength(password);
    const checkUppercase = hasUppercase(password);
    const checkLowercase = hasLowercase(password);
    const checkNumber = hasNumber(password);
    const checkSpecialChar = hasSpecialChar(password);
    if (checkLength !== passwordConditions.length ||
      checkUppercase !== passwordConditions.uppercase ||
      checkLowercase !== passwordConditions.lowercase ||
      checkNumber !== passwordConditions.number ||
      checkSpecialChar !== passwordConditions.specialChar) {
      setPasswordConditions({
        length: checkLength,
        uppercase: checkUppercase,
        lowercase: checkLowercase,
        number: checkNumber,
        specialChar: checkSpecialChar,
      });
    }
    return checkLength && checkUppercase && checkLowercase && checkNumber && checkSpecialChar;
  }

  const colorIcon = (type) => {
    switch (type) {
      case 'fullName':
        return isValid.fullName === 1 ? 'var(--color-green-500)' : isValid.fullName === -1 ? 'var(--color-red-500)' : 'var(--primary)';
      case 'email':
        return isValid.email === 1 ? 'var(--color-green-500)' : isValid.email === -1 ? 'var(--color-red-500)' : 'var(--primary)';
      case 'password':
        return isValid.password === 1 ? 'var(--color-green-500)' : isValid.password === -1 ? 'var(--color-red-500)' : 'var(--primary)';
      case 'confirmPassword':
        return isValid.confirmPassword === 1 ? 'var(--color-green-500)' : isValid.confirmPassword === -1 ? 'var(--color-red-500)' : 'var(--primary)';
      default:
        return '';
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (value !== '') { // Check validation
      switch (name) {
        case 'fullName': {
          const fullNameValid = value.length >= 1 ? 1 : 0;
          if (fullNameValid !== isValid.fullName) {
            setIsValid({
              ...isValid,
              fullName: fullNameValid
            })
          }
          break;
        }
        case 'email': {
          const emailValid = validateEmail(value) ? 1 : -1;
          if (emailValid !== isValid.email) {
            setIsValid({
              ...isValid,
              email: emailValid
            })
          }
          break;
        }
        case 'password': {
          const passwordValid = validatePassword(value) ? 1 : -1;
          if (passwordValid !== isValid.password) {
            setIsValid({
              ...isValid,
              password: passwordValid
            })
          }
          let confirmPasswordValidate = value === formData.confirmPassword ? 1 : -1;
          if (formData.confirmPassword === '') confirmPasswordValidate = 0;
          if (confirmPasswordValidate !== isValid.confirmPassword) {
            setIsValid({
              ...isValid,
              confirmPassword: confirmPasswordValidate
            })
          }
          break;
        }
        case 'confirmPassword': {
          const confirmPasswordValid = value === formData.password ? 1 : -1;
          if (confirmPasswordValid !== isValid.confirmPassword) {
            setIsValid({
              ...isValid,
              confirmPassword: confirmPasswordValid
            })
          }
          break;
        }
      }
    } else {
      setIsValid((prev) => ({
        ...prev,
        [name]: 0
      }));
      if (name === 'password') {
        setPasswordConditions({
          length: false,
          uppercase: false,
          lowercase: false,
          number: false,
          specialChar: false,
        });
      }
    }
  }

  const handleSubmit = async () => {
    setPending(true);
    const response = await clientRegister(formData)
    setPending(false);
    if (response.status === 201) {
      showToast(response.data.message, 'success')
      setRegisterFalse()
    } else {
      showToast(response.data.message, 'error')
    }
  }


  return (
    <>
      <div className="form-box register">
        <h1>Register</h1>
        <form action={handleSubmit}>
          <InputCustom
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={formData.fullName}
            handleChange={handleChange}
            icon={<User color={colorIcon('fullName')} />}
          />
          <InputCustom
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            handleChange={handleChange}
            icon={<Mail color={colorIcon("email")} />}
          />
          <Tooltip open={tooltipOpen}>
            <TooltipTrigger className="w-full" asChild>
              <div
                tabIndex={0}
                onFocus={() => setTooltipOpen(true)}
                onBlur={() => setTooltipOpen(false)}
              >
                <InputCustom
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  handleChange={handleChange}
                  icon={<EyeClosed />}
                  color={colorIcon("password")}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent
              align="end" side="top"
            >
              <h5 className="mb-2">Password must contains</h5>
              {Object.entries(validatePasswordConditions).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2 mb-1">
                  {passwordConditions[key] ? (
                    <BadgeCheck color="var(--color-green-500)" size={20} />
                  ) : (
                    <BadgeX color="var(--color-red-500)" size={20} />
                  )}
                  <span>{value}</span>
                </div>
              ))}
            </TooltipContent>
          </Tooltip>

          <InputCustom
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            handleChange={handleChange}
            icon={<EyeClosed />}
            color={colorIcon("confirmPassword")}
          />
          <button
            type="submit"
            disabled={
              isValid.fullName !== 1 ||
              isValid.email !== 1 ||
              isValid.password !== 1 ||
              isValid.confirmPassword !== 1 ||
              pending
            }
          >{pending ? 'Registering...' : 'Register'}</button>
        </form>
      </div>
    </>
  )
}

export default RegisterForm;