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
const index_services_1 = require("../services/index.services");
const findAllGameImages = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imagesList = yield index_services_1.gameImagesService.findAllGameImages();
        if (typeof imagesList === 'string') {
            return res.status(404).json({ message: imagesList });
        }
        return res.status(200).json(imagesList);
    }
    catch (error) {
        res.status(500)
            .json({
            message: `Erro no servidor ao listar imagens de jogos: ${error.message}`
        });
    }
});
exports.findAllGameImages = findAllGameImages;
const findGameImageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const gameImage = yield index_services_1.gameImagesService.findGameImageById(Number(id));
        if (typeof gameImage === 'string') {
            return res.status(404).json({ message: gameImage });
        }
        return res.status(200).json(gameImage);
    }
    catch (error) {
        res.status(500)
            .json({
            message: `Erro no servidor ao buscar imagem de jogo: ${error.message}`
        });
    }
});
exports.findGameImageById = findGameImageById;
const createNewGameImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameImageData = req.body;
        const newGameImage = yield index_services_1.gameImagesService.createNewGameImage(gameImageData);
        if (typeof newGameImage === 'string') {
            return res.status(400).json({ message: newGameImage });
        }
        return res.status(201).json(newGameImage);
    }
    catch (error) {
        res.status(500)
            .json({
            message: `Erro no servidor ao cadastrar imagem de jogo: ${error.message}`
        });
    }
});
exports.createNewGameImage = createNewGameImage;
const updateGameImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const gameImageData = req.body;
        const updatedGameImage = yield index_services_1.gameImagesService
            .updateGameImage(gameImageData, Number(id));
        if (typeof updatedGameImage === 'string') {
            return res.status(400).json({ message: updatedGameImage });
        }
        return res.status(200).json(updatedGameImage);
    }
    catch (error) {
        res.status(500)
            .json({
            message: `Erro no servidor ao atualizar imagem de jogo: ${error.message}`
        });
    }
});
exports.updateGameImage = updateGameImage;
const deleteGameImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedGameImage = yield index_services_1.gameImagesService.deleteGameImage(Number(id));
        if (typeof deletedGameImage === 'string') {
            return res.status(400).json({ message: deletedGameImage });
        }
        return res.status(200).json(deletedGameImage);
    }
    catch (error) {
        res.status(500)
            .json({
            message: `Erro no servidor ao deletar imagem de jogo: ${error.message}`
        });
    }
});
exports.deleteGameImage = deleteGameImage;
