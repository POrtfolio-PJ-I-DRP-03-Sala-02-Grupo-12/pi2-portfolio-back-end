jest.mock('../../models/index.model', () => ({
  gameImageModel: {
    findAllImages: jest.fn(),
    findImageById: jest.fn(),
    createNewImage: jest.fn(),
    updateImage: jest.fn(),
  }
}));

import {
  gameImageModel,
} from "../../models/index.model";  
import {
  findAllGameImages,
  findGameImageById,
} from "../../services/game.images.service";  
import {
  mockGameImage2,
  mockGameImage3,
  mockGameImagesList
} from "../mocks/game.images.mock";
import {
  errorMessage,
  invalidIdErrorMessage,
  mockError,
  mockInvalidIdError
} from "../mocks/games.mock";

describe('TESTES DO SERVIÇO GAME IMAGES', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('LISTAR IMAGENS DE JOGOS', () => {
    describe('Caso não haja imagens cadastradas:', () => {
      it('Deve mostrar uma mensagem de lista vazia', async () => {
        const messageShouldBeReturned =
          "Não encontramos imagens de jogos cadastradas.";
        
        (gameImageModel.findAllImages as jest.Mock)
          .mockResolvedValue(null);

        const result = await findAllGameImages();

        expect(gameImageModel.findAllImages).toHaveBeenCalledTimes(1);
        expect(result).toBe(messageShouldBeReturned);
      });
    });

    describe('Com imagens cadastrados', () => {
      it('Com três imagens cadastradas, deve retornar um array de tamanho 3.', async () => {
        (gameImageModel.findAllImages as jest.Mock)
          .mockResolvedValue(mockGameImagesList);
  
        const result = await findAllGameImages();
        
        expect(gameImageModel.findAllImages).toHaveBeenCalledTimes(1);
        expect(result).toHaveLength(3);
      });

      it('E a lista deve conter os objetos corretos.', async () => {
        const result = await findAllGameImages();

        expect(result[0]).toEqual({ id: 1, ...mockGameImagesList[0] });
        expect(result[1]).toEqual(mockGameImage2);
        expect(result[2]).toEqual(mockGameImage3);
      });
    });

    describe('Em caso de problemas na requisição:', () => {
      it('Deve retornar uma mensagem de erro', async () => {
        (gameImageModel.findAllImages as jest.Mock)
          .mockRejectedValue(mockError);
        
        const result = await findAllGameImages();

        expect(gameImageModel.findAllImages).toHaveBeenCalledTimes(1);
        expect(result).toContain('Erro ao buscar imagens de jogos:');
        expect(result).toContain(errorMessage);
      });
    });
  });

  describe('BUSCAR UMA IMAGEM POR ID', () => {
    describe('Informando um ID que não existe', () => {
      const nonExistentId = 0;
      const messageToBeReturned =
        `Não conseguimos encontrar a imagem do jogo pelo id ${nonExistentId}`;
      it('Deve retornar uma mensagem de "Não encontrado"', async () => {
        (gameImageModel.findImageById as jest.Mock)
          .mockResolvedValue(null);
        
        const result = await findGameImageById(0);

        expect(gameImageModel.findImageById).toHaveBeenCalledTimes(1);
        expect(gameImageModel.findImageById)
          .toHaveBeenCalledWith(nonExistentId);
        expect(result).toEqual(messageToBeReturned);
      });
    });

    describe('Informando um ID existente', () => {
      const correctId = 2;

      it('Deve retornar o objeto corretamente.', async () => {
        (gameImageModel.findImageById as jest.Mock)
          .mockResolvedValue(mockGameImage2);

        const result = await findGameImageById(correctId);

        expect(gameImageModel.findImageById).toHaveBeenCalledTimes(1);
        expect(gameImageModel.findImageById).toHaveBeenCalledWith(correctId);
        expect(result).not.toBeNull();
        expect(result).toHaveProperty('title');
        if (typeof result !== 'string') {
          expect(result.title).toBeDefined();
          expect(result.title).toEqual(mockGameImage2.title);
        }
        expect(result).toEqual(mockGameImage2);
      });
    });

    describe('Em caso de problemas na requisição:', () => {
      it('Deve retornar uma mensagem de erro', async () => {
        (gameImageModel.findImageById as jest.Mock)
          .mockRejectedValue(mockInvalidIdError);
        
        const result = await findGameImageById(Number('AB001'));

        expect(gameImageModel.findImageById).toHaveBeenCalledTimes(1);
        expect(result).toContain('Ocorreu um erro na busca:');
        expect(result).toContain(invalidIdErrorMessage);
      });
    });
  });
});