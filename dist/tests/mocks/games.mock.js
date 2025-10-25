"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockFindAllGamesQuery = exports.mockCreateGameQuery = exports.mockGameResult = exports.mockResultSetHeader = exports.mockGameTags = exports.mockTagsList = exports.mockImagesList = exports.mockGamesList = exports.mockGame = void 0;
exports.mockGame = {
    id: 1,
    title: 'Jogo para Teste 1',
    description: 'Descrição do jogo 1',
    linkName: 'Link Jogo 1',
    linkUrl: 'https://example.com/jogo1',
};
exports.mockGamesList = [
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
];
exports.mockImagesList = [
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
];
exports.mockTagsList = [
    { id: 1, title: 'Categoria TST 1' },
    { id: 2, title: 'Categoria TST 2' },
    { id: 3, title: 'Categoria TST 3' }
];
exports.mockGameTags = [
    { gameId: 1, tagId: 1 },
    { gameId: 1, tagId: 2 },
    { gameId: 1, tagId: 3 }
];
exports.mockResultSetHeader = {
    insertId: 1,
    affectedRows: 1,
    fieldCount: 0,
    info: '',
    serverStatus: 0,
    warningStatus: 0,
    changedRows: 0
};
exports.mockGameResult = {
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
exports.mockCreateGameQuery = `INSERT INTO games (title, description, link_name, link_url)
        VALUES (?, ?, ?, ?);
      `;
exports.mockFindAllGamesQuery = `
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
