import { createNewGame } from "../../models/game.model";
import {
  mockCreateGameQuery,
  mockGame,
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

describe('Testes do modelo Game', () => {
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
});