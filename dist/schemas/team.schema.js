"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryTeamScheme = exports.updateTeamSchema = exports.createTeamSchema = exports.getTeamSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.string();
const userId = joi_1.default.string();
const name = joi_1.default.string().min(3).max(20);
const imageURI = joi_1.default.string().uri();
const sport = joi_1.default.string();
exports.getTeamSchema = joi_1.default.object({
    id: id.required(),
});
exports.createTeamSchema = joi_1.default.object({
    userId: userId.required(),
    name: name.required(),
    sport: sport.required(),
    imageURI,
});
exports.updateTeamSchema = joi_1.default.object({
    name,
    sport,
    imageURI,
});
exports.queryTeamScheme = joi_1.default.object({
    sport,
});
