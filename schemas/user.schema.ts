/* A validation schema for the user */
import Joi from "joi";

const id = Joi.string();
const username = Joi.string().min(3).max(15);
const password = Joi.string().alphanum().min(3).max(8);

export const getUserSchema: Joi.Schema = Joi.object({
  id: id.required(),
});

export const createUserSchema: Joi.Schema = Joi.object({
  username: username.required(),
  password: password.required(),
});

export const updateUserSchema: Joi.Schema = Joi.object({
  username,
  password,
});
