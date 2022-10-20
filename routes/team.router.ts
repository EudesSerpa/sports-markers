import { Router } from "express";
import { validatorHandler } from "../middlewares/validator.handler";
import {
  getTeamSchema,
  createTeamSchema,
  updateTeamSchema,
  queryTeamScheme,
} from "../schemas/team.schema";
import {
  getTeam,
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam,
} from "../controllers/team.controller";

const router: Router = Router();

router.get("/", validatorHandler(queryTeamScheme, "query"), getTeams);

router.get("/:id", validatorHandler(getTeamSchema, "params"), getTeam);

router.post("/", validatorHandler(createTeamSchema, "body"), createTeam);

router.patch(
  "/:id",
  validatorHandler(getTeamSchema, "params"),
  validatorHandler(updateTeamSchema, "body"),
  updateTeam
);

router.delete("/:id", validatorHandler(getTeamSchema, "params"), deleteTeam);

export default router;
