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
exports.UsersService = void 0;
const user_model_1 = require("../database/models/user.model");
const custom_error_model_1 = require("../models/custom-error.model");
const validateId_1 = require("../helpers/db/validateId");
class UsersService {
    constructor() { }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.User.find({});
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, validateId_1.validateId)(id);
            const user = yield user_model_1.User.findById(id);
            if (!user) {
                throw new custom_error_model_1.CustomError("User doesn't exist", 404);
            }
            return user;
        });
    }
    create({ username, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const alreadyExist = yield user_model_1.User.exists({ username });
            if (alreadyExist) {
                throw new custom_error_model_1.CustomError("User already exist", 409);
            }
            const newUser = {
                username,
                password,
            };
            const userCreated = yield user_model_1.User.create(newUser);
            return userCreated;
        });
    }
    update({ id, data }) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, validateId_1.validateId)(id);
            const userUpdated = yield user_model_1.User.findByIdAndUpdate(id, data, {
                returnDocument: "after",
            });
            if (!userUpdated) {
                throw new custom_error_model_1.CustomError("User doesn't exist", 404);
            }
            return userUpdated;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, validateId_1.validateId)(id);
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
