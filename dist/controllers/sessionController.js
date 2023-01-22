"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSession = exports.getSessionById = exports.getSession = exports.createSession = void 0;
const objective_1 = require("../models/objective");
const session_1 = require("../models/session");
const task_1 = require("../models/task");
const user_1 = require("../models/user");
/**
 * @method createSession is a function used to create a new session for a specific user in the application.
 *
 * @param {any} req - The request object, which should contain a body with the following fields:
 *   - name: the name of the session (string)
 *   - user: the ID of the user who owns the session (string)
 *   - time: the time of the session (string)
 * @param {any} res - The response object, which will be used to send the response to the client.
 *
 * @route : /session
 *
 * @returns {void} On success, a status code of 201 will be sent. On error, a status code of 500 will be sent.
 */
const createSession = async (req, res) => {
    const session = new session_1.Session({
        name: req.body.name,
        user: req.body.user,
        time: req.body.time,
        objetives: [],
    });
    try {
        const user = await user_1.User.findById(req.body.user.toString());
        if (user) {
            user.sessions.push(session);
            const userPromise = user.save();
            const sessionPromise = session.save();
            Promise.all([userPromise, sessionPromise])
                .then(() => {
                // ambos documentos han sido guardados con éxito
                res.status(201).send();
            })
                .catch((error) => {
                // alguno de los guardados ha fallado
                res.status(500).send(error);
            });
        }
        else {
            res.status(404).send();
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.createSession = createSession;
/**
 * @method getSession is a function used to retrieve a session for a specific user from the application.
 *
 * @param {any} req - The request object, which should contain a query string with the following fields:
 *   - name: the name of the session to retrieve (string)
 *   - user: the name of the user who owns the session (string)
 * @param {any} res - The response object, which will be used to send the response to the client.
 *
 * @route : /session
 *
 * @returns {void} On success, a status code of 200 and the session will be sent. If no session is found, a status code of 404 will be sent. On error, a status code of 500 will be sent.
 */
const getSession = async (req, res) => {
    const filter = { name: req.query.name, user: req.query.user };
    session_1.Session.find(filter).then((session) => {
        if (session.length !== 0) {
            res.status(200).send(session);
        }
        else {
            res.status(404).send();
        }
    }).catch(() => {
        res.status(500).send();
    });
};
exports.getSession = getSession;
const getSessionById = async (req, res) => {
    session_1.Session.findById(req.query.id).then((session) => {
        res.status(200).send(session);
    }).catch(() => {
        res.status(404).send();
    });
};
exports.getSessionById = getSessionById;
/**
 * @method deleteSession is a function used to delete a specific session and all of its associated objectives and tasks from the application.
 *
 * @param {any} req - The request object, which should contain a query string with the following fields:
 *   - name: the name of the session to delete (string)
 *   - user: the name of the user who owns the session (string)
 * @param {any} res - The response object, which will be used to send the response to the client.
 *
 * @returns {void} On success, a status code of 200 and a message will be sent. If no session is found, a status code of 404 will be sent. On error, a status code of 500 and an error message will be sent.
 */
const deleteSession = async (req, res) => {
    session_1.Session.findOneAndDelete({ name: req.query.name, user: req.query.user })
        .then((each_session) => {
        if (each_session) {
            each_session.objectives.forEach((objective) => {
                let filter = objective.toString();
                objective_1.Objective.findByIdAndDelete(filter)
                    .then((each_objectives) => {
                    each_objectives?.tasks.forEach((task) => {
                        let filter = task.toString();
                        task_1.Task.findByIdAndDelete(filter);
                    });
                });
            });
            res.status(200).send("Session, session's objectives and tasks deleted.");
        }
        else {
            res.status(404).send();
        }
    })
        .catch((err) => {
        res.status(500).json({ error: err });
    });
};
exports.deleteSession = deleteSession;
