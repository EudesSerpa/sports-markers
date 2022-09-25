import { Express, Router } from "express";
import usersRouter from "./users.router";

export const router = (app: Express) => {
  const mainRouter: Router = Router();

  app.use("/api/v1", mainRouter);

  mainRouter.use("/users", usersRouter);
};
