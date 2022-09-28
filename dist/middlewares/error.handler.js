"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.logErrors = void 0;
const custom_error_model_1 = require("../models/custom-error.model");
function logErrors(err, _req, _res, next) {
    console.log("🚀 ~ file: error.handler.ts ~ line 11 ~ err", err.message);
    next(err);
}
exports.logErrors = logErrors;
function errorHandler(err, _req, res, _next) {
    let customError = err;
    if (!(err instanceof custom_error_model_1.CustomError)) {
        customError = new custom_error_model_1.CustomError(err.message);
    }
    const failMessage = {
        success: false,
        message: customError.message,
    };
    res.status(customError.statusCode).json(failMessage);
}
exports.errorHandler = errorHandler;
