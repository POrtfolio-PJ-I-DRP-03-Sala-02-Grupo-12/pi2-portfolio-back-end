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
jest.mock('../../models/index.model', () => ({
    gameImageModel: {
        findAllImages: jest.fn(),
        findImageById: jest.fn(),
        createNewImage: jest.fn(),
        updateImage: jest.fn(),
        deleteImage: jest.fn(),
    }
}));
const index_model_1 = require("../../models/index.model");
const game_images_service_1 = require("../../services/game.images.service");
const game_images_mock_1 = require("../mocks/game.images.mock");
const games_mock_1 = require("../mocks/games.mock");
describe('TESTES DO SERVIÇO GAME IMAGES', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('LISTAR IMAGENS DE JOGOS', () => {
        describe('Caso não haja imagens cadastradas:', () => {
            it('Deve mostrar uma mensagem de lista vazia', () => __awaiter(void 0, void 0, void 0, function* () {
                const messageShouldBeReturned = "Não encontramos imagens de jogos cadastradas.";
                index_model_1.gameImageModel.findAllImages
                    .mockResolvedValue(null);
                const result = yield (0, game_images_service_1.findAllGameImages)();
                expect(index_model_1.gameImageModel.findAllImages).toHaveBeenCalledTimes(1);
                expect(result).toBe(messageShouldBeReturned);
            }));
        });
        describe('Com imagens cadastrados', () => {
            it('Com três imagens cadastradas, deve retornar um array de tamanho 3.', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameImageModel.findAllImages
                    .mockResolvedValue(game_images_mock_1.mockGameImagesList);
                const result = yield (0, game_images_service_1.findAllGameImages)();
                expect(index_model_1.gameImageModel.findAllImages).toHaveBeenCalledTimes(1);
                expect(result).toHaveLength(3);
            }));
            it('E a lista deve conter os objetos corretos.', () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, game_images_service_1.findAllGameImages)();
                expect(result[0]).toEqual(Object.assign({ id: 1 }, game_images_mock_1.mockGameImagesList[0]));
                expect(result[1]).toEqual(game_images_mock_1.mockGameImage2);
                expect(result[2]).toEqual(game_images_mock_1.mockGameImage3);
            }));
        });
        describe('Em caso de problemas na requisição:', () => {
            it('Deve retornar uma mensagem de erro', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameImageModel.findAllImages
                    .mockRejectedValue(game_images_mock_1.mockError);
                const result = yield (0, game_images_service_1.findAllGameImages)();
                expect(index_model_1.gameImageModel.findAllImages).toHaveBeenCalledTimes(1);
                expect(result).toContain('Erro ao buscar imagens de jogos:');
                expect(result).toContain(game_images_mock_1.errorMessage);
            }));
        });
    });
    describe('BUSCAR UMA IMAGEM POR ID', () => {
        describe('Informando um ID que não existe', () => {
            const nonExistentId = 0;
            const messageToBeReturned = `Não conseguimos encontrar a imagem do jogo pelo id ${nonExistentId}`;
            it('Deve retornar uma mensagem de "Não encontrado"', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameImageModel.findImageById
                    .mockResolvedValue(null);
                const result = yield (0, game_images_service_1.findGameImageById)(0);
                expect(index_model_1.gameImageModel.findImageById).toHaveBeenCalledTimes(1);
                expect(index_model_1.gameImageModel.findImageById)
                    .toHaveBeenCalledWith(nonExistentId);
                expect(result).toEqual(messageToBeReturned);
            }));
        });
        describe('Informando um ID existente', () => {
            const correctId = 2;
            it('Deve retornar o objeto corretamente.', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameImageModel.findImageById
                    .mockResolvedValue(game_images_mock_1.mockGameImage2);
                const result = yield (0, game_images_service_1.findGameImageById)(correctId);
                expect(index_model_1.gameImageModel.findImageById).toHaveBeenCalledTimes(1);
                expect(index_model_1.gameImageModel.findImageById).toHaveBeenCalledWith(correctId);
                expect(result).not.toBeNull();
                expect(result).toHaveProperty('title');
                if (typeof result !== 'string') {
                    expect(result.title).toBeDefined();
                    expect(result.title).toEqual(game_images_mock_1.mockGameImage2.title);
                }
                expect(result).toEqual(game_images_mock_1.mockGameImage2);
            }));
        });
        describe('Em caso de problemas na requisição:', () => {
            it('Deve retornar uma mensagem de erro', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameImageModel.findImageById
                    .mockRejectedValue(games_mock_1.mockInvalidIdError);
                const result = yield (0, game_images_service_1.findGameImageById)(Number('AB001'));
                expect(index_model_1.gameImageModel.findImageById).toHaveBeenCalledTimes(1);
                expect(result).toContain('Ocorreu um erro na busca:');
                expect(result).toContain(games_mock_1.invalidIdErrorMessage);
            }));
        });
    });
    describe('CADASTRAR UMA NOVA IMAGEM', () => {
        describe('Caso não consiga cadastrar uma nova imagem', () => {
            const incompleteGameImageData = {
                title: "Imagem Incompleta para Teste",
                description: "Imagem incompleta para cadastrar",
                gameId: 1
            };
            it('Deve retornar uma mensagem e os dados enviados', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameImageModel.createNewImage
                    .mockResolvedValue(null);
                const result = yield (0, game_images_service_1.createNewGameImage)(incompleteGameImageData);
                expect(index_model_1.gameImageModel.createNewImage).toHaveBeenCalledTimes(1);
                expect(index_model_1.gameImageModel.createNewImage)
                    .toHaveBeenCalledWith(incompleteGameImageData);
                expect(result)
                    .toContain('Não foi possível cadastrar a imagem do jogo' +
                    ' com os seguintes dados:');
                expect(result).toContain(incompleteGameImageData.title);
                expect(result).toContain(incompleteGameImageData.description);
                expect(result).toContain(`${incompleteGameImageData.gameId}`);
            }));
        });
        describe('Com os dados corretos enviados', () => {
            it('Deve retornar um objeto com um ID', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameImageModel.createNewImage
                    .mockResolvedValue(game_images_mock_1.mockGameImage1);
                const result = yield (0, game_images_service_1.createNewGameImage)(game_images_mock_1.mockNewGameImage);
                expect(index_model_1.gameImageModel.createNewImage).toHaveBeenCalledTimes(1);
                expect(index_model_1.gameImageModel.createNewImage)
                    .toHaveBeenCalledWith(game_images_mock_1.mockNewGameImage);
                expect(result).toEqual(game_images_mock_1.mockGameImage1);
            }));
        });
        describe('Em caso de problemas na requisição:', () => {
            it('Deve retornar uma mensagem de erro', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameImageModel.createNewImage
                    .mockRejectedValue(game_images_mock_1.mockError);
                const result = yield (0, game_images_service_1.createNewGameImage)(game_images_mock_1.mockNewGameImage);
                expect(index_model_1.gameImageModel.createNewImage).toHaveBeenCalledTimes(1);
                expect(result)
                    .toContain('Ocorreu um erro no registro de nova imagem de jogo:');
                expect(result).toContain(game_images_mock_1.errorMessage);
            }));
        });
    });
    describe('ALTERAR OS DADOS DE UMA IMAGEM', () => {
        describe('Caso não consiga encontrar a imagem', () => {
            const nonExistentId = 99999999999;
            it('Deve retornar mensagem de "não encontrado"', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameImageModel.findImageById
                    .mockResolvedValue(null);
                const result = yield (0, game_images_service_1.updateGameImage)(game_images_mock_1.mockGameImageToUpdate, nonExistentId);
                expect(index_model_1.gameImageModel.findImageById).toHaveBeenCalledTimes(1);
                expect(result).toContain(`Imagem de jogo, com o id ${nonExistentId}`);
                expect(result).toContain("não encontrada para atualização.");
            }));
            it('E a mensagem deve conter o ID procurado', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameImageModel.findImageById
                    .mockResolvedValue(null);
                const result = yield (0, game_images_service_1.updateGameImage)(game_images_mock_1.mockGameImageToUpdate, nonExistentId);
                expect(index_model_1.gameImageModel.findImageById).toHaveBeenCalledTimes(1);
                expect(result).toContain(`${nonExistentId}`);
            }));
        });
        describe('Caso não consiga realizar a alteração solicitada', () => {
            const emptyPayload = {};
            const existentId = 1;
            it('Deve retornar mensagem de impossibilidade de alteração', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameImageModel.findImageById
                    .mockResolvedValue(game_images_mock_1.mockGameImage1);
                index_model_1.gameImageModel.updateImage
                    .mockResolvedValue(null);
                const result = yield (0, game_images_service_1.updateGameImage)(emptyPayload, existentId);
                expect(index_model_1.gameImageModel.findImageById).toHaveBeenCalledTimes(1);
                expect(index_model_1.gameImageModel.updateImage).toHaveBeenCalledTimes(1);
                expect(result)
                    .toContain('Não foi possível alterar os dados da imagem do jogo');
                expect(result).toContain(`com o id ${existentId}`);
                // Muito provavelmente, este é um falso positivo!!!
                // Corrigir a lógica da função para prever o envio de objeto vazio e
                // solicitar que se envie dados ou
                // devolver avisando que não tem o que alterar
            }));
        });
        describe('Caso sejam enviados os dados corretamente para alteração', () => {
            it('Retornar um breve relato do banco de dados', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameImageModel.updateImage
                    .mockResolvedValue({
                    updateResult: game_images_mock_1.mockResultSetHeader,
                    updatedGameImage: game_images_mock_1.mockGameImageUpdated,
                });
                const result = yield (0, game_images_service_1.updateGameImage)(game_images_mock_1.mockGameImageToUpdate, 1);
                expect(index_model_1.gameImageModel.updateImage).toHaveBeenCalledTimes(1);
                expect(typeof result).not.toBe('string');
                if (typeof result !== 'string') {
                    expect(result).toHaveProperty('updateResult');
                    expect(result).toHaveProperty('updatedGameImage');
                    expect(result.updateResult).toEqual(game_images_mock_1.mockResultSetHeader);
                    expect(result.updatedGameImage).toEqual(game_images_mock_1.mockGameImageUpdated);
                }
            }));
        });
        describe('Em caso de problemas na requisição:', () => {
            it('Deve retornar uma mensagem de erro', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameImageModel.updateImage
                    .mockRejectedValue(games_mock_1.mockUpdateError);
                const result = yield (0, game_images_service_1.updateGameImage)(game_images_mock_1.mockGameImageWithInvalidColumnName, 1);
                expect(index_model_1.gameImageModel.updateImage).toHaveBeenCalledTimes(1);
                expect(result)
                    .toContain('Ocorreu um erro na alteração de');
                expect(result)
                    .toContain('dados da imagem do jogo.');
                expect(result).toContain(game_images_mock_1.mockUpdateErrorMessage);
            }));
        });
    });
    describe('EXCLUIR UMA IMAGEM DE JOGO DO BANCO DE DADOS', () => {
        describe('Caso não consiga excluir a imagem', () => {
            const nonExistentId = 99999999999;
            it('Deve retornar mensagem de impossibilidade de exclusão', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameImageModel.deleteImage
                    .mockResolvedValue(null);
                const result = yield (0, game_images_service_1.deleteGameImage)(nonExistentId);
                expect(index_model_1.gameImageModel.deleteImage).toHaveBeenCalledTimes(1);
                expect(result).toContain('Não foi possível deletar a imagem do jogo');
                expect(result).toContain(`com o id ${nonExistentId}`);
            }));
        });
        describe('Caso consiga excluir a imagem', () => {
            const existentId = 1;
            it('Deve retornar um breve relato do banco de dados', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameImageModel.deleteImage
                    .mockResolvedValue(game_images_mock_1.mockResultSetHeader);
                const result = yield (0, game_images_service_1.deleteGameImage)(existentId);
                expect(index_model_1.gameImageModel.deleteImage).toHaveBeenCalledTimes(1);
                expect(result).toEqual(game_images_mock_1.mockResultSetHeader);
            }));
        });
        describe('Em caso de problemas na requisição:', () => {
            it('Deve retornar uma mensagem de erro', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameImageModel.deleteImage
                    .mockRejectedValue(game_images_mock_1.mockError);
                const result = yield (0, game_images_service_1.deleteGameImage)(1);
                expect(index_model_1.gameImageModel.deleteImage).toHaveBeenCalledTimes(1);
                expect(result)
                    .toContain('Ocorreu um erro na exclusão da imagem do jogo.');
                expect(result).toContain(game_images_mock_1.errorMessage);
            }));
        });
    });
});
