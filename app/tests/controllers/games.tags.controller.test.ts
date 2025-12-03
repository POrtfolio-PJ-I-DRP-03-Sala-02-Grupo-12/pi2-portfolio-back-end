jest.mock('../../services/index.services'), () => ({
  gamesTagsService: {
    findAllGamesTags: jest.fn(),
    createNewGameTag: jest.fn(),
    deleteGameTag: jest.fn(),
  }
});

import { findAllGamesTags } from "../../controllers/games.tags.controller";
import { gamesTagsService } from "../../services/index.services";
import { Request, Response } from "express";
import { mockGameTagsList } from "../mocks/game.tag.mock";

describe('TESTES DO CONTROLLER GAMES TAGS', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('LISTAR ASSOCIAÇÕES DE JOGOS E CATEGORIAS', () => {
    describe('Caso não haja associações cadastradas', () => {
      const mockRequest: Partial<Request> = {};
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const notFoundMessage = 'Não encontramos jogos com categorias associadas.';

      it('Deve retornar status 404', async () => {
        (gamesTagsService.findAllGamesTags as jest.Mock)
          .mockResolvedValue(notFoundMessage);
        
          await findAllGamesTags(mockRequest as Request, mockResponse as Response);
          expect(mockResponse.status).toHaveBeenCalledWith(404);
      });

      it('Deve retornar a mensagem de não encontrado', async () => {
        (gamesTagsService.findAllGamesTags as jest.Mock)
          .mockResolvedValue(notFoundMessage);
        
        await findAllGamesTags(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: notFoundMessage });
      });
    });

    describe('Caso haja associações cadastradas', () => {
      const mockRequest: Partial<Request> = {};
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      it('Deve retornar status 200', async () => {
        (gamesTagsService.findAllGamesTags as jest.Mock)
          .mockResolvedValue(mockGameTagsList);

        await findAllGamesTags(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });

      it('Deve retornar a lista de associações', async () => {
        (gamesTagsService.findAllGamesTags as jest.Mock)
          .mockResolvedValue(mockGameTagsList);
          
        await findAllGamesTags(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(mockGameTagsList);
      });
    });
  });
});