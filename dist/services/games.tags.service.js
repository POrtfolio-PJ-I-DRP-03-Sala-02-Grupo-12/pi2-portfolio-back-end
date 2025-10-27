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
exports.deleteGameTag = exports.createNewGameTag = exports.findAllGamesTags = void 0;
const index_model_1 = require("../models/index.model");
const findAllGamesTags = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gamesTags = yield index_model_1.gameTagModel.findAllGamesTags();
        if (!gamesTags || gamesTags.length === 0) {
            return 'Não encontramos jogos com categorias associadas.';
        }
        return gamesTags;
    }
    catch (error) {
        return `Erro ao buscar jogos com categorias: ${error.message}`;
    }
});
exports.findAllGamesTags = findAllGamesTags;
const createNewGameTag = (gameTag) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newGameTag = yield index_model_1.gameTagModel.createNewGameTag(gameTag);
        if (!newGameTag || newGameTag === null) {
            return `Não foi possível associar a categoria ao jogo com os seguintes dados:
        gameId: ${gameTag.gameId}
        tagId: ${gameTag.tagId}
      `;
        }
        return newGameTag;
    }
    catch (error) {
        return `Ocorreu um erro ao associar a categoria ao jogo: ${error.message}`;
    }
});
exports.createNewGameTag = createNewGameTag;
const deleteGameTag = (gameId, tagId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedGameTag = yield index_model_1.gameTagModel.deleteGameTag(gameId, tagId);
        if (!deletedGameTag) {
            return `Não foi possível deletar a associação da categoria ao jogo com os seguintes dados:
        gameId: ${gameId}
        tagId: ${tagId}
      `;
        }
        return deletedGameTag;
    }
    catch (error) {
        return `Ocorreu um erro ao deletar a associação da categoria ao jogo: ${error.message}`;
    }
});
exports.deleteGameTag = deleteGameTag;
