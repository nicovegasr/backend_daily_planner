"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express = require("express");
const auth_token_1 = require("../authentication/auth-token");
const taskController_1 = require("../controllers/taskController");
/**
 * Contains all the functionality of tasks
 */
exports.taskRouter = express.Router();
exports.taskRouter.post('/task', auth_token_1.authentication, taskController_1.createTask);
exports.taskRouter.get('/task', auth_token_1.authentication, taskController_1.getTask);
exports.taskRouter.delete('/task', auth_token_1.authentication, taskController_1.deleteTask);
