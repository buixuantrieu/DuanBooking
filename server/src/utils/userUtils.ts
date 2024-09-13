import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

export const hashPassword = (password: string): string => {
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
export const checkPassword = (password: string, hashPassword: string): boolean => {
  const isPassword = bcrypt.compareSync(password, hashPassword);
  return isPassword;
};
