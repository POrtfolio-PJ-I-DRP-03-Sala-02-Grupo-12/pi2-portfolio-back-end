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
    gamesTagsService: {
        findAllGamesTags: jest.fn(),
        createNewGameTag: jest.fn(),
        deleteGameTag: jest.fn(),
    },
    gamesService: {
        findGameById: jest.fn(),
    },
    tagsService: {
        findTagById: jest.fn(),
    },
}));
const games_tags_controller_1 = require("../../controllers/games.tags.controller");
const index_services_1 = require("../../services/index.services");
const game_tag_mock_1 = require("../mocks/game.tag.mock");
const games_mock_1 = require("../mocks/games.mock");
const tag_mock_1 = require("../mocks/tag.mock");
describe('TESTES DO CONTROLLER GAMES TAGS', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('LISTAR ASSOCIAÇÕES DE JOGOS E CATEGORIAS', () => {
        describe('Caso não haja associações cadastradas', () => {
            const mockRequest = {};
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const notFoundMessage = 'Não encontramos jogos com categorias associadas.';
            it('Deve retornar status 404', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesTagsService.findAllGamesTags
                    .mockResolvedValue(notFoundMessage);
                yield (0, games_tags_controller_1.findAllGamesTags)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(404);
            }));
            it('Deve retornar a mensagem de não encontrado', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesTagsService.findAllGamesTags
                    .mockResolvedValue(notFoundMessage);
                yield (0, games_tags_controller_1.findAllGamesTags)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({ message: notFoundMessage });
            }));
        });
        describe('Caso haja associações cadastradas', () => {
            const mockRequest = {};
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 200', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesTagsService.findAllGamesTags
                    .mockResolvedValue(game_tag_mock_1.mockGameTagsList);
                yield (0, games_tags_controller_1.findAllGamesTags)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(200);
            }));
            it('Deve retornar a lista de associações', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesTagsService.findAllGamesTags
                    .mockResolvedValue(game_tag_mock_1.mockGameTagsList);
                yield (0, games_tags_controller_1.findAllGamesTags)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith(game_tag_mock_1.mockGameTagsList);
            }));
        });
        describe('Caso ocorra um erro no servidor', () => {
            const mockRequest = {};
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 500', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesTagsService.findAllGamesTags
                    .mockRejectedValue(game_tag_mock_1.mockError);
                yield (0, games_tags_controller_1.findAllGamesTags)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(500);
            }));
            it('Deve retornar a mensagem de erro do servidor', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesTagsService.findAllGamesTags
                    .mockRejectedValue(game_tag_mock_1.mockError);
                yield (0, games_tags_controller_1.findAllGamesTags)(mockRequest, mockResponse);
                expect(mockResponse.json)
                    .toHaveBeenCalledWith({
                    message: 'Erro no servidor ao buscar jogos associados a categorias: '
                        + game_tag_mock_1.mockError.message,
                });
            }));
        });
    });
    describe('CRIAR ASSOCIAÇÃO DE JOGO E CATEGORIA', () => {
        describe('Caso não consiga criar a associação', () => {
            const mockRequest = {
                body: {},
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 400', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesTagsService.createNewGameTag
                    .mockResolvedValue('Não foi possível associar a ' +
                    'categoria ao jogo com os seguintes dados:\n' +
                    ' gameId: undefined\n' +
                    ' tagId: undefined\n');
                yield (0, games_tags_controller_1.createNewGameTag)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(400);
            }));
            it('Deve retornar a mensagem de erro', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesTagsService.createNewGameTag
                    .mockResolvedValue('Não foi possível associar a ' +
                    'categoria ao jogo com os seguintes dados:\n' +
                    ' gameId: undefined\n' +
                    ' tagId: undefined\n');
                yield (0, games_tags_controller_1.createNewGameTag)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: 'Não foi possível associar a ' +
                        'categoria ao jogo com os seguintes dados:\n' +
                        ' gameId: undefined\n' +
                        ' tagId: undefined\n'
                });
            }));
        });
        describe('Caso consiga criar a associação', () => {
            const mockRequest = {
                body: game_tag_mock_1.mockGameTag1,
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 201', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesTagsService.createNewGameTag
                    .mockResolvedValue(game_tag_mock_1.mockGameTag1);
                yield (0, games_tags_controller_1.createNewGameTag)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(201);
            }));
            it('Deve retornar a associação criada', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesTagsService.createNewGameTag
                    .mockResolvedValue(game_tag_mock_1.mockGameTag1);
                yield (0, games_tags_controller_1.createNewGameTag)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith(game_tag_mock_1.mockGameTag1);
            }));
        });
        describe('Caso ocorra um erro no servidor', () => {
            const mockRequest = {
                body: game_tag_mock_1.mockGameTag1,
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 500', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesTagsService.createNewGameTag
                    .mockRejectedValue(game_tag_mock_1.mockError);
                yield (0, games_tags_controller_1.createNewGameTag)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(500);
            }));
            it('Deve retornar a mensagem de erro do servidor', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesTagsService.createNewGameTag
                    .mockRejectedValue(game_tag_mock_1.mockError);
                yield (0, games_tags_controller_1.createNewGameTag)(mockRequest, mockResponse);
                expect(mockResponse.json)
                    .toHaveBeenCalledWith({
                    message: 'Erro no servidor ao associar categoria ao jogo: '
                        + game_tag_mock_1.mockError.message,
                });
            }));
        });
    });
    describe('DELETAR ASSOCIAÇÃO DE JOGO E CATEGORIA', () => {
        describe('Caso não consiga deletar a associação', () => {
            const mockRequest = {
                params: {
                    gameId: '1',
                    tagId: '1',
                },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            beforeEach(() => {
                jest.clearAllMocks();
            });
            it('Deve retornar status 404 se o jogo não for encontrado', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.findGameById
                    .mockResolvedValue('Não conseguimos encontrar o jogo pelo id 1');
                index_services_1.tagsService.findTagById
                    .mockResolvedValue(tag_mock_1.mockTag1);
                yield (0, games_tags_controller_1.deleteGameTag)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(404);
            }));
            it('Deve retornar status 404 quando a tag não existe', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.findGameById
                    .mockResolvedValue(games_mock_1.mockGame);
                index_services_1.tagsService.findTagById
                    .mockResolvedValue('Não conseguimos encontrar a categoria pelo id 1');
                yield (0, games_tags_controller_1.deleteGameTag)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(404);
            }));
            it('Deve retornar status 400 se o serviço retorna string ', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.gamesService.findGameById
                    .mockResolvedValue(games_mock_1.mockGame);
                index_services_1.tagsService.findTagById
                    .mockResolvedValue(tag_mock_1.mockTag1);
                index_services_1.gamesTagsService.deleteGameTag
                    .mockResolvedValue('Não foi possível deletar a associação da ' +
                    'categoria ao jogo com os seguintes dados:\n' +
                    ' gameId: 1\n' +
                    ' tagId: 1\n');
                yield (0, games_tags_controller_1.deleteGameTag)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(400);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: 'Não foi possível deletar a associação da ' +
                        'categoria ao jogo com os seguintes dados:\n' +
                        ' gameId: 1\n' +
                        ' tagId: 1\n'
                });
            }));
            describe('Caso consiga deletar a associação', () => {
                const mockRequest = {
                    params: {
                        gameId: '1',
                        tagId: '1',
                    },
                };
                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                };
                beforeEach(() => {
                    index_services_1.gamesService.findGameById
                        .mockResolvedValue(games_mock_1.mockGame);
                    index_services_1.tagsService.findTagById
                        .mockResolvedValue(tag_mock_1.mockTag1);
                });
                it('Deve retornar status 202', () => __awaiter(void 0, void 0, void 0, function* () {
                    index_services_1.gamesTagsService.deleteGameTag
                        .mockResolvedValue({
                        deletedGameTag: game_tag_mock_1.mockGameTag1,
                        message: 'Relacionamento entre ' +
                            games_mock_1.mockGame.title.toUpperCase() +
                            ' e ' + tag_mock_1.mockTag1.title.toUpperCase() + ' excluído com sucesso.',
                    });
                    yield (0, games_tags_controller_1.deleteGameTag)(mockRequest, mockResponse);
                    expect(mockResponse.status).toHaveBeenCalledWith(202);
                }));
                it('Deve retornar a confirmação de exclusão', () => __awaiter(void 0, void 0, void 0, function* () {
                    const expectedResponse = {
                        mockGameTag1: game_tag_mock_1.mockGameTag1,
                        message: 'Relacionamento entre ' +
                            games_mock_1.mockGame.title.toUpperCase() +
                            ' e ' + tag_mock_1.mockTag1.title.toUpperCase() + ' excluído com sucesso.',
                    };
                    index_services_1.gamesTagsService.deleteGameTag
                        .mockResolvedValue(expectedResponse);
                    yield (0, games_tags_controller_1.deleteGameTag)(mockRequest, mockResponse);
                    expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
                }));
            });
        });
    });
});
