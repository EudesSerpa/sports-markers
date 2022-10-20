/* A validation schema for the team */
import Joi from "joi";

const id = Joi.string();
const userId = Joi.string();
const name = Joi.string().min(3).max(20);
const imageURI = Joi.string().uri();

const sport = Joi.string();

export const getTeamSchema: Joi.Schema = Joi.object({
  id: id.required(),
});

export const createTeamSchema: Joi.Schema = Joi.object({
  userId: userId.required(),
  name: name.required(),
  sport: sport.required(),
  imageURI,
});

export const updateTeamSchema: Joi.Schema = Joi.object({
  name,
  sport,
  imageURI,
});

export const queryTeamScheme: Joi.Schema = Joi.object({
  sport,
});
