"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./models/connection"));
const index_routes_1 = require("./routes/index.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, _res, next) => {
    req.db = connection_1.default;
    next();
});
app.use(index_routes_1.gamesRouter);
app.use(index_routes_1.gameImagesRouter);
app.use(index_routes_1.tagsRouter);
app.use(index_routes_1.gamesTagsRouter);
exports.default = app;
