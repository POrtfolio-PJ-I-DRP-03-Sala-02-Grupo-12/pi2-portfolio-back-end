import { Request, Response } from "express";
import IGameImage, { IGameImageUpdateResult } from "../interfaces/IGameImage";
import { gameImagesService } from "../services/index.services";
import { ResultSetHeader } from "mysql2/promise";

const findAllGameImages = async (_req: Request, res: Response) => {
  try {
    const imagesList: IGameImage[] | string = await gameImagesService.findAllGameImages();

    if (typeof imagesList === 'string') {
      return res.status(404).json({ message: imagesList });
    }

    return res.status(200).json(imagesList);
  } catch (error) {
    res.status(500)
      .json({
        message: `Erro no servidor ao listar imagens de jogos: ${(error as Error).message}`
      });
  }
};

const findGameImageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const gameImage: IGameImage | string = await gameImagesService.findGameImageById(Number(id));
    
    if (typeof gameImage === 'string') {
      return res.status(404).json({ message: gameImage });
    }

    return res.status(200).json(gameImage);
  } catch (error) {
    res.status(500)
      .json({
        message: `Erro no servidor ao buscar imagem de jogo: ${(error as Error).message}`
      });
  }
};

const createNewGameImage = async (req: Request, res: Response) => {
  try {
    const gameImageData: IGameImage = req.body;
    const newGameImage: IGameImage | string = await gameImagesService.createNewGameImage(gameImageData);

    if (typeof newGameImage === 'string') {
      return res.status(400).json({ message: newGameImage });
    }

    return res.status(201).json(newGameImage);
  } catch (error) {
    res.status(500)
      .json({
        message: `Erro no servidor ao cadastrar imagem de jogo: ${(error as Error).message}`
      });
  }
};

const updateGameImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const gameImageData: IGameImage = req.body;
    const updatedGameImage: IGameImageUpdateResult | string = await
      gameImagesService.updateGameImage(gameImageData, Number(id));

    if (typeof updatedGameImage === 'string') {
      return res.status(400).json({ message: updatedGameImage });
    }

    return res.status(202).json(updatedGameImage);
  } catch (error) {
    res.status(500)
      .json({
        message: `Erro no servidor ao atualizar imagem de jogo: ${(error as Error).message}`
      });
  }
};

const deleteGameImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteResult: ResultSetHeader | string = await gameImagesService.deleteGameImage(Number(id));

    if (typeof deleteResult === 'string') {
      return res.status(400).json({ message: deleteResult });
    }

    return res.status(202).json({
      result: deleteResult,
      message: `Imagem de jogo, com o id ${id}, deletada com sucesso.`
    });
  } catch (error) {
    res.status(500)
      .json({
        message: `Erro no servidor ao deletar imagem de jogo: ${(error as Error).message}`
      });
  }
};

export {
  findAllGameImages,
  findGameImageById,
  createNewGameImage,
  updateGameImage,
  deleteGameImage
};