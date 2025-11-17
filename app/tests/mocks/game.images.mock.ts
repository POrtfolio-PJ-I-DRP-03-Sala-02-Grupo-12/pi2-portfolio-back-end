import IGameImage from "../../interfaces/IGameImage";

export const mockResultSetHeader = {
  insertId: 1,
  affectedRows: 1,
  fieldCount: 0,
  info: '',
  serverStatus: 0,
  warningStatus: 0,
  changedRows: 0
};

export const mockNewGameImage = {
  title: 'Imagem para Teste 1',
  description: 'Descrição da imagem 1',
  url: 'https://example.com/imagem1.jpg',
  gameId: 1,
} as IGameImage;

export const mockGameImage1 = {
  id: 1,
  ...mockNewGameImage,
} as IGameImage;

export const mockGameImagesForGameSearch = [
  {
    id: 1,
    title: 'Imagem para Teste 1',
    description: 'Descrição da imagem 1',
    url: 'https://example.com/imagem1.jpg',
  },
  {
    id: 2,
    title: 'Imagem para Teste 2',
    description: 'Descrição da imagem 2',
    url: 'https://example.com/imagem2.jpg',
  },
  {
    id: 3,
    title: 'Imagem para Teste 3',
    description: 'Descrição da imagem 3',
    url: 'https://example.com/imagem2.jpg',
  }
] as IGameImage[];

export const mockGameImage2 = {
  id: 2,
  title: 'Imagem para Teste 2',
  description: 'Descrição da imagem 2',
  url: 'https://example.com/imagem2.jpg',
  game: {
    id: 1,
    title: 'Jogo para Teste 1',
    tags: ['Categoria TST 1', 'Categoria TST 2', 'Categoria TST 3']
  },
} as IGameImage;

export const mockGameImage3 = {
  id: 3,
  title: 'Imagem para Teste 3',
  description: 'Descrição da imagem 3',
  url: 'https://example.com/imagem3.jpg',
  game: {
    id: 1,
    title: 'Jogo para Teste 1',
    tags: ['Categoria TST 1', 'Categoria TST 2', 'Categoria TST 3']
  },
} as IGameImage;

export const mockGameImageToUpdate = {
  title: 'Imagem para Teste 1 Alterada',
  url: 'https://example.com/imagem1-alterada.jpg'
} as IGameImage;

export const mockGameImageUpdated = {
  id: 1,
  title: 'Imagem para Teste 1 Alterada',
  description: 'Descrição da imagem 1',
  url: 'https://example.com/imagem1-alterada.jpg',
  game: {
    id: 1,
    title: 'Jogo para Teste 1',
    tags: ['Categoria TST 1', 'Categoria TST 2', 'Categoria TST 3']
  }
} as IGameImage;

export const mockGameImagesList = [
  {
    id: 1,
    title: 'Imagem para Teste 1 Alterada',
    description: 'Descrição da imagem 1',
    url: 'https://example.com/imagem1-alterada.jpg',
    game: {
      id: 1,
      title: 'Jogo para Teste 1',
      tags: ['Categoria TST 1', 'Categoria TST 2', 'Categoria TST 3']
    }
  },
  mockGameImage2,
  mockGameImage3,
] as IGameImage[];

export const mockGameImageWithInvalidColumnName = {
  desscription: "Tentativa de alterar imagem com nome inválido de campo",
} as unknown as IGameImage;

export const mockUpdateErrorMessage =
  'Unknown column \'desscription\' in \'field list\'';