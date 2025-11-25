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
  findAllGames,
  findGameById,
} from "../../controllers/games.controller";
import { mockError, mockGamesList } from "../mocks/games.mock";

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;


describe('TESTES DO CONTROLLER GAMES', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('LISTAR JOGOS', () => {
    describe('Caso não haja jogos cadastrados', () => {
      mockRequest = {};
      mockResponse = {
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
      mockRequest = {};
      mockResponse = {
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
      mockRequest = {};
      mockResponse = {
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
      mockRequest = {
        params: { id: '999' },
      };
      mockResponse = {
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
      mockRequest = {
        params: { id: '1' },
      };
      mockResponse = {
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
      mockRequest = {
        params: { id: '1' },
      };
      mockResponse = {
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
});