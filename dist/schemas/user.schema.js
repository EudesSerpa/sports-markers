"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = exports.getUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.string();
const username = joi_1.default.string().min(3).max(15);
const password = joi_1.default.string().alphanum().min(3).max(12);
exports.getUserSchema = joi_1.default.object({
    id: id.required(),
});
exports.createUserSchema = joi_1.default.object({
    username: username.required(),
    password: password.required(),
});
exports.updateUserSchema = joi_1.default.object({
    username,
    password,
});
