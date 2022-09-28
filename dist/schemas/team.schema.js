"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeamSchema = exports.createTeamSchema = exports.getTeamSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.string();
const name = joi_1.default.string().min(3).max(20);
const imageURI = joi_1.default.string().uri();
exports.getTeamSchema = joi_1.default.object({
    id: id.required(),
});
exports.createTeamSchema = joi_1.default.object({
    name: name.required(),
    imageURI,
});
exports.updateTeamSchema = joi_1.default.object({
    name: name.required(),
    imageURI,
});
