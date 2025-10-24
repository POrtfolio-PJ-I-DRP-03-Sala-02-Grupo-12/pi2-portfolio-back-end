import { ResultSetHeader } from "mysql2";
import { mockResultSetHeader } from "../mocks/tag.mock";
import connection from "../../models/connection";
import { deleteTag } from "../../models/tag.model";

jest.mock("../../models/connection.ts", () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  },
}));

describe("TESTES DO MODELO TAG", () => {
  describe("EXCLUSÃO - exclusão de tag", () => {
    const tagIdToDelete = 1;
    let result: ResultSetHeader | null;

    beforeEach(async () => {
      (connection.query as unknown as jest.Mock)
        .mockResolvedValueOnce([mockResultSetHeader, []]);
      result = await deleteTag(tagIdToDelete);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("Ao informar um ID existente", () => {
      it("Deve executar a query uma vez", async () => {
        expect(connection.query).toHaveBeenCalledTimes(1);
      });

      it("Deve conter a cláusula correta para exclusão da tag", async () => {
        expect(connection.query).toHaveBeenCalledWith(
          expect.stringContaining('DELETE FROM tags WHERE id = ?;'),
          [tagIdToDelete]
        );
      });

      it("Deve retornar um objeto ResultSetHeader", async () => {
        expect(result).toEqual(mockResultSetHeader);
      });
    });
  });
});