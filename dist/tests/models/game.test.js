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
const game_model_1 = require("../../models/game.model");
const games_mock_1 = require("../mocks/games.mock");
jest.mock('../../models/connection.ts', () => ({
    __esModule: true,
    default: {
        query: jest.fn(),
    }
}));
const connection_1 = __importDefault(require("../../models/connection"));
describe('TESTES DO MODELO GAME', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('CADASTRO - criação de novo jogo', () => {
        describe('Enviando um objeto válido', () => {
            it('Deve cadastrar e retornar corretamente o jogo', () => __awaiter(void 0, void 0, void 0, function* () {
                const newGameData = {
                    title: 'Jogo para Teste 1',
                    description: 'Descrição do jogo 1',
                    linkName: 'Link Jogo 1',
                    linkUrl: 'https://example.com/jogo1'
                };
                connection_1.default.query
                    .mockResolvedValue([games_mock_1.mockResultSetHeader, []]);
                const result = yield (0, game_model_1.createNewGame)(newGameData);
                expect(connection_1.default.query).toHaveBeenCalledTimes(1);
                expect(connection_1.default.query).toHaveBeenCalledWith(games_mock_1.mockCreateGameQuery, [
                    newGameData.title,
                    newGameData.description,
                    newGameData.linkName,
                    newGameData.linkUrl
                ]);
                expect(result).toEqual(games_mock_1.mockGame);
            }));
        });
    });
    describe("LISTA - listagem de jogos", () => {
        it("Com 3 jogos cadastrados, deve retornar a lista com todos eles corretamente", () => __awaiter(void 0, void 0, void 0, function* () {
            connection_1.default.query
                .mockResolvedValueOnce([games_mock_1.mockResultSetHeader, []])
                .mockResolvedValueOnce([games_mock_1.mockResultSetHeader, []])
                .mockResolvedValueOnce([games_mock_1.mockResultSetHeader, []])
                .mockResolvedValueOnce([games_mock_1.mockGamesList, []]);
            yield (0, game_model_1.createNewGame)(games_mock_1.mockGamesList[0]);
            yield (0, game_model_1.createNewGame)(games_mock_1.mockGamesList[1]);
            yield (0, game_model_1.createNewGame)(games_mock_1.mockGamesList[2]);
            const result = yield (0, game_model_1.findAllGames)();
            expect(connection_1.default.query).toHaveBeenCalledTimes(4);
            expect(result.length).toBe(3);
            expect(result[0]).toEqual(games_mock_1.mockGamesList[0]);
            expect(result[1]).toEqual(games_mock_1.mockGamesList[1]);
            expect(result[2]).toEqual(games_mock_1.mockGamesList[2]);
            expect(result).toEqual(games_mock_1.mockGamesList);
        }));
    });
    describe("BUSCA - busca de um jogo pelo ID", () => {
        const gameIdToSearch = 1;
        let result;
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            connection_1.default.query.mockResolvedValueOnce([[games_mock_1.mockGameResult], []]);
            result = yield (0, game_model_1.findGameById)(gameIdToSearch);
        }));
        afterEach(() => {
            jest.clearAllMocks();
        });
        describe("Ao informar um ID existente", () => {
            it("Deve executar a query apenas uma vez", () => __awaiter(void 0, void 0, void 0, function* () {
                expect(connection_1.default.query).toHaveBeenCalledTimes(1);
            }));
            it("Deve incluir corretamente cláusulas chave para retorno de dados", () => __awaiter(void 0, void 0, void 0, function* () {
                expect(connection_1.default.query).toHaveBeenCalledWith(expect.stringContaining('WHERE g.id = ?'), [gameIdToSearch]);
                expect(connection_1.default.query).toHaveBeenCalledWith(expect.stringContaining('JSON_OBJECT'), [1]);
                expect(connection_1.default.query).toHaveBeenCalledWith(expect.stringContaining('JSON_OBJECT'), // Deve usar JSON_OBJECT para tags  
                [1]);
                expect(connection_1.default.query).toHaveBeenCalledWith(expect.stringContaining('title'), // Deve selecionar o title das imagens
                [1]);
            }));
            it("Deve retornar o jogo (cadastrado) corretamente ao buscar pelo ID", () => __awaiter(void 0, void 0, void 0, function* () {
                expect(result).toBeDefined();
                expect(result).not.toBeNull();
                expect(result).toEqual(games_mock_1.mockGameResult);
                if (!result) {
                    throw new Error("Resultado não deveria ser nulo.");
                }
                expect(result.id).toBe(1);
                expect(result.title).toBe('Jogo para Teste 1');
            }));
            it("Deve retornar o jogo com as imagens relacionadas corretamente", () => __awaiter(void 0, void 0, void 0, function* () {
                if (!result || !result.images)
                    throw new Error("Imagens não deveriam ser nulas.");
                expect(result.images).toHaveLength(2);
                expect(result.images[0]).toHaveProperty('id');
                expect(result.images[1].url).toBe('https://example.com/imagem2.jpg');
            }));
            it("Deve retornar o jogo com as tags relacionadas corretamente", () => __awaiter(void 0, void 0, void 0, function* () {
                if (!result || !result.tags)
                    throw new Error("Tags não deveriam ser nulas.");
                expect(result.tags).toHaveLength(3);
                expect(result.tags[0]).toHaveProperty('title');
                expect(result.tags[2].title).toBe('Categoria TST 3');
            }));
        });
    });
});
