"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSport = exports.updateSport = exports.createSport = exports.getSport = exports.getSports = void 0;
const sport_service_1 = require("../services/sport.service");
const service = new sport_service_1.sportService();
const getSports = (_req, res, next) => {
    service
        .find()
        .then((sports) => {
        const successFetched = {
            success: true,
            data: sports,
        };
        res.status(200).json(successFetched);
    })
        .catch(next);
};
exports.getSports = getSports;
const getSport = (req, res, next) => {
    const { id } = req.params;
    service
        .findOne(id)
        .then((sport) => {
        const successFetched = {
            success: true,
            data: sport,
        };
        res.status(200).json(successFetched);
    })
        .catch(next);
};
exports.getSport = getSport;
const createSport = (req, res, next) => {
    const { name } = req.body;
    service
        .create({ name })
        .then((sport) => {
        const successCreated = {
            success: true,
            data: sport,
        };
        res.status(201).json(successCreated);
    })
        .catch(next);
};
exports.createSport = createSport;
const updateSport = (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    service
        .update({ id, data })
        .then((sportUpdated) => {
        const successUpdated = {
            success: true,
            data: sportUpdated,
        };
        res.status(200).json(successUpdated);
    })
        .catch(next);
};
exports.updateSport = updateSport;
const deleteSport = (req, res, next) => {
    const { id } = req.params;
    service
        .delete(id)
        .then((sportDeleted) => {
        const successDeleted = {
            success: true,
            data: sportDeleted,
        };
        res.status(200).json(successDeleted);
    })
        .catch(next);
};
exports.deleteSport = deleteSport;
