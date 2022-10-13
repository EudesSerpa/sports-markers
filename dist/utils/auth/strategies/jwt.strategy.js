"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("../../../config/config");
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.conf.jwtKey,
};
exports.JWTStrategy = new passport_jwt_1.Strategy(options, (jwt_payload, done) => done(null, jwt_payload));
