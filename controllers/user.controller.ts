import { Request, Response, NextFunction } from "express";
import { UsersService } from "../services/user.service";
import { successResponse } from "../helpers/network/response";

const service = new UsersService();

export const getUsers = (_req: Request, res: Response, next: NextFunction) => {
  service
    .find()
    .then((users) => {
      successResponse(res, users);
    })
    .catch(next);
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  service
    .findOne(id)
    .then((user) => {
      successResponse(res, user);
    })
    .catch(next);
};

export const userRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  service
    .register({ username, password })
    .then((user) => {
      successResponse(res, user, 201);
    })
    .catch(next);
};

export const userLogin = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  service
    .login({ username, password })
    .then((data) => {
      successResponse(res, data, 200);
    })
    .catch(next);
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const data = req.body;

  service
    .update({ id, data })
    .then((userUpdated) => {
      successResponse(res, userUpdated);
    })
    .catch(next);
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  service
    .delete(id)
    .then((userDeleted) => {
      successResponse(res, userDeleted);
    })
    .catch(next);
};
