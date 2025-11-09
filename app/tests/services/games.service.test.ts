import { gameModel } from "../../models/index.model";
import { findAllGames } from "../../services/games.service";
import { mockGamesList } from "../mocks/games.mock";

jest.mock('../../models/index.model', () => ({
  gameModel: {
    findAllGames: jest.fn(),
  }
}));

describe('TESTES DO SERVIÇO GAMES', ()=> {
  describe('Ao executar a função findAllGames', () => {
    describe('Caso não haja jogos cadastrados:', () => {
      it('Deve mostrar uma mensagem de lista vazia', async () => {
        const messageShouldBeReturned = "Não encontramos jogos cadastrados.";
        
        (gameModel.findAllGames as jest.Mock)
          .mockClear()
          .mockResolvedValue("Não encontramos jogos cadastrados.");

        const result = await findAllGames();

        expect(gameModel.findAllGames).toHaveBeenCalledTimes(1);
        expect(result).toBe(messageShouldBeReturned);
      });
    });

    describe('Com jogos cadastrados', () => {
      it('Com três jogos cadastrados, deve retornar um array de tamanho 3.', async () => {
        (gameModel.findAllGames as jest.Mock)
          .mockClear()
          .mockResolvedValue(mockGamesList);
  
        const result = await findAllGames();
        
        expect(gameModel.findAllGames).toHaveBeenCalledTimes(1);
        expect(result).toHaveLength(3);
      });
    });
  });
});