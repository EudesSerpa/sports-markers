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
var _UsersService_instances, _UsersService_validateId;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const mongoose_1 = require("mongoose");
const custom_error_model_1 = require("../models/custom-error.model");
const user_model_1 = require("../models/user.model");
class UsersService {
    constructor() {
        _UsersService_instances.add(this);
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_model_1.User.find({});
            return users;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _UsersService_instances, "m", _UsersService_validateId).call(this, id);
            const user = yield user_model_1.User.findById(id);
            if (!user) {
                throw new custom_error_model_1.CustomError("User doesn't exists", 404);
            }
            return user;
        });
    }
    create({ username, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({ username });
            if (user) {
                throw new custom_error_model_1.CustomError("User already exists", 409);
            }
            const newUser = {
                username,
                password,
            };
            const userCreated = yield user_model_1.User.create(newUser);
            return userCreated;
        });
    }
    update({ id, username, }) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _UsersService_instances, "m", _UsersService_validateId).call(this, id);
            const userUpdated = yield user_model_1.User.findByIdAndUpdate(id, { username }, { returnDocument: "after" });
            if (!userUpdated) {
                throw new custom_error_model_1.CustomError("User doesn't exists", 404);
            }
            return userUpdated;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _UsersService_instances, "m", _UsersService_validateId).call(this, id);
            const userDeleted = yield user_model_1.User.findByIdAndDelete(id);
            if (!userDeleted) {
                return {
                    info: "There's no any user to delete :)",
                };
            }
            return userDeleted;
        });
    }
}
exports.UsersService = UsersService;
_UsersService_instances = new WeakSet(), _UsersService_validateId = function _UsersService_validateId(id) {
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        throw new custom_error_model_1.CustomError("Id is invalid. You must send a string of 12 Bytes or a string of 24 hex characters", 400);
    }
};
