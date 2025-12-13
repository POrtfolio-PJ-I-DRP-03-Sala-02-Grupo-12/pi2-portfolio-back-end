"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockTagWithInvalidColumnName = exports.mockUpdateError = exports.mockUpdateErrorMessage = exports.mockInvalidTitleError = exports.invalidTitleErrorMessage = exports.mockError = exports.errorMessage = exports.mockResultSetHeader = exports.mockUpdatedTag = exports.mockTagToUpdate = exports.mockNewTag = exports.mockTagsList = exports.mockTag3 = exports.mockTag2 = exports.mockTag1 = void 0;
exports.mockTag1 = {
    id: 1,
    title: 'Categoria TST 1',
};
exports.mockTag2 = {
    id: 2,
    title: 'Categoria TST 2',
};
exports.mockTag3 = {
    id: 3,
    title: 'Categoria TST 3',
};
exports.mockTagsList = [
    exports.mockTag1,
    exports.mockTag2,
    exports.mockTag3,
];
exports.mockNewTag = {
    title: 'Categoria TST 1',
};
exports.mockTagToUpdate = {
    id: 1,
    title: 'Categoria TST Atualizada',
};
exports.mockUpdatedTag = {
    id: 1,
    title: 'Categoria TST Atualizada',
};
exports.mockResultSetHeader = {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: "",
    serverStatus: 0,
    warningStatus: 0,
    changedRows: 0
};
exports.errorMessage = 'Table gabisou_db_test.tags doesn\'t exist';
exports.mockError = new Error(exports.errorMessage);
exports.invalidTitleErrorMessage = 'Unknown column \'NaN\' in \'where\' clause';
exports.mockInvalidTitleError = new Error(exports.invalidTitleErrorMessage);
exports.mockUpdateErrorMessage = 'Unknown column \'tiitle\' in \'field list\'';
exports.mockUpdateError = new Error(exports.mockUpdateErrorMessage);
exports.mockTagWithInvalidColumnName = {
    tiitle: "Tentativa de alterar categoria com nome inválido de campo",
};
