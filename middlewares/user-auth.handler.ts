import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/auth/token-verify";
import { CustomError } from "../models/custom-error.model";

const TOKEN_START_IDX: number = 7;

export function userAuth(req: Request, res: Response, next: NextFunction) {
  let jwt = "";
  const authorization = req.headers["authorization"];
  const isBearerToken = authorization?.toLowerCase().startsWith("bearer");

  if (authorization && isBearerToken) {
    jwt = authorization.substring(TOKEN_START_IDX);
  }

  if (!jwt) {
    res.setHeader("WWW-Authenticate", "Bearer");
    throw new CustomError("Unauthorized", 401);
  }

  const payload = verifyToken(jwt);

  if (!payload) {
    throw new CustomError("JWT corrupt", 403);
  }

  req.body.userId = payload.sub;
  next();
}
