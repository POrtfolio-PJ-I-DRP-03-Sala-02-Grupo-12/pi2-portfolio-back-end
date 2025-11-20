import { ResultSetHeader } from "mysql2/promise";
import ITag from "../../interfaces/ITag";

export const mockTag1 = {
  id: 1,
  title: 'Categoria TST 1',
};

export const mockTag2 = {
  id: 2,
  title: 'Categoria TST 2',
};

export const mockTag3 = {
  id: 3,
  title: 'Categoria TST 3',
};

export const mockTagsList = [
  mockTag1,
  mockTag2,
  mockTag3,
] as ITag[];

export const mockNewTag = {
  title: 'Categoria TST 1',
} as ITag;

export const mockTagToUpdate = {
  id: 1,
  title: 'Categoria TST Atualizada',
} as ITag;

export const mockUpdatedTag: ITag = {
  id: 1,
  title: 'Categoria TST Atualizada',
};

export const mockResultSetHeader = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: "",
  serverStatus: 0,
  warningStatus: 0,
  changedRows: 0
} as ResultSetHeader;

export const errorMessage = 'Table gabisou_db_test.tags doesn\'t exist';
export const mockError = new Error(errorMessage);

export const invalidTitleErrorMessage = 'Unknown column \'NaN\' in \'where\' clause';
export const mockInvalidTitleError = new Error(invalidTitleErrorMessage);

export const mockUpdateErrorMessage =
  'Unknown column \'tiitle\' in \'field list\'';

export const mockUpdateError = new Error(mockUpdateErrorMessage);

export const mockTagWithInvalidColumnName = {
  tiitle: "Tentativa de alterar categoria com nome inválido de campo",
} as unknown as ITag;