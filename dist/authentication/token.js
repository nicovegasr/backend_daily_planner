"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.generateToken = void 0;
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'abc123';
/**
 *
 * @param id Id to sign the token.
 * @returns a JWT token with 30 days of time.
 */
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};
exports.generateToken = generateToken;
const decodeToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
exports.decodeToken = decodeToken;
