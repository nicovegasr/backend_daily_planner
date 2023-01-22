"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteObjective = exports.getObjectiveById = exports.getObjective = exports.createObjective = void 0;
const objective_1 = require("../models/objective");
const session_1 = require("../models/session");
const task_1 = require("../models/task");
/**
 * createObjective is a function used to create a new objective for a specific session in the application.
 *
 * @param {any} req - The request object, which should contain a body with the following fields:
 *   - name: the name of the objective (string)
 *   - session: the ID of the session that the objective belongs to (string)
 * @param {any} res - The response object, which will be used to send the response to the client.
 *
 * @route : /objective
 *
 * @returns {void} On success, a status code of 201 will be sent. On error, a status code of 500 will be sent.
 */
const createObjective = async (req, res) => {
    const objective = new objective_1.Objective({
        name: req.body.name,
        session: req.body.session,
        tasks: [],
    });
    try {
        const session = await session_1.Session.findById(req.body.session);
        if (session) {
            session.objectives.push(objective);
            const sessionPromise = session.save();
            const objectivePromise = objective.save();
            Promise.all([sessionPromise, objectivePromise])
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
exports.createObjective = createObjective;
/**
 * @method getObjective is a function used to retrieve an objective for a specific session from the application.
 *
 * @param {any} req - The request object, which should contain a query string with the following fields:
 *   - name: the name of the objective to retrieve (string)
 *   - session: the ID of the session that the objective belongs to (string)
 * @param {any} res - The response object, which will be used to send the response to the client.
 *
 * @route : /objective
 *
 * @returns {void} On success, a status code of 200 and the objective will be sent. If no objective is found, a status code of 404 will be sent. On error, a status code of 500 will be sent.
 */
const getObjective = async (req, res) => {
    const filter = { name: req.query.name, session: req.query.session };
    objective_1.Objective.find(filter).then((objective) => {
        if (objective.length !== 0) {
            res.status(200).send(objective);
        }
        else {
            res.status(404).send();
        }
    }).catch(() => {
        res.status(500).send();
    });
};
exports.getObjective = getObjective;
const getObjectiveById = async (req, res) => {
    objective_1.Objective.findById(req.query.id).then((objective) => {
        res.status(200).send(objective);
    }).catch(() => {
        res.status(404).send();
    });
};
exports.getObjectiveById = getObjectiveById;
/**
 * @method deleteObjective is a function used to delete a specific objective and all of its associated tasks from the application.
 *
 * @param {any} req - The request object, which should contain a query string with the following fields:
 *   - name: the name of the objective to delete (string)
 *   - session: the ID of the session that the objective belongs to (string)
 * @param {any} res - The response object, which will be used to send the response to the client.
 *
 * @route : /objective
 *
 * @returns {void} On success, a status code of 200 will be sent. If no objective is found, a status code of 404 will be sent. On error, a status code of 500 and an error message will be sent.
 */
const deleteObjective = async (req, res) => {
    objective_1.Objective.findOneAndDelete({ name: req.query.name, session: req.query.session })
        .then((each_objectives) => {
        if (each_objectives) {
            each_objectives.tasks.forEach((task) => {
                let filter = task.toString();
                task_1.Task.findByIdAndDelete(filter);
            });
            res.status(200).send();
        }
        else {
            res.status(404).send();
        }
    })
        .catch((err) => {
        res.status(500).json({ error: err });
    });
};
exports.deleteObjective = deleteObjective;
