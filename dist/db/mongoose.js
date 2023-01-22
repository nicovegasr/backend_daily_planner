"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
mongoose_1.default.set('strictQuery', false);
/**
 * Connects to the Mongo server
 */
mongoose_1.default.connect('mongodb+srv://admin:admin@cluster0.kousrlu.mongodb.net/main-app?retryWrites=true&w=majority', { sslValidate: false }).then(() => {
    console.log('Connection to MongoDB server established');
}).catch((error) => {
    console.log('Unnable to connect to MongoDB server');
    console.log(error);
});
