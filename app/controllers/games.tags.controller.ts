import { Request, Response } from "express";
import { gamesService, gamesTagsService, tagsService } from "../services/index.services";
import IGameTag from "../interfaces/IGameTag";
import { ResultSetHeader } from "mysql2/promise";
import IGame from "../interfaces/IGame";
import ITag from "../interfaces/ITag";

const findAllGamesTags = async (_req: Request, res: Response) => {
  try {
    const gamesTags: IGameTag[] | string = await gamesTagsService
      .findAllGamesTags();

    if (typeof gamesTags === 'string') {
      return res.status(404).json({ message: gamesTags });
    }
    
    return res.status(200).json(gamesTags);
  } catch (error) {
    return res.status(500)
    .json({
      message: 'Erro no servidor ao buscar jogos associados a categorias: '
      + (error as Error).message
    });
  }
};

const createNewGameTag = async (req: Request, res: Response) => {
  try {
    const gameTag = req.body;
    const newGameTag: IGameTag | string = await gamesTagsService
      .createNewGameTag(gameTag);

    if (typeof newGameTag === 'string') {
      return res.status(400).json({ message: newGameTag });
    }

    return res.status(201).json(newGameTag);
  } catch (error) {
    return res.status(500)
    .json({
      message: 'Erro no servidor ao associar categoria ao jogo: '
      + (error as Error).message
    });
  }
};

const deleteGameTag = async (req: Request, res: Response) => {
  try {
    const { gameId, tagId } = req.params;

    const deletedGameTag: ResultSetHeader | string = await gamesTagsService
      .deleteGameTag(Number(gameId), Number(tagId));

    if (typeof deletedGameTag === 'string') {
      return res.status(400).json({ message: deletedGameTag });
    }

    const game: IGame | string = await gamesService
      .findGameById(Number(gameId));

    const tag: ITag | string = await tagsService.findTagById(Number(tagId));

    if (
      !game
      || typeof game === 'string'
      || !tag
      || typeof tag === 'string'
      || !game.id
      || !tag.id
    ) {
      res
        .status(404)
        .json({
          message: `Não encontramos jogo com id: ${gameId} ou categria com o id
          ${tagId}, favor verificar os dados.`
        });
    }

    return res.status(202).json({
      deletedGameTag,
      message: 'Relacionamento entre ' 
      + (typeof game === 'object' && 'title' in game
          ? game.title.toUpperCase()
          : ''
        )
      + ' e '
      + (typeof tag === 'object' && 'title' in tag
          ? tag.title.toUpperCase()
          : ''
        )
      + ' excluído com sucesso.'
    });
  } catch (error) {
    return res.status(500)
    .json({
      message: 'Erro no servidor ao deletar associação da categoria ao jogo: '
      + (error as Error).message
    });
  }
};

export {
  findAllGamesTags,
  createNewGameTag,
  deleteGameTag,
};