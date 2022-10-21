/* A validation schema for the event */
import Joi from "joi";

const id = Joi.string();
const userId = Joi.string();
const name = Joi.string().min(3).max(60);
const initDate = Joi.date();
const results = Joi.array().items(Joi.number().min(0).integer());
const teams = Joi.array()
  .length(2)
  .items({
    name: Joi.string().min(3).max(20).required(),
    imageURI: Joi.string().uri(),
  });
const sport = Joi.object({
  name: Joi.string().min(3).max(20).required(),
});
const limit = Joi.number().integer();
const offset = Joi.number().integer();

export const getEventSchema: Joi.Schema = Joi.object({
  id: id.required(),
});

export const createEventSchema: Joi.Schema = Joi.object({
  userId: userId.required(),
  name: name.required(),
  initDate: initDate.required(),
  teams: teams.required(),
  sport: sport.required(),
  results: results.required(),
});

export const updateEventSchema: Joi.Schema = Joi.object({
  userId: userId.required(),
  name,
  initDate,
  teams,
  sport,
  results,
});

export const queryEventScheme: Joi.Schema = Joi.object({
  limit,
  offset,
});
