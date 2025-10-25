import { ResultSetHeader } from "mysql2/promise";
import IGameImage from "../interfaces/IGameImage";
import { gameImageModel } from "../models/index.model";

const findAllGameImages = async (): Promise<IGameImage[] | string> => {
  try {
    const gameImagesList: IGameImage[] | null = await gameImageModel.findAllImages();

    if (!gameImagesList || gameImagesList.length === 0) return "Não encontramos imagens de jogos cadastradas.";
    
    return gameImagesList;
  } catch (error) {
    return `Erro ao buscar imagens de jogos: ${(error as Error).message}`;
  }
};

const findGameImageById = async (idToSearch: number): Promise<IGameImage | string> => {
  try {
    const gameImage: IGameImage | null = await gameImageModel.findImageById(idToSearch);

    if (!gameImage || gameImage === null) {
      return `Não conseguimos encontrar a imagem do jogo pelo id ${idToSearch}`;
    }

    return gameImage;
  } catch (error) {
    return `Ocorreu um erro na busca: ${(error as Error).message}`;
  }
};

const createNewGameImage = async (gameImage: IGameImage): Promise<IGameImage | string> => {
  try {
    const newGameImage: IGameImage | null = await gameImageModel.createNewImage(gameImage);

    if (!newGameImage || !newGameImage.id || newGameImage === null) {
      return `Não foi possível cadastrar a imagem do jogo com os seguintes dados:
        jogoId: ${gameImage.gameId}
        url: ${gameImage.url}
        descrição: ${gameImage.description}
      `;
    }

    return newGameImage;
  } catch (error) {
    return `Ocorreu um erro no registro de nova imagem de jogo: ${(error as Error).message}`;
  }
};

const updateGameImage = async (gameImageToUpdate: IGameImage, id: number): Promise<ResultSetHeader | string> => {
  try {
    const updatedGameImage: ResultSetHeader | null = await gameImageModel
    .updateImage(gameImageToUpdate, id);

    if (!updatedGameImage) return `Não foi possível alterar os dados da imagem do jogo com o id ${id}`;
    
    return updatedGameImage;
  } catch (error) {
    return `Ocorreu um erro na alteração de dados da imagem do jogo. ${(error as Error).message}`;
  }
};

const deleteGameImage = async (id: number): Promise<ResultSetHeader | string> => {
  try {
    const deletedGameImage: ResultSetHeader | null = await gameImageModel.deleteImage(id);

    if (!deletedGameImage) return `Não foi possível deletar a imagem do jogo com o id ${id}`;
    
    return deletedGameImage;
  } catch (error) {
    return `Ocorreu um erro na exclusão da imagem do jogo. ${(error as Error).message}`;
  }
};

export {
  findAllGameImages,
  findGameImageById,
  createNewGameImage,
  updateGameImage,
  deleteGameImage,
};