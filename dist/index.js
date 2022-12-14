"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_handler_1 = require("./middlewares/error.handler");
const database_1 = require("./database");
const routes_1 = require("./routes");
const config_1 = require("./config/config");
(0, database_1.connectDB)();
const app = (0, express_1.default)();
const port = config_1.conf.port;
const whiteList = [
    "http://127.0.0.1:5173",
    "http://129.213.41.89",
    "https://sports-markers.vercel.app",
];
const options = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin) || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
(0, routes_1.router)(app);
app.use(error_handler_1.logErrors);
app.use(error_handler_1.errorHandler);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
