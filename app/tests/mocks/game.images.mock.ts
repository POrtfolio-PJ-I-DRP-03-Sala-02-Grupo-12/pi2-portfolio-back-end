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

export const mockGameImageToUpdate = {
  title: 'Imagem para Teste 1 Alterada',
  url: 'https://example.com/imagem1-alterada.jpg'
} as IGameImage;

export const mockGameImageUpdated = {
  id: 1,
  title: 'Imagem para Teste 1 Alterada',
  description: 'Descrição da imagem 1',
  url: 'https://example.com/imagem1-alterada.jpg',
  gameId: 1,
} as IGameImage;

export const mockGameImagesList = [{
  id: 1,
  title: 'Imagem para Teste 1 Alterada',
  description: 'Descrição da imagem 1',
  url: 'https://example.com/imagem1-alterada.jpg',
  gameId: 1,
}] as IGameImage[];