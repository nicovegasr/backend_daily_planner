"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRouter = void 0;
const express = require("express");
const auth_token_1 = require("../authentication/auth-token");
const sessionController_1 = require("../controllers/sessionController");
/**
 * Contains all the functionality of sessions
 */
exports.sessionRouter = express.Router();
exports.sessionRouter.post('/session', auth_token_1.authentication, sessionController_1.createSession);
exports.sessionRouter.get('/session', auth_token_1.authentication, sessionController_1.getSession);
exports.sessionRouter.get('/session/id', auth_token_1.authentication, sessionController_1.getSessionById);
exports.sessionRouter.delete('/session', auth_token_1.authentication, sessionController_1.deleteSession);
