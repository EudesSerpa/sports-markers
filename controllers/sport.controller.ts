import { Request, Response, NextFunction } from "express";
import { sportService } from "../services/sport.service";
import { ISuccess } from "../interfaces/Success";

const service = new sportService();

export const getSports = (_req: Request, res: Response, next: NextFunction) => {
  service
    .find()
    .then((sports) => {
      const successFetched: ISuccess = {
        success: true,
        data: sports,
      };
      res.status(200).json(successFetched);
    })
    .catch(next);
};

export const getSport = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  service
    .findOne(id)
    .then((sport) => {
      const successFetched: ISuccess = {
        success: true,
        data: sport,
      };

      res.status(200).json(successFetched);
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
      const successCreated: ISuccess = {
        success: true,
        data: sport,
      };

      res.status(201).json(successCreated);
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
      const successUpdated: ISuccess = {
        success: true,
        data: sportUpdated,
      };

      res.status(200).json(successUpdated);
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
      const successDeleted: ISuccess = {
        success: true,
        data: sportDeleted,
      };

      res.status(200).json(successDeleted);
    })
    .catch(next);
};
