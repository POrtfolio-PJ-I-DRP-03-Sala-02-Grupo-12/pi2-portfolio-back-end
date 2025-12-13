jest.mock('../../services/index.services', () => ({
  gamesTagsService: {
    findAllGamesTags: jest.fn(),
    createNewGameTag: jest.fn(),
    deleteGameTag: jest.fn(),
  },

  gamesService: {
    findGameById: jest.fn(),
  },

  tagsService: {
    findTagById: jest.fn(),
  },
}));

import {
  createNewGameTag,
  deleteGameTag,
  findAllGamesTags
} from "../../controllers/games.tags.controller";
import {
  gamesTagsService,
  gamesService,
  tagsService
} from "../../services/index.services";
import { Request, Response } from "express";
import {
  mockError,
  mockGameTag1,
  mockGameTagsList
} from "../mocks/game.tag.mock";
import { mockGame, mockResultSetHeader } from "../mocks/games.mock";
import { mockTag1 } from "../mocks/tag.mock";

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

  describe('DELETAR ASSOCIAÇÃO DE JOGO E CATEGORIA', () => {
    describe('Caso não consiga deletar a associação', () => {
      const mockRequest: Partial<Request> = {
        params: {
          gameId: '1',
          tagId: '1',
        },
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      beforeEach(() => {
        jest.clearAllMocks();
      });
      
      it('Deve retornar status 404 se o jogo não for encontrado', async () => {
        (gamesService.findGameById as jest.Mock)
          .mockResolvedValue('Não conseguimos encontrar o jogo pelo id 1');

        (tagsService.findTagById as jest.Mock)
          .mockResolvedValue(mockTag1);
          
        await deleteGameTag(
          mockRequest as Request,
          mockResponse as Response
        );

        expect(mockResponse.status).toHaveBeenCalledWith(404);
      });

      it('Deve retornar status 404 quando a tag não existe', async () => {
        (gamesService.findGameById as jest.Mock)
          .mockResolvedValue(mockGame);
    
        (tagsService.findTagById as jest.Mock)
          .mockResolvedValue('Não conseguimos encontrar a categoria pelo id 1');

        await deleteGameTag(
          mockRequest as Request,
          mockResponse as Response
        );

        expect(mockResponse.status).toHaveBeenCalledWith(404);
      });
      
      it('Deve retornar status 400 se o serviço retorna string ', async () => {
        (gamesService.findGameById as jest.Mock)
          .mockResolvedValue(mockGame);

        (tagsService.findTagById as jest.Mock)
          .mockResolvedValue(mockTag1);

        (gamesTagsService.deleteGameTag as jest.Mock)
          .mockResolvedValue(
            'Não foi possível deletar a associação da ' +
            'categoria ao jogo com os seguintes dados:\n' +
            ' gameId: 1\n' +
            ' tagId: 1\n'
          );

        await deleteGameTag(
          mockRequest as Request,
          mockResponse as Response
        );

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        
        expect(mockResponse.json).toHaveBeenCalledWith({
            message:
              'Não foi possível deletar a associação da ' +
            'categoria ao jogo com os seguintes dados:\n' +
            ' gameId: 1\n' +
            ' tagId: 1\n'
          });
      });

    describe('Caso consiga deletar a associação', () => {
      const mockRequest: Partial<Request> = {
        params: {
          gameId: '1',
          tagId: '1',
        },
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      beforeEach(() => {
        (gamesService.findGameById as jest.Mock)
          .mockResolvedValue(mockGame);

        (tagsService.findTagById as jest.Mock)
          .mockResolvedValue(mockTag1);
      });
      
      it('Deve retornar status 202', async () => {
        (gamesTagsService.deleteGameTag as jest.Mock)
          .mockResolvedValue({
            deletedGameTag: mockGameTag1,
            message: 'Relacionamento entre ' +
            mockGame.title.toUpperCase() +
            ' e ' + mockTag1.title.toUpperCase() + ' excluído com sucesso.',
          });
                
        await deleteGameTag(
          mockRequest as Request,
          mockResponse as Response
        );

        expect(mockResponse.status).toHaveBeenCalledWith(202);
      });

      it('Deve retornar a confirmação de exclusão', async () => {
        const expectedResponse = {
          deletedGameTag: {gameId: 1,
          tagId: 1,
          message: 'Relacionamento entre ' +
            mockGame.title.toUpperCase() +
            ' e ' + mockTag1.title.toUpperCase() + ' excluído com sucesso.',}
        };
        
        (gamesTagsService.deleteGameTag as jest.Mock)
          .mockResolvedValue(expectedResponse);

        await deleteGameTag(
          mockRequest as Request,
          mockResponse as Response
        );

        expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
      });
    });

    });
  });
});