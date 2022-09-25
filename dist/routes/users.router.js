"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const users = [
    {
        id: 1,
        username: "Khappa",
    },
    {
        id: 2,
        username: "Zo",
    },
];
router.get("/", (_, res) => {
    const successFetched = {
        success: true,
        data: users,
    };
    res.status(200).json(successFetched);
});
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((user) => user.id === parseInt(id));
    if (!user) {
        const errorNoData = {
            success: false,
            message: "User doesn't exists",
        };
        res.status(404).json(errorNoData);
        return;
    }
    const successFetched = {
        success: true,
        data: user,
    };
    res.status(200).json(successFetched);
});
router.post("/", (req, res) => {
    const { username } = req.body;
    if (!username) {
        const errorNoData = {
            success: false,
            message: "Username is missing",
        };
        res.status(400).json(errorNoData);
        return;
    }
    const alreadyExist = users.some((user) => user.username === username);
    if (alreadyExist) {
        const errorRepetData = {
            success: false,
            message: "User already exists",
        };
        res.status(409).json(errorRepetData);
        return;
    }
    users.push({ id: users.length + 1, username });
    const successCreated = {
        success: true,
        data: users,
    };
    res.status(201).json(successCreated);
});
router.patch("/:id", (req, res) => {
    const { id } = req.params;
    const { username } = req.body;
    if (!username) {
        const errorNoData = {
            success: false,
            message: "Username is missing",
        };
        res.status(400).json(errorNoData);
        return;
    }
    const user = users.find((user) => user.id === parseInt(id));
    if (!user) {
        const errorNoData = {
            success: false,
            message: "User doesn't exists",
        };
        res.status(404).json(errorNoData);
        return;
    }
    user.username = username;
    const successUpdated = {
        success: true,
        data: user,
    };
    res.status(200).json(successUpdated);
});
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const userId = users.findIndex((user) => user.id === parseInt(id));
    if (userId === -1) {
        const successDeleted = {
            success: true,
            data: users,
        };
        res.status(200).json(successDeleted);
        return;
    }
    const user = users.splice(userId, 1)[0];
    const successDeleted = {
        success: true,
        data: user,
    };
    res.status(200).json(successDeleted);
});
exports.default = router;
