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
    res.json(users);
});
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((user) => user.id === parseInt(id));
    if (!user) {
        const errorNoData = {
            success: false,
            message: "User doesn't exists",
        };
        res.status(400).json(errorNoData);
        return;
    }
    res.json(user);
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
exports.default = router;
