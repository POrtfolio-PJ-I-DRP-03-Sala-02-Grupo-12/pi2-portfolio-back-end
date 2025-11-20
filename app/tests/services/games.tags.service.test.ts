jest.mock("../../models/index.model", () => ({
  gameTagModel: {
    findAllGamesTags: jest.fn(),
    createNewGameTag: jest.fn(),
    deleteGameTag: jest.fn(),
  },
}));

import {
  gameTagModel,
} from "../../models/index.model";
import {
  findAllGamesTags,
} from "../../services/games.tags.service";
import { mockError, mockGameTagsList } from "../mocks/game.tag.mock";

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
});
