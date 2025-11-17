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
} from "../../services/game.images.service";  
import { mockGameImage2, mockGameImage3, mockGameImagesList } from "../mocks/game.images.mock";
import { errorMessage, mockError } from "../mocks/games.mock";

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
});