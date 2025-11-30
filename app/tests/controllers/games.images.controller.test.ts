jest.mock('../../services/index.services', () => ({
  gameImagesService: {
    findAllGameImages: jest.fn(),
    findGameImageById: jest.fn(),
    createNewGameImage: jest.fn(),
    updateGameImage: jest.fn(),
    deleteGameImage: jest.fn(),
  },
}));

import { Request, Response } from "express";
import { gameImagesService } from "../../services/index.services";
import {
  createNewGameImage,
  deleteGameImage,
  findAllGameImages,
  findGameImageById,
  updateGameImage
} from "../../controllers/games.images.controller";
import {
  mockError,
  mockGameImagesList,
  mockGameImageToUpdate,
  mockGameImageUpdated,
  mockGameImageWithInvalidColumnName,
  mockNewGameImage,
  mockResultSetHeader
} from "../mocks/game.images.mock";
import IGameImage from "../../interfaces/IGameImage";
import { mockUpdateError } from "../mocks/games.mock";

describe('TESTES DO CONTROLLER GAME IMAGES', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('LISTAR IMAGENS DE JOGOS', () => {
    describe('Caso não haja imagens cadastradas', () => {
      const mockRequest: Partial<Request> = {};
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      it('Deve retornar status 404', async () => {
        (gameImagesService.findAllGameImages as jest.Mock)
          .mockResolvedValue('Não encontramos imagens de jogos cadastradas.');
        
        await findAllGameImages(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
      });

      it('Deve retornar a mensagem correta', async () => {
        (gameImagesService.findAllGameImages as jest.Mock)
          .mockResolvedValue('Não encontramos imagens de jogos cadastradas.');
        
        await findAllGameImages(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          { message: 'Não encontramos imagens de jogos cadastradas.' }
        );
      });
    });

    describe('Caso haja imagens cadastradas', () => {
      const mockRequest: Partial<Request> = {};
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      it('Deve retornar status 200', async () => {
        (gameImagesService.findAllGameImages as jest.Mock)
          .mockResolvedValue(mockGameImagesList);

        await findAllGameImages(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });

      it('Deve retornar a lista de imagens', async () => {
        (gameImagesService.findAllGameImages as jest.Mock)
          .mockResolvedValue(mockGameImagesList);

        await findAllGameImages(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(mockGameImagesList);
      });
    });

    describe('Caso ocorra um erro', () => {
      const mockRequest: Partial<Request> = {};
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      it('Deve retornar status 500', async () => {
        (gameImagesService.findAllGameImages as jest.Mock)
          .mockRejectedValue(mockError);

        await findAllGameImages(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
      });
      
      it('Deve retornar a mensagem de erro correta', async () => {
        (gameImagesService.findAllGameImages as jest.Mock)
          .mockRejectedValue(mockError);

        await findAllGameImages(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          {
            message:
              'Erro no servidor ao listar ' +
              'imagens de jogos: ' +
              mockError.message
          }
        );
      });
    });
  });

  describe('BUSCAR IMAGEM PELO ID', () => {
    describe('Caso a imagem não seja encontrada', () => {
      const mockRequest: Partial<Request> = {
        params: { id: '999' },
      };
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      
      it('Deve retornar status 404', async () => {
        (gameImagesService.findGameImageById as jest.Mock)
          .mockResolvedValue('Não conseguimos encontrar a imagem do jogo pelo id 999');

        await findGameImageById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
      });

      it('Deve retornar a mensagem correta', async () => {
        (gameImagesService.findGameImageById as jest.Mock)
          .mockResolvedValue('Não conseguimos encontrar a imagem do jogo pelo id 999');

        await findGameImageById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          {
            message: 'Não conseguimos encontrar a imagem do jogo pelo id 999',
          }
        );
      });
    });

    describe('Caso a imagem seja encontrada', () => {
      const mockRequest: Partial<Request> = {
        params: { id: '1' },
      };
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      it('Deve retornar status 200', async () => {
        (gameImagesService.findGameImageById as jest.Mock)
          .mockResolvedValue(mockGameImagesList[0]);

        await findGameImageById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });

      it('Deve retornar a imagem correta', async () => {
        (gameImagesService.findGameImageById as jest.Mock)
          .mockResolvedValue(mockGameImagesList[0]);

        await findGameImageById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(mockGameImagesList[0]);
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
        (gameImagesService.findGameImageById as jest.Mock)
          .mockRejectedValue(mockError);

        await findGameImageById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
      });

      it('Deve retornar a mensagem de erro correta', async () => {
        (gameImagesService.findGameImageById as jest.Mock)
          .mockRejectedValue(mockError);

        await findGameImageById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          { message:
            `Erro no servidor ao buscar imagem de jogo: ${mockError.message}`
          }
        );
      });
    });
  });

  describe('CADASTRAR NOVA IMAGEM', () => {
    describe('Caso não consiga cadastrar a imagem', () => {
      const mockGameImageIncomplete: Partial<IGameImage> = {
        description: "Imagem de teste incompleta",
        title: "Imagem Incompleta",
      };

      const mockRequest: Partial<Request> = {
        body: mockGameImageIncomplete,
      };
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      it('Deve retornar status 400', async () => {
        (gameImagesService.createNewGameImage as jest.Mock)
          .mockResolvedValue(
            'Não foi possível cadastrar a imagem do jogo com os ' +
            'seguintes dados:\n' +
            'título: ' + mockGameImageIncomplete.title + '\n' +
            'descrição: ' + mockGameImageIncomplete.description + '\n' +
            'url: ' + mockGameImageIncomplete.url + '\n' +
            'gameId: ' + mockGameImageIncomplete.gameId
          );

        await createNewGameImage(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });

      it('Deve retornar a mensagem correta', async () => {
        (gameImagesService.createNewGameImage as jest.Mock)
          .mockResolvedValue(
            'Não foi possível cadastrar a imagem do jogo com os ' +
            'seguintes dados:\n' +
            'título: ' + mockGameImageIncomplete.title + '\n' +
            'descrição: ' + mockGameImageIncomplete.description + '\n' +
            'url: ' + mockGameImageIncomplete.url + '\n' +
            'gameId: ' + mockGameImageIncomplete.gameId
          );
          
        await createNewGameImage(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          {
            message:
              'Não foi possível cadastrar a imagem do jogo com os ' +
            'seguintes dados:\n' +
            'título: ' + mockGameImageIncomplete.title + '\n' +
            'descrição: ' + mockGameImageIncomplete.description + '\n' +
            'url: ' + mockGameImageIncomplete.url + '\n' +
            'gameId: ' + mockGameImageIncomplete.gameId
          }
        );
      });
    });

    describe('Caso consiga cadastrar a imagem', () => {
      const mockRequest: Partial<Request> = {
        body: mockNewGameImage,
      };
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      it('Deve retornar status 201', async () => {
        (gameImagesService.createNewGameImage as jest.Mock)
          .mockResolvedValue({ id: 1, ...mockNewGameImage });
          
        await createNewGameImage(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
      });

      it('Deve retornar a imagem cadastrada', async () => {
        (gameImagesService.createNewGameImage as jest.Mock)
          .mockResolvedValue({ id: 1, ...mockNewGameImage });
          
        await createNewGameImage(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          { id: 1, ...mockNewGameImage }
        );
      });
    });

    describe('Caso ocorra um erro', () => {
      const mockRequest: Partial<Request> = {
        body: mockNewGameImage,
      };
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      it('Deve retornar status 500', async () => {
        (gameImagesService.createNewGameImage as jest.Mock)
          .mockRejectedValue(mockError);
          
        await createNewGameImage(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
      });

      it('Deve retornar a mensagem de erro correta', async () => {
        (gameImagesService.createNewGameImage as jest.Mock)
          .mockRejectedValue(mockError);
          
        await createNewGameImage(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          {
            message:
              'Erro no servidor ao cadastrar imagem de jogo: ' +
              mockError.message
          }
        );
      });
    });
  });

  describe('ATUALIZAR IMAGEM', () => {
    describe('Caso não consiga encontrar a imagem para atualizar', () => {
      const mockRequest: Partial<Request> = {
        params: { id: '999' },
        body: mockGameImageToUpdate,
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      const notFoundMessage = 'Imagem de jogo, com o id 999, ' +
        'não encontrada para atualização.';

      it('Deve retornar status 400', async () => {
        (gameImagesService.updateGameImage as jest.Mock)
          .mockResolvedValue(notFoundMessage);

        await updateGameImage(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
      
      it('Deve retornar a mensagem correta', async () => {
        (gameImagesService.updateGameImage as jest.Mock)
          .mockResolvedValue(notFoundMessage);

        await updateGameImage(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: notFoundMessage });
      });
    });

    describe('Caso não consiga atualizar os dados da imagem', () => {
      const mockRequest: Partial<Request> = {
        params: { id: '999' },
        body: { description: 'Descrição alterada para teste' },
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      const notAbleToUpdateMessage = 'Não foi possível alterar os dados ' +
        'da imagem do jogo com id 999';

      it('Deve retornar status 400', async () => {
        (gameImagesService.updateGameImage as jest.Mock)
          .mockResolvedValue(notAbleToUpdateMessage);

        await updateGameImage(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });

      it('Deve retornar a mensagem correta', async () => {
        (gameImagesService.updateGameImage as jest.Mock)
          .mockResolvedValue(notAbleToUpdateMessage);
          
        await updateGameImage(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          { message: notAbleToUpdateMessage }
        );
      });
    });

    describe('Caso consiga atualizar a imagem', () => {
      const mockRequest: Partial<Request> = {
        params: { id: '1' },
        body: {
          title: 'Imagem para Teste 1 Alterada',
          url: 'https://example.com/imagem1-alterada.jpg'
        },
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      it('Deve retornar status 202', async () => {
        (gameImagesService.updateGameImage as jest.Mock)
          .mockResolvedValue({
            updateResult: mockResultSetHeader,
            updatedGame: mockGameImageUpdated,
          });

        await updateGameImage(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(202);
      });

      it('Deve retornar o resultado da atualização', async () => {
        (gameImagesService.updateGameImage as jest.Mock)
          .mockResolvedValue({
            updateResult: mockResultSetHeader,
            updatedGame: mockGameImageUpdated,
          });

        await updateGameImage(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith({
          updateResult: mockResultSetHeader,
          updatedGame: mockGameImageUpdated,
        });
      });
    });

    describe('Caso ocorra um erro', () => {
      const mockRequest: Partial<Request> = {
        params: { id: '1' },
        body: mockGameImageWithInvalidColumnName,
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      it('Deve retornar status 500', async () => {
        (gameImagesService.updateGameImage as jest.Mock)
          .mockRejectedValue(mockUpdateError);

        await updateGameImage(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
      });

      it('Deve retornar a mensagem de erro correta', async () => {
        (gameImagesService.updateGameImage as jest.Mock)
          .mockRejectedValue(mockUpdateError);

        await updateGameImage(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          {
            message:
              'Erro no servidor ao atualizar imagem de jogo: ' +
              mockUpdateError.message
          }
        );
      });
    });
  });

  describe('DELETAR IMAGEM', () => {
    describe('Caso não consiga deletar a imagem', () => {
      const mockRequest: Partial<Request> = {
        params: { id: '999' },
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      const notAbleToDeleteMessage = 'Não foi possível deletar a imagem ' +
        'do jogo com o id 999';

      it('Deve retornar status 400', async () => {
        (gameImagesService.deleteGameImage as jest.Mock)
          .mockResolvedValue(notAbleToDeleteMessage);

        await deleteGameImage(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
      
      it('Deve retornar a mensagem correta', async () => {
        (gameImagesService.deleteGameImage as jest.Mock)
          .mockResolvedValue(notAbleToDeleteMessage);

        await deleteGameImage(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: notAbleToDeleteMessage });
      });
    });

    describe('Caso consiga deletar a imagem corretamente', () => {
      const mockRequest: Partial<Request> = {
        params: { id: '1' },
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      it('Deve retornar status 202', async () => {
        (gameImagesService.deleteGameImage as jest.Mock)
          .mockResolvedValue(mockResultSetHeader);

        await deleteGameImage(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(202);
      });

      it('Deve retornar o resultado da exclusão', async () => {
        (gameImagesService.deleteGameImage as jest.Mock)
          .mockResolvedValue(mockResultSetHeader);

        await deleteGameImage(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith({
          result: mockResultSetHeader,
          message: 'Imagem de jogo, com o id 1, deletada com sucesso.'
        });
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
        (gameImagesService.deleteGameImage as jest.Mock)
          .mockRejectedValue(mockError);

        await deleteGameImage(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
      });

      it('Deve retornar a mensagem de erro correta', async () => {
        (gameImagesService.deleteGameImage as jest.Mock)
          .mockRejectedValue(mockError);

        await deleteGameImage(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          {
            message:
              'Erro no servidor ao deletar imagem de jogo: ' +
              mockError.message
          }
        );
      });
    });
  });
});