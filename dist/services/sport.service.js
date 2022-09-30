"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sportService = void 0;
const sport_model_1 = require("../database/models/sport.model");
const custom_error_model_1 = require("../models/custom-error.model");
const validateId_1 = require("../helpers/db/validateId");
class sportService {
    constructor() { }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield sport_model_1.Sport.find({});
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, validateId_1.validateId)(id);
            const sport = yield sport_model_1.Sport.findById(id);
            if (!sport) {
                throw new custom_error_model_1.CustomError("Sport doesn't exist", 404);
            }
            return sport;
        });
    }
    create({ name }) {
        return __awaiter(this, void 0, void 0, function* () {
            const alreadyExist = yield sport_model_1.Sport.exists({ name });
            if (alreadyExist) {
                throw new custom_error_model_1.CustomError("Sport already exist", 409);
            }
            const newSport = { name };
            const sportCreated = yield sport_model_1.Sport.create(newSport);
            return sportCreated;
        });
    }
    update({ id, data }) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, validateId_1.validateId)(id);
            const sportUpdated = yield sport_model_1.Sport.findByIdAndUpdate(id, data, {
                returnDocument: "after",
            });
            if (!sportUpdated) {
                throw new custom_error_model_1.CustomError("Sport doesn't exists", 404);
            }
            return sportUpdated;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, validateId_1.validateId)(id);
            const sportDeleted = yield sport_model_1.Sport.findByIdAndDelete(id);
            if (!sportDeleted) {
                return { info: "There's no any sport to delete :)" };
            }
            return sportDeleted;
        });
    }
}
exports.sportService = sportService;
