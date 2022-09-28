"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError {
    constructor(message, statusCode = 500) {
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.CustomError = CustomError;
