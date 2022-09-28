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
var _sportService_instances, _sportService_validateId;
Object.defineProperty(exports, "__esModule", { value: true });
exports.sportService = void 0;
const mongoose_1 = require("mongoose");
const custom_error_model_1 = require("../models/custom-error.model");
const sport_model_1 = require("../database/models/sport.model");
class sportService {
    constructor() {
        _sportService_instances.add(this);
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield sport_model_1.Sport.find({});
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _sportService_instances, "m", _sportService_validateId).call(this, id);
            const sport = yield sport_model_1.Sport.findById(id);
            if (!sport) {
                throw new custom_error_model_1.CustomError("Sport doesn't exists", 404);
            }
            return sport;
        });
    }
    create({ name }) {
        return __awaiter(this, void 0, void 0, function* () {
            const sport = yield sport_model_1.Sport.findOne({ name });
            if (sport) {
                throw new custom_error_model_1.CustomError("Sport already exists", 409);
            }
            const newSport = { name };
            const sportCreated = yield sport_model_1.Sport.create(newSport);
            return sportCreated;
        });
    }
    update({ id, data }) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _sportService_instances, "m", _sportService_validateId).call(this, id);
            const sportUpdated = yield sport_model_1.Sport.findByIdAndUpdate(id, Object.assign({}, data), { returnDocument: "after" });
            if (!sportUpdated) {
                throw new custom_error_model_1.CustomError("Sport doesn't exists", 404);
            }
            return sportUpdated;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _sportService_instances, "m", _sportService_validateId).call(this, id);
            const sportDeleted = yield sport_model_1.Sport.findByIdAndDelete(id);
            if (!sportDeleted) {
                return { info: "There's no any sport to delete :)" };
            }
            return sportDeleted;
        });
    }
}
exports.sportService = sportService;
_sportService_instances = new WeakSet(), _sportService_validateId = function _sportService_validateId(id) {
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        throw new custom_error_model_1.CustomError("Id is invalid. You must send a string of 12 Bytes or a string of 24 hex characters", 400);
    }
};
