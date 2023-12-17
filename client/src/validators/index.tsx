export const verifyPassword = (password: string, confirmPassword: string) => {
  return String(password) === String(confirmPassword);
};
