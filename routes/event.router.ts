import { Router } from "express";
import { validatorHandler } from "../middlewares/validator.handler";
import { userAuth } from "../middlewares/user-auth.handler";
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from "../controllers/event.controller";
import {
  createEventSchema,
  getEventSchema,
  queryEventScheme,
  updateEventSchema,
} from "../schemas/event.schema";

const router: Router = Router();

router.get("/", validatorHandler(queryEventScheme, "query"), getEvents);

router.get("/:id", validatorHandler(getEventSchema, "params"), getEvent);

router.post(
  "/",
  validatorHandler(createEventSchema, "body"),
  userAuth,
  createEvent
);

router.patch(
  "/:id",
  validatorHandler(getEventSchema, "params"),
  validatorHandler(updateEventSchema, "body"),
  updateEvent
);

router.delete("/:id", validatorHandler(getEventSchema, "params"), deleteEvent);

export default router;
