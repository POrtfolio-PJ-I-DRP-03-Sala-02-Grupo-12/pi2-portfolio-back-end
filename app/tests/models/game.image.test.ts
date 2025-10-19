import { createNewImage, findById, updateImage } from '../../models/game.image.model';
import { mockGameImagesList, mockGameImageUpdated, mockNewGameImage, mockResultSetHeader } from '../mocks/game.images.mock';
import connection from '../../models/connection';
import IGameImage from '../../interfaces/IGameImage';

jest.mock('../../models/connection.ts', () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  }
}));

describe('TESTES DO MODELO GAME IMAGE', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ALTERAÇÃO - Atualização de imagem de jogo', () => {
    it('Deve atualizar e retornar corretamente o objeto alterado.', async () => {
      (connection.query as unknown as jest.Mock)
        .mockResolvedValueOnce([mockResultSetHeader, []])
        .mockResolvedValueOnce([mockResultSetHeader, []])
        .mockResolvedValueOnce([mockGameImagesList, []]);
    
      const registerResult = await createNewImage(mockNewGameImage as IGameImage);
      expect(connection.query).toHaveBeenCalledTimes(1);
      
      const complementedImage = {
        ...registerResult,
        title: mockNewGameImage.title,
        url: mockNewGameImage.url
      };

      const idToSearch = registerResult?.id as number;
    
      const updateResult = await updateImage(complementedImage as IGameImage, idToSearch);

      const updatedImage = await findById(idToSearch);

      expect(connection.query).toHaveBeenCalledTimes(3);
      expect(updateResult).toEqual(mockResultSetHeader);
      expect(updatedImage).not.toBeNull();
      expect(updatedImage).toEqual(mockGameImageUpdated);
    });
  });
});