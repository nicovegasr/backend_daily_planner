"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRouter = void 0;
const express = require("express");
/**
 * Contains all non-specified routes
 */
exports.defaultRouter = express.Router();
exports.defaultRouter.all('*', (_, res) => {
    res.status(501).send();
});
