"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_schema_1 = require("../schemas/event.schema");
const team_schema_1 = require("../schemas/team.schema");
const validator_handler_1 = require("../middlewares/validator.handler");
const event_controller_1 = require("../controllers/event.controller");
const team_controller_1 = require("../controllers/team.controller");
const router = (0, express_1.Router)();
router.get("/events", (0, validator_handler_1.validatorHandler)(event_schema_1.queryEventScheme, "query"), event_controller_1.getEvents);
router.post("/events", (0, validator_handler_1.validatorHandler)(event_schema_1.createEventSchema, "body"), event_controller_1.createEvent);
router.post("/teams", (0, validator_handler_1.validatorHandler)(team_schema_1.createTeamSchema, "body"), team_controller_1.createTeam);
exports.default = router;
