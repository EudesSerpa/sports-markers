"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Event must have a name"],
    },
    initDate: {
        type: Date,
        required: [true, "Event must have an init date"],
    },
    sport: {
        type: new mongoose_1.Schema({ name: String }, { _id: false }),
        trim: true,
        required: [true, "Event must have a defined sport"],
    },
    teams: {
        type: [
            new mongoose_1.Schema({ name: String, imageURI: String }, { _id: false }),
        ],
        required: [true, "Event must have two teams as items of the teams array"],
    },
    results: {
        type: [],
        required: [true, "Event must have its corresponding result as an array"],
    },
}, {
    timestamps: true,
});
exports.Event = (0, mongoose_1.model)("Event", eventSchema);
