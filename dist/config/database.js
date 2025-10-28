"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
exports.databaseConfig = {
    host: process.env.HOST || 'localhost',
    port: Number(process.env.PORT) || 3306,
    user: process.env.USERNAME || 'root',
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE || 'myapp',
};
// Para Railway, geralmente é necessário SSL
if (process.env.NODE_ENV === 'production') {
    exports.databaseConfig.ssl = {
        rejectUnauthorized: false
    };
}
