jest.mock('../../models/index.model', () => ({
  gameModel: {
    findAllGames: jest.fn(),
    findGameById: jest.fn(),
    createNewGame: jest.fn(),
    updateGame: jest.fn(),
    deleteGame: jest.fn(),
  }
}));

import IGame from "../../interfaces/IGame";
import {
  gameModel,
} from "../../models/index.model";  
import {
  createNewGame,
  deleteGame,
  findAllGames,
  findGameById,
  updateGame,
} from "../../services/games.service";  
import {
  errorMessage,
  invalidIdErrorMessage,
  mockError,
  mockGame,
  mockGame1ToInsert,
  mockGame2ToInsert,
  mockGame3ToInsert,
  mockGamesList,
  mockGameToUpdate,
  mockGameWithInvalidColumnName,
  mockInvalidIdError,
  mockResultSetHeader,
  mockUpdatedGame,
  mockUpdateError,
  mockUpdateErrorMessage
} from "../mocks/games.mock";

describe('TESTES DO SERVIÇO GAMES', ()=> {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('LISTAR JOGOS', () => {
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

  describe('BUSCAR UM JOGO POR ID', () => {
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

    describe('Em caso de problemas na requisição:', () => {
      it('Deve retornar uma mensagem de erro', async () => {
        (gameModel.findGameById as jest.Mock)
          .mockRejectedValue(mockInvalidIdError);
        
        const result = await findGameById(Number('AB001'));

        expect(gameModel.findGameById).toHaveBeenCalledTimes(1);
        expect(result).toContain('Ocorreu um erro na busca:');
        expect(result).toContain(invalidIdErrorMessage);
      });
    });
  });

  describe('CADASTRAR UM NOVO JOGO', () => {
    describe('Caso não consiga cadastrar um novo jogo', () => {
      const incompleteGameData = {
        description: "Jogo incompleto para cadastrar",
        linkName: "Jogo Incompleto",
        linkUrl: "https://example.com/jogo-incompleto"
      };

      it('Deve retornar uma mensagem e os dados enviados', async () => {
        (gameModel.createNewGame as jest.Mock)
          .mockResolvedValue(null);

        const result = await createNewGame(incompleteGameData as unknown as IGame);

        expect(gameModel.createNewGame).toHaveBeenCalledTimes(1);
        expect(gameModel.createNewGame).toHaveBeenCalledWith(incompleteGameData);
        expect(result)
          .toContain('Não foi possível cadastrar o jogo com os seguintes dados:');
        expect(result).toContain(incompleteGameData.description);
        expect(result).toContain(incompleteGameData.linkName);
        expect(result).toContain(incompleteGameData.linkUrl);
      });
    });

    describe('Com os dados corretos enviados', () => {
      it('Deve retornar um objeto com um ID', async () => {
        (gameModel.createNewGame as jest.Mock)
          .mockResolvedValue(mockGame);
        
        const result = await createNewGame(mockGame1ToInsert);

        expect(gameModel.createNewGame).toHaveBeenCalledTimes(1);
        expect(gameModel.createNewGame).toHaveBeenCalledWith(mockGame1ToInsert);
        expect(result).toEqual(mockGame);
      });
    });
  
    describe('Em caso de problemas na requisição:', () => {
      it('Deve retornar uma mensagem de erro', async () => {
        (gameModel.createNewGame as jest.Mock)
          .mockRejectedValue(mockError);
  
        const result = await createNewGame(mockGame);
  
        expect(gameModel.createNewGame).toHaveBeenCalledTimes(1);
        expect(result)
          .toContain('Ocorreu um erro no registro de novo jogo:');
        expect(result).toContain(errorMessage);
      });
    });
  });

  describe('ALTERAR OS DADOS DE UM JOGO', () => {
    describe('Caso não consiga encontrar o jogo', () => {
      const nonExistentId = 99999999999;

      it('Deve retornar mensagem de "não encontrado"', async () => {
        (gameModel.findGameById as jest.Mock)
          .mockResolvedValue(null);

        const result = await updateGame(mockGameToUpdate, nonExistentId);

        expect(gameModel.findGameById).toHaveBeenCalledTimes(1);
        expect(result).toContain("Jogo com o id");
        expect(result).toContain("não encontrado para atualização.");
      });

      it('E a mensagem deve conter o ID procurado', async () => {
        (gameModel.findGameById as jest.Mock)
          .mockResolvedValue(null);

        const result = await updateGame(mockGameToUpdate, nonExistentId);

        expect(gameModel.findGameById).toHaveBeenCalledTimes(1);
        expect(result).toContain(`${nonExistentId}`);
      });
    });

    describe('Caso não consiga realizar a alteração solicitada', () => {
      const emptyPayload = {} as IGame;
      const existentId = 1;

      it('Deve retornar mensagem de impossibilidade de alteração', async () => {
        (gameModel.findGameById as jest.Mock)
          .mockResolvedValue(mockGame);
        (gameModel.updateGame as jest.Mock)
          .mockResolvedValue(null);

        const result = await updateGame(emptyPayload, existentId);

        expect(gameModel.findGameById).toHaveBeenCalledTimes(1);
        expect(gameModel.updateGame).toHaveBeenCalledTimes(1);
        expect(result).toContain('Não foi possível alterar os dados do jogo');
        expect(result).toContain(`com o id ${existentId}`);
        // Muito provavelmente, este é um falso positivo!!!
        // Corrigir a lógica da função para prever o envio de objeto vazio e
        // solicitar que se envie dados ou
        // devolver avisando que não tem o que alterar
      });
    });

    describe('Caso sejam enviados os dados corretamente para alteração', () => {
      it('Retornar um breve relato do banco de dados', async () => {
        (gameModel.updateGame as jest.Mock)
          .mockResolvedValue({
            updateResult: mockResultSetHeader,
            updatedGame: mockUpdatedGame,
          });
        
        const result = await updateGame(mockGameToUpdate, 1);

        expect(gameModel.updateGame).toHaveBeenCalledTimes(1);
        expect(typeof result).not.toBe('string');
        if (typeof result !== 'string') {
          expect(result).toHaveProperty('updateResult');
          expect(result).toHaveProperty('updatedGame');
          expect(result.updateResult).toEqual(mockResultSetHeader);
          expect(result.updatedGame).toEqual(mockUpdatedGame);
        }
      });
    });

    describe('Em caso de problemas na requisição:', () => {
      it('Deve retornar uma mensagem de erro', async () => {
        (gameModel.updateGame as jest.Mock)
          .mockRejectedValue(mockUpdateError);
  
        const result = await updateGame(mockGameWithInvalidColumnName, 1);
  
        expect(gameModel.updateGame).toHaveBeenCalledTimes(1);
        expect(result)
          .toContain('Ocorreu um erro na alteração de');
        expect(result)
          .toContain('dados do jogo:');
        expect(result).toContain(mockUpdateErrorMessage);
      });
    });
  });

  describe('EXCLUIR UM JOGO DO BANCO DE DADOS', () => {
    describe('Caso não consiga excluir o jogo', () => {
      const nonExistentId = 99999999999;

      it('Deve retornar mensagem de impossibilidade de exclusão', async () => {
        (gameModel.deleteGame as jest.Mock)
          .mockResolvedValue(null);
          
        const result = await deleteGame(nonExistentId);

        expect(gameModel.deleteGame).toHaveBeenCalledTimes(1);
        expect(result).toContain('Não foi possível excluir dados do jogo');
        expect(result).toContain(`com o id ${nonExistentId}`);
      });
    });

    describe('Caso consiga excluir o jogo', () => {
      const existentId = 1;

      it('Deve retornar um breve relato do banco de dados', async () => {
        (gameModel.deleteGame as jest.Mock)
          .mockResolvedValue(mockResultSetHeader);
        
        const result = await deleteGame(existentId);

        expect(gameModel.deleteGame).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockResultSetHeader);
      });
    });

    describe('Em caso de problemas na requisição:', () => {
      it('Deve retornar uma mensagem de erro', async () => {
        (gameModel.deleteGame as jest.Mock)
          .mockRejectedValue(mockError);
  
        const result = await deleteGame(1);
  
        expect(gameModel.deleteGame).toHaveBeenCalledTimes(1);
        expect(result)
          .toContain('Ocorreu um erro ao tentar excluir o jogo do banco de dados:');
        expect(result).toContain(errorMessage);
      });
    });
  });
});