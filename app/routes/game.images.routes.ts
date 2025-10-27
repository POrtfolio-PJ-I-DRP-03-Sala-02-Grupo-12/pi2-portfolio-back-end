import { Router } from "express";
import { gamesImagesController } from "../controllers/index.controllers";

const gameImagesRouter = Router();

gameImagesRouter.get('/api/projects/images/', gamesImagesController.findAllGameImages);
gameImagesRouter.get('/api/projects/images/:id', gamesImagesController.findGameImageById);
gameImagesRouter.post('/api/projects/images', gamesImagesController.createNewGameImage);
gameImagesRouter.put('/api/projects/images/:id', gamesImagesController.updateGameImage);
gameImagesRouter.delete('/api/projects/images/:id', gamesImagesController.deleteGameImage);

export default gameImagesRouter;

