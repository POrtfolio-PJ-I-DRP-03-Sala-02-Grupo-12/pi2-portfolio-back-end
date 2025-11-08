"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTag = exports.updateTag = exports.createNewTag = exports.findTagByTitle = exports.findTagById = exports.findAllTags = void 0;
const index_model_1 = require("../models/index.model");
const findAllTags = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tagsList = yield index_model_1.tagModel.findAllTags();
        if (!tagsList || tagsList.length === 0) {
            return 'Não encontramos categorias cadastradas.';
        }
        return tagsList;
    }
    catch (error) {
        return `Erro ao buscar categorias: ${error.message}`;
    }
});
exports.findAllTags = findAllTags;
const findTagById = (idToSearch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tag = yield index_model_1.tagModel.findTagById(idToSearch);
        if (!tag || tag === null) {
            return `Não conseguimos encontrar a categoria pelo id ${idToSearch}`;
        }
        return tag;
    }
    catch (error) {
        return `Ocorreu um erro na busca: ${error.message}`;
    }
});
exports.findTagById = findTagById;
const findTagByTitle = (titleToSearch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tag = yield index_model_1.tagModel.findTagByTitle(titleToSearch);
        if (!tag || tag === null) {
            return `Não conseguimos encontrar a categoria pelo título ${titleToSearch}`;
        }
        return tag;
    }
    catch (error) {
        return `Ocorreu um erro na busca: ${error.message}`;
    }
});
exports.findTagByTitle = findTagByTitle;
const createNewTag = (tag) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTag = yield index_model_1.tagModel.createNewTag(tag);
        if (!newTag || !newTag.id || newTag === null) {
            return 'Não foi possível cadastrar a categoria com o título ${tag.title}';
        }
        return newTag;
    }
    catch (error) {
        return `Ocorreu um erro no registro de nova categoria: ${error.message}`;
    }
});
exports.createNewTag = createNewTag;
const updateTag = (idToSearch, tagToUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tagFoundToUpdate = yield index_model_1.tagModel.findTagById(idToSearch);
        if (!tagFoundToUpdate) {
            return `Categoria, com o id ${idToSearch}, não encontrada para atualização.`;
        }
        const mergedTagData = Object.assign(Object.assign({}, tagFoundToUpdate), tagToUpdate);
        delete mergedTagData.id;
        const updateResult = yield index_model_1.tagModel
            .updateTag(idToSearch, mergedTagData);
        if (!updateResult)
            return `Não foi possível alterar os dados da categoria com o id ${idToSearch}`;
        const updatedTag = yield index_model_1.tagModel
            .findTagById(idToSearch);
        if (!updatedTag) {
            return `Categoria, com o id ${idToSearch}, não encontrada.`;
        }
        return { updateResult, updatedTag };
    }
    catch (error) {
        return `Ocorreu um erro na alteração de dados da categoria. ${error.message}`;
    }
});
exports.updateTag = updateTag;
const deleteTag = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const excludedTag = yield index_model_1.tagModel.deleteTag(id);
        if (!excludedTag) {
            return `Não foi possível excluir dados da categoria com o id ${id}`;
        }
        return excludedTag;
    }
    catch (error) {
        return `Ocorreu um erro na exclusão da categoria. ${error.message}`;
    }
});
exports.deleteTag = deleteTag;
