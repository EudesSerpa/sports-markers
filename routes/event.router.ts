import { Router } from "express";
import { validatorHandler } from "../middlewares/validator.handler";
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
  updateEventSchema,
} from "../schemas/event.schema";

const router: Router = Router();

router.get("/", getEvents);

router.get("/:id", validatorHandler(getEventSchema, "params"), getEvent);

router.post("/", validatorHandler(createEventSchema, "body"), createEvent);

router.patch(
  "/:id",
  validatorHandler(getEventSchema, "params"),
  validatorHandler(updateEventSchema, "body"),
  updateEvent
);

router.delete("/:id", validatorHandler(getEventSchema, "params"), deleteEvent);

export default router;
