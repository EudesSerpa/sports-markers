"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_router_1 = __importDefault(require("./user.router"));
const team_router_1 = __importDefault(require("./team.router"));
const sport_router_1 = __importDefault(require("./sport.router"));
const event_router_1 = __importDefault(require("./event.router"));
const auth_router_1 = __importDefault(require("./auth.router"));
const router = (app) => {
    const mainRouter = (0, express_1.Router)();
    app.use("/api/v1", mainRouter);
    mainRouter.use("/auth", auth_router_1.default);
    mainRouter.use("/users", user_router_1.default);
    mainRouter.use("/teams", team_router_1.default);
    mainRouter.use("/sports", sport_router_1.default);
    mainRouter.use("/events", event_router_1.default);
};
exports.router = router;
