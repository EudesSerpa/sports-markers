"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failResponse = exports.successResponse = void 0;
const successResponse = (res, data, statusCode = 200) => {
    const successFetched = {
        success: true,
        data,
    };
    res.status(statusCode).json(successFetched);
};
exports.successResponse = successResponse;
const failResponse = (res, message, statusCode = 500) => {
    const successFetched = {
        success: false,
        message,
    };
    res.status(statusCode).json(successFetched);
};
exports.failResponse = failResponse;
