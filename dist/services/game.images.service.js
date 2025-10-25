"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGameImage = exports.updateGameImage = exports.createNewGameImage = exports.findGameImageById = exports.findAllGameImages = void 0;
const index_model_1 = require("../models/index.model");
const findAllGameImages = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameImagesList = yield index_model_1.gameImageModel.findAllImages();
        if (!gameImagesList || gameImagesList.length === 0)
            return "Não encontramos imagens de jogos cadastradas.";
        return gameImagesList;
    }
    catch (error) {
        return `Erro ao buscar imagens de jogos: ${error.message}`;
    }
});
exports.findAllGameImages = findAllGameImages;
const findGameImageById = (idToSearch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameImage = yield index_model_1.gameImageModel.findImageById(idToSearch);
        if (!gameImage || gameImage === null) {
            return `Não conseguimos encontrar a imagem do jogo pelo id ${idToSearch}`;
        }
        return gameImage;
    }
    catch (error) {
        return `Ocorreu um erro na busca: ${error.message}`;
    }
});
exports.findGameImageById = findGameImageById;
const createNewGameImage = (gameImage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newGameImage = yield index_model_1.gameImageModel.createNewImage(gameImage);
        if (!newGameImage || !newGameImage.id || newGameImage === null) {
            return `Não foi possível cadastrar a imagem do jogo com os seguintes dados:
        jogoId: ${gameImage.gameId}
        url: ${gameImage.url}
        descrição: ${gameImage.description}
      `;
        }
        return newGameImage;
    }
    catch (error) {
        return `Ocorreu um erro no registro de nova imagem de jogo: ${error.message}`;
    }
});
exports.createNewGameImage = createNewGameImage;
const updateGameImage = (gameImageToUpdate, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedGameImage = yield index_model_1.gameImageModel
            .updateImage(gameImageToUpdate, id);
        if (!updatedGameImage)
            return `Não foi possível alterar os dados da imagem do jogo com o id ${id}`;
        return updatedGameImage;
    }
    catch (error) {
        return `Ocorreu um erro na alteração de dados da imagem do jogo. ${error.message}`;
    }
});
exports.updateGameImage = updateGameImage;
const deleteGameImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedGameImage = yield index_model_1.gameImageModel.deleteImage(id);
        if (!deletedGameImage)
            return `Não foi possível deletar a imagem do jogo com o id ${id}`;
        return deletedGameImage;
    }
    catch (error) {
        return `Ocorreu um erro na exclusão da imagem do jogo. ${error.message}`;
    }
});
exports.deleteGameImage = deleteGameImage;
