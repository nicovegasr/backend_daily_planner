"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const user_1 = require("../models/user");
const token_1 = require("./token");
const authentication = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token;
        const decoded = await (0, token_1.decodeToken)(token);
        const userExists = await user_1.User.findById(decoded.id);
        if (userExists) {
            next();
        }
        else {
            res.status(401).send();
        }
    }
    catch {
        res.status(404).send();
    }
};
exports.authentication = authentication;
