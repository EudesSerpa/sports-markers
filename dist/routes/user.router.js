"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_schema_1 = require("../dto/user.schema");
const user_controller_1 = require("../controllers/user.controller");
const validator_handler_1 = require("../middlewares/validator.handler");
const router = (0, express_1.Router)();
router.get("/", user_controller_1.getUsers);
router.get("/:id", (0, validator_handler_1.validatorHandler)(user_schema_1.getUserSchema, "params"), user_controller_1.getUser);
router.post("/", (0, validator_handler_1.validatorHandler)(user_schema_1.createUserSchema, "body"), user_controller_1.createUser);
router.patch("/:id", (0, validator_handler_1.validatorHandler)(user_schema_1.getUserSchema, "params"), (0, validator_handler_1.validatorHandler)(user_schema_1.updateUserSchema, "body"), user_controller_1.updateUser);
router.delete("/:id", user_controller_1.deleteUser);
exports.default = router;
