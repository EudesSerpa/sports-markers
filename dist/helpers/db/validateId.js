"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateId = void 0;
const mongoose_1 = require("mongoose");
const custom_error_model_1 = require("../../models/custom-error.model");
const validateId = (id) => {
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        throw new custom_error_model_1.CustomError("Id is invalid. You must send a string of 12 Bytes or a string of 24 hex characters", 400);
    }
};
exports.validateId = validateId;
