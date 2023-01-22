"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectiveRouter = void 0;
const express = require("express");
const auth_token_1 = require("../authentication/auth-token");
const objectiveController_1 = require("../controllers/objectiveController");
/**
 * Contains all the functionality of objectives
 */
exports.objectiveRouter = express.Router();
exports.objectiveRouter.post('/objective', auth_token_1.authentication, objectiveController_1.createObjective);
exports.objectiveRouter.get('/objective', auth_token_1.authentication, objectiveController_1.getObjective);
exports.objectiveRouter.get('/objective/id', auth_token_1.authentication, objectiveController_1.getObjectiveById);
exports.objectiveRouter.delete('/objective', auth_token_1.authentication, objectiveController_1.deleteObjective);
