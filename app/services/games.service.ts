import { ResultSetHeader } from "mysql2/promise";
import IGame from "../interfaces/IGame";
import { gameModel } from "../models/index.model";

const findAllGames = async (): Promise<IGame[] | string> => {
  try {
    const gamesList: IGame[] | null = await gameModel.findAllGames();

    if (!gamesList || gamesList.length === 0) return "Não encontramos jogos cadastrados.";
    
    return gamesList;
  } catch (error) {
    return `Erro ao buscar jogos: ${(error as Error).message}`;
  }
};

const findGameById = async (idToSearch: number): Promise<IGame | string> => {
  try {
    const game: IGame | null = await gameModel.findGameById(idToSearch);

    if (!game || game === null) {
      return `Não conseguimos encontrar o jogo pelo id ${idToSearch}`;
    }

    return game;
  } catch (error) {
    return `Ocorreu um erro na busca: ${(error as Error).message}`;
  }
};

const createNewGame = async (game: IGame): Promise<IGame | string> => {
  try {
    const newGame: IGame | null = await gameModel.createNewGame(game);

    if (!newGame || !newGame.id || newGame === null) {
      return `Não foi possível cadastrar o jogo com os seguintes dados:
        título: ${game.title}
        descrição: ${game.description}
        nome do link: ${game.linkName}
        url do link: ${game.linkUrl}
      `;
    }

    return newGame;
  } catch (error) {
    return `Ocorreu um erro no registro de novo jogo: ${(error as Error).message}`;
  }
};

const updateGame = async (gameToUpdate: IGame, id: number): Promise<ResultSetHeader | string> => {
  try {
    const updatedGame: ResultSetHeader | null = await gameModel
    .updateGame(gameToUpdate, id);

    if (!updatedGame) return `Não foi possível alterar os dados do jogo com o id ${id}`;
    
    return updatedGame;
  } catch (error) {
    return `Ocorreu um erro na alteração de dados do jogo. ${(error as Error).message}`;
  }
};

const deleteGame = async (id: number): Promise<ResultSetHeader | string> => {
  try {
    const excludedGame: ResultSetHeader | null = await gameModel.deleteGame(id);

    if (!excludedGame) {
      return `Não foi possível excluir dados do jogo com o id ${id}`;
    }

    console.log(excludedGame);
    
    return excludedGame;
  } catch (error) {
    return `Ocorreu um erro ao tentar excluir o jogo do banco de dados. ${(error as Error).message}`;
  }
};

export {
  findAllGames,
  findGameById,
  createNewGame,
  updateGame,
  deleteGame,
};