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
const index_services_1 = require("../services/index.services");
const findAllGamesTags = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gamesTags = yield index_services_1.gamesTagsService
            .findAllGamesTags();
        if (typeof gamesTags === 'string') {
            return res.status(404).json({ message: gamesTags });
        }
        return res.status(200).json(gamesTags);
    }
    catch (error) {
        return res.status(500)
            .json({
            message: 'Erro no servidor ao buscar jogos associados a categorias: '
                + error.message
        });
    }
});
exports.findAllGamesTags = findAllGamesTags;
const createNewGameTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameTag = req.body;
        const newGameTag = yield index_services_1.gamesTagsService
            .createNewGameTag(gameTag);
        if (typeof newGameTag === 'string') {
            return res.status(400).json({ message: newGameTag });
        }
        return res.status(201).json(newGameTag);
    }
    catch (error) {
        return res.status(500)
            .json({
            message: 'Erro no servidor ao associar categoria ao jogo: '
                + error.message
        });
    }
});
exports.createNewGameTag = createNewGameTag;
const deleteGameTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gameId, tagId } = req.params;
        const deletedGameTag = yield index_services_1.gamesTagsService
            .deleteGameTag(Number(gameId), Number(tagId));
        if (typeof deletedGameTag === 'string') {
            return res.status(400).json({ message: deletedGameTag });
        }
        const game = yield index_services_1.gamesService
            .findGameById(Number(gameId));
        const tag = yield index_services_1.tagsService.findTagById(Number(tagId));
        if (!game
            || typeof game === 'string'
            || !tag
            || typeof tag === 'string'
            || !game.id
            || !tag.id) {
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
                    : '')
                + ' e '
                + (typeof tag === 'object' && 'title' in tag
                    ? tag.title.toUpperCase()
                    : '')
                + ' excluído com sucesso.'
        });
    }
    catch (error) {
        return res.status(500)
            .json({
            message: 'Erro no servidor ao deletar associação da categoria ao jogo: '
                + error.message
        });
    }
});
exports.deleteGameTag = deleteGameTag;
