"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getEvent = exports.getEvents = void 0;
const event_service_1 = require("../services/event.service");
const service = new event_service_1.eventService();
const getEvents = (_req, res, next) => {
    service
        .find()
        .then((events) => {
        const successFetched = {
            success: true,
            data: events,
        };
        res.status(200).json(successFetched);
    })
        .catch(next);
};
exports.getEvents = getEvents;
const getEvent = (req, res, next) => {
    const { id } = req.params;
    service
        .findOne(id)
        .then((event) => {
        const successFetched = {
            success: true,
            data: event,
        };
        res.status(200).json(successFetched);
    })
        .catch(next);
};
exports.getEvent = getEvent;
const createEvent = (req, res, next) => {
    const { name, initDate, teams, sport, results } = req.body;
    service
        .create({ name, initDate, teams, sport, results })
        .then((event) => {
        const successCreated = {
            success: true,
            data: event,
        };
        res.status(201).json(successCreated);
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
        const successUpdated = {
            success: true,
            data: eventUpdated,
        };
        res.status(200).json(successUpdated);
    })
        .catch(next);
};
exports.updateEvent = updateEvent;
const deleteEvent = (req, res, next) => {
    const { id } = req.params;
    service
        .delete(id)
        .then((eventDeleted) => {
        const successDeleted = {
            success: true,
            data: eventDeleted,
        };
        res.status(200).json(successDeleted);
    })
        .catch(next);
};
exports.deleteEvent = deleteEvent;
