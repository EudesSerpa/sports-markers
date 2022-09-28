/* A validation schema for the team */
import Joi from "joi";

const id = Joi.string();
const name = Joi.string().min(3).max(20);
const imageURI = Joi.string().uri();

export const getTeamSchema: Joi.Schema = Joi.object({
  id: id.required(),
});

export const createTeamSchema: Joi.Schema = Joi.object({
  name: name.required(),
  imageURI,
});

export const updateTeamSchema: Joi.Schema = Joi.object({
  name: name.required(),
  imageURI,
});
