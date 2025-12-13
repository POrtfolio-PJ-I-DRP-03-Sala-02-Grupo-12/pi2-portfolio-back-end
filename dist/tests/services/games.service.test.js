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
    gameModel: {
        findAllGames: jest.fn(),
        findGameById: jest.fn(),
        createNewGame: jest.fn(),
        updateGame: jest.fn(),
        deleteGame: jest.fn(),
    }
}));
const index_model_1 = require("../../models/index.model");
const games_service_1 = require("../../services/games.service");
const games_mock_1 = require("../mocks/games.mock");
describe('TESTES DO SERVIÇO GAMES', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('LISTAR JOGOS', () => {
        describe('Caso não haja jogos cadastrados:', () => {
            it('Deve mostrar uma mensagem de lista vazia', () => __awaiter(void 0, void 0, void 0, function* () {
                const messageShouldBeReturned = "Não encontramos jogos cadastrados.";
                index_model_1.gameModel.findAllGames
                    .mockResolvedValue(null);
                const result = yield (0, games_service_1.findAllGames)();
                expect(index_model_1.gameModel.findAllGames).toHaveBeenCalledTimes(1);
                expect(result).toBe(messageShouldBeReturned);
            }));
        });
        describe('Com jogos cadastrados', () => {
            it('Com três jogos cadastrados, deve retornar um array de tamanho 3.', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameModel.findAllGames
                    .mockResolvedValue(games_mock_1.mockGamesList);
                const result = yield (0, games_service_1.findAllGames)();
                expect(index_model_1.gameModel.findAllGames).toHaveBeenCalledTimes(1);
                expect(result).toHaveLength(3);
            }));
            it('E a lista deve conter os objetos corretos.', () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, games_service_1.findAllGames)();
                expect(result[0]).toEqual(Object.assign({ id: 1 }, games_mock_1.mockGame1ToInsert));
                expect(result[1]).toEqual(Object.assign({ id: 2 }, games_mock_1.mockGame2ToInsert));
                expect(result[2]).toEqual(Object.assign({ id: 3 }, games_mock_1.mockGame3ToInsert));
            }));
        });
        describe('Em caso de problemas na requisição:', () => {
            it('Deve retornar uma mensagem de erro', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameModel.findAllGames
                    .mockRejectedValue(games_mock_1.mockError);
                const result = yield (0, games_service_1.findAllGames)();
                expect(index_model_1.gameModel.findAllGames).toHaveBeenCalledTimes(1);
                expect(result).toContain('Erro ao buscar jogos:');
                expect(result).toContain(games_mock_1.errorMessage);
            }));
        });
    });
    describe('BUSCAR UM JOGO POR ID', () => {
        describe('Informando um ID que não existe', () => {
            const nonExistentId = 0;
            const messageToBeReturned = `Não conseguimos encontrar o jogo pelo id ${nonExistentId}`;
            it('Deve retornar uma mensagem de "Não encontrado"', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameModel.findGameById
                    .mockResolvedValue(null);
                const result = yield (0, games_service_1.findGameById)(0);
                expect(index_model_1.gameModel.findGameById).toHaveBeenCalledTimes(1);
                expect(index_model_1.gameModel.findGameById).toHaveBeenCalledWith(nonExistentId);
                expect(result).toEqual(messageToBeReturned);
            }));
        });
        describe('Informando um ID existente', () => {
            const correctId = 1;
            it('Deve retornar o objeto corretamente.', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameModel.findGameById
                    .mockResolvedValue(games_mock_1.mockGame);
                const result = yield (0, games_service_1.findGameById)(correctId);
                expect(index_model_1.gameModel.findGameById).toHaveBeenCalledTimes(1);
                expect(index_model_1.gameModel.findGameById).toHaveBeenCalledWith(correctId);
                expect(result).not.toBeNull();
                expect(result).toHaveProperty('title');
                if (typeof result !== 'string') {
                    expect(result.title).toBeDefined();
                    expect(result.title).toEqual(games_mock_1.mockGame.title);
                }
                expect(result).toEqual(games_mock_1.mockGame);
            }));
        });
        describe('Em caso de problemas na requisição:', () => {
            it('Deve retornar uma mensagem de erro', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameModel.findGameById
                    .mockRejectedValue(games_mock_1.mockInvalidIdError);
                const result = yield (0, games_service_1.findGameById)(Number('AB001'));
                expect(index_model_1.gameModel.findGameById).toHaveBeenCalledTimes(1);
                expect(result).toContain('Ocorreu um erro na busca:');
                expect(result).toContain(games_mock_1.invalidIdErrorMessage);
            }));
        });
    });
    describe('CADASTRAR UM NOVO JOGO', () => {
        describe('Caso não consiga cadastrar um novo jogo', () => {
            const incompleteGameData = {
                description: "Jogo incompleto para cadastrar",
                linkName: "Jogo Incompleto",
                linkUrl: "https://example.com/jogo-incompleto"
            };
            it('Deve retornar uma mensagem e os dados enviados', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameModel.createNewGame
                    .mockResolvedValue(null);
                const result = yield (0, games_service_1.createNewGame)(incompleteGameData);
                expect(index_model_1.gameModel.createNewGame).toHaveBeenCalledTimes(1);
                expect(index_model_1.gameModel.createNewGame).toHaveBeenCalledWith(incompleteGameData);
                expect(result)
                    .toContain('Não foi possível cadastrar o jogo com os seguintes dados:');
                expect(result).toContain(incompleteGameData.description);
                expect(result).toContain(incompleteGameData.linkName);
                expect(result).toContain(incompleteGameData.linkUrl);
            }));
        });
        describe('Com os dados corretos enviados', () => {
            it('Deve retornar um objeto com um ID', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameModel.createNewGame
                    .mockResolvedValue(games_mock_1.mockGame);
                const result = yield (0, games_service_1.createNewGame)(games_mock_1.mockGame1ToInsert);
                expect(index_model_1.gameModel.createNewGame).toHaveBeenCalledTimes(1);
                expect(index_model_1.gameModel.createNewGame).toHaveBeenCalledWith(games_mock_1.mockGame1ToInsert);
                expect(result).toEqual(games_mock_1.mockGame);
            }));
        });
        describe('Em caso de problemas na requisição:', () => {
            it('Deve retornar uma mensagem de erro', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameModel.createNewGame
                    .mockRejectedValue(games_mock_1.mockError);
                const result = yield (0, games_service_1.createNewGame)(games_mock_1.mockGame);
                expect(index_model_1.gameModel.createNewGame).toHaveBeenCalledTimes(1);
                expect(result)
                    .toContain('Ocorreu um erro no registro de novo jogo:');
                expect(result).toContain(games_mock_1.errorMessage);
            }));
        });
    });
    describe('ALTERAR OS DADOS DE UM JOGO', () => {
        describe('Caso não consiga encontrar o jogo', () => {
            const nonExistentId = 99999999999;
            it('Deve retornar mensagem de "não encontrado"', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameModel.findGameById
                    .mockResolvedValue(null);
                const result = yield (0, games_service_1.updateGame)(games_mock_1.mockGameToUpdate, nonExistentId);
                expect(index_model_1.gameModel.findGameById).toHaveBeenCalledTimes(1);
                expect(result).toContain("Jogo com o id");
                expect(result).toContain("não encontrado para atualização.");
            }));
            it('E a mensagem deve conter o ID procurado', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameModel.findGameById
                    .mockResolvedValue(null);
                const result = yield (0, games_service_1.updateGame)(games_mock_1.mockGameToUpdate, nonExistentId);
                expect(index_model_1.gameModel.findGameById).toHaveBeenCalledTimes(1);
                expect(result).toContain(`${nonExistentId}`);
            }));
        });
        describe('Caso não consiga realizar a alteração solicitada', () => {
            const emptyPayload = {};
            const existentId = 1;
            it('Deve retornar mensagem de impossibilidade de alteração', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameModel.findGameById
                    .mockResolvedValue(games_mock_1.mockGame);
                index_model_1.gameModel.updateGame
                    .mockResolvedValue(null);
                const result = yield (0, games_service_1.updateGame)(emptyPayload, existentId);
                expect(index_model_1.gameModel.findGameById).toHaveBeenCalledTimes(1);
                expect(index_model_1.gameModel.updateGame).toHaveBeenCalledTimes(1);
                expect(result).toContain('Não foi possível alterar os dados do jogo');
                expect(result).toContain(`com o id ${existentId}`);
                // Muito provavelmente, este é um falso positivo!!!
                // Corrigir a lógica da função para prever o envio de objeto vazio e
                // solicitar que se envie dados ou
                // devolver avisando que não tem o que alterar
            }));
        });
        describe('Caso sejam enviados os dados corretamente para alteração', () => {
            it('Retornar um breve relato do banco de dados', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameModel.updateGame
                    .mockResolvedValue({
                    updateResult: games_mock_1.mockResultSetHeader,
                    updatedGame: games_mock_1.mockUpdatedGame,
                });
                const result = yield (0, games_service_1.updateGame)(games_mock_1.mockGameToUpdate, 1);
                expect(index_model_1.gameModel.updateGame).toHaveBeenCalledTimes(1);
                expect(typeof result).not.toBe('string');
                if (typeof result !== 'string') {
                    expect(result).toHaveProperty('updateResult');
                    expect(result).toHaveProperty('updatedGame');
                    expect(result.updateResult).toEqual(games_mock_1.mockResultSetHeader);
                    expect(result.updatedGame).toEqual(games_mock_1.mockUpdatedGame);
                }
            }));
        });
        describe('Em caso de problemas na requisição:', () => {
            it('Deve retornar uma mensagem de erro', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameModel.updateGame
                    .mockRejectedValue(games_mock_1.mockUpdateError);
                const result = yield (0, games_service_1.updateGame)(games_mock_1.mockGameWithInvalidColumnName, 1);
                expect(index_model_1.gameModel.updateGame).toHaveBeenCalledTimes(1);
                expect(result)
                    .toContain('Ocorreu um erro na alteração de');
                expect(result)
                    .toContain('dados do jogo:');
                expect(result).toContain(games_mock_1.mockUpdateErrorMessage);
            }));
        });
    });
    describe('EXCLUIR UM JOGO DO BANCO DE DADOS', () => {
        describe('Caso não consiga excluir o jogo', () => {
            const nonExistentId = 99999999999;
            it('Deve retornar mensagem de impossibilidade de exclusão', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameModel.deleteGame
                    .mockResolvedValue(null);
                const result = yield (0, games_service_1.deleteGame)(nonExistentId);
                expect(index_model_1.gameModel.deleteGame).toHaveBeenCalledTimes(1);
                expect(result).toContain('Não foi possível excluir dados do jogo');
                expect(result).toContain(`com o id ${nonExistentId}`);
            }));
        });
        describe('Caso consiga excluir o jogo', () => {
            const existentId = 1;
            it('Deve retornar um breve relato do banco de dados', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameModel.deleteGame
                    .mockResolvedValue(games_mock_1.mockResultSetHeader);
                const result = yield (0, games_service_1.deleteGame)(existentId);
                expect(index_model_1.gameModel.deleteGame).toHaveBeenCalledTimes(1);
                expect(result).toEqual(games_mock_1.mockResultSetHeader);
            }));
        });
        describe('Em caso de problemas na requisição:', () => {
            it('Deve retornar uma mensagem de erro', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameModel.deleteGame
                    .mockRejectedValue(games_mock_1.mockError);
                const result = yield (0, games_service_1.deleteGame)(1);
                expect(index_model_1.gameModel.deleteGame).toHaveBeenCalledTimes(1);
                expect(result)
                    .toContain('Ocorreu um erro ao tentar excluir o jogo do banco de dados:');
                expect(result).toContain(games_mock_1.errorMessage);
            }));
        });
    });
});
