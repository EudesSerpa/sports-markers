/* A validation schema for the sport */
import Joi from "joi";

const id = Joi.string();
const userId = Joi.string();
const name = Joi.string().min(3).max(20);

export const getSportSchema: Joi.Schema = Joi.object({
  id: id.required(),
});

export const createSportSchema: Joi.Schema = Joi.object({
  userId: userId.required(),
  name: name.required(),
});

export const updateSportSchema: Joi.Schema = Joi.object({
  name: name.required(),
});

export default {
  name,
};
