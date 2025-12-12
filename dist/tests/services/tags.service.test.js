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
jest.mock('../../models/index.model', () => ({
    tagModel: {
        findAllTags: jest.fn(),
        findTagById: jest.fn(),
        findTagByTitle: jest.fn(),
        createNewTag: jest.fn(),
        updateTag: jest.fn(),
        deleteTag: jest.fn(),
    }
}));
const index_model_1 = require("../../models/index.model");
const tags_service_1 = require("../../services/tags.service");
const games_mock_1 = require("../mocks/games.mock");
const tag_mock_1 = require("../mocks/tag.mock");
describe('TESTES DO SERVIÇO TAGS', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('LISTAR TAGS', () => {
        describe('Caso não haja tags cadastradas:', () => {
            it('Deve mostrar uma mensagem de lista vazia', () => __awaiter(void 0, void 0, void 0, function* () {
                const messageShouldBeReturned = "Não encontramos categorias cadastradas.";
                index_model_1.tagModel.findAllTags
                    .mockResolvedValue(null);
                const result = yield (0, tags_service_1.findAllTags)();
                expect(index_model_1.tagModel.findAllTags).toHaveBeenCalledTimes(1);
                expect(result).toBe(messageShouldBeReturned);
            }));
        });
        describe('Com categorias cadastradas', () => {
            it('Com três categorias cadastradas, deve retornar um array de tamanho 3.', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.tagModel.findAllTags
                    .mockResolvedValue(tag_mock_1.mockTagsList);
                const result = yield (0, tags_service_1.findAllTags)();
                expect(index_model_1.tagModel.findAllTags).toHaveBeenCalledTimes(1);
                expect(result).toHaveLength(3);
            }));
            it('E a lista deve conter os objetos corretos.', () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, tags_service_1.findAllTags)();
                expect(result[0]).toEqual(tag_mock_1.mockTag1);
                expect(result[1]).toEqual(tag_mock_1.mockTag2);
                expect(result[2]).toEqual(tag_mock_1.mockTag3);
            }));
        });
        describe('Em caso de problemas na requisição:', () => {
            it('Deve retornar uma mensagem de erro', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.tagModel.findAllTags
                    .mockRejectedValue(tag_mock_1.mockError);
                const result = yield (0, tags_service_1.findAllTags)();
                expect(index_model_1.tagModel.findAllTags).toHaveBeenCalledTimes(1);
                expect(result).toContain('Erro ao buscar categorias:');
                expect(result).toContain(tag_mock_1.errorMessage);
            }));
        });
    });
    describe('BUSCAR UMA TAG POR ID', () => {
        describe('Informando um ID que não existe', () => {
            const nonExistentId = 0;
            const messageToBeReturned = `Não conseguimos encontrar a categoria pelo id ${nonExistentId}`;
            it('Deve retornar uma mensagem de "Não encontrado"', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.tagModel.findTagById
                    .mockResolvedValue(null);
                const result = yield (0, tags_service_1.findTagById)(0);
                expect(index_model_1.tagModel.findTagById).toHaveBeenCalledTimes(1);
                expect(index_model_1.tagModel.findTagById)
                    .toHaveBeenCalledWith(nonExistentId);
                expect(result).toEqual(messageToBeReturned);
            }));
        });
        describe('Informando um ID existente', () => {
            const correctId = 2;
            it('Deve retornar o objeto corretamente.', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.tagModel.findTagById
                    .mockResolvedValue(tag_mock_1.mockTag2);
                const result = yield (0, tags_service_1.findTagById)(correctId);
                expect(index_model_1.tagModel.findTagById).toHaveBeenCalledTimes(1);
                expect(index_model_1.tagModel.findTagById).toHaveBeenCalledWith(correctId);
                expect(result).not.toBeNull();
                expect(result).toHaveProperty('title');
                if (typeof result !== 'string') {
                    expect(result.title).toBeDefined();
                    expect(result.title).toEqual(tag_mock_1.mockTag2.title);
                }
                expect(result).toEqual(tag_mock_1.mockTag2);
            }));
        });
        describe('Em caso de problemas na requisição:', () => {
            it('Deve retornar uma mensagem de erro', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.tagModel.findTagById
                    .mockRejectedValue(tag_mock_1.mockInvalidTitleError);
                const result = yield (0, tags_service_1.findTagById)(Number('AB001'));
                expect(index_model_1.tagModel.findTagById).toHaveBeenCalledTimes(1);
                expect(result).toContain('Ocorreu um erro na busca:');
                expect(result).toContain(games_mock_1.invalidIdErrorMessage);
            }));
        });
    });
    describe('BUSCAR UMA TAG POR TÍTULO', () => {
        describe('Informando um título que não existe', () => {
            const nonExistentTitle = "Título Inexistente";
            const messageToBeReturned = `Não conseguimos encontrar a categoria pelo título ${nonExistentTitle}`;
            it('Deve retornar uma mensagem de "Não encontrado"', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.tagModel.findTagByTitle
                    .mockResolvedValue(null);
                const result = yield (0, tags_service_1.findTagByTitle)(nonExistentTitle);
                expect(index_model_1.tagModel.findTagByTitle).toHaveBeenCalledTimes(1);
                expect(index_model_1.tagModel.findTagByTitle)
                    .toHaveBeenCalledWith(nonExistentTitle);
                expect(result).toEqual(messageToBeReturned);
            }));
        });
        describe('Informando um título existente', () => {
            const correctTitle = "Categoria TST 2";
            it('Deve retornar o objeto corretamente.', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.tagModel.findTagByTitle
                    .mockResolvedValue(tag_mock_1.mockTag2);
                const result = yield (0, tags_service_1.findTagByTitle)(correctTitle);
                expect(index_model_1.tagModel.findTagByTitle).toHaveBeenCalledTimes(1);
                expect(index_model_1.tagModel.findTagByTitle).toHaveBeenCalledWith(correctTitle);
                expect(result).not.toBeNull();
                expect(result).toHaveProperty('title');
                if (typeof result !== 'string') {
                    expect(result.title).toBeDefined();
                    expect(result.title).toEqual(tag_mock_1.mockTag2.title);
                }
                expect(result).toEqual(tag_mock_1.mockTag2);
            }));
        });
        describe('Em caso de problemas na requisição:', () => {
            it('Deve retornar uma mensagem de erro', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.tagModel.findTagByTitle
                    .mockRejectedValue(tag_mock_1.mockInvalidTitleError);
                const result = yield (0, tags_service_1.findTagByTitle)("Algo inválido.");
                expect(index_model_1.tagModel.findTagByTitle).toHaveBeenCalledTimes(1);
                expect(result).toContain('Ocorreu um erro na busca:');
                expect(result).toContain(tag_mock_1.invalidTitleErrorMessage);
            }));
        });
    });
    describe('CADASTRAR UMA NOVA TAG', () => {
        describe('Caso não consiga cadastrar uma nova categoria', () => {
            const incompleteTagData = {};
            it('Deve retornar uma mensagem e os dados enviados', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.tagModel.createNewTag
                    .mockResolvedValue(null);
                const result = yield (0, tags_service_1.createNewTag)(incompleteTagData);
                expect(index_model_1.tagModel.createNewTag).toHaveBeenCalledTimes(1);
                expect(index_model_1.tagModel.createNewTag)
                    .toHaveBeenCalledWith(incompleteTagData);
                expect(result)
                    .toContain('Não foi possível cadastrar a categoria' +
                    ' com o título ');
            }));
        });
        describe('Com os dados corretos enviados', () => {
            it('Deve retornar um objeto com um ID', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.tagModel.createNewTag
                    .mockResolvedValue(tag_mock_1.mockTag1);
                const result = yield (0, tags_service_1.createNewTag)(tag_mock_1.mockNewTag);
                expect(index_model_1.tagModel.createNewTag).toHaveBeenCalledTimes(1);
                expect(index_model_1.tagModel.createNewTag)
                    .toHaveBeenCalledWith(tag_mock_1.mockNewTag);
                expect(result).toEqual(tag_mock_1.mockTag1);
            }));
        });
        describe('Em caso de problemas na requisição:', () => {
            it('Deve retornar uma mensagem de erro', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.tagModel.createNewTag
                    .mockRejectedValue(tag_mock_1.mockError);
                const result = yield (0, tags_service_1.createNewTag)(tag_mock_1.mockNewTag);
                expect(index_model_1.tagModel.createNewTag).toHaveBeenCalledTimes(1);
                expect(result)
                    .toContain('Ocorreu um erro no registro de nova categoria:');
                expect(result).toContain(tag_mock_1.errorMessage);
            }));
        });
    });
    describe('ALTERAR OS DADOS DE UMA CATEGORIA', () => {
        describe('Caso não consiga encontrar a tag', () => {
            const nonExistentId = 99999999999;
            it('Deve retornar mensagem de "não encontrado"', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.tagModel.findTagById
                    .mockResolvedValue(null);
                const result = yield (0, tags_service_1.updateTag)(nonExistentId, tag_mock_1.mockTagToUpdate);
                expect(index_model_1.tagModel.findTagById).toHaveBeenCalledTimes(1);
                expect(result).toContain(`Categoria, com o id ${nonExistentId}`);
                expect(result).toContain("não encontrada para atualização.");
            }));
            it('E a mensagem deve conter o ID procurado', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.tagModel.findTagById
                    .mockResolvedValue(null);
                const result = yield (0, tags_service_1.updateTag)(nonExistentId, tag_mock_1.mockTagToUpdate);
                expect(index_model_1.tagModel.findTagById).toHaveBeenCalledTimes(1);
                expect(result).toContain(`${nonExistentId}`);
            }));
        });
        describe('Caso não consiga realizar a alteração solicitada', () => {
            const emptyPayload = {};
            const existentId = 1;
            it('Deve retornar mensagem de impossibilidade de alteração', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.tagModel.findTagById
                    .mockResolvedValue(tag_mock_1.mockTag1);
                index_model_1.tagModel.updateTag
                    .mockResolvedValue(null);
                const result = yield (0, tags_service_1.updateTag)(existentId, emptyPayload);
                expect(index_model_1.tagModel.findTagById).toHaveBeenCalledTimes(1);
                expect(index_model_1.tagModel.updateTag).toHaveBeenCalledTimes(1);
                expect(result)
                    .toContain('Não foi possível alterar os dados da categoria');
                expect(result).toContain(`com o id ${existentId}`);
                // Muito provavelmente, este é um falso positivo!!!
                // Corrigir a lógica da função para prever o envio de objeto vazio e
                // solicitar que se envie dados ou
                // devolver avisando que não tem o que alterar
            }));
        });
        describe('Caso sejam enviados os dados corretamente para alteração', () => {
            it('Retornar um breve relato do banco de dados e o objeto atualizado', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.tagModel.updateTag
                    .mockResolvedValue({
                    updateResult: tag_mock_1.mockResultSetHeader,
                    updatedTag: tag_mock_1.mockUpdatedTag,
                });
                const result = yield (0, tags_service_1.updateTag)(1, tag_mock_1.mockTagToUpdate);
                expect(index_model_1.tagModel.updateTag).toHaveBeenCalledTimes(1);
                expect(typeof result).not.toBe('string');
                if (typeof result !== 'string') {
                    expect(result).toHaveProperty('updateResult');
                    expect(result).toHaveProperty('updatedTag');
                    expect(result.updateResult).toEqual(tag_mock_1.mockResultSetHeader);
                    expect(result.updatedTag).toEqual(tag_mock_1.mockUpdatedTag);
                }
            }));
        });
        describe('Em caso de problemas na requisição:', () => {
            it('Deve retornar uma mensagem de erro', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.tagModel.updateTag
                    .mockRejectedValue(tag_mock_1.mockUpdateError);
                const result = yield (0, tags_service_1.updateTag)(1, tag_mock_1.mockTagWithInvalidColumnName);
                expect(index_model_1.tagModel.updateTag).toHaveBeenCalledTimes(1);
                expect(result)
                    .toContain('Ocorreu um erro na alteração de');
                expect(result)
                    .toContain('dados da categoria.');
                expect(result).toContain(tag_mock_1.mockUpdateErrorMessage);
            }));
        });
    });
    describe('EXCLUIR UMA CATEGORIA DO BANCO DE DADOS', () => {
        describe('Caso não consiga excluir a tag', () => {
            const nonExistentId = 99999999999;
            it('Deve retornar mensagem de impossibilidade de exclusão', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.tagModel.deleteTag
                    .mockResolvedValue(null);
                const result = yield (0, tags_service_1.deleteTag)(nonExistentId);
                expect(index_model_1.tagModel.deleteTag).toHaveBeenCalledTimes(1);
                expect(result).toContain('Não foi possível excluir dados da categoria');
                expect(result).toContain(`com o id ${nonExistentId}`);
            }));
        });
        describe('Caso consiga excluir a categoria', () => {
            const existentId = 1;
            it('Deve retornar um breve relato do banco de dados', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.tagModel.deleteTag
                    .mockResolvedValue(tag_mock_1.mockResultSetHeader);
                const result = yield (0, tags_service_1.deleteTag)(existentId);
                expect(index_model_1.tagModel.deleteTag).toHaveBeenCalledTimes(1);
                expect(result).toEqual(tag_mock_1.mockResultSetHeader);
            }));
        });
        describe('Em caso de problemas na requisição:', () => {
            it('Deve retornar uma mensagem de erro', () => __awaiter(void 0, void 0, void 0, function* () {
                index_model_1.tagModel.deleteTag
                    .mockRejectedValue(tag_mock_1.mockError);
                const result = yield (0, tags_service_1.deleteTag)(1);
                expect(index_model_1.tagModel.deleteTag).toHaveBeenCalledTimes(1);
                expect(result)
                    .toContain('Ocorreu um erro na exclusão da categoria.');
                expect(result).toContain(tag_mock_1.errorMessage);
            }));
        });
    });
});
