"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.logErrors = void 0;
const custom_error_model_1 = require("../models/custom-error.model");
const response_1 = require("../helpers/network/response");
function logErrors(err, _req, _res, next) {
    console.log("🚀 ~ file: error.handler.ts ~ line 19 ~ err", err.message);
    next(err);
}
exports.logErrors = logErrors;
function errorHandler(err, _req, res, _next) {
    let customError = err;
    if (!(err instanceof custom_error_model_1.CustomError)) {
        customError = new custom_error_model_1.CustomError(err.message);
    }
    (0, response_1.failResponse)(res, customError.message, customError.statusCode);
}
exports.errorHandler = errorHandler;
