import { ResultSetHeader } from "mysql2/promise";
import IGameTag from "../interfaces/IGameTag";
import { gameTagModel } from "../models/index.model";

const findAllGamesTags = async ():Promise<IGameTag[] | string> => {
  try {
    const gamesTags: IGameTag[] | null = await gameTagModel.findAllGamesTags();

    if (!gamesTags || gamesTags.length === 0) {
      return 'Não encontramos jogos com categorias associadas.';
    }

    return gamesTags;
  } catch (error) {
    return `Erro ao buscar jogos com categorias: ${(error as Error).message}`;
  }
};

const createNewGameTag = async (gameTag: IGameTag): Promise<IGameTag | string> => {
  try {
    const newGameTag: IGameTag | null = await gameTagModel.createNewGameTag(gameTag);

    if (!newGameTag || newGameTag === null) {
      return `Não foi possível associar a categoria ao jogo com os seguintes dados:
        gameId: ${gameTag.gameId}
        tagId: ${gameTag.tagId}
      `;
    }

    return newGameTag;
  } catch (error) {
    return `Ocorreu um erro ao associar a categoria ao jogo: ${(error as Error).message}`;
  }
};

const deleteGameTag = async (gameId: number, tagId: number): Promise<ResultSetHeader | string> => {
  try {
    const deletedGameTag: ResultSetHeader | null = await gameTagModel.deleteGameTag(gameId, tagId);

    if (!deletedGameTag) {
      return `Não foi possível deletar a associação da categoria ao jogo com os seguintes dados:
        gameId: ${gameId}
        tagId: ${tagId}
      `;
    }

    return deletedGameTag;
  } catch (error) {
    return `Ocorreu um erro ao deletar a associação da categoria ao jogo: ${(error as Error).message}`;
  }
};

export {
  findAllGamesTags,
  createNewGameTag,
  deleteGameTag,
};