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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _eventService_instances, _eventService_validateId;
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventService = void 0;
const mongoose_1 = require("mongoose");
const custom_error_model_1 = require("../models/custom-error.model");
const event_model_1 = require("../database/models/event.model");
class eventService {
    constructor() {
        _eventService_instances.add(this);
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield event_model_1.Event.find({});
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _eventService_instances, "m", _eventService_validateId).call(this, id);
            const event = yield event_model_1.Event.findById(id);
            if (!event) {
                throw new custom_error_model_1.CustomError("Event doesn't exists", 404);
            }
            return event;
        });
    }
    create({ name, initDate, teams, sport, results, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const alreadyExist = yield event_model_1.Event.exists({ name, initDate });
            if (alreadyExist) {
                throw new custom_error_model_1.CustomError("Event already created previously with the same name and date", 409);
            }
            const newEvent = { name, initDate, teams, sport, results };
            const sportCreated = yield event_model_1.Event.create(newEvent);
            return sportCreated;
        });
    }
    update({ id, data }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object.keys(data).length) {
                throw new custom_error_model_1.CustomError("You don't send any data to update. If you want clean up the Event, you can delete it", 400);
            }
            __classPrivateFieldGet(this, _eventService_instances, "m", _eventService_validateId).call(this, id);
            const eventUpdated = yield event_model_1.Event.findByIdAndUpdate(id, data, {
                returnDocument: "after",
            });
            if (!eventUpdated) {
                throw new custom_error_model_1.CustomError("Event doesn't exist", 404);
            }
            return eventUpdated;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _eventService_instances, "m", _eventService_validateId).call(this, id);
            const eventDeleted = yield event_model_1.Event.findByIdAndDelete(id);
            if (!eventDeleted) {
                return { info: "There's no any event to delete :)" };
            }
            return eventDeleted;
        });
    }
}
exports.eventService = eventService;
_eventService_instances = new WeakSet(), _eventService_validateId = function _eventService_validateId(id) {
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        throw new custom_error_model_1.CustomError("Id is invalid. You must send a string of 12 Bytes or a string of 24 hex characters", 400);
    }
};
