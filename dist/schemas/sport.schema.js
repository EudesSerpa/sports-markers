"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSportSchema = exports.createSportSchema = exports.getSportSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.string();
const name = joi_1.default.string().min(3).max(20);
exports.getSportSchema = joi_1.default.object({
    id: id.required(),
});
exports.createSportSchema = joi_1.default.object({
    name: name.required(),
});
exports.updateSportSchema = joi_1.default.object({
    name: name.required(),
});
