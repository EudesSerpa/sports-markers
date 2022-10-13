import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import { getSignedToken } from "../helpers/auth/token-sign";
import { successResponse } from "../helpers/network/response";
import { validatorHandler } from "../middlewares/validator.handler";
import { createUserSchema } from "../schemas/user.schema";

const router: Router = Router();

router.post(
  "/login",
  validatorHandler(createUserSchema, "body"),
  passport.authenticate("local", { session: false }),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: any = req.user;

      const payload = {
        sub: user._id,
        username: user.username,
      };

      const jwt = getSignedToken(payload, { expiresIn: "7d" });

      successResponse(res, { jwt }, 200);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
