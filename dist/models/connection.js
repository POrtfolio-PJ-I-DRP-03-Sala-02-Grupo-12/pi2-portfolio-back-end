"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv");
const promise_1 = __importDefault(require("mysql2/promise"));
const connection = promise_1.default.createPool({
    uri: process.env.DATABASE_URL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
connection.getConnection()
    .then(() => {
    console.log('Conectado ao banco de dados no Railway');
})
    .catch((error) => {
    console.error('Erro ao conectar com o banco:', error.message);
});
exports.default = connection;
