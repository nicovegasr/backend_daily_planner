"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const mongoose_1 = require("mongoose");
const SessionSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'User',
        required: true,
        trim: true
    },
    time: {
        type: Date,
        trim: true
    },
    objectives: [{
            type: mongoose_1.Schema.Types.ObjectId, ref: 'Objective',
            trim: true
        }]
});
exports.Session = (0, mongoose_1.model)('Session', SessionSchema);
