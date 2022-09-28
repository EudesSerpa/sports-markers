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
exports.connectDB = void 0;
const dotenv_1 = require("dotenv");
const mongoose_1 = require("mongoose");
(0, dotenv_1.config)();
const { USER_DB, PASS_DB, NAME_DB, CLUSTER_DB_URI } = process.env;
const URI_DB = `mongodb+srv://${USER_DB}:${PASS_DB}@${CLUSTER_DB_URI}/${NAME_DB}?retryWrites=true&w=majority`;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield (0, mongoose_1.connect)(URI_DB, {
            keepAlive: true,
            keepAliveInitialDelay: 300000,
        });
        console.log("Connected to DB", conn.connection.db.databaseName);
    }
    catch (error) {
        console.error("Error on connection DB", error);
    }
});
exports.connectDB = connectDB;
mongoose_1.connection.on("disconnected", (err) => {
    console.error("Disconnected from DB", err);
});
