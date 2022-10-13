import { Express, Router } from "express";
import userRouter from "./user.router";
import teamRouter from "./team.router";
import sportRouter from "./sport.router";
import eventRouter from "./event.router";
import authRouter from "./auth.router";

export const router = (app: Express) => {
  const mainRouter: Router = Router();

  app.use("/api/v1", mainRouter);

  mainRouter.use("/auth", authRouter);
  mainRouter.use("/users", userRouter);
  mainRouter.use("/teams", teamRouter);
  mainRouter.use("/sports", sportRouter);
  mainRouter.use("/events", eventRouter);
};
