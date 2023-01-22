"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    objective: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'Objective',
        trim: true
    }
});
exports.Task = (0, mongoose_1.model)('Task', TaskSchema);
