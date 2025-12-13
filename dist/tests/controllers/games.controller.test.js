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
    gamesService: {
        findAllGames: jest.fn(),
        findGameById: jest.fn(),
        createNewGame: jest.fn(),
        updateGame: jest.fn(),
        deleteGame: jest.fn(),
    },
}));
const index_services_1 = require("../../services/index.services");
const games_controller_1 = require("../../controllers/games.controller");
const games_mock_1 = require("../mocks/games.mock");
describe('TESTES DO CONTROLLER GAMES', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('LISTAR JOGOS', () => {
        describe('Caso não haja jogos cadastrados', () => {
            const mockRequest = {};
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 404', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.findAllGames
                    .mockResolvedValue('Não encontramos jogos cadastrados.');
                yield (0, games_controller_1.findAllGames)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(404);
            }));
            it('Deve retornar a mensagem correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.findAllGames
                    .mockResolvedValue('Não encontramos jogos cadastrados.');
                yield (0, games_controller_1.findAllGames)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Não encontramos jogos cadastrados.' });
            }));
        });
        describe('Caso haja jogos cadastrados', () => {
            const mockRequest = {};
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 200', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.findAllGames
                    .mockResolvedValue(games_mock_1.mockGamesList);
                yield (0, games_controller_1.findAllGames)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(200);
            }));
            it('Deve retornar a lista de jogos', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.findAllGames
                    .mockResolvedValue(games_mock_1.mockGamesList);
                yield (0, games_controller_1.findAllGames)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith(games_mock_1.mockGamesList);
            }));
        });
        describe('Caso ocorra um erro', () => {
            const mockRequest = {};
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 500', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.findAllGames
                    .mockRejectedValue(games_mock_1.mockError);
                yield (0, games_controller_1.findAllGames)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(500);
            }));
            it('Deve retornar a mensagem de erro correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.findAllGames
                    .mockRejectedValue(games_mock_1.mockError);
                yield (0, games_controller_1.findAllGames)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({ message: `Erro no servidor ao listar jogos: ${games_mock_1.mockError.message}` });
            }));
        });
    });
    describe('BUSCAR JOGO PELO ID', () => {
        describe('Caso o jogo não seja encontrado', () => {
            const mockRequest = {
                params: { id: '999' },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 404', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.findGameById
                    .mockResolvedValue('Não conseguimos encontrar o jogo pelo id 999');
                yield (0, games_controller_1.findGameById)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(404);
            }));
            it('Deve retornar a mensagem correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.findGameById
                    .mockResolvedValue('Não conseguimos encontrar o jogo pelo id 999');
                yield (0, games_controller_1.findGameById)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: 'Não conseguimos encontrar o jogo pelo id 999',
                });
            }));
        });
        describe('Caso o jogo seja encontrado', () => {
            const mockRequest = {
                params: { id: '1' },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 200', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.findGameById
                    .mockResolvedValue(games_mock_1.mockGamesList[0]);
                yield (0, games_controller_1.findGameById)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(200);
            }));
            it('Deve retornar o jogo correto', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.findGameById
                    .mockResolvedValue(games_mock_1.mockGamesList[0]);
                yield (0, games_controller_1.findGameById)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith(games_mock_1.mockGamesList[0]);
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
                index_services_1.gamesService.findGameById
                    .mockRejectedValue(games_mock_1.mockError);
                yield (0, games_controller_1.findGameById)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(500);
            }));
            it('Deve retornar a mensagem de erro correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.findGameById
                    .mockRejectedValue(games_mock_1.mockError);
                yield (0, games_controller_1.findGameById)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({ message: `Erro no servidor ao buscar jogo: ${games_mock_1.mockError.message}` });
            }));
        });
    });
    describe('CADASTRAR NOVO JOGO', () => {
        describe('Caso não consiga cadastrar o jogo', () => {
            const mockGameIncomplete = {
                description: "Jogo de teste incompleto",
                linkName: "Jogo Incompleto",
                linkUrl: "https://example.com/jogo-incompleto",
            };
            const mockRequest = {
                body: mockGameIncomplete,
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 400', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.createNewGame
                    .mockResolvedValue('Não foi possível cadastrar o jogo com os seguintes dados:\n' +
                    'título: ' + mockGameIncomplete.title + '\n' +
                    'descrição: ' + mockGameIncomplete.description + '\n' +
                    'nome do link: ' + mockGameIncomplete.linkName + '\n' +
                    'url do link: ' + mockGameIncomplete.linkUrl);
                yield (0, games_controller_1.createNewGame)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(400);
            }));
            it('Deve retornar a mensagem correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.createNewGame
                    .mockResolvedValue('Não foi possível cadastrar o jogo com os seguintes dados:\n' +
                    'título: ' + mockGameIncomplete.title + '\n' +
                    'descrição: ' + mockGameIncomplete.description + '\n' +
                    'nome do link: ' + mockGameIncomplete.linkName + '\n' +
                    'url do link: ' + mockGameIncomplete.linkUrl);
                yield (0, games_controller_1.createNewGame)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: 'Não foi possível cadastrar o jogo com os seguintes dados:\n' +
                        'título: ' + mockGameIncomplete.title + '\n' +
                        'descrição: ' + mockGameIncomplete.description + '\n' +
                        'nome do link: ' + mockGameIncomplete.linkName + '\n' +
                        'url do link: ' + mockGameIncomplete.linkUrl
                });
            }));
        });
        describe('Caso consiga cadastrar o jogo', () => {
            const mockRequest = {
                body: games_mock_1.mockGame1ToInsert,
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 201', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.createNewGame
                    .mockResolvedValue(Object.assign({ id: 1 }, games_mock_1.mockGame1ToInsert));
                yield (0, games_controller_1.createNewGame)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(201);
            }));
            it('Deve retornar o jogo cadastrado', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.createNewGame
                    .mockResolvedValue(Object.assign({ id: 1 }, games_mock_1.mockGame1ToInsert));
                yield (0, games_controller_1.createNewGame)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith(Object.assign({ id: 1 }, games_mock_1.mockGame1ToInsert));
            }));
        });
        describe('Caso ocorra um erro', () => {
            const mockRequest = {
                body: games_mock_1.mockGame1ToInsert,
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 500', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.createNewGame
                    .mockRejectedValue(games_mock_1.mockError);
                yield (0, games_controller_1.createNewGame)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(500);
            }));
            it('Deve retornar a mensagem de erro correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.createNewGame
                    .mockRejectedValue(games_mock_1.mockError);
                yield (0, games_controller_1.createNewGame)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({ message: `Erro no servidor ao cadastrar jogo: ${games_mock_1.mockError.message}` });
            }));
        });
    });
    describe('ATUALIZAR JOGO', () => {
        describe('Caso não consiga encontrar o jogo para atualizar', () => {
            const mockRequest = {
                params: { id: '999' },
                body: games_mock_1.mockGameToUpdate,
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 400', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.updateGame
                    .mockResolvedValue('Jogo com o id 999 não encontrado para atualização.');
                yield (0, games_controller_1.updateGame)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(400);
            }));
            it('Deve retornar a mensagem correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.updateGame
                    .mockResolvedValue('Jogo com o id 999 não encontrado para atualização.');
                yield (0, games_controller_1.updateGame)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Jogo com o id 999 não encontrado para atualização.' });
            }));
        });
        describe('Caso não consiga atualizar o jogo', () => {
            const mockRequest = {
                params: { id: '999' },
                body: { description: 'Descrição alterada para teste' },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 400', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.updateGame
                    .mockResolvedValue('Não foi possível atualizar o jogo com id 999');
                yield (0, games_controller_1.updateGame)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(400);
            }));
            it('Deve retornar a mensagem correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.updateGame
                    .mockResolvedValue('Jogo com id 999 não encontrado para atualização.');
                yield (0, games_controller_1.updateGame)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Jogo com id 999 não encontrado para atualização.' });
            }));
        });
        describe('Caso consiga atualizar o jogo', () => {
            const mockRequest = {
                params: { id: '1' },
                body: { description: 'Descrição alterada para teste' },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 202', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.updateGame
                    .mockResolvedValue({
                    updateResult: games_mock_1.mockResultSetHeader,
                    updatedGame: games_mock_1.mockUpdatedGame,
                });
                yield (0, games_controller_1.updateGame)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(202);
            }));
            it('Deve retornar o resultado da atualização', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.updateGame
                    .mockResolvedValue({
                    updateResult: games_mock_1.mockResultSetHeader,
                    updatedGame: games_mock_1.mockUpdatedGame,
                });
                yield (0, games_controller_1.updateGame)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    updateResult: games_mock_1.mockResultSetHeader,
                    updatedGame: games_mock_1.mockUpdatedGame,
                });
            }));
        });
        describe('Caso ocorra um erro', () => {
            const mockRequest = {
                params: { id: '1' },
                body: games_mock_1.mockGameWithInvalidColumnName,
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 500', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.updateGame
                    .mockRejectedValue(games_mock_1.mockUpdateError);
                yield (0, games_controller_1.updateGame)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(500);
            }));
            it('Deve retornar a mensagem de erro correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.updateGame
                    .mockRejectedValue(games_mock_1.mockUpdateError);
                yield (0, games_controller_1.updateGame)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({ message: `Erro no servidor ao atualizar jogo: ${games_mock_1.mockUpdateError.message}` });
            }));
        });
    });
    describe('DELETAR JOGO', () => {
        describe('Caso não consiga deletar o jogo', () => {
            const mockRequest = {
                params: { id: '999' },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 400', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.deleteGame
                    .mockResolvedValue('Não foi possível excluir dados do jogo com o id 999');
                yield (0, games_controller_1.deleteGame)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(400);
            }));
            it('Deve retornar a mensagem correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.deleteGame
                    .mockResolvedValue('Não foi possível excluir dados do jogo com o id 999');
                yield (0, games_controller_1.deleteGame)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Não foi possível excluir dados do jogo com o id 999' });
            }));
        });
        describe('Caso consiga deletar o jogo', () => {
            const mockRequest = {
                params: { id: '1' },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 202', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.deleteGame
                    .mockResolvedValue(games_mock_1.mockResultSetHeader);
                yield (0, games_controller_1.deleteGame)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(202);
            }));
            it('Deve retornar o resultado da exclusão', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.deleteGame
                    .mockResolvedValue(games_mock_1.mockResultSetHeader);
                yield (0, games_controller_1.deleteGame)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    result: games_mock_1.mockResultSetHeader,
                    message: 'Jogo com o id 1 excluído com sucesso.'
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
                index_services_1.gamesService.deleteGame
                    .mockRejectedValue(games_mock_1.mockError);
                yield (0, games_controller_1.deleteGame)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(500);
            }));
            it('Deve retornar a mensagem de erro correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.deleteGame
                    .mockRejectedValue(games_mock_1.mockError);
                yield (0, games_controller_1.deleteGame)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({ message: `Erro no servidor ao excluir jogo: ${games_mock_1.mockError.message}` });
            }));
        });
    });
});
