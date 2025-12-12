"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockError = exports.errorMessage = exports.mockUpdateErrorMessage = exports.mockGameImageWithInvalidColumnName = exports.mockGameImagesList = exports.mockGameImageUpdated = exports.mockGameImageToUpdate = exports.mockGameImage3 = exports.mockGameImage2 = exports.mockGameImagesForGameSearch = exports.mockGameImage1 = exports.mockNewGameImage = exports.mockResultSetHeader = void 0;
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
exports.mockGameImage1 = Object.assign({ id: 1 }, exports.mockNewGameImage);
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
exports.mockGameImageWithInvalidColumnName = {
    desscription: "Tentativa de alterar imagem com nome inválido de campo",
};
exports.mockUpdateErrorMessage = 'Unknown column \'desscription\' in \'field list\'';
exports.errorMessage = 'Table gabisou_db_test.game_images doesn\'t exist';
exports.mockError = new Error(exports.errorMessage);
