import { Request, Response, NextFunction } from "express";
import { ISuccess } from "../interfaces/Success";
import { eventService } from "../services/event.service";

const service = new eventService();

export const getEvents = (_req: Request, res: Response, next: NextFunction) => {
  service
    .find()
    .then((events) => {
      const successFetched: ISuccess = {
        success: true,
        data: events,
      };
      res.status(200).json(successFetched);
    })
    .catch(next);
};

export const getEvent = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  service
    .findOne(id)
    .then((event) => {
      const successFetched: ISuccess = {
        success: true,
        data: event,
      };

      res.status(200).json(successFetched);
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
      const successCreated: ISuccess = {
        success: true,
        data: event,
      };

      res.status(201).json(successCreated);
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
      const successUpdated: ISuccess = {
        success: true,
        data: eventUpdated,
      };

      res.status(200).json(successUpdated);
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
      const successDeleted: ISuccess = {
        success: true,
        data: eventDeleted,
      };

      res.status(200).json(successDeleted);
    })
    .catch(next);
};
