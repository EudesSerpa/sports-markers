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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _teamService_instances, _teamService_validateId;
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamService = void 0;
const mongoose_1 = require("mongoose");
const custom_error_model_1 = require("../models/custom-error.model");
const team_model_1 = require("../database/models/team.model");
class teamService {
    constructor() {
        _teamService_instances.add(this);
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const teams = yield team_model_1.Team.find({});
            return teams;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _teamService_instances, "m", _teamService_validateId).call(this, id);
            const team = yield team_model_1.Team.findById(id);
            if (!team) {
                throw new custom_error_model_1.CustomError("Team doesn't exists", 404);
            }
            return team;
        });
    }
    create({ name, imageURI }) {
        return __awaiter(this, void 0, void 0, function* () {
            const team = yield team_model_1.Team.findOne({ name });
            if (team) {
                throw new custom_error_model_1.CustomError("Team already exists", 409);
            }
            const newTeam = {
                name,
                imageURI,
            };
            const teamCreated = yield team_model_1.Team.create(newTeam);
            return teamCreated;
        });
    }
    update({ id, data }) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _teamService_instances, "m", _teamService_validateId).call(this, id);
            const teamUpdated = yield team_model_1.Team.findByIdAndUpdate(id, Object.assign({}, data), { returnDocument: "after" });
            if (!teamUpdated) {
                throw new custom_error_model_1.CustomError("Team doesn't exists", 404);
            }
            return teamUpdated;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _teamService_instances, "m", _teamService_validateId).call(this, id);
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
_teamService_instances = new WeakSet(), _teamService_validateId = function _teamService_validateId(id) {
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        throw new custom_error_model_1.CustomError("Id is invalid. You must send a string of 12 Bytes or a string of 24 hex characters", 400);
    }
};
