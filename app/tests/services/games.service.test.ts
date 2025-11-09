jest.mock('../../models/index.model', () => ({
  gameModel: {
    findAllGames: jest.fn(),
    findGameById: jest.fn(),
  }
}));

import {
  gameModel,
} from "../../models/index.model";  
import {
  findAllGames,
  findGameById,
} from "../../services/games.service";  
import {
  errorMessage,
  mockError,
  mockGame,
  mockGame1ToInsert,
  mockGame2ToInsert,
  mockGame3ToInsert,
  mockGamesList
} from "../mocks/games.mock";

describe('TESTES DO SERVIÇO GAMES', ()=> {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Ao executar a função findAllGames', () => {
    describe('Caso não haja jogos cadastrados:', () => {
      it('Deve mostrar uma mensagem de lista vazia', async () => {
        const messageShouldBeReturned = "Não encontramos jogos cadastrados.";
        
        (gameModel.findAllGames as jest.Mock)
          .mockResolvedValue(null);

        const result = await findAllGames();

        expect(gameModel.findAllGames).toHaveBeenCalledTimes(1);
        expect(result).toBe(messageShouldBeReturned);
      });
    });

    describe('Com jogos cadastrados', () => {
      it('Com três jogos cadastrados, deve retornar um array de tamanho 3.', async () => {
        (gameModel.findAllGames as jest.Mock)
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
          .mockRejectedValue(mockError);
        
        const result = await findAllGames();

        expect(gameModel.findAllGames).toHaveBeenCalledTimes(1);
        expect(result).toContain('Erro ao buscar jogos:');
        expect(result).toContain(errorMessage);
      });
    });
  });

  describe('Ao executar a função findGameById', () => {
    describe('Informando um ID que não existe', () => {
      const nonExistentId = 0;
      const messageToBeReturned = `Não conseguimos encontrar o jogo pelo id ${nonExistentId}`;
      it('Deve retornar uma mensagem de "Não encontrado"', async () => {
        (gameModel.findGameById as jest.Mock)
          .mockResolvedValue(null);
        
        const result = await findGameById(0);

        expect(gameModel.findGameById).toHaveBeenCalledTimes(1);
        expect(gameModel.findGameById).toHaveBeenCalledWith(nonExistentId);
        expect(result).toEqual(messageToBeReturned);
      });
    });

    describe('Informando um ID existente', () => {
      const correctId = 1;

      it('Deve retornar o objeto corretamente.', async () => {
        (gameModel.findGameById as jest.Mock)
          .mockResolvedValue(mockGame);

        const result = await findGameById(correctId);

        expect(gameModel.findGameById).toHaveBeenCalledTimes(1);
        expect(gameModel.findGameById).toHaveBeenCalledWith(correctId);
        expect(result).not.toBeNull();
        expect(result).toHaveProperty('title');
        if (typeof result !== 'string') {
          expect(result.title).toBeDefined();
          expect(result.title).toEqual(mockGame.title);
        }
        expect(result).toEqual(mockGame);
      });
    });
  });
});