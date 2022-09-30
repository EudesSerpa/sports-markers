"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getEvent = exports.getEvents = void 0;
const event_service_1 = require("../services/event.service");
const response_1 = require("../helpers/network/response");
const service = new event_service_1.eventService();
const getEvents = (_req, res, next) => {
    service
        .find()
        .then((events) => {
        (0, response_1.successResponse)(res, events);
    })
        .catch(next);
};
exports.getEvents = getEvents;
const getEvent = (req, res, next) => {
    const { id } = req.params;
    service
        .findOne(id)
        .then((event) => {
        (0, response_1.successResponse)(res, event);
    })
        .catch(next);
};
exports.getEvent = getEvent;
const createEvent = (req, res, next) => {
    const { name, initDate, teams, sport, results } = req.body;
    service
        .create({ name, initDate, teams, sport, results })
        .then((event) => {
        (0, response_1.successResponse)(res, event, 201);
    })
        .catch(next);
};
exports.createEvent = createEvent;
const updateEvent = (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    service
        .update({ id, data })
        .then((eventUpdated) => {
        (0, response_1.successResponse)(res, eventUpdated);
    })
        .catch(next);
};
exports.updateEvent = updateEvent;
const deleteEvent = (req, res, next) => {
    const { id } = req.params;
    service
        .delete(id)
        .then((eventDeleted) => {
        (0, response_1.successResponse)(res, eventDeleted);
    })
        .catch(next);
};
exports.deleteEvent = deleteEvent;
