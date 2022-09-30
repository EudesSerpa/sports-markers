"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeam = exports.updateTeam = exports.createTeam = exports.getTeam = exports.getTeams = void 0;
const team_service_1 = require("../services/team.service");
const response_1 = require("../helpers/network/response");
const service = new team_service_1.teamService();
const getTeams = (_req, res, next) => {
    service
        .find()
        .then((teams) => {
        (0, response_1.successResponse)(res, teams);
    })
        .catch(next);
};
exports.getTeams = getTeams;
const getTeam = (req, res, next) => {
    const { id } = req.params;
    service
        .findOne(id)
        .then((team) => {
        (0, response_1.successResponse)(res, team);
    })
        .catch(next);
};
exports.getTeam = getTeam;
const createTeam = (req, res, next) => {
    const { name, imageURI } = req.body;
    service
        .create({ name, imageURI: imageURI || null })
        .then((team) => {
        (0, response_1.successResponse)(res, team, 201);
    })
        .catch(next);
};
exports.createTeam = createTeam;
const updateTeam = (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    service
        .update({ id, data })
        .then((teamUpdated) => {
        (0, response_1.successResponse)(res, teamUpdated);
    })
        .catch(next);
};
exports.updateTeam = updateTeam;
const deleteTeam = (req, res, next) => {
    const { id } = req.params;
    service
        .delete(id)
        .then((teamDeleted) => {
        (0, response_1.successResponse)(res, teamDeleted);
    })
        .catch(next);
};
exports.deleteTeam = deleteTeam;
