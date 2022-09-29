"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, "Username is required"],
    },
    password: { type: String, required: [true, "Password is required"] },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)("User", userSchema);
