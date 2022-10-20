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
exports.teamService = void 0;
const team_model_1 = require("../database/models/team.model");
const custom_error_model_1 = require("../models/custom-error.model");
const validateId_1 = require("../helpers/db/validateId");
class teamService {
    constructor() { }
    find({ sport }) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            if (sport) {
                filter.sport = sport;
            }
            return yield team_model_1.Team.find(filter);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, validateId_1.validateId)(id);
            const team = yield team_model_1.Team.findById(id);
            if (!team) {
                throw new custom_error_model_1.CustomError("Team doesn't exist", 404);
            }
            return team;
        });
    }
    create({ name, sport, imageURI }) {
        return __awaiter(this, void 0, void 0, function* () {
            const alreadyExist = yield team_model_1.Team.exists({ name, sport });
            if (alreadyExist) {
                throw new custom_error_model_1.CustomError("Team already exist", 409);
            }
            const newTeam = {
                name,
                sport,
                imageURI,
            };
            const teamCreated = yield team_model_1.Team.create(newTeam);
            return teamCreated;
        });
    }
    update({ id, data }) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, validateId_1.validateId)(id);
            const teamUpdated = yield team_model_1.Team.findByIdAndUpdate(id, data, {
                returnDocument: "after",
            });
            if (!teamUpdated) {
                throw new custom_error_model_1.CustomError("Team doesn't exists", 404);
            }
            return teamUpdated;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, validateId_1.validateId)(id);
            const teamDeleted = yield team_model_1.Team.findByIdAndDelete(id);
            if (!teamDeleted) {
                return {
                    info: "There's no any team to delete :)",
                };
            }
            return teamDeleted;
        });
    }
}
exports.teamService = teamService;
