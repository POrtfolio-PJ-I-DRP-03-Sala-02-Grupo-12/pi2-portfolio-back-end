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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const game_image_model_1 = require("../../models/game.image.model");
const game_images_mock_1 = require("../mocks/game.images.mock");
const connection_1 = __importDefault(require("../../models/connection"));
jest.mock('../../models/connection.ts', () => ({
    __esModule: true,
    default: {
        query: jest.fn(),
    }
}));
describe('TESTES DO MODELO GAME IMAGE', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('LISTA - Retorna corretamente a lista de imagens dos jogos cadastrados', () => __awaiter(void 0, void 0, void 0, function* () {
        connection_1.default.query
            .mockResolvedValueOnce([game_images_mock_1.mockGameImagesList, []]);
        const imagesList = yield (0, game_image_model_1.findAllImages)();
        expect(connection_1.default.query).toHaveBeenCalledTimes(1);
        expect(imagesList).toEqual(game_images_mock_1.mockGameImagesList);
    }));
    it('ALTERAÇÃO - Atualiza corretamente uma imagem de jogo', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockImageId = 1;
        connection_1.default.query
            .mockResolvedValueOnce([{ insertId: mockImageId }, []]);
        connection_1.default.query
            .mockResolvedValueOnce([[game_images_mock_1.mockNewGameImage], []]);
        connection_1.default.query
            .mockResolvedValueOnce([{ affectedRows: 1 }, []]);
        connection_1.default.query
            .mockResolvedValueOnce([[game_images_mock_1.mockGameImageUpdated], []]);
        const registerResult = yield (0, game_image_model_1.createNewImage)(game_images_mock_1.mockNewGameImage);
        expect(registerResult).not.toBeNull();
        expect(registerResult === null || registerResult === void 0 ? void 0 : registerResult.id).toBeDefined();
        const createdImageId = registerResult === null || registerResult === void 0 ? void 0 : registerResult.id;
        const imageBeforeUpdate = yield (0, game_image_model_1.findImageById)(createdImageId);
        yield (0, game_image_model_1.updateImage)(game_images_mock_1.mockGameImageUpdated, createdImageId);
        const imageAfterUpdate = yield (0, game_image_model_1.findImageById)(createdImageId);
        expect(connection_1.default.query).toHaveBeenCalledTimes(4);
        expect(createdImageId).toEqual(mockImageId);
        expect(imageBeforeUpdate).toEqual(game_images_mock_1.mockNewGameImage);
        expect(imageAfterUpdate).toEqual(game_images_mock_1.mockGameImageUpdated);
    }));
});
