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
} from "../../controllers/games.controller";
import { mockGamesList } from "../mocks/games.mock";

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
  });
});