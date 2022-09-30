import { Request, Response, NextFunction } from "express";
import { sportService } from "../services/sport.service";
import { successResponse } from "../helpers/network/response";

const service = new sportService();

export const getSports = (_req: Request, res: Response, next: NextFunction) => {
  service
    .find()
    .then((sports) => {
      successResponse(res, sports);
    })
    .catch(next);
};

export const getSport = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  service
    .findOne(id)
    .then((sport) => {
      successResponse(res, sport);
    })
    .catch(next);
};

export const createSport = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  service
    .create({ name })
    .then((sport) => {
      successResponse(res, sport, 201);
    })
    .catch(next);
};

export const updateSport = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const data = req.body;

  service
    .update({ id, data })
    .then((sportUpdated) => {
      successResponse(res, sportUpdated);
    })
    .catch(next);
};

export const deleteSport = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  service
    .delete(id)
    .then((sportDeleted) => {
      successResponse(res, sportDeleted);
    })
    .catch(next);
};
