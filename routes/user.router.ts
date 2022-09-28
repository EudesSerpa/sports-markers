import { Router } from "express";
import { validatorHandler } from "../middlewares/validator.handler";
import {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} from "../schemas/user.schema";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller";

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

router.delete("/:id", validatorHandler(getUserSchema, "params"), deleteUser);

export default router;
