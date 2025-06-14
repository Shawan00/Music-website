export const validateEmail = (email) => {
  if(!email) return null;
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    .test(String(email).toLowerCase());
}

export const validatePhone = (phone) => {
  if (!phone) return false;
  const intlPattern = /^\+?\d{1,3}[-.\s]?(?:\d{3})?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  const vnPattern = /^0\d{9}$/;
  return intlPattern.test(phone) || vnPattern.test(phone.replace(/[-.\s()]/g, ''));
};

export const hasUppercase = (password) => /[A-Z]/.test(password);

export const hasLowercase = (password) => /[a-z]/.test(password);

export const hasNumber = (password) => /[0-9]/.test(password);

export const hasSpecialChar = (password) => /[^A-Za-z0-9]/.test(password);

export const hasMinLength = (password) => password.length >= 8;

export const validateConfirmPassword = (password, rePassword) => {
  if(rePassword === "") return false;
  return password === rePassword;
}