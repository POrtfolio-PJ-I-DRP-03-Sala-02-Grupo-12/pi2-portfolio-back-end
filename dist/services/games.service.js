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
exports.deleteGame = exports.updateGame = exports.createNewGame = exports.findGameById = exports.findAllGames = void 0;
const index_model_1 = require("../models/index.model");
const findAllGames = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gamesList = yield index_model_1.gameModel.findAllGames();
        if (!gamesList || gamesList.length === 0)
            return "Não encontramos jogos cadastrados.";
        return gamesList;
    }
    catch (error) {
        return `Erro ao buscar jogos: ${error.message}`;
    }
});
exports.findAllGames = findAllGames;
const findGameById = (idToSearch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game = yield index_model_1.gameModel.findGameById(idToSearch);
        if (!game || game === null) {
            return `Não conseguimos encontrar o jogo pelo id ${idToSearch}`;
        }
        return game;
    }
    catch (error) {
        return `Ocorreu um erro na busca: ${error.message}`;
    }
});
exports.findGameById = findGameById;
const createNewGame = (game) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newGame = yield index_model_1.gameModel.createNewGame(game);
        if (!newGame || !newGame.id || newGame === null) {
            return `Não foi possível cadastrar o jogo com os seguintes dados:
        título: ${game.title}
        descrição: ${game.description}
        nome do link: ${game.linkName}
        url do link: ${game.linkUrl}
      `;
        }
        return newGame;
    }
    catch (error) {
        return `Ocorreu um erro no registro de novo jogo: ${error.message}`;
    }
});
exports.createNewGame = createNewGame;
const updateGame = (gameToUpdate, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedGame = yield index_model_1.gameModel
            .updateGame(gameToUpdate, id);
        if (!updatedGame)
            return `Não foi possível alterar os dados do jogo com o id ${id}`;
        return updatedGame;
    }
    catch (error) {
        return `Ocorreu um erro na alteração de dados do jogo. ${error.message}`;
    }
});
exports.updateGame = updateGame;
const deleteGame = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const excludedGame = yield index_model_1.gameModel.deleteGame(id);
        if (!excludedGame) {
            return `Não foi possível excluir dados do jogo com o id ${id}`;
        }
        console.log(excludedGame);
        return excludedGame;
    }
    catch (error) {
        return `Ocorreu um erro ao tentar excluir o jogo do banco de dados. ${error.message}`;
    }
});
exports.deleteGame = deleteGame;
