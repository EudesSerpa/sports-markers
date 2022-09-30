"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSport = exports.updateSport = exports.createSport = exports.getSport = exports.getSports = void 0;
const sport_service_1 = require("../services/sport.service");
const response_1 = require("../helpers/network/response");
const service = new sport_service_1.sportService();
const getSports = (_req, res, next) => {
    service
        .find()
        .then((sports) => {
        (0, response_1.successResponse)(res, sports);
    })
        .catch(next);
};
exports.getSports = getSports;
const getSport = (req, res, next) => {
    const { id } = req.params;
    service
        .findOne(id)
        .then((sport) => {
        (0, response_1.successResponse)(res, sport);
    })
        .catch(next);
};
exports.getSport = getSport;
const createSport = (req, res, next) => {
    const { name } = req.body;
    service
        .create({ name })
        .then((sport) => {
        (0, response_1.successResponse)(res, sport, 201);
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
        (0, response_1.successResponse)(res, sportUpdated);
    })
        .catch(next);
};
exports.updateSport = updateSport;
const deleteSport = (req, res, next) => {
    const { id } = req.params;
    service
        .delete(id)
        .then((sportDeleted) => {
        (0, response_1.successResponse)(res, sportDeleted);
    })
        .catch(next);
};
exports.deleteSport = deleteSport;
