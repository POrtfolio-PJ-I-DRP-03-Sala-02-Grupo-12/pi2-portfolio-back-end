import IGame from "../../interfaces/IGame";
import IGameImage from "../../interfaces/IGameImage";
import IGameTag from "../../interfaces/IGameTag";

export const mockGame = {
    id: 1,
    title: 'Jogo para Teste 1',
    description: 'Descrição do jogo 1',
    linkName: 'Link Jogo 1',
    linkUrl: 'https://example.com/jogo1',
} as IGame;

export const mockGame1ToInsert = {
    title: 'Jogo para Teste 1',
    description: 'Descrição do jogo para teste 1',
    linkName: 'Link Jogo para teste 1',
    linkUrl: 'https://example.com/jogo1',
} as IGame;

export const mockGame2ToInsert = {
    title: 'Jogo para Teste 2',
    description: 'Descrição do jogo para teste 2',
    linkName: 'Link Jogo para teste 2',
    linkUrl: 'https://example.com/jogo2',
} as IGame;

export const mockGame3ToInsert = {
    title: 'Jogo para Teste 3',
    description: 'Descrição do jogo para teste 3',
    linkName: 'Link Jogo para teste 3',
    linkUrl: 'https://example.com/jogo3',
} as IGame;

export const mockGamesList = [
  {
    id: 1,
    ...mockGame1ToInsert
  },
  {
    id: 2,
    ...mockGame2ToInsert
  },
  {
    id: 3,
    ...mockGame3ToInsert
  },
] as IGame[];

export const mockImagesList = [
  {
    id: 1,
    title: 'Imagem para Teste 1',
    description: 'Descrição da imagem 1',
    url: 'https://example.com/imagem1.jpg',
    gameId: 1
  },
  {
    id: 2,
    title: 'Imagem para Teste 2',
    description: 'Descrição da imagem 2',
    url: 'https://example.com/imagem2.jpg',
    gameId: 1
  }
] as IGameImage[];

export const mockTagsList = [
  { id: 1, title: 'Categoria TST 1' },
  { id: 2, title: 'Categoria TST 2' },
  { id: 3, title: 'Categoria TST 3' }
];

export const mockGameTags = [
  { gameId: 1, tagId: 1 },
  { gameId: 1, tagId: 2 },
  { gameId: 1, tagId: 3 }
] as IGameTag[];

export const mockResultSetHeader = {
  insertId: 1,
  affectedRows: 1,
  fieldCount: 0,
  info: '',
  serverStatus: 0,
  warningStatus: 0,
  changedRows: 0
};

export const mockGameResult =
  {
    id: 1,
    title: 'Jogo para Teste 1',
    description: 'Descrição do jogo 1',
    linkName: 'Link Jogo 1',
    linkUrl: 'https://example.com/jogo1',
    images: [
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
      }
    ],
    tags: [
      { id: 1, title: 'Categoria TST 1' },
      { id: 2, title: 'Categoria TST 2' },
      { id: 3, title: 'Categoria TST 3' }
    ]
  };

export const mockCreateGameQuery = `INSERT INTO games (title, description, link_name, link_url)
        VALUES (?, ?, ?, ?);
      `;

export const mockFindAllGamesQuery = `
        SELECT
          g.id, g.title, g.description, g.link_name, g.link_url,
          i.id, i.title, i.description, i.url
          GROUP_CONCAT(DISTINCT t.title) AS tags,
        FROM games AS g
        LEFT JOIN games_tags AS gt
        ON g.id = gt.game_id
        LEFT JOIN tags AS t
        ON gt.tag_id = t.id
        LEFT JOIN game_images AS i
        ON g.id = i.game_id
        GROUP BY g.id, g.title, g.description;
      `;