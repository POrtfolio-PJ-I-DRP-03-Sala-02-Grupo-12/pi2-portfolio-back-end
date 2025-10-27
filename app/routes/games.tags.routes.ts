import { Router } from "express";
import { gamesTagsController } from "../controllers/index.controllers";

const gamesTagsRouter = Router();

gamesTagsRouter.get("/api/projects/games/tags", gamesTagsController.findAllGamesTags);
gamesTagsRouter.post("/api/projects/games/tags", gamesTagsController.createNewGameTag);
gamesTagsRouter.delete("/api/projects/games/tags/:gameId/:tagId", gamesTagsController.deleteGameTag);

export default gamesTagsRouter;
