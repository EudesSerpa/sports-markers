import { Request, Response, NextFunction } from "express";
import { eventService } from "../services/event.service";
import { successResponse } from "../helpers/network/response";

const service = new eventService();

export const getEvents = (req: Request, res: Response, next: NextFunction) => {
  const { limit, offset }: any = req.query;
  const { userId } = req.body;

  service
    .find({ userId, limit: Number(limit), offset: Number(offset) })
    .then((events) => {
      successResponse(res, events);
    })
    .catch(next);
};

export const getEvent = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  service
    .findOne(id)
    .then((event) => {
      successResponse(res, event);
    })
    .catch(next);
};

export const createEvent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, name, initDate, teams, sport, results } = req.body;

  service
    .create({ userId, name, initDate, teams, sport, results })
    .then((events) => {
      successResponse(res, events, 201);
    })
    .catch(next);
};

export const updateEvent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { userId, name, initDate, teams, sport, results } = req.body;

  service
    .update({ id, userId, data: { name, initDate, teams, sport, results } })
    .then((events) => {
      successResponse(res, events);
    })
    .catch(next);
};

export const deleteEvent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { userId } = req.body;

  service
    .delete({ id, userId })
    .then((events) => {
      successResponse(res, events);
    })
    .catch(next);
};
