jest.mock('../../models/index.model', () => ({
  tagModel: {
    findAllTags: jest.fn(),
    findTagById: jest.fn(),
    findTagByTitle: jest.fn(),
    createNewTag: jest.fn(),
    updateTag: jest.fn(),
    deleteTag: jest.fn(),
  }
}));

import ITag from "../../interfaces/ITag";
import {
  tagModel,
} from "../../models/index.model";
import {
  createNewTag,
  deleteTag,
  findAllTags,
  findTagById,
  findTagByTitle,
  updateTag,
} from "../../services/tags.service";
import {
  invalidIdErrorMessage,
} from "../mocks/games.mock";
import {
  errorMessage,
  invalidTitleErrorMessage,
  mockError,
  mockInvalidTitleError,
  mockNewTag,
  mockResultSetHeader,
  mockTag1,
  mockTag2,
  mockTag3,
  mockTagsList,
  mockTagToUpdate,
  mockTagWithInvalidColumnName,
  mockUpdatedTag,
  mockUpdateError,
  mockUpdateErrorMessage
} from "../mocks/tag.mock";

describe('TESTES DO SERVIÇO TAGS', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('LISTAR TAGS', () => {
    describe('Caso não haja tags cadastradas:', () => {
      it('Deve mostrar uma mensagem de lista vazia', async () => {
        const messageShouldBeReturned =
          "Não encontramos categorias cadastradas.";
        
        (tagModel.findAllTags as jest.Mock)
          .mockResolvedValue(null);

        const result = await findAllTags();

        expect(tagModel.findAllTags).toHaveBeenCalledTimes(1);
        expect(result).toBe(messageShouldBeReturned);
      });
    });

    describe('Com categorias cadastradas', () => {
      it('Com três categorias cadastradas, deve retornar um array de tamanho 3.', async () => {
        (tagModel.findAllTags as jest.Mock)
          .mockResolvedValue(mockTagsList);
  
        const result = await findAllTags();
        
        expect(tagModel.findAllTags).toHaveBeenCalledTimes(1);
        expect(result).toHaveLength(3);
      });

      it('E a lista deve conter os objetos corretos.', async () => {
        const result = await findAllTags();

        expect(result[0]).toEqual(mockTag1);
        expect(result[1]).toEqual(mockTag2);
        expect(result[2]).toEqual(mockTag3);
      });
    });

    describe('Em caso de problemas na requisição:', () => {
      it('Deve retornar uma mensagem de erro', async () => {
        (tagModel.findAllTags as jest.Mock)
          .mockRejectedValue(mockError);
        
        const result = await findAllTags();

        expect(tagModel.findAllTags).toHaveBeenCalledTimes(1);
        expect(result).toContain('Erro ao buscar categorias:');
        expect(result).toContain(errorMessage);
      });
    });
  });

  describe('BUSCAR UMA TAG POR ID', () => {
    describe('Informando um ID que não existe', () => {
      const nonExistentId = 0;
      const messageToBeReturned =
        `Não conseguimos encontrar a categoria pelo id ${nonExistentId}`;
      it('Deve retornar uma mensagem de "Não encontrado"', async () => {
        (tagModel.findTagById as jest.Mock)
          .mockResolvedValue(null);
        
        const result = await findTagById(0);

        expect(tagModel.findTagById).toHaveBeenCalledTimes(1);
        expect(tagModel.findTagById)
          .toHaveBeenCalledWith(nonExistentId);
        expect(result).toEqual(messageToBeReturned);
      });
    });

    describe('Informando um ID existente', () => {
      const correctId = 2;

      it('Deve retornar o objeto corretamente.', async () => {
        (tagModel.findTagById as jest.Mock)
          .mockResolvedValue(mockTag2);

        const result = await findTagById(correctId);

        expect(tagModel.findTagById).toHaveBeenCalledTimes(1);
        expect(tagModel.findTagById).toHaveBeenCalledWith(correctId);
        expect(result).not.toBeNull();
        expect(result).toHaveProperty('title');
        if (typeof result !== 'string') {
          expect(result.title).toBeDefined();
          expect(result.title).toEqual(mockTag2.title);
        }
        expect(result).toEqual(mockTag2);
      });
    });

    describe('Em caso de problemas na requisição:', () => {
      it('Deve retornar uma mensagem de erro', async () => {
        (tagModel.findTagById as jest.Mock)
          .mockRejectedValue(mockInvalidTitleError);
        
        const result = await findTagById(Number('AB001'));

        expect(tagModel.findTagById).toHaveBeenCalledTimes(1);
        expect(result).toContain('Ocorreu um erro na busca:');
        expect(result).toContain(invalidIdErrorMessage);
      });
    });
  });

  describe('BUSCAR UMA TAG POR TÍTULO', () => {
    describe('Informando um título que não existe', () => {
      const nonExistentTitle = "Título Inexistente";
      const messageToBeReturned =
        `Não conseguimos encontrar a categoria pelo título ${nonExistentTitle}`;
      it('Deve retornar uma mensagem de "Não encontrado"', async () => {
        (tagModel.findTagByTitle as jest.Mock)
          .mockResolvedValue(null);
        
        const result = await findTagByTitle(nonExistentTitle);

        expect(tagModel.findTagByTitle).toHaveBeenCalledTimes(1);
        expect(tagModel.findTagByTitle)
          .toHaveBeenCalledWith(nonExistentTitle);
        expect(result).toEqual(messageToBeReturned);
      });
    });

    describe('Informando um título existente', () => {
      const correctTitle = "Categoria TST 2";

      it('Deve retornar o objeto corretamente.', async () => {
        (tagModel.findTagByTitle as jest.Mock)
          .mockResolvedValue(mockTag2);

        const result = await findTagByTitle(correctTitle);

        expect(tagModel.findTagByTitle).toHaveBeenCalledTimes(1);
        expect(tagModel.findTagByTitle).toHaveBeenCalledWith(correctTitle);
        expect(result).not.toBeNull();
        expect(result).toHaveProperty('title');
        if (typeof result !== 'string') {
          expect(result.title).toBeDefined();
          expect(result.title).toEqual(mockTag2.title);
        }
        expect(result).toEqual(mockTag2);
      });
    });

    describe('Em caso de problemas na requisição:', () => {
      it('Deve retornar uma mensagem de erro', async () => {
        (tagModel.findTagByTitle as jest.Mock)
          .mockRejectedValue(mockInvalidTitleError);
        
        const result = await findTagByTitle("Algo inválido.");

        expect(tagModel.findTagByTitle).toHaveBeenCalledTimes(1);
        expect(result).toContain('Ocorreu um erro na busca:');
        expect(result).toContain(invalidTitleErrorMessage);
      });
    });
  });

  describe('CADASTRAR UMA NOVA TAG', () => {
    describe('Caso não consiga cadastrar uma nova categoria', () => {
      const incompleteTagData = {
      } as unknown as ITag;

      it('Deve retornar uma mensagem e os dados enviados', async () => {
        (tagModel.createNewTag as jest.Mock)
          .mockResolvedValue(null);

        const result =
          await createNewTag(
            incompleteTagData as unknown as ITag
          );

        expect(tagModel.createNewTag).toHaveBeenCalledTimes(1);
        expect(tagModel.createNewTag)
          .toHaveBeenCalledWith(incompleteTagData);
        expect(result)
          .toContain(
            'Não foi possível cadastrar a categoria' +
            ' com o título '
          );
      });
    });

    describe('Com os dados corretos enviados', () => {
      it('Deve retornar um objeto com um ID', async () => {
        (tagModel.createNewTag as jest.Mock)
          .mockResolvedValue(mockTag1);
        
        const result = await createNewTag(mockNewTag);

        expect(tagModel.createNewTag).toHaveBeenCalledTimes(1);
        expect(tagModel.createNewTag)
          .toHaveBeenCalledWith(mockNewTag);
        expect(result).toEqual(mockTag1);
      });
    });
  
    describe('Em caso de problemas na requisição:', () => {
      it('Deve retornar uma mensagem de erro', async () => {
        (tagModel.createNewTag as jest.Mock)
          .mockRejectedValue(mockError);
  
        const result = await createNewTag(mockNewTag);
  
        expect(tagModel.createNewTag).toHaveBeenCalledTimes(1);
        expect(result)
          .toContain('Ocorreu um erro no registro de nova categoria:');
        expect(result).toContain(errorMessage);
      });
    });
  });

  describe('ALTERAR OS DADOS DE UMA CATEGORIA', () => {
    describe('Caso não consiga encontrar a tag', () => {
      const nonExistentId = 99999999999;

      it('Deve retornar mensagem de "não encontrado"', async () => {
        (tagModel.findTagById as jest.Mock)
          .mockResolvedValue(null);

        const result = await updateTag(nonExistentId, mockTagToUpdate);

        expect(tagModel.findTagById).toHaveBeenCalledTimes(1);
        expect(result).toContain(`Categoria, com o id ${nonExistentId}`);
        expect(result).toContain("não encontrada para atualização.");
      });

      it('E a mensagem deve conter o ID procurado', async () => {
        (tagModel.findTagById as jest.Mock)
          .mockResolvedValue(null);

        const result = await updateTag(nonExistentId, mockTagToUpdate);

        expect(tagModel.findTagById).toHaveBeenCalledTimes(1);
        expect(result).toContain(`${nonExistentId}`);
      });
    });

    describe('Caso não consiga realizar a alteração solicitada', () => {
      const emptyPayload = {} as ITag;
      const existentId = 1;

      it('Deve retornar mensagem de impossibilidade de alteração', async () => {
        (tagModel.findTagById as jest.Mock)
          .mockResolvedValue(mockTag1);
        (tagModel.updateTag as jest.Mock)
          .mockResolvedValue(null);

        const result = await updateTag(existentId, emptyPayload);

        expect(tagModel.findTagById).toHaveBeenCalledTimes(1);
        expect(tagModel.updateTag).toHaveBeenCalledTimes(1);
        expect(result)
          .toContain('Não foi possível alterar os dados da categoria');
        expect(result).toContain(`com o id ${existentId}`);
        // Muito provavelmente, este é um falso positivo!!!
        // Corrigir a lógica da função para prever o envio de objeto vazio e
        // solicitar que se envie dados ou
        // devolver avisando que não tem o que alterar
      });
    });

    describe('Caso sejam enviados os dados corretamente para alteração', () => {
      it(
        'Retornar um breve relato do banco de dados e o objeto atualizado',
        async () => {
        (tagModel.updateTag as jest.Mock)
          .mockResolvedValue({
            updateResult: mockResultSetHeader,
            updatedTag: mockUpdatedTag,
          });
        
        const result = await updateTag(1, mockTagToUpdate);

        expect(tagModel.updateTag).toHaveBeenCalledTimes(1);
        expect(typeof result).not.toBe('string');
        if (typeof result !== 'string') {
          expect(result).toHaveProperty('updateResult');
          expect(result).toHaveProperty('updatedTag');
          expect(result.updateResult).toEqual(mockResultSetHeader);
          expect(result.updatedTag).toEqual(mockUpdatedTag);
        }
      });
    });

    describe('Em caso de problemas na requisição:', () => {
      it('Deve retornar uma mensagem de erro', async () => {
        (tagModel.updateTag as jest.Mock)
          .mockRejectedValue(mockUpdateError);
  
        const result = await updateTag(
          1,
          mockTagWithInvalidColumnName,
        );
  
        expect(tagModel.updateTag).toHaveBeenCalledTimes(1);
        expect(result)
          .toContain('Ocorreu um erro na alteração de');
        expect(result)
          .toContain('dados da categoria.');
        expect(result).toContain(mockUpdateErrorMessage);
      });
    });
  });

  describe('EXCLUIR UMA CATEGORIA DO BANCO DE DADOS', () => {
    describe('Caso não consiga excluir a tag', () => {
      const nonExistentId = 99999999999;

      it('Deve retornar mensagem de impossibilidade de exclusão', async () => {
        (tagModel.deleteTag as jest.Mock)
          .mockResolvedValue(null);
          
        const result = await deleteTag(nonExistentId);

        expect(tagModel.deleteTag).toHaveBeenCalledTimes(1);
        expect(result).toContain('Não foi possível excluir dados da categoria');
        expect(result).toContain(`com o id ${nonExistentId}`);
      });
    });

    describe('Caso consiga excluir a categoria', () => {
      const existentId = 1;

      it('Deve retornar um breve relato do banco de dados', async () => {
        (tagModel.deleteTag as jest.Mock)
          .mockResolvedValue(mockResultSetHeader);
        
        const result = await deleteTag(existentId);

        expect(tagModel.deleteTag).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockResultSetHeader);
      });
    });

    describe('Em caso de problemas na requisição:', () => {
      it('Deve retornar uma mensagem de erro', async () => {
        (tagModel.deleteTag as jest.Mock)
          .mockRejectedValue(mockError);
  
        const result = await deleteTag(1);
  
        expect(tagModel.deleteTag).toHaveBeenCalledTimes(1);
        expect(result)
          .toContain('Ocorreu um erro na exclusão da categoria.');
        expect(result).toContain(errorMessage);
      });
    });
  });
});