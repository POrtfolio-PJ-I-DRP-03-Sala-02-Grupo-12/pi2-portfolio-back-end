jest.mock('../../services/index.services', () => ({
  tagsService: {
    findAllTags: jest.fn(),
    findTagById: jest.fn(),
    findTagByTitle: jest.fn(),
    createNewTag: jest.fn(),
    updateTag: jest.fn(),
    deleteTag: jest.fn(),
  }
}));

import { Request, Response } from "express";
import { tagsService } from "../../services/index.services";
import {
  createNewTag,
  deleteTag,
  findAllTags,
  findTagById,
  findTagByTitle,
  updateTag,
} from "../../controllers/tags.controller";
import {
  mockError,
  mockNewTag,
  mockResultSetHeader,
  mockTagsList,
  mockTagToUpdate,
  mockTagWithInvalidColumnName,
  mockUpdatedTag,
  mockUpdateError
} from "../mocks/tag.mock";
import ITag from "../../interfaces/ITag";

describe('TESTES DO CONTROLLER TAGS', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('LISTAR TAGS (CATEGORIAS)', () => {
    describe('Caso não haja categorias cadastradas', () => {
      const mockRequest: Partial<Request> = {};
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const notFoundMessage = 'Não encontramos categorias cadastradas.';

      it('Deve retornar status 404', async () => {
        (tagsService.findAllTags as jest.Mock)
          .mockResolvedValue(notFoundMessage);
        
        await findAllTags(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
      });

      it('Deve retornar a mensagem correta', async () => {
        (tagsService.findAllTags as jest.Mock)
          .mockResolvedValue(notFoundMessage);
        
        await findAllTags(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json)
          .toHaveBeenCalledWith({ message: notFoundMessage });
      });
    });

    describe('Caso haja categorias cadastradas', () => {
      const mockRequest: Partial<Request> = {};
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      it('Deve retornar status 200', async () => {
        (tagsService.findAllTags as jest.Mock)
          .mockResolvedValue(mockTagsList);

        await findAllTags(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });

      it('Deve retornar a lista de categorias', async () => {
        (tagsService.findAllTags as jest.Mock)
          .mockResolvedValue(mockTagsList);

        await findAllTags(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(mockTagsList);
      });
    });

    describe('Caso ocorra um erro', () => {
      const mockRequest: Partial<Request> = {};
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      it('Deve retornar status 500', async () => {
        (tagsService.findAllTags as jest.Mock)
          .mockRejectedValue(mockError);

        await findAllTags(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
      });
      
      it('Deve retornar a mensagem de erro correta', async () => {
        (tagsService.findAllTags as jest.Mock)
          .mockRejectedValue(mockError);

        await findAllTags(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          {
            message: `Erro ao buscar categorias: ${mockError.message}`
          }
        );
      });
    });
  });

  describe('BUSCAR TAG(CATEGORIA) PELO ID', () => {
    describe('Caso a categoria não seja encontrada', () => {
      const mockRequest: Partial<Request> = {
        params: { id: '999' },
      };
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const notFoundMessage =
        'Não conseguimos encontrar a categoria pelo id 999';
      
      it('Deve retornar status 404', async () => {
        (tagsService.findTagById as jest.Mock)
          .mockResolvedValue(notFoundMessage);

        await findTagById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
      });

      it('Deve retornar a mensagem correta', async () => {
        (tagsService.findTagById as jest.Mock)
          .mockResolvedValue(notFoundMessage);

        await findTagById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json)
          .toHaveBeenCalledWith({ message: notFoundMessage});
      });
    });

    describe('Caso a categoria seja encontrada', () => {
      const mockRequest: Partial<Request> = {
        params: { id: '1' },
      };
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      it('Deve retornar status 200', async () => {
        (tagsService.findTagById as jest.Mock)
          .mockResolvedValue(mockTagsList[0]);

        await findTagById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });

      it('Deve retornar a categoria correta', async () => {
        (tagsService.findTagById as jest.Mock)
          .mockResolvedValue(mockTagsList[0]);

        await findTagById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(mockTagsList[0]);
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
        (tagsService.findTagById as jest.Mock)
          .mockRejectedValue(mockError);

        await findTagById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
      });

      it('Deve retornar a mensagem de erro correta', async () => {
        (tagsService.findTagById as jest.Mock)
          .mockRejectedValue(mockError);

        await findTagById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          { message:
            `Ocorreu um erro na busca: ${mockError.message}`
          }
        );
      });
    });
  });

  describe('BUSCAR TAG(CATEGORIA) PELO TÍTULO', () => {
    describe('Buscando por um título que não existe', () => {
      const nonExistentTitle = 'Título inexistente';

      const mockRequest: Partial<Request> = {
        query: { title: nonExistentTitle },
      };
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const notFoundMessage =
        'Não conseguimos encontrar a categoria pelo título ' +
        nonExistentTitle;
      
      it('Deve retornar status 404', async () => {
        (tagsService.findTagByTitle as jest.Mock)
          .mockResolvedValue(notFoundMessage);

        await findTagByTitle(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
      });

      it('Deve retornar a mensagem correta', async () => {
        (tagsService.findTagByTitle as jest.Mock)
          .mockResolvedValue(notFoundMessage);

        await findTagByTitle(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json)
          .toHaveBeenCalledWith({ message: notFoundMessage});
      });
    });

    describe('Buscando categoria com um título existente', () => {
      const mockRequest: Partial<Request> = {
        query: { title: 'Categoria TST 2' },
      };
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      it('Deve retornar status 200', async () => {
        (tagsService.findTagByTitle as jest.Mock)
          .mockResolvedValue(mockTagsList[1]);

        await findTagByTitle(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });

      it('Deve retornar a categoria correta', async () => {
        (tagsService.findTagByTitle as jest.Mock)
          .mockResolvedValue(mockTagsList[1]);

        await findTagByTitle(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(mockTagsList[1]);
      });
    });

    describe('Caso ocorra um erro', () => {
      const mockRequest: Partial<Request> = {
        query: { title: 'Categoria TST 2' },
      };
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      it('Deve retornar status 500', async () => {
        (tagsService.findTagByTitle as jest.Mock)
          .mockRejectedValue(mockError);

        await findTagByTitle(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
      });

      it('Deve retornar a mensagem de erro correta', async () => {
        (tagsService.findTagByTitle as jest.Mock)
          .mockRejectedValue(mockError);

        await findTagByTitle(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          { message:
            `Ocorreu um erro na busca: ${mockError.message}`
          }
        );
      });
    });
  });

  describe('CADASTRAR NOVA CATEGORIA', () => {
    describe('Caso não consiga cadastrar a categoria', () => {
      const mockTagIncomplete: Partial<ITag> = {};

      const mockRequest: Partial<Request> = {
        body: mockTagIncomplete,
      };
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      it('Deve retornar status 400', async () => {
        (tagsService.createNewTag as jest.Mock)
          .mockResolvedValue(
            'Não foi possível cadastrar a categoria com o título ' +
            mockTagIncomplete.title
          );

        await createNewTag(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });

      it('Deve retornar a mensagem correta', async () => {
        (tagsService.createNewTag as jest.Mock)
          .mockResolvedValue(
            'Não foi possível cadastrar a categoria com o título ' +
            mockTagIncomplete.title
          );
          
        await createNewTag(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          {
            message:
              'Não foi possível cadastrar a categoria com o título ' +
              mockTagIncomplete.title
          }
        );
      });
    });

    describe('Caso consiga cadastrar a categoria', () => {
      const mockRequest: Partial<Request> = {
        body: mockNewTag,
      };
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      it('Deve retornar status 201', async () => {
        (tagsService.createNewTag as jest.Mock)
          .mockResolvedValue({ id: 1, ...mockNewTag });
          
        await createNewTag(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
      });

      it('Deve retornar a categoria cadastrada', async () => {
        (tagsService.createNewTag as jest.Mock)
          .mockResolvedValue({ id: 1, ...mockNewTag });
          
        await createNewTag(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          { id: 1, ...mockNewTag }
        );
      });
    });

    describe('Caso ocorra um erro', () => {
      const mockRequest: Partial<Request> = {
        body: mockNewTag,
      };
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      it('Deve retornar status 500', async () => {
        (tagsService.createNewTag as jest.Mock)
          .mockRejectedValue(mockError);
          
        await createNewTag(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
      });

      it('Deve retornar a mensagem de erro correta', async () => {
        (tagsService.createNewTag as jest.Mock)
          .mockRejectedValue(mockError);
          
        await createNewTag(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          {
            message:
              'Ocorreu um erro no registro de nova categoria: ' +
              mockError.message
          }
        );
      });
    });
  });

  describe('ATUALIZAR CATEGORIA', () => {
    describe('Caso não consiga encontrar a categoria para atualizar', () => {
      const mockRequest: Partial<Request> = {
        params: { id: '999' },
        body: mockTagToUpdate,
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      const notFoundMessage = 'Categoria, com o id 999, ' +
        'não encontrada para atualização.';

      it('Deve retornar status 400', async () => {
        (tagsService.updateTag as jest.Mock)
          .mockResolvedValue(notFoundMessage);

        await updateTag(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
      
      it('Deve retornar a mensagem correta', async () => {
        (tagsService.updateTag as jest.Mock)
          .mockResolvedValue(notFoundMessage);

        await updateTag(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json)
          .toHaveBeenCalledWith({ message: notFoundMessage });
      });
    });

    describe('Caso não consiga atualizar os dados da categoria', () => {
      const mockRequest: Partial<Request> = {
        params: { id: '1' },
        body: { },
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      const notAbleToUpdateMessage = 'Não foi possível alterar os dados ' +
        'da categoria do jogo com id 1';

      it('Deve retornar status 400', async () => {
        (tagsService.updateTag as jest.Mock)
          .mockResolvedValue(notAbleToUpdateMessage);

        await updateTag(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });

      it('Deve retornar a mensagem correta', async () => {
        (tagsService.updateTag as jest.Mock)
          .mockResolvedValue(notAbleToUpdateMessage);
          
        await updateTag(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json)
          .toHaveBeenCalledWith({ message: notAbleToUpdateMessage });
      });
    });

    describe('Caso consiga atualizar a categoria', () => {
      const mockRequest: Partial<Request> = {
        params: { id: '1' },
        body: { title: 'Categoria TST Atualizada' },
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      it('Deve retornar status 202', async () => {
        (tagsService.updateTag as jest.Mock)
          .mockResolvedValue({
            updateResult: mockResultSetHeader,
            updatedGame: mockUpdatedTag,
          });

        await updateTag(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(202);
      });

      it('Deve retornar o resultado da atualização', async () => {
        (tagsService.updateTag as jest.Mock)
          .mockResolvedValue({
            updateResult: mockResultSetHeader,
            updatedGame: mockUpdatedTag,
          });

        await updateTag(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith({
          updateResult: mockResultSetHeader,
          updatedGame: mockUpdatedTag,
        });
      });
    });

    describe('Caso ocorra um erro', () => {
      const mockRequest: Partial<Request> = {
        params: { id: '1' },
        body: mockTagWithInvalidColumnName,
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      it('Deve retornar status 500', async () => {
        (tagsService.updateTag as jest.Mock)
          .mockRejectedValue(mockUpdateError);

        await updateTag(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
      });

      it('Deve retornar a mensagem de erro correta', async () => {
        (tagsService.updateTag as jest.Mock)
          .mockRejectedValue(mockUpdateError);

        await updateTag(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          {
            message:
              'Ocorreu um erro na alteração de dados da categoria. ' +
              mockUpdateError.message
          }
        );
      });
    });
  });

  describe('DELETAR CATEGORIA', () => {
    describe('Caso não consiga deletar a categoria', () => {
      const mockRequest: Partial<Request> = {
        params: { id: '999' },
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      const notAbleToDeleteMessage = 'Não foi possível excluir dados da ' +
        'categoria com o id 999';

      it('Deve retornar status 400', async () => {
        (tagsService.deleteTag as jest.Mock)
          .mockResolvedValue(notAbleToDeleteMessage);

        await deleteTag(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
      
      it('Deve retornar a mensagem correta', async () => {
        (tagsService.deleteTag as jest.Mock)
          .mockResolvedValue(notAbleToDeleteMessage);

        await deleteTag(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json)
          .toHaveBeenCalledWith({ message: notAbleToDeleteMessage });
      });
    });

    describe('Caso consiga deletar a categoria corretamente', () => {
      const mockRequest: Partial<Request> = {
        params: { id: '1' },
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),  
      };

      it('Deve retornar status 202', async () => {
        (tagsService.deleteTag as jest.Mock)
          .mockResolvedValue(mockResultSetHeader);

        await deleteTag(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(202);
      });

      it('Deve retornar o resultado da exclusão', async () => {
        (tagsService.deleteTag as jest.Mock)
          .mockResolvedValue(mockResultSetHeader);

        await deleteTag(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith({
          result: mockResultSetHeader,
          message: 'Categoria, com o id 1, deletada com sucesso.'
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
        (tagsService.deleteTag as jest.Mock)
          .mockRejectedValue(mockError);

        await deleteTag(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
      });

      it('Deve retornar a mensagem de erro correta', async () => {
        (tagsService.deleteTag as jest.Mock)
          .mockRejectedValue(mockError);

        await deleteTag(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(
          {
            message:
              'Ocorreu um erro na exclusão da categoria. ' +
              mockError.message
          }
        );
      });
    });
  });
});