import { createNewGame, findAllGames, findGameById } from "../../models/game.model";
import {
  mockCreateGameQuery,
  mockGame,
  mockGameResult,
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

  describe("BUSCA - busca de um jogo pelo ID", () => {
    const gameIdToSearch = 1;
    let result: IGame | null;

    beforeEach(async () => {
      (connection.query as unknown as jest.Mock).mockResolvedValueOnce([[mockGameResult], []]);
      result = await findGameById(gameIdToSearch);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("Ao informar um ID existente", () => {
      it("Deve executar a query apenas uma vez", async () => {
        expect(connection.query).toHaveBeenCalledTimes(1);
      });

      it("Deve incluir corretamente cláusulas chave para retorno de dados", async () => {
        expect(connection.query).toHaveBeenCalledWith(
          expect.stringContaining('WHERE g.id = ?'),
          [gameIdToSearch]
        );
  
        expect(connection.query).toHaveBeenCalledWith(
          expect.stringContaining('JSON_OBJECT'),
          [1]
        );
  
        expect(connection.query).toHaveBeenCalledWith(
          expect.stringContaining('JSON_OBJECT'), // Deve usar JSON_OBJECT para tags  
          [1]
        );
  
        expect(connection.query).toHaveBeenCalledWith(
          expect.stringContaining('title'), // Deve selecionar o title das imagens
          [1]
        );
      });

      it("Deve retornar o jogo (cadastrado) corretamente ao buscar pelo ID", async () => {        
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).toEqual(mockGameResult);
        
        if (!result) {
          throw new Error("Resultado não deveria ser nulo.");
        }
        expect(result.id).toBe(1);
        expect(result.title).toBe('Jogo para Teste 1');
      });

      it("Deve retornar o jogo com as imagens relacionadas corretamente", async () => {
        if (!result || !result.images) throw new Error("Imagens não deveriam ser nulas.");
        expect(result.images).toHaveLength(2);
        expect(result.images[0]).toHaveProperty('id');
        expect(result.images[1].url).toBe('https://example.com/imagem2.jpg');
      });

      it("Deve retornar o jogo com as tags relacionadas corretamente", async () => {
        if (!result || !result.tags) throw new Error("Tags não deveriam ser nulas.");
        expect(result.tags).toHaveLength(3);
        expect(result.tags[0]).toHaveProperty('title');
        expect(result.tags[2].title).toBe('Categoria TST 3');
      });
    });
  });
});