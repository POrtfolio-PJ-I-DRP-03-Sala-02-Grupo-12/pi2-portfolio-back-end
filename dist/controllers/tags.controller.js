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
const index_services_1 = require("../services/index.services");
const findAllTags = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tagsList = yield index_services_1.tagsService.findAllTags();
        if (typeof tagsList === 'string') {
            return res.status(404).json({ message: tagsList });
        }
        return res.status(200).json(tagsList);
    }
    catch (error) {
        return res.status(500)
            .json({
            message: `Erro ao buscar categorias: ${error.message}`
        });
    }
});
exports.findAllTags = findAllTags;
const findTagById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tag = yield index_services_1.tagsService.findTagById(Number(id));
        if (typeof tag === 'string') {
            return res.status(404).json({ message: tag });
        }
        return res.status(200).json(tag);
    }
    catch (error) {
        return res.status(500)
            .json({
            message: `Ocorreu um erro na busca: ${error.message}`
        });
    }
});
exports.findTagById = findTagById;
const findTagByTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.query;
    try {
        const tag = yield index_services_1.tagsService.findTagByTitle(String(title));
        if (typeof tag === 'string') {
            return res.status(404).json({ message: tag });
        }
        return res.status(200).json(tag);
    }
    catch (error) {
        return res.status(500)
            .json({
            message: `Ocorreu um erro na busca: ${error.message}`
        });
    }
});
exports.findTagByTitle = findTagByTitle;
const createNewTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tag = req.body;
    try {
        const newTag = yield index_services_1.tagsService.createNewTag(tag);
        if (typeof newTag === 'string') {
            return res.status(400).json({ message: newTag });
        }
        return res.status(201).json(newTag);
    }
    catch (error) {
        return res.status(500)
            .json({
            message: `Ocorreu um erro no registro de nova categoria: ${error.message}`
        });
    }
});
exports.createNewTag = createNewTag;
const updateTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tagToUpdate = req.body;
        const updatedTag = yield index_services_1.tagsService
            .updateTag(Number(id), tagToUpdate);
        if (typeof updatedTag === 'string') {
            return res.status(400).json({ message: updatedTag });
        }
        return res.status(202).json(updatedTag);
    }
    catch (error) {
        return res.status(500)
            .json({
            message: `Ocorreu um erro na alteração de dados da categoria. ${error.message}`
        });
    }
});
exports.updateTag = updateTag;
const deleteTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedTag = yield index_services_1.tagsService.deleteTag(Number(id));
        if (typeof deletedTag === 'string') {
            return res.status(400).json({ message: deletedTag });
        }
        return res.status(202).json({
            result: deletedTag,
            message: `Categoria, com o id ${id}, deletada com sucesso.`
        });
    }
    catch (error) {
        return res.status(500)
            .json({
            message: `Ocorreu um erro na exclusão da categoria. ${error.message}`
        });
    }
});
exports.deleteTag = deleteTag;
