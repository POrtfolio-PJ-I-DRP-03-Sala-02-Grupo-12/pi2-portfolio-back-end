import { ResultSetHeader } from "mysql2";
import IGameImage from "./IGameImage";
import ITag from "./ITag";

export default interface IGame {
  id?: number;
  title: string;
  description: string;
  linkName: string;
  linkUrl: string;
  tags?: ITag[];
  images?: IGameImage[];
}

export interface IGameUpdateResult {
  updateResult: ResultSetHeader;
  updatedGame: IGame;
}