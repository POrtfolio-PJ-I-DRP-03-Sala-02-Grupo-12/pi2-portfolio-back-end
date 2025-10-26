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
const index_services_1 = require("../services/index.services");
const findAllGames = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gamesList = yield index_services_1.gamesService.findAllGames();
        if (typeof gamesList === 'string') {
            return res.status(404).json({ message: gamesList });
        }
        return res.status(200).json(gamesList);
    }
    catch (error) {
        res.status(500)
            .json({
            message: `Erro no servidor ao listar jogos: ${error.message}`
        });
    }
});
exports.findAllGames = findAllGames;
const findGameById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const game = yield index_services_1.gamesService.findGameById(Number(id));
        if (typeof game === 'string') {
            return res.status(404).json({ message: game });
        }
        return res.status(200).json(game);
    }
    catch (error) {
        res.status(500)
            .json({
            message: `Erro no servidor ao buscar jogo: ${error.message}`
        });
    }
});
exports.findGameById = findGameById;
const createNewGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameData = req.body;
        const newGame = yield index_services_1.gamesService.createNewGame(gameData);
        if (typeof newGame === 'string') {
            return res.status(400).json({ message: newGame });
        }
        return res.status(201).json(newGame);
    }
    catch (error) {
        res.status(500)
            .json({
            message: `Erro no servidor ao cadastrar jogo: ${error.message}`
        });
    }
});
exports.createNewGame = createNewGame;
const updateGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const gameData = req.body;
        const updatedGame = yield index_services_1.gamesService
            .updateGame(gameData, Number(id));
        if (typeof updatedGame === 'string') {
            return res.status(400).json({ message: updatedGame });
        }
        return res.status(200).json(updatedGame);
    }
    catch (error) {
        res.status(500)
            .json({
            message: `Erro no servidor ao atualizar jogo: ${error.message}`
        });
    }
});
exports.updateGame = updateGame;
const deleteGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const exclusionResult = yield index_services_1.gamesService.deleteGame(Number(id));
        if (typeof exclusionResult === 'string') {
            return res.status(400).json({ message: exclusionResult });
        }
        return res
            .status(200)
            .json({
            result: exclusionResult,
            message: `Jogo com o id ${id} excluído com sucesso.`
        });
    }
    catch (error) {
        res.status(500)
            .json({
            message: `Erro no servidor ao excluir jogo: ${error.message}`
        });
    }
});
exports.deleteGame = deleteGame;
