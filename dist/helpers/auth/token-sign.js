"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignedToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../config/config");
const getSignedToken = (payload, options) => (0, jsonwebtoken_1.sign)(payload, config_1.conf.jwtKey, options);
exports.getSignedToken = getSignedToken;
