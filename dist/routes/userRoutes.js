"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express = require("express");
const auth_token_1 = require("../authentication/auth-token");
const userController_1 = require("../controllers/userController");
/**
 * Contains all the functionality of users in the database
 */
exports.userRouter = express.Router();
exports.userRouter.post('/user', userController_1.registerUser);
exports.userRouter.post('/user/login', userController_1.loginUser);
exports.userRouter.get('/user', auth_token_1.authentication, userController_1.getUser);
exports.userRouter.delete('/user', auth_token_1.authentication, userController_1.deleteUser);
