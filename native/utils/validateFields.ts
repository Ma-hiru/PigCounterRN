export const validatePhone = (phone: string) => {
  return /^1[3-9]\d{9}$/.test(phone.trim());
};
export const validatePassword = (password: string) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password.trim());
};
