import { Router } from "express";
import {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} from "../dto/user.schema";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller";
import { validatorHandler } from "../middlewares/validator.handler";

const router: Router = Router();

router.get("/", getUsers);

router.get("/:id", validatorHandler(getUserSchema, "params"), getUser);

router.post("/", validatorHandler(createUserSchema, "body"), createUser);

router.patch(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  updateUser
);

router.delete("/:id", deleteUser);

export default router;
