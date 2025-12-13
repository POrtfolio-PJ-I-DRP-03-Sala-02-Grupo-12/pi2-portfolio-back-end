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
jest.mock('../../services/index.services', () => ({
    tagsService: {
        findAllTags: jest.fn(),
        findTagById: jest.fn(),
        findTagByTitle: jest.fn(),
        createNewTag: jest.fn(),
        updateTag: jest.fn(),
        deleteTag: jest.fn(),
    }
}));
const index_services_1 = require("../../services/index.services");
const tags_controller_1 = require("../../controllers/tags.controller");
const tag_mock_1 = require("../mocks/tag.mock");
describe('TESTES DO CONTROLLER TAGS', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('LISTAR TAGS (CATEGORIAS)', () => {
        describe('Caso não haja categorias cadastradas', () => {
            const mockRequest = {};
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const notFoundMessage = 'Não encontramos categorias cadastradas.';
            it('Deve retornar status 404', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.findAllTags
                    .mockResolvedValue(notFoundMessage);
                yield (0, tags_controller_1.findAllTags)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(404);
            }));
            it('Deve retornar a mensagem correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.findAllTags
                    .mockResolvedValue(notFoundMessage);
                yield (0, tags_controller_1.findAllTags)(mockRequest, mockResponse);
                expect(mockResponse.json)
                    .toHaveBeenCalledWith({ message: notFoundMessage });
            }));
        });
        describe('Caso haja categorias cadastradas', () => {
            const mockRequest = {};
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 200', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.findAllTags
                    .mockResolvedValue(tag_mock_1.mockTagsList);
                yield (0, tags_controller_1.findAllTags)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(200);
            }));
            it('Deve retornar a lista de categorias', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.findAllTags
                    .mockResolvedValue(tag_mock_1.mockTagsList);
                yield (0, tags_controller_1.findAllTags)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith(tag_mock_1.mockTagsList);
            }));
        });
        describe('Caso ocorra um erro', () => {
            const mockRequest = {};
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 500', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.findAllTags
                    .mockRejectedValue(tag_mock_1.mockError);
                yield (0, tags_controller_1.findAllTags)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(500);
            }));
            it('Deve retornar a mensagem de erro correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.findAllTags
                    .mockRejectedValue(tag_mock_1.mockError);
                yield (0, tags_controller_1.findAllTags)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: `Erro ao buscar categorias: ${tag_mock_1.mockError.message}`
                });
            }));
        });
    });
    describe('BUSCAR TAG(CATEGORIA) PELO ID', () => {
        describe('Caso a categoria não seja encontrada', () => {
            const mockRequest = {
                params: { id: '999' },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const notFoundMessage = 'Não conseguimos encontrar a categoria pelo id 999';
            it('Deve retornar status 404', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.findTagById
                    .mockResolvedValue(notFoundMessage);
                yield (0, tags_controller_1.findTagById)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(404);
            }));
            it('Deve retornar a mensagem correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.findTagById
                    .mockResolvedValue(notFoundMessage);
                yield (0, tags_controller_1.findTagById)(mockRequest, mockResponse);
                expect(mockResponse.json)
                    .toHaveBeenCalledWith({ message: notFoundMessage });
            }));
        });
        describe('Caso a categoria seja encontrada', () => {
            const mockRequest = {
                params: { id: '1' },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 200', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.findTagById
                    .mockResolvedValue(tag_mock_1.mockTagsList[0]);
                yield (0, tags_controller_1.findTagById)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(200);
            }));
            it('Deve retornar a categoria correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.findTagById
                    .mockResolvedValue(tag_mock_1.mockTagsList[0]);
                yield (0, tags_controller_1.findTagById)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith(tag_mock_1.mockTagsList[0]);
            }));
        });
        describe('Caso ocorra um erro', () => {
            const mockRequest = {
                params: { id: '1' },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 500', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.findTagById
                    .mockRejectedValue(tag_mock_1.mockError);
                yield (0, tags_controller_1.findTagById)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(500);
            }));
            it('Deve retornar a mensagem de erro correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.findTagById
                    .mockRejectedValue(tag_mock_1.mockError);
                yield (0, tags_controller_1.findTagById)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({ message: `Ocorreu um erro na busca: ${tag_mock_1.mockError.message}`
                });
            }));
        });
    });
    describe('BUSCAR TAG(CATEGORIA) PELO TÍTULO', () => {
        describe('Buscando por um título que não existe', () => {
            const nonExistentTitle = 'Título inexistente';
            const mockRequest = {
                query: { title: nonExistentTitle },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const notFoundMessage = 'Não conseguimos encontrar a categoria pelo título ' +
                nonExistentTitle;
            it('Deve retornar status 404', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.findTagByTitle
                    .mockResolvedValue(notFoundMessage);
                yield (0, tags_controller_1.findTagByTitle)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(404);
            }));
            it('Deve retornar a mensagem correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.findTagByTitle
                    .mockResolvedValue(notFoundMessage);
                yield (0, tags_controller_1.findTagByTitle)(mockRequest, mockResponse);
                expect(mockResponse.json)
                    .toHaveBeenCalledWith({ message: notFoundMessage });
            }));
        });
        describe('Buscando categoria com um título existente', () => {
            const mockRequest = {
                query: { title: 'Categoria TST 2' },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 200', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.findTagByTitle
                    .mockResolvedValue(tag_mock_1.mockTagsList[1]);
                yield (0, tags_controller_1.findTagByTitle)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(200);
            }));
            it('Deve retornar a categoria correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.findTagByTitle
                    .mockResolvedValue(tag_mock_1.mockTagsList[1]);
                yield (0, tags_controller_1.findTagByTitle)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith(tag_mock_1.mockTagsList[1]);
            }));
        });
        describe('Caso ocorra um erro', () => {
            const mockRequest = {
                query: { title: 'Categoria TST 2' },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 500', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.findTagByTitle
                    .mockRejectedValue(tag_mock_1.mockError);
                yield (0, tags_controller_1.findTagByTitle)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(500);
            }));
            it('Deve retornar a mensagem de erro correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.findTagByTitle
                    .mockRejectedValue(tag_mock_1.mockError);
                yield (0, tags_controller_1.findTagByTitle)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({ message: `Ocorreu um erro na busca: ${tag_mock_1.mockError.message}`
                });
            }));
        });
    });
    describe('CADASTRAR NOVA CATEGORIA', () => {
        describe('Caso não consiga cadastrar a categoria', () => {
            const mockTagIncomplete = {};
            const mockRequest = {
                body: mockTagIncomplete,
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 400', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.createNewTag
                    .mockResolvedValue('Não foi possível cadastrar a categoria com o título ' +
                    mockTagIncomplete.title);
                yield (0, tags_controller_1.createNewTag)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(400);
            }));
            it('Deve retornar a mensagem correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.createNewTag
                    .mockResolvedValue('Não foi possível cadastrar a categoria com o título ' +
                    mockTagIncomplete.title);
                yield (0, tags_controller_1.createNewTag)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: 'Não foi possível cadastrar a categoria com o título ' +
                        mockTagIncomplete.title
                });
            }));
        });
        describe('Caso consiga cadastrar a categoria', () => {
            const mockRequest = {
                body: tag_mock_1.mockNewTag,
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 201', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.createNewTag
                    .mockResolvedValue(Object.assign({ id: 1 }, tag_mock_1.mockNewTag));
                yield (0, tags_controller_1.createNewTag)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(201);
            }));
            it('Deve retornar a categoria cadastrada', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.createNewTag
                    .mockResolvedValue(Object.assign({ id: 1 }, tag_mock_1.mockNewTag));
                yield (0, tags_controller_1.createNewTag)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith(Object.assign({ id: 1 }, tag_mock_1.mockNewTag));
            }));
        });
        describe('Caso ocorra um erro', () => {
            const mockRequest = {
                body: tag_mock_1.mockNewTag,
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 500', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.createNewTag
                    .mockRejectedValue(tag_mock_1.mockError);
                yield (0, tags_controller_1.createNewTag)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(500);
            }));
            it('Deve retornar a mensagem de erro correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.createNewTag
                    .mockRejectedValue(tag_mock_1.mockError);
                yield (0, tags_controller_1.createNewTag)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: 'Ocorreu um erro no registro de nova categoria: ' +
                        tag_mock_1.mockError.message
                });
            }));
        });
    });
    describe('ATUALIZAR CATEGORIA', () => {
        describe('Caso não consiga encontrar a categoria para atualizar', () => {
            const mockRequest = {
                params: { id: '999' },
                body: tag_mock_1.mockTagToUpdate,
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const notFoundMessage = 'Categoria, com o id 999, ' +
                'não encontrada para atualização.';
            it('Deve retornar status 400', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.updateTag
                    .mockResolvedValue(notFoundMessage);
                yield (0, tags_controller_1.updateTag)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(400);
            }));
            it('Deve retornar a mensagem correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.updateTag
                    .mockResolvedValue(notFoundMessage);
                yield (0, tags_controller_1.updateTag)(mockRequest, mockResponse);
                expect(mockResponse.json)
                    .toHaveBeenCalledWith({ message: notFoundMessage });
            }));
        });
        describe('Caso não consiga atualizar os dados da categoria', () => {
            const mockRequest = {
                params: { id: '1' },
                body: {},
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const notAbleToUpdateMessage = 'Não foi possível alterar os dados ' +
                'da categoria do jogo com id 1';
            it('Deve retornar status 400', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.updateTag
                    .mockResolvedValue(notAbleToUpdateMessage);
                yield (0, tags_controller_1.updateTag)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(400);
            }));
            it('Deve retornar a mensagem correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.updateTag
                    .mockResolvedValue(notAbleToUpdateMessage);
                yield (0, tags_controller_1.updateTag)(mockRequest, mockResponse);
                expect(mockResponse.json)
                    .toHaveBeenCalledWith({ message: notAbleToUpdateMessage });
            }));
        });
        describe('Caso consiga atualizar a categoria', () => {
            const mockRequest = {
                params: { id: '1' },
                body: { title: 'Categoria TST Atualizada' },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 202', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.updateTag
                    .mockResolvedValue({
                    updateResult: tag_mock_1.mockResultSetHeader,
                    updatedGame: tag_mock_1.mockUpdatedTag,
                });
                yield (0, tags_controller_1.updateTag)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(202);
            }));
            it('Deve retornar o resultado da atualização', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.updateTag
                    .mockResolvedValue({
                    updateResult: tag_mock_1.mockResultSetHeader,
                    updatedGame: tag_mock_1.mockUpdatedTag,
                });
                yield (0, tags_controller_1.updateTag)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    updateResult: tag_mock_1.mockResultSetHeader,
                    updatedGame: tag_mock_1.mockUpdatedTag,
                });
            }));
        });
        describe('Caso ocorra um erro', () => {
            const mockRequest = {
                params: { id: '1' },
                body: tag_mock_1.mockTagWithInvalidColumnName,
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 500', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.updateTag
                    .mockRejectedValue(tag_mock_1.mockUpdateError);
                yield (0, tags_controller_1.updateTag)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(500);
            }));
            it('Deve retornar a mensagem de erro correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.updateTag
                    .mockRejectedValue(tag_mock_1.mockUpdateError);
                yield (0, tags_controller_1.updateTag)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: 'Ocorreu um erro na alteração de dados da categoria. ' +
                        tag_mock_1.mockUpdateError.message
                });
            }));
        });
    });
    describe('DELETAR CATEGORIA', () => {
        describe('Caso não consiga deletar a categoria', () => {
            const mockRequest = {
                params: { id: '999' },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const notAbleToDeleteMessage = 'Não foi possível excluir dados da ' +
                'categoria com o id 999';
            it('Deve retornar status 400', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.deleteTag
                    .mockResolvedValue(notAbleToDeleteMessage);
                yield (0, tags_controller_1.deleteTag)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(400);
            }));
            it('Deve retornar a mensagem correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.deleteTag
                    .mockResolvedValue(notAbleToDeleteMessage);
                yield (0, tags_controller_1.deleteTag)(mockRequest, mockResponse);
                expect(mockResponse.json)
                    .toHaveBeenCalledWith({ message: notAbleToDeleteMessage });
            }));
        });
        describe('Caso consiga deletar a categoria corretamente', () => {
            const mockRequest = {
                params: { id: '1' },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 202', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.deleteTag
                    .mockResolvedValue(tag_mock_1.mockResultSetHeader);
                yield (0, tags_controller_1.deleteTag)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(202);
            }));
            it('Deve retornar o resultado da exclusão', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.deleteTag
                    .mockResolvedValue(tag_mock_1.mockResultSetHeader);
                yield (0, tags_controller_1.deleteTag)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    result: tag_mock_1.mockResultSetHeader,
                    message: 'Categoria, com o id 1, deletada com sucesso.'
                });
            }));
        });
        describe('Caso ocorra um erro', () => {
            const mockRequest = {
                params: { id: '1' },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            it('Deve retornar status 500', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.deleteTag
                    .mockRejectedValue(tag_mock_1.mockError);
                yield (0, tags_controller_1.deleteTag)(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(500);
            }));
            it('Deve retornar a mensagem de erro correta', () => __awaiter(void 0, void 0, void 0, function* () {
                index_services_1.tagsService.deleteTag
                    .mockRejectedValue(tag_mock_1.mockError);
                yield (0, tags_controller_1.deleteTag)(mockRequest, mockResponse);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: 'Ocorreu um erro na exclusão da categoria. ' +
                        tag_mock_1.mockError.message
                });
            }));
        });
    });
});
