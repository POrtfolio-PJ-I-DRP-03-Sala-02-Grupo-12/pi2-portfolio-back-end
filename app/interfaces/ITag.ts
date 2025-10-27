import { ResultSetHeader } from "mysql2/promise";

export default interface ITag {
  id?: number;
  title: string;
}

export interface ITagUpdateResult {
  updateResult:ResultSetHeader;
  updatedTag: ITag;
}