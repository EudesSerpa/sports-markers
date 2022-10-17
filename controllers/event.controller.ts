import { Request, Response, NextFunction } from "express";
import { eventService } from "../services/event.service";
import { successResponse } from "../helpers/network/response";

const service = new eventService();

export const getEvents = (req: Request, res: Response, next: NextFunction) => {
  const { limit, offset } = req.query;

  if (limit && offset) {
    service
      .findWithPagination({
        limit: Number(limit),
        offset: Number(offset),
      })
      .then((events) => {
        successResponse(res, events);
      })
      .catch(next);

    return;
  }

  service
    .find()
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
  const { name, initDate, teams, sport, results } = req.body;

  service
    .create({ name, initDate, teams, sport, results })
    .then((event) => {
      successResponse(res, event, 201);
    })
    .catch(next);
};

export const updateEvent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const data = req.body;

  service
    .update({ id, data })
    .then((eventUpdated) => {
      successResponse(res, eventUpdated);
    })
    .catch(next);
};

export const deleteEvent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  service
    .delete(id)
    .then((eventDeleted) => {
      successResponse(res, eventDeleted);
    })
    .catch(next);
};
