"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryEventScheme = exports.updateEventSchema = exports.createEventSchema = exports.getEventSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.string();
const name = joi_1.default.string().min(3).max(60);
const initDate = joi_1.default.date();
const results = joi_1.default.array().items(joi_1.default.number().min(0).integer());
const teams = joi_1.default.array()
    .length(2)
    .items({
    name: joi_1.default.string().min(3).max(20).required(),
    imageURI: joi_1.default.string().uri(),
});
const sport = joi_1.default.object({
    name: joi_1.default.string().min(3).max(20).required(),
});
const limit = joi_1.default.number().integer();
const offset = joi_1.default.number().integer();
exports.getEventSchema = joi_1.default.object({
    id: id.required(),
});
exports.createEventSchema = joi_1.default.object({
    name: name.required(),
    initDate: initDate.required(),
    teams: teams.required(),
    sport: sport.required(),
    results: results.required(),
});
exports.updateEventSchema = joi_1.default.object({
    name,
    initDate,
    teams,
    sport,
    results,
});
exports.queryEventScheme = joi_1.default.object({
    limit,
    offset,
});
