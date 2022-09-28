"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const user_service_1 = require("../services/user.service");
const service = new user_service_1.UsersService();
const getUsers = (_req, res, next) => {
    service
        .find()
        .then((users) => {
        const successFetched = {
            success: true,
            data: users,
        };
        res.status(200).json(successFetched);
    })
        .catch(next);
};
exports.getUsers = getUsers;
const getUser = (req, res, next) => {
    const { id } = req.params;
    service
        .findOne(id)
        .then((user) => {
        const successFetched = {
            success: true,
            data: user,
        };
        res.status(200).json(successFetched);
    })
        .catch(next);
};
exports.getUser = getUser;
const createUser = (req, res, next) => {
    const { username, password } = req.body;
    service
        .create({ username, password })
        .then((user) => {
        const successCreated = {
            success: true,
            data: user,
        };
        res.status(201).json(successCreated);
    })
        .catch(next);
};
exports.createUser = createUser;
const updateUser = (req, res, next) => {
    const { id } = req.params;
    const { username } = req.body;
    service
        .update({ id, username })
        .then((userUpdated) => {
        const successUpdated = {
            success: true,
            data: userUpdated,
        };
        res.status(200).json(successUpdated);
    })
        .catch(next);
};
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => {
    const { id } = req.params;
    service
        .delete(id)
        .then((userDeleted) => {
        const successDeleted = {
            success: true,
            data: userDeleted,
        };
        res.status(200).json(successDeleted);
    })
        .catch(next);
};
exports.deleteUser = deleteUser;
