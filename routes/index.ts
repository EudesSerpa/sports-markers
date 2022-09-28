import { Express, Router } from "express";
import userRouter from "./user.router";
import teamRouter from "./team.router";
import sportRouter from "./sport.router";

export const router = (app: Express) => {
  const mainRouter: Router = Router();

  app.use("/api/v1", mainRouter);

  mainRouter.use("/users", userRouter);
  mainRouter.use("/teams", teamRouter);
  mainRouter.use("/sports", sportRouter);
};
