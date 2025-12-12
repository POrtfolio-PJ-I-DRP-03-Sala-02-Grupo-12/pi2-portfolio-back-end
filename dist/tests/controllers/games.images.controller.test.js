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
jest.mock('../../services/index.services', () => ({
    gameImagesService: {
        findAllGameImages: jest.fn(),
        findGameImageById: jest.fn(),
        createNewGameImage: jest.fn(),
        updateGameImage: jest.fn(),
        deleteGameImage: jest.fn(),
    },
}));
const index_services_1 = require("../../services/index.services");
const games_images_controller_1 = require("../../controllers/games.images.controller");
const game_images_mock_1 = require("../mocks/game.images.mock");
const games_mock_1 = require("../mocks/games.mock");
describe('TESTES DO CONTROLLER GAME IMAGES', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('LISTAR IMAGENS DE JOGOS', () => {
        describe('Caso não haja imagens cadastradas', () => {
            const mockRequest = {};
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 404', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.findAllGameImages
                    .mockResolvedValue('Não encontramos imagens de jogos cadastradas.');
                yield (0, games_images_controller_1.findAllGameImages)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(404);
            }));
            it('Deve retornar a mensagem correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.findAllGameImages
                    .mockResolvedValue('Não encontramos imagens de jogos cadastradas.');
                yield (0, games_images_controller_1.findAllGameImages)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Não encontramos imagens de jogos cadastradas.' });
            }));
        });
        describe('Caso haja imagens cadastradas', () => {
            const mockRequest = {};
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 200', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.findAllGameImages
                    .mockResolvedValue(game_images_mock_1.mockGameImagesList);
                yield (0, games_images_controller_1.findAllGameImages)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(200);
            }));
            it('Deve retornar a lista de imagens', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.findAllGameImages
                    .mockResolvedValue(game_images_mock_1.mockGameImagesList);
                yield (0, games_images_controller_1.findAllGameImages)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith(game_images_mock_1.mockGameImagesList);
            }));
        });
        describe('Caso ocorra um erro', () => {
            const mockRequest = {};
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 500', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.findAllGameImages
                    .mockRejectedValue(game_images_mock_1.mockError);
                yield (0, games_images_controller_1.findAllGameImages)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(500);
            }));
            it('Deve retornar a mensagem de erro correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.findAllGameImages
                    .mockRejectedValue(game_images_mock_1.mockError);
                yield (0, games_images_controller_1.findAllGameImages)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: 'Erro no servidor ao listar ' +
                        'imagens de jogos: ' +
                        game_images_mock_1.mockError.message
                });
            }));
        });
    });
    describe('BUSCAR IMAGEM PELO ID', () => {
        describe('Caso a imagem não seja encontrada', () => {
            const mockRequest = {
                params: { id: '999' },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 404', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.findGameImageById
                    .mockResolvedValue('Não conseguimos encontrar a imagem do jogo pelo id 999');
                yield (0, games_images_controller_1.findGameImageById)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(404);
            }));
            it('Deve retornar a mensagem correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.findGameImageById
                    .mockResolvedValue('Não conseguimos encontrar a imagem do jogo pelo id 999');
                yield (0, games_images_controller_1.findGameImageById)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: 'Não conseguimos encontrar a imagem do jogo pelo id 999',
                });
            }));
        });
        describe('Caso a imagem seja encontrada', () => {
            const mockRequest = {
                params: { id: '1' },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 200', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.findGameImageById
                    .mockResolvedValue(game_images_mock_1.mockGameImagesList[0]);
                yield (0, games_images_controller_1.findGameImageById)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(200);
            }));
            it('Deve retornar a imagem correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.findGameImageById
                    .mockResolvedValue(game_images_mock_1.mockGameImagesList[0]);
                yield (0, games_images_controller_1.findGameImageById)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith(game_images_mock_1.mockGameImagesList[0]);
            }));
        });
        describe('Caso ocorra um erro', () => {
            const mockRequest = {
                params: { id: '1' },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 500', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.findGameImageById
                    .mockRejectedValue(game_images_mock_1.mockError);
                yield (0, games_images_controller_1.findGameImageById)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(500);
            }));
            it('Deve retornar a mensagem de erro correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.findGameImageById
                    .mockRejectedValue(game_images_mock_1.mockError);
                yield (0, games_images_controller_1.findGameImageById)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({ message: `Erro no servidor ao buscar imagem de jogo: ${game_images_mock_1.mockError.message}`
                });
            }));
        });
    });
    describe('CADASTRAR NOVA IMAGEM', () => {
        describe('Caso não consiga cadastrar a imagem', () => {
            const mockGameImageIncomplete = {
                description: "Imagem de teste incompleta",
                title: "Imagem Incompleta",
            };
            const mockRequest = {
                body: mockGameImageIncomplete,
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 400', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.createNewGameImage
                    .mockResolvedValue('Não foi possível cadastrar a imagem do jogo com os ' +
                    'seguintes dados:\n' +
                    'título: ' + mockGameImageIncomplete.title + '\n' +
                    'descrição: ' + mockGameImageIncomplete.description + '\n' +
                    'url: ' + mockGameImageIncomplete.url + '\n' +
                    'gameId: ' + mockGameImageIncomplete.gameId);
                yield (0, games_images_controller_1.createNewGameImage)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(400);
            }));
            it('Deve retornar a mensagem correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.createNewGameImage
                    .mockResolvedValue('Não foi possível cadastrar a imagem do jogo com os ' +
                    'seguintes dados:\n' +
                    'título: ' + mockGameImageIncomplete.title + '\n' +
                    'descrição: ' + mockGameImageIncomplete.description + '\n' +
                    'url: ' + mockGameImageIncomplete.url + '\n' +
                    'gameId: ' + mockGameImageIncomplete.gameId);
                yield (0, games_images_controller_1.createNewGameImage)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: 'Não foi possível cadastrar a imagem do jogo com os ' +
                        'seguintes dados:\n' +
                        'título: ' + mockGameImageIncomplete.title + '\n' +
                        'descrição: ' + mockGameImageIncomplete.description + '\n' +
                        'url: ' + mockGameImageIncomplete.url + '\n' +
                        'gameId: ' + mockGameImageIncomplete.gameId
                });
            }));
        });
        describe('Caso consiga cadastrar a imagem', () => {
            const mockRequest = {
                body: game_images_mock_1.mockNewGameImage,
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 201', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.createNewGameImage
                    .mockResolvedValue(Object.assign({ id: 1 }, game_images_mock_1.mockNewGameImage));
                yield (0, games_images_controller_1.createNewGameImage)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(201);
            }));
            it('Deve retornar a imagem cadastrada', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.createNewGameImage
                    .mockResolvedValue(Object.assign({ id: 1 }, game_images_mock_1.mockNewGameImage));
                yield (0, games_images_controller_1.createNewGameImage)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith(Object.assign({ id: 1 }, game_images_mock_1.mockNewGameImage));
            }));
        });
        describe('Caso ocorra um erro', () => {
            const mockRequest = {
                body: game_images_mock_1.mockNewGameImage,
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 500', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.createNewGameImage
                    .mockRejectedValue(game_images_mock_1.mockError);
                yield (0, games_images_controller_1.createNewGameImage)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(500);
            }));
            it('Deve retornar a mensagem de erro correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.createNewGameImage
                    .mockRejectedValue(game_images_mock_1.mockError);
                yield (0, games_images_controller_1.createNewGameImage)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: 'Erro no servidor ao cadastrar imagem de jogo: ' +
                        game_images_mock_1.mockError.message
                });
            }));
        });
    });
    describe('ATUALIZAR IMAGEM', () => {
        describe('Caso não consiga encontrar a imagem para atualizar', () => {
            const mockRequest = {
                params: { id: '999' },
                body: game_images_mock_1.mockGameImageToUpdate,
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const notFoundMessage = 'Imagem de jogo, com o id 999, ' +
                'não encontrada para atualização.';
            it('Deve retornar status 400', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.updateGameImage
                    .mockResolvedValue(notFoundMessage);
                yield (0, games_images_controller_1.updateGameImage)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(400);
            }));
            it('Deve retornar a mensagem correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.updateGameImage
                    .mockResolvedValue(notFoundMessage);
                yield (0, games_images_controller_1.updateGameImage)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({ message: notFoundMessage });
            }));
        });
        describe('Caso não consiga atualizar os dados da imagem', () => {
            const mockRequest = {
                params: { id: '999' },
                body: { description: 'Descrição alterada para teste' },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const notAbleToUpdateMessage = 'Não foi possível alterar os dados ' +
                'da imagem do jogo com id 999';
            it('Deve retornar status 400', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.updateGameImage
                    .mockResolvedValue(notAbleToUpdateMessage);
                yield (0, games_images_controller_1.updateGameImage)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(400);
            }));
            it('Deve retornar a mensagem correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.updateGameImage
                    .mockResolvedValue(notAbleToUpdateMessage);
                yield (0, games_images_controller_1.updateGameImage)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({ message: notAbleToUpdateMessage });
            }));
        });
        describe('Caso consiga atualizar a imagem', () => {
            const mockRequest = {
                params: { id: '1' },
                body: {
                    title: 'Imagem para Teste 1 Alterada',
                    url: 'https://example.com/imagem1-alterada.jpg'
                },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 202', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.updateGameImage
                    .mockResolvedValue({
                    updateResult: game_images_mock_1.mockResultSetHeader,
                    updatedGame: game_images_mock_1.mockGameImageUpdated,
                });
                yield (0, games_images_controller_1.updateGameImage)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(202);
            }));
            it('Deve retornar o resultado da atualização', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.updateGameImage
                    .mockResolvedValue({
                    updateResult: game_images_mock_1.mockResultSetHeader,
                    updatedGame: game_images_mock_1.mockGameImageUpdated,
                });
                yield (0, games_images_controller_1.updateGameImage)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    updateResult: game_images_mock_1.mockResultSetHeader,
                    updatedGame: game_images_mock_1.mockGameImageUpdated,
                });
            }));
        });
        describe('Caso ocorra um erro', () => {
            const mockRequest = {
                params: { id: '1' },
                body: game_images_mock_1.mockGameImageWithInvalidColumnName,
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 500', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.updateGameImage
                    .mockRejectedValue(games_mock_1.mockUpdateError);
                yield (0, games_images_controller_1.updateGameImage)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(500);
            }));
            it('Deve retornar a mensagem de erro correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.updateGameImage
                    .mockRejectedValue(games_mock_1.mockUpdateError);
                yield (0, games_images_controller_1.updateGameImage)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: 'Erro no servidor ao atualizar imagem de jogo: ' +
                        games_mock_1.mockUpdateError.message
                });
            }));
        });
    });
    describe('DELETAR IMAGEM', () => {
        describe('Caso não consiga deletar a imagem', () => {
            const mockRequest = {
                params: { id: '999' },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const notAbleToDeleteMessage = 'Não foi possível deletar a imagem ' +
                'do jogo com o id 999';
            it('Deve retornar status 400', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.deleteGameImage
                    .mockResolvedValue(notAbleToDeleteMessage);
                yield (0, games_images_controller_1.deleteGameImage)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(400);
            }));
            it('Deve retornar a mensagem correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.deleteGameImage
                    .mockResolvedValue(notAbleToDeleteMessage);
                yield (0, games_images_controller_1.deleteGameImage)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({ message: notAbleToDeleteMessage });
            }));
        });
        describe('Caso consiga deletar a imagem corretamente', () => {
            const mockRequest = {
                params: { id: '1' },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 202', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.deleteGameImage
                    .mockResolvedValue(game_images_mock_1.mockResultSetHeader);
                yield (0, games_images_controller_1.deleteGameImage)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(202);
            }));
            it('Deve retornar o resultado da exclusão', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.deleteGameImage
                    .mockResolvedValue(game_images_mock_1.mockResultSetHeader);
                yield (0, games_images_controller_1.deleteGameImage)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    result: game_images_mock_1.mockResultSetHeader,
                    message: 'Imagem de jogo, com o id 1, deletada com sucesso.'
                });
            }));
        });
        describe('Caso ocorra um erro', () => {
            const mockRequest = {
                params: { id: '1' },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 500', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.deleteGameImage
                    .mockRejectedValue(game_images_mock_1.mockError);
                yield (0, games_images_controller_1.deleteGameImage)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(500);
            }));
            it('Deve retornar a mensagem de erro correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gameImagesService.deleteGameImage
                    .mockRejectedValue(game_images_mock_1.mockError);
                yield (0, games_images_controller_1.deleteGameImage)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: 'Erro no servidor ao deletar imagem de jogo: ' +
                        game_images_mock_1.mockError.message
                });
            }));
        });
    });
});
