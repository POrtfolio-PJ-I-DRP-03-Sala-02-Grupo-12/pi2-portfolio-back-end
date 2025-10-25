"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockGameImagesList = exports.mockGameImageUpdated = exports.mockGameImageToUpdate = exports.mockGameImage3 = exports.mockGameImage2 = exports.mockGameImagesForGameSearch = exports.mockNewGameImage = exports.mockResultSetHeader = void 0;
exports.mockResultSetHeader = {
    insertId: 1,
    affectedRows: 1,
    fieldCount: 0,
    info: '',
    serverStatus: 0,
    warningStatus: 0,
    changedRows: 0
};
exports.mockNewGameImage = {
    title: 'Imagem para Teste 1',
    description: 'Descrição da imagem 1',
    url: 'https://example.com/imagem1.jpg',
    gameId: 1,
};
exports.mockGameImagesForGameSearch = [
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
];
exports.mockGameImage2 = {
    id: 2,
    title: 'Imagem para Teste 2',
    description: 'Descrição da imagem 2',
    url: 'https://example.com/imagem2.jpg',
    game: {
        id: 1,
        title: 'Jogo para Teste 1',
        tags: ['Categoria TST 1', 'Categoria TST 2', 'Categoria TST 3']
    },
};
exports.mockGameImage3 = {
    id: 3,
    title: 'Imagem para Teste 3',
    description: 'Descrição da imagem 3',
    url: 'https://example.com/imagem3.jpg',
    game: {
        id: 1,
        title: 'Jogo para Teste 1',
        tags: ['Categoria TST 1', 'Categoria TST 2', 'Categoria TST 3']
    },
};
exports.mockGameImageToUpdate = {
    title: 'Imagem para Teste 1 Alterada',
    url: 'https://example.com/imagem1-alterada.jpg'
};
exports.mockGameImageUpdated = {
    id: 1,
    title: 'Imagem para Teste 1 Alterada',
    description: 'Descrição da imagem 1',
    url: 'https://example.com/imagem1-alterada.jpg',
    game: {
        id: 1,
        title: 'Jogo para Teste 1',
        tags: ['Categoria TST 1', 'Categoria TST 2', 'Categoria TST 3']
    }
};
exports.mockGameImagesList = [
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
    exports.mockGameImage2,
    exports.mockGameImage3,
];
