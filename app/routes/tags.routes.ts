import { Router } from "express";
import { tagsController } from "../controllers/index.controllers";

const tagsRouter = Router();

tagsRouter.get('/api/projects/tags/search', tagsController.findTagByTitle);
tagsRouter.get('/api/projects/tags/', tagsController.findAllTags);
tagsRouter.get('/api/projects/tags/:id', tagsController.findTagById);
tagsRouter.post('/api/projects/tags/', tagsController.createNewTag);
tagsRouter.put('/api/projects/tags/:id', tagsController.updateTag);
tagsRouter.delete('/api/projects/tags/:id', tagsController.deleteTag);

export default tagsRouter;
