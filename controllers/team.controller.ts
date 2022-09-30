import { Request, Response, NextFunction } from "express";
import { teamService } from "../services/team.service";
import { successResponse } from "../helpers/network/response";

const service = new teamService();

export const getTeams = (_req: Request, res: Response, next: NextFunction) => {
  service
    .find()
    .then((teams) => {
      successResponse(res, teams);
    })
    .catch(next);
};

export const getTeam = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  service
    .findOne(id)
    .then((team) => {
      successResponse(res, team);
    })
    .catch(next);
};

export const createTeam = (req: Request, res: Response, next: NextFunction) => {
  const { name, imageURI } = req.body;

  service
    .create({ name, imageURI: imageURI || null })
    .then((team) => {
      successResponse(res, team, 201);
    })
    .catch(next);
};

export const updateTeam = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const data = req.body;

  service
    .update({ id, data })
    .then((teamUpdated) => {
      successResponse(res, teamUpdated);
    })
    .catch(next);
};

export const deleteTeam = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  service
    .delete(id)
    .then((teamDeleted) => {
      successResponse(res, teamDeleted);
    })
    .catch(next);
};
