"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const username = joi_1.default.string().min(3).max(15);
exports.createUserSchema = joi_1.default.object({
    username: username.required(),
});
exports.updateUserSchema = joi_1.default.object({
    username: username.required(),
});
exports.getUserSchema = joi_1.default.object({
    id: id.required(),
});
