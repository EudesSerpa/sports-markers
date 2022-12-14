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
exports.eventService = void 0;
const event_model_1 = require("../database/models/event.model");
const custom_error_model_1 = require("../models/custom-error.model");
const validateId_1 = require("../helpers/db/validateId");
class eventService {
    constructor() { }
    find({ limit, offset, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            const options = {
                sort: {
                    createdAt: "desc",
                },
                lean: true,
            };
            if (userId) {
                filter.userId = userId;
            }
            if (limit && (offset === 0 || offset)) {
                options.limit = limit;
                options.offset = offset;
                return yield event_model_1.Event.paginate(filter, options);
            }
            return yield event_model_1.Event.find(filter, null, options);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, validateId_1.validateId)(id);
            const event = yield event_model_1.Event.findById(id);
            if (!event) {
                throw new custom_error_model_1.CustomError("Event doesn't exists", 404);
            }
            return event;
        });
    }
    create({ userId, name, initDate, teams, sport, results, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const alreadyExist = yield event_model_1.Event.exists({ userId, name, initDate });
            if (alreadyExist) {
                throw new custom_error_model_1.CustomError("This user has previously created an event with the same name and date", 409);
            }
            const newEvent = { userId, name, initDate, teams, sport, results };
            const eventCreated = yield event_model_1.Event.create(newEvent);
            return yield this.find({ userId });
        });
    }
    update({ id, userId, data, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object.keys(data).length) {
                throw new custom_error_model_1.CustomError("You don't send any data to update. If you want clean up the Event, you can delete it", 400);
            }
            const eventToUpdate = yield this.findOne(id);
            if (eventToUpdate.userId.toString() !== userId) {
                throw new custom_error_model_1.CustomError("This event doesn't belong to the logged in user", 403);
            }
            const eventUpdated = yield event_model_1.Event.findByIdAndUpdate(id, data, {
                returnDocument: "after",
            });
            if (!eventUpdated) {
                throw new custom_error_model_1.CustomError("Event doesn't exist", 404);
            }
            return yield this.find({ userId });
        });
    }
    delete({ id, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, validateId_1.validateId)(id);
            const eventDeleted = yield event_model_1.Event.findByIdAndDelete(id);
            return yield this.find({ userId });
        });
    }
}
exports.eventService = eventService;
