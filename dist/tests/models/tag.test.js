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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tag_mock_1 = require("../mocks/tag.mock");
const connection_1 = __importDefault(require("../../models/connection"));
const tag_model_1 = require("../../models/tag.model");
jest.mock("../../models/connection.ts", () => ({
    __esModule: true,
    default: {
        query: jest.fn(),
    },
}));
describe("TESTES DO MODELO TAG", () => {
    describe("EXCLUSÃO - exclusão de tag", () => {
        const tagIdToDelete = 1;
        let result;
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            connection_1.default.query
                .mockResolvedValueOnce([tag_mock_1.mockResultSetHeader, []]);
            result = yield (0, tag_model_1.deleteTag)(tagIdToDelete);
        }));
        afterEach(() => {
            jest.clearAllMocks();
        });
        describe("Ao informar um ID existente", () => {
            it("Deve executar a query uma vez", () => __awaiter(void 0, void 0, void 0, function* () {
                expect(connection_1.default.query).toHaveBeenCalledTimes(1);
            }));
            it("Deve conter a cláusula correta para exclusão da tag", () => __awaiter(void 0, void 0, void 0, function* () {
                expect(connection_1.default.query).toHaveBeenCalledWith(expect.stringContaining('DELETE FROM tags WHERE id = ?;'), [tagIdToDelete]);
            }));
            it("Deve retornar um objeto ResultSetHeader", () => __awaiter(void 0, void 0, void 0, function* () {
                expect(result).toEqual(tag_mock_1.mockResultSetHeader);
            }));
        });
    });
});
