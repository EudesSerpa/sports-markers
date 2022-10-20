import { Router } from "express";
import { createEventSchema, queryEventScheme } from "../schemas/event.schema";
import { createTeamSchema } from "../schemas/team.schema";
import { validatorHandler } from "../middlewares/validator.handler";
import { createEvent, getEvents } from "../controllers/event.controller";
import { createTeam } from "../controllers/team.controller";

const router: Router = Router();

// Events
router.get("/events", validatorHandler(queryEventScheme, "query"), getEvents);
router.post(
  "/events",
  validatorHandler(createEventSchema, "body"),
  createEvent
);

// Teams
router.post("/teams", validatorHandler(createTeamSchema, "body"), createTeam);

export default router;
