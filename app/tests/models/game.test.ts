import { createNewGame, findAllGames } from "../../models/game.model";
import {
  mockCreateGameQuery,
  mockGame,
  mockGamesList,
  mockResultSetHeader,
} from "../mocks/games.mock";

jest.mock('../../models/connection.ts', () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  }
}));

import connection from '../../models/connection';
import IGame from "../../interfaces/IGame";

describe('TESTES DO MODELO GAME', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('CADASTRO - criação de novo jogo', () => {
    describe('Enviando um objeto válido', () => {
      it('Deve cadastrar e retornar corretamente o jogo', async () => {
        const newGameData: Omit<IGame, 'id'> = {
          title: 'Jogo para Teste 1',
          description: 'Descrição do jogo 1',
          linkName: 'Link Jogo 1',
          linkUrl: 'https://example.com/jogo1'
        };
  
        (connection.query as unknown as jest.Mock)
          .mockResolvedValue([mockResultSetHeader, []]);
        
        const result = await createNewGame(newGameData as IGame);
  
        expect(connection.query).toHaveBeenCalledTimes(1);
        expect(connection.query).toHaveBeenCalledWith(
          mockCreateGameQuery,
          [
            newGameData.title,
            newGameData.description,
            newGameData.linkName,
            newGameData.linkUrl
          ]
        );
  
        expect(result).toEqual(mockGame);
      });
    });
  });

  describe("LISTA - listagem de jogos", () => {
    it("Com 3 jogos cadastrados, deve retornar a lista com todos eles corretamente", async () => {
      (connection.query as unknown as jest.Mock)
        .mockResolvedValueOnce([mockResultSetHeader, []])
        .mockResolvedValueOnce([mockResultSetHeader, []])
        .mockResolvedValueOnce([mockResultSetHeader, []])
        .mockResolvedValueOnce([mockGamesList, []]);

      await createNewGame(mockGamesList[0] as IGame);
      await createNewGame(mockGamesList[1] as IGame);
      await createNewGame(mockGamesList[2] as IGame);

      const result = await findAllGames();
      
      expect(connection.query).toHaveBeenCalledTimes(4);
      expect(result.length).toBe(3);
      expect(result[0]).toEqual(mockGamesList[0]);
      expect(result[1]).toEqual(mockGamesList[1]);
      expect(result[2]).toEqual(mockGamesList[2]);
      expect(result).toEqual(mockGamesList);
    });
  });
});