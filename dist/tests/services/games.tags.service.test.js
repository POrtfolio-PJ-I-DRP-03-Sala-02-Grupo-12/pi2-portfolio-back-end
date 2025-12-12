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
jest.mock("../../models/index.model", () => ({
    gameTagModel: {
        findAllGamesTags: jest.fn(),
        createNewGameTag: jest.fn(),
        deleteGameTag: jest.fn(),
    },
}));
const index_model_1 = require("../../models/index.model");
const games_tags_service_1 = require("../../services/games.tags.service");
const game_tag_mock_1 = require("../mocks/game.tag.mock");
const tag_mock_1 = require("../mocks/tag.mock");
describe('TESTES DO SERVIÇO DE CATEGORIAS DE JOGOS', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('LISTAR CATEGORIAS DE JOGOS', () => {
        describe('Caso não existam categorias associadas a jogos', () => {
            it('Deve retornar uma mensagem de lista vazia', () => __awaiter(void 0, void 0, void 0, function* () {
                const expectedMessage = 'Não encontramos jogos com categorias associadas.';
                index_model_1.gameTagModel.findAllGamesTags
                    .mockResolvedValue([]);
                const result = yield (0, games_tags_service_1.findAllGamesTags)();
                expect(index_model_1.gameTagModel.findAllGamesTags).toHaveBeenCalledTimes(1);
                expect(result).toBe(expectedMessage);
            }));
        });
        describe('Com associações cadastradas', () => {
            it('Com 3 associações cadastradas, deve retornar um array de tamanho 3', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameTagModel.findAllGamesTags
                    .mockResolvedValue(game_tag_mock_1.mockGameTagsList);
                const result = yield (0, games_tags_service_1.findAllGamesTags)();
                expect(index_model_1.gameTagModel.findAllGamesTags).toHaveBeenCalledTimes(1);
                expect(Array.isArray(result)).toBe(true);
                if (Array.isArray(result)) {
                    expect(result).toHaveLength(3);
                    expect(result).toEqual(game_tag_mock_1.mockGameTagsList);
                }
            }));
        });
        describe('Em caso de problemas na requisição:', () => {
            it('Deve retornar uma mensagem de erro', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameTagModel.findAllGamesTags
                    .mockRejectedValue(game_tag_mock_1.mockError);
                const result = yield (0, games_tags_service_1.findAllGamesTags)();
                expect(index_model_1.gameTagModel.findAllGamesTags).toHaveBeenCalledTimes(1);
                expect(result).toContain('Erro ao buscar jogos com categorias:');
                expect(result).toContain(game_tag_mock_1.mockError.message);
            }));
        });
    });
    describe('CADASTRAR UMA NOVA ASSOCIAÇÃO DE CATEGORIA A UM JOGO', () => {
        describe('Caso não consiga cadastrar a associação', () => {
            const incompleteGameTagData = {
                gameId: 1,
            };
            it('Deve retornar mensagem de impossibilidade de cadastro', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameTagModel.createNewGameTag
                    .mockResolvedValue(null);
                const result = yield (0, games_tags_service_1.createNewGameTag)(incompleteGameTagData);
                expect(index_model_1.gameTagModel.createNewGameTag).toHaveBeenCalledTimes(1);
                expect(index_model_1.gameTagModel.createNewGameTag).toHaveBeenCalledWith(incompleteGameTagData);
                expect(result)
                    .toContain('Não foi possível associar a categoria ao jogo' +
                    ' com os seguintes dados:');
            }));
            it('E deve retornar junto os dados enviados.', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameTagModel.createNewGameTag
                    .mockResolvedValue(null);
                const result = yield (0, games_tags_service_1.createNewGameTag)(incompleteGameTagData);
                expect(result).toContain(`gameId: ${incompleteGameTagData.gameId}`);
                expect(result).toContain(`tagId:`);
            }));
        });
        describe('Caso dados corretos sejam enviados', () => {
            it('Deve retornar os dados da nova associação cadastrada', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameTagModel.createNewGameTag
                    .mockResolvedValue(game_tag_mock_1.mockGameTag1);
                const result = yield (0, games_tags_service_1.createNewGameTag)(game_tag_mock_1.mockGameTag1);
                expect(index_model_1.gameTagModel.createNewGameTag).toHaveBeenCalledTimes(1);
                expect(index_model_1.gameTagModel.createNewGameTag).toHaveBeenCalledWith(game_tag_mock_1.mockGameTag1);
                expect(result).toEqual(game_tag_mock_1.mockGameTag1);
            }));
        });
        describe('Em caso de problemas na requisição:', () => {
            it('Deve retornar uma mensagem de erro', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameTagModel.createNewGameTag
                    .mockRejectedValue(game_tag_mock_1.mockError);
                const result = yield (0, games_tags_service_1.createNewGameTag)(game_tag_mock_1.mockGameTag1);
                expect(index_model_1.gameTagModel.createNewGameTag).toHaveBeenCalledTimes(1);
                expect(result)
                    .toContain('Ocorreu um erro ao associar a categoria ao jogo:');
                expect(result).toContain(game_tag_mock_1.mockError.message);
            }));
        });
    });
    describe('DELETAR UMA ASSOCIAÇÃO DE CATEGORIA A UM JOGO', () => {
        describe('Caso não consiga deletar a associação', () => {
            const gameIdToDelete = 1;
            const tagIdToDelete = 99;
            it('Deve retornar mensagem de impossibilidade de exclusão', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameTagModel.deleteGameTag
                    .mockResolvedValue(null);
                const result = yield (0, games_tags_service_1.deleteGameTag)(gameIdToDelete, tagIdToDelete);
                expect(index_model_1.gameTagModel.deleteGameTag).toHaveBeenCalledTimes(1);
                expect(index_model_1.gameTagModel.deleteGameTag).toHaveBeenCalledWith(gameIdToDelete, tagIdToDelete);
                expect(result)
                    .toContain('Não foi possível deletar a associação da categoria ao jogo' +
                    ' com os seguintes dados:');
            }));
            it('E deve retornar junto os dados enviados.', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameTagModel.deleteGameTag
                    .mockResolvedValue(null);
                const result = yield (0, games_tags_service_1.deleteGameTag)(gameIdToDelete, tagIdToDelete);
                expect(result).toContain(`gameId: ${gameIdToDelete}`);
                expect(result).toContain(`tagId: ${tagIdToDelete}`);
            }));
        });
        describe('Caso dados corretos sejam enviados', () => {
            it('Deve retornar o ResultSetHeader da exclusão', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.gameTagModel.deleteGameTag
                    .mockResolvedValue(tag_mock_1.mockResultSetHeader);
                const result = yield (0, games_tags_service_1.deleteGameTag)(1, 2);
                expect(index_model_1.gameTagModel.deleteGameTag).toHaveBeenCalledTimes(1);
                expect(index_model_1.gameTagModel.deleteGameTag).toHaveBeenCalledWith(1, 2);
                expect(result).toEqual(tag_mock_1.mockResultSetHeader);
            }));
        });
    });
    describe('Em caso de problemas na requisição:', () => {
        it('Deve retornar uma mensagem de erro', () => __awaiter(void 0, void 0, void 0, function* () {
            index_model_1.gameTagModel.deleteGameTag
                .mockRejectedValue(game_tag_mock_1.mockError);
            const result = yield (0, games_tags_service_1.deleteGameTag)(1, 1);
            expect(index_model_1.gameTagModel.deleteGameTag).toHaveBeenCalledTimes(1);
            expect(result)
                .toContain('Ocorreu um erro ao deletar a associação da categoria ao jogo:');
            expect(result).toContain(game_tag_mock_1.mockError.message);
        }));
    });
});
