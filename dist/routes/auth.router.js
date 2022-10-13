"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const token_sign_1 = require("../helpers/auth/token-sign");
const response_1 = require("../helpers/network/response");
const validator_handler_1 = require("../middlewares/validator.handler");
const user_schema_1 = require("../schemas/user.schema");
const router = (0, express_1.Router)();
router.post("/login", (0, validator_handler_1.validatorHandler)(user_schema_1.createUserSchema, "body"), passport_1.default.authenticate("local", { session: false }), (req, res, next) => {
    try {
        const user = req.user;
        const payload = {
            sub: user._id,
            username: user.username,
        };
        const jwt = (0, token_sign_1.getSignedToken)(payload, { expiresIn: "7d" });
        (0, response_1.successResponse)(res, { jwt }, 200);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
