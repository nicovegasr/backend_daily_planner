"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Objective = void 0;
const mongoose_1 = require("mongoose");
const ObjectiveSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    session: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'Session',
        required: true,
        trim: true
    },
    tasks: [{
            type: mongoose_1.Schema.Types.ObjectId, ref: 'Task',
            trim: true
        }]
});
exports.Objective = (0, mongoose_1.model)('Objective', ObjectiveSchema);
