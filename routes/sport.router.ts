import { Router } from "express";
import { validatorHandler } from "../middlewares/validator.handler";
import {
  createSportSchema,
  getSportSchema,
  updateSportSchema,
} from "../schemas/sport.schema";
import {
  createSport,
  deleteSport,
  getSport,
  getSports,
  updateSport,
} from "../controllers/sport.controller";

const router: Router = Router();

router.get("/", getSports);

router.get("/:id", validatorHandler(getSportSchema, "params"), getSport);

router.post("/", validatorHandler(createSportSchema, "body"), createSport);

router.patch(
  "/:id",
  validatorHandler(getSportSchema, "params"),
  validatorHandler(updateSportSchema, "body"),
  updateSport
);

router.delete("/:id", validatorHandler(getSportSchema, "params"), deleteSport);

export default router;
