import { hash } from "bcryptjs";

const SALT_ROUNDS: number = 10;

export const hashPassword = async (password: string): Promise<string> =>
  await hash(password, SALT_ROUNDS);
