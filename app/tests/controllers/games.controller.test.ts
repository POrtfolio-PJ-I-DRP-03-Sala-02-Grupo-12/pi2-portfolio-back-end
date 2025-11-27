jest.mock('../../services/index.services', () => ({
  gamesService: {
    findAllGames: jest.fn(),
    findGameById: jest.fn(),
    createNewGame: jest.fn(),
    updateGame: jest.fn(),
    deleteGame: jest.fn(),
  },
}));

import {
  Request,
  Response,
} from "express";
import {
  gamesService,
} from "../../services/index.services";
import {
  createNewGame,
  findAllGames,
  findGameById,
  updateGame,
} from "../../controllers/games.controller";
import {
  mockError,
  mockGame1ToInsert,
  mockGamesList,
  mockGameToUpdate,
  mockGameWithInvalidColumnName,
  mockResultSetHeader,
  mockUpdatedGame,
  mockUpdateError
} from "../mocks/games.mock";
import IGame from "../../interfaces/IGame";
import { mock } from "node:test";

describe('TESTES DO CONTROLLER GAMES', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('LISTAR JOGOS', () => {
    describe('Caso não haja jogos cadastrados', () => {
      const mockRequest: Partial<Request> = {};
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      it('Deve retornar status 404', async () => {
        (gamesService.findAllGames as jest.Mock)
          .mockResolvedValue('Não encontramos jogos cadastrados.');
        
        await findAllGames(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
      });

      it('Deve retornar a mensagem correta', async () => {
        (gamesService.findAllGames as jest.Mock)
          .mockResolvedValue('Não encontramos jogos cadastrados.');
        
        await findAllGames(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          { message: 'Não encontramos jogos cadastrados.' }
        );
      });
    });

    describe('Caso haja jogos cadastrados', () => {
      const mockRequest: Partial<Request> = {};
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      it('Deve retornar status 200', async () => {
        (gamesService.findAllGames as jest.Mock)
          .mockResolvedValue(mockGamesList);

        await findAllGames(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });

      it('Deve retornar a lista de jogos', async () => {
        (gamesService.findAllGames as jest.Mock)
          .mockResolvedValue(mockGamesList);

        await findAllGames(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(mockGamesList);
      });
    });

    describe('Caso ocorra um erro', () => {
      const mockRequest: Partial<Request> = {};
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      it('Deve retornar status 500', async () => {
        (gamesService.findAllGames as jest.Mock)
          .mockRejectedValue(mockError);

        await findAllGames(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
      });
      
      it('Deve retornar a mensagem de erro correta', async () => {
        (gamesService.findAllGames as jest.Mock)
          .mockRejectedValue(mockError);

        await findAllGames(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          { message: `Erro no servidor ao listar jogos: ${mockError.message}` }
        );
      });
    });
  });

  describe('BUSCAR JOGO PELO ID', () => {
    describe('Caso o jogo não seja encontrado', () => {
      const mockRequest: Partial<Request> = {
        params: { id: '999' },
      };
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      
      it('Deve retornar status 404', async () => {
        (gamesService.findGameById as jest.Mock)
          .mockResolvedValue('Não conseguimos encontrar o jogo pelo id 999');

        await findGameById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
      });

      it('Deve retornar a mensagem correta', async () => {
        (gamesService.findGameById as jest.Mock)
          .mockResolvedValue('Não conseguimos encontrar o jogo pelo id 999');

        await findGameById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          {
            message: 'Não conseguimos encontrar o jogo pelo id 999',
          }
        );
      });
    });

    describe('Caso o jogo seja encontrado', () => {
      const mockRequest: Partial<Request> = {
        params: { id: '1' },
      };
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      it('Deve retornar status 200', async () => {
        (gamesService.findGameById as jest.Mock)
          .mockResolvedValue(mockGamesList[0]);

        await findGameById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });

      it('Deve retornar o jogo correto', async () => {
        (gamesService.findGameById as jest.Mock)
          .mockResolvedValue(mockGamesList[0]);

        await findGameById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(mockGamesList[0]);
      });
    });

    describe('Caso ocorra um erro', () => {
      const mockRequest: Partial<Request> = {
        params: { id: '1' },
      };
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      it('Deve retornar status 500', async () => {
        (gamesService.findGameById as jest.Mock)
          .mockRejectedValue(mockError);

        await findGameById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
      });

      it('Deve retornar a mensagem de erro correta', async () => {
        (gamesService.findGameById as jest.Mock)
          .mockRejectedValue(mockError);

        await findGameById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          { message: `Erro no servidor ao buscar jogo: ${mockError.message}` }
        );
      });
    });
  });

  describe('CADASTRAR NOVO JOGO', () => {
    describe('Caso não consiga cadastrar o jogo', () => {
      const mockGameIncomplete: Partial<IGame> = {
        description: "Jogo de teste incompleto",
        linkName: "Jogo Incompleto",
        linkUrl: "https://example.com/jogo-incompleto",
      };

      const mockRequest: Partial<Request> = {
        body: mockGameIncomplete,
      };
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      it('Deve retornar status 400', async () => {
        (gamesService.createNewGame as jest.Mock)
          .mockResolvedValue(
            'Não foi possível cadastrar o jogo com os seguintes dados:\n' +
            'título: ' + mockGameIncomplete.title + '\n' +
            'descrição: ' + mockGameIncomplete.description + '\n' +
            'nome do link: ' + mockGameIncomplete.linkName + '\n' +
            'url do link: ' + mockGameIncomplete.linkUrl
          );

        await createNewGame(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });

      it('Deve retornar a mensagem correta', async () => {
        (gamesService.createNewGame as jest.Mock)
          .mockResolvedValue(
            'Não foi possível cadastrar o jogo com os seguintes dados:\n' +
            'título: ' + mockGameIncomplete.title + '\n' +
            'descrição: ' + mockGameIncomplete.description + '\n' +
            'nome do link: ' + mockGameIncomplete.linkName + '\n' +
            'url do link: ' + mockGameIncomplete.linkUrl
          );
          
        await createNewGame(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          {
            message:
              'Não foi possível cadastrar o jogo com os seguintes dados:\n' +
              'título: ' + mockGameIncomplete.title + '\n' +
              'descrição: ' + mockGameIncomplete.description + '\n' +
              'nome do link: ' + mockGameIncomplete.linkName + '\n' +
              'url do link: ' + mockGameIncomplete.linkUrl
          }
        );
      });
    });

    describe('Caso consiga cadastrar o jogo', () => {
      const mockRequest: Partial<Request> = {
        body: mockGame1ToInsert,
      };
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      it('Deve retornar status 201', async () => {
        (gamesService.createNewGame as jest.Mock)
          .mockResolvedValue({ id: 1, ...mockGame1ToInsert });
          
        await createNewGame(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
      });

      it('Deve retornar o jogo cadastrado', async () => {
        (gamesService.createNewGame as jest.Mock)
          .mockResolvedValue({ id: 1, ...mockGame1ToInsert });
          
        await createNewGame(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          { id: 1, ...mockGame1ToInsert }
        );
      });
    });

    describe('Caso ocorra um erro', () => {
      const mockRequest: Partial<Request> = {
        body: mockGame1ToInsert,
      };
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      it('Deve retornar status 500', async () => {
        (gamesService.createNewGame as jest.Mock)
          .mockRejectedValue(mockError);
          
        await createNewGame(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
      });

      it('Deve retornar a mensagem de erro correta', async () => {
        (gamesService.createNewGame as jest.Mock)
          .mockRejectedValue(mockError);
          
        await createNewGame(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          { message: `Erro no servidor ao cadastrar jogo: ${mockError.message}` }
        );
      });
    });
  });

  describe('ATUALIZAR JOGO', () => {
    describe('Caso não consiga encontrar o jogo para atualizar', () => {
      const mockRequest: Partial<Request> = {
        params: { id: '999' },
        body: mockGameToUpdate,
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      it('Deve retornar status 400', async () => {
        (gamesService.updateGame as jest.Mock)
          .mockResolvedValue('Jogo com o id 999 não encontrado para atualização.');

        await updateGame(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
      
      it('Deve retornar a mensagem correta', async () => {
        (gamesService.updateGame as jest.Mock)
          .mockResolvedValue('Jogo com o id 999 não encontrado para atualização.');

        await updateGame(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          { message: 'Jogo com o id 999 não encontrado para atualização.' }
        );
      });
    });

    describe('Caso não consiga atualizar o jogo', () => {
      const mockRequest: Partial<Request> = {
        params: { id: '999' },
        body: { description: 'Descrição alterada para teste' },
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      it('Deve retornar status 400', async () => {
        (gamesService.updateGame as jest.Mock)
          .mockResolvedValue('Não foi possível atualizar o jogo com id 999');

        await updateGame(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });

      it('Deve retornar a mensagem correta', async () => {
        (gamesService.updateGame as jest.Mock)
          .mockResolvedValue('Jogo com id 999 não encontrado para atualização.');
          
        await updateGame(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          { message: 'Jogo com id 999 não encontrado para atualização.' }
        );
      });
    });

    describe('Caso consiga atualizar o jogo', () => {
      const mockRequest: Partial<Request> = {
        params: { id: '1' },
        body: { description: 'Descrição alterada para teste' },
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      it('Deve retornar status 202', async () => {
        (gamesService.updateGame as jest.Mock)
          .mockResolvedValue({
            updateResult: mockResultSetHeader,
            updatedGame: mockUpdatedGame,
          });

        await updateGame(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(202);
      });

      it('Deve retornar o resultado da atualização', async () => {
        (gamesService.updateGame as jest.Mock)
          .mockResolvedValue({
            updateResult: mockResultSetHeader,
            updatedGame: mockUpdatedGame,
          });

        await updateGame(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith({
          updateResult: mockResultSetHeader,
          updatedGame: mockUpdatedGame,
        });
      });
    });

    describe('Caso ocorra um erro', () => {
      const mockRequest: Partial<Request> = {
        params: { id: '1' },
        body: mockGameWithInvalidColumnName,
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      it('Deve retornar status 500', async () => {
        (gamesService.updateGame as jest.Mock)
          .mockRejectedValue(mockUpdateError);

        await updateGame(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
      });

      it('Deve retornar a mensagem de erro correta', async () => {
        (gamesService.updateGame as jest.Mock)
          .mockRejectedValue(mockUpdateError);

        await updateGame(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          { message: `Erro no servidor ao atualizar jogo: ${mockUpdateError.message}` }
        );
      });
    });
  });
});