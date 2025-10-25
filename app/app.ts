import dotenv from 'dotenv';
dotenv.config();
import express, { NextFunction, Request, Response } from 'express';
import connection from './models/connection';
import {
    gameImagesRouter,
    gamesRouter,
    gamesTagsRouter,
    tagsRouter,
} from './routes/index.routes';

const app = express();

app.use(express.json());

app.use((req: Request, _res: Response, next: NextFunction) => {
    req.db = connection;
    next();
});

app.use(gamesRouter);
app.use(gameImagesRouter);
app.use(tagsRouter);
app.use(gamesTagsRouter);

export default app;