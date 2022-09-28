"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeam = exports.updateTeam = exports.createTeam = exports.getTeam = exports.getTeams = void 0;
const team_service_1 = require("../services/team.service");
const service = new team_service_1.teamService();
const getTeams = (_req, res, next) => {
    service
        .find()
        .then((teams) => {
        const successFetched = {
            success: true,
            data: teams,
        };
        res.status(200).json(successFetched);
    })
        .catch(next);
};
exports.getTeams = getTeams;
const getTeam = (req, res, next) => {
    const { id } = req.params;
    service
        .findOne(id)
        .then((team) => {
        const successFetched = {
            success: true,
            data: team,
        };
        res.status(200).json(successFetched);
    })
        .catch(next);
};
exports.getTeam = getTeam;
const createTeam = (req, res, next) => {
    const { name, imageURI } = req.body;
    service
        .create({ name, imageURI: imageURI || null })
        .then((team) => {
        const successCreated = {
            success: true,
            data: team,
        };
        res.status(201).json(successCreated);
    })
        .catch(next);
};
exports.createTeam = createTeam;
const updateTeam = (req, res, next) => {
    const { id } = req.params;
    const { name, imageURI } = req.body;
    service
        .update({ id, name, imageURI: imageURI || null })
        .then((teampdated) => {
        const successUpdated = {
            success: true,
            data: teampdated,
        };
        res.status(200).json(successUpdated);
    })
        .catch(next);
};
exports.updateTeam = updateTeam;
const deleteTeam = (req, res, next) => {
    const { id } = req.params;
    service
        .delete(id)
        .then((teamDeleted) => {
        const successDeleted = {
            success: true,
            data: teamDeleted,
        };
        res.status(200).json(successDeleted);
    })
        .catch(next);
};
exports.deleteTeam = deleteTeam;
