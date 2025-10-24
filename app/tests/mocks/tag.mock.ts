import { ResultSetHeader } from "mysql2/promise";
import ITag from "../../interfaces/ITag";

export const mockTagsList = [
  {
    id: 1,
    title: 'Categoria TST 1',
  },
  {
    id: 2,
    title: 'Categoria TST 2',
  },
  {
    id: 3,
    title: 'Categoria TST 3',
  },
] as ITag[];

export const mockTag = {
  id: 1,
  title: 'Categoria TST 1',
} as ITag;

export const mockResultSetHeader = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: "",
  serverStatus: 0,
  warningStatus: 0,
  changedRows: 0
} as ResultSetHeader;