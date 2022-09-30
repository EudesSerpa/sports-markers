"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const user_service_1 = require("../services/user.service");
const response_1 = require("../helpers/network/response");
const service = new user_service_1.UsersService();
const getUsers = (_req, res, next) => {
    service
        .find()
        .then((users) => {
        (0, response_1.successResponse)(res, users);
    })
        .catch(next);
};
exports.getUsers = getUsers;
const getUser = (req, res, next) => {
    const { id } = req.params;
    service
        .findOne(id)
        .then((user) => {
        (0, response_1.successResponse)(res, user);
    })
        .catch(next);
};
exports.getUser = getUser;
const createUser = (req, res, next) => {
    const { username, password } = req.body;
    service
        .create({ username, password })
        .then((user) => {
        (0, response_1.successResponse)(res, user, 201);
    })
        .catch(next);
};
exports.createUser = createUser;
const updateUser = (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    service
        .update({ id, data })
        .then((userUpdated) => {
        (0, response_1.successResponse)(res, userUpdated);
    })
        .catch(next);
};
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => {
    const { id } = req.params;
    service
        .delete(id)
        .then((userDeleted) => {
        (0, response_1.successResponse)(res, userDeleted);
    })
        .catch(next);
};
exports.deleteUser = deleteUser;
