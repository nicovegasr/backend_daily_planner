"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUser = exports.loginUser = exports.registerUser = void 0;
const token_1 = require("../authentication/token");
const objective_1 = require("../models/objective");
const session_1 = require("../models/session");
const task_1 = require("../models/task");
const user_1 = require("../models/user");
const bcrypt = require('bcrypt');
/**
 * @method registerUser is a function used to register a new user in the application.
 * @param {any} req - The request object, which should contain a body with the following fields:
 *   - name: the name of the user to register (string)
 *   - password: the password of the user to register (string)
 * @param {any} res - The response object, which will be used to send the response to the client.
 * @router : /user
 * @returns {void} On success, a status code of 201 will be sent. If the user already exists,
 * a status code of 404 with an error message will be sent. On error, a status code of 500 and the error will be sent.
 */
const registerUser = async (req, res) => {
    try {
        const userExists = await user_1.User.findOne({ name: req.body.name });
        if (userExists) {
            res.status(404).json({ message: "User alredy exist", status: 404 });
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const user = new user_1.User({
                name: req.body.name,
                password: hashedPassword,
                sessions: [],
                token: (0, token_1.generateToken)(req.body.password),
            });
            await user.save();
            res.status(201).send();
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.registerUser = registerUser;
/**
 * @method loginUser is a function used to log in a user to the application.
 *
 * @param {any} req - The request object, which should contain a body with the following fields:
 *   - name: the name of the user logging in (string)
 *   - password: the password of the user logging in (string)
 * @param {any} res - The response object, which will be used to send the response to the client.
 *
 * @router : /user/login
 *
 * @returns {void} On success, a status code of 200 will be sent. If the user does not exist, a status code of 404 will be sent. If the password is incorrect, a status code of 400 will be sent. On error, a status code of 500 and the error will be sent.
 */
const loginUser = async (req, res) => {
    try {
        const userExists = await user_1.User.findOne({ name: req.body.name });
        if (userExists) {
            await bcrypt.compare(req.body.password, userExists.password) ? res.status(200).send({ token: (0, token_1.generateToken)(userExists._id.toString()) }) : res.status(400).send();
        }
        else {
            res.status(404).send();
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.loginUser = loginUser;
/**
 * @method getUser is a function used to retrieve a user from the application.
 *
 * @param {any} req - The request object, which should contain a query string with the following field:
 *   - name: the name of the user to retrieve (string).
 * @param {any} res - The response object, which will be used to send the response to the client.
 *
 * * @router : /user
 *
 * @returns {void} On success, a status code of 200 and the user(s) will be sent. If no user is found, a
 * status code of 404 will be sent. On error, a status code of 500 will be sent.
 */
const getUser = async (req, res) => {
    const filter = { name: req.query.name };
    user_1.User.findOne(filter).select('-password').then((user) => {
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.status(404).send();
        }
    }).catch(() => {
        res.status(500).send();
    });
};
exports.getUser = getUser;
/**
 * @method deleteUser is a function used to delete a user and all of their associated sessions, objectives, and tasks from the application.
 *
 * @param {Request} req - The request object, which should contain a query string with the following field:
 *   - name: the name of the user to delete (string)
 * @param {Response} res - The response object, which will be used to send the response to the client.
 *
 * @route: /user
 *
 * @returns {void} On success, a status code of 200 and a message will be sent. If no user is found, a status code of 404 and a message will be sent. On error, a status code of 500 and an error message will be sent.
 */
const deleteUser = async (req, res) => {
    user_1.User.findOneAndDelete({ name: req.query.name })
        .then((result) => {
        if (result) {
            result.sessions.forEach((session) => {
                let filter = session.toString();
                session_1.Session.findByIdAndDelete(filter)
                    .then((each_session) => {
                    each_session?.objectives.forEach((objective) => {
                        let filter = objective.toString();
                        objective_1.Objective.findByIdAndDelete(filter)
                            .then((each_objectives) => {
                            each_objectives?.tasks.forEach((task) => {
                                let filter = task.toString();
                                task_1.Task.findByIdAndDelete(filter)
                                    .then(() => {
                                    res.status(200);
                                });
                            });
                        });
                    });
                });
            });
            res.status(200).send("User, User's session, objectives and tasks deleted.");
        }
        else {
            res.status(404).json({ message: "User not Found" });
        }
    })
        .catch((err) => {
        res.status(500).json({ error: err });
    });
};
exports.deleteUser = deleteUser;
