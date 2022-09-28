"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorHandler = void 0;
const custom_error_model_1 = require("../models/custom-error.model");
function validatorHandler(schema, dataLocation) {
    return (req, _res, next) => {
        const data = req[dataLocation];
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            next(new custom_error_model_1.CustomError(error.message, 400));
        }
        next();
    };
}
exports.validatorHandler = validatorHandler;
