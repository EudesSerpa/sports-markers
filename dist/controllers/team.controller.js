"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeam = exports.getTeam = exports.getTeams = void 0;
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
