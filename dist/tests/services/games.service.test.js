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
const game_model_1 = require("../../models/game.model");
const index_model_1 = require("../../models/index.model");
jest.mock('../../models/index.model', () => ({
    gameModel: {
        findAllGames: jest.fn(),
    }
}));
describe('SERVIÇO - Games', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('Ao executar a função findAllGames', () => {
        describe('Caso não haja jogos cadastrados:', () => {
            it('Deve mostrar uma mensagem de lista vazia', () => __awaiter(void 0, void 0, void 0, function* () {
                const messageShouldBeReturned = "Não encontramos jogos cadastrados.";
                index_model_1.gameModel.findAllGames
                    .mockResolvedValue("Não encontramos jogos cadastrados.");
                const result = yield (0, game_model_1.findAllGames)();
                expect(index_model_1.gameModel.findAllGames).toHaveBeenCalledTimes(1);
                expect(result).toBe(messageShouldBeReturned);
            }));
        });
    });
});
