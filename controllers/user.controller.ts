import { Request, Response, NextFunction } from "express";
import { UsersService } from "../services/user.service";
import { ISuccess } from "../interfaces/Success";

const service = new UsersService();

export const getUsers = (_req: Request, res: Response, next: NextFunction) => {
  service
    .find()
    .then((users) => {
      const successFetched: ISuccess = {
        success: true,
        data: users,
      };

      res.status(200).json(successFetched);
    })
    .catch(next);
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  service
    .findOne(id)
    .then((user) => {
      const successFetched: ISuccess = {
        success: true,
        data: user,
      };

      res.status(200).json(successFetched);
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  service
    .create({ username, password })
    .then((user) => {
      const successCreated: ISuccess = {
        success: true,
        data: user,
      };

      res.status(201).json(successCreated);
    })
    .catch(next);
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const data = req.body;

  service
    .update({ id, data })
    .then((userUpdated) => {
      const successUpdated: ISuccess = {
        success: true,
        data: userUpdated,
      };

      res.status(200).json(successUpdated);
    })
    .catch(next);
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  service
    .delete(id)
    .then((userDeleted) => {
      const successDeleted: ISuccess = {
        success: true,
        data: userDeleted,
      };

      res.status(200).json(successDeleted);
    })
    .catch(next);
};
