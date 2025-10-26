import { Request, Response } from "express";
import IGame, { IGameUpdateResult } from "../interfaces/IGame";
import { gamesService } from "../services/index.services";
import { ResultSetHeader } from "mysql2/promise";

const findAllGames = async (_req: Request, res:Response) => {
  try {
    const gamesList: IGame[] | string = await gamesService.findAllGames();

    if (typeof gamesList === 'string') {
      return res.status(404).json({ message: gamesList });
    }

    return res.status(200).json(gamesList);
  } catch (error) {
    res.status(500)
      .json({
        message: `Erro no servidor ao listar jogos: ${(error as Error).message}`
      });
  }
};

const findGameById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const game: IGame | string = await gamesService.findGameById(Number(id));
    
    if (typeof game === 'string') {
      return res.status(404).json({ message: game });
    }

    return res.status(200).json(game);
  } catch (error) {
    res.status(500)
      .json({
        message: `Erro no servidor ao buscar jogo: ${(error as Error).message}`
      });
  }
};

const createNewGame = async (req: Request, res: Response) => {
  try {
    const gameData: IGame = req.body;
    const newGame: IGame | string = await gamesService.createNewGame(gameData);

    if (typeof newGame === 'string') {
      return res.status(400).json({ message: newGame });
    }

    return res.status(201).json(newGame);
  } catch (error) {
    res.status(500)
      .json({
        message: `Erro no servidor ao cadastrar jogo: ${(error as Error).message}`
      });
  }
};

const updateGame = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const gameData: IGame = req.body;

    const updatedGame: IGameUpdateResult | string = await gamesService
      .updateGame(gameData, Number(id));

    if (typeof updatedGame === 'string') {
      return res.status(400).json({ message: updatedGame });
    }

    return res.status(202).json(updatedGame);
  } catch (error) {
    res.status(500)
      .json({
        message: `Erro no servidor ao atualizar jogo: ${(error as Error).message}`
      });
  }
};

const deleteGame = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const exclusionResult: ResultSetHeader | string = await gamesService.deleteGame(Number(id));

    if (typeof exclusionResult === 'string') {
      return res.status(400).json({ message: exclusionResult });
    }

    return res
      .status(202)
      .json({
        result: exclusionResult,
        message: `Jogo com o id ${id} excluído com sucesso.`
      });
  } catch (error) {
    res.status(500)
      .json({
        message: `Erro no servidor ao excluir jogo: ${(error as Error).message}`
      });
  }
};

export {
  findAllGames,
  findGameById,
  createNewGame,
  updateGame,
  deleteGame,
};