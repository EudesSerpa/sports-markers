"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkApiKey = void 0;
const custom_error_model_1 = require("../models/custom-error.model");
function checkApiKey(req, res, next) {
    const apiKey = req.headers["api"];
    if (apiKey !== "123") {
        throw new custom_error_model_1.CustomError("There's no API Key", 400);
    }
    next();
}
exports.checkApiKey = checkApiKey;
