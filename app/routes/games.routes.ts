import { Router } from "express";
import { gamesController } from "../controllers/index.controllers";

const gamesRouter = Router();

gamesRouter.get('/api/projects/', gamesController.findAllGames);
gamesRouter.get('/api/projects/:id', gamesController.findGameById);
gamesRouter.post('/api/projects/', gamesController.createNewGame);
gamesRouter.put('/api/projects/:id', gamesController.updateGame);
gamesRouter.delete('/api/projects/:id', gamesController.deleteGame);

export default gamesRouter;
