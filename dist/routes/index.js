"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const users_router_1 = __importDefault(require("./users.router"));
const router = (app) => {
    const mainRouter = (0, express_1.Router)();
    app.use("/api/v1", mainRouter);
    mainRouter.use("/users", users_router_1.default);
};
exports.router = router;