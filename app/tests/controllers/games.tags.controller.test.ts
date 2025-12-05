jest.mock('../../services/index.services'), () => ({
  gamesTagsService: {
    findAllGamesTags: jest.fn(),
    createNewGameTag: jest.fn(),
    deleteGameTag: jest.fn(),
  }
});

import { createNewGameTag, findAllGamesTags } from "../../controllers/games.tags.controller";
import { gamesTagsService } from "../../services/index.services";
import { Request, Response } from "express";
import {
  mockError,
  mockGameTag1,
  mockGameTagsList
} from "../mocks/game.tag.mock";

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

    describe('Caso ocorra um erro no servidor', () => {
      const mockRequest: Partial<Request> = {};
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      it('Deve retornar status 500', async () => {
        (gamesTagsService.findAllGamesTags as jest.Mock)
          .mockRejectedValue(mockError);

        await findAllGamesTags(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
      });

      it('Deve retornar a mensagem de erro do servidor', async () => {
        (gamesTagsService.findAllGamesTags as jest.Mock)
          .mockRejectedValue(mockError);

        await findAllGamesTags(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json)
          .toHaveBeenCalledWith({
            message: 'Erro no servidor ao buscar jogos associados a categorias: '
            + mockError.message,
        });
      });
    });
  });

  describe('CRIAR ASSOCIAÇÃO DE JOGO E CATEGORIA', () => {
    describe('Caso não consiga criar a associação', () => {
      const mockRequest: Partial<Request> = {
        body: {},
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      
      it('Deve retornar status 400', async () => {
        (gamesTagsService.createNewGameTag as jest.Mock)
          .mockResolvedValue(
            'Não foi possível associar a ' +
            'categoria ao jogo com os seguintes dados:\n' +
            ' gameId: undefined\n' +
            ' tagId: undefined\n'
          );

        await createNewGameTag(
          mockRequest as Request,
          mockResponse as Response
        );

        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });

      it('Deve retornar a mensagem de erro', async () => {
        (gamesTagsService.createNewGameTag as jest.Mock)
          .mockResolvedValue(
            'Não foi possível associar a ' +
            'categoria ao jogo com os seguintes dados:\n' +
            ' gameId: undefined\n' +
            ' tagId: undefined\n'
          );
        
        await createNewGameTag(
          mockRequest as Request,
          mockResponse as Response
        );
        expect(mockResponse.json).toHaveBeenCalledWith({
          message:
            'Não foi possível associar a ' +
            'categoria ao jogo com os seguintes dados:\n' +
            ' gameId: undefined\n' +
            ' tagId: undefined\n'
        });
      });
    });

    describe('Caso consiga criar a associação', () => {
      const mockRequest: Partial<Request> = {
        body: mockGameTag1,
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      it('Deve retornar status 201', async () => {
        (gamesTagsService.createNewGameTag as jest.Mock)
          .mockResolvedValue(mockGameTag1);

        await createNewGameTag(
          mockRequest as Request,
          mockResponse as Response
        );

        expect(mockResponse.status).toHaveBeenCalledWith(201);
      });
      
      it('Deve retornar a associação criada', async () => {
        (gamesTagsService.createNewGameTag as jest.Mock)
          .mockResolvedValue(mockGameTag1);
        
        await createNewGameTag(
          mockRequest as Request,
          mockResponse as Response
        );
        
        expect(mockResponse.json).toHaveBeenCalledWith(mockGameTag1);
      });
    });

    describe('Caso ocorra um erro no servidor', () => {
      const mockRequest: Partial<Request> = {
        body: mockGameTag1,
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      it('Deve retornar status 500', async () => {
        (gamesTagsService.createNewGameTag as jest.Mock)
          .mockRejectedValue(mockError);

        await createNewGameTag(
          mockRequest as Request,
          mockResponse as Response
        );

        expect(mockResponse.status).toHaveBeenCalledWith(500);
      });

      it('Deve retornar a mensagem de erro do servidor', async () => {
        (gamesTagsService.createNewGameTag as jest.Mock)
          .mockRejectedValue(mockError);

        await createNewGameTag(
          mockRequest as Request,
          mockResponse as Response
        );

        expect(mockResponse.json)
          .toHaveBeenCalledWith({
            message: 'Erro no servidor ao associar categoria ao jogo: '
            + mockError.message,
        });
      });
    });
  });
});