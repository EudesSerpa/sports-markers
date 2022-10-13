"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = void 0;
const token_verify_1 = require("../helpers/auth/token-verify");
const custom_error_model_1 = require("../models/custom-error.model");
const TOKEN_START_IDX = 7;
function userAuth(req, res, next) {
    let jwt = "";
    const authorization = req.headers["authorization"];
    const isBearerToken = authorization === null || authorization === void 0 ? void 0 : authorization.toLowerCase().startsWith("bearer");
    if (authorization && isBearerToken) {
        jwt = authorization.substring(TOKEN_START_IDX);
    }
    if (!jwt) {
        res.setHeader("WWW-Authenticate", "Bearer");
        throw new custom_error_model_1.CustomError("Unauthorized", 401);
    }
    const payload = (0, token_verify_1.verifyToken)(jwt);
    if (!payload) {
        throw new custom_error_model_1.CustomError("JWT corrupt", 403);
    }
    req.body.userId = payload.sub;
    next();
}
exports.userAuth = userAuth;
