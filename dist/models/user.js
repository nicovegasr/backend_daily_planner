"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    sessions: [{
            type: mongoose_1.Schema.Types.ObjectId, ref: 'Session',
            required: false,
            unique: false,
            trim: true,
        }],
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
