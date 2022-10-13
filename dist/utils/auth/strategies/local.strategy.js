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
exports.LocalStrategy = void 0;
const passport_local_1 = require("passport-local");
const verify_password_1 = require("../../../helpers/security/verify-password");
const custom_error_model_1 = require("../../../models/custom-error.model");
const user_service_1 = require("../../../services/user.service");
const service = new user_service_1.UsersService();
exports.LocalStrategy = new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield service.findByUsername(username);
        const isMatch = yield (0, verify_password_1.verifyPassword)(password, user.password);
        if (!isMatch) {
            return done(new custom_error_model_1.CustomError("Invalid credentials", 403), false);
        }
        const userData = {
            _id: user._id,
            username: user.username,
        };
        return done(null, userData);
    }
    catch (error) {
        done(error);
    }
}));
