import { createNewImage, findAllImages, findImageById, updateImage } from '../../models/game.image.model';
import { mockGameImagesList, mockGameImageUpdated, mockNewGameImage } from '../mocks/game.images.mock';
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
  it('LISTA - Retorna corretamente a lista de imagens dos jogos cadastrados',
  async () => {
    (connection.query as jest.Mock)
      .mockResolvedValueOnce([mockGameImagesList, []]);
      
    const imagesList = await findAllImages();
    
    expect(connection.query).toHaveBeenCalledTimes(1);
    expect(imagesList).toEqual(mockGameImagesList);
  });

  it('ALTERAÇÃO - Atualiza corretamente uma imagem de jogo', async () => {
    const mockImageId = 1;

    (connection.query as jest.Mock)
      .mockResolvedValueOnce([{ insertId: mockImageId }, []]);

    (connection.query as jest.Mock)
      .mockResolvedValueOnce([[mockNewGameImage], []]);

    (connection.query as jest.Mock)
      .mockResolvedValueOnce([ { affectedRows: 1 }, []]);

    (connection.query as jest.Mock)
      .mockResolvedValueOnce([[mockGameImageUpdated], []]);
    
    const registerResult = await createNewImage(mockNewGameImage as IGameImage);
    expect(registerResult).not.toBeNull();
    expect(registerResult?.id).toBeDefined();

    const createdImageId = registerResult?.id as number;

    const imageBeforeUpdate = await findImageById(createdImageId);

    await updateImage(mockGameImageUpdated, createdImageId);

    const imageAfterUpdate = await findImageById(createdImageId);

    expect(connection.query).toHaveBeenCalledTimes(4);
    expect(createdImageId).toEqual(mockImageId);
    expect(imageBeforeUpdate).toEqual(mockNewGameImage);
    expect(imageAfterUpdate).toEqual(mockGameImageUpdated);
  });
});