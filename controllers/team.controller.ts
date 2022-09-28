import { Request, Response, NextFunction } from "express";
import { teamService } from "../services/team.service";
import { ISuccess } from "../interfaces/Success";

const service = new teamService();

export const getTeams = (_req: Request, res: Response, next: NextFunction) => {
  service
    .find()
    .then((teams) => {
      const successFetched: ISuccess = {
        success: true,
        data: teams,
      };
      res.status(200).json(successFetched);
    })
    .catch(next);
};

export const getTeam = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  service
    .findOne(id)
    .then((team) => {
      const successFetched: ISuccess = {
        success: true,
        data: team,
      };

      res.status(200).json(successFetched);
    })
    .catch(next);
};

export const createTeam = (req: Request, res: Response, next: NextFunction) => {
  const { name, imageURI } = req.body;

  service
    .create({ name, imageURI: imageURI || null })
    .then((team) => {
      const successCreated: ISuccess = {
        success: true,
        data: team,
      };

      res.status(201).json(successCreated);
    })
    .catch(next);
};
