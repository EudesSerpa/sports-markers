import { Express, Router } from "express";
import { userAuth } from "../middlewares/user-auth.handler";
import userRouter from "./user.router";
import teamRouter from "./team.router";
import sportRouter from "./sport.router";
import eventRouter from "./event.router";
import withAuthRouter from "./auth.router";

export const router = (app: Express) => {
  const mainRouter: Router = Router();

  app.use("/api/v1", mainRouter);

  mainRouter.use("/auth", userAuth, withAuthRouter);
  mainRouter.use("/users", userRouter);
  mainRouter.use("/teams", teamRouter);
  mainRouter.use("/sports", sportRouter);
  mainRouter.use("/events", eventRouter);
};
