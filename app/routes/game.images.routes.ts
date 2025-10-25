import { Router } from "express";
import { gamesImagesController } from "../controllers/index.controllers";

const gameImagesRoutes = Router();

gameImagesRoutes.get('/api/projects/images', gamesImagesController.findAllGameImages);
gameImagesRoutes.get('/api/projects/images/:id', gamesImagesController.findGameImageById);
gameImagesRoutes.post('/api/projects/images', gamesImagesController.createNewGameImage);
gameImagesRoutes.put('/api/projects/images/:id', gamesImagesController.updateGameImage);
gameImagesRoutes.delete('/api/projects/images/:id', gamesImagesController.deleteGameImage);

export default gameImagesRoutes;

