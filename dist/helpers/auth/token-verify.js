"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../config/config");
const custom_error_model_1 = require("../../models/custom-error.model");
const verifyToken = (jwt) => {
    const decodedPayload = (0, jsonwebtoken_1.verify)(jwt, config_1.conf.jwtKey, (err, decoded) => {
        if (err) {
            throw new custom_error_model_1.CustomError(err.message, 401);
        }
        return decoded;
    });
    return decodedPayload;
};
exports.verifyToken = verifyToken;
