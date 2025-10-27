"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controllers_1 = require("../controllers/index.controllers");
const gamesTagsRouter = (0, express_1.Router)();
gamesTagsRouter.get("/api/projects/games/tags", index_controllers_1.gamesTagsController.findAllGamesTags);
gamesTagsRouter.post("/api/projects/games/tags", index_controllers_1.gamesTagsController.createNewGameTag);
gamesTagsRouter.delete("/api/projects/games/tags/:gameId/:tagId", index_controllers_1.gamesTagsController.deleteGameTag);
exports.default = gamesTagsRouter;
