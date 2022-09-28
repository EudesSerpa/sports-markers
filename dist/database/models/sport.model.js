"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sport = void 0;
const mongoose_1 = require("mongoose");
const sportSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Sport must be identified with a name"],
    },
}, {
    timestamps: true,
});
exports.Sport = (0, mongoose_1.model)("Sport", sportSchema);
