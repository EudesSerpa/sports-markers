import { compare } from "bcryptjs";

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => await compare(password, hashedPassword);
