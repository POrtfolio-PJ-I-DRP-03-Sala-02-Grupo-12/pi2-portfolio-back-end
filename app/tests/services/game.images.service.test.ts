jest.mock('../../models/index.model', () => ({
  gameImageModel: {
    findAllImages: jest.fn(),
    findImageById: jest.fn(),
    createNewImage: jest.fn(),
    updateImage: jest.fn(),
  }
}));

import IGameImage from "../../interfaces/IGameImage";
import {
  gameImageModel,
} from "../../models/index.model";  
import {
  createNewGameImage,
  findAllGameImages,
  findGameImageById,
  updateGameImage,
} from "../../services/game.images.service";  
import {
  mockGameImage1,
  mockGameImage2,
  mockGameImage3,
  mockGameImagesList,
  mockGameImageToUpdate,
  mockGameImageUpdated,
  mockGameImageWithInvalidColumnName,
  mockNewGameImage,
  mockResultSetHeader,
  mockUpdateErrorMessage
} from "../mocks/game.images.mock";
import {
  errorMessage,
  invalidIdErrorMessage,
  mockError,
  mockInvalidIdError,
  mockUpdateError
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

  describe('CADASTRAR UMA NOVA IMAGEM', () => {
    describe('Caso não consiga cadastrar uma nova imagem', () => {
      const incompleteGameImageData = {
        title: "Imagem Incompleta para Teste",
        description: "Imagem incompleta para cadastrar",
        gameId: 1
      };

      it('Deve retornar uma mensagem e os dados enviados', async () => {
        (gameImageModel.createNewImage as jest.Mock)
          .mockResolvedValue(null);

        const result =
          await createNewGameImage(
            incompleteGameImageData as unknown as IGameImage
          );

        expect(gameImageModel.createNewImage).toHaveBeenCalledTimes(1);
        expect(gameImageModel.createNewImage)
          .toHaveBeenCalledWith(incompleteGameImageData);
        expect(result)
          .toContain(
            'Não foi possível cadastrar a imagem do jogo' +
            ' com os seguintes dados:'
          );
        expect(result).toContain(incompleteGameImageData.title);
        expect(result).toContain(incompleteGameImageData.description);
        expect(result).toContain(`${incompleteGameImageData.gameId}`);
      });
    });

    describe('Com os dados corretos enviados', () => {
      it('Deve retornar um objeto com um ID', async () => {
        (gameImageModel.createNewImage as jest.Mock)
          .mockResolvedValue(mockGameImage1);
        
        const result = await createNewGameImage(mockNewGameImage);

        expect(gameImageModel.createNewImage).toHaveBeenCalledTimes(1);
        expect(gameImageModel.createNewImage)
          .toHaveBeenCalledWith(mockNewGameImage);
        expect(result).toEqual(mockGameImage1);
      });
    });
  
    describe('Em caso de problemas na requisição:', () => {
      it('Deve retornar uma mensagem de erro', async () => {
        (gameImageModel.createNewImage as jest.Mock)
          .mockRejectedValue(mockError);
  
        const result = await createNewGameImage(mockNewGameImage);
  
        expect(gameImageModel.createNewImage).toHaveBeenCalledTimes(1);
        expect(result)
          .toContain('Ocorreu um erro no registro de nova imagem de jogo:');
        expect(result).toContain(errorMessage);
      });
    });
  });

  describe('ALTERAR OS DADOS DE UMA IMAGEM', () => {
    describe('Caso não consiga encontrar a imagem', () => {
      const nonExistentId = 99999999999;

      it('Deve retornar mensagem de "não encontrado"', async () => {
        (gameImageModel.findImageById as jest.Mock)
          .mockResolvedValue(null);

        const result = await updateGameImage(mockGameImageToUpdate, nonExistentId);

        expect(gameImageModel.findImageById).toHaveBeenCalledTimes(1);
        expect(result).toContain(`Imagem de jogo, com o id ${nonExistentId}`);
        expect(result).toContain("não encontrada para atualização.");
      });

      it('E a mensagem deve conter o ID procurado', async () => {
        (gameImageModel.findImageById as jest.Mock)
          .mockResolvedValue(null);

        const result = await updateGameImage(mockGameImageToUpdate, nonExistentId);

        expect(gameImageModel.findImageById).toHaveBeenCalledTimes(1);
        expect(result).toContain(`${nonExistentId}`);
      });
    });

    describe('Caso não consiga realizar a alteração solicitada', () => {
      const emptyPayload = {} as IGameImage;
      const existentId = 1;

      it('Deve retornar mensagem de impossibilidade de alteração', async () => {
        (gameImageModel.findImageById as jest.Mock)
          .mockResolvedValue(mockGameImage1);
        (gameImageModel.updateImage as jest.Mock)
          .mockResolvedValue(null);

        const result = await updateGameImage(emptyPayload, existentId);

        expect(gameImageModel.findImageById).toHaveBeenCalledTimes(1);
        expect(gameImageModel.updateImage).toHaveBeenCalledTimes(1);
        expect(result)
          .toContain('Não foi possível alterar os dados da imagem do jogo');
        expect(result).toContain(`com o id ${existentId}`);
        // Muito provavelmente, este é um falso positivo!!!
        // Corrigir a lógica da função para prever o envio de objeto vazio e
        // solicitar que se envie dados ou
        // devolver avisando que não tem o que alterar
      });
    });

    describe('Caso sejam enviados os dados corretamente para alteração', () => {
      it('Retornar um breve relato do banco de dados', async () => {
        (gameImageModel.updateImage as jest.Mock)
          .mockResolvedValue({
            updateResult: mockResultSetHeader,
            updatedGameImage: mockGameImageUpdated,
          });
        
        const result = await updateGameImage(mockGameImageToUpdate, 1);

        expect(gameImageModel.updateImage).toHaveBeenCalledTimes(1);
        expect(typeof result).not.toBe('string');
        if (typeof result !== 'string') {
          expect(result).toHaveProperty('updateResult');
          expect(result).toHaveProperty('updatedGameImage');
          expect(result.updateResult).toEqual(mockResultSetHeader);
          expect(result.updatedGameImage).toEqual(mockGameImageUpdated);
        }
      });
    });

    describe('Em caso de problemas na requisição:', () => {
      it('Deve retornar uma mensagem de erro', async () => {
        (gameImageModel.updateImage as jest.Mock)
          .mockRejectedValue(mockUpdateError);
  
        const result = await updateGameImage(
          mockGameImageWithInvalidColumnName,
          1
        );
  
        expect(gameImageModel.updateImage).toHaveBeenCalledTimes(1);
        expect(result)
          .toContain('Ocorreu um erro na alteração de');
        expect(result)
          .toContain('dados da imagem do jogo.');
        expect(result).toContain(mockUpdateErrorMessage);
      });
    });
  });
});