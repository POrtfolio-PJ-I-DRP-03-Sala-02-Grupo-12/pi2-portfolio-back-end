jest.mock("../../models/index.model", () => ({
  gameTagModel: {
    findAllGamesTags: jest.fn(),
    createNewGameTag: jest.fn(),
    deleteGameTag: jest.fn(),
  },
}));

import IGameTag from "../../interfaces/IGameTag";
import {
  gameTagModel,
} from "../../models/index.model";
import {
  createNewGameTag,
  deleteGameTag,
  findAllGamesTags,
} from "../../services/games.tags.service";
import {
  mockError,
  mockGameTag1,
  mockGameTagsList
} from "../mocks/game.tag.mock";
import { mockResultSetHeader } from "../mocks/tag.mock";

describe('TESTES DO SERVIÇO DE CATEGORIAS DE JOGOS', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('LISTAR CATEGORIAS DE JOGOS', () => {
    describe('Caso não existam categorias associadas a jogos', () => {
      it('Deve retornar uma mensagem de lista vazia', async () => {
        const expectedMessage =
          'Não encontramos jogos com categorias associadas.';
        (gameTagModel.findAllGamesTags as jest.Mock)
          .mockResolvedValue([]);
        
        const result = await findAllGamesTags();

        expect(gameTagModel.findAllGamesTags).toHaveBeenCalledTimes(1);
        expect(result).toBe(expectedMessage);
      });
    });

    describe('Com associações cadastradas', () => {
      it(
        'Com 3 associações cadastradas, deve retornar um array de tamanho 3',
        async () => {
          (gameTagModel.findAllGamesTags as jest.Mock)
            .mockResolvedValue(mockGameTagsList);
          
          const result = await findAllGamesTags();

          expect(gameTagModel.findAllGamesTags).toHaveBeenCalledTimes(1);
          expect(Array.isArray(result)).toBe(true);
          if (Array.isArray(result)) {
            expect(result).toHaveLength(3);
            expect(result).toEqual(mockGameTagsList);
          }
        }
      );
    });

    describe('Em caso de problemas na requisição:', () => {
      it('Deve retornar uma mensagem de erro', async () => {
        (gameTagModel.findAllGamesTags as jest.Mock)
          .mockRejectedValue(mockError);

        const result = await findAllGamesTags();
        
        expect(gameTagModel.findAllGamesTags).toHaveBeenCalledTimes(1);
        expect(result).toContain('Erro ao buscar jogos com categorias:');
        expect(result).toContain(mockError.message);
      });
    });
  });

  describe('CADASTRAR UMA NOVA ASSOCIAÇÃO DE CATEGORIA A UM JOGO', () => {
    describe('Caso não consiga cadastrar a associação', () => {
      const incompleteGameTagData = {
        gameId: 1,
      } as unknown as IGameTag;

      it('Deve retornar mensagem de impossibilidade de cadastro', async () => {
        (gameTagModel.createNewGameTag as jest.Mock)
          .mockResolvedValue(null);

        const result = await createNewGameTag(incompleteGameTagData);

        expect(gameTagModel.createNewGameTag).toHaveBeenCalledTimes(1);
        expect(gameTagModel.createNewGameTag).toHaveBeenCalledWith(incompleteGameTagData);
        expect(result)
          .toContain('Não foi possível associar a categoria ao jogo' +
            ' com os seguintes dados:'
          );
      });

      it('E deve retornar junto os dados enviados.', async () => {
        (gameTagModel.createNewGameTag as jest.Mock)
          .mockResolvedValue(null);
          
        const result = await createNewGameTag(incompleteGameTagData);
        expect(result).toContain(`gameId: ${incompleteGameTagData.gameId}`);
        expect(result).toContain(`tagId:`);
      });
    });

    describe('Caso dados corretos sejam enviados', () => {
      it('Deve retornar os dados da nova associação cadastrada', async () => {
        (gameTagModel.createNewGameTag as jest.Mock)
          .mockResolvedValue(mockGameTag1);
        
        const result = await createNewGameTag(mockGameTag1);

        expect(gameTagModel.createNewGameTag).toHaveBeenCalledTimes(1);
        expect(gameTagModel.createNewGameTag).toHaveBeenCalledWith(mockGameTag1);
        expect(result).toEqual(mockGameTag1);
      });
    });

    describe('Em caso de problemas na requisição:', () => {
      it('Deve retornar uma mensagem de erro', async () => {
        (gameTagModel.createNewGameTag as jest.Mock)
          .mockRejectedValue(mockError);

        const result = await createNewGameTag(mockGameTag1);

        expect(gameTagModel.createNewGameTag).toHaveBeenCalledTimes(1);
        expect(result)
          .toContain('Ocorreu um erro ao associar a categoria ao jogo:');
        expect(result).toContain(mockError.message);
      });
    });
  });

  describe('DELETAR UMA ASSOCIAÇÃO DE CATEGORIA A UM JOGO', () => {
    describe('Caso não consiga deletar a associação', () => {
      const gameIdToDelete = 1;
      const tagIdToDelete = 99;

      it('Deve retornar mensagem de impossibilidade de exclusão', async () => {
        (gameTagModel.deleteGameTag as jest.Mock)
          .mockResolvedValue(null);

        const result = await deleteGameTag(gameIdToDelete, tagIdToDelete);

        expect(gameTagModel.deleteGameTag).toHaveBeenCalledTimes(1);
        expect(gameTagModel.deleteGameTag).toHaveBeenCalledWith(
          gameIdToDelete,
          tagIdToDelete
        );
        expect(result)
          .toContain('Não foi possível deletar a associação da categoria ao jogo' +
            ' com os seguintes dados:'
          );
      });

      it('E deve retornar junto os dados enviados.', async () => {
        (gameTagModel.deleteGameTag as jest.Mock)
          .mockResolvedValue(null);
          
        const result = await deleteGameTag(gameIdToDelete, tagIdToDelete);
        expect(result).toContain(`gameId: ${gameIdToDelete}`);
        expect(result).toContain(`tagId: ${tagIdToDelete}`);
      });
    });

    describe('Caso dados corretos sejam enviados', () => {
      it('Deve retornar o ResultSetHeader da exclusão', async () => {
        (gameTagModel.deleteGameTag as jest.Mock)
          .mockResolvedValue(mockResultSetHeader);
        
        const result = await deleteGameTag(1, 2);
        
        expect(gameTagModel.deleteGameTag).toHaveBeenCalledTimes(1);
        expect(gameTagModel.deleteGameTag).toHaveBeenCalledWith(1, 2);
        expect(result).toEqual(mockResultSetHeader);
      });
    });
  });

  describe('Em caso de problemas na requisição:', () => {
    it('Deve retornar uma mensagem de erro', async () => {
      (gameTagModel.deleteGameTag as jest.Mock)
        .mockRejectedValue(mockError);

      const result = await deleteGameTag(1, 1);
      expect(gameTagModel.deleteGameTag).toHaveBeenCalledTimes(1);
      expect(result)
        .toContain('Ocorreu um erro ao deletar a associação da categoria ao jogo:');
      expect(result).toContain(mockError.message);
    });
  });
});
