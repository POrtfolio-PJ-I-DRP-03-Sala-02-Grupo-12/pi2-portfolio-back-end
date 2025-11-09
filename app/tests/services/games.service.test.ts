import {
  gameModel,
} from "../../models/index.model";
import {
  findAllGames,
} from "../../services/games.service";
import {
  errorMessage,
  mockError,
  mockGame1ToInsert,
  mockGame2ToInsert,
  mockGame3ToInsert,
  mockGamesList
} from "../mocks/games.mock";

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

      it('E a lista deve conter os objetos corretos.', async () => {
        const result = await findAllGames();

        expect(result[0]).toEqual({ id: 1, ...mockGame1ToInsert });
        expect(result[1]).toEqual({ id: 2, ...mockGame2ToInsert });
        expect(result[2]).toEqual({ id: 3, ...mockGame3ToInsert });
      });
    });

    describe('Em caso de problemas na requisição:', () => {
      it('Deve retornar uma mensagem de erro', async () => {
        (gameModel.findAllGames as jest.Mock)
          .mockClear()
          .mockRejectedValue(mockError);
        
        const result = await findAllGames();

        expect(gameModel.findAllGames).toHaveBeenCalledTimes(1);
        expect(result).toContain('Erro ao buscar jogos:');
        expect(result).toContain(errorMessage);
      });
    });
  });
});