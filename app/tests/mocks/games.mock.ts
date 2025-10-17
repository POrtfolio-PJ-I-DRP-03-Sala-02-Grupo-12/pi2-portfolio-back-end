import IGame from "../../interfaces/IGame";

export const mockGame = {
    id: 1,
    title: 'Jogo para Teste 1',
    description: 'Descrição do jogo 1',
    linkName: 'Link Jogo 1',
    linkUrl: 'https://example.com/jogo1',
} as IGame;

export const mockGamesList = [
  {
    id: 1,
    title: 'Jogo para Teste 1',
    description: 'Descrição do jogo 1',
    linkName: 'Link Jogo 1',
    linkUrl: 'https://example.com/jogo1',
  },
  {
    id: 2,
    title: 'Jogo para Teste 2',
    description: 'Descrição do jogo 2',
    linkName: 'Link Jogo 2',
    linkUrl: 'https://example.com/jogo2',
  },
  {
    id: 3,
    title: 'Jogo para Teste 3',
    description: 'Descrição do jogo 3',
    linkName: 'Link Jogo 3',
    linkUrl: 'https://example.com/jogo3',
  },
] as IGame[];

export const mockResultSetHeader = {
  insertId: 1,
  affectedRows: 1,
  fieldCount: 0,
  info: '',
  serverStatus: 0,
  warningStatus: 0,
  changedRows: 0
};

export const mockCreateGameQuery = `INSERT INTO games (title, description, link_name, link_url)
        VALUES (?, ?, ?, ?);
      `;